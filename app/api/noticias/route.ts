import { NextResponse } from "next/server";
import Parser from "rss-parser";

export interface NewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  source: string;
  tags: string[];
  imageUrl?: string;
}

interface FeedConfig {
  name: string;
  url: string;
  defaultImage: string;
}

const RSS_SOURCES: FeedConfig[] = [
  {
    name: "G1 Economia",
    url: "https://g1.globo.com/rss/g1/economia/",
    defaultImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Agência Brasil",
    url: "https://agenciabrasil.ebc.com.br/rss/economia/feed.xml",
    defaultImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Folha de S.Paulo",
    url: "https://feeds.folha.uol.com.br/mercado/rss091.xml",
    defaultImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "InfoMoney",
    url: "https://www.infomoney.com.br/feed/",
    defaultImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Portal Contábeis",
    url: "https://www.contabeis.com.br/rss/noticias/",
    defaultImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80",
  },
];

// Fallback curado especializado em Reforma Tributária
const FALLBACK_NEWS: NewsItem[] = [
  {
    id: "fb-1",
    title: "PLP 108/2024 avança no Congresso e estabelece diretrizes para o contencioso do IBS e CBS",
    link: "https://g1.globo.com/economia/",
    pubDate: "2026-09-08T10:00:00Z",
    contentSnippet: "O projeto de lei complementar define a estrutura do Comitê Gestor do IBS, a dosimetria de penalidades tributárias e a padronização de prazos recursais em dias úteis.",
    source: "G1 Economia",
    tags: ["PLP 108/2024", "PAF", "Comitê Gestor"],
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "fb-2",
    title: "Comitê Gestor do IBS avança na padronização nacional da cobrança no destino",
    link: "https://www.contabeis.com.br",
    pubDate: "2026-09-07T14:30:00Z",
    contentSnippet: "Estados e municípios definem regras integradas para a arrecadação do Imposto sobre Bens e Serviços (IBS), eliminando definitivamente os conflitos de competência federativa.",
    source: "Portal Contábeis",
    tags: ["IBS", "Comitê Gestor", "Transição"],
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "fb-3",
    title: "Receita Federal publica instruções técnicas para a fase teste da CBS em 2026",
    link: "https://agenciabrasil.ebc.com.br/economia",
    pubDate: "2026-09-06T11:15:00Z",
    contentSnippet: "A alíquota simbólica de 0,9% de CBS e 0,1% de IBS será compensada integralmente nas contribuições de PIS/Cofins, sem gerar aumento de custo operacional para as empresas.",
    source: "Agência Brasil",
    tags: ["CBS", "Receita Federal", "2026"],
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "fb-4",
    title: "Simples Nacional na Reforma Tributária: como fica a transferência de créditos?",
    link: "https://www1.folha.uol.com.br/mercado/",
    pubDate: "2026-09-05T09:40:00Z",
    contentSnippet: "Micro e pequenas empresas mantêm o regime simplificado do Simples Nacional com a opção de transferir créditos de CBS e IBS nas vendas para pessoas jurídicas.",
    source: "Folha de S.Paulo",
    tags: ["Simples Nacional", "Crédito", "CBS", "IBS"],
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "fb-5",
    title: "Cesta Básica Nacional e Cashback: regulamentação protege famílias de baixa renda",
    link: "https://g1.globo.com/economia/",
    pubDate: "2026-09-04T16:20:00Z",
    contentSnippet: "Itens essenciais terão alíquota zero de CBS e IBS, enquanto famílias inscritas no CadÚnico terão devolução imediata de tributos sobre gás de cozinha e energia elétrica.",
    source: "G1 Economia",
    tags: ["Cashback", "Cesta Básica", "IBS"],
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "fb-6",
    title: "Não-cumulatividade plena: indústrias preparam sistemas para crédito ágil de insumos",
    link: "https://www.infomoney.com.br",
    pubDate: "2026-09-03T18:00:00Z",
    contentSnippet: "Fim do acúmulo histórico de créditos tributários no ICMS estimula investimentos industriais em maquinário e modernização tecnológica com ressarcimento garantido.",
    source: "InfoMoney",
    tags: ["Indústria", "Crédito", "CBS"],
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80",
  },
];

// Termos relevantes para identificar e priorizar matérias tributárias e econômicas
const TAX_KEYWORDS = [
  "tribut", "impost", "reforma", "ibs", "cbs", "receita federal", "fazenda", 
  "fisco", "alíquota", "aliquota", "icms", "iss", "pis", "cofins", "plp 68", "plp 108",
  "simples nacional", "arrecada", "contribu", "crédito", "credito", "cashback",
  "cesta básica", "comitê gestor", "comite gestor", "fiscal", "gastos", "orçamento"
];

