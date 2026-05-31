'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, ClipboardList, PhoneCall } from 'lucide-react';
import { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

// ── Animations ──
const slideRight = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as any } }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// ── 1. Hero (Clinical & Trustworthy) ──
export function GuzellikDermisHero({ business }: SectionProps<any>) {
  return (
    <section className="relative min-h-[90vh] bg-[#F0F4F8] flex items-center pt-24 pb-12 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#102A43] skew-x-[-15deg] origin-top translate-x-32 hidden lg:block" />
      
      <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
        <motion.div initial="hidden" animate="visible" variants={staggerChildren}>
          <motion.div variants={slideRight} className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded shadow-sm border border-gray-100 font-sans font-bold text-xs text-[#334E68] uppercase tracking-widest mb-6">
            <Activity className="w-4 h-4 text-[#2CB1BC]" /> {business.city || 'Klinik Sertifikalı'}
          </motion.div>
          <motion.h1 variants={slideRight} className="font-sans text-5xl md:text-7xl font-bold text-[#102A43] leading-tight mb-6">
            İleri Düzey <br/><span className="text-[#2CB1BC]">Dermatolojik</span><br/>Bakım.
          </motion.h1>
          <motion.p variants={slideRight} className="font-sans text-lg text-[#334E68] max-w-lg mb-10 leading-relaxed">
            {business.slogan || 'Bilimsel yaklaşımlar ve FDA onaylı cihazlarla cildinize profesyonel bir dokunuş.'}
          </motion.p>
          <motion.div variants={slideRight} className="flex items-center gap-6">
            <a href="#iletisim" className="bg-[#102A43] text-white font-semibold px-8 py-4 shadow-lg hover:bg-[#2CB1BC] transition-colors duration-300">
              Ücretsiz Konsültasyon
            </a>
          </motion.div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }} className="relative z-10 hidden lg:block">
          <div className="aspect-square bg-white p-4 shadow-2xl relative">
            <div className="absolute -top-6 -left-6 bg-[#2CB1BC] w-24 h-24 z-0" />
            <div className="absolute -bottom-6 -right-6 bg-[#102A43] w-32 h-32 z-0" />
            {business.photos?.[0] ? (
              <img src={business.photos[0]} alt="Clinical" className="w-full h-full object-cover relative z-10" />
            ) : (
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80')] bg-cover bg-center relative z-10 filter grayscale opacity-90" />
            )}
            
            {business.rating && (
              <div className="absolute top-10 -right-12 bg-white p-4 shadow-xl z-20 flex items-center gap-4">
                <ShieldCheck className="w-8 h-8 text-[#2CB1BC]" />
                <div>
                  <div className="font-bold text-[#102A43]">{business.rating}/5 Güven Skoru</div>
                  <div className="text-xs text-[#627D98]">Bağımsız hasta değerlendirmeleri</div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── 2. Hakkimizda (Medical Data) ──
export function GuzellikDermisAbout({ business }: SectionProps<any>) {
  return (
    <section id="hakkimizda" className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-2 gap-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerChildren}>
           <h2 className="font-sans text-4xl font-bold text-[#102A43] mb-8">Uzman Kadro &<br/>Klinik Hijyen</h2>
           <p className="font-sans text-lg text-[#334E68] leading-relaxed mb-12">
             {(business.about as string) || 'Modern tıbbın ve estetiğin kesiştiği noktada, cilt sağlığınızı garanti altına alan protokoller uyguluyoruz. Her uygulama öncesi detaylı cilt analizi yapılır.'}
           </p>
           <div className="grid grid-cols-2 gap-8">
             <div className="border-l-4 border-[#2CB1BC] pl-4">
               <div className="text-3xl font-black text-[#102A43] mb-1">{business.experience || '10+'}</div>
               <div className="text-sm font-semibold text-[#627D98] uppercase">Yıllık Tecrübe</div>
             </div>
             <div className="border-l-4 border-[#102A43] pl-4">
               <div className="text-3xl font-black text-[#102A43] mb-1">{business.reviewCount || '500+'}</div>
               <div className="text-sm font-semibold text-[#627D98] uppercase">Kayıtlı Hasta</div>
             </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── 3. Menu (Structured Treatment Protocols) ──
export function GuzellikDermisServices({ business }: SectionProps<any>) {
  return (
    <section id="hizmetler" className="py-24 bg-[#F0F4F8]">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideRight} className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <ClipboardList className="w-8 h-8 text-[#2CB1BC]" />
            <h2 className="font-sans text-4xl font-bold text-[#102A43]">Tedavi Protokolleri</h2>
          </div>
          <p className="text-[#627D98] font-medium">Uzman dermatolog kontrolünde gerçekleştirilen servisler.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {business.services?.slice(0, 6).map((service: any, idx: number) => (
            <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideRight} className="bg-white p-8 border-t-4 border-[#102A43] shadow-sm hover:shadow-lg hover:border-[#2CB1BC] transition-all duration-300">
               <div className="flex justify-between items-start mb-6">
                 <h3 className="font-sans font-bold text-xl text-[#102A43] w-2/3">{service.name}</h3>
                 <span className="bg-[#E5F9FB] text-[#2CB1BC] font-bold px-3 py-1 text-sm rounded">{service.price || 'Fiyat Alın'}</span>
               </div>
               <p className="font-sans text-[#486581] text-sm leading-relaxed mb-6 h-16 line-clamp-3">{service.description}</p>
               <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                 <span className="text-xs font-bold text-[#829AB1] uppercase">Süre: {service.duration || 'Belirlenmedi'}</span>
                 <button className="text-[#102A43] text-sm font-bold hover:text-[#2CB1BC] transition-colors">Detaylar &gt;</button>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 4. Iletisim (Emergency / Direct Line) ──
export function GuzellikDermisContact({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-24 bg-[#102A43] text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerChildren}>
          <motion.h2 variants={slideRight} className="text-4xl md:text-5xl font-bold mb-6">Konsültasyon Talebi</motion.h2>
          <motion.p variants={slideRight} className="text-[#829AB1] mb-10 text-lg">Durumunuzu değerlendirmek ve size en uygun tedavi protokolünü çizmek için asistanımızla görüşün.</motion.p>
          
          <motion.div variants={slideRight} className="bg-[#243B53] p-8 rounded border border-[#334E68] flex items-center gap-6 mb-8">
            <div className="bg-[#2CB1BC] w-16 h-16 rounded flex items-center justify-center shrink-0">
              <PhoneCall className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-[#BCCCDC] text-sm uppercase font-bold mb-1">Müşteri Hattı</p>
              <p className="text-3xl font-black text-white">{business.phone || '0850 000 00 00'}</p>
            </div>
          </motion.div>
          <motion.p variants={slideRight} className="text-[#627D98] text-sm">
            {business.address || 'Klinik Merkez, Levent, İstanbul'}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// ── Fallbacks ──
export function GuzellikDermisGallery({ business }: SectionProps<any>) { return null; }
export function GuzellikDermisTeam({ business }: SectionProps<any>) { return null; }
export function GuzellikDermisFaq({ business }: SectionProps<any>) { return null; }
export function GuzellikDermisBlogPreview({ business }: SectionProps<any>) { return null; }
export function GuzellikDermisTestimonials({ business }: SectionProps<any>) { return null; }

// ── Registration ──
import type { ComponentType } from 'react';
registerSection('hero', 'guzellik_dermis_hero', GuzellikDermisHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('about', 'guzellik_dermis_about', GuzellikDermisAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('services', 'guzellik_dermis_services', GuzellikDermisServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('gallery', 'guzellik_dermis_gallery', GuzellikDermisGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('contact', 'guzellik_dermis_contact', GuzellikDermisContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('team', 'guzellik_dermis_team', GuzellikDermisTeam as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('faq', 'guzellik_dermis_faq', GuzellikDermisFaq as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('blog_preview', 'guzellik_dermis_blog_preview', GuzellikDermisBlogPreview as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('testimonials', 'guzellik_dermis_testimonials', GuzellikDermisTestimonials as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
