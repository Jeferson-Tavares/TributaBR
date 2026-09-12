import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/guia",
  },
  title: "Guia da Reforma Tributária (EC 132/2023 & PLP 68/2024) | TRIBUTABR",
  description:
    "Entenda o novo IVA Dual (CBS e IBS), alíquotas por setor econômico, cronograma de transição de 2026 a 2033 e a extinção de PIS, Cofins, IPI, ICMS e ISS.",
  keywords: [
    "Guia Reforma Tributária",
    "IVA Dual",
    "CBS",
    "IBS",
    "Imposto Seletivo",
    "EC 132/2023",
    "PLP 68/2024",
    "Tributos Setoriais",
    "TRIBUTABR",
  ],
  openGraph: {
    title: "Guia da Reforma Tributária (EC 132/2023 & PLP 68/2024) | TRIBUTABR",
    description:
      "Entenda o novo IVA Dual (CBS e IBS), alíquotas por setor econômico, cronograma de transição de 2026 a 2033 e a extinção de PIS, Cofins, IPI, ICMS e ISS.",
    url: "https://tributabr.com.br/guia",
    siteName: "TRIBUTABR",
    locale: "pt_BR",
    type: "article",
    images: [
      {
        url: "https://tributabr.com.br/logo.png",
        width: 1200,
        height: 630,
        alt: "Guia Completo da Reforma Tributária TRIBUTABR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guia da Reforma Tributária (EC 132/2023 & PLP 68/2024) | TRIBUTABR",
    description:
      "Entenda o novo IVA Dual (CBS e IBS), alíquotas setoriais e cronograma de transição 2026-2033.",
    images: ["https://tributabr.com.br/logo.png"],
  },
};

export default function GuiaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
