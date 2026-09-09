import { Fragment } from "react";
import { HeroArtboard } from "../components/motion/hero-artboard";
import { Showreel } from "../components/motion/showreel";
import { VisualStory } from "../components/motion/visual-story";
import { ProjectCard } from "../components/projects/project-card";
import { HomeLab } from "../components/home-lab";
import { projects } from "../data/projects";

export default function Home() {
  return (
    <main className="editorial-home">
      <HeroArtboard />
      <Showreel />
      <VisualStory />
      <section className="selected" aria-labelledby="selected-title">
        <div className="section-head"><p className="eyebrow">01 / PROJETOS SELECIONADOS</p><a href="/work">Ver folha de contato ↗</a></div>
        <h2 id="selected-title">Uma ideia.<br /><em>Um universo.</em></h2>
        <div className="project-grid">{projects.map((project, index) => <Fragment key={project.slug}><ProjectCard project={project} index={index} />{index === 1 && <div className="work-interlude"><p>Direção transforma peças<br />em <em>um sistema vivo.</em></p><span>Clareza / ritmo / consistência</span></div>}</Fragment>)}</div>
      </section>
      <HomeLab />
      <section className="home-closing"><p>Vamos conversar.</p><h2>Agora vamos<br /><em>criar algo.</em></h2><a href="/contact">Iniciar um projeto ↗</a></section>
    </main>
  );
}
