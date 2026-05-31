'use client'

import React, { ComponentType, useRef } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MoveRight, Layers, Box, Maximize } from 'lucide-react'

/* ═══════════════════════════════════════════
   ARCHITECTURE: BRUTALIST-CHIC (North Star)
   Sektor: mimarlik | Plan: enterprise
   Tasarım: Massive typography, edge-to-edge portfolios, 
   monolithic layouts, technical & blueprint aesthetic.
   ═══════════════════════════════════════════ */

// ── 1. Brutalist Hero ──
export function MimarlikTasarimHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-end pt-32 pb-12" style={{ background: 'var(--color-bg)' }}>
      {/* Edge-to-edge background element */}
      <div className="absolute top-0 right-0 w-[85%] md:w-[70%] h-[75%] md:h-[85%] overflow-hidden z-0">
         <motion.img 
            initial={{ scale: 1.1, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ duration: 1.5, ease: "easeOut" as any }}
            src={business.photos?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"}
            alt="Architecture"
            className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-[2s]"
         />
      </div>

      {/* Foreground Monolithic Typography */}
      <div className="relative z-10 px-6 md:px-12 pointer-events-none w-full max-w-screen-2xl mx-auto">
         <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
            <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-bold leading-[0.85] tracking-tighter mix-blend-difference text-white uppercase break-words" style={{ fontFamily: 'var(--font-heading)' }}>
               {content?.title || business.name}
            </h1>
         </motion.div>
      </div>

      <div className="relative z-10 px-6 md:px-12 mt-12 w-full max-w-screen-2xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
         <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="max-w-md text-sm md:text-base font-medium leading-relaxed uppercase tracking-wide opacity-80" style={{ color: 'var(--color-text)' }}>
            {content?.subtitle || 'Mekansal Hacimleri Zamanın Ruhuyla Yeniden Tanımlıyoruz. Konseptten İmzaya Brutalist Estetik.'}
         </motion.p>
         
         <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} href="#portfolio" className="flex items-center gap-4 text-sm uppercase tracking-widest font-bold group pointer-events-auto" style={{ color: 'var(--color-text)' }}>
            Portfolyoyu İncele
            <span className="w-12 h-px bg-current group-hover:w-24 transition-all duration-300"></span>
            <ArrowRight className="w-4 h-4" />
         </motion.a>
      </div>
    </section>
  )
}
registerSection('hero', 'mimarlik_tasarim_hero', MimarlikTasarimHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)


// ── 2. Offset Portfolio Showcase ──
export function MimarlikTasarimPortfolio({ business, content }: SectionProps<any>) {
  const projects = [
     { id: 1, title: 'Villa K', location: 'Bodrum', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80', status: 'Tamamlandı' },
     { id: 2, title: 'Vadi Ofis', location: 'Maslak', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80', status: 'Konsept' },
     { id: 3, title: 'Zen Evi', location: 'Urla', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80', status: 'İnşa Aşamasında' }
  ];

  return (
    <section id="portfolio" className="py-32" style={{ background: 'var(--color-surface)', color: 'var(--color-text)' }}>
      <div className="px-6 md:px-12 max-w-screen-2xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 border-b pb-8" style={{ borderColor: 'var(--color-border)' }}>
           <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] mb-4 block" style={{ color: 'var(--color-accent)' }}>{content?.badge || '01 // Portfolio'}</span>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
                {content?.title || 'Seçilmiş İşler'}
              </h2>
           </div>
           <p className="text-sm font-medium uppercase tracking-wide opacity-60 max-w-xs mt-6 md:mt-0 text-right">
             Form, işleve tabi değildir; İşlev formun kalbinden doğar.
           </p>
        </div>

        <div className="space-y-32 md:space-y-48">
          {projects.map((proj, idx) => (
             <div key={proj.id} className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}>
                {/* Image Wrap */}
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1 }} className="w-full md:w-3/5 group relative overflow-hidden aspect-[4/3] bg-gray-100">
                    <img src={proj.img} alt={proj.title} className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <span className="bg-white/90 text-black px-6 py-3 font-bold text-xs uppercase tracking-widest backdrop-blur-sm">Projeyi İncele</span>
                    </div>
                </motion.div>
                
                {/* Meta Box */}
                <motion.div initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="w-full md:w-2/5 p-8 border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
                   <div className="flex gap-4 mb-12">
                      <div className="flex-1 border-t" style={{ borderColor: 'var(--color-border)' }}></div>
                      <span className="text-xs font-bold font-mono opacity-50 block -mt-2">PRJ-{proj.id.toString().padStart(3, '0')}</span>
                   </div>
                   <h3 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{proj.title}</h3>
                   
                   <ul className="space-y-4 text-xs font-mono uppercase tracking-wide opacity-80 mt-12 border-t pt-8" style={{ borderColor: 'var(--color-border-subtle)' }}>
                      <li className="flex justify-between"><span>Lokasyon:</span> <span>{proj.location}</span></li>
                      <li className="flex justify-between"><span>Durum:</span> <span>{proj.status}</span></li>
                   </ul>
                </motion.div>
             </div>
          ))}
        </div>

      </div>
    </section>
  )
}
registerSection('portfolio_grid', 'mimarlik_tasarim_portfolio', MimarlikTasarimPortfolio as unknown as ComponentType<SectionProps<Record<string, unknown>>>)


