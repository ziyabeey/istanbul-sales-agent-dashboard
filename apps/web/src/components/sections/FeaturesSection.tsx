"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, BrainCircuit, CalendarHeart, Share2, Award, Zap } from "lucide-react";

const features = [
    {
        icon: <Coffee className="w-8 h-8 text-rust" />,
        title: "Günlük Motivasyon ve Esnaf Asistanı",
        description: "Her sabah 08:00'de 'Günaydın' mesajıyla güne başlar. Sektöre ve hava durumuna göre günlük iş tavsiyeleri verir.",
    },
    {
        icon: <BrainCircuit className="w-8 h-8 text-muted-foreground" />,
        title: "Sektörel Know-How",
        description: "Elektrikçi için monofaz hesaplamaları, kuaför için renk teorisi gibi mesleğe özel bilgileri barındıran akıllı altyapı.",
    },
    {
        icon: <CalendarHeart className="w-8 h-8 text-rust-light" />,
        title: "Özel Gün Otomasyonu",
        description: "Müşterilerinizin doğum günlerini ve özel günlerini hatırlar, otomatik kutlama mesajları ve kampanyalar üretir.",
    },
    {
        icon: <Share2 className="w-8 h-8 text-steel" />,
        title: "Google & Sosyal Medya Yönetimi",
        description: "Google Haritalar profilinizi canlı tutar. Kötü yorumlara anında yanıt tasarlar. Instagram ve TikTok için içerik fikirleri sunar.",
    },
    {
        icon: <Award className="w-8 h-8 text-gold" />,
        title: "kepenk.ai Partner Etiketi",
        description: "Dükkan camına yapıştırdığınız özel QR kodlu vinil etiket ile organik mahalle reklamı ve güçlü bir sosyal kanıt sağlar.",
    },
    {
        icon: <Zap className="w-8 h-8 text-rust" />,
        title: "Eğitmen Ajan ile 5 Adımda Kurulum",
        description: "Karmaşık PDF'ler yok. 'Şimdi şu butona tıkla' diyen basit, 2 dakikalık oyunlaştırılmış kolay kurulum deneyimi.",
    }
];

export default function FeaturesSection() {
    const [showAll, setShowAll] = useState(false);
    const visibleFeatures = showAll ? features : features.slice(0, 3);

    return (
        <section className="py-24 relative overflow-hidden" id="features">

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-warm opacity-50 blur-3xl"></div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-foreground mb-6"
                    >
                        Arka Planda Çalışan <span className="text-rust">17 Yapay Zeka</span> Ajanı
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-muted-foreground leading-relaxed"
                    >
                        Siz dükkanda müşterinize hizmet verirken, aralarında sosyal medya uzmanı, müşteri temsilcisi ve pazarlamacının bulunduğu koca bir ekip sizin için çalışır.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 perspective-1000">
                    <AnimatePresence mode="popLayout">
                        {visibleFeatures.map((feature, index) => {
                            const isRust = index % 2 === 0;

                            return (
                                <motion.div
                                    key={feature.title}
                                    layout
                                    initial={{ opacity: 0, y: 30, rotateX: 10 }}
                                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{
                                        scale: 1.03,
                                        rotateX: 5,
                                        rotateY: index % 2 === 0 ? 5 : -5,
                                        z: 30,
                                        transition: { duration: 0.3 }
                                    }}
                                    style={{ transformStyle: "preserve-3d" }}
                                    className={`bg-background/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-sm border border-white/10 hover:shadow-2xl hover:shadow-rust/10 relative overflow-hidden group cursor-pointer flex flex-col transition-colors
                                    ${isRust ? 'hover:border-rust/30' : 'hover:border-white/30'}`}
                                >
                                    {/* Glass reflection sweep */}
                                    <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%]" />
                                    </div>

                                    <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center mb-8 transition-transform duration-500 transform group-hover:scale-110 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                                        {feature.icon}
                                    </div>
                                    <h3 className="relative z-10 text-xl font-syne font-bold text-white mb-4 drop-shadow-sm group-hover:text-rust transition-colors">{feature.title}</h3>
                                    <p className="relative z-10 text-muted-foreground-300 font-lora text-sm sm:text-base leading-relaxed mb-8 flex-grow">{feature.description}</p>

                                    {/* Hover Panel Outline/Glow effect */}
                                    <motion.div
                                        variants={{ hover: { opacity: 1, y: 0 }, initial: { opacity: 0, y: 10 } }}
                                        initial="initial"
                                        className="relative z-10 pt-5 border-t border-white/10 flex items-center justify-between"
                                    >
                                        <span className="text-rust text-sm font-bold font-syne">Nasıl Çalışır?</span>
                                        <div className="w-8 h-8 rounded-full bg-rust/10 flex items-center justify-center text-rust group-hover:translate-x-1 group-hover:bg-rust group-hover:text-white transition-all shadow-sm">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                <div className="mt-12 text-center">
                    <motion.button
                        onClick={() => setShowAll(!showAll)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center justify-center px-6 py-3 border border-border shadow-sm text-sm font-medium rounded-xl text-foreground bg-background hover:bg-warm transition-colors cursor-pointer"
                    >
                        {showAll ? "Daha Az Göster" : `Tüm Ajanları Gör (${features.length - 3})`}
                    </motion.button>
                </div>

            </div>
        </section>
    );
}
