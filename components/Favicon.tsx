import React from "react";

export default function Favicon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"
      role="img"
      aria-label="TRIBUTABR Ícone"
    >
      {/* Fundo do card arredondado (Figma / App Icon style) */}
      <rect width="100" height="100" rx="22" fill="#FFFFFF" />
      <rect x="2" y="2" width="96" height="96" rx="20" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />

      {/* 4 Barras de Crescimento em Verde Bandeira (#009A44 / #00A843) */}
      <rect x="18" y="46" width="12" height="32" rx="5" fill="url(#favGreen)" />
      <rect x="34" y="34" width="12" height="44" rx="5" fill="url(#favGreen)" />
      <rect x="50" y="24" width="12" height="54" rx="5" fill="url(#favGreen)" />
      <rect x="66" y="16" width="12" height="62" rx="5" fill="url(#favGreen)" />

      {/* Faixa curva em Amarelo Ouro (#FFC700) */}
      <path
        d="M14 62C30 62 50 56 82 32L84 36C52 61 31 67 14 67Z"
        fill="#FFC700"
      />
      {/* Filete branco de contraste */}
      <path
        d="M14 65C30 65 50 59 84 35L85 37C51 62 30 68 14 68Z"
        fill="#FFFFFF"
      />

      {/* Base curva em Azul Real / Cobalto (#0040A8) */}
      <path
        d="M14 66C31 66 52 60 84 36V70C84 76 79 81 73 81H25C19 81 14 76 14 70V66Z"
        fill="url(#favBlue)"
      />

      {/* 5 Estrelas brancas da Bandeira Nacional */}
      <polygon points="49,66 51,71 56,71 52,74 54,79 49,76 44,79 46,74 42,71 47,71" fill="#FFFFFF" transform="scale(0.55) translate(36, 52)" />
      <polygon points="49,66 51,71 56,71 52,74 54,79 49,76 44,79 46,74 42,71 47,71" fill="#FFFFFF" transform="scale(0.5) translate(58, 62)" />
      <polygon points="49,66 51,71 56,71 52,74 54,79 49,76 44,79 46,74 42,71 47,71" fill="#FFFFFF" transform="scale(0.65) translate(56, 32)" />
      <polygon points="49,66 51,71 56,71 52,74 54,79 49,76 44,79 46,74 42,71 47,71" fill="#FFFFFF" transform="scale(0.48) translate(92, 54)" />
      <polygon points="49,66 51,71 56,71 52,74 54,79 49,76 44,79 46,74 42,71 47,71" fill="#FFFFFF" transform="scale(0.38) translate(86, 85)" />

      <defs>
        <linearGradient id="favGreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00A843" />
          <stop offset="100%" stopColor="#007A30" />
        </linearGradient>
        <linearGradient id="favBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0040A8" />
          <stop offset="100%" stopColor="#002266" />
        </linearGradient>
      </defs>
    </svg>
  );
}
