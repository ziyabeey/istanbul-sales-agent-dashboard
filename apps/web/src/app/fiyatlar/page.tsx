import React from "react";
import Navbar from "@/components/layout/Navbar";
import FooterTrustSection from "@/components/sections/FooterTrustSection";
import PricingSection from "@/components/sections/PricingSection";
import WebsiteShowcase from "@/components/sections/WebsiteShowcase";
import { CheckCircle2, HelpCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Fiyatlandırma | kepenk.ai",
    description: "Esnaf dijital asistan çözümleri için taahhütsüz ve saydam fiyatlandırma paketleri.",
};

const sssData = [
    {
        q: "Gizli Bir Ücret veya Kurulum Maliyeti Var mı?",
        a: "Hayır! kepenk.ai fiyatlandırması son derece saydamdır. Belirtilen aylık paket fiyatı dışında kurulum, sunucu, teknik destek veya güncelleme için ek hiçbir ücret ödemezsiniz."
    },
    {
        q: "Aboneliğimi İstediğim Zaman İptal Edebilir Miyim?",
        a: "Kesinlikle. Bizde uzun süreli senetler veya zorunlu taahhütler yoktur. Memnun kalmadığınız takdirde kontrol panelinizden tek tıkla aboneliğinizi iptal edebilirsiniz. Sonraki ay kartınızdan çekim yapılmaz."
    },
    {
        q: "Web Sitemin ve Asistanın Kurulumu Ne Kadar Sürüyor?",
        a: "Ödemenizi tamamladığınız saniye içerisinde yapay zeka bulut sunucularımızı tetikler. Siteniz ve asistan altyapınız 60 saniye içinde kullanıma hazır hale gelir."
    },
    {
        q: "17 Ajanın Tamamını Kullanabilecek miyim?",
        a: "Evet! Hangi paketi seçerseniz seçin, tüm yapay zeka ajanları dükkanınız için aynı anda mesaiye başlar. İster ciro raporu alın, ister kriz aneti, hepsi emrinizdedir."
    }
];

type SatirDegeri = boolean | string

interface KarsilastirmaSatiri {
    ozellik: string
    TEMEL: SatirDegeri
    STANDART: SatirDegeri
    BUYUME: SatirDegeri
    PREMIUM: SatirDegeri
    PREMIUMPLUS: SatirDegeri
}

