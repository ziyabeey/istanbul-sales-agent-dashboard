'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Wrench, ShieldAlert, Timer, Settings, MapPin, PhoneCall } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Oto Industrial Hero ──
export function OtoBespokeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative h-screen bg-[#050505] text-white overflow-hidden flex flex-col justify-end">
      {/* Carbon fiber / Dark garage aesthetic */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-10" />
        <img 
          src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2874&auto=format&fit=crop'} 
          alt="Oto Servis" 
          className="w-full h-full object-cover opacity-50 contrast-125 grayscale" 
        />
        {/* Red accent light */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600 rounded-full blur-[120px] opacity-20" />
      </div>

      <div className="relative z-20 max-w-[var(--container-default)] mx-auto px-6 md:px-12 w-full pb-32">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-1 bg-red-600" />
            <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-sm">
              {content?.badge || 'YETKİLİ SERVİS KALİTESİ'}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {content?.title || business?.name || 'ARACINIZ GÜVENDE.'}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
            className="text-xl text-zinc-400 font-medium mb-10 max-w-xl"
          >
            {content?.description || (business?.description as string) || 'Uzman kadromuz ve son teknoloji teşhis cihazlarımızla aracınıza hak ettiği profesyonel bakımı sunuyoruz.'}
          </motion.p>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}>
            <button className="bg-red-600 text-white px-10 py-4 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
              Servis Randevusu Al
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
registerSection('hero', 'oto_bespoke_hero', OtoBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Oto Tech Services ──
export function OtoBespokeServices({ business, content }: SectionProps<any>) {
  const items = business?.services?.length ? business.services : [
    { name: 'Periyodik Bakım', price: '₺1.500\'den', desc: 'Orijinal yedek parça ve garantili hizmet.', icon: <Settings /> },
    { name: 'Motor & Mekanik', price: 'Ücretsiz Teşhis', desc: 'Bilgisayarlı arıza tespiti ve tamir.', icon: <Wrench /> },
    { name: 'Elektrik & Elektronik', price: 'Detaylı Kontrol', desc: 'Akü, şarj dinamosu ve beyin tamiri.', icon: <ShieldAlert /> },
    { name: 'Hızlı Servis', price: '60 Dakika', desc: 'Yağ, filtre ve balata değişimi.', icon: <Timer /> },
  ];

  return (
    <section className="py-24 bg-[#0A0A0A] text-white">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'SERVİS HİZMETLERİ'}
            </h2>
            <p className="text-zinc-500 font-medium">Aracınız için gereken tüm çözümler tek çatı altında.</p>
          </div>
          <button className="hidden md:block text-red-500 font-bold uppercase tracking-widest text-sm hover:text-white transition-colors border-b border-red-500 pb-1">
            Tüm Hizmetleri Gör
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111] border border-[#222] p-8 flex gap-6 hover:border-red-600/50 transition-colors group cursor-pointer"
            >
              <div className="w-16 h-16 bg-black flex-shrink-0 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                {item.icon || <Wrench />}
              </div>
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold uppercase tracking-wide">{item.name}</h3>
                  <span className="text-sm font-black text-zinc-500 bg-black px-3 py-1">{item.price}</span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'oto_bespoke_services', OtoBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Oto Engineering About ──
export function OtoBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="py-24 bg-black text-white border-t border-[#222]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] bg-[#111] overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1632823471565-1ec2a7df8450?q=80&w=2864&auto=format&fit=crop" 
                alt="Servis Alanı" 
                className="w-full h-full object-cover mix-blend-luminosity opacity-80"
              />
              {/* Technical overlay grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
            </div>
            
            <div className="absolute -bottom-8 -right-8 bg-red-600 p-8 text-black font-black uppercase tracking-tighter">
              <div className="text-6xl leading-none mb-1">10+</div>
              <div className="text-sm tracking-widest">Yıllık Uzmanlık</div>
            </div>
          </div>
          
          <div className="lg:col-span-1" />
          
          <div className="lg:col-span-6">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'MÜHENDİSLİK DÜZEYİNDE BAKIM'}
            </h2>
            <div className="space-y-6 text-zinc-400 font-medium leading-relaxed">
              <p>
                {(business?.description as string) || 'Aracınız sadece bir ulaşım aracı değil, karmaşık bir mühendislik harikasıdır. Biz bu bilinçle çalışıyor, en küçük vidadan motor bloğuna kadar her detayı büyük bir titizlikle inceliyoruz.'}
              </p>
              <p>
                Sürekli eğitime tabi tutulan teknisyenlerimiz ve sektörün en güncel arıza tespit cihazlarıyla, sorunu deneme-yanılma ile değil nokta atışı bularak çözeriz. Zamanınız ve bütçeniz bizim için değerlidir.
              </p>
            </div>
            
            <div className="mt-12 flex flex-wrap gap-4">
              {['Garantili Parça', 'Şeffaf Fiyatlandırma', 'Orijinal Ekipman'].map((tag, i) => (
                <span key={i} className="px-4 py-2 border border-[#333] text-sm font-bold uppercase tracking-wider text-zinc-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'oto_bespoke_about', OtoBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Oto Garage Contact ──
export function OtoBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#111] text-white">
      <div className="flex flex-col lg:flex-row">
        {/* Left Side: Map/Image Area */}
        <div className="w-full lg:w-1/2 min-h-[400px] relative">
          <img 
            src="https://images.unsplash.com/photo-1503375894314-b1523d42e61c?q=80&w=2940&auto=format&fit=crop" 
            alt="Garage Location" 
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-40"
          />
          <div className="absolute inset-0 bg-red-600 mix-blend-multiply opacity-20" />
          
          <div className="absolute inset-0 p-12 flex flex-col justify-end">
             <div className="bg-black/80 backdrop-blur-sm p-8 border-l-4 border-red-600 max-w-sm">
               <h3 className="text-xl font-black uppercase tracking-wider mb-2">Servis Noktası</h3>
               <p className="text-zinc-400 font-medium mb-6">{business?.address || 'Maslak Oto Sanayi Sitesi, Sarıyer / İstanbul'}</p>
               <button className="text-red-500 font-bold uppercase tracking-widest text-sm flex items-center gap-2 hover:text-white transition-colors">
                 <MapPin className="w-4 h-4" /> Yol Tarifi Al
               </button>
             </div>
          </div>
        </div>
        
        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 p-12 md:p-24 bg-[#0A0A0A]">
          <div className="flex items-center gap-4 mb-8">
            <PhoneCall className="w-8 h-8 text-red-600" />
            <div>
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Acil Destek & Randevu</div>
              <div className="text-2xl font-black tracking-wider">{business?.phone || '0850 000 00 00'}</div>
            </div>
          </div>
          
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">ONLİNE RANDEVU</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <input type="text" placeholder="AD SOYAD" className="w-full bg-[#111] border border-[#222] p-4 text-white uppercase text-sm font-bold focus:border-red-600 outline-none transition-colors" />
              <input type="text" placeholder="PLAKA" className="w-full bg-[#111] border border-[#222] p-4 text-white uppercase text-sm font-bold focus:border-red-600 outline-none transition-colors" />
            </div>
            <select className="w-full bg-[#111] border border-[#222] p-4 text-zinc-400 uppercase text-sm font-bold focus:border-red-600 outline-none transition-colors appearance-none">
              <option value="">HİZMET SEÇİNİZ</option>
              <option value="bakim">Periyodik Bakım</option>
              <option value="ariza">Arıza Tespiti</option>
              <option value="lastik">Lastik Değişimi</option>
            </select>
            <div className="grid grid-cols-2 gap-6">
              <input type="date" className="w-full bg-[#111] border border-[#222] p-4 text-zinc-400 uppercase text-sm font-bold focus:border-red-600 outline-none transition-colors" />
              <input type="time" className="w-full bg-[#111] border border-[#222] p-4 text-zinc-400 uppercase text-sm font-bold focus:border-red-600 outline-none transition-colors" />
            </div>
            <button className="w-full bg-red-600 text-white font-black uppercase tracking-widest py-5 hover:bg-white hover:text-black transition-colors mt-4">
              Randevu Oluştur
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'oto_bespoke_contact', OtoBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
