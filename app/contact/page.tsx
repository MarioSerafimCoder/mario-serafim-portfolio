"use client";

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };
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
        <label htmlFor="email">Email<input id="email" name="email" type="email" autoComplete="email" required /></label>
        <label htmlFor="company">Empresa / Estúdio<input id="company" name="company" type="text" autoComplete="organization" /></label>
        <label htmlFor="project-type">Tipo de projeto<select id="project-type" name="projectType" required defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Identidade de marca</option><option>Campanha</option><option>Experiência digital</option><option>Direção criativa</option><option>Outro</option></select></label>
        <label htmlFor="budget">Investimento<select id="budget" name="budget" required defaultValue=""><option value="" disabled>Selecione uma faixa</option><option>R$ 5 mil — 15 mil</option><option>R$ 15 mil — 30 mil</option><option>R$ 30 mil+</option><option>Ainda não definido</option></select></label>
        <label htmlFor="timeline">Prazo<input id="timeline" name="timeline" type="text" placeholder="Quando precisa ser lançado?" /></label>
        <label htmlFor="message">Mensagem<textarea id="message" name="message" rows={6} required /></label>
        <button className="light-button" type="submit">Enviar contato →</button>
        <p className="form-note" role="status" aria-live="polite">{sent ? "Contato registrado em modo de demonstração. O envio por e-mail será conectado antes do lançamento." : "Modo de demonstração — este formulário ainda não envia e-mail."}</p>
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
