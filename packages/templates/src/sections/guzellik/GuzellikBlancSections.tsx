'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';
import { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

// ── Animations ──
const ultraSlowFade: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 2, ease: "linear" as const } }
};

const subtleSlideUp: any = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] } }
};

// ── 1. Hero (Minimalist Pure White) ──
export function GuzellikBlancHero({ business }: SectionProps<any>) {
  return (
    <section className="relative h-screen bg-white overflow-hidden flex items-end justify-center pb-24 border-b border-gray-100">
      <motion.div initial="hidden" animate="visible" variants={ultraSlowFade} className="absolute inset-0 z-0 bg-[#FAFAFA]">
        {business.photos?.[0] ? (
           <img src={business.photos[0]} alt={business.name} className="w-full h-full object-cover opacity-30 grayscale filter mix-blend-multiply" />
        ) : (
           <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80')] bg-cover bg-center opacity-30 grayscale filter mix-blend-multiply" />
        )}
      </motion.div>

      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-8 flex flex-col items-center">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.3 } } }} className="text-center">
          <motion.h1 variants={subtleSlideUp} className="font-sans text-[clamp(4rem,8vw,10rem)] leading-[0.8] tracking-tighter text-[#111] mb-8 font-medium lowercase">
            {business.name.split(' ')[0] || 'blanc'}
          </motion.h1>
          <motion.p variants={subtleSlideUp} className="font-sans text-xs md:text-sm tracking-[0.3em] text-gray-400 uppercase max-w-md mx-auto leading-loose mb-12">
            {business.slogan || 'The pure essence of clinical beauty. Refined, immaculate, and timeless.'}
          </motion.p>
          <motion.div variants={subtleSlideUp}>
            <a href="#hizmetler" className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-gray-200 text-gray-400 hover:bg-[#111] hover:text-white hover:border-[#111] transition-all duration-700">
              <ArrowRight className="w-5 h-5 rotate-90" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── 2. Hakkimizda (Clinical Text) ──
export function GuzellikBlancAbout({ business }: SectionProps<any>) {
  return (
    <section id="hakkimizda" className="py-40 bg-white text-[#111]">
      <div className="max-w-4xl mx-auto px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={subtleSlideUp}>
          <h2 className="font-sans text-2xl md:text-4xl font-light leading-tight tracking-tight mb-8">
            {(business.about as string) || 'We believe in aesthetic purity. Our methodologies are rooted in advanced dermatology and delivered in an environment stripped of distractions.'}
          </h2>
          <div className="flex items-center gap-6 mt-16 text-xs tracking-widest uppercase text-gray-400">
             <span>Est. {business.foundedYear || '2020'}</span>
             <span className="w-8 h-[1px] bg-gray-200" />
             <span>{business.city || 'Istanbul'}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── 3. Menu (Minimal Table) ──
export function GuzellikBlancServices({ business }: SectionProps<any>) {
  return (
    <section id="hizmetler" className="py-40 bg-[#FAFAFA] text-[#111]">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={ultraSlowFade} className="mb-24">
          <h2 className="font-sans text-xs uppercase tracking-[0.4em] text-gray-400">01 / Services</h2>
        </motion.div>

        <div className="w-full border-t border-gray-200">
          {business.services?.map((service: any, idx: number) => (
            <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={subtleSlideUp} className="group flex flex-col md:flex-row justify-between items-start md:items-center py-8 border-b border-gray-200 hover:bg-white hover:px-6 transition-all duration-500 cursor-pointer">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 w-full md:w-auto">
                <h3 className="font-sans text-2xl md:text-3xl font-light tracking-tight group-hover:tracking-normal transition-all duration-700">{service.name}</h3>
                <span className="font-sans text-xs uppercase tracking-widest text-gray-400 hidden md:block">{service.duration || '60 min'}</span>
              </div>
              <div className="flex items-center gap-8 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                <span className="font-sans text-lg font-light">{service.price || 'P.O.A'}</span>
                <Plus className="w-5 h-5 text-gray-300 group-hover:text-[#111] transition-colors duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 4. Iletisim (Clean Details) ──
export function GuzellikBlancContact({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-40 bg-[#111] text-white">
      <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={subtleSlideUp}>
          <h2 className="font-sans text-xs uppercase tracking-[0.4em] text-gray-500 mb-16">02 / Contact</h2>
          <h3 className="text-6xl md:text-7xl font-light tracking-tight mb-12 lowercase">{business.name.split(' ')[0] || 'blanc'}</h3>
          
          <div className="space-y-4 font-sans text-sm tracking-wide font-light text-gray-400">
            <p className="hover:text-white transition-colors cursor-pointer">{business.email || 'hello@blanc.studio'}</p>
            <p className="hover:text-white transition-colors cursor-pointer">{business.phone || '+33 1 23 45 67 89'}</p>
          </div>
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={subtleSlideUp} className="md:mt-32">
          <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-gray-300 mb-12">
            {business.address || '12 Avenue Montaigne\n75008 Paris, France'}
          </p>
          <a href="#" className="inline-flex pb-1 border-b border-gray-600 text-sm tracking-widest uppercase hover:border-white transition-colors">
            Book an appointment
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ── Fallbacks ──
export function GuzellikBlancGallery({ business }: SectionProps<any>) { return null; }
export function GuzellikBlancTeam({ business }: SectionProps<any>) { return null; }
export function GuzellikBlancFaq({ business }: SectionProps<any>) { return null; }
export function GuzellikBlancBlogPreview({ business }: SectionProps<any>) { return null; }
export function GuzellikBlancTestimonials({ business }: SectionProps<any>) { return null; }

// ── Registration ──
import type { ComponentType } from 'react';
registerSection('hero', 'guzellik_blanc_hero', GuzellikBlancHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('about', 'guzellik_blanc_about', GuzellikBlancAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('services', 'guzellik_blanc_services', GuzellikBlancServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('gallery', 'guzellik_blanc_gallery', GuzellikBlancGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('contact', 'guzellik_blanc_contact', GuzellikBlancContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('team', 'guzellik_blanc_team', GuzellikBlancTeam as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('faq', 'guzellik_blanc_faq', GuzellikBlancFaq as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('blog_preview', 'guzellik_blanc_blog_preview', GuzellikBlancBlogPreview as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('testimonials', 'guzellik_blanc_testimonials', GuzellikBlancTestimonials as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
