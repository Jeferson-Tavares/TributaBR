"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Scale, Clock, Award } from "lucide-react";

export default function PafAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = [
    {
      title: "Prazo Unificado de 20 Dias Úteis",
      law: "Diretrizes PLP 108/2024",
      icon: <Clock className="w-5 h-5 text-[#009A44]" />,
      summary: "Contagem exclusiva em dias úteis para recursos, impugnações e defesas.",
      details:
        "Padronização nacional de prazos em dias úteis para recursos no contencioso administrativo tributário de CBS e IBS, encerrando disparidades regionais em que municípios ou estados utilizavam dias corridos.",
    },
    {
      title: "Proibição de Caução ou Depósito Prévio",
      law: "Súmula Vinculante 28 do STF & PLP 108/2024",
      icon: <Scale className="w-5 h-5 text-[#0040A8]" />,
      summary: "Acesso amplo à justiça administrativa sem exigência de garantia financeira.",
      details:
        "O STF pacificou na Súmula Vinculante 28 que é inconstitucional condicionar o recurso administrativo fiscal ao depósito ou arrolamento prévio de bens. O PLP 108/2024 ratifica essa garantia de ampla defesa em todas as instâncias do Comitê Gestor.",
    },
    {
      title: "Dosimetria Proporcional e Bônus de Regularização",
      law: "Diretrizes PLP 108/2024",
      icon: <Award className="w-5 h-5 text-[#FFC700]" />,
      summary: "Descontos progressivos de 20% a 60% e benefício do bom pagador fiscal.",
      details:
        "Tetos referenciais de multas de 75% a 150% do tributo, com redução expressiva por autorregularização voluntária e bônus de até 10 pontos percentuais adicionais para contribuintes em programas de conformidade fiscal.",
    },
  ];

  return (
    <div className="space-y-3 mt-6">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 overflow-hidden transition-all duration-200"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors focus:outline-none min-h-[48px]"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-2.5 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-bold text-sm sm:text-base text-white">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/15 text-[#FFC700] border border-white/20">
                      {item.law}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                    {item.summary}
                  </p>
                </div>
              </div>
              <div className="text-white/70 ml-2">
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-200 border-t border-white/10 leading-relaxed animate-fade-in space-y-2">
                <p>{item.details}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
