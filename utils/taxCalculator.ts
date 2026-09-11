// ============================================================
// REFORMA TRIBUTÁRIA BRASILEIRA — Calculadora de Impostos
// Lógica isolada conforme diretrizes da EC 132/2023, PLP 68/2024 e PLP 108/2024
// ============================================================

export type Sector =
  | "industria"
  | "comercio"
  | "servicos"
  | "tecnologia"
  | "saude"
  | "educacao"
  | "alimentacao"
  | "construcao";

export interface SectorRates {
  label: string;
  pis: number;       // %
  cofins: number;    // %
  ipi: number;       // %
  icms: number;      // % médio estadual (por dentro)
  iss: number;       // % (serviços)
  cbsFull: number;   // % CBS plena (2033)
  ibsFull: number;   // % IBS pleno (2033)
  isRate: number;    // % Imposto Seletivo (se aplicável)
  isGoods: boolean;  // Pode ter IS?
}

export const SECTOR_RATES: Record<Sector, SectorRates> = {
  industria: {
    label: "Indústria Geral",
    pis: 1.65, cofins: 7.6, ipi: 5.0, icms: 17.0, iss: 0,
    cbsFull: 8.8, ibsFull: 17.7, isRate: 0, isGoods: false,
  },
  comercio: {
    label: "Comércio Varejista",
    pis: 1.65, cofins: 7.6, ipi: 0, icms: 17.0, iss: 0,
    cbsFull: 8.8, ibsFull: 17.7, isRate: 0, isGoods: false,
  },
  servicos: {
    label: "Serviços em Geral",
    pis: 1.65, cofins: 7.6, ipi: 0, icms: 0, iss: 5.0,
    cbsFull: 8.8, ibsFull: 17.7, isRate: 0, isGoods: false,
  },
  tecnologia: {
    label: "Tecnologia / Software",
    pis: 1.65, cofins: 7.6, ipi: 0, icms: 0, iss: 5.0,
    cbsFull: 8.8, ibsFull: 17.7, isRate: 0, isGoods: false,
  },
  saude: {
    label: "Saúde (redução 60%)",
    pis: 1.65, cofins: 7.6, ipi: 0, icms: 12.0, iss: 2.0,
    cbsFull: 3.5, ibsFull: 7.1, isRate: 0, isGoods: false,
  },
  educacao: {
    label: "Educação (redução 60%)",
    pis: 1.65, cofins: 7.6, ipi: 0, icms: 0, iss: 3.0,
    cbsFull: 3.5, ibsFull: 7.1, isRate: 0, isGoods: false,
  },
  alimentacao: {
    label: "Alimentação Básica (isenção)",
    pis: 0.65, cofins: 3.0, ipi: 0, icms: 7.0, iss: 0,
    cbsFull: 0, ibsFull: 0, isRate: 0, isGoods: false,
  },
  construcao: {
    label: "Construção Civil",
    pis: 1.65, cofins: 7.6, ipi: 0, icms: 12.0, iss: 3.0,
    cbsFull: 8.8, ibsFull: 17.7, isRate: 0, isGoods: false,
  },
};

// -------------------------------------------------------------------
// CRONOGRAMA DE TRANSIÇÃO (2026–2033)
// -------------------------------------------------------------------
export interface TransitionYear {
  year: number;
  cbsRate: number;      // % CBS vigente
  ibsRate: number;      // % IBS vigente
  icmsMultiplier: number; // fator residual ICMS (1.0 = 100%, 0 = extinto)
  issMultiplier: number;  // fator residual ISS
  pisMultiplier: number;  // fator residual PIS
  cofinsMultiplier: number;
  ipiMultiplier: number;
  description: string;
}

