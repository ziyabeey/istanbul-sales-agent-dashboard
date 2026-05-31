'use client';

import React from 'react';
import type { ComponentType, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Truck, Shield, ArrowRight, Phone, MapPin } from 'lucide-react';
import type { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

// ═══════════════════════════════════════════
// Oto VIP — Supercar Servis (Enterprise)
// Plan: enterprise | Anton + Inter (Dark Theme)
// ═══════════════════════════════════════════

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// ── 1. Hero (3D Parallax Feeling) ──
export function OtoVipHero({ business, content, settings }: SectionProps<any>) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
         <img src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80" alt="Supercar" className="w-full h-full object-cover opacity-40 scale-105" />
         <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/60 to-transparent" />
         <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)] via-transparent to-[var(--color-bg)]/50" />
      </div>

      <div className="container relative z-10 px-6">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center">
           <motion.div variants={fadeUp} className="mb-4">
              <span className="px-5 py-2 text-xs font-bold tracking-[0.3em] uppercase rounded-sm inline-flex items-center gap-2" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
                 <Crown className="w-4 h-4" /> {content?.badge || 'SÜPER ARAÇLAR İÇİN'}
              </span>
           </motion.div>
           <motion.h1 variants={fadeUp} className="text-7xl md:text-[8rem] uppercase text-center mb-6 drop-shadow-2xl tracking-wide leading-[0.9]" style={{ fontFamily: 'var(--font-heading)' }}>
             {content?.title || business?.name}
           </motion.h1>
           <motion.p variants={fadeUp} className="text-xl md:text-2xl text-center max-w-2xl font-light mb-12 opacity-80" style={{ color: 'var(--color-text-secondary)' }}>
             {content?.subtitle || business?.slogan}. Ferrari, Lamborghini ve McLaren özel servisi.
           </motion.p>
           
           <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-6">
             <a href={content?.cta1?.href || '#iletisim'} className="px-10 py-5 text-sm uppercase tracking-[0.2em] transition-all hover:scale-110" style={{ background: 'var(--color-text)', color: 'var(--color-bg)', fontWeight: 'bold' }}>
               {content?.cta1?.text || 'Randevu Talep Et'}
             </a>
             <a href="#hizmetler" className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] font-bold pb-2 border-b-2 transition-all hover:gap-4" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-text)' }}>
               Hizmet Haritası <ArrowRight className="w-4 h-4" />
             </a>
           </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative side text */}
      <div className="absolute hidden lg:block right-10 top-1/2 -translate-y-1/2 origin-right rotate-90 text-sm tracking-[0.5em] opacity-30 uppercase font-bold" style={{ color: 'var(--color-text)' }}>
         EXOTIC CAR SPECIALIST
      </div>
    </section>
  );
}

