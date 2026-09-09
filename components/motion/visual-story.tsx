"use client";
/* eslint-disable @next/next/no-img-element -- Optimized local WebP posters avoid a runtime image service. */

import { useEffect, useRef, useState } from "react";
import { storyChapters, storyScene, storyTime } from "./story-timeline";

export function VisualStory() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const target = useRef(0);
  const [scene, setScene] = useState(0);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [loadMedia, setLoadMedia] = useState(false);
  const [mediaUrl, setMediaUrl] = useState<string>();

  useEffect(() => {
    if (!loadMedia || reduced) return;
    const controller = new AbortController();
    let objectUrl: string | undefined;
    // A complete local blob remains seekable when the host does not serve byte ranges.
    fetch("/media/narrative/direction-film.mp4", { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error("Video unavailable");
        return response.blob();
      })
      .then(blob => {
        if (controller.signal.aborted) return;
        objectUrl = URL.createObjectURL(blob);
        setMediaUrl(objectUrl);
      })
      .catch(() => setReady(false));
    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      setMediaUrl(undefined);
      setReady(false);
    };
  }, [loadMedia, reduced]);

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const section = root.current;
    if (!section || reduced) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLoadMedia(true);
        observer.disconnect();
      }
    }, { rootMargin: "500px" });
    observer.observe(section);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    const section = root.current;
    if (!section || reduced) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - innerHeight);
      const progress = Math.max(0, Math.min(1, -bounds.top / distance));
      const nextScene = storyScene(progress);
      setScene(current => current === nextScene ? current : nextScene);
      section.style.setProperty("--story-progress", String(progress));
      section.style.setProperty("--story-exit", String(Math.max(0, (progress - .88) / .12)));
      const el = video.current;
      if (el && Number.isFinite(el.duration)) {
        target.current = storyTime(progress, el.duration);
        if (!el.seeking && Math.abs(el.currentTime - target.current) > .06) el.currentTime = target.current;
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
    };
  }, [reduced, ready]);

  const seekNext = () => {
    const el = video.current;
    if (el && !el.seeking && Math.abs(el.currentTime - target.current) > .06) el.currentTime = target.current;
  };

  const goToScene = (index: number) => {
    const el = root.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + scrollY;
    const progress = [0.08, 0.32, 0.58, 0.82][index];
    scrollTo({ top: top + (el.offsetHeight - innerHeight) * progress, behavior: "instant" });
  };

  return (
    <section ref={root} id="visual-story" className="visual-story" data-scene={scene} data-reduced={reduced} aria-label="Da ideia à experiência">
      <div className="story-stage">
        <div className="story-media" aria-hidden="true">
          <img src={storyChapters[scene].poster} alt="" width="1280" height="720" fetchPriority="high" className="story-poster" />
          {!reduced && <video ref={video} className={ready ? "is-ready" : ""} src={mediaUrl} poster="/media/narrative/matter.webp" muted playsInline preload="auto" tabIndex={-1} onLoadedData={() => setReady(true)} onSeeked={seekNext} onError={() => setReady(false)} />}
        </div>
        <div className="story-topline"><span>MS/ — Tese visual</span><div><button onClick={() => setReduced(true)}>Reduzir movimento</button><a href="#selected-title">Ir aos projetos ↗</a></div></div>
        <div className="story-captions" aria-hidden="true">
          {storyChapters.map((chapter, index) => (
            <div className="story-caption" data-active={scene === index} key={chapter.id}>
              <p>{chapter.number} / {chapter.label}</p><h2>{chapter.title}</h2><span>{chapter.body}</span>
            </div>
          ))}
        </div>
        <ol className="story-accessible">
          {storyChapters.map(chapter => <li key={chapter.id}><h2>{chapter.title}</h2><p>{chapter.body}</p></li>)}
        </ol>
        <div className="story-bottom">
          <nav aria-label="Cenas da narrativa">{storyChapters.map((chapter,index) => <button key={chapter.id} onClick={() => goToScene(index)} aria-current={scene === index ? "step" : undefined}><span>{chapter.number}</span> {chapter.label}</button>)}</nav>
          <span className="story-scroll-note">Role para dar direção ↓</span>
          <span className="story-credit">Estudo visual autoral · IA</span>
        </div>
        <div className="story-progress" aria-hidden="true"><span /></div>
      </div>
      <noscript><style>{".visual-story{height:auto!important}.story-stage{display:none!important}.story-static{display:block!important}.story-resume{display:none!important}"}</style></noscript>
      <div className="story-static">
        <button className="story-resume" onClick={() => setReduced(false)}>Ativar sequência animada ↓</button>
        {storyChapters.map(chapter => <article key={chapter.id}><img src={chapter.poster} alt={"Composição autoral — " + chapter.label} width="1280" height="720" loading="lazy" /><div><p>{chapter.number} / {chapter.label}</p><h2>{chapter.title}</h2><p>{chapter.body}</p></div></article>)}
      </div>
    </section>
  );
}


