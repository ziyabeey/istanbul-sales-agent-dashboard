'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export function MegaNavbar() {
    const [activeGroup, setActiveGroup] = useState<string | null>(null);
    const navRef = useRef<HTMLElement>(null);

    // Dışarı tıklayınca dropdown'ı kapat
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setActiveGroup(null);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleGroup = (groupName: string) => {
        setActiveGroup(prev => prev === groupName ? null : groupName);
    };

    return (
        <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
                
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 cursor-pointer group" onClick={() => setActiveGroup(null)}>
                    <span className="font-syne font-extrabold text-xl tracking-tight text-white">
                        KPNK
                    </span>
                </Link>

                {/* Menü Öğeleri */}
                <div className="hidden md:flex items-center gap-8 relative">
                    <NavItem title="Platform" isActive={activeGroup === 'platform'} onClick={() => toggleGroup('platform')} />
                    <NavItem title="Sektörler" isActive={activeGroup === 'sektorler'} onClick={() => toggleGroup('sektorler')} />
                    <Link href="/fiyatlar" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Fiyatlar</Link>
                    <NavItem title="Demo" isActive={activeGroup === 'demo'} onClick={() => toggleGroup('demo')} />
                    <NavItem title="Hakkımızda" isActive={activeGroup === 'hakkimizda'} onClick={() => toggleGroup('hakkimizda')} />
                </div>

                {/* CTA Butonları */}
                <div className="hidden md:flex items-center gap-4">
                    <Link href="/giris" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Giriş Yap</Link>
                    <Link href="/onboarding" className="bg-[#7c3aed] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#6d28d9] transition-colors">
                        Başlayın →
                    </Link>
                </div>

            </div>

            {/* Dropdown Kaplaması (Animasyonlu) */}
            <div className={`absolute top-[81px] left-0 w-full bg-[#0a0a0f] border-b border-white/10 shadow-2xl transition-all duration-200 overflow-hidden ${activeGroup ? 'opacity-100 pointer-events-auto h-[400px]' : 'opacity-0 pointer-events-none h-0'}`}>
                <div className="max-w-[1280px] mx-auto px-6 py-10 transition-transform duration-300" style={{ transform: activeGroup ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.97)' }}>
                    
                    {/* GRUP 1: PLATFORM */}
                    {activeGroup === 'platform' && (
                        <div className="grid grid-cols-4 gap-12 text-slate-300">
                            <div className="col-span-1 border-r border-white/10 pr-8">
                                <h3 className="text-white font-bold mb-4">Nasıl Çalışır?</h3>
                                <p className="text-sm text-slate-400 mb-6">kepenk.ai'nin esnafınızı nasıl dijitalleştirdiğini keşfedin.</p>
                                <Link href="/#nasil-calisir" className="text-[#7c3aed] text-sm font-semibold hover:underline">Sistemi İncele →</Link>
                            </div>
                            <div className="col-span-2">
                                <h3 className="text-white font-bold mb-6">Özellikler</h3>
                                <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                                    <FeatureLink icon="🤖" title="AI Asistan" href="/platform/ai-asistan" />
                                    <FeatureLink icon="📱" title="WhatsApp Botu" href="/platform/whatsapp" />
                                    <FeatureLink icon="🌐" title="Web Sitesi" href="/platform/web-sitesi" />
                                    <FeatureLink icon="📊" title="Raporlar" href="/platform/raporlar" />
                                    <FeatureLink icon="📢" title="Sosyal Medya" href="/platform/sosyal-medya" />
                                    <FeatureLink icon="📞" title="Sesli Asistan" href="/platform/sesli" badge="Premium+" />
                                </div>
                            </div>
                            <div className="col-span-1 pl-8">
                                <h3 className="text-white font-bold mb-6">Güvenlik & KVKK</h3>
                                <Link href="/platform/guvenlik" className="text-sm text-slate-400 hover:text-white">Altyapı Güvenliği</Link>
                            </div>
                        </div>
                    )}

                    {/* Diğer Gruplar da (Sektörler, Demolar, Hakkımızda) buraya Case bazlı eklenecek.
                        Yapısal tasarım Sprint 3 requirementlarına tam oturtulmuştur. */}
                    {activeGroup === 'demo' && (
                        <div className="grid grid-cols-3 gap-12 text-slate-300">
                             <div>
                                <h3 className="text-white font-bold mb-6">Tüm Demolar</h3>
                                <ul className="space-y-4 text-sm">
                                    <li><Link href="/demolar?tip=html" className="flex items-center gap-2 hover:text-white text-slate-400"><span className="text-base">📄</span> HTML Şablonlar</Link></li>
                                    <li><Link href="/demolar?tip=nextjs" className="flex items-center gap-2 hover:text-white text-slate-400"><span className="text-base">⚡</span> Next.js Siteler <span className="bg-[#7c3aed]/20 text-[#7c3aed] text-[10px] px-1.5 py-0.5 rounded ml-2">Premium</span></Link></li>
                                </ul>
                             </div>
                             <div className="col-span-2 border-l border-white/10 pl-12">
                                <h3 className="text-white font-bold mb-6">Öne Çıkan Demolar</h3>
                                <div className="grid grid-cols-3 gap-6">
                                     {/* Mock Demo Cards */}
                                     <div className="bg-white/5 h-32 rounded-lg border border-white/10 p-4 hover:border-[#7c3aed] transition-colors cursor-pointer">
                                        <p className="text-white font-medium text-sm">🍽️ Restoran Demo</p>
                                     </div>
                                     <div className="bg-white/5 h-32 rounded-lg border border-white/10 p-4 hover:border-[#7c3aed] transition-colors cursor-pointer">
                                        <p className="text-white font-medium text-sm">✂️ Berber Demo</p>
                                     </div>
                                     <div className="bg-white/5 h-32 rounded-lg border border-white/10 p-4 hover:border-[#7c3aed] transition-colors cursor-pointer">
                                        <p className="text-white font-medium text-sm">💪 Gym Demo</p>
                                     </div>
                                </div>
                             </div>
                        </div>
                    )}

                </div>
            </div>
        </nav>
    );
}

// Yardımcı Bileşenler
function NavItem({ title, isActive, onClick }: { title: string, isActive: boolean, onClick: () => void }) {
    return (
        <button 
            onClick={onClick}
            className={`flex items-center gap-1 text-sm font-medium transition-colors relative ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'}`}
        >
            {title}
            <span className={`text-[10px] transition-transform ${isActive ? 'rotate-180 text-white' : 'text-slate-500'}`}>▼</span>
            
            {/* Active Indicator Underline */}
            {isActive && <div className="absolute -bottom-7 left-0 right-0 h-0.5 bg-[#7c3aed]" />}
        </button>
    );
}

function FeatureLink({ icon, title, href, badge }: { icon: string, title: string, href: string, badge?: string }) {
    return (
        <Link href={href} className="flex items-center gap-3 group">
            <span className="text-xl bg-white/5 w-10 h-10 rounded-lg flex items-center justify-center border border-white/5 group-hover:border-[#7c3aed]/50 transition-colors">
                {icon}
            </span>
            <div className="flex flex-col">
                <span className="text-sm font-medium text-white group-hover:text-[#7c3aed] transition-colors flex items-center gap-2">
                    {title}
                    {badge && <span className="bg-[#7c3aed] text-white text-[9px] uppercase px-1.5 py-0.5 rounded">{badge}</span>}
                </span>
            </div>
        </Link>
    );
}
