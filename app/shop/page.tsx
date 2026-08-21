import type { Metadata } from "next";
import { products } from "../../data/products";
import { FrameCorners } from "../../components/interaction/frame-corners";

export const metadata: Metadata = { title: "Loja — Mário Serafim", description: "Produtos digitais para o trabalho criativo." };

export default function ShopPage() {
  return (
    <main className="inner-page">
      <header className="page-hero shop-hero">
        <p>05 / Produtos digitais</p>
        <h1>Loja.</h1>
        <p>Ferramentas, sistemas e recursos digitais para processos criativos mais claros e bem dirigidos.</p>
      </header>

      <section className="shop-intro">
        <p>Nascidos da prática</p>
        <h2>Úteis por projeto.<br />Diretos por natureza.</h2>
        <p>Cada produto combina estrutura, edição simples e documentação objetiva.</p>
      </section>

      <section className="product-grid" aria-label="Produtos digitais">
        {products.map((product) => (
          <a href={`/shop/${product.slug}`} key={product.slug} className="product-card" data-cursor="VER">
            <div className={`product-cover ${product.tone}`} role="img" aria-label={`Composição abstrata em tons de cinza para ${product.name}`}>
              <span>{product.id} / {product.category}</span>
              <strong>{product.name}</strong>
              <small>Edição digital</small>
              <FrameCorners />
            </div>
            <div><span>{product.name}</span><span>{product.status === "coming-soon" ? "Em breve" : `R$ ${product.price}`}</span></div>
          </a>
        ))}
      </section>

      <section className="shop-principles">
        <p>Princípios da coleção</p>
        {["Estrutura clara", "Sistemas editáveis", "Documentação prática", "Licença objetiva"].map((item, index) => (
          <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>
        ))}
      </section>
    </main>
  );
}
