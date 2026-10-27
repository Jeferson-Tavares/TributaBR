"use client";

import { useState, useEffect, useRef } from "react";
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
  ChevronDown,
  Sparkles,
  Layers,
  ArrowRight,
  SlidersHorizontal,
} from "lucide-react";
import Logo from "./Logo";

// Grupos estruturados para menu limpo e organizado
const SIMULADORES = [
  {
    href: "/simulador-iva",
    label: "Calculadora IVA Dual",
    shortLabel: "IVA Dual",
    description: "Cálculo de CBS, IBS, créditos de insumos e transição",
    icon: <Calculator className="w-4 h-4 text-emerald-600" />,
    badge: "CBS + IBS",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  {
    href: "/simulador-multas",
    label: "Simulador de Multas",
    shortLabel: "Multas",
    description: "Dosimetria e reduções legais de 20% a 60% (PLP 108/2024)",
    icon: <Shield className="w-4 h-4 text-amber-600" />,
    badge: "PLP 108",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
  },
];

const GUIAS_E_CONTEUDO = [
  {
    href: "/",
    label: "Guia da Reforma",
    shortLabel: "Guia",
    description: "Comparativo Sistema Atual vs Novo Sistema e Cronograma",
    icon: <BookOpen className="w-4 h-4 text-blue-600" />,
    badge: "EC 132",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    href: "/split-payment",
    label: "Split Payment",
    shortLabel: "Split Payment",
    description: "Segregação e recolhimento instantâneo de IBS e CBS (LC 214/2025)",
    icon: <Layers className="w-4 h-4 text-indigo-600" />,
    badge: "LC 214",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
    isNew: true,
  },
  {
    href: "/noticias",
    label: "Notícias & Radar",
    shortLabel: "Notícias",
    description: "Radar em tempo real com fontes oficiais e normativas",
    icon: <Newspaper className="w-4 h-4 text-slate-600" />,
    badge: "Ao Vivo",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
  },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownSimuladores, setDropdownSimuladores] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownSimuladores(false);
  }, [pathname]);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownSimuladores(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "/guia";
    return pathname.startsWith(href);
  };

  const isSimuladorActive = SIMULADORES.some((s) => pathname.startsWith(s.href));

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
          Plataforma independente de caráter <strong>exclusivamente informativo e educativo</strong> sobre a Reforma Tributária (EC nº 132/2023 e LCs regulamentadoras).
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* LOGO OFICIAL */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="group flex items-center p-1 -ml-1 rounded-2xl transition-all duration-150 hover:opacity-95 active:scale-98"
              aria-label="TRIBUTABR — Início"
            >
              <Logo height={44} variant="full" />
            </Link>
          </div>

          {/* NAVEGAÇÃO DESKTOP MODERNA E DESOBSTRUÍDA */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Navegação Principal">
            
            {/* Guia da Reforma */}
            <Link
              href="/"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all ${
                isActive("/")
                  ? "bg-blue-50 text-[#0040A8] font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#0040A8]" />
              <span>Guia da Reforma</span>
            </Link>

            {/* Split Payment */}
            <Link
              href="/split-payment"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all relative ${
                isActive("/split-payment")
                  ? "bg-blue-50 text-[#0040A8] font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
            >
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Split Payment</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 bg-blue-100 text-[#0040A8] rounded-full border border-blue-200">
                LC 214
              </span>
            </Link>

            {/* Dropdown: Simuladores e Calculadoras */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownSimuladores(!dropdownSimuladores)}
                onMouseEnter={() => setDropdownSimuladores(true)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all ${
                  isSimuladorActive || dropdownSimuladores
                    ? "bg-blue-50 text-[#0040A8] font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
                aria-expanded={dropdownSimuladores}
              >
                <Calculator className="w-4 h-4 text-emerald-600" />
                <span>Simuladores</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${dropdownSimuladores ? "rotate-180" : ""}`} />
              </button>

              {/* Menu Flutuante do Dropdown */}
              {dropdownSimuladores && (
                <div
                  onMouseLeave={() => setDropdownSimuladores(false)}
                  className="absolute left-0 mt-1 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Ferramentas de Cálculo
                  </div>
                  <div className="space-y-1">
                    {SIMULADORES.map((sim) => (
                      <Link
                        key={sim.href}
                        href={sim.href}
                        onClick={() => setDropdownSimuladores(false)}
                        className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                          pathname.startsWith(sim.href)
                            ? "bg-blue-50 text-blue-900"
                            : "hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                          {sim.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 justify-between">
                            <span className="text-xs font-bold text-slate-900">{sim.label}</span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${sim.badgeColor}`}>
                              {sim.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {sim.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notícias */}
            <Link
              href="/noticias"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all ${
                isActive("/noticias")
                  ? "bg-blue-50 text-[#0040A8] font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
            >
              <Newspaper className="w-4 h-4 text-slate-500" />
              <span>Notícias</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </Link>

            {/* CTA em destaque para a Calculadora Principal */}
            <div className="pl-2 ml-1 border-l border-slate-200">
              <Link
                href="/simulador-iva"
                className="inline-flex items-center gap-2 bg-[#0040A8] hover:bg-blue-800 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all hover:shadow active:scale-98"
              >
                <span>Calcular IVA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </nav>

          {/* BOTÃO DO MENU MOBILE */}
          <div className="flex items-center lg:hidden gap-2">
            <Link
              href="/simulador-iva"
              className="bg-blue-50 text-[#0040A8] font-bold text-xs px-3 py-1.5 rounded-lg border border-blue-200"
            >
              Simular IVA
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-[#0040A8] hover:bg-slate-100 focus:outline-none transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* DRAWER MOBILE REORGANIZADO */}
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
              <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Logo height={32} variant="compact" />
                <span>Navegação</span>
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
                aria-label="Fechar menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conteúdo Mobile Agrupado */}
            <div className="p-4 space-y-6 flex-1">
              {/* Seção 1: Conteúdos & Guias */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-2 block">
                  Guias & Explicações
                </span>
                <div className="space-y-1.5">
                  {GUIAS_E_CONTEUDO.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                          active
                            ? "bg-blue-50 border-blue-200 text-[#0040A8] font-bold"
                            : "bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${active ? "bg-[#0040A8] text-white" : "bg-slate-100"}`}>
                            {item.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-slate-900">{item.label}</span>
                              <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${item.badgeColor}`}>
                                {item.badge}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 line-clamp-1">{item.description}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Seção 2: Simuladores */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-2 block">
                  Simuladores Interativos
                </span>
                <div className="space-y-1.5">
                  {SIMULADORES.map((sim) => {
                    const active = pathname.startsWith(sim.href);
                    return (
                      <Link
                        key={sim.href}
                        href={sim.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                          active
                            ? "bg-blue-50 border-blue-200 text-[#0040A8] font-bold"
                            : "bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${active ? "bg-[#0040A8] text-white" : "bg-slate-100"}`}>
                            {sim.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-slate-900">{sim.label}</span>
                              <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${sim.badgeColor}`}>
                                {sim.badge}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 line-clamp-1">{sim.description}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Rodapé do Drawer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500 text-center">
              TRIBUTABR • Guia e Simuladores da Reforma Tributária
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