export const TRANSITION_SCHEDULE: TransitionYear[] = [
  {
    year: 2026,
    cbsRate: 0.9, ibsRate: 0.1,
    icmsMultiplier: 1.0, issMultiplier: 1.0,
    pisMultiplier: 1.0, cofinsMultiplier: 1.0, ipiMultiplier: 1.0,
    description: "Fase de teste: CBS 0,9% e IBS 0,1% (compensados no PIS/Cofins). Sistemas antigos em plena vigência.",
  },
  {
    year: 2027,
    cbsRate: 8.8, ibsRate: 0,
    icmsMultiplier: 1.0, issMultiplier: 1.0,
    pisMultiplier: 0, cofinsMultiplier: 0, ipiMultiplier: 0,
    description: "CBS entra em vigor plena. PIS, Cofins e IPI extintos. ICMS e ISS permanecem.",
  },
  {
    year: 2028,
    cbsRate: 8.8, ibsRate: 0,
    icmsMultiplier: 1.0, issMultiplier: 1.0,
    pisMultiplier: 0, cofinsMultiplier: 0, ipiMultiplier: 0,
    description: "Ano de preparação do IBS. CBS plena, ICMS/ISS intactos.",
  },
  {
    year: 2029,
    cbsRate: 8.8, ibsRate: 4.95,
    icmsMultiplier: 0.9, issMultiplier: 0.9,
    pisMultiplier: 0, cofinsMultiplier: 0, ipiMultiplier: 0,
    description: "IBS inicia. ICMS e ISS reduzidos a 90%.",
  },
  {
    year: 2030,
    cbsRate: 8.8, ibsRate: 9.9,
    icmsMultiplier: 0.8, issMultiplier: 0.8,
    pisMultiplier: 0, cofinsMultiplier: 0, ipiMultiplier: 0,
    description: "ICMS e ISS reduzidos a 80%. IBS cresce proporcionalmente.",
  },
  {
    year: 2031,
    cbsRate: 8.8, ibsRate: 13.275,
    icmsMultiplier: 0.7, issMultiplier: 0.7,
    pisMultiplier: 0, cofinsMultiplier: 0, ipiMultiplier: 0,
    description: "ICMS e ISS a 70%. Convergência acelerada.",
  },
  {
    year: 2032,
    cbsRate: 8.8, ibsRate: 15.93,
    icmsMultiplier: 0.6, issMultiplier: 0.6,
    pisMultiplier: 0, cofinsMultiplier: 0, ipiMultiplier: 0,
    description: "ICMS e ISS a 60%. Quase convergência total.",
  },
  {
    year: 2033,
    cbsRate: 8.8, ibsRate: 17.7,
    icmsMultiplier: 0, issMultiplier: 0,
    pisMultiplier: 0, cofinsMultiplier: 0, ipiMultiplier: 0,
    description: "IVA Dual em plena vigência. ICMS e ISS extintos. CBS + IBS = alíquota final.",
  },
];

// -------------------------------------------------------------------
// INTERFACES DE RESULTADO
// -------------------------------------------------------------------
export interface OldSystemResult {
  pis: number;
  cofins: number;
  ipi: number;
  icms: number;
  iss: number;
  totalTax: number;
  netPrice: number;         // preço líquido (sem impostos)
  grossPrice: number;       // preço ao consumidor (com impostos)
  effectiveRate: number;    // alíquota efetiva sobre o preço líquido
}

export interface NewSystemResult {
  cbs: number;
  ibs: number;
  is: number;               // Imposto Seletivo
  creditCbs: number;        // crédito CBS das compras
  creditIbs: number;        // crédito IBS das compras
  netCbs: number;           // CBS devida (débito - crédito)
  netIbs: number;           // IBS devida
  totalTax: number;
  effectiveRate: number;
}

export interface TransitionResult {
  year: number;
  pis: number;
  cofins: number;
  ipi: number;
  icms: number;
  iss: number;
  cbs: number;
  ibs: number;
  is: number;
  totalTax: number;
  effectiveRate: number;
}

