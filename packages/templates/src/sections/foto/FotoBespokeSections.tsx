'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Camera, Image as ImageIcon, Video, ArrowUpRight, Instagram } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Foto Minimalist Gallery Hero ──
export function FotoBespokeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-screen bg-black text-white flex flex-col justify-end pb-12 pt-24 px-6 md:px-12 overflow-hidden">
      {/* Dynamic Background Image Grid */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2940&auto=format&fit=crop'} 
          alt="Photography Portfolio" 
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-[var(--container-default)] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-10"
        >
          <div className="max-w-4xl">
            <h1 
              className="text-6xl md:text-8xl lg:text-[9rem] font-light tracking-tighter leading-[0.85] mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {content?.title || business?.name || 'LENS\n& IŞIK.'}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-2xl">
              {content?.description || (business?.description as string) || 'Görünmeyeni yakalamak, anı sonsuzlaştırmak. Profesyonel editoryal, moda ve düğün fotoğrafçılığı.'}
            </p>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-6 pb-2">
            <button className="flex items-center gap-4 text-white text-lg font-light group border-b border-white/30 pb-2 hover:border-white transition-colors">
              Portfolyoyu İncele 
              <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <div className="flex items-center gap-4 text-zinc-500">
              <Camera className="w-5 h-5" />
              <span className="uppercase tracking-[0.2em] text-xs">EST. 2015</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
registerSection('hero', 'foto_bespoke_hero', FotoBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Foto Portfolio Grid (Services/Gallery) ──
export function FotoBespokeServices({ business, content }: SectionProps<any>) {
  const portfolios = business?.services?.length ? business.services : [
    { title: 'Editoryal & Moda', desc: 'Dergi kapağı kalitesinde, kusursuz ışık ve kompozisyonla kurgulanmış moda çekimleri.', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop' },
    { title: 'Düğün Belgeseli', desc: 'En mutlu gününüzün yapaylıktan uzak, tamamen doğal ve duygusal anlarının yakalanması.', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2938&auto=format&fit=crop' },
    { title: 'Kurumsal & Ürün', desc: 'Markanızın vizyonunu yansıtan premium ürün çekimleri ve kurumsal imaj fotoğrafları.', img: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=2940&auto=format&fit=crop' },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#050505] text-white">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between mb-16 border-b border-zinc-800 pb-8">
          <h2 className="text-3xl md:text-5xl font-light uppercase tracking-widest" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || 'SEÇİLMİŞ İŞLER'}
          </h2>
          <span className="text-zinc-500 font-light hidden md:inline-block">scroll &rarr;</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {portfolios.map((item: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 mb-6">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out" 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-light uppercase tracking-widest mb-2 flex items-center justify-between">
                {item.title}
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
              </h3>
              <p className="text-zinc-500 font-light text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'foto_bespoke_services', FotoBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Foto Studio (About) ──
export function FotoBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="py-24 md:py-32 bg-white text-black border-y border-zinc-200">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <h2 className="text-4xl md:text-6xl font-light leading-tight mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Işığı Okumak.'}
            </h2>
            <div className="space-y-6 text-zinc-600 font-light leading-relaxed text-lg">
              <p>
                {(business?.description as string) || 'Fotoğraf, sadece denklanşöre basmak değil; o anki duyguyu, atmosferi ve hikayeyi tek bir kareye sığdırma sanatıdır. Ekibimiz, her detayı titizlikle planlayarak kusursuz kareler yaratır.'}
              </p>
              <p>
                İstanbul merkezli stüdyomuzda, son teknoloji ekipmanlar (Medium Format kameralar) ve profesyonel ışık sistemleriyle hayalinizdeki görselleri gerçeğe dönüştürüyoruz.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 md:gap-8">
             <div className="pt-12">
               <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2864&auto=format&fit=crop" className="w-full aspect-[4/5] object-cover grayscale" alt="Studio" />
             </div>
             <div>
               <img src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=2940&auto=format&fit=crop" className="w-full aspect-[4/5] object-cover grayscale" alt="Camera Lens" />
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'foto_bespoke_about', FotoBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Foto Contact / Booking ──
export function FotoBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#050505] text-white py-24 md:py-32">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
          
          <div className="lg:w-1/2">
            <h2 className="text-5xl md:text-7xl font-light mb-12" style={{ fontFamily: 'var(--font-heading)' }}>Birlikte Çalışalım.</h2>
            <p className="text-zinc-400 font-light text-xl mb-16 max-w-md">Projeniz, düğününüz veya markanız için profesyonel çekim taleplerinizi iletin.</p>
            
            <div className="space-y-10">
              <div>
                <div className="text-zinc-600 font-light uppercase tracking-widest text-sm mb-2">Stüdyo</div>
                <div className="text-lg font-light leading-relaxed">{business?.address || 'Karaköy, Kemankeş Cad. No:45\nBeyoğlu, İstanbul'}</div>
              </div>
              <div>
                <div className="text-zinc-600 font-light uppercase tracking-widest text-sm mb-2">İletişim</div>
                <div className="text-2xl font-light">{business?.phone || '+90 212 000 00 00'}</div>
                <div className="text-lg text-zinc-400 font-light">hello@fotobespoke.com</div>
              </div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-zinc-800 flex items-center gap-6">
              <a href="#" className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 font-light">
                <Instagram className="w-5 h-5" /> @fotobespoke
              </a>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <form className="space-y-8">
              <div>
                <input type="text" placeholder="İSİM SOYİSİM *" className="w-full bg-transparent border-b border-zinc-800 py-4 px-2 text-white font-light placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors" />
              </div>
              <div>
                <input type="email" placeholder="E-POSTA ADRESİ *" className="w-full bg-transparent border-b border-zinc-800 py-4 px-2 text-white font-light placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors" />
              </div>
              <div>
                <select className="w-full bg-transparent border-b border-zinc-800 py-4 px-2 text-zinc-400 font-light focus:outline-none focus:border-white transition-colors appearance-none">
                  <option value="">ÇEKİM TÜRÜ *</option>
                  <option value="moda">Moda & Editoryal</option>
                  <option value="dugun">Düğün Belgeseli</option>
                  <option value="urun">Ürün & Kurumsal</option>
                  <option value="portre">Portre</option>
                </select>
              </div>
              <div>
                <textarea rows={4} placeholder="PROJE DETAYLARI / TARİH" className="w-full bg-transparent border-b border-zinc-800 py-4 px-2 text-white font-light placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors resize-none" />
              </div>
              <button className="bg-white text-black px-12 py-5 uppercase tracking-widest font-medium hover:bg-zinc-200 transition-colors flex items-center gap-4">
                Gönder <ArrowUpRight className="w-5 h-5" />
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'foto_bespoke_contact', FotoBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
