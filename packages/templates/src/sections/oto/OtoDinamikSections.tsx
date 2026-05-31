'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Settings, ArrowDown, Zap, Phone, Check, MapPin, PhoneCall, Image as ImageIcon } from 'lucide-react';
import type { ComponentType } from 'react';
import type { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

/* ═══════════════════════════════════════════
   Oto Dinamik — Variant-Specific Sections
   Sektor: oto | Plan: free
   ═══════════════════════════════════════════ */

const simpleFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

// ── 1. Hero (Minimal Single Column / Split Image for Free Plan) ──
export function OtoDinamikHero({ business, settings }: SectionProps<any>) {
  return (
    <section className="pt-32 pb-16 px-6" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="max-w-[1000px] mx-auto text-center">
        <motion.div initial="hidden" animate="visible" variants={simpleFade}>
          <div className="inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-wider rounded" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
            Hızlı & Güvenilir
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            {business.name}
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            {business.slogan}. Garantili işçilik, uygun fiyat.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a href="#iletisim" className="w-full sm:w-auto px-8 py-3 rounded font-bold transition-opacity hover:opacity-90" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
              {(settings as any)?.buttonText || 'Hemen Ara'}
            </a>
            <a href="#hizmetler" className="w-full sm:w-auto px-8 py-3 rounded font-bold border transition-colors hover:bg-gray-50" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
              Hizmetlerimiz
            </a>
          </div>
          
          {/* Simple Hero Image */}
          <div className="w-full aspect-[21/9] bg-gray-200 rounded-lg overflow-hidden border" style={{ borderColor: 'var(--color-border)' }}>
             <img src="https://images.unsplash.com/photo-1632734125740-1a73eece5a56?auto=format&fit=crop&q=80" alt="Oto Tamir" className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
registerSection('hero', 'oto_dinamik_hero', OtoDinamikHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 2. Services (Simple Cards) ──
export function OtoDinamikServices({ business, settings }: SectionProps<any>) {
  const iconMap: Record<string, any> = { wrench: Wrench, settings: Settings, 'arrow-down': ArrowDown, zap: Zap, phone: Phone, default: Wrench };
  
  return (
    <section id="hizmetler" className="py-20 px-6" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            {(settings as any)?.title || 'Hizmetlerimiz'}
          </h2>
          <div className="w-16 h-1 mx-auto" style={{ background: 'var(--color-accent)' }} />
        </div>
        
        <div className="grid sm:grid-cols-2 gap-6">
          {business.services?.map((h: any, i: number) => {
            const IconObj = iconMap[h.icon] || iconMap.default;
            return (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={simpleFade} className="bg-white p-6 rounded-lg border flex items-start gap-4" style={{ borderColor: 'var(--color-border)' }}>
                <div className="p-3 rounded bg-gray-50 text-[var(--color-accent)] shrink-0 border" style={{ borderColor: 'var(--color-border-subtle)' }}>
                  <IconObj className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>{typeof h === 'string' ? h : h.name}</h3>
                  {typeof h !== 'string' && h.description && (
                    <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>{h.description}</p>
                  )}
                  {typeof h !== 'string' && h.price && (
                    <div className="font-semibold text-sm" style={{ color: 'var(--color-accent)' }}>{h.price} itibariyle</div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
registerSection('services', 'oto_dinamik_services', OtoDinamikServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 3. About (Minimal Left) ──
export function OtoDinamikAbout({ business }: SectionProps<any>) {
  return (
    <section id="hakkimizda" className="py-20 px-6 border-b" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border-subtle)' }}>
      <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={simpleFade}>
          <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Hakkımızda</h2>
          <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
            {business.name}, kurulduğu {business.foundedYear} yılından bu yana dürüst tamircilik ilkesiyle hizmet vermektedir. Ustalarımız her araca kendi aracı gibi özen gösterir.
          </p>
          <ul className="space-y-3 mb-8">
            {['Garantili İşçilik', 'Hızlı Teslimat', 'Uygun Fiyatlı Yedek Parça'].map((item, i) => (
              <li key={i} className="flex items-center gap-2 font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                <Check className="w-5 h-5 text-[var(--color-accent)]" /> {item}
              </li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={simpleFade} className="w-full aspect-[4/3] bg-gray-100 rounded-lg border p-2" style={{ borderColor: 'var(--color-border)' }}>
          <img src="https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&q=80" alt="Atölye" className="w-full h-full object-cover rounded" />
        </motion.div>
      </div>
    </section>
  );
}
registerSection('about', 'oto_dinamik_about', OtoDinamikAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 4. Stats (Simple Row) ──
export function OtoDinamikStats({ business }: SectionProps<any>) {
  return (
    <section className="py-12 bg-gray-50 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: 'Yıllık Tecrübe', value: business.experience },
            { label: 'Mutlu Müşteri', value: 'Binden Fazla' },
            { label: 'Değerlendirme', value: `${business.rating} / 5` },
            { label: 'Tamir Edilen Araç', value: '4500+' }
          ].map((s, i) => (
            <div key={i}>
              <div className="text-2xl font-bold mb-1" style={{ color: 'var(--color-accent)' }}>{s.value}</div>
              <div className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
registerSection('stats', 'oto_dinamik_stats', OtoDinamikStats as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 5. Team ──
export function OtoDinamikTeam({ business }: SectionProps<any>) {
  if (!business.team || business.team.length === 0) return null;
  return (
    <section className="py-20 px-6" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Ustalarımız</h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {business.team.map((member: any, i: number) => (
            <div key={i} className="text-center p-6 border rounded-lg" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
              <h4 className="font-bold text-lg mb-1" style={{ color: 'var(--color-text)' }}>{member.name}</h4>
              <div className="text-sm font-medium text-[var(--color-accent)] mb-2">{member.role}</div>
              <p className="text-sm text-gray-500">{member.experience} Tecrübe</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
registerSection('team', 'oto_dinamik_team', OtoDinamikTeam as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 6. Gallery (Simple Grid) ──
export function OtoDinamikGallery({ business }: SectionProps<any>) {
  return (
    <section id="galeri" className="py-20 px-6 bg-gray-50 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
      <div className="max-w-[1000px] mx-auto text-center">
         <h2 className="text-2xl font-bold mb-10" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Galeri</h2>
         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
           {[1,2,3,4,5,6].map((it) => (
             <div key={it} className="aspect-square bg-gray-200 border rounded flex items-center justify-center text-gray-400 overflow-hidden" style={{ borderColor: 'var(--color-border)' }}>
                <img src={`https://images.unsplash.com/photo-${1550000000000 + it * 3}?auto=format&fit=crop&q=80&w=300`} alt="Galeri" className="w-full h-full object-cover" />
             </div>
           ))}
         </div>
      </div>
    </section>
  );
}
registerSection('gallery', 'oto_dinamik_gallery', OtoDinamikGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 7. Contact (Simple Form) ──
export function OtoDinamikContact({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-24 px-6" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-[1000px] mx-auto">
        <div className="bg-white border rounded-lg p-8 md:p-12 shadow-sm" style={{ borderColor: 'var(--color-border)' }}>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>İletişim</h2>
              <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>Ustaya direkt ulaşmak için arayın veya WhatsApp'tan yazın.</p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <PhoneCall className="w-6 h-6 text-[var(--color-accent)]" />
                  <div>
                    <div className="text-sm text-gray-500 font-medium">Telefon</div>
                    <a href={`tel:${business.phoneClean}`} className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>{business.phone}</a>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-start gap-4">
                     <MapPin className="w-6 h-6 text-[var(--color-accent)] shrink-0" />
                     <div>
                       <div className="text-sm text-gray-500 font-medium">Adres</div>
                       <div className="font-medium" style={{ color: 'var(--color-text)' }}>{business.address}</div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded border" style={{ borderColor: 'var(--color-border-subtle)' }}>
              <h4 className="font-bold text-lg mb-4 text-gray-800">Bize Yazın</h4>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input type="text" className="w-full p-3 border rounded focus:outline-none focus:border-[var(--color-accent)]" placeholder="Ad Soyad" />
                <input type="tel" className="w-full p-3 border rounded focus:outline-none focus:border-[var(--color-accent)]" placeholder="Telefon" />
                <textarea rows={3} className="w-full p-3 border rounded focus:outline-none focus:border-[var(--color-accent)]" placeholder="Aracınızdaki sorun..." />
                <button className="w-full font-bold text-white py-3 rounded" style={{ background: 'var(--color-accent)' }}>
                  Mesaj Gönder
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
registerSection('contact', 'oto_dinamik_contact', OtoDinamikContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

