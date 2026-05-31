'use client'

import React, { ComponentType } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CircleCheck, Sparkles, MapPin, Phone, ArrowUpRight, ShieldCheck, Asterisk } from 'lucide-react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

/* ═══════════════════════════════════════════
   TIER 1 — MASTERCLASS ASYMMETRIC ENGINE
   Tasarım: Dark mode dominant, brutalist-neon accents, offset grids, huge typography.
   Animasyon: Parallax scroll, reveal clipping, text masking.
   Veri: Aktif business.photos ve business.services entegrasyonu.
   ═══════════════════════════════════════════ */

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const textReveal = {
  hidden: { y: '100%', opacity: 0 },
  visible: { y: '0%', opacity: 1, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] as [number,number,number,number] } }
};

export function Tier1AsymmetricHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[100vh] flex items-center pt-32 pb-20 overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {/* Abstract Glowing Orb Background */}
      <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full blur-[120px] opacity-20 animate-pulse pointer-events-none mix-blend-screen" 
        style={{ background: 'var(--color-accent)' }} />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[var(--color-bg)] to-transparent z-[1]" />

      <div className="container relative z-10 px-6 mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-center">
        
        {/* Left Typography Block */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col">
          {content?.badge && (
            <motion.div variants={textReveal} className="overflow-hidden mb-8">
              <span className="inline-flex items-center gap-3 px-6 py-2 rounded-full text-xs font-bold tracking-[0.3em] uppercase border"
                style={{ color: 'var(--color-accent)', borderColor: 'var(--color-accent)', background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)' }}>
                <Asterisk className="w-4 h-4 animate-spin-slow" /> {content.badge}
              </span>
            </motion.div>
          )}
          
          <div className="overflow-hidden mb-6">
            <motion.h1 variants={textReveal} className="text-6xl md:text-8xl lg:text-[7rem] font-bold uppercase tracking-tighter leading-[0.85]" 
              style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || business?.name}
            </motion.h1>
          </div>
          
          <motion.p variants={textReveal} className="text-xl md:text-2xl mt-6 lg:ml-12 border-l-4 pl-6 max-w-xl font-light leading-relaxed" 
            style={{ color: 'var(--color-text-secondary)', borderColor: 'var(--color-accent)' }}>
            {content?.subtitle || business?.slogan || `${business?.sector || 'Endüstri'} sektöründe profesyonel ve güvenilir hizmet.`}
          </motion.p>

          <motion.div variants={textReveal} className="mt-16 flex flex-col sm:flex-row items-start gap-6 lg:ml-12">
            <a href={(content?.cta1 as any)?.href || '#iletisim'} className="group flex items-center gap-4 px-10 py-5 rounded-full font-bold uppercase tracking-[0.1em] text-sm transition-all sm:w-auto w-full justify-between"
              style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
              {(content?.cta1 as any)?.text || 'Hemen İletişime Geç'}
              <span className="bg-[var(--color-bg)] text-[var(--color-text)] p-2 rounded-full group-hover:bg-[var(--color-text)] group-hover:text-[var(--color-bg)] transition-colors">
                 <ArrowUpRight className="w-4 h-4" />
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Asymmetric Image Stack */}
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }} className="relative hidden lg:block h-[600px]">
           <div className="absolute top-0 right-0 w-4/5 h-[80%] rounded-3xl overflow-hidden border" style={{ borderColor: 'var(--color-border)' }}>
             <div className="absolute inset-0 bg-black/20 z-10" />
             <img src={business?.photos?.[0] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80"} alt="Vizyon 1" className="w-full h-full object-cover scale-105" />
           </div>
           <motion.div 
             initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.6 }}
             className="absolute bottom-0 left-0 w-2/3 h-1/2 rounded-3xl overflow-hidden shadow-2xl border-4" 
             style={{ borderColor: 'var(--color-bg)' }}>
             <img src={business?.photos?.[1] || "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80"} alt="Vizyon 2" className="w-full h-full object-cover" />
           </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
