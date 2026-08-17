import type { Metadata } from "next";
import Link from "next/link";
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
      <div className={`product-main-cover ${product.tone}`} role="img" aria-label={`${product.name} hero placeholder`}>
        <span>{product.id} / {product.category}</span><strong>{product.name}</strong><small>Replace with product cover or mockup</small>
      </div>
      <section className="product-info">
        <p>{product.category} / {product.status.replace("-", " ")}</p>
        <h1>{product.name}</h1>
        <p className="product-description">{product.description}</p>
        <div className="product-price">R$ {product.price}</div>
        <AddToBag item={{ slug: product.slug, name: product.name, price: product.price }} disabled={product.status !== "available"} />
        <p className="checkout-note">Checkout coming soon. No payment or order is created in this version.</p>
      </section>

      <section className="product-includes">
        <p>What&apos;s inside</p>
        <h2>A system made<br />to be used.</h2>
        <ol>{product.includes.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol>
      </section>

      <section className="product-details">
        <div><span>Compatibility</span><p>{product.compatibility.join(" / ")}</p></div>
        <div><span>Version</span><p>{product.version}</p></div>
        <div><span>File type</span><p>{product.fileType}</p></div>
        <div><span>File size</span><p>{product.fileSize}</p></div>
        <div><span>Updated</span><p>{product.updatedAt}</p></div>
        <div><span>License</span><p>{product.license}<br /><Link href="/license">View license ↗</Link></p></div>
      </section>

      <section className="case-gallery product-gallery" aria-label={`${product.name} gallery placeholders`}>
        <div className="gallery-caption"><span>Product preview</span><span>Mockups pending</span></div>
        <div className="gallery-placeholder wide">16:9 / Main product view</div>
        <div className="gallery-split"><div className="gallery-placeholder square">1:1 / Interface detail</div><div className="gallery-placeholder square">1:1 / System overview</div></div>
      </section>

      <section className="product-license-summary">
        <p>License / Draft</p>
        <h2>Use it. Adapt it.<br />Do not redistribute it.</h2>
        <p>The final license must be reviewed before sales begin. <Link href="/license">Read the current draft ↗</Link></p>
      </section>

      {related.length > 0 && <section className="related-products"><p>Related tools</p>{related.map((item) => <Link key={item.slug} href={`/shop/${item.slug}`}><span>{item.category}</span><strong>{item.name}</strong><span>View product ↗</span></Link>)}</section>}
    </main>
  );
}
