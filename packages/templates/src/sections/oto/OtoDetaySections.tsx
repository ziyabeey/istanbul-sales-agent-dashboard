'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Layers, Sparkles, Sun, Crown, ArrowRight, Play, CheckCircle2, Instagram, PhoneCall, MapPin } from 'lucide-react';
import type { ComponentType } from 'react';
import type { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

/* ═══════════════════════════════════════════
   Oto Detay — Variant-Specific Sections
   Sektor: oto | Plan: enterprise
   ═══════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// ── 1. Hero (Fullscreen Overlay, 3D Parallax cue) ──
export function OtoDetayHero({ business, settings }: SectionProps<any>) {
  return (
    <section className="relative min-h-[100vh] flex flex-col justify-end pb-24 lg:pb-32 overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      {/* Background Image full viewport with dark gradient overlay for enterprise look */}
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1600742125719-7558ec4486fb?auto=format&fit=crop&q=80')] bg-cover bg-center bg-no-repeat bg-fixed scale-105" style={{ filter: 'brightness(0.6)' }} />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/80 to-transparent" />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full relative z-10">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl">
          <motion.div variants={fadeUp} className="mb-6 flex items-center gap-4">
             <div className="h-px bg-[var(--color-accent)] w-12" />
             <span className="uppercase tracking-widest text-xs font-bold" style={{ color: 'var(--color-accent)' }}>PREMIUM CAR CARE</span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-normal leading-none mb-8" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            {business.name.split(' ')[0]} <br/> <span className="italic font-light text-[var(--color-text-secondary)]">{business.name.split(' ').slice(1).join(' ')}</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-xl md:text-3xl font-light mb-12 max-w-2xl leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            {business.slogan}. Kusursuz yansıma, kalıcı koruma.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-6">
            <a href="#iletisim" className="group flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 bg-[var(--color-accent)] text-[var(--color-text-on-accent)] font-semibold uppercase tracking-widest text-sm transition-all hover:bg-[var(--color-accent-hover)]">
              {(settings as any)?.buttonText || 'Randevu Talep Et'} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#hizmetler" className="flex items-center gap-4 group cursor-pointer text-white">
               <div className="w-14 h-14 rounded-full border border-[var(--color-border)] flex items-center justify-center transition-all group-hover:border-[var(--color-accent)]">
                 <Play className="w-4 h-4 ml-1 text-[var(--color-accent)]" />
               </div>
               <span className="uppercase tracking-widest text-xs font-bold transition-colors group-hover:text-[var(--color-accent)]">Hizmetleri Keşfet</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