// -------------------------------------------------------------------
// CÁLCULO SISTEMA ANTIGO
// "Imposto por dentro": alíquota incide sobre valor que já inclui imposto
// Para ICMS: preço_consumidor = preço_líquido / (1 - alíquota_icms)
// -------------------------------------------------------------------
export function calcOldSystem(
  salePrice: number,    // valor informado pelo usuário (preço ao consumidor final)
  sector: Sector
): OldSystemResult {
  const rates = SECTOR_RATES[sector];
  const hasICMS = rates.icms > 0;
  const hasISS = rates.iss > 0;

  // ICMS é "por dentro": preço ao consumidor já inclui ICMS
  // preço_sem_icms = preço_com_icms * (1 - alíquota_icms)
  const icmsAliq = rates.icms / 100;
  const issAliq = rates.iss / 100;
  const pisAliq = rates.pis / 100;
  const cofinsAliq = rates.cofins / 100;
  const ipiAliq = rates.ipi / 100;

  // Valor do ICMS embutido (por dentro)
  const icmsValue = hasICMS ? salePrice * icmsAliq : 0;
  const issValue = hasISS ? salePrice * issAliq : 0;

  // Base para PIS/Cofins/IPI = salePrice (em cascata, incidem sobre o total)
  const pisValue = salePrice * pisAliq;
  const cofinsValue = salePrice * cofinsAliq;
  const ipiValue = salePrice * ipiAliq;

  const totalTax = pisValue + cofinsValue + ipiValue + icmsValue + issValue;
  const netPrice = salePrice - icmsValue - issValue; // base sem ICMS/ISS
  const effectiveRate = salePrice > 0 ? (totalTax / salePrice) * 100 : 0;

  return {
    pis: pisValue,
    cofins: cofinsValue,
    ipi: ipiValue,
    icms: icmsValue,
    iss: issValue,
    totalTax,
    netPrice,
    grossPrice: salePrice,
    effectiveRate,
  };
}

// -------------------------------------------------------------------
// CÁLCULO NOVO SISTEMA (IVA Dual — "por fora")
// Imposto por fora: tributo NÃO integra a própria base
// CBS_devida = (salePrice * cbsRate) - (purchaseValue * cbsRate)
// -------------------------------------------------------------------
export function calcNewSystem(
  salePrice: number,
  purchaseValue: number,   // valor das compras/insumos (base de crédito)
  sector: Sector,
  year: number,
  hasIS: boolean,
  isRate: number = 10,     // % IS informado pelo usuário
  customIvaRate: number = 26.5 // % Alíquota de referência configurável (padrão 26.5%)
): NewSystemResult {
  const rates = SECTOR_RATES[sector];
  const schedule = TRANSITION_SCHEDULE.find((t) => t.year === year) || TRANSITION_SCHEDULE[TRANSITION_SCHEDULE.length - 1];

  // Proporção padrão da referência (26.5% = 8.8% CBS + 17.7% IBS)
  // CBS ratio: 8.8 / 26.5 ≈ 0.33207547
  // IBS ratio: 17.7 / 26.5 ≈ 0.66792452
  const cbsRatio = 8.8 / 26.5;
  const ibsRatio = 17.7 / 26.5;

  let nominalCbsRate = schedule.cbsRate;
  let nominalIbsRate = schedule.ibsRate;

  // Se o setor tem redução (ex: saúde e educação têm redução de 60%, alíquota é 40% do padrão)
  // Ou isenção (alimentação básica = 0%)
  if (rates.cbsFull === 0 && rates.ibsFull === 0) {
    nominalCbsRate = 0;
    nominalIbsRate = 0;
  } else if (rates.cbsFull < 8.8) {
    // Redução de 60% (paga 40%)
    const factor = rates.cbsFull / 8.8; // ex: 3.5 / 8.8 = 0.4
    const baseCbs = customIvaRate * cbsRatio;
    const baseIbs = customIvaRate * ibsRatio;
    // No ano selecionado, escala conforme o cronograma
    nominalCbsRate = (schedule.cbsRate / 8.8) * (baseCbs * factor);
    nominalIbsRate = schedule.ibsRate > 0 ? (schedule.ibsRate / 17.7) * (baseIbs * factor) : 0;
  } else {
    // Alíquota plena proporcional
    const baseCbs = customIvaRate * cbsRatio;
    const baseIbs = customIvaRate * ibsRatio;
    nominalCbsRate = (schedule.cbsRate / 8.8) * baseCbs;
    nominalIbsRate = schedule.ibsRate > 0 ? (schedule.ibsRate / 17.7) * baseIbs : 0;
  }

  const cbsAliq = nominalCbsRate / 100;
  const ibsAliq = nominalIbsRate / 100;
  const isAliq = hasIS ? isRate / 100 : 0;

  // CBS e IBS incidem sobre o preço de venda (por fora)
  const cbsDebit = salePrice * cbsAliq;
  const ibsDebit = salePrice * ibsAliq;

  // Créditos das compras
  const creditCbs = purchaseValue * cbsAliq;
  const creditIbs = purchaseValue * ibsAliq;

  // CBS e IBS líquidos (débito - crédito)
  const netCbs = Math.max(0, cbsDebit - creditCbs);
  const netIbs = Math.max(0, ibsDebit - creditIbs);

  // Imposto Seletivo (não tem crédito nas fases seguintes)
  const isValue = salePrice * isAliq;

  const totalTax = netCbs + netIbs + isValue;
  const effectiveRate = salePrice > 0 ? (totalTax / salePrice) * 100 : 0;

  return {
    cbs: cbsDebit,
    ibs: ibsDebit,
    is: isValue,
    creditCbs,
    creditIbs,
    netCbs,
    netIbs,
    totalTax,
    effectiveRate,
  };
}

