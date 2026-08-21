"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { projects } from "../../data/projects";

type ArtboardOverlay = "command" | "status" | "menu" | "bag" | null;

type ArtboardSystemProps = {
  overlay: ArtboardOverlay;
  onOverlayChange: (overlay: ArtboardOverlay) => void;
  gridOpen: boolean;
  onGridChange: (open: boolean) => void;
};

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

export function ArtboardSystem({ overlay, onOverlayChange, gridOpen, onGridChange }: ArtboardSystemProps) {
  const pathname = usePathname();
  const commandOpen = overlay === "command";
  const statusOpen = overlay === "status";
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLSpanElement>(null);
  const commandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const openCommand = () => onOverlayChange("command");
    window.addEventListener("ms:command", openCommand);
    return () => window.removeEventListener("ms:command", openCommand);
  }, [onOverlayChange]);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (isTyping(event.target)) return;
      if (event.key === "/") {
        event.preventDefault();
        onOverlayChange(commandOpen ? null : "command");
      }
      if (event.key.toLowerCase() === "g") onGridChange(!gridOpen);
      if (event.key.toLowerCase() === "l") window.location.assign("/lab");
      if (event.key.toLowerCase() === "r") {
        const project = projects[Math.floor(Math.random() * projects.length)];
        window.location.assign(`/work/${project.slug}`);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [commandOpen, gridOpen, onGridChange, onOverlayChange]);

  useEffect(() => {
    if (!commandOpen) return;
    const panel = commandRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>("a, button");
    focusable?.[0]?.focus();
    return undefined;
  }, [commandOpen]);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
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
    if (window.matchMedia("(pointer: coarse)").matches) {
      document.documentElement.style.setProperty("--scroll-velocity", "0");
      return;
    }
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
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const mark = document.querySelector<HTMLElement>(".mark");
    if (!mark) return;
    let timer = 0;
    const start = () => { timer = window.setTimeout(() => onOverlayChange("status"), 720); };
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
  }, [onOverlayChange, pathname]);

  return (
    <>
      <div className={`grid-overlay ${gridOpen ? "is-open" : ""}`} aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => <span key={index} />)}
        <b>GRADE / 12 COLUNAS</b>
      </div>

      <div ref={cursorRef} className="artboard-cursor" aria-hidden="true">
        <i /><i /><i /><i /><span ref={cursorLabelRef}>+</span>
      </div>

      <button className="grid-status" onClick={() => onGridChange(!gridOpen)} aria-pressed={gridOpen}>
        G / GRADE {gridOpen ? "ATIVA" : "OCULTA"}
      </button>

      <div className={`command-palette ${commandOpen ? "is-open" : ""}`} aria-hidden={!commandOpen}>
        <div className="command-panel" ref={commandRef} role="dialog" aria-modal="true" aria-label="Comandos do site">
          <div className="command-head"><span>MS/ COMANDO</span><button tabIndex={commandOpen ? 0 : -1} onClick={() => onOverlayChange(null)}>Fechar ×</button></div>
          <nav>
            {commands.map((item) => <a key={item.href} href={item.href} tabIndex={commandOpen ? 0 : -1}><kbd>{item.key}</kbd><span>{item.label}</span><b>↗</b></a>)}
          </nav>
          <div className="command-shortcuts"><span>G — Grade</span><span>R — Projeto aleatório</span><span>L — Laboratório</span><span>ESC — Fechar</span></div>
        </div>
      </div>

      <div className={`system-status ${statusOpen ? "is-open" : ""}`} aria-hidden={!statusOpen}>
        <div role="dialog" aria-modal="true" aria-label="Status do sistema MS">
          <button tabIndex={statusOpen ? 0 : -1} onClick={() => onOverlayChange(null)}>Fechar ×</button>
          <strong>MS/<br />ESTADO DO SISTEMA</strong>
          <p>CRIATIVO ........ ATIVO<br />DIREÇÃO DE ARTE ... ATIVA<br />EXPERIMENTOS ..... EM CURSO<br />PRAZOS ........... SIGILOSOS</p>
        </div>
      </div>
    </>
  );
}
