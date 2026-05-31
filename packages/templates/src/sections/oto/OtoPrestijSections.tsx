'use client';

import React from 'react';
import type { ComponentType, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Car, Tag, Repeat, Percent, Shield, ArrowRight, Phone, MapPin, Mail, Award, CheckCircle } from 'lucide-react';
import type { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

// ═══════════════════════════════════════════
// Oto Prestij — Lüks İkinci El (Pro)
// Plan: pro | DM Serif Display + DM Sans
// ═══════════════════════════════════════════

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ── 1. Hero (Showcase) ──
export function OtoPrestijHero({ business, content, settings }: SectionProps<any>) {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {/* Background with abstract shapes */}
      <div className="absolute inset-0 z-0 opacity-40">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" style={{ background: 'var(--color-accent)' }} />
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" style={{ background: 'var(--color-accent-subtle)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
         <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl mx-auto lg:mx-0">
            <motion.div variants={fadeUp} className="mb-6 inline-flex px-4 py-1.5 rounded-full border text-xs font-bold tracking-[0.1em] uppercase shadow-sm" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-accent)' }}>
               {content?.badge || business?.district || 'SHOWROOM'}
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl leading-tight mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
               {content?.title || business?.name}
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-xl mb-10 opacity-80" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
               {content?.subtitle || business?.slogan}. Özenle seçilmiş, ekspertiz garantili Premium segment araçlar.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
               <a href={content?.cta1?.href || '#galeri'} className="px-10 py-5 font-semibold text-lg transition-all rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
                  {content?.cta1?.text || 'Araçlarımızı İnceleyin'}
               </a>
            </motion.div>
         </motion.div>
         
         <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative mt-12 lg:mt-0">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl relative z-10 p-2 md:p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-subtle)' }}>
               <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80" alt="Showroom" className="w-full h-auto object-cover rounded-xl" />
            </div>
            {/* Trust badge */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="absolute -bottom-6 -left-6 z-20 px-6 py-4 rounded-xl shadow-xl flex items-center gap-4" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
               <Shield className="w-8 h-8" style={{ color: 'var(--color-accent)' }} />
               <div>
                  <div className="text-sm font-semibold opacity-60 uppercase tracking-widest">Ekspertiz</div>
                  <div className="text-lg font-bold">%100 Garantili</div>
               </div>
            </motion.div>
         </motion.div>
      </div>
    </section>
  );
}

