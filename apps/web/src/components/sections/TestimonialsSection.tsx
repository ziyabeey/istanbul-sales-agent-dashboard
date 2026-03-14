"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const YORUMLAR = [
    {
        ad: "Ahmet Kaya",
        isletme: "Elektrikçi",
        sehir: "İstanbul, Kadıköy",
        emoji: "⚡",
        yildiz: 5,
        yorum: "Gece 2'de müşterim mesaj attı. AI asistan anında cevap verdi, randevuyu aldı. Sabah gittiğimde müşteri zaten bekliyordu. kepenk.ai olmadan hayal bile edemiyorum.",
        onay: "3 ayda +40 yeni müşteri",
    },
    {
        ad: "Fatma Şahin",
        isletme: "Güzellik Merkezi",
        sehir: "İstanbul, Beşiktaş",
        emoji: "💄",
        yildiz: 5,
        yorum: "6 ayda randevularım %65 arttı. WhatsApp'tan randevu alıyor, doğum günlerini hatırlıyor, Google yorumlarıma cevap yazıyor. Tek başıma bunları yapamam ki.",
        onay: "%65 randevu artışı",
    },
    {
        ad: "Mehmet Yılmaz",
        isletme: "Oto Servis",
        sehir: "Ankara, Çankaya",
        emoji: "🔧",
        yildiz: 5,
        yorum: "Google puanım 2.1'den 4.8'e çıktı. Artık her olumsuz yoruma AI hızlıca profesyonel cevap yazıyor. Müşteriler 'ne kadar ilgili bir işletme' diyor.",
        onay: "2.1 → 4.8 Google Puanı",
    },
];

const ISTATISTIKLER = [
    { value: "1.200+", label: "Aktif Esnaf" },
    { value: "₺450M+", label: "İşlenen Ciro" },
    { value: "4.9/5", label: "Memnuniyet" },
    { value: "7/24", label: "Kesintisiz AI" },
];

function StarRow({ count }: { count: number }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: count }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
            ))}
        </div>
    );
}

export default function TestimonialsSection() {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 pb-16 border-b border-border/15">
                    {ISTATISTIKLER.map(({ value, label }, i) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-3xl md:text-4xl font-extrabold text-foreground font-syne">{value}</div>
                            <div className="text-muted-foreground text-sm mt-1">{label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Section header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold bg-rust/10 text-rust border border-rust/20 mb-4">
                        ★ Gerçek Esnaflar, Gerçek Sonuçlar
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-foreground font-syne mb-3">
                        Binlerce Esnaf Büyümeye Başladı
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Türk esnafı için, Türk esnafı tarafından tercih edilen platform.
                    </p>
                </div>

                {/* Testimonial cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {YORUMLAR.map(({ ad, isletme, sehir, emoji, yildiz, yorum, onay }, i) => (
                        <motion.div
                            key={ad}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.12 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all flex flex-col backdrop-blur-sm"
                        >
                            {/* Stars */}
                            <StarRow count={yildiz} />

                            {/* Quote */}
                            <p className="text-foreground/80 text-base leading-relaxed mt-4 mb-6 flex-1">
                                &ldquo;{yorum}&rdquo;
                            </p>

                            {/* Result badge */}
                            <div className="bg-rust/8 border border-rust/15 rounded-xl px-3 py-2 mb-4 text-center">
                                <span className="text-rust text-sm font-bold">✓ {onay}</span>
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-border/10">
                                <div className="w-10 h-10 rounded-full bg-warm border border-border/20 flex items-center justify-center text-xl flex-shrink-0">
                                    {emoji}
                                </div>
                                <div>
                                    <div className="text-foreground font-bold text-sm">{ad}</div>
                                    <div className="text-muted-foreground text-xs">{isletme} · {sehir}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom trust logos */}
                <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-muted-foreground/50 text-sm">
                    <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        256-bit SSL
                    </span>
                    <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                        iyzico Güvenli Ödeme
                    </span>
                    <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        KVKK Uyumlu
                    </span>
                    <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        30 Gün İade Garantisi
                    </span>
                </div>
            </div>
        </section>
    );
}
