import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "../../../data/projects";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.title} — Mário Serafim`,
    description: project.description,
    openGraph: { title: `${project.title} — Mário Serafim`, description: project.description, images: [] },
    twitter: { title: `${project.title} — Mário Serafim`, description: project.description, images: [] },
  };
}

const chapters = [
  { number: "01", title: "Contexto", copy: "[Adicionar contexto, público e momento verificados do projeto.]" },
  { number: "02", title: "Desafio", copy: "[Adicionar o desafio criativo ou de negócio central.]" },
  { number: "03", title: "Direção", copy: "[Adicionar as decisões criativas e o raciocínio por trás delas.]" },
  { number: "04", title: "Sistema visual", copy: "[Adicionar detalhes de tipografia, cor, imagem, composição e movimento.]" },
];

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const caseStyle = { "--case-accent": project.accent } as CSSProperties;

  return (
    <main className="case-page" style={caseStyle}>
      <header className="case-hero">
        <div className="case-labels">
          <span>Projeto / {project.id}</span>
          <span>{project.categories.join(" · ")}</span>
          <span>{project.year}</span>
        </div>
        <h1>{project.title}</h1>
        <div className={`case-cover media-placeholder ${project.tone}`} role="img" aria-label={`Espaço reservado para imagem principal de ${project.title}`}>
          <span>{project.id} / Visual principal</span>
          <strong>{project.title}</strong>
          <span>Substituir por imagem ou vídeo 16:9</span>
        </div>
      </header>

      <section className="case-intro">
        <div><span>Papel</span><p>{project.role}</p></div>
        <div><span>Cliente</span><p>{project.client}</p></div>
        <h2>{project.description}</h2>
      </section>

      <section className="case-overview">
        <p>Visão geral</p>
        <div><span>Disciplinas</span><p>{project.categories.join(" / ")}</p></div>
        <div><span>Escopo</span><p>[Adicionar escopo verificado]</p></div>
        <div><span>Colaboradores</span><p>[Adicionar créditos]</p></div>
        <div><span>Resultado</span><p>[Adicionar apenas resultados verificados]</p></div>
      </section>

      {chapters.map((chapter) => (
        <section className="case-chapter" key={chapter.title}>
          <span>{chapter.number}</span><h2>{chapter.title}</h2><p>{chapter.copy}</p>
        </section>
      ))}

      <section className="case-gallery" aria-label={`Espaços reservados para galeria de ${project.title}`}>
        <div className="gallery-caption"><span>Quadros selecionados</span><span>Material em preparação</span></div>
        <div className="gallery-placeholder wide">16:9 / Filme ou visual-chave</div>
        <div className="gallery-split">
          <div className="gallery-placeholder portrait">3:4 / Quadro editorial</div>
          <div className="gallery-stack">
            <div className="gallery-placeholder square">1:1 / Detalhe do sistema</div>
            <div className="gallery-placeholder landscape">4:3 / Aplicação</div>
          </div>
        </div>
        <div className="gallery-placeholder cinematic">21:9 / Sequência em movimento</div>
      </section>

      <section className="case-notes">
        <p>Notas do projeto</p>
        <h2>Cada espaço já está pronto para receber o material final.</h2>
        <p>As composições em cinza preservam ritmo e proporção; imagens e vídeos podem ser substituídos depois sem redesenhar o case.</p>
      </section>

      <nav className="case-navigation" aria-label="Navegação entre projetos">
        <a href={`/work/${previous.slug}`}><span>Projeto anterior</span><strong>{previous.title}</strong></a>
        <a href={`/work/${next.slug}`}><span>Próximo projeto</span><strong>{next.title}</strong></a>
      </nav>
    </main>
  );
}
