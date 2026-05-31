'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Droplets, Smile, Phone, MapPin } from 'lucide-react';
import { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

// ── Animations ──
const softFadeUp: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeInOut" as const } }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
};

// ── 1. Hero (Soft & Delicate Pastel) ──
export function GuzellikNarinHero({ business }: SectionProps<any>) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const mdParallax = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section ref={ref} className="relative min-h-[100svh] bg-[#FDF9F9] overflow-hidden flex items-center pt-24 pb-12">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FFE4E1]/30 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#E6E6FA]/30 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

      <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
        <motion.div initial="hidden" animate="visible" variants={staggerChildren} className="pr-12">
          <motion.div variants={softFadeUp} className="w-16 h-1 bg-[#FFB6C1] rounded-full mb-8" />
          <motion.h1 variants={softFadeUp} className="font-serif text-5xl md:text-7xl text-[#4A4A4A] leading-tight mb-8">
            Kendini <br/><span className="text-[#FFB6C1] italic">Şımartmanın</span> <br/>En Doğal Yolu.
          </motion.h1>
          <motion.p variants={softFadeUp} className="font-sans text-[#7A7A7A] text-xl leading-relaxed mb-10 font-light">
            {business.slogan || 'Ruhunuzun ve cildinizin dengesini bulacağı o huzur dolu anlara davetlisiniz.'}
          </motion.p>
          <motion.div variants={softFadeUp}>
            <a href="#iletisim" className="bg-[#4A4A4A] text-white px-8 py-4 rounded-full font-medium tracking-wide shadow-xl shadow-[#4A4A4A]/20 hover:scale-105 transition-transform duration-500">
               Randevu Oluştur
            </a>
          </motion.div>
        </motion.div>
        
        <motion.div style={{ y: mdParallax }} className="relative h-[600px] md:h-[800px] hidden md:flex items-center justify-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2, ease: "easeOut" as any }} className="w-full h-4/5 rounded-t-full rounded-b-[4rem] overflow-hidden bg-[#FFE4E1] shadow-2xl relative">
              {business.photos?.[0] ? (
                <img src={business.photos[0]} alt="Delicate" className="w-full h-full object-cover opacity-90" />
              ) : (
                <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80" alt="Delicate" className="w-full h-full object-cover opacity-90" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#FDF9F9]/80 via-transparent to-transparent" />
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── 2. Menu (Soft Bubble Cards) ──
export function GuzellikNarinServices({ business }: SectionProps<any>) {
  return (
    <section id="hizmetler" className="py-32 bg-[#FDF9F9] relative z-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={softFadeUp} className="text-center mb-20">
          <Heart className="w-8 h-8 text-[#FFB6C1] mx-auto mb-6 fill-[#FFB6C1]/20" />
          <h2 className="font-serif text-4xl md:text-5xl text-[#4A4A4A] mb-4">Size Özel Uygulamalar</h2>
          <p className="font-sans text-[#7A7A7A] italic text-lg">{business.name} Dokunuşu</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {business.services?.slice(0, 6).map((service: any, idx: number) => (
            <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={softFadeUp} className="bg-white rounded-[3rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(255,182,193,0.15)] transition-shadow duration-500 flex flex-col items-center text-center">
               <div className="w-16 h-16 rounded-full bg-[#FFF0F2] flex items-center justify-center mb-6 text-[#FFB6C1]">
                 {idx % 2 === 0 ? <Droplets className="w-8 h-8" /> : <Smile className="w-8 h-8" />}
               </div>
               <h3 className="font-serif text-2xl text-[#4A4A4A] mb-2">{service.name}</h3>
               <span className="font-sans font-medium text-[#FFB6C1] mb-6 block">{service.price || 'Bilgi Alın'}</span>
               <p className="font-sans text-[#7A7A7A] font-light leading-relaxed text-sm mb-6">{service.description}</p>
               <button className="mt-auto px-6 py-2 border border-[#FFB6C1] text-[#FFB6C1] rounded-full text-sm font-medium hover:bg-[#FFB6C1] hover:text-white transition-colors duration-300">İncele</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 3. Iletisim (Gentle Map & Contact) ──
export function GuzellikNarinContact({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-32 bg-white relative">
       <div className="max-w-[1400px] mx-auto px-6">
         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerChildren} className="bg-[#FFF0F2] rounded-[4rem] p-12 md:p-24 text-center">
            <motion.h2 variants={softFadeUp} className="font-serif text-5xl text-[#4A4A4A] mb-8">Bizimle İletişime Geçin</motion.h2>
            <motion.p variants={softFadeUp} className="font-sans text-[#7A7A7A] text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              {(business.about as string) || 'Huzur dolu merkezimize uğrayın, ücretsiz cilt analizimizden faydalanmak için hemen arayın.'}
            </motion.p>
            
            <motion.div variants={softFadeUp} className="flex flex-col md:flex-row items-center justify-center gap-6">
               <div className="flex flex-col items-center bg-white rounded-3xl p-8 w-full max-w-xs shadow-sm">
                 <Phone className="w-8 h-8 text-[#FFB6C1] mb-4" />
                 <span className="font-sans text-xl text-[#4A4A4A]">{business.phone || '0555 000 00 00'}</span>
               </div>
               <div className="flex flex-col items-center bg-white rounded-3xl p-8 w-full max-w-xs shadow-sm">
                 <MapPin className="w-8 h-8 text-[#FFB6C1] mb-4" />
                 <span className="font-sans font-light text-[#7A7A7A] text-sm text-center leading-relaxed">{business.address || 'Gül Sokağı, No:12'}</span>
               </div>
            </motion.div>
         </motion.div>
       </div>
    </section>
  );
}

// ── Fallbacks ──
export function GuzellikNarinAbout({ business }: SectionProps<any>) { return null; }
export function GuzellikNarinGallery({ business }: SectionProps<any>) { return null; }
export function GuzellikNarinTeam({ business }: SectionProps<any>) { return null; }
export function GuzellikNarinFaq({ business }: SectionProps<any>) { return null; }
export function GuzellikNarinBlogPreview({ business }: SectionProps<any>) { return null; }
export function GuzellikNarinTestimonials({ business }: SectionProps<any>) { return null; }

// ── Registration ──
import type { ComponentType } from 'react';
import { staggerChild, staggerContainer } from '../../lib/animation-presets'
const stagger = staggerContainer
registerSection('hero', 'guzellik_narin_hero', GuzellikNarinHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('about', 'guzellik_narin_about', GuzellikNarinAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('services', 'guzellik_narin_services', GuzellikNarinServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('gallery', 'guzellik_narin_gallery', GuzellikNarinGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('contact', 'guzellik_narin_contact', GuzellikNarinContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('team', 'guzellik_narin_team', GuzellikNarinTeam as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('faq', 'guzellik_narin_faq', GuzellikNarinFaq as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('blog_preview', 'guzellik_narin_blog_preview', GuzellikNarinBlogPreview as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('testimonials', 'guzellik_narin_testimonials', GuzellikNarinTestimonials as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
