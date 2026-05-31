'use client'

import React, { ComponentType, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { ArrowRight, MapPin, Phone, Mail, Building2, Hammer, HardHat, Ruler } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Hero (Cinematic Parallax & Typography) ──
export function InsaatEliteHero({ business, content }: SectionProps<any>) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Split title for word-by-word reveal
  const titleWords = (content?.title || "GELECEĞİ İNŞA EDİYORUZ").split(" ")

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-black text-white flex items-center justify-center">
      {/* Background with Parallax */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-bg z-10" />
        <div className="absolute inset-0 bg-black/20 z-10 noise-overlay opacity-30" />
        <img 
          src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1541888081198-bc858a7413d3?q=80&w=2938&auto=format&fit=crop'} 
          alt="Luxury Construction"
          className="w-full h-full object-cover scale-105"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-[var(--container-default)] mx-auto px-6 md:px-12 flex flex-col items-start justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 inline-flex items-center gap-3 px-4 py-2 border border-accent/30 rounded-full bg-black/30 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs tracking-[0.2em] font-medium uppercase text-white/90">
            {content?.badge || 'PREMIUM DEVELOPER'}
          </span>
        </motion.div>

        <h1 className="text-fluid-1 font-bold leading-[0.9] tracking-tighter mb-8 uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
          {titleWords.map((word: string, i: number) => (
            <span key={i} className="inline-block overflow-hidden mr-[2%] mb-2">
              <motion.span
                initial={{ y: "100%", rotate: 5 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: 0.2 + (i * 0.1) 
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-fluid-3 max-w-2xl text-white/70 font-light mb-12"
        >
          {content?.description || 'Mimari zarafeti mühendislik gücüyle birleştiren, vizyoner ve ödüllü yapılar hayata geçiriyoruz.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-wrap gap-4"
        >
          <a href="#projeler" className="group relative overflow-hidden bg-accent text-black px-8 py-4 rounded-none text-sm font-bold tracking-wider uppercase inline-flex items-center gap-3 transition-transform hover:scale-105">
            <span className="relative z-10">{content?.cta1?.text || 'Projeleri İncele'}</span>
            <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-12 z-20 hidden md:flex items-center gap-4 text-xs tracking-widest uppercase text-white/50"
      >
        <span className="w-12 h-[1px] bg-white/30" />
        <span>SCROLL DISCOVER</span>
      </motion.div>
    </section>
  )
}
registerSection('hero', 'insaat_elite_hero', InsaatEliteHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)


// ── 2. Projects (Bento Grid 3D Hover) ──
export function InsaatEliteProjects({ business, content }: SectionProps<any>) {
  const defaultProjects = [
    { name: "Kule 360", type: "Ticari Kule", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop" },
    { name: "Vadi Evleri", type: "Lüks Konut", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2950&auto=format&fit=crop" },
    { name: "Marina Plus", type: "Karma Proje", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2800&auto=format&fit=crop" },
    { name: "Skyline Ofis", type: "A+ Ofis", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2869&auto=format&fit=crop" }
  ];

  // Mocking projects if business doesn't provide them yet
  const projects = business.customData?.projects || defaultProjects;

  return (
    <section id="projeler" className="py-[var(--section-py)] bg-bg text-text noise-overlay">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[1px] w-12 bg-accent" />
              <span className="text-accent uppercase tracking-[0.2em] text-sm font-semibold">PORTFOLYO</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-fluid-2 font-bold uppercase" style={{ fontFamily: 'var(--font-heading)' }}
            >
              {content?.title || 'İMZA PROJELER'}
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="hidden md:block">
            <button className="text-sm uppercase tracking-widest border-b border-white/20 pb-1 hover:border-accent transition-colors">Tümünü Gör</button>
          </motion.div>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {projects.slice(0,4).map((proj: any, i: number) => {
            // Determine bento spans based on index
            const isLarge = i === 0; // First item is large
            const isWide = i === 3;  // Last item is wide
            
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`relative group overflow-hidden bg-surface rounded-sm cursor-pointer ${
                  isLarge ? 'md:col-span-8 md:row-span-2 aspect-[4/3] md:aspect-auto' : 
                  isWide ? 'md:col-span-8 aspect-[21/9]' : 
                  'md:col-span-4 aspect-square'
                }`}
              >
                {/* Background Image with Scale Effect */}
                <div className="absolute inset-0 w-full h-full">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700 z-10" />
                  <img 
                    src={proj.img} 
                    alt={proj.name}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                  />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-accent text-xs font-semibold tracking-widest uppercase mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {proj.type}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
                      {proj.name}
                    </h3>
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
registerSection('portfolio_grid', 'insaat_elite_projects', InsaatEliteProjects as unknown as ComponentType<SectionProps<Record<string, unknown>>>)


// ── 3. About & Stats (Industrial Textures) ──
export function InsaatEliteAbout({ business, content }: SectionProps<any>) {
  const defaultServices = [
    { title: "Mimari Tasarım", icon: <Ruler className="w-6 h-6" /> },
    { title: "Proje Yönetimi", icon: <HardHat className="w-6 h-6" /> },
    { title: "Anahtar Teslim", icon: <Building2 className="w-6 h-6" /> }
  ];

  const services = business.services?.length 
    ? business.services.map((s: any, i: number) => {
        if (typeof s === 'string') return { title: s, icon: defaultServices[i%3].icon };
        return { title: s.name || s.title, icon: defaultServices[i%3].icon };
      })
    : defaultServices;

  return (
    <section className="py-[var(--section-py)] bg-surface text-text noise-overlay border-y border-white/5">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Text */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-fluid-2 font-bold mb-8 uppercase leading-tight" style={{ fontFamily: 'var(--font-heading)' }}
            >
              {content?.title || 'YAPILARDA KALICI MİRAS BIRAKIYORUZ.'}
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="space-y-6 text-text-secondary text-lg font-light leading-relaxed mb-12"
            >
              <p>{business.description || 'Yarım asırlık tecrübemizle endüstriyel, ticari ve premium konut projelerinde sınırları zorluyoruz.'}</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {services.slice(0,3).map((srv: any, i: number) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + (i * 0.1) }}
                  className="flex flex-col gap-4"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-black/40 border border-white/10 rounded-sm text-accent">
                    {srv.icon}
                  </div>
                  <h4 className="font-semibold text-sm uppercase tracking-wide">{srv.title}</h4>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Image / Glassmorphism Panel */}
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
              className="relative aspect-[4/5] w-full"
            >
              <img 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2831&auto=format&fit=crop" 
                alt="Construction Site"
                className="w-full h-full object-cover grayscale-[20%] sepia-[10%] brightness-75 rounded-sm"
              />
              
              {/* Glass Stats Badge */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-8 -left-8 bg-black/60 backdrop-blur-xl border border-white/10 p-8 w-64 rounded-sm shadow-2xl"
              >
                <div className="text-5xl font-bold text-accent mb-2" style={{ fontFamily: 'var(--font-heading)' }}>25+</div>
                <div className="text-sm text-white/70 uppercase tracking-widest">Yıllık Deneyim</div>
                
                <div className="w-full h-[1px] bg-white/10 my-4" />
                
                <div className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>100+</div>
                <div className="text-sm text-white/70 uppercase tracking-widest">Tamamlanan Proje</div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
registerSection('about', 'insaat_elite_about', InsaatEliteAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)


// ── 4. Contact (Premium Dark Form) ──
export function InsaatEliteContact({ business, content }: SectionProps<any>) {
  return (
    <section className="py-[var(--section-py)] bg-black text-white relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none transform translate-x-1/3 -translate-y-1/3" />

      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-fluid-2 font-bold mb-6 uppercase" style={{ fontFamily: 'var(--font-heading)' }}
            >
              PROJENİZİ<br/><span className="text-accent">BAŞLATIN.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-white/60 mb-12 text-lg font-light"
            >
              Uzman mühendislerimiz ve mimarlarımız, vizyonunuzu gerçeğe dönüştürmek için hazır.
            </motion.p>

            <div className="space-y-8">
              {[
                { icon: <MapPin className="w-6 h-6" />, label: 'MERKEZ OFİS', value: business.address || 'Levent, Büyükdere Cd. No:195, İstanbul' },
                { icon: <Phone className="w-6 h-6" />, label: 'TELEFON', value: business.phone || '+90 (212) 555 01 23' },
                { icon: <Mail className="w-6 h-6" />, label: 'E-POSTA', value: business.email || 'proje@kratosyapi.com' }
              ].map((info, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + (i * 0.1) }}
                  className="flex items-start gap-6 group"
                >
                  <div className="w-12 h-12 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-colors duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <div className="text-xs text-white/50 tracking-[0.2em] uppercase font-semibold mb-1">{info.label}</div>
                    <div className="text-lg">{info.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <form className="bg-surface/50 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-sm space-y-6">
              <h3 className="text-2xl font-bold uppercase mb-8 border-b border-white/10 pb-4" style={{ fontFamily: 'var(--font-heading)' }}>İletişim Formu</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-white/50 uppercase tracking-widest font-semibold">Ad Soyad</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 p-4 text-white placeholder-white/30 focus:outline-none focus:border-accent transition-colors rounded-none" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-white/50 uppercase tracking-widest font-semibold">E-posta</label>
                  <input type="email" className="w-full bg-black/50 border border-white/10 p-4 text-white placeholder-white/30 focus:outline-none focus:border-accent transition-colors rounded-none" placeholder="john@example.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs text-white/50 uppercase tracking-widest font-semibold">Proje Tipi</label>
                <select className="w-full bg-black/50 border border-white/10 p-4 text-white focus:outline-none focus:border-accent transition-colors rounded-none appearance-none">
                  <option>Ticari Yapı / Ofis</option>
                  <option>Konut / Villa</option>
                  <option>Endüstriyel Tesis</option>
                  <option>Diğer</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-white/50 uppercase tracking-widest font-semibold">Proje Detayları</label>
                <textarea rows={4} className="w-full bg-black/50 border border-white/10 p-4 text-white placeholder-white/30 focus:outline-none focus:border-accent transition-colors rounded-none resize-none" placeholder="Projenizden kısaca bahsedin..."></textarea>
              </div>

              <button type="button" className="w-full bg-accent text-black font-bold uppercase tracking-widest py-5 hover:bg-white transition-colors duration-300 rounded-none mt-4">
                Talebi Gönder
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'insaat_elite_contact', InsaatEliteContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
