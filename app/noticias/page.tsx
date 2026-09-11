"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Newspaper,
  Search,
  ExternalLink,
  Calendar,
  Tag,
  RefreshCw,
  Sparkles,
  AlertCircle,
  Filter,
} from "lucide-react";
import type { NewsItem } from "../api/noticias/route";

const FILTER_TAGS = [
  "Todas",
  "IBS",
  "CBS",
  "Simples Nacional",
  "PLP 68/2024",
  "PLP 108/2024",
  "Crédito",
  "Transição",
  "Fisco",
];

const FILTER_SOURCES = [
  "Todos os Canais",
  "G1 Economia",
  "Agência Brasil",
  "Folha de S.Paulo",
  "InfoMoney",
  "Portal Contábeis",
];

export default function NoticiasPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("Todas");
  const [selectedSource, setSelectedSource] = useState("Todos os Canais");
  const [activeSources, setActiveSources] = useState<string[]>([]);
  const [sourceType, setSourceType] = useState<string>("");

  const newsApiPath = process.env.NEXT_PUBLIC_BASE_PATH
    ? `${process.env.NEXT_PUBLIC_BASE_PATH}/api/noticias`
    : "/api/noticias";

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch(newsApiPath);
      const data = await res.json();
      if (data && data.items) {
        setNews(data.items);
        setSourceType(data.source);
        if (data.activeSources) {
          setActiveSources(data.activeSources);
        }
      }
    } catch (err) {
      console.error("Erro ao carregar notícias:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Filtragem dinâmica por busca, tag e canal de notícia
  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contentSnippet.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag =
        selectedTag === "Todas" ||
        item.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());

      const matchesSource =
        selectedSource === "Todos os Canais" ||
        item.source.toLowerCase().includes(selectedSource.toLowerCase());

      return matchesSearch && matchesTag && matchesSource;
    });
  }, [news, searchQuery, selectedTag, selectedSource]);

  const formatDate = (isoStr: string) => {
    try {
      const date = new Date(isoStr);
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Recente";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* ── CABEÇALHO DA PÁGINA ──────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-blue-900 via-[#0040A8] to-[#003399] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold uppercase tracking-wider text-[#FFC700]">
            <Newspaper className="w-3.5 h-3.5" />
            <span>
              Feeds RSS Multicanal • G1 & Principais Veículos de Comunicação
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Radar & Notícias da Reforma Tributária
          </h1>
          <p className="text-sm text-blue-100/90 leading-relaxed font-normal">
            Cobertura jornalística em tempo real integrando os feeds do G1
            Economia, Agência Brasil, Folha de S.Paulo, InfoMoney e Portal
            Contábeis com foco nas diretrizes dos PLPs 68/2024 e 108/2024.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-blue-200">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-2 h-2 rounded-full bg-[#009A44] animate-pulse"></span>
            <span className="font-semibold text-white">Canais Integrados:</span>
            <span>
              G1 Economia • Agência Brasil • Folha Mercado • InfoMoney • Portal
              Contábeis
            </span>
          </div>
          <button
            onClick={fetchNews}
            disabled={loading}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all font-semibold active:scale-95 self-start sm:self-auto cursor-pointer"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
            />
            <span>{loading ? "Atualizando..." : "Recarregar Feeds"}</span>
          </button>
        </div>
      </div>

      {/* ── BARRA DE BUSCA E FILTROS DE FONTES E TAGS ────────────────── */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Campo de Busca */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por palavras-chave (ex: IBS, alíquota, Simples, G1, multas)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#0040A8] focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 self-center cursor-pointer"
            >
              Limpar busca
            </button>
          )}
        </div>

        {/* Filtro por Veículo / Canal de Notícia */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1 flex-shrink-0">
            <Newspaper className="w-3.5 h-3.5" />
            Veículo:
          </span>
          {FILTER_SOURCES.map((sourceName) => {
            const isSelected = selectedSource === sourceName;
            return (
              <button
                key={sourceName}
                onClick={() => setSelectedSource(sourceName)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 border cursor-pointer ${
                  isSelected
                    ? "bg-[#0040A8] text-white border-[#0040A8] shadow-sm"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                }`}
              >
                {sourceName}
              </button>
            );
          })}
        </div>

        {/* Tags de Assunto (Horizontal Scroll) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1 flex-shrink-0">
            <Filter className="w-3.5 h-3.5" />
            Tema:
          </span>
          {FILTER_TAGS.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 border cursor-pointer ${
                  isSelected
                    ? "bg-[#009A44] text-white border-[#009A44] shadow-xs"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── GRADE DE NOTÍCIAS (1 col mobile, 2 col tablet, 3 col desktop) ── */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="bg-white rounded-3xl border border-slate-200 p-5 space-y-4 animate-pulse"
            >
              <div className="h-44 bg-slate-200 rounded-2xl w-full" />
              <div className="h-4 bg-slate-200 rounded w-1/3" />
              <div className="h-6 bg-slate-200 rounded w-3/4" />
              <div className="h-12 bg-slate-100 rounded w-full" />
              <div className="h-10 bg-slate-200 rounded w-full" />
            </div>
          ))}
        </div>
      ) : filteredNews.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">
            Nenhuma notícia encontrada
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Não encontramos artigos com o termo <strong>"{searchQuery}"</strong>{" "}
            ou com a tag <strong>"{selectedTag}"</strong>. Tente ajustar os
            termos de pesquisa.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedTag("Todas");
            }}
            className="mt-2 px-4 py-2 rounded-xl bg-[#0040A8] text-white text-xs font-semibold"
          >
            Ver Todas as Notícias
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Imagem de Capa */}
                {item.imageUrl && (
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                      {item.source}
                    </div>
                  </div>
                )}

                {/* Conteúdo do Card */}
                <div className="p-5 space-y-3">
                  {/* Meta: Data e Tags */}
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {formatDate(item.pubDate)}
                    </span>
                    <div className="flex gap-1 flex-wrap justify-end">
                      {item.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#0040A8] border border-blue-100"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Título */}
                  <h2 className="text-base font-bold text-slate-900 group-hover:text-[#0040A8] transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h2>

                  {/* Resumo */}
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.contentSnippet}
                  </p>
                </div>
              </div>

              {/* Botão em Azul Cobalto para o Artigo Original */}
              <div className="p-5 pt-0">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#0040A8] hover:bg-[#003399] text-white text-xs font-bold transition-all duration-150 shadow-sm shadow-blue-900/10 group-hover:shadow-md"
                >
                  <span>Ler Notícia Completa</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* JSON-LD Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Radar de Notícias da Reforma Tributária — TRIBUTABR",
            description: "Feed RSS atualizado de notícias sobre a Reforma Tributária brasileira, CBS, IBS e regulamentação.",
            url: "https://tributabr.com.br/noticias",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: filteredNews.slice(0, 10).map((item, idx) => ({
                "@type": "NewsArticle",
                position: idx + 1,
                headline: item.title,
                url: item.link,
                datePublished: item.pubDate,
                publisher: {
                  "@type": "Organization",
                  name: item.source,
                },
              })),
            },
          }),
        }}
      />
    </div>
  );
}
