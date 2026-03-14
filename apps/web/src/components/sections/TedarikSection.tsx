"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Truck, Shield, BadgePercent, ArrowRight } from "lucide-react";

const OZELLIKLER = [
    {
        icon: Shield,
        baslik: "Doğrulanmış Tedarikçiler",
        aciklama: "Sadece kepenk ekibinin test edip onayladığı, puanı 4.5+ olan tedarikçiler ağda yer alır.",
        renk: "#22c55e",
    },
    {
        icon: BadgePercent,
        baslik: "Esnaf Toplu Fiyatı",
        aciklama: "kepenk ağındaki esnaflar bireysel alımdan ortalama %20-35 daha ucuza malzeme ve ürün alır.",
        renk: "#d4a843",
    },
    {
        icon: Truck,
        baslik: "kepenk Güvencesi",
        aciklama: "Ürün hasarlı, hatalı veya geç gelirse kepenk devreye girer. Siz müşteriyle değil, işinizle ilgilenin.",
        renk: "#c04b1e",
    },
];

export default function TedarikSection() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl -translate-y-1/2" />
                <div className="absolute top-1/2 right-0 w-72 h-72 bg-rust/5 rounded-full blur-3xl -translate-y-1/2" />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-12"
                >
                    <p className="text-gold font-mono text-xs uppercase tracking-[0.3em] mb-3">🏭 kepenk Tedarik Ağı</p>
                    <h2 className="font-syne text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
                        Malzemenizi <span className="text-gold">kepenk Güvencesiyle</span> Alın
                    </h2>
                    <p className="text-muted-foreground-light text-base leading-relaxed">
                        Elektrikçisinden boyacısına, restoranından kuaförüne — doğrulanmış tedarikçilerden toplu fiyatlarla,
                        kepenk güvencesiyle sipariş verin.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {OZELLIKLER.map(({ icon: Icon, baslik, aciklama, renk }, i) => (
                        <motion.div
                            key={baslik}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-gold/20 transition-colors group"
                        >
                            <div
                                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors"
                                style={{ backgroundColor: `${renk}20` }}
                            >
                                <Icon className="w-6 h-6" style={{ color: renk }} />
                            </div>
                            <h3 className="text-foreground font-bold text-lg mb-2">{baslik}</h3>
                            <p className="text-muted-foreground-light text-sm leading-relaxed">{aciklama}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <Link
                        href="/tedarik"
                        className="inline-flex items-center gap-2 bg-gold/15 hover:bg-gold/25 border border-gold/30 text-gold font-bold px-8 py-3.5 rounded-xl transition-colors text-sm"
                    >
                        Tedarikçi Ağını İncele
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <p className="text-muted-foreground text-xs mt-3">
                        Sadece aktif kepenk.ai aboneleri için · Ücretsiz erişim
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
