import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notícias e Atualizações da Reforma Tributária | TRIBUTABR",
  description:
    "Acompanhe as últimas notícias, tramitações no Congresso, regulamentações do Comitê Gestor e artigos sobre a Reforma Tributária (CBS, IBS e IS).",
  alternates: {
    canonical: "/noticias",
  },
  openGraph: {
    title: "Notícias e Atualizações da Reforma Tributária | TRIBUTABR",
    description:
      "Acompanhe as últimas notícias, tramitações no Congresso, regulamentações do Comitê Gestor e artigos sobre a Reforma Tributária.",
    url: "https://tributabr.com.br/noticias",
    siteName: "TRIBUTABR",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://tributabr.com.br/logo.png",
        width: 1200,
        height: 630,
        alt: "Feed de Notícias TRIBUTABR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Notícias da Reforma Tributária | TRIBUTABR",
    description:
      "Acompanhe as últimas notícias e tramitações da Reforma Tributária em tempo real.",
    images: ["https://tributabr.com.br/logo.png"],
  },
};

export default function NoticiasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
