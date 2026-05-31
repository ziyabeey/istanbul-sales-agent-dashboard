'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Wrench, ShieldAlert, Gauge, ArrowRightSquare, PhoneCall } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Lastikci Aggressive Hero ──
export function LastikciBespokeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[95vh] bg-[#111111] text-[#F3F4F6] flex items-center pt-24 overflow-hidden">
      {/* Tire Tread Pattern Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundPosition: '0 0, 20px 20px', backgroundSize: '40px 40px' }} />
      
      {/* Neon Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-[#EAB308] rounded-[100%] blur-[150px] opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[var(--container-default)] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16">
        
        <div className="lg:w-1/2 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8 border-l-4 border-[#EAB308] pl-4"
          >
            <Gauge className="w-6 h-6 text-[#EAB308]" />
            <span className="text-white font-black uppercase tracking-widest text-sm">
              {content?.badge || 'YÜKSEK PERFORMANS'}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black leading-[0.95] mb-6 text-white uppercase italic tracking-tighter"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {content?.title?.split('\n').map((line: string, i: number) => <div key={i}>{line}</div>) || (
              <>
                <div>YOLU</div>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAB308] to-[#CA8A04]">HİSSET.</div>
              </>
            )}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-[#9CA3AF] font-bold leading-tight mb-10 max-w-lg"
          >
            {content?.description || (business?.description as string) || 'Profesyonel rot balans, 7/24 yol yardım ve dünyanın en iyi lastik markaları tek çatı altında.'}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-6"
          >
            <button className="bg-[#EAB308] text-[#111111] px-10 py-5 font-black tracking-widest text-lg uppercase hover:bg-white transition-colors skew-x-[-10deg] flex items-center justify-center">
              <span className="skew-x-[10deg] flex items-center gap-3">Hemen Ara <PhoneCall className="w-5 h-5" /></span>
            </button>
            <button className="bg-transparent text-white border-2 border-white/20 px-10 py-5 font-black tracking-widest text-lg uppercase hover:bg-white/10 transition-colors skew-x-[-10deg]">
              <span className="skew-x-[10deg]">Hizmetler</span>
            </button>
          </motion.div>
        </div>

        <div className="lg:w-1/2 relative w-full flex justify-center lg:justify-end">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -20 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="relative z-10"
          >
            <img 
              src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1593510526085-78351cc9ab95?q=80&w=2938&auto=format&fit=crop'} 
              alt="Performance Tire" 
              className="w-full max-w-[500px] drop-shadow-[0_0_50px_rgba(234,179,8,0.3)] filter contrast-125 saturate-0" 
            />
            {/* Caution Tape Effect */}
            <div className="absolute top-1/2 -left-10 w-[120%] h-12 bg-[#EAB308] -rotate-[15deg] mix-blend-difference flex items-center justify-between px-4 overflow-hidden pointer-events-none">
              {[...Array(6)].map((_, i) => (
                 <span key={i} className="text-[#111111] font-black italic text-xl uppercase tracking-tighter">CAUTION</span>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
registerSection('hero', 'lastikci_bespoke_hero', LastikciBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Lastikci Services (Grid) ──
export function LastikciBespokeServices({ business, content }: SectionProps<any>) {
  const services = business?.services?.length ? business.services : [
    { title: 'Sıfır & Çıkma Lastik', desc: 'Michelin, Pirelli, Continental ve Lassa gibi dünya markaları.', icon: <Gauge /> },
    { title: '3D Rot Balans', desc: 'Lazer teknolojisiyle milimetrik rot ve balans ayarı.', icon: <Wrench /> },
    { title: '7/24 Acil Yol Yardım', desc: 'Yolda kaldığınız an mobil servis aracımızla yanınızdayız.', icon: <ShieldAlert /> },
  ];

  return (
    <section className="bg-[#1A1A1A] text-white py-24 md:py-32 border-b-8 border-[#EAB308]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Garaj Hizmetleri'}
            </h2>
            <p className="text-[#9CA3AF] text-xl font-bold">Aracınızın yolla olan tek bağı lastikleridir. Riske atmayın.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#111111] border-2 border-white/5 p-10 hover:border-[#EAB308] transition-colors group relative overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#EAB308]/10 rounded-full blur-2xl group-hover:bg-[#EAB308]/30 transition-colors" />
              
              <div className="text-[#EAB308] mb-8">
                {React.cloneElement(service.icon, { className: 'w-12 h-12' })}
              </div>
              
              <h3 className="text-2xl font-black uppercase italic mb-4">{service.title}</h3>
              <p className="text-[#9CA3AF] font-medium leading-relaxed">{service.desc}</p>
              
              <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                <ArrowRightSquare className="w-8 h-8 text-white/20 group-hover:text-[#EAB308] transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'lastikci_bespoke_services', LastikciBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Lastikci Info/About ──
export function LastikciBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-white py-24 md:py-32 text-[#111111]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative">
            <div className="absolute inset-0 bg-[#EAB308] translate-x-4 translate-y-4 -z-10" />
            <img 
              src="https://images.unsplash.com/photo-1610640003057-08ab3ec0d1f7?q=80&w=2835&auto=format&fit=crop" 
              alt="Garage" 
              className="w-full aspect-[4/3] object-cover border-4 border-[#111111] grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
            />
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-none uppercase tracking-tighter italic">
              {content?.title || 'Performans ve\nGüvenlik Bir Arada.'}
            </h2>
            <div className="space-y-6 text-[#4B5563] font-bold text-lg leading-snug mb-10">
              <p>
                {(business?.description as string) || 'Lastik tamiri, değişimi, jant düzeltme ve rot balans işlemlerini son sistem elektronik cihazlarımızla sıfır hata payıyla yapıyoruz.'}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="bg-[#111111] text-white px-6 py-4 font-black uppercase italic">Nitrojen Dolumu</div>
              <div className="bg-[#111111] text-white px-6 py-4 font-black uppercase italic">Lastik Oteli</div>
              <div className="bg-[#EAB308] text-[#111111] px-6 py-4 font-black uppercase italic">Akü Servisi</div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'lastikci_bespoke_about', LastikciBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Lastikci Contact ──
export function LastikciBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#111111] text-white py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-4">
            Pit Stop.
          </h2>
          <p className="text-2xl text-[#EAB308] font-black italic">Randevu Al veya Acil Servis Çağır</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-5 bg-[#EAB308] p-10 text-[#111111] flex flex-col justify-center">
            <h3 className="text-3xl font-black uppercase italic mb-8 border-b-4 border-[#111111] pb-4">İletişim</h3>
            
            <div className="space-y-8">
              <div>
                <span className="block font-bold uppercase tracking-widest text-sm mb-1">Acil Hat / 7-24</span>
                <div className="text-4xl font-black">{business?.phone || '0532 999 88 77'}</div>
              </div>
              <div>
                <span className="block font-bold uppercase tracking-widest text-sm mb-1">Garaj Adresi</span>
                <div className="text-xl font-bold uppercase">{business?.address || 'Oto Sanayi Sitesi 2. Kısım No:42\nMaslak, İstanbul'}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#1A1A1A] p-10 border-2 border-white/10">
            <form className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-[#9CA3AF] mb-2">Ad Soyad</label>
                    <input type="text" className="w-full bg-[#111111] border-2 border-white/20 p-4 text-white font-bold focus:outline-none focus:border-[#EAB308] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-[#9CA3AF] mb-2">Araç Marka / Model</label>
                    <input type="text" className="w-full bg-[#111111] border-2 border-white/20 p-4 text-white font-bold focus:outline-none focus:border-[#EAB308] transition-colors" />
                  </div>
               </div>
               <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[#9CA3AF] mb-2">Telefon</label>
                  <input type="tel" className="w-full bg-[#111111] border-2 border-white/20 p-4 text-white font-bold focus:outline-none focus:border-[#EAB308] transition-colors" />
               </div>
               <button className="bg-white text-[#111111] font-black uppercase tracking-widest px-8 py-5 w-full hover:bg-[#EAB308] transition-colors mt-4 text-lg italic">
                  Randevu Talebi Gönder
               </button>
            </form>
          </div>
          
        </div>

      </div>
    </section>
  )
}
registerSection('contact', 'lastikci_bespoke_contact', LastikciBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
