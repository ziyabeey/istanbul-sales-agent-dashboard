"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import FooterTrustSection from "@/components/sections/FooterTrustSection";
import { Target, Rocket, Users, BrainCircuit, Heart, Zap, Shield, TrendingUp, Cuboid } from "lucide-react";

/* ── Animated counter ── */
function Counter({ target, suffix = '' }: { target: number | string; suffix?: string }) {
    const [val, setVal] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const done = useRef(false);
    useEffect(() => {
        if (typeof target !== 'number') return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !done.current) {
                done.current = true;
                const dur = 1400, steps = 50;
                let i = 0;
                const id = setInterval(() => {
                    i++;
                    setVal(Math.round((target * i) / steps));
                    if (i >= steps) clearInterval(id);
                }, dur / steps);
            }
        }, { threshold: 0.5 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [target]);
    if (typeof target !== 'number') return <span>{target}</span>;
    return <span ref={ref}>{val.toLocaleString('tr-TR')}{suffix}</span>;
}

const METRIKLER = [
    { label: 'Aktif Esnaf', value: 1200, suffix: '+', icon: Users, renk: '#c04b1e' },
    { label: 'Desteklenen Sektör', value: 28, suffix: '', icon: BrainCircuit, renk: '#3b82f6' },
    { label: 'Müşteri Puanı', value: '4.9★', suffix: '', icon: Target, renk: '#d4a843' },
    { label: 'Uptime Garantisi', value: '99.7%', suffix: '', icon: Rocket, renk: '#22c55e' },
];

const DEGERLER = [
    { icon: Zap, baslik: 'Hız & Sonuç', aciklama: 'Büyük teknoloji gibi hızlı üret, esnaf gibi pratik düşün. Kompleks sorunlara sade çözüm.', renk: '#c04b1e' },
    { icon: Heart, baslik: 'Empati Önce', aciklama: 'Her özelliği bir esnafın telefona baktığı o 30 saniye için tasarlarız.', renk: '#ec4899' },
    { icon: Shield, baslik: 'Güven Kazanılır', aciklama: "Verilen sözler tutulur. Taahhüt ettiğimizi teslim ederiz, gerisi gelir.", renk: '#8b5cf6' },
    { icon: TrendingUp, baslik: 'Esnaf Büyürse Biz Büyürüz', aciklama: "Başarı modeli müşterimizin başarısına kilitli. Sıfır toplamlı oyun oynamıyoruz.", renk: '#22c55e' },
];

const EKIP = [
    {
        isim: 'Ahmet Yılmaz', unvan: 'CEO & Kurucu',
        hikaye: 'Babasının bakkalını 5 yıl boyunca dijitalleştirmeye çalışırken KPNK fikrini buldu.',
        renk: '#c04b1e', emoji: '🏪',
    },
    {
        isim: 'Zeynep Kaya', unvan: 'CTO',
        hikaye: 'Büyük ölçekli AI sistemleri inşa etti; şimdi aynı gücü mahalle esnafı için paketliyor.',
        renk: '#3b82f6', emoji: '⚡',
    },
    {
        isim: 'Mert Arslan', unvan: 'Baş Ürün Sorumlusu',
        hikaye: 'KOBİ SaaS alanında 6 yıl. Her özelliği "esnaf bunu kullanır mı?" sorusuyla süzer.',
        renk: '#8b5cf6', emoji: '🎯',
    },
];

const FAZ = [
    {
        no: '01', baslik: 'AI Asistanlar & Otomasyon',
        aciklama: 'Sektörel AI asistanları, WhatsApp otomasyonu ve otomatik müşteri akışları.',
        durum: 'Tamamlandı', renkClass: 'bg-green-500/20 text-green-400 border-green-500/30',
    },
    {
        no: '02', baslik: 'Finans, Tedarik & Ekip',
        aciklama: 'Fatura otomasyonu, tedarikçi ağı ve çok kullanıcılı ekip yönetimi.',
        durum: 'Devam ediyor', renkClass: 'bg-primary/20 text-primary border-primary/30',
    },
    {
        no: '03', baslik: '1M Esnaf Standardı',
        aciklama: '1 milyon esnafın dijital vitrini ve tamamen otonom operasyon altyapısı.',
        durum: '2026+', renkClass: 'bg-gray-100 text-muted-foreground border-gray-200',
    },
];

