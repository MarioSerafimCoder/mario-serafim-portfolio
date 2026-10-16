# Redesign branco, preto e vermelho — versão de 16/10/2026

## Direção e implementação

- Fundo branco puro (#FFFFFF) na home, páginas internas, contato e rodapé. Texto principal #111111; vermelho #A61924 em assinatura, foco, links e detalhes.
- Instrument Sans servida localmente, com licença OFL incluída. A fonte substitui o carregamento anterior que caía em uma fonte de sistema.
- Abertura mais curta e projeto principal visível na primeira dobra de desktop. Grade de 12 colunas, duas imagens amplas intercaladas por um par de projetos, sem a célula vazia da versão anterior.
- Hovers com ampliação suave da imagem inteira, indicação de acesso ao case e linha vermelha. Links e controles têm foco visível; movimento reduzido é respeitado. Sem reprodução automática de vídeo.
- Home, galeria, quatro cases, sobre, abordagem, contato e rodapé compartilham o sistema branco. Textos revisados; etapas unificadas como Contexto, Direção e Sistema.
- Imagens de capa com versões de 640 px para celulares, carregamento posterior da galeria, fonte local e vídeo sem download antecipado. Open Graph atualizado.
- O endereço /work/reacesso foi mantido para preservar links antigos; o projeto ficou fora da seleção principal.
- Rooftop e Simetria agora têm narrativa completa de contexto, três decisões de projeto, aplicações e lista de entregáveis. A página de abordagem explica a estrutura da entrega; o contato mostra o que acontece depois do envio.

## Curadoria

| Projeto | Decisão |
| --- | --- |
| Rooftop Arquitetura | Abertura da seleção; assinatura arquitetônica e aplicação institucional em primeiro plano. |
| Simetria Estética | Presença do segmento de cuidado; marca original em recepção e detalhe de sinalização. |
| Amanda Araújo | Consultoria financeira; nova aplicação em pasta de apresentação, em lugar da caneca genérica. |
| Eduardo Noronha | Advocacia; papel texturizado em destaque, com recortes das aplicações originais. |
| REACESSO | Mantido em arquivo, fora da seleção. |
| Brenno Queiroz, Amazonita e outros | Material previamente reunido foi considerado na curadoria anterior; não entrou nesta seleção de quatro identidades. Não houve uma nova auditoria integral do Drive nesta retomada. |

## Materiais produzidos ou refinados

| Arquivo em public/ | Origem e uso |
| --- | --- |
| projects/rooftop-premium.webp | Cenário sem marca da etapa anterior + assinatura branca original extraída do manual. Composição definitiva com perspectiva; capa e case. |
| projects/simetria-premium.webp | Recepção sem marca da etapa anterior + assinatura original. Composição definitiva; capa e case. |
| projects/simetria-detail.webp | Recorte da composição, apresentando a assinatura de perto. |
| projects/rooftop-editorial.webp | Cenário de apresentação gerado no Gemini/Nano Banana; assinatura original aplicada depois da geração para preservar o desenho da marca. |
| projects/simetria-editorial.webp | Cenário de materiais de atendimento gerado no Gemini/Nano Banana; assinatura original aplicada depois da geração. |
| projects/amanda-premium.webp | Novo cenário gerado no Gemini em 15/10 e salvo localmente; aplicação do PNG original da marca em pasta grafite. |
| projects/amanda-signature.webp | Prancha com o PNG original, sem redesenho de letras ou símbolo. |
| projects/eduardo-paper.webp | Recorte do material original de papelaria, extraído da apresentação existente. |
| projects/eduardo-stationery.webp | Recorte do sistema de papelaria original. |
| projects/*-640.webp | Versões responsivas das quatro capas. |
| media/studies/stone.mp4 | Flow: estudo de 8 s, 720p, sem áudio, cerca de 833 kB. Integrado ao case Rooftop com poster e controles. |
| media/studies/paper.mp4 | Flow: estudo de 8 s, 720p, sem áudio, cerca de 675 kB. Salvo para revisão, NÃO integrado: o relevo poderia ser interpretado como uma marca inventada. |
| media/studies/*-poster.webp | Posters extraídos dos respectivos filmes. |
| fonts/ | Instrument Sans regular/medium e licença OFL. |
| og.png | Cartão social branco com tipografia preta, detalhe vermelho e aplicação Rooftop. |

As composições usam os desenhos originais das assinaturas. A marca não é uma camada independente no hover: imagem e assinatura foram reunidas no mesmo arquivo, eliminando o deslocamento entre elas. Os cenários digitais são identificados nos cases como estudos de aplicação, sem afirmar que representam instalações reais.

## Revisão

- Build de produção, verificação TypeScript e ESLint aprovados.
- Home inspecionada em desktop e viewport mobile de 390 px; fundo branco confirmado e sem transbordamento horizontal.
- Navegação mobile para Contato conferida; campos obrigatórios impedem envio vazio.
- Vídeo Rooftop testado por teclado: reprodução iniciada, duração de 8 s, sem áudio e sem erro.
- Galeria, sobre, processo e três demais cases inspecionados no navegador: sem imagens quebradas e sem transbordamento horizontal no desktop.
- Rooftop, Simetria, abordagem e contato conferidos novamente em desktop e mobile de 390 × 844 px após o aprofundamento dos cases.
- Nenhum erro de console observado na navegação revisada.
- Registros visuais em output/white-*.png e output/white-home-*.png.

## Limites e publicação

- Esta entrega permanece em prévia local; o código completo será enviado ao GitHub nesta etapa.
- O filme de papel foi produzido e salvo, mas rejeitado para exibição. Só o estudo de pedra e metal foi selecionado.
- Os novos mockups preservam as marcas rasterizadas; a qualidade máxima depende dos arquivos-fonte disponíveis. Eduardo usa a apresentação original, sem uma nova sessão de geração fotográfica.
- O fluxo de contato existente foi preservado. Ele registra o contato no banco; não há confirmação de envio automático de notificações ao Gmail.
- Nenhum plano foi contratado, nenhuma compra foi realizada e nenhum crédito adicional foi adquirido.
