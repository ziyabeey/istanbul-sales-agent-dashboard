"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Sparkles } from "lucide-react";
import { useParallax } from "@/hooks/useScrollAnimation";

export default function FinalCTA() {
  const { ref, y } = useParallax(-80);

  return (
    <section className="relative py-32 sm:py-40 overflow-hidden bg-white">
      {/* Parallax gradient background */}
      <motion.div ref={ref} style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-white to-violet-500/5" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[200px]" />
      </motion.div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-muted-foreground text-sm font-medium mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          Dijital dönüşüm sizi bekliyor
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground font-syne tracking-tight leading-[1.1] mb-6"
        >
          Kepenginizi{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
            Dijitale
          </span>{" "}
          Açın
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Binlerce esnaf gibi siz de müşterilerinize 7/24 ulaşın. Kurulum 2 dakika, sonuç ise kalıcı.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <Link href="/onboarding">
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-2 bg-primary text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-[0_8px_40px_rgba(79,70,229,0.3)] transition-all duration-200"
            >
              Ücretsiz Başlayın
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </Link>
          <Link href="/demo">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-gray-50 text-foreground px-10 py-5 rounded-2xl font-bold text-lg border border-gray-200 hover:bg-gray-100 transition-all duration-200"
            >
              Demo İncele
            </motion.div>
          </Link>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          {[
            { icon: <Shield className="w-4 h-4" />, text: "256-bit SSL" },
            { icon: null, text: "✓ Kredi kartı gerekmez" },
            { icon: null, text: "✓ 30 gün para iade" },
            { icon: null, text: "✓ Anında kurulum" },
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {item.icon}
              {item.text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
