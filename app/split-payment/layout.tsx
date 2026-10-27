import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tributabr.com.br";

export const metadata: Metadata = {
  title: "Split Payment na Reforma Tributária: Guia Completo | TributaBR",
  description:
    "Entenda como funcionará o Split Payment do IBS e da CBS, suas modalidades, etapas, legislação, impactos para empresas e implementação no Brasil.",
  alternates: {
    canonical: `${siteUrl}/split-payment/`,
  },
  openGraph: {
    title: "Split Payment na Reforma Tributária: Guia Completo | TributaBR",
    description:
      "Entenda como funcionará a segregação e recolhimento instantâneo do IBS e da CBS pelas instituições de pagamento na Reforma Tributária do Consumo.",
    url: `${siteUrl}/split-payment/`,
    siteName: "TributaBR",
    locale: "pt_BR",
    type: "article",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Split Payment na Reforma Tributária - TributaBR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Split Payment na Reforma Tributária: Guia Completo | TributaBR",
    description:
      "Guia completo e fundamentado sobre a retenção automática do IBS e CBS via Split Payment (LC 214/2025).",
    images: [`${siteUrl}/og-image.png`],
  },
};

export default function SplitPaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

