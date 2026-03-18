"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Zap, Code2, Layers, Cuboid, ArrowRight, Crown, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { PAKETLER } from "@/data/paketler";

const TIER_STYLES: Record<string, {
    accent: string;
    accentBg: string;
    accentBorder: string;
    checkColor: string;
    buttonBg: string;
    badgeLabel?: string;
    gradient?: string;
    cardBg: string;
    icon: React.ReactNode;
}> = {
    temel: {
        accent: "text-slate-600",
        accentBg: "bg-slate-50",
        accentBorder: "border-slate-200",
        checkColor: "text-slate-500",
        buttonBg: "bg-slate-800 hover:bg-slate-700 text-white",
        cardBg: "bg-white",
        icon: <Code2 className="w-5 h-5" />,
    },
    standart: {
        accent: "text-sky-600",
        accentBg: "bg-sky-50",
        accentBorder: "border-sky-200",
        checkColor: "text-sky-500",
        buttonBg: "bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-600/20",
        cardBg: "bg-white",
        icon: <Code2 className="w-5 h-5" />,
    },
    buyume: {
        accent: "text-emerald-600",
        accentBg: "bg-emerald-50",
        accentBorder: "border-emerald-200",
        checkColor: "text-emerald-500",
        buttonBg: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20",
        badgeLabel: "En Çok Tercih",
        cardBg: "bg-white",
        gradient: "from-emerald-500 to-teal-500",
        icon: <Layers className="w-5 h-5" />,
    },
    premium: {
        accent: "text-amber-600",
        accentBg: "bg-amber-50",
        accentBorder: "border-amber-200",
        checkColor: "text-amber-500",
        buttonBg: "bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-110 text-foreground shadow-lg shadow-amber-500/20",
        cardBg: "bg-white",
        icon: <Cuboid className="w-5 h-5" />,
    },
    premiumplus: {
        accent: "text-white",
        accentBg: "bg-white/10",
        accentBorder: "border-white/20",
        checkColor: "text-rust",
        buttonBg: "bg-white hover:bg-cream text-ink shadow-lg",
        badgeLabel: "En Güçlü",
        cardBg: "bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]",
        gradient: "from-rust to-orange-500",
        icon: <Crown className="w-5 h-5" />,
    },
};

