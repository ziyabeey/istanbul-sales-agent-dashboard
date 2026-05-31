'use client'

import React from 'react';
import Link from 'next/link';
import { useEsnaf } from '@/context/EsnafContext';
import SetupWizardBanner from './components/SetupWizardBanner';
import {
    Home, PenSquare, Globe, Bot, Users, Settings, MessageSquare,
    type LucideIcon,
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { esnaf, loading } = useEsnaf();

    const userName = esnaf?.ad || esnaf?.isletmeAdi || 'Esnaf';
    const businessName = esnaf?.isletmeAdiTam || esnaf?.isletmeAdi || 'İşletmem';
    const packageId = esnaf?.paket?.toLowerCase() || 'temel';
    const siteUrl = esnaf?.subdomainUrl?.replace('https://', '') || esnaf?.slug ? `${esnaf?.slug}.kepenk.ai` : '';

    if (loading) {
        return (
            <div className="min-h-screen bg-[#05050A] text-white flex items-center justify-center">
                <div className="animate-pulse text-white/50 font-syne">Yükleniyor...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#05050A] text-white flex flex-col md:flex-row pb-20 md:pb-0 relative overflow-hidden">
            {/* Background Blob Effect */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none opacity-50 mix-blend-screen" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none opacity-40 mix-blend-screen" />

            {/* Mobile-First Bottom Nav (Shown only on small screens) */}
            <nav aria-label="Mobil navigasyon" className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-black/40 backdrop-blur-xl border-t border-white/10 z-50 flex items-center justify-around px-2 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                <BottomNavItem href="/dashboard" icon={Home} label="Özet" active />
                <BottomNavItem href="/dashboard/editor" icon={PenSquare} label="Site" />
                <BottomNavItem href="/dashboard/mesajlar" icon={MessageSquare} label="Mesajlar" />
                <BottomNavItem href="/dashboard/ayarlar" icon={Settings} label="Ayarlar" />
            </nav>

            {/* Desktop Sidebar (Hidden on mobile) */}
            <aside aria-label="Ana menü" className="hidden md:flex w-64 border-r border-white/10 bg-white/[0.02] backdrop-blur-md flex-col h-screen sticky top-0 z-40 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
                <div className="p-6 border-b border-white/10">
                    <Link href="/" className="flex items-center gap-2 cursor-pointer group">
                        <span className="font-syne font-extrabold text-xl tracking-tight">
                            <span className="text-indigo-400 font-extrabold">KPNK</span>
                        </span>
                        <span className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-400/25">AI</span>
                    </Link>
                    <p className="text-xs text-white/50 mt-1 font-medium">{businessName}</p>
                </div>
                <div className="flex-1 py-6 px-4 space-y-2">
                    <SidebarItem href="/dashboard" icon={Home} label="Kontrol Paneli" active />
                    <SidebarItem href="/dashboard/editor" icon={PenSquare} label="Site Editörü" />
                    <SidebarItem href="/dashboard/domain" icon={Globe} label="Alan Adım" />
                    <SidebarItem href="/dashboard/ajanlar" icon={Bot} label="Ajanlarım" badge={3} />
                    <SidebarItem href="/dashboard/crm" icon={Users} label="Müşteriler (CRM)" />
                    <SidebarItem href="/dashboard/ayarlar" icon={Settings} label="Ayarlar" />
                </div>
                <div className="p-4 border-t border-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent pointer-events-none" />
                    <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-3 relative z-10 shadow-lg">
                        <p className="text-xs text-white/50 mb-1">Mevcut Paketiniz</p>
                        <p className="text-sm font-bold uppercase text-indigo-300 drop-shadow-sm">
                            {packageId} Esnaf
                        </p>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-h-screen w-full relative z-10">
                <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/[0.01] backdrop-blur-md sticky top-0 z-30 shadow-sm shadow-black/50">
                    <h1 className="font-syne font-bold text-lg text-white drop-shadow-sm">Hoş Geldiniz, {userName}</h1>
                    <div className="flex items-center gap-4">
                        {siteUrl && (
                            <Link href={`https://${siteUrl}`} target="_blank" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 font-medium bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                                <span>Siteme Git</span> ↗
                            </Link>
                        )}
                        <div className="w-9 h-9 rounded-full bg-indigo-500 border border-indigo-300/50 flex items-center justify-center text-sm font-bold shadow-[0_0_15px_rgba(99,102,241,0.4)] text-white cursor-pointer hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] transition-shadow">
                            {userName.charAt(0)}
                        </div>
                    </div>
                </header>

                <div className="p-6 md:p-8 max-w-6xl w-full mx-auto">
                    <SetupWizardBanner />
                    {children}
                </div>
            </main>
        </div>
    );
}

function BottomNavItem({ href, icon: Icon, label, active = false }: { href: string, icon: LucideIcon, label: string, active?: boolean }) {
    return (
        <Link href={href} aria-current={active ? 'page' : undefined} aria-label={label} className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-all ${active ? 'text-indigo-300 scale-105' : 'text-white/40 hover:text-white/70'}`}>
            <Icon className="w-5 h-5 drop-shadow-md" aria-hidden="true" />
            <span className="text-xs font-medium">{label}</span>
        </Link>
    );
}

function SidebarItem({ href, icon: Icon, label, active = false, badge }: { href: string, icon: LucideIcon, label: string, active?: boolean, badge?: number }) {
    return (
        <Link href={href} aria-current={active ? 'page' : undefined} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all border ${active ? 'bg-indigo-500/10 border-indigo-400/30 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.15)]' : 'border-transparent text-white/50 hover:text-white hover:bg-white/5 hover:border-white/10'}`}>
            <Icon className="w-[18px] h-[18px] drop-shadow-sm" aria-hidden="true" />
            <span className="text-sm font-semibold">{label}</span>
            {badge && (
                <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full border ${active ? 'bg-indigo-500 border-indigo-300/50 text-white shadow-md' : 'bg-white/10 border-white/20 text-white'}`}>
                    {badge}
                </span>
            )}
        </Link>
    );
}
