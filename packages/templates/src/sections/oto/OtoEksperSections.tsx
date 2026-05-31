'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Scan, Layers, Cpu, Calculator, Shield, ArrowRight, CheckCircle2, FileText, Check, Phone, MapPin, Search } from 'lucide-react';
import type { ComponentType } from 'react';
import type { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

/* ═══════════════════════════════════════════
   Oto Ekspertiz — Variant-Specific Sections
   Sektor: oto | Plan: pro
   ═══════════════════════════════════════════ */

const fadeUpText = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ── 1. Hero (Asymmetric Split, Data-Driven Vibe) ──
export function OtoEksperHero({ business, settings }: SectionProps<any>) {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {/* Dynamic tech-grid background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(var(--color-accent) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-[1300px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-10">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="lg:col-span-6 relative z-10">
          <motion.div variants={fadeUpText} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest mb-8 shadow-sm" style={{ background: 'var(--color-surface)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}>
            <Scan className="w-4 h-4" /> 180 Nokta Detaylı Kontrol
          </motion.div>
          
          <motion.h1 variants={fadeUpText} className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1]" style={{ fontFamily: 'var(--font-heading)' }}>
            <span className="text-[var(--color-text-secondary)]">Güvenilir</span><br/>
            Ekspertiz Raporu.
          </motion.h1>
          
          <motion.p variants={fadeUpText} className="text-lg md:text-xl font-medium mb-10 max-w-lg" style={{ color: 'var(--color-text-secondary)' }}>
            {business.slogan}. İkinci el araç alırken riske girmeyin, profesyonel cihazlarımızla aracı biz inceleyelim.
          </motion.p>
          
          <motion.div variants={fadeUpText} className="flex flex-col sm:flex-row items-center gap-4">
            <a href="#iletisim" className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
              <span className="relative z-10 flex items-center gap-2">{(settings as any)?.buttonText || 'Randevu Oluştur'} <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" /></span>
              <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform" />
            </a>
            <div className="flex items-center gap-4 text-sm font-bold" style={{ color: 'var(--color-text-secondary)' }}>
              <div className="flex -space-x-3">
                 {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" />)}
              </div>
              <div>
                <span style={{ color: 'var(--color-text)' }}>{business.reviewCount}+ Mutlu Danışan</span>
                <span className="flex items-center text-yellow-500 mt-0.5"><StarIcon /> 4.8/5.0 Puan</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Asymmetric Pro Image Layout */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-6 relative">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid var(--color-border)' }}>
             <img src="https://images.unsplash.com/photo-1627513725547-5a1e2ec230b0?auto=format&fit=crop&q=80" alt="Ekspertiz" className="w-full h-auto object-cover" />
          </div>
          {/* Data Floating Card */}
          <div className="absolute -bottom-10 -left-10 z-20 p-6 rounded-2xl shadow-xl backdrop-blur-xl hidden md:block" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
            <div className="flex items-center gap-4 mb-4">
               <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}><Cpu className="w-6 h-6" /></div>
               <div><div className="font-bold text-lg">OBD Beyin Tarama</div><div className="text-xs font-bold uppercase" style={{ color: 'var(--color-text-secondary)' }}>Kusursuz Analiz</div></div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-1"><div className="bg-[var(--color-accent)] h-2 rounded-full" style={{ width: '100%' }} /></div>
            <div className="text-right text-xs font-bold text-[var(--color-accent)]">Taramalar Temiz</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
function StarIcon() { return <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> }
registerSection('hero', 'oto_eksper_hero', OtoEksperHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 2. Services (Data list with prices) ──
export function OtoEksperServices({ business, settings }: SectionProps<any>) {
  const iconMap: Record<string, any> = { scan: Scan, layers: Layers, cpu: Cpu, calculator: Calculator, shield: Shield, default: Search };
  
  return (
    <section id="hizmetler" className="py-24" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-[1300px] mx-auto px-6 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="sticky top-32">
            <motion.h2 variants={fadeUpText} className="text-4xl md:text-5xl font-extrabold mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
              Rapor Paketleri
            </motion.h2>
            <motion.p variants={fadeUpText} className="text-lg mb-8" style={{ color: 'var(--color-text-secondary)' }}>
              Aracınızı kapsamlı şekilde inceliyor ve tüm detayları şeffaf bir Rapor ile size sunuyoruz. Tercihiniz doğrultusunda paket seçimi yapabilirsiniz.
            </motion.p>
            <motion.a variants={fadeUpText} href="#iletisim" className="inline-flex flex-col p-6 rounded-2xl w-full" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
               <span className="text-sm font-bold opacity-80 uppercase tracking-widest mb-1">SORUN MU VAR?</span>
               <span className="text-xl font-bold flex items-center justify-between">Bize Yazın <ArrowRight className="w-5 h-5" /></span>
            </motion.a>
          </motion.div>
        </div>
        
        <div className="lg:col-span-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-4">
            {business.services?.map((h: any, i: number) => {
              const IconObj = iconMap[h.icon] || iconMap.default;
              return (
                <motion.div key={i} variants={fadeUpText} className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 md:p-8 rounded-2xl transition-all hover:translate-y-[-4px] shadow-sm hover:shadow-xl" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border-subtle)' }}>
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--color-surface)', color: 'var(--color-accent)' }}>
                    <IconObj className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                       <h3 className="text-2xl font-bold" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>{typeof h === 'string' ? h : h.name}</h3>
                       {typeof h !== 'string' && h.price && (
                         <div className="text-xl font-black" style={{ color: 'var(--color-text)' }}>{h.price}</div>
                       )}
                    </div>
                    {typeof h !== 'string' && h.description && (
                      <p className="text-[var(--color-text-secondary)] font-medium">{h.description}</p>
                    )}
                  </div>
                  {h.popular && (
                    <div className="hidden md:block shrink-0 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-widest" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
                      EN ÇOK TERCİH EDİLEN
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
registerSection('services', 'oto_eksper_services', OtoEksperServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 3. About (Data-focused Split) ──
export function OtoEksperAbout({ business }: SectionProps<any>) {
  return (
    <section id="hakkimizda" className="py-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-[1300px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="order-2 md:order-1">
          <motion.div variants={fadeUpText} className="text-sm font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--color-accent)' }}>HAKKIMIZDA</motion.div>
          <motion.h2 variants={fadeUpText} className="text-4xl md:text-5xl font-extrabold mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            Ekspertizde Yeni Standart
          </motion.h2>
          <motion.p variants={fadeUpText} className="text-lg leading-relaxed mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            Firmamız {business.foundedYear} yılından bu yana {business.experience}lik bilgi birikimiyle ikinci el araç alım satımında bağımsız, tarafsız ve güvenilir ekspertiz hizmetleri vermektedir. En son teknoloji makine parkurumuz ve TSE belgeli uzmanlarımızla yanınızdayız.
          </motion.p>
          <motion.div variants={fadeUpText} className="grid grid-cols-2 gap-6">
            {['TSE Belgeli Kurum', 'Son Teknoloji Cihazlar', 'Bağımsız & Tarafsız', 'Garantili Raporlama'].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 shrink-0" style={{ color: 'var(--color-accent)' }} />
                <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{item}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="order-1 md:order-2 relative bg-gray-100 rounded-3xl overflow-hidden aspect-[4/5] md:aspect-auto md:h-[600px] border" style={{ borderColor: 'var(--color-border)' }}>
          <img src="https://images.unsplash.com/photo-1549694503-68e367856cbf?auto=format&fit=crop&q=80" alt="Hakkımızda" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
             <div>
               <div className="text-white text-3xl font-bold mb-2">+{business.rating} Puan Ortalaması</div>
               <div className="text-white/80 font-medium tracking-wide text-lg">Müşteri Memnuniyeti Odaklı Hizmet</div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
registerSection('about', 'oto_eksper_about', OtoEksperAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 4. Stats (Pro row) ──
export function OtoEksperStats({ business }: SectionProps<any>) {
  return (
    <section className="py-20" style={{ background: 'var(--color-text)' }}>
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-700">
          {[
            { label: 'Yıllık Sektör Deneyimi', value: business.experience },
            { label: 'Ekspertiz Yapılan Araç', value: '15.000+' },
            { label: 'Müşteri Memnuniyeti', value: `${business.rating}/5.0` },
            { label: 'Şube Sayısı', value: '1 Merkez' }
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center px-4">
              <div className="text-4xl md:text-5xl font-black mb-3" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}>{s.value}</div>
              <div className="text-sm tracking-widest uppercase font-bold text-gray-400">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
registerSection('stats', 'oto_eksper_stats', OtoEksperStats as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 5. Gallery (Masonry style Grid) ──
export function OtoEksperGallery({ business }: SectionProps<any>) {
  return (
    <section id="galeri" className="py-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-[1300px] mx-auto px-6">
         <div className="text-center mb-16">
           <h2 className="text-sm font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--color-accent)' }}>GALERİ</h2>
           <h3 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Şeffaf Süreç Temsili</h3>
         </div>
         <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
           {[1,2,3,4,5,6].map((it) => (
             <motion.div key={it} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="break-inside-avoid rounded-2xl overflow-hidden border bg-gray-100" style={{ borderColor: 'var(--color-border)' }}>
                <img src={`https://images.unsplash.com/photo-${1590000000000 + it * 4}?auto=format&fit=crop&q=80&w=500`} alt="Galeri" className="w-full h-auto hover:scale-105 transition-transform duration-500" />
             </motion.div>
           ))}
         </div>
      </div>
    </section>
  );
}
registerSection('gallery', 'oto_eksper_gallery', OtoEksperGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 6. Contact (Pro Contrast form) ──
export function OtoEksperContact({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-24" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="bg-white rounded-[2rem] shadow-xl border overflow-hidden flex flex-col lg:flex-row" style={{ borderColor: 'var(--color-border)' }}>
          <div className="lg:w-2/5 p-10 md:p-14" style={{ background: 'var(--color-text)', color: 'var(--color-text-on-accent)' }}>
             <h3 className="text-4xl font-extrabold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Randevu Alın</h3>
             <p className="text-gray-400 font-medium mb-12">Aracınızı getirmeden önce randevu alarak bekleme süresini sıfıra indirin. İletişim numaralarımızdan veya formu doldurarak bize hemen ulaşabilirsiniz.</p>
             
             <div className="space-y-8">
               <div className="flex items-start gap-5">
                 <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.1)' }}><Phone className="w-6 h-6 text-white" /></div>
                 <div>
                   <div className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Telefon</div>
                   <div className="text-2xl font-bold">{business.phone}</div>
                 </div>
               </div>
               <div className="flex items-start gap-5">
                 <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.1)' }}><MapPin className="w-6 h-6 text-white" /></div>
                 <div>
                   <div className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Adres</div>
                   <div className="text-lg font-medium leading-relaxed">{business.address}</div>
                 </div>
               </div>
             </div>
          </div>
          
          <div className="lg:w-3/5 p-10 md:p-14 bg-white">
            <h4 className="text-2xl font-bold mb-8 text-gray-800" style={{ fontFamily: 'var(--font-heading)' }}>Hızlı Randevu Formu</h4>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Ad Soyad</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:border-transparent transition-all" style={{ '--tw-ring-color': 'var(--color-accent)' } as any} placeholder="Ahmet Kaya" />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Telefon</label>
                   <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:border-transparent transition-all" style={{ '--tw-ring-color': 'var(--color-accent)' } as any} placeholder="05XX XXX XX XX" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Araç Markası / Model</label>
                   <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:border-transparent transition-all" style={{ '--tw-ring-color': 'var(--color-accent)' } as any} placeholder="VW Golf 2019 vb." />
                </div>
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Tarih Seçimi</label>
                   <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:border-transparent transition-all" style={{ '--tw-ring-color': 'var(--color-accent)' } as any} />
                </div>
              </div>
              <button className="w-full flex justify-center py-5 rounded-xl font-bold uppercase tracking-widest transition-transform hover:-translate-y-1 shadow-md hover:shadow-xl mt-4" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
                Randevu Talebini İlet
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
registerSection('contact', 'oto_eksper_contact', OtoEksperContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

// ── 7. Team (Fallback) ──
export function OtoEksperTeam({ business }: SectionProps<any>) { return null; }
registerSection('team', 'oto_eksper_team', OtoEksperTeam as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

