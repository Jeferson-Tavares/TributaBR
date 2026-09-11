import Link from "next/link";
import Logo from "./Logo";
import { ShieldCheck, BookOpen, Calculator, Shield, Newspaper, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Coluna 1: Marca e Missão */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Logo height={42} variant="full" />
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              O <strong>TRIBUTABR</strong> é uma plataforma independente, de caráter <strong>exclusivamente informativo e educativo</strong>,
              desenvolvida para desmistificar a Nova Reforma Tributária do Brasil (EC nº 132/2023, PLP 68/2024 e PLP 108/2024),
              apoiando cidadãos, empresários e profissionais contábeis.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-xl p-2.5 max-w-md">
              <ShieldCheck className="w-4 h-4 text-[#009A44] flex-shrink-0" />
              <span>Baseado nas diretrizes legais da EC nº 132/2023, PLP 68/2024, PLP 108/2024 e jurisprudência do STF.</span>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-slate-600 hover:text-[#0040A8] font-medium flex items-center gap-2 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#0040A8]" />
                  Guia Explicativo da Reforma
                </Link>
              </li>
              <li>
                <Link
                  href="/simulador-iva"
                  className="text-slate-600 hover:text-[#0040A8] font-medium flex items-center gap-2 transition-colors"
                >
                  <Calculator className="w-3.5 h-3.5 text-[#009A44]" />
                  Simulador de IVA Dual (CBS/IBS)
                </Link>
              </li>
              <li>
                <Link
                  href="/simulador-multas"
                  className="text-slate-600 hover:text-[#0040A8] font-medium flex items-center gap-2 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-[#FFC700]" />
                  Simulador de Multas (PLP 108)
                </Link>
              </li>
              <li>
                <Link
                  href="/noticias"
                  className="text-slate-600 hover:text-[#0040A8] font-medium flex items-center gap-2 transition-colors"
                >
                  <Newspaper className="w-3.5 h-3.5 text-slate-500" />
                  Feed de Notícias Tributárias
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Legal & Compliance */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Legal & Compliance
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/politica-de-privacidade"
                  className="text-slate-600 hover:text-[#0040A8] font-medium flex items-center gap-2 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0040A8]" />
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/termos-de-uso"
                  className="text-slate-600 hover:text-[#0040A8] font-medium flex items-center gap-2 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-[#009A44]" />
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="text-slate-600 hover:text-[#0040A8] font-medium flex items-center gap-2 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#FFC700]" />
                  Sobre Nós & Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Legislação & Marcos */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Marcos Legais Reais
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-bold text-[#0040A8] block">EC nº 132/2023</span>
                Reforma Tributária sobre o Consumo (IVA Dual).
              </li>
              <li className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-bold text-[#009A44] block">PLP 68/2024</span>
                Regulamentação da CBS, IBS e Imposto Seletivo.
              </li>
              <li className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-bold text-[#FFC700] block">PLP 108/2024</span>
                Comitê Gestor do IBS e Processo Administrativo.
              </li>
            </ul>
          </div>
        </div>

        {/* Linha de rodapé */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="max-w-2xl leading-relaxed">
            © {new Date().getFullYear()} <strong>TRIBUTABR</strong> — Plataforma independente. 
            Conteúdo de caráter exclusivamente informativo e educativo. 
            As alíquotas e valores apresentados são simulações estimativas baseadas nas projeções do Ministério da Fazenda e nos textos dos PLPs 68/2024 e 108/2024. 
            Não substituem consultoria contábil ou jurídica formal.
          </p>
          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="inline-flex items-center gap-1 text-[#0040A8] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#009A44]"></span>
              Transição 2026–2033
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
