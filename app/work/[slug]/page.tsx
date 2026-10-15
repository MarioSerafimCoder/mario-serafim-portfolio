/* eslint-disable @next/next/no-img-element -- the source images are already optimized local WebP assets */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects, archivedProjects } from "../../../data/projects";

export function generateStaticParams() { return [...projects, ...archivedProjects].map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: { title: `${project.title} — Mário Serafim`, description: project.description, images: [{ url: project.cover, alt: project.coverAlt }] },
    twitter: { title: `${project.title} — Mário Serafim`, description: project.description, images: [project.cover] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const next = projects[(projects.findIndex(item => item.slug === project.slug) + 1) % projects.length];
  return (
    <main className="case-page">
      <header className="case-header content-wrap"><a className="back-link" href="/work">← Todos os projetos</a><div className="case-heading"><div><span className="eyebrow"><span className="red-incision" aria-hidden="true" />Projeto / {project.id}</span><h1>{project.title}</h1></div><p>{project.description}</p></div><div className="case-meta"><span>{project.categories.join(" · ")}</span><span>{project.role}</span></div></header>
      <div className="case-cover"><img src={project.cover} alt={project.coverAlt} fetchPriority="high" /></div>
      <p className="case-cover-caption content-wrap">{["eduardo-noronha", "reacesso"].includes(project.slug) ? "Aplicação original · recorte da apresentação da marca" : "Estudo de aplicação · cenário digital com assinatura original"}</p>
      <section className="case-story content-wrap"><div><span className="eyebrow"><span className="red-incision" aria-hidden="true" />Contexto e direção</span><h2>{project.heading}</h2></div><div className="case-story-copy"><p>{project.context}</p><p>{project.direction}</p></div></section>
      <section className="case-gallery content-wrap" aria-label="Aplicações do projeto">{project.images.map((image, index) => <figure key={image.src} className={`case-figure case-figure-${index + 1}`}><img src={image.src} alt={image.alt} loading="lazy" /><figcaption><span>0{index + 1} / {project.title}</span><span>{image.caption}</span></figcaption></figure>)}</section>
      {project.study && <section className="case-film content-wrap" aria-labelledby="film-title"><div className="case-film-intro"><h2 id="film-title">{project.study.title}</h2><p>{project.study.description}</p></div><figure><video controls playsInline muted preload="none" poster={project.study.poster} aria-label={project.study.title}><source src={project.study.src} type="video/mp4" /><p>Seu navegador não reproduz este vídeo. <a href={project.study.src}>Abrir filme</a></p></video><figcaption>Estudo visual gerado no Flow · 8 segundos · sem áudio</figcaption></figure></section>}
      <section className="case-next"><div className="content-wrap"><span className="eyebrow"><span className="red-incision" aria-hidden="true" />Próximo projeto</span><a href={`/work/${next.slug}`}><span>{next.title}</span><span aria-hidden="true">↗</span></a><div className="case-next-contact"><p>Tem um projeto em mente?</p><a href="/contact">Vamos conversar ↗</a></div></div></section>
    </main>
  );
}
