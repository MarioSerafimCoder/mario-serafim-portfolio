/* eslint-disable @next/next/no-img-element -- optimized local project assets */
import type { Project } from "../data/projects";

export function ProjectGrid({ projects, home = false }: { projects: Project[]; home?: boolean }) {
  return <div className={`premium-grid${home ? " premium-grid-home" : ""}`}>
    {projects.map((project, index) => <a className={`premium-card premium-card-${index + 1}`} href={`/work/${project.slug}`} key={project.slug} aria-label={`Ver projeto ${project.title}`}>
      <div className="premium-image"><img src={project.cover} srcSet={`${project.cover.replace('.webp', '-640.webp')} 640w, ${project.cover} ${project.coverWidth}w`} sizes={home && (index === 0 || index === projects.length - 1) ? "(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) calc(100vw - 72px), (max-width: 1552px) calc(100vw - 112px), 1440px" : "(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) calc((100vw - 96px) / 2), 704px"} alt={project.coverAlt} loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "auto"} width={1680} height={1120} /><span className="project-view">Explorar projeto <span aria-hidden="true">↗</span></span></div>
      <div className="premium-card-meta"><div className="project-title-row"><span className="project-id">{project.id}</span><h3>{project.title}</h3></div><span className="project-category">{project.categories[1]}</span><span className="project-meta-arrow" aria-hidden="true">↗</span></div>
      <p className="project-description">{project.description}</p>
    </a>)}
  </div>;
}
