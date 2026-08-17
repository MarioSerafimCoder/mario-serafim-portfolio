import type { Metadata } from "next";
import { products } from "../../data/products";
import { NewsletterForm } from "../../components/newsletter-form";

export const metadata: Metadata = { title: "Shop — Mário Serafim", description: "Digital tools for creative work." };

export default function ShopPage() {
  return (
    <main className="inner-page">
      <header className="page-hero shop-hero">
        <p>05 / Digital tools</p>
        <h1>Shop.</h1>
        <p>Tools, systems and resources for clearer creative work. The first releases are currently in development.</p>
      </header>

      <section className="shop-intro">
        <p>Built from practice</p>
        <h2>Useful by design.<br />Quiet by default.</h2>
        <p>Each product will be documented, versioned and delivered with a clear license. No purchase is processed while the collection is marked coming soon.</p>
      </section>

      <div className="shop-filters" aria-label="Product categories">All · Templates · Mockups · Assets · Tools · Guides</div>
      <section className="product-grid" aria-label="Products coming soon">
        {products.map((product) => (
          <a href={`/shop/${product.slug}`} key={product.slug} className="product-card">
            <div className={`product-cover ${product.tone}`} role="img" aria-label={`${product.name} cover placeholder`}>
              <span>{product.id} / {product.category}</span>
              <strong>{product.name}</strong>
              <small>Product cover pending</small>
            </div>
            <div><span>{product.name}</span><span>{product.status === "coming-soon" ? "Coming soon" : `R$ ${product.price}`}</span></div>
          </a>
        ))}
      </section>

      <section className="shop-principles">
        <p>Collection principles</p>
        {["Clear structure", "Editable systems", "Practical documentation", "Considered licensing"].map((item, index) => (
          <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>
        ))}
      </section>

      <section className="newsletter">
        <p>Join the list</p>
        <h2>New tools<br />are being built.</h2>
        <NewsletterForm />
      </section>
    </main>
  );
}
