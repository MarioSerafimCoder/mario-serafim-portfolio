"use client";
/* eslint-disable @next/next/no-img-element -- Local poster is optimized and has fixed dimensions. */

import { useEffect, useRef, useState } from "react";

export function Showreel() {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [play, setPlay] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const element = section.current;
    if (!element || !("IntersectionObserver" in window)) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => setPlay(entry.isIntersecting), { rootMargin: "180px", threshold: .08 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (play && !paused) video.current?.play().catch(() => undefined);
    else video.current?.pause();
  }, [play, paused]);

  return (
    <section ref={section} id="showreel" className="showreel" aria-label="Showreel de Mário Serafim">
      <div className="showreel-frame">
        <img src="/media/showreel/poster.webp" alt="Composição editorial em pedra, vidro, papel e interfaces" width="1280" height="720" />
        <video ref={video} src="/media/showreel/showreel.mp4" poster="/media/showreel/poster.webp" muted playsInline loop autoPlay={play && !paused} preload="metadata" aria-hidden="true" />
        <span className="showreel-mark">MS/ SHOWREEL — 08 SEC</span>
        <button className="showreel-toggle" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Reproduzir" : "Pausar"} showreel</button>
      </div>
      <div className="showreel-caption"><p>Estudo autoral / imagem em movimento</p><p>Marca · Campanha · Produto · Experiência</p></div>
    </section>
  );
}
