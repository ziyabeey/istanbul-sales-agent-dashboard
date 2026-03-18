"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import FooterTrustSection from "@/components/sections/FooterTrustSection";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import {
    Camera, MapPin, Users, Share2, BarChart2,
    CheckCircle2, Lock, CalendarDays, FileText, Smartphone
} from "lucide-react";

const OZELLIKLER = [
    {
        icon: Camera,
        baslik: "Günlük Fotoğraf Günlüğü",
        aciklama: "Her gün şantiyeden fotoğraf çekin, tarihe göre otomatik sıralanır. Proje başından sonuna görsel tarihçe oluşur.",
        renk: "#c04b1e",
    },
    {
        icon: MapPin,
        aciklama: "GPS konum damgasıyla fotoğraf kaydı. Hangi noktada, ne zaman çekildiği otomatik işlenir.",
        baslik: "Konum Damgalı Kayıt",
        renk: "#3b82f6",
    },
    {
        icon: Share2,
        baslik: "Müşteri Paylaşım Linki",
        aciklama: "Tek tıkla özel link oluşturun. Müşteriniz ilerleyişi kendi telefonundan takip eder — sizi aramak zorunda kalmaz.",
        renk: "#22c55e",
    },
    {
        icon: Users,
        baslik: "Çok Kullanıcı Desteği",
        aciklama: "Usta, kalfa ve asistan — herkes kendi hesabından fotoğraf ekleyebilir. Tüm kayıtlar merkezi günlükte toplanır.",
        renk: "#8b5cf6",
    },
    {
        icon: CalendarDays,
        baslik: "Haftalık İlerleme Raporu",
        aciklama: "AI her hafta otomatik ilerleme raporu oluşturur. Müşteriye WhatsApp'tan gönderilir, siz onaylar veya düzenlersiniz.",
        renk: "#d4a843",
    },
    {
        icon: FileText,
        baslik: "Metraj & Not Kaydı",
        aciklama: "Fotoğrafın yanına ölçü, not ve görev ekleyin. Tüm saha bilgisi tek yerde, kaybolmaz.",
        renk: "#6b7280",
    },
];

const NASIL_CALISIR = [
    { no: "01", baslik: "Proje Oluştur", aciklama: "Dashboard'dan yeni proje açın, müşteri adı ve adresini girin." },
    { no: "02", baslik: "Usta Eklenir", aciklama: "WhatsApp ile davet edin; saha ekibi kendi telefonundan fotoğraf yükler." },
    { no: "03", baslik: "Müşteri Takip Eder", aciklama: "Paylaşım linki WhatsApp'a gönderilir. Müşteri uygulamasız, tarayıcıdan görür." },
    { no: "04", baslik: "Rapor Hazırlanır", aciklama: "AI haftalık özet ve ilerleme yüzdesi hesaplar, müşteriye otomatik iletilir." },
];

const SECENEKLER = [
    { label: "Şantiye sayısı sınırsız", var: true },
    { label: "Günlük fotoğraf limiti yok", var: true },
    { label: "Müşteri paylaşım linkleri", var: true },
    { label: "GPS konum damgası", var: true },
    { label: "Çok kullanıcı (usta, kalfa)", var: true },
    { label: "WhatsApp ile haftalık rapor", var: true },
    { label: "Metraj ve not kaydı", var: true },
    { label: "PDF proje raporu (Premium+)", var: false },
];

