"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import FooterTrustSection from "@/components/sections/FooterTrustSection";
import {
    Code, Zap, Headphones, TrendingUp, BarChart2,
    Globe, Coffee, Heart, ArrowRight, CheckCircle2, Send
} from "lucide-react";

const POZISYONLAR = [
    {
        id: 'senior-fullstack',
        baslik: 'Senior Full-Stack Developer',
        departman: 'Mühendislik',
        tur: 'Tam Uzaktan',
        seviye: 'Kıdemli',
        Icon: Code,
        renk: '#3b82f6',
        aciklama: "Next.js, Firebase ve AI entegrasyonlarıyla ürünümüzün omurgasını inşa et. 28 sektörde aktif, hızlı büyüyen bir kodebase.",
        gereksinimler: [
            'Next.js 14+, TypeScript, Tailwind — production deneyimi',
            'Firebase/Firestore gerçek zamanlı uygulamalar',
            'AI/LLM API entegrasyonları (Gemini, OpenAI, ADK)',
            'Ürün odaklı düşünce yapısı, kodu sahiplenme',
        ],
    },
    {
        id: 'ai-engineer',
        baslik: 'AI Product Engineer',
        departman: 'AI & Ürün',
        tur: 'Tam Uzaktan',
        seviye: 'Mid–Senior',
        Icon: Zap,
        renk: '#c04b1e',
        aciklama: 'Sektörel AI asistanlarını, ajan akışlarını ve LLM destekli otomasyon sistemlerini tasarla ve geliştir.',
        gereksinimler: [
            'Prompt engineering ve RAG pipeline deneyimi',
            'Google Gemini veya OpenAI API ile production kodu',
            'Python veya TypeScript (ikisi de ideal)',
            'Esnaf/KOBİ segmentine empati ve ilgi',
        ],
    },
    {
        id: 'musteri-basari',
        baslik: 'Müşteri Başarı Uzmanı',
        departman: 'Müşteri Başarısı',
        tur: 'Hibrit · İstanbul',
        seviye: 'Junior–Mid',
        Icon: Headphones,
        renk: '#8b5cf6',
        aciklama: "Esnafların platformdan maksimum değer almasını sağla. Onboarding, retention ve büyüme süreçlerini yönet.",
        gereksinimler: [
            'Empati ve problem çözme odaklı iletişim',
            'SaaS / dashboard araçlarına yatkınlık',
            'Türkçe ana dil, net ve sıcak yazışma stili',
            'KOBİ müşteri dinamiklerini anlama',
        ],
    },
    {
        id: 'saha-satis',
        baslik: 'Saha Satış Temsilcisi',
        departman: 'Satış',
        tur: 'Saha · İstanbul',
        seviye: 'Tüm seviyeler',
        Icon: TrendingUp,
        renk: '#22c55e',
        aciklama: "İstanbul'da esnafı yerinde ziyaret et, kepenk.ai'yi tanıt, anlaşma kapat. Komisyon ağırlıklı kazanç modeli.",
        gereksinimler: [
            'B2C veya KOBİ satışı deneyimi (tercihli)',
            'Güçlü ikna ve düzenli takip becerisi',
            'Araç kullanımı / şehir içi mobilite',
            'Performansa bağlı gelir modelini benimseme',
        ],
    },
    {
        id: 'buyume-seo',
        baslik: 'Büyüme & SEO Uzmanı',
        departman: 'Pazarlama',
        tur: 'Tam Uzaktan',
        seviye: 'Mid',
        Icon: BarChart2,
        renk: '#d4a843',
        aciklama: "Organik büyüme, içerik stratejisi ve SEO ile Türkiye'nin en çok aranan esnaf platformunu inşa et.",
        gereksinimler: [
            'Teknik SEO ve içerik pazarlama deneyimi',
            'Next.js metadata, sitemap, structured data',
            'A/B test kültürü ve analitik araçlar (GA4)',
            'Yerel SEO — ilçe × sektör stratejileri',
        ],
    },
];

const AVANTAJLAR = [
    { Icon: Globe, baslik: 'Remote-First', aciklama: 'Dünyanın neresinde olursan ol çalış. Sonuca odaklan, saate değil.' },
    { Icon: Coffee, baslik: 'Esnek Çalışma', aciklama: 'Asenkron kültür. Toplantılar kısa, yazışma net, bağımsızlık esas.' },
    { Icon: TrendingUp, baslik: 'Hisse Opsiyonu', aciklama: "Şirketi birlikte büyütüyoruz. Başarı paylaşılıyor." },
    { Icon: Heart, baslik: 'Anlamlı Misyon', aciklama: 'Mahalledeki esnafın hayatını gerçekten değiştiriyorsun.' },
];

