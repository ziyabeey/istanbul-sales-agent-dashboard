'use client'

import React, { ComponentType, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, Maximize, Bed, Bath, ArrowUpRight, Search, Building } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Emlak Glassmorphism Hero ──
export function EmlakBespokeHero({ business, content }: SectionProps<any>) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative h-screen w-full bg-slate-900 text-white flex items-center justify-center overflow-hidden">
      <motion.div style={{ scale, opacity }} className="absolute inset-0 z-0">
        <img 
          src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2950&auto=format&fit=crop'} 
          alt="Lüks Villa" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-slate-900/40" />
      </motion.div>

      <div className="relative z-20 w-full max-w-[var(--container-default)] mx-auto px-6 mt-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" as any }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8">
            <Building className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-50">
              {content?.badge || 'PREMIUM PORTFÖY'}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-light leading-tight mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || business?.name || 'Gelecekteki Evinize\nHoş Geldiniz.'}
          </h1>

          <p className="text-xl text-slate-200 font-light max-w-xl mb-12">
            {content?.description || (business?.description as string) || 'Şehrin en prestijli lokasyonlarında, yaşam tarzınıza en uygun lüks gayrimenkul seçenekleri.'}
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 md:p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-end shadow-2xl max-w-4xl"
        >
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-300 mb-2 pl-2">Lokasyon</label>
            <input type="text" placeholder="Örn: Bebek, Beşiktaş" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 transition-colors" />
          </div>
          <div className="w-full md:w-48">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-300 mb-2 pl-2">Mülk Tipi</label>
            <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors appearance-none">
              <option value="" className="text-slate-900">Tümü</option>
              <option value="villa" className="text-slate-900">Villa</option>
              <option value="daire" className="text-slate-900">Lüks Daire</option>
              <option value="yali" className="text-slate-900">Yalı</option>
            </select>
          </div>
          <button className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
            <Search className="w-5 h-5" />
            <span>Ara</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
registerSection('hero', 'emlak_bespoke_hero', EmlakBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Emlak Showcase Grid ──
export function EmlakBespokeServices({ business, content }: SectionProps<any>) {
  const items = business?.services?.length ? business.services : [
    { title: 'Boğaz Manzaralı Yalı', price: '₺150,000,000', location: 'Bebek, İstanbul', specs: { bed: 6, bath: 4, sqft: 850 }, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop' },
    { title: 'Modern Penthouse', price: '₺45,000,000', location: 'Levent, İstanbul', specs: { bed: 4, bath: 3, sqft: 420 }, img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2940&auto=format&fit=crop' },
    { title: 'Müstakil Lüks Villa', price: '₺85,000,000', location: 'Zekeriyaköy, İstanbul', specs: { bed: 5, bath: 5, sqft: 600 }, img: 'https://images.unsplash.com/photo-1600566753086-00f18efc2291?q=80&w=2940&auto=format&fit=crop' },
  ];

  return (
    <section className="py-32 bg-slate-50 text-slate-900">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Özel Portföyümüz'}
            </h2>
            <p className="text-slate-500 font-light">Sadece en iyilerini sizin için seçtik.</p>
          </div>
          <button className="hidden md:inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
            Tüm İlanlar <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 group border border-slate-100"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-slate-900 shadow-lg">
                  {item.price}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-slate-500 mb-3 text-sm font-medium">
                  <MapPin className="w-4 h-4 text-emerald-500" /> {item.location}
                </div>
                <h3 className="text-2xl font-semibold mb-6">{item.title}</h3>
                <div className="flex items-center gap-6 text-slate-600 border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-2"><Bed className="w-5 h-5" /> <span className="font-medium">{item.specs.bed}</span></div>
                  <div className="flex items-center gap-2"><Bath className="w-5 h-5" /> <span className="font-medium">{item.specs.bath}</span></div>
                  <div className="flex items-center gap-2"><Maximize className="w-5 h-5" /> <span className="font-medium">{item.specs.sqft} m²</span></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'emlak_bespoke_services', EmlakBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Emlak Trusted About ──
export function EmlakBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-900/20 blur-[150px] rounded-full" />
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-light leading-tight mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Gayrimenkulde Yeni Bir Standart'}
            </h2>
            <div className="w-20 h-1 bg-emerald-500 mb-8" />
            <p className="text-lg text-slate-400 font-light leading-relaxed mb-10">
              {(business?.description as string) || '15 yılı aşkın tecrübemiz ve geniş elit müşteri ağımızla, sadece ev satmıyor; yaşam tarzı sunuyoruz. Piyasa analizleri, gizlilik ilkemiz ve profesyonel danışman kadromuzla yanınızdayız.'}
            </p>
            <div className="grid grid-cols-2 gap-10">
              <div>
                <div className="text-5xl font-light text-emerald-400 mb-2">1.2B+</div>
                <div className="text-xs tracking-widest text-slate-500 uppercase font-bold">Yıllık Satış Hacmi (₺)</div>
              </div>
              <div>
                <div className="text-5xl font-light text-emerald-400 mb-2">500+</div>
                <div className="text-xs tracking-widest text-slate-500 uppercase font-bold">Mutlu Aile</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2873&auto=format&fit=crop" 
              alt="Ofis" 
              className="rounded-[2rem] object-cover w-full aspect-square border border-white/10 shadow-2xl"
            />
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl max-w-xs hidden md:block border border-slate-100">
               <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                   <Building className="w-6 h-6" />
                 </div>
                 <div className="font-bold text-slate-900 text-lg">Lisanslı Broker</div>
               </div>
               <p className="text-slate-500 text-sm">Tüm danışmanlarımız uluslararası lüks konut sertifikasına sahiptir.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'emlak_bespoke_about', EmlakBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Emlak Clean Contact ──
export function EmlakBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-white text-slate-900 border-t border-slate-100">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12 py-32">
        <div className="bg-slate-50 rounded-[3rem] p-12 md:p-20 border border-slate-100 shadow-xl shadow-slate-200/50">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Kahve İçmeye Bekliyoruz.</h2>
            <p className="text-slate-500 text-lg">Hayalinizdeki evi bulmak veya mülkünüzü en doğru fiyata değerlendirmek için bizimle iletişime geçin.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-16">
            <div>
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-md mb-6 text-emerald-600">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Merkez Ofis</h3>
              <p className="text-slate-500">{business?.address || 'Zorlu Center, Teras Evler No:4\nBeşiktaş, İstanbul'}</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-md mb-6 text-emerald-600">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">İletişim</h3>
              <p className="text-slate-500">{business?.phone || '+90 212 000 00 00'}<br/>info@emlakbespoke.com</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-md mb-6 text-emerald-600">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Çalışma Saatleri</h3>
              <p className="text-slate-500">Pzt - Cmt: 09:00 - 19:00<br/>Pazar: Sadece Randevu ile</p>
            </div>
          </div>
          
          <form className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Adınız Soyadınız</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Telefon Numaranız</label>
                <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all" />
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-sm font-bold text-slate-700 mb-2">Mesajınız</label>
              <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none" placeholder="Size nasıl yardımcı olabiliriz?" />
            </div>
            <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-emerald-600 transition-colors">
              Gönder
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'emlak_bespoke_contact', EmlakBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
