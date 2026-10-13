# Captação MS/

## Estado

Implementado e testado em banco D1 local. Nenhum banco de produção foi criado, migrado ou ativado nesta entrega. O manifest declara DB para a próxima publicação autorizada. O ID de banco no build local é um placeholder e nunca deve ser usado como identidade de um banco remoto real.

Destino dos registros: banco próprio, tabelas leads e lead_submissions. O contato profissional centralizado em data/contact.ts é marioserafim.da@gmail.com, confirmado pelo proprietário. Não existe envio automático de e-mail, notificação ou relatório: acompanhar a base é uma operação manual nesta etapa.

## Ativação após autorização de publicação

1. Provisionar o binding Cloudflare D1 DB na hospedagem e identificar o banco real.
2. Aplicar a migração gerada em drizzle/0000_small_naoko.sql no banco real. Fazer backup se já houver dados. No fluxo Sites, a migração é aplicada antes do Worker.
3. Configurar STUDIO_CONTACT_EMAIL=marioserafim.da@gmail.com e RATE_LIMIT_SALT com um valor aleatório privado na hospedagem. Não commitar segredos. Ativar LEAD_CAPTURE_ENABLED=true somente quando banco e atendimento estiverem preparados.
4. Publicar a versão autorizada e realizar um cadastro controlado. Conferir HTTP 201, registro, consentimento, origem e visibilidade na consulta administrativa. Excluir o contato de teste depois.
5. Manter LEAD_CAPTURE_ENABLED desativado caso a migração ou o teste falhe. A API responde 503; a interface não confirma cadastro e mantém os campos. O diagnóstico oferece recomendações locais sem afirmar persistência.

## Teste local reproduzível

Após instalar as dependências e gerar o build:

```text
pnpm exec wrangler d1 execute DB --local --config dist/server/wrangler.json --file drizzle/0000_small_naoko.sql --persist-to .wrangler/leads-test
pnpm exec wrangler dev --config dist/server/wrangler.json --port 4173 --persist-to .wrangler/leads-test --var LEAD_CAPTURE_ENABLED:true --var STUDIO_CONTACT_EMAIL:marioserafim.da@gmail.com --var RATE_LIMIT_SALT:local-test-only
```

O salt acima é exclusivamente de teste. Em Windows, os executáveis correspondentes ficam em node_modules/.bin/*.cmd. Pare o servidor antes de reconstruir o build para evitar bloqueio de arquivos.

## Contrato

POST /api/leads recebe JSON: name, email, kind (contact/diagnostic), segment (medicos/arquitetos/outro), stage (opções de data/diagnostic.ts), message, answers (sete inteiros de 0 a 2 para diagnóstico), campaign (UTMs permitidas), website (honeypot vazio), serviceConsent=true e marketingConsent booleano.

201 retorna saved=true e receipt somente após batch transacional. Erros: 400 payload/honeypot, 403 origem, 405 método, 413 corpo acima de 16 KB, 415 formato, 422 validação, 429 limite e 503 configuração/persistência. Não há endpoint público de leitura.

Um lead por e-mail normalizado. Cada envio preserva seu próprio consentimento, versão e respostas; atualizações não apagam o histórico. Rate limit: dez envios por identificador de rede/hora, derivado com salt. O cabeçalho de IP é fornecido pela Cloudflare; não expor o Worker por proxy que permita falsificá-lo. Origin é comparado com o host do pedido. Rate limit e honeypot reduzem spam, não impedem ataques distribuídos; acompanhar uso antes de ampliar campanhas.

## Consulta, exportação e exclusão

Usar acesso administrativo autenticado ao D1, nunca incluir credenciais no navegador. Consulta preparada para exportação via console/CLI D1:

```sql
SELECT l.id,l.name,l.email,s.kind,s.segment,s.stage,s.answers_json,
       s.campaign_json,s.message,s.service_consent,s.marketing_consent,
       s.consent_version,s.created_at
FROM leads l JOIN lead_submissions s ON s.lead_id=l.id
ORDER BY s.created_at DESC;
```

Não tratar consentimento antigo como autorização atual: usar o envio mais recente e registrar pedidos de revogação antes de qualquer comunicação. A futura plataforma deve tratar revogação/exclusão e retenção; nesta etapa o responsável atende solicitações pelo e-mail profissional e faz a operação administrativa. Para exclusão, remover submissões antes do lead, em transação. Revisar mensalmente contatos sem finalidade ativa e limitar acesso/exportações.

## Materiais dos cases

data/case-media.ts contém slots tipados (src, alt, caption, width, height). Inserir apenas imagens aprovadas e documentadas. Slots vazios são apresentados como materiais ainda não publicados, sem resultados ou entregas comerciais inventadas.
