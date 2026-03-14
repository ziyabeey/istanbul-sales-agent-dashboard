"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import FooterTrustSection from "@/components/sections/FooterTrustSection";
import { Button } from "@/components/ui/Button";
import { Building2, Cpu, GitMerge, Tag, CheckCircle2, Send } from "lucide-react";

const HIZMETLER = [
    {
        icon: Building2,
        baslik: "Çok Şube Yönetimi",
        aciklama: "Merkezi bir dashboard'dan tüm şubelerinizi yönetin. Her şube için ayrı AI asistan, ayrı içerik takvimi ve ayrı raporlama.",
        ozellikler: [
            "Merkezi şube yönetim paneli",
            "Şube bazlı AI asistan ve WhatsApp hattı",
            "Konsolide performans raporları",
            "Şubeler arası karşılaştırmalı analiz",
        ],
        renk: "#3b82f6",
    },
    {
        icon: Cpu,
        baslik: "Özel AI Model Geliştirme",
        aciklama: "İşletmenize özgü eğitilmiş AI modeli. Ürün kataloğunuzu, fiyat listelerinizi ve şirket kültürünüzü bilen bir asistan.",
        ozellikler: [
            "Şirkete özgü veri ile eğitim",
            "Ürün kataloğu ve fiyat listesi entegrasyonu",
            "Marka sesi ve ton rehberi uyumu",
            "Sürekli güncelleme ve iyileştirme",
        ],
        renk: "#8b5cf6",
    },
    {
        icon: GitMerge,
        baslik: "ERP / CRM Entegrasyonu",
        aciklama: "SAP, Logo, Parasut, Mikro gibi sistemlerinizle iki yönlü entegrasyon. Müşteri verileri otomatik senkronize olur.",
        ozellikler: [
            "SAP, Logo, Parasut, Mikro desteği",
            "Özel CRM entegrasyonu",
            "Fatura ve sipariş otomasyonu",
            "Özel API geliştirme imkânı",
        ],
        renk: "#22c55e",
    },
    {
        icon: Tag,
        baslik: "Beyaz Etiket / White-Label",
        aciklama: "Kendi markanızla müşterilerinize satın. Bayi ağı kurmanın en hızlı yolu — altyapı bizden, marka sizin.",
        ozellikler: [
            "Kendi logo ve marka renkleri",
            "Özel subdomain (panel.sizinmarka.com)",
            "Müşteri yönetim paneli sizde",
            "Bayi destek ve eğitim programı",
        ],
        renk: "#d4a843",
    },
];

const REFERANS_SEKTORLER = [
    { emoji: "🍽️", ad: "Franchise Restoran Zincirleri", aciklama: "Şube bazlı menü yönetimi, merkezi rezervasyon, zincir çapında Google yorum takibi." },
    { emoji: "✂️", ad: "Zincir Kuaför & Güzellik Merkezleri", aciklama: "Her şube için ayrı randevu sistemi, merkezden içerik takvimi, kampanya yönetimi." },
    { emoji: "🔩", ad: "Oto Galeri & Servis Zincirleri", aciklama: "Araç envanter takibi, şube bazlı servis randevusu, müşteri CRM entegrasyonu." },
    { emoji: "📚", ad: "Eğitim Kurumu Zincirleri", aciklama: "Çoklu kampüs yönetimi, öğrenci kayıt otomasyonu, veli iletişim AI asistanı." },
];

