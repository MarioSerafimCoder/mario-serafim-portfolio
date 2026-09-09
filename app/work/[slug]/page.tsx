import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";


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

      <nav className="case-navigation" aria-label="Navegação entre projetos">
        <a href={`/work/${previous.slug}`}><span>Projeto anterior</span><strong>{previous.title}</strong></a>
        <a href={`/work/${next.slug}`}><span>Próximo projeto</span><strong>{next.title}</strong></a>
      </nav>
    </main>
  );
}

