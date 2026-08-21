import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExplodedComposition } from "../../../components/interaction/exploded-composition";
import { ChapterNavigation, type Chapter } from "../../../components/projects/chapter-navigation";
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
    openGraph: { title: `${project.title} — Mário Serafim`, description: project.description, images: [] },
    twitter: { title: `${project.title} — Mário Serafim`, description: project.description, images: [] },
  };
}

const chapters: Chapter[] = [
  { number: "01", slug: "ideia", title: "Ideia" },
  { number: "02", slug: "direcao", title: "Direção" },
  { number: "03", slug: "sistema", title: "Sistema" },
  { number: "04", slug: "saida", title: "Saída" },
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
        <div><span>Ano</span><p>{project.year}</p></div>
        <h2>{project.description}</h2>
      </section>

      <section className="case-overview">
        <p>Visão geral</p>
        <div><span>Disciplinas</span><p>{project.categories.join(" / ")}</p></div>
        <div><span>Direção</span><p>{project.role}</p></div>
      </section>

      <ChapterNavigation chapters={chapters} />

      {chapters.map((chapter, chapterIndex) => (
        <section className={`case-chapter case-chapter-${chapter.number}`} id={chapter.slug} key={chapter.title}>
          <span>{chapter.number}</span><h2>{chapter.title}</h2>
          {chapterIndex === 0 && <p>{project.description}</p>}
          {chapterIndex === 1 && <p>{project.role}</p>}
          {chapterIndex === 2 && <p>{project.categories.join(" / ")}</p>}
          {chapterIndex === 3 && <ProjectVisual project={project} context="preview" className="case-chapter-visual" />}
        </section>
      ))}

      <section className="case-exploded">
        <p>Direção / Sistema desmontado</p>
        <ExplodedComposition />
      </section>

      <section className="case-gallery" aria-label={`Estrutura visual do projeto ${project.title}`}>
        <div className="gallery-caption"><span>Quadros do sistema</span></div>
        <ProjectVisual project={project} context="preview" className="gallery-visual gallery-visual-wide" />
        <div className="gallery-split">
          <ProjectVisual project={project} context="preview" className="gallery-visual gallery-visual-portrait" />
          <div className="gallery-stack">
            <ProjectVisual project={project} context="preview" className="gallery-visual gallery-visual-square" />
            <ProjectVisual project={project} context="preview" className="gallery-visual gallery-visual-landscape" />
          </div>
        </div>
      </section>

      <nav className="case-navigation" aria-label="Navegação entre projetos">
        <a href={`/work/${previous.slug}`}><span>Projeto anterior</span><strong>{previous.title}</strong></a>
        <a href={`/work/${next.slug}`}><span>Próximo projeto</span><strong>{next.title}</strong></a>
      </nav>
    </main>
  );
}
