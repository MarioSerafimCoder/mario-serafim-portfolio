"use client";
import { useState, useRef, useEffect, type FormEvent } from "react";
import { segmentQuestions, answerLabels, recommendations, stages } from "../data/diagnostic";
import { readCampaign } from "../data/campaign";

export function LeadForm({ diagnostic = false, initialSegment = "" }: { diagnostic?: boolean; initialSegment?: string }) {
  const [segment, setSegment] = useState(initialSegment);
  const questions = segmentQuestions(segment);
  const [answers, setAnswers] = useState<number[]>(Array(7).fill(-1));
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [report, setReport] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const resultHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { if (saved || report) resultHeading.current?.focus(); }, [saved, report]);
  const changeStep = (next: number) => { setStep(next); setError(""); requestAnimationFrame(() => heading.current?.focus()); };
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (busy) return;
    setBusy(true); setError("");
    const data = new FormData(event.currentTarget);
    const campaign = readCampaign();
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: data.get("name"), email: data.get("email"), stage: data.get("stage"), segment, kind: diagnostic ? "diagnostic" : "contact", answers, message: data.get("message") || "", website: data.get("website"), campaign, serviceConsent: data.get("serviceConsent") === "on", marketingConsent: data.get("marketingConsent") === "on" }) });
      const result = await response.json();
      if (!response.ok || result.saved !== true) throw new Error(result.error || "Não foi possível confirmar o cadastro.");
      setSaved(true); setReport(diagnostic);
    } catch (e) { setError(e instanceof Error ? e.message : "Falha de conexão. Tente novamente."); }
    finally { setBusy(false); }
  }
  if (saved || report) return <section className="lead-result" aria-live="polite"><p className="eyebrow">{saved ? "Cadastro confirmado" : "Relatório local / cadastro não concluído"}</p><h2 ref={resultHeading} tabIndex={-1}>{diagnostic ? "Seu próximo passo." : "Conversa iniciada."}</h2><p>{saved ? "Suas informações foram salvas. Mário poderá entrar em contato pelo e-mail informado para entender seu contexto." : "Este relatório foi gerado no seu navegador. Seus dados não foram cadastrados."}</p>{diagnostic && <><p>Esta é uma leitura das suas respostas, sem análise de materiais ou avaliação técnica da sua marca. O relatório não é enviado por e-mail.</p><h3>Prioridades para sua marca</h3>{recommendations(answers, segment).length ? <ol>{recommendations(answers, segment).map(q => <li key={q.index}><strong>{q.title}</strong><p>{q.advice}</p></li>)}</ol> : <p>Você indicou consistência em todos os pontos. Revise suas peças lado a lado e peça a alguém do seu público para explicar o que entendeu da sua apresentação.</p>}<p>{segment === "medicos" ? "Revise também as regras profissionais aplicáveis à sua comunicação médica antes de publicar." : "Apresente autoria e participação com clareza em cada projeto do seu portfólio."}</p><a className="editorial-link" href="/contact">Quero conversar sobre branding ↗</a></>}</section>;
  return <div className="lead-flow">
    <label className="lead-segment" htmlFor="segment">Sua área<select id="segment" value={segment} required onChange={e => setSegment(e.target.value)}><option value="">Selecione</option><option value="medicos">Medicina</option><option value="arquitetos">Arquitetura</option>{!diagnostic && <option value="outro">Outra área</option>}</select></label>
    {diagnostic && <><p className="eyebrow">Etapa {step + 1} de 8</p><progress value={step + 1} max={8} aria-label={`Etapa ${step + 1} de 8`} />{step < 7 && <section className="question"><h2 ref={heading} tabIndex={-1}>{questions[step].title}</h2><fieldset><legend>Sua resposta</legend>{answerLabels.map((label, value) => <label key={label}><input type="radio" name={`answer-${step}`} checked={answers[step] === value} onChange={() => setAnswers(current => current.map((a, i) => i === step ? value : a))} />{label}</label>)}</fieldset><div className="flow-actions">{step > 0 && <button type="button" onClick={() => changeStep(step - 1)}>Voltar</button>}<button type="button" onClick={() => { if (!segment || answers[step] < 0) setError("Selecione sua área e uma resposta para continuar."); else changeStep(step + 1); }}>Continuar →</button></div></section>}</>}
    <form className="lead-fields" onSubmit={submit} hidden={diagnostic && step < 7}>
      <h2 ref={diagnostic && step === 7 ? heading : undefined} tabIndex={-1}>{diagnostic ? "Para concluir." : "Conte o essencial."}</h2>
      <label>Nome<input name="name" autoComplete="name" minLength={2} maxLength={100} required /></label>
      <label>E-mail<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
      <label>Estágio profissional<select name="stage" required defaultValue=""><option value="" disabled>Selecione</option>{stages.map(s => <option key={s}>{s}</option>)}</select></label>
      {!diagnostic && <label>O que você deseja construir?<textarea name="message" minLength={10} maxLength={3000} rows={4} required /></label>}
      <div className="form-trap" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="consent"><input name="serviceConsent" type="checkbox" required />Autorizo o uso dos dados para {diagnostic ? "registrar este diagnóstico" : "responder a esta solicitação"}, conforme a política de privacidade.</label>
      <label className="consent"><input name="marketingConsent" type="checkbox" />Quero receber conteúdos e comunicações comerciais de Mário Serafim (opcional).</label>
      <p className="form-note">Não inclua dados de pacientes ou informações sensíveis. <a href="/privacy">Leia a política de privacidade ↗</a></p>
      <div className="flow-actions">{diagnostic && <button type="button" onClick={() => changeStep(6)}>Voltar</button>}<button type="submit" disabled={busy || !segment}>{busy ? "Salvando…" : diagnostic ? "Concluir e ver relatório →" : "Enviar mensagem →"}</button></div>
    </form>
    {error && <div role="alert"><p>{error}</p>{diagnostic && step === 7 && <button type="button" onClick={() => setReport(true)}>Ver recomendações sem cadastro</button>}</div>}
  </div>;
}
