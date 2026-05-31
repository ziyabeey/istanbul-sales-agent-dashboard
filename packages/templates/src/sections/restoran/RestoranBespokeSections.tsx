'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Utensils, Star, Clock, MapPin, PhoneCall } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Restoran Immersive Hero ──
export function RestoranBespokeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative h-[90svh] bg-stone-900 text-stone-50 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2874&auto=format&fit=crop'} 
          alt="Restoran Atmosferi" 
          className="w-full h-full object-cover scale-105 animate-[slowZoom_20s_ease-in-out_infinite_alternate]" 
        />
        <div className="absolute inset-0 bg-stone-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-12 bg-orange-500" />
          <span className="text-orange-400 font-serif italic tracking-widest text-lg">
            {content?.badge || 'LEZZET SANATI'}
          </span>
          <div className="h-px w-12 bg-orange-500" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.2 }}
          className="text-6xl md:text-8xl font-serif text-stone-100 mb-8"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {content?.title || business?.name || 'Geleneksel Tatlar,\nModern Sunum.'}
        </motion.h1>

        <motion.button 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}
          className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-sm font-semibold tracking-wide transition-colors"
        >
          Masenizi Ayırtın
        </motion.button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
      `}} />
    </section>
  )
}
registerSection('hero', 'restoran_bespoke_hero', RestoranBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Restoran Masonry Menu ──
export function RestoranBespokeServices({ business, content }: SectionProps<any>) {
  const items = business?.services?.length ? business.services : [
    { name: 'Izgara Çeşitleri', price: '₺450', desc: 'Özel soslarla marine edilmiş taze etler.', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2938&auto=format&fit=crop' },
    { name: 'Şefin Spesiyali', price: '₺650', desc: 'Sadece bize özel imza tabak.', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=2865&auto=format&fit=crop' },
    { name: 'Taze Deniz Ürünleri', price: '₺550', desc: 'Günlük tutulan deniz mahsulleri.', img: 'https://images.unsplash.com/photo-1599084920556-912f2777f98e?q=80&w=2874&auto=format&fit=crop' },
    { name: 'Gurme Tatlılar', price: '₺200', desc: 'Yemeğinizi taçlandıracak el yapımı tatlılar.', img: 'https://images.unsplash.com/photo-1563805042-7684c8e9e5cb?q=80&w=2827&auto=format&fit=crop' },
  ];

  return (
    <section className="py-24 bg-stone-100 text-stone-900">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <Utensils className="w-8 h-8 mx-auto text-orange-600 mb-4" />
          <h2 className="text-4xl md:text-5xl font-serif text-stone-800 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || 'Öne Çıkan Lezzetler'}
          </h2>
          <p className="text-stone-500 font-serif italic max-w-lg mx-auto">En taze malzemelerle hazırlanan eşsiz menümüz.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-md shadow-lg ${i === 1 || i === 2 ? 'md:aspect-square' : 'md:aspect-[4/3]'} aspect-[4/3]`}
            >
              <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent flex flex-col justify-end p-8">
                <div className="flex justify-between items-end mb-2">
                  <h3 className="text-2xl font-serif text-stone-100">{item.name}</h3>
                  <span className="text-xl text-orange-400 font-bold">{item.price}</span>
                </div>
                <p className="text-stone-300 text-sm font-light">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="border border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white px-8 py-3 uppercase tracking-widest text-sm font-semibold transition-colors">
            Tüm Menüyü İncele
          </button>
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'restoran_bespoke_services', RestoranBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Restoran Story About ──
export function RestoranBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="py-24 bg-stone-900 text-stone-50">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-5/12 relative">
            <div className="absolute -inset-4 border border-orange-500/30" />
            <img 
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=2877&auto=format&fit=crop" 
              alt="Şefimiz" 
              className="w-full aspect-[3/4] object-cover relative z-10"
            />
          </div>
          
          <div className="w-full lg:w-7/12 lg:pl-12">
            <Star className="w-8 h-8 text-orange-500 mb-6" />
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Hikayemiz: Tarladan Tabağa'}
            </h2>
            <div className="space-y-6 text-stone-400 leading-relaxed font-light text-lg">
              <p>
                {(business?.description as string) || 'Her şey en iyi malzemeyi bulma tutkusuyla başladı. Yöresel üreticilerden günlük olarak temin ettiğimiz taze ürünleri, geleneksel tarifler ve modern tekniklerle harmanlıyoruz.'}
              </p>
              <p>
                Mutfaktaki şeflerimiz sadece yemek pişirmiyor, her tabakta size unutulmaz bir deneyim ve bir hikaye sunuyor. Sıcak atmosferimiz ve özenli servisimizle sizi ağırlamaktan mutluluk duyuyoruz.
              </p>
            </div>
            
            <div className="mt-10 pt-10 border-t border-stone-800 flex gap-12">
              <div className="text-center">
                <div className="text-3xl font-serif text-stone-100">20+</div>
                <div className="text-xs text-orange-500 uppercase tracking-widest mt-1">Yıllık Tecrübe</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif text-stone-100">100%</div>
                <div className="text-xs text-orange-500 uppercase tracking-widest mt-1">Taze Malzeme</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'restoran_bespoke_about', RestoranBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Restoran Warm Contact ──
export function RestoranBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-stone-100 text-stone-900 border-t border-stone-200">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-12 md:p-24 flex flex-col justify-center bg-white">
          <h2 className="text-4xl font-serif mb-2 text-stone-800">Bize Ulaşın</h2>
          <p className="text-stone-500 mb-12 italic font-serif">Rezervasyon ve özel etkinlikler için.</p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-orange-600 mt-1" />
              <div>
                <div className="font-bold text-stone-800 mb-1">Adres</div>
                <div className="text-stone-600">{business?.address || 'Moda Sahil, Kadıköy, İstanbul'}</div>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-orange-600 mt-1" />
              <div>
                <div className="font-bold text-stone-800 mb-1">Çalışma Saatleri</div>
                <div className="text-stone-600">Her Gün: 11:00 - 23:30</div>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <PhoneCall className="w-6 h-6 text-orange-600 mt-1" />
              <div>
                <div className="font-bold text-stone-800 mb-1">Rezervasyon</div>
                <div className="text-stone-600">{business?.phone || '0216 000 00 00'}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-stone-900 p-12 md:p-24 text-stone-100 flex flex-col justify-center">
          <h3 className="text-2xl font-serif mb-8">Masenizi Ayırtın</h3>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <input type="text" placeholder="Adınız" className="w-full bg-stone-800 border border-stone-700 p-4 text-white focus:border-orange-500 outline-none rounded-sm" />
              <input type="text" placeholder="Kişi Sayısı" className="w-full bg-stone-800 border border-stone-700 p-4 text-white focus:border-orange-500 outline-none rounded-sm" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <input type="date" className="w-full bg-stone-800 border border-stone-700 p-4 text-white focus:border-orange-500 outline-none rounded-sm" />
              <input type="time" className="w-full bg-stone-800 border border-stone-700 p-4 text-white focus:border-orange-500 outline-none rounded-sm" />
            </div>
            <button className="w-full bg-orange-600 text-white font-bold tracking-widest uppercase py-4 hover:bg-orange-700 transition-colors rounded-sm">
              Rezervasyon Yap
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'restoran_bespoke_contact', RestoranBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