export default function KurumsalPage() {
    const [form, setForm] = useState({ sirket: "", sektor: "", subeSayisi: "", telefon: "", mesaj: "", });
    const [gonderildi, setGonderildi] = useState(false);
    const [hata, setHata] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setHata(null);
        try {
            const res = await fetch("/api/kurumsal-teklif", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || "Teklif gönderilemedi");
            }
            setGonderildi(true);
            setForm({ sirket: "", sektor: "", subeSayisi: "", telefon: "", mesaj: "" });
        } catch (err: any) {
            setHata(err?.message || "Gönderim sırasında bir hata oluştu. Lütfen tekrar deneyin.");
        }
        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-background font-sans">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-steel/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rust/8 rounded-full blur-3xl" />
                </div>
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <p className="text-rust font-mono text-xs uppercase tracking-[0.3em] mb-4">Kurumsal Çözümler</p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground font-syne tracking-tight mb-5 leading-[1.1]">
                            Zincir & Kurumsal<br />
                            İşletmeler İçin<br />
                            <span className="text-rust">Özel Çözümler</span>
                        </h1>
                        <p className="text-muted-foreground-light text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                            ERP entegrasyonu, özel AI model, çok şube yönetimi veya white-label ihtiyacınız mı var?
                            Size özel çözüm tasarlayalım.
                        </p>
                        <a href="#teklif-formu">
                            <Button size="lg" variant="primary">Özel Teklif Al →</Button>
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Hizmetler */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/3 border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground font-syne">Kurumsal Hizmetlerimiz</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {HIZMETLER.map(({ icon: Icon, baslik, aciklama, ozellikler, renk }, i) => (
                            <motion.div
                                key={baslik}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-rust/20 transition-colors"
                            >
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                                    style={{ backgroundColor: `${renk}20` }}
                                >
                                    <Icon className="w-6 h-6" style={{ color: renk }} />
                                </div>
                                <h3 className="text-foreground font-bold text-xl mb-3">{baslik}</h3>
                                <p className="text-muted-foreground-light text-sm leading-relaxed mb-5">{aciklama}</p>
                                <ul className="space-y-2">
                                    {ozellikler.map((o, oi) => (
                                        <li key={oi} className="flex items-start gap-2 text-xs text-muted-foreground">
                                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: renk }} />
                                            {o}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Referans Sektörler */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-extrabold text-foreground font-syne">Kimler Kullanıyor?</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {REFERANS_SEKTORLER.map((ref, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5"
                            >
                                <span className="text-3xl flex-shrink-0">{ref.emoji}</span>
                                <div>
                                    <h3 className="text-foreground font-bold text-sm mb-1">{ref.ad}</h3>
                                    <p className="text-muted-foreground-light text-xs leading-relaxed">{ref.aciklama}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Teklif Formu */}
            <section id="teklif-formu" className="py-16 px-4 sm:px-6 lg:px-8 bg-white/3 border-y border-white/5">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-10">
                        <p className="text-rust font-mono text-xs uppercase tracking-[0.3em] mb-3">İletişim</p>
                        <h2 className="text-2xl font-extrabold text-foreground font-syne">Özel Teklif Alın</h2>
                        <p className="text-muted-foreground-light text-sm mt-2">3 iş günü içinde size dönüyoruz.</p>
                    </div>

                    {gonderildi ? (
                        <div className="text-center bg-green-400/10 border border-green-400/20 rounded-2xl p-10">
                            <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
                            <h3 className="text-foreground font-bold text-xl mb-2">Talebiniz Alındı!</h3>
                            <p className="text-muted-foreground-light text-sm">Ekibimiz 3 iş günü içinde sizinle iletişime geçecek.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-foreground text-sm font-medium mb-1.5">Şirket Adı *</label>
                                    <input
                                        required
                                        type="text"
                                        value={form.sirket}
                                        onChange={e => setForm(f => ({ ...f, sirket: e.target.value }))}
                                        placeholder="ABC Şirketi"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder-stone focus:outline-none focus:border-rust text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-foreground text-sm font-medium mb-1.5">Sektör *</label>
                                    <input
                                        required
                                        type="text"
                                        value={form.sektor}
                                        onChange={e => setForm(f => ({ ...f, sektor: e.target.value }))}
                                        placeholder="Restoran zinciri, kuaför..."
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder-stone focus:outline-none focus:border-rust text-sm"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-foreground text-sm font-medium mb-1.5">Şube / Mağaza Sayısı</label>
                                    <input
                                        type="text"
                                        value={form.subeSayisi}
                                        onChange={e => setForm(f => ({ ...f, subeSayisi: e.target.value }))}
                                        placeholder="5, 10-20, 50+"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder-stone focus:outline-none focus:border-rust text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-foreground text-sm font-medium mb-1.5">Telefon *</label>
                                    <input
                                        required
                                        type="tel"
                                        value={form.telefon}
                                        onChange={e => setForm(f => ({ ...f, telefon: e.target.value }))}
                                        placeholder="0532 xxx xx xx"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder-stone focus:outline-none focus:border-rust text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-foreground text-sm font-medium mb-1.5">İhtiyacınızı Anlatın</label>
                                <textarea
                                    rows={4}
                                    value={form.mesaj}
                                    onChange={e => setForm(f => ({ ...f, mesaj: e.target.value }))}
                                    placeholder="ERP entegrasyonu, çok şube yönetimi, white-label..."
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder-stone focus:outline-none focus:border-rust text-sm resize-none"
                                />
                            </div>
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2"
                            >
                                {loading ? "Gönderiliyor..." : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Teklif Talep Et
                                    </>
                                )}
                            </Button>
                            {hata ? <p className="text-sm text-red-300 text-center">{hata}</p> : null}
                        </form>
                    )}
                </div>
            </section>

            <FooterTrustSection />
        </main>
    );
}
