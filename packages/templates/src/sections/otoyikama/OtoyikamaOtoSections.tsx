'use client';

import React from 'react';
import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { Droplet, ArrowRight, Shield, Clock } from 'lucide-react';
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
export function OtoyikamaOtoHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-24 pb-20 overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-bg)] via-white/50 to-transparent z-10 md:w-1/2" />
      <div className="absolute top-0 right-0 w-full md:w-[55%] h-full">
         <img src="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80" alt={(business as any)?.name as string} className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-black/10 z-0" />
      </div>
      
      <div className="max-w-[1200px] w-full mx-auto px-6 relative z-20">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-xl">
           <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 font-bold text-sm tracking-widest rounded mb-6" style={{ background: 'var(--color-surface)', color: 'var(--color-accent)' }}>
              <Droplet className="w-4 h-4" /> {content?.badge || 'STANDART YIKAMA'}
           </motion.div>
           <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight shadow-sm" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
             {content?.title || 'Temiz Araç, Temiz Yol'}
           </motion.h1>
           <motion.p variants={fadeUp} className="text-lg font-medium opacity-80 mb-8" style={{ color: 'var(--color-text)' }}>
             {content?.subtitle || `${(business as any)?.name as string} ile aracınızın içini ve dışını bütçe dostu paketlerle pırıl pırıl yapıyoruz.`}
           </motion.p>
           <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
             <a href="#iletisim" className="inline-flex items-center gap-2 px-8 py-4 rounded font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
               Hemen Konum Al <ArrowRight className="w-5 h-5" />
             </a>
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── About / Features ──
export function OtoyikamaOtoAbout({ business }: SectionProps<any>) {
  const feats = [
    { icon: <Droplet className="w-6 h-6"/>, title: 'Sonax Şampuan', desc: 'Boya dostu kaliteli şampuan kullanımı.' },
    { icon: <Shield className="w-6 h-6"/>, title: 'Güvenilir Hizmet', desc: 'Aracınız emin ellerde, güvenle bırakın.' },
    { icon: <Clock className="w-6 h-6"/>, title: 'Ekonomik Fiyat', desc: 'Bütçe dostu yıkama paketlerimiz.' }
  ];

  return (
    <section id="hakkimizda" className="py-20" style={{ background: 'var(--color-surface)' }}>
       <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
             <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Mahallenizin Yıkamacısı</h2>
             <p className="opacity-70 text-lg font-medium" style={{ color: 'var(--color-text)' }}>Hızlı, kolay ve uygun fiyatlı temizlik için doğru adresiniz.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
             {feats.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 bg-white border shadow-sm rounded-lg text-center" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)' }}>
                   <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'var(--color-surface)', color: 'var(--color-accent)' }}>
                      {f.icon}
                   </div>
                   <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{f.title}</h3>
                   <p className="opacity-70 text-sm" style={{ color: 'var(--color-text)' }}>{f.desc}</p>
                </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
}

// ── Contact ──
export function OtoyikamaOtoContact({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-20" style={{ background: 'var(--color-bg)' }}>
       <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>İletişim</h2>
          <div className="p-8 rounded-xl shadow-lg border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
             <a href={`tel:${(business as any)?.phoneClean as string}`} className="block text-3xl md:text-5xl tracking-widest font-bold mb-8 hover:opacity-80 transition-opacity" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent)' }}>
                {(business as any)?.phone as string}
             </a>
             <div className="text-lg font-medium opacity-80" style={{ color: 'var(--color-text)' }}>{(business as any)?.address as string}</div>
          </div>
       </div>
    </section>
  );
}

registerSection('hero', 'split_image', OtoyikamaOtoHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('about', 'features_grid', OtoyikamaOtoAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('contact', 'simple_contact', OtoyikamaOtoContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