// ── 2. Showcase / Gallery ──
export function OtoPrestijGallery({ content }: SectionProps<any>) {
  return (
    <section id="galeri" className="py-24" style={{ background: 'var(--color-surface)' }}>
       <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
             <h4 className="text-xs tracking-[0.2em] font-bold uppercase mb-4" style={{ color: 'var(--color-accent)' }}>{content?.badge || 'VİTRİN'}</h4>
             <h2 className="text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{content?.title || 'Öne Çıkan Araçlarımız'}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               { brand: 'Mercedes-Benz', model: 'S 400 d Long', year: '2022', price: '₺14.500.000', img: '1549317661-bc025627046b' },
               { brand: 'Porsche', model: 'Panamera 4', year: '2023', price: '₺16.250.000', img: '1503370973448-6a2b8eb586a1' },
               { brand: 'BMW', model: '840i xDrive', year: '2022', price: '₺12.850.000', img: '1555215695-3004980ad54e' }
             ].map((car, i) => (
               <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group rounded-2xl overflow-hidden shadow-md transition-shadow hover:shadow-2xl" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border-subtle)' }}>
                  <div className="aspect-[4/3] overflow-hidden relative">
                     <img src={`https://images.unsplash.com/photo-${car.img}?auto=format&fit=crop&q=80`} alt={car.model} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                     <div className="absolute top-4 right-4 px-3 py-1 text-xs font-bold rounded-full filter backdrop-blur-md" style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--color-text)' }}>{car.year}</div>
                  </div>
                  <div className="p-6">
                     <div className="text-sm font-semibold opacity-60 uppercase tracking-wider mb-1" style={{ color: 'var(--color-accent)' }}>{car.brand}</div>
                     <h3 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{car.model}</h3>
                     <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                        <span className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>{car.price}</span>
                        <span className="text-sm font-semibold opacity-70 flex items-center gap-1 cursor-pointer transition-colors hover:text-[var(--color-accent)]">İncele <ArrowRight className="w-4 h-4" /></span>
                     </div>
                  </div>
               </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
}

// ── 3. Services (Process/Pricing) ──
export function OtoPrestijServices({ business, content }: SectionProps<any>) {
  const getIcon = (name: string) => {
    switch (name) {
      case 'car': return <Car className="w-8 h-8"/>;
      case 'tag': return <Tag className="w-8 h-8"/>;
      case 'repeat': return <Repeat className="w-8 h-8"/>;
      case 'percent': return <Percent className="w-8 h-8"/>;
      case 'shield': return <Shield className="w-8 h-8"/>;
      default: return <Award className="w-8 h-8"/>;
    }
  };

  return (
    <section id="hizmetler" className="py-24" style={{ background: 'var(--color-bg)' }}>
       <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
             <h4 className="text-xs tracking-[0.2em] font-bold uppercase mb-4" style={{ color: 'var(--color-accent)' }}>{content?.badge || 'HİZMETLERİMİZ'}</h4>
             <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Uçtan Uca Çözümler</h2>
             <p className="text-lg opacity-80" style={{ color: 'var(--color-text-secondary)' }}>Araç alımdan satıma, krediden sigortaya kadar tüm süreçlerde profesyonel danışmanlık.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {business?.services?.map((svc: any, i: number) => (
               <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 rounded-2xl flex flex-col items-center text-center transition-all hover:-translate-y-2 border border-transparent shadow-sm hover:shadow-xl" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border-subtle)' }}>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}>
                     {getIcon(svc.icon || 'star')}
                  </div>
                  <h3 className="text-2xl mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{typeof svc === 'string' ? svc : svc.name}</h3>
                  {typeof svc !== 'string' && svc.description && (
                     <p className="opacity-80 mb-6 flex-grow">{svc.description}</p>
                  )}
                  {typeof svc !== 'string' && svc.price && (
                     <div className="w-full pt-4 border-t flex justify-between items-center" style={{ borderColor: 'var(--color-border)' }}>
                        <span className="text-xs tracking-widest uppercase opacity-60 font-medium">{svc.duration}</span>
                        <span className="font-bold text-lg" style={{ color: 'var(--color-accent)' }}>{svc.price}</span>
                     </div>
                  )}
               </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
}

// ── 4. Stats ──
export function OtoPrestijStats({ content }: SectionProps<any>) {
  const stats = content?.stats || [{ value:'14+', label:'Yıl Tecrübe' }, { value:'400+', label:'Araç Stoğu' }, { value:'%100', label:'Ekspertiz' }];
  return (
    <section className="py-20 border-y" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x" style={{ borderColor: 'var(--color-border-subtle)' }}>
         {stats.map((s: any, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="pt-8 md:pt-0">
               <div className="text-5xl md:text-6xl mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{s.value}</div>
               <div className="text-sm tracking-widest uppercase font-semibold opacity-70" style={{ color: 'var(--color-accent)' }}>{s.label}</div>
            </motion.div>
         ))}
      </div>
    </section>
  );
}

// ── 5. Contact ──
export function OtoPrestijContact({ business, content }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="bg-white p-10 md:p-14 rounded-3xl shadow-xl" style={{ border: '1px solid var(--color-border-subtle)', background: 'var(--color-surface-elevated)' }}>
            <h3 className="text-3xl mb-8" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Bize Ulaşın</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
               <div>
                  <label className="block text-sm font-bold opacity-70 mb-2" style={{ color: 'var(--color-text)' }}>Ad Soyad</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }} />
               </div>
               <div>
                  <label className="block text-sm font-bold opacity-70 mb-2" style={{ color: 'var(--color-text)' }}>Telefon</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }} />
               </div>
               <div>
                  <label className="block text-sm font-bold opacity-70 mb-2" style={{ color: 'var(--color-text)' }}>Talep (Alım Satım vb.)</label>
                  <select className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
                     <option>Araç Almak İstiyorum</option>
                     <option>Aracımı Satmak İstiyorum</option>
                     <option>Takas</option>
                  </select>
               </div>
               <button className="w-full py-4 rounded-lg font-bold transition-all shadow-md hover:shadow-lg mt-4" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
                  Gönder
               </button>
            </form>
         </motion.div>
         
         <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:pl-10">
            <h4 className="text-xs tracking-[0.2em] font-bold uppercase mb-4" style={{ color: 'var(--color-accent)' }}>{content?.badge || 'İLETİŞİM BİLGİLERİ'}</h4>
            <h2 className="text-4xl md:text-5xl mb-8" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Showroom'a Bekleriz</h2>
            <p className="text-lg opacity-80 mb-10" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>Araçlarımızı yakından incelemek, test sürüşü yapmak veya kahvemizi içmek için galerimize davetlisiniz.</p>
            
            <div className="space-y-6">
               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center border" style={{ borderColor: 'var(--color-border)', color: 'var(--color-accent)' }}><MapPin className="w-6 h-6" /></div>
                  <div>
                     <div className="text-xs font-bold tracking-widest uppercase opacity-60 mb-1" style={{ color: 'var(--color-text)' }}>Adres</div>
                     <div className="text-lg font-medium" style={{ color: 'var(--color-text)' }}>{(business as any)?.address as string}</div>
                  </div>
               </div>
               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center border" style={{ borderColor: 'var(--color-border)', color: 'var(--color-accent)' }}><Phone className="w-6 h-6" /></div>
                  <div>
                     <div className="text-xs font-bold tracking-widest uppercase opacity-60 mb-1" style={{ color: 'var(--color-text)' }}>Telefon</div>
                     <a href={`tel:${(business as any)?.phoneClean as string}`} className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>{(business as any)?.phone as string}</a>
                  </div>
               </div>
               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center border" style={{ borderColor: 'var(--color-border)', color: 'var(--color-accent)' }}><Mail className="w-6 h-6" /></div>
                  <div>
                     <div className="text-xs font-bold tracking-widest uppercase opacity-60 mb-1" style={{ color: 'var(--color-text)' }}>E-Posta</div>
                     <a href={`mailto:${(business as any)?.email as string}`} className="text-lg font-medium" style={{ color: 'var(--color-text)' }}>{(business as any)?.email as string}</a>
                  </div>
               </div>
            </div>
         </motion.div>
      </div>
    </section>
  );
}

// Registry
registerSection('hero', 'split_image', OtoPrestijHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('about', 'split_left', OtoPrestijGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>);  // Mapped gallery to about slot since it showcases cars
registerSection('stats', 'animated_row', OtoPrestijStats as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('gallery', 'masonry', OtoPrestijGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('services', 'service_price_grid', OtoPrestijServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('contact', 'detailed_form', OtoPrestijContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
