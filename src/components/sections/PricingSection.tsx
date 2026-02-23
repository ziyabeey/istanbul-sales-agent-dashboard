"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";

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

    return (
        <section className="py-24 bg-slate-50 relative" id="pricing">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold text-primary-900 mb-6"
                    >
                        Maliyet Değil, <span className="text-secondary-500">Çalışma Arkadaşı</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-600 mb-8"
                    >
                        Herkes ister bir çalışanı olsun ama esnaf bunu karşılayamaz. Biz ayda <span className="font-bold text-primary-900">399₺</span>'ye karşılıyoruz. Şeffaf fiyatlandırma, sürpriz maliyet yok.
                    </motion.p>
                </div>

                {/* Mobile View Toggle (Visible only max-md) */}
                <div className="md:hidden flex overflow-x-auto gap-2 pb-6 no-scrollbar snap-x">
                    {pricingPlans.map((plan) => (
                        <button
                            key={plan.id}
                            onClick={() => setActivePlan(plan.id)}
                            className={`snap-center shrink-0 px-6 py-3 rounded-xl font-bold transition-all ${activePlan === plan.id
                                    ? "bg-primary-900 text-white shadow-md transform scale-105"
                                    : "bg-white text-slate-600 border border-slate-200"
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
                  ${plan.popular ? 'border-2 border-secondary-500 shadow-xl md:scale-105 z-10' : 'border border-slate-200 shadow-sm hover:shadow-md'}
                  ${/* Mobile logic: show only active plan */ ''}
                  md:flex ${activePlan === plan.id ? 'flex' : 'hidden md:flex'}
                `}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md w-max">
                                        En Çok Tercih Edilen
                                    </div>
                                )}

                                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-secondary-600' : 'text-primary-900'}`}>{plan.name}</h3>
                                <p className="text-slate-500 text-sm h-12 mb-4">{plan.description}</p>

                                <div className="mb-6 pb-6 border-b border-slate-100">
                                    <span className="text-3xl font-extrabold text-primary-900">{plan.price}₺</span>
                                    <span className="text-slate-500 font-medium">/ay</span>
                                    <p className="text-xs text-slate-400 mt-2 flex items-center justify-between">
                                        <span>Kurulum: {plan.setupFee}</span>
                                        <Info className="w-3 h-3" />
                                    </p>
                                </div>

                                <ul className="space-y-4 mb-8 flex-grow">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start text-sm">
                                            <CheckCircle2 className={`w-5 h-5 shrink-0 mr-3 ${plan.popular ? 'text-secondary-500' : 'text-green-500'}`} />
                                            <span className="text-slate-700 leading-snug">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    variant={plan.popular ? "primary" : "outline"}
                                    className={`w-full mt-auto ${plan.popular ? 'shadow-secondary-500/30' : ''}`}
                                >
                                    <span className="text-sm">Hemen Başla</span>
                                </Button>
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
                    className="mt-16 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto"
                >
                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <h4 className="text-xl font-bold text-primary-900 mb-2">Kurumsal Çözümler (Özel Paket)</h4>
                        <p className="text-slate-600">Çoklu şube, ERP/CRM entegrasyonu ve size özel eğitilmiş AI modeli mi gerekiyor?</p>
                    </div>
                    <Button variant="outline" className="shrink-0">Özel Teklif Alın</Button>
                </motion.div>

            </div>
        </section>
    );
}
