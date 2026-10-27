"use client";

import React, { useState, useId } from "react";
import { Calculator, AlertTriangle, ArrowRight, ShieldCheck, HelpCircle, RefreshCw } from "lucide-react";

export function SplitPaymentCalculator() {
  const [valorVenda, setValorVenda] = useState<number>(1000);
  const [aliquotaIbsCbs, setAliquotaIbsCbs] = useState<number>(26.5);
  const [modalidade, setModalidade] = useState<"padrao" | "simplificado">("padrao");
  const [percentualSimplificado, setPercentualSimplificado] = useState<number>(12);

  const uniqueId = useId();

  // Cálculos hipotéticos e ilustrativos
  const taxaEfetiva = modalidade === "padrao" ? aliquotaIbsCbs : percentualSimplificado;
  const valorTributos = Math.max(0, (valorVenda * taxaEfetiva) / 100);
  const valorLiquidoFornecedor = Math.max(0, valorVenda - valorTributos);

  // Estimativa de divisão 60/40 entre IBS (Estados/Municípios) e CBS (União) meramente ilustrativa
  const estimativaCbs = valorTributos * 0.33; // CBS aproximada
  const estimativaIbs = valorTributos * 0.67; // IBS aproximado

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 max-w-4xl mx-auto my-8">
      {/* Cabeçalho da Ferramenta */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-5 mb-6">
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Simulador Didático de Segregação (Split Payment)
          </h3>
          <p className="text-sm text-slate-600">
            Experimente como o valor de uma venda é repartido na liquidação financeira entre tributos e o fornecedor.
          </p>
        </div>
      </div>

      {/* Aviso de Caráter Exclusivamente Educativo */}
      <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-4 mb-6 flex gap-3 items-start text-amber-900 text-xs sm:text-sm">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold mb-1">Aviso de Simulação Ilustrativa e Hipotética:</p>
          <p className="text-amber-800 leading-relaxed">
            Esta calculadora possui caráter estritamente didático para demonstrar a mecânica da liquidação financeira.
            Os valores e percentuais são hipotéticos. As alíquotas definitivas e os percentuais do procedimento simplificado
            serão fixados em lei e atos regulamentares conjuntos da Receita Federal do Brasil (RFB) e do Comitê Gestor do IBS (CGIBS).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Painel de Controles */}
        <div className="lg:col-span-6 space-y-5">
          {/* Valor da Operação */}
          <div>
            <label htmlFor={`${uniqueId}-valor`} className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Valor Bruto da Operação (R$)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">R$</span>
              <input
                id={`${uniqueId}-valor`}
                type="number"
                min="10"
                step="50"
                value={valorVenda || ""}
                onChange={(e) => setValorVenda(Math.max(0, Number(e.target.value)))}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-slate-900 font-semibold"
                placeholder="1000"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">Exemplo: valor total documentado na nota fiscal.</p>
          </div>

          {/* Modalidade */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Modalidade de Separação
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setModalidade("padrao")}
                className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all text-center ${
                  modalidade === "padrao"
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Procedimento Padrão
                <span className="block text-[11px] font-normal opacity-90 mt-0.5">(Art. 32 LC 214)</span>
              </button>
              <button
                type="button"
                onClick={() => setModalidade("simplificado")}
                className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all text-center ${
                  modalidade === "simplificado"
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Procedimento Simplificado
                <span className="block text-[11px] font-normal opacity-90 mt-0.5">(Art. 33 LC 214)</span>
              </button>
            </div>
          </div>

          {/* Taxa Aplicável */}
          {modalidade === "padrao" ? (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={`${uniqueId}-aliquota`} className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Alíquota Nominal Hipotética (IBS + CBS)
                </label>
                <span className="text-sm font-bold text-blue-700">{aliquotaIbsCbs.toFixed(1)}%</span>
              </div>
              <input
                id={`${uniqueId}-aliquota`}
                type="range"
                min="5"
                max="35"
                step="0.5"
                value={aliquotaIbsCbs}
                onChange={(e) => setAliquotaIbsCbs(Number(e.target.value))}
                className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <p className="text-xs text-slate-500 mt-1">
                Alíquota hipotética de referência padrão para mercadorias ou serviços em geral.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={`${uniqueId}-simplificado`} className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Percentual Preestabelecido de Retenção
                </label>
                <span className="text-sm font-bold text-emerald-700">{percentualSimplificado.toFixed(1)}%</span>
              </div>
              <input
                id={`${uniqueId}-simplificado`}
                type="range"
                min="2"
                max="25"
                step="0.5"
                value={percentualSimplificado}
                onChange={(e) => setPercentualSimplificado(Number(e.target.value))}
                className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <p className="text-xs text-slate-500 mt-1">
                Percentual setorial fixado por ato normativo conjunto (estimativa didática ilustrativa).
              </p>
            </div>
          )}

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setValorVenda(1000);
                setAliquotaIbsCbs(26.5);
                setPercentualSimplificado(12);
                setModalidade("padrao");
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-700 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Restaurar valores de exemplo
            </button>
          </div>
        </div>

        {/* Painel de Resultados */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-slate-50 rounded-xl p-5 border border-slate-200/80">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
              Demonstrativo da Liquidação Financeira
            </h4>

            {/* Repasse ao Fornecedor */}
            <div className="bg-white rounded-xl p-4 border border-emerald-200/80 shadow-sm mb-3">
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                Valor Líquido Creditado ao Vendedor
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700">
                  {valorLiquidoFornecedor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {(100 - taxaEfetiva).toFixed(1)}% do total
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1.5">
                Depositado na conta bancária do fornecedor pelo prestador do serviço de pagamento (PSP).
              </p>
            </div>

            {/* Segregação Tributária */}
            <div className="bg-white rounded-xl p-4 border border-blue-200/80 shadow-sm mb-4">
              <span className="text-xs font-semibold text-blue-800 uppercase tracking-wider">
                Total Segregado e Recolhido (IBS + CBS)
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-blue-700">
                  {valorTributos.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  {taxaEfetiva.toFixed(1)}% retido
                </span>
              </div>

              {/* Repartição interna hipotética */}
              <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-50 p-2 rounded-lg">
                  <span className="text-slate-500 block">CBS (União - estimativa):</span>
                  <span className="font-bold text-slate-800">
                    {estimativaCbs.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg">
                  <span className="text-slate-500 block">IBS (Estados/Mun.):</span>
                  <span className="font-bold text-slate-800">
                    {estimativaIbs.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Resumo didático */}
          <div className="bg-slate-100/80 rounded-lg p-3 text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-slate-700">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Consequência no Procedimento {modalidade === "padrao" ? "Padrão" : "Simplificado"}:</span>
            </div>
            <p className="leading-relaxed">
              {modalidade === "padrao"
                ? "Os valores vinculados à nota fiscal são recolhidos diretamente à Conta Única do Tesouro Nacional e do CGIBS, extinguindo os débitos na proporção do pagamento recebido."
                : "A retenção é baseada em percentual prévio. A extinção definitiva dos débitos e o creditamento do adquirente dependerão do encontro de contas na apuração periódica."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

