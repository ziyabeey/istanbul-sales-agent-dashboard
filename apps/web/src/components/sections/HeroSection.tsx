"use client";

import React, { useState, MouseEvent, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { X, Play, CheckCircle, Sparkles, MessageSquare, Calendar, Star } from "lucide-react";

export default function HeroSection() {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    // 3D Tilt Effect Settings
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        
        const width = rect.width;
        const height = rect.height;
        
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
            {/* Background blur orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-rust/8 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-steel/8 rounded-full blur-3xl" />
                <div className="absolute top-0 right-1/3 w-[300px] h-[300px] bg-gold/5 rounded-full blur-3xl" />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center lg:items-start text-center lg:text-left"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold bg-rust/15 text-rust border border-rust/25 mb-6"
                        >
                            <span className="flex h-2 w-2 rounded-full bg-rust animate-pulse" />
                            🇹🇷 Türkiye&apos;nin Lider Esnaf AI Platformu
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-[54px] font-extrabold text-foreground tracking-tight leading-[1.1] mb-5 text-balance font-syne"
                        >
                            Dükkanın Kepengi Kapanmasın —{" "}
                            <span className="text-rust">Dijital Asistanın</span>{" "}
                            Her Zaman Açık.
                        </motion.h1>

                        {/* Subheading */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg md:text-xl text-muted-foreground-light mb-8 max-w-lg leading-relaxed"
                        >
                            Türkiye&apos;nin 3.5 milyon esnafına özel — WhatsApp yanıtlar, randevu alır,
                            Google yorumlarına cevap yazar, web siteni günceller. 7/24, yorulmadan.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-6"
                        >
                            <Link href="/onboarding">
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                                    <Button size="lg" variant="primary" className="w-full sm:w-auto px-8 text-base">
                                        Ücretsiz Başla
                                    </Button>
                                </motion.div>
                            </Link>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setIsVideoModalOpen(true)}
                                className="flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl border border-white/15 text-foreground/80 hover:text-foreground hover:border-white/30 transition-all text-base font-medium bg-white/5 hover:bg-white/8"
                            >
                                <div className="w-7 h-7 rounded-full bg-rust flex items-center justify-center flex-shrink-0">
                                    <Play className="w-3 h-3 fill-white text-white ml-0.5" />
                                </div>
                                Nasıl Çalışır?
                            </motion.button>
                        </motion.div>

                        {/* Trust chips */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8 text-sm text-muted-foreground-light"
                        >
                            {['Anında Kurulum', '30 Gün İade Garantisi', 'Kredi Kartı Gerekmez'].map((item) => (
                                <span key={item} className="flex items-center gap-1.5">
                                    <CheckCircle className="w-4 h-4 text-rust flex-shrink-0" />
                                    {item}
                                </span>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Visual Content - 3D Floating Dashboard */}
                    <div className="relative lg:ml-auto w-full max-w-[500px] mx-auto perspective-1000 mt-10 lg:mt-0">
                        {/* Interactive 3D Card Area */}
                        <motion.div
                            ref={ref}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                rotateY,
                                rotateX,
                                transformStyle: "preserve-3d",
                            }}
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            className="relative w-full aspect-[4/5] sm:aspect-square"
                        >
                            {/* Main Floating Dashboard */}
                            <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col transform-gpu" style={{ transform: "translateZ(0px)" }}>
                                
                                {/* Glass Header */}
                                <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rust to-orange-600 p-[1px]">
                                                <div className="w-full h-full bg-background/80 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                                    <Sparkles className="w-6 h-6 text-rust" />
                                                </div>
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-background animate-pulse" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground text-lg tracking-tight">kepenk.ai Core</h3>
                                            <p className="text-rust text-xs font-medium flex items-center gap-1">
                                                <span>Aktif Zeka Modülü</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-rust/20" />
                                        <div className="w-3 h-3 rounded-full bg-rust/40" />
                                        <div className="w-3 h-3 rounded-full bg-rust" />
                                    </div>
                                </div>

                                {/* Body / Activity Stream */}
                                <div className="flex-1 p-5 flex flex-col gap-4 overflow-hidden relative">
                                    {/* Action 1 */}
                                    <motion.div 
                                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
                                        className="bg-white/5 border border-white/5 p-4 rounded-2xl flex gap-4 items-start"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                            <MessageSquare className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground mb-1">WhatsApp'tan müşteri sorusu yanıtlandı</p>
                                            <p className="text-xs text-muted-foreground">"Menü fiyatlarınız ne kadar?" → PDF iletildi.</p>
                                        </div>
                                    </motion.div>

                                    {/* Action 2 */}
                                    <motion.div 
                                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}
                                        className="bg-rust/5 border border-rust/10 p-4 rounded-2xl flex gap-4 items-start"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-rust/20 flex items-center justify-center flex-shrink-0">
                                            <Calendar className="w-5 h-5 text-rust" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground mb-1">Yeni randevu oluşturuldu</p>
                                            <p className="text-xs text-rust">Yarın 14:00 - Ayşe Yılmaz (Saç Kesimi)</p>
                                        </div>
                                    </motion.div>

                                    {/* Action 3 */}
                                    <motion.div 
                                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.8 }}
                                        className="bg-yellow-500/5 border border-yellow-500/10 p-4 rounded-2xl flex gap-4 items-start"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                                            <Star className="w-5 h-5 text-yellow-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground mb-1">Google yorumuna teşekkür edildi</p>
                                            <p className="text-xs text-muted-foreground">5 yıldızlı değerlendirme tespit edildi.</p>
                                        </div>
                                    </motion.div>

                                    {/* Gradient overlay for fade out at bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
                                </div>
                            </div>

                            {/* Floating Stats Card 1 (Top Right) */}
                            <motion.div
                                style={{ transform: "translateZ(50px)" }}
                                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", delay: 1, stiffness: 200 }}
                                className="absolute -top-6 -right-6 bg-steel border border-white/10 text-foreground rounded-2xl p-4 shadow-2xl z-20 flex items-center gap-3 backdrop-blur-md"
                            >
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-2xl">
                                    📈
                                </div>
                                <div>
                                    <div className="text-xs text-foreground/70 uppercase tracking-widest font-semibold mb-0.5">Kurtarılan Zaman</div>
                                    <div className="text-xl font-bold">+12 Saat/Hafta</div>
                                </div>
                            </motion.div>

                            {/* Floating Stats Card 2 (Bottom Left) */}
                            <motion.div
                                style={{ transform: "translateZ(80px)" }}
                                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", delay: 1.5, stiffness: 200 }}
                                className="absolute -bottom-8 -left-8 bg-background border border-border text-foreground rounded-2xl p-4 shadow-2xl z-20 flex gap-4 items-center"
                            >
                                <div className="relative w-12 h-12">
                                    <div className="absolute inset-0 border-4 border-rust/20 rounded-full" />
                                    <div className="absolute inset-0 border-4 border-rust rounded-full border-t-transparent border-r-transparent rotate-45" />
                                    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                                        %98
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">Otomatize</div>
                                    <div className="text-xs text-muted-foreground">Müşteri Talepleri</div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {isVideoModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm"
                        onClick={() => setIsVideoModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-background border border-white/10 rounded-2xl overflow-hidden w-full max-w-4xl shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsVideoModalOpen(false)}
                                className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/10 hover:bg-white/20 text-foreground rounded-full flex items-center justify-center transition"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            <div className="aspect-video bg-background/50 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-16 h-16 rounded-full bg-rust/20 border border-rust/30 flex items-center justify-center mx-auto mb-4">
                                        <Play className="w-7 h-7 text-rust ml-1" />
                                    </div>
                                    <p className="text-foreground/60 text-sm">Demo Video Yakında</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
