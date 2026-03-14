import React from 'react';
import { SOLUTION_PARTNERS } from '@kepenk/config/partners';
import Image from 'next/image';

export function PartnersSection() {
    return (
        <section className="w-full bg-[#0a0a0f] py-16 overflow-hidden">
            <div className="max-w-[1280px] mx-auto px-6 mb-8">
                <p className="text-center text-sm font-medium text-slate-400 uppercase tracking-widest">
                    Güvenilir teknoloji altyapısı
                </p>
            </div>

            {/* CSS-based Infinite Marquee Track */}
            <div className="relative w-full flex flex-col gap-8 group">
                
                {/* Solma efektleri (Edges) */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none" />

                {/* Üst Sıra (Sağa Kayar) */}
                <div className="flex w-max animate-marquee-right hover:[animation-play-state:paused]">
                    {[...SOLUTION_PARTNERS, ...SOLUTION_PARTNERS].map((p, i) => (
                        <div key={`${p.id}-${i}-top`} className="group/logo relative flex items-center justify-center w-48 h-20 mx-4 bg-white/5 rounded-2xl border border-white/10 transition-colors hover:bg-white/10">
                            {/* Gerçek logolar elimizde olmadığı için geçici metin, normalde Image componenti kullanılır */}
                            <span className="text-slate-500 font-bold opacity-50 transition-opacity group-hover/logo:opacity-100">{p.name}</span>
                            
                            {/* Tooltip Badge */}
                            {p.badge && (
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/logo:opacity-100 transition-opacity whitespace-nowrap bg-[#7c3aed] text-white text-[10px] uppercase font-bold px-2 py-1 rounded">
                                    {p.badge}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Alt Sıra (Sola Kayar) */}
                <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused] -ml-[250px] md:-ml-[400px]">
                    {[...SOLUTION_PARTNERS.slice(4), ...SOLUTION_PARTNERS.slice(0, 4), ...SOLUTION_PARTNERS.slice(4), ...SOLUTION_PARTNERS.slice(0, 4)].map((p, i) => (
                        <div key={`${p.id}-${i}-bottom`} className="group/logo relative flex items-center justify-center w-48 h-20 mx-4 bg-white/5 rounded-2xl border border-white/10 transition-colors hover:bg-white/10">
                            <span className="text-slate-500 font-bold opacity-50 transition-opacity group-hover/logo:opacity-100">{p.name}</span>
                            {p.badge && (
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/logo:opacity-100 transition-opacity whitespace-nowrap bg-[#7c3aed] text-white text-[10px] uppercase font-bold px-2 py-1 rounded">
                                    {p.badge}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>

            {/* Tailwind Animasyon Config'inin app/globals.css'te olması gerekir */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee-right {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                @keyframes marquee-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee-right {
                    animation: marquee-right 40s linear infinite;
                }
                .animate-marquee-left {
                    animation: marquee-left 40s linear infinite;
                }
            `}} />
        </section>
    );
}
