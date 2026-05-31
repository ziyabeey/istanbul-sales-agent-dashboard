import React from "react";
import PublicPageShell from "@/components/layout/PublicPageShell";
import FeaturesSection from "@/components/sections/FeaturesSection";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "17 Yapay Zeka Ajanı - Özellikler | KPNK",
    description: "Satıştan müşteri ilişkilerine, ciro analizinden personel yönetimine kadar dükkanınızda 7/24 çalışan 17 yapay zeka ajanını keşfedin.",
};

export default function OzelliklerPage() {
    return (
        <PublicPageShell>
            {/* Header */}
            <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-primary bg-steel mb-6">
                    Süper Güçleriniz
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-6 font-syne">
                    Görünmez <span className="text-primary">Ordunuz</span>
                </h1>
                <p className="font-lora italic text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Arka planda uyumadan çalışan 17 farklı yapay zeka uzmanı. Her biri kendi alanında eğitilmiş, dükkanınızı büyütmeye programlanmış sanal personelleriniz.
                </p>
            </section>

            {/* Features (Re-use Landing Page logic) */}
            <div className="-mt-8 pb-16">
                <FeaturesSection />
            </div>

            {/* Architecture Details */}
            <section className="py-24 bg-background text-foreground">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold font-syne mb-6">Neden Bir Ajansa İhtiyacınız Yok?</h2>
                            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                                Geleneksel reklam veya yazılım ajansları aylık binlerce lira ödeme talep eder, mesai saatleri dışında çalışmaz ve işlemleri günler sürer.
                            </p>
                            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                                KPNK'nin <strong className="text-foreground">Multi-Agent (Çoklu Ajan) mimarisi</strong> sayesinde işler eşzamanlı yürür. Müşteriye WhatsApp'tan dönen ajan başkadır, o veriyi alıp web sitenizi güncelleyen ajan başkadır. Hepsi birbiriyle saniyesinde iletişim kurar.
                            </p>
                            <ul className="space-y-4 font-bold text-foreground">
                                <li className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">1</span> 7/24 Kesintisiz Operasyon</li>
                                <li className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">2</span> İnsana Özgü Hata Payı Sıfır</li>
                                <li className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">3</span> Şirket İçi Veri Sızıntısı Riski Yok (256-Bit TLS)</li>
                            </ul>
                        </div>
                        <div className="bg-warm rounded-3xl p-8 border border-border/20 relative">
                            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="Dashboard Gösterimi" className="rounded-xl shadow-2xl relative z-10" />
                            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicPageShell>
    );
}
