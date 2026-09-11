"use client";

import { useState, useMemo } from "react";
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
  LineChart,
  Line,
} from "recharts";
import {
  Calculator,
  TrendingDown,
  TrendingUp,
  Info,
  ChevronDown,
  Zap,
} from "lucide-react";
import {
  SECTOR_RATES,
  Sector,
  calcOldSystem,
  calcNewSystem,
  calcTransitionYear,
  generateChartData,
  TRANSITION_SCHEDULE,
  formatBRL,
  formatPercent,
} from "@/utils/taxCalculator";

// ── Tooltip personalizado para Recharts ─────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xl p-4 min-w-[220px]">
      <p className="text-sm font-semibold text-slate-700 mb-2">Ano {label}</p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center justify-between gap-4 text-xs py-0.5">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: entry.color }} />
            {entry.name}
          </span>
          <span className="font-medium text-slate-800">{formatBRL(entry.value)}</span>
        </div>
      ))}
      <div className="mt-2 pt-2 border-t border-slate-100">
        <div className="flex justify-between text-xs font-semibold text-slate-700">
          <span>Total</span>
          <span>{formatBRL(payload.reduce((acc: number, e: any) => acc + (e.value || 0), 0))}</span>
        </div>
      </div>
    </div>
  );
};

const LineTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xl p-4 min-w-[200px]">
      <p className="text-sm font-semibold text-slate-700 mb-2">Ano {label}</p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center justify-between gap-4 text-xs py-0.5">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
            {entry.name}
          </span>
          <span className="font-medium">{formatBRL(entry.value)}</span>
        </div>
      ))}
    </div>
  );
};

// ── Cartão de métrica ────────────────────────────────────────────────
function MetricCard({
  label,
  value,
  sub,
  color = "blue",
  icon,
}: {
  label: string;
  value: string;
  sub?: string;
  color?: "blue" | "green" | "red" | "amber" | "purple" | "slate";
  icon?: React.ReactNode;
}) {
  const colors = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    red: "bg-red-50 text-red-700 border-red-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    slate: "bg-slate-50 text-slate-700 border-slate-200",
  };
  return (
    <div className={`rounded-xl border p-4 ${colors[color]}`}>
      <div className="flex items-center gap-2 mb-1">
        {icon && <span className="opacity-70">{icon}</span>}
        <p className="text-xs font-medium uppercase tracking-wide opacity-70">{label}</p>
      </div>
      <p className="text-xl font-bold tracking-tight">{value}</p>
      {sub && <p className="text-xs mt-1 opacity-60">{sub}</p>}
    </div>
  );
}

// ── Badge de imposto ─────────────────────────────────────────────────
function TaxBadge({ name, value, rate, color }: { name: string; value: number; rate: number; color: string }) {
  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-white border border-slate-100">
      <div className="flex items-center gap-2">
        <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
        <span className="text-sm font-medium text-slate-700">{name}</span>
        <span className="text-xs text-slate-400">({formatPercent(rate)})</span>
      </div>
      <span className="text-sm font-semibold text-slate-800">{formatBRL(value)}</span>
    </div>
  );
}

// ── Colours por imposto ──────────────────────────────────────────────
const TAX_COLORS = {
  PIS: "#6366f1",
  COFINS: "#8b5cf6",
  IPI: "#a78bfa",
  ICMS: "#ef4444",
  ISS: "#f97316",
  CBS: "#3b82f6",
  IBS: "#06b6d4",
  IS: "#f59e0b",
};

