import type { Metadata } from "next";

export const metadata: Metadata = { title: "About — Mário Serafim", description: "Mário Serafim is a Creative and Art Director based in Fortaleza, Brazil." };

const capabilities = ["Creative direction", "Art direction", "Brand systems", "Campaigns", "Digital products", "Visual design", "Motion", "Creative strategy"];

export default function AboutPage() {
  return (
    <main className="inner-page">
      <header className="about-hero"><p>04 / About</p><h1>Creative<br />direction<br /><em>is a way</em><br />of thinking.</h1></header>
      <section className="about-intro">
        <h2>Mário Serafim</h2>
        <p>Creative / Art Director<br />Fortaleza — Brazil</p>
        <p>I work across identity, campaigns and digital products, connecting ideas to clear visual systems. A fuller verified professional biography will be added before the final launch.</p>
      </section>
      <section className="about-philosophy">
        <p>Point of view</p>
        <h2>Make it clear.<br />Make it memorable.<br /><em>Make it hold together.</em></h2>
        <p>Direction is not decoration. It is the set of decisions that gives an idea form, tone, rhythm and consistency.</p>
      </section>
      <section className="capabilities"><p>Areas of practice</p>{capabilities.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}</section>
      <section className="about-record">
        <p>Professional record</p>
        {["Experience", "Selected clients", "Tools", "Recognition"].map((item) => <div key={item}><h3>{item}</h3><p>[Add verified information]</p></div>)}
      </section>
      <section className="about-contact"><p>Available for selected projects and collaborations.</p><h2>Have an idea<br />that needs direction?</h2><a href="/contact">Start a project ↗</a></section>
    </main>
  );
}
