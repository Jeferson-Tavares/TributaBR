"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import {
  Calculator,
  TrendingDown,
  TrendingUp,
  Info,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  FileSpreadsheet,
  CheckCircle2,
  Sliders,
  Scale,
  Sparkles,
  Plus,
  Minus,
} from "lucide-react";
import {
  SECTOR_RATES,
  Sector,
  TaxRegime,
  calcOldSystem,
  calcNewSystem,
  calcTransitionYear,
  generateChartData,
  TRANSITION_SCHEDULE,
  formatBRL,
  formatPercent,
} from "@/utils/taxCalculator";

// ── COMPONENTE REUTILIZÁVEL DE TOOLTIP LEGAL ───────────────────────
function LegalTooltip({
  title,
  law,
  description,
}: {
  title: string;
  law: string;
  description: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block ml-1.5 align-middle">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="text-slate-400 hover:text-[#0040A8] transition-colors focus:outline-none p-0.5 rounded-full"
        aria-label={`Informação legal sobre ${title}`}
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>

      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 sm:w-72 p-3 bg-slate-900/95 backdrop-blur-md text-white rounded-xl shadow-2xl border border-slate-700/80 text-[11px] leading-snug z-50 animate-fade-in pointer-events-none">
          <div className="flex items-center gap-1.5 text-[#FFC700] font-bold mb-1 border-b border-slate-700 pb-1">
            <Scale className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{law}</span>
          </div>
          <div className="font-semibold text-slate-200 mb-1">{title}</div>
          <p className="text-slate-300">{description}</p>
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900"></div>
        </div>
      )}
    </div>
  );
}

