'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Truck, PackageCheck, Route, ShieldCheck, MapPin, Phone } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Nakliyat Industrial Hero ──
export function NakliyatBespokeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[90svh] bg-[#0A0A0B] text-white overflow-hidden flex items-center">
      {/* Heavy industrial background styling */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0A0A0B]/80 z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8ed3c84a0c?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale" />
        {/* Diagonal caution stripes */}
        <div className="absolute bottom-0 right-0 w-1/3 h-4 bg-gradient-to-r from-transparent via-[#FBBF24] to-[#FBBF24] z-20" />
      </div>

      <div className="relative z-20 max-w-[var(--container-default)] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 pt-20">
        <div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }}
            className="inline-flex items-center gap-2 bg-[#FBBF24] text-black px-4 py-1.5 font-black uppercase tracking-widest text-xs mb-8"
            style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)' }}
          >
            <Truck className="w-4 h-4" />
            {content?.badge || 'AĞIR YÜK LOJİSTİĞİ'}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
            className="text-6xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {content?.title || business?.name || 'GÜVENLİ.\nHIZLI.\nNET.'}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-xl text-zinc-400 font-medium max-w-md mb-10 border-l-4 border-[#FBBF24] pl-6"
          >
            {content?.description || (business?.description as string) || 'Türkiye\'nin her noktasına endüstriyel standartlarda, garantili taşımacılık hizmeti sunuyoruz.'}
          </motion.p>
        </div>
        
        <div className="hidden lg:flex items-end justify-end pb-12">
          <motion.div 
            initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-zinc-900 border-2 border-zinc-800 p-8 w-full max-w-sm relative"
          >
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#FBBF24] z-30" />
            <h3 className="font-bold text-2xl uppercase tracking-wider mb-6">Hızlı Teklif Al</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Nereden?" className="w-full bg-zinc-950 border border-zinc-800 p-4 text-white uppercase text-sm font-bold placeholder-zinc-600 focus:border-[#FBBF24] outline-none" />
              <input type="text" placeholder="Nereye?" className="w-full bg-zinc-950 border border-zinc-800 p-4 text-white uppercase text-sm font-bold placeholder-zinc-600 focus:border-[#FBBF24] outline-none" />
              <button className="w-full bg-[#FBBF24] text-black font-black uppercase tracking-widest py-4 hover:bg-white transition-colors">
                FİYAT HESAPLA
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
registerSection('hero', 'nakliyat_bespoke_hero', NakliyatBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Nakliyat Services Grid ──
export function NakliyatBespokeServices({ business, content }: SectionProps<any>) {
  const items = business?.services?.length ? business.services : [
    { title: 'Şehirler Arası', desc: '81 ile kesintisiz lojistik ağı.', icon: <Route /> },
    { title: 'Sigortalı Taşıma', desc: 'Tüm yükleriniz 100% güvence altında.', icon: <ShieldCheck /> },
    { title: 'Depolama', desc: 'Modern ve güvenlikli depolama tesisleri.', icon: <PackageCheck /> },
  ];

  return (
    <section className="py-24 bg-zinc-950 text-white border-t border-zinc-900">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || 'LOJİSTİK KAPASİTEMİZ'}
          </h2>
          <div className="w-24 h-2 bg-[#FBBF24] mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900 p-10 border border-zinc-800 hover:border-[#FBBF24] transition-colors group relative overflow-hidden"
            >
              <div className="w-16 h-16 bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[#FBBF24] mb-8 group-hover:bg-[#FBBF24] group-hover:text-black transition-colors">
                {item.icon || <Truck />}
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-wide mb-4">{item.title || item.name}</h3>
              <p className="text-zinc-400 font-medium">{item.desc || 'Profesyonel operasyon ekibimizle sürecin her adımında yanınızdayız.'}</p>
              
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#FBBF24] group-hover:w-full transition-all duration-500 ease-out" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'nakliyat_bespoke_services', NakliyatBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Nakliyat About ──
export function NakliyatBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="py-32 bg-[#0A0A0B] text-white">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'SEKTÖRDE SIFIR HATA PRENSİBİ'}
            </h2>
            <p className="text-xl text-zinc-400 mb-8 border-l-4 border-zinc-800 pl-6 leading-relaxed">
              {(business?.description as string) || 'Lojistik sadece yük taşımak değil, güven taşımaktır. Yılların getirdiği endüstriyel deneyimimiz ve geniş araç filomuzla Türkiye\'nin en zorlu projelerinin altından kalkıyoruz.'}
            </p>
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <div className="text-5xl font-black text-[#FBBF24] mb-2">250+</div>
                <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Geniş Araç Filosu</div>
              </div>
              <div>
                <div className="text-5xl font-black text-[#FBBF24] mb-2">15M</div>
                <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Taşınan Tonaj</div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-square bg-zinc-900 border border-zinc-800 relative z-10 overflow-hidden" style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)' }}>
               <img 
                 src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2940&auto=format&fit=crop" 
                 alt="Nakliyat Operasyonu" 
                 className="w-full h-full object-cover opacity-80"
               />
            </div>
            {/* Decoration */}
            <div className="absolute top-10 -right-10 w-full h-full border-2 border-[#FBBF24] z-0" style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'nakliyat_bespoke_about', NakliyatBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Nakliyat Contact ──
export function NakliyatBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#FBBF24] text-black">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
              YÜKÜNÜZÜ<br/>BİZE BIRAKIN.
            </h2>
            <p className="text-xl font-bold mb-12 max-w-md">
              Operasyon ekibimiz 7/24 hizmetinizde. Hemen arayın, filomuzu size yönlendirelim.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-black text-[#FBBF24] p-4">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-widest opacity-80">Merkez Operasyon</div>
                  <div className="text-2xl font-black">{business?.phone || '444 0 000'}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-black text-[#FBBF24] p-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-widest opacity-80">Lojistik Üssü</div>
                  <div className="text-lg font-black">{business?.address || 'Gebze OSB, Kocaeli'}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-black p-10 text-white">
            <h3 className="text-2xl font-black uppercase tracking-wider mb-8">İletişim Formu</h3>
            <form className="space-y-6">
              <input type="text" placeholder="FİRMA ADI" className="w-full bg-zinc-900 border border-zinc-800 p-4 uppercase text-sm font-bold focus:border-[#FBBF24] outline-none" />
              <input type="text" placeholder="TELEFON" className="w-full bg-zinc-900 border border-zinc-800 p-4 uppercase text-sm font-bold focus:border-[#FBBF24] outline-none" />
              <textarea placeholder="PROJE DETAYI (TONAJ / LOKASYON)" rows={4} className="w-full bg-zinc-900 border border-zinc-800 p-4 uppercase text-sm font-bold focus:border-[#FBBF24] outline-none resize-none" />
              <button className="w-full bg-[#FBBF24] text-black font-black uppercase tracking-widest py-5 hover:bg-white transition-colors">
                GÖNDER
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'nakliyat_bespoke_contact', NakliyatBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
