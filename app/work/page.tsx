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
        <p>Quatro sistemas visuais com lógicas próprias de matéria, refração, divisão e organização.</p>
      </header>

      <section className="work-statement">
        <p>Abordagem / 2026</p>
        <h2>Da ideia<br />ao sistema.</h2>
        <p>Direção é o fio que conecta estratégia, imagem, tipografia, movimento e produto. Cada projeto funciona como uma publicação editorial concisa.</p>
      </section>

      <ContactSheet projects={projects} />
    </main>
  );
}
