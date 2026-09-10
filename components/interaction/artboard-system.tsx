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
  { href: "/work", label: "Work / Projetos selecionados", key: "W" },
  { href: "/#now", label: "Now / 2026", key: "N" },
  { href: "/process", label: "Processo / Do briefing à entrega", key: "P" },
  { href: "/about", label: "About / Mário", key: "A" },
  { href: "/contact", label: "Contact", key: "C" },
];
const visibleCommands = commands;

function isTyping(target: EventTarget | null) {
  const element = target as HTMLElement | null;
  return !!element?.closest("input, textarea, select, [contenteditable='true']");
}

export function ArtboardSystem({ overlay, onOverlayChange, gridOpen, onGridChange }: ArtboardSystemProps) {
  const pathname = usePathname();
  const commandOpen = overlay === "command";
  const statusOpen = overlay === "status";
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
      if (event.key.toLowerCase() === "p") window.location.assign("/process");
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



      <div className={`command-palette ${commandOpen ? "is-open" : ""}`} aria-hidden={!commandOpen}>
        <div className="command-panel" ref={commandRef} role="dialog" aria-modal="true" aria-label="Comandos do site">
          <div className="command-head"><span>MS/ COMANDO</span><button tabIndex={commandOpen ? 0 : -1} onClick={() => onOverlayChange(null)}>Fechar ×</button></div>
          <nav>
            {visibleCommands.map((item) => <a key={item.href} href={item.href} tabIndex={commandOpen ? 0 : -1}><kbd>{item.key}</kbd><span>{item.label}</span><b>↗</b></a>)}
          </nav>
          <div className="command-shortcuts"><span>G — Grade</span><span>R — Projeto aleatório</span><span>P — Processo</span><span>ESC — Fechar</span></div>
        </div>
      </div>

      <div className={`system-status ${statusOpen ? "is-open" : ""}`} aria-hidden={!statusOpen}>
        <div role="dialog" aria-modal="true" aria-label="Status do sistema MS">
          <button tabIndex={statusOpen ? 0 : -1} onClick={() => onOverlayChange(null)}>Fechar ×</button>
          <strong>MS/<br />ESTADO DO SISTEMA</strong>
          <p>CRIATIVO ........ ATIVO<br />DIREÇÃO DE ARTE ... ATIVA<br />CRITÉRIO ......... PRESENTE<br />PRAZOS ........... SIGILOSOS</p>
        </div>
      </div>
    </>
  );
}
