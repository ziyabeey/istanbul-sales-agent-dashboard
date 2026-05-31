'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Disc, Wind, Battery, Cloud, ArrowRight, ShieldCheck, MapPin, Phone, Star, Shield, Users } from 'lucide-react';
import type { ComponentType } from 'react';
import type { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

/* ═══════════════════════════════════════════
   Oto Bakım — Variant-Specific Sections
   Sektor: oto | Plan: growth
   ═══════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ── 1. Hero ──
export function OtoBakimHero({ business, settings }: SectionProps<{ layout?: string }>) {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-24 pb-20 overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {/* Decorative Elements for Growth Plan (Parallax & Glassmorphism cues) */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--color-accent-subtle)] to-transparent pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-[var(--color-accent)] opacity-5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full relative z-10">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative z-10">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
            <ShieldCheck className="w-4 h-4" style={{ color: 'var(--color-accent)' }} /> <span className="text-sm font-medium tracking-wide">YETKİLİ BAKIM KALİTESİ</span>
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-black tracking-tight mb-6" style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}>
            {business.name}
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-lg md:text-xl mb-10 max-w-lg" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            {business.slogan}. Garantili parça, profesyonel işçilik ve şeffaf fiyatlandırma.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
            <a href="#iletisim" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all hover:-translate-y-1 shadow-lg" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)',  }}>
              {(settings as any)?.buttonText || 'Randevu Al'} <ArrowRight className="w-5 h-5" />
            </a>
            <div className="flex items-center gap-3 px-6 py-4 rounded-xl backdrop-blur-md" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border)' }}>
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <div className="font-semibold text-sm">
                <span className="block border-b mb-0.5" style={{ borderColor: 'var(--color-border)' }}>4.7 Puan</span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>890+ Yorum</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative hidden lg:block">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid var(--color-border)' }}>
             <img src="https://images.unsplash.com/photo-1619642751034-765f3775b06f?auto=format&fit=crop&q=80" alt="Oto Bakım" className="w-full h-auto object-cover" />
             {/* Glassmorphism badge */}
             <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl backdrop-blur-md bg-white/10" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
                <div className="flex items-center gap-4 text-white">
                   <div className="p-3 rounded-lg" style={{ background: 'var(--color-accent)' }}><Wrench className="w-6 h-6" /></div>
                   <div><div className="font-bold text-lg">16 Yıllık Tecrübe</div><div className="text-sm opacity-80">Uzman Kadro</div></div>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
