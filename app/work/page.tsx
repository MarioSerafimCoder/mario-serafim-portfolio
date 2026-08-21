import type { Metadata } from "next";
import { projects } from "../../data/projects";

export const metadata: Metadata = {
  title: "Projetos — Mário Serafim",
  description: "Projetos selecionados de direção criativa, direção de arte e experiências digitais.",
};

export default function WorkPage() {
  return (
    <main className="inner-page">
      <header className="page-hero work-hero">
        <p>01 / Projetos selecionados</p>
        <h1>Projetos.</h1>
        <p>Identidades, campanhas e experiências digitais transformadas em universos visuais coerentes.</p>
      </header>

      <section className="work-statement">
        <p>Abordagem / 2026</p>
        <h2>Da ideia<br />ao sistema.</h2>
        <p>Direção é o fio que conecta estratégia, imagem, tipografia, movimento e produto. Cada case funciona como uma publicação editorial concisa.</p>
      </section>

      <section className="work-editorial" aria-label="Projetos selecionados">
        {projects.map((project, index) => (
          <article className={`editorial-project editorial-project-${index + 1}`} key={project.slug}>
            <a href={`/work/${project.slug}`} className="editorial-project-link">
              <div className={`media-placeholder editorial-cover ${project.tone}`} role="img" aria-label={`Espaço reservado para capa de ${project.title}`}>
                <span className="placeholder-index">{project.id}</span>
                <strong>{project.title}</strong>
                <span>Imagem ou vídeo de capa em preparação</span>
              </div>
              <div className="editorial-project-meta">
                <span>Projeto / {project.id}</span>
                <h2>{project.title}</h2>
                <p>{project.categories.join(" · ")}</p>
                <span>{project.year} ↗</span>
              </div>
            </a>
          </article>
        ))}
      </section>

      <section className="work-index">
        <div className="section-head"><p className="eyebrow">Índice / Todos os projetos</p><a href="/archive">Abrir arquivo ↗</a></div>
        {projects.map((project) => (
          <a href={`/work/${project.slug}`} key={project.slug} className="work-row">
            <span>{project.id}</span>
            <div><h2>{project.title}</h2><p>{project.categories.join(" / ")}</p></div>
            <span>{project.year}</span>
            <span className="row-action">Ver case ↗</span>
          </a>
        ))}
      </section>
    </main>
  );
}
