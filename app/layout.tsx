import type { Metadata } from "next";
import { Schibsted_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./refinement.css";
import "./editorial.css";
import "./narrative.css";
import "./experience.css";
import "./process.css";
import "./art-direction.css";
import "./commercial.css";
import { SiteChrome } from "../components/site-chrome";

const siteUrl = "https://mario-serafim-portfolio.mario-92.chatgpt.site";

const schibsted = Schibsted_Grotesk({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Mário Serafim — Creative Director / Art Director", template: "%s" },
  description: "Portfólio de Mário Serafim, Creative Director e Art Director em Fortaleza. Marcas, campanhas, produtos digitais, imagem e movimento.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Mário Serafim — Creative Director / Art Director",
    description: "Marcas, campanhas, produtos digitais, imagem e movimento por Mário Serafim, em Fortaleza.",
    url: siteUrl,
    siteName: "Mário Serafim",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Mário Serafim — Direção Criativa / Direção de Arte" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mário Serafim — Creative Director / Art Director",
    description: "Marcas, campanhas, produtos digitais, imagem e movimento por Mário Serafim, em Fortaleza.",
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
      <body className={`${schibsted.variable} ${geistMono.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Mário Serafim",
          url: siteUrl,
          jobTitle: ["Creative Director", "Art Director"],
          homeLocation: { "@type": "Place", name: "Fortaleza, Brazil" },
          worksFor: { "@type": "Organization", name: "Granistone A Rocha" },
          sameAs: ["https://www.linkedin.com/in/marioserafim/", "https://www.behance.net/mario-serafim"],
        }) }} />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}


