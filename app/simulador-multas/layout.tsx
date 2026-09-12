import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/simulador-multas",
  },
  title:
    "Calculadora de Multas Fiscais (PLP 108/2024) — Dosimetria e Descontos | TRIBUTABR",
  description:
    "Calcule os tetos e reduções de 20% a 60% em multas fiscais de CBS/IBS segundo as diretrizes do PLP 108/2024 e a jurisprudência do STF.",
  keywords: [
    "Calculadora de Multas Fiscais",
    "PLP 108/2024",
    "Dosimetria Tributária",
    "Descontos Multas",
    "Processo Administrativo Fiscal",
    "CBS IBS",
    "TRIBUTABR",
  ],
  openGraph: {
    title:
      "Calculadora de Multas Fiscais (PLP 108/2024) — Dosimetria e Descontos | TRIBUTABR",
    description:
      "Calcule os tetos e reduções de 20% a 60% em multas fiscais de CBS/IBS segundo as diretrizes do PLP 108/2024 e a jurisprudência do STF.",
    url: "https://tributabr.com.br/simulador-multas",
    siteName: "TRIBUTABR",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://tributabr.com.br/logo.png",
        width: 1200,
        height: 630,
        alt: "Calculadora Didática de Multas Fiscais TRIBUTABR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Multas Fiscais (PLP 108/2024) | TRIBUTABR",
    description:
      "Calcule tetos de penalidades e descontos progressivos de 20% a 60% sob as diretrizes do PLP 108/2024.",
    images: ["https://tributabr.com.br/logo.png"],
  },
};

export default function SimuladorMultasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
