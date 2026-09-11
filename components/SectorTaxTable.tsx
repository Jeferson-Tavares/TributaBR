"use client";

import { useState } from "react";
import { Building2, ShoppingCart, Briefcase, HeartPulse, GraduationCap, Utensils, CheckCircle2, ArrowRight } from "lucide-react";

interface SectorComparison {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: "indústria" | "comércio" | "serviços" | "especial";
  oldTaxes: {
    name: string;
    rate: string;
    mechanism: string;
  }[];
  oldTotalEstimated: string;
  oldMechanism: string;
  newTaxes: {
    name: string;
    rate: string;
    mechanism: string;
  }[];
  newTotalEstimated: string;
  newMechanism: string;
  impactHighlight: string;
  impactType: "positivo" | "neutro" | "atencao";
}

const SECTOR_DATA: SectorComparison[] = [
  {
    id: "comercio",
    name: "Comércio Varejista e Atacadista",
    icon: <ShoppingCart className="w-4 h-4 text-[#0040A8]" />,
    category: "comércio",
    oldTaxes: [
      { name: "PIS", rate: "1,65%", mechanism: "Cumulativo/Não-cumulativo" },
      { name: "COFINS", rate: "7,60%", mechanism: "Cumulativo/Não-cumulativo" },
      { name: "ICMS", rate: "17,0% a 21,0%", mechanism: "Por dentro (incide sobre a própria base)" },
      { name: "IPI", rate: "0%", mechanism: "Geralmente não incide" },
    ],
    oldTotalEstimated: "~26,0% a 30,0%",
    oldMechanism: "Guerra fiscal entre estados, substituição tributária (ST) complexa e ICMS por dentro.",
    newTaxes: [
      { name: "CBS (Federal)", rate: "8,80%", mechanism: "Por fora (transparente)" },
      { name: "IBS (Subnacional)", rate: "17,70%", mechanism: "Por fora (transparente)" },
      { name: "Imposto Seletivo", rate: "0%", mechanism: "Apenas se vender produtos nocivos" },
    ],
    newTotalEstimated: "~26,50% (alíquota padrão nacional)",
    newMechanism: "Não-cumulatividade plena com crédito financeiro imediato de todas as aquisições.",
    impactHighlight: "Fim da substituição tributária (ST) e crédito imediato sobre bens de uso e consumo.",
    impactType: "positivo",
  },
  {
    id: "industria",
    name: "Indústria de Transformação",
    icon: <Building2 className="w-4 h-4 text-[#009A44]" />,
    category: "indústria",
    oldTaxes: [
      { name: "PIS", rate: "1,65%", mechanism: "Em cascata sobre insumos" },
      { name: "COFINS", rate: "7,60%", mechanism: "Em cascata sobre insumos" },
      { name: "IPI", rate: "5,0% a 35,0%", mechanism: "Federal, alíquotas díspares" },
      { name: "ICMS", rate: "12,0% a 18,0%", mechanism: "Por dentro com restrição a créditos" },
    ],
    oldTotalEstimated: "~30,0% a 38,0%",
    oldMechanism: "Acúmulo crônico de créditos tributários não ressarcidos e resíduo tributário nas exportações.",
    newTaxes: [
      { name: "CBS (Federal)", rate: "8,80%", mechanism: "Por fora, crédito irrestrito" },
      { name: "IBS (Subnacional)", rate: "17,70%", mechanism: "Por fora, crédito irrestrito" },
      { name: "IPI", rate: "0%", mechanism: "Reduzido a zero (exceto concorrência com ZFM)" },
    ],
    newTotalEstimated: "~26,50%",
    newMechanism: "Desoneração integral de investimentos e exportações com devolução ágil de saldos credores.",
    impactHighlight: "Grande redução de custo de capital; maquinários geram crédito imediato de 100%.",
    impactType: "positivo",
  },
  {
    id: "servicos",
    name: "Prestação de Serviços em Geral",
    icon: <Briefcase className="w-4 h-4 text-[#FFC700]" />,
    category: "serviços",
    oldTaxes: [
      { name: "PIS", rate: "0,65% ou 1,65%", mechanism: "Cumulativo ou não" },
      { name: "COFINS", rate: "3,00% ou 7,60%", mechanism: "Cumulativo ou não" },
      { name: "ISS", rate: "2,0% a 5,0%", mechanism: "Municipal puro (sem crédito)" },
      { name: "ICMS", rate: "0%", mechanism: "Não incide (exceto transporte/comunicação)" },
    ],
    oldTotalEstimated: "~8,65% a 14,25%",
    oldMechanism: "Folha de pagamento alta sem gerar créditos tributários no sistema antigo.",
    newTaxes: [
      { name: "CBS (Federal)", rate: "8,80%", mechanism: "Alíquota de referência" },
      { name: "IBS (Subnacional)", rate: "17,70%", mechanism: "Alíquota de referência" },
    ],
    newTotalEstimated: "~26,50% (alíquota cheia)",
    newMechanism: "Clientes B2B tomam crédito integral dos serviços contratados, reduzindo o impacto final.",
    impactHighlight: "Aumento de alíquota nominal em serviços diretos ao consumidor (B2C), compensado por crédito pleno no B2B.",
    impactType: "atencao",
  },
  {
    id: "saude",
    name: "Serviços de Saúde e Dispositivos Médicos",
    icon: <HeartPulse className="w-4 h-4 text-red-500" />,
    category: "especial",
    oldTaxes: [
      { name: "PIS/COFINS", rate: "3,65% a 9,25%", mechanism: "Com isenções pontuais complexas" },
      { name: "ISS", rate: "2,0% a 5,0%", mechanism: "Municipal" },
      { name: "ICMS", rate: "0% a 18,0%", mechanism: "Convênios CONFAZ fragmentados" },
    ],
    oldTotalEstimated: "~12,0% a 22,0%",
    oldMechanism: "Judicialização excessiva sobre insumos hospitalares.",
    newTaxes: [
      { name: "CBS Reduzida", rate: "3,52%", mechanism: "Redução constitucional de 60%" },
      { name: "IBS Reduzido", rate: "7,08%", mechanism: "Redução constitucional de 60%" },
    ],
    newTotalEstimated: "~10,60% (Regime Diferenciado)",
    newMechanism: "Benefício direto com redução de 60% nas alíquotas gerais e alíquota zero para medicamentos essenciais.",
    impactHighlight: "Medicamentos de alta complexidade e serviços essenciais contam com alíquota zero ou redução de 60%.",
    impactType: "positivo",
  },
  {
    id: "educacao",
    name: "Serviços de Educação e Ensino",
    icon: <GraduationCap className="w-4 h-4 text-indigo-500" />,
    category: "especial",
    oldTaxes: [
      { name: "PIS/COFINS", rate: "3,65% a 9,25%", mechanism: "Regime cumulativo ou lucro real" },
      { name: "ISS", rate: "2,0% a 5,0%", mechanism: "Municipal" },
    ],
    oldTotalEstimated: "~5,65% a 14,25%",
    oldMechanism: "Tributação sobre mensalidades sem aproveitamento de insumos pedagógicos.",
    newTaxes: [
      { name: "CBS Reduzida", rate: "3,52%", mechanism: "Redução constitucional de 60%" },
      { name: "IBS Reduzido", rate: "7,08%", mechanism: "Redução constitucional de 60%" },
    ],
    newTotalEstimated: "~10,60% (Regime Diferenciado)",
    newMechanism: "Educação infantil, fundamental, média, técnica e superior enquadradas na redução de 60%.",
    impactHighlight: "Preservação da acessibilidade educacional e redução de custos em materiais didáticos com crédito pleno.",
    impactType: "neutro",
  },
  {
    id: "cesta_basica",
    name: "Alimentos e Cesta Básica Nacional",
    icon: <Utensils className="w-4 h-4 text-emerald-600" />,
    category: "especial",
    oldTaxes: [
      { name: "PIS/COFINS", rate: "Variável", mechanism: "Múltiplos decretos e isenções parciais" },
      { name: "ICMS", rate: "0% a 18,0%", mechanism: "Cada estado com lista própria de cesta básica" },
    ],
    oldTotalEstimated: "~7,0% a 18,0%",
    oldMechanism: "Guerra fiscal entre estados com definições contraditórias de alimentos essenciais.",
    newTaxes: [
      { name: "CBS Cesta Básica", rate: "0,00%", mechanism: "Alíquota ZERO Constitucional" },
      { name: "IBS Cesta Básica", rate: "0,00%", mechanism: "Alíquota ZERO Constitucional" },
    ],
    newTotalEstimated: "0,00% (Isenção Total)",
    newMechanism: "Cesta Básica Nacional de Alimentos com isenção de 100% de CBS e IBS em todo o território.",
    impactHighlight: "Alimentos indispensáveis terão imposto zero absoluto, acompanhado de mecanismo de Cashback para famílias de baixa renda.",
    impactType: "positivo",
  },
];

