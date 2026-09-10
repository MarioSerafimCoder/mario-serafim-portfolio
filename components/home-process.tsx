export function HomeProcess() {
  const moves = [
    { number: "01", title: "ENTENDER", copy: "O pedido é o começo. O problema vem depois." },
    { number: "02", title: "ESCOLHER", copy: "Pesquisa ganha valor quando vira decisão." },
    { number: "03", title: "FAZER FUNCIONAR", copy: "Uma direção precisa sobreviver ao primeiro layout." },
  ];

  return (
    <section className="home-process" aria-labelledby="home-process-title">
      <div className="section-head"><p className="eyebrow">03 / PROCESSO</p><a href="/process">Ver do briefing à entrega ↗</a></div>
      <div className="home-process__heading"><h2 id="home-process-title">O resultado<br /><em>vem depois.</em></h2><p>Antes da forma, existe contexto. Antes da entrega, existem escolhas. Veja como transformo os dois em um sistema aplicável.</p></div>
      <div className="home-process__moves">
        {moves.map((move) => <a href="/process" key={move.number}><span>{move.number}</span><strong>{move.title}</strong><p>{move.copy}</p><b aria-hidden="true">↗</b></a>)}
      </div>
    </section>
  );
}
