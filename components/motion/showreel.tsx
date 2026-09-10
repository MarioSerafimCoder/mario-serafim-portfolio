"use client";
/* eslint-disable @next/next/no-img-element -- Local poster is optimized and has fixed dimensions. */

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

const beats = ["Matéria", "Identidade", "Campanha", "Digital"];

export function Showreel() {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const element = section.current;
    if (!element || !("IntersectionObserver" in window)) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => setPlay(entry.isIntersecting), { rootMargin: "180px", threshold: .08 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (play) video.current?.play().catch(() => undefined);
    else video.current?.pause();
  }, [play]);

  return (
    <section ref={section} id="showreel" className="showreel" aria-label="Showreel de Mário Serafim">
      <div className="showreel-frame">
        <img src="/media/showreel/poster.webp" alt="Composição editorial em pedra, vidro, papel e interfaces" width="1280" height="720" />
        <video ref={video} src="/media/showreel/showreel.mp4" poster="/media/showreel/poster.webp" muted playsInline loop autoPlay={play} preload="metadata" aria-hidden="true" />
        <div className="showreel-slate" aria-hidden="true">{beats.map((beat, index) => <span key={beat} style={{ "--beat": index } as CSSProperties}>{beat}</span>)}</div>
        <span className="showreel-mark">MS/ SHOWREEL — 08 SEC</span>
      </div>
      <div className="showreel-caption"><p>Selected work / moving image</p><p>Marca · Campanha · Produto · Experiência</p></div>
    </section>
  );
}
