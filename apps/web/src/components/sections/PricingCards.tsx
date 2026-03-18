"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, ArrowRight, Star } from "lucide-react";
import { useRouter } from "next/navigation";

interface PlanFeature {
    label: string;
    bold?: string; // Bold prefix like "Unlimited" or "Advanced"
}

interface Plan {
    id: string;
    name: string;
    subtitle: string;
    aylikFiyat: number;
    yillikFiyatAylik: number;
    features: PlanFeature[];
    recommended?: boolean;
    dark?: boolean;
}

const PLANS: Plan[] = [
    {
        id: 'premiumplus',
        name: 'Premium Plus',
        subtitle: 'İşinizi dijitalde zirveye taşıyın',
        aylikFiyat: 7499,
        yillikFiyatAylik: 4499,
        dark: true,
        features: [
            { bold: "Ücretsiz", label: ".com veya .com.tr domain" },
            { bold: "Özel Tasarım", label: "3D Matrix siteyle" },
            { bold: "5.000", label: "AI İşlem / Ay" },
            { bold: "Sınırsız", label: "haftalık içerik" },
            { label: "Tüm platformlara paylaşım" },
            { bold: "Gelişmiş", label: "Google & Meta Ads yönetimi" },
            { label: "Aktif A/B test optimizasyonu" },
            { bold: "Tüm 17", label: "AI ajan erişimi" },
            { label: "Trendyol / Yemeksepeti entegrasyon" },
            { label: "Kişisel AI Asistan (7/24)" },
            { label: "Kriz & yorum yönetimi" },
            { label: "Öncelikli destek hattı" },
            { label: "Aylık strateji görüşmesi" },
            { bold: "Kişisel", label: "hesap yöneticisi" },
        ],
    },
    {
        id: 'premium',
        name: 'Premium',
        subtitle: 'Tam dijital güç',
        aylikFiyat: 4999,
        yillikFiyatAylik: 2999,
        features: [
            { bold: "Ücretsiz", label: ".com.tr domain" },
            { bold: "3D & Parallax", label: "animasyon sitesi" },
            { bold: "2.000", label: "AI İşlem / Ay" },
            { bold: "Sınırsız", label: "haftalık içerik" },
            { label: "Tüm platformlara paylaşım" },
            { bold: "Gelişmiş", label: "Google & Meta Ads" },
            { label: "Aktif A/B test optimizasyonu" },
            { bold: "Tüm 17", label: "AI ajan erişimi" },
            { label: "Menü & QR sistemi" },
            { label: "Fiyat hesaplayıcı" },
            { label: "Online danışma aracı" },
            { label: "Kariyer ilanları modülü" },
        ],
    },
    {
        id: 'buyume',
        name: 'Büyüme',
        subtitle: 'SEO & içerik büyütme',
        aylikFiyat: 2999,
        yillikFiyatAylik: 1799,
        recommended: true,
        features: [
            { label: "KPNK subdomain" },
            { bold: "Next.js", label: "dinamik site" },
            { bold: "750", label: "AI İşlem / Ay" },
            { bold: "25", label: "haftalık içerik" },
            { label: "IG + FB + Google My Business" },
            { bold: "Standart", label: "Google & Meta Ads" },
            { label: "AI Randevu & Rezervasyon" },
            { label: "WhatsApp otomasyonu" },
            { label: "Ön ödeme (kapora) alma" },
            { label: "Blog & makaleler" },
            { label: "Sertifika & belgeler" },
            { label: "Önce / Sonra slider" },
        ],
    },
    {
        id: 'standart',
        name: 'Standart',
        subtitle: 'Müşteri güveni & dönüşüm',
        aylikFiyat: 1799,
        yillikFiyatAylik: 1079,
        features: [
            { label: "KPNK subdomain" },
            { bold: "Statik HTML+", label: "site" },
            { bold: "250", label: "AI İşlem / Ay" },
            { bold: "10", label: "haftalık içerik" },
            { label: "Instagram + Facebook" },
            { label: "Müşteri CRM (Temel)" },
            { label: "Sosyal medya içerik önerileri" },
            { bold: "Temel", label: "SEO optimizasyonu" },
            { label: "Google yorumlar entegrasyonu" },
            { label: "Müşteri referansları modülü" },
            { label: "Kampanya afişi" },
            { label: "Video tanıtım modülü" },
        ],
    },
    {
        id: 'temel',
        name: 'Temel',
        subtitle: 'Dijital varlık başlangıcı',
        aylikFiyat: 999,
        yillikFiyatAylik: 599,
        features: [
            { label: "KPNK subdomain" },
            { bold: "Statik HTML", label: "site" },
            { bold: "100", label: "AI İşlem / Ay" },
            { bold: "5", label: "haftalık içerik" },
            { label: "Sadece Instagram" },
            { label: "Standart iletişim formu" },
            { label: "WhatsApp destek butonu" },
            { label: "Harita & yol tarifi" },
            { label: "Çalışma saatleri" },
            { label: "Popüler hizmetler vitrin" },
            { label: "Duyuru bandı" },
            { label: "KVKK & gizlilik sayfası" },
        ],
    },
];

