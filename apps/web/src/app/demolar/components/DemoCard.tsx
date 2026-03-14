'use client';

import React, { useState, useEffect, useRef } from 'react';

interface DemoCardProps {
    sektorName: string;
    demoSlug: string;
    emoji: string;
    type?: 'HTML' | 'Next.js';
}

export function DemoCard({ sektorName, demoSlug, emoji, type = 'HTML' }: DemoCardProps) {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // postMessage bridge: iframe içinden gelen lead form verilerini API'ye ilet
    useEffect(() => {
        function handleMessage(e: MessageEvent) {
            if (e.data?.type === 'demo-lead' && e.data?.payload) {
                fetch('/api/lead/demo-form', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(e.data.payload),
                }).catch(() => {});
            }
        }
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const demoUrl = `https://kepenksites.com/demo/${demoSlug}`; // Mock demo URL

    return (
        <div ref={cardRef} className="group relative rounded-2xl border border-white/10 bg-[#11111a] overflow-hidden flex flex-col hover:border-[#7c3aed]/50 hover:shadow-2xl hover:shadow-[#7c3aed]/10 transition-all duration-300">
            
            {/* Top Bar (Browser Mockup) */}
            <div className="h-8 bg-black/50 border-b border-white/10 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 text-center">
                    <div className="bg-white/5 rounded mx-auto w-32 h-4" />
                </div>
            </div>

            {/* Iframe Container with Scale Trick */}
            <div className="relative w-full aspect-[4/3] bg-slate-900 border-b border-white/5 overflow-hidden">
                {isVisible ? (
                    <div className="absolute top-0 left-0 w-[400%] h-[400%] origin-top-left scale-25 pointer-events-none">
                        <iframe 
                            src={demoUrl} 
                            className="w-full h-full border-0"
                            loading="lazy"
                            title={`${sektorName} Demo`}
                        />
                    </div>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-[#7c3aed] border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <button className="bg-white text-black px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all">
                        Canlı İncele Dışarıda Aç ↗
                    </button>
                </div>
            </div>

            {/* Content Footer */}
            <div className="p-4 flex items-center justify-between bg-[#0a0a0f]">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">{emoji}</span>
                    <h3 className="font-bold text-white text-sm">{sektorName}</h3>
                </div>
                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${type === 'Next.js' ? 'bg-[#7c3aed]/20 text-[#7c3aed]' : 'bg-slate-800 text-slate-400'}`}>
                    {type}
                </span>
            </div>
        </div>
    );
}
