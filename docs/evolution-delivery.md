# Evolução do portfólio - entrega

## Direção de arte e UX

O portfólio conserva MS/, Schibsted Grotesk, Geist Mono, papel editorial, preto e vermelho, serifas pontuais, assimetria e narrativa em movimento. A camada commercial.css trabalha hierarquia e legibilidade; não substitui os estilos nem remove os recursos de movimento reduzido.

Antes: nome/showreel dominavam o acesso inicial e projetos exigiam atravessar a narrativa. Depois: hero preservado com posicionamento, Conhecer projetos, Avaliar minha marca e atalhos para serviços e contato. A seção de especialidades aparece depois dos projetos, com acesso direto a partir do hero. Medicina usa tipografia serena e superfície clara; arquitetura usa preto, eixo vertical e contraste. Now e trajetória permanecem pessoais.

Antes: cases repetiam o mesmo título e sucessivas composições sem distinguir aplicações documentadas. Depois: aberturas específicas, leitura mais confortável, campos para materiais aprovados e identificação explícita dos visuais como estudos. Não foram criados clientes, métricas, depoimentos nem mockups comerciais fictícios.

Antes: contato gerava um briefing para envio manual, com faixas fixas de investimento e e-mail corporativo. Depois: formulário direto, campos essenciais, consentimentos separados e confirmação condicionada à persistência. O investimento depende do contexto. Contato central: marioserafim.da@gmail.com.

## Rotas novas

/medicos, /arquitetos, /diagnostico, /diagnostico/medicos, /diagnostico/arquitetos. Sitemap atualizado. As 16 rotas anteriores continuam acessíveis e /lab mantém redirecionamento para /process.

O diagnóstico tem sete perguntas, com apresentação específica por segmento, progresso, retorno sem perder respostas, autorização de atendimento e marketing opcional. O relatório prioriza pontos que o visitante indicou como incompletos; não simula auditoria. Os dados ficam no formulário se o servidor falhar. Nesse caso é possível abrir somente as recomendações locais, identificadas como não cadastradas.

## Arquivos

- app/page.tsx, app/layout.tsx, components/motion/hero-artboard.tsx: integração e hero.
- app/commercial.css, components/specialties.tsx, components/segment-page.tsx: direção editorial e especialidades.
- app/medicos/, app/arquitetos/, app/diagnostico/: novas páginas.
- components/lead-form.tsx, data/diagnostic.ts, data/campaign.ts: diagnóstico, formulário e origem da campanha durante a sessão.
- app/contact/page.tsx, data/contact.ts, app/privacy/page.tsx: contato e transparência.
- components/site-chrome.tsx, app/sitemap.ts: navegação brasileira e descoberta.
- data/case-media.ts, components/projects/case-applications.tsx, components/projects/project-card.tsx, app/work/[slug]/page.tsx: cases e estrutura de imagens.
- worker/leads.ts, worker/index.ts, db/schema.ts, drizzle/0000_small_naoko.sql, .openai/hosting.json: API e armazenamento.
- tests/leads.test.mjs: persistência, duplicidades, consentimentos, falhas e limites.

## Validação executada

Build, tsc --noEmit e ESLint aprovados. Quinze testes automatizados aprovados: dez existentes de renderização/comportamento, dois de timeline e três de API com SQLite transacional real.

Navegador Chromium/Edge: 21 rotas em 375, 430, 768, 1024, 1440 e 1920 px (126 combinações), HTTP 200, sem overflow horizontal e sem erros JavaScript. Cadastro de contato e diagnóstico enviados pela interface ao Worker e confirmados diretamente em D1 local. Retorno do diagnóstico preserva respostas. Menu fecha por Escape e restaura foco. Revisão visual de capturas desktop/mobile, incluindo correção de quebra tipográfica do contato.

Capturas e log completo: output/evolution/. O registro anterior está em tmp/pdfs/site-visual-2026-10-13/ e no PDF fornecido anteriormente. A comparação tem uma limitação: a captura anterior é do site publicado, enquanto esta entrega parte do commit mais recente, que já tinha refinamentos posteriores. Não atribuir a esta entrega essas mudanças anteriores.

## Pendências reais

Ativar banco/migração/variáveis de produção e testar após autorização de publicação, conforme lead-capture.md. Não houve deploy, migração remota, envio de e-mail nem mudança no site público. Não existe notificação automática de leads: consulta administrativa é necessária. Materiais definitivos dos cases dependem do proprietário. O CRM completo, exportação via interface e envio do relatório por e-mail permanecem fora desta etapa.
