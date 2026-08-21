"use client";

import { FormEvent, useState } from "react";
import { buildBriefing, buildMailtoUrl, buildWhatsAppUrl, contactConfig, type BriefingFields } from "../../data/contact";

function readText(data: FormData, key: string) {
  return String(data.get(key) ?? "").trim();
}

export default function ContactPage() {
  const [status, setStatus] = useState("Preencha os campos para gerar um briefing curto.");
  const [briefing, setBriefing] = useState("");
  const [subject, setSubject] = useState("");
  const [copyLabel, setCopyLabel] = useState("Copiar novamente");

  const copyBriefing = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyLabel("Copiado ✓");
      setStatus("Briefing copiado. Escolha como deseja enviá-lo.");
    } catch {
      setCopyLabel("Copiar novamente");
      setStatus("Não foi possível copiar automaticamente. Selecione o briefing ou use uma das opções de envio.");
    }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fields: BriefingFields = {
      name: readText(data, "name"),
      email: readText(data, "email"),
      company: readText(data, "company"),
      projectType: readText(data, "projectType"),
      budget: readText(data, "budget"),
      timeline: readText(data, "timeline"),
      message: readText(data, "message"),
    };
    const text = buildBriefing(fields);
    const nextSubject = `Novo projeto — ${fields.name}`;
    setBriefing(text);
    setSubject(nextSubject);
    setCopyLabel("Copiar novamente");
    await copyBriefing(text);
  };
  const mailtoUrl = briefing ? buildMailtoUrl(contactConfig.email, subject, briefing) : "";
  const whatsappUrl = briefing ? buildWhatsAppUrl(briefing, contactConfig.whatsapp) : "";

  return (
    <main className="inner-page dark-page">
      <header className="contact-hero">
        <p>06 / Contato</p><h1>Vamos<br />conversar.</h1><p>Tem um projeto que precisa de direção?<br />Compartilhe o essencial.</p>
      </header>
      <section className="contact-intro">
        <p>Antes de escrever</p>
        <h2>Contexto ajuda.</h2>
        <p>Conte o que está criando, em que momento o projeto está e qual tipo de direção seria útil. Curto e direto funciona muito bem.</p>
      </section>
      <form className="contact-form" onSubmit={submit}>
        <label htmlFor="name">Nome<input id="name" name="name" type="text" autoComplete="name" required /></label>
        <label htmlFor="email">E-mail<input id="email" name="email" type="email" autoComplete="email" required /></label>
        <label htmlFor="company">Empresa / Estúdio<input id="company" name="company" type="text" autoComplete="organization" /></label>
        <label htmlFor="project-type">Tipo de projeto<select id="project-type" name="projectType" required defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Identidade de marca</option><option>Campanha</option><option>Experiência digital</option><option>Direção criativa</option><option>Outro</option></select></label>
        <label htmlFor="budget">Investimento<select id="budget" name="budget" required defaultValue=""><option value="" disabled>Selecione uma faixa</option><option>R$ 5 mil — 15 mil</option><option>R$ 15 mil — 30 mil</option><option>R$ 30 mil+</option><option>Ainda não definido</option></select></label>
        <label htmlFor="timeline">Prazo<input id="timeline" name="timeline" type="text" placeholder="Quando precisa ser lançado?" /></label>
        <label htmlFor="message">Mensagem<textarea id="message" name="message" rows={6} required /></label>
        <button className="light-button" type="submit">Gerar briefing →</button>
        {!briefing && <p className="form-note" role="status" aria-live="polite">{status}</p>}
        {briefing && (
          <section className="briefing-success" aria-labelledby="briefing-ready-title">
            <div className="briefing-success__head"><span>Briefing pronto</span><strong id="briefing-ready-title">Pronto para enviar ✓</strong></div>
            <textarea className="briefing-output" readOnly value={briefing} aria-label="Briefing gerado" />
            <div className="briefing-actions">
              <a href={mailtoUrl} aria-label="Enviar briefing por e-mail">Enviar por e-mail ↗</a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Enviar briefing pelo WhatsApp">Enviar pelo WhatsApp ↗</a>
              <button type="button" onClick={() => copyBriefing(briefing)} aria-label="Copiar briefing novamente">{copyLabel}</button>
            </div>
            <p className="form-note" role="status" aria-live="polite">{status}</p>
          </section>
        )}
      </form>
      <section className="contact-expectations">
        <p>O que acontece depois</p>
        <div><span>01</span><strong>Aderência</strong><p>Revisão do contexto e do escopo.</p></div>
        <div><span>02</span><strong>Conversa</strong><p>Alinhamento de objetivos, prazo e modelo de trabalho.</p></div>
        <div><span>03</span><strong>Direção</strong><p>Definição do caminho criativo certo.</p></div>
      </section>
    </main>
  );
}
