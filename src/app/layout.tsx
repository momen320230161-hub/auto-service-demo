import type { Metadata } from "next";
import { Manrope, DM_Sans } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/content/site";
import "./globals.css";
const display = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
export const metadata: Metadata = {
  title: {
    default: `${site.name} ${site.descriptor} — Concept Demo`,
    template: `%s | ${site.name} Concept`,
  },
  description: site.description,
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <aside className="concept-bar" aria-label="Demo notice">
          A website concept for the way forward.{" "}
          <span>Sample brand · Demo only</span>
        </aside>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
