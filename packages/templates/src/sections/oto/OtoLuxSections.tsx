'use client';

import React from 'react';
import type { ComponentType, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, Shield, Car, CheckCircle, ArrowRight, Phone, MapPin, Mail, Award } from 'lucide-react';
import type { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

// ═══════════════════════════════════════════
// Oto Lux — Premium Servis (Enterprise)
// Plan: enterprise | Libre Baskerville + Inter
// ═══════════════════════════════════════════

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// ── 1. Hero ──
export function OtoLuxHero({ business, content, settings }: SectionProps<any>) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0">
         <img src="https://images.unsplash.com/photo-1600705256565-5c1cfba1cd6e?auto=format&fit=crop&q=80" alt="Lux Auto" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
         <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-black/80" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto">
          <motion.div variants={fadeUp} className="mb-6 flex justify-center">
             <div className="px-6 py-2 border backdrop-blur-sm rounded-full inline-flex items-center gap-2" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)', background: 'rgba(20,20,20,0.5)' }}>
                <Crown className="w-4 h-4" />
                <span className="text-sm font-semibold tracking-[0.2em] uppercase">{content?.badge || 'PREMIUM SERVİS'}</span>
             </div>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-normal leading-tight mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
             {content?.title || business?.name}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-xl md:text-2xl font-light mb-12 max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
             {content?.subtitle || business?.slogan}. Özel araçlarınıza özel dokunuşlar.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center items-center gap-6">
             <a href={content?.cta1?.href || '#iletisim'} className="px-10 py-5 rounded-sm text-lg transition-all duration-500 hover:scale-105" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)', fontWeight: 500 }}>
                {content?.cta1?.text || 'VIP Randevu Talep Et'}
             </a>
             <a href="#hizmetler" className="px-10 py-5 rounded-sm text-lg border transition-all duration-500 hover:bg-white/5" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)', fontWeight: 500 }}>
                Hizmetlerimizi İnceleyin
             </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
         <span className="text-xs tracking-[0.3em] uppercase opacity-50">SCROLL</span>
         <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-accent)] to-transparent" />
      </motion.div>
    </section>
  );
}

// ── 2. About ──
export function OtoLuxAbout({ business, content }: SectionProps<any>) {
  return (
    <section id="hakkimizda" className="py-32 relative" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
         <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative">
            <div className="aspect-[4/5] relative z-10 p-4" style={{ background: 'var(--color-bg)' }}>
               <img src="https://images.unsplash.com/photo-1621245785054-2a6289b4ebcc?auto=format&fit=crop&q=80" alt="About Lux" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="absolute top-10 -right-10 w-2/3 aspect-square z-0 border" style={{ borderColor: 'var(--color-accent)', opacity: 0.3 }} />
         </motion.div>
         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h4 variants={fadeUp} className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--color-accent)' }}>{content?.badge || 'MÜKEMMELİYET'}</motion.h4>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl mb-8 leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
               {content?.title || 'Sanat Eserlerine Özel Yaklaşım'}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg font-light leading-relaxed mb-10" style={{ color: 'var(--color-text-secondary)' }}>
               {content?.description || `${(business as any)?.name as string}, ${(business as any)?.experience as string} aşkın süredir Premium segment araçlara fabrika standartlarında hizmet vermektedir. Deneyimli teknisyenlerimiz, en son diagnostik teknolojilerini kullanarak her marka araca özel çözümler sunar.`}
            </motion.p>
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-8">
               <div className="border-l pl-6" style={{ borderColor: 'var(--color-accent)' }}>
                  <div className="text-3xl font-light mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{(business as any)?.experience as string}</div>
                  <div className="text-xs tracking-widest uppercase opacity-70">Sektörel Tecrübe</div>
               </div>
               <div className="border-l pl-6" style={{ borderColor: 'var(--color-accent)' }}>
                  <div className="text-3xl font-light mb-2" style={{ fontFamily: 'var(--font-heading)' }}>%100</div>
                  <div className="text-xs tracking-widest uppercase opacity-70">Müşteri Memnuniyeti</div>
               </div>
            </motion.div>
         </motion.div>
      </div>
    </section>
  );
}

// ── 3. Services ──
export function OtoLuxServices({ business, content }: SectionProps<any>) {
  const getIcon = (name: string) => {
    switch(name) {
      case 'star': return <Star className="w-6 h-6" />;
      case 'crown': return <Crown className="w-6 h-6" />;
      case 'sparkles': return <Award className="w-6 h-6" />;
      case 'car': return <Car className="w-6 h-6" />;
      default: return <Shield className="w-6 h-6" />;
    }
  };

  return (
    <section id="hizmetler" className="py-32" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center md:text-left mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div className="max-w-2xl">
             <h4 className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--color-accent)' }}>{content?.badge || 'HİZMET PROTOKOLÜ'}</h4>
             <h2 className="text-4xl md:text-5xl leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                Özel Araçlar İçin<br />Ayrıcalıklı Hizmetler
             </h2>
           </div>
           <a href="#iletisim" className="inline-flex items-center gap-2 pb-2 border-b transition-all hover:gap-4" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-text)' }}>
              Tüm Hizmetleri Gör <ArrowRight className="w-4 h-4" />
           </a>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {business?.services?.map((svc: any, i: number) => (
             <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group relative p-10 border transition-colors duration-500 cursor-pointer" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
               {/* Hover Effect */}
               <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ background: 'var(--color-accent)' }} />
               
               <div className="mb-8 p-4 inline-flex rounded-sm" style={{ background: 'var(--color-bg)', color: 'var(--color-accent)' }}>
                 {getIcon(svc.icon || 'shield')}
               </div>
               
               <h3 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{typeof svc === 'string' ? svc : svc.name}</h3>
               {typeof svc !== 'string' && svc.description && (
                  <p className="font-light mb-8 opacity-70 leading-relaxed min-h-[3rem]">{svc.description}</p>
               )}
               
               {typeof svc !== 'string' && svc.price && (
                 <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                    <span className="text-sm tracking-wider uppercase">{svc.duration}</span>
                    <span className="font-semibold" style={{ color: 'var(--color-accent)' }}>{svc.price}</span>
                 </div>
               )}
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}

