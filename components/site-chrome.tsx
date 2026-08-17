"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type BagItem = { slug: string; name: string; price: number };

const navigation = ["work", "archive", "lab", "about", "shop", "contact"];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [bag, setBag] = useState<BagItem[]>([]);
  const menuCloseRef = useRef<HTMLButtonElement>(null);
  const bagCloseRef = useRef<HTMLButtonElement>(null);
  const headerOnDark = pathname === "/lab" || pathname === "/contact";

  useEffect(() => {
    let active = true;
    try {
      const stored = JSON.parse(localStorage.getItem("ms-bag") || "[]");
      if (Array.isArray(stored)) queueMicrotask(() => { if (active) setBag(stored); });
    } catch {
      localStorage.removeItem("ms-bag");
    }
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const add = (event: Event) => {
      const item = (event as CustomEvent<BagItem>).detail;
      setBag((current) => {
        const next = current.some((entry) => entry.slug === item.slug)
          ? current
          : [...current, item];
        localStorage.setItem("ms-bag", JSON.stringify(next));
        return next;
      });
      setBagOpen(true);
    };
    window.addEventListener("ms:add-to-bag", add);
    return () => window.removeEventListener("ms:add-to-bag", add);
  }, []);

  useEffect(() => {
    const overlayOpen = menuOpen || bagOpen;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = overlayOpen ? "hidden" : previousOverflow;
    if (menuOpen) menuCloseRef.current?.focus();
    if (bagOpen) bagCloseRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setBagOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, bagOpen]);

  const removeItem = (slug: string) => {
    const next = bag.filter((item) => item.slug !== slug);
    setBag(next);
    localStorage.setItem("ms-bag", JSON.stringify(next));
  };
  const total = bag.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className={`site-header persistent-header ${headerOnDark ? "header-on-dark" : ""}`}>
        <a href="/" className="mark" aria-label="Mário Serafim — Home">MS/</a>
        <nav aria-label="Primary navigation">
          <a href="/work">Work</a>
          <a href="/lab">Lab</a>
          <a href="/about">About</a>
          <a href="/shop">Shop</a>
        </nav>
        <div className="header-actions">
          <button onClick={() => setBagOpen(true)} aria-label={`Open bag with ${bag.length} items`}>Bag ({bag.length})</button>
          <button onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-controls="site-menu">Menu +</button>
        </div>
      </header>

      <div id="main-content">{children}</div>

      <footer className="footer">
        <a href="/" className="footer-mark" aria-label="Mário Serafim — Home">MS/</a>
        <p>Creative direction<br />Art direction</p>
        <div><a href="/work">Work</a><a href="/about">About</a><a href="/contact">Contact</a></div>
        <div className="footer-legal"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/license">License</a></div>
        <p>Fortaleza — Brazil<br />© 2026</p>
      </footer>

      <div id="site-menu" className={`overlay-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-modal="true" aria-label="Site navigation">
        <div className="overlay-top">
          <span>MS/ Navigation</span>
          <button ref={menuCloseRef} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>Close ×</button>
        </div>
        <nav>
          {navigation.map((item, index) => (
            <a key={item} href={`/${item}`} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>
              <span>0{index + 1}</span>{item}
            </a>
          ))}
        </nav>
        <div className="overlay-bottom"><span>Fortaleza — Brazil</span><span>Available for selected projects</span></div>
      </div>

      <aside className={`bag-drawer ${bagOpen ? "is-open" : ""}`} aria-hidden={!bagOpen} role="dialog" aria-modal="true" aria-label="Shopping bag">
        <div className="drawer-head">
          <span>Bag ({bag.length})</span>
          <button ref={bagCloseRef} tabIndex={bagOpen ? 0 : -1} onClick={() => setBagOpen(false)}>Close ×</button>
        </div>
        {bag.length ? (
          <>
            <div className="bag-list">
              {bag.map((item) => (
                <div key={item.slug}>
                  <span>{item.name}</span><span>R$ {item.price}</span>
                  <button tabIndex={bagOpen ? 0 : -1} onClick={() => removeItem(item.slug)}>Remove</button>
                </div>
              ))}
            </div>
            <div className="bag-total"><span>Subtotal</span><strong>R$ {total}</strong></div>
            <p className="drawer-message">Checkout will be enabled when the first products are released.</p>
            <button className="solid-button" tabIndex={bagOpen ? 0 : -1} disabled>Checkout coming soon</button>
          </>
        ) : (
          <p className="empty-state">Your bag is empty.<br />Digital tools are being built.</p>
        )}
      </aside>
      {(menuOpen || bagOpen) && <button className="backdrop" aria-label="Close overlay" onClick={() => { setMenuOpen(false); setBagOpen(false); }} />}
    </>
  );
}
