import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Scale,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ShieldAlert,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Termos de Uso — TRIBUTABR",
  description:
    "Termos de uso do portal TRIBUTABR. Diretrizes de navegação, natureza educativa dos simuladores, isenção de responsabilidade e regras de propriedade intelectual.",
};

export default function TermosDeUsoPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      
      {/* ── HEADER DA PÁGINA ──────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0040A8] to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold uppercase tracking-wider text-[#FFC700]">
            <Scale className="w-3.5 h-3.5" />
            <span>Condições Legais & Conduta de Uso</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Termos de Uso
          </h1>
          <p className="text-sm text-blue-100/90 leading-relaxed font-normal">
            Leia atentamente as condições e diretrizes de navegação do <strong>TRIBUTABR</strong>. Ao acessar 
            e interagir com nossos simuladores, calculadoras e artigos, você concorda expressamente com os 
            termos estabelecidos neste documento.
          </p>
          <div className="pt-2 text-xs text-blue-200/80 font-medium">
            Vigência: Setembro de 2026
          </div>
        </div>
      </div>

      {/* ── CONTEÚDO DOS TERMOS ───────────────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm">
        
        {/* 1. Aceitação dos Termos */}
        <section className="space-y-3">
          <div className="flex items-start gap-2.5 text-slate-900 font-extrabold text-lg pb-2 border-b border-slate-100">
            <CheckCircle className="w-5 h-5 text-[#009A44] flex-shrink-0 mt-1" />
            <h2>1. Aceitação dos Termos e Condições</h2>
          </div>
          <p>
            O acesso e a utilização dos recursos disponíveis no <strong>TRIBUTABR</strong> regem-se por estes Termos de Uso. 
            Caso não concorde com quaisquer das disposições aqui elencadas, orientamos que cesse a utilização do portal e de seus 
            módulos de cálculo.
          </p>
          <p>
            O portal pode alterar, a qualquer momento e sem aviso prévio individualizado, o conteúdo, a disposição visual, 
            os parâmetros de cálculo ou estes Termos, com vigência imediata a partir de sua publicação neste domínio.
          </p>
        </section>

        {/* 2. Natureza Informativa e Educativa */}
        <section className="space-y-3">
          <div className="flex items-start gap-2.5 text-slate-900 font-extrabold text-lg pb-2 border-b border-slate-100">
            <BookOpen className="w-5 h-5 text-[#0040A8] flex-shrink-0 mt-1" />
            <h2>2. Natureza Exclusivamente Informativa e Pedagógica</h2>
          </div>
          <p>
            O <strong>TRIBUTABR</strong> é um projeto independente de divulgação científica e contábil, concebido com o propósito 
            de facilitar a compreensão das profundas transformações introduzidas no ordenamento jurídico nacional pela Reforma 
            Tributária sobre o Consumo:
          </p>
          <ul className="space-y-2 list-disc list-inside text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <li>
              <strong>Emenda Constitucional nº 132/2023:</strong> Criação do IVA Dual (CBS federal e IBS subnacional), Imposto Seletivo 
              e princípio da não-cumulatividade plena com crédito financeiro;
            </li>
            <li>
              <strong>Projeto de Lei Complementar nº 68/2024 (PLP 68/2024):</strong> Instituição e regulamentação da base de incidência, 
              regimes diferenciados, reduções de 60% e alíquota zero (Cesta Básica Nacional);
            </li>
            <li>
              <strong>Projeto de Lei Complementar nº 108/2024 (PLP 108/2024):</strong> Comitê Gestor do IBS, uniformização do 
              Processo Administrativo Tributário (PAF) e dosimetria proporcional de multas;
            </li>
            <li>
              <strong>Jurisprudência Vinculante do STF/STJ:</strong> Aplicação das diretrizes da Súmula Vinculante 28 do STF 
              (inconstitucionalidade de depósito prévio recursal).
            </li>
          </ul>
        </section>

        {/* 3. Não Substituição de Consultoria Formal */}
        <section className="space-y-3">
          <div className="flex items-start gap-2.5 text-slate-900 font-extrabold text-lg pb-2 border-b border-slate-100">
            <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
            <h2>3. Não Substituição de Pareceres e Consultoria Formal</h2>
          </div>
          <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200 text-red-950 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-red-700 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>Aviso Fundamental aos Usuários e Empresas</span>
            </div>
            <p className="leading-relaxed text-slate-700">
              Nenhuma informação, projeção, simulação de tributos ou cálculo de multas disponibilizado no TRIBUTABR 
              substitui a atuação profissional de <strong>contadores legalmente habilitados, advogados tributaristas, 
              peritos ou auditores fiscais</strong>. Decisões societárias, enquadramentos fiscais, recolhimento de guias e 
              estratégias de defesa administrativa ou judicial devem ser fundamentadas na legislação vigente à época do fato 
              gerador e sob a supervisão direta de profissionais qualificados.
            </p>
          </div>
        </section>

        {/* 4. Premissas das Simulações e Parâmetros */}
        <section className="space-y-3">
          <div className="flex items-start gap-2.5 text-slate-900 font-extrabold text-lg pb-2 border-b border-slate-100">
            <Scale className="w-5 h-5 text-[#FFC700] flex-shrink-0 mt-1" />
            <h2>4. Premissas das Simulações e Alíquotas de Referência</h2>
          </div>
          <p>
            O usuário declara ter plena ciência de que:
          </p>
          <ol className="space-y-2 list-decimal list-inside text-xs text-slate-600">
            <li>
              A alíquota padrão estimada de <strong>26,50%</strong> (sendo ~8,8% CBS e ~17,7% IBS) utilizada como ponto de partida 
              no simulador baseia-se em estudos preliminares do Ministério da Fazenda e está <strong>sujeita à fixação final e 
              revisão periódica pelo Senado Federal</strong> conforme travas constitucionais de arrecadação.
            </li>
            <li>
              A migração entre 2026 e 2033 segue cronograma legislativo transitório. Discrepâncias entre simulações teóricas e a 
              realidade operacional de cada contribuinte podem ocorrer em razão de regimes especiais, créditos presumidos, 
              isenções locais e regulamentações infralegais ainda em debate legislativo.
            </li>
            <li>
              Os simuladores utilizam modelos matemáticos simplificados para proporcionar intuição visual e rápida compreensão pública, 
              não contemplando todas as particularidades casuísticas de cada NCM ou subclasse CNAE.
            </li>
          </ol>
        </section>

        {/* 5. Propriedade Intelectual e Uso Aceitável */}
        <section className="space-y-3">
          <div className="flex items-start gap-2.5 text-slate-900 font-extrabold text-lg pb-2 border-b border-slate-100">
            <FileText className="w-5 h-5 text-[#0040A8] flex-shrink-0 mt-1" />
            <h2>5. Propriedade Intelectual e Conduta do Usuário</h2>
          </div>
          <p>
            O nome <strong>TRIBUTABR</strong>, logomarcas, design de interface, elementos visuais de navegação e a 
            estruturação do código-fonte constituem ativos intelectuais protegidos pela legislação de direitos autorais e 
            propriedade imaterial.
          </p>
          <p>
            É concedida ao usuário uma licença limitada, não exclusiva e revogável para acessar o portal, navegar pelos 
            conteúdos e utilizar os simuladores para fins estritamente pessoais, acadêmicos ou profissionais consultivos. 
            É expressamente vedado:
          </p>
          <ul className="space-y-1.5 list-disc list-inside text-xs text-slate-600">
            <li>Utilizar métodos de automação nociva (scrapers, robôs maliciosos, ataques DoS) que prejudiquem a estabilidade do portal;</li>
            <li>Reproduzir integralmente o código ou tentar fazer engenharia reversa para criar ferramentas concorrentes sem citação de autoria;</li>
            <li>Transmitir ou associar o nome do portal a informações falsas, difamatórias ou de desinformação tributária.</li>
          </ul>
        </section>

        {/* 6. Limitação de Responsabilidade */}
        <section className="space-y-3">
          <div className="flex items-start gap-2.5 text-slate-900 font-extrabold text-lg pb-2 border-b border-slate-100">
            <HelpCircle className="w-5 h-5 text-slate-600 flex-shrink-0 mt-1" />
            <h2>6. Limitação de Responsabilidade</h2>
          </div>
          <p className="text-xs text-slate-600">
            Em nenhuma hipótese o TRIBUTABR, seus idealizadores ou colaboradores responderão por quaisquer danos diretos, 
            indiretos, lucros cessantes ou prejuízos fiscais decorrentes do uso ou da impossibilidade de uso das informações, 
            falhas temporárias de conexão com os feeds RSS jornalísticos ou interpretações errôneas das simulações numéricas.
          </p>
        </section>

        {/* 7. Foro e Legislação Aplicável */}
        <section className="space-y-3 pt-2">
          <div className="flex items-start gap-2.5 text-slate-900 font-extrabold text-lg pb-2 border-b border-slate-100">
            <Scale className="w-5 h-5 text-[#0040A8] flex-shrink-0 mt-1" />
            <h2>7. Legislação Aplicável e Contato</h2>
          </div>
          <p>
            Estes Termos de Uso são regidos e interpretados em conformidade com as leis vigentes na República Federativa do Brasil, 
            em especial o Marco Civil da Internet (Lei nº 12.965/2014) e o Código de Defesa do Consumidor quando aplicável.
          </p>
          <p>
            Para esclarecimento de dúvidas sobre estes termos ou para sugestões editoriais, consulte nossa{" "}
            <Link href="/sobre" className="font-bold text-[#0040A8] underline hover:text-[#003399]">
              página de Contato
            </Link>{" "}
            ou escreva para{" "}
            <a href="mailto:contato@tributabr.com.br" className="font-bold text-[#0040A8] underline">
              contato@tributabr.com.br
            </a>.
          </p>
        </section>

      </div>
    </div>
  );
}
