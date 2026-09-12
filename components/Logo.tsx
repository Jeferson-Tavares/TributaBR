import React from "react";
import Image from "next/image";

interface LogoProps {
  variant?: "full" | "icon-only" | "compact";
  className?: string;
  height?: number;
}

export function FaviconSVG({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"
    >
      {/* Background card with rounded corners */}
      <rect width="100" height="100" rx="22" fill="#F8FAFC" />
      
      {/* 4 Growth Bars (Green) */}
      <rect x="18" y="44" width="12" height="34" rx="6" fill="url(#greenGrad)" />
      <rect x="34" y="32" width="12" height="46" rx="6" fill="url(#greenGrad)" />
      <rect x="50" y="24" width="12" height="54" rx="6" fill="url(#greenGrad)" />
      <rect x="66" y="16" width="12" height="62" rx="6" fill="url(#greenGrad)" />

      {/* Golden sweeping arc */}
      <path
        d="M14 62C30 62 50 56 82 32L84 36C52 61 31 67 14 67Z"
        fill="#FFC700"
      />
      <path
        d="M14 65C30 65 50 59 84 35L85 37C51 62 30 68 14 68Z"
        fill="#FFFFFF"
      />

      {/* Blue base */}
      <path
        d="M14 66C31 66 52 60 84 36V70C84 76 79 81 73 81H25C19 81 14 76 14 70V66Z"
        fill="url(#blueGrad)"
      />

      {/* Stars in Southern Cross style */}
      <polygon points="49,66 51,71 56,71 52,74 54,79 49,76 44,79 46,74 42,71 47,71" fill="#FFFFFF" transform="scale(0.6) translate(30, 42)" />
      <polygon points="49,66 51,71 56,71 52,74 54,79 49,76 44,79 46,74 42,71 47,71" fill="#FFFFFF" transform="scale(0.55) translate(48, 52)" />
      <polygon points="49,66 51,71 56,71 52,74 54,79 49,76 44,79 46,74 42,71 47,71" fill="#FFFFFF" transform="scale(0.7) translate(50, 24)" />
      <polygon points="49,66 51,71 56,71 52,74 54,79 49,76 44,79 46,74 42,71 47,71" fill="#FFFFFF" transform="scale(0.5) translate(80, 48)" />
      <polygon points="49,66 51,71 56,71 52,74 54,79 49,76 44,79 46,74 42,71 47,71" fill="#FFFFFF" transform="scale(0.4) translate(76, 75)" />

      <defs>
        <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00A843" />
          <stop offset="100%" stopColor="#007A30" />
        </linearGradient>
        <linearGradient id="blueGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0040A8" />
          <stop offset="100%" stopColor="#002266" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function LogoIcon({ size = 44 }: { size?: number }) {
  return (
    <div
      className="relative flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <Image
        src="/icon.png"
        alt="TRIBUTABR — Ícone oficial da plataforma de Reforma Tributária Brasileira (IVA Dual e PLP 68/2024)"
        width={size}
        height={size}
        className="w-full h-full object-contain rounded-xl"
        priority
      />
    </div>
  );
}

export default function Logo({
  variant = "full",
  className = "",
  height = 46,
}: LogoProps) {
  if (variant === "icon-only") {
    return <LogoIcon size={height} />;
  }

  // Uses the official banner image uploaded by the user
  return (
    <div className={`flex items-center select-none ${className}`}>
      <div
        className="relative flex items-center justify-start"
        style={{
          height: `${height}px`,
          width: `${Math.round(height * 2.7)}px`,
        }}
      >
        <Image
          src="/logo.png"
          alt="TRIBUTABR — Logotipo oficial: Guia didático e Calculadoras da Reforma Tributária (CBS, IBS e PLP 68/2024)"
          width={Math.round(height * 2.7)}
          height={height}
          className="h-full w-auto object-contain"
          priority
        />
      </div>
    </div>
  );
}
