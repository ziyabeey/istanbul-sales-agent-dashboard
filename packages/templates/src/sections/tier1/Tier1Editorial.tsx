'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Crown, MapPin, Clock, Phone, Sparkles, MoveRight, ArrowRightCircle } from 'lucide-react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

/* ═══════════════════════════════════════════
   TIER 1 — MASTERCLASS EDITORIAL ENGINE
   Tasarım: Luxury, moda/dergi stili (Vogue/Kinfolk). Bol whitespace, ince çizgiler.
   Animasyon: Yavaş kaydırmalar (Pan/Zoom parallax), zarif stagger yazı girişleri.
   Veri: Aktif business data ve lüks sunum.
   ═══════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 1, 0.5, 1] as [number,number,number,number] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const imageZoom = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 1.5, ease: 'easeOut' as const } }
};

export function Tier1EditorialHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {/* Decorative Editorial Lines */}
      <div className="absolute top-0 bottom-0 left-8 md:left-24 w-px bg-[var(--color-border)] opacity-50 z-0 hidden md:block" />
      <div className="absolute top-24 left-0 right-0 h-px bg-[var(--color-border)] opacity-50 z-0 hidden md:block" />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Editorial Typo */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col relative z-20 md:pl-16">
          {content?.badge && (
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
              <div className="w-12 h-px bg-[var(--color-accent)]" />
              <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: 'var(--color-accent)' }}>
                {content.badge}
              </span>
            </motion.div>
          )}
          
          <motion.h1 variants={fadeUp} className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1] mb-8" 
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            <span className="block font-serif italic mb-2 tracking-normal opacity-90">{business?.name?.split(' ')[0] || 'Zarafetin'}</span>
            <span className="block uppercase tracking-[0.05em] font-medium">{business?.name?.split(' ').slice(1).join(' ') || 'Odak Noktası'}</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-lg md:text-xl font-light mb-12 max-w-md leading-relaxed" 
            style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
            {content?.subtitle || business?.slogan || `${business?.sector || 'Sektörün'} alanında profesyonel hizmet. Kalite ve güvenin adresi.`}
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center gap-8">
            <a href={(content?.cta1 as any)?.href || '#hizmetler'} className="group flex items-center justify-center gap-3 px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-[var(--color-accent)] hover:text-[var(--color-text-on-accent)] border border-[var(--color-text)] hover:border-transparent"
              style={{ color: 'var(--color-text)' }}>
              {(content?.cta1 as any)?.text || 'Hizmetlerimizi İnceleyin'}
              <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
            </a>
          </motion.div>
        </motion.div>
        
        {/* Right Artistic Cover */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative w-full h-[60vh] md:h-[80vh]">
          {/* Main Photo Frame */}
          <motion.div variants={imageZoom} className="absolute inset-0 right-12 bottom-12 overflow-hidden shadow-2xl z-10" style={{ backgroundColor: 'var(--color-surface)' }}>
            <div className="absolute inset-0 bg-black/10 z-10" />
            <img src={business?.photos?.[0] || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80"} alt="Editorial 1" className="w-full h-full object-cover" />
          </motion.div>
          {/* Golden/Accent Box Offset */}
          <motion.div variants={fadeUp} className="absolute top-12 left-12 right-0 bottom-0 border z-0" style={{ borderColor: 'var(--color-accent)', opacity: 0.5 }} />
          {/* Small Overlaid Info Card */}
          <motion.div variants={fadeUp} className="absolute bottom-4 right-4 bg-[var(--color-bg)] p-8 shadow-xl z-20 w-64 border" style={{ borderColor: 'var(--color-border)' }}>
            <Crown className="w-8 h-8 mb-4 opacity-80" style={{ color: 'var(--color-accent)' }} />
            <p className="text-sm italic mb-2" style={{ fontFamily: 'var(--font-heading)' }}>"Estetik sadece görünüm değil, derin ruhun yansımasıdır."</p>
            <p className="text-xs uppercase tracking-widest font-bold opacity-60">— {(business as any)?.ownerName || 'Kurucu'}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
registerSection('hero', 'tier1_editorial_hero', Tier1EditorialHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

export function Tier1EditorialAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="py-40 relative" style={{ background: 'var(--color-surface)', color: 'var(--color-text)' }}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <Sparkles className="w-12 h-12 mx-auto mb-10 opacity-70" strokeWidth={1} style={{ color: 'var(--color-accent)' }} />
          </motion.div>
          
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-light italic mb-10 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || 'İşletmemiz Hakkında'}
          </motion.h2>
          
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl font-light leading-relaxed opacity-80 max-w-3xl mx-auto mb-16" style={{ color: 'var(--color-text-secondary)' }}>
            {content?.description || `${business?.foundedYear || 2015} yılından bu yana müşteri memnuniyetini en ön planda tutarak kaliteli hizmet sunuyoruz. Profesyonel ekibimizle her zaman yanınızdayız.`}
          </motion.p>
          
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.6 }} className="flex justify-center items-center gap-12 border-t pt-12" style={{ borderColor: 'var(--color-border)' }}>
            <div className="text-center">
              <span className="block text-4xl font-light italic mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{business?.rating || '4.9'}</span>
              <span className="text-xs uppercase tracking-[0.2em] font-bold opacity-50">Puan</span>
            </div>
            <div className="w-px h-12 bg-[var(--color-border)]" />
            <div className="text-center">
              <span className="block text-4xl font-light italic mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{business?.experience || '10+'}</span>
              <span className="text-xs uppercase tracking-[0.2em] font-bold opacity-50">Yıl Deneyim</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
