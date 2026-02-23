"use client";

import React from "react";
import { motion } from "framer-motion";
import { Coffee, BrainCircuit, CalendarHeart, Share2, Award, Zap } from "lucide-react";

const features = [
    {
        icon: <Coffee className="w-8 h-8 text-secondary-500" />,
        title: "Günlük Motivasyon ve Esnaf Asistanı",
        description: "Her sabah 08:00'de 'Günaydın' mesajıyla güne başlar. Sektöre ve hava durumuna göre günlük iş tavsiyeleri verir.",
    },
    {
        icon: <BrainCircuit className="w-8 h-8 text-blue-500" />,
        title: "Sektörel Know-How",
        description: "Elektrikçi için monofaz hesaplamaları, kuaför için renk teorisi gibi mesleğe özel bilgileri barındıran akıllı altyapı.",
    },
    {
        icon: <CalendarHeart className="w-8 h-8 text-rose-500" />,
        title: "Özel Gün Otomasyonu",
        description: "Müşterilerinizin doğum günlerini ve özel günlerini hatırlar, otomatik kutlama mesajları ve kampanyalar üretir.",
    },
    {
        icon: <Share2 className="w-8 h-8 text-indigo-500" />,
        title: "Google & Sosyal Medya Yönetimi",
        description: "Google Haritalar profilinizi canlı tutar. Kötü yorumlara anında yanıt tasarlar. Instagram ve TikTok için içerik fikirleri sunar.",
    },
    {
        icon: <Award className="w-8 h-8 text-amber-500" />,
        title: "XINXIA Partner Etiketi",
        description: "Dükkan camına yapıştırdığınız özel QR kodlu vinil etiket ile organik mahalle reklamı ve güçlü bir sosyal kanıt sağlar.",
    },
    {
        icon: <Zap className="w-8 h-8 text-green-500" />,
        title: "Eğitmen Ajan ile 5 Adımda Kurulum",
        description: "Karmaşık PDF'ler yok. 'Şimdi şu butona tıkla' diyen basit, 2 dakikalık oyunlaştırılmış kolay kurulum deneyimi.",
    }
];

export default function FeaturesSection() {
    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-primary-900 mb-6"
                    >
                        Arka Planda Çalışan <span className="text-secondary-500">17 Yapay Zeka</span> Ajanı
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600 leading-relaxed"
                    >
                        Siz dükkanda müşterinize hizmet verirken, aralarında sosyal medya uzmanı, müşteri temsilcisi ve pazarlamacının bulunduğu koca bir ekip sizin için çalışır.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-primary-900 mb-4">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
