'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Award, MapPin } from 'lucide-react';
import { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

// ── Animations ──
const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as any } }
};

const staggerChildren: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ── 1. Hero (Heritage Elegance) ──
export function RestoranKlasikHero({ business }: SectionProps<any>) {
  return (
    <section className="relative min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 md:p-12">
      <div className="absolute inset-4 md:inset-8 border-[1px] border-[#8C1C13]/20 pointer-events-none" />
      <div className="absolute inset-6 md:inset-10 border-[1px] border-[#8C1C13]/10 pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center w-full bg-white/80 backdrop-blur-sm p-12 md:p-24 border border-[#8C1C13]/30 shadow-2xl">
        <motion.div initial="hidden" animate="visible" variants={staggerChildren} className="flex flex-col items-center">
          <motion.div variants={fadeUp} className="mb-8">
            <Utensils className="w-12 h-12 text-[#8C1C13] mx-auto" />
          </motion.div>
          <motion.p variants={fadeUp} className="font-serif italic text-xl md:text-2xl text-[#594A42] tracking-widest mb-4">
            Hoş Geldiniz
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl lg:text-[6rem] text-[#1A1A1A] tracking-tight mb-8">
            {business.name}
          </motion.h1>
          <motion.div variants={fadeUp} className="w-32 h-[2px] bg-[#8C1C13] mb-8" />
          <motion.p variants={fadeUp} className="font-sans text-lg md:text-xl text-[#594A42] max-w-2xl mx-auto font-light leading-relaxed">
            {business.slogan || 'Nesilden nesile aktarılan eşsiz lezzetler ve geleneksel misafirperverlik.'}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// ── 2. Menu (Classic List) ──
export function RestoranKlasikHizmetler({ business }: SectionProps<any>) {
  return (
    <section id="menu" className="py-24 bg-[#FDFBF7]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-20 flex flex-col items-center">
          <h2 className="font-serif text-5xl text-[#1A1A1A] mb-6">Mutfak</h2>
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-[#8C1C13]"></div>
            <Award className="w-5 h-5 text-[#8C1C13]" />
            <div className="w-12 h-[1px] bg-[#8C1C13]"></div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-x-24">
          {business.services?.map((service: any, idx: number) => (
            <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col pb-6 border-b border-[#8C1C13]/20">
              <div className="flex justify-between items-end mb-3">
                <h3 className="font-serif text-2xl text-[#1A1A1A]">{service.name}</h3>
                <span className="font-sans font-bold text-[#8C1C13] text-lg shrink-0 pl-4">{service.price || '₺'}</span>
              </div>
              <p className="font-sans font-light text-[#594A42] leading-relaxed text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 3. Iletisim (Classic Footer Card) ──
export function RestoranKlasikIletisim({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-24 bg-[#1A1A1A] text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="border border-white/20 p-16">
          <MapPin className="w-8 h-8 text-[#8C1C13] mx-auto mb-8" />
          <h2 className="font-serif text-4xl mb-8">Rezervasyon</h2>
          <p className="font-sans font-light text-xl mb-4 text-white/80">{business.phone || '0212 000 00 00'}</p>
          <p className="font-sans font-light text-sm text-white/50">{business.address || 'Tarihi Çarşı Sokak, İstanbul'}</p>
        </motion.div>
      </div>
    </section>
  );
}

// ── Fallbacks ──
export function RestoranKlasikAbout({ business }: SectionProps<any>) { return null; }
export function RestoranKlasikGallery({ business }: SectionProps<any>) { return null; }
export function RestoranKlasikTeam({ business }: SectionProps<any>) { return null; }
export function RestoranKlasikFaq({ business }: SectionProps<any>) { return null; }
export function RestoranKlasikBlogPreview({ business }: SectionProps<any>) { return null; }
export function RestoranKlasikTestimonials({ business }: SectionProps<any>) { return null; }

// ── Registration ──
import type { ComponentType } from 'react';
registerSection('hero', 'restoran_klasik_hero', RestoranKlasikHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('about', 'restoran_klasik_about', RestoranKlasikAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('services', 'restoran_klasik_services', RestoranKlasikHizmetler as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('gallery', 'restoran_klasik_gallery', RestoranKlasikGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('contact', 'restoran_klasik_contact', RestoranKlasikIletisim as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('team', 'restoran_klasik_team', RestoranKlasikTeam as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('faq', 'restoran_klasik_faq', RestoranKlasikFaq as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('blog_preview', 'restoran_klasik_blog_preview', RestoranKlasikBlogPreview as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('testimonials', 'restoran_klasik_testimonials', RestoranKlasikTestimonials as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
