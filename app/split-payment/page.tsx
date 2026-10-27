import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  Layers, 
  Cpu, 
  CreditCard, 
  ShieldAlert, 
  Scale, 
  Building2, 
  Store, 
  Smartphone, 
  Coins, 
  CalendarClock, 
  ExternalLink,
  ChevronRight,
  Info,
  Clock,
  Briefcase,
  AlertTriangle
} from "lucide-react";
import { SplitPaymentCalculator } from "@/components/SplitPaymentCalculator";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tributabr.com.br";

export default function SplitPaymentPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${siteUrl}/split-payment/#article`,
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          "name": "TributaBR",
          "url": siteUrl
        },
        "headline": "Split Payment na Reforma Tributária: Guia Completo e Fundamentação Legal",
        "description": "Entenda como funcionará a segregação e recolhimento instantâneo do IBS e da CBS pelas instituições de pagamento na Reforma Tributária do Consumo.",
        "url": `${siteUrl}/split-payment/`,
        "inLanguage": "pt-BR",
        "datePublished": "2026-10-26T20:00:00-03:00",
        "dateModified": "2026-10-26T20:00:00-03:00",
        "author": {
          "@type": "Organization",
          "name": "Equipe TributaBR",
          "url": siteUrl
        },
        "publisher": {
          "@type": "Organization",
          "name": "TributaBR",
          "url": siteUrl,
          "logo": {
            "@type": "ImageObject",
            "url": `${siteUrl}/icon.png`
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/split-payment/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Início",
            "item": `${siteUrl}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Split Payment",
            "item": `${siteUrl}/split-payment/`
          }
        ]
      },
      {
        "@type": "WebApplication",
        "@id": `${siteUrl}/split-payment/#calculator`,
        "name": "Simulador Didático de Split Payment",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "description": "Simulador interativo educacional para demonstração da segregação de tributos (IBS e CBS) e repasse ao fornecedor.",
        "url": `${siteUrl}/split-payment/`,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "BRL"
        }
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/split-payment/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "O que é Split Payment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "É o mecanismo operacional instituído pela Reforma Tributária (Lei Complementar nº 214/2025, arts. 31 a 36) no qual a instituição de pagamento segrega automaticamente a parcela correspondente ao IBS e à CBS no ato da liquidação financeira da transação, recolhendo-a aos cofres públicos e repassando o valor líquido ao vendedor."
            }
          },
          {
            "@type": "Question",
            "name": "Split Payment é um novo imposto?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Não. O Split Payment não é um tributo, não altera a base de cálculo nem eleva as alíquotas. Trata-se exclusivamente de um mecanismo financeiro e tecnológico de arrecadação e antecipação do recolhimento dos tributos incidentes (IBS e CBS)."
            }
          },
          {
            "@type": "Question",
            "name": "Como o sistema sabe quanto imposto deve reter?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No procedimento padrão (art. 32 da LC 214/2025), a instituição financeira consulta os dados da nota fiscal eletrônica vinculada à operação. No procedimento simplificado (art. 33), a retenção aplica percentual preestabelecido por ato conjunto da Receita Federal e do Comitê Gestor do IBS."
            }
          },
          {
            "@type": "Question",
            "name": "O que acontece se a venda for parcelada?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Conforme o art. 34 da LC 214/2025, a segregação do IBS e da CBS ocorre proporcionalmente em cada parcela liquidada, salvo disposição regulamentar específica para antecipação de recebíveis."
            }
          },
          {
            "@type": "Question",
            "name": "E se o comprador pagar em dinheiro?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Em operações liquidadas em espécie (moeda física) onde não há intervenção de intermediário financeiro ou arranjo de pagamento eletrônico, o Split Payment eletrônico não se aplica no ato do pagamento; o fornecedor recolhe o tributo pelo modelo de apuração periódica padrão."
            }
          },
          {
            "@type": "Question",
            "name": "As empresas do Simples Nacional estão sujeitas ao Split Payment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "As regras gerais aplicam-se conforme as definições regulamentares conjuntas da RFB e do CGIBS. Empresas do Simples Nacional que recolhem pelo regime unificado seguem as regras de transição específicas previstas na LC 214/2025."
            }
          },
          {
            "@type": "Question",
            "name": "O que ocorre quando uma venda é cancelada?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nos casos de cancelamento ou estorno com anulação da operação fiscal, os sistemas tributários e de pagamento operam a conciliação: o valor retido gera estorno ou crédito compensatório na conta do sujeito passivo conforme regulamentação do CGIBS e da RFB."
            }
          },
          {
            "@type": "Question",
            "name": "Como o Split Payment afeta o fluxo de caixa das empresas?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O principal impacto é o fim do chamado 'flutuador financeiro' (capital de giro gerado pela retenção dos tributos até a data de recolhimento da guia mensal), exigindo maior planejamento financeiro das empresas."
            }
          },
          {
            "@type": "Question",
            "name": "Qual é a diferença entre o procedimento padrão e o simplificado?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O procedimento padrão vincula a transação financeira à nota fiscal específica e retém o valor exato apurado. O simplificado retém um percentual preestabelecido sobre a operação, demandando conciliação posterior na escrituração."
            }
          },
          {
            "@type": "Question",
            "name": "Quem é responsável se o imposto não for retido?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A obrigação principal tributária permanece com o sujeito passivo (vendedor/fornecedor). Os prestadores de serviços de pagamento respondem pelo cumprimento dos deveres de segregação que lhes forem atribuídos pela legislação."
            }
          },
          {
            "@type": "Question",
            "name": "O consumidor pagará mais por causa do Split Payment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Não diretamente. O Split Payment não acrescenta custos tributários na nota. A transparência do imposto na nota permite ao consumidor ver exatamente o montante recolhido."
            }
          },
          {
            "@type": "Question",
            "name": "Quando o Split Payment começará a funcionar no Brasil?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O cronograma oficial de testes em ambiente controlado foi iniciado com projetos-piloto técnicos pela Receita Federal e Comitê Gestor em 2026, com implementação gradual acompanhando o período de transição da CBS e do IBS."
            }
          },
          {
            "@type": "Question",
            "name": "Como o Split Payment se relaciona com o crédito tributário?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O recolhimento efetivo pelo Split Payment assegura a certeza do adimplemento, requisito fundamental para o aproveitamento imediato e desimpedido do crédito tributário pelo adquirente contribuinte (arts. 47 e 48 da LC 214/2025)."
            }
          },
          {
            "@type": "Question",
            "name": "Onde posso acompanhar a regulamentação oficial?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No portal oficial do Comitê Gestor do IBS (cgibs.gov.br/split-payment), nos canais da Receita Federal e nos Atos Técnicos Conjuntos RFB/CGIBS publicados no Diário Oficial da União."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-slate-50 text-slate-800 antialiased pb-20">


        {/* HERO HEADER */}
        <header className="bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900 text-white py-16 sm:py-20 border-b border-blue-950">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-700/60 text-blue-200 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6 backdrop-blur-sm border border-blue-500/30">
              <Coins className="w-4 h-4 text-emerald-400" />
              <span>Reforma Tributária do Consumo • Leis Complementares 214/2025 e 227/2026</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Split Payment: como funciona a separação e o recolhimento dos impostos
            </h1>
            <p className="text-lg sm:text-xl text-blue-100/90 max-w-3xl mx-auto leading-relaxed font-normal mb-8">
              O guia definitivo sobre o mecanismo que automatiza a retenção do <strong>IBS</strong> e da <strong>CBS</strong> no momento da liquidação financeira da transação. Fundamentação legal, procedimentos, impactos e cronograma oficial.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-blue-200">
              <span className="flex items-center gap-1.5 bg-blue-800/80 px-3 py-1.5 rounded-lg border border-blue-700">
                <Clock className="w-4 h-4 text-emerald-400" /> Leitura aprofundada: 18 min
              </span>
              <span className="flex items-center gap-1.5 bg-blue-800/80 px-3 py-1.5 rounded-lg border border-blue-700">
                <Scale className="w-4 h-4 text-amber-300" /> Artigos 31 a 36 da LC 214/2025
              </span>
              <span className="flex items-center gap-1.5 bg-blue-800/80 px-3 py-1.5 rounded-lg border border-blue-700">
                <Cpu className="w-4 h-4 text-cyan-300" /> Integração Física & Financeira
              </span>
            </div>
          </div>
        </header>

        {/* CONTAINER PRINCIPAL: CONTEÚDO E ÍNDICE NAVEGÁVEL */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ÍNDICE NAVEGÁVEL (STICKY SIDEBAR) */}
            <aside className="lg:col-span-4 hidden lg:block sticky top-6 z-20">
              <nav className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 max-h-[85vh] overflow-y-auto text-xs">
                <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <FileText className="w-4 h-4 text-blue-700" />
                  Índice das 17 Seções
                </h3>
                <ul className="space-y-1.5 text-slate-600">
                  <li><a href="#secao-1" className="hover:text-blue-700 block py-1">1. Introdução Conceitual</a></li>
                  <li><a href="#secao-2" className="hover:text-blue-700 block py-1">2. O que é na Prática</a></li>
                  <li><a href="#secao-3" className="hover:text-blue-700 block py-1">3. Fluxograma do Processo</a></li>
                  <li><a href="#secao-4" className="hover:text-blue-700 block py-1">4. Procedimento Padrão (Art. 32)</a></li>
                  <li><a href="#secao-5" className="hover:text-blue-700 block py-1">5. Procedimento Simplificado (Art. 33)</a></li>
                  <li><a href="#secao-6" className="hover:text-blue-700 block py-1">6. Os 7 Agentes Envolvidos</a></li>
                  <li><a href="#secao-7" className="hover:text-blue-700 block py-1">7. Simulador Interativo Didático</a></li>
                  <li><a href="#secao-8" className="hover:text-blue-700 block py-1">8. Vendas Parceladas & Recebíveis</a></li>
                  <li><a href="#secao-9" className="hover:text-blue-700 block py-1">9. Créditos e Não Cumulatividade</a></li>
                  <li><a href="#secao-10" className="hover:text-blue-700 block py-1">10. Análise de Impactos Setoriais</a></li>
                  <li><a href="#secao-11" className="hover:text-blue-700 block py-1">11. Impactos para o Consumidor</a></li>
                  <li><a href="#secao-12" className="hover:text-blue-700 block py-1">12. Cancelamentos e Devoluções</a></li>
                  <li><a href="#secao-13" className="hover:text-blue-700 block py-1">13. Hipótese de Saldo Insuficiente</a></li>
                  <li><a href="#secao-14" className="hover:text-blue-700 block py-1">14. Cronograma & Estágio Real</a></li>
                  <li><a href="#secao-15" className="hover:text-blue-700 block py-1">15. Perguntas Frequentes (FAQ)</a></li>
                  <li><a href="#secao-16" className="hover:text-blue-700 block py-1">16. Legislação & Fontes Oficiais</a></li>
                  <li><a href="#secao-17" className="hover:text-blue-700 block py-1">17. Conclusão & Links Úteis</a></li>
                </ul>
              </nav>
            </aside>

            {/* ARTIGO COMPLETO */}
            <article className="lg:col-span-8 space-y-12">

              {/* SEÇÃO 1 — INTRODUÇÃO */}
              <section id="secao-1" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Seção 1</span>
                  <span>•</span>
                  <span>Fundamentos</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
                  1. O que é Split Payment na Reforma Tributária?
                </h2>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                  <p>
                    A expressão <strong>Split Payment</strong> tem como tradução literal <em>“pagamento dividido”</em> ou <em>“pagamento cindido”</em>. No âmbito da <strong>Reforma Tributária do Consumo</strong> brasileira instituída pela Emenda Constitucional nº 132/2023 e regulamentada pela <strong>Lei Complementar nº 214/2025</strong> (com as atualizações da LC nº 227/2026), o termo designa o modelo tecnológico e operacional que segrega automaticamente a parcela tributária devida a título de <strong>IBS</strong> (Imposto sobre Bens e Serviços) e <strong>CBS</strong> (Contribuição sobre Bens e Serviços) no momento exato em que a liquidação financeira de uma transação é executada pelos arranjos e instituições de pagamento.
                  </p>
                  <p>
                    Historicamente, os tributos sobre o consumo no Brasil (como ICMS, ISS, PIS e Cofins) sempre dependeram de um modelo de arrecadação diferido no tempo: o consumidor paga 100% do valor da compra ao vendedor; este valor entra integralmente no caixa da empresa e, semanas ou meses depois (geralmente no dia 15 ou 20 do mês subsequente), a empresa gera uma guia de arrecadação própria (como DAE, DARF ou GNRE) para recolher os tributos declarados.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl my-4 text-blue-950 text-sm">
                    <p className="font-semibold mb-1">Qual o problema estrutural que o Split Payment resolve?</p>
                    <p>
                      Esse modelo clássico gera inadimplência crônica, sonegação por omissão de receita e a chamada concorrência desleal entre empresas que recolhem seus impostos e aquelas que utilizam os tributos cobrados dos clientes como capital de giro próprio. Ao transferir a retenção para o ambiente dos pagamentos eletrônicos, o Estado assegura a arrecadação no instante da liquidação da venda.
                    </p>
                  </div>
                  <p>
                    <strong>Atenção primordial:</strong> O Split Payment altera profundamente o fluxo financeiro de cobrança e recolhimento, mas <strong>não extingue</strong> a necessidade de emissão de documentos fiscais eletrônicos (NF-e, NFC-e, NFS-e), nem dispensa o contribuinte de realizar a apuração, a conciliação contábil, a escrituração fiscal e o cumprimento de todas as obrigações acessórias perante as administrações tributárias.
                  </p>
                </div>
              </section>

              {/* SEÇÃO 2 — NA PRÁTICA */}
              <section id="secao-2" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Seção 2</span>
                  <span>•</span>
                  <span>Operação Real</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
                  2. O que é Split Payment na Prática?
                </h2>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                  <p>
                    Para desmistificar o conceito, é preciso deixar claro: <strong>o Split Payment não é uma taxa adicional ou um novo imposto adicionado ao preço final do produto</strong>. O consumidor não paga nenhum centavo a mais por causa dele. A mudança reside unicamente em para onde vai o dinheiro no momento em que a maquineta de cartão apita ou o Pix é confirmado.
                  </p>
                  <h3 className="text-lg font-bold text-slate-900 mt-4 mb-2">
                    A jornada de uma venda sob o Split Payment:
                  </h3>
                  <ol className="space-y-3 list-none pl-0">
                    <li className="flex gap-3 items-start bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <span className="w-7 h-7 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">1</span>
                      <div>
                        <strong className="text-slate-900 block">Realização da Venda:</strong>
                        <span>O cliente compra uma mercadoria por R$ 1.000,00 e opta por pagar via cartão ou Pix.</span>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <span className="w-7 h-7 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">2</span>
                      <div>
                        <strong className="text-slate-900 block">Documentação Fiscal Eletrônica:</strong>
                        <span>O vendedor emite o documento fiscal eletrônico (ex: NF-e ou NFC-e), onde constam os tributos incidentes devidos da operação.</span>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <span className="w-7 h-7 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">3</span>
                      <div>
                        <strong className="text-slate-900 block">Iniciação e Vinculação Financeira:</strong>
                        <span>O arranjo de pagamento (banco, adquirente, PSP) recebe a ordem de pagamento associada à transação e consulta as diretrizes fiscais aplicáveis.</span>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <span className="w-7 h-7 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">4</span>
                      <div>
                        <strong className="text-slate-900 block">Segregação Automática dos Valores:</strong>
                        <span>O sistema de liquidação financeira cinde os R$ 1.000,00: separa a parcela de IBS e CBS devida (por exemplo, R$ 265,00) da parcela líquida mercantil.</span>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <span className="w-7 h-7 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">5</span>
                      <div>
                        <strong className="text-slate-900 block">Recolhimento aos Cofres Públicos:</strong>
                        <span>A parcela de R$ 265,00 é transferida eletronicamente para as contas de arrecadação do Comitê Gestor do IBS e da Receita Federal do Brasil.</span>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <span className="w-7 h-7 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center shrink-0 text-xs">6</span>
                      <div>
                        <strong className="text-slate-900 block">Crédito Líquido ao Vendedor:</strong>
                        <span>O remanescente de R$ 735,00 (descontadas eventuais taxas contratuais de intermediação da credenciadora) é creditado na conta bancária do lojista.</span>
                      </div>
                    </li>
                  </ol>
                  <p className="text-xs text-slate-500 italic mt-2">
                    * Nota: A aplicação efetiva depende da modalidade (procedimento padrão ou simplificado), da disponibilidade de dados no momento da liquidação e das regras operacionais fixadas pelo CGIBS e pela RFB.
                  </p>
                </div>
              </section>

              {/* SEÇÃO 3 — FLUXOGRAMA RESPONSIVO */}
              <section id="secao-3" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Seção 3</span>
                  <span>•</span>
                  <span>Visão Sistêmica</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
                  3. Fluxograma Visual do Processo Completo
                </h2>
                <p className="text-slate-600 mb-6 text-sm">
                  Abaixo está mapeado o ciclo completo da segregação financeira, desde a oferta da mercadoria até o destino final dos recursos públicos e privados.
                </p>

                {/* Linha do Tempo / Fluxo Vertical Responsivo */}
                <div className="space-y-4">
                  {[
                    {
                      etapa: "Etapa 1",
                      titulo: "Venda e Operação Mercantil",
                      agentes: "Fornecedor (Vendedor) e Comprador (Adquirente)",
                      info: "Preço acertado, condições comerciais e meio de pagamento escolhido",
                      refLegal: "LC 214/2025, art. 31",
                      desc: "Celebração do negócio jurídico de fornecimento de bem corpóreo, incorpóreo ou serviço no mercado interno."
                    },
                    {
                      etapa: "Etapa 2",
                      titulo: "Emissão do Documento Fiscal Eletrônico",
                      agentes: "Fornecedor e Ambientes Autorizadores da SEFAZ / Receita",
                      info: "Chave de Acesso, NCM, alíquotas do IBS e da CBS, identificação dos sujeitos",
                      refLegal: "LC 214/2025, art. 32, § 1º",
                      desc: "Geração da NF-e/NFC-e com detalhamento dos tributos apurados, pronta para integração ao sistema de liquidação."
                    },
                    {
                      etapa: "Etapa 3",
                      titulo: "Iniciação e Identificação do Pagamento",
                      agentes: "Instituição de Pagamento (PSP), Adquirente e Plataforma Digital",
                      info: "Dados da transação financeira e vinculação com a chave do documento fiscal",
                      refLegal: "LC 214/2025, art. 32 e art. 35",
                      desc: "O sistema financeiro captura os identificadores da venda e estabelece a correspondência entre a ordem bancária e a nota fiscal."
                    },
                    {
                      etapa: "Etapa 4",
                      titulo: "Processamento pelo Sistema de Pagamento",
                      agentes: "Câmaras de Compensação, Bandeiras, Bancos Liquidantes e PSPs",
                      info: "Saldo disponível, limites de crédito e regras de segregação aplicáveis",
                      refLegal: "LC 214/2025, art. 32 c/c atos RFB/CGIBS",
                      desc: "O motor de liquidação processa a autorização do pagamento e aplica os algoritmos de retenção cabíveis."
                    },
                    {
                      etapa: "Etapa 5",
                      titulo: "Segregação dos Tributos (Cisão Financeira)",
                      agentes: "Instituição Financeira ou PSP Liquidante",
                      info: "Valor exato do tributo incidente ou percentual simplificado regulamentar",
                      refLegal: "LC 214/2025, arts. 32 e 33",
                      desc: "Cisão do montante pago: a fração correspondente ao IBS e CBS é isolada imediatamente dos recursos comerciais."
                    },
                    {
                      etapa: "Etapa 6",
                      titulo: "Recolhimento aos Entes Federativos",
                      agentes: "Comitê Gestor do IBS (Estados/Municípios) e Receita Federal (União)",
                      info: "Contas de arrecadação pública oficiais e identificação do débito",
                      refLegal: "LC 214/2025, art. 31, § 2º",
                      desc: "Transferência automática dos recursos para as contas públicas vinculadas, extinguindo a obrigação tributária principal na exata medida do valor recolhido."
                    },
                    {
                      etapa: "Etapa 7",
                      titulo: "Repasse do Remanescente Líquido",
                      agentes: "Prestador de Serviço de Pagamento e Fornecedor",
                      info: "Conta bancária do fornecedor e extrato conciliado da retenção",
                      refLegal: "LC 214/2025, art. 32, § 4º",
                      desc: "Crédito do montante líquido no domicílio bancário do fornecedor com comprovação do tributo devidamente recolhido."
                    }
                  ].map((passo, idx) => (
                    <div key={idx} className="relative pl-6 sm:pl-8 border-l-2 border-blue-500/30 pb-6 last:pb-0">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-2 border-white ring-2 ring-blue-100" />
                      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 sm:p-5">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            {passo.etapa}
                          </span>
                          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                            <Scale className="w-3.5 h-3.5 text-slate-400" /> {passo.refLegal}
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                          {passo.titulo}
                        </h4>
                        <p className="text-sm text-slate-700 mb-3">
                          {passo.desc}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200/60">
                          <div>
                            <span className="font-semibold text-slate-600 block">Agentes participantes:</span>
                            <span className="text-slate-800">{passo.agentes}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-slate-600 block">Informações essenciais:</span>
                            <span className="text-slate-800">{passo.info}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* SEÇÃO 4 — PROCEDIMENTO PADRÃO */}
              <section id="secao-4" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Seção 4</span>
                  <span>•</span>
                  <span>Artigo 32 da LC 214/2025</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
                  4. Procedimento Padrão: A Vinculação Direta com a Nota Fiscal
                </h2>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                  <p>
                    O <strong>procedimento padrão</strong> de Split Payment, tipificado no artigo 32 da Lei Complementar nº 214/2025, é a modalidade precípua do novo sistema tributário. Ele se apoia na correspondência exata entre a <strong>operação econômica documentada fiscalmente</strong> e a <strong>transação de pagamento executada</strong>.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Identificação e Vinculação Fiscal
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        A instituição de pagamento recebe ou consulta a chave de acesso da NF-e emitida pelo fornecedor. Dessa forma, ela sabe exatamente o valor apurado do IBS e da CBS incidente naquela operação individual.
                      </p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Extinção Instantânea do Débito
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Conforme a lei, o recolhimento efetivado pelo PSP extingue o débito tributário do fornecedor na exata proporção do montante pago e segregado, trazendo segurança jurídica plena contra autuações de sonegação.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-4 mb-2">
                    Responsabilidade pelo tráfego de dados e conciliação
                  </h3>
                  <p>
                    A lei atribui aos participantes da transação (fornecedores, adquirentes de bens e serviços, plataformas eletrônicas e prestadores de serviços de pagamento) o dever de compartilhar as informações necessárias para a perfeita identificação. Em operações em que o valor pago for inferior ao total da nota (por exemplo, uso simultâneo de dois meios de pagamento ou desconto superveniente), o Split Payment segrega a parcela tributária proporcionalmente ao valor efetivamente liquidado no arranjo.
                  </p>
                </div>
              </section>

              {/* SEÇÃO 5 — PROCEDIMENTO SIMPLIFICADO */}
              <section id="secao-5" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Seção 5</span>
                  <span>•</span>
                  <span>Artigo 33 da LC 214/2025</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
                  5. Procedimento Simplificado: Retenção por Percentual Preestabelecido
                </h2>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                  <p>
                    Nem todas as operações do varejo dinâmico ou dos pagamentos instantâneos conseguem, em milissegundos, consultar e reconciliar a chave de uma NF-e complexa com centenas de itens de diferentes alíquotas. Para garantir viabilidade técnica ao sistema de pagamentos brasileiro, o <strong>artigo 33 da LC 214/2025</strong> estruturou o <strong>procedimento simplificado</strong>.
                  </p>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 my-4">
                    <h4 className="font-bold text-emerald-950 text-base mb-2">
                      Como funciona o cálculo simplificado?
                    </h4>
                    <p className="text-emerald-900 text-sm leading-relaxed mb-3">
                      Ao invés de verificar cada item da nota fiscal, a instituição financeira retém um <strong>percentual preestabelecido</strong> sobre o valor total do pagamento. Esse percentual é fixado conjuntamente pela Receita Federal e pelo Comitê Gestor do IBS, podendo variar de acordo com o setor econômico ou o perfil de risco do contribuinte.
                    </p>
                    <div className="flex items-start gap-2 text-xs font-semibold text-emerald-800 bg-white/80 p-2.5 rounded-lg border border-emerald-200">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        Importante distinção jurídica: O percentual de retenção simplificada não equivale à alíquota nominal de 26,5% do imposto. Ele pode ser menor (ex: 8%, 12% ou 15%), funcionando como uma retenção inicial na fonte para posterior encontro de contas.
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-4 mb-2">
                    Consequências para o saldo devedor e créditos do comprador
                  </h3>
                  <p>
                    No procedimento simplificado, o valor retido não extingue compulsoriamente a totalidade da obrigação fiscal da empresa: ele é creditado na conta fiscal do vendedor para abater o imposto devido apurado ao final do mês na apuração regular. Caso o valor retido seja menor que o imposto devido, a empresa recolhe a diferença na guia mensal. Se for maior, gera direito à restituição ou compensação imediata.
                  </p>
                </div>
              </section>

              {/* SEÇÃO 6 — QUEM PARTICIPA (OS 7 AGENTES) */}
              <section id="secao-6" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Seção 6</span>
                  <span>•</span>
                  <span>Ecossistema</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
                  6. Quem Participa do Split Payment? (Os 7 Agentes Centrais)
                </h2>
                <p className="text-slate-600 mb-6 text-sm">
                  O funcionamento harmonioso do Split Payment depende da atuação integrada de sete figuras jurídicas e operacionais essenciais:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      titulo: "1. Fornecedor (Vendedor / Prestador)",
                      icone: Store,
                      papel: "Sujeito passivo da obrigação tributária. Emite a nota fiscal com destaque de IBS/CBS, disponibiliza a identificação da operação e recebe o valor líquido da venda.",
                      destaque: "Mantém a obrigação de escrituração e apuração mensal."
                    },
                    {
                      titulo: "2. Comprador (Adquirente / Tomador)",
                      icone: Briefcase,
                      papel: "Paga pelo produto ou serviço. Se for pessoa jurídica do regime regular, o recolhimento tempestivo pelo Split Payment é o elemento que valida o aproveitamento ágil de créditos fiscais.",
                      destaque: "Consumidor final não arca com taxa extra."
                    },
                    {
                      titulo: "3. Prestador de Serviços de Pagamento (PSP)",
                      icone: Smartphone,
                      papel: "Instituições de pagamento autorizadas pelo Banco Central (bancos, fintechs, credenciadoras de cartão). Executa a segregação financeira e repassa os tributos aos cofres públicos.",
                      destaque: "Braço tecnológico executor da retenção."
                    },
                    {
                      titulo: "4. Operadora do Arranjo de Pagamento",
                      icone: CreditCard,
                      papel: "Bandeiras e redes de compensação que estabelecem as regras de roteamento, segurança, liquidação financeira e interoperabilidade entre emissores e credenciadoras.",
                      destaque: "Padroniza os protocolos de mensagens financeiras."
                    },
                    {
                      titulo: "5. Plataformas Digitais e Marketplaces",
                      icone: Building2,
                      papel: "Intermediadores de vendas digitais sujeitos a deveres de colaboração e, em certas hipóteses regulamentadas pela LC 214/2025, responsáveis pela transmissão de dados ou retenção.",
                      destaque: "Fundamental para vendas online de múltiplos lojistas."
                    },
                    {
                      titulo: "6. Receita Federal do Brasil (RFB)",
                      icone: ShieldAlert,
                      papel: "Órgão fazendário da União que gerencia a arrecadação da CBS, edita atos técnicos conjuntos e administra os sistemas de escrituração e crédito federal.",
                      destaque: "Destinatária dos valores da CBS."
                    },
                    {
                      titulo: "7. Comitê Gestor do IBS (CGIBS)",
                      icone: Scale,
                      papel: "Entidade pública colegiada independente que administra o IBS em nível nacional, coordena a distribuição das receitas entre Estados e Municípios e opera o motor de regras do Split Payment.",
                      destaque: "Destinatário dos valores de Estados e Municípios."
                    }
                  ].map((agente, idx) => {
                    const Icon = agente.icone;
                    return (
                      <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-colors">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5" />
                          </div>
                          <h4 className="font-bold text-slate-900 text-base">{agente.titulo}</h4>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed mb-3">
                          {agente.papel}
                        </p>
                        <div className="text-[11px] font-semibold text-blue-800 bg-blue-50/80 px-2.5 py-1 rounded border border-blue-200/60 inline-block">
                          {agente.destaque}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* SEÇÃO 7 — CALCULADORA INTERATIVA DIDÁTICA */}
              <section id="secao-7">
                <div className="mb-2 text-center sm:text-left">
                  <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider mb-1">
                    <span>Seção 7</span>
                    <span>•</span>
                    <span>Ferramenta Interativa</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    7. Simule a Segregação do Pagamento na Prática
                  </h2>
                </div>
                
                {/* Componente Interativo de Simulação */}
                <SplitPaymentCalculator />
              </section>

              {/* SEÇÃO 8 — VENDAS PARCELADAS E ANTECIPAÇÃO */}
              <section id="secao-8" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Seção 8</span>
                  <span>•</span>
                  <span>Artigo 34 da LC 214/2025</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
                  8. Vendas Parceladas e Antecipação de Recebíveis
                </h2>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                  <p>
                    Uma das dúvidas mais frequentes de comerciantes e diretores financeiros diz respeito ao <strong>parcelamento no cartão de crédito</strong> (compras em 2x, 6x, 10x ou 12x) e às operações de cessão ou <strong>antecipação de recebíveis</strong> via FIDCs e instituições financeiras.
                  </p>
                  <p>
                    O <strong>artigo 34 da Lei Complementar nº 214/2025</strong> fixou a regra mestra:
                  </p>
                  <div className="bg-slate-50 border-l-4 border-slate-400 p-4 rounded-r-xl text-slate-800 text-sm italic">
                    “Nas operações com pagamento parcelado, a segregação do IBS e da CBS ocorrerá proporcionalmente em cada parcela liquidada, observada a disciplina estabelecida pelo Comitê Gestor do IBS e pela Secretaria Especial da Receita Federal do Brasil.”
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-4 mb-2">
                    O que ocorre na Antecipação de Recebíveis (Desconto de Duplicatas e Cartão)?
                  </h3>
                  <p>
                    Quando o lojista decide antecipar o pagamento com a instituição financeira ou com o adquirente, a antecipação incide sobre o <strong>valor líquido comercial</strong> já deduzido da obrigação tributária retida em cada cota. A parcela de IBS e CBS pertencente ao Estado não pode ser cedida ou alienada pelo fornecedor, pois constitui patrimônio público indisponível desde a ocorrência do fato gerador.
                  </p>
                </div>
              </section>

              {/* SEÇÃO 9 — CRÉDITOS TRIBUTÁRIOS E NÃO CUMULATIVIDADE */}
              <section id="secao-9" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Seção 9</span>
                  <span>•</span>
                  <span>Arts. 47 e 48 da LC 214/2025</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
                  9. O Vínculo com a Não Cumulatividade Plena e o Direito ao Crédito
                </h2>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                  <p>
                    O princípio basilar do novo modelo de IVA (IBS e CBS) é a <strong>não cumulatividade ampla e irrestrita</strong>: o tributo pago em qualquer etapa da cadeia produtiva gera crédito para a empresa compradora descontar dos seus próprios tributos a recolher.
                  </p>
                  <p>
                    Contudo, os <strong>artigos 47 e 48 da LC 214/2025</strong> condicionam o aproveitamento de créditos pelo adquirente contribuinte à prova do <em>efetivo recolhimento</em> ou ao cumprimento das regras de Split Payment. É aqui que o mecanismo revela sua maior virtude para as empresas corretas:
                  </p>
                  <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-emerald-950 text-sm">
                    <strong>Garantia de Crédito Imediato:</strong> Quando a compra entre empresas (B2B) é liquidada via Split Payment, a retenção automática prova imediatamente que o imposto foi carreado aos cofres públicos. O comprador ganha o direito inquestionável de apropriar 100% dos créditos fiscais sem qualquer receio de estornos fiscais futuros por inadimplência do fornecedor.
                  </div>
                </div>
              </section>

              {/* SEÇÃO 10 — IMPACTOS PARA AS EMPRESAS */}
              <section id="secao-10" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Seção 10</span>
                  <span>•</span>
                  <span>Análise Setorial</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
                  10. Análise Setorial dos Impactos nas Empresas
                </h2>
                <p className="text-slate-600 mb-6 text-sm">
                  O Split Payment afetará as operações das empresas de forma diferenciada dependendo da sua atividade e do seu fluxo de caixa:
                </p>

                <div className="space-y-4">
                  <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
                    <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
                      <Store className="w-5 h-5 text-blue-700" />
                      Varejo Físico e Supermercados
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Alto volume de pequenas transações no cartão e Pix. O principal impacto é a adaptação dos softwares de PDV (Frente de Caixa) para enviar as informações da NF-e ao TEF sem lentidão no checkout do consumidor. Elimina passivos de ICMS diferido.
                    </p>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
                    <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-indigo-700" />
                      Setor de Serviços
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Empresas com pouca tomada de créditos (folha de salários pesada) sentirão maior retenção em caixa. Precisarão recalcular seu capital de giro, visto que o valor do imposto não permanecerá na conta até o final do mês.
                    </p>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
                    <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-emerald-700" />
                      Indústria e Distribuidores Atacadistas
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Operações frequentemente faturadas a prazo por boleto bancário (30/60/90 dias). A conciliação entre duplicatas mercantis e boletos com Split Payment exigirá sistemas ERP robustos e bancos habilitados.
                    </p>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
                    <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
                      <Coins className="w-5 h-5 text-amber-700" />
                      Pequenas Empresas e Simples Nacional
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Empresas que optarem por permanecer no Simples Nacional continuarão a recolher tributos pelo Documento de Arrecadação do Simples Nacional (DAS), salvo regras de transição específicas reguladas pelos órgãos competentes.
                    </p>
                  </div>
                </div>
              </section>

              {/* SEÇÃO 11 — IMPACTOS PARA O CONSUMIDOR */}
              <section id="secao-11" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Seção 11</span>
                  <span>•</span>
                  <span>Cidadão & Consumidor</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
                  11. O Consumidor Sentirá Alguma Diferença?
                </h2>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                  <p>
                    Para o consumidor final, a experiência na hora de pagar continuará praticamente idêntica: aproximar o cartão, ler o QR Code do Pix ou pagar o boleto. A velocidade e os meios de pagamento continuam os mesmos.
                  </p>
                  <p>
                    A grande transformação positiva para o cidadão é a <strong>transparência fiscal absoluta</strong>: o cupom fiscal exibirá de forma cristalina exatamente quanto do valor pago foi direcionado para a União (CBS) e quanto foi para seu Estado e Município (IBS), fortalecendo o controle social dos gastos públicos.
                  </p>
                </div>
              </section>

              {/* SEÇÃO 12 — CANCELAMENTOS E DEVOLUÇÕES */}
              <section id="secao-12" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Seção 12</span>
                  <span>•</span>
                  <span>Exceções Comerciais</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
                  12. Cancelamentos, Devoluções de Mercadorias e Estornos
                </h2>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                  <p>
                    No comércio moderno, cancelamentos de compras, devoluções por direito de arrependimento (art. 49 do CDC) e estornos são rotinas diárias. Como o Split Payment lida com o imposto que já foi recolhido instantaneamente aos cofres públicos?
                  </p>
                  <p>
                    A LC 214/2025 prevê que a emissão da nota fiscal de anulação, devolução ou estorno gera um <strong>crédito compensatório imediato</strong> no ambiente tributário digital. Esse valor é abatido de recolhimentos futuros da mesma empresa ou, nas operações totalmente revertidas via PSP, restituído conforme as regras procedimentais de liquidação financeira fixadas em conjunto pelo CGIBS e pela Receita Federal.
                  </p>
                </div>
              </section>

              {/* SEÇÃO 13 — SALDO INSUFICIENTE DE RETENÇÃO */}
              <section id="secao-13" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Seção 13</span>
                  <span>•</span>
                  <span>Responsabilidade</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
                  13. O que Ocorre em Caso de Saldo Insuficiente para Retenção?
                </h2>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                  <p>
                    Pode ocorrer de uma operação não ter saldo disponível suficiente para suportar a integralidade da retenção — por exemplo, quando parte do pagamento é feita em dinheiro vivo e outra parte em cartão, ou por abatimentos promocionais complexos.
                  </p>
                  <p>
                    O texto legal é categórico: <strong>a obrigação tributária principal permanece vinculada ao sujeito passivo (o fornecedor vendedor)</strong>. Caso o Split Payment não consiga reter 100% do imposto devido no ato do pagamento, o saldo remanescente é apontado na escrituração fiscal e deverá ser recolhido pelo contribuinte por meio da apuração periódica padrão.
                  </p>
                </div>
              </section>

              {/* SEÇÃO 14 — CRONOGRAMA E ESTÁGIO DE IMPLEMENTAÇÃO */}
              <section id="secao-14" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Seção 14</span>
                  <span>•</span>
                  <span>Cronograma Oficial</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
                  14. Cronograma Oficial e Estágio Real de Implementação
                </h2>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                  <p>
                    A implementação do Split Payment no Brasil não ocorrerá do dia para a noite de forma abrupta; trata-se de um projeto que demanda integração entre o Sistema de Pagamentos Brasileiro (SPB), as redes de adquirência e as administrações tributárias de 27 estados e mais de 5.500 municípios.
                  </p>

                  <div className="border border-blue-200 bg-blue-50/60 rounded-xl p-5 my-4">
                    <h3 className="font-bold text-blue-950 text-base mb-2 flex items-center gap-2">
                      <CalendarClock className="w-5 h-5 text-blue-700" />
                      Marco dos Testes Técnicos (Comunicado RFB)
                    </h3>
                    <p className="text-blue-900 text-sm leading-relaxed">
                      Em comunicado oficial divulgado em <strong>30/09/2026</strong> pela Receita Federal e pelo Comitê Gestor do IBS, foi definido o início dos <strong>testes em ambiente controlado a partir de 15/10/2026</strong>. Esse ambiente piloto permite às instituições de pagamento, operadoras de cartão e grandes emissores testar o envio de mensagens financeiras e a segregação automatizada sem impacto tributário real para as empresas participantes.
                    </p>
                  </div>

                  <p>
                    A entrada em vigor das alíquotas de teste (0,9% de CBS e 0,1% de IBS) prevista na Emenda Constitucional nº 132/2023 servirá como balizador prático para o amadurecimento do Split Payment antes da vigência plena do sistema unificado.
                  </p>
                </div>
              </section>

              {/* SEÇÃO 15 — FAQ COM AS 14 PERGUNTAS */}
              <section id="secao-15" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Seção 15</span>
                  <span>•</span>
                  <span>Dúvidas Respondidas</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
                  15. Perguntas Frequentes sobre o Split Payment (FAQ)
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      q: "1. O que é Split Payment?",
                      a: "É o mecanismo operacional instituído pelos artigos 31 a 36 da LC 214/2025 que permite à instituição financeira ou de pagamento segregar, no ato da liquidação da transação, os valores de IBS e CBS devidos, recolhendo-os diretamente aos cofres públicos e repassando o valor líquido da venda ao fornecedor."
                    },
                    {
                      q: "2. Split Payment é um novo imposto?",
                      a: "Não. Ele não altera a base de cálculo nem eleva tributos. É apenas uma forma moderna de arrecadação automatizada que substitui o pagamento manual da guia mensal pelo vendedor."
                    },
                    {
                      q: "3. Como o sistema sabe quanto imposto deve reter?",
                      a: "No procedimento padrão (art. 32), o sistema consulta a NF-e associada à compra. No procedimento simplificado (art. 33), aplica um percentual preestabelecido definido por ato normativo conjunto do Comitê Gestor do IBS e da Receita Federal."
                    },
                    {
                      q: "4. O que acontece se a venda for parcelada?",
                      a: "Conforme o art. 34 da LC 214/2025, a retenção do IBS e da CBS ocorre proporcionalmente em cada parcela à medida que os pagamentos são liquidados."
                    },
                    {
                      q: "5. E se o comprador pagar em dinheiro vivo?",
                      a: "Sem um intermediário financeiro eletrônico, a retenção instantânea não se aplica fisicamente; nesse caso, a empresa apura e recolhe o imposto no fechamento periódico regular."
                    },
                    {
                      q: "6. As empresas do Simples Nacional estão sujeitas ao Split Payment?",
                      a: "As micro e pequenas empresas que optarem pelo recolhimento unificado no regime do Simples seguem regras regulamentares próprias de transição estabelecidas pela Receita Federal e pelo CGIBS."
                    },
                    {
                      q: "7. O que ocorre quando uma venda é cancelada?",
                      a: "A emissão da nota fiscal de estorno ou anulação gera um crédito compensatório imediato para a empresa no ambiente digital de apuração."
                    },
                    {
                      q: "8. Como o Split Payment afeta o fluxo de caixa das empresas?",
                      a: "Elimina o 'flutuador financeiro' (manutenção do imposto em caixa até a data de recolhimento da guia), exigindo maior gestão de liquidez por parte das companhias."
                    },
                    {
                      q: "9. Qual é a diferença entre o procedimento padrão e o simplificado?",
                      a: "O padrão vincula a transação financeira à nota fiscal exata e retém o valor apurado. O simplificado retém uma porcentagem prévia sobre o total, com ajuste posterior na apuração mensal."
                    },
                    {
                      q: "10. Quem é responsável se o imposto não for retido?",
                      a: "A responsabilidade tributária pelo imposto devido permanece com o fornecedor (vendedor). A instituição de pagamento responde por eventuais descumprimentos de seus deveres operacionais específicos."
                    },
                    {
                      q: "11. O consumidor pagará mais por causa do Split Payment?",
                      a: "Não. O preço das mercadorias não sobretaxa o consumidor pelo Split Payment; o valor total pago já contempla os tributos devidos."
                    },
                    {
                      q: "12. Quando o Split Payment começará a funcionar no Brasil?",
                      a: "Os testes técnicos em ambiente piloto controlado foram anunciados para início a partir de 15/10/2026, com implementação gradual acompanhando o calendário de transição da Reforma."
                    },
                    {
                      q: "13. Como o Split Payment se relaciona com o crédito tributário?",
                      a: "O recolhimento comprovado via Split Payment dá segurança jurídica absoluta e agilidade para o comprador aproveitar os créditos tributários correspondentes (arts. 47 e 48 da LC 214/2025)."
                    },
                    {
                      q: "14. Onde posso acompanhar a regulamentação oficial?",
                      a: "No portal oficial do Comitê Gestor do IBS (cgibs.gov.br/split-payment), nos canais da Receita Federal e nos Atos Técnicos Conjuntos RFB/CGIBS publicados no Diário Oficial da União."
                    }
                  ].map((item, idx) => (
                    <details key={idx} className="group border border-slate-200 rounded-xl p-4 open:bg-slate-50 transition-colors">
                      <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center text-sm sm:text-base">
                        <span>{item.q}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform shrink-0 ml-2" />
                      </summary>
                      <p className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed pl-1 border-t border-slate-200/60 pt-3">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>

              {/* SEÇÃO 16 — LEGISLAÇÃO E FONTES OFICIAIS */}
              <section id="secao-16" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Seção 16</span>
                  <span>•</span>
                  <span>Rigor Jurídico</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
                  16. Legislação de Referência e Fontes Oficiais
                </h2>
                <p className="text-slate-600 mb-6 text-sm">
                  Consulte os textos oficiais e as páginas de documentação técnica para aprofundamento normativo:
                </p>

                <div className="space-y-3 text-sm">
                  <a
                    href="https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214compilado.htm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-colors group"
                  >
                    <div>
                      <strong className="text-slate-900 group-hover:text-blue-700 block text-sm">
                        Lei Complementar nº 214/2025 — Texto Compilado (Planalto)
                      </strong>
                      <span className="text-xs text-slate-500">
                        Artigos 31 a 36 (Capítulo do Split Payment e recolhimento) e Arts. 47 e 48 (Créditos tributários).
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-700 shrink-0" />
                  </a>

                  <a
                    href="https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp227.htm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-colors group"
                  >
                    <div>
                      <strong className="text-slate-900 group-hover:text-blue-700 block text-sm">
                        Lei Complementar nº 227/2026 (Planalto)
                      </strong>
                      <span className="text-xs text-slate-500">
                        Atualizações e aperfeiçoamentos no marco regulatório da Reforma Tributária do Consumo.
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-700 shrink-0" />
                  </a>

                  <a
                    href="https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/decreto/d12955.htm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-colors group"
                  >
                    <div>
                      <strong className="text-slate-900 group-hover:text-blue-700 block text-sm">
                        Decreto nº 12.955/2026 (Planalto)
                      </strong>
                      <span className="text-xs text-slate-500">
                        Regulamentação das disposições de integração e responsabilidades operacionais.
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-700 shrink-0" />
                  </a>

                  <a
                    href="https://cgibs.gov.br/split-payment"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-colors group"
                  >
                    <div>
                      <strong className="text-slate-900 group-hover:text-blue-700 block text-sm">
                        Portal Oficial do Split Payment — Comitê Gestor do IBS (CGIBS)
                      </strong>
                      <span className="text-xs text-slate-500">
                        Especificações técnicas, manuais de integração de PSPs e informativos periódicos.
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-700 shrink-0" />
                  </a>

                  <a
                    href="https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/reforma-tributaria-do-consumo/legislacao/atos-tecnicos-conjuntos/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-colors group"
                  >
                    <div>
                      <strong className="text-slate-900 group-hover:text-blue-700 block text-sm">
                        Atos Técnicos Conjuntos RFB / CGIBS (Receita Federal)
                      </strong>
                      <span className="text-xs text-slate-500">
                        Normativas técnicas de arquitetura de dados e conciliação bancária.
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-700 shrink-0" />
                  </a>
                </div>
              </section>

              {/* SEÇÃO 17 — CONCLUSÃO E LINKS INTERNOS */}
              <section id="secao-17" className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-10 shadow-lg">
                <div className="flex items-center gap-2 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Seção 17</span>
                  <span>•</span>
                  <span>Síntese & Próximos Passos</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight">
                  17. Conclusão: Uma Mudança Histórica na Arrecadação Brasileira
                </h2>
                <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-8">
                  O Split Payment é sem dúvida uma das inovações estruturais mais relevantes da Reforma Tributária do Consumo. Ao unir a tecnologia do sistema de pagamentos à emissão de notas fiscais, o Brasil fecha lacunas históricas de sonegação, protege a concorrência leal e viabiliza a não cumulatividade plena. Para as empresas, o planejamento prévio e a adaptação dos sistemas de caixa e ERPs são passos inegociáveis para uma transição segura e sem sobressaltos.
                </p>

                <div className="border-t border-blue-800/80 pt-6">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                    Continue explorando as ferramentas do TributaBR:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <Link
                      href="/calculadora"
                      className="flex items-center justify-between p-3 rounded-xl bg-blue-800/60 hover:bg-blue-700 border border-blue-600/50 text-white transition-colors"
                    >
                      <span className="font-semibold">Simulador de Impacto do IVA</span>
                      <ArrowRight className="w-4 h-4 text-blue-300" />
                    </Link>
                    <Link
                      href="/simulador-de-multas"
                      className="flex items-center justify-between p-3 rounded-xl bg-blue-800/60 hover:bg-blue-700 border border-blue-600/50 text-white transition-colors"
                    >
                      <span className="font-semibold">Simulador de Multas Tributárias</span>
                      <ArrowRight className="w-4 h-4 text-blue-300" />
                    </Link>
                    <Link
                      href="/noticias"
                      className="flex items-center justify-between p-3 rounded-xl bg-blue-800/60 hover:bg-blue-700 border border-blue-600/50 text-white transition-colors"
                    >
                      <span className="font-semibold">Últimas Notícias e Atualizações</span>
                      <ArrowRight className="w-4 h-4 text-blue-300" />
                    </Link>
                    <Link
                      href="/"
                      className="flex items-center justify-between p-3 rounded-xl bg-blue-800/60 hover:bg-blue-700 border border-blue-600/50 text-white transition-colors"
                    >
                      <span className="font-semibold">Página Principal TributaBR</span>
                      <ArrowRight className="w-4 h-4 text-blue-300" />
                    </Link>
                  </div>
                </div>
              </section>

            </article>
          </div>
        </div>
      </main>
    </>
  );
}

