import { projects } from "../data/projects";

export default function Home() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-kicker"><span>Direção Criativa / Direção de Arte</span><span>Fortaleza — Brasil</span><span>2026</span></div>
        <h1 id="hero-title"><span>Mário</span><span>Serafim</span></h1>
        <div className="hero-foot"><p>Sistemas visuais para<br />ideias que merecem ser lembradas.</p><span className="scroll-note">Role para explorar ↓</span></div>
      </section>
      <section className="manifesto">
        <p className="eyebrow">01 / Direção</p>
        <h2>Boas ideias precisam<br /><em>de direção.</em></h2>
        <p className="manifesto-copy">Transformo marcas, campanhas e experiências digitais em sistemas visuais claros e memoráveis.</p>
      </section>
      <section className="selected" aria-labelledby="selected-title">
        <div className="section-head"><p className="eyebrow">02 / Projetos selecionados</p><a href="/work">Ver todos ↗</a></div>
        <h2 id="selected-title">Projetos<br />selecionados.</h2>
        <div className="project-grid">
          {projects.filter((project) => project.featured).slice(0, 3).map((project, index) => (
            <a href={`/work/${project.slug}`} className={`project-card project-${index + 1}`} key={project.title}>
              <div className={`media-placeholder ${project.tone}`} role="img" aria-label={`Espaço reservado para imagem do projeto ${project.title}`}>
                <span className="placeholder-index">0{index + 1}</span><strong>{project.title}</strong><span>Material visual em preparação</span>
              </div>
              <div className="project-meta"><span>{project.title}</span><span>{project.categories[0]}</span><span>{project.year}</span></div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
