"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PartnersSection from "@/components/sections/PartnersSection";

// Asenkron olarak yüklenecek ağır (aşağıda kalan) bileşenler
const SectorCarousel = dynamic(() => import('@/components/sections/SectorCarousel'), { ssr: true });
const ProblemSolutionSection = dynamic(() => import('@/components/sections/ProblemSolutionSection'), { ssr: true });
const PowerFeaturesSection = dynamic(() => import('@/components/sections/PowerFeaturesSection'), { ssr: true });
const PricingSection = dynamic(() => import('@/components/sections/PricingSection'), { ssr: true });
const TedarikSection = dynamic(() => import('@/components/sections/TedarikSection'), { ssr: true });
const SSSSection = dynamic(() => import('@/components/sections/SSSSection'), { ssr: true });
const FooterTrustSection = dynamic(() => import('@/components/sections/FooterTrustSection'), { ssr: true });

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Arka plan rengini scroll pozisyonuna göre yumuşakça değiştir (Toprak -> Gece -> Kurumsal -> Pastel vs)
  // Tailwind değerlerine karşılık gelen renk kodları (yaklaşık)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      "#0E0D0B", // Hero: Dark Background
      "#1a1510", // Features: Earthy Dark
      "#0a1628", // Power Features: Deep Ocean Blue
      "#050510", // Pricing: Neon/Cyber Dark
      "#1a2332", // SSS/Tedarik: Corporate Dark
      "#0a0a0a"  // Footer: Pitch Black
    ]
  );

  return (
    <motion.main 
      ref={containerRef}
      className="min-h-screen font-sans relative transition-colors duration-700"
      style={{ backgroundColor }}
    >
      <Navbar />
      {/* 1. Ana Karşılama Alanı */}
      <HeroSection />

      {/* 2. Sosyal Kanıt ve İstatistikler */}
      <TestimonialsSection />

      {/* 2.5. Çözüm Ortakları Marquee */}
      <PartnersSection />

      {/* 3. SEO Sektörel Yönlendirme */}
      <SectorCarousel />

      {/* 3. Problem ve Rekabet Analizi */}
      <ProblemSolutionSection />

      {/* 3. Ana Özellikler (17 Ajan) */}
      <FeaturesSection />

      {/* 4. The Closer ve Sesli Asistan (Güç Özellikleri) */}
      <PowerFeaturesSection />

      {/* 5. Tedarik Ağı */}
      <TedarikSection />

      {/* 6. Fiyatlandırma Matrisi */}
      <PricingSection />

      {/* 6. SSS */}
      <SSSSection />

      {/* 7. Footer ve Güven Sinyalleri */}
      <FooterTrustSection />
    </motion.main>
  );
}