export default function PricingCards() {
    const [periyot, setPeriyot] = useState<'aylik' | 'yillik'>('aylik');
    const router = useRouter();

    const handlePurchase = (planId: string) => {
        router.push(`/onboarding?paket=${planId}&periyot=${periyot}`);
    };

    return (
        <section className="py-12 bg-background" id="pricing">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Toggle */}
                <div className="flex flex-col items-center justify-center mb-12">
                    <div className="flex items-center bg-gray-100 p-1.5 rounded-full border border-gray-300">
                        <button
                            onClick={() => setPeriyot('aylik')}
                            className={`relative px-7 py-2.5 rounded-full font-syne font-bold text-sm transition-colors ${
                                periyot === 'aylik' ? 'text-ink' : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {periyot === 'aylik' && (
                                <motion.div
                                    layoutId="price-toggle"
                                    className="absolute inset-0 bg-white rounded-full shadow-sm"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">Aylık</span>
                        </button>
                        <button
                            onClick={() => setPeriyot('yillik')}
                            className={`relative px-7 py-2.5 rounded-full font-syne font-bold text-sm transition-colors ${
                                periyot === 'yillik' ? 'text-ink' : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {periyot === 'yillik' && (
                                <motion.div
                                    layoutId="price-toggle"
                                    className="absolute inset-0 bg-sage/80 rounded-full shadow-sm"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">Yıllık</span>
                        </button>
                    </div>

                    <AnimatePresence>
                        {periyot === 'yillik' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                className="mt-4 bg-sage/10 text-sage border border-sage/20 px-4 py-1.5 rounded-full text-sm font-bold font-syne flex items-center gap-2"
                            >
                                <Sparkles className="w-4 h-4" /> %15 İndirim Aktif
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Cards grid - Wix style: side by side, from highest to lowest */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 border border-foreground/10 rounded-2xl overflow-hidden bg-white">
                    {PLANS.map((plan, i) => {
                        const fiyat = periyot === 'aylik' ? plan.aylikFiyat : plan.yillikFiyatAylik;
                        const isDark = plan.dark;

                        return (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05, duration: 0.4 }}
                                className={`
                                    flex flex-col
                                    ${isDark ? 'bg-gradient-to-b from-indigo-950 via-indigo-900 to-indigo-950 text-white' : 'bg-white text-foreground'}
                                    ${i < PLANS.length - 1 ? 'border-b sm:border-b-0 sm:border-r border-foreground/10' : ''}
                                `}
                            >
                                {/* Badge row - fixed height for all cards so content below aligns */}
                                <div className="h-7 flex-shrink-0">
                                    {plan.recommended && (
                                        <div className="bg-emerald-500 text-white text-[10px] font-bold font-syne text-center py-1.5 uppercase tracking-wider flex items-center justify-center gap-1 h-full">
                                            <Star className="w-3 h-3" /> Önerilen
                                        </div>
                                    )}
                                </div>

                                {/* Card content with consistent padding */}
                                <div className="flex flex-col flex-1 px-5 lg:px-4 xl:px-5 pb-6">
                                    {/* Plan name & subtitle - fixed height */}
                                    <div className="h-14 flex flex-col justify-center flex-shrink-0">
                                        <h3 className={`font-syne font-extrabold text-lg leading-tight ${isDark ? 'text-white' : 'text-foreground'}`}>
                                            {plan.name}
                                        </h3>
                                        <p className={`text-xs mt-0.5 ${isDark ? 'text-white/50' : 'text-muted-foreground'}`}>
                                            {plan.subtitle}
                                        </p>
                                    </div>

                                    {/* Price - fixed height */}
                                    <div className="h-16 flex flex-col justify-center flex-shrink-0">
                                        <div className="flex items-baseline gap-0.5">
                                            <span className={`text-3xl xl:text-4xl font-extrabold font-syne tracking-tight ${isDark ? 'text-white' : 'text-foreground'}`}>
                                                ₺{fiyat.toLocaleString('tr-TR')}
                                            </span>
                                            <span className={`text-sm ${isDark ? 'text-white/40' : 'text-muted-foreground'}`}>/ay</span>
                                        </div>
                                        <div className="h-4 mt-0.5">
                                            {periyot === 'yillik' && (
                                                <span className={`text-[10px] line-through ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
                                                    ₺{plan.aylikFiyat.toLocaleString('tr-TR')}/ay
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* CTA - fixed height */}
                                    <div className="h-14 flex items-center flex-shrink-0">
                                        <button
                                            onClick={() => handlePurchase(plan.id)}
                                            className={`w-full py-3 rounded-xl font-syne font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                                                isDark
                                                    ? 'bg-white text-ink hover:bg-secondary'
                                                    : plan.recommended
                                                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                                                    : 'bg-foreground hover:bg-foreground/90 text-white'
                                            }`}
                                        >
                                            Hemen Başla <ArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    {/* Divider */}
                                    <div className={`border-t my-4 ${isDark ? 'border-white/10' : 'border-foreground/8'}`} />

                                    {/* Features */}
                                    <ul className="space-y-2.5 flex-1">
                                        {plan.features.map((f, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                                                    isDark ? 'text-primary' : plan.recommended ? 'text-emerald-500' : 'text-primary'
                                                }`} />
                                                <span className={`text-xs leading-snug ${isDark ? 'text-white/90' : 'text-foreground/80'}`}>
                                                    {f.bold && (
                                                        <strong className={`${isDark ? 'text-white' : 'text-foreground'}`}>{f.bold} </strong>
                                                    )}
                                                    {f.label}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
