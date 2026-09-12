"use client";

import { useState } from "react";
import { Calendar, ChevronRight, Check, Sparkles, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { TRANSITION_SCHEDULE } from "@/utils/taxCalculator";

export default function TransitionTimeline() {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const currentStep = TRANSITION_SCHEDULE.find((s) => s.year === selectedYear) || TRANSITION_SCHEDULE[0];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#009A44] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Cronograma Oficial (2026 a 2033)
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
            A Transição Gradual do Consumo
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            A migração do sistema antigo para o novo IVA Dual ocorre em etapas graduais para garantir segurança jurídica e estabilidade na arrecadação.
          </p>
        </div>
      </div>

      {/* Aviso de rolagem no mobile */}
      <div className="flex sm:hidden items-center justify-between text-[11px] font-bold text-slate-400 mb-2 px-1">
        <span>Arraste para selecionar o ano:</span>
        <span className="text-[#0040A8] flex items-center gap-1">
          <span>2026</span>
          <span>→</span>
          <span>2033</span>
        </span>
      </div>

      {/* Régua de Anos Interativa (Distribuição Uniforme ao Longo de Toda a Largura) */}
      <div className="overflow-x-auto pb-3 mb-6 scrollbar-thin">
        <div className="grid grid-cols-8 gap-1.5 min-w-[720px] sm:min-w-0 w-full p-1.5 bg-slate-50 rounded-2xl border border-slate-200">
          {TRANSITION_SCHEDULE.map((item) => {
            const isSelected = item.year === selectedYear;
            const isMilestone = item.year === 2026 || item.year === 2027 || item.year === 2029 || item.year === 2033;
            
            return (
              <button
                key={item.year}
                onClick={() => setSelectedYear(item.year)}
                className={`relative flex flex-col items-center justify-center w-full px-2 sm:px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer min-h-[44px] ${
                  isSelected
                    ? "bg-[#0040A8] text-white shadow-md shadow-blue-900/15"
                    : "text-slate-600 hover:bg-white hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="text-sm font-extrabold tracking-tight">{item.year}</span>
                  {isMilestone && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? "bg-[#FFC700]" : "bg-[#009A44]"
                      }`}
                    />
                  )}
                </div>
                <span className="text-[10px] font-medium opacity-80 mt-0.5 whitespace-nowrap text-center truncate max-w-full">
                  {item.year === 2026
                    ? "Teste Simbólico"
                    : item.year === 2027
                    ? "Vigência CBS"
                    : item.year === 2033
                    ? "IVA Dual Pleno"
                    : "Fase Gradual"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Card do Ano Selecionado (Destaque Visual) */}
      <div className="bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-50 rounded-2xl p-5 sm:p-6 border border-blue-200/80 animate-fade-in">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-blue-200/60">
          <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
            <div className="flex flex-col items-center justify-center min-w-[56px] px-3 py-2 rounded-xl bg-[#0040A8] text-white shadow-md shadow-blue-900/15 border border-blue-700/50 flex-shrink-0 mt-0.5 sm:mt-0">
              <span className="text-base sm:text-lg font-black tracking-tight leading-none">
                {currentStep.year}
              </span>
              <span className="text-[9px] font-bold text-[#FFC700] uppercase tracking-wider mt-0.5 leading-none">
                {currentStep.year === 2033 ? "Pleno" : currentStep.year === 2026 ? "Teste" : "Fase"}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0040A8] block">
                Etapa Operacional
              </span>
              <h4 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug mt-0.5">
                {currentStep.year === 2026 && "2026: Início do Teste Operacional (Alíquota Simbólica)"}
                {currentStep.year === 2027 && "2027: Entrada em Vigor Total da CBS e Extinção do PIS/Cofins"}
                {currentStep.year === 2028 && "2028: Consolidação da CBS e Ajuste Federativo do IBS"}
                {currentStep.year >= 2029 && currentStep.year <= 2032 && `${currentStep.year}: Transição Gradual do ICMS e ISS para o IBS`}
                {currentStep.year === 2033 && "2033: Vigência Integral e Definitiva do IVA Dual (CBS + IBS)"}
              </h4>
            </div>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full uppercase bg-white border border-blue-200 text-[#0040A8] self-start sm:self-auto shadow-2xs flex-shrink-0">
            {currentStep.year === 2033 ? "Meta Final Concluída" : "Em Andamento Legal"}
          </span>
        </div>

        {/* Descrição em linguagem clara */}
        <p className="text-sm text-slate-700 leading-relaxed my-4">
          {currentStep.description}
        </p>

        {/* Grade de Alíquotas e Fatores do Ano */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
          <div className="p-3 bg-white rounded-xl border border-blue-100 shadow-2xs">
            <span className="text-[11px] font-bold text-slate-400 block uppercase">CBS (Federal)</span>
            <span className="text-lg font-black text-[#0040A8]">
              {currentStep.cbsRate.toFixed(1).replace(".", ",")}%
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              {currentStep.year === 2026 ? "Compensado no PIS/Cofins" : "Substitui PIS e Cofins"}
            </span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-emerald-100 shadow-2xs">
            <span className="text-[11px] font-bold text-slate-400 block uppercase">IBS (Subnacional)</span>
            <span className="text-lg font-black text-[#009A44]">
              {currentStep.ibsRate.toFixed(2).replace(".", ",")}%
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              {currentStep.year === 2026 ? "Compensado nos tributos" : "Substitui ICMS e ISS"}
            </span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] font-bold text-slate-400 block uppercase">ICMS / ISS Residual</span>
            <span className="text-lg font-black text-slate-800">
              {(currentStep.icmsMultiplier * 100).toFixed(0)}%
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              {currentStep.icmsMultiplier === 0 ? "Completamente extintos" : "Da alíquota estadual/municipal"}
            </span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-amber-100 shadow-2xs">
            <span className="text-[11px] font-bold text-slate-400 block uppercase">PIS / COFINS / IPI</span>
            <span className="text-lg font-black text-[#FFC700]">
              {currentStep.pisMultiplier === 0 ? "0% (Extintos)" : "100% (Vigentes)"}
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              {currentStep.year >= 2027 ? "Extinção sem resíduo" : "Compensação cruzada"}
            </span>
          </div>
        </div>

        {/* Quadro educativo explicativo */}
        <div className="mt-4 p-3.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-[#009A44] flex-shrink-0 mt-0.5" />
          <p>
            <strong>Garantia de Neutralidade:</strong> A Constituição Federal veda expressamente o aumento de carga tributária global sobre o consumo durante o período de transição, com revisão anual das alíquotas pelo Senado Federal.
          </p>
        </div>
      </div>
    </div>
  );
}
