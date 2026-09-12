"use client";

import { useState } from "react";
import {
  X,
  Check,
  ArrowRight,
  ChevronDown,
  AlertTriangle,
  Layers,
  Shuffle,
  Globe,
  ReceiptText,
  ShieldCheck,
  Banknote,
} from "lucide-react";

// ─── Tipo de seção ────────────────────────────────────────────────────
type Section =
  | "visao"
  | "impostos"
  | "calculoBase"
  | "competencia"
  | "cumulatividade"
  | "transparencia";

// ─── Dados dos impostos antigos ───────────────────────────────────────
const OLD_TAXES = [
  {
    sigla: "PIS",
    nome: "Programa de Integração Social",
    esfera: "Federal",
    cor: "indigo",
    desc: "Contribuição paga pelas empresas para financiar programas de seguro-desemprego e abono salarial.",
    aliquota: "0,65% a 1,65%",
    problema: "Incide em cascata sobre toda a cadeia produtiva.",
  },
  {
    sigla: "Cofins",
    nome: "Contribuição para Financiamento da Seguridade Social",
    esfera: "Federal",
    cor: "purple",
    desc: "Contribuição das empresas para financiar saúde, previdência e assistência social.",
    aliquota: "3% a 7,6%",
    problema: "Se sobrepõe ao PIS causando dupla tributação.",
  },
  {
    sigla: "IPI",
    nome: "Imposto sobre Produtos Industrializados",
    esfera: "Federal",
    cor: "violet",
    desc: "Imposto sobre produtos industrializados que saem de fábricas ou são importados.",
    aliquota: "0% a 300%",
    problema: "Alíquotas extremamente variáveis geram distorções.",
  },
  {
    sigla: "ICMS",
    nome: "Imposto sobre Circulação de Mercadorias e Serviços",
    esfera: "Estadual",
    cor: "red",
    desc: "Principal imposto estadual. Incide sobre circulação de mercadorias e serviços de transporte e comunicação.",
    aliquota: "7% a 25% (varia por estado)",
    problema: "27 legislações diferentes! Gera guerra fiscal entre estados.",
  },
  {
    sigla: "ISS",
    nome: "Imposto sobre Serviços",
    esfera: "Municipal",
    cor: "orange",
    desc: "Imposto sobre a prestação de serviços, cobrado pelos municípios.",
    aliquota: "2% a 5%",
    problema: "5.570 municípios com regras diferentes. Enorme burocracia.",
  },
];

const NEW_TAXES = [
  {
    sigla: "CBS",
    nome: "Contribuição sobre Bens e Serviços",
    esfera: "Federal",
    cor: "blue",
    substitui: ["PIS", "Cofins", "IPI"],
    desc: "Tributo federal único que substitui o PIS, Cofins e o IPI. Tem alíquota única e nacional.",
    aliquota: "~8,8% (estimado)",
    vantagem: "Uma única lei federal, uma única alíquota, sem exceções.",
  },
  {
    sigla: "IBS",
    nome: "Imposto sobre Bens e Serviços",
    esfera: "Estadual + Municipal",
    cor: "cyan",
    substitui: ["ICMS", "ISS"],
    desc: "Substitui ICMS e ISS. Gerido pelo Comitê Gestor do IBS com regras nacionais uniformes.",
    aliquota: "~17,7% (estimado)",
    vantagem: "Uma lei única para todo o Brasil. Fim da guerra fiscal.",
  },
  {
    sigla: "IS",
    nome: "Imposto Seletivo",
    esfera: "Federal",
    cor: "amber",
    substitui: [],
    desc: "Incide sobre produtos nocivos à saúde e ao meio ambiente: cigarro, bebidas alcoólicas, apostas etc.",
    aliquota: "A definir (pode chegar a 100%+)",
    vantagem: "Desestimula consumo de produtos prejudiciais.",
  },
];

// ─── Utilitários de cor ────────────────────────────────────────────────
const colorMap: Record<
  string,
  { bg: string; border: string; text: string; badge: string }
