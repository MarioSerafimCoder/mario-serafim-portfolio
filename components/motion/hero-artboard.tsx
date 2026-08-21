"use client";

import { useEffect, useRef } from "react";

export function HeroArtboard() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    let x = 50;
    let y = 50;
    const render = () => {
      section.style.setProperty("--hero-x", `${x}%`);
      section.style.setProperty("--hero-y", `${y}%`);
      title.style.transform = `translate3d(${(x - 50) * 0.035}px,${(y - 50) * 0.025}px,0) scaleX(${1 + Math.abs(x - 50) * 0.00025})`;
      frame = 0;
    };
    const move = (event: PointerEvent) => {
      const bounds = section.getBoundingClientRect();
      x = ((event.clientX - bounds.left) / bounds.width) * 100;
      y = ((event.clientY - bounds.top) / bounds.height) * 100;
      if (!frame) frame = requestAnimationFrame(render);
    };
    const leave = () => {
      x = 50;
      y = 50;
      if (!frame) frame = requestAnimationFrame(render);
    };
    section.addEventListener("pointermove", move, { passive: true });
    section.addEventListener("pointerleave", leave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero hero-artboard" aria-labelledby="hero-title">
      <div className="hero-procedural" aria-hidden="true">
        <span /><span /><span /><span /><span /><span />
      </div>
      <div className="hero-grid" aria-hidden="true">{Array.from({ length: 12 }, (_, index) => <i key={index} />)}</div>
      <div className="hero-frame" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="hero-system"><span>MS/ SISTEMA CRIATIVO — 2026</span><span>PRANCHA VIVA / 001</span></div>
      <h1 id="hero-title" ref={titleRef}><span>Mário</span><span>Serafim</span></h1>
      <div className="hero-foot">
        <p>Direção Criativa / Direção de Arte<br />Fortaleza — Brasil</p>
        <span className="hero-status"><i /> Sistema ativo</span>
        <span className="scroll-note">Role para organizar ↓</span>
      </div>
    </section>
  );
}
