import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

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
  assert.match(html, /<title>Mário Serafim — Diretor Criativo &amp; Diretor de Arte<\/title>/i);
  assert.match(html, /Boas ideias[\s\S]*precisam/);
  assert.match(html, /Projetos selecionados/i);
  assert.match(html, /PRANCHA VIVA/i);
  assert.match(html, /Ver folha de contato/i);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("renderiza as principais páginas internas", async () => {
  const routes = [
    ["/work", /Da ideia/],
    ["/work/granistone", /matéria, peso e ritmo arquitetônico/],
    ["/archive", /Um registro em expansão/],
    ["/lab", /Testar rápido/],
    ["/about", /Direção não é decoração/],
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

test("expõe os novos sistemas editoriais em português", async () => {
  const work = await (await render("/work")).text();
  const lab = await (await render("/lab")).text();
  const about = await (await render("/about")).text();

  assert.match(work, /Folha de contato/i);
  assert.match(work, /Grade/);
  assert.match(lab, /Máquina de grade/i);
  assert.match(about, /Movimento/);
  assert.doesNotMatch(`${work}${lab}${about}`, /contact sheet|selected work|view all work|creative direction|motion graphics/i);
});

test("mantém os painéis fechados fora da tela e sem interação", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.overlay-menu\s*\{[^}]*overflow:hidden[^}]*visibility:hidden[^}]*pointer-events:none/s);
  assert.match(css, /\.overlay-menu\.is-open\s*\{[^}]*visibility:visible[^}]*pointer-events:auto/s);
  assert.match(css, /body\s*\{[^}]*overflow-x:hidden/s);
  assert.match(css, /@media\s*\(max-width:760px\)/);
});
