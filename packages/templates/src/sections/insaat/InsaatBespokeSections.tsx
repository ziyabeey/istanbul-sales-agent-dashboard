'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { HardHat, Ruler, Building2, ArrowRight, CheckCircle2 } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Insaat Brutalist Hero ──
export function InsaatBespokeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[90vh] bg-zinc-950 text-white flex items-end pb-24 overflow-hidden pt-32">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1541888086225-ebbc89b64013?q=80&w=2864&auto=format&fit=crop'} 
          alt="İnşaat Şantiyesi" 
          className="w-full h-full object-cover grayscale opacity-40 mix-blend-luminosity" 
        />
        {/* Yellow geometric accent */}
        <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-yellow-500/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[var(--container-default)] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-16 h-1.5 bg-yellow-500" />
            <span className="text-yellow-500 font-bold tracking-[0.3em] uppercase text-sm">
              {content?.badge || 'GELECEĞİ İNŞA EDİYORUZ'}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {content?.title || business?.name || 'SAĞLAM.\nGÜVENİLİR.\nKALICI.'}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
            className="text-xl text-zinc-400 font-medium max-w-2xl"
          >
            {content?.description || (business?.description as string) || 'Yarım asırlık tecrübemizle, modern mühendislik çözümlerini bir araya getirerek nesiller boyu ayakta kalacak yapılar inşa ediyoruz.'}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.6 }}
          className="lg:col-span-4 flex flex-col gap-4"
        >
          <div className="bg-yellow-500 text-zinc-950 p-8 transform translate-y-12 lg:translate-y-24 shadow-2xl relative z-20">
            <h3 className="text-3xl font-black uppercase mb-2">35+ Yıl</h3>
            <p className="font-semibold text-zinc-800">Sektör Deneyimi</p>
          </div>
          <button className="bg-zinc-100 text-zinc-950 px-8 py-6 font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-between group">
            <span>Projelerimiz</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
