import { ProjectGrid } from "../components/editorial-projects";
import { projects } from "../data/projects";

export default function HomePage() {
  return <main className="premium-home">
    <section className="premium-hero content-wrap" aria-labelledby="hero-title">
      <div className="premium-kicker"><span><i aria-hidden="true" />Estúdio independente de design</span><span>Fortaleza, Brasil · Atuação remota</span></div>
      <div className="premium-hero-copy">
        <h1 id="hero-title">Identidades com presença.<br />Design com intenção<span className="signature-period">.</span></h1>
        <div className="premium-hero-aside"><p>Direção de arte e identidade visual.<br />Da primeira ideia à expressão da marca em cada detalhe.</p><a className="premium-link" href="/contact">Conversar sobre um projeto <span aria-hidden="true">↗</span></a></div>
      </div>
      <div className="hero-index"><a href="#projetos">Explore os projetos <span aria-hidden="true">↓</span></a><span>Identidade / Sistemas / Aplicações</span></div>
    </section>
    <section className="premium-projects content-wrap" id="projetos" aria-labelledby="projects-heading">
      <div className="portfolio-label"><h2 id="projects-heading">Trabalhos selecionados</h2><span>01 — 04</span></div>
      <ProjectGrid projects={projects} home />
    </section>
    <section className="premium-approach content-wrap" id="abordagem" aria-labelledby="approach-heading">
      <div className="section-topline"><span className="premium-rail">A abordagem</span><span className="section-number">01 / 03</span></div>
      <div className="approach-intro"><h2 id="approach-heading">Clareza na direção.<br />Precisão na execução.</h2><p>Uma identidade precisa funcionar como um conjunto. Cada escolha de forma, tipografia e material participa da mesma conversa.</p></div>
      <div className="premium-steps"><article><span>01 / Contexto</span><h3>Antes da forma,<br />entender a marca.</h3><p>Escuta, referências e leitura dos pontos de contato para definir o que a identidade precisa comunicar.</p></article><article><span>02 / Direção</span><h3>Uma linguagem<br />com sentido próprio.</h3><p>Conceito, assinatura, tipografia e cor organizados em uma direção visual coerente com o projeto.</p></article><article><span>03 / Sistema</span><h3>Consistência<br />em cada aplicação.</h3><p>Desdobramentos e orientações de uso que preservam a identidade no digital e nos materiais físicos.</p></article></div>
      <a className="premium-link" href="/process">Conhecer o processo <span aria-hidden="true">↗</span></a>
    </section>
    <section className="premium-about content-wrap">
      <div className="section-topline"><span className="premium-rail">O olhar por trás dos projetos</span><span className="section-number">02 / 03</span></div>
      <div className="about-editorial"><div><span className="about-signature">Mário Serafim<span aria-hidden="true"> /</span></span><p>Diretor de arte<br />Identidade visual e sistemas de marca</p></div><div><h2>O cuidado se revela<br />nos detalhes.</h2><p>Meu trabalho parte de uma escuta atenta e se constrói por escolhas precisas. Desenvolvo linguagens visuais que respeitam a personalidade de cada negócio e mantêm coerência nos diferentes lugares em que a marca aparece.</p><a className="premium-link" href="/about">Conheça meu trabalho <span aria-hidden="true">↗</span></a></div></div>
    </section>
    <section className="premium-contact content-wrap">
      <div className="section-topline"><span className="premium-rail">Vamos conversar</span><span className="section-number">03 / 03</span></div>
      <a className="contact-invitation" href="/contact"><h2>Qual é o próximo<br />capítulo da sua marca?</h2><span className="contact-circle" aria-hidden="true">↗</span></a>
      <div className="contact-caption"><p>Conte sobre o seu negócio e o que você quer construir.</p><a href="mailto:marioserafim.da@gmail.com">marioserafim.da@gmail.com</a></div>
    </section>
  </main>;
}
