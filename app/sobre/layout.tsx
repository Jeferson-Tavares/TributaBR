import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nós — Conheça o Projeto TRIBUTABR",
  description:
    "Conheça a missão, equipe editorial e metodologia de desenvolvimento dos simuladores e guias didáticos do TRIBUTABR.",
  alternates: {
    canonical: "/sobre",
  },
};

export default function SobreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
