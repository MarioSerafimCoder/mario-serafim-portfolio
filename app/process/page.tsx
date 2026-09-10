/* eslint-disable @next/next/no-img-element -- native images avoid a vinext hydration conflict verified in browser QA */
import type { Metadata } from "next";
import { FormatTester } from "../../components/process/format-tester";

export const metadata: Metadata = {
  title: "Processo — Mário Serafim",
  description: "Do briefing à entrega: contexto, exploração e critério nas decisões de direção de arte de Mário Serafim.",
};

const processIndex = [
  ["01", "Briefing", "briefing"],
  ["02", "Imersão", "imersao"],
  ["03", "Direção", "direcao"],
  ["04", "Exploração", "exploracao"],
  ["05", "Refinamento", "refinamento"],
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
          <p>Entender o pedido, encontrar uma direção e testar até onde ela se sustenta. O método se ajusta ao projeto; as decisões precisam ter motivo.</p>
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
              <div><dt>Prazo</dt><dd>Quando precisa estar pronto</dd></div>
              <div><dt>Critério</dt><dd>Como avaliar a resposta</dd></div>
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
          <div><p>Investigo a categoria, observo hábitos e cruzo referências de imagem, cultura e tipografia. Procuro o que se repete e o que ainda tem espaço.</p><strong>Uma pasta cheia não é uma direção.</strong></div>
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
          <p>ESTUDOS AUTORAIS COM IA<br />MATÉRIA / CONTRASTE / RITMO</p>
        </div>
      </section>

      <section id="direcao" className="process-stage process-stage--direction" aria-labelledby="direcao-title">
        <div className="process-copy">
          <p><span>03</span> Direção</p>
          <h2 id="direcao-title">Pesquisa sem decisão<br />é só pesquisa.</h2>
          <div><p>O material bruto vira uma hipótese clara. Defino o que sustenta a ideia, o que cria diferença e o que precisa sair.</p><strong>Direção também é dizer não.</strong></div>
        </div>
        <div className="direction-synthesis" aria-label="Da informação ao critério de direção">
          <p>Informação <span aria-hidden="true">→</span> Padrão <span aria-hidden="true">→</span> Tensão</p>
          <strong>Uma direção.<br />Razões claras.</strong>
          <dl><div><dt>Ideia</dt><dd>O que merece ser dito.</dd></div><div><dt>Linguagem</dt><dd>Como aquilo precisa parecer.</dd></div><div><dt>Critério</dt><dd>O que fica. O que sai. Por quê.</dd></div></dl>
        </div>
      </section>

      <section id="exploracao" className="process-stage process-stage--exploration" aria-labelledby="exploracao-title">
        <div className="process-copy">
          <p><span>04</span> Exploração</p>
          <h2 id="exploracao-title">A primeira ideia<br />tem concorrência.</h2>
          <div><p>Abro rotas, confronto soluções e levo as promissoras longe o bastante para descobrir onde quebram.</p><strong>Se tudo parece bom, faltou editar.</strong></div>
        </div>
        <div className="contact-study" aria-label="Folha de contato com quatro explorações gráficas simuladas">
          <p className="study-caption">EXERCÍCIO EDITORIAL / ROTAS SIMULADAS, SEM VÍNCULO COM CLIENTE</p>
          <article className="study-card study-card--a"><header><span>A / 01</span><b>DESCARTADA</b></header><div><strong>UMA</strong><i /></div><p>Bonita. Previsível.</p></article>
          <article className="study-card study-card--b"><header><span>B / 07</span><b>QUASE</b></header><div><i /><strong>IDEIA</strong></div><p>Tem ritmo. Falta motivo.</p></article>
          <article className="study-card study-card--c"><header><span>C / 12</span><b>FORÇA DEMAIS</b></header><div><strong>!</strong><i /><i /></div><p>Grita antes de falar.</p></article>
          <article className="study-card study-card--d"><header><span>D / 18</span><b>AGORA SIM</b></header><div><strong>DIREÇÃO</strong><i /></div><p>Ideia, função e forma.</p></article>
        </div>
      </section>

      <section id="refinamento" className="process-stage process-stage--system" aria-labelledby="refinamento-title">
        <span id="sistema" className="process-legacy-anchor" aria-hidden="true" />
        <div className="process-copy">
          <p><span>05</span> Refinamento</p>
          <h2 id="refinamento-title">Escolher também<br />é criar.</h2>
          <div><p>Comparo proporções, ajusto intervalos e testo a leitura de perto e de longe. A escolha precisa se sustentar no cartaz, na apresentação e na tela pequena.</p><strong>Se só funciona no mockup, ainda falta trabalho.</strong></div>
        </div>
        <FormatTester />
      </section>

      <section id="entrega" className="process-stage process-stage--delivery" aria-labelledby="entrega-title">
        <div className="process-copy">
          <p><span>06</span> Entrega</p>
          <h2 id="entrega-title">O trabalho precisa<br />sobreviver sem mim.</h2>
          <div><p>Organizo arquivos, orientações e exemplos para quem vai usar o trabalho. Aprovação encerra uma etapa. Entrega exige que outra pessoa consiga continuar.</p><strong>final_final_agora-vai.psd não conta.</strong></div>
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
        <p>O critério aparece<br />no trabalho.</p>
        <div><a href="/work">Ver o trabalho <span aria-hidden="true">↗</span></a><a href="/contact">Começar uma conversa <span aria-hidden="true">↗</span></a></div>
      </section>
    </main>
  );
}