registerSection('about', 'tier1_editorial_about', Tier1EditorialAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

export function Tier1EditorialServices({ business, content }: SectionProps<any>) {
  const defaultServices = [
    { name: 'Temel Hizmet', description: 'Profesyonel ve güvenilir çözümler.', price: 'İncele' },
    { name: 'Premium Hizmet', description: 'Detaylı ve özenli hizmet.', price: 'İncele' },
    { name: 'Özel Çözüm', description: 'İhtiyacınıza göre kişiselleştirilmiş.', price: 'İncele' },
    { name: 'VIP Hizmet', description: 'Ayrıcalıklı ve öncelikli hizmet anlayışı.', price: 'İncele' }
  ];
  const hizmetler = business?.services?.length ? business.services.slice(0, 6) : defaultServices;

  return (
    <section id="hizmetler" className="py-32" style={{ background: 'var(--color-bg)' }}>
      <div className="container mx-auto px-6">
        
        {/* Center Editorial Title */}
        <div className="text-center mb-24 relative">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-[var(--color-border)] -z-10" />
          <span className="bg-[var(--color-bg)] px-8 text-xs font-bold tracking-[0.3em] uppercase" style={{ color: 'var(--color-accent)' }}>{content?.badge || 'HİZMETLERİMİZ'}</span>
          <h2 className="text-5xl md:text-7xl font-light italic mt-8 bg-[var(--color-bg)] inline-block px-12 pb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            {content?.title || 'Hizmetlerimiz'}
          </h2>
        </div>
        
        {/* Magazine Style Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
          {hizmetler.map((h: any, i: number) => {
            if (typeof h === 'string') return null;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group border-b pb-8 transition-all hover:border-[var(--color-accent)]" style={{ borderColor: 'var(--color-border-subtle)' }}>
                <div className="mb-6 overflow-hidden relative" style={{ aspectRatio: '4/3', backgroundColor: 'var(--color-surface)' }}>
                   {business?.photos?.[(i + 1) % (business?.photos?.length || 1)] && (
                     <img src={business.photos[(i + 1) % business.photos.length]} alt={h.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                   )}
                </div>
                
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-light italic" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                    {h.name}
                  </h3>
                  {h.price && <span className="text-sm font-bold uppercase tracking-widest mt-2" style={{ color: 'var(--color-accent)' }}>{h.price}</span>}
                </div>
                
                {h.description && (
                  <p className="text-sm leading-relaxed mb-6 opacity-70" style={{ color: 'var(--color-text-secondary)' }}>
                    {h.description}
                  </p>
                )}
                
                <div className="flex justify-between items-center mt-auto">
                  {h.duration ? (
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold opacity-50">
                      <Clock size={14} /> {h.duration}
                    </div>
                  ) : <div />}
                  <ArrowRightCircle strokeWidth={1} className="w-8 h-8 opacity-40 group-hover:opacity-100 group-hover:text-[var(--color-accent)] transition-all -rotate-45 group-hover:rotate-0" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'tier1_editorial_services', Tier1EditorialServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

export function Tier1EditorialContact({ business, content }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-0 relative flex" style={{ background: 'var(--color-bg)', minHeight: '80vh' }}>
      
      {/* Photo Overlay Side */}
      <div className="hidden lg:block w-5/12 relative">
        <img src={business?.photos?.[2] || "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80"} alt="Contact" className="w-full h-full object-cover filter brightness-50" />
        <div className="absolute inset-0 flex flex-col justify-end p-16">
           <h3 className="text-4xl text-white font-light italic mb-6" style={{ fontFamily: 'var(--font-heading)' }}>"Bize Ulaşın."</h3>
           <p className="text-white/70 uppercase tracking-widest text-xs font-bold border-l-2 pl-4" style={{ borderColor: 'var(--color-accent)' }}>İletişim</p>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-8 md:p-16" style={{ background: 'var(--color-surface)' }}>
        <div className="w-full max-w-2xl">
          <h2 className="text-5xl md:text-6xl font-light italic mb-16" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
            {content?.title || 'İletişim'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16 border-b pb-16" style={{ borderColor: 'var(--color-border)' }}>
            <div>
              <div className="uppercase tracking-[0.2em] font-bold text-xs opacity-50 mb-4" style={{ color: 'var(--color-text-secondary)' }}>Ziyaret Edin</div>
              <p className="text-lg font-light leading-relaxed" style={{ color: 'var(--color-text)' }}>{business?.address || 'Bağdat Cad. İstanbul'}</p>
            </div>
            <div>
              <div className="uppercase tracking-[0.2em] font-bold text-xs opacity-50 mb-4" style={{ color: 'var(--color-text-secondary)' }}>Ulaşın</div>
              <p className="text-lg font-light leading-relaxed mb-2" style={{ color: 'var(--color-text)' }}>{business?.phone || '+90 555 123 45 67'}</p>
              <p className="text-lg font-light leading-relaxed" style={{ color: 'var(--color-text)' }}>{business?.email || 'hello@brand.com'}</p>
            </div>
          </div>

          <form className="space-y-10">
            <div className="grid md:grid-cols-2 gap-10">
              <input type="text" placeholder="Adınız Soyadınız" className="w-full border-b pb-4 bg-transparent text-sm tracking-[0.1em] font-bold uppercase focus:outline-none transition-colors" 
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }} />
              <input type="tel" placeholder="TELEFON" className="w-full border-b pb-4 bg-transparent text-sm tracking-[0.1em] font-bold uppercase focus:outline-none transition-colors" 
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }} />
            </div>
            <div>
              <textarea placeholder="Mesajınız..." rows={3} className="w-full border-b pb-4 bg-transparent text-sm tracking-[0.1em] font-bold uppercase focus:outline-none transition-colors resize-none" 
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }} />
            </div>
            <div className="pt-8">
              <button type="button" className="group inline-flex items-center gap-6 text-sm uppercase tracking-[0.2em] font-bold pb-2 border-b-2 transition-all hover:pr-4" 
                style={{ borderColor: 'var(--color-accent)', color: 'var(--color-text)' }}>
                <span>Gönder</span>
                <MoveRight className="w-5 h-5 transition-transform group-hover:translate-x-2" style={{ color: 'var(--color-accent)' }} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'tier1_editorial_contact', Tier1EditorialContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

export default {
  Tier1EditorialHero,
  Tier1EditorialAbout,
  Tier1EditorialServices,
  Tier1EditorialContact
}
