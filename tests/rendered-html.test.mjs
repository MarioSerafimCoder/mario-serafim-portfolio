import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";
import { projects } from "../data/projects.ts";

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

test("home apresenta a proposta e os cinco projetos reais", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<html[^>]*lang="pt-BR"/i);
  assert.match(html, /A percepção[\s\S]*constrói[\s\S]*valor/);
  assert.match(html, /Identidade visual &amp; direção de arte/i);
  assert.equal(projects.length, 5);
  for (const project of projects) {
    assert.match(html, new RegExp(`/work/${project.slug}`));
    assert.match(html, new RegExp(project.title));
    await access(new URL(`../public${project.cover}`, import.meta.url));
    for (const image of project.images) await access(new URL(`../public${image.src}`, import.meta.url));
  }
  assert.doesNotMatch(html, /Showreel|Outside the grid|Granistone A Rocha|Sacola \(/i);
});

test("navegação, cases e contato respondem com conteúdo útil", async () => {
  for (const [path, expected] of [
    ["/work", /Identidades com/],
    ["/process", /Forma com/],
    ["/about", /Uma direção/],
    ["/contact", /Vamos/],
    ["/privacy", /Formulário de contato/],
  ]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), expected, path);
  }
  for (const project of projects) {
    const response = await render(`/work/${project.slug}`);
    assert.equal(response.status, 200, project.slug);
    const html = await response.text();
    assert.match(html, new RegExp(project.title));
    assert.match(html, new RegExp(project.cover.replaceAll("/", "\\/")));
    assert.match(html, /Contexto e direção/);
    assert.match(html, /Próximo projeto/);
  }
  const contact = await (await render("/contact")).text();
  assert.match(contact, /Empresa ou marca/);
  assert.match(contact, /Sobre o projeto/);
  assert.match(contact, /marioserafim\.da@gmail\.com/);
  assert.doesNotMatch(contact, /Orçamento|Estágio profissional/);
});

test("endereços antigos conduzem às páginas atuais", async () => {
  const routes = [
    ["/lab", "/process"], ["/medicos", "/process"], ["/arquitetos", "/process"],
    ["/diagnostico", "/contact"], ["/archive", "/work"], ["/shop", "/work"], ["/license", "/terms"],
  ];
  for (const [path, destination] of routes) {
    const response = await render(path);
    assert.ok([301, 307, 308].includes(response.status), path);
    assert.equal(new URL(response.headers.get("location"), "http://localhost").pathname, destination);
  }
});