export default function SimuladorIvaPage() {
  // Estados para entradas numéricas (mantendo string para não forçar 0 quando apagado)
  const [salePriceInput, setSalePriceInput] = useState<string>("100000");
  const [purchaseValueInput, setPurchaseValueInput] = useState<string>("40000");
  const [customIvaInput, setCustomIvaInput] = useState<string>("26.5");
  const [sector, setSector] = useState<Sector>("comercio");
  const [regime, setRegime] = useState<TaxRegime>("lucro_real");
  const [selectedYear, setSelectedYear] = useState<number>(2033);
  const [hasIS, setHasIS] = useState<boolean>(false);
  const [isRate, setIsRate] = useState<number>(10);
  const [showFormulaDetails, setShowFormulaDetails] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<"inputs" | "results">("inputs");

  // Conversões seguras
  const salePrice = useMemo(() => {
    if (!salePriceInput || salePriceInput.trim() === "") return 0;
    const n = Number(salePriceInput);
    return isNaN(n) ? 0 : Math.max(0, n);
  }, [salePriceInput]);

  const purchaseValue = useMemo(() => {
    if (!purchaseValueInput || purchaseValueInput.trim() === "") return 0;
    const n = Number(purchaseValueInput);
    return isNaN(n) ? 0 : Math.max(0, n);
  }, [purchaseValueInput]);

  const customIvaRate = useMemo(() => {
    if (!customIvaInput || customIvaInput.trim() === "") return 26.5;
    const n = parseFloat(customIvaInput.replace(",", "."));
    if (isNaN(n)) return 26.5;
    return Math.min(28.0, Math.max(25.0, n));
  }, [customIvaInput]);

  const rates = SECTOR_RATES[sector];

  // Cálculos dinâmicos com regime tributário e alíquota personalizada
  const oldResult = useMemo(
    () => calcOldSystem(salePrice, sector, regime),
    [salePrice, sector, regime]
  );
  
  const newResult = useMemo(
    () => calcNewSystem(salePrice, purchaseValue, sector, 2033, hasIS, isRate, customIvaRate, regime),
    [salePrice, purchaseValue, sector, hasIS, isRate, customIvaRate, regime]
  );

  const transitionResult = useMemo(
    () => calcTransitionYear(salePrice, purchaseValue, sector, selectedYear, hasIS, isRate, customIvaRate, regime),
    [salePrice, purchaseValue, sector, selectedYear, hasIS, isRate, customIvaRate, regime]
  );

  const chartData = useMemo(
    () => generateChartData(salePrice, purchaseValue, sector, hasIS, isRate, customIvaRate, regime),
    [salePrice, purchaseValue, sector, hasIS, isRate, customIvaRate, regime]
  );

  // Variação em relação ao sistema antigo
  const diff = transitionResult.totalTax - oldResult.totalTax;
  const diffPct = oldResult.totalTax > 0 ? (diff / oldResult.totalTax) * 100 : 0;
  const isSavings = diff <= 0;

  const currentSchedule =
    TRANSITION_SCHEDULE.find((s) => s.year === selectedYear) ||
    TRANSITION_SCHEDULE[TRANSITION_SCHEDULE.length - 1];

  // Proporções exatas de CBS e IBS para a alíquota em vigor
  const cbsRatio = 8.8 / 26.5;
  const ibsRatio = 17.7 / 26.5;
  const sectorFactor = rates.cbsFull === 0 ? 0 : (rates.cbsFull < 8.8 ? 0.4 : 1.0);
  const effectiveCbsRate = (customIvaRate * cbsRatio * sectorFactor);
  const effectiveIbsRate = (customIvaRate * ibsRatio * sectorFactor);
  const effectiveTotalRate = effectiveCbsRate + effectiveIbsRate;

  // Tooltip customizado Recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-4 min-w-[220px] text-xs">
        <p className="font-bold text-slate-800 border-b border-slate-100 pb-1.5 mb-2">
          Ano {label}
        </p>
        <div className="space-y-1">
          {payload.map((entry: any) => (
            <div key={entry.name} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span
                  className="w-2.5 h-2.5 rounded-sm inline-block"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name}
              </span>
              <span className="font-bold text-slate-800">{formatBRL(entry.value)}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between font-extrabold text-slate-900">
          <span>Total Estimado:</span>
          <span>{formatBRL(payload.reduce((acc: number, e: any) => acc + (e.value || 0), 0))}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      
      {/* ── HEADER DA PÁGINA ──────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-blue-900 via-[#0040A8] to-[#003399] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold uppercase tracking-wider text-[#FFC700]">
            <Calculator className="w-3.5 h-3.5" />
            <span>FERRAMENTA PEDAGÓGICA • CENÁRIOS PLP 68/2024</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Calculadora Didática de Cenários da Reforma Tributária (IVA Dual)
          </h1>
          <p className="text-sm text-blue-100/90 leading-relaxed font-normal">
            Simule cenários acadêmicos e estimativas de transição tributária com base nos textos do PLP 68/2024 e premissas do Ministério da Fazenda.
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
          1. Parâmetros (Entrada)
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
          2. Resultados & Gráficos
        </button>
      </div>

      {/* ── GRID PRINCIPAL: INPUTS + RESULTADOS ────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUNA 1: PAINEL DE ENTRADA DE DADOS (Inputs) */}
        <div className={`lg:col-span-1 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5 ${
          mobileTab === "inputs" ? "block" : "hidden lg:block"
        }`}>
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0040A8] flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h2 className="text-base font-bold text-slate-900">Parâmetros da Simulação</h2>
          </div>

          {/* Ajuste Manual de Alíquota Padrão (25.0% a 28.0%) */}
          <div className="p-4 bg-gradient-to-br from-blue-50/70 to-slate-50 rounded-2xl border border-blue-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Sliders className="w-3.5 h-3.5 text-[#0040A8] mr-1.5" />
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Alíquota IVA Padrão
                </label>
                <LegalTooltip
                  title="Alíquota Padrão de Referência do IVA Dual"
                  law="EC 132/2023, Art. 156-A, § 1º, V e PLP 68/2024"
                  description="Fixação da alíquota de referência pelo Senado Federal suficiente para manter a neutralidade da carga tributária global sobre o consumo. Estimativa oficial em 26,50% (CBS ~8,8% + IBS ~17,7%)."
                />
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  step="0.1"
                  min="25.0"
                  max="28.0"
                  value={customIvaInput}
                  onChange={(e) => setCustomIvaInput(e.target.value)}
                  className="w-16 text-right font-black text-sm text-[#0040A8] bg-white border border-blue-200 rounded-lg px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-[#0040A8]"
                />
                <span className="text-xs font-bold text-slate-500">%</span>
              </div>
            </div>

            <input
              type="range"
              min={25.0}
              max={28.0}
              step={0.1}
              value={customIvaRate}
              onChange={(e) => setCustomIvaInput(Number(e.target.value).toFixed(1))}
              className="w-full h-2 rounded-full cursor-pointer accent-[#0040A8] bg-slate-200"
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-400">
              <span>25,0% (Mínima estimada)</span>
              <span className="text-[#0040A8]">26,5% (Referência MF)</span>
              <span>28,0% (Máxima)</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Ajuste para simular cenários de maior ou menor trava de alíquota no Senado.
            </p>
          </div>

          {/* Seleção de Regime Tributário */}
          <div>
            <div className="flex items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Regime Tributário
              </label>
              <LegalTooltip
                title="Enquadramento Tributário da Empresa"
                law="PLP 68/2024 e LC 123/2006"
                description="Lucro Real: Não-cumulatividade plena com aproveitamento total de créditos. Lucro Presumido: PIS/Cofins cumulativos no antigo e transição gradual ao IVA. Simples Nacional: Regime simplificado mantido com opção de transferência de créditos."
              />
            </div>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl">
              {[
                { id: "lucro_real", label: "Lucro Real" },
                { id: "lucro_presumido", label: "Presumido" },
                { id: "simples_nacional", label: "Simples" },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRegime(r.id as TaxRegime)}
                  className={`py-2 px-1 text-xs font-bold rounded-xl transition-all min-h-[44px] ${
                    regime === r.id
                      ? "bg-[#0040A8] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Setor de Atuação */}
          <div>
            <div className="flex items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Setor Econômico
              </label>
              <LegalTooltip
                title="Regimes Diferenciados e Específicos"
                law="PLP 68/2024, Arts. 120 a 160"
                description="Define setores com alíquota zero (Cesta Básica Nacional), alíquota reduzida em 60% (Saúde, Educação, Dispositivos Médicos, Agro) e regimes específicos de tributação."
              />
            </div>
            <div className="relative">
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value as Sector)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 focus:bg-white focus:border-[#0040A8] focus:ring-2 focus:ring-blue-100 cursor-pointer min-h-[44px]"
              >
                {Object.entries(SECTOR_RATES).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3.5 top-4 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Valor da Venda / Faturamento Bruto com Steppers Rápidos */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Faturamento Bruto (R$)
                </label>
                <LegalTooltip
                  title="Base de Incidência do IVA Dual"
                  law="PLP 68/2024, Art. 12"
                  description="O débito de CBS e IBS incide 'por fora' diretamente sobre o valor total da operação de venda de bens ou prestação de serviços, sem integrar sua própria base."
                />
              </div>
              <span className="text-xs font-bold text-[#0040A8]">{formatBRL(salePrice)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSalePriceInput(String(Math.max(0, salePrice - 10000)))}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-600 font-bold transition-all"
                aria-label="Diminuir R$ 10.000"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={salePriceInput}
                placeholder="Digite o valor (ex: 100000)..."
                onChange={(e) => setSalePriceInput(e.target.value)}
                min={0}
                step={10000}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#0040A8] focus:ring-2 focus:ring-blue-100 transition-all min-h-[44px]"
              />
              <button
                type="button"
                onClick={() => setSalePriceInput(String(salePrice + 10000))}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-600 font-bold transition-all"
                aria-label="Aumentar R$ 10.000"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-1.5 mt-1.5">
              {[50000, 100000, 250000, 500000].map((quickVal) => (
                <button
                  key={quickVal}
                  type="button"
                  onClick={() => setSalePriceInput(String(quickVal))}
                  className="px-2 py-1 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-blue-50 hover:text-[#0040A8] text-slate-600 border border-slate-200 transition-colors"
                >
                  R${quickVal / 1000}k
                </button>
              ))}
            </div>
          </div>

          {/* Valor dos Insumos / Compras (Crédito) com Steppers Rápidos */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Compras de Insumos / B2B (R$)
                </label>
                <LegalTooltip
                  title="Não-Cumulatividade Plena e Crédito Financeiro"
                  law="EC 132/2023, Art. 156-A, § 1º, VIII"
                  description="Garante o direito integral a crédito de CBS e IBS cobrados em todas as operações com bens materiais ou imateriais, inclusive direitos, e serviços adquiridos pela pessoa jurídica."
                />
              </div>
              <span className="text-xs font-bold text-[#009A44]">{formatBRL(purchaseValue)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setPurchaseValueInput(String(Math.max(0, purchaseValue - 5000)))}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-600 font-bold transition-all"
                aria-label="Diminuir R$ 5.000"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={purchaseValueInput}
                placeholder="Digite o valor dos insumos (ex: 40000)..."
                onChange={(e) => setPurchaseValueInput(e.target.value)}
                min={0}
                step={5000}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-[#0040A8] focus:ring-2 focus:ring-blue-100 transition-all min-h-[44px]"
              />
              <button
                type="button"
                onClick={() => setPurchaseValueInput(String(purchaseValue + 5000))}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-600 font-bold transition-all"
                aria-label="Aumentar R$ 5.000"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-1.5 mt-1.5">
              {[20000, 40000, 100000, 200000].map((quickVal) => (
                <button
                  key={quickVal}
                  type="button"
                  onClick={() => setPurchaseValueInput(String(quickVal))}
                  className="px-2 py-1 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-emerald-50 hover:text-[#009A44] text-slate-600 border border-slate-200 transition-colors"
                >
                  R${quickVal / 1000}k
                </button>
              ))}
            </div>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">
              ✓ Gera crédito integral imediato sobre a alíquota da operação.
            </p>
          </div>

          {/* Ano da Transição */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Ano de Referência:
              </label>
              <span className="text-sm font-black px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0040A8] border border-blue-200">
                {selectedYear}
              </span>
            </div>
            <input
              type="range"
              min={2026}
              max={2033}
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-full h-2 rounded-full cursor-pointer accent-[#0040A8]"
            />
            <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-1">
              <span>2026 (Teste)</span>
              <span>2029</span>
              <span>2033 (Pleno)</span>
            </div>
          </div>

          {/* Toggle de Imposto Seletivo */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-700 block">
                  Produto Sujeito a Imposto Seletivo?
                </span>
                <span className="text-[10px] text-slate-400">
                  Bebidas alcoólicas, cigarros, veículos poluentes
                </span>
              </div>
              <button
                type="button"
                onClick={() => setHasIS(!hasIS)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  hasIS ? "bg-[#FFC700]" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    hasIS ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {hasIS && (
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 space-y-1.5 animate-fade-in">
                <div className="flex justify-between text-xs font-bold text-amber-900">
                  <span>Alíquota do Seletivo:</span>
                  <span>{isRate}%</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={100}
                  step={5}
                  value={isRate}
                  onChange={(e) => setIsRate(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full accent-[#FFC700]"
                />
              </div>
            )}
          </div>

          {/* Dica descritiva do ano */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
            <Info className="w-4 h-4 text-[#0040A8] flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">{currentSchedule.description}</p>
          </div>
        </div>

        {/* COLUNA 2 & 3: CARDS DE MÉTRICAS + GRÁFICO RECHARTS + MEMÓRIA DE CÁLCULO */}
        <div className={`lg:col-span-2 space-y-6 ${
          mobileTab === "results" ? "block" : "hidden lg:block"
        }`}>
          
          {/* BOX VISUAL DE NOTA METODOLÓGICA (AVISO DESTACADO) */}
          <div className="p-4 sm:p-5 rounded-3xl bg-amber-50/80 border-2 border-amber-300/80 text-amber-950 text-xs shadow-sm flex items-start gap-3">
            <span className="text-lg flex-shrink-0 mt-0.5 select-none" aria-hidden="true">📌</span>
            <div className="space-y-1 leading-relaxed">
              <p className="font-bold text-amber-900 text-xs sm:text-sm">
                Nota Metodológica:
              </p>
              <p className="text-amber-950/90 font-medium">
                Esta ferramenta possui caráter exclusivamente educativo e de simulação acadêmica. Os cálculos adotam as alíquotas de referência projetadas pelo Ministério da Fazenda e o texto atual do PLP 68/2024. Não constitui parecer contábil, jurídico ou financeiro formal.
              </p>
            </div>
          </div>

          {/* CARDS DE RESULTADOS COMPARATIVOS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Card Sistema Antigo */}
            <div className="bg-white rounded-3xl p-5 border border-red-200 shadow-sm space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 block">
                Carga Sistema Antigo
              </span>
              <p className="text-2xl font-black text-slate-900">
                {formatBRL(oldResult.totalTax)}
              </p>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-red-100">
                <span>Alíquota Efetiva:</span>
                <span className="font-bold text-red-600">{formatPercent(oldResult.effectiveRate)}</span>
              </div>
            </div>

            {/* Card Transição no Ano Selecionado */}
            <div className="bg-white rounded-3xl p-5 border border-blue-200 shadow-sm space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0040A8] block">
                Total em {selectedYear}
              </span>
              <p className="text-2xl font-black text-[#0040A8]">
                {formatBRL(transitionResult.totalTax)}
              </p>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-blue-100">
                <span>Alíquota Efetiva:</span>
                <span className="font-bold text-[#0040A8]">
                  {formatPercent(transitionResult.effectiveRate)}
                </span>
              </div>
            </div>

            {/* Card Indicador de Variação (Verde ou Amarelo) */}
            <div
              className={`rounded-3xl p-5 border shadow-sm space-y-1 ${
                isSavings
                  ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                  : "bg-amber-50 border-amber-300 text-amber-950"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider block opacity-80">
                  {isSavings ? "Redução / Economia" : "Variação de Carga"}
                </span>
                {isSavings ? (
                  <TrendingDown className="w-4 h-4 text-[#009A44]" />
                ) : (
                  <TrendingUp className="w-4 h-4 text-[#FFC700]" />
                )}
              </div>
              <p className="text-2xl font-black">
                {formatBRL(Math.abs(diff))}
              </p>
              <div className="flex items-center justify-between text-xs font-bold pt-1 border-t border-black/10">
                <span>Diferença Relativa:</span>
                <span className={isSavings ? "text-[#009A44]" : "text-amber-800"}>
                  {isSavings ? "−" : "+"}{Math.abs(diffPct).toFixed(1)}% vs Antigo
                </span>
              </div>
            </div>
          </div>

          {/* INTEGRAÇÃO DOS RESULTADOS COM O GUIA DA REFORMA (CTA SECUNDÁRIO) */}
          <Link
            href={sector === "comercio" || sector === "industria" ? "/guia#cbs-ibs" : "/guia#setores"}
            className="flex items-center justify-between p-4 rounded-3xl bg-gradient-to-r from-blue-50 via-white to-blue-50 border-2 border-blue-200/90 text-[#0040A8] hover:border-[#0040A8] hover:shadow-md transition-all group active:scale-98 text-xs sm:text-sm font-bold"
          >
            <span className="flex items-center gap-2">
              <span className="text-base" aria-hidden="true">📖</span>
              <span>Entenda as regras e alíquotas deste setor ({rates.label}) no Guia da Reforma</span>
            </span>
            <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-[#0040A8]">
              <span>Acessar Guia</span>
              <span aria-hidden="true">→</span>
            </span>
          </Link>

          {/* NOVO: ACCORDION DE MEMÓRIA DE CÁLCULO E DETALHAMENTO DA FÓRMULA */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <button
              type="button"
              onClick={() => setShowFormulaDetails(!showFormulaDetails)}
              className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-blue-50 text-[#0040A8] flex items-center justify-center font-bold">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    Ver Memória de Cálculo e Detalhamento da Fórmula
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-[#0040A8] font-black">
                      PLP 68/2024
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Demonstração analítica da apuração de débitos, créditos e repartição federativa (2033).
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#0040A8]">
                <span>{showFormulaDetails ? "Ocultar" : "Expandir"}</span>
                {showFormulaDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {showFormulaDetails && (
              <div className="p-6 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-6 animate-fade-in text-xs">
                
                {/* 1. Fórmula Geral */}
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                    <Sparkles className="w-4 h-4 text-[#FFC700]" />
                    <span>Fórmula da Não-Cumulatividade Plena ("Imposto por Fora")</span>
                  </div>
                  <div className="font-mono bg-slate-100 p-3 rounded-xl text-slate-800 text-xs overflow-x-auto">
                    Imposto Líquido = (Faturamento Bruto × Alíquota Efetiva) − (Compras Insumos × Alíquota Efetiva) + Imposto Seletivo
                  </div>
                  <p className="text-[11px] text-slate-500">
                    * No regime 100% IVA Dual pleno (2033), o imposto não incide sobre si próprio nem compõe a base de cálculo dos créditos.
                  </p>
                </div>

                {/* 2. Demonstração Numérica Passo a Passo */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">1. Débito sobre Vendas</span>
                    <p className="text-base font-black text-slate-900">{formatBRL(newResult.cbs + newResult.ibs)}</p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {formatBRL(salePrice)} × {formatPercent(effectiveTotalRate)}
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-emerald-200 bg-emerald-50/30 space-y-1">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase">2. Crédito sobre Insumos</span>
                    <p className="text-base font-black text-[#009A44]">{formatBRL(newResult.creditCbs + newResult.creditIbs)}</p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {formatBRL(purchaseValue)} × {formatPercent(effectiveTotalRate)}
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-blue-200 bg-blue-50/30 space-y-1">
                    <span className="text-[10px] font-bold text-[#0040A8] uppercase">3. Imposto Líquido (2033)</span>
                    <p className="text-base font-black text-[#0040A8]">{formatBRL(newResult.totalTax)}</p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {formatBRL(newResult.cbs + newResult.ibs)} − {formatBRL(newResult.creditCbs + newResult.creditIbs)}
                      {hasIS ? ` + ${formatBRL(newResult.is)} (IS)` : ""}
                    </p>
                  </div>
                </div>

                {/* 3. Tabela de Repartição Federativa (CBS Federal vs IBS Estados/Municípios) */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="px-4 py-3 bg-slate-100/80 border-b border-slate-200 font-bold text-slate-700">
                    Repartição Federativa Detalhada (Vigência Plena 2033)
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="p-3">Tributo</th>
                          <th className="p-3">Competência</th>
                          <th className="p-3">Alíq. Efetiva</th>
                          <th className="p-3 text-right">Débito Bruto</th>
                          <th className="p-3 text-right">Crédito Abatido</th>
                          <th className="p-3 text-right">Saldo a Recolher</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr>
                          <td className="p-3 font-bold text-[#0040A8]">CBS</td>
                          <td className="p-3 text-slate-500">União (Federal)</td>
                          <td className="p-3 font-mono">{formatPercent(effectiveCbsRate)}</td>
                          <td className="p-3 text-right font-mono">{formatBRL(newResult.cbs)}</td>
                          <td className="p-3 text-right font-mono text-[#009A44]">−{formatBRL(newResult.creditCbs)}</td>
                          <td className="p-3 text-right font-black font-mono text-[#0040A8]">{formatBRL(newResult.netCbs)}</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-[#009A44]">IBS</td>
                          <td className="p-3 text-slate-500">Estados e Municípios</td>
                          <td className="p-3 font-mono">{formatPercent(effectiveIbsRate)}</td>
                          <td className="p-3 text-right font-mono">{formatBRL(newResult.ibs)}</td>
                          <td className="p-3 text-right font-mono text-[#009A44]">−{formatBRL(newResult.creditIbs)}</td>
                          <td className="p-3 text-right font-black font-mono text-[#009A44]">{formatBRL(newResult.netIbs)}</td>
                        </tr>
                        {hasIS && (
                          <tr className="bg-amber-50/50">
                            <td className="p-3 font-bold text-amber-700">Imposto Seletivo</td>
                            <td className="p-3 text-slate-500">União (Desestímulo)</td>
                            <td className="p-3 font-mono">{isRate.toFixed(1)}%</td>
                            <td className="p-3 text-right font-mono">{formatBRL(newResult.is)}</td>
                            <td className="p-3 text-right font-mono text-slate-400">R$ 0,00 (Sem crédito)</td>
                            <td className="p-3 text-right font-black font-mono text-amber-800">{formatBRL(newResult.is)}</td>
                          </tr>
                        )}
                        <tr className="bg-slate-50 font-black text-slate-900 border-t border-slate-200">
                          <td className="p-3" colSpan={3}>TOTAL GERAL RECOLHIDO (2033)</td>
                          <td className="p-3 text-right font-mono">{formatBRL(newResult.cbs + newResult.ibs + newResult.is)}</td>
                          <td className="p-3 text-right font-mono text-[#009A44]">−{formatBRL(newResult.creditCbs + newResult.creditIbs)}</td>
                          <td className="p-3 text-right font-mono text-[#0040A8]">{formatBRL(newResult.totalTax)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* GRÁFICO RECHARTS COMPARATIVO DINÂMICO */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Evolução da Arrecadação por Tributo (2026–2033)
                </h2>
                <p className="text-xs text-slate-500">
                  Acompanhe como a extinção de ICMS, ISS e PIS/Cofins é compensada pela entrada da CBS e IBS com alíquota padrão configurada em {customIvaRate.toFixed(1)}%.
                </p>
              </div>
            </div>

            <div className="h-72 sm:h-80 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#64748B" }} />
                  <YAxis
                    tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
                    tick={{ fontSize: 11, fill: "#64748B" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                  
                  {/* Linha guia do sistema antigo */}
                  <ReferenceLine
                    y={oldResult.totalTax}
                    stroke="#EF4444"
                    strokeDasharray="4 4"
                    label={{ value: "Antigo", fill: "#EF4444", fontSize: 11, position: "right" }}
                  />

                  {/* Barras coloridas com paleta oficial */}
                  <Bar dataKey="PIS" stackId="tributos" fill="#6366F1" />
                  <Bar dataKey="COFINS" stackId="tributos" fill="#8B5CF6" />
                  <Bar dataKey="IPI" stackId="tributos" fill="#A78BFA" />
                  <Bar dataKey="ICMS" stackId="tributos" fill="#EF4444" />
                  <Bar dataKey="ISS" stackId="tributos" fill="#F97316" />
                  <Bar dataKey="CBS" stackId="tributos" fill="#0040A8" />
                  <Bar dataKey="IBS" stackId="tributos" fill="#009A44" />
                  {hasIS && <Bar dataKey="IS" stackId="tributos" fill="#FFC700" />}
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-red-500 inline-block border-t border-dashed"></span>
                Linha tracejada vermelha: Carga do Sistema Antigo ({formatBRL(oldResult.totalTax)})
              </span>
              <span className="font-semibold text-slate-700">
                Crédito de Compras Abatido: {formatBRL(newResult.creditCbs + newResult.creditIbs)}
              </span>
            </div>
          </div>

          {/* DETALHAMENTO DOS CRÉDITOS TRIBUTÁRIOS (NÃO-CUMULATIVIDADE) */}
          <div className="bg-gradient-to-br from-emerald-50/70 to-blue-50/50 rounded-3xl p-6 border border-emerald-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#009A44] text-white flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Benefício da Não-Cumulatividade Plena
                </h2>
                <p className="text-xs text-slate-600">
                  No novo IVA Dual, todas as compras de insumos e serviços empresariais geram crédito de abatimento.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-white rounded-2xl border border-emerald-100 shadow-2xs">
                <span className="text-slate-400 block font-semibold">Crédito de CBS (Federal)</span>
                <span className="text-base font-black text-[#0040A8] mt-0.5 block">
                  {formatBRL(newResult.creditCbs)}
                </span>
                <span className="text-[10px] text-slate-500">Abatimento direto na guia federal</span>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-emerald-100 shadow-2xs">
                <span className="text-slate-400 block font-semibold">Crédito de IBS (Subnacional)</span>
                <span className="text-base font-black text-[#009A44] mt-0.5 block">
                  {formatBRL(newResult.creditIbs)}
                </span>
                <span className="text-[10px] text-slate-500">Abatimento direto no Comitê Gestor</span>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-emerald-200 shadow-2xs">
                <span className="text-slate-400 block font-semibold">Total Economizado em Crédito</span>
                <span className="text-base font-black text-emerald-700 mt-0.5 block">
                  {formatBRL(newResult.creditCbs + newResult.creditIbs)}
                </span>
                <span className="text-[10px] text-emerald-600 font-bold">Eliminação do efeito cascata</span>
              </div>
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
          <p className="text-[11px] text-slate-500 italic">
            * A alíquota de referência padrão de {customIvaRate.toFixed(1)}% está sujeita à fixação e regulamentação final pelo Senado Federal nos termos da EC 132/2023.
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
            name: "Calculadora Didática IVA Dual TRIBUTABR",
            operatingSystem: "All",
            applicationCategory: "EducationalApplication",
            description:
              "Simulador pedagógico de impactos da Reforma Tributária (CBS e IBS) baseado no PLP 68/2024.",
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
