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

      {/* PAINEL DO MENU MOBILE SLIDE-OVER DRAWER (TOUCH TARGETS >= 44PX) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop escuro com blur */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-in overflow-y-auto">
            {/* Header do Drawer */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <span className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0040A8]" />
                Navegação TRIBUTABR
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-11 h-11 flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 active:scale-95 transition-all"
                aria-label="Fechar menu de navegação"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Conteúdo de links */}
            <div className="p-4 space-y-5 flex-1">
              {/* Grupo 1: Simuladores */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-2 block">
                  Simuladores Interativos
                </span>
                <div className="space-y-2">
                  {NAV_LINKS.filter((item) => item.category === "simulador").map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all min-h-[52px] active:scale-98 ${
                          active
                            ? "bg-blue-50 border-blue-200 text-[#0040A8] font-bold shadow-sm"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
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
                            <p className="text-[11px] text-slate-500 font-normal line-clamp-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 flex-shrink-0 ${
                            active ? "text-[#0040A8]" : "text-slate-400"
                          }`}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Grupo 2: Conteúdo */}
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
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all min-h-[52px] active:scale-98 ${
                          active
                            ? "bg-blue-50 border-blue-200 text-[#0040A8] font-bold shadow-sm"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
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
                            <p className="text-[11px] text-slate-500 font-normal line-clamp-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 flex-shrink-0 ${
                            active ? "text-[#0040A8]" : "text-slate-400"
                          }`}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Rodapé do Drawer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 text-center">
              Guia independente e educativo sobre a Reforma Tributária.
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
