import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";


import { ProjectVisual } from "../../../components/projects/project-visual";
import { ChapterNavigation } from "../../../components/projects/chapter-navigation";
import { getProject, projects } from "../../../data/projects";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.title} — Mário Serafim`,
    description: project.description,
    openGraph: { title: `${project.title} — Mário Serafim`, description: project.description, images: [] },
    twitter: { title: `${project.title} — Mário Serafim`, description: project.description, images: [] },
  };
}



export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const caseStyle = { "--case-accent": project.accent } as CSSProperties;
  const narratives = {
    granistone: {
      why: "Converter a presença física da matéria em uma linguagem de marca com peso, precisão e clareza.",
      idea: "Tratar cada plano como uma unidade: sólido sozinho, mais expressivo quando encontra um eixo comum.",
      world: "Escala arquitetônica, cinzas minerais, superfícies táteis e um vermelho que organiza o olhar.",
      motion: "Os módulos se aproximam, alinham e abrem espaço. O movimento demonstra a lógica do sistema.",
      result: "Uma identidade capaz de manter a mesma presença entre marca, campanha e experiência digital.",
    },
    "queen-aquamarine": {
      why: "Dar precisão a uma identidade expressiva sem perder transparência, escala e caráter editorial.",
      idea: "Usar refração como princípio: uma forma muda de leitura quando atravessa diferentes superfícies.",
      world: "Vidro aquamarine, prata, luz controlada e tipografia em contraste constroem um universo preciso.",
      motion: "Camadas giram em ritmos diferentes e revelam novas relações sem romper a unidade visual.",
      result: "Um sistema flexível para identidade e campanha, reconhecível pela luz, pela escala e pelo recorte.",
    },
    fenda: {
      why: "Criar uma campanha que aceite mudança de formato sem perder tensão, ritmo ou reconhecimento.",
      idea: "A divisão deixa de ser ruptura e vira estrutura: uma fenda revela, enquadra e conduz a mensagem.",
      world: "Painéis, cortes tipográficos, preto, papel e um eixo vermelho transformam contraste em linguagem.",
      motion: "Aberturas e fechamentos curtos adaptam a mesma ideia a telas, peças horizontais e composições editoriais.",
      result: "Uma linguagem modular de campanha preparada para variar com consistência entre formatos.",
    },
    "common-ground": {
      why: "Tornar informação complexa legível e criar um espaço comum para diferentes conteúdos e pessoas.",
      idea: "Organizar sem endurecer: cada módulo tem função própria, mas participa de uma grade compartilhada.",
      world: "Superfícies calmas, tipografia funcional e intervalos generosos deixam a hierarquia trabalhar.",
      motion: "Mudanças de estado são discretas e ajudam a perceber relação, prioridade e continuidade.",
      result: "Um produto digital coeso, onde sistema visual e clareza de uso operam como a mesma decisão.",
    },
  } as const;
  const narrative = narratives[project.slug as keyof typeof narratives];
  const chapters = [
    { number: "01", slug: "impact", title: "Impacto" },
    { number: "02", slug: "why", title: "Por quê" },
    { number: "03", slug: "idea", title: "A ideia" },
    { number: "04", slug: "world", title: "O universo" },
    { number: "05", slug: "motion", title: "Em movimento" },
    { number: "06", slug: "result", title: "Resultado" },
  ];

  return (
    <main className="case-page" style={caseStyle}>
      <header className="case-hero" id="impact">
        <div className="case-labels">
          <span>Projeto / {project.id}</span>
          <span>{project.categories.join(" · ")}</span>
          <span>{project.year}</span>
        </div>
        <h1>{project.title}</h1>
        <ProjectVisual project={project} context="hero" className="case-cover" />
      </header>

      <section className="case-intro" aria-label="Visão geral do projeto">
        <div><span>Papel</span><p>{project.role}</p></div>
        <div><span>Ano</span><p>{project.year}</p></div>
        <h2>{project.description}</h2>
      </section>

      <ChapterNavigation chapters={chapters} />

      <section className="case-chapter case-chapter-02" id="why"><span>02 / Por quê</span><h2>Antes da forma,<br />a razão.</h2><p>{narrative.why}</p></section>
      <section className="case-chapter case-chapter-03" id="idea"><span>03 / A ideia</span><h2>Uma decisão<br />central.</h2><p>{narrative.idea}</p><ProjectVisual project={project} context="preview" className="case-chapter-visual" /></section>
      <section className="case-world" id="world"><div><span>04 / Construindo o universo</span><h2>{narrative.world}</h2></div><ProjectVisual project={project} context="preview" /><ProjectVisual project={project} context="preview" /></section>
      <section className="case-chapter case-chapter-04" id="motion"><span>05 / Sistema em movimento</span><h2>Repetir sem<br />se repetir.</h2><p>{narrative.motion}</p><ProjectVisual project={project} context="preview" className="case-chapter-visual" /></section>
      <section className="case-result" id="result"><span>06 / Resultado</span><h2>{narrative.result}</h2><a href="/contact">Conversar sobre um projeto ↗</a></section>

      <nav className="case-navigation" aria-label="Navegação entre projetos">
        <a href={`/work/${previous.slug}`}><span>Projeto anterior</span><strong>{previous.title}</strong></a>
        <a href={`/work/${next.slug}`}><span>Próximo projeto</span><strong>{next.title}</strong></a>
      </nav>
    </main>
  );
}

