import type { Metadata } from "next";

export const metadata: Metadata = { title: "Abordagem", description: "Como Mário Serafim desenvolve projetos de identidade visual: entendimento, direção e aplicação." };

const steps = [
  { number: "01", title: "Entendimento", detail: "Começo pelo contexto: o que a marca faz, para quem ela fala, onde aparece e que percepção precisa construir. Essa conversa orienta o projeto antes das primeiras formas." },
  { number: "02", title: "Direção", detail: "Transformo esse entendimento em uma linguagem visual. Conceito, assinatura, tipografia, cores e composição são escolhidos para trabalhar juntos, com intenção." },
  { number: "03", title: "Aplicação", detail: "Uma identidade só ganha força quando funciona no uso. Testo a linguagem nos pontos de contato relevantes e organizo as orientações para que ela permaneça coerente." },
];

export default function ProcessPage() {
  return <main className="subpage approach-page">
    <header className="subpage-heading content-wrap"><span className="eyebrow"><span className="red-incision" aria-hidden="true" />Abordagem / como trabalho</span><h1>Forma com<br /><em>fundamento.</em></h1><p>O processo é claro para deixar espaço à criação. Cada decisão visual precisa responder ao contexto da marca.</p></header>
    <section className="process-steps content-wrap" aria-label="Etapas de um projeto de identidade visual">{steps.map(step => <article key={step.number}><span className="step-number">{step.number}</span><h2>{step.title}</h2><p>{step.detail}</p></article>)}</section>
    <section className="process-note"><div className="content-wrap"><span className="eyebrow"><span className="red-incision" aria-hidden="true" />O resultado</span><h2>Uma marca que se reconhece<br />em cada <em>expressão.</em></h2><a href="/work" className="text-link light-link">Ver projetos <span aria-hidden="true">↗</span></a></div></section>
    <section className="simple-cta content-wrap"><h2>Vamos dar forma à sua próxima etapa?</h2><a href="/contact" className="text-link">Conversar sobre o projeto <span aria-hidden="true">↗</span></a></section>
  </main>;
}
