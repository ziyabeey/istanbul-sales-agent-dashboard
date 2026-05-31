"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PublicPageShell from "@/components/layout/PublicPageShell";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Shield, BadgePercent, Truck, CheckCircle2, ChevronRight } from "lucide-react";

const KATEGORILER = [
    {
        id: "elektrik-tesisat",
        ad: "Elektrik & Tesisat",
        emoji: "⚡",
        aciklama: "Kablo, sigorta, priz, kombi parçaları ve tesisat malzemeleri",
        tedarikciSayisi: 12,
        ortalamaindirim: 28,
        urunler: ["NYA/NYM Kablo", "Sigorta Kutusu", "LED Armatür", "Kombi Parçaları", "Priz & Anahtar", "Boru & Fitting"],
    },
    {
        id: "boya-dekorasyon",
        ad: "Boya & Dekorasyon",
        emoji: "🖌️",
        aciklama: "İç/dış cephe boyası, macun, şapka ve dekoratif malzemeler",
        tedarikciSayisi: 9,
        ortalamaindirim: 31,
        urunler: ["Marshall/Jotun Boya", "Dekoratif Boya", "Macun & Alçı", "Duvar Kağıdı", "Boya Rulonu & Fırça", "Astar"],
    },
    {
        id: "guzellik-kozmetik",
        ad: "Güzellik & Kozmetik",
        emoji: "💅",
        aciklama: "Saç boyası, cilt bakım ürünleri, epilasyon malzemeleri ve ekipmanlar",
        tedarikciSayisi: 15,
        ortalamaindirim: 24,
        urunler: ["Saç Boyası (Wella, L'Oréal)", "Cilt Bakım Ürünleri", "Epilasyon Mumu & Makinesi", "Manikür Seti", "Sterilizasyon Cihazı", "Kuaför Koltuğu"],
    },
    {
        id: "restoran-kafe",
        ad: "Restoran & Kafe Ekipmanları",
        emoji: "🍽️",
        aciklama: "Mutfak ekipmanları, servis malzemeleri, ambalaj ve içecek ekipmanları",
        tedarikciSayisi: 18,
        ortalamaindirim: 22,
        urunler: ["Endüstriyel Buzdolabı", "Espresso Makinesi", "Ambalaj & Paket Servis", "Mutfak Robotu", "Servis Tabağı & Bardak", "Fırın & Ocak"],
    },
    {
        id: "spor-fitness",
        ad: "Spor & Fitness Ekipmanları",
        emoji: "💪",
        aciklama: "Spor aleti, mat, ekipman bakım malzemeleri ve salon aksesuarları",
        tedarikciSayisi: 8,
        ortalamaindirim: 35,
        urunler: ["Koşu Bandı", "Dambıl & Halter Seti", "Yoga & Spor Matı", "Ağırlık Demiri", "Bisiklet & Fitness Aleti", "Soyunma Dolabı"],
    },
    {
        id: "temizlik-hijyen",
        ad: "Temizlik & Hijyen",
        emoji: "🧹",
        aciklama: "Profesyonel temizlik ürünleri, ekipmanlar ve tüketim malzemeleri",
        tedarikciSayisi: 11,
        ortalamaindirim: 27,
        urunler: ["Endüstriyel Temizleyici", "Polisaj Makinesi", "Temizlik Arabası", "Mikrofiber Bez", "Dezenfektan", "Çöp Torbası (Toplu)"],
    },
];