registerSection('hero', 'oto_bakim_hero', OtoBakimHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 2. Services (3 Kolon Grid) ──
export function OtoBakimServices({ business, settings }: SectionProps<{ columns?: string }>) {
  const iconMap: Record<string, any> = { wrench: Wrench, disc: Disc, wind: Wind, battery: Battery, cloud: Cloud, default: Shield };
  
  return (
    <section id="hizmetler" className="py-24" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center md:text-left mb-16 max-w-2xl">
          <h2 className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>Hizmetlerimiz</h2>
          <h3 className="text-4xl font-extrabold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            {String(settings?.title || '') || 'Profesyonel Oto Servis Hizmetleri'}
          </h3>
          <p className="mt-4 text-lg" style={{ color: 'var(--color-text-secondary)' }}>Tüm marka ve model araçlarınız için garantili bakım ve onarım.</p>
        </div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {business.services?.map((h: any, i: number) => {
            const IconObj = iconMap[h.icon] || iconMap.default;
            return (
              <motion.div key={i} variants={fadeUp} className="group relative p-8 rounded-2xl transition-all hover:-translate-y-2 shadow-sm hover:shadow-xl" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border-subtle)' }}>
                {h.popular && (
                  <div className="absolute top-4 right-4 px-3 py-1 text-xs font-bold rounded-full" style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}>Popüler</div>
                )}
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors group-hover:bg-[var(--color-accent)]" style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}>
                  <IconObj className="w-7 h-7 group-hover:text-[var(--color-text-on-accent)] transition-colors" />
                </div>
                <h4 className="text-xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>{typeof h === 'string' ? h : h.name}</h4>
                {typeof h !== 'string' && h.description && (
                  <p className="mb-6 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{h.description}</p>
                )}
                {typeof h !== 'string' && h.price && (
                  <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                    <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{h.price}</span>
                    <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{h.duration}</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
registerSection('services', 'oto_bakim_services', OtoBakimServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 3. About (Split Left) ──
export function OtoBakimAbout({ business }: SectionProps<any>) {
  return (
    <section id="hakkimizda" className="py-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <div className="relative rounded-2xl overflow-hidden h-[500px]" style={{ border: '8px solid var(--color-surface)' }}>
            <img src={'https://images.unsplash.com/photo-1625047509168-a71c6e15ed0d?auto=format&fit=crop&q=80'} alt="Hakkımızda" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <h3 className="text-white text-3xl font-bold">{business.experience} Tecrübe</h3>
            </div>
          </div>
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <motion.div variants={fadeUp} className="text-sm font-bold tracking-widest uppercase mb-3 flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
            <ShieldCheck className="w-5 h-5" /> Hakkımızda
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl font-extrabold mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            Gelenekten Geleceğe Güvenilir Servis
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
            {business.name}, 2009 yılından bu yana otomotiv sektöründe dürüst ve şeffaf hizmet anlayışıyla faaliyet göstermektedir. Amacımız her zaman en yüksek müşteri memnuniyetini sağlamaktır.
          </motion.p>
          <motion.ul variants={fadeUp} className="space-y-4 mb-8">
            {['Orijinal Yedek Parça', 'Şeffaf Fiyatlandırma', 'Zamanında Teslimat', 'Güler Yüzlü Hizmet'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 font-medium" style={{ color: 'var(--color-text)' }}>
                <div className="p-1 rounded-full" style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}>
                  <ArrowRight className="w-4 h-4" />
                </div>
                {item}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
registerSection('about', 'oto_bakim_about', OtoBakimAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 4. Stats (Animated Row) ──
export function OtoBakimStats({ business }: SectionProps<any>) {
  return (
    <section className="py-16 relative overflow-hidden" style={{ background: 'var(--color-accent)' }}>
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Servis Yılı', value: business.experience },
            { label: 'Mutlu Müşteri', value: '10K+' },
            { label: 'Google Puanı', value: business.rating },
            { label: 'Uzman Personel', value: business.team?.length || 5 }
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="text-4xl md:text-5xl font-black mb-2" style={{ color: 'var(--color-text-on-accent)', fontFamily: 'var(--font-heading)' }}>{s.value}</div>
              <div className="text-sm md:text-base opacity-90 font-medium tracking-wide uppercase" style={{ color: 'var(--color-text-on-accent)' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
registerSection('stats', 'oto_bakim_stats', OtoBakimStats as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 5. Team ──
export function OtoBakimTeam({ business }: SectionProps<any>) {
  if (!business.team || business.team.length === 0) return null;
  return (
    <section className="py-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest uppercase mb-3 flex items-center justify-center gap-2" style={{ color: 'var(--color-accent)' }}>
            <Users className="w-5 h-5" /> Uzman Kadro
          </h2>
          <h3 className="text-4xl font-extrabold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Ekibimizle Tanışın</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {business.team.map((member: any, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl overflow-hidden p-6 text-center" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-subtle)' }}>
              <div className="w-24 h-24 mx-auto rounded-full mb-4 bg-gray-300 flex items-center justify-center font-bold text-2xl text-gray-500 overflow-hidden">
                 <img src={`https://i.pravatar.cc/150?u=${member.id}`} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>{member.name}</h4>
              <div className="text-sm font-semibold mb-2" style={{ color: 'var(--color-accent)' }}>{member.role}</div>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{member.experience} Tecrübe</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
registerSection('team', 'oto_bakim_team', OtoBakimTeam as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 6. Gallery ──
export function OtoBakimGallery({ business }: SectionProps<any>) {
  return (
    <section id="galeri" className="py-24" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-[1200px] mx-auto px-6 text-center">
         <h2 className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>Atölyemizden</h2>
         <h3 className="text-4xl font-extrabold mb-12" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>İşimizde Hassasız</h3>
         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
           {[1,2,3,4,5,6].map((it) => (
             <div key={it} className="aspect-square rounded-xl overflow-hidden bg-gray-200">
                <img src={`https://images.unsplash.com/photo-${1600000000000 + it}?auto=format&fit=crop&q=80&w=400`} alt="Galeri" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
             </div>
           ))}
         </div>
      </div>
    </section>
  );
}
registerSection('gallery', 'oto_bakim_gallery', OtoBakimGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 7. Contact (Detailed Form) ──
export function OtoBakimContact({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <h2 className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>İletişim</h2>
            <h3 className="text-4xl font-extrabold mb-8" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Bize Ulaşın</h3>
            <p className="text-lg mb-10" style={{ color: 'var(--color-text-secondary)' }}>Randevu talepleriniz veya sorularınız için hafta içi mesai saatlerinde bize ulaşabilirsiniz.</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-6 rounded-2xl" style={{ background: 'var(--color-surface)' }}>
                <div className="p-4 rounded-xl" style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}><Phone className="w-6 h-6" /></div>
                <div>
                  <div className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Telefon</div>
                  <a href={`tel:${business.phoneClean}`} className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>{business.phone}</a>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 rounded-2xl" style={{ background: 'var(--color-surface)' }}>
                <div className="p-4 rounded-xl" style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}><MapPin className="w-6 h-6" /></div>
                <div>
                  <div className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Adres</div>
                  <div className="text-lg font-medium" style={{ color: 'var(--color-text)' }}>{business.address}</div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl" style={{ border: '1px solid var(--color-border-subtle)' }}>
            <h4 className="text-2xl font-bold mb-6 text-gray-800" style={{ fontFamily: 'var(--font-heading)' }}>Randevu Formu</h4>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adınız</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" placeholder="Örn: Ahmet Yılmaz" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                   <input type="tel" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" placeholder="05XX XXX XX XX" />
                </div>
              </div>
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Araç Marka / Model</label>
                 <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" placeholder="Örn: VW Golf 2018" />
              </div>
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Mesajınız / Sorununuz</label>
                 <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]" placeholder="Araçta yaşadığınız sorun..." />
              </div>
              <button className="w-full font-bold text-white py-4 rounded-xl transition-transform hover:-translate-y-1 shadow-md hover:shadow-xl mt-2" style={{ background: 'var(--color-accent)' }}>
                Gönder
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
registerSection('contact', 'oto_bakim_contact', OtoBakimContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
