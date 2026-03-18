"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import FooterTrustSection from "@/components/sections/FooterTrustSection";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CheckCircle2, ChevronDown } from "lucide-react";

const ADIMLAR = [
    {
        no: "01",
        sure: "2 dakika",
        baslik: "Paketinizi Seçin",
        aciklama: "Sektörünüzü ve size uygun paketi seçin. Kredi kartı gerekmez, taahhüt yok. İstediğiniz zaman yükseltebilir veya iptal edebilirsiniz.",
        detaylar: [
            "26 sektörden birini seçin (kuaför, restoran, elektrikçi...)",
            "Temel (399₺) → Standart → Büyüme → Premium arası seçim",
            "Yıllık ödemeyle %15 tasarruf imkânı",
            "30 gün para iade garantisi ile risksiz başlangıç",
        ],
        ikon: "📦",
        renk: "#6b7280",
    },
    {
        no: "02",
        sure: "5 dakika",
        baslik: "İşletme Bilgilerinizi Girin",
        aciklama: "İşletme adınız, WhatsApp numaranız, çalışma saatleriniz ve sunduğunuz hizmetleri girin. AI bunları otomatik olarak işler.",
        detaylar: [
            "İşletme adı, adres ve çalışma saatleri",
            "WhatsApp Business numaranız (mevcut numaranız)",
            "Hizmet listesi ve fiyat bilgileri (isteğe bağlı)",
            "Renk paleti ve marka tercihleriniz",
        ],
        ikon: "📝",
        renk: "#3b82f6",
    },
    {
        no: "03",
        sure: "3 dakika",
        baslik: "WhatsApp Bağlantısını Yapın",
        aciklama: "QR kod ile mevcut WhatsApp Business numaranızı bağlayın. Numara değişikliği gerekmez, müşterileriniz aynı numaradan mesaj atmaya devam eder.",
        detaylar: [
            "Mevcut WhatsApp numaranız aynen kalır",
            "QR kod taraması ile saniyeler içinde bağlantı",
            "AI asistan hemen yanıt vermeye başlar",
            "İlk mesajı siz yazın veya AI'ya bırakın",
        ],
        ikon: "💬",
        renk: "#22c55e",
    },
    {
        no: "04",
        sure: "10 dakika",
        baslik: "Web Siteniz Hazır",
        aciklama: "AI, sektörünüze ve bilgilerinize özel bir web sitesi taslağı oluşturur. Siz sadece onaylarsınız veya küçük değişiklikler istersiniz.",
        detaylar: [
            "Sektöre özel tasarım şablonu (kuaför, restoran, servis...)",
            "Hizmet listesi, fiyatlar ve iletişim formu otomatik doldurulur",
            "Mobil uyumlu, SEO hazır, Google Maps entegrasyonu",
            "kepenk.ai alt alanı (isletmeniz.kepenk.ai) — Premium'da kendi domain",
        ],
        ikon: "🌐",
        renk: "#8b5cf6",
    },
    {
        no: "05",
        sure: "Hemen",
        baslik: "Yayına Alındı — İlk Müşteri Mesajınız Geliyor",
        aciklama: "7/24 dijital çalışanınız artık aktif. Müşterileriniz WhatsApp'tan, web sitesinden veya Google'dan yazdığında AI anında devreye girer.",
        detaylar: [
            "WhatsApp'tan gelen her mesaja saniyeler içinde yanıt",
            "Randevu talepleri otomatik takvime eklenir",
            "Google yorumlarına otomatik profesyonel cevaplar",
            "Haftalık performans raporu size gelir",
        ],
        ikon: "🚀",
        renk: "#c04b1e",
    },
];

const HAFTALIK = [
    { hafta: "1. Hafta", baslik: "Kurulum & İlk Mesajlar", icerik: "WhatsApp bağlantısı aktif, web siteniz yayında. AI ilk müşteri mesajlarına yanıt veriyor. Siz her şeyi takip ediyorsunuz.", renk: "#6b7280" },
    { hafta: "2. Hafta", baslik: "İlk Müşteriler & Randevular", icerik: "Organik Google aramaları başlıyor. İlk WhatsApp randevu istekleri AI tarafından yönetiliyor. İçerik takviminiz çalışmaya başladı.", renk: "#3b82f6" },
    { hafta: "3. Hafta", baslik: "Google Yorumları Artıyor", icerik: "AI, olumlu yorum isteği mesajları gönderiyor. Olumsuz yorumlara otomatik profesyonel cevaplar veriliyor. Google puanınız yükselmeye başlıyor.", renk: "#8b5cf6" },
    { hafta: "4. Hafta", baslik: "İlk Raporunuz Hazır", icerik: "Aylık performans raporu: kaç mesaj geldi, kaç randevu alındı, hangi saatler en yoğun. Veriye dayalı kararlar alın.", renk: "#c04b1e" },
];