export default function TedarikPage() {
    const [seciliKategori, setSeciliKategori] = useState<string | null>(null);

    return (
        <PublicPageShell>

            {/* Hero */}
            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gold/8 rounded-full blur-3xl" />
                </div>
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <p className="text-gold font-mono text-xs uppercase tracking-[0.3em] mb-4">🏭 kepenk Tedarik Ağı</p>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground font-syne tracking-tight mb-5 leading-[1.1]">
                            Malzemenizi <span className="text-gold">Güvenle</span> ve<br />
                            <span className="text-rust">Ucuza</span> Alın
                        </h1>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                            kepenk.ai aboneleri olarak doğrulanmış tedarikçilerden toplu fiyatlarla sipariş verin.
                            Ürün sorunlarında kepenk güvencesi devreye girer.
                        </p>

                        <div className="flex flex-wrap justify-center gap-6 mb-8">
                            {[
                                { icon: Shield, label: "Doğrulanmış Tedarikçiler", renk: "#22c55e" },
                                { icon: BadgePercent, label: "%20-35 Esnaf İndirimi", renk: "#d4a843" },
                                { icon: Truck, label: "kepenk Güvencesi", renk: "#c04b1e" },
                            ].map(({ icon: Icon, label, renk }) => (
                                <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Icon className="w-4 h-4" style={{ color: renk }} />
                                    <span>{label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Kategoriler */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-foreground font-syne font-bold text-2xl mb-8 text-center">Ürün Kategorileri</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {KATEGORILER.map((kat, i) => (
                            <motion.div
                                key={kat.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 }}
                                className={`bg-white/5 border rounded-2xl p-6 cursor-pointer transition-all group ${
                                    seciliKategori === kat.id
                                        ? 'border-gold/40 bg-gold/5'
                                        : 'border-white/10 hover:border-gold/20'
                                }`}
                                onClick={() => setSeciliKategori(seciliKategori === kat.id ? null : kat.id)}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">{kat.emoji}</span>
                                        <div>
                                            <h3 className="text-foreground font-bold text-base">{kat.ad}</h3>
                                            <p className="text-muted-foreground text-xs">{kat.tedarikciSayisi} tedarikçi</p>
                                        </div>
                                    </div>
                                    <span className="text-gold text-sm font-bold bg-gold/15 px-2 py-0.5 rounded-full">
                                        -%{kat.ortalamaindirim}
                                    </span>
                                </div>

                                <p className="text-muted-foreground text-xs leading-relaxed mb-4">{kat.aciklama}</p>

                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {kat.urunler.slice(0, 3).map((u, ui) => (
                                        <span key={ui} className="text-xs bg-white/5 text-muted-foreground px-2 py-0.5 rounded-full">
                                            {u}
                                        </span>
                                    ))}
                                    {kat.urunler.length > 3 && (
                                        <span className="text-xs text-muted-foreground px-2 py-0.5">
                                            +{kat.urunler.length - 3} daha
                                        </span>
                                    )}
                                </div>

                                {seciliKategori === kat.id && (
                                    <div className="border-t border-white/10 pt-4 mt-2">
                                        <p className="text-muted-foreground text-xs mb-3">Tüm ürünler:</p>
                                        <ul className="space-y-1.5">
                                            {kat.urunler.map((u, ui) => (
                                                <li key={ui} className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <CheckCircle2 className="w-3 h-3 text-gold flex-shrink-0" />
                                                    {u}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="flex items-center gap-1 text-gold text-xs font-semibold mt-3 group-hover:gap-2 transition-all">
                                    Teklif Al
                                    <ChevronRight className="w-3.5 h-3.5" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tedarikçi Başvuru */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/3 border-y border-white/5">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-extrabold text-foreground font-syne mb-4">
                        Tedarikçi misiniz?
                    </h2>
                    <p className="text-muted-foreground mb-6">
                        1.200+ aktif esnaf müşterinize ulaşın. Ağımıza katılmak için başvurun.
                    </p>
                    <Link href="/iletisim">
                        <Button variant="outline" className="border-gold/40 text-gold hover:bg-gold/10 hover:text-gold">
                            Tedarikçi Başvuru Formu →
                        </Button>
                    </Link>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <p className="text-muted-foreground text-sm mb-4">
                        Tedarik ağına erişim için aktif kepenk.ai aboneliği gereklidir.
                    </p>
                    <Link href="/onboarding">
                        <Button size="lg" variant="primary">
                            Hemen Abone Ol →
                        </Button>
                    </Link>
                </div>
            </section>

        </PublicPageShell>
    );
}
