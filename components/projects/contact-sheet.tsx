"use client";

import { useState } from "react";
import type { Project } from "../../data/projects";
import { ProjectVisual } from "./project-visual";

export function ContactSheet({ projects }: { projects: Project[] }) {
  const [mode, setMode] = useState<"grid" | "index">("grid");
  const [active, setActive] = useState(projects[0]?.slug);
  const activeProject = projects.find((project) => project.slug === active) ?? projects[0];

  return (
    <section className={`contact-sheet contact-sheet--${mode}`} aria-labelledby="contact-sheet-title">
      <div className="contact-sheet__head">
        <p id="contact-sheet-title">FOLHA DE CONTATO / {String(projects.length).padStart(2, "0")}</p>
        <div role="group" aria-label="Modo de visualização">
          <button className={mode === "grid" ? "is-active" : ""} onClick={() => setMode("grid")} aria-pressed={mode === "grid"}>GRADE</button>
          <span>/</span>
          <button className={mode === "index" ? "is-active" : ""} onClick={() => setMode("index")} aria-pressed={mode === "index"}>ÍNDICE</button>
        </div>
      </div>

      {mode === "grid" ? (
        <div className="contact-sheet__grid">
          {projects.map((project, index) => (
            <a href={`/work/${project.slug}`} key={project.slug} className={`sheet-card sheet-card-${index + 1}`} data-cursor="VER">
              <ProjectVisual project={project} />
              <div><span>{project.id}</span><strong>{project.title}</strong><small>{project.categories.join(" / ")} · {project.year}</small></div>
            </a>
          ))}
        </div>
      ) : (
        <div className="contact-sheet__index">
          <div className="contact-sheet__rows">
            {projects.map((project) => (
              <a href={`/work/${project.slug}`} key={project.slug} onPointerEnter={() => setActive(project.slug)} onFocus={() => setActive(project.slug)} data-cursor="ABRIR">
                <span>{project.id}</span><strong>{project.title}</strong><span>{project.categories[0]}</span><span>{project.year}</span>
                <div className="index-mobile-preview"><ProjectVisual project={project} context="preview" /></div>
              </a>
            ))}
          </div>
          {activeProject && <div className="index-preview" aria-hidden="true"><ProjectVisual project={activeProject} context="preview" /></div>}
        </div>
      )}
    </section>
  );
}
