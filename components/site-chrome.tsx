"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArtboardSystem } from "./interaction/artboard-system";

type BagItem = { slug: string; name: string; price: number };
type Overlay = "menu" | "bag" | "command" | "status" | null;

const navigation = [
  { href: "/work", label: "Projetos" },
  { href: "/archive", label: "Arquivo" },
  { href: "/lab", label: "Laboratório" },
  { href: "/about", label: "Sobre" },
  { href: "/shop", label: "Loja" },
  { href: "/contact", label: "Contato" },
];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [gridOpen, setGridOpen] = useState(false);
  const [bag, setBag] = useState<BagItem[]>([]);
  const menuCloseRef = useRef<HTMLButtonElement>(null);
  const bagCloseRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const menuOpen = overlay === "menu";
  const bagOpen = overlay === "bag";
  const headerOnDark = pathname === "/lab" || pathname === "/contact";
  const markSuffix = pathname.startsWith("/work") ? "W" : pathname === "/lab" ? "L" : pathname === "/about" ? "A" : pathname.startsWith("/shop") ? "S" : pathname === "/contact" ? "C" : pathname === "/archive" ? "R" : "";

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
      setOverlay("bag");
    };
    window.addEventListener("ms:add-to-bag", add);
    return () => window.removeEventListener("ms:add-to-bag", add);
  }, []);

  useEffect(() => {
    const overlayOpen = overlay !== null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = overlayOpen ? "hidden" : previousOverflow;
    document.body.classList.toggle("menu-active", menuOpen);
    if (menuOpen) menuCloseRef.current?.focus();
    if (bagOpen) bagCloseRef.current?.focus();
    if (overlay === "command") document.querySelector<HTMLElement>(".command-panel button")?.focus();
    if (overlay === "status") document.querySelector<HTMLElement>(".system-status button")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOverlay(null);
      }
      if (event.key === "Tab" && overlayOpen) {
        const panel = menuOpen
          ? document.getElementById("site-menu")
          : bagOpen
            ? document.querySelector<HTMLElement>(".bag-drawer")
            : overlay === "command"
              ? document.querySelector<HTMLElement>(".command-panel")
              : document.querySelector<HTMLElement>(".system-status>div");
        const focusable = panel?.querySelectorAll<HTMLElement>("a, button:not(:disabled), input, select, textarea");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("menu-active");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [bagOpen, menuOpen, overlay]);

  const openOverlay = (next: Overlay) => {
    if (next) lastFocusRef.current = document.activeElement as HTMLElement | null;
    setOverlay(next);
    if (!next) queueMicrotask(() => lastFocusRef.current?.focus());
  };

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const progress = distance > 0 ? Math.min(window.scrollY / distance, 1) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("#main-content main > section, #main-content main > header"));
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });
    elements.forEach((element, index) => {
      element.classList.add("reveal-section");
      if (index === 0 || element.getBoundingClientRect().top < window.innerHeight) element.classList.add("is-visible");
      else observer.observe(element);
    });
    return () => observer.disconnect();
  }, [pathname]);

  const removeItem = (slug: string) => {
    const next = bag.filter((item) => item.slug !== slug);
    setBag(next);
    localStorage.setItem("ms-bag", JSON.stringify(next));
  };
  const total = bag.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <a className="skip-link" href="#main-content">Ir para o conteúdo</a>
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
      <ArtboardSystem overlay={overlay} onOverlayChange={openOverlay} gridOpen={gridOpen} onGridChange={setGridOpen} />
      <header className={`site-header persistent-header ${headerOnDark ? "header-on-dark" : ""}`}>
        <a href="/" className="mark" aria-label="Mário Serafim — Início" data-cursor="ABRIR">MS/{markSuffix}</a>
        <nav aria-label="Navegação principal">
          <a href="/work">Projetos</a>
          <a href="/lab">Laboratório</a>
          <a href="/about">Sobre</a>
          <a href="/shop">Loja</a>
        </nav>
        <div className="header-actions">
          <button className="bag-trigger" onClick={() => openOverlay("bag")} aria-label={`Abrir sacola com ${bag.length} itens`} data-cursor="ABRIR">Sacola ({bag.length})</button>
          <button className="command-trigger" onClick={() => window.dispatchEvent(new Event("ms:command"))} aria-label="Abrir comandos">/</button>
          <button className="menu-trigger" onClick={() => openOverlay("menu")} aria-expanded={menuOpen} aria-controls="site-menu" data-cursor="ABRIR">Menu +</button>
        </div>
      </header>

      <div id="main-content">{children}</div>

      <footer className="footer">
        <a href="/" className="footer-mark" aria-label="Mário Serafim — Início">MS/</a>
        <p>Direção criativa<br />Direção de arte</p>
        <div><a href="/work">Projetos</a><a href="/about">Sobre</a><a href="/contact">Contato</a></div>
        <div className="footer-legal"><a href="/privacy">Privacidade</a><a href="/terms">Termos</a><a href="/license">Licença</a></div>
        <p>Fortaleza — Brasil<br />© 2026</p>
      </footer>

      <div id="site-menu" className={`overlay-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-modal="true" aria-label="Navegação do site">
        <div className="overlay-top">
          <span>MS/ Navegação</span>
          <button ref={menuCloseRef} tabIndex={menuOpen ? 0 : -1} onClick={() => openOverlay(null)}>Fechar ×</button>
        </div>
        <nav>
          {navigation.map((item, index) => (
            <a key={item.href} href={item.href} tabIndex={menuOpen ? 0 : -1} onClick={() => openOverlay(null)} data-cursor="ABRIR">
              <span>0{index + 1}</span>{item.label}
            </a>
          ))}
        </nav>
        <div className="overlay-tools" aria-label="Utilitários">
          <button tabIndex={menuOpen ? 0 : -1} onClick={() => openOverlay("bag")}>Sacola ({bag.length})</button>
          <button tabIndex={menuOpen ? 0 : -1} aria-pressed={gridOpen} onClick={() => { setGridOpen(!gridOpen); openOverlay(null); }}>{gridOpen ? "Ocultar grade" : "Mostrar grade"}</button>
        </div>
        <div className="overlay-bottom"><span>Fortaleza — Brasil</span><span>Disponível para projetos selecionados</span></div>
      </div>

      <aside className={`bag-drawer ${bagOpen ? "is-open" : ""}`} aria-hidden={!bagOpen} role="dialog" aria-modal="true" aria-label="Sacola de compras">
        <div className="drawer-head">
          <span>Sacola ({bag.length})</span>
          <button ref={bagCloseRef} tabIndex={bagOpen ? 0 : -1} onClick={() => openOverlay(null)}>Fechar ×</button>
        </div>
        {bag.length ? (
          <>
            <div className="bag-list">
              {bag.map((item) => (
                <div key={item.slug}>
                  <span>{item.name}</span><span>R$ {item.price}</span>
                  <button tabIndex={bagOpen ? 0 : -1} onClick={() => removeItem(item.slug)}>Remover</button>
                </div>
              ))}
            </div>
            <div className="bag-total"><span>Subtotal</span><strong>R$ {total}</strong></div>
            <button className="solid-button" tabIndex={bagOpen ? 0 : -1} disabled>Compras indisponíveis</button>
          </>
        ) : (
          <p className="empty-state">Sua sacola está vazia.</p>
        )}
      </aside>
      {(menuOpen || bagOpen) && <button className="backdrop" aria-label="Fechar painel" onClick={() => openOverlay(null)} />}
    </>
  );
}
