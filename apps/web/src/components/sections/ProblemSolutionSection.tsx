"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const painPoints = [
  {
    title: "Geleneksel Ajanslar",
    issues: [
      "7.000 - 18.000₺ aylık maliyet",
      "Yavaş süreç ve bürokrasi",
      "Sadece 09:00 - 18:00 arası müsaitlik",
    ],
  },
  {
    title: "Hazır Site Platformları",
    issues: [
      "Yabancı dil zorunluluğu",
      "Teknik karmaşa (Domain, Hosting)",
      "Kişisel destek eksikliği",
    ],
  },
  {
    title: "Serbest Çalışanlar",
    issues: [
      "Sistemsizlik ve garantisizlik",
      "Aniden ortadan kaybolma riski",
      "Her iş için ayrı bütçe talebi",
    ],
  },
];

const kepenkSolutions = [
  "Aylık 399₺'den başlayan fiyatlar",
  "2 dakikada anında kurulum",
  "7/24 kesintisiz çalışma & destek",
  "Tek platformda her şey dahil",
  "30 gün para iade garantisi",
];

export default function ProblemSolutionSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#F9FAFB] relative overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-mono text-sm uppercase tracking-[0.2em] mb-4"
          >
            Neden KPNK?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 font-syne mb-5"
          >
            Diğerlerinden{" "}
            <span className="text-primary">Farkı Ne?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500"
          >
            Esnafın bütçesini ve zamanını yormayan, sorunsuz bir dijital ortaklık sunuyoruz.
          </motion.p>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Pain Points */}
          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-4"
            >
              ✗ Mevcut Alternatifler
            </motion.p>
            {painPoints.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3 font-syne">{item.title}</h3>
                <ul className="space-y-2.5">
                  {item.issues.map((issue, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <span className="text-gray-500 text-sm">{issue}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Right: kepenk.ai Solution */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-semibold text-primary uppercase tracking-wider mb-4"
            >
              ✓ KPNK Çözümü
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-indigo-600/10 via-violet-50 to-indigo-50 rounded-3xl p-8 border border-primary/20 shadow-sm relative overflow-hidden"
            >
              {/* Glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[80px]" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
                    <span className="text-white font-bold text-lg">K</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 font-syne">KPNK Asistanı</h3>
                    <p className="text-primary text-sm font-medium">Hepsi bir arada çözüm</p>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {kepenkSolutions.map((solution, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + idx * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium text-sm">{solution}</span>
                    </motion.li>
                  ))}
                </ul>

                <Link href="/onboarding">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-[0_0_20px_rgba(79,70,229,0.2)] transition-all"
                  >
                    Hemen Dene
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
