'use client';

import React from 'react';
import type { ComponentType, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Settings, Wind, Droplet, Flame, Shield, ArrowRight, CheckCircle2, Trophy, Phone, MapPin } from 'lucide-react';
import type { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

// ═══════════════════════════════════════════
// Oto Mekanik — Growth
// Plan: growth | Poppins + Inter
// ═══════════════════════════════════════════

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ── 1. Hero (Split Image) ──
export function OtoMekanikHero({ business, content, settings }: SectionProps<any>) {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {/* Decorative Blueprint Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(var(--color-accent) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center z-10">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl">
           <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 font-semibold text-sm" style={{ background: 'var(--color-surface)', color: 'var(--color-accent)', boxShadow: '0 0 20px var(--color-surface-muted)' }}>
              <Settings className="w-4 h-4" /> {content?.badge || business?.district?.toUpperCase() || 'MEKANİK UZMANI'}
           </motion.div>
           
           <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-bold tracking-tight mb-6" style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.15 }}>
             <span style={{ color: 'var(--color-text)' }}>{business?.name?.split(' ')[0]}</span>{' '}
             <span style={{ color: 'var(--color-accent)' }}>{business?.name?.split(' ').slice(1).join(' ')}</span>
           </motion.h1>
           
           <motion.p variants={fadeUp} className="text-lg lg:text-xl font-medium mb-10" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
             {content?.subtitle || business?.slogan}. Mekanik, motor ve elektronik arızalarınıza garantili ve kalıcı çözümler üretiyoruz.
           </motion.p>
           
           <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
             <a href={content?.cta1?.href || '#iletisim'} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:-translate-y-1 hover:shadow-xl" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
               {content?.cta1?.text || 'Randevu Oluştur'} <ArrowRight className="w-5 h-5" />
             </a>
             <a href="#hakkimizda" className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold transition-all border border-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-surface)]" style={{ color: 'var(--color-text)' }}>
               Hizmetleri İncele
             </a>
           </motion.div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative hidden lg:block">
           <div className="rounded-3xl overflow-hidden relative shadow-2xl">
              <img src="https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80" alt="Motor" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" />
           </div>
           
           {/* Floating stat block */}
           <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="absolute -bottom-10 -left-10 p-6 rounded-2xl shadow-xl flex items-center gap-4" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border)' }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}>
                 <Trophy className="w-7 h-7" />
              </div>
              <div>
                 <div className="text-3xl font-bold" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>{(business as any)?.experience as string}</div>
                 <div className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Deneyim</div>
              </div>
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── 2. About ──
export function OtoMekanikAbout({ business, content }: SectionProps<any>) {
  return (
    <section id="hakkimizda" className="py-24" style={{ background: 'var(--color-surface)' }}>
       <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
             <img src="https://images.unsplash.com/photo-1599256621730-535171e28f32?auto=format&fit=crop&q=80" alt="Hakkımızda" className="rounded-3xl shadow-xl w-full" />
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
             <motion.h4 variants={fadeUp} className="font-bold text-sm tracking-widest uppercase mb-2" style={{ color: 'var(--color-accent)' }}>{content?.badge || 'HAKKIMIZDA'}</motion.h4>
             <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                {content?.title || 'Problemi Çözülmeyen Araç Bırakmıyoruz'}
             </motion.h2>
             <motion.p variants={fadeUp} className="text-lg leading-relaxed mb-8 font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                {content?.description || `${(business as any)?.name as string}, ${(business as any)?.foundedYear as string} yılından bu yana gelişmiş teknolojik ekipmanları ve deneyimli teknisyenleri ile garantili mekanik onarım hizmeti vermektedir.`}
             </motion.p>
             <motion.div variants={fadeUp} className="space-y-4">
                {['Orijinal Yedek Parça Desteği', 'Gelişmiş Bilgisayarlı Diagnostik', 'Hızlı ve Şeffaf Çözüm Süreci'].map((item, i) => (
                   <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
                      <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{item}</span>
                   </div>
                ))}
             </motion.div>
          </motion.div>
       </div>
    </section>
  );
}

// ── 3. Services ──
export function OtoMekanikServices({ business, content }: SectionProps<any>) {
  const getIcon = (name: string) => {
    switch (name) {
      case 'wrench': return <Wrench className="w-7 h-7" />;
      case 'settings': return <Settings className="w-7 h-7" />;
      case 'wind': return <Wind className="w-7 h-7" />;
      case 'droplet': return <Droplet className="w-7 h-7" />;
      case 'flame': return <Flame className="w-7 h-7" />;
      default: return <Shield className="w-7 h-7" />;
    }
  };

  return (
    <section id="hizmetler" className="py-24" style={{ background: 'var(--color-bg)' }}>
       <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
             <h4 className="font-bold text-sm tracking-widest uppercase mb-2" style={{ color: 'var(--color-accent)' }}>{content?.badge || 'HİZMETLER'}</h4>
             <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Hizmetlerimiz</h2>
             <p className="max-w-2xl mx-auto text-lg font-medium" style={{ color: 'var(--color-text-secondary)' }}>Mekanik arızalarınızda doğru tespit, kaliteli parça ve uzman işçilik ile yanınızdayız.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {business?.services?.map((svc: any, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group relative p-8 rounded-3xl transition-all hover:-translate-y-2 border border-transparent shadow-sm hover:shadow-xl" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border-subtle)' }}>
                   {svc.popular && (
                      <div className="absolute top-6 right-6 px-3 py-1 font-bold text-xs rounded-full" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>POPÜLER</div>
                   )}
                   <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md transition-colors" style={{ background: 'var(--color-surface-elevated)', color: 'var(--color-accent)' }}>
                      {getIcon(svc.icon || '')}
                   </div>
                   <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{svc.name}</h3>
                   <p className="font-medium mb-6 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{svc.description}</p>
                   
                   {svc.price && (
                      <div className="pt-4 mt-auto border-t flex justify-between items-center" style={{ borderColor: 'var(--color-border)' }}>
                         <span className="text-sm font-semibold uppercase" style={{ color: 'var(--color-text-muted)' }}>{svc.duration}</span>
                         <span className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>{svc.price}</span>
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
export function OtoMekanikStats({ content }: SectionProps<any>) {
  const stats = content?.stats || [{ value:'10K+', label:'Onarım' }, { value:'19+', label:'Yıl Deneyim' }, { value:'%99', label:'Memnuniyet' }, { value:'15', label:'Marka Uzmanlığı' }];
  return (
    <section className="py-20" style={{ background: 'var(--color-accent)' }}>
       <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s: any, i: number) => (
             <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-5xl lg:text-6xl font-black mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-on-accent)' }}>{s.value}</div>
                <div className="font-bold text-sm tracking-widest uppercase opacity-90" style={{ color: 'var(--color-text-on-accent)' }}>{s.label}</div>
             </motion.div>
          ))}
       </div>
    </section>
  );
}

// ── 5. Contact ──
export function OtoMekanikContact({ business, content }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-24" style={{ background: 'var(--color-bg)' }}>
       <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
             <h4 className="font-bold text-sm tracking-widest uppercase mb-2" style={{ color: 'var(--color-accent)' }}>{content?.badge || 'İLETİŞİM'}</h4>
             <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Randevu Alın</h2>
             <p className="text-lg font-medium mb-10" style={{ color: 'var(--color-text-secondary)' }}>Aracınızın bakım veya onarımı için hemen form doldurun, sizi arayalım.</p>
             
             <div className="space-y-6">
                <div className="flex items-center gap-5 p-6 rounded-2xl" style={{ background: 'var(--color-surface)' }}>
                   <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white shadow-sm" style={{ color: 'var(--color-accent)' }}>
                      <Phone className="w-6 h-6" />
                   </div>
                   <div>
                      <div className="text-sm font-bold opacity-70 mb-1" style={{ color: 'var(--color-text)' }}>Telefon</div>
                      <a href={`tel:${(business as any)?.phoneClean as string}`} className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>{(business as any)?.phone as string}</a>
                   </div>
                </div>
                <div className="flex items-center gap-5 p-6 rounded-2xl" style={{ background: 'var(--color-surface)' }}>
                   <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white shadow-sm" style={{ color: 'var(--color-accent)' }}>
                      <MapPin className="w-6 h-6" />
                   </div>
                   <div>
                      <div className="text-sm font-bold opacity-70 mb-1" style={{ color: 'var(--color-text)' }}>Adres</div>
                      <div className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>{(business as any)?.address as string}</div>
                   </div>
                </div>
             </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="p-8 sm:p-10 rounded-3xl shadow-2xl" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border)' }}>
             <h3 className="text-2xl font-bold mb-8" style={{ fontFamily: 'var(--font-heading)' }}>Hızlı Form</h3>
             <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                   <input type="text" placeholder="Adınız Soyadınız" className="w-full px-5 py-4 rounded-xl font-medium focus:outline-none focus:ring-2" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-subtle)' }} />
                </div>
                <div>
                   <input type="tel" placeholder="Telefon Numaranız" className="w-full px-5 py-4 rounded-xl font-medium focus:outline-none focus:ring-2" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-subtle)' }} />
                </div>
                <div>
                   <input type="text" placeholder="Araç Bilgisi (Marka, Yıl)" className="w-full px-5 py-4 rounded-xl font-medium focus:outline-none focus:ring-2" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-subtle)' }} />
                </div>
                <button className="w-full py-4 text-lg font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
                   Gönder
                </button>
             </form>
          </motion.div>
       </div>
    </section>
  );
}

// Registry
registerSection('hero', 'split_image', OtoMekanikHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('about', 'split_left', OtoMekanikAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('stats', 'animated_row', OtoMekanikStats as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('services', 'oto_services', OtoMekanikServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('contact', 'detailed_form', OtoMekanikContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