// -------------------------------------------------------------------
// CÁLCULO DA TRANSIÇÃO (por ano)
// -------------------------------------------------------------------
export function calcTransitionYear(
  salePrice: number,
  purchaseValue: number,
  sector: Sector,
  year: number,
  hasIS: boolean,
  isRate: number = 10,
  customIvaRate: number = 26.5
): TransitionResult {
  const rates = SECTOR_RATES[sector];
  const schedule = TRANSITION_SCHEDULE.find((t) => t.year === year)!;

  const pisAliq = rates.pis / 100;
  const cofinsAliq = rates.cofins / 100;
  const ipiAliq = rates.ipi / 100;
  const icmsAliq = rates.icms / 100;
  const issAliq = rates.iss / 100;

  // CBS e IBS dinâmicos proporcionais ao customIvaRate
  const cbsRatio = 8.8 / 26.5;
  const ibsRatio = 17.7 / 26.5;
  let nominalCbsRate = schedule.cbsRate;
  let nominalIbsRate = schedule.ibsRate;

  if (rates.cbsFull === 0 && rates.ibsFull === 0) {
    nominalCbsRate = 0;
    nominalIbsRate = 0;
  } else if (rates.cbsFull < 8.8) {
    const factor = rates.cbsFull / 8.8;
    const baseCbs = customIvaRate * cbsRatio;
    const baseIbs = customIvaRate * ibsRatio;
    nominalCbsRate = (schedule.cbsRate / 8.8) * (baseCbs * factor);
    nominalIbsRate = schedule.ibsRate > 0 ? (schedule.ibsRate / 17.7) * (baseIbs * factor) : 0;
  } else {
    const baseCbs = customIvaRate * cbsRatio;
    const baseIbs = customIvaRate * ibsRatio;
    nominalCbsRate = (schedule.cbsRate / 8.8) * baseCbs;
    nominalIbsRate = schedule.ibsRate > 0 ? (schedule.ibsRate / 17.7) * baseIbs : 0;
  }

  const cbsAliq = nominalCbsRate / 100;
  const ibsAliq = nominalIbsRate / 100;
  const isAliq = hasIS ? isRate / 100 : 0;

  // Impostos antigos com multiplicadores de transição
  const pisValue = salePrice * pisAliq * schedule.pisMultiplier;
  const cofinsValue = salePrice * cofinsAliq * schedule.cofinsMultiplier;
  const ipiValue = salePrice * ipiAliq * schedule.ipiMultiplier;
  const icmsValue = salePrice * icmsAliq * schedule.icmsMultiplier;
  const issValue = salePrice * issAliq * schedule.issMultiplier;

  // Novos impostos (CBS com crédito)
  const cbsNet = Math.max(0, (salePrice * cbsAliq) - (purchaseValue * cbsAliq));
  const ibsNet = Math.max(0, (salePrice * ibsAliq) - (purchaseValue * ibsAliq));
  const isValue = salePrice * isAliq;

  // Em 2026, CBS e IBS são compensados no PIS/Cofins (não somam, substituem parcialmente)
  let totalTax: number;
  if (year === 2026) {
    // Compensação: PIS/Cofins reduzidos pelo CBS simbólico
    const pisCompensado = Math.max(0, pisValue - cbsNet);
    const cofinsCompensado = Math.max(0, cofinsValue);
    totalTax = pisCompensado + cofinsCompensado + ipiValue + icmsValue + issValue + cbsNet + ibsNet + isValue;
  } else {
    totalTax = pisValue + cofinsValue + ipiValue + icmsValue + issValue + cbsNet + ibsNet + isValue;
  }

  const effectiveRate = salePrice > 0 ? (totalTax / salePrice) * 100 : 0;

  return {
    year,
    pis: pisValue,
    cofins: cofinsValue,
    ipi: ipiValue,
    icms: icmsValue,
    iss: issValue,
    cbs: cbsNet,
    ibs: ibsNet,
    is: isValue,
    totalTax,
    effectiveRate,
  };
}

