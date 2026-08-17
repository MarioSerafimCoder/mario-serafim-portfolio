import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "../../data/projects";

export const metadata: Metadata = { title: "Archive — Mário Serafim", description: "An expanding index of creative direction and design work." };

export default function ArchivePage() {
  const disciplines = [...new Set(projects.flatMap((project) => project.categories))];
  return (
    <main className="inner-page">
      <header className="page-hero compact archive-hero"><p>02 / Index</p><h1>Archive.</h1><p>An expanding record of client, collaborative and self-initiated work.</p></header>
      <section className="archive-summary">
        <div><span>Projects</span><strong>{String(projects.length).padStart(2, "0")}</strong></div>
        <div><span>Years</span><strong>2024—26</strong></div>
        <div><span>Disciplines</span><strong>{String(disciplines.length).padStart(2, "0")}</strong></div>
      </section>
      <section className="archive-table" aria-label="Project archive">
        <div className="archive-head"><span>No.</span><span>Project</span><span>Discipline</span><span>Year</span></div>
        {projects.map((project) => (
          <Link href={`/work/${project.slug}`} key={project.slug}>
            <span>{project.id}</span><strong>{project.title}</strong><span>{project.categories[0]}</span><span>{project.year}</span>
          </Link>
        ))}
      </section>
      <section className="archive-note"><p>Archive note</p><h2>More work will be added as material is prepared.</h2><p>The index is data-driven: new records automatically appear here and receive their own case route.</p></section>
    </main>
  );
}