const DEGERLER = [
    { emoji: '⚡', baslik: 'Hız ve Yinelemeler', aciklama: 'Mükemeli beklemek yerine hızlı dene, öğren, düzelt.' },
    { emoji: '🏪', baslik: 'Esnaf İçin, Esnafla', aciklama: 'Her özelliği gerçek bir esnafın gözünden değerlendir.' },
    { emoji: '🤝', baslik: 'Şeffaflık', aciklama: 'Ekip içinde açık iletişim, kullanıcıya şeffaf ürün.' },
    { emoji: '🎯', baslik: 'Sahiplik Kültürü', aciklama: 'Pozisyon değil, sorumluluk al. Sonuca odaklan.' },
];

export default function KariyerPage() {
    const [acikId, setAcikId] = useState<string | null>(null);
    const [gonderildi, setGonderildi] = useState(false);
    const [yukleniyor, setYukleniyor] = useState(false);
    const [hata, setHata] = useState(false);
    const [form, setForm] = useState({
        adSoyad: '', email: '', telefon: '', pozisyon: '', portfoy: '', mesaj: ''
    });

    function update(k: keyof typeof form, v: string) {
        setForm(p => ({ ...p, [k]: v }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setYukleniyor(true);
        setHata(false);
        try {
            const res = await fetch('/api/kariyer-basvuru', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error();
            setGonderildi(true);
        } catch {
            setHata(true);
        }
        setYukleniyor(false);
    }

    return (
        <main className="min-h-screen bg-background font-sans">
            <Navbar />

            {/* ── HERO ── */}
            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-rust/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-steel/6 rounded-full blur-3xl" />
                </div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 mb-6">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-green-300 text-xs font-semibold">5 Açık Pozisyon — Ekibimiz Büyüyor</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground font-syne tracking-tight leading-[1.1] mb-5">
                            Esnafın Dijital Dönüşümünü<br />
                            <span className="text-rust">Birlikte Şekillendir</span>
                        </h1>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                            Türkiye'de 1 milyon küçük işletmenin AI ile rekabet gücü kazanmasına yardım ediyoruz.
                            Remote-first, misyon odaklı, hızlı büyüyen bir ekip.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <a href="#pozisyonlar" className="bg-rust hover:bg-rust/90 text-foreground font-bold px-8 py-3.5 rounded-xl transition-colors text-base inline-block">
                                Açık Pozisyonlar →
                            </a>
                            <a href="#basvuru" className="border border-white/20 text-foreground hover:bg-white/10 font-semibold px-8 py-3.5 rounded-xl transition-colors text-base inline-block">
                                Başvuru Yap
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── AVANTAJLAR ── */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white/3 border-y border-white/5">
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                    {AVANTAJLAR.map(({ Icon, baslik, aciklama }, i) => (
                        <motion.div
                            key={baslik}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="text-center"
                        >
                            <div className="w-12 h-12 rounded-xl bg-rust/10 border border-rust/20 flex items-center justify-center mx-auto mb-3">
                                <Icon className="w-5 h-5 text-rust" />
                            </div>
                            <h3 className="text-foreground font-bold text-sm mb-1">{baslik}</h3>
                            <p className="text-muted-foreground text-xs leading-relaxed">{aciklama}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── POZİSYONLAR ── */}
            <section id="pozisyonlar" className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <p className="text-rust font-mono text-xs uppercase tracking-[0.3em] mb-3">Açık Roller</p>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground font-syne">Hangi Rolde Yer Almak İstiyorsun?</h2>
                    </div>
                    <div className="space-y-4">
                        {POZISYONLAR.map(p => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-rust/20 transition-colors"
                            >
                                <button
                                    onClick={() => setAcikId(acikId === p.id ? null : p.id)}
                                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${p.renk}20` }}>
                                            <p.Icon className="w-5 h-5" style={{ color: p.renk }} />
                                        </div>
                                        <div>
                                            <h3 className="text-foreground font-bold text-base">{p.baslik}</h3>
                                            <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                                                <span className="text-muted-foreground text-xs">{p.departman}</span>
                                                <span className="text-muted-foreground text-xs">·</span>
                                                <span className="text-muted-foreground text-xs">{p.tur}</span>
                                                <span className="text-muted-foreground text-xs">·</span>
                                                <span className="text-muted-foreground text-xs">{p.seviye}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <ArrowRight className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${acikId === p.id ? 'rotate-90' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {acikId === p.id && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 border-t border-white/10 pt-5">
                                                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{p.aciklama}</p>
                                                <h4 className="text-foreground font-semibold text-xs uppercase tracking-widest mb-3">Aradığımız Özellikler</h4>
                                                <ul className="space-y-2 mb-5">
                                                    {p.gereksinimler.map((g, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                            <CheckCircle2 className="w-4 h-4 text-rust shrink-0 mt-0.5" />
                                                            {g}
                                                        </li>
                                                    ))}
                                                </ul>
                                                <a
                                                    href="#basvuru"
                                                    onClick={() => update('pozisyon', p.baslik)}
                                                    className="inline-block bg-rust hover:bg-rust/90 text-foreground font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
                                                >
                                                    Bu Pozisyona Başvur →
                                                </a>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                    <p className="text-center text-muted-foreground text-xs mt-6">
                        Uygun pozisyon göremiyorsan?{' '}
                        <a href="#basvuru" className="text-rust hover:underline">Genel başvuru yap</a>,
                        büyürken seni hatırlayalım.
                    </p>
                </div>
            </section>

            {/* ── KÜLTÜR ── */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/3 border-y border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-xl font-extrabold text-foreground font-syne">Kültürümüz</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        {DEGERLER.map((d, i) => (
                            <motion.div
                                key={d.baslik}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-rust/20 transition-colors"
                            >
                                <span className="text-3xl mb-3 block">{d.emoji}</span>
                                <h3 className="text-foreground font-bold text-sm mb-2">{d.baslik}</h3>
                                <p className="text-muted-foreground text-xs leading-relaxed">{d.aciklama}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BAŞVURU FORMU ── */}
            <section id="basvuru" className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl mx-auto">
                    <div className="text-center mb-10">
                        <p className="text-rust font-mono text-xs uppercase tracking-[0.3em] mb-3">Başvuru</p>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground font-syne mb-2">Ekibimize Katıl</h2>
                        <p className="text-muted-foreground text-sm">Pozisyon açık olmasa bile gönder — büyürken seni hatırlayalım.</p>
                    </div>

                    {gonderildi ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center bg-green-500/10 border border-green-500/20 rounded-3xl p-12"
                        >
                            <CheckCircle2 className="w-14 h-14 text-green-400 mx-auto mb-4" />
                            <h3 className="text-foreground font-bold text-xl mb-2">Başvurun Alındı!</h3>
                            <p className="text-muted-foreground text-sm">3 iş günü içinde seninle iletişime geçeceğiz. Harika bir ekip seni bekliyor.</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
                            {([
                                { k: 'adSoyad', label: 'Ad Soyad', type: 'text', placeholder: 'Adınız Soyadınız', required: true },
                                { k: 'email', label: 'E-posta', type: 'email', placeholder: 'ornek@email.com', required: true },
                                { k: 'telefon', label: 'Telefon', type: 'tel', placeholder: '05XX XXX XX XX', required: false },
                            ] as const).map(({ k, label, type, placeholder, required }) => (
                                <div key={k}>
                                    <label className="block text-foreground/70 text-xs font-semibold uppercase tracking-wider mb-2">
                                        {label} {required && <span className="text-rust">*</span>}
                                    </label>
                                    <input
                                        type={type}
                                        placeholder={placeholder}
                                        required={required}
                                        value={form[k]}
                                        onChange={e => update(k, e.target.value)}
                                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-rust/50 transition-colors"
                                    />
                                </div>
                            ))}

                            <div>
                                <label className="block text-foreground/70 text-xs font-semibold uppercase tracking-wider mb-2">
                                    Başvurduğun Pozisyon <span className="text-rust">*</span>
                                </label>
                                <select
                                    required
                                    value={form.pozisyon}
                                    onChange={e => update('pozisyon', e.target.value)}
                                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:border-rust/50 transition-colors"
                                >
                                    <option value="" className="bg-[#161616]">Pozisyon seçin...</option>
                                    {POZISYONLAR.map(p => (
                                        <option key={p.id} value={p.baslik} className="bg-[#161616]">{p.baslik}</option>
                                    ))}
                                    <option value="Genel Başvuru" className="bg-[#161616]">Genel Başvuru</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-foreground/70 text-xs font-semibold uppercase tracking-wider mb-2">
                                    LinkedIn / GitHub / Portföy Linki
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://linkedin.com/in/..."
                                    value={form.portfoy}
                                    onChange={e => update('portfoy', e.target.value)}
                                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-rust/50 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-foreground/70 text-xs font-semibold uppercase tracking-wider mb-2">
                                    Neden kepenk.ai? <span className="text-rust">*</span>
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Misyonumuza neden katkıda bulunmak istiyorsun? Kısaca anlat."
                                    value={form.mesaj}
                                    onChange={e => update('mesaj', e.target.value)}
                                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-rust/50 transition-colors resize-none"
                                />
                            </div>

                            {hata && <p className="text-red-400 text-sm text-center">Bir hata oluştu. Lütfen tekrar deneyin.</p>}

                            <button
                                type="submit"
                                disabled={yukleniyor}
                                className="w-full bg-rust hover:bg-rust/90 disabled:opacity-60 text-foreground font-bold text-base py-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <Send className="w-4 h-4" />
                                {yukleniyor ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
                            </button>
                            <p className="text-muted-foreground text-xs text-center">Tüm başvurular 3 iş günü içinde değerlendirilir.</p>
                        </form>
                    )}
                </div>
            </section>

            <FooterTrustSection />
        </main>
    );
}
