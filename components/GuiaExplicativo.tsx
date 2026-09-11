"use client";

import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Check,
  X,
  Info,
  Calendar,
  TrendingDown,
  Scale,
  Landmark,
} from "lucide-react";
import { TRANSITION_SCHEDULE, formatPercent } from "@/utils/taxCalculator";

// ── Linha do tempo ───────────────────────────────────────────────────
function TimelineItem({
  year,
  description,
  items,
  active,
  onClick,
  last = false,
}: {
  year: number;
  description: string;
  items: string[];
  active: boolean;
  onClick: () => void;
  last?: boolean;
}) {
  const isStart = year === 2026;
  const isEnd = year === 2033;
  const dotColor = isEnd ? "bg-emerald-500" : isStart ? "bg-blue-500" : "bg-slate-400";
  const lineColor = isEnd ? "bg-emerald-200" : "bg-slate-200";

  return (
    <div className="flex gap-4">
      {/* Linha vertical + dot */}
      <div className="flex flex-col items-center">
        <button
          onClick={onClick}
          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-xs flex-shrink-0 transition-all ${
            active
              ? isEnd
                ? "border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                : "border-blue-500 bg-blue-500 text-white shadow-lg shadow-blue-200"
              : "border-slate-300 bg-white text-slate-500 hover:border-slate-400"
          }`}
        >
          {year}
        </button>
        {!last && <div className={`w-0.5 flex-1 mt-1 min-h-[40px] ${lineColor}`} />}
      </div>

      {/* Conteúdo */}
      <div className={`pb-6 flex-1 ${last ? "" : ""}`}>
        <button onClick={onClick} className="text-left w-full group">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
              {year === 2033 ? "🏁 " : year === 2026 ? "🚀 " : ""}{year}
            </span>
            {active ? (
              <ChevronDown className="w-4 h-4 text-blue-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-400" />
            )}
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
        </button>

        {active && (
          <div className="mt-3 space-y-1.5 animate-fade-in">
            {items.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Accordion ────────────────────────────────────────────────────────
function Accordion({
  title,
  icon,
  tag,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  tag?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all ${open ? "border-blue-200 shadow-sm" : "border-slate-100"}`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-5 py-4 transition-colors ${
          open ? "bg-blue-50" : "bg-white hover:bg-slate-50"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className={`p-2 rounded-lg ${open ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"}`}>
            {icon}
          </span>
          <span className={`text-sm font-semibold ${open ? "text-blue-800" : "text-slate-800"}`}>{title}</span>
          {tag && (
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium">{tag}</span>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-4 bg-white border-t border-slate-100 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}

// ── Comparação Por Dentro vs Por Fora ────────────────────────────────
function TaxMethodComparison() {
  const price = 1000;
  const rate = 17; // 17% ICMS

  // Por dentro: tributo integra a base
  const icmsPorDentro = price * (rate / 100);
  const precoLiquidoPorDentro = price - icmsPorDentro;
  const aliqEfetivaPorDentro = icmsPorDentro / precoLiquidoPorDentro * 100;

  // Por fora: tributo sobre o preço líquido
  const precoLiquido = price;
  const tribPorFora = price * (rate / 100);
  const precoTotal = price + tribPorFora;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <h4 className="text-sm font-bold text-red-700 mb-3 flex items-center gap-2">
          <span className="w-5 h-5 bg-red-200 rounded-full flex items-center justify-center text-xs">A</span>
          Imposto "Por Dentro" (Sistema Antigo — ICMS)
        </h4>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1.5 border-b border-red-100">
            <span className="text-red-600">Preço ao consumidor</span>
            <span className="font-bold text-red-800">R$ {price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-red-100">
            <span className="text-red-600">Alíquota ICMS</span>
            <span className="font-bold text-red-800">{rate}%</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-red-100">
            <span className="text-red-600">ICMS embutido</span>
            <span className="font-bold text-red-800">R$ {icmsPorDentro.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-red-100">
            <span className="text-red-600">Preço "sem ICMS"</span>
            <span className="font-bold text-red-800">R$ {precoLiquidoPorDentro.toFixed(2)}</span>
          </div>
          <div className="bg-red-100 rounded-lg px-3 py-2 mt-2">
            <span className="text-red-700 font-semibold">
              Alíquota real sobre o produto: {aliqEfetivaPorDentro.toFixed(1)}%
            </span>
            <br />
            <span className="text-red-500">
              (O ICMS incide sobre si mesmo — cálculo circular)
            </span>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
        <h4 className="text-sm font-bold text-emerald-700 mb-3 flex items-center gap-2">
          <span className="w-5 h-5 bg-emerald-200 rounded-full flex items-center justify-center text-xs">B</span>
          Imposto "Por Fora" (IVA Dual — CBS/IBS)
        </h4>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1.5 border-b border-emerald-100">
            <span className="text-emerald-600">Preço do produto (base)</span>
            <span className="font-bold text-emerald-800">R$ {precoLiquido.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-emerald-100">
            <span className="text-emerald-600">Alíquota CBS+IBS</span>
            <span className="font-bold text-emerald-800">{rate}%</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-emerald-100">
            <span className="text-emerald-600">Tributo (por fora)</span>
            <span className="font-bold text-emerald-800">R$ {tribPorFora.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-emerald-100">
            <span className="text-emerald-600">Preço total ao consumidor</span>
            <span className="font-bold text-emerald-800">R$ {precoTotal.toFixed(2)}</span>
          </div>
          <div className="bg-emerald-100 rounded-lg px-3 py-2 mt-2">
            <span className="text-emerald-700 font-semibold">
              Transparência total: tributo é {rate}% sobre R$ {precoLiquido}
            </span>
            <br />
            <span className="text-emerald-500">
              (Sem cálculo circular — base clara para consumidores)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Destino vs Origem ────────────────────────────────────────────────
function DestinationOriginComparison() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
        <h4 className="text-sm font-bold text-orange-700 mb-3">🏭 Cobrança na Origem (Sistema Antigo)</h4>
        <ul className="space-y-2 text-xs text-orange-700">
          <li className="flex gap-2"><X className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />Imposto fica no estado produtor/vendedor</li>
          <li className="flex gap-2"><X className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />Incentiva "guerra fiscal" entre estados</li>
          <li className="flex gap-2"><X className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />Benefícios fiscais para atrair empresas</li>
          <li className="flex gap-2"><X className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />Distorção na localização de investimentos</li>
          <li className="flex gap-2"><X className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />Diferenças de alíquotas entre estados (7% a 18%)</li>
        </ul>
        <div className="mt-3 p-2 bg-orange-100 rounded-lg text-xs text-orange-600">
          <strong>Exemplo:</strong> Empresa de SP vende para RJ. O ICMS fica em SP (origem), não em RJ (destino).
        </div>
      </div>

      <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4">
        <h4 className="text-sm font-bold text-cyan-700 mb-3">🏪 Cobrança no Destino (IVA Dual)</h4>
        <ul className="space-y-2 text-xs text-cyan-700">
          <li className="flex gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />IBS arrecadado onde o consumo ocorre</li>
          <li className="flex gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />Fim da guerra fiscal entre estados e municípios</li>
          <li className="flex gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />Alíquota única nacional para CBS e IBS</li>
          <li className="flex gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />Isonomia entre setores e regiões</li>
          <li className="flex gap-2"><Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />Decisão de localização baseada em eficiência, não incentivos</li>
        </ul>
        <div className="mt-3 p-2 bg-cyan-100 rounded-lg text-xs text-cyan-600">
          <strong>Exemplo:</strong> Empresa de SP vende para RJ. O IBS fica em RJ (destino), onde o consumidor está.
        </div>
      </div>
    </div>
  );
}

// ── Glossário ────────────────────────────────────────────────────────
const GLOSSARY = [
  {
    term: "CBS",
    full: "Contribuição sobre Bens e Serviços",
    desc: "Tributo federal que substitui o PIS, Cofins e parcialmente o IPI. Gerido pela União. Entra em vigor pleno em 2027.",
  },
  {
    term: "IBS",
    full: "Imposto sobre Bens e Serviços",
    desc: "Substitui o ICMS e ISS. Gerido pelo Comitê Gestor do IBS, composto por estados e municípios. Implantado gradualmente de 2029 a 2033.",
  },
  {
    term: "IS",
    full: "Imposto Seletivo",
    desc: "Incide sobre bens e serviços considerados prejudiciais à saúde ou ao meio ambiente: cigarros, bebidas alcoólicas, veículos etc. Chamado de 'imposto do pecado'.",
  },
  {
    term: "IVA Dual",
    full: "Imposto sobre Valor Adicionado (modelo dual)",
    desc: "Modelo composto por CBS (federal) + IBS (subnacional). 'Dual' porque separa as competências entre esferas de governo, diferente do IVA único europeu.",
  },
  {
    term: "Não-cumulatividade",
    full: "Não-cumulatividade Plena",
    desc: "Empresas abtem crédito de CBS/IBS pagos em compras e descontam dos débitos nas vendas. Elimina o 'efeito cascata' do sistema antigo.",
  },
  {
    term: "PAF",
    full: "Processo Administrativo Fiscal",
    desc: "Rito administrativo para contestar autuações fiscais antes de recorrer ao Judiciário. As diretrizes do PLP 108/2024 e a Súmula Vinculante 28 do STF unificam prazos em dias úteis e vedam depósito prévio para recorrer.",
  },
];

// ────────────────────────────────────────────────────────────────────
export default function GuiaExplicativo() {
  const [activeYear, setActiveYear] = useState<number | null>(2033);
  const [filter, setFilter] = useState<"all" | "old" | "new">("all");

  const timelineItems = TRANSITION_SCHEDULE.map((s) => ({
    year: s.year,
    description: s.description,
    items: buildTimelineItems(s),
  }));

  function buildTimelineItems(s: (typeof TRANSITION_SCHEDULE)[0]) {
    const items: string[] = [];
    if (s.pisMultiplier === 0 && s.year >= 2027) items.push("PIS e Cofins extintos");
    if (s.ipiMultiplier === 0 && s.year >= 2027) items.push("IPI reduzido a zero");
    if (s.cbsRate > 0) items.push(`CBS: ${formatPercent(s.cbsRate)} (plena)`);
    if (s.ibsRate > 0) items.push(`IBS: ${formatPercent(s.ibsRate)}`);
    if (s.icmsMultiplier < 1 && s.icmsMultiplier > 0)
      items.push(`ICMS reduzido a ${(s.icmsMultiplier * 100).toFixed(0)}%`);
    if (s.icmsMultiplier === 0 && s.year === 2033) items.push("ICMS e ISS extintos definitivamente");
    if (s.year === 2026) items.push("Fase teste: CBS 0,9% e IBS 0,1% compensados no PIS/Cofins");
    if (s.year === 2033) items.push("IVA Dual em plena vigência — sistema totalmente novo");
    return items;
  }

  return (
    <div className="space-y-6 animate-fade-in">

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-white/10 rounded-xl">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Guia Completo da Reforma Tributária</h2>
            <p className="text-xs text-slate-300">EC 132/2023 | PLP 68/2024 | PLP 108/2024</p>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
          A maior reforma do sistema tributário brasileiro desde 1988. Substitui 5 tributos complexos por 2 impostos
          modernos sobre o valor adicionado, com alíquota transparente, não-cumulatividade plena e cobrança no destino.
        </p>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {[
            { label: "Tributos extintos", value: "5" },
            { label: "Anos de transição", value: "8" },
            { label: "Economia estimada", value: "1,7% PIB" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 rounded-xl px-4 py-3">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-slate-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Linha do Tempo ──────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-4 h-4 text-blue-500" />
          <h2 className="text-base font-semibold text-slate-800">Linha do Tempo Interativa (2026–2033)</h2>
        </div>
        <div className="pl-2">
          {timelineItems.map((item, i) => (
            <TimelineItem
              key={item.year}
              year={item.year}
              description={item.description}
              items={item.items}
              active={activeYear === item.year}
              onClick={() => setActiveYear(activeYear === item.year ? null : item.year)}
              last={i === timelineItems.length - 1}
            />
          ))}
        </div>
      </div>

      {/* ── Conceitos Principais ─────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center gap-2 mb-5">
          <Scale className="w-4 h-4 text-purple-500" />
          <h2 className="text-base font-semibold text-slate-800">Conceitos Fundamentais</h2>
          <div className="ml-auto flex gap-2">
            {(["all", "old", "new"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === f
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {f === "all" ? "Todos" : f === "old" ? "Sistema Antigo" : "Sistema Novo"}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {(filter === "all" || filter === "old") && (
            <Accordion
              title="Imposto Por Dentro vs Por Fora"
              icon={<Scale className="w-4 h-4" />}
              tag="Conceito-chave"
            >
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                O ICMS usa o método "por dentro": a alíquota incide sobre um valor que já inclui o próprio imposto,
                tornando a carga real maior que a nominal. O IVA Dual usa "por fora": mais transparente e alinhado com
                padrões internacionais (mais de 170 países).
              </p>
              <TaxMethodComparison />
            </Accordion>
          )}

          {(filter === "all" || filter === "new") && (
            <Accordion
              title="Cobrança no Destino — Fim da Guerra Fiscal"
              icon={<Landmark className="w-4 h-4" />}
              tag="IVA Dual"
            >
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                O principal problema do ICMS era a cobrança na origem: o estado produtor ficava com o imposto,
                incentivando uma guerra de benefícios fiscais. Com o IBS, o imposto vai para o estado onde o
                consumo efetivamente ocorre.
              </p>
              <DestinationOriginComparison />
            </Accordion>
          )}

          {(filter === "all" || filter === "new") && (
            <Accordion
              title="Não-Cumulatividade Plena — Fim do Efeito Cascata"
              icon={<TrendingDown className="w-4 h-4" />}
              tag="CBS + IBS"
            >
              <div className="space-y-3">
                <p className="text-xs text-slate-500 leading-relaxed">
                  No sistema antigo, PIS/Cofins e ICMS em cascata incidiam várias vezes ao longo da cadeia produtiva.
                  No novo sistema, cada empresa recolhe apenas o tributo sobre o <strong>valor que ela adicionou</strong>,
                  descontando o que pagou nas compras.
                </p>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs font-bold text-slate-600 mb-3">Exemplo de Cadeia Produtiva (alíquota 10%)</p>
                  <div className="space-y-2">
                    {[
                      { name: "Matéria-prima", venda: 100, compra: 0, debito: 10, credito: 0, recolhe: 10 },
                      { name: "Fábrica", venda: 300, compra: 100, debito: 30, credito: 10, recolhe: 20 },
                      { name: "Distribuidor", venda: 500, compra: 300, debito: 50, credito: 30, recolhe: 20 },
                      { name: "Varejista", venda: 700, compra: 500, debito: 70, credito: 50, recolhe: 20 },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs bg-white rounded-lg px-3 py-2 border border-slate-100">
                        <span className="w-24 font-medium text-slate-700">{row.name}</span>
                        <span className="text-slate-400">Venda: R${row.venda}</span>
                        <ArrowRight className="w-3 h-3 text-slate-300" />
                        <span className="text-blue-600">Débito: R${row.debito}</span>
                        <span className="text-slate-400">−</span>
                        <span className="text-emerald-600">Crédito: R${row.credito}</span>
                        <span className="text-slate-400">=</span>
                        <span className="font-bold text-slate-800">Recolhe: R${row.recolhe}</span>
                      </div>
                    ))}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-xs flex justify-between">
                      <span className="text-emerald-700 font-semibold">Total recolhido na cadeia</span>
                      <span className="text-emerald-700 font-bold">R$ 70 = 10% do preço final (R$700)</span>
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>
          )}

          {(filter === "all" || filter === "old") && (
            <Accordion
              title="PAF — Prazos e Proibição de Caução (PLP 108/2024 & STF)"
              icon={<Info className="w-4 h-4" />}
              tag="PLP 108/2024 & SV 28"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-blue-700 mb-2">⏱ Prazo Unificado</h4>
                  <p className="text-xs text-blue-600 mb-2">
                    <strong>PLP 108/2024:</strong> Recursos no contencioso administrativo passam a ter prazo padronizado em <strong>dias úteis</strong>.
                  </p>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-blue-500 py-1 border-b border-blue-100">
                      <span>Antes (federal)</span><span>30 dias corridos</span>
                    </div>
                    <div className="flex justify-between text-blue-500 py-1 border-b border-blue-100">
                      <span>Antes (estadual)</span><span>Variável (15–30 dias)</span>
                    </div>
                    <div className="flex justify-between text-blue-700 font-bold py-1">
                      <span>Diretriz (unificada)</span><span>20 dias úteis</span>
                    </div>
                  </div>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-emerald-700 mb-2">🚫 Proibição de Caução</h4>
                  <p className="text-xs text-emerald-600">
                    <strong>Súmula Vinculante 28 do STF:</strong> É <strong>inconstitucional</strong> exigir depósito, arrolamento de bens
                    ou qualquer garantia financeira para recorrer administrativamente de autuações fiscais.
                  </p>
                  <p className="text-xs text-emerald-500 mt-2">
                    Garante o pleno exercício do contraditório e da ampla defesa a contribuintes de qualquer porte econômico.
                  </p>
                </div>
              </div>
            </Accordion>
          )}
        </div>
      </div>

      {/* ── Glossário ────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center gap-2 mb-5">
          <BookOpen className="w-4 h-4 text-slate-500" />
          <h2 className="text-base font-semibold text-slate-800">Glossário da Reforma</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {GLOSSARY.map((item) => (
            <div key={item.term} className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-sm font-bold text-blue-700 font-mono">{item.term}</span>
                <span className="text-xs text-slate-400">—</span>
                <span className="text-xs text-slate-600 font-medium">{item.full}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
