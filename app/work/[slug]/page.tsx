import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExplodedComposition } from "../../../components/interaction/exploded-composition";
import { ProjectVisual } from "../../../components/projects/project-visual";
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
    openGraph: { title: `${project.title} — Mário Serafim`, description: project.description, images: ["/og.png"] },
    twitter: { title: `${project.title} — Mário Serafim`, description: project.description, images: ["/og.png"] },
  };
}

const chapters = [
  { number: "01", slug: "ideia", title: "Ideia", copy: "[Adicionar contexto, público, oportunidade e ponto de partida verificados do projeto.]" },
  { number: "02", slug: "direcao", title: "Direção", copy: "[Adicionar as decisões criativas e o raciocínio por trás delas.]" },
  { number: "03", slug: "sistema", title: "Sistema", copy: "[Adicionar tipografia, cor, imagem, composição e princípios de movimento.]" },
  { number: "04", slug: "saida", title: "Saída", copy: "[Adicionar somente entregas e resultados efetivamente verificados.]" },
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
        <ProjectVisual project={project} context="hero" className="case-cover" />
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

      <nav className="case-chapter-nav" aria-label="Capítulos do projeto">
        {chapters.map((chapter) => <a href={`#${chapter.slug}`} key={chapter.slug}><span>{chapter.number}</span>{chapter.title}</a>)}
      </nav>

      {chapters.map((chapter) => (
        <section className={`case-chapter case-chapter-${chapter.number}`} id={chapter.slug} key={chapter.title}>
          <span>{chapter.number}</span><h2>{chapter.title}</h2><p>{chapter.copy}</p>
        </section>
      ))}

      <section className="case-exploded">
        <p>Direção / Sistema desmontado</p>
        <ExplodedComposition />
      </section>

      <section className="case-gallery" aria-label={`Estrutura visual do projeto ${project.title}`}>
        <div className="gallery-caption"><span>Quadros do sistema</span><span>Prontos para mídia final</span></div>
        <ProjectVisual project={project} context="preview" className="gallery-visual gallery-visual-wide" />
        <div className="gallery-split">
          <ProjectVisual project={project} context="preview" className="gallery-visual gallery-visual-portrait" />
          <div className="gallery-stack">
            <ProjectVisual project={project} context="preview" className="gallery-visual gallery-visual-square" />
            <ProjectVisual project={project} context="preview" className="gallery-visual gallery-visual-landscape" />
          </div>
        </div>
      </section>

      <section className="case-notes">
        <p>Notas do projeto</p>
        <h2>Cada espaço já está pronto para receber o material final.</h2>
        <p>O componente aceita imagem, vídeo, pôster, sequência e futura animação vinculada à rolagem sem alterar a arquitetura editorial do projeto.</p>
      </section>

      <nav className="case-navigation" aria-label="Navegação entre projetos">
        <a href={`/work/${previous.slug}`}><span>Projeto anterior</span><strong>{previous.title}</strong></a>
        <a href={`/work/${next.slug}`}><span>Próximo projeto</span><strong>{next.title}</strong></a>
      </nav>
    </main>
  );
}
