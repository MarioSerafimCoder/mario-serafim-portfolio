import type { Metadata } from "next";

export const metadata: Metadata = { title: "Lab — Mário Serafim", description: "Visual experiments, prototypes and creative research." };

const experiments = [
  { number: "01", title: "Variable Type Field", status: "Experiment", note: "Typography / Motion", format: "square" },
  { number: "02", title: "Image Logic Studies", status: "Research", note: "Image systems / AI", format: "portrait" },
  { number: "03", title: "Editorial Interface", status: "Prototype", note: "Product / Interaction", format: "wide" },
  { number: "04", title: "Moving Identities", status: "Research", note: "Brand / Motion", format: "landscape" },
];

export default function LabPage() {
  return (
    <main className="inner-page dark-page">
      <header className="page-hero lab-hero"><p>03 / Experiments</p><h1>Lab.</h1><p>A space for unfinished questions, visual tests and self-initiated work.</p></header>
      <section className="lab-manifesto"><p>Working method</p><h2>Test fast.<br />Keep what matters.</h2><p>The Lab is intentionally less resolved than Work. It documents research in progress without pretending every experiment is a finished case.</p></section>
      <section className="lab-grid">
        {experiments.map((experiment, index) => (
          <article key={experiment.title} className={`lab-item lab-${index + 1}`}>
            <div className={`lab-placeholder lab-format-${experiment.format}`} role="img" aria-label={`${experiment.title} visual placeholder`}>
              <span>{experiment.number}</span><strong>{experiment.title}</strong><small>Experiment material pending</small>
            </div>
            <div className="lab-meta"><p>{experiment.status} / Ongoing</p><span>{experiment.note}</span></div>
          </article>
        ))}
      </section>
      <section className="lab-status"><p>Status key</p>{["Experiment","Research","Prototype","Released"].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}</section>
    </main>
  );
}
