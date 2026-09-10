/* eslint-disable @next/next/no-img-element -- native images avoid a vinext hydration conflict verified in browser QA */
import type { Metadata } from "next";
import { FormatTester } from "../../components/process/format-tester";

export const metadata: Metadata = {
  title: "Processo — Mário Serafim",
  description: "Do briefing à entrega: como Mário Serafim transforma contexto, escolhas e exploração em sistemas visuais aplicáveis.",
};

const processIndex = [
  ["01", "Briefing", "briefing"],
  ["02", "Imersão", "imersao"],
  ["03", "Direção", "direcao"],
  ["04", "Exploração", "exploracao"],
  ["05", "Sistema", "sistema"],
  ["06", "Entrega", "entrega"],
];

export default function ProcessPage() {
  return (
    <main className="process-page dark-page">
      <header className="process-hero">
        <p className="process-kicker">03 / DO BRIEFING À ENTREGA</p>
        <h1>PROCESSO.</h1>
        <div className="process-hero__statement">
          <h2>O resultado é a parte que todo mundo vê.<br /><em>O trabalho começa bem antes.</em></h2>
          <p>Antes da forma, eu procuro o problema. Depois, transformo contexto e escolhas em um sistema capaz de funcionar no mundo real.</p>
        </div>
        <a className="process-entry" href="#briefing">Entrar no processo <span aria-hidden="true">↓</span></a>
      </header>

      <nav className="process-index" aria-label="Etapas do processo">
        {processIndex.map(([number, label, id]) => <a href={`#${id}`} key={id}><span>{number}</span>{label}</a>)}
      </nav>

      <section id="briefing" className="process-stage process-stage--briefing" aria-labelledby="briefing-title">
        <div className="process-copy">
          <p><span>01</span> Briefing</p>
          <h2 id="briefing-title">Antes do layout,<br />existe um problema.</h2>
          <div><p>O ponto de partida é separar pedido de necessidade: o que precisa mudar, para quem e em qual contexto.</p><strong>Abrir o Figma não é a primeira etapa.</strong></div>
        </div>
        <div className="brief-board" aria-label="Representação editorial de um briefing organizado">
          <div className="brief-sheet brief-sheet--back"><span>ENTRADA / 00</span><b>“PRECISAMOS DE ALGO NOVO.”</b></div>
          <div className="brief-sheet brief-sheet--main">
            <header><span>BRIEF / ESTRUTURA</span><span>SIMULAÇÃO EDITORIAL</span></header>
            <h3>O que precisa<br />mudar?</h3>
            <dl>
              <div><dt>Objetivo</dt><dd>Mudar percepção</dd></div>
              <div><dt>Público</dt><dd>Quem precisa entender</dd></div>
              <div><dt>Contexto</dt><dd>Onde a ideia vai viver</dd></div>
              <div><dt>Restrição</dt><dd>O que não pode falhar</dd></div>
            </dl>
            <p>Pedido ≠ problema</p>
          </div>
          <div className="brief-note">PERGUNTAR<br />DE NOVO ↗</div>
        </div>
      </section>

      <section id="imersao" className="process-stage process-stage--immersion" aria-labelledby="imersao-title">
        <div className="process-copy">
          <p><span>02</span> Imersão</p>
          <h2 id="imersao-title">Olhar antes<br />de opinar.</h2>
          <div><p>Investigo repertório, categoria, comportamento e tensão cultural. A referência entra para ampliar a leitura, não para decidir por ela.</p><strong>Pinterest não é estratégia.</strong></div>
        </div>
        <div className="immersion-wall" aria-label="Parede editorial de investigação e referências abstratas">
          <figure className="research-frame research-frame--matter">
            <img src="/media/narrative/matter.webp" alt="Estudo abstrato de matéria e textura" width="1280" height="720" loading="lazy" />
            <figcaption><span>A / MATÉRIA</span><b>Presença</b></figcaption>
          </figure>
          <figure className="research-frame research-frame--direction">
            <img src="/media/narrative/direction.webp" alt="Estudo abstrato de direção e contraste" width="1280" height="720" loading="lazy" />
            <figcaption><span>B / CONTRASTE</span><b>Foco</b></figcaption>
          </figure>
          <figure className="research-frame research-frame--system">
            <img src="/media/narrative/system.webp" alt="Estudo abstrato de repetição e sistema" width="1280" height="720" loading="lazy" />
            <figcaption><span>C / RITMO</span><b>Escala</b></figcaption>
          </figure>
          <div className="research-question">O QUE A CATEGORIA<br /><em>AINDA NÃO DISSE?</em></div>
          <p>MAPA DE REFERÊNCIAS<br />ESTUDO EDITORIAL / NÃO É CASE</p>
        </div>
      </section>

      <section id="direcao" className="process-stage process-stage--direction" aria-labelledby="direcao-title">
        <div className="process-copy">
          <p><span>03</span> Direção</p>
          <h2 id="direcao-title">Pesquisa sem decisão<br />é só pesquisa.</h2>
          <div><p>O material bruto vira uma hipótese clara. Defino o que sustenta a ideia, o que cria diferença e o que precisa sair.</p><strong>Direção também é dizer não.</strong></div>
        </div>
        <div className="direction-machine" aria-label="Síntese visual da passagem de informação para direção">
          <div className="direction-input">
            <span>CONTEXTO</span><span>COMPORTAMENTO</span><span>RESTRIÇÕES</span><span>REFERÊNCIAS</span><span>OBJETIVO</span><span>TENSÃO</span>
          </div>
          <div className="direction-filter"><span>SÍNTESE</span><b aria-hidden="true">→</b></div>
          <div className="direction-output"><small>DIREÇÃO / 01</small><strong>CLARO.<br />DIRETO.<br /><em>INEQUÍVOCO.</em></strong><p>Uma ideia central.<br />Três princípios.<br />Critério para editar.</p></div>
        </div>
      </section>

      <section id="exploracao" className="process-stage process-stage--exploration" aria-labelledby="exploracao-title">
        <div className="process-copy">
          <p><span>04</span> Exploração</p>
          <h2 id="exploracao-title">A primeira ideia<br />tem concorrência.</h2>
          <div><p>Abro rotas, confronto soluções e levo as promissoras longe o bastante para descobrir onde quebram.</p><strong>Se tudo parece bom, faltou editar.</strong></div>
        </div>
        <div className="contact-study" aria-label="Folha de contato com quatro explorações gráficas simuladas">
          <article className="study-card study-card--a"><header><span>A / 01</span><b>DESCARTADA</b></header><div><strong>UMA</strong><i /></div><p>Bonita. Previsível.</p></article>
          <article className="study-card study-card--b"><header><span>B / 07</span><b>QUASE</b></header><div><i /><strong>IDEIA</strong></div><p>Tem ritmo. Falta motivo.</p></article>
          <article className="study-card study-card--c"><header><span>C / 12</span><b>FORÇA DEMAIS</b></header><div><strong>!</strong><i /><i /></div><p>Grita antes de falar.</p></article>
          <article className="study-card study-card--d"><header><span>D / 18</span><b>AGORA SIM</b></header><div><strong>DIREÇÃO</strong><i /></div><p>Ideia, função e forma.</p></article>
        </div>
      </section>

      <section id="sistema" className="process-stage process-stage--system" aria-labelledby="sistema-title">
        <div className="process-copy">
          <p><span>05</span> Sistema e refinamento</p>
          <h2 id="sistema-title">Uma peça bonita ainda<br />não é um sistema.</h2>
          <div><p>A direção precisa manter identidade ao mudar de escala, formato e contexto. Testo regras, exceções e o ponto em que a consistência vira repetição.</p><strong>Clique nos formatos. A ideia precisa se adaptar.</strong></div>
        </div>
        <FormatTester />
      </section>

      <section id="entrega" className="process-stage process-stage--delivery" aria-labelledby="entrega-title">
        <div className="process-copy">
          <p><span>06</span> Entrega</p>
          <h2 id="entrega-title">O trabalho precisa<br />sobreviver sem mim.</h2>
          <div><p>Organizo arquivos, regras e decisões para que outras pessoas consigam aplicar o sistema com clareza.</p><strong>final_final_agora-vai não é governança.</strong></div>
        </div>
        <div className="delivery-console" aria-label="Estrutura organizada de arquivos e orientações de entrega">
          <header><span>HANDOFF / 06</span><span>PRONTO PARA USO</span></header>
          <div className="delivery-tree">
            <p><b>01</b> fundamentos/</p><p><b>02</b> identidade/</p><p><b>03</b> templates/</p><p><b>04</b> guidelines/</p><p><b>05</b> exports/</p>
          </div>
          <div className="delivery-checks"><p><span>✓</span>Nomenclatura clara</p><p><span>✓</span>Componentes editáveis</p><p><span>✓</span>Regras documentadas</p><p><span>✓</span>Próximos passos definidos</p></div>
          <footer><strong>ENTREGA_01</strong><span>Sem arquivo misterioso.</span></footer>
        </div>
      </section>

      <section className="process-philosophy" aria-labelledby="philosophy-title">
        <p>PRINCÍPIO / 2026</p>
        <h2 id="philosophy-title">Nem todo projeto precisa das mesmas ferramentas.<br /><em>Mas todo projeto precisa de critério.</em></h2>
        <ol>
          <li><span>01</span>Entender</li><li><span>02</span>Investigar</li><li><span>03</span>Direcionar</li><li><span>04</span>Explorar</li><li><span>05</span>Refinar</li><li><span>06</span>Entregar</li>
        </ol>
        <strong>O método muda. O rigor não.</strong>
      </section>

      <section className="process-closing">
        <p>Você já viu o resultado.<br />Agora sabe o que aconteceu antes dele.</p>
        <div><a href="/work">Ver o trabalho <span aria-hidden="true">↗</span></a><a href="/contact">Começar uma conversa <span aria-hidden="true">↗</span></a></div>
      </section>
    </main>
  );
}
