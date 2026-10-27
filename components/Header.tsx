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
  Layers,
  ChevronRight,
} from "lucide-react";
import Logo from "./Logo";

// Lista ordenada e simétrica de links principais
const NAV_LINKS = [
  {
    href: "/",
    label: "Guia da Reforma",
    icon: <BookOpen className="w-4 h-4 text-[#0040A8]" />,
  },
  {
    href: "/simulador-iva",
    label: "Calculadora IVA",
    icon: <Calculator className="w-4 h-4 text-emerald-600" />,
    badge: "CBS/IBS",
  },
  {
    href: "/simulador-multas",
    label: "Simulador de Multas",
    icon: <Shield className="w-4 h-4 text-amber-600" />,
  },
  {
    href: "/split-payment",
    label: "Split Payment",
    icon: <Layers className="w-4 h-4 text-indigo-600" />,
    badge: "LC 214",
  },
  {
    href: "/noticias",
    label: "Notícias & Radar",
    icon: <Newspaper className="w-4 h-4 text-slate-500" />,
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
          ? "bg-white/98 backdrop-blur-md shadow-sm border-b border-slate-200"
          : "bg-white border-b border-slate-200/70"
      }`}
    >
      {/* Top Banner de Transparência */}
      <div className="bg-slate-50 border-b border-slate-100 py-1 px-4 text-center text-[10px] sm:text-xs text-slate-500 font-medium">
        <span>
          Plataforma independente de caráter <strong>exclusivamente informativo e educativo</strong> sobre a Reforma Tributária (EC nº 132/2023).
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* LOGO OFICIAL À ESQUERDA */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="group flex items-center p-1 -ml-1 rounded-2xl transition-all duration-150 hover:opacity-95 active:scale-98"
              aria-label="TRIBUTABR — Início"
            >
              <Logo height={44} variant="full" />
            </Link>
          </div>

          {/* NAVEGAÇÃO DESKTOP: LINKS SIMÉTRICOS CENTRALIZADOS COM ESPAÇAMENTO */}
          <nav
            className="hidden lg:flex flex-1 items-center justify-center gap-2 xl:gap-4 px-4"
            aria-label="Navegação Principal"
          >
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-150 ${
                    active
                      ? "bg-blue-50 text-[#0040A8] font-bold shadow-xs border border-blue-100"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  <span className={active ? "text-[#0040A8]" : ""}>{item.icon}</span>
                  <span className="whitespace-nowrap">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full border ${
                        active
                          ? "bg-blue-100 text-[#0040A8] border-blue-200"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ESPAÇO EQUILIBRADO À DIREITA (Apenas visualmente proporcional) */}
          <div className="hidden lg:flex items-center justify-end w-[180px]">
            <Link
              href="/simulador-iva"
              className="inline-flex items-center justify-center bg-[#0040A8] hover:bg-blue-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all hover:shadow-xs active:scale-98 whitespace-nowrap"
            >
              Simular Tributos
            </Link>
          </div>

          {/* BOTÃO DO MENU MOBILE (SMARTPHONES E TABLETS) */}
          <div className="flex items-center lg:hidden gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-[#0040A8] hover:bg-slate-100 focus:outline-none transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* DRAWER MOBILE SIMPLES E DIRETO */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Painel lateral */}
          <div className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Header do Drawer */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <Logo height={32} variant="compact" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
                aria-label="Fechar menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links Mobile */}
            <div className="p-4 space-y-2 flex-1">
              {NAV_LINKS.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                      active
                        ? "bg-blue-50 border-blue-200 text-[#0040A8] font-bold"
                        : "bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          active ? "bg-[#0040A8] text-white" : "bg-slate-100"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <span className="text-sm font-semibold">{item.label}</span>
                    </div>
                    {item.badge ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {item.badge}
                      </span>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Rodapé do Drawer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500 text-center">
              TRIBUTABR • Portal Educativo da Reforma Tributária
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