registerSection('hero', 'tier1_asymmetric_hero', Tier1AsymmetricHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

export function Tier1AsymmetricAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="py-32 relative" style={{ background: 'var(--color-surface)', color: 'var(--color-text)' }}>
      <div className="container mx-auto px-6 grid lg:grid-cols-[1fr_1.2fr] gap-20 items-center">
        
        {/* Abstract Image Concept */}
        <div className="relative group">
          <div className="aspect-[4/5] overflow-hidden rounded-[2rem]">
            <img src={business?.photos?.[0] || "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80"} alt="About" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale hover:grayscale-0" />
          </div>
          {/* Floating HUD Element */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="absolute -bottom-8 -right-8 p-8 rounded-3xl border shadow-2xl backdrop-blur-xl"
            style={{ background: 'color-mix(in srgb, var(--color-bg) 90%, transparent)', borderColor: 'var(--color-border)' }}>
            <ShieldCheck className="w-10 h-10 mb-4" style={{ color: 'var(--color-accent)' }} />
            <h4 className="text-2xl font-bold font-heading uppercase">Güvenilir<br/>Hizmet</h4>
            <p className="text-sm mt-2 opacity-70">Kalite Garantisi</p>
          </motion.div>
        </div>

        {/* Content */}
        <div>
          <h4 className="text-sm font-bold tracking-[0.2em] uppercase mb-6" style={{ color: 'var(--color-accent)' }}>Rakamlarla</h4>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || 'Hakkımızda'}
          </h2>
          <p className="text-xl md:text-2xl font-light leading-relaxed mb-12" style={{ color: 'var(--color-text-secondary)' }}>
            {content?.description || `${business?.experience || '10+ Yıl'} yıllık tecrübemizle müşteri memnuniyetini en ön planda tutarak kaliteli hizmet sunmaya devam ediyoruz.`}
          </p>
          
          <div className="grid grid-cols-2 gap-8 border-t pt-8" style={{ borderColor: 'var(--color-border)' }}>
            <div>
              <div className="text-6xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{business?.rating || '4.9'}</div>
              <div className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-accent)' }}>Memnuniyet</div>
            </div>
            <div>
              <div className="text-6xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{business?.experience || '10+'}</div>
              <div className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-accent)' }}>Yıl Deneyim</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