// ── 2. Showcase / Gallery Grid ──
export function OtoVipGallery({ content }: SectionProps<any>) {
  return (
    <section id="galeri" className="py-24 relative" style={{ background: 'var(--color-bg)' }}>
      <div className="container px-6">
        <div className="mb-16">
           <h4 className="text-sm font-bold tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--color-accent)' }}>{content?.badge || 'VİTRİN'}</h4>
           <h2 className="text-5xl md:text-7xl uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{content?.title || 'SANAT ESERLERİ'}</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 lg:gap-6">
           {[1, 2, 3, 4, 5, 6].map((it, i) => (
             <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`group relative overflow-hidden bg-zinc-900 ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
               <div className="absolute inset-0 z-10 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white border px-6 py-2 uppercase tracking-widest text-xs">Görüntüle</span>
               </div>
               <img src={`https://images.unsplash.com/photo-${1550000000000 + i * 10000}?auto=format&fit=crop&q=80&w=600`} alt="Supercar" className="w-full h-full object-cover min-h-[250px] transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0" />
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}

// ── 3. Services ──
export function OtoVipServices({ business, content }: SectionProps<any>) {
  const getIcon = (name: string) => {
    switch(name) {
      case 'crown': return <Crown className="w-8 h-8" />;
      case 'sparkles': return <Sparkles className="w-8 h-8" />;
      case 'truck': return <Truck className="w-8 h-8" />;
      case 'shield': return <Shield className="w-8 h-8" />;
      default: return <Crown className="w-8 h-8" />;
    }
  };

  return (
    <section id="hizmetler" className="py-32 border-y" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
      <div className="container px-6 grid lg:grid-cols-[1fr_2fr] gap-20">
         <div>
            <div className="sticky top-32">
               <h4 className="text-sm font-bold tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--color-accent)' }}>{content?.badge || 'PERFORMANS'}</h4>
               <h2 className="text-5xl md:text-6xl uppercase tracking-wider mb-8" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Özel İhtiyaçlara Özel Çözümler</h2>
               <p className="font-light opacity-60 text-lg leading-relaxed mb-8" style={{ color: 'var(--color-text)' }}>Orijinal parçalar, fabrika seviyesinde diagnostik cihazları ve İtalya sertifikalı teknisyenlerimiz ile eşsiz hizmet.</p>
               <a href="#iletisim" className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] transition-all hover:gap-5" style={{ color: 'var(--color-accent)' }}>
                  Detaylı Bilgi Al <ArrowRight className="w-4 h-4" />
               </a>
            </div>
         </div>
         
         <div className="flex flex-col gap-6">
            {business?.services?.map((svc: any, i: number) => (
              <motion.div key={i} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group p-8 md:p-10 transition-colors border-l-4 hover:pl-12" style={{ background: 'var(--color-bg)', borderColor: svc.popular ? 'var(--color-accent)' : 'var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start md:items-center gap-6">
                       <div className="opacity-30 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-accent)' }}>{getIcon(svc.icon || 'crown')}</div>
                       <div>
                          <h3 className="text-2xl uppercase tracking-wide mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{svc.name}</h3>
                          <p className="font-light text-sm opacity-60 max-w-sm" style={{ color: 'var(--color-text)' }}>{svc.description}</p>
                       </div>
                    </div>
                    <div className="text-left md:text-right">
                       <div className="text-sm tracking-widest uppercase opacity-40 mb-1" style={{ color: 'var(--color-text)' }}>{svc.duration}</div>
                       <div className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>{svc.price}</div>
                    </div>
                 </div>
              </motion.div>
            ))}
         </div>
      </div>
    </section>
  );
}

// ── 4. Stats ──
export function OtoVipStats({ content }: SectionProps<any>) {
  const stats = content?.stats || [{ value:'6+', label:'Yıl VIP Servis' }, { value:'150+', label:'Referans Araç' }, { value:'%100', label:'Gizlilik' }];
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
       <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
       <div className="container relative z-10 px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center divide-y sm:divide-y-0 sm:divide-x border-opacity-20" style={{ borderColor: 'var(--color-text-on-accent)' }}>
             {stats.map((s: any, i: number) => (
               <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="text-6xl md:text-8xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{s.value}</div>
                  <div className="text-sm font-bold uppercase tracking-[0.2em] opacity-80">{s.label}</div>
               </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
}

// ── 5. Contact / Booking ──
export function OtoVipContact({ business, content }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-32" style={{ background: 'var(--color-bg)' }}>
      <div className="container px-6 grid lg:grid-cols-2 gap-20">
         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <h4 className="text-sm font-bold tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--color-accent)' }}>{content?.badge || 'İLETİŞİM'}</h4>
            <h2 className="text-5xl md:text-6xl uppercase tracking-wider mb-8" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Concierge ve Randevu</h2>
            <p className="font-light text-xl opacity-60 mb-12" style={{ color: 'var(--color-text)' }}>Araç transferi ve bakım randevusu talepleriniz için form doldurun veya direkt arayın.</p>
            
            <div className="space-y-10">
               <div>
                  <div className="text-xs uppercase tracking-widest opacity-40 mb-2">Showroom Adresi</div>
                  <div className="text-lg font-light flex items-center gap-3"><MapPin className="w-5 h-5 text-zinc-500" /> {(business as any)?.address as string}</div>
               </div>
               <div>
                  <div className="text-xs uppercase tracking-widest opacity-40 mb-2">7/24 Hat</div>
                  <a href={`tel:${(business as any)?.phoneClean as string}`} className="text-3xl font-bold flex items-center gap-3"><Phone className="w-6 h-6 text-zinc-500"/> {(business as any)?.phone as string}</a>
               </div>
            </div>
         </motion.div>
         
         <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-10 border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <h3 className="text-4xl uppercase tracking-wide mb-8" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Özel Talep</h3>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
               <div className="relative">
                  <input type="text" placeholder="İsim Soyisim" className="w-full bg-transparent border-b pb-3 font-light placeholder-zinc-600 focus:outline-none focus:border-[var(--color-accent)] transition-colors" style={{ borderColor: 'var(--color-border)' }} />
               </div>
               <div className="relative">
                  <input type="tel" placeholder="GSM Numarası" className="w-full bg-transparent border-b pb-3 font-light placeholder-zinc-600 focus:outline-none focus:border-[var(--color-accent)] transition-colors" style={{ borderColor: 'var(--color-border)' }} />
               </div>
               <div className="relative">
                  <input type="text" placeholder="Araç (Örn: Ferrari F8 Tributo)" className="w-full bg-transparent border-b pb-3 font-light placeholder-zinc-600 focus:outline-none focus:border-[var(--color-accent)] transition-colors" style={{ borderColor: 'var(--color-border)' }} />
               </div>
               <div className="pt-4">
                  <button className="w-full py-5 text-sm uppercase tracking-[0.2em] font-bold transition-all hover:bg-white hover:text-black" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
                     Talebi İlet
                  </button>
               </div>
            </form>
         </motion.div>
      </div>
    </section>
  );
}

// Registry
registerSection('hero', 'fullscreen_overlay', OtoVipHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('about', 'split_left', OtoVipGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('stats', 'service_stats_row', OtoVipStats as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('gallery', 'workshop_photos', OtoVipGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('services', 'service_price_grid', OtoVipServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('contact', 'detailed_form', OtoVipContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
