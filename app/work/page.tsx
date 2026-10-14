import type { Metadata } from "next";
import { ProjectGrid } from "../../components/editorial-projects";
import { projects } from "../../data/projects";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Projetos selecionados de identidade visual e direção de arte de Mário Serafim.",
};

export default function WorkPage() {
  return <main className="subpage work-page content-wrap">
    <header className="subpage-heading"><span className="eyebrow"><span className="red-incision" aria-hidden="true" />Portfólio / projetos</span><h1>Identidades com<br /><em>presença.</em></h1><p>Uma seleção de marcas desenhadas para comunicar com clareza e permanecer na memória.</p></header>
    <ProjectGrid projects={projects} />
    <section className="work-end"><p>O próximo projeto começa por uma conversa.</p><a href="/contact" className="text-link">Fale sobre sua marca <span aria-hidden="true">↗</span></a></section>
  </main>;
}
