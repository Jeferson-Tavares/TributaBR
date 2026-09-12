"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import {
  Info,
  Mail,
  MapPin,
  Send,
  ShieldCheck,
  BookOpen,
  Award,
  Users,
  CheckCircle2,
  Scale,
  Sparkles,
  MessageSquare,
} from "lucide-react";

export default function SobreNosPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "Dúvida Geral",
    mensagem: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulação de envio com feedback instantâneo ao usuário
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        nome: "",
        email: "",
        assunto: "Dúvida Geral",
        mensagem: "",
      });
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in">
      {/* ── HEADER DA PÁGINA ──────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0040A8] to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold uppercase tracking-wider text-[#FFC700]">
            <Info className="w-3.5 h-3.5" />
            <span>Missão Editorial & Contato Institucional</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Sobre Nós & Fale Conosco
          </h1>
          <p className="text-sm text-blue-100/90 leading-relaxed font-normal">
            Conheça o propósito do <strong>TRIBUTABR</strong>, nossa metodologia
            editorial independente e os canais diretos para sugestões,
            parcerias, correções e suporte à comunidade.
          </p>
        </div>
      </div>

      {/* ── QUEM SOMOS & PROPÓSITO ────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bloco de Apresentação (2 colunas) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#0040A8]">
              <Users className="w-4 h-4" />
              <span>Nossa Identidade & Propósito</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Desmistificando o Maior Marco Fiscal do Brasil Moderno
            </h2>
            <p>
              O <strong>TRIBUTABR</strong> nasceu com o compromisso cívico de
              transformar textos legislativos de alta complexidade em
              ferramentas intuitivas, didáticas e transparentes para a sociedade
              brasileira.
            </p>
            <p>
              A promulgação da{" "}
              <strong>Emenda Constitucional nº 132/2023</strong> e a tramitação
              dos
              <strong> PLPs 68/2024 e 108/2024</strong> inauguram uma era de
              simplificação (extinção de ICMS, ISS, IPI, PIS e Cofins e
              unificação no IVA Dual - CBS e IBS). No entanto, o período de
              transição (2026 a 2033) exige planejamento minucioso por parte de
              micro, pequenas e grandes empresas, bem como entendimento claro
              pelos consumidores finais.
            </p>
          </div>

          {/* Pilares */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-1.5">
              <span className="text-xs font-bold text-[#0040A8] uppercase tracking-wider block">
                Independência
              </span>
              <p className="text-xs text-slate-600">
                Sem vínculo partidário ou governamental. Foco estritamente na
                análise técnica e didática.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1.5">
              <span className="text-xs font-bold text-[#009A44] uppercase tracking-wider block">
                Rigor Legal
              </span>
              <p className="text-xs text-slate-600">
                Parâmetros sempre respaldados em textos normativos reais e
                jurisprudência vinculante.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-1.5">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                Acesso Gratuito
              </span>
              <p className="text-xs text-slate-600">
                Ferramentas abertas e gratuitas para capacitar cidadãos,
                empreendedores e estudantes.
              </p>
            </div>
          </div>

          {/* Metodologia */}
          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#0040A8]" />
              Fontes Primárias & Metodologia Editorial
            </h3>
            <p className="text-xs text-slate-600">
              Nossas calculadoras, artigos e gráficos são parametrizados com
              base nas notas técnicas do
              <strong> Ministério da Fazenda</strong>, nos pareceres do{" "}
              <strong>Senado Federal</strong> e da
              <strong> Câmara dos Deputados</strong>, nos atos conjuntos do{" "}
              <strong>Comitê Gestor do IBS</strong> e em súmulas do{" "}
              <strong>Supremo Tribunal Federal</strong> (como a Súmula
              Vinculante 28). Atualizamos as premissas de cálculo continuamente
              conforme o avanço de votações no Congresso Nacional.
            </p>
          </div>
        </div>

        {/* Card Lateral: Informações de Contato & Localização */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
            <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#0040A8]" />
              Canais Diretos
            </h3>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0040A8] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-800 block text-xs">
                    E-mail Editorial & Suporte
                  </span>
                  <a
                    href="mailto:contato@tributabr.com.br"
                    className="text-[#0040A8] font-semibold hover:underline"
                  >
                    contato@tributabr.com.br
                  </a>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Resposta em até 24h úteis
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#009A44] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-800 block text-xs">
                    Localização Editorial
                  </span>
                  <p className="text-slate-600">Brasília, DF & São Paulo, SP</p>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Brasil • Cobertura Nacional
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-[#FFC700] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-800 block text-xs">
                    Transparência & LGPD
                  </span>
                  <p className="text-slate-600">
                    Atendimento aos direitos do titular de dados
                  </p>
                  <Link
                    href="/politica-de-privacidade"
                    className="text-[#0040A8] underline hover:text-[#003399]"
                  >
                    Ver Política de Privacidade
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
              💡 <strong>Imprensa e Pesquisadores:</strong> Interessados em
              citações de dados ou estudos comparativos sobre o IVA Dual podem
              solicitar material exclusivo via e-mail.
            </div>
          </div>
        </div>
      </div>

      {/* ── FORMULÁRIO DE CONTATO ─────────────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#009A44] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Fale com a Equipe
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
            Envie sua Mensagem, Dúvida ou Sugestão
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Preencha o formulário abaixo. Sua mensagem será direcionada à equipe
            técnica responsável pela curadoria tributária.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-3 animate-fade-in max-w-xl">
            <div className="flex items-center gap-2.5 font-bold text-emerald-800 text-base">
              <CheckCircle2 className="w-5 h-5 text-[#009A44]" />
              <span>Mensagem enviada com sucesso!</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Agradecemos seu contato. Nossa equipe editorial analisará sua
              mensagem e responderá pelo e-mail informado assim que possível.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="text-xs font-bold text-[#0040A8] underline hover:text-[#003399]"
            >
              Enviar outra mensagem
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Seu Nome *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                  placeholder="Ex: João da Silva"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#0040A8] focus:ring-2 focus:ring-blue-100 transition-all min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Seu E-mail *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Ex: joao@empresa.com.br"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#0040A8] focus:ring-2 focus:ring-blue-100 transition-all min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Assunto da Mensagem
              </label>
              <select
                value={formData.assunto}
                onChange={(e) =>
                  setFormData({ ...formData, assunto: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:bg-white focus:border-[#0040A8] focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer min-h-[44px]"
              >
                <option value="Dúvida Geral">
                  Dúvida sobre a Reforma Tributária
                </option>
                <option value="Feedback dos Simuladores">
                  Sugestão / Feedback dos Simuladores
                </option>
                <option value="Correção de Conteúdo">
                  Apontamento de Correção Normativa
                </option>
                <option value="Parceria ou Imprensa">
                  Contato Institucional / Imprensa
                </option>
                <option value="Privacidade / LGPD">
                  Privacidade e Dados (LGPD)
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Mensagem *
              </label>
              <textarea
                required
                rows={4}
                value={formData.mensagem}
                onChange={(e) =>
                  setFormData({ ...formData, mensagem: e.target.value })
                }
                placeholder="Escreva sua dúvida, sugestão ou comentário detalhado..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#0040A8] focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>

            <p className="text-[11px] text-slate-400">
              * Suas informações serão utilizadas estritamente para responder à
              sua solicitação, em conformidade com nossa{" "}
              <Link
                href="/politica-de-privacidade"
                className="text-[#0040A8] underline hover:text-[#003399]"
              >
                Política de Privacidade
              </Link>
              .
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0040A8] hover:bg-[#003399] text-white text-sm font-bold shadow-md shadow-blue-900/10 transition-all active:scale-95 disabled:opacity-70 cursor-pointer min-h-[48px]"
            >
              <Send className="w-4 h-4" />
              <span>
                {loading ? "Enviando mensagem..." : "Enviar Mensagem"}
              </span>
            </button>
          </form>
        )}
      </div>

      {/* JSON-LD Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "@id": "https://tributabr.com.br/sobre/#about",
            name: "Sobre o Projeto TRIBUTABR",
            url: "https://tributabr.com.br/sobre",
            description:
              "Informações institucionais, missão editorial independente e canais de contato da plataforma TRIBUTABR sobre a Reforma Tributária.",
            mainEntity: {
              "@type": "Organization",
              name: "TRIBUTABR",
              url: "https://tributabr.com.br",
              logo: "https://tributabr.com.br/logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                email: "contato@tributabr.com.br",
                availableLanguage: ["Portuguese"],
              },
            },
          }),
        }}
      />
    </div>
  );
}
