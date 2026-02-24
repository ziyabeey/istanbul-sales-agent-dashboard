"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const pricingPlans = [
    {
        id: "temel",
        name: "TEMEL",
        price: "399",
        setupFee: "Ücretsiz",
        popular: false,
        description: "Dijitale yeni adım atan küçük esnaflar için ideal başlangıç.",
        features: [
            "Sabah Motivasyon Mesajı",
            "Özel Gün Otomasyonu (SMS & WA)",
            "PWA Mobil Uygulama",
            "Sektörel Know-How Asistanı",
            "Dükkan Camı Partner Etiketi",
            "Temel WhatsApp Karşılama Botu (SSS)",
        ],
    },
    {
        id: "standart",
        name: "STANDART",
        price: "799",
        setupFee: "990₺",
        popular: false,
        description: "İşini büyütmek ve sosyal medyada var olmak isteyenler için.",
        features: [
            "Temel Paketteki Her Şey",
            "Fiyat ve Randevu Veren WA Botu",
            "Facebook Sayfa Yönetimi Eğitimi",
            "Aylık 15 Sosyal Medya İçerik Fikri",
        ],
    },
    {
        id: "buyume",
        name: "BÜYÜME",
        price: "1.499",
        setupFee: "1.990₺",
        popular: false,
        description: "Rekabetin yoğun olduğu sektörlerde bir adım öne çıkmak için.",
        features: [
            "Standart Paketteki Her Şey",
            "Tahsilat ve Form Çözümlü WA Botu",
            "TikTok İçerik Strateji Fikirleri",
            "Aylık 30 Sosyal Medya İçeriği",
            "Google Ads Kurulumu (Manuel)",
            "Haftalık Performans Raporlaması",
        ],
    },
    {
        id: "premium",
        name: "PREMİUM",
        price: "2.999",
        setupFee: "2.800₺",
        popular: true, // Highlighted text Best Value
        description: "Dijitalleşmeyi tamamen otomatik pilota almak isteyen vizyoner esnaflar için.",
        features: [
            "Büyüme Paketindeki Her Şey",
            "'The Closer' WhatsApp Satış Botu (Pazarlık & Satış Kapatma)",
            "Otomatik Google Yorum Yönetimi",
            "Meta ve Google Ads Tam Yönetimi",
            "Aylık 60 Premium İçerik",
            "Günlük WhatsApp Raporlaması",
        ],
    },
    {
        id: "premium-plus",
        name: "PREMİUM+ SESLİ",
        price: "4.499",
        setupFee: "3.500₺",
        popular: false,
        description: "Çağrı merkezi gibi çalışan rakipsiz otonom sistem.",
        features: [
            "Premium Paketindeki Her Şey",
            "Tam Otonom Türkçe Sesli Asistan",
            "Sınırsız Çağrı Karşılama ve Randevu",
            "Kayıp Çağrı Kurtarma Sistemi",
        ],
    },
];

export default function PricingSection() {
    const [activePlan, setActivePlan] = useState("premium"); // Mobile view active tab
    const router = useRouter();

    const handlePurchase = (planId: string, basePrice: string) => {
        const finalPrice = parseInt(basePrice.replace(/\./g, '')) * 12;
        router.push(`/onboarding?paket=${planId}&fiyat=${finalPrice}`);
    };

    return (
        <section className="py-24 bg-cream relative" id="pricing">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-syne text-3xl md:text-5xl font-extrabold text-ink mb-6 tracking-tight"
                    >
                        Maliyet Değil, <span className="text-rust">Çalışma Arkadaşı</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-stone-light mb-8 max-w-2xl mx-auto"
                    >
                        Herkes ister bir çalışanı olsun ama esnaf bunu karşılayamaz. Biz ayda <span className="font-bold text-ink">399₺</span>'ye karşılıyoruz. Şeffaf fiyatlandırma, sürpriz maliyet yok.
                    </motion.p>
                </div>

                {/* Mobile View Toggle (Visible only max-md) */}
                <div className="md:hidden flex overflow-x-auto gap-2 pb-6 no-scrollbar snap-x">
                    {pricingPlans.map((plan) => (
                        <button
                            key={plan.id}
                            onClick={() => setActivePlan(plan.id)}
                            className={`snap-center shrink-0 px-6 py-3 rounded-xl font-bold transition-all ${activePlan === plan.id
                                ? "bg-ink text-cream shadow-md transform scale-105"
                                : "bg-white text-stone border border-warm"
                                }`}
                        >
                            {plan.name}
                        </button>
                    ))}
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 xl:gap-8 gap-y-12">
                    <AnimatePresence mode="popLayout">
                        {pricingPlans.map((plan, index) => (
                            <motion.div
                                key={plan.id}
                                layout
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className={`
                  relative bg-white rounded-3xl p-6 flex flex-col
                  ${plan.popular ? 'border-2 border-rust shadow-xl md:scale-105 z-10' : 'border border-warm shadow-sm hover:shadow-md'}
                  ${/* Mobile logic: show only active plan */ ''}
                  md:flex ${activePlan === plan.id ? 'flex' : 'hidden md:flex'}
                `}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-rust text-cream px-4 py-1 rounded-full text-sm font-bold shadow-md w-max border border-rust-light">
                                        En Çok Tercih Edilen
                                    </div>
                                )}

                                <h3 className={`text-xl font-syne font-bold mb-2 ${plan.popular ? 'text-rust' : 'text-ink'}`}>{plan.name}</h3>
                                <p className="text-stone-light text-sm h-12 mb-4 leading-relaxed">{plan.description}</p>

                                <div className="mb-6 pb-6 border-b border-warm">
                                    <div className="flex items-baseline mb-1">
                                        <span className="text-3xl font-extrabold text-ink">
                                            {plan.price}₺
                                        </span>
                                        <span className="text-stone-light font-medium ml-1">/ay</span>
                                    </div>
                                    <p className="text-sm font-medium text-stone mt-2 py-1 px-3 bg-warm rounded-lg inline-block border border-stone-light/20">
                                        Yıllık faturalandırılır ({(parseInt(plan.price.replace(/\./g, '')) * 12).toLocaleString('tr-TR')}₺ / yıl)
                                    </p>
                                    <p className="text-xs text-stone-light mt-4 flex items-center justify-between">
                                        <span>Kurulum: {plan.setupFee}</span>
                                        <Info className="w-3 h-3" />
                                    </p>
                                </div>

                                <ul className="space-y-4 mb-8 flex-grow">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start text-sm">
                                            <CheckCircle2 className={`w-5 h-5 shrink-0 mr-3 ${plan.popular ? 'text-rust' : 'text-gold'}`} />
                                            <span className="text-stone leading-snug">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-auto">
                                    <Button
                                        variant={plan.popular ? "primary" : "outline"}
                                        className={`w-full ${plan.popular ? 'shadow-rust/30 shadow-lg' : ''}`}
                                        onClick={() => handlePurchase(plan.id, plan.price)}
                                    >
                                        <span className="text-sm">Hemen Başla</span>
                                    </Button>
                                </motion.div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Enterprise Callout */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 bg-white rounded-2xl p-8 border border-warm shadow-sm flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto ring-1 ring-ink/5"
                >
                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <h4 className="text-xl font-bold text-ink mb-2 font-syne">Kurumsal Çözümler (Özel Paket)</h4>
                        <p className="text-stone">Çoklu şube, ERP/CRM entegrasyonu ve size özel eğitilmiş AI modeli mi gerekiyor?</p>
                    </div>
                    <Button variant="outline" className="shrink-0">Özel Teklif Alın</Button>
                </motion.div>

            </div>
        </section>
    );
}