registerSection('about', 'tier1_asymmetric_about', Tier1AsymmetricAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

export function Tier1AsymmetricServices({ business, content }: SectionProps<any>) {
  const defaultServices = [
    { name: 'Temel Hizmet', description: 'Güvenilir ve profesyonel çözümler', price: 'Teklif Alın' },
    { name: 'Premium Hizmet', description: 'Detaylı ve özenli hizmet anlayışı', price: 'Teklif Alın' },
    { name: 'Özel Çözüm', description: 'İhtiyacınıza özel kişisel hizmet', price: 'Teklif Alın' },
  ];
  const hizmetler = business?.services?.length ? business.services.slice(0, 5) : defaultServices;

  return (
    <section id="hizmetler" className="py-32 overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      <div className="container mx-auto px-6">
        
        {/* Header Asymmetric Aligned Right */}
        <div className="flex flex-col md:items-end text-left md:text-right mb-24">
          <span className="text-sm font-bold tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--color-accent)' }}>
            {content?.badge || 'HİZMETLERİMİZ'}
          </span>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            {content?.title || 'Hizmetlerimiz'}
          </h2>
        </div>
        
        {/* Staggered Vertical List (Asymmetric) */}
        <div className="flex flex-col space-y-4">
          {hizmetler.map((h: any, i: number) => {
            if (typeof h === 'string') return null;
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative flex flex-col md:flex-row md:items-center justify-between p-8 md:p-12 border-b transition-colors hover:bg-[var(--color-surface)]"
                style={{ borderColor: 'var(--color-border)' }}>
                
                <div className="flex items-center gap-8 md:gap-12 w-full md:w-3/5">
                  <span className="text-2xl md:text-4xl font-light opacity-30" style={{ fontFamily: 'var(--font-heading)' }}>0{i+1}</span>
                  <div>
                    <h3 className="text-2xl md:text-4xl font-bold uppercase tracking-tight mb-2 group-hover:text-[var(--color-accent)] transition-colors" 
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                      {h.name}
                    </h3>
                    {h.description && (
                      <p className="text-base md:text-lg opacity-70 max-w-md" style={{ color: 'var(--color-text-secondary)' }}>
                        {h.description}
                      </p>
                    )}
                  </div>
                </div>

                {h.price && (
                  <div className="mt-6 md:mt-0 lg:w-1/5 text-left md:text-right">
                    <span className="text-sm font-bold uppercase tracking-widest block opacity-50 mb-1">Başlangıç</span>
                    <span className="text-xl md:text-3xl font-bold" style={{ color: 'var(--color-text)' }}>{h.price}</span>
                  </div>
                )}
                
                <div className="hidden lg:flex w-16 h-16 rounded-full border items-center justify-center -rotate-45 group-hover:rotate-0 transition-all duration-500 group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)]"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                  <ArrowUpRight className="w-8 h-8 group-hover:text-[var(--color-text-on-accent)]" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'tier1_asymmetric_services', Tier1AsymmetricServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

export function Tier1AsymmetricContact({ business, content }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-0 relative" style={{ background: 'var(--color-bg)' }}>
      {/* Huge Borderless Form + Contact Split */}
      <div className="grid lg:grid-cols-2">
        {/* Information Panel (Dark/Accent Theme) */}
        <div className="py-24 px-8 md:px-16 lg:px-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r" 
          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-16" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            {content?.title || 'Bize Ulaşın'}
          </h2>
          
          <div className="space-y-12">
            <div className="group">
              <div className="text-xs font-bold uppercase tracking-[0.2em] mb-3 opacity-60 flex items-center gap-2" style={{ color: 'var(--color-text-secondary)' }}>
                <MapPin className="w-4 h-4" /> Adres
              </div>
              <p className="text-2xl md:text-3xl font-light" style={{ color: 'var(--color-text)' }}>{business?.address || 'İstanbul, TR'}</p>
            </div>
            
            <div className="group">
              <div className="text-xs font-bold uppercase tracking-[0.2em] mb-3 opacity-60 flex items-center gap-2" style={{ color: 'var(--color-text-secondary)' }}>
                <Phone className="w-4 h-4" /> Telefon
              </div>
              <a href={`tel:${(business as any)?.phoneClean as string}`} className="text-3xl md:text-5xl font-bold tracking-tight hover:text-[var(--color-accent)] transition-colors" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                {business?.phone || '+90 555 000 00 00'}
              </a>
            </div>
          </div>
        </div>

        {/* Input Panel */}
        <div className="py-24 px-8 md:px-16 lg:px-24 flex flex-col justify-center">
          <h3 className="text-2xl uppercase tracking-widest font-bold mb-12" style={{ color: 'var(--color-text)' }}>Mesaj Gönderin</h3>
          <form className="space-y-8">
            <div>
              <input type="text" placeholder="Adınız Soyadınız" className="w-full border-b pb-4 bg-transparent text-xl focus:outline-none transition-colors" 
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }} />
            </div>
            <div>
              <input type="tel" placeholder="Telefon Numaranız" className="w-full border-b pb-4 bg-transparent text-xl focus:outline-none transition-colors" 
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }} />
            </div>
            <div className="pt-8">
              <button type="button" className="group flex items-center justify-between w-full p-6 text-xl uppercase tracking-widest font-bold transition-all hover:pl-10" 
                style={{ background: 'var(--color-text)', color: 'var(--color-bg)' }}>
                <span>Talep Gönder</span>
                <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'tier1_asymmetric_contact', Tier1AsymmetricContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

export default {
  Tier1AsymmetricHero,
  Tier1AsymmetricAbout,
  Tier1AsymmetricServices,
  Tier1AsymmetricContact
}
