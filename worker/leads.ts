import { stages } from "../data/diagnostic.ts";

type Statement = { bind(...values: unknown[]): Statement; run(): Promise<unknown>; first<T>(): Promise<T | null> };
export type LeadDatabase = { prepare(sql: string): Statement; batch(statements: Statement[]): Promise<unknown> };
export type LeadEnv = { DB?: LeadDatabase; LEAD_CAPTURE_ENABLED?: string; STUDIO_CONTACT_EMAIL?: string; RATE_LIMIT_SALT?: string };
const reply = (status: number, value: object) => Response.json(value, { status, headers: { "Cache-Control": "no-store" } });
const fail = (status: number, error: string) => reply(status, { error });
export async function captureLead(request: Request, env: LeadEnv) {
  if (request.method !== "POST") return fail(405, "Método não permitido.");
  if (request.headers.get("origin") !== new URL(request.url).origin) return fail(403, "Origem não permitida.");
  if (!request.headers.get("content-type")?.startsWith("application/json")) return fail(415, "Formato inválido.");
  if (!env.DB || env.LEAD_CAPTURE_ENABLED !== "true" || !env.RATE_LIMIT_SALT || !env.STUDIO_CONTACT_EMAIL?.includes("@")) return fail(503, "O cadastro está indisponível. Nenhum envio foi confirmado. Tente novamente mais tarde.");
  let body: Record<string, unknown>;
  try {
    const reader = request.body?.getReader();
    if (!reader) return fail(400, "Dados ausentes.");
    const chunks: Uint8Array[] = []; let size = 0;
    while (true) { const { value, done } = await reader.read(); if (done) break; size += value.length; if (size > 16000) { await reader.cancel(); return fail(413, "Mensagem muito longa."); } chunks.push(value); }
    const bytes = new Uint8Array(size); let at = 0; for (const chunk of chunks) { bytes.set(chunk, at); at += chunk.length; }
    body = JSON.parse(new TextDecoder().decode(bytes));
    if (!body || Array.isArray(body) || typeof body !== "object") return fail(400, "Dados inválidos.");
  } catch { return fail(400, "Dados inválidos."); }
  const str = (key: string) => typeof body[key] === "string" ? (body[key] as string).trim() : "";
  const name = str("name"), email = str("email").toLowerCase(), segment = str("segment"), stage = str("stage"), kind = str("kind"), message = str("message");
  if (str("website")) return fail(400, "Não foi possível validar o envio.");
  if (name.length < 2 || name.length > 100 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail(422, "Revise seu nome e e-mail.");
  if (!["medicos", "arquitetos", "outro"].includes(segment) || !(stages.some(s => s === stage) || (kind === "contact" && stage === "Contato inicial")) || !["diagnostic", "contact"].includes(kind)) return fail(422, "Revise segmento e estágio profissional.");
  if (body.serviceConsent !== true || typeof body.marketingConsent !== "boolean") return fail(422, "Confirme a autorização para este atendimento.");
  if (message.length > 3000 || (kind === "contact" && message.length < 10)) return fail(422, "Escreva uma mensagem entre 10 e 3.000 caracteres.");
  const answers = body.answers;
  if (kind === "diagnostic" && (!Array.isArray(answers) || answers.length !== 7 || answers.some(a => !Number.isInteger(a) || a < 0 || a > 2) || segment === "outro")) return fail(422, "Responda às sete perguntas do diagnóstico.");
  const campaign: Record<string, string> = {};
  if (body.campaign && typeof body.campaign === "object") for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) { const value = (body.campaign as Record<string, unknown>)[key]; if (typeof value === "string") campaign[key] = value.slice(0, 150); }
  try {
    const now = Date.now();
    const source = request.headers.get("CF-Connecting-IP") || "local";
    const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${env.RATE_LIMIT_SALT}:${source}:${Math.floor(now / 3600000)}`));
    const key = Array.from(new Uint8Array(hash), n => n.toString(16).padStart(2, "0")).join("");
    const limit = await env.DB.prepare("INSERT INTO lead_rate_limits(key,count,expires) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count").bind(key, now + 3600000).first<{ count: number }>();
    if (!limit || limit.count > 10) return fail(429, "Muitos envios. Tente novamente em uma hora.");
    const id = crypto.randomUUID(), timestamp = new Date(now).toISOString();
    await env.DB.batch([
      env.DB.prepare("INSERT INTO leads(id,email,name,created_at,updated_at) VALUES (?,?,?,?,?) ON CONFLICT(email) DO UPDATE SET name=excluded.name,updated_at=excluded.updated_at").bind(crypto.randomUUID(), email, name, timestamp, timestamp),
      env.DB.prepare("INSERT INTO lead_submissions(id,lead_id,kind,segment,stage,message,answers_json,campaign_json,service_consent,marketing_consent,consent_version,created_at) SELECT ?,id,?,?,?,?,?,?,?,?,?,? FROM leads WHERE email=?").bind(id, kind, segment, stage, message, JSON.stringify(kind === "diagnostic" ? answers : []), JSON.stringify(campaign), 1, body.marketingConsent ? 1 : 0, "2026-10-13", timestamp, email),
      env.DB.prepare("DELETE FROM lead_rate_limits WHERE expires < ?").bind(now),
    ]);
    return reply(201, { saved: true, receipt: id });
  } catch { return fail(503, "Não foi possível salvar. Suas informações continuam no formulário para tentar novamente."); }
}