export default function SantiyeGunluguPage() {
    return (
        <main className="min-h-screen bg-background font-sans">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rust/8 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-steel/8 rounded-full blur-3xl" />
                </div>
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="inline-flex items-center gap-2 bg-rust/10 border border-rust/20 rounded-full px-4 py-1.5 mb-6">
                            <span className="text-rust text-xs font-mono uppercase tracking-widest">Premium Özellik</span>
                            <Lock className="w-3 h-3 text-rust" />
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground font-syne tracking-tight mb-5 leading-[1.1]">
                            Şantiye Günlüğü<br />
                            <span className="text-rust">Müşteriniz Her Şeyi Görür</span>
                        </h1>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                            Müteahhit, mimar ve iç mimar için tasarlandı. Şantiyeden çektiğiniz fotoğraflar
                            otomatik günlüğe eklenir, müşteri kendi telefonundan takip eder.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href="/onboarding">
                                <Button size="lg" variant="primary">Premium ile Aktif Et →</Button>
                            </Link>
                            <Link href="/mimar-tasarimci">
                                <Button size="lg" variant="outline" className="border-white/20 text-foreground hover:bg-white/10">
                                    Mimar Sayfasını Gör
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Nasıl Çalışır - 4 Adım */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/3 border-y border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-rust font-mono text-xs uppercase tracking-[0.3em] mb-3">İş Akışı</p>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground font-syne">4 Adımda Şantiye Günlüğü</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {NASIL_CALISIR.map((adim, i) => (
                            <motion.div
                                key={adim.no}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-rust/20 transition-colors"
                            >
                                <span className="text-rust font-mono font-bold text-sm block mb-3">{adim.no}</span>
                                <h3 className="text-foreground font-bold text-sm mb-2">{adim.baslik}</h3>
                                <p className="text-muted-foreground text-xs leading-relaxed">{adim.aciklama}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Özellikler Grid */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground font-syne">Neler Dahil?</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {OZELLIKLER.map(({ icon: Icon, baslik, aciklama, renk }, i) => (
                            <motion.div
                                key={baslik}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-rust/20 transition-colors"
                            >
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                                    style={{ backgroundColor: `${renk}20` }}
                                >
                                    <Icon className="w-5 h-5" style={{ color: renk }} />
                                </div>
                                <h3 className="text-foreground font-bold text-base mb-2">{baslik}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{aciklama}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Telefon Mockup + Özellik Listesi */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/3 border-y border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Sol — Mockup */}
                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-background border border-white/10 rounded-3xl p-6 font-mono text-xs"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Smartphone className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">Müşteri paylaşım linki</span>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { tarih: "15 Mart", metin: "Zemin beton dökümü tamamlandı", renk: "bg-rust/20 text-rust" },
                                    { tarih: "16 Mart", metin: "Kolon kalıpları hazırlandı", renk: "bg-steel/20 text-steel" },
                                    { tarih: "17 Mart", metin: "Elektrik tesisat döşemesi başladı", renk: "bg-gold/20 text-gold" },
                                    { tarih: "Bugün", metin: "1. kat duvar örme devam ediyor", renk: "bg-green-500/20 text-green-400" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <span className={`text-[10px] px-2 py-1 rounded-full shrink-0 ${item.renk}`}>{item.tarih}</span>
                                        <div className="flex-1">
                                            <p className="text-foreground/80 text-xs">{item.metin}</p>
                                            <div className="w-full h-14 bg-white/5 border border-white/10 rounded-lg mt-1.5 flex items-center justify-center">
                                                <Camera className="w-4 h-4 text-muted-foreground" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/10">
                                <div className="flex items-center justify-between text-muted-foreground text-[10px]">
                                    <span>İlerleme: %42</span>
                                    <span>Tahmini bitiş: 28 Nisan</span>
                                </div>
                                <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full w-[42%] bg-rust rounded-full" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Sağ — Özellik Listesi */}
                        <motion.div
                            initial={{ opacity: 0, x: 24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-rust font-mono text-xs uppercase tracking-[0.3em] mb-3">Premium Plan Dahil</p>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground font-syne mb-6">
                                Müşteri Sizi Aramaz,<br />Takip Eder
                            </h2>
                            <ul className="space-y-3 mb-8">
                                {SECENEKLER.map((s, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <CheckCircle2
                                            className="w-4 h-4 shrink-0"
                                            style={{ color: s.var ? '#22c55e' : '#6b7280' }}
                                        />
                                        <span className={`text-sm ${s.var ? 'text-foreground' : 'text-muted-foreground'}`}>
                                            {s.label}
                                            {!s.var && <span className="text-xs ml-1 text-muted-foreground">(Premium+)</span>}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/onboarding">
                                <Button variant="primary" size="lg">Premium Planla Başla →</Button>
                            </Link>
                            <p className="text-muted-foreground text-xs mt-3">30 gün para iade garantisi · Kredi kartı gerekmez</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Hedef Kitle */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-xl font-extrabold text-foreground font-syne mb-8">Kimler İçin?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { emoji: "🏗️", baslik: "Müteahhitler", aciklama: "Konut, villa, tadilat projelerinde şeffaf müşteri iletişimi." },
                            { emoji: "📐", baslik: "Mimarlar", aciklama: "Proje görsellerini ve ilerlemeyi portföyle birleştirin." },
                            { emoji: "🛋️", baslik: "İç Mimarlar", aciklama: "Dekorasyon sürecini aşama aşama belgeleyin, müşteri onaylasın." },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-rust/20 transition-colors"
                            >
                                <span className="text-3xl mb-3 block">{item.emoji}</span>
                                <h3 className="text-foreground font-bold text-sm mb-2">{item.baslik}</h3>
                                <p className="text-muted-foreground text-xs leading-relaxed">{item.aciklama}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center bg-rust/10 border border-rust/20 rounded-3xl p-10">
                    <BarChart2 className="w-10 h-10 text-rust mx-auto mb-4" />
                    <h2 className="text-2xl font-extrabold text-foreground font-syne mb-3">
                        Şantiyenizi Dijital Yapın
                    </h2>
                    <p className="text-muted-foreground text-sm mb-8">
                        Premium veya üzeri pakette şantiye günlüğü dahil. Müşteri şeffaflığı ile referanslarınız artar.
                    </p>
                    <Link href="/onboarding">
                        <Button variant="primary" size="lg" className="px-10">
                            Hemen Başla →
                        </Button>
                    </Link>
                    <p className="text-muted-foreground text-xs mt-4">
                        Mimar & Müteahhit → <Link href="/mimar-tasarimci" className="text-rust hover:underline">sektör sayfanızı inceleyin</Link>
                    </p>
                </div>
            </section>

            <FooterTrustSection />
        </main>
    );
}
