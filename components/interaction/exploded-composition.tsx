"use client";

import { useEffect, useRef } from "react";

export function ExplodedComposition() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let frame = 0;
    let amount = 0;
    const render = () => {
      element.style.setProperty("--explode", amount.toFixed(3));
      frame = 0;
    };
    const move = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      amount = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
      if (!frame) frame = requestAnimationFrame(render);
    };
    const reset = () => {
      amount = 0;
      if (!frame) frame = requestAnimationFrame(render);
    };
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerleave", reset);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <div className="exploded-composition" ref={ref} data-cursor="EXPANDIR" aria-label="Composição de direção de arte interativa">
      <span className="explode-type">TIPOGRAFIA</span>
      <span className="explode-image">IMAGEM</span>
      <span className="explode-grid">GRADE</span>
      <span className="explode-color">COR</span>
      <span className="explode-symbol">MS/</span>
      <p>DIREÇÃO DE ARTE É A COMBINAÇÃO INTENCIONAL DE SISTEMAS.</p>
    </div>
  );
}
