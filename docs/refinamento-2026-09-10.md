# Refinamento do portfólio — 10/09/2026

Evolução da implementação atual, mantendo as rotas, a arquitetura da home, a folha de contato e a paleta. O foco foi peso tipográfico, hierarquia, ritmo editorial e decisões mais explícitas no conteúdo.

## Decisões e justificativas

- **Tipografia:** Schibsted Grotesk variável (400–900) via next/font/google, com Geist Mono 400/500 para informações técnicas. Removido o import de Geist Sans. A versão compilada entrega as fontes pelo próprio domínio, com fallback ajustado e display swap.
- **Hero:** MÁRIO / SERAFIM em duas linhas, peso 900, entrelinha 0,81–0,82 e tracking −0,055 em. Escala recalibrada para a largura real da Schibsted; o ponto final permanece inteiro no celular. A serif aparece apenas no comentário secundário do hero, usando Georgia do sistema, sem download adicional.
- **Headlines:** pesos 750–850, tracking −0,025 a −0,04 em e entrelinhas adequadas à função. Títulos de cases e páginas respeitam palavras inteiras; as regras antigas de compressão extrema foram suavizadas na origem. Textos corridos usam peso 400/500 e entrelinha próxima de 1,45.
- **Home:** preservada a ordem dos blocos. O intervalo entre projetos passa de manifesto em tela cheia a uma pausa curta sobre papel. Now, trajetória e arquivo pessoal têm menor escala e menos altura: os projetos e os grandes momentos tipográficos recuperam protagonismo.
- **Processo:** mantidas as seis etapas e suas composições distintas. Briefing recebe prazo e critério de avaliação; Imersão mantém os estudos existentes, com crops e cores preservadas; Direção troca o painel vermelho pelo espaço negativo e três critérios; Exploração ocupa a largura da página como folha de contato; Refinamento preserva a comparação de formatos; Entrega termina organizada. O encerramento passa a ser escuro, reduzindo a área vermelha.
- **Interações:** removidos o cursor decorativo, a distorção dos títulos ao rolar, o indicador de grade sempre visível e os reveals globais de conteúdo. Grade e atalhos continuam disponíveis. O showreel mantém o vídeo, remove palavras animadas sobre a imagem e ganha controle de pausa. Navegação, fechamento por Escape e retorno de foco foram preservados.
- **Contraste:** textos pequenos em vermelho sobre papel e labels sobre fundo vermelho usam o vermelho escuro já existente na paleta. O modo de movimento reduzido apresenta a narrativa estática e mantém vídeos pausados.

## Textos revisados

| Área | Resultado |
| --- | --- |
| Hero | “Boas ideias precisam de direção.” / “E de alguém que faça escolhas.” |
| Intervalo entre projetos | “A linguagem muda. O cuidado com a execução, não.” |
| Now | “Agora, na Granistone.” / contexto de pedra natural, marca e presença digital |
| Apresentação | Primeira pessoa: “Sou Mário Serafim…”; atuação e responsabilidade descritas diretamente |
| Processo na home | “Entre o pedido e a entrega, há pesquisa, tentativas e cortes.”; CTA “Ver processo” |
| Imersão | “Uma pasta cheia não é uma direção.” |
| Direção | “Uma direção. Razões claras.”; ideia, linguagem e critério |
| Refinamento | “Escolher também é criar.” / “Se só funciona no mockup, ainda falta trabalho.” |
| Entrega | “Aprovação encerra uma etapa. Entrega exige que outra pessoa consiga continuar.” |
| Sobre | “Repertório abre possibilidades. Critério decide.”; ponto de vista sem assinatura visual imposta a todos os projetos |
| Projetos e cases | Introduções mais diretas; “sistema” substituído por linguagem, relação entre planos e hierarquia onde era redundante |
| Contato | “Prepare o briefing. Você escolhe como enviar.”; status de cópia esclarece que o envio ainda precisa acontecer |
| Loja | Recursos e arquivos editáveis, sem repetir “sistemas” como promessa |
| CTA final | “Qual é o projeto?” |

“Sistemas” continua onde é uma categoria ou informação técnica. Menu e rodapé mantêm os rótulos curtos existentes; os textos legais foram inspecionados e preservados. Não foram adicionadas credenciais profissionais, experiências ou resultados de cliente.

## Materiais reutilizados

- public/media/narrative/matter.webp — 59.934 bytes: textura e presença, crop na Imersão.
- public/media/narrative/direction.webp — 29.430 bytes: contraste e enquadramento.
- public/media/narrative/system.webp — 43.028 bytes: ritmo e repetição.
- public/media/narrative/direction-film.mp4 — narrativa existente preservada.
- public/media/showreel/poster.webp e showreel.mp4 — preservados, agora com menos interferência tipográfica e controle de pausa.
- Composições procedurais dos quatro projetos, documento de briefing, rotas de exploração e demonstração de formatos — reaproveitados.

