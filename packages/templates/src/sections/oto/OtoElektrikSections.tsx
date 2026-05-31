'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Sun, Battery, Bell, Cable, ArrowRight, Shield, CheckCircle2, PhoneCall, MapPin, Instagram } from 'lucide-react';
import type { ComponentType } from 'react';
import type { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

/* ═══════════════════════════════════════════
   Oto Elektrik — Variant-Specific Sections
   Sektor: oto | Plan: starter
   ═══════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ── 1. Hero (Split Left with Gradient Overlay) ──
export function OtoElektrikHero({ business, settings }: SectionProps<any>) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {/* 2 Column Split Layout Background */}
      <div className="absolute inset-0 grid lg:grid-cols-2">
        <div className="bg-[var(--color-bg)] w-full h-full" />
        <div className="relative w-full h-full hidden lg:block">
           <img src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80" alt="Elektrik Donanım" className="w-full h-full object-cover" />
           {/* Starter Gradient Overlay */}
           <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)]/80 to-[var(--color-accent-hover)]/40 mix-blend-multiply" />
           <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)] via-[var(--color-bg)]/50 to-transparent" />
        </div>
      </div>
      
      <div className="max-w-[1300px] mx-auto px-6 w-full relative z-10 pt-24 pb-20">
        <div className="max-w-xl">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest mb-8" style={{ background: 'var(--color-surface)', color: 'var(--color-accent)' }}>
              <Zap className="w-4 h-4" /> Güvenli Voltaj, Kesintisiz Enerji
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-black mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              {business.name}
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg md:text-xl font-medium mb-10 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {business.slogan}. Arızalanan oto elektrik ve elektronik aksamlarınızı yenilikçi çözümlerle garantili inceliyor ve onarıyoruz.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <a href="#iletisim" className="px-8 py-4 rounded-xl font-extrabold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
                {(settings as any)?.buttonText || 'Hızlı İletişim'} <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#hizmetler" className="px-8 py-4 rounded-xl font-bold transition-colors bg-white hover:bg-gray-50 border shadow-sm" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                Neler Yapıyoruz?
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
registerSection('hero', 'oto_elektrik_hero', OtoElektrikHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 2. Services (Cards) ──
export function OtoElektrikServices({ business, settings }: SectionProps<any>) {
  const iconMap: Record<string, any> = { zap: Zap, sun: Sun, battery: Battery, bell: Bell, cable: Cable, default: Shield };
  
  return (
    <section id="hizmetler" className="py-24" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-black uppercase tracking-widest mb-4 inline-block px-3 py-1 rounded" style={{ background: 'var(--color-bg)', color: 'var(--color-accent)' }}>
             UZMANLIK ALANLARIMIZ
          </div>
          <h2 className="text-4xl font-extrabold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            Oto Elektrik & Donanım Çözümleri
          </h2>
        </div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {business.services?.map((h: any, i: number) => {
            const IconObj = iconMap[h.icon] || iconMap.default;
            return (
              <motion.div key={i} variants={fadeUp} className="p-8 rounded-2xl bg-white border hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden" style={{ borderColor: 'var(--color-border)' }}>
                {h.popular && (
                   <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Zap className="w-16 h-16" style={{ color: 'var(--color-accent)' }} />
                   </div>
                )}
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}>
                  <IconObj className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 relative z-10" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>{typeof h === 'string' ? h : h.name}</h3>
                {typeof h !== 'string' && h.description && (
                  <p className="font-medium relative z-10 mb-4" style={{ color: 'var(--color-text-secondary)' }}>{h.description}</p>
                )}
                {typeof h !== 'string' && h.price && (
                  <div className="font-black text-lg relative z-10" style={{ color: 'var(--color-accent)' }}>{h.price}</div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
registerSection('services', 'oto_elektrik_services', OtoElektrikServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 3. About (Split Left, Starter) ──
export function OtoElektrikAbout({ business }: SectionProps<any>) {
  return (
    <section id="hakkimizda" className="py-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-[1300px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <motion.div variants={fadeUp} className="text-xs font-black uppercase tracking-widest mb-4 inline-block px-3 py-1 rounded" style={{ background: 'var(--color-surface)', color: 'var(--color-accent)' }}>
             HAKKIMIZDA
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl font-extrabold mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            Araç Elektroniğinde {business.experience}lik Güven
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg leading-relaxed mb-8 font-medium" style={{ color: 'var(--color-text-secondary)' }}>
            Kurulduğumuz {business.foundedYear} yılından bu yana, gelişen araç teknolojilerini yakından takip ediyor, diagnostik cihazlarımızla arızaları net olarak tespit edip onarıyoruz. Hedefimiz uzun ömürlü, garantili çözümler yaratmaktır.
          </motion.p>
          <motion.ul variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['Garantili Onarım', 'Bilgisayarlı Diagnostik', 'Orijinal Yedek Parça', 'Hızlı Müdahale'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 font-bold text-sm" style={{ color: 'var(--color-text)' }}>
                <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--color-accent)' }} /> {item}
              </li>
            ))}
          </motion.ul>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative bg-[var(--color-surface)] rounded-3xl p-4 border" style={{ borderColor: 'var(--color-border)' }}>
          <img src="https://images.unsplash.com/photo-1635392661877-cbae12fa7b1f?auto=format&fit=crop&q=80" alt="Hakkımızda" className="w-full h-auto rounded-2xl object-cover" />
          <div className="absolute -bottom-6 -left-6 p-6 rounded-2xl bg-white shadow-xl border flex items-center gap-4" style={{ borderColor: 'var(--color-border)' }}>
             <div className="p-3 rounded-full" style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}><Battery className="w-8 h-8" /></div>
             <div>
               <div className="text-2xl font-black" style={{ color: 'var(--color-text)' }}>%100</div>
               <div className="text-sm font-bold text-[var(--color-text-secondary)] uppercase">Enerji</div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
registerSection('about', 'oto_elektrik_about', OtoElektrikAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 4. Stats (Animated Row - Starter theme accent) ──
export function OtoElektrikStats({ business }: SectionProps<any>) {
  return (
    <section className="py-20" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Sektörel Tecrübe', value: business.experience },
            { label: 'Başarılı Onarım', value: '4,500+' },
            { label: 'Google Puanı', value: `${business.rating} / 5` },
            { label: 'Uzman Teknisyen', value: business.team?.length || 3 }
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6 bg-white rounded-2xl border shadow-sm" style={{ borderColor: 'var(--color-border-subtle)' }}>
              <div className="text-4xl md:text-5xl font-black mb-3" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}>{s.value}</div>
              <div className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-secondary)' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
registerSection('stats', 'oto_elektrik_stats', OtoElektrikStats as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 5. Gallery (Masonry style Grid) ──
export function OtoElektrikGallery({ business }: SectionProps<any>) {
  return (
    <section id="galeri" className="py-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-[1300px] mx-auto px-6 text-center">
         <div className="text-xs font-black uppercase tracking-widest mb-4 inline-block px-3 py-1 rounded" style={{ background: 'var(--color-surface)', color: 'var(--color-accent)' }}>
            ATÖLYEMİZ
         </div>
         <h2 className="text-4xl font-extrabold mb-12" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Görsellerle Bizi Tanıyın</h2>
         
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {[1,2,3,4].map((it) => (
             <div key={it} className="aspect-square bg-[var(--color-surface)] rounded-xl overflow-hidden hover:opacity-90 transition-opacity">
                <img src={`https://images.unsplash.com/photo-${1550000000000 + it * 5}?auto=format&fit=crop&q=80&w=400`} alt="Galeri" className="w-full h-full object-cover" />
             </div>
           ))}
         </div>
      </div>
    </section>
  );
}
registerSection('gallery', 'oto_elektrik_gallery', OtoElektrikGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 6. Contact (Detailed form Starter theme) ──
export function OtoElektrikContact({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-24" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="bg-white rounded-[2rem] shadow-sm border p-8 md:p-12 lg:p-16 grid lg:grid-cols-2 gap-16" style={{ borderColor: 'var(--color-border)' }}>
          <div>
            <div className="text-xs font-black uppercase tracking-widest mb-4 inline-block px-3 py-1 rounded" style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}>İLETİŞİM</div>
            <h3 className="text-4xl font-extrabold mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Çekinmeden Arayın</h3>
            <p className="text-lg font-medium mb-10" style={{ color: 'var(--color-text-secondary)' }}>Oto elektrik arızası acil müdahale gerektirebilir. Bizi gün içerisinde hemen arayabilirsiniz.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-5 p-4 rounded-xl border" style={{ borderColor: 'var(--color-border-subtle)', background: 'var(--color-bg)' }}>
                <div className="p-3 rounded-lg" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}><PhoneCall className="w-6 h-6" /></div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">Telefon</div>
                  <div className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>{business.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-5 p-4 rounded-xl border" style={{ borderColor: 'var(--color-border-subtle)', background: 'var(--color-bg)' }}>
                <div className="p-3 rounded-lg" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}><MapPin className="w-6 h-6" /></div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">Adres</div>
                  <div className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>{business.address}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--color-bg)] rounded-2xl p-8 border" style={{ borderColor: 'var(--color-border-subtle)' }}>
            <h4 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Bize Yazın</h4>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wide">Ad Soyad</label>
                <input type="text" className="w-full bg-white border rounded-lg px-4 py-3 focus:outline-none focus:ring-2" style={{ borderColor: 'var(--color-border)', '--tw-ring-color': 'var(--color-accent)' } as any} placeholder="Örn: Mehmet Yıldız" />
              </div>
              <div>
                 <label className="block text-sm font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wide">Telefon / İletişim Numarası</label>
                 <input type="tel" className="w-full bg-white border rounded-lg px-4 py-3 focus:outline-none focus:ring-2" style={{ borderColor: 'var(--color-border)', '--tw-ring-color': 'var(--color-accent)' } as any} placeholder="05XX XXX XX XX" />
              </div>
              <div>
                 <label className="block text-sm font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wide">Talep / Arıza Durumu</label>
                 <textarea rows={4} className="w-full bg-white border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 resize-none" style={{ borderColor: 'var(--color-border)', '--tw-ring-color': 'var(--color-accent)' } as any} placeholder="Size nasıl yardımcı olabiliriz?" />
              </div>
              <button className="w-full py-4 rounded-lg font-extrabold uppercase tracking-widest text-sm shadow-md transition-transform hover:-translate-y-1 mt-2" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
                Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
registerSection('contact', 'oto_elektrik_contact', OtoElektrikContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 7. Fallback (Team) ──
export function OtoElektrikTeam({ business }: SectionProps<any>) { return null; }
registerSection('team', 'oto_elektrik_team', OtoElektrikTeam as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
