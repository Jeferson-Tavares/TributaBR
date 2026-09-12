import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Eye,
  Cookie,
  Cpu,
  FileText,
  AlertCircle,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidade — TRIBUTABR",
  description:
    "Política de privacidade do TRIBUTABR. Informações sobre tratamento de dados, conformidade com a LGPD, cookies e veiculação de anúncios via Google AdSense.",
};

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      
      {/* ── HEADER DA PÁGINA ──────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0040A8] to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold uppercase tracking-wider text-[#FFC700]">
            <Lock className="w-3.5 h-3.5" />
            <span>Transparência & Proteção de Dados • LGPD</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Política de Privacidade
          </h1>
          <p className="text-sm text-blue-100/90 leading-relaxed font-normal">
            Conheça as diretrizes de privacidade, segurança da informação e uso de cookies do 
            portal <strong>TRIBUTABR</strong>, elaboradas em estrita observância à Lei Geral de Proteção 
            de Dados Pessoais (LGPD - Lei nº 13.709/2018) e aos padrões de conformidade do Google AdSense.
          </p>
          <div className="pt-2 text-xs text-blue-200/80 font-medium">
            Última atualização: Setembro de 2026
          </div>
        </div>
      </div>

      {/* ── CONTEÚDO PRINCIPAL ────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm">
        
        {/* Seção 1: Introdução e Compromisso */}
        <section className="space-y-3">
          <div className="flex items-start gap-2.5 text-slate-900 font-extrabold text-lg pb-2 border-b border-slate-100">
            <ShieldCheck className="w-5 h-5 text-[#0040A8] flex-shrink-0 mt-1" />
            <h2>1. Introdução e Compromisso com a Privacidade</h2>
          </div>
          <p>
            O <strong>TRIBUTABR</strong> (acessível pelo endereço eletrônico correspondente) é uma plataforma 
            independente, de caráter estritamente educativo e informativo, dedicada à disseminação de conhecimento 
            acessível sobre a Nova Reforma Tributária Brasileira (Emenda Constitucional nº 132/2023, Projeto de Lei 
            Complementar nº 68/2024 e Projeto de Lei Complementar nº 108/2024).
          </p>
          <p>
            Reconhecemos a relevância primordial da privacidade de nossos usuários. Esta Política descreve de forma clara 
            quais informações podem ser coletadas, como são utilizadas, os direitos dos titulares e os padrões adotados para 
            assegurar uma navegação transparente, segura e livre de riscos.
          </p>
        </section>

        {/* Seção 2: Coleta e Tratamento de Dados */}
        <section className="space-y-3">
          <div className="flex items-start gap-2.5 text-slate-900 font-extrabold text-lg pb-2 border-b border-slate-100">
            <Eye className="w-5 h-5 text-[#009A44] flex-shrink-0 mt-1" />
            <h2>2. Coleta e Tratamento de Dados</h2>
          </div>
          <p>
            O portal <strong>TRIBUTABR</strong> não exige a criação de conta, cadastro prévio ou fornecimento de 
            dados pessoais sensíveis (como CPF, CNPJ, dados bancários ou senhas) para acesso ao conteúdo informativo, 
            artigos, cronogramas ou simuladores interativos.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-[#0040A8]">
                Dados Técnicos de Navegação (Logs)
              </h3>
              <p className="text-xs text-slate-600">
                Podem ser registrados automaticamente dados estritamente técnicos e anonimizados, tais como tipo de navegador, 
                sistema operacional, idioma, páginas visitadas e tempo de permanência, exclusivamente para fins estatísticos, 
                diagnóstico de erros técnicos e melhoria contínua da performance do site.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-[#009A44]">
                Formulário de Contato Voluntário
              </h3>
              <p className="text-xs text-slate-600">
                Caso o usuário decida entrar em contato conosco através do formulário institucional de suporte ou e-mail, 
                coletamos exclusivamente as informações voluntariamente fornecidas (nome, e-mail e teor da mensagem) com 
                a única finalidade de responder à solicitação encaminhada.
              </p>
            </div>
          </div>
        </section>

        {/* Seção 3: Ferramentas de Simulação */}
        <section className="space-y-3">
          <div className="flex items-start gap-2.5 text-slate-900 font-extrabold text-lg pb-2 border-b border-slate-100">
            <Cpu className="w-5 h-5 text-[#FFC700] flex-shrink-0 mt-1" />
            <h2>3. Ferramentas de Simulação e Privacidade das Informações</h2>
          </div>
          <p>
            O portal disponibiliza ferramentas práticas como a <strong>Calculadora IVA Dual (CBS/IBS)</strong> e a 
            <strong> Calculadora de Multas Fiscais (PLP 108/2024)</strong>.
          </p>
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#009A44]">
              <CheckCircle2 className="w-4 h-4 text-[#009A44]" />
              <span>Processamento 100% Local no Navegador (Client-Side)</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-700">
              Todos os valores numéricos informados nas simulações (ex: faturamento bruto hipotético, compras de insumos, 
              alíquotas e penalidades estimadas) são calculados em tempo real diretamente na memória local do navegador do 
              usuário. <strong>Nenhum dado financeiro ou societário informado nas calculadoras é gravado em bancos de dados, 
              transmitido para servidores externos, monitorado, comercializado ou compartilhado com terceiros.</strong>
            </p>
          </div>
        </section>

        {/* Seção 4: Google AdSense e Cookies de Terceiros */}
        <section className="space-y-4">
          <div className="flex items-start gap-2.5 text-slate-900 font-extrabold text-lg pb-2 border-b border-slate-100">
            <Cookie className="w-5 h-5 text-[#0040A8] flex-shrink-0 mt-1" />
            <h2>4. Publicidade, Google AdSense e Cookies de Terceiros</h2>
          </div>
          <p>
            Para manter a sustentabilidade operacional e garantir que todo o acervo educativo permaneça 100% gratuito ao público, 
            o portal <strong>TRIBUTABR</strong> pode veicular anúncios publicitários fornecidos por redes parceiras de publicidade, 
            notadamente o <strong>Google AdSense</strong>.
          </p>

          <div className="space-y-3 text-xs bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm">
              Diretrizes de Conformidade com o Google AdSense:
            </h3>
            <ul className="space-y-2.5 list-disc list-inside text-slate-600">
              <li>
                <strong>Uso de Cookies por Fornecedores Terceiros:</strong> O Google e outros fornecedores terceirizados utilizam cookies 
                para veicular anúncios personalizados com base nas visitas anteriores do usuário a este site ou a outros sites na Internet.
              </li>
              <li>
                <strong>Cookie DART e Anúncios Baseados em Interesses:</strong> O uso de cookies de publicidade (incluindo o cookie DART da 
                DoubleClick/Google) permite ao Google e a seus parceiros veicular anúncios para os usuários com base nas visitas feitas ao 
                TRIBUTABR e/ou a outros sites na Web.
              </li>
              <li>
                <strong>Como Desativar a Publicidade Personalizada:</strong> Os usuários podem desativar a publicidade personalizada 
                a qualquer momento acessando a página de{" "}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#0040A8] underline hover:text-[#003399] inline-flex items-center gap-0.5"
                >
                  Configurações de Anúncios do Google
                  <ExternalLink className="w-3 h-3 inline" />
                </a>. Alternativamente, os usuários podem optar por não receber o uso de cookies de fornecedores terceiros para publicidade 
                personalizada visitando o portal{" "}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#0040A8] underline hover:text-[#003399] inline-flex items-center gap-0.5"
                >
                  www.aboutads.info
                  <ExternalLink className="w-3 h-3 inline" />
                </a>.
              </li>
            </ul>
          </div>
        </section>

        {/* Seção 5: Links para Sites de Terceiros */}
        <section className="space-y-3">
          <div className="flex items-start gap-2.5 text-slate-900 font-extrabold text-lg pb-2 border-b border-slate-100">
            <ExternalLink className="w-5 h-5 text-slate-600 flex-shrink-0 mt-1" />
            <h2>5. Links Externos e Feeds de Notícias</h2>
          </div>
          <p>
            O portal contém links diretos para veículos oficiais de imprensa (como G1 Economia, Agência Brasil, 
            Folha de S.Paulo, InfoMoney e Portal Contábeis) e repositórios governamentais (Receita Federal do Brasil, 
            Ministério da Fazenda, Congresso Nacional e STF).
          </p>
          <p className="text-xs text-slate-500">
            Esta Política de Privacidade aplica-se única e exclusivamente às páginas do TRIBUTABR. Ao clicar em links 
            que direcionam para domínios externos, recomendamos enfaticamente a leitura das respectivas políticas de privacidade 
            dos portais de destino, sobre as quais não exercemos controle ou responsabilidade.
          </p>
        </section>

        {/* Seção 6: Isenção de Responsabilidade Legal */}
        <section className="space-y-3">
          <div className="flex items-start gap-2.5 text-slate-900 font-extrabold text-lg pb-2 border-b border-slate-100">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
            <h2>6. Isenção de Responsabilidade e Caráter Informativo</h2>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-2 text-xs">
            <p className="font-bold">
              Natureza Exclusivamente Educativa:
            </p>
            <p className="leading-relaxed text-slate-700">
              O conteúdo, análises, cronogramas e simuladores do TRIBUTABR possuem finalidade pedagógica. As alíquotas 
              apresentadas decorrem das estimativas oficiais preliminares do Ministério da Fazenda e dos textos do PLP 68/2024 
              e PLP 108/2024, sujeitas a deliberações e ajustes futuros pelo Senado Federal e pelo Comitê Gestor do IBS. 
              As simulações não constituem, sob nenhuma hipótese, parecer formal, planejamento tributário ou consultoria 
              jurídico-contábil individualizada.
            </p>
          </div>
        </section>

        {/* Seção 7: Alterações e Contato */}
        <section className="space-y-3 pt-2">
          <div className="flex items-start gap-2.5 text-slate-900 font-extrabold text-lg pb-2 border-b border-slate-100">
            <FileText className="w-5 h-5 text-[#0040A8] flex-shrink-0 mt-1" />
            <h2>7. Atualizações Desta Política e Canal de Contato</h2>
          </div>
          <p>
            Reservamo-nos o direito de aprimorar ou atualizar esta Política periodicamente, sempre que houver necessidade 
            de adequação técnica, legal ou operacional. As alterações passam a vigorar imediatamente após sua publicação nesta página.
          </p>
          <p>
            Dúvidas, sugestões ou solicitações relativas à privacidade e proteção de dados podem ser encaminhadas através da nossa{" "}
            <Link href="/sobre" className="font-bold text-[#0040A8] underline hover:text-[#003399]">
              página de Contato & Sobre Nós
            </Link>{" "}
            ou diretamente pelo e-mail institucional:{" "}
            <a href="mailto:contato@tributabr.com.br" className="font-bold text-[#0040A8] underline">
              contato@tributabr.com.br
            </a>.
          </p>
        </section>

      </div>
    </div>
  );
}
