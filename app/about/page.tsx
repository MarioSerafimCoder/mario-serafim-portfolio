import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sobre — Mário Serafim", description: "Mário Serafim é Diretor Criativo e Diretor de Arte em Fortaleza, Brasil." };

const capabilities = ["Direção criativa", "Direção de arte", "Sistemas de marca", "Campanhas", "Produtos digitais", "Design visual", "Motion", "Estratégia criativa"];

export default function AboutPage() {
  return (
    <main className="inner-page">
      <header className="about-hero"><p>04 / Sobre</p><h1>Direção<br />criativa<br /><em>é uma forma</em><br />de pensar.</h1></header>
      <section className="about-intro">
        <h2>Mário Serafim</h2>
        <p>Diretor Criativo / Diretor de Arte<br />Fortaleza — Brasil</p>
        <p>Atuo entre identidade, campanhas e produtos digitais, conectando ideias a sistemas visuais claros. Uma biografia profissional completa e verificada será adicionada antes do lançamento final.</p>
      </section>
      <section className="about-philosophy">
        <p>Ponto de vista</p>
        <h2>Deixar claro.<br />Tornar memorável.<br /><em>Fazer tudo conversar.</em></h2>
        <p>Direção não é decoração. É o conjunto de decisões que dá forma, tom, ritmo e consistência a uma ideia.</p>
      </section>
      <section className="capabilities"><p>Áreas de atuação</p>{capabilities.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}</section>
      <section className="about-record">
        <p>Trajetória profissional</p>
        {["Experiência", "Clientes selecionados", "Ferramentas", "Reconhecimento"].map((item) => <div key={item}><h3>{item}</h3><p>[Adicionar informação verificada]</p></div>)}
      </section>
      <section className="about-contact"><p>Disponível para projetos e colaborações selecionados.</p><h2>Tem uma ideia<br />que precisa de direção?</h2><a href="/contact">Iniciar um projeto ↗</a></section>
    </main>
  );
}
