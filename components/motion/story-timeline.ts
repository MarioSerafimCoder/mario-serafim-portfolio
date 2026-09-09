export const storyChapters = [
  { id: "materia", number: "01", label: "Matéria", title: "Toda ideia começa em aberto.", body: "Forma, textura e possibilidades.", poster: "/media/narrative/matter.webp" },
  { id: "direcao", number: "02", label: "Direção", title: "Direção é escolher o que fica.", body: "Um eixo. Um ritmo. Uma intenção.", poster: "/media/narrative/direction.webp" },
  { id: "sistema", number: "03", label: "Sistema", title: "Uma ideia. Um universo.", body: "Identidade, campanhas e experiências digitais.", poster: "/media/narrative/system.webp" },
] as const;

export function storyScene(progress: number) {
  return progress < 0.34 ? 0 : progress < 0.7 ? 1 : 2;
}

// Segment time independently from scroll distance: motion, deceleration and holds.
export function storyTime(progress: number, duration: number) {
  const p = Math.max(0, Math.min(1, progress));
  const points = [[0, 0], [.1, 0], [.34, .35], [.44, .35], [.7, .75], [.9, .98], [1, .98]];
  for (let i = 1; i < points.length; i++) {
    const [end, time] = points[i];
    const [start, before] = points[i - 1];
    if (p <= end) return (before + (time - before) * (p - start) / (end - start)) * duration;
  }
  return duration * .98;
}
