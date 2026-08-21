"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { projects } from "../../data/projects";

const commands = [
  { href: "/work", label: "Projetos selecionados", key: "W" },
  { href: "/archive", label: "Arquivo", key: "A" },
  { href: "/lab", label: "Laboratório", key: "L" },
  { href: "/about", label: "Sobre", key: "S" },
  { href: "/shop", label: "Loja", key: "O" },
  { href: "/contact", label: "Contato", key: "C" },
];

function isTyping(target: EventTarget | null) {
  const element = target as HTMLElement | null;
  return !!element?.closest("input, textarea, select, [contenteditable='true']");
}

export function ArtboardSystem() {
  const pathname = usePathname();
  const [gridOpen, setGridOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLSpanElement>(null);
  const commandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const openCommand = () => setCommandOpen(true);
    window.addEventListener("ms:command", openCommand);
    return () => window.removeEventListener("ms:command", openCommand);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isTyping(event.target)) return;
      if (event.key === "Escape") {
        setCommandOpen(false);
        setStatusOpen(false);
        return;
      }
      if (event.key === "/") {
        event.preventDefault();
        setCommandOpen((current) => !current);
      }
      if (event.key.toLowerCase() === "g") setGridOpen((current) => !current);
      if (event.key.toLowerCase() === "l") window.location.assign("/lab");
      if (event.key.toLowerCase() === "r") {
        const project = projects[Math.floor(Math.random() * projects.length)];
        window.location.assign(`/work/${project.slug}`);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!commandOpen) return;
    const panel = commandRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>("a, button");
    focusable?.[0]?.focus();
    const trap = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [commandOpen]);

  useEffect(() => {
    let pointerFrame = 0;
    let pointerX = -100;
    let pointerY = -100;
    const renderCursor = () => {
      cursorRef.current?.style.setProperty("transform", `translate3d(${pointerX}px,${pointerY}px,0)`);
      pointerFrame = 0;
    };
    const move = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!pointerFrame) pointerFrame = requestAnimationFrame(renderCursor);
    };
    const over = (event: PointerEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      const label = target?.dataset.cursor ?? "+";
      if (cursorLabelRef.current) cursorLabelRef.current.textContent = label;
      cursorRef.current?.classList.toggle("is-active", !!target);
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    let resetTimer = 0;
    const measure = () => {
      const delta = Math.max(-24, Math.min(24, window.scrollY - lastY));
      lastY = window.scrollY;
      document.documentElement.style.setProperty("--scroll-velocity", `${delta}`);
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => document.documentElement.style.setProperty("--scroll-velocity", "0"), 90);
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(resetTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const mark = document.querySelector<HTMLElement>(".mark");
    if (!mark) return;
    let timer = 0;
    const start = () => { timer = window.setTimeout(() => setStatusOpen(true), 720); };
    const cancel = () => window.clearTimeout(timer);
    mark.addEventListener("pointerdown", start);
    mark.addEventListener("pointerup", cancel);
    mark.addEventListener("pointerleave", cancel);
    return () => {
      cancel();
      mark.removeEventListener("pointerdown", start);
      mark.removeEventListener("pointerup", cancel);
      mark.removeEventListener("pointerleave", cancel);
    };
  }, [pathname]);

  return (
    <>
      <div className={`grid-overlay ${gridOpen ? "is-open" : ""}`} aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => <span key={index} />)}
        <b>GRADE / 12 COLUNAS</b>
      </div>

      <div ref={cursorRef} className="artboard-cursor" aria-hidden="true">
        <i /><i /><i /><i /><span ref={cursorLabelRef}>+</span>
      </div>

      <button className="grid-status" onClick={() => setGridOpen((current) => !current)} aria-pressed={gridOpen}>
        G / GRADE {gridOpen ? "ATIVA" : "OCULTA"}
      </button>

      <div className={`command-palette ${commandOpen ? "is-open" : ""}`} aria-hidden={!commandOpen}>
        <div className="command-panel" ref={commandRef} role="dialog" aria-modal="true" aria-label="Comandos do site">
          <div className="command-head"><span>MS/ COMANDO</span><button onClick={() => setCommandOpen(false)}>Fechar ×</button></div>
          <nav>
            {commands.map((item) => <a key={item.href} href={item.href}><kbd>{item.key}</kbd><span>{item.label}</span><b>↗</b></a>)}
          </nav>
          <div className="command-shortcuts"><span>G — Grade</span><span>R — Projeto aleatório</span><span>L — Laboratório</span><span>ESC — Fechar</span></div>
        </div>
      </div>

      <div className={`system-status ${statusOpen ? "is-open" : ""}`} aria-hidden={!statusOpen}>
        <div role="dialog" aria-modal="true" aria-label="Status do sistema MS">
          <button onClick={() => setStatusOpen(false)}>Fechar ×</button>
          <strong>MS/<br />ESTADO DO SISTEMA</strong>
          <p>CRIATIVO ........ ATIVO<br />DIREÇÃO DE ARTE ... ATIVA<br />EXPERIMENTOS ..... EM CURSO<br />PRAZOS ........... SIGILOSOS</p>
        </div>
      </div>
    </>
  );
}
