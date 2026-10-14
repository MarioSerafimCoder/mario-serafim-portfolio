/* eslint-disable @next/next/no-img-element -- the source images are already optimized local WebP assets */
import type { Project } from "../data/projects";

export function ProjectGrid({ projects, home = false }: { projects: Project[]; home?: boolean }) {
  return (
    <div className={home ? "project-grid project-grid-home" : "project-grid"}>
      {projects.map((project, index) => (
        <a className={`project-card project-card-${index + 1}`} href={`/work/${project.slug}`} key={project.slug} aria-label={`Ver projeto ${project.title}`}>
          <div className="project-image"><img src={project.cover} alt={project.coverAlt} loading={index < 2 ? "eager" : "lazy"} /></div>
          <div className="project-meta"><div><span className="micro-label">0{index + 1} / {project.categories[0]}</span><h3>{project.title}</h3></div><span className="project-arrow" aria-hidden="true">↗</span></div>
          <p>{project.description}</p>
        </a>
      ))}
    </div>
  );
}
