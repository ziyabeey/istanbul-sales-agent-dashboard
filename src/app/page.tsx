import React from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSolutionSection from "@/components/sections/ProblemSolutionSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import PowerFeaturesSection from "@/components/sections/PowerFeaturesSection";
import PricingSection from "@/components/sections/PricingSection";
import FooterTrustSection from "@/components/sections/FooterTrustSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-base font-sans selection:bg-secondary-500 selection:text-white relative">
      <Navbar />
      {/* 1. Ana Karşılama Alanı */}
      <HeroSection />

      {/* 2. Problem ve Rekabet Analizi */}
      <ProblemSolutionSection />

      {/* 3. Ana Özellikler (17 Ajan) */}
      <FeaturesSection />

      {/* 4. The Closer ve Sesli Asistan (Güç Özellikleri) */}
      <PowerFeaturesSection />

      {/* 5. Fiyatlandırma Matrisi */}
      <PricingSection />

      {/* 6. Footer ve Güven Sinyalleri */}
      <FooterTrustSection />
    </main>
  );
}
