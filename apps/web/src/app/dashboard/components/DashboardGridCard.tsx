import React from 'react';
import Link from 'next/link';

export function DashboardGridCard({ 
    title, 
    description, 
    icon, 
    href, 
    locked = false,
    lockMessage = 'Bu özellik paketinizde bulunmuyor.',
    ctaText = 'Yönet'
}: { 
    title: string; 
    description: string; 
    icon: string; 
    href: string; 
    locked?: boolean;
    lockMessage?: string;
    ctaText?: string;
}) {
    return (
        <div className={`relative flex flex-col p-6 rounded-2xl border transition-all duration-300 backdrop-blur-md ${locked ? 'bg-white/5 border-white/5 grayscale pointer-events-none opacity-50' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-rust/30 hover:-translate-y-2 hover:shadow-[0_15px_30px_-5px_rgba(220,70,30,0.15)] group'}`}>
            
            <div className="flex items-center justify-between mb-4">
                <span className="text-3xl bg-white/5 border border-white/10 w-12 h-12 rounded-xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform drop-shadow-md">
                    {icon}
                </span>
                {locked && (
                    <span className="text-[10px] font-bold text-white/50 bg-black/40 border border-white/10 px-2 py-1 rounded-full">
                        KİLİTLİ
                    </span>
                )}
            </div>
            
            <h3 className="text-lg font-syne font-bold text-white mb-2 group-hover:text-rust-light transition-colors">{title}</h3>
            <p className="text-sm text-white/60 mb-6 flex-1 font-medium group-hover:text-white/80 transition-colors">{description}</p>
            
            {locked ? (
                <div className="text-[11px] font-semibold text-white/40 mt-auto pointer-events-auto flex items-center gap-1.5 bg-black/20 p-2 rounded-lg border border-white/5">
                    <span>🔒</span> {lockMessage}
                    <Link href="/dashboard/paket-yukselt" className="text-rust hover:text-rust-light hover:underline ml-auto font-bold px-2 py-1 bg-white/5 rounded transition-colors">
                        Yükselt
                    </Link>
                </div>
            ) : (
                <Link href={href} className="text-sm font-bold text-rust hover:text-rust-light transition-colors mt-auto inline-flex items-center gap-1 group/btn">
                    {ctaText} 
                    <span className="group-hover/btn:translate-x-1.5 transition-transform">→</span>
                </Link>
            )}
        </div>
    );
}
