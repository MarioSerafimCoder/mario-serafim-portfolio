"use client";

import { useState } from "react";

const formats = [
  { id: "poster", label: "Cartaz", ratio: "4 / 5", note: "Impacto" },
  { id: "mobile", label: "Mobile", ratio: "9 / 16", note: "Sequência" },
  { id: "deck", label: "Deck", ratio: "16 / 9", note: "Argumento" },
  { id: "ooh", label: "OOH", ratio: "21 / 9", note: "Distância" },
] as const;

export function FormatTester() {
  const [active, setActive] = useState<(typeof formats)[number]>(formats[0]);

  return (
    <div className="format-tester">
      <div className="format-controls" aria-label="Comparar a composição em diferentes formatos">
        {formats.map((format) => (
          <button
            type="button"
            key={format.id}
            className={active.id === format.id ? "is-active" : ""}
            aria-pressed={active.id === format.id}
            onClick={() => setActive(format)}
          >
            <span>{format.label}</span>
            <small>{format.ratio}</small>
          </button>
        ))}
      </div>
      <div className="format-stage" aria-live="polite">
        <div className={`format-canvas format-canvas--${active.id}`}>
          <span>ESTUDO / 05</span>
          <strong>UMA<br />IDEIA.</strong>
          <i aria-hidden="true" />
          <b>{active.note}</b>
          <small>{active.label} / {active.ratio}</small>
        </div>
      </div>
    </div>
  );
}
