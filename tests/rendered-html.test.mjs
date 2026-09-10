import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { buildBriefing, buildMailtoUrl, buildWhatsAppUrl } from "../data/contact.ts";
import { getDefaultContactSheetMode } from "../components/projects/contact-sheet-mode.ts";
import { commerceEnabled, isCommerceEnabled } from "../data/products.ts";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Não encontrado", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renderiza a página inicial em português", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="pt-BR"/i);
  assert.match(html, /<title>Mário Serafim — Creative Director \/ Art Director<\/title>/i);
  assert.match(html, /Boas ideias[\s\S]*precisam/);
  assert.match(html, /Projetos selecionados/i);
  assert.match(html, /Showreel de Mário Serafim/i);
  assert.match(html, /Da matéria à experiência/i);
  assert.match(html, /Creative \/ Art Direction at Granistone A Rocha/i);
  assert.match(html, /Outside the grid/i);
  assert.match(html, /O resultado[\s\S]*vem depois/i);
  assert.match(html, /Ver folha de contato/i);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("renderiza as principais páginas internas", async () => {
  const routes = [
    ["/work", /Da matéria/],
    ["/work/granistone", /Granistone[\s\S]*matéria/i],
    ["/archive", /Um registro em expansão/],
    ["/process", /O resultado é a parte que todo mundo vê/],
    ["/about", /Mário,[\s\S]*em contexto/],
    ["/shop", /Princípios da coleção/],
    ["/shop/brand-presentation-system", /O que está incluído/],
    ["/contact", /O que acontece depois/],
  ];

  for (const [path, expected] of routes) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), expected, path);
  }
});

test("expõe a narrativa profissional e os sistemas editoriais", async () => {
  const work = await (await render("/work")).text();
  const process = await (await render("/process")).text();
  const about = await (await render("/about")).text();

  assert.match(work, /Folha de contato/i);
  assert.match(work, /Grade/);
  assert.match(process, /Briefing[\s\S]*Imersão[\s\S]*Direção[\s\S]*Exploração[\s\S]*Sistema[\s\S]*Entrega/i);
  assert.match(about, /Granistone A Rocha/);
  assert.match(about, /UX Design para desenvolvedores/);
  assert.match(about, /Centro Universitário Belas Artes/);
  assert.match(process, /O método muda\. O rigor não\./);
  assert.doesNotMatch(`${work}${process}${about}`, /Your site is taking shape|Building your site/i);
});

test("redireciona o endereço antigo do Lab para Processo", async () => {
  const response = await render("/lab");
  assert.ok([301, 307, 308].includes(response.status));
  assert.equal(new URL(response.headers.get("location"), "http://localhost").pathname, "/process");
});

test("mantém os painéis fechados fora da tela e sem interação", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.overlay-menu\s*\{[^}]*overflow:hidden[^}]*visibility:hidden[^}]*pointer-events:none/s);
  assert.match(css, /\.overlay-menu\.is-open\s*\{[^}]*visibility:visible[^}]*pointer-events:auto/s);
  assert.match(css, /body\s*\{[^}]*overflow-x:hidden/s);
  assert.match(css, /@media\s*\(max-width:760px\)/);
});

test("oculta a sacola enquanto o catálogo não possui produto disponível", async () => {
  assert.equal(commerceEnabled, false);
  assert.equal(isCommerceEnabled([{ status: "coming-soon" }, { status: "draft" }]), false);
  assert.equal(isCommerceEnabled([{ status: "coming-soon" }, { status: "available" }]), true);

  const home = await (await render("/")).text();
  const product = await (await render("/shop/brand-presentation-system")).text();
  assert.doesNotMatch(home, /Sacola \(/i);
  assert.doesNotMatch(home, /href="\/shop"/i);
  assert.doesNotMatch(product, /Colocar na sacola|R\$ 79/i);
  assert.match(product, /Disponibilidade[\s\S]*Em breve/i);
});

test("resolve o modo inicial da folha de contato por capacidade", () => {
  assert.equal(getDefaultContactSheetMode(false), "grid");
  assert.equal(getDefaultContactSheetMode(true), "index");
});

test("marca a seção ativa em rotas principais e filhas", async () => {
  const work = await (await render("/work/granistone")).text();
  const shop = await (await render("/shop/brand-presentation-system")).text();
  assert.match(work, /href="\/work" aria-current="page"/);
  assert.doesNotMatch(shop, /href="\/shop" aria-current="page"/);
});

test("gera briefing e URLs seguras com caracteres especiais", () => {
  const briefing = buildBriefing({
    name: "Mário & Ana",
    email: "mario+projeto@example.com",
    company: "Estúdio / Norte",
    projectType: "Identidade de marca",
    budget: "R$ 15 mil — 30 mil",
    timeline: "São Paulo + Fortaleza",
    message: "Criação & direção\nSistema A/B + lançamento",
  });
  assert.match(briefing, /Mário & Ana/);
  assert.match(briefing, /Criação & direção\nSistema A\/B \+ lançamento/);

  const mailto = buildMailtoUrl("contato@example.com", "Novo projeto — Mário & Ana", briefing);
  const whatsapp = buildWhatsAppUrl(briefing);
  assert.match(mailto, /^mailto:contato@example\.com\?subject=/);
  assert.match(mailto, /%26|%2F|%2B|%0A/);
  assert.match(whatsapp, /^https:\/\/wa\.me\/\?text=/);
  assert.equal(decodeURIComponent(mailto.split("&body=")[1]), briefing);
  assert.equal(decodeURIComponent(whatsapp.split("?text=")[1]), briefing);
});

test("centraliza o fechamento de overlays e restaura foco sem rolar", async () => {
  const source = await readFile(new URL("../components/site-chrome.tsx", import.meta.url), "utf8");
  assert.match(source, /const closeOverlay = useCallback/);
  assert.match(source, /focus\(\{ preventScroll: true \}\)/);
  assert.doesNotMatch(source.replace(/const closeOverlay[\s\S]*?\}, \[\]\);/, ""), /setOverlay\(null\)/);
});


