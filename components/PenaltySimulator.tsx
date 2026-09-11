"use client";

import { useState, useMemo } from "react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  Percent,
  DollarSign,
  Info,
  ChevronDown,
  Star,
} from "lucide-react";
import {
  calcPenalty,
  PenaltyType,
  PaymentMoment,
  PaymentForm,
  formatBRL,
  formatPercent,
} from "@/utils/taxCalculator";

// ── Pill selector ────────────────────────────────────────────────────
function PillSelector<T extends string>({
  options,
  value,
  onChange,
  colorMap,
}: {
  options: { value: T; label: string; icon?: React.ReactNode }[];
  value: T;
  onChange: (v: T) => void;
  colorMap?: Record<T, string>;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt.value;
        const color = colorMap?.[opt.value] ?? "blue";
        const activeClasses =
          color === "red"
            ? "bg-red-600 text-white border-red-600 shadow-sm"
            : color === "amber"
            ? "bg-amber-500 text-white border-amber-500 shadow-sm"
            : "bg-blue-600 text-white border-blue-600 shadow-sm";
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-medium transition-all ${
              active ? activeClasses : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            {opt.icon}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// ── Cartão de resultado grande ───────────────────────────────────────
function ResultCard({
  label,
  value,
  sub,
  highlight = false,
  bonus = false,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  bonus?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-5 border ${
        bonus
          ? "bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200"
          : highlight
          ? "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200"
          : "bg-slate-50 border-slate-200"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">{label}</p>
      <p
        className={`text-2xl font-bold tracking-tight ${
          bonus ? "text-purple-700" : highlight ? "text-emerald-700" : "text-slate-800"
        }`}
      >
        {value}
      </p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}

// ── Linha de comparação ──────────────────────────────────────────────
function CompareRow({
  label,
  before,
  after,
  afterBonus,
  isSavings,
}: {
  label: string;
  before: number;
  after: number;
  afterBonus?: number;
  isSavings?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0">
      <span className="w-40 text-xs text-slate-500 font-medium flex-shrink-0">{label}</span>
      <span className="flex-1 text-sm font-semibold text-slate-800 text-right">{formatBRL(before)}</span>
      <span
        className={`flex-1 text-sm font-semibold text-right ${
          isSavings ? "text-emerald-600" : "text-blue-600"
        }`}
      >
        {formatBRL(after)}
      </span>
      {afterBonus !== undefined && (
        <span
          className={`flex-1 text-sm font-semibold text-right ${
            isSavings ? "text-purple-600" : "text-purple-600"
          }`}
        >
          {formatBRL(afterBonus)}
        </span>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────
export default function PenaltySimulator() {
  const [tributeValueInput, setTributeValueInput] = useState("100000");
  const [basePenaltyRate, setBasePenaltyRate] = useState(75);
  const [penaltyType, setPenaltyType] = useState<PenaltyType>("standard");
  const [paymentMoment, setPaymentMoment] = useState<PaymentMoment>("impugnacao");
  const [paymentForm, setPaymentForm] = useState<PaymentForm>("integral");
  const [showPAF, setShowPAF] = useState(false);

  const tributeValue = useMemo(() => {
    if (!tributeValueInput || tributeValueInput.trim() === "") return 0;
    const n = Number(tributeValueInput);
    return isNaN(n) ? 0 : Math.max(0, n);
  }, [tributeValueInput]);

  const result = useMemo(
    () => calcPenalty(tributeValue, basePenaltyRate, penaltyType, paymentMoment, paymentForm),
    [tributeValue, basePenaltyRate, penaltyType, paymentMoment, paymentForm]
  );

  const capLabel = {
    standard: "Padrão (máx. 75%)",
    fraud: "Fraude/Sonegação (máx. 100%)",
    recurrence: "Reincidência (máx. 150%)",
  }[penaltyType];

  const momentLabel = {
    impugnacao: "No prazo da impugnação",
    pre_divida: "Pré-inscrição em Dívida Ativa",
  }[paymentMoment];

  const formLabel = {
    integral: "Pagamento integral",
    parcelamento: "Parcelamento",
  }[paymentForm];

  // Dados para gráfico de pizza
  const pieData = [
    { name: "Tributo", value: tributeValue, color: "#3b82f6" },
    { name: "Multa (padrão)", value: result.finalPenalty, color: "#f59e0b" },
    { name: "Desconto Bônus", value: result.finalPenalty - result.finalPenaltyBonus, color: "#a855f7" },
    { name: "Economia Total", value: result.savings, color: "#10b981" },
  ].filter((d) => d.value > 0);

  const RADIAN = Math.PI / 180;
  const renderLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, name,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    if (percent < 0.07) return null;
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">

      {/* ── Inputs ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Shield className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-800">Simulador de Multas — Diretrizes PLP 108/2024</h2>
            <p className="text-xs text-slate-400">Dosimetria Proporcional e Súmula Vinculante 28 do STF</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Valor do tributo */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Valor do Tributo Autuado (R$)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="number"
                value={tributeValueInput}
                placeholder="Digite o valor do tributo (ex: 100000)..."
                onChange={(e) => setTributeValueInput(e.target.value)}
                min={0}
                step={10000}
                className="w-full pl-9 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 font-medium placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">{formatBRL(tributeValue)}</p>
          </div>

          {/* Alíquota de multa aplicada */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Alíquota de Multa Lançada: <span className="text-amber-600 font-bold">{basePenaltyRate}%</span>
            </label>
            <input
              type="range"
              min={0}
              max={150}
              step={5}
              value={basePenaltyRate}
              onChange={(e) => setBasePenaltyRate(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>0%</span>
              <span className="text-amber-500 font-semibold">75% (padrão)</span>
              <span>100%</span>
              <span>150%</span>
            </div>
            {basePenaltyRate > result.capRate * 100 && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Excede o teto legal. Será limitado a {formatPercent(result.capRate * 100)}.
              </p>
            )}
          </div>
        </div>

        {/* Tipo de Penalidade */}
        <div className="mt-5">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Tipo de Infração (Dosimetria Proporcional)
          </label>
          <PillSelector<PenaltyType>
            options={[
              { value: "standard", label: "Padrão (≤ 75%)", icon: <Shield className="w-3.5 h-3.5" /> },
              { value: "fraud", label: "Fraude / Sonegação / Conluio (≤ 100%)", icon: <AlertTriangle className="w-3.5 h-3.5" /> },
              { value: "recurrence", label: "Reincidência (≤ 150%)", icon: <AlertTriangle className="w-3.5 h-3.5" /> },
            ]}
            value={penaltyType}
            onChange={setPenaltyType}
            colorMap={{ standard: "blue", fraud: "amber", recurrence: "red" }}
          />
        </div>

        {/* Momento do Pagamento */}
        <div className="mt-5">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Momento da Regularização (Diretrizes PLP 108/2024)
          </label>
          <PillSelector<PaymentMoment>
            options={[
              { value: "impugnacao", label: "No prazo da impugnação" },
              { value: "pre_divida", label: "Pré-inscrição em Dívida Ativa" },
            ]}
            value={paymentMoment}
            onChange={setPaymentMoment}
            colorMap={{ impugnacao: "blue", pre_divida: "blue" }}
          />
        </div>

        {/* Forma de Pagamento */}
        <div className="mt-5">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Forma de Pagamento
          </label>
          <PillSelector<PaymentForm>
            options={[
              { value: "integral", label: "Pagamento Integral", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
              { value: "parcelamento", label: "Parcelamento", icon: <Percent className="w-3.5 h-3.5" /> },
            ]}
            value={paymentForm}
            onChange={setPaymentForm}
            colorMap={{ integral: "blue", parcelamento: "blue" }}
          />
        </div>

        {/* Info box */}
        <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl flex gap-3">
          <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-amber-700">
            <strong>{capLabel}</strong> | {momentLabel} | {formLabel} → desconto de{" "}
            <strong>{formatPercent(result.discountRate * 100)}</strong> (padrão) e{" "}
            <strong>{formatPercent(result.bonusDiscountRate * 100)}</strong> (Bônus de Conformidade)
          </div>
        </div>
      </div>

      {/* ── Resultados ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ResultCard
          label="Multa Bruta"
          value={formatBRL(result.basePenalty)}
          sub={`${basePenaltyRate}% sobre o tributo`}
        />
        <ResultCard
          label="Multa após Teto Legal"
          value={formatBRL(result.cappedPenalty)}
          sub={`Limitada a ${formatPercent(result.capRate * 100)}`}
        />
        <ResultCard
          label="Multa com Desconto Padrão"
          value={formatBRL(result.finalPenalty)}
          sub={`−${formatPercent(result.discountRate * 100)} de desconto`}
          highlight
        />
        <ResultCard
          label="Multa c/ Bônus Conformidade"
          value={formatBRL(result.finalPenaltyBonus)}
          sub={`−${formatPercent(result.bonusDiscountRate * 100)} de desconto`}
          bonus
        />
      </div>

      {/* ── Comparativo visual ──────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-base font-semibold text-slate-800 mb-5">Comparativo de Dívida Total</h2>
        <div className="grid md:grid-cols-2 gap-6">

          {/* Tabela comparativa */}
          <div>
            <div className="flex gap-3 text-xs font-bold text-slate-400 uppercase tracking-wide mb-2 pl-40">
              <span className="flex-1 text-right">Sem Desconto</span>
              <span className="flex-1 text-right text-emerald-500">Desc. Padrão</span>
              <span className="flex-1 text-right text-purple-500 flex items-center justify-end gap-1">
                <Star className="w-3 h-3" /> Bônus
              </span>
            </div>
            <CompareRow
              label="Tributo"
              before={tributeValue}
              after={tributeValue}
              afterBonus={tributeValue}
            />
            <CompareRow
              label="Multa"
              before={result.cappedPenalty}
              after={result.finalPenalty}
              afterBonus={result.finalPenaltyBonus}
            />
            <CompareRow
              label="TOTAL"
              before={tributeValue + result.cappedPenalty}
              after={result.totalDebt}
              afterBonus={result.totalDebtBonus}
              isSavings={false}
            />
            <CompareRow
              label="Economia"
              before={0}
              after={result.savings}
              afterBonus={result.savingsBonus}
              isSavings
            />

            {/* Barras de economia */}
            <div className="mt-4 space-y-2">
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Desconto Padrão ({formatPercent(result.discountRate * 100)})</span>
                  <span className="text-emerald-600 font-semibold">{formatBRL(result.savings)}</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full"
                    style={{ width: `${result.discountRate * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Bônus Conformidade ({formatPercent(result.bonusDiscountRate * 100)})</span>
                  <span className="text-purple-600 font-semibold">{formatBRL(result.savingsBonus)}</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-400 rounded-full"
                    style={{ width: `${result.bonusDiscountRate * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Gráfico de Pizza */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-xs text-slate-500 mb-2 font-medium">Composição da Dívida (Desc. Padrão)</p>
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Tributo", value: tributeValue, color: "#3b82f6" },
                      { name: "Multa final", value: result.finalPenalty, color: "#f59e0b" },
                      { name: "Desconto obtido", value: result.savings, color: "#10b981" },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                    labelLine={false}
                    label={renderLabel}
                  >
                    {[
                      { name: "Tributo", value: tributeValue, color: "#3b82f6" },
                      { name: "Multa final", value: result.finalPenalty, color: "#f59e0b" },
                      { name: "Desconto obtido", value: result.savings, color: "#10b981" },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={((value: unknown) => [typeof value === 'number' ? formatBRL(value) : String(value ?? ''), ""]) as any}
                    contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-3 flex-wrap justify-center text-xs mt-2">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-blue-500" />Tributo</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-amber-500" />Multa final</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />Desconto obtido</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabela de Descontos ──────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-base font-semibold text-slate-800 mb-4">Tabela de Descontos Progressivos (Diretrizes PLP 108/2024)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-slate-500 font-semibold pb-2 pr-4">Momento / Forma</th>
                <th className="text-center text-emerald-600 font-semibold pb-2 px-3">Desconto Padrão</th>
                <th className="text-center text-purple-600 font-semibold pb-2 px-3">Bônus Conformidade</th>
                <th className="text-center text-slate-500 font-semibold pb-2 px-3">Multa Final (Padrão)</th>
                <th className="text-center text-purple-500 font-semibold pb-2 px-3">Multa Final (Bônus)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { moment: "Impugnação", form: "Integral", std: 50, bonus: 60 },
                { moment: "Impugnação", form: "Parcelamento", std: 40, bonus: 50 },
                { moment: "Pré-Dívida Ativa", form: "Integral", std: 30, bonus: 40 },
                { moment: "Pré-Dívida Ativa", form: "Parcelamento", std: 20, bonus: 30 },
              ].map((row, i) => {
                const isActive =
                  (row.moment === "Impugnação" ? "impugnacao" : "pre_divida") === paymentMoment &&
                  row.form.toLowerCase().replace("amento", "") === paymentForm;
                return (
                  <tr key={i} className={`border-b border-slate-50 ${isActive ? "bg-blue-50" : "hover:bg-slate-50"}`}>
                    <td className="py-2.5 pr-4 text-slate-600 font-medium">
                      {row.moment} — {row.form}
                      {isActive && <span className="ml-2 text-blue-600 font-bold">← atual</span>}
                    </td>
                    <td className="text-center py-2.5 px-3 text-emerald-600 font-semibold">{row.std}%</td>
                    <td className="text-center py-2.5 px-3 text-purple-600 font-semibold">{row.bonus}%</td>
                    <td className="text-center py-2.5 px-3 text-slate-700">
                      {formatBRL(result.cappedPenalty * (1 - row.std / 100))}
                    </td>
                    <td className="text-center py-2.5 px-3 text-purple-700">
                      {formatBRL(result.cappedPenalty * (1 - row.bonus / 100))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-3">
          * Multa calculada sobre: {formatBRL(result.cappedPenalty)} (multa após teto legal de {formatPercent(result.capRate * 100)})
        </p>
      </div>

      {/* ── PAF Info ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <button
          onClick={() => setShowPAF(!showPAF)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-slate-500" />
            <span className="text-base font-semibold text-slate-800">
              Diretrizes do PAF — Processo Administrativo Fiscal (PLP 108/2024 & STF)
            </span>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${showPAF ? "rotate-180" : ""}`} />
        </button>

        {showPAF && (
          <div className="px-6 pb-6 border-t border-slate-50">
            <div className="grid md:grid-cols-2 gap-4 mt-5">
              {[
                {
                  icon: "⏱",
                  title: "Prazo Unificado de 20 Dias Úteis",
                  ref: "PLP 108/2024",
                  desc: "Os recursos no Processo Administrativo Fiscal de CBS e IBS passam a ter contagem em dias úteis para apresentação, alinhando as garantias ao processo civil e acabando com distorções estaduais.",
                  color: "blue",
                },
                {
                  icon: "🚫",
                  title: "Proibição de Caução para Recorrer",
                  ref: "Súmula Vinculante 28",
                  desc: "É inconstitucional a exigência de depósito prévio, fiança ou qualquer garantia como condição para o recurso administrativo, conforme pacificado pelo STF e ratificado no PLP 108/2024.",
                  color: "green",
                },
                {
                  icon: "📋",
                  title: "Dosimetria Proporcional de Multas",
                  ref: "PLP 108/2024",
                  desc: "Multas de ofício passam a ter tetos de referência e gradação fundamentada: 75% (padrão), 100% (fraude/sonegação/conluio) e 150% (reincidência).",
                  color: "amber",
                },
                {
                  icon: "⭐",
                  title: "Bônus de Conformidade Fiscal",
                  ref: "Regularização",
                  desc: "Contribuintes em conformidade fiscal obtêm redução adicional sobre os descontos padrão ao regularizarem os débitos de forma voluntária.",
                  color: "purple",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border ${
                    item.color === "blue"
                      ? "bg-blue-50 border-blue-100"
                      : item.color === "green"
                      ? "bg-emerald-50 border-emerald-100"
                      : item.color === "amber"
                      ? "bg-amber-50 border-amber-100"
                      : "bg-purple-50 border-purple-100"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-bold text-slate-800">{item.title}</h3>
                        <span className="text-xs bg-white text-slate-500 px-2 py-0.5 rounded-full border border-slate-200 font-mono">
                          {item.ref}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* NOTA DE ISENÇÃO DE RESPONSABILIDADE (DISCLAIMER) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-100/90 border border-slate-200 text-slate-600 text-xs flex items-start gap-3 shadow-2xs">
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
    </div>
  );
}
