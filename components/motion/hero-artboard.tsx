import { ProjectVisual } from "../projects/project-visual";
import { projects } from "../../data/projects";

export function HeroArtboard() {
  return (
    <section className="editorial-hero" aria-labelledby="hero-title">
      <div className="editorial-kicker"><span>Direção criativa / Direção de arte</span><span>Fortaleza — Brasil</span></div>
      <h1 id="hero-title">Mário <span>Serafim<span className="signature-dot">.</span></span></h1>
      <div className="editorial-opening">
        <div className="editorial-note"><span className="eyebrow">MS/ — PORTFÓLIO</span><p>Identidade, campanhas<br />e experiências digitais.</p><a href="#selected-title">Explorar projetos ↓</a></div>
        <a className="editorial-feature" href="/work/granistone" aria-label="Ver projeto Granistone"><ProjectVisual project={projects[0]} context="preview" /><div><span>Em destaque / Granistone</span><span>2026 ↗</span></div></a>
      </div>
    </section>
  );
}
