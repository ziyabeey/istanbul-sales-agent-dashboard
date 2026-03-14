"use client";

import React from "react";
import { SOLUTION_PARTNERS } from "@/data/partners";

/**
 * PartnersSection — Çözüm Ortakları Marquee
 * Sonsuz CSS kaydırma, iki sıra (zıt yön), hover'da duraklatma
 */
export default function PartnersSection() {
  const topRow = SOLUTION_PARTNERS;
  const bottomRow = [...SOLUTION_PARTNERS.slice(4), ...SOLUTION_PARTNERS.slice(0, 4)];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <p className="text-center text-xs font-bold tracking-[.25em] uppercase text-white/50">
          Güvenilir Teknoloji Altyapısı
        </p>
      </div>

      {/* Marquee Container */}
      <div className="space-y-6 group">
        {/* Row 1 — sağa */}
        <div className="ps-marquee-track">
          <div className="ps-marquee-row ps-marquee-right group-hover:[animation-play-state:paused]">
            {[...topRow, ...topRow, ...topRow].map((p, i) => (
              <PartnerLogo key={`t-${p.id}-${i}`} partner={p} />
            ))}
          </div>
        </div>

        {/* Row 2 — sola */}
        <div className="ps-marquee-track">
          <div className="ps-marquee-row ps-marquee-left group-hover:[animation-play-state:paused]">
            {[...bottomRow, ...bottomRow, ...bottomRow].map((p, i) => (
              <PartnerLogo key={`b-${p.id}-${i}`} partner={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0a0f] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0a0f] to-transparent pointer-events-none z-10" />

      <style jsx>{`
        .ps-marquee-track {
          overflow: hidden;
          width: 100%;
        }
        .ps-marquee-row {
          display: flex;
          gap: 40px;
          width: max-content;
        }
        .ps-marquee-right {
          animation: ps-scroll-right 50s linear infinite;
        }
        .ps-marquee-left {
          animation: ps-scroll-left 55s linear infinite;
        }
        @keyframes ps-scroll-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes ps-scroll-left {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}

function PartnerLogo({ partner }: { partner: typeof SOLUTION_PARTNERS[number] }) {
  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex flex-col items-center gap-2 px-6 py-4 rounded-xl hover:bg-white/5 transition-all duration-300 group/logo shrink-0"
      title={partner.badge ? `${partner.name} — ${partner.badge}` : partner.name}
    >
      {/* Logo placeholder — gerçek SVG'ler eklenene kadar metin logosu */}
      <div className="h-10 flex items-center justify-center opacity-60 grayscale group-hover/logo:opacity-100 group-hover/logo:grayscale-0 transition-all duration-300">
        <span className="text-white font-bold text-lg tracking-tight whitespace-nowrap">
          {partner.name}
        </span>
      </div>

      {/* Badge tooltip (hover'da) */}
      {partner.badge && (
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-200 text-[10px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full px-2 py-0.5 whitespace-nowrap">
          {partner.badge}
        </span>
      )}
    </a>
  );
}
