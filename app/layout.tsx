import type { Metadata } from "next";
import { Lexend, Manrope } from "next/font/google";
import Footer from "@/components/site/Footer";
import Header from "@/components/site/Header";
import Providers from "@/app/providers";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "WOMANDLA | Autonomisation féminine au Bénin",
    template: "%s · WOMANDLA",
  },
  description:
    "Programme national d’autonomisation des jeunes femmes au Bénin. Formation, incubation et leadership dans les 77 communes.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${lexend.variable} ${manrope.variable}`}>
      <body className="min-h-screen bg-light font-sans text-ink antialiased">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        >
          Aller au contenu
        </a>
        <Providers>
          <Header />
          <main id="contenu">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
