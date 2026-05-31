'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Coffee, Leaf, MapPin, Instagram } from 'lucide-react';
import { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

// ── Animations ──
const smoothUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] as any } }
};

// ── 1. Hero (Warm Parallax Cafe) ──
export function RestoranKafeHero({ business }: SectionProps<any>) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen bg-[#EBE5DB] overflow-hidden flex items-center justify-center">
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
        {business.photos?.[0] ? (
          <img src={business.photos[0]} alt="Cafe" className="w-full h-full object-cover opacity-80" />
        ) : (
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80')] bg-cover bg-center opacity-80" />
        )}
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      <motion.div style={{ y: yText, opacity }} className="relative z-20 text-center px-4 mix-blend-color-burn">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }} className="max-w-4xl mx-auto flex flex-col items-center">
          <motion.div variants={smoothUp} className="w-16 h-16 bg-[#3B2C24] rounded-full flex items-center justify-center mb-8">
            <Coffee className="w-8 h-8 text-[#EBE5DB]" />
          </motion.div>
          <motion.h1 variants={smoothUp} className="font-serif text-6xl md:text-9xl text-[#3B2C24] tracking-tight leading-none mb-6">
            {business.name}
          </motion.h1>
          <motion.p variants={smoothUp} className="font-sans text-xl md:text-2xl text-[#3B2C24]/80 font-medium tracking-wide max-w-2xl">
            {business.slogan || 'Artisan Coffee & Warm Gatherings'}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── 2. Menu (Organik Kartlar) ──
export function RestoranKafeHizmetler({ business }: SectionProps<any>) {
  return (
    <section id="menu" className="py-32 bg-[#F7F5F0] text-[#3B2C24]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={smoothUp} className="text-center mb-20">
          <h2 className="font-serif text-5xl md:text-7xl mb-4">Our Offerings</h2>
          <Leaf className="w-8 h-8 mx-auto text-[#8F8171]" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {business.services?.slice(0, 6).map((service: any, idx: number) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.8 }} className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden rounded-[2rem] rounded-tr-none mb-6 bg-[#EBE5DB]">
                <img src={`https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=400&h=500&sig=${idx}`} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
              </div>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="font-serif text-2xl">{service.name}</h3>
                <span className="font-sans font-bold text-[#8F8171]">{service.price || '₺'}</span>
              </div>
              <p className="font-sans text-[#3B2C24]/60 leading-relaxed text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 3. Iletisim ──
export function RestoranKafeIletisim({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-24 bg-[#3B2C24] text-[#F7F5F0]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={smoothUp} className="font-serif text-5xl md:text-6xl mb-16">
          Visit Us
        </motion.h2>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 font-sans text-lg">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={smoothUp} className="flex flex-col items-center">
            <MapPin className="w-6 h-6 mb-4 text-[#8F8171]" />
            <p className="max-w-[200px] leading-relaxed">{business.address || 'Kahve Sok. No:1, Moda / Istanbul'}</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={smoothUp} className="flex flex-col items-center">
            <Instagram className="w-6 h-6 mb-4 text-[#8F8171]" />
            <p>@{(business.name || 'kafe').replace(/\s+/g, '').toLowerCase()}</p>
            <p className="mt-2 text-[#8F8171]">{business.phone || '+90 216 000 00 00'}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Fallbacks ──
export function RestoranKafeAbout({ business }: SectionProps<any>) { return null; }
export function RestoranKafeGallery({ business }: SectionProps<any>) { return null; }
export function RestoranKafeTeam({ business }: SectionProps<any>) { return null; }
export function RestoranKafeFaq({ business }: SectionProps<any>) { return null; }
export function RestoranKafeBlogPreview({ business }: SectionProps<any>) { return null; }
export function RestoranKafeTestimonials({ business }: SectionProps<any>) { return null; }

// ── Registration ──
import type { ComponentType } from 'react';
registerSection('hero', 'restoran_kafe_hero', RestoranKafeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('about', 'restoran_kafe_about', RestoranKafeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('services', 'restoran_kafe_services', RestoranKafeHizmetler as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('gallery', 'restoran_kafe_gallery', RestoranKafeGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('contact', 'restoran_kafe_contact', RestoranKafeIletisim as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('team', 'restoran_kafe_team', RestoranKafeTeam as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('faq', 'restoran_kafe_faq', RestoranKafeFaq as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('blog_preview', 'restoran_kafe_blog_preview', RestoranKafeBlogPreview as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('testimonials', 'restoran_kafe_testimonials', RestoranKafeTestimonials as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
