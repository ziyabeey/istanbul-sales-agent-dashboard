'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Flame, Clock, MapPin, Phone, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

// ── Animations ──
const springUp: any = {
  hidden: { opacity: 0, y: 100, scale: 0.9, rotate: -5 },
  visible: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { type: "spring" as const, stiffness: 100, damping: 12 } }
};

const marqueeText: any = {
  animate: { x: [0, -1000], transition: { x: { repeat: Infinity, repeatType: "loop" as const, duration: 15, ease: "linear" as const } } }
};

// ── 1. Hero (High Energy Fast Food) ──
export function RestoranHizliHero({ business }: SectionProps<any>) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={ref} className="relative min-h-[90vh] bg-[#FF2A00] overflow-hidden flex items-center justify-center">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#ffffff_2px,_transparent_2px)] bg-[length:40px_40px]" />
      
      {/* Marquee Background Text */}
      <div className="absolute top-1/4 left-0 w-[200vw] overflow-hidden pointer-events-none opacity-20">
        <motion.div variants={marqueeText} animate="animate" className="whitespace-nowrap font-black italic text-[15rem] leading-none text-white tracking-tighter">
          FAST. FRESH. FIRE. FAST. FRESH. FIRE.
        </motion.div>
      </div>

      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }}>
          <motion.div variants={springUp} className="inline-flex items-center gap-2 bg-black text-white px-6 py-2 rounded-full font-black italic tracking-wider mb-8 shadow-xl">
            <Flame className="w-5 h-5 text-[#FFB800]" /> %100 GERÇEK ATEŞ
          </motion.div>
          
          <motion.h1 variants={springUp} className="font-heading text-6xl md:text-[8rem] font-black italic uppercase leading-[0.85] text-white tracking-tighter mb-8 drop-shadow-2xl">
            {business.name}
          </motion.h1>
          
          <motion.div variants={springUp} className="relative">
            {business.photos?.[0] ? (
              <motion.img style={{ scale }} src={business.photos[0]} alt="Burger" className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] object-cover rounded-full border-8 border-white shadow-2xl mx-auto mb-10" />
            ) : (
              <motion.div style={{ scale }} className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border-8 border-white shadow-2xl mx-auto mb-10 bg-[url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80')] bg-cover bg-center" />
            )}
            <div className="absolute -bottom-6 -right-6 md:bottom-10 md:-right-10 bg-[#FFB800] text-black w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center font-black italic text-2xl md:text-3xl border-8 border-white shadow-xl rotate-12">
              SİPARİŞ<br/>VER!
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── 2. Hizmetler (Dynamic Menu Display) ──
export function RestoranHizliHizmetler({ business }: SectionProps<any>) {
  return (
    <section id="menu" className="py-24 bg-[#111111] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16 border-b-4 border-[#FF2A00] pb-6">
          <h2 className="font-black italic text-5xl md:text-7xl tracking-tighter uppercase">POPÜLER MENÜ</h2>
          <Flame className="w-16 h-16 text-[#FF2A00]" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {business.services?.slice(0, 6).map((service: any, idx: number) => (
            <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springUp} className="group bg-white rounded-3xl p-8 hover:-translate-y-4 hover:rotate-2 transition-all duration-300 shadow-[8px_8px_0px_#FF2A00]">
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-black italic text-3xl tracking-tight text-black uppercase leading-none">{service.name}</h3>
                <span className="bg-black text-white font-black px-4 py-2 rounded-full text-xl">{service.price || '₺'}</span>
              </div>
              <p className="font-bold text-black/60 text-lg mb-8 leading-snug">{service.description}</p>
              <button className="w-full bg-[#FF2A00] text-white font-black italic uppercase py-4 rounded-xl flex items-center justify-center gap-2 group-hover:bg-black transition-colors duration-300">
                Sepete Ekle <ArrowUpRight className="w-6 h-6" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 3. Iletisim (Bold Contact) ──
export function RestoranHizliIletisim({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-24 bg-[#FFB800] text-black">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springUp} className="font-black italic text-7xl md:text-[10rem] tracking-tighter uppercase leading-[0.8] mb-12">
          HIZLI.<br/>SICAK.<br/>KAPI-NDA.
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto font-black italic text-2xl md:text-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springUp} className="bg-white p-8 rounded-3xl shadow-[8px_8px_0px_#111] flex flex-col items-center justify-center gap-4">
            <Phone className="w-12 h-12 text-[#FF2A00]" />
            <p>{business.phone || '444 0 000'}</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={springUp} className="bg-white p-8 rounded-3xl shadow-[8px_8px_0px_#111] flex flex-col items-center justify-center gap-4">
            <Clock className="w-12 h-12 text-[#FF2A00]" />
            <p>09:00 - 02:00</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Fallbacks ──
export function RestoranHizliAbout({ business }: SectionProps<any>) { return null; }
export function RestoranHizliGallery({ business }: SectionProps<any>) { return null; }
export function RestoranHizliTeam({ business }: SectionProps<any>) { return null; }
export function RestoranHizliFaq({ business }: SectionProps<any>) { return null; }
export function RestoranHizliBlogPreview({ business }: SectionProps<any>) { return null; }
export function RestoranHizliTestimonials({ business }: SectionProps<any>) { return null; }

// ── Registration ──
import type { ComponentType } from 'react';
registerSection('hero', 'restoran_hizli_hero', RestoranHizliHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('about', 'restoran_hizli_about', RestoranHizliAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('services', 'restoran_hizli_services', RestoranHizliHizmetler as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('gallery', 'restoran_hizli_gallery', RestoranHizliGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('contact', 'restoran_hizli_contact', RestoranHizliIletisim as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('team', 'restoran_hizli_team', RestoranHizliTeam as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('faq', 'restoran_hizli_faq', RestoranHizliFaq as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('blog_preview', 'restoran_hizli_blog_preview', RestoranHizliBlogPreview as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('testimonials', 'restoran_hizli_testimonials', RestoranHizliTestimonials as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