const SSS = [
    {
        soru: "Teknik bilgi gerekli mi?",
        cevap: "Hayır. WhatsApp'ı kullanan herkes kepenk.ai'ı kullanabilir. Kurulum sihirbazı sizi adım adım yönlendirir. Teknik destek ekibimiz her adımda yanınızda.",
    },
    {
        soru: "Mevcut WhatsApp numaram değişecek mi?",
        cevap: "Hayır. Mevcut numaranızla devam edersiniz. Müşterileriniz aynı numaradan mesaj atmaya devam eder, AI onlara yanıt verir.",
    },
    {
        soru: "AI yanlış yanıt verirse ne olur?",
        cevap: "Dashboard'dan tüm konuşmaları takip edebilir, istediğiniz zaman devralabilirsiniz. AI, emin olmadığı durumlarda 'müşteri temsilcimiz en kısa sürede dönecek' diyerek sizi bilgilendirir.",
    },
    {
        soru: "Aboneliği iptal etmek ne kadar sürer?",
        cevap: "Tek tıkla, anında. İptal ettiğinizde bir sonraki fatura dönemi başlamaz. Verileriniz KVKK kapsamında 44 gün içinde güvenle imha edilir.",
    },
    {
        soru: "Web sitemi kendi domain'ime taşıyabilir miyim?",
        cevap: "Evet. Büyüme ve üzeri paketlerde kendi domain'inizi bağlayabilirsiniz. Premium'da 1 yıllık domain hediye edilir.",
    },
    {
        soru: "Birden fazla şube için kullanabilir miyim?",
        cevap: "Evet. Her şube için ayrı bir hesap açılır. Çok şubeli işletmeler için Kurumsal paket mevcuttur — tek dashboard'dan tüm şubeleri yönetin.",
    },
];

export default function NasilCalisirPage() {
    const [acikSSS, setAcikSSS] = useState<number | null>(null);

    return (
        <main className="min-h-screen bg-background font-sans">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-rust/8 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-steel/8 rounded-full blur-3xl" />
                </div>
                <div className="relative z-10 max-w-3xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <p className="text-rust font-mono text-xs uppercase tracking-[0.3em] mb-4">Kurulum Süreci</p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground font-syne tracking-tight mb-6 leading-[1.1]">
                            Nasıl Çalışır?
                        </h1>
                        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8">
                            Satın aldıktan sonra sırasıyla ne olur? <br className="hidden md:block" />
                            Toplam <span className="text-foreground font-bold">20 dakika</span> içinde 7/24 dijital çalışanınız aktif.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href="/onboarding">
                                <Button size="lg" variant="primary">Hemen Başla →</Button>
                            </Link>
                            <Link href="/#pricing">
                                <Button size="lg" variant="outline" className="border-white/20 text-foreground hover:bg-white/10">Fiyatları Gör</Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 5 Adım */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-6">
                        {ADIMLAR.map((adim, i) => (
                            <motion.div
                                key={adim.no}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex gap-6 items-start"
                            >
                                {/* Connector line + number */}
                                <div className="flex flex-col items-center flex-shrink-0">
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold font-syne text-foreground shadow-lg"
                                        style={{ backgroundColor: adim.renk }}
                                    >
                                        {adim.ikon}
                                    </div>
                                    {i < ADIMLAR.length - 1 && (
                                        <div className="w-0.5 h-8 mt-2 bg-white/10" />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 pb-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span
                                            className="text-xs font-mono font-bold"
                                            style={{ color: adim.renk }}
                                        >
                                            ADIM {adim.no}
                                        </span>
                                        <span className="text-muted-foreground text-xs bg-white/5 px-2 py-0.5 rounded-full">
                                            ⏱ {adim.sure}
                                        </span>
                                    </div>
                                    <h3 className="text-foreground font-syne font-bold text-xl mb-2">{adim.baslik}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{adim.aciklama}</p>
                                    <ul className="space-y-1.5">
                                        {adim.detaylar.map((d, di) => (
                                            <li key={di} className="flex items-start gap-2 text-xs text-muted-foreground">
                                                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: adim.renk }} />
                                                {d}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* İlk 30 Gün */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/3 border-y border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-rust font-mono text-xs uppercase tracking-[0.3em] mb-3">Yol Haritası</p>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground font-syne">
                            İlk 30 Günde Ne Olur?
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {HAFTALIK.map((hafta, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-rust/30 transition-colors"
                            >
                                <span
                                    className="text-xs font-bold font-mono mb-3 block"
                                    style={{ color: hafta.renk }}
                                >
                                    {hafta.hafta}
                                </span>
                                <h3 className="text-foreground font-bold text-sm mb-2">{hafta.baslik}</h3>
                                <p className="text-muted-foreground text-xs leading-relaxed">{hafta.icerik}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SSS */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <p className="text-rust font-mono text-xs uppercase tracking-[0.3em] mb-3">Sık Sorulan Sorular</p>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground font-syne">
                            Aklınızdaki Sorular
                        </h2>
                    </div>
                    <div className="space-y-3">
                        {SSS.map((item, i) => (
                            <div
                                key={i}
                                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-rust/20 transition-colors"
                            >
                                <button
                                    onClick={() => setAcikSSS(acikSSS === i ? null : i)}
                                    className="w-full flex items-center justify-between p-5 text-left"
                                >
                                    <span className="text-foreground font-semibold text-sm pr-4">{item.soru}</span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${acikSSS === i ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                {acikSSS === i && (
                                    <div className="px-5 pb-5">
                                        <p className="text-muted-foreground text-sm leading-relaxed">{item.cevap}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center bg-rust/10 border border-rust/20 rounded-3xl p-10">
                    <h2 className="text-3xl font-extrabold text-foreground font-syne mb-3">
                        Hazır mısınız?
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        20 dakikada 7/24 dijital çalışanınız aktif. Kredi kartı gerekmez.
                    </p>
                    <Link href="/onboarding">
                        <Button size="lg" variant="primary" className="px-12">
                            Ücretsiz Başla →
                        </Button>
                    </Link>
                    <p className="text-muted-foreground text-sm mt-4">30 gün para iade garantisi · İstediğiniz zaman iptal</p>
                </div>
            </section>

            <FooterTrustSection />
        </main>
    );
}
