import type { Metadata } from "next";

export const metadata: Metadata = { title: "Laboratório — Mário Serafim", description: "Experimentos visuais, protótipos e pesquisa criativa." };

const experiments = [
  { number: "01", title: "Campo Tipográfico Variável", status: "Experimento", note: "Tipografia / Movimento", format: "square" },
  { number: "02", title: "Estudos de Lógica Visual", status: "Pesquisa", note: "Sistemas de imagem / IA", format: "portrait" },
  { number: "03", title: "Interface Editorial", status: "Protótipo", note: "Produto / Interação", format: "wide" },
  { number: "04", title: "Identidades em Movimento", status: "Pesquisa", note: "Marca / Movimento", format: "landscape" },
];

export default function LabPage() {
  return (
    <main className="inner-page dark-page">
      <header className="page-hero lab-hero"><p>03 / Experimentos</p><h1>Laboratório.</h1><p>Um espaço para perguntas abertas, testes visuais e trabalhos autorais.</p></header>
      <section className="lab-manifesto"><p>Método de trabalho</p><h2>Testar rápido.<br />Guardar o essencial.</h2><p>O Laboratório é intencionalmente menos resolvido que os Projetos. Ele documenta pesquisas em andamento sem tratar todo experimento como case finalizado.</p></section>
      <section className="lab-grid">
        {experiments.map((experiment, index) => (
          <article key={experiment.title} className={`lab-item lab-${index + 1}`}>
            <div className={`lab-placeholder lab-format-${experiment.format}`} role="img" aria-label={`Espaço reservado para ${experiment.title}`}>
              <span>{experiment.number}</span><strong>{experiment.title}</strong><small>Material do experimento em preparação</small>
            </div>
            <div className="lab-meta"><p>{experiment.status} / Em andamento</p><span>{experiment.note}</span></div>
          </article>
        ))}
      </section>
      <section className="lab-status"><p>Legenda de status</p>{["Experimento","Pesquisa","Protótipo","Publicado"].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}</section>
    </main>
  );
}
