# Mário Serafim — Portfólio

Portfólio editorial de direção criativa, direção de arte, marcas e experiências digitais, com uma área de produtos digitais.

**Site público:** [mario-serafim-portfolio.mario-92.chatgpt.site](https://mario-serafim-portfolio.mario-92.chatgpt.site/)

## Desenvolvimento

Requer Node.js 22.

```bash
pnpm install
pnpm dev
```

Para gerar a versão de produção:

```bash
pnpm build
```

## Conteúdo e mídia

- Os projetos são cadastrados em `data/projects.ts`.
- Os produtos são cadastrados em `data/products.ts`.
- As áreas em tons de cinza são espaços temporários para imagens e vídeos.
- Os arquivos finais podem ser organizados em `public/projects/<slug>/` e `public/products/<slug>/`.

## Projetos e produtos

Ao adicionar um projeto em `data/projects.ts`, o índice, o arquivo e a página de case são atualizados a partir da mesma fonte. Produtos podem permanecer com o status `coming-soon` até que os arquivos e o pagamento estejam prontos.

Downloads pagos não devem ser armazenados diretamente na pasta `public`.

## Pagamentos — etapa futura

O catálogo e a sacola fazem parte do MVP. O checkout permanece desativado até a integração com Stripe. Use `.env.example` como referência e mantenha valores reais apenas no ambiente local ou nos segredos da hospedagem.

## Publicação

O projeto está configurado para OpenAI Sites e gera uma aplicação compatível com Cloudflare. Caso o domínio mude, atualize a URL base em `app/layout.tsx`, `app/sitemap.ts` e `app/robots.ts`.
