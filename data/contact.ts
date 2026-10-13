export const contactConfig = {
  email: "marioserafim.da@gmail.com",
  whatsapp: "",
} as const;

export type BriefingFields = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
};

export function buildBriefing(fields: BriefingFields) {
  return [
    `Nome: ${fields.name}`,
    `E-mail: ${fields.email}`,
    `Empresa / Estúdio: ${fields.company || "—"}`,
    `Tipo de projeto: ${fields.projectType}`,
    `Investimento: ${fields.budget}`,
    `Prazo: ${fields.timeline || "—"}`,
    `Mensagem: ${fields.message}`,
  ].join("\n");
}

export function buildMailtoUrl(recipient: string, subject: string, briefing: string) {
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(briefing)}`;
}

export function buildWhatsAppUrl(briefing: string, recipient = "") {
  const number = recipient.replace(/\D/g, "");
  const base = number ? `https://wa.me/${number}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(briefing)}`;
}
