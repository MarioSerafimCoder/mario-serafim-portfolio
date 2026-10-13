export const segments = ["medicos", "arquitetos", "outro"] as const;
export const stages = ["Começando atuação independente", "Já atuo e quero organizar minha marca", "Reposicionando minha atuação"] as const;
export const questions = [
  { title: "Você consegue explicar para quem trabalha e como quer ser reconhecido?", advice: "Escreva uma frase com seu público, sua atuação e a experiência que deseja oferecer." },
  { title: "Sua apresentação deixa clara sua área de atuação?", advice: "Revise sua biografia e sua apresentação. Destaque sua especialidade e informações profissionais verificáveis." },
  { title: "Sua marca usa as mesmas fontes, cores e assinatura em todos os canais?", advice: "Reúna suas peças atuais e defina uma referência única de tipografia, cores e assinatura." },
  { title: "As pessoas encontram facilmente seus canais de contato?", advice: "Teste o caminho entre sua apresentação e o contato. Evite informações desatualizadas ou links interrompidos." },
  { title: "Sua comunicação demonstra o que diferencia sua forma de trabalhar?", advice: "Descreva seu método com exemplos concretos. Evite promessas genéricas ou resultados que não possa comprovar." },
  { title: "Você tem uma apresentação profissional que pode enviar com confiança?", advice: "Organize uma apresentação curta com sua trajetória, atuação, método e contato." },
  { title: "Você possui orientações para manter sua identidade consistente?", advice: "Documente as regras básicas de uso da marca e revise novas peças antes de publicar." },
] as const;
export const answerLabels = ["Ainda não", "Em parte", "Sim, de forma consistente"] as const;
export function segmentQuestions(segment: string) {
  return questions.map((q, i) => ({ ...q, title: i === 1 ? (segment === "medicos" ? "Sua apresentação deixa claras sua especialidade e suas informações profissionais?" : "Seu portfólio deixa claros sua autoria e seu tipo de projeto?") : i === 5 ? (segment === "medicos" ? "Você tem uma apresentação profissional coerente entre perfil, consultório e canais digitais?" : "Você tem uma apresentação que conecta seus projetos à sua forma de pensar arquitetura?") : q.title }));
}
export function recommendations(answers: number[], segment = "") {
  return segmentQuestions(segment).map((q, i) => ({ ...q, score: answers[i], index: i })).filter(q => q.score < 2).sort((a, b) => a.score - b.score);
}
