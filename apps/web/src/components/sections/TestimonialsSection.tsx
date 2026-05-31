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
        yorum: "Gece 2'de müşterim mesaj attı. AI asistan anında cevap verdi, randevuyu aldı. Sabah gittiğimde müşteri zaten bekliyordu. KPNK olmadan hayal bile edemiyorum.",
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

function StarRow({ count }: { count: number }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: count }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
        </div>
    );
}

export default function TestimonialsSection() {
    return (
        <section className="py-20 bg-gray-50/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
                        ★ Gerçek Esnaflar, Gerçek Sonuçlar
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 font-syne mb-3">
                        Esnaflardan Geri Bildirimler
                    </h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Türk esnafı için geliştirilen platformumuzdan memnuniyet.
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
                            className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all flex flex-col shadow-sm"
                        >
                            {/* Stars */}
                            <StarRow count={yildiz} />

                            {/* Quote */}
                            <p className="text-gray-700 text-base leading-relaxed mt-4 mb-6 flex-1">
                                &ldquo;{yorum}&rdquo;
                            </p>

                            {/* Result badge */}
                            <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-3 py-2 mb-4 text-center">
                                <span className="text-primary text-sm font-bold">✓ {onay}</span>
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-amber-50 border border-gray-100 flex items-center justify-center text-xl flex-shrink-0">
                                    {emoji}
                                </div>
                                <div>
                                    <div className="text-gray-900 font-bold text-sm">{ad}</div>
                                    <div className="text-gray-500 text-xs">{isletme} · {sehir}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom trust logos */}
                <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm">
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
