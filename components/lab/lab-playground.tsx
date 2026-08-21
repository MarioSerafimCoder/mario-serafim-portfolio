"use client";

import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useRef, useState } from "react";
import { FrameCorners } from "../interaction/frame-corners";

export function LabPlayground() {
  const [columns, setColumns] = useState(6);
  const typeRef = useRef<HTMLDivElement>(null);
  const identityRef = useRef<HTMLDivElement>(null);
  const typeFrame = useRef(0);
  const identityFrame = useRef(0);

  const moveType = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = typeRef.current;
    if (!element) return;
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
    block.setPointerCapture(event.pointerId);
    block.classList.add("is-dragging");
    const move = (next: PointerEvent) => {
      block.style.transform = `translate3d(${next.clientX - startX}px,${next.clientY - startY}px,0) rotate(${(next.clientX - startX) * 0.03}deg)`;
    };
    const end = () => {
      block.classList.remove("is-dragging");
      block.style.transform = "";
      block.removeEventListener("pointermove", move);
      block.removeEventListener("pointerup", end);
      block.removeEventListener("pointercancel", end);
    };
    block.addEventListener("pointermove", move);
    block.addEventListener("pointerup", end);
    block.addEventListener("pointercancel", end);
  };

  const moveIdentity = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = identityRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    if (identityFrame.current) cancelAnimationFrame(identityFrame.current);
    identityFrame.current = requestAnimationFrame(() => {
      element.style.setProperty("--identity-x", x.toFixed(3));
      element.style.setProperty("--identity-y", y.toFixed(3));
    });
  };

  return (
    <section className="lab-playground" aria-label="Experimentos interativos do laboratório">
      <article className="lab-experiment type-field" ref={typeRef} onPointerMove={moveType} data-cursor="EXPANDIR">
        <header><span>001</span><h2>CAMPO TIPOGRÁFICO</h2><small>Movimente o ponteiro</small></header>
        <div className="type-field__canvas" aria-label="Tipografia que reage ao ponteiro"><strong>TIPO</strong><strong>GRAFIA</strong></div>
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
        <header><span>004</span><h2>IDENTIDADE EM MOVIMENTO</h2><small>Direção e velocidade</small></header>
        <div className="moving-identity__canvas" aria-label="Identidade MS responsiva ao ponteiro"><strong>MS/</strong><i /><i /><i /></div>
        <FrameCorners />
      </article>
    </section>
  );
}
