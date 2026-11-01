import type { Metadata } from "next";
import { Manrope, Sofia_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Header } from "@/components/layout/Header";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { baseOpenGraph, ogImage, siteDescription, siteTitle, siteUrl } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
});

const sofia = Sofia_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sofia",
});

// canonical и og:url задаёт каждая страница сама: из layout они наследовались бы
// всеми маршрутами, включая 404, и указывали бы на главную.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    ...baseOpenGraph,
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru" className={`${manrope.variable} ${sofia.variable}`}>
      <body>
        <noscript>
          <style>{'[style*="opacity:0"]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        <div className="noise" aria-hidden="true" />
        <div className="orb orb-a" aria-hidden="true" />
        <div className="orb orb-b" aria-hidden="true" />
        <div className="orb orb-c" aria-hidden="true" />
        <a className="skip-link" href="#content">
          Перейти к содержимому
        </a>
        <Header />
        <div className="shell" id="content">
          {children}
          <footer className="foot">
            <span>© {new Date().getFullYear()} Владислав Ухлин</span>
          </footer>
        </div>
        <ScrollToTop />
        <CustomCursor />
      </body>
    </html>
  );
}
