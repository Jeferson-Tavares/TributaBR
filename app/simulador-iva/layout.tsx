import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/simulador-iva",
  },
  title:
    "Calculadora IVA Dual (CBS/IBS) — Simule o Impacto do PLP 68/2024 | TRIBUTABR",
  description:
    "Calcule cenários e estimativas do IVA Dual (CBS e IBS) para seu negócio. Ferramenta didática baseada na EC 132/2023 e PLP 68/2024.",
  keywords: [
    "Calculadora IVA Dual",
    "Simulador CBS IBS",
    "Reforma Tributária",
    "PLP 68/2024",
    "EC 132/2023",
    "Transição Tributária",
    "Créditos de Insumos",
    "TRIBUTABR",
  ],
  openGraph: {
    title:
      "Calculadora IVA Dual (CBS/IBS) — Simule o Impacto do PLP 68/2024 | TRIBUTABR",
    description:
      "Calcule cenários e estimativas do IVA Dual (CBS e IBS) para seu negócio. Ferramenta didática baseada na EC 132/2023 e PLP 68/2024.",
    url: "https://tributabr.com.br/simulador-iva",
    siteName: "TRIBUTABR",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://tributabr.com.br/logo.png",
        width: 1200,
        height: 630,
        alt: "Calculadora Didática IVA Dual TRIBUTABR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Calculadora IVA Dual (CBS/IBS) — Simule o Impacto do PLP 68/2024 | TRIBUTABR",
    description:
      "Calcule cenários e estimativas do IVA Dual (CBS e IBS) para seu negócio. Ferramenta didática baseada na EC 132/2023 e PLP 68/2024.",
    images: ["https://tributabr.com.br/logo.png"],
  },
};

export default function SimuladorIvaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
