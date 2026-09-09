# Sistema visual do portfólio

## Tipografia

- Display: Geist Sans 500/550, escala fluida de 3rem a 16rem, tracking entre -5,5% e -8%.
- Texto: Geist Sans, mínimo 16px para leitura contínua.
- Metadados: Geist Mono, 12–14px, caixa alta; 10–11px somente em informação secundária já existente.
- Contraste editorial: Georgia em itálico apenas para inflexões de voz.

## Grade e espaço

- Desktop: 12 colunas; gutter fluido de 20px a 72px.
- Mobile: composição própria com gutter de 18px e fluxo em uma coluna.
- Escala: 10–16, 20–32, 44–96 e 80–180px.
- Containers: largura total com gutters; texto longo limitado a aproximadamente 680px.

## Cor e superfícies

- Papel `#f1f0ea`, tinta `#111`, grafite `#262626`, cinza `#c7c5bf`.
- Vermelho `#b3422f` como eixo, estado ativo e decisão visual.
- Raio: 0; superfícies são editoriais e arquitetônicas.

## Imagem e proporções

- Cinema: 16:9; hero de projeto: 16:9 desktop e 4:5 mobile.
- Editorial: 4:5 e 1:1 para alterar densidade e criar respiro.
- Vídeo: H.264, muted, playsinline, poster e carregamento próximo da viewport.

## Movimento

- Corte 180ms; mudança 520ms; passagem longa 900ms.
- Easing principal: `cubic-bezier(.16,1,.3,1)`.
- Motion revela hierarquia, alinhamento e continuidade. Não intercepta scroll.
- Reduced motion substitui vídeo e timelines por posters e estados estáticos.