// ── 4. Stats / Info ──
export function OtoLuxStats({ content }: SectionProps<any>) {
  const stats = content?.stats || [{ value:'100%', label:'Garanti' }, { value:'VIP', label:'Hizmet' }, { value:'7/24', label:'Destek' }];
  return (
    <section className="py-24 border-y relative overflow-hidden" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
      {/* Decorative vertical lines */}
      <div className="absolute inset-0 flex justify-evenly opacity-5 pointer-events-none">
         {[1,2,3,4].map((i) => <div key={i} className="w-[1px] h-full bg-white" />)}
      </div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {stats.map((s: any, i: number) => (
               <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                  <div className="text-6xl mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent)' }}>{s.value}</div>
                  <div className="text-sm tracking-[0.2em] uppercase opacity-70">{s.label}</div>
               </motion.div>
            ))}
         </div>
      </div>
    </section>
  );
}

// ── 5. Contact ──
export function OtoLuxContact({ business, content }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-32 relative" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="pr-10">
            <h4 className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--color-accent)' }}>{content?.badge || 'İLETİŞİM'}</h4>
            <h2 className="text-4xl md:text-5xl mb-10 leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
               {content?.title || 'Randevu ve Danışmanlık'}
            </h2>
            <p className="font-light text-lg mb-12" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
               Premium araçlarınız için özel planlanmış bakım süreleri ve müsaitlik durumu için lütfen önceden rezervasyon yaptırınız.
            </p>
            
            <div className="space-y-8">
               <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 mt-1" style={{ color: 'var(--color-accent)' }} />
                  <div>
                     <div className="text-xs tracking-widest uppercase opacity-60 mb-2">Adres</div>
                     <div className="text-lg font-light leading-relaxed">{(business as any)?.address as string}</div>
                  </div>
               </div>
               <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 mt-1" style={{ color: 'var(--color-accent)' }} />
                  <div>
                     <div className="text-xs tracking-widest uppercase opacity-60 mb-2">Telefon / WhatsApp</div>
                     <a href={`tel:${(business as any)?.phoneClean as string}`} className="text-lg font-light">{(business as any)?.phone as string}</a>
                  </div>
               </div>
               <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 mt-1" style={{ color: 'var(--color-accent)' }} />
                  <div>
                     <div className="text-xs tracking-widest uppercase opacity-60 mb-2">E-Posta</div>
                     <a href={`mailto:${(business as any)?.email as string}`} className="text-lg font-light">{(business as any)?.email as string}</a>
                  </div>
               </div>
            </div>
         </motion.div>
         
         <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="p-10 md:p-14 border relative" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
            <h3 className="text-2xl mb-8" style={{ fontFamily: 'var(--font-heading)' }}>VIP Form</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
               <div>
                  <input type="text" placeholder="Ad Soyad" className="w-full bg-transparent border-b pb-4 pt-2 px-0 focus:outline-none transition-colors" style={{ borderColor: 'var(--color-border-subtle)' }} />
               </div>
               <div>
                  <input type="tel" placeholder="Telefon" className="w-full bg-transparent border-b pb-4 pt-2 px-0 focus:outline-none transition-colors" style={{ borderColor: 'var(--color-border-subtle)' }} />
               </div>
               <div>
                  <input type="text" placeholder="Araç Marka / Model" className="w-full bg-transparent border-b pb-4 pt-2 px-0 focus:outline-none transition-colors" style={{ borderColor: 'var(--color-border-subtle)' }} />
               </div>
               <div>
                  <textarea rows={3} placeholder="Talep" className="w-full bg-transparent border-b pb-4 pt-2 px-0 focus:outline-none transition-colors resize-none" style={{ borderColor: 'var(--color-border-subtle)' }}></textarea>
               </div>
               <button className="w-full py-5 text-sm tracking-widest uppercase font-semibold transition-all hover:opacity-90 mt-4" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
                  Gönder
               </button>
            </form>
         </motion.div>
      </div>
    </section>
  );
}

// Registry
registerSection('hero', 'fullscreen_overlay', OtoLuxHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('about', 'split_left', OtoLuxAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('stats', 'service_stats_row', OtoLuxStats as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('services', 'service_price_grid', OtoLuxServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('contact', 'detailed_form', OtoLuxContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
