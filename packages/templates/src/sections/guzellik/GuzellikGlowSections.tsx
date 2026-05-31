'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, MapPin, Instagram } from 'lucide-react';
import { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

// ── Animations ──
const springPop: any = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 200, damping: 20 } }
};

const marqueeVariants: any = {
  animate: { x: [0, -1000], transition: { x: { repeat: Infinity, repeatType: "loop", duration: 15, ease: "linear" as const } } },
};

// ── 1. Hero (Radiant & Modern Neon) ──
export function GuzellikGlowHero({ business }: SectionProps<any>) {
  return (
    <section className="relative min-h-screen bg-[#0F0F0F] flex items-center justify-center overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF007F]/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7000FF]/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.h1 variants={springPop} className="font-heading text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 uppercase">
            {business.name.split(' ')[0] || 'GLOW'}<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF007F] to-[#7000FF]">STUDIO</span>
          </motion.h1>
          <motion.p variants={springPop} className="text-lg md:text-xl text-gray-400 font-sans font-medium mb-10 max-w-md">
            {business.slogan || 'Sınırları zorlayan bakım, eşsiz parlaklık. Yeni nesil güzellik merkezine hoş geldin.'}
          </motion.p>
          <motion.div variants={springPop}>
            <a href="#hizmetler" className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,0,127,0.3)] hover:shadow-[0_0_60px_rgba(112,0,255,0.5)]">
               Keşfet <Zap className="w-5 h-5 fill-current" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, rotate: 5, scale: 0.8 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} transition={{ type: "spring" as const, stiffness: 100, damping: 20 }} className="relative h-[600px] w-full hidden lg:block">
           <div className="absolute inset-0 rounded-[3rem] overflow-hidden border border-white/10">
             {business.photos?.[0] ? (
               <img src={business.photos[0]} alt="Glow" className="w-full h-full object-cover mix-blend-screen" />
             ) : (
               <img src="https://images.unsplash.com/photo-1596704017254-9b121068fb28?q=80" alt="Glow" className="w-full h-full object-cover mix-blend-screen" />
             )}
           </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 w-full overflow-hidden bg-[#FF007F] py-3 flex border-y border-white/20 -rotate-2 scale-110 z-20">
        <motion.div variants={marqueeVariants} animate="animate" className="whitespace-nowrap flex items-center">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-white font-black text-2xl uppercase tracking-widest mx-6">GLOW UP YOUR LIFE &bull;</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── 2. Menu (Neon Cards) ──
export function GuzellikGlowServices({ business }: SectionProps<any>) {
  return (
    <section id="hizmetler" className="py-32 bg-[#0F0F0F] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springPop} className="text-center mb-24">
          <h2 className="font-heading text-6xl md:text-8xl font-black uppercase tracking-tighter text-white/5">Hizmetler</h2>
          <div className="text-[#FF007F] font-bold tracking-widest uppercase mt-[-3rem] md:mt-[-4rem] text-2xl md:text-4xl">Fiyat Listesi</div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {business.services?.map((service: any, idx: number) => (
            <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springPop} className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-[#FF007F] transition-all duration-300 group cursor-pointer hover:-translate-y-2">
               <div className="flex justify-between items-start mb-6">
                 <h3 className="font-heading font-bold text-3xl text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF007F] group-hover:to-[#7000FF] transition-all">{service.name}</h3>
                 <div className="bg-white/10 text-white font-bold px-3 py-1 rounded-full text-sm">{service.price || '₺'}</div>
               </div>
               <p className="font-sans text-gray-400 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 3. Iletisim (Dark Mode Map/Contact) ──
export function GuzellikGlowContact({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-32 bg-[#0F0F0F] text-white overflow-hidden relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springPop}>
          <h2 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tight mb-12">Rezervasyon</h2>
          
          <div className="inline-flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FF007F] flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Adres</p>
                <p className="font-medium text-lg">{business.address || 'Moda, Kadıköy'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#7000FF] flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Sosyal</p>
                <p className="font-medium text-lg text-white hover:text-[#7000FF] transition-colors cursor-pointer">@{business.socialMedia?.instagram ? business.socialMedia.instagram.split('/').pop() : 'glowstudio'}</p>
              </div>
            </div>
          </div>
          <div className="mt-16 text-center">
             <p className="text-gray-500 font-medium mb-2">Ya da hemen ara:</p>
             <a href={`tel:${business.phone}`} className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF007F] to-[#7000FF] hover:opacity-80 transition-opacity">
               {business.phone || '+90 555 123 4567'}
             </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Fallbacks ──
export function GuzellikGlowAbout({ business }: SectionProps<any>) { return null; }
export function GuzellikGlowGallery({ business }: SectionProps<any>) { return null; }
export function GuzellikGlowTeam({ business }: SectionProps<any>) { return null; }
export function GuzellikGlowFaq({ business }: SectionProps<any>) { return null; }
export function GuzellikGlowBlogPreview({ business }: SectionProps<any>) { return null; }
export function GuzellikGlowTestimonials({ business }: SectionProps<any>) { return null; }

// ── Registration ──
import type { ComponentType } from 'react';
registerSection('hero', 'guzellik_glow_hero', GuzellikGlowHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('about', 'guzellik_glow_about', GuzellikGlowAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('services', 'guzellik_glow_services', GuzellikGlowServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('gallery', 'guzellik_glow_gallery', GuzellikGlowGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('contact', 'guzellik_glow_contact', GuzellikGlowContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('team', 'guzellik_glow_team', GuzellikGlowTeam as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('faq', 'guzellik_glow_faq', GuzellikGlowFaq as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('blog_preview', 'guzellik_glow_blog_preview', GuzellikGlowBlogPreview as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('testimonials', 'guzellik_glow_testimonials', GuzellikGlowTestimonials as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
