import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "../../data/projects";

export const metadata: Metadata = {
  title: "Work — Mário Serafim",
  description: "Selected creative direction, art direction and digital experience projects.",
};

export default function WorkPage() {
  return (
    <main className="inner-page">
      <header className="page-hero work-hero">
        <p>01 / Selected projects</p>
        <h1>Work.</h1>
        <p>Brand identities, campaigns and digital experiences shaped into coherent visual worlds.</p>
      </header>

      <section className="work-statement">
        <p>Approach / 2026</p>
        <h2>From idea<br />to system.</h2>
        <p>Direction is the thread between strategy, image, typography, motion and product. Each case is structured as a short editorial publication.</p>
      </section>

      <section className="work-editorial" aria-label="Selected projects">
        {projects.map((project, index) => (
          <article className={`editorial-project editorial-project-${index + 1}`} key={project.slug}>
            <Link href={`/work/${project.slug}`} className="editorial-project-link">
              <div className={`media-placeholder editorial-cover ${project.tone}`} role="img" aria-label={`${project.title} cover placeholder`}>
                <span className="placeholder-index">{project.id}</span>
                <strong>{project.title}</strong>
                <span>Cover image or video pending</span>
              </div>
              <div className="editorial-project-meta">
                <span>Project / {project.id}</span>
                <h2>{project.title}</h2>
                <p>{project.categories.join(" · ")}</p>
                <span>{project.year} ↗</span>
              </div>
            </Link>
          </article>
        ))}
      </section>

      <section className="work-index">
        <div className="section-head"><p className="eyebrow">Index / All projects</p><Link href="/archive">Open archive ↗</Link></div>
        {projects.map((project) => (
          <Link href={`/work/${project.slug}`} key={project.slug} className="work-row">
            <span>{project.id}</span>
            <div><h2>{project.title}</h2><p>{project.categories.join(" / ")}</p></div>
            <span>{project.year}</span>
            <span className="row-action">View case ↗</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
