import React from 'react';
import { DashboardGridCard } from './components/DashboardGridCard';
import { PACKAGES } from '@kepenk/config/packages';

// Fake DB pull for UI demonstration until real Firebase Auth/DB is hooked up
const MOCK_DB = {
    packageId: 'temel' as keyof typeof PACKAGES, 
    siteViews: 1240,
    waMessages: 45
};

export default function DashboardHomePage() {
    const pkg = PACKAGES[MOCK_DB.packageId];
    
    return (
        <div className="animate-in fade-in zoom-in-95 duration-500">
            
            {/* Top Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard label="Aylık Site Ziyareti" value={MOCK_DB.siteViews.toLocaleString()} icon="👁️" />
                <StatCard label="WA Gelen Mesaj" value={MOCK_DB.waMessages.toString()} icon="💬" />
                <StatCard label="Aktif Ürünler" value="12" icon="📦" />
                <StatCard label="Google Tıklaması" value="340" icon="📈" />
            </div>

            <div className="mb-6 flex items-end justify-between">
                <div>
                     <h2 className="text-2xl font-syne font-extrabold text-white drop-shadow-md">Yönetim Paneli</h2>
                     <p className="text-white/60 text-sm font-medium mt-1">Tüm dijital varlıklarınızı tek ekrandan yönetin.</p>
                </div>
            </div>

            {/* Feature Grid based on Package Limits */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <DashboardGridCard 
                    title="Website Editörü"
                    description="Sitenizin menüsünü, fotoğraflarını ve yazılarını güncelleyin."
                    icon="✏️"
                    href="/dashboard/editor"
                />

                <DashboardGridCard 
                    title="WhatsApp Botu"
                    description="Asistanınızın konuşma tarzını ve menüsünü eğitin."
                    icon="🤖"
                    href="/dashboard/whatsapp"
                />

                <DashboardGridCard 
                    title="Domain (Alan Adı)"
                    description="Sitenize özel .com veya .com.tr alan adınızı bağlayın."
                    icon="🌐"
                    href="/dashboard/domain"
                    locked={!pkg.limits.hasPremiumDomain}
                    lockMessage="Büyüme paketi ve üzerinde aktiftir."
                />

                <DashboardGridCard 
                    title="AI Section Editör"
                    description="Yapay zekaya sitenizin tasarımını bölgesel olarak değiştirtin."
                    icon="🪄"
                    href="/dashboard/editor/ai"
                    locked={!pkg.limits.hasAiEditor}
                    lockMessage="Büyüme paketi ve üzerinde aktiftir."
                />

                <DashboardGridCard 
                    title="Otonom Reklamlar"
                    description="Facebook ve Google reklamlarınızı yapay zeka yönetsin."
                    icon="🎯"
                    href="/dashboard/reklamlar"
                    locked={MOCK_DB.packageId !== 'lider'}
                    lockMessage="Lider paketi gerektirir."
                />

                <DashboardGridCard 
                    title="Detaylı SEO Raporu"
                    description="Google aramalarındaki sıranızı ve analizleri görün."
                    icon="📊"
                    href="/dashboard/raporlar"
                    locked={!pkg.limits.advancedSeo}
                    lockMessage="Gelişmiş paketlerde aktiftir."
                />
            </div>
        </div>
    );
}

function StatCard({ label, value, icon }: { label: string, value: string, icon: string }) {
    return (
        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 flex flex-col justify-between hover:bg-white/10 hover:border-rust/30 hover:-translate-y-1 hover:shadow-[0_10px_20px_-5px_rgba(220,70,30,0.15)] transition-all duration-300 group">
            <span className="text-xl mb-3 bg-white/5 w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-110 transition-transform drop-shadow-md">{icon}</span>
            <span className="text-3xl font-syne font-bold text-white mb-1 drop-shadow-sm group-hover:text-rust-light transition-colors">{value}</span>
            <span className="text-[11px] text-white/50 font-bold uppercase tracking-wider group-hover:text-white/70 transition-colors">{label}</span>
        </div>
    );
}
