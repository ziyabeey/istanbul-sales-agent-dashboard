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
        icon: <BrainCircuit className="w-8 h-8 text-stone" />,
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
        <section className="py-24 bg-cream relative overflow-hidden" id="features">

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-warm opacity-50 blur-3xl"></div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-ink mb-6"
                    >
                        Arka Planda Çalışan <span className="text-rust">17 Yapay Zeka</span> Ajanı
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-stone leading-relaxed"
                    >
                        Siz dükkanda müşterinize hizmet verirken, aralarında sosyal medya uzmanı, müşteri temsilcisi ve pazarlamacının bulunduğu koca bir ekip sizin için çalışır.
                    </motion.p>
                </div>

                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {visibleFeatures.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                whileHover="hover"
                                className="bg-cream rounded-3xl p-8 shadow-sm border border-warm hover:shadow-xl relative overflow-hidden group cursor-pointer"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-warm flex items-center justify-center mb-6 transition-transform duration-300 transform group-hover:-translate-y-2">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-ink mb-4">{feature.title}</h3>
                                <p className="text-stone leading-relaxed mb-4">{feature.description}</p>

                                {/* Hover Panel Outline/Glow effect */}
                                <motion.div
                                    variants={{ hover: { opacity: 1, y: 0 }, initial: { opacity: 0, y: 10 } }}
                                    initial="initial"
                                    className="pt-4 border-t border-warm flex items-center justify-between"
                                >
                                    <span className="text-rust text-sm font-semibold">Uygulamada Gör</span>
                                    <div className="w-6 h-6 rounded-full bg-rust-light/20 flex items-center justify-center text-rust">→</div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <div className="mt-12 text-center">
                    <motion.button
                        onClick={() => setShowAll(!showAll)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center justify-center px-6 py-3 border border-warm shadow-sm text-sm font-medium rounded-xl text-ink bg-cream hover:bg-warm transition-colors cursor-pointer"
                    >
                        {showAll ? "Daha Az Göster" : `Tüm Ajanları Gör (${features.length - 3})`}
                    </motion.button>
                </div>

            </div>
        </section>
    );
}
