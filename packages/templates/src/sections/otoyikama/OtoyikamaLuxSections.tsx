'use client';

import React from 'react';
import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { Diamond, Star, ChevronRight, Award } from 'lucide-react';
import type { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

// ── Hero ──
export function OtoyikamaLuxHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden text-center" style={{ background: 'var(--color-bg)' }}>
      {/* Background Video Mockup / Overlay */}
      <div className="absolute inset-0">
         <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80" alt="Lux Yıkama" className="w-full h-full object-cover opacity-40 blur-sm scale-105" />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>
      
      <div className="max-w-[900px] w-full mx-auto px-6 relative z-10 flex flex-col items-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
           <Award className="w-16 h-16 mx-auto mb-8" style={{ color: 'var(--color-accent)' }} />
           <div className="inline-block tracking-[0.3em] text-xs font-bold uppercase mb-6" style={{ color: 'var(--color-text)' }}>
              {content?.badge || 'VIP & PREMIUM OTO BAKIM'}
           </div>
           <h1 className="text-5xl md:text-7xl font-bold mb-8 uppercase tracking-widest leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
             {content?.title || 'Kusursuz İhtişam'}
           </h1>
           <p className="text-xl opacity-70 mb-12 max-w-2xl mx-auto font-light" style={{ color: 'var(--color-text)' }}>
             {content?.subtitle || 'Lüks araçlarınız için uluslararası standartlarda boya koruma, seramik kaplama ve premium detaylı iç temizlik deneyimi.'}
           </p>
           <a href="#hizmetler" className="inline-flex items-center gap-4 px-10 py-5 border uppercase tracking-widest font-bold text-sm transition-all hover:bg-white hover:text-black" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}>
             Ayrıcalıkları Keşfet <ChevronRight className="w-4 h-4" />
           </a>
        </motion.div>
      </div>
    </section>
  );
}

// ── Services ──
export function OtoyikamaLuxServices({ business }: SectionProps<any>) {
  const services = [
    { title: '9H Seramik Kaplama', desc: 'Boya üzerinde cam benzeri mikroskobik bir kalkan oluşturarak çizilmeleri ve asit yağmurlarını engeller.', price: '₺10,000+' },
    { title: 'VIP Detaylandırma (Detailing)', desc: 'İç mekandaki en ince kıvrımlara kadar özel mikrofiber fırçalarla temizlik ve deri bakımı.', price: '₺4,500' },
    { title: 'Mat Boya Koruma', desc: 'Mat renkli lüks araçlar için formüle edilmiş parlamayı engelleyen özel koruyucu kalkan.', price: '₺7,500' }
  ];

  return (
    <section id="hizmetler" className="py-32" style={{ background: 'var(--color-surface)' }}>
       <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
             <Diamond className="w-10 h-10 mx-auto mb-6" style={{ color: 'var(--color-accent)' }} />
             <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-widest mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Signature Hizmetler</h2>
             <div className="h-px w-24 mx-auto" style={{ background: 'var(--color-accent)' }}></div>
          </div>
          
          <div className="space-y-12">
             {services.map((svc, i) => (
                <div key={i} className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b group" style={{ borderColor: 'var(--color-border)' }}>
                   <div className="flex-1 md:pr-12">
                      <h3 className="text-2xl lg:text-3xl font-bold uppercase tracking-wide mb-4 transition-colors group-hover:text-[var(--color-accent)]" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                         {svc.title}
                      </h3>
                      <p className="opacity-60 text-lg font-light leading-relaxed" style={{ color: 'var(--color-text)' }}>{svc.desc}</p>
                   </div>
                   <div className="text-3xl lg:text-4xl font-light tracking-wider" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}>
                      {svc.price}
                   </div>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
}

// ── Contact ──
export function OtoyikamaLuxContact({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-32" style={{ background: 'var(--color-bg)' }}>
       <div className="max-w-[1000px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-widest mb-10" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Rezervasyon</h2>
          <p className="opacity-70 text-xl font-light mb-16 max-w-xl mx-auto" style={{ color: 'var(--color-text)' }}>
             VIP hizmetlerimiz yoğun talep görmektedir. Lütfen aracınızı getirmeden önce randevu oluşturunuz.
          </p>
          <div className="inline-block p-12 border-2 relative" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
             <Star className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8" style={{ color: 'var(--color-accent)', background: 'var(--color-surface)' }} />
             
             <div className="text-sm font-bold tracking-widest uppercase mb-4 opacity-50" style={{ color: 'var(--color-text)' }}>Randevu Hattı</div>
             <a href={`tel:${(business as any)?.phoneClean as string}`} className="block text-4xl md:text-6xl tracking-widest font-light mb-12 hover:opacity-80 transition-opacity" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent)' }}>
                {(business as any)?.phone as string}
             </a>
             
             <div className="text-sm tracking-widest uppercase mb-2 opacity-50" style={{ color: 'var(--color-text)' }}>Konum</div>
             <div className="text-xl font-light" style={{ color: 'var(--color-text)' }}>{(business as any)?.address as string}</div>
          </div>
       </div>
    </section>
  );
}

registerSection('hero', 'video_showreel', OtoyikamaLuxHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('services', 'lux_list', OtoyikamaLuxServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('contact', 'lux_contact', OtoyikamaLuxContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
