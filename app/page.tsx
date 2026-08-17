import Link from "next/link";

const projects = [
  { title: "Granistone", type: "Brand Direction", year: "2026", tone: "tone-a" },
  { title: "Queen Aquamarine", type: "Visual Identity", year: "2025", tone: "tone-b" },
  { title: "Fenda", type: "Campaign / Digital", year: "2025", tone: "tone-c" },
];

export default function Home() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-kicker"><span>Creative / Art Direction</span><span>Fortaleza — Brazil</span><span>2026</span></div>
        <h1 id="hero-title"><span>Mário</span><span>Serafim</span></h1>
        <div className="hero-foot"><p>Visual systems for<br />ideas worth remembering.</p><span className="scroll-note">Scroll to explore ↓</span></div>
      </section>
      <section className="manifesto">
        <p className="eyebrow">01 / Direction</p>
        <h2>Good ideas need<br /><em>direction.</em></h2>
        <p className="manifesto-copy">I shape brands, campaigns and digital experiences into clear, memorable visual systems.</p>
      </section>
      <section className="selected" aria-labelledby="selected-title">
        <div className="section-head"><p className="eyebrow">02 / Selected work</p><Link href="/work">View all work ↗</Link></div>
        <h2 id="selected-title">Selected<br />work.</h2>
        <div className="project-grid">
          {projects.map((project, index) => (
            <Link href={`/work/${project.title.toLowerCase().replaceAll(" ", "-")}`} className={`project-card project-${index + 1}`} key={project.title}>
              <div className={`media-placeholder ${project.tone}`} role="img" aria-label={`${project.title} project image placeholder`}>
                <span className="placeholder-index">0{index + 1}</span><strong>{project.title}</strong><span>Visual material pending</span>
              </div>
              <div className="project-meta"><span>{project.title}</span><span>{project.type}</span><span>{project.year}</span></div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
