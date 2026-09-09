# Revisão editorial — 09/09/2026

## Auditoria
Preservados: MS/, identidade em preto/papel/vermelho, fontes, quatro registros de projeto, rotas, laboratório, loja e gerador de briefing.
Problemas: abertura e manifesto adiam trabalhos; cases repetem metadados e composições sem informação adicional; lista de projetos ausente no HTML inicial; animação de seção extensa pode esconder conteúdo.

## Implementação
Home com Granistone na abertura, grid assimétrico e resumos existentes. Manifesto curto após os trabalhos. Cases com capa, descrição, papel, ano e navegação, removendo capítulos e galeria redundantes. Folha de contato renderizada no servidor. Revelação individual de projetos e preferência de movimento reduzido. Tokens em app/editorial.css; style tile em docs/style-tile.html.

## VISUAL STORY
| Cena | História visual | Conteúdo do site |
| --- | --- | --- |
| 01 | Assinatura junto de trabalho | Mário Serafim e Granistone |
| 02 | Escalas alternadas | Quatro projetos existentes |
| 03 | Pausa editorial | Boas ideias precisam de direção |
| 04 | Convite direto | Contato |

## SCROLL PACING
01: entrada estática, saída pelo fluxo nativo, cerca de 1 viewport, sem movimento contínuo/câmera.
02: entrada individual com opacity/translation, 450 ms de desaceleração, leitura estável em 0,8–1,2 viewport por trabalho, saída natural; retorno não oculta trabalhos já vistos.
03: pausa estática de cerca de 0,6 viewport, sem objeto/câmera; transição pelo fluxo.
04: contato estático sem retenção; duração depende do leitor.
Mobile: uma coluna. Movimento reduzido: sem transições. Nenhum vídeo ou sequência de frames.

## Antes / depois
Percepção profissional: menos discurso e repetição, maior prioridade visual aos trabalhos.
Direção e hierarquia: assinatura existente com escalas mais controladas e serif pontual.
UX: acesso direto aos projetos; HTML inicial com lista navegável.
Motion: sem interação contínua na abertura, revelações curtas por item.
Mobile: composição própria, metadados reorganizados e alvos legíveis.
Performance: menos DOM nos cases, hero sem hook de pointermove, sem novas dependências ou mídia pesada. Sem medição de Core Web Vitals em produção.

## Limitações
Não há fotografias, mockups ou peças reais dos projetos no diretório public; os visuais existentes são procedurais. Dados cadastrados preservados sem validação independente de autoria/cliente. A transformação em cases documentais completos requer os materiais reais.
Pollo AI conectado, mas geração indisponível na conta; nenhum asset gerado e nenhum serviço substituto usado.
Publicação ainda depende de autorização para substituir a versão pública.

## Validação
Build e nove testes de renderização/integrações aprovados. Lint dos arquivos alterados aprovado.
Home e 15 rotas internas verificadas em 1920, 1440, 1280, 390 e 430 px: nenhum overflow horizontal documental.
Inspeção visual da home desktop/mobile; acesso por âncora e abertura de menu testados. A emulação de preferência de movimento e touch físico não foi disponibilizada pela ferramenta; CSS revisado, sem alegar teste em dispositivo real.
