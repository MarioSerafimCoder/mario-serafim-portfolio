import type { Metadata } from "next";
import { ProjectVisual } from "../../components/projects/project-visual";
import { projects } from "../../data/projects";

export const metadata: Metadata = { title: "Arquivo — Mário Serafim", description: "Um índice em expansão de direção criativa e design." };

export default function ArchivePage() {
  const disciplines = [...new Set(projects.flatMap((project) => project.categories))];
  return (
    <main className="inner-page">
      <header className="page-hero compact archive-hero"><p>02 / Índice</p><h1>Arquivo.</h1><p>Um registro em expansão de trabalhos para clientes, colaborações e iniciativas autorais.</p></header>
      <section className="archive-summary">
        <div><span>Projetos</span><strong>{String(projects.length).padStart(2, "0")}</strong></div>
        <div><span>Anos</span><strong>2024—26</strong></div>
        <div><span>Disciplinas</span><strong>{String(disciplines.length).padStart(2, "0")}</strong></div>
      </section>
      <section className="archive-table" aria-label="Arquivo de projetos">
        <div className="archive-head"><span>Nº</span><span>Projeto</span><span>Disciplina</span><span>Ano</span></div>
        {projects.map((project) => (
          <a href={`/work/${project.slug}`} key={project.slug} data-cursor="VER">
            <span>{project.id}</span><strong>{project.title}</strong><span>{project.categories[0]}</span><span>{project.year}</span>
            <ProjectVisual project={project} context="preview" className="archive-preview" />
          </a>
        ))}
      </section>
      <section className="archive-note"><p>Nota do arquivo</p><h2>Novos trabalhos entrarão conforme o material for preparado.</h2><p>O índice é dinâmico: novos registros aparecem aqui automaticamente e recebem sua própria página de projeto.</p></section>
    </main>
  );
}