const KARSILASTIRMA: { baslik: string; satirlar: KarsilastirmaSatiri[] }[] = [
    {
        baslik: '🌐 Web Sitesi',
        satirlar: [
            { ozellik: 'AI ile üretilmiş site', TEMEL: true, STANDART: true, BUYUME: true, PREMIUM: true, PREMIUMPLUS: true },
            { ozellik: 'kepenk.ai subdomaini', TEMEL: true, STANDART: true, BUYUME: true, PREMIUM: true, PREMIUMPLUS: true },
            { ozellik: 'Fotoğraf galerisi', TEMEL: false, STANDART: true, BUYUME: true, PREMIUM: true, PREMIUMPLUS: true },
            { ozellik: 'Online randevu sistemi', TEMEL: false, STANDART: false, BUYUME: true, PREMIUM: true, PREMIUMPLUS: true },
            { ozellik: 'Ücretsiz .com.tr domain', TEMEL: false, STANDART: false, BUYUME: false, PREMIUM: true, PREMIUMPLUS: true },
            { ozellik: 'Ücretsiz .com domain', TEMEL: false, STANDART: false, BUYUME: false, PREMIUM: false, PREMIUMPLUS: true },
        ],
    },
    {
        baslik: '📝 İçerik',
        satirlar: [
            { ozellik: 'Haftalık içerik (adet)', TEMEL: '5', STANDART: '10', BUYUME: '25', PREMIUM: '∞', PREMIUMPLUS: '∞' },
            { ozellik: 'Platformlar', TEMEL: 'IG', STANDART: 'IG+FB', BUYUME: 'IG+FB+GMB', PREMIUM: 'Tümü', PREMIUMPLUS: 'Tümü' },
            { ozellik: 'Google My Business otomasyonu', TEMEL: false, STANDART: false, BUYUME: true, PREMIUM: true, PREMIUMPLUS: true },
        ],
    },
    {
        baslik: '📊 Reklam Yönetimi',
        satirlar: [
            { ozellik: 'Google Ads kurulumu', TEMEL: false, STANDART: false, BUYUME: true, PREMIUM: true, PREMIUMPLUS: true },
            { ozellik: 'Meta Ads yönetimi', TEMEL: false, STANDART: false, BUYUME: true, PREMIUM: true, PREMIUMPLUS: true },
            { ozellik: 'Aktif optimizasyon + A/B test', TEMEL: false, STANDART: false, BUYUME: false, PREMIUM: true, PREMIUMPLUS: true },
        ],
    },
    {
        baslik: '🤖 AI Ajanlar',
        satirlar: [
            { ozellik: 'Esnaf Asistanı 7/24', TEMEL: true, STANDART: true, BUYUME: true, PREMIUM: true, PREMIUMPLUS: true },
            { ozellik: 'Churn Detective', TEMEL: false, STANDART: true, BUYUME: true, PREMIUM: true, PREMIUMPLUS: true },
            { ozellik: 'The Closer (satış kapama)', TEMEL: false, STANDART: false, BUYUME: true, PREMIUM: true, PREMIUMPLUS: true },
            { ozellik: 'Lead Madencisi', TEMEL: false, STANDART: false, BUYUME: false, PREMIUM: true, PREMIUMPLUS: true },
            { ozellik: 'Tüm 17 ajan', TEMEL: false, STANDART: false, BUYUME: false, PREMIUM: true, PREMIUMPLUS: true },
        ],
    },
    {
        baslik: '👤 Destek',
        satirlar: [
            { ozellik: 'WhatsApp destek', TEMEL: true, STANDART: true, BUYUME: true, PREMIUM: true, PREMIUMPLUS: true },
            { ozellik: 'Öncelikli destek hattı', TEMEL: false, STANDART: false, BUYUME: false, PREMIUM: false, PREMIUMPLUS: true },
            { ozellik: 'Aylık strateji görüşmesi', TEMEL: false, STANDART: false, BUYUME: false, PREMIUM: false, PREMIUMPLUS: true },
        ],
    },
]

const PAKET_ADLARI = ['TEMEL', 'STANDART', 'BUYUME', 'PREMIUM', 'PREMIUMPLUS'] as const
const PAKET_ETIKETLER: Record<string, string> = {
    TEMEL: 'Temel', STANDART: 'Standart', BUYUME: 'Büyüme', PREMIUM: 'Premium', PREMIUMPLUS: 'Premium+'
}

function HucreDeger({ deger, isPopular }: { deger: SatirDegeri; isPopular: boolean }) {
    if (deger === true) return <span className={`font-bold ${isPopular ? 'text-rust' : 'text-sage'}`}>✓</span>
    if (deger === false) return <span className="text-muted-foreground/40">–</span>
    return <span className={`text-xs font-semibold ${isPopular ? 'text-amber-500' : 'text-muted-foreground'}`}>{deger}</span>
}