registerSection('hero', 'oto_detay_hero', OtoDetayHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 2. Services (Price Grid) ──
export function OtoDetayServices({ business, settings }: SectionProps<any>) {
  const iconMap: Record<string, any> = { shield: Shield, layers: Layers, sparkles: Sparkles, sun: Sun, crown: Crown, default: Crown };
  
  return (
    <section id="hizmetler" className="py-32" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="mb-20 text-center max-w-3xl mx-auto">
          <motion.div variants={fadeUp} className="text-xs uppercase tracking-widest font-bold mb-4" style={{ color: 'var(--color-accent)' }}>VIP DETAILING</motion.div>
          <motion.h2 variants={fadeUp} className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            Hizmet Ağımız
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>En yüksek kalitedeki butik detailing hizmetlerimizle aracınızın değerini koruyoruz.</motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid lg:grid-cols-2 lg:gap-8 gap-y-12">
           {business.services?.map((h: any, i: number) => {
             const IconObj = iconMap[h.icon] || iconMap.default;
             return (
               <motion.div key={i} variants={fadeUp} className="group flex flex-col sm:flex-row gap-8 p-10 hover:bg-[var(--color-surface)] transition-all duration-500 border border-transparent hover:border-[var(--color-border)]" style={{ background: i === 0 ? 'var(--color-surface)' : 'transparent', border: i===0 ? '1px solid var(--color-border)' : '1px solid transparent' }}>
                 <div className="shrink-0 w-20 h-20 bg-[var(--color-surface-elevated)] flex items-center justify-center border border-[var(--color-border-subtle)]">
                   <IconObj className="w-8 h-8 text-[var(--color-accent)]" />
                 </div>
                 <div className="flex-1">
                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                     <h3 className="text-2xl" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{typeof h === 'string' ? h : h.name}</h3>
                     {typeof h !== 'string' && h.price && (
                       <div className="text-[var(--color-accent)] font-semibold text-xl">{h.price}</div>
                     )}
                   </div>
                   <div className="h-px bg-[var(--color-border-subtle)] w-full mb-4" />
                   {typeof h !== 'string' && h.description && (
                     <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>{h.description}</p>
                   )}
                   <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full" />
                      <span className="text-xs uppercase tracking-widest font-bold" style={{ color: 'var(--color-text-muted)' }}>SÜRE: {h.duration || 'Belirsiz'}</span>
                   </div>
                 </div>
               </motion.div>
             );
           })}
        </motion.div>
      </div>
    </section>
  );
}
registerSection('services', 'oto_detay_services', OtoDetayServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 3. About (Story format) ──
export function OtoDetayAbout({ business }: SectionProps<any>) {
  return (
    <section id="hakkimizda" className="py-32 border-y" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-16 items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="lg:col-span-5 order-2 lg:order-1">
          <motion.div variants={fadeUp} className="text-xs uppercase tracking-widest font-bold mb-4" style={{ color: 'var(--color-accent)' }}>ZANAAT & TUTKU</motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl mb-8 leading-snug" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            Mükemmelliyetçi Yaklaşım
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg leading-relaxed mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            {business.name}, süper otomobillerden klasiklere kadar geniş bir vizyonla, üstün araç bakım ve koruma hizmetleri sunan bir detailing atölyesidir. Yalnızca dünyanın en seçkin kimyasallarını kullanıyor, her araca ustalıkla dokunuyoruz.
          </motion.p>
          <motion.ul variants={fadeUp} className="space-y-4 mb-10">
            {['Master Derece Sertifikalı Personel', 'Tozsuz Kapalı Kabin Ortamı', 'XPEL & GTechniq Yetkili Bayi', 'VIP Concierge ve Teslimat'].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-sm uppercase tracking-wider font-semibold" style={{ color: 'var(--color-text)' }}>
                 <CheckCircle2 className="w-5 h-5 text-[var(--color-accent)]" /> {item}
              </li>
            ))}
          </motion.ul>
          <motion.div variants={fadeUp}>
             <img src="/placeholder.jpg" alt="Signature" className="h-12 opacity-50 grayscale contrast-200" style={{ filter: 'invert(1)' }} />
             <div className="mt-2 text-xs tracking-widest text-[var(--color-text-muted)] uppercase">Kurucu, {business.ownerName}</div>
          </motion.div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="lg:col-span-7 order-1 lg:order-2 grid grid-cols-2 gap-4 h-[600px]">
           <img src="https://images.unsplash.com/photo-1618844895089-913a17e0e7a1?auto=format&fit=crop&q=80" alt="Detail 1" className="w-full h-full object-cover" />
           <img src="https://images.unsplash.com/photo-1629828628205-0814bbce0d65?auto=format&fit=crop&q=80" alt="Detail 2" className="w-full h-full object-cover mt-12" />
        </motion.div>
      </div>
    </section>
  );
}
registerSection('about', 'oto_detay_about', OtoDetayAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 4. Stats (Minimal Enterprise Row) ──
export function OtoDetayStats({ business }: SectionProps<any>) {
  return (
    <section className="py-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 border-t border-b py-16" style={{ borderColor: 'var(--color-border)' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left divide-x divide-transparent md:divide-[var(--color-border)]">
          {[
            { label: 'Deneyim', value: `${business.experience}` },
            { label: 'Bitirilen Proje', value: '3,400+' },
            { label: 'Müşteri Memnuniyeti', value: `${business.rating}/5.0` },
            { label: 'Global Marka Partneri', value: '4' }
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="md:px-8 first:px-0">
              <div className="text-4xl md:text-5xl mb-4" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>{s.value}</div>
              <div className="text-xs tracking-widest uppercase font-bold" style={{ color: 'var(--color-text-secondary)' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
registerSection('stats', 'oto_detay_stats', OtoDetayStats as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 5. Gallery (Workshop Photos - Fullwidth) ──
export function OtoDetayGallery({ business }: SectionProps<any>) {
  return (
    <section id="galeri" className="py-0 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full">
         {[1,2,3,4].map((it) => (
           <div key={it} className="aspect-square relative group overflow-hidden bg-[var(--color-surface)]">
              <img src={`https://images.unsplash.com/photo-${1600000000000 + it * 2}?auto=format&fit=crop&q=80&w=600`} alt="Galeri" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
           </div>
         ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-[var(--color-bg)]/80 backdrop-blur-md px-10 py-6 border" style={{ borderColor: 'var(--color-border)' }}>
          <div className="text-3xl" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Follow @{business.name.replace(' ', '').toLowerCase()}</div>
        </div>
      </div>
    </section>
  );
}
registerSection('gallery', 'oto_detay_gallery', OtoDetayGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 6. Contact (Ultra Minimal Form) ──
export function OtoDetayContact({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-32" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="lg:col-span-5">
            <h2 className="text-5xl md:text-6xl mb-10" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Bize Ulaşın</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                 <MapPin className="w-6 h-6 mt-1 text-[var(--color-accent)] shrink-0" />
                 <div>
                   <div className="text-[var(--color-text-secondary)] text-sm uppercase tracking-widest font-bold mb-2">Adres</div>
                   <div className="text-lg" style={{ color: 'var(--color-text)' }}>{business.address}</div>
                 </div>
              </div>
              <div className="h-px bg-[var(--color-border)] w-full" />
              <div className="flex items-start gap-4">
                 <PhoneCall className="w-6 h-6 mt-1 text-[var(--color-accent)] shrink-0" />
                 <div>
                   <div className="text-[var(--color-text-secondary)] text-sm uppercase tracking-widest font-bold mb-2">Telefon & WhatsApp</div>
                   <a href={`tel:${business.phoneClean}`} className="text-2xl font-light hover:text-[var(--color-accent)] transition-colors" style={{ color: 'var(--color-text)' }}>{business.phone}</a>
                 </div>
              </div>
              <div className="h-px bg-[var(--color-border)] w-full" />
              <div className="pt-2 flex gap-4">
                <a href={business.socialMedia?.instagram || '#'} className="w-12 h-12 flex items-center justify-center border hover:bg-[var(--color-surface)] transition-colors" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}><Instagram className="w-5 h-5" /></a>
              </div>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:col-span-7 bg-[var(--color-surface)] p-10 md:p-14 border" style={{ borderColor: 'var(--color-border)' }}>
            <div className="text-xl mb-10 font-light" style={{ color: 'var(--color-text)' }}>Lütfen randevu talebinizi veya aracınızla ilgili beklentilerinizi iletin. Müşteri temsilcimiz en kısa sürede dönüş yapacaktır.</div>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input type="text" className="w-full bg-transparent border-b px-0 py-4 focus:outline-none focus:border-[var(--color-accent)] transition-colors text-lg" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Ad Soyad" />
                </div>
                <div>
                   <input type="tel" className="w-full bg-transparent border-b px-0 py-4 focus:outline-none focus:border-[var(--color-accent)] transition-colors text-lg" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Telefon Numarası" />
                </div>
              </div>
              <div>
                 <input type="text" className="w-full bg-transparent border-b px-0 py-4 focus:outline-none focus:border-[var(--color-accent)] transition-colors text-lg" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Araç Marka / Model ve Yıl" />
              </div>
              <div>
                 <textarea rows={3} className="w-full bg-transparent border-b px-0 py-4 focus:outline-none focus:border-[var(--color-accent)] transition-colors text-lg resize-none" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }} placeholder="Hangi işlemlerle ilgileniyorsunuz?" />
              </div>
              <button className="flex items-center justify-between w-full mt-8 px-8 py-5 group transition-colors" style={{ background: 'var(--color-text)', color: 'var(--color-bg)' }}>
                <span className="uppercase tracking-widest text-sm font-bold">Talebi Gönder</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
registerSection('contact', 'oto_detay_contact', OtoDetayContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 7. Fallback required by structure (Team) ──
export function OtoDetayTeam({ business }: SectionProps<any>) { return null; }
registerSection('team', 'oto_detay_team', OtoDetayTeam as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
