export const storyChapters = [
  { id: "idea", number: "01", label: "Ideia", title: "Tudo começa em aberto.", body: "Fragmentos, matéria e possibilidades ainda sem hierarquia.", poster: "/media/narrative/matter.webp" },
  { id: "direction", number: "02", label: "Direção", title: "Escolher cria significado.", body: "Um eixo define o que permanece, o que sai e como tudo se relaciona.", poster: "/media/narrative/direction.webp" },
  { id: "system", number: "03", label: "Sistema", title: "A decisão ganha escala.", body: "Regras visuais transformam uma ideia em linguagem consistente.", poster: "/media/narrative/system.webp" },
  { id: "experience", number: "04", label: "Experiência", title: "O sistema encontra o mundo.", body: "Marca, campanha, produto e movimento passam a falar a mesma língua.", poster: "/media/narrative/system.webp" },
] as const;

export function storyScene(progress: number) {
  return progress < 0.25 ? 0 : progress < 0.5 ? 1 : progress < 0.75 ? 2 : 3;
}

// Segment time independently from scroll distance: motion, deceleration and holds.
export function storyTime(progress: number, duration: number) {
  const p = Math.max(0, Math.min(1, progress));
  const points = [[0, 0], [.08, 0], [.25, .24], [.32, .24], [.5, .5], [.57, .5], [.75, .76], [.9, .98], [1, .98]];
  for (let i = 1; i < points.length; i++) {
    const [end, time] = points[i];
    const [start, before] = points[i - 1];
    if (p <= end) return (before + (time - before) * (p - start) / (end - start)) * duration;
  }
  return duration * .98;
}