export default function SectorTaxTable() {
  const [selectedId, setSelectedId] = useState<string>("comercio");
  const selectedSector = SECTOR_DATA.find((s) => s.id === selectedId) || SECTOR_DATA[0];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
      {/* Cabeçalho do componente */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0040A8] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Comparativo Setorial
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
            Modelo Antigo vs. Novo IVA Dual por Setor
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Selecione o segmento para conferir a transição de alíquotas, créditos e regras operacionais.
          </p>
        </div>
      </div>

      {/* Seletor de Setores Responsivo (Horizontal Scroll no Mobile) */}
      <div className="overflow-x-auto pb-2 mb-6 scrollbar-thin">
        <div className="flex gap-2 min-w-max">
          {SECTOR_DATA.map((sector) => {
            const isSelected = sector.id === selectedId;
            return (
              <button
                key={sector.id}
                onClick={() => setSelectedId(sector.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-150 border ${
                  isSelected
                    ? "bg-[#0040A8] text-white border-[#0040A8] shadow-md shadow-blue-900/10"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                }`}
              >
                {sector.icon}
                <span>{sector.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Painel Comparativo do Setor Selecionado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
        
        {/* COLUNA ESQUERDA: SISTEMA ANTIGO */}
        <div className="bg-gradient-to-br from-red-50/50 to-orange-50/30 rounded-2xl p-5 border border-red-200/80">
          <div className="flex items-center justify-between pb-3 border-b border-red-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <h4 className="text-base font-bold text-red-950">Sistema Antigo (Como Era)</h4>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
              5 Impostos Fragmentados
            </span>
          </div>

          {/* Tabela com scroll horizontal no mobile */}
          <div className="overflow-x-auto my-4">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-red-200/60">
                  <th className="py-2 pr-2 font-semibold">Tributo</th>
                  <th className="py-2 px-2 font-semibold">Alíquota Média</th>
                  <th className="py-2 pl-2 font-semibold">Incidência</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-200/40 font-medium">
                {selectedSector.oldTaxes.map((tax, i) => (
                  <tr key={i}>
                    <td className="py-2 pr-2 font-bold text-slate-800">{tax.name}</td>
                    <td className="py-2 px-2 text-red-700">{tax.rate}</td>
                    <td className="py-2 pl-2 text-slate-600">{tax.mechanism}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-red-200 space-y-1 text-xs">
            <div className="flex justify-between items-center font-bold">
              <span className="text-slate-700">Carga Nominal Estimada:</span>
              <span className="text-red-700 text-sm">{selectedSector.oldTotalEstimated}</span>
            </div>
            <p className="text-slate-600 leading-relaxed pt-1">
              <strong>Característica:</strong> {selectedSector.oldMechanism}
            </p>
          </div>
        </div>

        {/* COLUNA DIREITA: NOVO IVA DUAL */}
        <div className="bg-gradient-to-br from-emerald-50/60 to-blue-50/40 rounded-2xl p-5 border border-emerald-200/80">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#009A44]"></div>
              <h4 className="text-base font-bold text-emerald-950">Novo IVA Dual (Como Fica)</h4>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#009A44] border border-emerald-200">
              CBS + IBS Não-Cumulativos
            </span>
          </div>

          {/* Tabela com scroll horizontal no mobile */}
          <div className="overflow-x-auto my-4">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-emerald-200/60">
                  <th className="py-2 pr-2 font-semibold">Novo Tributo</th>
                  <th className="py-2 px-2 font-semibold">Alíquota Projetada</th>
                  <th className="py-2 pl-2 font-semibold">Regra de Crédito</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-200/40 font-medium">
                {selectedSector.newTaxes.map((tax, i) => (
                  <tr key={i}>
                    <td className="py-2 pr-2 font-bold text-slate-800">{tax.name}</td>
                    <td className="py-2 px-2 text-[#009A44] font-bold">{tax.rate}</td>
                    <td className="py-2 pl-2 text-slate-600">{tax.mechanism}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-emerald-200 space-y-1.5 text-xs">
            <div className="flex justify-between items-center font-bold">
              <span className="text-slate-700">Alíquota Padrão Estimada:</span>
              <span className="text-[#009A44] text-sm">{selectedSector.newTotalEstimated}</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              <strong>Característica:</strong> {selectedSector.newMechanism}
            </p>
            <p className="text-[10px] text-slate-500 italic pt-1 border-t border-emerald-100">
              * Projeção baseada nos estudos do Ministério da Fazenda (PLP 68/2024). Alíquota de referência sujeita à regulamentação final pelo Senado Federal.
            </p>
          </div>
        </div>
      </div>

      {/* Destaque Prático do Setor */}
      <div className="mt-5 p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#009A44] flex-shrink-0" />
          <p className="text-xs sm:text-sm text-slate-800 font-medium">
            <strong>Impacto Direto:</strong> {selectedSector.impactHighlight}
          </p>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-[#0040A8] text-white whitespace-nowrap self-end sm:self-auto">
          {selectedSector.impactType === "positivo" ? "Fator Positivo" : selectedSector.impactType === "atencao" ? "Ajuste Contábil" : "Equilibrado"}
        </span>
      </div>
    </div>
  );
}
