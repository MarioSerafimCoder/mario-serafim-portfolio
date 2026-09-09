import { HeroArtboard } from "../components/motion/hero-artboard";
import { ProjectCard } from "../components/projects/project-card";
import { projects } from "../data/projects";

export default function Home() {
  return (
    <main className="editorial-home">
      <HeroArtboard />
      <section className="selected" aria-labelledby="selected-title">
        <div className="section-head"><p className="eyebrow">01 / PROJETOS SELECIONADOS</p><a href="/work">Ver folha de contato ↗</a></div>
        <h2 id="selected-title">Uma ideia.<br /><em>Um universo.</em></h2>
        <div className="project-grid">{projects.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}</div>
      </section>
      <section className="editorial-manifesto" aria-labelledby="manifesto-title">
        <p className="eyebrow">02 / PONTO DE VISTA</p>
        <h2 id="manifesto-title">Boas ideias precisam<br /><em>de direção.</em></h2>
        <div><p>Transformo marcas, campanhas e experiências digitais em sistemas visuais claros e memoráveis.</p><a href="/about">Sobre meu trabalho ↗</a></div>
      </section>
      <section className="home-closing"><p>Vamos conversar.</p><h2>Agora vamos<br /><em>criar algo.</em></h2><a href="/contact">Iniciar um projeto ↗</a></section>
    </main>
  );
}
