"use client";

import React from "react";
import { SOLUTION_PARTNERS } from "@/data/partners";

/**
 * PartnersSection — Ince Çözüm Ortakları Marquee
 * Header altında, tek sıra, kompakt, koyu arka plan ile uyumlu
 */
export default function PartnersSection() {
  const partners = SOLUTION_PARTNERS;

  return (
    <section className="py-4 relative overflow-hidden bg-white">
      {/* Tek satır Marquee */}
      <div className="group">
        <div className="ps-marquee-track">
          <div className="ps-marquee-row ps-marquee-right group-hover:[animation-play-state:paused]">
            {[...partners, ...partners, ...partners, ...partners].map((p, i) => (
              <a
                key={`p-${p.id}-${i}`}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-1.5 shrink-0 opacity-50 hover:opacity-80 transition-opacity duration-300"
                title={p.name}
              >
                <span className="text-foreground/90 font-semibold text-xs tracking-tight whitespace-nowrap">
                  {p.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Edge fades — koyu arka plana uyumlu */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />

      <style jsx>{`
        .ps-marquee-track {
          overflow: hidden;
          width: 100%;
        }
        .ps-marquee-row {
          display: flex;
          gap: 12px;
          width: max-content;
        }
        .ps-marquee-right {
          animation: ps-scroll-right 40s linear infinite;
        }
        @keyframes ps-scroll-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
      `}</style>
    </section>
  );
}
