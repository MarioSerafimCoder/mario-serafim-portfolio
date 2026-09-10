import type { Metadata } from "next";
import { ExplodedComposition } from "../../components/interaction/exploded-composition";
import { profile } from "../../content/profile";

export const metadata: Metadata = { title: "About — Mário Serafim", description: "Conheça Mário Serafim, Creative Director e Art Director baseado em Fortaleza, Brasil." };

const capabilities = ["Creative direction", "Art direction", "Brand identity", "Campaigns", "Digital products", "Motion", "Creative strategy", "Generative workflows"];

export default function AboutPage() {
  return (
    <main className="inner-page">
      <header className="about-hero about-artboard"><p>04 / ABOUT</p><h1>Mário,<br /><em>em contexto.</em></h1><div className="about-tags" aria-label="Perfil"><span>CREATIVE DIRECTOR</span><span>ART DIRECTOR</span><span>FORTALEZA — BRAZIL</span><span>GRANISTONE A ROCHA</span></div></header>
      <section className="about-intro about-intro--profile"><p className="eyebrow">MÁRIO SERAFIM</p><div><h2>{profile.role}</h2><p>{profile.intro}</p><p>Hoje, atua na Granistone A Rocha. Sua prática combina repertório editorial, clareza de produto e experimentação com imagem e movimento.</p></div></section>
      <section className="about-philosophy">
        <p>Ponto de vista</p>
        <h2>Escolher.<br />Editar.<br /><em>Fazer conversar.</em></h2>
        <p>O trabalho começa por entender o que importa. Depois vêm as escolhas de forma, tom e ritmo que dão unidade ao conjunto.</p>
      </section>
      <section className="about-exploded"><p>Como eu penso</p><ExplodedComposition /></section>
      <section id="experience" className="about-record" aria-labelledby="experience-title"><div className="section-head"><p className="eyebrow">EXPERIENCE / SELECTED</p><span>Dados públicos confirmados</span></div><h2 id="experience-title">Presente e<br /><em>repertório.</em></h2><div className="record-list">{profile.experience.map(item => <article key={item.place}><span>{item.period}</span><div><h3>{item.role}</h3><p>{item.place}</p><p>{item.detail}</p></div></article>)}</div></section>
      <section className="about-knowledge" aria-labelledby="knowledge-title"><div><p className="eyebrow">EDUCATION / KNOWLEDGE</p><h2 id="knowledge-title">Aprender também<br />é parte do trabalho.</h2></div><div className="knowledge-list">{profile.education.map(item => <article key={`${item.period}-${item.place}`}><span>{item.period}</span><h3>{item.title}</h3><p>{item.place}</p></article>)}</div></section>
      <section className="about-talk" aria-labelledby="talk-title"><p className="eyebrow">TALKS / COMMUNITY</p><div><span>{profile.talks[0].period}</span><h2 id="talk-title">{profile.talks[0].title}</h2><p>{profile.talks[0].place}</p></div></section>
      <section className="outside-section outside-section--about" aria-labelledby="about-outside-title"><div className="outside-heading"><p className="eyebrow">OUTSIDE THE GRID</p><h2 id="about-outside-title">O que existe<br /><em>entre os projetos.</em></h2><p>Este arquivo pessoal está sendo preparado. Os espaços abaixo indicam o que será reunido sem preencher lacunas com histórias inventadas.</p></div><div className="outside-grid">{profile.outside.map(item => <article key={item.index}><span>{item.index}</span><h3>{item.title}</h3><p>{item.note}</p></article>)}</div></section>
      <section className="capabilities"><p>Áreas de atuação</p>{capabilities.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}</section>
      <section className="profile-links" aria-label="Contato e perfis profissionais"><a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href={profile.links.behance} target="_blank" rel="noopener noreferrer">Behance ↗</a><a href={profile.links.email}>E-mail ↗</a></section>
      <section className="about-contact"><p>Disponível para colaborações selecionadas.</p><h2>Tem um projeto<br />em curso?</h2><a href="/contact">Compartilhar o essencial ↗</a></section>
    </main>
  );
}
