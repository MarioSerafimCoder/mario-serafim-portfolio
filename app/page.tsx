import { ProjectGrid } from "../components/editorial-projects";
import { projects } from "../data/projects";

export default function HomePage() {
  return (
    <main className="homepage">
      <section className="home-hero" aria-labelledby="hero-title">
        <div className="hero-topline"><span className="eyebrow"><span className="red-incision" aria-hidden="true" />Identidade visual & direção de arte</span><span className="hero-index">Estúdio independente · Fortaleza / Brasil</span></div>
        <div className="hero-main"><h1 id="hero-title">A percepção<br /><em>constrói</em> valor<span className="hero-period">.</span></h1>
          <div className="hero-side"><p>Identidades para marcas em que estética, precisão e confiança se encontram — dos espaços às experiências de cuidado.</p><a className="text-link" href="#projetos">Explorar projetos <span aria-hidden="true">↘</span></a></div>
        </div>
        <div className="hero-bottom"><span>Marcas com presença. Ideias com direção.</span><span>01 — 05 / Projetos selecionados</span></div>
      </section>

      <section className="home-projects content-wrap" id="projetos" aria-labelledby="projects-heading">
        <div className="section-heading"><span className="eyebrow"><span className="red-incision" aria-hidden="true" />Portfólio / 01</span><div><h2 id="projects-heading">Projetos<br /><em>selecionados.</em></h2><p>Identidades construídas com critério, intenção e atenção aos detalhes.</p></div></div>
        <ProjectGrid projects={projects} home />
        <a className="text-link section-end-link" href="/work">Ver todos os projetos <span aria-hidden="true">↗</span></a>
      </section>

      <section className="approach-section" id="abordagem" aria-labelledby="approach-heading">
        <div className="content-wrap">
          <div className="section-heading section-heading-dark"><span className="eyebrow"><span className="red-incision" aria-hidden="true" />Abordagem / 02</span><div><h2 id="approach-heading">Cada escolha<br /><em>comunica.</em></h2><p>Uma marca consistente nasce do entendimento, ganha forma por decisões visuais e se consolida nas aplicações.</p></div></div>
          <div className="steps">
            <article><span>01</span><h3>Entendimento</h3><p>Contexto, objetivos, público e a percepção que a marca deseja construir.</p></article>
            <article><span>02</span><h3>Direção</h3><p>Conceito, linguagem, identidade e escolhas que dão forma à marca.</p></article>
            <article><span>03</span><h3>Aplicação</h3><p>Um sistema visual coerente em cada ponto de contato.</p></article>
          </div>
          <a href="/process" className="text-link light-link">Conhecer a abordagem <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="home-about content-wrap" aria-labelledby="about-heading">
        <span className="eyebrow"><span className="red-incision" aria-hidden="true" />Sobre / 03</span>
        <div><h2 id="about-heading">Direção é saber<br /><em>o que permanece.</em></h2><div className="about-side"><p>Sou Mário Serafim, diretor de arte. Desenvolvo identidades visuais e sistemas de marca com atenção ao contexto, à forma e ao uso. Gosto de encontrar a ideia que sustenta uma marca e fazê-la funcionar em cada detalhe.</p><a href="/about" className="text-link">Sobre o meu trabalho <span aria-hidden="true">↗</span></a></div></div>
      </section>

      <section className="contact-cta" aria-labelledby="contact-heading"><div className="content-wrap"><span className="eyebrow"><span className="red-incision" aria-hidden="true" />Próximo projeto / 04</span><h2 id="contact-heading">Sua marca pode<br />ser <em>inesquecível.</em></h2><a className="contact-cta-link" href="/contact">Vamos conversar <span aria-hidden="true">↗</span></a></div></section>
    </main>
  );
}
