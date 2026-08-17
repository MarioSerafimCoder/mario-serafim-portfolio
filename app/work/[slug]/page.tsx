import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
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
  { number: "01", title: "Context", copy: "[Add the verified project context, audience and moment.]" },
  { number: "02", title: "Challenge", copy: "[Add the central creative or business challenge.]" },
  { number: "03", title: "Direction", copy: "[Add the creative decisions and the thinking behind them.]" },
  { number: "04", title: "Visual system", copy: "[Add typography, color, image, composition and motion details.]" },
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
          <span>Project / {project.id}</span>
          <span>{project.categories.join(" · ")}</span>
          <span>{project.year}</span>
        </div>
        <h1>{project.title}</h1>
        <div className={`case-cover media-placeholder ${project.tone}`} role="img" aria-label={`${project.title} main visual placeholder`}>
          <span>{project.id} / Hero visual</span>
          <strong>{project.title}</strong>
          <span>Replace with 16:9 image or video</span>
        </div>
      </header>

      <section className="case-intro">
        <div><span>Role</span><p>{project.role}</p></div>
        <div><span>Client</span><p>{project.client}</p></div>
        <h2>{project.description}</h2>
      </section>

      <section className="case-overview">
        <p>Case overview</p>
        <div><span>Disciplines</span><p>{project.categories.join(" / ")}</p></div>
        <div><span>Scope</span><p>[Add verified scope]</p></div>
        <div><span>Collaborators</span><p>[Add credits]</p></div>
        <div><span>Outcome</span><p>[Add only verified outcomes]</p></div>
      </section>

      {chapters.map((chapter) => (
        <section className="case-chapter" key={chapter.title}>
          <span>{chapter.number}</span><h2>{chapter.title}</h2><p>{chapter.copy}</p>
        </section>
      ))}

      <section className="case-gallery" aria-label={`${project.title} gallery placeholders`}>
        <div className="gallery-caption"><span>Selected frames</span><span>Material pending</span></div>
        <div className="gallery-placeholder wide">16:9 / Film or key visual</div>
        <div className="gallery-split">
          <div className="gallery-placeholder portrait">3:4 / Editorial frame</div>
          <div className="gallery-stack">
            <div className="gallery-placeholder square">1:1 / System detail</div>
            <div className="gallery-placeholder landscape">4:3 / Application</div>
          </div>
        </div>
        <div className="gallery-placeholder cinematic">21:9 / Motion sequence</div>
      </section>

      <section className="case-notes">
        <p>Project notes</p>
        <h2>Every asset slot is ready for the final material.</h2>
        <p>The gray compositions preserve rhythm and proportion now; images and videos can be replaced later without redesigning the case.</p>
      </section>

      <nav className="case-navigation" aria-label="Project navigation">
        <Link href={`/work/${previous.slug}`}><span>Previous project</span><strong>{previous.title}</strong></Link>
        <Link href={`/work/${next.slug}`}><span>Next project</span><strong>{next.title}</strong></Link>
      </nav>
    </main>
  );
}
