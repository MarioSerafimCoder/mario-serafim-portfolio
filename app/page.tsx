import { Specialties } from "../components/specialties";
import { Fragment } from "react";
import { HeroArtboard } from "../components/motion/hero-artboard";
import { Showreel } from "../components/motion/showreel";
import { VisualStory } from "../components/motion/visual-story";
import { ProjectCard } from "../components/projects/project-card";
import { HomeProcess } from "../components/home-process";
import { HomeProfile } from "../components/profile/home-profile";
import { projects } from "../data/projects";

export default function Home() {
  return (
    <main className="editorial-home">
      <HeroArtboard />
      <Showreel />
      <VisualStory />
      <section className="selected" aria-labelledby="selected-title">
        <div className="section-head"><p className="eyebrow">01 / PROJETOS SELECIONADOS</p><a href="/work">Ver folha de contato ↗</a></div>
        <h2 id="selected-title">Quatro trabalhos.<br /><em>Quatro escalas.</em></h2>
        <div className="project-grid">{projects.map((project, index) => <Fragment key={project.slug}><ProjectCard project={project} index={index} />{index === 1 && <div className="work-interlude"><p>A linguagem muda.<br />O cuidado com a execução, <em>não.</em></p><span>Entre um trabalho e outro</span></div>}</Fragment>)}</div>
      </section>
      <Specialties />
      <HomeProfile />
      <HomeProcess />
      <section className="home-closing"><p>Vamos conversar.</p><h2>Qual é<br /><em>o projeto?</em></h2><a href="/contact">Iniciar um projeto ↗</a></section>
    </main>
  );
}