**Nenhum asset novo foi gerado.** Os estudos da Imersão são identificados como autorais com IA. As alternativas de Exploração são identificadas como exercício editorial sem vínculo com cliente. Não há fotografias ou aplicações reais de cases no repositório: essa parte do pedido permanece dependente de material real. Os estudos existentes não foram apresentados como documentação de clientes.

## Validação

- Lint: aprovado, código de saída 0.
- Typecheck (tsc --noEmit): aprovado, código de saída 0.
- Build (vinext build): aprovado, código de saída 0. O framework informa que algumas rotas não são classificáveis estaticamente; isso não impediu compilação ou renderização.
- Suíte existente: 12 testes aprovados, 0 falhas. A expectativa da etapa 05 foi atualizada para Refinamento.
- Navegador na versão compilada: home em 320, 375, 430, 768, 1024, 1440 e 1920 px; Processo, Sobre, Projetos, Queen Aquamarine e Contato em 375, 768 e 1440 px. Sem overflow de títulos visíveis, sem erro JavaScript nas rotas verificadas.
- Fontes: Schibsted Grotesk confirmada no estilo computado; nenhuma requisição de fonte a Google em runtime; saída contém apenas Schibsted e a configuração vigente de Geist Mono. Caches antigos foram movidos para backup local e não entram no pacote.
- CLS observado: 0 nas navegações locais medidas. Esta é uma medição de laboratório local, não uma garantia para todas as redes e dispositivos.
- Menu: abertura, Escape e restauração de foco verificados em 375, 768 e 1440 px.
- Formatos: Cartaz, Mobile, Deck e OOH verificados sem texto saindo do quadro nas três larguras.
- Showreel: pausa e retomada verificadas; preferência por movimento reduzido mantém os vídeos pausados.
- Âncora Refinamento: navegação verificada; o identificador antigo #sistema continua disponível para links existentes.
- Inspeção visual de hero, Processo, Imersão, Direção e Exploração, incluindo screenshots desktop/mobile.

A prévia utiliza a versão compilada. O modo de desenvolvimento do Vinext desta instalação não inseriu as regras de fonte no navegador; a versão compilada foi verificada com fontes locais carregadas. Não foi alterado o framework para contornar esse comportamento de desenvolvimento.

## Pendências

1. Incorporar fotografias, impressos, embalagens e aplicações reais quando esses materiais forem fornecidos. A ausência está documentada; nenhum processo de cliente foi inventado.
2. Publicação: o site existente tem acesso público. A versão será salva para revisão; a implantação pública depende de autorização específica.

## Arquivos alterados

- [app/about/page.tsx](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/app/about/page.tsx)
- [app/contact/page.tsx](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/app/contact/page.tsx)
- [app/editorial.css](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/app/editorial.css)
- [app/experience.css](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/app/experience.css)
- [app/globals.css](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/app/globals.css)
- [app/layout.tsx](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/app/layout.tsx)
- [app/narrative.css](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/app/narrative.css)
- [app/page.tsx](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/app/page.tsx)
- [app/process.css](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/app/process.css)
- [app/process/page.tsx](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/app/process/page.tsx)
- [app/refinement.css](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/app/refinement.css)
- [app/shop/[slug]/page.tsx](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/app/shop/[slug]/page.tsx)
- [app/shop/page.tsx](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/app/shop/page.tsx)
- [app/work/[slug]/page.tsx](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/app/work/[slug]/page.tsx)
- [app/work/page.tsx](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/app/work/page.tsx)
- [components/home-process.tsx](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/components/home-process.tsx)
- [components/interaction/artboard-system.tsx](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/components/interaction/artboard-system.tsx)
- [components/interaction/exploded-composition.tsx](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/components/interaction/exploded-composition.tsx)
- [components/motion/hero-artboard.tsx](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/components/motion/hero-artboard.tsx)
- [components/motion/showreel.tsx](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/components/motion/showreel.tsx)
- [components/motion/story-timeline.ts](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/components/motion/story-timeline.ts)
- [components/process/format-tester.tsx](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/components/process/format-tester.tsx)
- [components/profile/home-profile.tsx](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/components/profile/home-profile.tsx)
- [components/site-chrome.tsx](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/components/site-chrome.tsx)
- [content/profile.ts](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/content/profile.ts)
- [tests/rendered-html.test.mjs](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/tests/rendered-html.test.mjs)
- [app/art-direction.css](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/app/art-direction.css)
- [docs/refinamento-2026-09-10.md](C:/Users/MarioSerafimdaSilvaN/Downloads/NOVOSITE/docs/refinamento-2026-09-10.md)

Os arquivos de verificação e screenshots ficam em tmp/refinement-qa e não entram no código publicado. Este relatório também integra a entrega.
