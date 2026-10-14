import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "./portfolio.css";
import { SiteChrome } from "../components/site-chrome";

const siteUrl = "https://mario-serafim-portfolio.mario-92.chatgpt.site";

const schibsted = Schibsted_Grotesk({ variable: "--font-sans", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Mário Serafim — Identidade Visual & Direção de Arte", template: "%s — Mário Serafim" },
  description: "Identidades visuais e direção de arte para marcas que valorizam estética, precisão e confiança. Conheça projetos de Mário Serafim.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Mário Serafim — Identidade Visual & Direção de Arte",
    description: "A percepção constrói valor. Projetos de identidade visual e direção de arte de Mário Serafim.",
    url: siteUrl,
    siteName: "Mário Serafim",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Mário Serafim — identidade visual e direção de arte" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mário Serafim — Identidade Visual & Direção de Arte",
    description: "A percepção constrói valor. Projetos de identidade visual e direção de arte.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={schibsted.variable}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Mário Serafim",
          url: siteUrl,
          jobTitle: "Diretor de Arte",
          homeLocation: { "@type": "Place", name: "Fortaleza, Brazil" },
          sameAs: ["https://www.linkedin.com/in/marioserafim/", "https://www.behance.net/mario-serafim"],
        }) }} />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}


