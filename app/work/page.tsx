import type { Metadata } from "next";
import { ContactSheet } from "../../components/projects/contact-sheet";
import { projects } from "../../data/projects";

export const metadata: Metadata = {
  title: "Projetos — Mário Serafim",
  description: "Projetos selecionados de direção criativa, direção de arte e experiências digitais.",
};

export default function WorkPage() {
  return (
    <main className="inner-page work-page">
      <header className="page-hero work-hero">
        <p>01 / FOLHA DE CONTATO</p>
        <h1>Projetos.</h1>
        <p>Identidade, campanha e produto. Quatro trabalhos, vistos de perto.</p>
      </header>

      <ContactSheet projects={projects} />
      <section className="work-statement">
        <p>Abordagem / 2026</p>
        <h2>Da matéria<br />ao uso.</h2>
        <p>A escala e o contexto mudam. A direção acompanha: escolho a linguagem, testo as aplicações e cuido da execução.</p>
      </section>
    </main>
  );
}

