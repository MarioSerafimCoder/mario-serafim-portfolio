import type { Metadata } from "next";
import { products } from "../../data/products";
import { NewsletterForm } from "../../components/newsletter-form";
import { FrameCorners } from "../../components/interaction/frame-corners";

export const metadata: Metadata = { title: "Loja — Mário Serafim", description: "Produtos digitais para o trabalho criativo." };

export default function ShopPage() {
  return (
    <main className="inner-page">
      <header className="page-hero shop-hero">
        <p>05 / Produtos digitais</p>
        <h1>Loja.</h1>
        <p>Ferramentas, sistemas e recursos para um processo criativo mais claro. Os primeiros lançamentos estão em desenvolvimento.</p>
      </header>

      <section className="shop-intro">
        <p>Nascidos da prática</p>
        <h2>Úteis por projeto.<br />Diretos por natureza.</h2>
        <p>Cada produto terá documentação, versão e licença claras. Nenhuma compra é processada enquanto a coleção estiver marcada como “em breve”.</p>
      </section>

      <div className="shop-filters" aria-label="Categorias de produtos">Todos · Modelos · Maquetes · Recursos · Ferramentas · Guias</div>
      <section className="product-grid" aria-label="Produtos em breve">
        {products.map((product) => (
          <a href={`/shop/${product.slug}`} key={product.slug} className="product-card" data-cursor="VER">
            <div className={`product-cover ${product.tone}`} role="img" aria-label={`Espaço reservado para capa de ${product.name}`}>
              <span>{product.id} / {product.category}</span>
              <strong>{product.name}</strong>
              <small>Sistema de produto / Prévia</small>
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

      <section className="newsletter">
        <p>Entre na lista</p>
        <h2>Novos produtos<br />estão nascendo.</h2>
        <NewsletterForm />
      </section>
    </main>
  );
}
