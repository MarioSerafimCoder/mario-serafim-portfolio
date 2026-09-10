"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "../../data/projects";
import { ProjectVisual } from "./project-visual";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || !window.matchMedia("(hover: none), (pointer: coarse)").matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      setActive(entry.isIntersecting && entry.intersectionRatio >= 0.58);
    }, { threshold: [0, 0.58, 0.72], rootMargin: "-12% 0px -12%" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const role = project.role
    .replaceAll("Direção Criativa", "Creative Direction")
    .replaceAll("Direção de Arte", "Art Direction")
    .replace("Produto", "Product");

  return (
    <a
      ref={ref}
      href={`/work/${project.slug}`}
      className={`project-card project-${index + 1} ${active ? "is-active" : ""}`}
      data-cursor="VER"
    >
      <ProjectVisual project={project} />
      <div className="project-meta">
        <span>{project.id} / {project.title}</span>
        <span>{project.categories[0]}</span>
        <span>{project.year}</span>
      </div>
      <dl className="project-context">
        <div><dt>Role</dt><dd>{role}</dd></div>
        <div><dt>Scope</dt><dd>{project.categories.join(" · ")}</dd></div>
      </dl>
      <p className="project-editorial-description">{project.description}<span aria-hidden="true">↗</span></p>
    </a>
  );
}

