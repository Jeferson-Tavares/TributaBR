"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  BookOpen,
  Calculator,
  Shield,
  Newspaper,
  ChevronRight,
  Sparkles,
  Layers,
} from "lucide-react";
import Logo from "./Logo";

// Reorganized navigation links in intuitive groups
const NAV_LINKS = [
  {
    href: "/",
    label: "Guia da Reforma",
    shortLabel: "Guia",
    description: "Comparativo Como Era vs Como Fica e Cronograma",
    icon: <BookOpen className="w-4 h-4" />,
    badge: "EC 132",
    category: "conteudo",
  },
  {
    href: "/simulador-iva",
    label: "Simulador IVA Dual",
    shortLabel: "IVA Dual",
    description: "Cálculo de CBS, IBS, Créditos de Insumos e Transição",
    icon: <Calculator className="w-4 h-4" />,
    badge: "CBS + IBS",
    category: "simulador",
    highlight: true,
  },
  {
    href: "/simulador-multas",
    label: "Simulador de Multas",
    shortLabel: "Multas",
    description: "Dosimetria e Descontos de 20% a 60% (Diretrizes PLP 108/2024)",
    icon: <Shield className="w-4 h-4" />,
    badge: "PLP 108",
    category: "simulador",
  },
  {
    href: "/noticias",
    label: "Notícias & Radar",
    shortLabel: "Notícias",
    description: "Feed RSS atualizado em tempo real com fontes oficiais",
    icon: <Newspaper className="w-4 h-4" />,
    badge: "Ao Vivo",
    category: "conteudo",
  },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "/guia";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-white/98 backdrop-blur-md shadow-md border-b border-slate-200/90"
          : "bg-white border-b border-slate-200/60"
      }`}
    >
      {/* Aviso de Transparência e Caráter Educativo */}
      <div className="bg-slate-50 border-b border-slate-100 py-1 px-4 text-center text-[10px] sm:text-xs text-slate-500 font-medium">
        <span>
          Plataforma independente de caráter <strong>exclusivamente informativo e educativo</strong> sobre a Reforma Tributária (EC nº 132/2023, PLP 68/2024 e PLP 108/2024).
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO OFICIAL COMPLETA ALINHADA OBRIGATORIAMENTE AO CANTO ESQUERDO */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="group flex items-center p-1 -ml-1 rounded-2xl transition-all duration-150 hover:opacity-95 active:scale-98"
              aria-label="TRIBUTABR — Início"
            >
              <Logo height={48} variant="full" />
            </Link>
          </div>

          {/* LINKS REORGANIZADOS NO DESKTOP À DIREITA */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Navegação Principal">
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-150 ${
                    active
                      ? "bg-[#0040A8] text-white shadow-sm shadow-blue-900/15"
                      : item.highlight
                      ? "bg-blue-50/70 text-[#0040A8] hover:bg-blue-100/70 border border-blue-200/60"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <span className={active ? "text-white" : item.highlight ? "text-[#0040A8]" : "text-slate-500"}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        active
                          ? "bg-white/20 text-white"
                          : item.badge === "Ao Vivo"
                          ? "bg-emerald-100 text-[#009A44] border border-emerald-200"
                          : item.badge === "CBS + IBS"
                          ? "bg-[#009A44] text-white"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* BOTÃO DO MENU MOBILE (SMARTPHONES E TABLETS) */}
          <div className="flex items-center lg:hidden gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-2xl text-slate-700 hover:text-[#0040A8] hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-[#0040A8] transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* PAINEL DO MENU MOBILE REORGANIZADO */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-xl animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-5 space-y-4">
            
            {/* Seção 1: Ferramentas Interativas */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-2 block">
                Simuladores & Cálculos
              </span>
              <div className="space-y-2">
                {NAV_LINKS.filter((item) => item.category === "simulador").map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                        active
                          ? "bg-blue-50 border-blue-200 text-[#0040A8] font-bold shadow-sm"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2.5 rounded-xl ${
                            active
                              ? "bg-[#0040A8] text-white"
                              : "bg-blue-50 text-[#0040A8]"
                          }`}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">{item.label}</span>
                            {item.badge && (
                              <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase bg-[#009A44] text-white">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 font-normal">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 ${
                          active ? "text-[#0040A8]" : "text-slate-400"
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Seção 2: Conteúdo & Informações */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-2 block">
                Conteúdo & Legislação
              </span>
              <div className="space-y-2">
                {NAV_LINKS.filter((item) => item.category === "conteudo").map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                        active
                          ? "bg-blue-50 border-blue-200 text-[#0040A8] font-bold shadow-sm"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2.5 rounded-xl ${
                            active
                              ? "bg-[#0040A8] text-white"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">{item.label}</span>
                            {item.badge && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase bg-slate-100 text-slate-600 border border-slate-200">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 font-normal">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 ${
                          active ? "text-[#0040A8]" : "text-slate-400"
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
