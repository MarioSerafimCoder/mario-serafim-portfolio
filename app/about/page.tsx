import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sobre", description: "Conheça Mário Serafim, diretor de arte com atuação em identidade visual e sistemas de marca." };

export default function AboutPage() {
  return <main className="subpage about-page">
    <header className="subpage-heading content-wrap"><span className="eyebrow"><span className="red-incision" aria-hidden="true" />Sobre / Mário Serafim</span><h1>Uma direção<br /><em>para cada marca.</em></h1><p>Sou Mário Serafim, diretor de arte com atuação em identidade visual, comunicação e sistemas de marca.</p></header>
    <section className="about-statement content-wrap"><span className="eyebrow">O que orienta meu trabalho</span><div><h2>Repertório abre possibilidades.<br /><em>Critério decide.</em></h2><p>Procuro entender o que cada projeto pede e encontrar uma linguagem que faça sentido para sua história, seu público e seus pontos de contato. Da primeira ideia às aplicações, cuido para que a identidade tenha personalidade e consistência.</p></div></section>
    <section className="about-capabilities content-wrap"><span className="eyebrow"><span className="red-incision" aria-hidden="true" />Atuação</span><div>{["Identidade visual", "Direção de arte", "Sistemas de marca", "Desdobramentos e aplicações"].map((item, index) => <div key={item}><span>0{index + 1}</span><h3>{item}</h3></div>)}</div></section>
    <section className="simple-cta content-wrap"><h2>Tem um projeto em mente?</h2><a href="/contact" className="text-link">Vamos conversar <span aria-hidden="true">↗</span></a></section>
  </main>;
}
