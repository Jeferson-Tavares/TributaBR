"use client";

import { useState, useMemo } from "react";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Percent,
  Info,
  Star,
  Scale,
  Sparkles,
  HelpCircle,
  Plus,
  Minus,
} from "lucide-react";
import {
  calcPenalty,
  PenaltyType,
  PaymentMoment,
  PaymentForm,
  formatBRL,
  formatPercent,
} from "@/utils/taxCalculator";

export default function SimuladorMultasPage() {
  const [tributeValueInput, setTributeValueInput] = useState<string>("100000");
  const [basePenaltyRate, setBasePenaltyRate] = useState<number>(75);
  const [penaltyType, setPenaltyType] = useState<PenaltyType>("standard");
  const [paymentMoment, setPaymentMoment] = useState<PaymentMoment>("impugnacao");
  const [paymentForm, setPaymentForm] = useState<PaymentForm>("integral");
  const [mobileTab, setMobileTab] = useState<"inputs" | "results">("inputs");

  const tributeValue = useMemo(() => {
    if (!tributeValueInput || tributeValueInput.trim() === "") return 0;
    const n = Number(tributeValueInput);
    return isNaN(n) ? 0 : Math.max(0, n);
  }, [tributeValueInput]);

  const result = useMemo(
    () => calcPenalty(tributeValue, basePenaltyRate, penaltyType, paymentMoment, paymentForm),
    [tributeValue, basePenaltyRate, penaltyType, paymentMoment, paymentForm]
  );

  const capRatePct = result.capRate * 100;
  const isCapped = basePenaltyRate > capRatePct;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      
      {/* ── HEADER DA PÁGINA ──────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0040A8] to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold uppercase tracking-wider text-[#FFC700]">
            <Shield className="w-3.5 h-3.5" />
            <span>Processo Administrativo Fiscal • Diretrizes PLP 108/2024</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Simulador de Multas & Penalidades Fiscais
          </h1>
          <p className="text-sm text-blue-100/90 leading-relaxed font-normal">
            Calcule os tetos referenciais de penalidades e os descontos progressivos 
            de 20% a 60% por autorregularização voluntária e programa de conformidade fiscal respaldados pelas diretrizes do PLP 108/2024.
          </p>
        </div>
      </div>

      {/* ── SELETOR DE ABAS MOBILE (EVITAR SCROLL INFINITO) ── */}
      <div className="lg:hidden flex rounded-2xl bg-slate-200/80 p-1">
        <button
          type="button"
          onClick={() => setMobileTab("inputs")}
          className={`flex-1 py-3 text-xs font-black rounded-xl transition-all min-h-[44px] ${
            mobileTab === "inputs"
              ? "bg-[#0040A8] text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          1. Dados da Infração
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("results")}
          className={`flex-1 py-3 text-xs font-black rounded-xl transition-all min-h-[44px] ${
            mobileTab === "results"
              ? "bg-[#0040A8] text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          2. Resultados & Descontos
        </button>
      </div>

      {/* ── GRID PRINCIPAL: INPUTS + RESULTADOS ────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUNA 1: ENTRADA DE DADOS E SELEÇÃO DE INFRAÇÃO */}
        <div className={`lg:col-span-1 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5 ${
          mobileTab === "inputs" ? "block" : "hidden lg:block"
        }`}>
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0040A8] flex items-center justify-center font-bold">
              1
            </div>
            <h2 className="text-base font-bold text-slate-900">Dados do Auto de Infração</h2>
          </div>

          {/* Valor do Tributo Autuado com Steppers Rápidos */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Valor do Tributo Não Recolhido (R$)
              </label>
              <span className="text-xs font-bold text-[#0040A8]">{formatBRL(tributeValue)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setTributeValueInput(String(Math.max(0, tributeValue - 10000)))}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-600 font-bold transition-all"
                aria-label="Diminuir R$ 10.000"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="relative flex-1">
                <DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  value={tributeValueInput}
                  placeholder="Digite o valor (ex: 100000)..."
                  onChange={(e) => setTributeValueInput(e.target.value)}
                  min={0}
                  step={10000}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#0040A8] focus:ring-2 focus:ring-blue-100 transition-all min-h-[44px]"
                />
              </div>
              <button
                type="button"
                onClick={() => setTributeValueInput(String(tributeValue + 10000))}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-600 font-bold transition-all"
                aria-label="Aumentar R$ 10.000"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-1.5 mt-1.5">
              {[20000, 50000, 100000, 500000].map((quickVal) => (
                <button
                  key={quickVal}
                  type="button"
                  onClick={() => setTributeValueInput(String(quickVal))}
                  className="px-2 py-1 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-blue-50 hover:text-[#0040A8] text-slate-600 border border-slate-200 transition-colors"
                >
                  R${quickVal / 1000}k
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Valor principal da obrigação tributária exigida pelo Fisco.
            </p>
          </div>

          {/* Alíquota de Multa Originalmente Lançada */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Multa Original Lançada (%):
              </label>
              <span className="text-sm font-black text-[#FFC700] bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                {basePenaltyRate}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={150}
              step={5}
              value={basePenaltyRate}
              onChange={(e) => setBasePenaltyRate(Number(e.target.value))}
              className="w-full h-2 rounded-full cursor-pointer accent-[#0040A8]"
            />
            <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-1">
              <span>0%</span>
              <span className="text-slate-600">75% (Teto Padrão)</span>
              <span>100%</span>
              <span>150%</span>
            </div>
            {isCapped && (
              <p className="text-[11px] text-emerald-600 font-bold mt-1.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                Dosimetria PLP 108/2024: Multa ajustada para o teto referencial de {capRatePct}%.
              </p>
            )}
          </div>

          {/* Tipo de Infração e Teto Legal (Diretrizes PLP 108/2024) */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Tipo de Infração (Dosimetria Proporcional)
            </label>
            <div className="space-y-2">
              {[
                { id: "standard", label: "Padrão de Ofício", teto: "Máx. 75%", desc: "Infrações fiscais ordinárias sem dolo" },
                { id: "fraud", label: "Fraude, Sonegação ou Conluio", teto: "Máx. 100%", desc: "Comprovação de má-fé ou dolo manifesto" },
                { id: "recurrence", label: "Reincidência Comprovada", teto: "Máx. 150%", desc: "Reiteração de infração idêntica em 5 anos" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setPenaltyType(t.id as PenaltyType)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all text-xs flex items-center justify-between ${
                    penaltyType === t.id
                      ? "bg-blue-50 border-[#0040A8] text-[#0040A8] font-bold shadow-2xs"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div>
                    <span className="block font-bold">{t.label}</span>
                    <span className="text-[10px] text-slate-500">{t.desc}</span>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    penaltyType === t.id ? "bg-[#0040A8] text-white" : "bg-slate-200 text-slate-700"
                  }`}>
                    {t.teto}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Momento da Regularização (Diretrizes PLP 108/2024) */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Momento da Regularização
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "impugnacao", label: "No Prazo de Defesa", desc: "Antes do recurso" },
                { id: "pre_divida", label: "Pré-Dívida Ativa", desc: "Antes do ajuizamento" },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMoment(m.id as PaymentMoment)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    paymentMoment === m.id
                      ? "bg-[#0040A8] text-white border-[#0040A8] font-bold"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span className="text-xs block font-bold">{m.label}</span>
                  <span className="text-[10px] opacity-80">{m.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Forma de Pagamento */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Forma de Pagamento
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "integral", label: "Pagamento Integral", badge: "Maior Desconto" },
                { id: "parcelamento", label: "Parcelamento", badge: "Fluxo Suave" },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setPaymentForm(f.id as PaymentForm)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    paymentForm === f.id
                      ? "bg-[#009A44] text-white border-[#009A44] font-bold"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span className="text-xs block font-bold">{f.label}</span>
                  <span className="text-[10px] opacity-80">{f.badge}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* COLUNA 2 & 3: CARDS DE RESULTADOS E TABELA PROGRESSIVA */}
        <div className={`lg:col-span-2 space-y-6 ${
          mobileTab === "results" ? "block" : "hidden lg:block"
        }`}>
          
          {/* CARDS EMPILHÁVEIS NO MOBILE (Figma Style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card Multa Padrão com Desconto Legal */}
            <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#009A44] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Desconto de Regularização (PLP 108/2024)
                </span>
                <span className="text-sm font-black text-[#009A44]">
                  −{formatPercent(result.discountRate * 100)}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-semibold block">Multa a Pagar</span>
                <p className="text-3xl font-black text-slate-900">
                  {formatBRL(result.finalPenalty)}
                </p>
                <span className="text-xs text-slate-500 mt-1 block">
                  Originalmente: <span className="line-through">{formatBRL(result.cappedPenalty)}</span>
                </span>
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="text-slate-600 font-semibold">Total com Tributo:</span>
                <span className="text-base font-extrabold text-[#0040A8]">{formatBRL(result.totalDebt)}</span>
              </div>
            </div>

            {/* Card com Bônus de Conformidade (10% extra) */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50/50 rounded-3xl p-6 border border-purple-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100/80 px-2.5 py-1 rounded-full border border-purple-200 flex items-center gap-1">
                  <Star className="w-3 h-3 text-[#FFC700] fill-[#FFC700]" />
                  Bônus de Conformidade Fiscal
                </span>
                <span className="text-sm font-black text-purple-700">
                  −{formatPercent(result.bonusDiscountRate * 100)}
                </span>
              </div>
              <div>
                <span className="text-xs text-purple-400 font-semibold block">Multa com Bônus</span>
                <p className="text-3xl font-black text-purple-900">
                  {formatBRL(result.finalPenaltyBonus)}
                </p>
                <span className="text-xs text-purple-600 font-semibold mt-1 block">
                  Economia Extra: +{formatBRL(result.finalPenalty - result.finalPenaltyBonus)}
                </span>
              </div>
              <div className="pt-3 border-t border-purple-100 flex justify-between items-center text-xs">
                <span className="text-purple-800 font-semibold">Total com Tributo (Bônus):</span>
                <span className="text-base font-extrabold text-purple-900">{formatBRL(result.totalDebtBonus)}</span>
              </div>
            </div>
          </div>

          {/* TABELA COMPARATIVA DE TODAS AS OPÇÕES (PLP 108/2024) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Matriz de Descontos e Regularização Voluntária (Diretrizes PLP 108/2024)
                </h2>
                <p className="text-xs text-slate-500">
                  Valores calculados sobre a multa ajustada de {formatBRL(result.cappedPenalty)}.
                </p>
              </div>
            </div>

            {/* Tabela com scroll horizontal no mobile */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-100 font-bold uppercase">
                    <th className="py-2.5 pr-3">Momento & Modalidade</th>
                    <th className="py-2.5 px-3 text-center text-[#009A44]">Desconto Padrão</th>
                    <th className="py-2.5 px-3 text-center text-purple-700">Desconto com Bônus</th>
                    <th className="py-2.5 px-3 text-right">Multa Padrão</th>
                    <th className="py-2.5 pl-3 text-right text-purple-700 font-extrabold">Multa com Bônus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {[
                    { moment: "impugnacao", form: "integral", label: "Prazo de Defesa — Pagamento Integral", std: 50, bonus: 60 },
                    { moment: "impugnacao", form: "parcelamento", label: "Prazo de Defesa — Parcelamento", std: 40, bonus: 50 },
                    { moment: "pre_divida", form: "integral", label: "Pré-Dívida Ativa — Pagamento Integral", std: 30, bonus: 40 },
                    { moment: "pre_divida", form: "parcelamento", label: "Pré-Dívida Ativa — Parcelamento", std: 20, bonus: 30 },
                  ].map((row, i) => {
                    const isCurrent = paymentMoment === row.moment && paymentForm === row.form;
                    return (
                      <tr
                        key={i}
                        className={isCurrent ? "bg-blue-50/70 font-bold text-[#0040A8]" : "hover:bg-slate-50"}
                      >
                        <td className="py-3 pr-3 flex items-center gap-1.5">
                          {isCurrent && <span className="w-2 h-2 rounded-full bg-[#0040A8]" />}
                          <span>{row.label}</span>
                        </td>
                        <td className="py-3 px-3 text-center text-[#009A44] font-bold">
                          {row.std}%
                        </td>
                        <td className="py-3 px-3 text-center text-purple-700 font-bold">
                          {row.bonus}%
                        </td>
                        <td className="py-3 px-3 text-right">
                          {formatBRL(result.cappedPenalty * (1 - row.std / 100))}
                        </td>
                        <td className="py-3 pl-3 text-right text-purple-800 font-extrabold">
                          {formatBRL(result.cappedPenalty * (1 - row.bonus / 100))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* CARDS DE ORIENTAÇÕES DO PROCESSO ADMINISTRATIVO (PLP 108/2024 & STF) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-blue-50/60 border border-blue-200 space-y-2">
              <div className="flex items-center gap-2 text-[#0040A8] font-bold text-sm">
                <Scale className="w-4 h-4" />
                <span>Prazo Unificado de 20 Dias Úteis</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                (Diretrizes PLP 108/2024) Contagem em dias úteis para todas as impugnações e defesas administrativas de CBS e IBS, alinhando o processo tributário às garantias processuais civis.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-[#009A44] font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Vedação de Garantia e Depósito Prévio</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                (Súmula Vinculante 28 do STF & PLP 108/2024) É inconstitucional exigir depósito recursal, fiança ou caução para recorrer de autuações, garantindo o direito constitucional à ampla defesa.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* NOTA DE ISENÇÃO DE RESPONSABILIDADE (DISCLAIMER) */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-100/90 border border-slate-200 text-slate-600 text-xs flex items-start gap-3 shadow-2xs">
        <Info className="w-4 h-4 text-[#0040A8] flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-slate-800">
            Aviso de Isenção de Responsabilidade (Disclaimer):
          </p>
          <p className="leading-relaxed text-slate-600">
            As alíquotas e valores apresentados são simulações estimativas baseadas nas projeções do Ministério da Fazenda e nos textos dos PLPs 68/2024 e 108/2024. Não substituem consultoria contábil ou jurídica formal.
          </p>
        </div>
      </div>

      {/* JSON-LD Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Calculadora Didática de Multas Fiscais TRIBUTABR",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
            description:
              "Simulador pedagógico de dosimetria de multas tributárias e descontos de regularização sob o PLP 108/2024.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "BRL",
            },
          }),
        }}
      />
    </div>
  );
}