// -------------------------------------------------------------------
// MÓDULO 2: SIMULADOR DE MULTAS (DIRETRIZES PLP 108/2024)
// -------------------------------------------------------------------
export type PenaltyType = "standard" | "fraud" | "recurrence";
export type PaymentMoment = "impugnacao" | "pre_divida";
export type PaymentForm = "integral" | "parcelamento";

export interface PenaltyResult {
  basePenalty: number;
  cappedPenalty: number;
  capRate: number;
  discountRate: number;
  bonusDiscountRate: number;
  finalPenalty: number;
  finalPenaltyBonus: number;
  totalDebt: number;
  totalDebtBonus: number;
  savings: number;
  savingsBonus: number;
}

const PENALTY_CAPS: Record<PenaltyType, number> = {
  standard: 0.75,
  fraud: 1.0,
  recurrence: 1.5,
};

// Descontos por forma de regularização
const DISCOUNT_TABLE: Record<PaymentMoment, Record<PaymentForm, { standard: number; bonus: number }>> = {
  impugnacao: {
    integral: { standard: 0.50, bonus: 0.60 },
    parcelamento: { standard: 0.40, bonus: 0.50 },
  },
  pre_divida: {
    integral: { standard: 0.30, bonus: 0.40 },
    parcelamento: { standard: 0.20, bonus: 0.30 },
  },
};

export function calcPenalty(
  tributeValue: number,
  basePenaltyRate: number,    // % informada pelo usuário
  penaltyType: PenaltyType,
  paymentMoment: PaymentMoment,
  paymentForm: PaymentForm
): PenaltyResult {
  const capRate = PENALTY_CAPS[penaltyType];
  const actualRate = Math.min(basePenaltyRate / 100, capRate);

  const basePenalty = tributeValue * (basePenaltyRate / 100);
  const cappedPenalty = tributeValue * actualRate;

  const discounts = DISCOUNT_TABLE[paymentMoment][paymentForm];
  const discountRate = discounts.standard;
  const bonusDiscountRate = discounts.bonus;

  const finalPenalty = cappedPenalty * (1 - discountRate);
  const finalPenaltyBonus = cappedPenalty * (1 - bonusDiscountRate);

  const totalDebt = tributeValue + finalPenalty;
  const totalDebtBonus = tributeValue + finalPenaltyBonus;

  const savings = cappedPenalty - finalPenalty;
  const savingsBonus = cappedPenalty - finalPenaltyBonus;

  return {
    basePenalty,
    cappedPenalty,
    capRate,
    discountRate,
    bonusDiscountRate,
    finalPenalty,
    finalPenaltyBonus,
    totalDebt,
    totalDebtBonus,
    savings,
    savingsBonus,
  };
}

// -------------------------------------------------------------------
// UTILITÁRIOS
// -------------------------------------------------------------------
export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(2).replace(".", ",")}%`;
}

// Gera série de dados para o gráfico de transição (2026–2033)
export interface ChartDataPoint {
  year: number;
  label: string;
  "Sistema Antigo": number;
  PIS: number;
  COFINS: number;
  IPI: number;
  ICMS: number;
  ISS: number;
  CBS: number;
  IBS: number;
  IS: number;
  total: number;
}

export function generateChartData(
  salePrice: number,
  purchaseValue: number,
  sector: Sector,
  hasIS: boolean,
  isRate: number,
  customIvaRate: number = 26.5
): ChartDataPoint[] {
  const oldResult = calcOldSystem(salePrice, sector);

  return TRANSITION_SCHEDULE.map((schedule) => {
    const t = calcTransitionYear(salePrice, purchaseValue, sector, schedule.year, hasIS, isRate, customIvaRate);
    return {
      year: schedule.year,
      label: String(schedule.year),
      "Sistema Antigo": oldResult.totalTax,
      PIS: t.pis,
      COFINS: t.cofins,
      IPI: t.ipi,
      ICMS: t.icms,
      ISS: t.iss,
      CBS: t.cbs,
      IBS: t.ibs,
      IS: t.is,
      total: t.totalTax,
    };
  });
}
