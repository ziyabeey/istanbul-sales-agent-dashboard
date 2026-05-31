'use client'

import React, { ComponentType, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Scissors, MapPin, Clock, Calendar, Instagram } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Berber Bespoke Hero ──
export function BerberBespokeHero({ business, content }: SectionProps<any>) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const filter = useTransform(scrollYProgress, [0, 1], ['brightness(1)', 'brightness(0.2)'])

  return (
    <section ref={ref} className="relative h-screen w-full bg-black text-white overflow-hidden flex items-center justify-center">
      <motion.div style={{ y, filter }} className="absolute inset-0 z-0">
        <img 
          src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2948&auto=format&fit=crop'} 
          alt="Barbershop" 
          className="w-full h-full object-cover opacity-60 mix-blend-luminosity" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </motion.div>

      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto mt-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" as any }}
          className="mb-8"
        >
          <Scissors className="w-12 h-12 mx-auto text-[#D4AF37] mb-6" />
          <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-[#D4AF37] mb-4">
            {content?.badge || 'GENTLEMEN\'S CLUB'}
          </h2>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.2 }}
          className="text-6xl md:text-8xl font-serif italic font-light mb-6 tracking-tight text-white/90"
        >
          {content?.title || business?.name || 'Klasik Kesim,\nModern Tarz.'}
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
          className="flex gap-6 justify-center mt-12"
        >
          <button className="px-10 py-4 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 uppercase tracking-widest text-xs font-bold">
            Randevu Al
          </button>
        </motion.div>
      </div>
    </section>
  )
}
registerSection('hero', 'berber_bespoke_hero', BerberBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Berber Sharp Services ──
export function BerberBespokeServices({ business, content }: SectionProps<any>) {
  const items = business?.services?.length ? business.services : [
    { name: 'Saç Kesimi & Stil', price: '₺350', desc: 'Danışmanlık, yıkama, özel kesim ve şekillendirme.' },
    { name: 'Geleneksel Sakal Tıraşı', price: '₺250', desc: 'Sıcak havlu, ustura ve özel bakım yağları ile.' },
    { name: 'Cilt Bakımı', price: '₺400', desc: 'Gözenek temizliği, siyah maske ve nemlendirici masaj.' },
    { name: 'VIP Paket', price: '₺800', desc: 'Saç, sakal, cilt bakımı ve özel ikramlar.' },
  ];

  return (
    <section className="py-32 bg-[#0A0A0A] text-white relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[#D4AF37] to-transparent opacity-50" />
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 pt-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-serif italic font-light text-[#D4AF37] mb-4">
            {content?.title || 'Hizmet Menüsü'}
          </h2>
          <p className="text-zinc-500 tracking-widest text-sm uppercase">Fiyatlar & İşlemler</p>
        </div>

        <div className="space-y-2">
          {items.map((item: any, i: number) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="flex items-end justify-between py-6 border-b border-zinc-900 group-hover:border-[#D4AF37] transition-colors">
                <div className="pr-8">
                  <h3 className="text-2xl font-light text-zinc-300 group-hover:text-white transition-colors mb-2">
                    {item.title || item.name}
                  </h3>
                  <p className="text-sm text-zinc-600 font-serif italic group-hover:text-zinc-400 transition-colors">
                    {item.desc}
                  </p>
                </div>
                <div className="text-2xl font-serif text-[#D4AF37] whitespace-nowrap">
                  {item.price}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-20">
          <button className="px-8 py-3 bg-[#111] text-zinc-400 hover:text-white transition-colors text-sm tracking-widest uppercase">
            Tüm Menüyü İncele
          </button>
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'berber_bespoke_services', BerberBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Berber Dark About ──
export function BerberBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="py-32 bg-black text-white overflow-hidden">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
              <div className="absolute -inset-4 border border-[#D4AF37]/20 -z-10" />
              <img 
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2940&auto=format&fit=crop" 
                alt="Berber Ustası" 
                className="w-full aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          </div>
          
          <div className="order-1 lg:order-2">
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <h2 className="text-5xl md:text-6xl font-serif italic font-light leading-tight mb-8 text-white/90">
                {content?.title || 'Sadece Bir Saç Kesimi Değil, Bir Deneyim.'}
              </h2>
              <p className="text-lg text-zinc-500 mb-10 leading-relaxed font-light">
                {(business?.description as string) || 'Yılların getirdiği ustalık ve modern trendlerin kusursuz birleşimi. Koltuğumuza oturduğunuz an, günlük koşturmacadan uzaklaşıp tamamen size özel bir bakım ritüelinin parçası olacaksınız.'}
              </p>
              
              <div className="grid grid-cols-2 gap-8 border-t border-zinc-900 pt-10">
                <div>
                  <div className="text-3xl font-serif text-[#D4AF37] mb-2">Ustura</div>
                  <div className="text-xs tracking-widest text-zinc-600 uppercase">Geleneksel Teknik</div>
                </div>
                <div>
                  <div className="text-3xl font-serif text-[#D4AF37] mb-2">Premium</div>
                  <div className="text-xs tracking-widest text-zinc-600 uppercase">Bakım Ürünleri</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'berber_bespoke_about', BerberBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Berber Elite Contact ──
export function BerberBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#050505] text-white border-t border-zinc-900">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-12 md:p-24 flex flex-col justify-center">
          <h2 className="text-4xl font-serif italic text-[#D4AF37] mb-12">Salonumuzu Ziyaret Edin.</h2>
          
          <div className="space-y-12">
            <div className="flex items-start gap-6">
              <MapPin className="w-6 h-6 text-zinc-600 mt-1" />
              <div>
                <div className="text-xs text-zinc-500 uppercase tracking-widest mb-2 font-bold">Lokasyon</div>
                <div className="text-xl text-zinc-300">{business?.address || 'Bağdat Caddesi, İstanbul'}</div>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <Clock className="w-6 h-6 text-zinc-600 mt-1" />
              <div>
                <div className="text-xs text-zinc-500 uppercase tracking-widest mb-2 font-bold">Çalışma Saatleri</div>
                <div className="text-xl text-zinc-300">Salı - Pazar: 10:00 - 21:00<br/><span className="text-zinc-600 text-sm">Pazartesi Kapalı</span></div>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <Calendar className="w-6 h-6 text-zinc-600 mt-1" />
              <div>
                <div className="text-xs text-zinc-500 uppercase tracking-widest mb-2 font-bold">İletişim & Rezervasyon</div>
                <div className="text-xl text-zinc-300">{business?.phone || '+90 532 000 00 00'}</div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 flex gap-6">
            <a href="#" className="text-zinc-500 hover:text-[#D4AF37] transition-colors"><Instagram className="w-6 h-6" /></a>
          </div>
        </div>
        
        <div className="relative h-[50vh] lg:h-auto min-h-[600px] border-l border-zinc-900">
          <img 
            src="https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?q=80&w=2940&auto=format&fit=crop" 
            alt="Salon İç Mekan" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-12">
            <div className="bg-black/80 backdrop-blur-md border border-[#D4AF37]/30 p-10 max-w-sm w-full text-center">
               <h3 className="text-xl font-serif italic text-[#D4AF37] mb-6">Özel Randevu</h3>
               <p className="text-sm text-zinc-400 mb-8">Sıra beklemeden, size ayrılan özel saatte hizmet alın.</p>
               <button className="w-full bg-[#D4AF37] text-black font-bold uppercase tracking-widest py-4 text-sm hover:bg-white transition-colors">
                 Online Rezervasyon
               </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'berber_bespoke_contact', BerberBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
