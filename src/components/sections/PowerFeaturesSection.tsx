"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, PhoneCall } from "lucide-react";

export default function PowerFeaturesSection() {
    return (
        <section className="py-24 bg-steel text-cream overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-2 rounded-full border border-ink bg-ink/50 text-stone-light font-medium text-sm mb-6"
                    >
                        kepenk.ai Güç Özellikleri
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Hiçbir Müşteriyi Kaçırmayın
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-stone-light"
                    >
                        Mesai saatleri dışında veya elleriniz doluyken bile işletmeniz satış yapmaya ve randevu almaya devam eder.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* WA Bot Feature */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-cream/5 border border-cream/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-cream/10 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <MessageSquare className="w-12 h-12 text-warm" />
                            <span className="text-xs font-bold uppercase tracking-wider text-ink bg-warm px-3 py-1 rounded-full">Yapay Zeka Satış Uzmanı</span>
                        </div>

                        <h3 className="text-2xl font-bold mb-4">"The Closer" WhatsApp Botu</h3>
                        <p className="text-stone-light mb-6 leading-relaxed">
                            Gece 03:00'te WhatsApp'tan yazan müşteriyi karşılar, ürün/hizmet fiyatını verir. Akıllı diyalog sistemiyle pazarlık yapar, ikna eder ve ödeme linkini göndererek doğrudan satışı kapatır.
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-stone-light">
                                <div className="w-1.5 h-1.5 rounded-full bg-rust"></div> Doğal dilde yazışma ve pazarlık
                            </div>
                            <div className="flex items-center gap-3 text-sm text-stone-light">
                                <div className="w-1.5 h-1.5 rounded-full bg-rust"></div> Form doldurtma ve ödeme tahsilatı
                            </div>
                        </div>
                    </motion.div>

                    {/* Voice Assistant Feature */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-rust/20 to-rust-light/5 border border-rust/20 rounded-3xl p-8 backdrop-blur-sm hover:border-rust/40 transition-colors relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-20">
                            <PhoneCall className="w-32 h-32" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <PhoneCall className="w-12 h-12 text-rust" />
                                <span className="text-xs font-bold uppercase tracking-wider text-rust bg-rust/10 px-3 py-1 rounded-full border border-rust/20">Premium+ Özelliği</span>
                            </div>

                            <h3 className="text-2xl font-bold mb-4">Tam Otonom Sesli Asistan</h3>
                            <p className="text-stone-light mb-6 leading-relaxed">
                                Esnaf telefona bakamadığında çağrıları yanıtlar. 500ms'den düşük gecikmeyle, doğal bir insan sesiyle (Türkçe) konuşur. Adres tarif eder, fiyat bilgisi verir ve randevu defterinize kayıt atar.
                            </p>

                            <div className="inline-flex items-center p-3 rounded-2xl bg-ink/40 border border-cream/5 w-full">
                                <div className="w-10 h-10 rounded-full bg-rust flex items-center justify-center mr-4 relative">
                                    <span className="absolute w-full h-full rounded-full border-2 border-rust animate-ping opacity-75"></span>
                                    <div className="w-2 h-2 bg-cream rounded-full"></div>
                                </div>
                                <div>
                                    <p className="font-lora italic text-sm font-medium">"Buyrun, Ahmet Usta Tesisat. Size nasıl..."</p>
                                    <p className="text-xs text-stone-light mt-1">Gecikme süresi: ~450ms</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
