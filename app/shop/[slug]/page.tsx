import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToBag } from "../../../components/add-to-bag";
import { getProduct, products } from "../../../data/products";

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return {
    title: `${product.name} — Mário Serafim`,
    description: product.description,
    openGraph: { title: `${product.name} — Mário Serafim`, description: product.description, images: [] },
    twitter: { title: `${product.name} — Mário Serafim`, description: product.description, images: [] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const related = products.filter((item) => item.slug !== product.slug);

  return (
    <main className="product-page">
      <div className={`product-main-cover ${product.tone}`} role="img" aria-label={`Composição abstrata em tons de cinza para ${product.name}`}>
        <span>{product.id} / {product.category}</span><strong>{product.name}</strong><small>Edição digital</small>
      </div>
      <section className="product-info">
        <p>{product.category} / {product.status === "coming-soon" ? "em breve" : "disponível"}</p>
        <h1>{product.name}</h1>
        <p className="product-description">{product.description}</p>
        <div className="product-price">R$ {product.price}</div>
        <AddToBag item={{ slug: product.slug, name: product.name, price: product.price }} disabled={product.status !== "available"} />
        <p className="checkout-note">Lançamento em breve.</p>
      </section>

      <section className="product-includes">
        <p>O que está incluído</p>
        <h2>Um sistema feito<br />para ser usado.</h2>
        <ol>{product.includes.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol>
      </section>

      <section className="product-details">
        <div><span>Compatibilidade</span><p>{product.compatibility.join(" / ")}</p></div>
        <div><span>Versão</span><p>{product.version}</p></div>
        <div><span>Tipo de arquivo</span><p>{product.fileType}</p></div>
        <div><span>Licença</span><p>{product.license}<br /><a href="/license">Ver licença ↗</a></p></div>
      </section>

      <section className="case-gallery product-gallery" aria-label={`Espaços reservados para prévia de ${product.name}`}>
        <div className="gallery-caption"><span>Sistema do produto</span></div>
        <div className="gallery-placeholder wide" aria-hidden="true" />
        <div className="gallery-split"><div className="gallery-placeholder square" aria-hidden="true" /><div className="gallery-placeholder square" aria-hidden="true" /></div>
      </section>

      {related.length > 0 && <section className="related-products"><p>Produtos relacionados</p>{related.map((item) => <a key={item.slug} href={`/shop/${item.slug}`}><span>{item.category}</span><strong>{item.name}</strong><span>Ver produto ↗</span></a>)}</section>}
    </main>
  );
}
