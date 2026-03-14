import React from 'react';
import Link from 'next/link';

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
            {/* Minimal Onboarding Header */}
            <header className="h-20 border-b border-white/5 flex items-center justify-between px-6 bg-background/40 backdrop-blur-xl sticky top-0 z-50 shadow-2xl shadow-black/50">
                <Link href="/" className="flex items-center gap-2 cursor-pointer group">
                    <span className="font-syne font-extrabold text-xl tracking-tight">
                        <span className="text-rust">K</span>
                        <span className="text-white group-hover:text-white/80 transition-colors">EPENK</span>
                    </span>
                    <span className="hidden sm:inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-bold bg-rust/20 text-rust border border-rust/30">
                        AI
                    </span>
                </Link>
                <div className="text-sm font-medium text-slate-400">
                    Kurulum Sihirbazı
                </div>
            </header>
            
            <main className="flex-1 flex flex-col items-center py-12 px-6">
                <div className="w-full max-w-3xl">
                    {children}
                </div>
            </main>
        </div>
    );
}