registerSection('hero', 'insaat_bespoke_hero', InsaatBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Insaat Expertise (Services) ──
export function InsaatBespokeServices({ business, content }: SectionProps<any>) {
  const services = business?.services?.length ? business.services : [
    { title: 'Altyapı & Hafriyat', desc: 'Devasa projeler için sağlam zemin ve altyapı hazırlıkları. Ağır iş makinesi filosu.', icon: <HardHat /> },
    { title: 'Ticari Kompleksler', desc: 'AVM, ofis kuleleri ve karma kullanım projeleri için uçtan uca taahhüt.', icon: <Building2 /> },
    { title: 'Mimari Tasarım', desc: 'Fonksiyonel ve estetik açıdan kusursuz, mühendislik harikası mimari çözümler.', icon: <Ruler /> },
  ];

  return (
    <section className="py-32 bg-zinc-100 text-zinc-950">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="mb-20">
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || 'UZMANLIK ALANLARIMIZ'}
          </h2>
          <div className="w-24 h-2 bg-yellow-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-white p-10 border-l-4 border-zinc-200 hover:border-yellow-500 transition-colors group"
            >
              <div className="text-zinc-300 group-hover:text-yellow-500 transition-colors mb-8 transform group-hover:-translate-y-2 duration-300">
                {React.cloneElement(service.icon as React.ReactElement, { className: "w-16 h-16" })}
              </div>
              <h3 className="text-2xl font-black uppercase mb-4">{service.title}</h3>
              <p className="text-zinc-500 font-medium leading-relaxed">{service.desc}</p>
              <div className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400 group-hover:text-zinc-950 transition-colors cursor-pointer">
                Detaylı İncele <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'insaat_bespoke_services', InsaatBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Insaat About/Stats ──
export function InsaatBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-zinc-950 text-white py-32">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              "KALİTE ASLA TESADÜF DEĞİLDİR, AKILLI BİR ÇABANIN SONUCUDUR."
            </h2>
            <p className="text-zinc-400 font-medium leading-relaxed mb-8">
              Her projede uluslararası inşaat standartlarını uyguluyor, iş güvenliğinden ve malzeme kalitesinden asla taviz vermiyoruz. Amacımız sadece bina dikmek değil, şehre değer katan yaşam alanları oluşturmaktır.
            </p>
            <ul className="space-y-4 mb-12">
              {['ISO 9001 Kalite Yönetim Sistemi', 'Çevre Dostu (LEED Uyumlu) Malzemeler', 'Sıfır İş Kazası Politikası'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-zinc-300 font-bold uppercase tracking-wide text-sm">
                  <CheckCircle2 className="w-5 h-5 text-yellow-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-6 h-fit">
            <div className="bg-zinc-900 p-8 border border-zinc-800">
              <div className="text-5xl font-black text-yellow-500 mb-2">150+</div>
              <div className="text-xs tracking-widest uppercase font-bold text-zinc-500">Tamamlanan Proje</div>
            </div>
            <div className="bg-zinc-900 p-8 border border-zinc-800 translate-y-12">
              <div className="text-5xl font-black text-white mb-2">2M+</div>
              <div className="text-xs tracking-widest uppercase font-bold text-zinc-500">M² İnşaat Alanı</div>
            </div>
            <div className="bg-zinc-900 p-8 border border-zinc-800">
              <div className="text-5xl font-black text-white mb-2">850</div>
              <div className="text-xs tracking-widest uppercase font-bold text-zinc-500">Uzman Personel</div>
            </div>
            <div className="bg-yellow-500 p-8 border border-yellow-500 translate-y-12 text-zinc-950">
              <div className="text-5xl font-black mb-2">%100</div>
              <div className="text-xs tracking-widest uppercase font-bold text-zinc-800">Müşteri Memnuniyeti</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'insaat_bespoke_about', InsaatBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Insaat Contact ──
export function InsaatBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-zinc-100 text-zinc-950 py-32">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="bg-white shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          
          <div className="lg:w-1/2 p-12 md:p-20 bg-zinc-950 text-white relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500 opacity-20 blur-[50px]" />
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">PROJENİZ İÇİN<br/>BİZE ULAŞIN</h2>
            <div className="w-16 h-1 bg-yellow-500 mb-12" />
            
            <div className="space-y-8 font-medium">
              <div>
                <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-1">Merkez Ofis</div>
                <div className="text-lg">{business?.address || 'Maslak Meydan Sokak, Spring Giz Plaza Kat: 12\nSarıyer, İstanbul'}</div>
              </div>
              <div>
                <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-1">İletişim</div>
                <div className="text-2xl text-yellow-500 font-bold">{business?.phone || '+90 212 555 55 55'}</div>
                <div className="text-zinc-400">info@insaatbespoke.com</div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 p-12 md:p-20">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <input type="text" id="name" className="peer w-full bg-transparent border-b-2 border-zinc-300 py-3 focus:outline-none focus:border-yellow-500 transition-colors placeholder-transparent font-medium" placeholder="Ad Soyad" />
                  <label htmlFor="name" className="absolute left-0 -top-3.5 text-zinc-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-yellow-600 font-bold uppercase tracking-wider">Ad Soyad</label>
                </div>
                <div className="relative">
                  <input type="text" id="company" className="peer w-full bg-transparent border-b-2 border-zinc-300 py-3 focus:outline-none focus:border-yellow-500 transition-colors placeholder-transparent font-medium" placeholder="Firma Ünvanı" />
                  <label htmlFor="company" className="absolute left-0 -top-3.5 text-zinc-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-yellow-600 font-bold uppercase tracking-wider">Firma Ünvanı</label>
                </div>
              </div>
              
              <div className="relative">
                <input type="tel" id="phone" className="peer w-full bg-transparent border-b-2 border-zinc-300 py-3 focus:outline-none focus:border-yellow-500 transition-colors placeholder-transparent font-medium" placeholder="Telefon" />
                <label htmlFor="phone" className="absolute left-0 -top-3.5 text-zinc-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-yellow-600 font-bold uppercase tracking-wider">Telefon</label>
              </div>
              
              <div className="relative">
                <textarea id="message" rows={3} className="peer w-full bg-transparent border-b-2 border-zinc-300 py-3 focus:outline-none focus:border-yellow-500 transition-colors placeholder-transparent resize-none font-medium" placeholder="Proje Detayları" />
                <label htmlFor="message" className="absolute left-0 -top-3.5 text-zinc-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-yellow-600 font-bold uppercase tracking-wider">Proje Detayları</label>
              </div>
              
              <button className="w-full bg-zinc-950 text-white font-black uppercase tracking-widest py-5 hover:bg-yellow-500 hover:text-zinc-950 transition-colors">
                Talep Gönder
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'insaat_bespoke_contact', InsaatBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
