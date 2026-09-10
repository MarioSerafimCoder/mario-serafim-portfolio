"use client";

import { useEffect, useRef } from "react";

export function ExplodedComposition() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
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
    if (finePointer) {
      element.addEventListener("pointermove", move, { passive: true });
      element.addEventListener("pointerleave", reset);
      return () => {
        if (frame) cancelAnimationFrame(frame);
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", reset);
      };
    }

    if (!("IntersectionObserver" in window)) return;
    let visible = false;
    const updateFromScroll = () => {
      if (!visible) return;
      const rect = element.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      amount = Math.sin(progress * Math.PI);
      if (!frame) frame = requestAnimationFrame(render);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) updateFromScroll();
    }, { rootMargin: "12% 0px", threshold: [0, 0.25, 0.6] });
    observer.observe(element);
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", updateFromScroll);
    };
  }, []);

  return (
    <div className="exploded-composition" ref={ref} data-cursor="EXPANDIR" aria-label="Composição de direção de arte interativa">
      <span className="explode-type">TIPOGRAFIA</span>
      <span className="explode-image">IMAGEM</span>
      <span className="explode-grid">GRADE</span>
      <span className="explode-color">COR</span>
      <span className="explode-symbol">MS/</span>
      <p>TIPO, IMAGEM, COR. A RELAÇÃO ENTRE ELES É UMA ESCOLHA.</p>
    </div>
  );
}
