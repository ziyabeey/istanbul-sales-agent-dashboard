"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  X,
  Play,
  ArrowRight,
  Sparkles,
  MessageSquare,
  Calendar,
  Star,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

export default function HeroSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle gradient glow orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[128px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-ai/10 rounded-full blur-[128px]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
            >
              <Sparkles className="w-3.5 h-3.5" />
              🇹🇷 Türkiye&apos;nin Lider Esnaf AI Platformu
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold text-foreground font-syne leading-[1.08] tracking-tight"
            >
              Dükkanın Kepengi
              <br />
              Kapanmasın —{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
                Dijital Asistanın
              </span>{" "}
              Her Zaman Açık.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed"
            >
              WhatsApp yanıtlar, randevu alır, Google yorumlarına cevap yazar, web siteni günceller.{" "}
              <span className="text-foreground font-semibold">7/24, yorulmadan.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4"
            >
              <Link href="/onboarding">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-[0_8px_30px_rgba(79,70,229,0.3)] transition-all duration-200"
                >
                  Ücretsiz Başla
                  <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Link>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsVideoModalOpen(true)}
                className="flex items-center gap-2.5 bg-gray-50 text-foreground px-8 py-4 rounded-2xl font-semibold text-lg border border-gray-200 hover:bg-gray-100 transition-all duration-200"
              >
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Play className="w-3 h-3 fill-white text-white ml-0.5" />
                </div>
                Nasıl Çalışır?
              </motion.button>
            </motion.div>

            {/* Trust chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-sm text-muted-foreground"
            >
              {["Anında Kurulum", "30 Gün İade Garantisi", "Kredi Kartı Gerekmez"].map(
                (item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    {item}
                  </span>
                )
              )}
            </motion.div>
          </div>

          {/* Right: 3D Floating Dashboard Card */}
          <div className="relative w-full max-w-[460px] mx-auto lg:ml-auto mt-10 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="relative w-full aspect-[4/5] sm:aspect-square"
            >
              {/* Main Card */}
              <div className="absolute inset-0 rounded-[2.5rem] border border-gray-200 bg-white shadow-2xl overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 p-[1px]">
                        <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-base tracking-tight">
                        KPNK Core
                      </h3>
                      <p className="text-primary text-xs font-medium">Aktif Zeka Modülü</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  </div>
                </div>

                {/* Activity Stream */}
                <div className="flex-1 p-5 flex flex-col gap-3.5 overflow-hidden relative">
                  {/* Action 1 */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex gap-3.5 items-start"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-0.5">
                        WhatsApp&apos;tan müşteri sorusu yanıtlandı
                      </p>
                      <p className="text-xs text-muted-foreground">&ldquo;Menü fiyatlarınız ne kadar?&rdquo; → PDF iletildi.</p>
                    </div>
                  </motion.div>

                  {/* Action 2 */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 }}
                    className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl flex gap-3.5 items-start"
                  >
                    <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-0.5">Yeni randevu oluşturuldu</p>
                      <p className="text-xs text-primary/70">Yarın 14:00 - Ayşe Yılmaz (Saç Kesimi)</p>
                    </div>
                  </motion.div>

                  {/* Action 3 */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.8 }}
                    className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex gap-3.5 items-start"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Star className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-0.5">
                        Google yorumuna teşekkür edildi
                      </p>
                      <p className="text-xs text-muted-foreground">5 yıldızlı değerlendirme tespit edildi.</p>
                    </div>
                  </motion.div>

                  {/* Bottom fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Floating stat: top right */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", delay: 1.2, stiffness: 200 }}
                className="absolute -top-5 -right-5 bg-white text-foreground rounded-2xl p-4 shadow-xl z-20 flex items-center gap-3 border border-gray-200"
              >
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                    Kurtarılan Zaman
                  </div>
                  <div className="text-lg font-bold text-foreground">+12 Saat/Hafta</div>
                </div>
              </motion.div>

              {/* Floating stat: bottom left */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", delay: 1.7, stiffness: 200 }}
                className="absolute -bottom-6 -left-6 bg-white border border-gray-200 text-foreground rounded-2xl p-4 shadow-xl z-20 flex gap-3 items-center"
              >
                <div className="relative w-11 h-11">
                  <svg className="w-11 h-11 -rotate-90" viewBox="0 0 44 44">
                    <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(79,70,229,0.15)" strokeWidth="4" />
                    <circle
                      cx="22" cy="22" r="18" fill="none" stroke="#4F46E5" strokeWidth="4"
                      strokeDasharray={`${0.98 * 113} 113`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">
                    %98
                  </div>
                </div>
                <div>
                  <div className="font-bold text-sm">Otomatize</div>
                  <div className="text-[11px] text-muted-foreground">Müşteri Talepleri</div>
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden w-full max-w-4xl shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-10 w-9 h-9 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="aspect-video bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Play className="w-7 h-7 text-primary ml-1" />
                  </div>
                  <p className="text-muted-foreground text-sm">Demo Video Yakında</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
