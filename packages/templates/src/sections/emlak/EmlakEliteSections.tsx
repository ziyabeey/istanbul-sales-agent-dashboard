'use client'

import React, { ComponentType, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, Phone, Mail, Building, Key, Shield, Bed, Bath, Square, ArrowRight } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Hero (Cinematic & Luxury Video Background) ──
export function EmlakEliteHero({ business, content }: SectionProps<any>) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-black text-white flex items-center">
      {/* Background with Parallax */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/30 z-10 noise-overlay opacity-50" />
        {/* Placeholder for video, using high quality image fallback */}
        <img 
          src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2950&auto=format&fit=crop'} 
          alt="Luxury Real Estate"
          className="w-full h-full object-cover scale-105"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-[var(--container-default)] mx-auto px-6 md:px-12 flex flex-col items-start justify-center pt-24">
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-[1px] w-12 bg-accent" />
          <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold font-['Outfit']">
            {content?.badge || 'EXCLUSIVE COLLECTION'}
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-fluid-1 leading-[1.1] mb-8 font-normal" 
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Yaşamın <br/>
          <span className="italic text-white/90">Sanat Hali.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-fluid-3 max-w-xl text-white/70 font-light mb-12 font-['Outfit']"
        >
          {content?.description || 'Dünyanın en prestijli lokasyonlarında, sınırları aşan tasarım ve benzersiz konforu bir araya getiren özel mülkler.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <a href="#properties" className="group flex items-center gap-4 text-sm uppercase tracking-widest font-['Outfit'] text-white hover:text-accent transition-colors">
            <span className="border-b border-white/30 pb-1 group-hover:border-accent transition-colors">Portföyü Keşfet</span>
            <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:border-accent group-hover:scale-110 transition-all">
              <ArrowRight className="w-4 h-4" />
            </div>
          </a>
        </motion.div>
      </div>

      {/* Vertical Status Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute right-12 bottom-0 z-20 hidden lg:flex flex-col items-center gap-8 pb-12"
      >
        <div className="text-[10px] uppercase tracking-[0.2em] font-['Outfit'] text-white/50 origin-bottom-right -rotate-90 translate-x-1/2 whitespace-nowrap">
          {business.address || 'Istanbul, Turkey'}
        </div>
        <div className="w-[1px] h-24 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  )
}
registerSection('hero', 'emlak_elite_hero', EmlakEliteHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)


// ── 2. Properties (Bento Grid Premium) ──
export function EmlakEliteProperties({ business, content }: SectionProps<any>) {
  const defaultProperties = [
    { name: "Bosphorus Yalı", location: "Bebek, İstanbul", specs: "6 Yatak Odası • 800 m²", price: "$12.5M", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2950&auto=format&fit=crop" },
    { name: "Sky Penthouse", location: "Levent, İstanbul", specs: "4 Yatak Odası • 450 m²", price: "$4.2M", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2940&auto=format&fit=crop" },
    { name: "Aegean Villa", location: "Yalıkavak, Bodrum", specs: "5 Yatak Odası • 600 m²", price: "$6.8M", img: "https://images.unsplash.com/photo-1613490900233-0827361a5b32?q=80&w=2835&auto=format&fit=crop" }
  ];

  const properties = business.customData?.properties || defaultProperties;

  return (
    <section id="properties" className="py-[var(--section-py)] bg-bg text-text noise-overlay">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        
        <div className="flex flex-col items-center text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-fluid-2 font-normal mb-6" style={{ fontFamily: 'var(--font-heading)' }}
          >
            Seçkin <span className="italic text-accent">Koleksiyon</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-text-secondary max-w-2xl font-light font-['Outfit'] text-lg"
          >
            {content?.description || 'En özel lokasyonlarda, mimari değeri yüksek ve sınırlı sayıdaki premium portföyümüzü keşfedin.'}
          </motion.p>
        </div>

        <div className="flex flex-col gap-12">
          {properties.slice(0, 3).map((prop: any, i: number) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0 group cursor-pointer`}
              >
                {/* Image Area */}
                <div className="w-full lg:w-2/3 aspect-[16/9] lg:aspect-[21/9] overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
                  <img 
                    src={prop.img} 
                    alt={prop.name}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  {/* Floating Price Badge */}
                  <div className="absolute top-6 left-6 z-20 bg-black/50 backdrop-blur-md border border-white/20 px-4 py-2 text-white font-['Outfit'] font-light tracking-wider">
                    {prop.price}
                  </div>
                </div>

                {/* Content Area */}
                <div className="w-full lg:w-1/3 bg-surface p-8 lg:p-12 flex flex-col justify-center border border-white/5 group-hover:border-accent/30 transition-colors duration-500">
                  <div className="text-accent text-xs tracking-[0.2em] uppercase font-bold font-['Outfit'] mb-4 flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> {prop.location}
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-normal mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                    {prop.name}
                  </h3>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-text-secondary font-['Outfit'] mb-8">
                    <div className="flex items-center gap-2">
                      <Bed className="w-4 h-4" /> <span>{prop.specs.split('•')[0]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Square className="w-4 h-4" /> <span>{prop.specs.split('•')[1] || '500 m²'}</span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <span className="text-sm uppercase tracking-widest font-['Outfit'] border-b border-text/20 pb-1 group-hover:border-accent group-hover:text-accent transition-colors">
                      Detayları İncele
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
registerSection('properties', 'emlak_elite_properties', EmlakEliteProperties as unknown as ComponentType<SectionProps<Record<string, unknown>>>)


// ── 3. About (Broker Info & Trust) ──
export function EmlakEliteAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="py-[var(--section-py)] bg-surface text-text noise-overlay border-y border-white/5">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Portrait / Gallery */}
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
              className="relative aspect-[3/4] w-full lg:w-4/5"
            >
              <img 
                src="https://images.unsplash.com/photo-1560518884-ce5882228c96?q=80&w=2836&auto=format&fit=crop" 
                alt="Broker"
                className="w-full h-full object-cover grayscale-[30%]"
              />
              
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-accent/20 z-0 hidden md:block pointer-events-none" />
              
              {/* Experience Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -right-6 lg:-right-12 bg-bg border border-white/10 p-6 lg:p-8 shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <Shield className="w-10 h-10 text-accent" strokeWidth={1} />
                  <div>
                    <div className="text-3xl font-normal" style={{ fontFamily: 'var(--font-heading)' }}>15+</div>
                    <div className="text-xs text-text-secondary uppercase tracking-[0.2em] font-['Outfit']">Yıllık Güven</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Content */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="text-accent uppercase tracking-[0.2em] text-xs font-bold font-['Outfit']">KURUMSAL DEĞERLER</span>
              <div className="h-[1px] w-12 bg-accent" />
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-fluid-2 font-normal mb-8 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}
            >
              Sadece Gayrimenkul Değil, <br/>
              <span className="italic text-accent">Prestij Sunuyoruz.</span>
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="space-y-6 text-text-secondary text-lg font-light leading-relaxed font-['Outfit'] mb-12"
            >
              <p>{business.description || 'Lüks konut sektöründeki derin piyasa bilgimiz ve geniş global ağımız ile, müşterilerimize özel ve gizlilik odaklı danışmanlık hizmeti veriyoruz.'}</p>
            </motion.div>

            <div className="space-y-6">
              {['Kişiye Özel Portföy Yönetimi', 'Gizlilik ve Hukuki Güvence', 'Uluslararası Pazarlama Ağı'].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + (i * 0.1) }}
                  className="flex items-center gap-4 border-b border-white/5 pb-4"
                >
                  <Key className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  <span className="font-['Outfit'] text-lg text-white/90">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
registerSection('about', 'emlak_elite_about', EmlakEliteAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)


// ── 4. Contact (Map & Elegant Form) ──
export function EmlakEliteContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-black text-white relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[800px]">
        
        {/* Left: Contact Form */}
        <div className="py-[var(--section-py)] px-6 md:px-16 lg:px-24 flex flex-col justify-center noise-overlay bg-bg relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-fluid-2 font-normal mb-4" style={{ fontFamily: 'var(--font-heading)' }}
          >
            Özel <span className="italic text-accent">Gösterim</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-text-secondary mb-12 font-['Outfit'] font-light text-lg max-w-md"
          >
            Portföyümüzdeki mülkleri yerinde incelemek veya danışmanlık almak için randevu oluşturun.
          </motion.p>

          <motion.form 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="space-y-8 max-w-xl"
          >
            <div className="space-y-2">
              <input type="text" className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-white/30 font-['Outfit'] text-lg focus:outline-none focus:border-accent transition-colors" placeholder="Adınız Soyadınız" />
            </div>
            <div className="space-y-2">
              <input type="email" className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-white/30 font-['Outfit'] text-lg focus:outline-none focus:border-accent transition-colors" placeholder="E-posta Adresiniz" />
            </div>
            <div className="space-y-2">
              <input type="tel" className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-white/30 font-['Outfit'] text-lg focus:outline-none focus:border-accent transition-colors" placeholder="Telefon Numaranız" />
            </div>
            
            <button type="button" className="group flex items-center gap-4 text-sm uppercase tracking-[0.2em] font-['Outfit'] font-bold text-accent hover:text-white transition-colors mt-8">
              <span>Randevu Talebi Gönder</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.form>

          <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-8 font-['Outfit']">
            <div>
              <div className="text-xs text-text-secondary uppercase tracking-widest mb-2">Bize Ulaşın</div>
              <div className="text-lg">{business.phone || '+90 (212) 555 01 23'}</div>
            </div>
            <div>
              <div className="text-xs text-text-secondary uppercase tracking-widest mb-2">Merkez Ofis</div>
              <div className="text-lg">{business.address || 'Zorlu Center, Levazim, İstanbul'}</div>
            </div>
          </div>
        </div>

        {/* Right: Map / Visual Area */}
        <div className="relative h-[400px] lg:h-auto hidden md:block">
          {/* Using a high-end architectural photo instead of a generic map for luxury feel, but could easily be an iframe */}
          <div className="absolute inset-0 bg-black/20 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2906&auto=format&fit=crop" 
            alt="Office Location"
            className="w-full h-full object-cover grayscale-[20%]"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-24 h-24 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center border border-accent/30 shadow-[0_0_50px_rgba(201,168,76,0.2)]">
              <MapPin className="w-8 h-8 text-accent" strokeWidth={1} />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
registerSection('contact', 'emlak_elite_contact', EmlakEliteContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
