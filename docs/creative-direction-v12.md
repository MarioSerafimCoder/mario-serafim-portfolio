# Evolução de direção criativa — entrega

## Problema original

A base já tinha uma identidade editorial consistente e bons componentes interativos, mas a home começava a explicar antes de mostrar. A tese visual fazia o papel de filme e de argumento ao mesmo tempo, os projetos ainda eram lidos em sequência contínua, o Lab estava isolado e os cases publicados terminavam logo após a introdução.

## Alterações realizadas

- Home reorganizada em SHOW → EXPLAIN → DECONSTRUCT → SHOW AGAIN.
- Showreel de 8 segundos inserido imediatamente após o hero.
- Tese visual ampliada para Ideia → Direção → Sistema → Experiência.
- Selected Work preserva os quatro projetos, altera escala/proporção e inclui uma quebra de manifesto após o segundo case.
- Três experiências do Lab integradas à home.
- Cases passam a ter seis capítulos: Impacto, Por quê, A ideia, Construindo o universo, Sistema em movimento e Resultado.
- Loja e sacola removidas da navegação enquanto não há produto disponível; rotas e código foram preservados.
- Transições entre páginas mantidas com View Transitions progressivas.

## Motion

O showreel usa cortes de dois segundos e tipografia HTML sincronizada. A tese visual liga scroll a uma timeline de quatro atos, com pausas para leitura e sem interceptar o scroll. Cards variam sua resposta conforme o conceito de cada projeto. Reduced motion mostra posters e capítulos estáticos.

## Vídeos

Quatro takes de 4 segundos foram gerados no Google Flow com Omni 1.1 Flash, 720p, 16:9, e montados em um loop H.264 de 8 segundos. A interface indicou 7 créditos por take, total estimado de 28 créditos incluídos no plano. O vídeo final tem aproximadamente 1,49 MB e não contém áudio.

Os prompts finais e o storyboard estão em `creative/video-prompts/`.

## Ícones

Nenhum novo ícone raster foi necessário. A interface usa símbolos tipográficos existentes e controles nativos; gerar pictogramas adicionais acrescentaria ornamento sem função. O sistema de ícones solicitado permanece reservado para uma necessidade funcional real.

## Mobile e performance

- Showreel assume proporção 4:5 no mobile; Lab muda para uma coluna; cases reorganizam capítulos e imagens.
- Vídeos usam poster, H.264, muted, playsinline e preload de metadados.
- Imagens têm dimensões reservadas; não há nova biblioteca de animação.
- Motion usa transform e opacity; dispositivos com movimento reduzido recebem composição estática.

## Arquivos principais

- `app/page.tsx`, `app/layout.tsx`, `app/narrative.css`, `app/experience.css`
- `app/work/[slug]/page.tsx`
- `components/motion/hero-artboard.tsx`, `showreel.tsx`, `visual-story.tsx`, `story-timeline.ts`
- `components/home-lab.tsx`, `components/site-chrome.tsx`, `components/interaction/artboard-system.tsx`
- `public/media/showreel/showreel.mp4`, `public/media/showreel/poster.webp`
- `creative/video-prompts/*.md`, `docs/design-system.md`

## Dependências de conteúdo

Os cases foram dirigidos a partir do conteúdo real que já existia no projeto, sem inventar clientes, métricas ou resultados comerciais. Fotografias finais, mockups reais, números de resultado, escopo detalhado e créditos de equipe ainda dependem do material do autor e podem substituir as composições procedurais sem alterar a arquitetura.
