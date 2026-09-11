import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Shield,
  Newspaper,
  BookOpen,
  Sparkles,
  CheckCircle2,
  XCircle,
  Scale,
  Layers,
  Globe2,
  Zap,
} from "lucide-react";
import SectorTaxTable from "@/components/SectorTaxTable";
import TransitionTimeline from "@/components/TransitionTimeline";
import PafAccordion from "@/components/PafAccordion";

export default function GuiaPage() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      {/* ── HERO BANNER PRINCIPAL (Figma Style) ────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-[#0040A8] to-[#003399] text-white py-16 sm:py-20">
        {/* Elementos visuais de fundo sutis */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#009A44] opacity-20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#FFC700] opacity-15 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            {/* Tag Badge Atualizado */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-[#FFC700] shadow-sm">
              <Sparkles className="w-4 h-4 text-[#FFC700] animate-pulse" />
              <span>
                Atualizado em conformidade com o PLP 68/2024 e PLP 108/2024
              </span>
            </div>

            {/* Título Principal com destaque de marca */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              A Nova Era Tributária do Brasil:{" "}
              <span className="text-[#FFC700]">Simples</span> e{" "}
              <span className="text-[#009A44]">Transparente.</span>
            </h1>

            {/* Subtítulo */}
            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-2xl font-normal">
              Entenda de forma prática e descomplicada como o Brasil está
              substituindo
              <strong> 5 tributos complexos</strong> pelo moderno{" "}
              <strong>IVA Dual (CBS + IBS)</strong>. Simule a carga do seu setor
              e conheça as novas regras de multas e fiscalização.
            </p>

            {/* Botões de Ação Rápida */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/simulador-iva"
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#009A44] hover:bg-[#008037] text-white font-bold text-sm transition-all duration-150 shadow-lg shadow-green-950/20 active:scale-98"
              >
                <Calculator className="w-4 h-4" />
                <span>Simular IVA Dual (CBS/IBS)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/simulador-multas"
                className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-sm border border-white/20 transition-all active:scale-98"
              >
                <Shield className="w-4 h-4 text-[#FFC700]" />
                <span>Simulador de Multas (PLP 108)</span>
              </Link>
            </div>
          </div>

          {/* Cards Rápidos de Indicadores no Hero */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12 pt-8 border-t border-white/15">
            {[
              {
                label: "Tributos Extintos",
                value: "5 Impostos",
                sub: "PIS, Cofins, IPI, ICMS, ISS",
                color: "border-red-400/40",
              },
              {
                label: "Novo Modelo",
                value: "IVA Dual",
                sub: "CBS Federal + IBS Subnacional",
                color: "border-emerald-400/40",
              },
              {
                label: "Período de Transição",
                value: "2026 a 2033",
                sub: "8 anos de adaptação gradual",
                color: "border-amber-400/40",
              },
              {
                label: "Cobrança",
                value: "No Destino",
                sub: "Fim definitivo da Guerra Fiscal",
                color: "border-blue-400/40",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-2xl bg-white/5 backdrop-blur-sm border ${stat.color}`}
              >
                <p className="text-[11px] font-bold uppercase tracking-wider text-blue-200/80">
                  {stat.label}
                </p>
                <p className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  {stat.value}
                </p>
                <p className="text-xs text-blue-100/70 mt-0.5 truncate">
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTEÚDO PRINCIPAL ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-16">
        {/* SEÇÃO 1: COMO ERA VS COMO FICA (Cards Comparativos Responsivos) */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0040A8] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Transformação Estrutural
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Como Era o Sistema Antigo vs. Como Ficará
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Compare as diferenças fundamentais de cálculo, base de incidência
              e burocracia entre os dois modelos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CARD COMO ERA */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-red-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-red-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-black">
                    <XCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                      Sistema Caótico
                    </span>
                    <h3 className="text-xl font-black text-slate-900">
                      Como Era (Até 2025)
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
                  5 Tributos
                </span>
              </div>

              {/* Lista dos 5 tributos antigos */}
              <div className="my-5 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { name: "PIS", esfera: "Federal" },
                  { name: "COFINS", esfera: "Federal" },
                  { name: "IPI", esfera: "Federal" },
                  { name: "ICMS", esfera: "27 Estados" },
                  { name: "ISS", esfera: "5.570 Cidades" },
                ].map((t) => (
                  <div
                    key={t.name}
                    className="p-2.5 rounded-xl bg-red-50/50 border border-red-100 text-center"
                  >
                    <span className="font-extrabold text-sm text-red-800 block">
                      {t.name}
                    </span>
                    <span className="text-[10px] text-red-600 font-medium">
                      {t.esfera}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-red-500 font-black mt-0.5">•</span>
                  <p>
                    <strong>Cálculo "Por Dentro":</strong> O tributo incide
                    sobre ele mesmo, camuflando a alíquota real cobrada do
                    cidadão.
                  </p>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-red-500 font-black mt-0.5">•</span>
                  <p>
                    <strong>Efeito Cascata:</strong> Imposto incidia sobre
                    imposto já pago nas etapas anteriores da cadeia produtiva.
                  </p>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-red-500 font-black mt-0.5">•</span>
                  <p>
                    <strong>Cobrança na Origem:</strong> O imposto ficava onde a
                    mercadoria era fabricada, estimulando guerra fiscal entre
                    estados.
                  </p>
                </div>
              </div>
            </div>

            {/* CARD COMO FICA */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#009A44] flex items-center justify-center font-black">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#009A44]">
                      Modelo Moderno
                    </span>
                    <h3 className="text-xl font-black text-slate-900">
                      Como Fica (Novo IVA Dual)
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-[#009A44] border border-emerald-200">
                  IVA Dual + IS
                </span>
              </div>

              {/* Lista dos novos tributos */}
              <div className="my-5 grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-center">
                  <span className="font-extrabold text-sm text-[#0040A8] block">
                    CBS
                  </span>
                  <span className="text-[10px] text-blue-700 font-medium">
                    Federal (União)
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                  <span className="font-extrabold text-sm text-[#009A44] block">
                    IBS
                  </span>
                  <span className="text-[10px] text-emerald-700 font-medium">
                    Estados + Municípios
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-center">
                  <span className="font-extrabold text-sm text-[#FFC700] block">
                    IS
                  </span>
                  <span className="text-[10px] text-amber-800 font-medium">
                    Imposto Seletivo
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-[#009A44] flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>Cálculo "Por Fora":</strong> O imposto é destacado
                    claramente na nota fiscal, sem incidência sobre a própria
                    base.
                  </p>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-[#009A44] flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>Não-Cumulatividade Plena:</strong> Todo imposto pago
                    na compra de insumos, máquinas e serviços vira crédito
                    imediato.
                  </p>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                  <CheckCircle2 className="w-4 h-4 text-[#009A44] flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>Cobrança no Destino:</strong> A arrecadação fica
                    onde o produto é consumido, encerrando a guerra fiscal
                    predatória.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 2: TABELAS INTERATIVAS POR SETOR */}
        <section>
          <SectorTaxTable />
        </section>

        {/* SEÇÃO 3: LINHA DO TEMPO DA TRANSIÇÃO (2026 A 2033) */}
        <section>
          <TransitionTimeline />
        </section>

        {/* SEÇÃO 4: DESTAQUES DO PROCESSO ADMINISTRATIVO FISCAL (PLP 108/2024 & STF) */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FFC700] bg-white/10 px-3 py-1 rounded-full border border-white/15 inline-block">
              Segurança Jurídica & Cidadania Fiscal
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Diretrizes do Processo Administrativo Tributário (PLP 108/2024 &
              STF)
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              A reforma estabelece garantias essenciais para o contribuinte no
              contencioso de CBS e IBS, respaldadas pelas diretrizes do{" "}
              <strong>PLP 108/2024</strong> e pela jurisprudência consolidada do{" "}
              <strong>Supremo Tribunal Federal</strong>.
            </p>
          </div>

          {/* Accordion Interativo com Diretrizes do PLP 108/2024 e STF */}
          <PafAccordion />

          <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              Simule a dosimetria proporcional e os percentuais de desconto para
              o seu caso específico.
            </p>
            <Link
              href="/simulador-multas"
              className="px-5 py-2.5 rounded-xl bg-[#FFC700] hover:bg-[#e6b400] text-slate-950 font-bold text-xs flex items-center gap-2 transition-all self-end sm:self-auto"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Abrir Simulador de Penalidades</span>
            </Link>
          </div>
        </section>

        {/* SEÇÃO 5: CALL TO ACTIONS PARA AS OUTRAS SEÇÕES */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/simulador-iva"
            className="group p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-[#0040A8] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0040A8] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-[#0040A8] transition-colors">
                Simulador de IVA Dual (CBS + IBS)
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Insira o faturamento, insumos e veja o impacto exato ano a ano
                com gráfico dinâmico em Recharts.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-[#0040A8] mt-6">
              <span>Iniciar Simulação Financeira</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/noticias"
            className="group p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-[#009A44] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#009A44] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Newspaper className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-[#009A44] transition-colors">
                Feed de Notícias da Reforma em Tempo Real
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Acompanhe diariamente as decisões do Congresso, regulamentação
                do Comitê Gestor e artigos contábeis especializados.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-[#009A44] mt-6">
              <span>Ver Feed RSS de Notícias</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
}
