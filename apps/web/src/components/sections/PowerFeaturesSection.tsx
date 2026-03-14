"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, PhoneCall, Check, Send, PhoneOff, Settings2, Mic } from "lucide-react";

export default function PowerFeaturesSection() {
    // Chat Animation Variants
    const chatContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.8, delayChildren: 0.5 }
        }
    };
    const chatBubble = {
        hidden: { opacity: 0, y: 10, scale: 0.95 },
        show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 200 } }
    };

    return (
        <section className="py-32 text-foreground overflow-hidden relative">
            {/* Soft Ambient Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rust/20 bg-rust/5 text-rust font-semibold text-sm mb-6"
                    >
                        <Settings2 className="w-4 h-4" />
                        Otonom Satış Gücü
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight font-syne"
                    >
                        Hiçbir Müşteriyi <span className="text-transparent bg-clip-text bg-gradient-to-r from-rust to-orange-400">Kaçırmayın</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-muted-foreground-light"
                    >
                        Siz işinize odaklanın; WhatsApp mesajlarınızı ve cevapsız çağrılarınızı yapay zeka satışa dönüştürsün.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 perspective-1000">

                    {/* WA Bot Feature (Interactive 3D Chat) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50, rotateY: -10 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        whileHover={{ 
                            scale: 1.02, 
                            rotateY: 5, 
                            rotateX: 2, 
                            transition: { type: "spring", stiffness: 300 }
                        }}
                        style={{ transformStyle: "preserve-3d" }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="bg-background/10 border border-white/5 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-xl relative group shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    >
                        {/* Glow effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500/20 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h3 className="text-3xl font-bold font-syne mb-2 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                                            <MessageSquare className="w-5 h-5 text-[#25D366]" />
                                        </div>
                                        The Closer
                                    </h3>
                                    <p className="text-muted-foreground">Gece 03:00'te bile satışı kapatır.</p>
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-green-400 bg-green-400/10 px-3 py-1.5 rounded-full border border-green-500/20 shadow-sm animate-pulse">
                                    Aktif
                                </span>
                            </div>

                            {/* 3D Chat Mockup */}
                            <motion.div 
                                style={{ transform: "translateZ(40px)" }}
                                className="bg-[#0b141a] rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col h-[320px]"
                            >
                                {/* Chat Header */}
                                <div className="bg-[#202c33] px-4 py-3 flex items-center gap-3 border-b border-white/5">
                                    <div className="w-10 h-10 rounded-full bg-rust flex items-center justify-center text-white font-bold text-sm">
                                        AI
                                    </div>
                                    <div>
                                        <div className="text-white font-medium text-sm">kepenk.ai Asistanı</div>
                                        <div className="text-[#8696a0] text-xs">çevrimiçi</div>
                                    </div>
                                </div>
                                
                                {/* Chat Body */}
                                <div className="flex-1 bg-[#0b141a] p-4 flex flex-col justify-end">
                                    <motion.div 
                                        variants={chatContainer}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true }}
                                        className="space-y-3"
                                    >
                                        <motion.div variants={chatBubble} className="flex justify-start">
                                            <div className="bg-[#202c33] text-[#e9edef] text-sm px-4 py-2 rounded-2xl rounded-tl-none max-w-[85%]">
                                                Merhaba, saat çok geç kusura bakmayın. Dükkan açık mıydı acaba?
                                            </div>
                                        </motion.div>
                                        <motion.div variants={chatBubble} className="flex justify-end relative">
                                            <div className="bg-[#005c4b] text-[#e9edef] text-sm px-4 py-2 rounded-2xl rounded-tr-none max-w-[85%] shadow-sm">
                                                Merhaba! 👋 Dükkanımız şu an kapalı ancak yarın sabah 09:00'da açılıyoruz. Size nasıl yardımcı olabilirim? İsterseniz hemen yarın için randevu oluşturabilirim.
                                                <div className="flex justify-end items-center gap-1 mt-1 text-[10px] text-white/50">
                                                    03:14 <Check className="w-3 h-3 text-[#53bdeb]" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </div>
                                
                                {/* Chat Footer */}
                                <div className="bg-[#202c33] px-4 py-3 flex items-center gap-2">
                                    <div className="flex-1 bg-[#2a3942] rounded-full h-10 px-4 flex items-center text-[#8696a0] text-sm">Mesaj yazın...</div>
                                    <div className="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center text-white shrink-0">
                                        <Send className="w-4 h-4 ml-1" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Voice Assistant Feature (Interactive 3D Call) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, rotateY: 10 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        whileHover={{ 
                            scale: 1.02, 
                            rotateY: -5, 
                            rotateX: 2, 
                            transition: { type: "spring", stiffness: 300 }
                        }}
                        style={{ transformStyle: "preserve-3d" }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.2 }}
                        className="bg-rust/5 border border-rust/20 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-xl relative group shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    >
                        {/* Glow effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-bl from-rust/30 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h3 className="text-3xl font-bold font-syne mb-2 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-rust/20 flex items-center justify-center">
                                            <PhoneCall className="w-5 h-5 text-rust" />
                                        </div>
                                        Otonom Çağrı
                                    </h3>
                                    <p className="text-muted-foreground">İnsan sesinde, sıfır gecikme.</p>
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-rust bg-rust/10 px-3 py-1.5 rounded-full border border-rust/20 shadow-sm">
                                    Premium+
                                </span>
                            </div>

                            {/* 3D Phone Call Mockup */}
                            <motion.div 
                                style={{ transform: "translateZ(40px)" }}
                                className="bg-[#121212] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-[320px] relative border-[6px] border-[#222]"
                            >
                                {/* Call UI */}
                                <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-black flex flex-col items-center justify-between py-8">
                                    
                                    <div className="text-center">
                                        <div className="w-20 h-20 rounded-full bg-rust/20 mx-auto mb-4 flex items-center justify-center relative">
                                            {/* Pulsing waves for speech */}
                                            <motion.div 
                                                animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0.2, 0] }}
                                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                                                className="absolute inset-0 border-2 border-rust rounded-full"
                                            />
                                            <motion.div 
                                                animate={{ scale: [1, 1.2, 1.8], opacity: [0.3, 0.1, 0] }}
                                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                                className="absolute inset-0 border-2 border-rust rounded-full"
                                            />
                                            <Mic className="w-8 h-8 text-rust" />
                                        </div>
                                        <h4 className="text-white text-xl font-medium">Ahmet Usta Tesisat</h4>
                                        <p className="text-[#888] text-sm mt-1">Konuşuyor... 00:15</p>
                                    </div>
                                    
                                    {/* Real-time Subtitles/Transcript */}
                                    <div className="w-full px-6 text-center">
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ repeat: Infinity, duration: 4, repeatType: "reverse" }}
                                            className="bg-white/10 backdrop-blur-md rounded-xl p-3 inline-block"
                                        >
                                            <p className="text-white font-lora italic text-sm">
                                                "Sistemin havasını aldım dediniz, kombinin basıncı şu an kaçta görünüyor?"
                                            </p>
                                        </motion.div>
                                    </div>

                                    {/* Call Controls */}
                                    <div className="flex gap-6 mt-4">
                                        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white/50 backdrop-blur-md">
                                            <Mic className="w-6 h-6" />
                                        </div>
                                        <div className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center text-white shadow-lg shadow-red-500/30 cursor-pointer">
                                            <PhoneOff className="w-6 h-6" />
                                        </div>
                                    </div>
                                    
                                    {/* IPhone Home Bar */}
                                    <div className="w-1/3 h-1 bg-white/30 rounded-full absolute bottom-2" />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
