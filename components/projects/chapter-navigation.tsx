"use client";

import { useEffect, useRef, useState } from "react";

export type Chapter = { number: string; slug: string; title: string };

export function ChapterNavigation({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(chapters[0]?.slug ?? "");
  const ratios = useRef(new Map<string, number>());

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const elements = chapters
      .map((chapter) => document.getElementById(chapter.slug))
      .filter((element): element is HTMLElement => Boolean(element));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => ratios.current.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0));
      const next = [...ratios.current.entries()].sort((a, b) => b[1] - a[1])[0];
      if (next?.[1] > 0) setActive(next[0]);
    }, { threshold: [0.2, 0.45, 0.7], rootMargin: "-20% 0px -45%" });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [chapters]);

  return (
    <nav className="case-chapter-nav" aria-label="Capítulos do projeto">
      {chapters.map((chapter) => (
        <a href={`#${chapter.slug}`} key={chapter.slug} aria-current={active === chapter.slug ? "true" : undefined}>
          <span>{chapter.number}</span><b>{chapter.title}</b>
        </a>
      ))}
    </nav>
  );
}
