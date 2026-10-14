"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { rememberCampaign } from "../data/campaign";

const navigation = [
  { href: "/", label: "Início" },
  { href: "/work", label: "Projetos" },
  { href: "/process", label: "Abordagem" },
  { href: "/about", label: "Sobre" },
  { href: "/contact", label: "Contato" },
];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { rememberCampaign(); }, [pathname]);
  return (
    <>
      <a className="skip-link" href="#main-content">Ir para o conteúdo</a>
      <header className="site-header">
        <a className="brand" href="/" aria-label="Mário Serafim — início"><span className="brand-cut" aria-hidden="true" />Mário Serafim<span className="brand-sub">Direção de arte & identidade visual</span></a>
        <button className="mobile-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-nav" onClick={() => setMenuOpen(value => !value)}>{menuOpen ? "Fechar" : "Menu"}<span aria-hidden="true">{menuOpen ? "×" : "+"}</span></button>
        <nav id="primary-nav" className={menuOpen ? "primary-nav is-open" : "primary-nav"} aria-label="Navegação principal">
          {navigation.map(item => <a key={item.href} href={item.href} aria-current={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/")) ? "page" : undefined} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
        </nav>
      </header>
      <div id="main-content">{children}</div>
      <footer className="site-footer">
        <div className="footer-top">
          <a href="/" className="footer-name">Mário Serafim<span className="brand-cut" aria-hidden="true" /></a>
          <p>Identidades com intenção.<br />Direção em cada detalhe.</p>
        </div>
        <div className="footer-bottom">
          <span>Fortaleza, Brasil · Atuação remota</span>
          <div><a href="mailto:marioserafim.da@gmail.com">E-mail</a><a href="https://www.behance.net/mario-serafim" target="_blank" rel="noreferrer">Behance</a><a href="https://www.linkedin.com/in/marioserafim/" target="_blank" rel="noreferrer">LinkedIn</a></div>
          <span>© {new Date().getFullYear()} Mário Serafim</span>
        </div>
        <div className="footer-legal"><a href="/privacy">Privacidade</a><a href="/terms">Termos</a></div>
      </footer>
    </>
  );
}
