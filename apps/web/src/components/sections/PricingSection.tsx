"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Zap, Code2, Layers, Cuboid } from "lucide-react";
import { useRouter } from "next/navigation";
import { PAKETLER } from "@/data/paketler";

export default function PricingSection() {
    const [periyot, setPeriyot] = useState<'aylik' | 'yillik'>('aylik');
    const router = useRouter();

    const handlePurchase = (paketId: string) => {
        router.push(`/onboarding?paket=${paketId.toLowerCase()}&periyot=${periyot}`);
    };

    // İkon eşleştirme (Teknoloji tiplerine göre)
    const getTechIcon = (tech: string) => {
        if (tech.includes("Statik")) return <Code2 className="w-4 h-4" />;
        if (tech.includes("Dinamik")) return <Layers className="w-4 h-4" />;
        if (tech.includes("3D")) return <Cuboid className="w-4 h-4" />;
        return <Code2 className="w-4 h-4" />;
    };

    return (
        <section className="py-24 text-foreground relative overflow-hidden" id="pricing">
            {/* Arka plan parlama efektleri (Dark Theme Vurguları) */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-rust/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Başlık */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <p className="text-gold font-syne text-sm font-bold tracking-widest uppercase mb-4">
                        Şeffaf & Sürdürülebilir Fiyatlandırma
                    </p>
                    <h2 className="font-syne text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                        İşinizi Büyüten <span className="text-transparent bg-clip-text bg-gradient-to-r from-rust to-gold">Dijital Güç</span>
                    </h2>
                    <p className="text-muted-foreground-300 font-lora text-lg leading-relaxed">
                        Her pakette yapay zeka krediniz ve sektörel siteniz en ince ayrıntısına kadar düşünülmüştür. 
                        Sürpriz maliyet, gizli ücret veya "Sınırsız" yalanı yok. Net kotalar, net başarı.
                    </p>
                </motion.div>

                {/* Aylık / Yıllık Toggle (Framer Motion) */}
                <div className="flex flex-col items-center justify-center mb-16">
                    <div className="flex items-center gap-4 bg-white/5 p-2 rounded-full border border-white/10 backdrop-blur-sm">
                        <button
                            onClick={() => setPeriyot('aylik')}
                            className={`relative px-6 py-2.5 rounded-full font-syne font-bold text-sm transition-colors ${
                                periyot === 'aylik' ? 'text-ink' : 'text-muted-foreground-300 hover:text-white'
                            }`}
                        >
                            {periyot === 'aylik' && (
                                <motion.div
                                    layoutId="pricing-toggle"
                                    className="absolute inset-0 bg-white rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">Aylık</span>
                        </button>

                        <button
                            onClick={() => setPeriyot('yillik')}
                            className={`relative px-6 py-2.5 rounded-full font-syne font-bold text-sm transition-colors ${
                                periyot === 'yillik' ? 'text-ink' : 'text-muted-foreground-300 hover:text-white'
                            }`}
                        >
                            {periyot === 'yillik' && (
                                <motion.div
                                    layoutId="pricing-toggle"
                                    className="absolute inset-0 bg-sage rounded-full"
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
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-4 bg-sage/20 text-sage/90 border border-sage/30 px-4 py-1.5 rounded-full text-sm font-bold font-syne flex items-center gap-2"
                            >
                                <Sparkles className="w-4 h-4" /> %15 İndirim Aktif
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 items-stretch perspective-1000">
                    {PAKETLER.map((paket, i) => {
                        const isBuyume = paket.id.toUpperCase() === 'BUYUME';
                        const isPremium = paket.id.toUpperCase() === 'PREMIUM';
                        const isPremiumPlus = paket.id.toUpperCase() === 'PREMIUMPLUS';
                        const isStandart = paket.id.toUpperCase() === 'STANDART';
                        
                        const gosterimFiyat = periyot === 'aylik' ? paket.aylikFiyat : paket.yillikFiyatAylik;
                        
                        // Metallic 3D gradients and borders
                        let metallicClass = "bg-gradient-to-br from-white/5 to-white/0 border-white/10 shadow-lg";
                        let ringClass = "";
                        let titleColor = "text-white";
                        let buttonClass = "bg-white/10 hover:bg-white/20 text-white";
                        
                        if (isStandart) {
                            // Bronze
                            metallicClass = "bg-gradient-to-b from-[#CD7F32]/20 via-[#8B4513]/10 to-transparent border-[#CD7F32]/50 shadow-[0_10px_40px_rgba(205,127,50,0.1)]";
                            titleColor = "text-[#CD7F32]";
                            buttonClass = "bg-gradient-to-r from-[#CD7F32] to-[#8B4513] hover:brightness-110 text-white shadow-lg shadow-[#CD7F32]/20";
                        } else if (isBuyume) {
                            // Chrome / Silver
                            metallicClass = "bg-gradient-to-br from-gray-300/20 via-gray-100/10 to-transparent border-gray-300/50 shadow-[0_10px_40px_rgba(200,200,200,0.15)]";
                            titleColor = "text-gray-200";
                            buttonClass = "bg-gradient-to-r from-gray-400 to-gray-500 hover:brightness-110 text-white shadow-lg shadow-gray-400/20";
                            ringClass = "ring-2 ring-gray-300 ring-offset-4 ring-offset-background";
                        } else if (isPremium) {
                            // Gold
                            metallicClass = "bg-gradient-to-br from-gold/20 via-yellow-600/10 to-transparent border-gold/50 shadow-[0_10px_40px_rgba(255,215,0,0.15)]";
                            titleColor = "text-gold";
                            buttonClass = "bg-gradient-to-r from-gold to-yellow-600 hover:brightness-110 text-foreground shadow-lg shadow-gold/20";
                        } else if (isPremiumPlus) {
                            // Obsidian / Titanium + Rust
                            metallicClass = "bg-gradient-to-br from-rust/30 via-black/40 to-black/80 border-rust shadow-[0_10px_40px_rgba(220,70,30,0.2)]";
                            titleColor = "text-rust";
                            buttonClass = "bg-gradient-to-r from-rust to-orange-700 hover:brightness-110 text-white shadow-lg shadow-rust/30";
                            ringClass = "ring-1 ring-rust ring-offset-2 ring-offset-background";
                        }

                        return (
                            <motion.div
                                key={paket.id}
                                initial={{ opacity: 0, y: 30, rotateX: 10 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                whileHover={{ 
                                    scale: 1.05, 
                                    rotateY: i % 2 === 0 ? 5 : -5,
                                    rotateX: 5,
                                    z: 50,
                                    transition: { duration: 0.3 }
                                }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                style={{ transformStyle: "preserve-3d" }}
                                className={`
                                    relative flex flex-col rounded-3xl p-6 md:p-8 backdrop-blur-xl transition-all duration-300 border
                                    ${metallicClass} ${ringClass}
                                    ${isBuyume ? 'lg:-translate-y-4 lg:scale-[1.02] z-10' : 'z-0'}
                                `}
                            >
                                {/* Light reflection sweep on hover */}
                                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-[-100%] hover:translate-x-[200%]" />
                                </div>

                                {/* Popüler Badge */}
                                {paket.populer && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-max">
                                        <div className="bg-rust text-white text-xs font-bold font-syne px-4 py-1.5 rounded-full shadow-lg border border-rust/50 flex items-center gap-1.5">
                                            <Sparkles className="w-3.5 h-3.5" /> En Çok Tercih Edilen
                                        </div>
                                    </div>
                                )}

                                {/* Paket Başlık */}
                                <h3 className={`font-syne font-extrabold text-xl mb-2 drop-shadow-md ${titleColor}`}>
                                    {paket.name}
                                </h3>

                                {/* Fiyat */}
                                <div className="mb-6 flex-shrink-0">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-extrabold font-syne text-white tracking-tight">
                                            ₺{gosterimFiyat}
                                        </span>
                                        <span className="text-muted-foreground-400 font-lora text-sm">/ay</span>
                                    </div>
                                    <div className="h-5 mt-1">
                                        {periyot === 'yillik' && (
                                            <span className="text-xs text-muted-foreground-500 line-through">
                                                Aylık alımda ₺{paket.aylikFiyat}/ay
                                            </span>
                                        )}
                                    </div>
                                </div>

                                    <div className="flex items-center gap-2.5 bg-background/40 border border-white/5 rounded-xl p-2.5 shadow-inner">
                                        <div className={`p-1.5 rounded-lg ${paket.premium ? 'bg-gold/20 text-gold' : 'bg-blue-500/20 text-blue-400'}`}>
                                            <Zap className="w-4 h-4" />
                                        </div>
                                        <span className="text-xs font-bold font-syne text-white tracking-wide drop-shadow-sm">
                                            {paket.aiKredi}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2.5 bg-background/40 border border-white/5 rounded-xl p-2.5 shadow-inner">
                                        <div className={`p-1.5 rounded-lg ${paket.premium ? 'bg-rust/20 text-rust' : 'bg-purple-500/20 text-purple-400'}`}>
                                            {getTechIcon(paket.teknoloji)}
                                        </div>
                                        <span className="text-xs font-bold font-syne text-white tracking-wide drop-shadow-sm">
                                            {paket.teknoloji}
                                        </span>
                                    </div>

                                {/* Özellikler Listesi */}
                                <ul className="space-y-4 mb-8 flex-1 font-lora">
                                    {paket.ozellikler.map((ozellik, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <Check className={`w-5 h-5 shrink-0 drop-shadow-sm ${titleColor}`} />
                                            <span className="text-sm text-foreground/90 leading-snug">{ozellik}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Butonu */}
                                <button
                                    onClick={() => handlePurchase(paket.id)}
                                    className={`w-full py-3.5 rounded-xl font-syne font-bold text-[15px] transition-all duration-300 ${buttonClass}`}
                                >
                                    {isPremium ? 'Öncelikli Başla →' : 'Hemen Başla →'}
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