export default function HakkimizdaPage() {
    return (
        <main className="min-h-screen bg-background font-sans">
            <Navbar />

            {/* ── HERO ── */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden perspective-1000">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-steel/6 rounded-full blur-3xl animate-pulse" />
                </div>
                
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, x: -50, rotateY: -10 }} 
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex-1 text-center md:text-left"
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
                            <span className="text-primary text-xs font-mono uppercase tracking-widest">Biz Kimiz</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-foreground font-syne tracking-tight leading-[1.1] mb-5 drop-shadow-lg">
                            Kepenkleri <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-gold">Dijitale</span>{' '}
                            Açıyoruz
                        </h1>
                        <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto md:mx-0 mb-10 font-lora">
                            Mahalle esnafının büyük teknolojiyle aynı masada rekabet edebilmesi için
                            yapay zekayı sade, erişilebilir ve ölçülebilir hale getiriyoruz.
                        </p>
                    </motion.div>

                    {/* 3D Abstract Graphic */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8, rotateX: 20, rotateY: -20 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="flex-1 relative w-full aspect-square max-w-md mx-auto hidden md:block"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <motion.div
                            animate={{ 
                                y: [-10, 10, -10],
                                rotateY: [0, 10, 0],
                                rotateX: [0, -5, 0]
                            }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <div className="relative w-64 h-64 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-3xl backdrop-blur-3xl border border-primary/30 flex items-center justify-center shadow-[0_20px_60px_rgba(99,102,241,0.3)] shadow-primary/20 transform rotate-12 rotate-x-12 rotate-y-12 z-20 overflow-hidden">
                                {/* Sweep reflection */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gray-100 to-transparent transform -skew-x-12 translate-x-[-100%] animate-[shimmer_3s_infinite]" />
                                <Cuboid className="w-32 h-32 text-primary drop-shadow-2xl" />
                            </div>
                            
                            {/* Floating decorative elements */}
                            <motion.div 
                                animate={{ z: [0, 50, 0], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gold/20 blur-xl" 
                            />
                            <motion.div 
                                animate={{ z: [0, -50, 0], y: [0, 20, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full border border-primary/20 backdrop-blur-md" 
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── METRİKLER ── */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-gray-200 relative z-10">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 perspective-1000">
                    {METRIKLER.map(({ label, value, suffix, icon: Icon, renk }, i) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, y: 30, rotateX: 10 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                            whileHover={{ 
                                scale: 1.05, 
                                rotateY: i % 2 === 0 ? 5 : -5,
                                rotateX: 5,
                                z: 30,
                                transition: { duration: 0.3 } 
                            }}
                            style={{ transformStyle: "preserve-3d", boxShadow: `0 10px 30px -10px ${renk}15` }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="group relative rounded-3xl border border-gray-200 bg-white shadow-sm p-6 text-center hover:border-gray-300 hover:shadow-lg transition-all overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] pointer-events-none" />

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-inner" style={{ backgroundColor: `${renk}18`, border: `1px solid ${renk}30` }}>
                                    <Icon className="w-6 h-6" style={{ color: renk }} />
                                </div>
                                <p className="text-3xl md:text-4xl font-syne font-extrabold text-foreground">
                                    {typeof value === 'number'
                                        ? <Counter target={value} suffix={suffix} />
                                        : value}
                                </p>
                                <p className="text-sm text-muted-foreground mt-2 font-medium">{label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── HİKAYE ── */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <p className="text-primary font-mono text-xs uppercase tracking-[0.3em] mb-4">Kuruluş Hikayemiz</p>
                        <h2 className="text-3xl font-extrabold text-foreground font-syne mb-5 leading-tight">
                            Bir Bakkalın Dijital Dönüşüm Çabası Bizi Buraya Getirdi
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            2020'de bir bakkalın oğlu, babasının işini WhatsApp mesajlarıyla yönetmeye çalıştığını
                            gördü. Sipariş takibi defterle, müşteri yanıtları geç, Google yorumları yanıtsız.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Büyük şirketlerin CRM ve otomasyon araçları vardı. Küçük esnafın yoktu.
                            Bu eşitsizlik KPNK'yi doğurdu.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Bugün 28 sektörde, 1.200'den fazla işletmede AI asistanları çalışıyor.
                            Müşteri mesajları yanıtsız kalmıyor, Google yorumları cevapsız kalmıyor.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        {[
                            { yil: '2020', olay: 'Fikir doğdu — bir bakkalın WhatsApp çaresizliği', renk: '#6b7280' },
                            { yil: '2022', olay: 'İlk prototip: 3 esnaf, 1 AI asistanı, sıfır mükemmellik', renk: '#3b82f6' },
                            { yil: '2023', olay: 'Ürün–pazar uyumu bulundu. 50+ esnaf, 4.8 puan', renk: '#8b5cf6' },
                            { yil: '2024', olay: '28 sektöre genişleme, WhatsApp + Google + Iyzico entegrasyonu', renk: '#c04b1e' },
                            { yil: '2025', olay: "1.200+ aktif esnaf, Google ADK & AI Agents lansmanı", renk: '#d4a843' },
                            { yil: '2026+', olay: '1M esnaf hedefi — Türkiye geneli tedarik & finans ağı', renk: '#22c55e' },
                        ].map(({ yil, olay, renk }, i) => (
                            <div key={yil} className="flex items-start gap-4">
                                <div className="shrink-0 mt-0.5">
                                    <div className="w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: renk }} />
                                </div>
                                <div>
                                    <span className="text-xs font-mono font-bold" style={{ color: renk }}>{yil}</span>
                                    <p className="text-muted-foreground text-sm mt-0.5">{olay}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── DEĞERLER ── */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-gray-200">
                <div className="max-w-5xl mx-auto perspective-1000">
                    <div className="text-center mb-16">
                        <p className="text-primary font-mono text-xs uppercase tracking-[0.3em] mb-4">Değerlerimiz</p>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground font-syne drop-shadow-md">Bizi Biz Yapan İlkeler</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {DEGERLER.map(({ icon: Icon, baslik, aciklama, renk }, i) => (
                            <motion.div
                                key={baslik}
                                initial={{ opacity: 0, y: 30, rotateX: 5 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                whileHover={{ 
                                    scale: 1.02, 
                                    rotateY: i % 2 === 0 ? 3 : -3,
                                    rotateX: 3,
                                    z: 20,
                                    transition: { duration: 0.3 } 
                                }}
                                style={{ transformStyle: "preserve-3d", boxShadow: `0 10px 40px -20px ${renk}30` }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="group relative bg-white shadow-sm border border-gray-200 rounded-3xl p-8 hover:border-gray-300 transition-all flex gap-5 overflow-hidden shadow-lg hover:shadow-lg"
                            >
                                {/* Light sweep */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] pointer-events-none" />

                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform relative z-10 shadow-inner border border-gray-200" style={{ backgroundColor: `${renk}20` }}>
                                    <Icon className="w-6 h-6" style={{ color: renk }} />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-foreground font-syne font-bold text-lg mb-2">{baslik}</h3>
                                    <p className="text-muted-foreground font-lora text-sm leading-relaxed">{aciklama}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── EKİP ── */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto perspective-1000">
                    <div className="text-center mb-16">
                        <p className="text-primary font-mono text-xs uppercase tracking-[0.3em] mb-4">Ekip</p>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground font-syne drop-shadow-md">İşin Mutfağındakiler</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {EKIP.map(({ isim, unvan, hikaye, renk, emoji }, i) => (
                            <motion.div
                                key={isim}
                                initial={{ opacity: 0, y: 30, rotateX: 10 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                                whileHover={{ 
                                    scale: 1.05, 
                                    rotateY: i === 1 ? 0 : (i === 0 ? 5 : -5),
                                    rotateX: 5,
                                    z: 30,
                                    transition: { duration: 0.3 } 
                                }}
                                style={{ transformStyle: "preserve-3d" }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, duration: 0.6 }}
                                className="group relative bg-white shadow-sm border border-gray-200 rounded-3xl p-8 text-center hover:border-gray-300 transition-all flex flex-col items-center overflow-hidden hover:shadow-xl"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                
                                <div
                                    className="relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-4xl group-hover:scale-110 group-hover:-rotate-3 transition-transform shadow-lg border"
                                    style={{ backgroundColor: `${renk}20`, borderColor: `${renk}40`, boxShadow: `0 10px 30px -10px ${renk}50` }}
                                >
                                    {emoji}
                                </div>
                                <h3 className="relative z-10 text-foreground font-syne font-bold text-xl mb-1">{isim}</h3>
                                <p className="relative z-10 text-xs font-mono uppercase tracking-wider mb-5" style={{ color: renk }}>{unvan}</p>
                                <p className="relative z-10 text-muted-foreground font-lora text-sm leading-relaxed">{hikaye}</p>
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center mt-12 relative z-10">
                        <Link href="/kariyer" className="inline-flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-foreground font-medium py-3 px-8 rounded-full transition-all text-sm group">
                            Ekibimize katılmak ister misin? <span className="text-primary font-bold group-hover:translate-x-1 transition-transform">Açık pozisyonları gör →</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── YOL HARİTASI ── */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-gray-200 relative z-10 overflow-hidden">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-5xl mx-auto perspective-1000">
                    <div className="text-center mb-16 relative z-10">
                        <p className="text-primary font-mono text-xs uppercase tracking-[0.3em] mb-4">Vizyon</p>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground font-syne">5 Yıllık Yol Haritamız</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {FAZ.map(({ no, baslik, aciklama, durum, renkClass }, i) => (
                            <motion.div
                                key={no}
                                initial={{ opacity: 0, y: 30, rotateX: 10, rotateY: -10 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
                                whileHover={{ 
                                    scale: 1.05, 
                                    rotateY: i === 1 ? 0 : (i === 0 ? 5 : -5),
                                    rotateX: 5,
                                    z: 40,
                                    transition: { duration: 0.3 } 
                                }}
                                style={{ transformStyle: "preserve-3d" }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2, duration: 0.6 }}
                                className="group relative bg-white shadow-sm border border-gray-200 rounded-3xl p-8 hover:border-gray-300 transition-all shadow-lg hover:shadow-lg overflow-hidden"
                            >
                                {/* Light sweep */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] pointer-events-none" />

                                <span className="absolute -top-4 -right-4 text-8xl font-black text-gray-100 pointer-events-none font-syne z-0 group-hover:text-gray-200 transition-colors">{no}</span>
                                
                                <div className="relative z-10">
                                    <span className="text-primary font-mono font-bold text-lg block mb-4 border-b border-primary/20 pb-2 inline-block drop-shadow-sm">{no}</span>
                                    <h3 className="text-foreground font-syne font-bold text-xl mb-3">{baslik}</h3>
                                    <p className="text-muted-foreground font-lora text-sm leading-relaxed mb-6 h-16">{aciklama}</p>
                                    <span className={`text-xs font-bold px-4 py-1.5 rounded-full border shadow-sm backdrop-blur-md ${renkClass}`}>{durum}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center bg-primary/10 border border-primary/20 rounded-3xl p-10">
                    <h2 className="text-2xl font-extrabold text-foreground font-syne mb-3">
                        Misyonumuza Ortak Ol
                    </h2>
                    <p className="text-muted-foreground text-sm mb-8">
                        Ekibimize katılmak veya esnafını dijitalleştirmek — her iki yolda da bekliyoruz.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href="/kariyer">
                            <button className="bg-primary hover:bg-primary/90 text-foreground font-bold px-8 py-3.5 rounded-xl transition-colors text-sm">
                                Kariyer Fırsatları →
                            </button>
                        </Link>
                        <Link href="/onboarding">
                            <button className="border border-gray-200 text-foreground hover:bg-gray-50 font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm">
                                Platformu Dene
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            <FooterTrustSection />
        </main>
    );
}
