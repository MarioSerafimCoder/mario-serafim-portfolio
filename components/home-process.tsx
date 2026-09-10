export function HomeProcess() {
  const moves = [
    { number: "01", title: "ENTENDER", copy: "O pedido é a entrada. Entender a necessidade é o trabalho." },
    { number: "02", title: "ESCOLHER", copy: "Pesquisa ganha valor quando vira decisão." },
    { number: "03", title: "FAZER FUNCIONAR", copy: "Uma direção precisa sobreviver ao primeiro layout." },
  ];

  return (
    <section className="home-process" aria-labelledby="home-process-title">
      <div className="section-head"><p className="eyebrow">03 / PROCESSO</p><a href="/process">Ver processo ↗</a></div>
      <div className="home-process__heading"><h2 id="home-process-title">O resultado<br /><em>vem depois.</em></h2><p>Entre o pedido e a entrega, há pesquisa, tentativas e cortes. É nesse intervalo que a direção se define.</p></div>
      <div className="home-process__moves">
        {moves.map((move) => <a href="/process" key={move.number}><span>{move.number}</span><strong>{move.title}</strong><p>{move.copy}</p><b aria-hidden="true">↗</b></a>)}
      </div>
    </section>
  );
}