export default function PricingSection() {
    const [periyot, setPeriyot] = useState<'aylik' | 'yillik'>('aylik');
    const router = useRouter();

    const handlePurchase = (paketId: string) => {
        router.push(`/onboarding?paket=${paketId.toLowerCase()}&periyot=${periyot}`);
    };

    return (
        <section className="py-24 text-foreground relative overflow-hidden" id="pricing">
            {/* Subtle bg accents */}
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-rust/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Başlık */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <p className="text-rust font-mono text-xs tracking-[0.3em] uppercase mb-4">
                        Şeffaf &amp; Sürdürülebilir Fiyatlandırma
                    </p>
                    <h2 className="font-syne text-4xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
                        İşinizi Büyüten <span className="text-transparent bg-clip-text bg-gradient-to-r from-rust to-gold">Dijital Güç</span>
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                        Her pakette yapay zeka krediniz ve sektörel siteniz en ince ayrıntısına kadar düşünülmüştür.
                        Sürpriz maliyet, gizli ücret veya &quot;Sınırsız&quot; yalanı yok.
                    </p>
                </motion.div>

                {/* Toggle */}
                <div className="flex flex-col items-center justify-center mb-16">
                    <div className="flex items-center bg-foreground/5 p-1.5 rounded-full border border-foreground/10">
                        <button
                            onClick={() => setPeriyot('aylik')}
                            className={`relative px-7 py-2.5 rounded-full font-syne font-bold text-sm transition-colors ${
                                periyot === 'aylik' ? 'text-ink' : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {periyot === 'aylik' && (
                                <motion.div
                                    layoutId="pricing-toggle"
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
                                    layoutId="pricing-toggle"
                                    className="absolute inset-0 bg-sage/80 rounded-full shadow-sm"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10 flex items-center gap-2">
                                Yıllık
                            </span>
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

                {/* Üst sıra: 3 kart */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {PAKETLER.slice(0, 3).map((paket, i) => {
                        const style = TIER_STYLES[paket.id] || TIER_STYLES.temel;
                        const isDark = paket.id === 'premiumplus';
                        const isBuyume = paket.id === 'buyume';
                        const gosterimFiyat = periyot === 'aylik' ? paket.aylikFiyat : paket.yillikFiyatAylik;

                        return (
                            <motion.div
                                key={paket.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className={`
                                    relative flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden
                                    ${style.cardBg} ${isDark ? 'border-white/10' : `border-foreground/10 hover:border-foreground/20`}
                                    ${isBuyume ? 'shadow-xl ring-2 ring-emerald-400/30 ring-offset-2 ring-offset-background' : 'shadow-sm hover:shadow-lg'}
                                `}
                            >
                                {/* Badge for Büyüme */}
                                {style.badgeLabel && (
                                    <div className={`w-full py-2 text-center text-xs font-bold font-syne text-white bg-gradient-to-r ${style.gradient}`}>
                                        <span className="flex items-center justify-center gap-1.5">
                                            {isBuyume ? <Star className="w-3.5 h-3.5" /> : <Crown className="w-3.5 h-3.5" />}
                                            {style.badgeLabel}
                                        </span>
                                    </div>
                                )}

                                <div className="p-7 flex flex-col flex-1">
                                    {/* Header */}
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className={`p-2.5 rounded-xl ${style.accentBg} ${isDark ? 'text-white' : style.accent}`}>
                                            {style.icon}
                                        </div>
                                        <div>
                                            <h3 className={`font-syne font-extrabold text-lg ${isDark ? 'text-white' : style.accent}`}>
                                                {paket.name}
                                            </h3>
                                            <p className={`text-xs ${isDark ? 'text-white/50' : 'text-muted-foreground'}`}>
                                                {paket.teknoloji}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-1">
                                            <span className={`text-4xl font-extrabold font-syne tracking-tight ${isDark ? 'text-white' : 'text-foreground'}`}>
                                                ₺{gosterimFiyat.toLocaleString('tr-TR')}
                                            </span>
                                            <span className={`text-sm ${isDark ? 'text-white/50' : 'text-muted-foreground'}`}>/ay</span>
                                        </div>
                                        <div className="h-5 mt-1">
                                            {periyot === 'yillik' && (
                                                <span className={`text-xs line-through ${isDark ? 'text-white/30' : 'text-muted-foreground/60'}`}>
                                                    Aylık alımda ₺{paket.aylikFiyat.toLocaleString('tr-TR')}/ay
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* AI credit badge */}
                                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-5 ${isDark ? 'bg-white/5 border border-white/10' : `${style.accentBg} border ${style.accentBorder}`}`}>
                                        <Zap className={`w-4 h-4 ${isDark ? 'text-amber-400' : style.accent}`} />
                                        <span className={`text-xs font-bold font-syne ${isDark ? 'text-white' : style.accent}`}>{paket.aiKredi}</span>
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-3 mb-8 flex-1">
                                        {paket.ozellikler.map((ozellik, idx) => (
                                            <li key={idx} className="flex items-start gap-2.5">
                                                <div className={`mt-0.5 p-0.5 rounded-full ${isDark ? 'bg-rust/20' : `${style.accentBg}`}`}>
                                                    <Check className={`w-3.5 h-3.5 ${style.checkColor}`} />
                                                </div>
                                                <span className={`text-sm leading-snug ${isDark ? 'text-white/80' : 'text-foreground/80'}`}>{ozellik}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <button
                                        onClick={() => handlePurchase(paket.id)}
                                        className={`w-full py-3.5 rounded-xl font-syne font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${style.buttonBg}`}
                                    >
                                        Hemen Başla <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Alt sıra: 2 kart (Premium & Premium Plus) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {PAKETLER.slice(3).map((paket, i) => {
                        const style = TIER_STYLES[paket.id] || TIER_STYLES.temel;
                        const isDark = paket.id === 'premiumplus';
                        const gosterimFiyat = periyot === 'aylik' ? paket.aylikFiyat : paket.yillikFiyatAylik;

                        return (
                            <motion.div
                                key={paket.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                                viewport={{ once: true }}
                                transition={{ delay: (i + 3) * 0.1, duration: 0.5 }}
                                className={`
                                    relative flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden
                                    ${style.cardBg} ${isDark ? 'border-white/10 shadow-2xl shadow-rust/10' : `border-foreground/10 hover:border-foreground/20 shadow-sm hover:shadow-lg`}
                                    ${isDark ? 'ring-1 ring-rust/30 ring-offset-2 ring-offset-background' : ''}
                                `}
                            >
                                {/* Badge for Premium Plus */}
                                {style.badgeLabel && (
                                    <div className={`w-full py-2 text-center text-xs font-bold font-syne text-white bg-gradient-to-r ${style.gradient}`}>
                                        <span className="flex items-center justify-center gap-1.5">
                                            <Crown className="w-3.5 h-3.5" />
                                            {style.badgeLabel}
                                        </span>
                                    </div>
                                )}

                                <div className={`p-8 flex flex-col md:flex-row gap-8 flex-1`}>
                                    {/* Sol: Header + Fiyat */}
                                    <div className="md:w-1/2 flex flex-col">
                                        <div className="flex items-center gap-3 mb-5">
                                            <div className={`p-2.5 rounded-xl ${style.accentBg} ${isDark ? 'text-white' : style.accent}`}>
                                                {style.icon}
                                            </div>
                                            <div>
                                                <h3 className={`font-syne font-extrabold text-xl ${isDark ? 'text-white' : style.accent}`}>
                                                    {paket.name}
                                                </h3>
                                                <p className={`text-xs ${isDark ? 'text-white/50' : 'text-muted-foreground'}`}>
                                                    {paket.teknoloji}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <div className="flex items-baseline gap-1">
                                                <span className={`text-5xl font-extrabold font-syne tracking-tight ${isDark ? 'text-white' : 'text-foreground'}`}>
                                                    ₺{gosterimFiyat.toLocaleString('tr-TR')}
                                                </span>
                                                <span className={`text-sm ${isDark ? 'text-white/50' : 'text-muted-foreground'}`}>/ay</span>
                                            </div>
                                            <div className="h-5 mt-1">
                                                {periyot === 'yillik' && (
                                                    <span className={`text-xs line-through ${isDark ? 'text-white/30' : 'text-muted-foreground/60'}`}>
                                                        Aylık alımda ₺{paket.aylikFiyat.toLocaleString('tr-TR')}/ay
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* AI credit badge */}
                                        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-6 ${isDark ? 'bg-white/5 border border-white/10' : `${style.accentBg} border ${style.accentBorder}`}`}>
                                            <Zap className={`w-4 h-4 ${isDark ? 'text-amber-400' : style.accent}`} />
                                            <span className={`text-xs font-bold font-syne ${isDark ? 'text-white' : style.accent}`}>{paket.aiKredi}</span>
                                        </div>

                                        {/* CTA */}
                                        <button
                                            onClick={() => handlePurchase(paket.id)}
                                            className={`w-full py-4 rounded-xl font-syne font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 mt-auto ${style.buttonBg}`}
                                        >
                                            {isDark ? 'Premium Plus ile Başla' : 'Öncelikli Başla'}
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Sağ: Özellikler */}
                                    <div className={`md:w-1/2 md:border-l ${isDark ? 'md:border-white/10' : 'md:border-foreground/5'} md:pl-8`}>
                                        <p className={`text-xs font-bold font-syne uppercase tracking-widest mb-4 ${isDark ? 'text-white/40' : 'text-muted-foreground/60'}`}>
                                            Dahil özellikler
                                        </p>
                                        <ul className="space-y-3">
                                            {paket.ozellikler.map((ozellik, idx) => (
                                                <li key={idx} className="flex items-start gap-2.5">
                                                    <div className={`mt-0.5 p-0.5 rounded-full ${isDark ? 'bg-rust/20' : `${style.accentBg}`}`}>
                                                        <Check className={`w-3.5 h-3.5 ${style.checkColor}`} />
                                                    </div>
                                                    <span className={`text-sm leading-snug ${isDark ? 'text-white/80' : 'text-foreground/80'}`}>{ozellik}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Ekstra premium benefits */}
                                        {isDark && (
                                            <div className="mt-6 pt-4 border-t border-white/10">
                                                <div className="flex items-center gap-2 text-white/60 text-xs">
                                                    <Crown className="w-3.5 h-3.5 text-rust" />
                                                    <span>Kişisel hesap yöneticisi dahil</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
