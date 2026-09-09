import { VisualStory } from "./visual-story";

export function HeroArtboard() {
  return (
    <>
      <header className="narrative-intro" aria-labelledby="hero-title">
        <div className="editorial-kicker"><span>Direção criativa / Direção de arte</span><span>Fortaleza — Brasil</span></div>
        <h1 id="hero-title">Mário <span>Serafim<span className="signature-dot">.</span></span></h1>
        <div className="narrative-intro-foot"><p>Boas ideias precisam de direção.</p><a href="#visual-story">Do primeiro gesto ao sistema ↓</a></div>
      </header>
      <VisualStory />
    </>
  );
}
