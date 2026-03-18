"use client";

import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";

// Dynamically loaded heavier sections
const ProblemSolutionSection = dynamic(() => import("@/components/sections/ProblemSolutionSection"), { ssr: true });
const FeaturesSection = dynamic(() => import("@/components/sections/FeaturesSection"), { ssr: true });
const SectorCarousel = dynamic(() => import("@/components/sections/SectorCarousel"), { ssr: true });
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"), { ssr: true });
const PartnersSection = dynamic(() => import("@/components/sections/PartnersSection"), { ssr: true });
const PowerFeaturesSection = dynamic(() => import("@/components/sections/PowerFeaturesSection"), { ssr: true });
const TedarikSection = dynamic(() => import("@/components/sections/TedarikSection"), { ssr: true });
const PricingCards = dynamic(() => import("@/components/sections/PricingCards"), { ssr: true });
const SSSSection = dynamic(() => import("@/components/sections/SSSSection"), { ssr: true });
const FinalCTA = dynamic(() => import("@/components/sections/FinalCTA"), { ssr: true });
const FooterTrustSection = dynamic(() => import("@/components/sections/FooterTrustSection"), { ssr: true });

export default function Home() {
  return (
    <main className="min-h-screen font-sans relative bg-white">
      <Navbar />

      {/* Hero — koyu section */}
      <HeroSection />

      {/* Çalışma Ortakları — ince trust bar */}
      <PartnersSection />

      {/* Problem/Solution — koyu section */}
      <ProblemSolutionSection />

      {/* Features — scroll-driven özellik kartları */}
      <FeaturesSection />

      {/* Sektör Carousel */}
      <SectorCarousel />

      {/* Müşteri Yorumları */}
      <TestimonialsSection />

      {/* Güçlü Özellikler */}
      <PowerFeaturesSection />

      {/* Tedarik */}
      <TedarikSection />

      {/* Fiyatlandırma */}
      <PricingCards />

      {/* Sık Sorulan Sorular */}
      <SSSSection />

      {/* Son CTA */}
      <FinalCTA />

      {/* Footer */}
      <FooterTrustSection />
    </main>
  );
}
