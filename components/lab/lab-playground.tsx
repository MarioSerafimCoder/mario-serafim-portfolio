"use client";

import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { FrameCorners } from "../interaction/frame-corners";

export function LabPlayground() {
  const [columns, setColumns] = useState(6);
  const typeRef = useRef<HTMLDivElement>(null);
  const identityRef = useRef<HTMLDivElement>(null);
  const typeFrame = useRef(0);
  const identityFrame = useRef(0);
  const coarsePointer = useRef(false);

  useEffect(() => {
    coarsePointer.current = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const element = typeRef.current;
    if (!coarsePointer.current || !element || !("IntersectionObserver" in window)) return;
    let visible = false;
    const update = () => {
      if (!visible) return;
      const rect = element.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      if (typeFrame.current) cancelAnimationFrame(typeFrame.current);
      typeFrame.current = requestAnimationFrame(() => {
        element.style.setProperty("--type-x", progress.toFixed(3));
        element.style.setProperty("--type-y", Math.sin(progress * Math.PI).toFixed(3));
      });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) update();
    }, { rootMargin: "12% 0px", threshold: [0, 0.3, 0.7] });
    observer.observe(element);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      if (typeFrame.current) cancelAnimationFrame(typeFrame.current);
      if (identityFrame.current) cancelAnimationFrame(identityFrame.current);
    };
  }, []);

  const moveType = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = typeRef.current;
    if (!element || coarsePointer.current) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    if (typeFrame.current) cancelAnimationFrame(typeFrame.current);
    typeFrame.current = requestAnimationFrame(() => {
      element.style.setProperty("--type-x", x.toFixed(3));
      element.style.setProperty("--type-y", y.toFixed(3));
    });
  };

  const dragBlock = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const block = event.currentTarget;
    const startX = event.clientX;
    const startY = event.clientY;
    const pointerId = event.pointerId;
    let dragging = !coarsePointer.current;
    if (dragging) {
      block.setPointerCapture(pointerId);
      block.classList.add("is-dragging");
    }
    const move = (next: PointerEvent) => {
      const deltaX = next.clientX - startX;
      const deltaY = next.clientY - startY;
      if (!dragging) {
        if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 8) return end();
        if (Math.abs(deltaX) < 8 || Math.abs(deltaX) < Math.abs(deltaY) * 1.1) return;
        dragging = true;
        block.setPointerCapture(pointerId);
        block.classList.add("is-dragging");
      }
      block.style.transform = `translate3d(${deltaX}px,${deltaY}px,0) rotate(${deltaX * 0.03}deg)`;
    };
    const end = () => {
      block.classList.remove("is-dragging");
      block.style.transform = "";
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
  };

  const moveIdentity = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = identityRef.current;
    if (!element || coarsePointer.current) return;
    const rect = element.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    if (identityFrame.current) cancelAnimationFrame(identityFrame.current);
    identityFrame.current = requestAnimationFrame(() => {
      element.style.setProperty("--identity-x", x.toFixed(3));
      element.style.setProperty("--identity-y", y.toFixed(3));
    });
  };

  const dragIdentity = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = identityRef.current;
    if (!element || !coarsePointer.current) return;
    const startX = event.clientX;
    const pointerId = event.pointerId;
    event.currentTarget.setPointerCapture(pointerId);
    element.classList.add("is-dragging");
    const move = (next: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, (next.clientX - startX) / (rect.width * 0.35)));
      if (identityFrame.current) cancelAnimationFrame(identityFrame.current);
      identityFrame.current = requestAnimationFrame(() => {
        element.style.setProperty("--identity-x", x.toFixed(3));
        element.style.setProperty("--identity-y", "0");
      });
    };
    const end = () => {
      element.classList.remove("is-dragging");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
  };

  return (
    <section className="lab-playground" aria-label="Experimentos interativos do laboratório">
      <article className="lab-experiment type-field" ref={typeRef} onPointerMove={moveType} data-cursor="EXPANDIR">
        <header><span>001</span><h2>CAMPO TIPOGRÁFICO</h2><small><b className="pointer-copy">Movimente o ponteiro</b><b className="touch-copy">Role para interagir</b></small></header>
        <div className="type-field__canvas" aria-label="Tipografia interativa"><strong>TIPO</strong><strong>GRAFIA</strong></div>
        <FrameCorners />
      </article>

      <article className="lab-experiment image-logic" data-cursor="ARRASTAR">
        <header><span>002</span><h2>LÓGICA DE IMAGEM</h2><small>Arraste e solte os módulos</small></header>
        <div className="image-logic__canvas">
          {Array.from({ length: 7 }, (_, index) => <button key={index} onPointerDown={dragBlock} aria-label={`Arrastar módulo ${index + 1}`}><span>{String(index + 1).padStart(2, "0")}</span></button>)}
        </div>
        <FrameCorners />
      </article>

      <article className="lab-experiment grid-machine">
        <header><span>003</span><h2>MÁQUINA DE GRADE</h2><small>Escolha a estrutura</small></header>
        <div className="grid-machine__controls" role="group" aria-label="Número de colunas">
          {[2, 4, 6, 8, 12].map((value) => <button key={value} className={columns === value ? "is-active" : ""} onClick={() => setColumns(value)} aria-pressed={columns === value}>{value}</button>)}
        </div>
        <div className="grid-machine__canvas" style={{ "--lab-columns": columns } as CSSProperties}>
          {Array.from({ length: 12 }, (_, index) => <span key={index}>{index + 1}</span>)}
        </div>
        <FrameCorners />
      </article>

      <article className="lab-experiment moving-identity" ref={identityRef} onPointerMove={moveIdentity} data-cursor="MOVER">
        <header><span>004</span><h2>IDENTIDADE EM MOVIMENTO</h2><small><b className="pointer-copy">Movimente o ponteiro</b><b className="touch-copy">Arraste ↔</b></small></header>
        <div className="moving-identity__canvas" onPointerDown={dragIdentity} aria-label="Identidade MS interativa"><strong>MS/</strong><i /><i /><i /></div>
        <FrameCorners />
      </article>
    </section>
  );
}