> = {
  indigo: {
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-700",
    badge: "bg-indigo-100 text-indigo-700",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
    badge: "bg-purple-100 text-purple-700",
  },
  violet: {
    bg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-700",
    badge: "bg-violet-100 text-violet-700",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    badge: "bg-red-100 text-red-700",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    badge: "bg-orange-100 text-orange-700",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    badge: "bg-blue-100 text-blue-700",
  },
  cyan: {
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    text: "text-cyan-700",
    badge: "bg-cyan-100 text-cyan-700",
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    badge: "bg-amber-100 text-amber-700",
  },
};

// ─── Card Imposto Antigo ──────────────────────────────────────────────
function OldTaxCard({
  tax,
  expanded,
  onClick,
}: {
  tax: (typeof OLD_TAXES)[0];
  expanded: boolean;
  onClick: () => void;
}) {
  const c = colorMap[tax.cor];
  return (
    <div
      className={`border rounded-2xl overflow-hidden cursor-pointer card-lift transition-all ${c.border} ${expanded ? c.bg : "bg-white hover:bg-slate-50"}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 p-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 ${c.badge}`}
        >
          {tax.sigla}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-800">
              {tax.sigla}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.badge}`}
            >
              {tax.esfera}
            </span>
          </div>
          <p className="text-xs text-slate-500 truncate">{tax.nome}</p>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </div>

      {expanded && (
        <div className={`px-4 pb-4 border-t ${c.border} animate-fade-in`}>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            {tax.desc}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className={`rounded-xl p-3 ${c.bg}`}>
              <p className="text-xs text-slate-400 mb-0.5">Alíquota</p>
              <p className={`text-sm font-bold ${c.text}`}>{tax.aliquota}</p>
            </div>
            <div className="rounded-xl p-3 bg-red-50 border border-red-100">
              <p className="text-xs text-slate-400 mb-0.5">Problema</p>
              <p className="text-xs text-red-600 font-medium">{tax.problema}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Card Imposto Novo ────────────────────────────────────────────────
function NewTaxCard({ tax }: { tax: (typeof NEW_TAXES)[0] }) {
  const c = colorMap[tax.cor];
  return (
    <div className={`border-2 rounded-2xl p-5 ${c.border} ${c.bg} card-lift`}>
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-base ${c.badge}`}
        >
          {tax.sigla}
        </div>
        <div>
          <span className={`text-base font-black ${c.text}`}>{tax.sigla}</span>
          <p className="text-xs text-slate-500">{tax.nome}</p>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.badge}`}
          >
            {tax.esfera}
          </span>
        </div>
      </div>

      {tax.substitui.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-slate-500 mb-1.5">Substitui:</p>
          <div className="flex gap-1.5 flex-wrap">
            {tax.substitui.map((s) => (
              <span
                key={s}
                className="text-xs bg-white border border-red-200 text-red-600 line-through px-2 py-0.5 rounded-full font-medium"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="text-sm text-slate-600 leading-relaxed mb-3">{tax.desc}</p>

      <div className="space-y-2">
        <div className="bg-white rounded-xl p-3 border border-white">
          <p className="text-xs text-slate-400 mb-0.5">Alíquota estimada</p>
          <p className={`text-sm font-bold ${c.text}`}>{tax.aliquota}</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex gap-2">
          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-700 font-medium">{tax.vantagem}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Seção de Comparação de Conceito ─────────────────────────────────
function ConceptComparison({
  icon,
  title,
  oldTitle,
  oldDesc,
  oldExample,
  oldBad,
  newTitle,
  newDesc,
  newExample,
  newGood,
}: {
  icon: React.ReactNode;
  title: string;
  oldTitle: string;
  oldDesc: string;
  oldExample: string;
  oldBad: string;
  newTitle: string;
  newDesc: string;
  newExample: string;
  newGood: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-slate-100 rounded-xl">{icon}</div>
        <h3 className="text-base font-bold text-slate-800">{title}</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <X className="w-4 h-4 text-red-500" />
            <span className="text-sm font-bold text-red-700">{oldTitle}</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">
            {oldDesc}
          </p>
          <div className="bg-white rounded-xl p-3 border border-red-100 mb-2">
            <p className="text-xs text-slate-400 mb-1">Exemplo prático:</p>
            <p className="text-xs text-slate-700 font-medium">{oldExample}</p>
          </div>
          <div className="bg-red-100 rounded-xl p-2.5 flex gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-700 font-medium">{oldBad}</p>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-bold text-emerald-700">
              {newTitle}
            </span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">
            {newDesc}
          </p>
          <div className="bg-white rounded-xl p-3 border border-emerald-100 mb-2">
            <p className="text-xs text-slate-400 mb-1">Exemplo prático:</p>
            <p className="text-xs text-slate-700 font-medium">{newExample}</p>
          </div>
          <div className="bg-emerald-100 rounded-xl p-2.5 flex gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-emerald-700 font-medium">{newGood}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tabs internas ────────────────────────────────────────────────────
const INNER_TABS: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "visao", label: "Visão Geral", icon: <Layers className="w-4 h-4" /> },
  {
    id: "impostos",
    label: "Os Impostos",
    icon: <ReceiptText className="w-4 h-4" />,
  },
  {
    id: "calculoBase",
    label: "Como é Calculado",
    icon: <Banknote className="w-4 h-4" />,
  },
  {
    id: "competencia",
    label: "Quem Recebe",
    icon: <Globe className="w-4 h-4" />,
  },
  {
    id: "cumulatividade",
    label: "Efeito Cascata",
    icon: <Shuffle className="w-4 h-4" />,
  },
  {
    id: "transparencia",
    label: "Transparência",
    icon: <ShieldCheck className="w-4 h-4" />,
  },
];

// ────────────────────────────────────────────────────────────────────
export default function ComoEraFica() {
  const [expandedOld, setExpandedOld] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("visao");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ─── Hero educativo ────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl p-6 md:p-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-2">
            EC 132/2023 — Entenda de vez
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
            O Sistema Tributário Brasileiro
            <br />
            <span className="text-blue-300">está mudando — e muito.</span>
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed max-w-xl">
            Por décadas o Brasil teve um dos sistemas tributários mais complexos
            do mundo. A Reforma Tributária aprovada em 2023 simplifica
            radicalmente essa estrutura: de{" "}
            <strong className="text-white">5 impostos confusos</strong> para{" "}
            <strong className="text-white">2 tributos claros</strong>.
          </p>
        </div>

        {/* Contador visual */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {[
            { num: "5", label: "Impostos extintos", color: "text-red-300" },
            { num: "2", label: "Novos tributos", color: "text-blue-300" },
            { num: "8", label: "Anos de transição", color: "text-amber-300" },
            {
              num: "2026",
              label: "Início da mudança",
              color: "text-emerald-300",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white/10 rounded-2xl p-4 text-center"
            >
              <p className={`text-3xl font-black ${s.color}`}>{s.num}</p>
              <p className="text-xs text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Sub-navegação ─────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2">
        <div className="flex gap-1 overflow-x-auto">
          {INNER_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                activeSection === tab.id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── VISÃO GERAL ────────────────────────────────────────────── */}
      {activeSection === "visao" && (
        <div className="space-y-4 animate-fade-in">
          {/* Bloco lado a lado */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Como Era */}
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-red-200 rounded-xl flex items-center justify-center">
                  <X className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-red-400 font-bold uppercase tracking-wide">
                    Antes da Reforma
                  </p>
                  <h3 className="text-base font-black text-red-800">
                    Cenário Tributário Anterior
                  </h3>
                </div>
              </div>
              <ul className="space-y-2.5">
                {[
                  {
                    icon: "😤",
                    text: "5 impostos diferentes, cada um com suas regras",
                  },
                  {
                    icon: "📚",
                    text: "Centenas de exceções e regimes especiais",
                  },
                  {
                    icon: "⚔️",
                    text: "27 estados com ICMS diferente — guerra fiscal",
                  },
                  {
                    icon: "🔄",
                    text: "Imposto sobre imposto — efeito cascata",
                  },
                  {
                    icon: "🙈",
                    text: "Alíquota escondida — consumidor não sabia quanto pagava",
                  },
                  {
                    icon: "🏛️",
                    text: "Empresas pagavam para equipes inteiras só de tributos",
                  },
                ].map((item) => (
                  <li
                    key={item.text}
                    className="flex items-start gap-2.5 text-sm text-slate-600"
                  >
                    <span className="text-base flex-shrink-0 mt-0.5">
                      {item.icon}
                    </span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-3 bg-red-100 rounded-xl">
                <p className="text-xs text-red-700 font-semibold">
                  ⚠ O Brasil tinha o sistema tributário mais complexo do mundo —
                  empresas gastavam em média <strong>1.500 horas/ano</strong> só
                  para calcular impostos.
                </p>
              </div>
            </div>

            {/* Como Fica */}
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-emerald-200 rounded-xl flex items-center justify-center">
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-emerald-500 font-bold uppercase tracking-wide">
                    A partir de 2026
                  </p>
                  <h3 className="text-base font-black text-emerald-800">
                    Como Fica
                  </h3>
                </div>
              </div>
              <ul className="space-y-2.5">
                {[
                  {
                    icon: "✅",
                    text: "2 tributos principais: CBS (federal) + IBS (estado/município)",
                  },
                  {
                    icon: "🇧🇷",
                    text: "Uma regra nacional única para todos os estados",
                  },
                  {
                    icon: "🔗",
                    text: "Crédito automático: empresas não pagam imposto em cascata",
                  },
                  {
                    icon: "📊",
                    text: "Alíquota visível na nota fiscal — total transparência",
                  },
                  { icon: "⚖️", text: "Fim da guerra fiscal entre estados" },
                  {
                    icon: "🌍",
                    text: "Modelo adotado por mais de 170 países (IVA)",
                  },
                ].map((item) => (
                  <li
                    key={item.text}
                    className="flex items-start gap-2.5 text-sm text-slate-600"
                  >
                    <span className="text-base flex-shrink-0 mt-0.5">
                      {item.icon}
                    </span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-3 bg-emerald-100 rounded-xl">
                <p className="text-xs text-emerald-700 font-semibold">
                  ✓ Estimativa do governo: economia de até{" "}
                  <strong>1,7% do PIB</strong> ao ano com a simplificação.
                </p>
              </div>
            </div>
          </div>

          {/* Fluxo de unificação visual */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-700 mb-5 text-center">
              O que muda na prática
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-3">
              {/* Impostos antigos */}
              <div className="flex flex-wrap gap-2 justify-center">
                {OLD_TAXES.map((t) => {
                  const c = colorMap[t.cor];
                  return (
                    <div
                      key={t.sigla}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border ${c.border} ${c.bg} ${c.text}`}
                    >
                      {t.sigla}
                      <span className={`ml-1 text-xs font-normal opacity-70`}>
                        {t.esfera}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col items-center gap-1">
                <ArrowRight className="w-6 h-6 text-slate-300 rotate-90 md:rotate-0" />
                <span className="text-xs text-slate-400 font-medium">
                  Reforma
                </span>
              </div>

              {/* Novos impostos */}
              <div className="flex flex-wrap gap-2 justify-center">
                {NEW_TAXES.map((t) => {
                  const c = colorMap[t.cor];
                  return (
                    <div
                      key={t.sigla}
                      className={`px-4 py-2.5 rounded-xl text-sm font-black border-2 ${c.border} ${c.bg} ${c.text}`}
                    >
                      {t.sigla}
                      {t.substitui.length > 0 && (
                        <span className="text-xs font-normal ml-1 opacity-60">
                          substitui {t.substitui.join(", ")}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── OS IMPOSTOS ────────────────────────────────────────────── */}
      {activeSection === "impostos" && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Sistema Antigo */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center">
                  <X className="w-3.5 h-3.5 text-red-500" />
                </div>
                <h3 className="text-sm font-bold text-slate-700">
                  Sistema Antigo — 5 Tributos
                </h3>
              </div>
              <div className="space-y-2">
                {OLD_TAXES.map((tax) => (
                  <OldTaxCard
                    key={tax.sigla}
                    tax={tax}
                    expanded={expandedOld === tax.sigla}
                    onClick={() =>
                      setExpandedOld(
                        expandedOld === tax.sigla ? null : tax.sigla,
                      )
                    }
                  />
                ))}
              </div>
            </div>

            {/* Sistema Novo */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <h3 className="text-sm font-bold text-slate-700">
                  Sistema Novo — 3 Tributos
                </h3>
              </div>
              <div className="space-y-3">
                {NEW_TAXES.map((tax) => (
                  <NewTaxCard key={tax.sigla} tax={tax} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── COMO É CALCULADO ────────────────────────────────────────── */}
      {activeSection === "calculoBase" && (
        <div className="space-y-4 animate-fade-in">
          <ConceptComparison
            icon={<Banknote className="w-4 h-4 text-slate-500" />}
            title="Imposto Por Dentro vs Por Fora"
            oldTitle="Por Dentro — Sistema Antigo (ICMS)"
            oldDesc={`O imposto integra a própria base de cálculo. Isso significa que a alíquota de 17% do ICMS não incide sobre os R$ 1.000 do produto — ela incide sobre um valor que já inclui o ICMS embutido. Resultado: a carga real é maior que a alíquota aparente.`}
            oldExample={`Produto vale R$ 1.000. ICMS 17% "por dentro" = R$ 170 de imposto. O produto "sem ICMS" custaria apenas R$ 830. A alíquota real sobre o produto é 20,5% (não 17%)!`}
            oldBad="O consumidor nunca sabe quanto imposto está pagando de verdade."
            newTitle="Por Fora — IVA Dual (CBS + IBS)"
            newDesc={`O imposto é calculado sobre o preço do produto e somado por fora. A alíquota é aplicada diretamente sobre o valor do produto, de forma linear e transparente — igual ao IVA usado na Europa e em mais de 170 países.`}
            newExample={`Produto vale R$ 1.000. CBS 8,8% + IBS 17,7% = R$ 265 de imposto. Preço final ao consumidor: R$ 1.265. A alíquota é exatamente o que está escrito.`}
            newGood="Qualquer pessoa consegue verificar exatamente quanto de imposto está pagando na nota fiscal."
          />
        </div>
      )}

      {/* ─── QUEM RECEBE ────────────────────────────────────────────── */}
      {activeSection === "competencia" && (
        <div className="space-y-4 animate-fade-in">
          <ConceptComparison
            icon={<Globe className="w-4 h-4 text-slate-500" />}
            title="Cobrança na Origem vs no Destino"
            oldTitle="Na Origem — Sistema Antigo (ICMS)"
            oldDesc={`O ICMS ficava no estado que produzia ou vendia o produto, não no estado que consumia. Isso gerou uma guerra fiscal brutal: estados davam benefícios ilegais para atrair empresas, usando o ICMS como moeda de troca.`}
            oldExample={`Empresa de SP vende para RJ: o ICMS fica em SP (origem). Para atrair fábricas, estados como GO e PA davam "ICMS de volta" ilegalmente — distorcendo a economia.`}
            oldBad="27 legislações, guerra fiscal, benefícios ilegais e empresas escolhendo localização por motivos tributários, não econômicos."
            newTitle="No Destino — IVA Dual (IBS)"
            newDesc={`Com o IBS, o imposto vai para o estado e município onde o consumidor efetivamente está — onde o consumo acontece. Isso é justo e elimina qualquer incentivo à guerra fiscal.`}
            newExample={`Empresa de SP vende para RJ: o IBS vai para RJ (destino). Não faz diferença fiscal onde a empresa está localizada — então a escolha é puramente econômica.`}
            newGood="Fim definitivo da guerra fiscal. Empresas escolhem localização por produtividade, não por benefícios tributários."
          />
        </div>
      )}

      {/* ─── EFEITO CASCATA ─────────────────────────────────────────── */}
      {activeSection === "cumulatividade" && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-800 mb-2">
              O que é o "Efeito Cascata"?
            </h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              No sistema antigo, o imposto incidia sobre o preço total do
              produto em <strong>cada etapa da cadeia</strong>, mesmo que o
              imposto já tivesse sido pago antes. Resultado: o consumidor final
              pagava imposto sobre imposto sobre imposto. No novo sistema, cada
              empresa desconta o que já pagou — paga apenas sobre o{" "}
              <em>valor que ela agregou</em>.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Cascata antigo */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <X className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-bold text-red-700">
                    Sistema Antigo — Cumulativo
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    {
                      name: "Extrator de matéria-prima",
                      venda: 100,
                      imposto: 10,
                      acumulado: 10,
                    },
                    {
                      name: "Fábrica",
                      venda: 200,
                      imposto: 20,
                      acumulado: 30,
                      note: "Paga imposto sobre os R$200, mas R$10 já foram pagos antes!",
                    },
                    {
                      name: "Distribuidor",
                      venda: 350,
                      imposto: 35,
                      acumulado: 65,
                      note: "Paga sobre os R$350 — imposto em cascata!",
                    },
                    {
                      name: "Varejista",
                      venda: 500,
                      imposto: 50,
                      acumulado: 115,
                      note: "Consumidor final paga imposto sobre imposto 3x",
                    },
                  ].map((step, i) => (
                    <div
                      key={i}
                      className={`rounded-xl p-3 border ${i < 3 ? "bg-red-50 border-red-100" : "bg-red-100 border-red-200"}`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold text-slate-700">
                          {step.name}
                        </span>
                        <div className="text-right">
                          <span className="text-xs text-slate-400">
                            venda R${step.venda}
                          </span>
                          <span className="text-xs font-bold text-red-600 ml-2">
                            +R${step.imposto} imposto
                          </span>
                        </div>
                      </div>
                      {step.note && (
                        <p className="text-xs text-red-500 mt-1">{step.note}</p>
                      )}
                    </div>
                  ))}
                  <div className="bg-red-600 text-white rounded-xl p-3 text-center">
                    <p className="text-xs opacity-80">
                      Total de impostos pagos na cadeia
                    </p>
                    <p className="text-lg font-black">
                      R$ 115 = 23% do preço final
                    </p>
                    <p className="text-xs opacity-70">
                      Imposto real muito maior que a alíquota nominal de 10%
                    </p>
                  </div>
                </div>
              </div>

              {/* Não cumulativo novo */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-bold text-emerald-700">
                    Sistema Novo — Não Cumulativo
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    {
                      name: "Extrator de matéria-prima",
                      venda: 100,
                      debito: 10,
                      credito: 0,
                      recolhe: 10,
                    },
                    {
                      name: "Fábrica",
                      venda: 200,
                      debito: 20,
                      credito: 10,
                      recolhe: 10,
                      note: "Desconta os R$10 pagos na etapa anterior ✓",
                    },
                    {
                      name: "Distribuidor",
                      venda: 350,
                      debito: 35,
                      credito: 20,
                      recolhe: 15,
                      note: "Paga apenas sobre o valor que adicionou ✓",
                    },
                    {
                      name: "Varejista",
                      venda: 500,
                      debito: 50,
                      credito: 35,
                      recolhe: 15,
                      note: "Recolhe só sobre o que ele agregou ✓",
                    },
                  ].map((step, i) => (
                    <div
                      key={i}
                      className={`rounded-xl p-3 border ${i < 3 ? "bg-emerald-50 border-emerald-100" : "bg-emerald-100 border-emerald-200"}`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold text-slate-700">
                          {step.name}
                        </span>
                        <div className="text-right">
                          <span className="text-xs text-blue-500">
                            débito R${step.debito}
                          </span>
                          <span className="text-xs text-slate-400 mx-1">−</span>
                          <span className="text-xs text-purple-500">
                            crédito R${step.credito}
                          </span>
                          <span className="text-xs font-bold text-emerald-600 ml-2">
                            = R${step.recolhe}
                          </span>
                        </div>
                      </div>
                      {step.note && (
                        <p className="text-xs text-emerald-600 mt-1">
                          {step.note}
                        </p>
                      )}
                    </div>
                  ))}
                  <div className="bg-emerald-600 text-white rounded-xl p-3 text-center">
                    <p className="text-xs opacity-80">
                      Total de impostos pagos na cadeia
                    </p>
                    <p className="text-lg font-black">
                      R$ 50 = 10% do preço final
                    </p>
                    <p className="text-xs opacity-70">
                      Exatamente a alíquota nominal. Sem cascata!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TRANSPARÊNCIA ──────────────────────────────────────────── */}
      {activeSection === "transparencia" && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Nota fiscal antiga */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <X className="w-4 h-4 text-red-500" />
                <h3 className="text-sm font-bold text-red-700">
                  Nota Fiscal Hoje (opaca)
                </h3>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-xs space-y-1.5">
                <div className="text-slate-400 text-center border-b border-slate-200 pb-2 mb-2">
                  DANFE — Documento Auxiliar
                </div>
                <div className="flex justify-between">
                  <span>Produto</span>
                  <span>R$ 1.000,00</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Base ICMS..........</span>
                  <span>R$ 1.000,00</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Valor ICMS.........</span>
                  <span>R$ 170,00</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Base PIS/Cofins...</span>
                  <span>R$ 1.000,00</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>PIS................</span>
                  <span>R$ 16,50</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Cofins.............</span>
                  <span>R$ 76,00</span>
                </div>
                <div className="flex justify-between font-bold border-t border-slate-200 pt-2 mt-2">
                  <span>TOTAL</span>
                  <span>R$ 1.000,00</span>
                </div>
                <p className="text-red-400 text-center mt-2">
                  ⚠ Os impostos ficam "dentro" do preço. O total parece R$
                  1.000,00 mas o produto custaria R$ 737,50 sem impostos!
                </p>
              </div>
            </div>

            {/* Nota fiscal nova */}
            <div className="bg-white border border-emerald-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Check className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-emerald-700">
                  Nota Fiscal Nova (transparente)
                </h3>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 font-mono text-xs space-y-1.5">
                <div className="text-emerald-600 text-center border-b border-emerald-200 pb-2 mb-2">
                  DANFE — IVA Dual
                </div>
                <div className="flex justify-between">
                  <span>Produto (preço base)</span>
                  <span>R$ 1.000,00</span>
                </div>
                <div className="flex justify-between border-t border-emerald-100 pt-1.5 mt-1.5">
                  <span className="text-blue-600">CBS (8,8%).........</span>
                  <span className="text-blue-600">+ R$ 88,00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-600">IBS (17,7%)........</span>
                  <span className="text-cyan-600">+ R$ 177,00</span>
                </div>
                <div className="flex justify-between font-bold border-t border-emerald-200 pt-2 mt-2 text-slate-800">
                  <span>TOTAL ao consumidor</span>
                  <span>R$ 1.265,00</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Total de impostos</span>
                  <span>R$ 265,00 (26,5%)</span>
                </div>
                <p className="text-emerald-600 text-center mt-2">
                  ✓ Qualquer pessoa pode verificar: produto custa R$ 1.000 + R$
                  265 de impostos = R$ 1.265 total.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-blue-800 mb-2">
              Por que a transparência importa?
            </h3>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                {
                  icon: "👁️",
                  title: "Cidadão informado",
                  desc: "Você saberá exatamente quanto paga de imposto em cada compra — como acontece na Europa.",
                },
                {
                  icon: "⚖️",
                  title: "Democracia fiscal",
                  desc: "Com os impostos visíveis, o debate sobre alíquotas se torna mais justo e transparente.",
                },
                {
                  icon: "🏪",
                  title: "Concorrência justa",
                  desc: "Empresas não conseguem esconder benefícios tributários — campo de jogo nivelado.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-xl p-4 border border-blue-100"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <h4 className="text-sm font-bold text-slate-700 mt-2 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