function KarsilastirmaTablosu() {
    return (
        <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <p className="text-rust font-mono text-xs uppercase tracking-[0.3em] mb-3">Detaylı Karşılaştırma</p>
                    <h2 className="font-syne text-3xl md:text-4xl font-extrabold text-foreground">Hangi Paket Sizi Karşılar?</h2>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-border/20 pb-4 md:pb-0 shadow-xl shadow-black/20 max-w-[100vw]">
                    <table className="w-full min-w-[700px] lg:min-w-full border-collapse">
                        {/* Başlık satırı */}
                        <thead>
                            <tr className="bg-card">
                                <th className="text-left px-5 py-4 text-muted-foreground text-sm font-semibold w-48">Özellik</th>
                                {PAKET_ADLARI.map(p => (
                                    <th key={p} className={`text-center px-4 py-4 text-sm font-extrabold font-syne ${p === 'PREMIUM' ? 'text-amber-400 bg-amber-500/10' : 'text-foreground'}`}>
                                        {PAKET_ETIKETLER[p]}
                                        {p === 'PREMIUM' && <span className="block text-xs font-normal text-amber-400/70 mt-0.5">⭐ Önerilen</span>}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {KARSILASTIRMA.map((kategori, ki) => (
                                <>
                                    {/* Kategori başlığı */}
                                    <tr key={`kat-${ki}`} className="bg-warm/10 border-t border-border/20">
                                        <td colSpan={6} className="px-5 py-2.5 text-muted-foreground text-xs font-bold uppercase tracking-wider">
                                            {kategori.baslik}
                                        </td>
                                    </tr>
                                    {/* Özellik satırları */}
                                    {kategori.satirlar.map((satir, si) => (
                                        <tr key={`satir-${ki}-${si}`} className={`border-t border-border/10 hover:bg-white/5 transition-colors ${si % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                                            <td className="px-3 md:px-5 py-3 text-muted-foreground text-xs md:text-sm whitespace-nowrap md:whitespace-normal font-medium">{satir.ozellik}</td>
                                            {PAKET_ADLARI.map(p => (
                                                <td key={p} className={`text-center px-2 md:px-4 py-3 ${p === 'PREMIUM' ? 'bg-amber-500/5' : ''}`}>
                                                    <HucreDeger deger={satir[p]} isPopular={p === 'PREMIUM'} />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default function FiyatlarPage() {
    return (
        <main className="min-h-screen bg-background font-sans">
            <Navbar />

            {/* Header */}
            <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-6 font-syne">
                    Taahhütsüz, Net <span className="text-rust">Fiyatlar</span>
                </h1>
                <p className="font-lora italic text-xl text-muted-foreground-light max-w-2xl mx-auto leading-relaxed">
                    Sadece ihtiyacınız kadar ödeyin. Esnafın bütçesini yormayan, dijital ajansların %90'ından daha ucuz ve daha akıllı çözümler.
                </p>
            </section>

            {/* 3D Website Showcase */}
            <WebsiteShowcase />

            {/* Pricing Section (Re-used from Landing Page) */}
            <div className="relative z-10 -mt-12 bg-background pb-16">
                <PricingSection />
            </div>

            {/* Smooth Wave Divider between Ink and Cream/Warm */}
            <div className="w-full overflow-hidden leading-none z-20 relative bg-background">
                <svg className="relative block w-full h-[60px] sm:h-[100px] lg:h-[150px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C69.67,34.46,159.91,73.57,252.89,68.91,273.74,67.87,294.67,61.4,321.39,56.44Z" className="fill-warm"></path>
                </svg>
            </div>

            {/* Value Proposition */}
            <section className="py-12 md:py-20 bg-warm border-b border-border/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            "Sıfır Kurulum Ücreti",
                            "Sınırsız Sunucu / Hosting",
                            "Tüm 17 Ajan Erişimi",
                            "Aylık İptal Opsiyonu"
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center justify-center p-6 bg-background rounded-2xl shadow-sm border border-border">
                                <CheckCircle2 className="w-6 h-6 text-rust mr-3" />
                                <span className="font-bold text-foreground">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Karşılaştırma Tablosu */}
            <KarsilastirmaTablosu />

            {/* FAQ Area */}
            <section className="py-24 bg-background text-foreground">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-muted-foreground bg-warm mb-6">
                            Sıkça Sorulan Sorular
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold font-syne mb-6">Aklınıza Takılanlar</h2>
                    </div>

                    <div className="space-y-6">
                        {sssData.map((faq, index) => (
                            <div key={index} className="bg-white p-6 md:p-8 rounded-3xl border border-border-light/30 shadow-sm">
                                <h3 className="text-xl font-bold font-syne text-foreground flex items-start gap-4 mb-3">
                                    <HelpCircle className="w-6 h-6 text-rust flex-shrink-0 mt-0.5" />
                                    {faq.q}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed pl-10">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FooterTrustSection />
        </main>
    );
}
