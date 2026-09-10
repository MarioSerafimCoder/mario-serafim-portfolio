import { profile } from "../../content/profile";

export function HomeProfile() {
  return (
    <>
      <section id="now" className="now-section" aria-labelledby="now-title">
        <div className="section-head"><p className="eyebrow">02 / NOW</p><span>2026 — Fortaleza</span></div>
        <div className="now-heading">
          <h2 id="now-title">Agora, na<br /><em>Granistone.</em></h2>
          <p>Pedra natural, marca e imagem. Um trabalho que começa na matéria e chega à presença digital.</p>
        </div>
        <dl className="now-list">
          <div><dt>Currently</dt><dd>{profile.now.currently}</dd></div>
          <div><dt>Based in</dt><dd>{profile.now.based}</dd></div>
          <div><dt>Exploring</dt><dd>{profile.now.exploring.join(" / ")}</dd></div>
          <div><dt>Available for</dt><dd>{profile.now.availability}</dd></div>
        </dl>
      </section>

      <section className="profile-intro" aria-labelledby="profile-intro-title">
        <p className="eyebrow">MÁRIO / EM CONTEXTO</p>
        <div>
          <h2 id="profile-intro-title">Uma prática feita<br />de <em>escolhas.</em></h2>
          <p>{profile.intro}</p>
          <nav aria-label="Perfis profissionais de Mário Serafim">
            <a href="/about">Conhecer Mário ↗</a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href={profile.links.behance} target="_blank" rel="noopener noreferrer">Behance ↗</a>
          </nav>
        </div>
      </section>

      <section className="track-section" aria-labelledby="track-title">
        <div className="section-head"><p className="eyebrow">EXPERIENCE / SELECTED</p><a href="/about#experience">Ver trajetória ↗</a></div>
        <h2 id="track-title">Onde estou.<br /><em>O que trouxe comigo.</em></h2>
        <div className="track-grid">
          <article><span>{profile.experience[0].period}</span><h3>{profile.experience[0].role}</h3><p>{profile.experience[0].place}</p></article>
          <article><span>{profile.education[0].period}</span><h3>{profile.education[0].title}</h3><p>{profile.education[0].place}</p></article>
          <article><span>{profile.talks[0].period}</span><h3>{profile.talks[0].title}</h3><p>{profile.talks[0].place}</p></article>
        </div>
      </section>

      <section className="outside-section" aria-labelledby="outside-title">
        <div className="outside-heading"><p className="eyebrow">OUTSIDE THE GRID</p><h2 id="outside-title">Referências também<br /><em>contam histórias.</em></h2><p>Um espaço em preparação para o que alimenta o trabalho fora dos projetos.</p></div>
        <div className="outside-grid">
          {profile.outside.map((item) => <article key={item.index}><span>{item.index}</span><h3>{item.title}</h3><p>{item.note}</p></article>)}
        </div>
      </section>
    </>
  );
}
