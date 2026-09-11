import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geist = Geist({ subsets: ["latin"] });
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const iconPath = `${basePath}/icon.png`;

export const metadata: Metadata = {
  title: "TRIBUTABR — Entenda a Nova Reforma Tributária Brasileira",
  description:
    "Plataforma independente e educativa para compreender a Nova Reforma Tributária do Brasil (EC nº 132/2023, PLP 68/2024 e PLP 108/2024). Simuladores de IVA Dual (CBS/IBS), dosimetria de multas e feed de notícias atualizado.",
  icons: {
    icon: iconPath,
    apple: iconPath,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="icon" href={iconPath} type="image/png" />
      </head>
      <body
        className={`${geist.className} min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 antialiased`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
