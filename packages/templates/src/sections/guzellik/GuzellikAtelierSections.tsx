'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, MapPin, Phone, Instagram, ArrowRight, ArrowUpRight } from 'lucide-react';
import { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

// ── Animations ──
const elegantReveal = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] as any } }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
};

// ── 1. Hero (Boutique & Handcrafted) ──
export function GuzellikAtelierHero({ business }: SectionProps<any>) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section ref={ref} className="relative h-[90vh] bg-[#FAF7F5] overflow-hidden flex items-center justify-center">
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0 opacity-80 mix-blend-multiply">
        {business.photos?.[0] ? (
          <img src={business.photos[0]} alt={business.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80')] bg-cover bg-center" />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F5]/50 via-transparent to-[#FAF7F5] z-10" />

      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={staggerChildren}>
          <motion.div variants={elegantReveal} className="mb-6 flex justify-center text-[#C9856A]">
            <Sparkles className="w-8 h-8 stroke-1" />
          </motion.div>
          <motion.h1 variants={elegantReveal} className="font-serif text-6xl md:text-8xl lg:text-[7rem] italic text-[#2D1B14] leading-[0.9] mb-8 font-light tracking-tight">
            {business.name}
          </motion.h1>
          <motion.p variants={elegantReveal} className="font-sans text-sm md:text-base tracking-[0.2em] uppercase text-[#6B4F3A] mb-12">
            {business.slogan || 'Premium Güzellik ve Bakım Atölyesi'}
          </motion.p>
          <motion.div variants={elegantReveal}>
            <a href="#hizmetler" className="inline-flex items-center gap-3 border-b border-[#C9856A] text-[#C9856A] pb-2 hover:text-[#2D1B14] hover:border-[#2D1B14] transition-colors duration-500 uppercase tracking-widest text-xs">
              Keşfet <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── 2. Hakkimizda (Brand Story) ──
export function GuzellikAtelierAbout({ business }: SectionProps<any>) {
  return (
    <section id="hakkimizda" className="py-32 bg-[#FAF7F5] text-[#2D1B14]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 md:gap-32 items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerChildren}>
          <motion.h2 variants={elegantReveal} className="font-serif text-4xl md:text-5xl mb-8 leading-tight italic">
            Biz Kimiz?
          </motion.h2>
          <motion.p variants={elegantReveal} className="font-sans text-[#6B4F3A] leading-relaxed mb-8 text-lg font-light">
            {(business.about as string) || 'Özenle seçilmiş ürünlerimiz ve kişiye özel bakım kürlerimizle, ruhunuzun ve cildinizin doğal ışıltısını ortaya çıkarıyoruz.'}
          </motion.p>
          <motion.div variants={elegantReveal} className="w-16 h-[1px] bg-[#C9856A]" />
        </motion.div>
        
        <div className="relative h-[500px] md:h-[700px] w-full group overflow-hidden rounded-t-full">
          <motion.div initial={{ scale: 1.2, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1.8, ease: "easeOut" as any }} viewport={{ once: true }} className="absolute inset-0 bg-[#F5EDEA]">
             {business.photos?.[1] ? (
               <img src={business.photos[1]} alt="About" className="w-full h-full object-cover opacity-80 mix-blend-darken filter sepia-[0.3]" />
             ) : (
               <img src="https://images.unsplash.com/photo-1552693673-1bf958298935?q=80" alt="About" className="w-full h-full object-cover opacity-80 mix-blend-darken filter sepia-[0.3]" />
             )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── 3. Menu (Boutique Services) ──
export function GuzellikAtelierServices({ business }: SectionProps<any>) {
  return (
    <section id="hizmetler" className="py-32 bg-[#F5EDEA] text-[#2D1B14]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={elegantReveal} className="text-center mb-24">
          <h2 className="font-serif text-5xl md:text-6xl mb-6 italic">Hizmetlerimiz</h2>
          <p className="font-sans text-[#6B4F3A] tracking-[0.15em] uppercase text-xs">Ayrıcalıklı Bakım Seçenekleri</p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerChildren} className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {business.services?.slice(0, 8).map((service: any, idx: number) => (
            <motion.div key={idx} variants={elegantReveal} className="group flex flex-col border-b border-[#E8D5CC] pb-6 hover:border-[#C9856A] transition-colors duration-500">
              <div className="flex justify-between items-end mb-3">
                <h3 className="font-serif text-2xl text-[#2D1B14] group-hover:text-[#C9856A] transition-colors">{service.name}</h3>
                <span className="font-sans text-[#6B4F3A] text-xl font-light">{service.price || '₺'}</span>
              </div>
              <p className="font-sans text-[#A08878] font-light text-sm">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── 4. Iletisim (Contact) ──
export function GuzellikAtelierContact({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-32 bg-[#2D1B14] text-[#FAF7F5] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,_#6B4F3A_0%,_transparent_70%)] opacity-30 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerChildren}>
          <motion.h2 variants={elegantReveal} className="font-serif text-5xl mb-12 italic">Ziyaret Edin</motion.h2>
          <motion.div variants={elegantReveal} className="space-y-8 font-sans font-light text-[#E8D5CC]">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 mt-1 text-[#C9856A] shrink-0" />
              <p className="leading-relaxed">{business.address || 'Nişantaşı, İstanbul'}</p>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 mt-1 text-[#C9856A] shrink-0" />
              <p className="text-xl">{business.phone || '+90 212 555 77 88'}</p>
            </div>
            {business.socialMedia?.instagram && (
              <div className="flex items-center gap-4 mt-8">
                 <a href={business.socialMedia.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#C9856A] hover:text-[#FAF7F5] transition-colors uppercase tracking-widest text-xs">
                   <Instagram className="w-4 h-4" /> Instagram <ArrowUpRight className="w-3 h-3" />
                 </a>
              </div>
            )}
          </motion.div>
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={elegantReveal} className="bg-[#FAF7F5] p-12 text-[#2D1B14] rounded-t-full rounded-bl-full md:mt-24">
          <h3 className="font-serif text-3xl mb-6 italic text-center">Çalışma Saatleri</h3>
          <ul className="space-y-4 font-sans text-sm font-light text-[#6B4F3A]">
            {business.workingHours?.filter((h: any) => h.open).slice(0, 3).map((h: any, i: number) => (
              <li key={i} className="flex justify-between border-b border-[#E8D5CC] pb-2">
                <span>{h.dayTr}</span>
                <span>{h.open} - {h.close}</span>
              </li>
            ))}
            <li className="flex justify-between border-b border-[#E8D5CC] pb-2">
                <span>Pazar</span>
                <span>Kapalı</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

// ── Fallbacks ──
export function GuzellikAtelierGallery({ business }: SectionProps<any>) { return null; }
export function GuzellikAtelierTeam({ business }: SectionProps<any>) { return null; }
export function GuzellikAtelierFaq({ business }: SectionProps<any>) { return null; }
export function GuzellikAtelierBlogPreview({ business }: SectionProps<any>) { return null; }
export function GuzellikAtelierTestimonials({ business }: SectionProps<any>) { return null; }

// ── Registration ──
import type { ComponentType } from 'react';
registerSection('hero', 'guzellik_atelier_hero', GuzellikAtelierHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('about', 'guzellik_atelier_about', GuzellikAtelierAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('services', 'guzellik_atelier_services', GuzellikAtelierServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('gallery', 'guzellik_atelier_gallery', GuzellikAtelierGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('contact', 'guzellik_atelier_contact', GuzellikAtelierContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('team', 'guzellik_atelier_team', GuzellikAtelierTeam as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('faq', 'guzellik_atelier_faq', GuzellikAtelierFaq as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('blog_preview', 'guzellik_atelier_blog_preview', GuzellikAtelierBlogPreview as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('testimonials', 'guzellik_atelier_testimonials', GuzellikAtelierTestimonials as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
