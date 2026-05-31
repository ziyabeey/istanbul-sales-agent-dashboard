'use client';

import React from 'react';
import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import type { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ── Hero ──
export function OtoyikamaEkspresHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[80vh] flex items-center pt-24 pb-20 overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)] via-[var(--color-bg)] to-transparent z-10 md:w-1/2" />
      <div className="absolute top-0 right-0 w-full md:w-3/4 h-full">
         <img src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80" alt={(business as any)?.name as string} className="w-full h-full object-cover opacity-80" />
         <div className="absolute inset-0 z-0 opacity-10" style={{ background: 'var(--color-accent)' }} />
      </div>
      
      <div className="max-w-[1200px] w-full mx-auto px-6 relative z-20">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl bg-white/90 backdrop-blur-md p-10 md:p-14 rounded-[2rem] shadow-2xl" style={{ borderLeft: '8px solid var(--color-accent)' }}>
           <motion.div variants={fadeUp} className="inline-flex items-center gap-2 font-bold mb-4" style={{ color: 'var(--color-accent)' }}>
              <Zap className="w-5 h-5" /> {content?.badge || 'HIZLI YIKAMA'}
           </motion.div>
           <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
             {content?.title || 'Zamanınız Size Kalsın'}
           </motion.h1>
           <motion.p variants={fadeUp} className="text-lg font-medium opacity-80 mb-8" style={{ color: 'var(--color-text)' }}>
             {content?.subtitle || `${(business as any)?.name as string} ile 15 dakikada mükemmel temizlik. Fırçasız, süngersiz ve çiziksiz hızlı yıkama hizmeti.`}
           </motion.p>
           <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
             <a href="#iletisim" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-transform hover:-translate-y-1 shadow-lg" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
               {content?.startText || 'Hemen Gel'} <ArrowRight className="w-5 h-5" />
             </a>
             <a href={`tel:${(business as any)?.phoneClean as string}`} className="px-8 py-4 font-bold transition-opacity hover:opacity-70" style={{ color: 'var(--color-text)' }}>
               {(business as any)?.phone as string}
             </a>
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Services ──
export function OtoyikamaEkspresServices({ business, content }: SectionProps<any>) {
  const defaultServices = [
    { name: 'İç & Dış Hızlı Yıkama', price: '₺150', time: '15 Dk', desc: 'Fırçasız dış yıkama ve genel iç vakumlama.' },
    { name: 'Sadece Dış Yıkama', price: '₺100', time: '10 Dk', desc: 'Araba şampuanı ile fırçasız, süngersiz dış yıkama.' },
    { name: 'VIP Ekspres', price: '₺250', time: '25 Dk', desc: 'Hızlı ıslak cila, jant temizliği ve iç parfümeri.' }
  ];
  return (
    <section id="hizmetler" className="py-24 relative" style={{ background: 'var(--color-surface)' }}>
       <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
             <h2 className="text-3xl md:text-5xl font-black mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Hızlı Paketler</h2>
             <p className="font-medium opacity-80 text-lg" style={{ color: 'var(--color-text)' }}>Sıra beklemeden, profesyonel temizlik.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
             {defaultServices.map((svc, i) => (
               <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 rounded-3xl border-2 transition-transform hover:-translate-y-2 relative" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)' }}>
                  <div className="absolute top-0 right-8 -translate-y-1/2 px-4 py-1 text-sm font-bold rounded-full shadow-lg" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
                    {svc.time}
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{svc.name}</h3>
                  <p className="font-medium opacity-70 mb-8" style={{ color: 'var(--color-text)' }}>{svc.desc}</p>
                  <div className="text-3xl font-black" style={{ color: 'var(--color-text)' }}>{svc.price}</div>
               </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
}

// ── About ──
export function OtoyikamaEkspresAbout({ business }: SectionProps<any>) {
  return (
    <section id="hakkimizda" className="py-24" style={{ background: 'var(--color-bg)' }}>
       <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
             <h3 className="text-3xl md:text-4xl font-black mb-6 leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                Neden {business?.name || 'Ekspres Yıkama'}?
             </h3>
             <p className="text-lg opacity-80 mb-6 font-medium" style={{ color: 'var(--color-text)' }}>
                Son teknoloji makinalarımız ve fırçasız yıkama sistemimizle aracınızın boyasına zarar vermeden mükemmel parlaklık sağlıyoruz.
             </p>
             <ul className="space-y-4 font-bold" style={{ color: 'var(--color-text)' }}>
               {['Fırçasız & Çiziksiz Yıkama', 'PH Nötr Şampuanlar', 'Güçlü Vakum Teknolojisi', 'Bekleme Süresi Yok'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                     <CheckCircle2 className="w-6 h-6" style={{ color: 'var(--color-accent)' }} /> {item}
                  </li>
               ))}
             </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
             <img src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80" alt="Yıkama Tüneli" className="rounded-3xl shadow-2xl" />
          </motion.div>
       </div>
    </section>
  );
}

// ── Contact ──
export function OtoyikamaEkspresContact({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-24" style={{ background: 'var(--color-surface)' }}>
       <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Adres & İletişim</h2>
          <div className="p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 mb-8" style={{ background: 'var(--color-bg)' }}>
             <div className="flex items-center gap-4 text-left">
                <div className="p-4 rounded-xl" style={{ background: 'var(--color-surface)' }}>
                   <Phone className="w-8 h-8" style={{ color: 'var(--color-accent)' }} />
                </div>
                <div>
                   <div className="text-sm font-bold opacity-50 uppercase tracking-widest" style={{ color: 'var(--color-text)' }}>Telefon</div>
                   <div className="text-2xl font-black" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{(business as any)?.phone as string}</div>
                </div>
             </div>
             <a href={`tel:${(business as any)?.phoneClean as string}`} className="px-8 py-4 rounded-xl font-bold w-full md:w-auto shadow-lg" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
                Şimdi Ara
             </a>
          </div>
          <div className="inline-flex items-center justify-center gap-3 font-bold opacity-80" style={{ color: 'var(--color-text)' }}>
             <MapPin className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
             {(business as any)?.address as string}
          </div>
       </div>
    </section>
  );
}

registerSection('hero', 'asymmetric_split', OtoyikamaEkspresHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('services', 'ekspres_grid', OtoyikamaEkspresServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('about', 'ekspres_about', OtoyikamaEkspresAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('contact', 'ekspres_contact', OtoyikamaEkspresContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
