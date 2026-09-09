# Narrativa visual — versão com assets gerados
Data: 09/09/2026

## Entrega
Uma imagem-base gerada com GPT, uma tomada contínua de 8 segundos gerada no Google Flow, três frames WebP extraídos da mesma tomada para fallback. Nenhum case/cliente/logo foi inventado; a sequência é identificada como estudo visual autoral com IA.

## Assets
- Original GPT: docs/assets/narrative-source-gpt.png
- Vídeo para o site: public/media/narrative/direction-film.mp4 (1.337.247 bytes, 1280 × 720, sem áudio, H.264, keyframes frequentes para scrubbing).
- Matéria: public/media/narrative/matter.webp (59.934 bytes).
- Direção: public/media/narrative/direction.webp (29.430 bytes).
- Sistema: public/media/narrative/system.webp (43.028 bytes).
- Flow: https://flow.google.com/project/7377ee09-3e69-4901-9bae-148975e909e8
- Modelo indicado pelo editor: Gemini Omni Flash; resultado identificado pelo Flow como Omni 1.1 Flash.
- Uma geração solicitada. Custo informado pela interface: 12 créditos. Nenhuma compra ou nova assinatura realizada.
- Pollo AI não foi utilizado nesta etapa.

## VISUAL STORY
| Cena | História visual | Conteúdo do site |
| --- | --- | --- |
| 01 — Matéria | Os planos aparecem deslocados em um estúdio escuro | Toda ideia começa em aberto. |
| 02 — Direção | Os mesmos planos se alinham em torno do eixo vermelho | Direção é escolher o que fica. |
| 03 — Sistema | A composição abre seu ritmo e conduz aos projetos | Uma ideia. Um universo. |

## SCROLL PACING
Desktop: seção de 4,2 alturas de tela; 3,2 alturas efetivas de avanço da timeline, pois a última altura contém o stage. Mobile: seção de 3,1 alturas, enquadramento próprio com texto acima da composição.
0–10%: hold do primeiro frame.
10–34%: avanço para 35% da duração do filme.
34–44%: hold para leitura.
44–70%: alinhamento até 75% do filme.
70–90%: abertura até 98% do filme.
90–100%: hold final e escala discreta de saída; próximo conteúdo entra pelo scroll nativo.
Não há captura da roda de rolagem. Navegação por cenas e atalho para projetos. Frames estáticos quando não há vídeo. Sem JavaScript ou com movimento reduzido, apresentação estática em capítulos.

## Validação
Inspeção visual dos três frames: mesmos materiais e tomada, sem cortes independentes. A imagem-base foi criada pelo gerador nativo GPT; o vídeo pelo Flow conectado do usuário.
Home em 1920, 1440, 1280, 390 e 430 px: sem overflow horizontal, vídeo carregado sem erro, stage sticky na posição correta.
Navegação direta pelas três cenas, scroll nativo e retorno verificados no browser: cena Direção avança a aproximadamente 4,2 s; retorno à Matéria volta a 0 s.
Modo estático testado pelo botão Reduzir movimento. CSS prefers-reduced-motion também implementado; preferência do sistema operacional não foi alterada.
Compressão e extração de frames feitas localmente, sem nova geração. Vídeo sem áudio e sem reprodução automática.
Build, lint e testes registrados na tarefa.

## Prompt GPT (geração nativa)
Create ONE cinematic art direction photograph / physically plausible high-end 3D still, landscape 16:9 at high resolution, standalone image asset for a Brazilian art director portfolio narrative. NO text, NO letters, NO logos, NO interface, NO watermarks. A sculptural composition of exactly seven thin rectangular slabs (charcoal graphite, warm white uncoated paper, brushed dark metal) floating very close together above a dark charcoal studio floor. One narrow deep scarlet red vertical plane is the compositional axis. The slabs are slightly displaced, rotating at varied restrained angles, as a visual metaphor for an idea before it is organized. Composition concentrated in the RIGHT two thirds of the frame; LEFT third has clean dark negative space for HTML headings. Oblique architectural camera perspective, 50mm lens, tactile paper edges, soft directional gallery lighting from upper left, subtle shadows, exquisite physical textures. Blacks #111111, paper #f1f0ea, red #df1f2d. Mature editorial, architectural still life, restrained museum installation. No colorful gradients, no chrome spheres, no people, no fake client work, no actual brands. Keep all objects within central 70 percent so the scene can be reframed on mobile. This is the opening keyframe of a continuous film where the same slabs will slowly align into an ordered system; preserve crisp straight edges and clear separations.

## Prompt Flow
Use the uploaded image as the exact FIRST FRAME. One continuous 8-second architectural art-direction film, no cuts. Preserve the same seven upright rectangular slabs, graphite, paper white, brushed metal and the single scarlet axis, same materials, clean straight edges, no morphing. 0–2 seconds: restrained slow camera dolly, slightly separated planes. 2–5 seconds: the same slabs rotate smoothly around their vertical axes and move into a precisely aligned parallel rhythm around the red central plane, with physically plausible steady movement. 5–7 seconds: the aligned planes gently fan apart to reveal a clear narrow passage through the middle; the camera advances subtly toward that opening. 7–8 seconds: settle to a completely still final composition. Keep the left third dark and visually quiet for HTML typography added later. Dark studio, soft gallery lighting, tactile materials, sophisticated and minimal, same framing throughout, no sudden camera motion, no added objects, no text, no logos, no voice, no music.
