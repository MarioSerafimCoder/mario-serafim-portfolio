"use client";

import { useState, type FormEvent } from "react";
import { readCampaign } from "../data/campaign";

export function ContactForm() {
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true); setError("");
    const data = new FormData(event.currentTarget);
    const brand = String(data.get("brand") || "").trim();
    const summary = String(data.get("message") || "").trim();
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"), email: data.get("email"), segment: "outro",
          stage: "Contato inicial", kind: "contact", answers: [],
          message: `Marca/empresa: ${brand}\n\nProjeto: ${summary}`,
          website: data.get("website"), campaign: readCampaign(),
          serviceConsent: data.get("serviceConsent") === "on", marketingConsent: false,
        }),
      });
      const result = await response.json();
      if (!response.ok || result.saved !== true) throw new Error(result.error || "Não foi possível confirmar o envio.");
      setSent(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível enviar agora. Tente novamente ou escreva por e-mail.");
    } finally { setBusy(false); }
  }

  if (sent) return <section className="contact-form success" role="status"><span className="eyebrow"><span className="red-incision" aria-hidden="true" />Mensagem registrada</span><h2>Conversa iniciada.</h2><p>Seu contato foi salvo. Mário poderá responder pelo e-mail informado para conhecer o projeto.</p><a className="text-link" href="/work">Voltar aos projetos <span aria-hidden="true">↗</span></a></section>;

  return <form className="contact-form" onSubmit={submit}>
    <span className="eyebrow"><span className="red-incision" aria-hidden="true" />Escreva uma mensagem</span>
    <div className="form-row"><label>Seu nome<input name="name" autoComplete="name" minLength={2} maxLength={100} required placeholder="Como podemos chamar você?" /></label><label>E-mail<input name="email" type="email" autoComplete="email" maxLength={254} required placeholder="voce@exemplo.com" /></label></div>
    <label>Empresa ou marca<input name="brand" maxLength={120} required placeholder="Nome da marca" /></label>
    <label>Sobre o projeto<textarea name="message" minLength={10} maxLength={2700} rows={5} required placeholder="Conte brevemente o que você deseja desenvolver." /></label>
    <div className="form-trap" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <label className="privacy-consent"><input name="serviceConsent" type="checkbox" required /><span>Autorizo o uso dos meus dados para responder a esta solicitação, conforme a <a href="/privacy">política de privacidade</a>.</span></label>
    {error && <p className="form-error" role="alert">{error} <a href="mailto:marioserafim.da@gmail.com">Escrever por e-mail ↗</a></p>}
    <button type="submit" disabled={busy}>{busy ? "Enviando…" : "Enviar mensagem"} <span aria-hidden="true">↗</span></button>
  </form>;
}
