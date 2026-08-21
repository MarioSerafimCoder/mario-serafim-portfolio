import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "../components/site-chrome";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://mario-serafim-portfolio.mario-92.chatgpt.site"),
  title: "Mário Serafim — Diretor Criativo & Diretor de Arte",
  description: "Direção criativa, direção de arte, marcas e experiências digitais.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Mário Serafim — Diretor Criativo & Diretor de Arte",
    description: "Direção criativa, direção de arte, marcas e experiências digitais.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Mário Serafim — Direção Criativa / Direção de Arte" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mário Serafim — Diretor Criativo & Diretor de Arte",
    description: "Direção criativa, direção de arte, marcas e experiências digitais.",
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}><SiteChrome>{children}</SiteChrome></body>
    </html>
  );
}