// ── 3. Architectural Process (Blueprint aesthetic) ──
export function MimarlikTasarimProcess({ content }: SectionProps<any>) {
  const steps = [
     { icon: <Layers className="w-8 h-8"/>, title: 'Analiz & Konsept', desc: 'Mekansal potansiyelin araştırılması, kullanıcı senaryoları ve leke etütleri.' },
     { icon: <Box className="w-8 h-8"/>, title: 'Tasarım Geliştirme', desc: '3D modelleme, malzeme kararları, kütle formasyonu ve detaylandırma.' },
     { icon: <Maximize className="w-8 h-8"/>, title: 'Uygulama & Teslim', desc: 'Saha denetimleri, mühendislik entegrasyonu ve milimetrik anahtar teslimi.' }
  ];

  return (
    <section className="py-32 border-y relative overflow-hidden" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
      {/* Blueprint Grid Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 49px, var(--color-text) 49px, var(--color-text) 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, var(--color-text) 49px, var(--color-text) 50px)' }}></div>
      
      <div className="px-6 md:px-12 max-w-screen-2xl mx-auto relative z-10">
         <div className="text-center mb-24">
            <span className="text-xs font-mono uppercase tracking-[0.3em] bg-[var(--color-text)] text-[var(--color-bg)] px-4 py-2 inline-block mb-8">
               {content?.badge || 'METHODOLOGY'}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
               {content?.title || 'Disiplin ve Süreç'}
            </h2>
         </div>

         <div className="grid md:grid-cols-3 gap-0 border" style={{ borderColor: 'var(--color-border)' }}>
            {steps.map((step, i) => (
               <div key={i} className={`p-12 relative ${i !== 2 ? 'md:border-r border-b md:border-b-0' : ''}`} style={{ borderColor: 'var(--color-border)' }}>
                  <div className="text-[var(--color-accent)] opacity-40 mb-12">{step.icon}</div>
                  <span className="text-sm font-mono opacity-40 block mb-4">PHASE 0{i + 1}</span>
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{step.title}</h3>
                  <p className="text-sm opacity-60 font-medium leading-relaxed">{step.desc}</p>
               </div>
            ))}
         </div>
      </div>
    </section>
  )
}
registerSection('process_steps', 'mimarlik_tasarim_process', MimarlikTasarimProcess as unknown as ComponentType<SectionProps<Record<string, unknown>>>)


// ── 4. Monolithic Contact ──
export function MimarlikTasarimContact({ business, content }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-32" style={{ background: 'var(--color-text)', color: 'var(--color-bg)' }}>
      <div className="px-6 md:px-12 max-w-screen-2xl mx-auto grid md:grid-cols-2 gap-24">
         <div>
            <h2 className="text-5xl md:text-[6rem] font-bold tracking-tighter uppercase leading-[0.9] mb-12" style={{ fontFamily: 'var(--font-heading)' }}>
               {content?.title || 'Projeni Başlat'}
            </h2>
            <div className="space-y-8 font-mono text-sm uppercase tracking-widest opacity-80">
               <div>
                  <span className="opacity-40 block mb-2">Ofis</span>
                  {business.address}
               </div>
               <div>
                  <span className="opacity-40 block mb-2">Telefon</span>
                  {business.phone}
               </div>
               <div>
                  <span className="opacity-40 block mb-2">E-Mail</span>
                  {business.email || 'hello@studio.com'}
               </div>
            </div>
         </div>

         <div className="border p-8 md:p-12" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <form className="space-y-12">
               <div className="space-y-4">
                  <label className="text-xs font-mono uppercase tracking-widest opacity-50 block">İlgilendiğiniz Proje Tipi</label>
                  <select className="w-full bg-transparent border-b outline-none pb-4 font-bold uppercase text-lg" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                     <option className="bg-black">Konut / Villa</option>
                     <option className="bg-black">Ticari / Ofis</option>
                     <option className="bg-black">İç Mekan Tasarımı</option>
                  </select>
               </div>
               
               <div className="space-y-4">
                  <label className="text-xs font-mono uppercase tracking-widest opacity-50 block">Alan Büyüklüğü</label>
                  <input type="text" placeholder="Örn: 250 m2" className="w-full bg-transparent border-b outline-none pb-4 font-bold uppercase text-lg placeholder:opacity-20" style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
               </div>

               <div className="space-y-4">
                  <label className="text-xs font-mono uppercase tracking-widest opacity-50 block">İletişim Bilgileri</label>
                  <input type="text" placeholder="İsim & Telefon" className="w-full bg-transparent border-b outline-none pb-4 font-bold uppercase text-lg placeholder:opacity-20" style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
               </div>

               <button className="w-full py-6 font-bold uppercase tracking-widest text-sm flex items-center justify-between group transition-colors" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
                  <span className="ml-6 border-b border-transparent group-hover:border-current">Talebi Gönder</span>
                  <MoveRight className="w-5 h-5 mr-6 transform group-hover:translate-x-2 transition-transform" />
               </button>
            </form>
         </div>
      </div>
    </section>
  )
}
registerSection('contact', 'mimarlik_tasarim_contact', MimarlikTasarimContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

export default {
  MimarlikTasarimHero,
  MimarlikTasarimPortfolio,
  MimarlikTasarimProcess,
  MimarlikTasarimContact
}