function extractImage(item: any, fallback: string): string {
  if (item.enclosure?.url) return item.enclosure.url;
  if (item["media:thumbnail"]?.$?.url) return item["media:thumbnail"].$.url;
  if (item["media:content"]?.$?.url) return item["media:content"].$.url;

  const html = item.content || item["content:encoded"] || "";
  const match = html.match(/src=["']([^"']+\.(?:jpg|jpeg|png|webp|gif)[^"']*)["']/i) ||
                html.match(/src=["'](https?:\/\/[^"']+)["']/i);
  if (match && match[1]) {
    return match[1];
  }

  return fallback;
}

function cleanSnippet(raw: string): string {
  if (!raw) return "";
  const cleaned = raw.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  if (cleaned.length > 200) {
    return cleaned.substring(0, 200) + "...";
  }
  return cleaned;
}

function assignTags(title: string, text: string): string[] {
  const tags: string[] = [];
  const combined = (title + " " + text).toLowerCase();

  if (combined.includes("ibs")) tags.push("IBS");
  if (combined.includes("cbs")) tags.push("CBS");
  if (combined.includes("108") || combined.includes("multa") || combined.includes("paf")) tags.push("PLP 108/2024");
  if (combined.includes("68") || combined.includes("regulamenta")) tags.push("PLP 68/2024");
  if (combined.includes("simples nacional") || combined.includes("pequenas empresas")) tags.push("Simples Nacional");
  if (combined.includes("crédito") || combined.includes("credito")) tags.push("Crédito");
  if (combined.includes("transição") || combined.includes("transicao") || combined.includes("2026") || combined.includes("2033")) tags.push("Transição");
  if (combined.includes("reforma")) tags.push("Reforma Tributária");
  if (combined.includes("receita federal") || combined.includes("fisco")) tags.push("Fisco");

  if (tags.length === 0) tags.push("Economia");
  return Array.from(new Set(tags)).slice(0, 3);
}

export async function GET() {
  const parser = new Parser({
    timeout: 5000,
  });

  const allItems: NewsItem[] = [];
  const successfulSources: string[] = [];

  const promises = RSS_SOURCES.map(async (source) => {
    try {
      const res = await fetch(source.url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          Accept: "application/rss+xml, application/xml, text/xml, */*",
        },
        signal: AbortSignal.timeout(6000),
      });

      if (!res.ok) return;

      const buffer = await res.arrayBuffer();
      const encoding = source.url.includes("folha") ? "iso-8859-1" : "utf-8";
      const decoder = new TextDecoder(encoding);
      const xmlText = decoder.decode(buffer);
      const feed = await parser.parseString(xmlText);

      if (feed && feed.items && feed.items.length > 0) {
        successfulSources.push(source.name);

        feed.items.forEach((item, idx) => {
          const title = (item.title || "").trim();
          if (!title) return;

          const rawText = item.contentSnippet || item.content || item.summary || "";
          const text = cleanSnippet(rawText);
          const combined = (title + " " + text).toLowerCase();

          const isTaxRelated = TAX_KEYWORDS.some((k) => combined.includes(k));

          if (isTaxRelated || source.name === "Portal Contábeis") {
            allItems.push({
              id: item.guid || item.link || `${source.name}-${idx}-${Date.now()}`,
              title,
              link: item.link || "https://g1.globo.com/economia/",
              pubDate: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
              contentSnippet: text || "Acompanhe os detalhes da cobertura econômica e tributária na matéria completa.",
              source: source.name,
              tags: assignTags(title, text),
              imageUrl: extractImage(item, source.defaultImage),
            });
          }
        });
      }
    } catch (e: any) {
      console.warn(`[TributaBR RSS] Erro ao carregar feed de ${source.name}:`, e.message);
    }
  });

  await Promise.allSettled(promises);

  if (allItems.length > 0) {
    const uniqueItemsMap = new Map<string, NewsItem>();
    
    allItems.forEach((it) => {
      const key = it.title.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 40);
      if (!uniqueItemsMap.has(key)) {
        uniqueItemsMap.set(key, it);
      }
    });

    if (uniqueItemsMap.size < 6) {
      FALLBACK_NEWS.forEach((fb) => {
        const key = fb.title.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 40);
        if (!uniqueItemsMap.has(key)) {
          uniqueItemsMap.set(key, fb);
        }
      });
    }

    const sortedList = Array.from(uniqueItemsMap.values())
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
      .slice(0, 24);

    return NextResponse.json({
      success: true,
      source: "live_multi_rss",
      activeSources: successfulSources,
      items: sortedList,
    });
  }

  return NextResponse.json({
    success: true,
    source: "curated_fallback",
    activeSources: ["Acervo TributaBR"],
    items: FALLBACK_NEWS,
  });
}
