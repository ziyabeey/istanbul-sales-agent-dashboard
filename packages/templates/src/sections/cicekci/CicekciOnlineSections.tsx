'use client';

import React from 'react';
import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Smartphone, RefreshCw, Zap } from 'lucide-react';
import type { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// ── Hero ──
export function CicekciOnlineHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative pt-32 pb-24" style={{ background: 'var(--color-surface)', color: 'var(--color-text)' }}>
      <div className="max-w-[1200px] w-full mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
           <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 font-bold text-xs rounded uppercase tracking-wider mb-6" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
              <Zap className="w-4 h-4" /> {content?.badge || 'AYNI GÜN TESLİMAT'}
           </motion.div>
           <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
             {content?.title || 'Bir Tıkla Mutluluk Gönder'}
           </motion.h1>
           <motion.p variants={fadeUp} className="text-lg opacity-70 mb-8 max-w-md">
             {content?.subtitle || `${(business as any)?.name as string} ile seçtiğiniz aranjman dakikalar içinde yola çıksın. Canlı sipariş takibi ve %100 taze çiçek garantisi.`}
           </motion.p>
           <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
             <a href="#katalog" className="px-8 py-4 rounded-xl font-bold text-white shadow-lg shadow-[var(--color-accent)]/30 hover:-translate-y-1 transition-transform flex items-center gap-3" style={{ background: 'var(--color-accent)' }}>
               Hemen Sipariş Ver <ShoppingBag className="w-5 h-5" />
             </a>
           </motion.div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="relative">
           {/* UI Mockup abstraction */}
           <div className="bg-white rounded-3xl shadow-2xl border p-4 w-4/5 mx-auto relative z-10" style={{ borderColor: 'var(--color-border)' }}>
              <div className="h-48 rounded-2xl mb-4 bg-gray-100 overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&q=80" alt="App Mockup" className="w-full h-full object-cover" />
              </div>
              <div className="h-4 w-3/4 rounded bg-gray-200 mb-2"></div>
              <div className="h-4 w-1/2 rounded bg-gray-200 mb-6"></div>
              <div className="h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-sm" style={{ background: 'var(--color-accent)' }}>Tıklayıp Sepete Ekle</div>
           </div>
           
           {/* Floating element */}
           <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border flex items-center gap-3" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                 <RefreshCw className="w-5 h-5" />
              </div>
              <div className="font-bold text-sm">Gerçek Zamanlı Takip</div>
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── About (Avantajlar) ──
export function CicekciOnlineAbout({ business }: SectionProps<any>) {
  const features = [
    { icon: <Smartphone className="w-8 h-8" />, title: 'Kolay Sipariş', desc: 'Saniyeler içinde sipariş oluşturun, online veya kapıda güvenle ödeyin.' },
    { icon: <Zap className="w-8 h-8" />, title: 'Express Teslimat', desc: 'Aynı gün, seçtiğiniz saat diliminde alıcısına teslim edilir.' },
    { icon: <Star className="w-8 h-8" />, title: '%100 Kalite', desc: 'Teslimattan hemen önce onayınız için ürünün fotoğrafı SMS ile iletilir.' }
  ];

  return (
    <section id="avantajlar" className="py-24" style={{ background: 'var(--color-bg)' }}>
       <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Neden {(business as any)?.name as string}?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
             {features.map((f, i) => (
                <div key={i} className="text-center p-8 rounded-2xl border bg-[var(--color-surface)] shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                   <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                      {f.icon}
                   </div>
                   <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                   <p className="opacity-70">{f.desc}</p>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
}

// ── Services (Katalog) ──
export function CicekciOnlineServices({ business }: SectionProps<any>) {
  const products = [
    { cat: 'Doğum Günü', title: 'Renkli Değerli Kutu', img: '1526047932273-fa41ba45f6ed', price: '₺499' },
    { cat: 'Sevgiliye', title: '101 Kırmızı Gül', img: '1540307687-f836dbfbeddd', price: '₺2.499' },
    { cat: 'İçimden Geldi', title: 'Mor Orkide Prens', img: '1532450379471-bc015f21fb15', price: '₺649' },
    { cat: 'Geçmiş Olsun', title: 'Taze Bahar Dalı', img: '1468327768560-af5ea1b20aff', price: '₺349' }
  ];

  return (
    <section id="katalog" className="py-24" style={{ background: 'var(--color-surface)' }}>
       <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Online Katalog</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
             {products.map((p, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border group cursor-pointer" style={{ borderColor: 'var(--color-border)' }}>
                   <div className="aspect-square overflow-hidden relative">
                      <img src={`https://images.unsplash.com/photo-${p.img}?auto=format&fit=crop&q=80&w=400&h=400`} alt={p.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                      <div className="absolute top-4 left-4 text-xs font-bold px-2 py-1 rounded bg-white/90 backdrop-blur" style={{ color: 'var(--color-text)' }}>{p.cat}</div>
                   </div>
                   <div className="p-6">
                      <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--color-text)' }}>{p.title}</h3>
                      <div className="flex items-center justify-between">
                         <div className="text-xl font-black" style={{ color: 'var(--color-accent)' }}>{p.price}</div>
                         <button className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: 'var(--color-accent)' }}>+</button>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
}

// ── Contact ──
export function CicekciOnlineContact({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-24" style={{ background: 'var(--color-bg)' }}>
       <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Desteğe mi ihtiyacınız var?</h2>
          <p className="opacity-70 mb-10 text-lg" style={{ color: 'var(--color-text-secondary)' }}>Siparişinizin durumu veya özel istekleriniz için çağrı merkezimiz haftanın 7 günü hizmetinizdedir.</p>
          <div className="p-8 rounded-3xl border inline-block mx-auto bg-white shadow-sm" style={{ borderColor: 'var(--color-border)' }}>
             <a href={`tel:${(business as any)?.phoneClean as string}`} className="text-4xl font-black transition-opacity hover:opacity-80" style={{ color: 'var(--color-accent)' }}>
                {(business as any)?.phone as string}
             </a>
             <div className="mt-4 font-medium opacity-60" style={{ color: 'var(--color-text)' }}>WhatsApp Destek Hattı Aktif</div>
          </div>
       </div>
    </section>
  );
}

registerSection('hero', 'cicekci_online_hero', CicekciOnlineHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('about', 'cicekci_online_about', CicekciOnlineAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('services', 'cicekci_online_services', CicekciOnlineServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('contact', 'cicekci_online_contact', CicekciOnlineContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
