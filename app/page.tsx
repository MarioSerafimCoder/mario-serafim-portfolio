import { HeroArtboard } from "../components/motion/hero-artboard";
import { ExplodedComposition } from "../components/interaction/exploded-composition";
import { ProjectVisual } from "../components/projects/project-visual";
import { projects } from "../data/projects";

export default function Home() {
  return (
    <main>
      <HeroArtboard />

      <section className="manifesto-scroll" aria-labelledby="manifesto-title">
        <div className="manifesto-sticky">
          <p className="eyebrow">01 / CAOS → DIREÇÃO → SISTEMA</p>
          <h2 id="manifesto-title">
            <span>Boas ideias</span>
            <span>precisam</span>
            <strong data-cursor="FOCO">de direção.</strong>
          </h2>
          <p>Transformo marcas, campanhas e experiências digitais em sistemas visuais claros e memoráveis.</p>
          <div className="manifesto-axis" aria-hidden="true"><i /><b>DIREÇÃO</b><i /></div>
        </div>
      </section>

      <section className="selected" aria-labelledby="selected-title">
        <div className="section-head"><p className="eyebrow">02 / PROJETOS SELECIONADOS</p><a href="/work" data-cursor="ABRIR">Ver folha de contato ↗</a></div>
        <h2 id="selected-title">Projetos<br />como sistemas.</h2>
        <div className="project-grid">
          {projects.map((project, index) => (
            <a href={`/work/${project.slug}`} className={`project-card project-${index + 1}`} key={project.title} data-cursor="VER">
              <ProjectVisual project={project} />
              <div className="project-meta"><span>{project.id} / {project.title}</span><span>{project.categories[0]}</span><span>{project.year}</span></div>
            </a>
          ))}
        </div>
      </section>

      <section className="art-direction-system">
        <div className="section-head"><p className="eyebrow">03 / DIREÇÃO DE ARTE</p><span>Mova para desmontar</span></div>
        <ExplodedComposition />
      </section>

      <section className="home-closing">
        <p>Você viu<br />o resultado.</p>
        <h2>Agora vamos<br /><em>criar algo.</em></h2>
        <a href="/contact" data-cursor="ABRIR">Iniciar um projeto ↗</a>
      </section>
    </main>
  );
}
