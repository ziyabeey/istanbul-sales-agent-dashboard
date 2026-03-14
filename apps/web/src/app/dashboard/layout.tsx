import React from 'react';
import Link from 'next/link';

// Mock auth data (will be replaced by Firebase Auth context)
const MOCK_USER = {
    name: 'Ahmet Yılmaz',
    businessName: 'Ahmet Usta Berber Salonu',
    packageId: 'temel', // 'temel' | 'buyume' | 'lider'
    siteUrl: 'ahmetberber.kepenk.ai'
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#05050A] text-white flex flex-col md:flex-row pb-20 md:pb-0 relative overflow-hidden">
            {/* Background Blob Effect */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-rust/10 rounded-full blur-[120px] pointer-events-none opacity-50 mix-blend-screen" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none opacity-40 mix-blend-screen" />

            {/* Mobile-First Bottom Nav (Shown only on small screens) */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-black/40 backdrop-blur-xl border-t border-white/10 z-50 flex items-center justify-around px-2 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                <BottomNavItem href="/dashboard" icon="🏠" label="Özet" active />
                <BottomNavItem href="/dashboard/editor" icon="✏️" label="Site" />
                <BottomNavItem href="/dashboard/mesajlar" icon="💬" label="Mesajlar" />
                <BottomNavItem href="/dashboard/ayarlar" icon="⚙️" label="Ayarlar" />
            </nav>

            {/* Desktop Sidebar (Hidden on mobile) */}
            <aside className="hidden md:flex w-64 border-r border-white/10 bg-white/[0.02] backdrop-blur-md flex-col h-screen sticky top-0 z-40 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
                <div className="p-6 border-b border-white/10">
                    <Link href="/" className="text-xl font-syne font-extrabold tracking-tighter text-white drop-shadow-md">
                        kepenk<span className="text-rust">.ai</span>
                    </Link>
                    <p className="text-xs text-white/50 mt-1 font-medium">{MOCK_USER.businessName}</p>
                </div>
                <div className="flex-1 py-6 px-4 space-y-2">
                    <SidebarItem href="/dashboard" icon="🏠" label="Kontrol Paneli" active />
                    <SidebarItem href="/dashboard/editor" icon="✏️" label="Site Editörü" />
                    <SidebarItem href="/dashboard/domain" icon="🌐" label="Alan Adım" />
                    <SidebarItem href="/dashboard/ajanlar" icon="🤖" label="Ajanlarım" badge={3} />
                    <SidebarItem href="/dashboard/crm" icon="👥" label="Müşteriler (CRM)" />
                    <SidebarItem href="/dashboard/ayarlar" icon="⚙️" label="Ayarlar" />
                </div>
                <div className="p-4 border-t border-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-rust/5 to-transparent pointer-events-none" />
                    <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-3 relative z-10 shadow-lg">
                        <p className="text-xs text-white/50 mb-1">Mevcut Paketiniz</p>
                        <p className="text-sm font-bold uppercase text-rust-light drop-shadow-sm">
                            {MOCK_USER.packageId} Esnaf
                        </p>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-h-screen w-full relative z-10">
                <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/[0.01] backdrop-blur-md sticky top-0 z-30 shadow-sm shadow-black/50">
                    <h1 className="font-syne font-bold text-lg text-white drop-shadow-sm">Hoş Geldiniz, {MOCK_USER.name}</h1>
                    <div className="flex items-center gap-4">
                        <Link href={`https://${MOCK_USER.siteUrl}`} target="_blank" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 font-medium bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                            <span>Siteme Git</span> ↗
                        </Link>
                        <div className="w-9 h-9 rounded-full bg-rust border border-rust-light/50 flex items-center justify-center text-sm font-bold shadow-[0_0_15px_rgba(220,70,30,0.4)] text-white cursor-pointer hover:shadow-[0_0_20px_rgba(220,70,30,0.6)] transition-shadow">
                            {MOCK_USER.name.charAt(0)}
                        </div>
                    </div>
                </header>
                
                <div className="p-6 md:p-8 max-w-6xl w-full mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}

function BottomNavItem({ href, icon, label, active = false }: { href: string, icon: string, label: string, active?: boolean }) {
    return (
        <Link href={href} className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-all ${active ? 'text-rust-light scale-105' : 'text-white/40 hover:text-white/70'}`}>
            <span className="text-xl drop-shadow-md">{icon}</span>
            <span className="text-[10px] font-medium">{label}</span>
        </Link>
    );
}

function SidebarItem({ href, icon, label, active = false, badge }: { href: string, icon: string, label: string, active?: boolean, badge?: number }) {
    return (
        <Link href={href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all border ${active ? 'bg-rust/10 border-rust/30 text-rust-light shadow-[0_0_15px_rgba(220,70,30,0.15)]' : 'border-transparent text-white/50 hover:text-white hover:bg-white/5 hover:border-white/10'}`}>
            <span className="text-lg drop-shadow-sm">{icon}</span>
            <span className="text-sm font-semibold">{label}</span>
            {badge && (
                <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full border ${active ? 'bg-rust border-rust-light/50 text-white shadow-md' : 'bg-white/10 border-white/20 text-white'}`}>
                    {badge}
                </span>
            )}
        </Link>
    );
}
