export function HomeLab() {
  const studies = [
    { number: "001", title: "Campo tipográfico", className: "lab-teaser-type" },
    { number: "002", title: "Máquina de grade", className: "lab-teaser-grid" },
    { number: "003", title: "Identidade em movimento", className: "lab-teaser-motion" },
  ];
  return (
    <section className="home-lab" aria-labelledby="home-lab-title">
      <div className="section-head"><p className="eyebrow">03 / MS LAB</p><a href="/lab">Entrar no laboratório ↗</a></div>
      <div className="home-lab-heading"><h2 id="home-lab-title">Controle precisa<br /><em>de descoberta.</em></h2><p>MS/LAB é onde testo ferramentas, comportamentos e linguagens antes de saber exatamente onde elas vão parar.</p></div>
      <div className="lab-teasers">
        {studies.map(study => <a href="/lab" className={`lab-teaser ${study.className}`} key={study.number}><span>{study.number}</span><div aria-hidden="true">{Array.from({length:8},(_,i)=><i key={i} style={{ "--i": i } as CSSProperties} />)}</div><strong>{study.title}</strong></a>)}
      </div>
    </section>
  );
}
import type { CSSProperties } from "react";