// ────────────────────────────────────────────────────────────────────
export default function IvaSimulator() {
  const [salePriceInput, setSalePriceInput] = useState("10000");
  const [purchaseValueInput, setPurchaseValueInput] = useState("4000");
  const [sector, setSector] = useState<Sector>("comercio");
  const [selectedYear, setSelectedYear] = useState(2033);

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
  const [hasIS, setHasIS] = useState(false);
  const [isRate, setIsRate] = useState(10);
  const [chartType, setChartType] = useState<"stacked" | "line">("stacked");
  const [showDetails, setShowDetails] = useState(false);

  const rates = SECTOR_RATES[sector];

  // Cálculos principais
  const oldResult = useMemo(() => calcOldSystem(salePrice, sector), [salePrice, sector]);
  const newResult = useMemo(
    () => calcNewSystem(salePrice, purchaseValue, sector, 2033, hasIS, isRate),
    [salePrice, purchaseValue, sector, hasIS, isRate]
  );
  const transitionResult = useMemo(
    () => calcTransitionYear(salePrice, purchaseValue, sector, selectedYear, hasIS, isRate),
    [salePrice, purchaseValue, sector, selectedYear, hasIS, isRate]
  );
  const chartData = useMemo(
    () => generateChartData(salePrice, purchaseValue, sector, hasIS, isRate),
    [salePrice, purchaseValue, sector, hasIS, isRate]
  );

  const diff = transitionResult.totalTax - oldResult.totalTax;
  const diffPct = oldResult.totalTax > 0 ? (diff / oldResult.totalTax) * 100 : 0;

  const selectedSchedule = TRANSITION_SCHEDULE.find((s) => s.year === selectedYear)!;

  return (
    <div className="space-y-6 animate-fade-in">

      {/* ── Inputs ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calculator className="w-4 h-4 text-blue-600" />
          </div>
          <h2 className="text-base font-semibold text-slate-800">Parâmetros da Simulação</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Setor */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Setor / Segmento
            </label>
            <div className="relative">
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value as Sector)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 font-medium focus:ring-2 focus:ring-blue-400 focus:border-blue-400 cursor-pointer"
              >
                {Object.entries(SECTOR_RATES).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Valor da Venda */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Valor da Venda (R$)
            </label>
            <input
              type="number"
              value={salePriceInput}
              placeholder="Digite o valor (ex: 10000)..."
              onChange={(e) => setSalePriceInput(e.target.value)}
              min={0}
              step={1000}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 font-medium placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
            />
            <p className="text-xs text-slate-400 mt-1">{formatBRL(salePrice)}</p>
          </div>

          {/* Valor dos Insumos */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Valor dos Insumos / Compras (R$)
            </label>
            <input
              type="number"
              value={purchaseValueInput}
              placeholder="Digite o valor (ex: 4000)..."
              onChange={(e) => setPurchaseValueInput(e.target.value)}
              min={0}
              step={500}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 font-medium placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
            />
            <p className="text-xs text-slate-400 mt-1">{formatBRL(purchaseValue)} → crédito de CBS/IBS</p>
          </div>

          {/* Ano da Transição */}
          <div className="md:col-span-2 lg:col-span-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Ano da Simulação: <span className="text-blue-600 font-bold text-sm">{selectedYear}</span>
            </label>
            <input
              type="range"
              min={2026}
              max={2033}
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>2026</span><span>2029</span><span>2033</span>
            </div>
          </div>

          {/* Imposto Seletivo */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Imposto Seletivo?
            </label>
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
              <button
                onClick={() => setHasIS(!hasIS)}
                className={`relative inline-flex w-10 h-5 rounded-full transition-colors ${
                  hasIS ? "bg-amber-500" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    hasIS ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <span className="text-sm text-slate-700 font-medium">
                {hasIS ? "Sim — Produto Seletivo" : "Não aplicável"}
              </span>
            </div>
          </div>

          {/* Alíquota IS */}
          {hasIS && (
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Alíquota IS: <span className="text-amber-600 font-bold">{isRate}%</span>
              </label>
              <input
                type="range"
                min={5}
                max={100}
                step={5}
                value={isRate}
                onChange={(e) => setIsRate(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>5%</span><span>50%</span><span>100%</span>
              </div>
            </div>
          )}
        </div>

        {/* Descrição do ano selecionado */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl flex gap-3">
          <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700 leading-relaxed">{selectedSchedule.description}</p>
        </div>
      </div>

      {/* ── Cards de Métricas ───────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="Total Sistema Antigo"
          value={formatBRL(oldResult.totalTax)}
          sub={`Alíquota efetiva: ${formatPercent(oldResult.effectiveRate)}`}
          color="red"
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <MetricCard
          label={`Total ${selectedYear} (Transição)`}
          value={formatBRL(transitionResult.totalTax)}
          sub={`Alíquota efetiva: ${formatPercent(transitionResult.effectiveRate)}`}
          color="amber"
          icon={<Calculator className="w-4 h-4" />}
        />
        <MetricCard
          label="Total Sistema Novo (2033)"
          value={formatBRL(newResult.totalTax)}
          sub={`Alíquota efetiva: ${formatPercent(newResult.effectiveRate)}`}
          color="blue"
          icon={<Zap className="w-4 h-4" />}
        />
        <MetricCard
          label={diff <= 0 ? "Economia vs Antigo" : "Acréscimo vs Antigo"}
          value={formatBRL(Math.abs(diff))}
          sub={`${Math.abs(diffPct).toFixed(1)}% ${diff <= 0 ? "a menos" : "a mais"} em ${selectedYear}`}
          color={diff <= 0 ? "green" : "red"}
          icon={diff <= 0 ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
        />
      </div>

      {/* ── Gráfico ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-slate-800">
            Evolução da Carga Tributária (2026–2033)
          </h2>
          <div className="flex gap-2">
            {(["stacked", "line"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  chartType === type
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {type === "stacked" ? "Barras" : "Linhas"}
              </button>
            ))}
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "stacked" ? (
              <BarChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis
                  tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
                  iconType="square"
                  iconSize={10}
                />
                <ReferenceLine
                  y={oldResult.totalTax}
                  stroke="#ef4444"
                  strokeDasharray="6 3"
                  label={{ value: "Antigo", fill: "#ef4444", fontSize: 11, position: "right" }}
                />
                {/* Sistema antigo (barras de fundo) */}
                <Bar dataKey="PIS" stackId="new" fill={TAX_COLORS.PIS} radius={[0, 0, 0, 0]} />
                <Bar dataKey="COFINS" stackId="new" fill={TAX_COLORS.COFINS} />
                <Bar dataKey="IPI" stackId="new" fill={TAX_COLORS.IPI} />
                <Bar dataKey="ICMS" stackId="new" fill={TAX_COLORS.ICMS} />
                <Bar dataKey="ISS" stackId="new" fill={TAX_COLORS.ISS} />
                <Bar dataKey="CBS" stackId="new" fill={TAX_COLORS.CBS} />
                <Bar dataKey="IBS" stackId="new" fill={TAX_COLORS.IBS} />
                <Bar dataKey="IS" stackId="new" fill={TAX_COLORS.IS} radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis
                  tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                />
                <Tooltip content={<LineTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} iconType="circle" iconSize={8} />
                <ReferenceLine
                  y={oldResult.totalTax}
                  stroke="#ef4444"
                  strokeDasharray="6 3"
                  label={{ value: "Sistema Antigo", fill: "#ef4444", fontSize: 11, position: "right" }}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  name="Total (Transição)"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  dot={{ r: 5, fill: "#3b82f6" }}
                  activeDot={{ r: 7 }}
                />
                <Line
                  type="monotone"
                  dataKey="CBS"
                  name="CBS"
                  stroke={TAX_COLORS.CBS}
                  strokeWidth={1.5}
                  dot={{ r: 3 }}
                  strokeDasharray="4 2"
                />
                <Line
                  type="monotone"
                  dataKey="IBS"
                  name="IBS"
                  stroke={TAX_COLORS.IBS}
                  strokeWidth={1.5}
                  dot={{ r: 3 }}
                  strokeDasharray="4 2"
                />
                <Line
                  type="monotone"
                  dataKey="ICMS"
                  name="ICMS"
                  stroke={TAX_COLORS.ICMS}
                  strokeWidth={1.5}
                  dot={{ r: 3 }}
                  strokeDasharray="4 2"
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Detalhes dos Cálculos ────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors"
        >
          <span className="text-base font-semibold text-slate-800">
            Detalhamento dos Cálculos — Ano {selectedYear}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-slate-400 transition-transform ${showDetails ? "rotate-180" : ""}`}
          />
        </button>

        {showDetails && (
          <div className="px-6 pb-6 border-t border-slate-50">
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {/* Sistema Antigo */}
              <div>
                <h3 className="text-sm font-bold text-red-700 mb-3 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
                  Sistema Antigo — Imposto por Dentro
                </h3>
                <div className="space-y-1.5">
                  <TaxBadge name="PIS" value={oldResult.pis} rate={rates.pis} color={TAX_COLORS.PIS} />
                  <TaxBadge name="COFINS" value={oldResult.cofins} rate={rates.cofins} color={TAX_COLORS.COFINS} />
                  {oldResult.ipi > 0 && <TaxBadge name="IPI" value={oldResult.ipi} rate={rates.ipi} color={TAX_COLORS.IPI} />}
                  {oldResult.icms > 0 && <TaxBadge name="ICMS" value={oldResult.icms} rate={rates.icms} color={TAX_COLORS.ICMS} />}
                  {oldResult.iss > 0 && <TaxBadge name="ISS" value={oldResult.iss} rate={rates.iss} color={TAX_COLORS.ISS} />}
                  <div className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-red-50 border border-red-200 mt-2">
                    <span className="text-sm font-bold text-red-700">TOTAL</span>
                    <span className="text-sm font-bold text-red-700">{formatBRL(oldResult.totalTax)}</span>
                  </div>
                  <p className="text-xs text-slate-400 px-1">
                    ⚠ ICMS "por dentro": o imposto integra o próprio preço de venda (base de cálculo inclui o ICMS).
                  </p>
                </div>
              </div>

              {/* Sistema Novo — Transição */}
              <div>
                <h3 className="text-sm font-bold text-blue-700 mb-3 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
                  Sistema em Transição — Ano {selectedYear}
                </h3>
                <div className="space-y-1.5">
                  {transitionResult.pis > 0 && <TaxBadge name="PIS (resíduo)" value={transitionResult.pis} rate={rates.pis * selectedSchedule.pisMultiplier} color={TAX_COLORS.PIS} />}
                  {transitionResult.cofins > 0 && <TaxBadge name="COFINS (resíduo)" value={transitionResult.cofins} rate={rates.cofins * selectedSchedule.cofinsMultiplier} color={TAX_COLORS.COFINS} />}
                  {transitionResult.ipi > 0 && <TaxBadge name="IPI (resíduo)" value={transitionResult.ipi} rate={rates.ipi * selectedSchedule.ipiMultiplier} color={TAX_COLORS.IPI} />}
                  {transitionResult.icms > 0 && <TaxBadge name="ICMS (reduzido)" value={transitionResult.icms} rate={rates.icms * selectedSchedule.icmsMultiplier} color={TAX_COLORS.ICMS} />}
                  {transitionResult.iss > 0 && <TaxBadge name="ISS (reduzido)" value={transitionResult.iss} rate={rates.iss * selectedSchedule.issMultiplier} color={TAX_COLORS.ISS} />}
                  {transitionResult.cbs > 0 && (
                    <div>
                      <TaxBadge name="CBS (líquida)" value={transitionResult.cbs} rate={selectedSchedule.cbsRate} color={TAX_COLORS.CBS} />
                      <p className="text-xs text-slate-400 px-1 mt-0.5">Débito − Crédito: {formatBRL(purchaseValue * selectedSchedule.cbsRate / 100)}</p>
                    </div>
                  )}
                  {transitionResult.ibs > 0 && (
                    <div>
                      <TaxBadge name="IBS (líquido)" value={transitionResult.ibs} rate={selectedSchedule.ibsRate} color={TAX_COLORS.IBS} />
                      <p className="text-xs text-slate-400 px-1 mt-0.5">Débito − Crédito: {formatBRL(purchaseValue * selectedSchedule.ibsRate / 100)}</p>
                    </div>
                  )}
                  {transitionResult.is > 0 && <TaxBadge name="Imposto Seletivo" value={transitionResult.is} rate={isRate} color={TAX_COLORS.IS} />}
                  <div className={`flex items-center justify-between py-2.5 px-3 rounded-lg border mt-2 ${diff <= 0 ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"}`}>
                    <span className={`text-sm font-bold ${diff <= 0 ? "text-emerald-700" : "text-amber-700"}`}>TOTAL</span>
                    <span className={`text-sm font-bold ${diff <= 0 ? "text-emerald-700" : "text-amber-700"}`}>{formatBRL(transitionResult.totalTax)}</span>
                  </div>
                  <p className="text-xs text-slate-400 px-1">
                    ✓ CBS/IBS "por fora": o tributo NÃO integra a própria base de cálculo.
                  </p>
                </div>
              </div>
            </div>

            {/* Créditos CBS/IBS */}
            {(newResult.creditCbs > 0 || newResult.creditIbs > 0) && (
              <div className="mt-4 p-4 bg-cyan-50 border border-cyan-100 rounded-xl">
                <p className="text-xs font-bold text-cyan-700 mb-2">⚡ Não-cumulatividade Plena (Créditos das Compras)</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500">Crédito CBS (insumos):</span>
                    <span className="ml-1 font-semibold text-cyan-700">{formatBRL(newResult.creditCbs)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Crédito IBS (insumos):</span>
                    <span className="ml-1 font-semibold text-cyan-700">{formatBRL(newResult.creditIbs)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Crédito Total:</span>
                    <span className="ml-1 font-semibold text-cyan-700">{formatBRL(newResult.creditCbs + newResult.creditIbs)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
