"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { X, Play } from "lucide-react";

/**
 * HeroSection Component
 * 
 * The primary landing area (above the fold) of the kepenk.ai platform.
 * It introduces the main value proposition, primary CTAs, and a visual representation 
 * of the AI assistant UI. It utilizes Framer Motion for entrance animations.
 * 
 * @returns {JSX.Element} The rendered Hero section.
 */
export default function HeroSection() {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    return (
        <section className="relative overflow-hidden bg-ink pt-24 pb-16 md:pt-32 md:pb-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl"
                    >
                        <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-rust bg-steel mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-rust mr-2 animate-pulse"></span>
                            kepenk.ai Yayında
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-cream tracking-tight leading-tight mb-6 text-balance">
                            Herkes İster Bir Çalışanı Olsun. Esnaf Bunu Karşılayamıyor Diye Üzülmeyin. <span className="text-rust">Biz Karşılıyoruz.</span>
                        </h1>

                        <p className="font-lora italic text-lg md:text-xl text-stone-light mb-8 max-w-xl leading-relaxed">
                            Türkiye'nin 3.5 milyon esnafına özel, 7/24 uyumayan, yorulmayan dijital iş arkadaşınız kepenk.ai ile tanışın.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/onboarding" passHref legacyBehavior>
                                <motion.a
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="w-full sm:w-auto"
                                >
                                    <Button size="lg" variant="primary" className="w-full">
                                        Ücretsiz Başla
                                    </Button>
                                </motion.a>
                            </Link>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full sm:w-auto"
                            >
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="w-full flex items-center justify-center gap-2"
                                    onClick={() => setIsVideoModalOpen(true)}
                                >
                                    <Play className="w-4 h-4" /> Demo İzle
                                </Button>
                            </motion.div>
                        </div>

                        <div className="mt-8 flex items-center gap-4 text-sm text-stone-light font-medium">
                            <div className="flex items-center gap-1">
                                <svg className="w-5 h-5 text-rust" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                Anında Kurulum
                            </div>
                            <div className="flex items-center gap-1">
                                <svg className="w-5 h-5 text-rust" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                7/24 Kesintisiz Hizmet
                            </div>
                        </div>
                    </motion.div>

                    {/* Visual Content - Illustration/Mockup representation */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative lg:ml-auto w-full max-w-lg"
                    >
                        {/* Abstract representation of the Assistant UI */}
                        <div className="relative rounded-3xl bg-cream shadow-2xl border border-warm overflow-hidden aspect-[4/5] transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
                            {/* Header */}
                            <div className="bg-steel text-cream p-6 flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-lg">kepenk.ai Asistan</h3>
                                    <p className="text-stone-light text-sm">Çevrimiçi</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center">
                                    <span className="text-xl">🤖</span>
                                </div>
                            </div>

                            {/* Chat Body */}
                            <div className="p-6 bg-warm h-full flex flex-col gap-4">
                                <div className="bg-cream p-4 rounded-2xl rounded-tl-sm shadow-sm border border-stone-light/20 max-w-[85%] self-start">
                                    <p className="font-lora italic text-sm font-medium text-ink">Günaydın Ahmet Usta! ☀️</p>
                                    <p className="font-lora italic text-sm text-ink/80 mt-1">Bugün hava yağmurlu. Dükkandaki iç mekan boya işlerini öne almanı tavsiye ederim.</p>
                                </div>

                                <div className="bg-rust text-cream p-4 rounded-2xl rounded-tr-sm shadow-sm max-w-[85%] self-end">
                                    <p className="text-sm">Teşekkürler asistan. Bugünkü randevuları hatırlatır mısın?</p>
                                </div>

                                <div className="bg-cream p-4 rounded-2xl rounded-tl-sm shadow-sm border border-stone-light/20 max-w-[85%] self-start">
                                    <p className="font-lora italic text-sm text-ink">Tabii ki! Saat 14:00'te Ayşe Hanım'ın tesisat işi var. Adresi WhatsApp'ına gönderdim.</p>
                                </div>
                            </div>

                            {/* Decorative Blur */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-rust rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-rust-light rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {isVideoModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm"
                        onClick={() => setIsVideoModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-cream rounded-2xl overflow-hidden w-full max-w-4xl shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsVideoModalOpen(false)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 bg-ink/50 hover:bg-ink/70 text-cream rounded-full flex items-center justify-center transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="aspect-video bg-ink flex items-center justify-center text-stone">
                                <div className="text-center">
                                    <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                    <p>Demo Video Placeholder</p>
                                    <p className="text-sm opacity-50 mt-2">Bu alana YouTube/Vimeo iframe gelecek</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
