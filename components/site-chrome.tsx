"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type BagItem = { slug:string; name:string; price:number };

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [menuOpen,setMenuOpen] = useState(false);
  const [bagOpen,setBagOpen] = useState(false);
  const [bag,setBag] = useState<BagItem[]>([]);
  useEffect(() => { try { setBag(JSON.parse(localStorage.getItem("ms-bag") || "[]")); } catch {} }, []);
  useEffect(() => {
    const add = (event: Event) => {
      const item = (event as CustomEvent<BagItem>).detail;
      setBag((current) => { const next = current.some((entry) => entry.slug === item.slug) ? current : [...current,item]; localStorage.setItem("ms-bag",JSON.stringify(next)); return next; });
      setBagOpen(true);
    };
    window.addEventListener("ms:add-to-bag",add); return () => window.removeEventListener("ms:add-to-bag",add);
  },[]);
  useEffect(() => { document.body.style.overflow = menuOpen || bagOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; },[menuOpen,bagOpen]);
  const closeMenu = () => setMenuOpen(false);
  const total = bag.reduce((sum,item) => sum + item.price,0);
  return <>
    <header className="site-header persistent-header">
      <Link href="/" className="mark" aria-label="Mário Serafim — Home">MS/</Link>
      <nav aria-label="Primary navigation"><Link href="/work">Work</Link><Link href="/lab">Lab</Link><Link href="/about">About</Link><Link href="/shop">Shop</Link></nav>
      <div className="header-actions"><button onClick={() => setBagOpen(true)}>Bag ({bag.length})</button><button onClick={() => setMenuOpen(true)} aria-expanded={menuOpen}>Menu +</button></div>
    </header>
    {children}
    <footer className="footer"><Link href="/" className="footer-mark">MS/</Link><p>Creative direction<br/>Art direction</p><div><Link href="/work">Work</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></div><p>Fortaleza — Brazil<br/>© 2026</p></footer>
    <div className={`overlay-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
      <div className="overlay-top"><span>MS/ Navigation</span><button onClick={closeMenu}>Close ×</button></div>
      <nav>{["work","archive","lab","about","shop","contact"].map((item,i)=><Link key={item} href={`/${item}`} onClick={closeMenu}><span>0{i+1}</span>{item}</Link>)}</nav>
      <div className="overlay-bottom"><span>Fortaleza — Brazil</span><span>Instagram · LinkedIn · Email</span></div>
    </div>
    <aside className={`bag-drawer ${bagOpen ? "is-open" : ""}`} aria-hidden={!bagOpen}>
      <div className="drawer-head"><span>Bag ({bag.length})</span><button onClick={() => setBagOpen(false)}>Close ×</button></div>
      {bag.length ? <><div className="bag-list">{bag.map(item=><div key={item.slug}><span>{item.name}</span><span>R$ {item.price}</span><button onClick={() => { const next=bag.filter(x=>x.slug!==item.slug); setBag(next); localStorage.setItem("ms-bag",JSON.stringify(next)); }}>Remove</button></div>)}</div><div className="bag-total"><span>Subtotal</span><strong>R$ {total}</strong></div><button className="solid-button" onClick={() => alert("Checkout coming soon.")}>Checkout coming soon</button></> : <p className="empty-state">Your bag is empty.<br/>Digital tools are being built.</p>}
    </aside>
    {(menuOpen || bagOpen) && <button className="backdrop" aria-label="Close overlay" onClick={() => { setMenuOpen(false); setBagOpen(false); }} />}
  </>;
}
