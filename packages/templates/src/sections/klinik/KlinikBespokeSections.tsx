'use client'

import React, { ComponentType, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HeartPulse, Stethoscope, Microchip, Clock, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Klinik Clean Hero ──
export function KlinikBespokeHero({ business, content }: SectionProps<any>) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative h-[95svh] w-full overflow-hidden bg-white text-slate-900 flex items-center">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 flex justify-end items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <img 
          src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2906&auto=format&fit=crop'} 
          alt="Klinik Hero" 
          className="w-1/2 h-full object-cover rounded-l-3xl shadow-2xl" 
        />
      </motion.div>

      <div className="relative z-20 w-full max-w-[var(--container-default)] mx-auto px-6 md:px-12 flex flex-col items-start pt-20">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" as any }}
          className="mb-8 inline-flex items-center gap-3 px-5 py-2 rounded-full bg-cyan-50 border border-cyan-100"
        >
          <HeartPulse className="w-4 h-4 text-cyan-600" />
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-800">
            {content?.badge || 'SAĞLIK ODAKLI YAKLAŞIM'}
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-light leading-[1.1] mb-6 max-w-3xl text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
          {content?.title || business?.name || 'Modern Tıp, İnsani Yaklaşım.'}
        </h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
          className="text-xl max-w-xl text-slate-500 font-light mb-12 leading-relaxed"
        >
          {content?.description || (business?.description as string) || 'En son teknolojiyle donatılmış kliniğimizde, uzman hekim kadromuzla sağlığınız için buradayız.'}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}
          className="px-8 py-4 bg-cyan-600 text-white rounded-full font-semibold hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-600/20"
        >
          Randevu Alın
        </motion.button>
      </div>
    </section>
  )
}
registerSection('hero', 'klinik_bespoke_hero', KlinikBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Klinik Horizontal Services ──
export function KlinikBespokeServices({ business, content }: SectionProps<any>) {
  const items = business?.services?.length ? business.services : [
    { title: 'Genel Cerrahi', desc: 'Minimal invaziv cerrahi teknikler.', icon: <Stethoscope /> },
    { title: 'İleri Teşhis', desc: 'Yüksek çözünürlüklü görüntüleme.', icon: <Microchip /> },
    { title: '7/24 Acil', desc: 'Kesintisiz sağlık hizmeti.', icon: <Clock /> },
  ];

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100 rounded-full blur-[100px] opacity-50 -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12 mb-16 relative z-10">
        <h2 className="text-4xl font-light text-slate-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          {content?.title || 'Tıbbi Birimlerimiz'}
        </h2>
        <div className="w-16 h-1 bg-cyan-600 rounded-full" />
      </div>

      <div className="flex overflow-x-auto gap-8 px-6 md:px-12 pb-16 snap-x snap-mandatory hide-scrollbar relative z-10">
        {items.map((item: any, i: number) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-50px" }} 
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="min-w-[320px] md:min-w-[400px] bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 snap-start border border-slate-100 group hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600 mb-8 group-hover:scale-110 transition-transform duration-300">
              {item.icon || <ShieldCheck />}
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">{item.title || item.name}</h3>
            <p className="text-slate-500 leading-relaxed">{item.desc || 'Alanında uzman doktorlarımızla en iyi hizmeti sunuyoruz.'}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
registerSection('services', 'klinik_bespoke_services', KlinikBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Klinik Clean About ──
export function KlinikBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="py-32 bg-white text-slate-900">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
            <div className="absolute inset-0 bg-cyan-600 rounded-3xl translate-x-4 translate-y-4 opacity-10" />
            <img 
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2940&auto=format&fit=crop" 
              alt="Klinik İçi" 
              className="relative z-10 rounded-3xl object-cover w-full aspect-[4/5] shadow-lg"
            />
          </motion.div>
          
          <div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-light leading-tight mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Modern Tıbbın Gelişimine Öncülük Ediyoruz'}
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-lg text-slate-500 mb-10 leading-relaxed font-light">
              {(business?.description as string) || 'Hasta odaklı yaklaşımımız, etik değerlere bağlılığımız ve yenilikçi tedavi yöntemlerimizle, sağlığınızı güvence altına alıyoruz. Teknolojinin tüm imkanlarını kullanarak hızlı ve kesin çözümler sunuyoruz.'}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex gap-12 border-t border-slate-100 pt-10">
              <div>
                <div className="text-4xl font-semibold text-cyan-600 mb-2">15+</div>
                <div className="text-sm font-bold tracking-widest text-slate-400 uppercase">Yıllık Güven</div>
              </div>
              <div>
                <div className="text-4xl font-semibold text-cyan-600 mb-2">50k</div>
                <div className="text-sm font-bold tracking-widest text-slate-400 uppercase">Mutlu Hasta</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'klinik_bespoke_about', KlinikBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Klinik Soft Contact ──
export function KlinikBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="py-32 bg-slate-900 text-white relative overflow-hidden rounded-t-[3rem]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl font-light mb-12" style={{ fontFamily: 'var(--font-heading)' }}>Sizi Dinlemeye Hazırız.</h2>
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400">
                  <MapPin />
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-widest mb-1 font-bold">Adres</div>
                  <div className="text-lg text-slate-200">{business?.address || 'Levent, İstanbul'}</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400">
                  <Phone />
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-widest mb-1 font-bold">Telefon</div>
                  <div className="text-lg text-slate-200">{business?.phone || '+90 212 000 00 00'}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-10 text-slate-900 shadow-2xl">
            <h3 className="text-2xl font-semibold mb-8">Hızlı Randevu Talebi</h3>
            <form className="space-y-6">
              <input type="text" placeholder="Adınız Soyadınız" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors" />
              <input type="tel" placeholder="Telefon Numaranız" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors" />
              <button className="w-full bg-cyan-600 text-white font-bold py-4 rounded-xl hover:bg-cyan-700 transition-colors">Talebi Gönder</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'klinik_bespoke_contact', KlinikBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
