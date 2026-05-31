'use client';

import React from 'react';
import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { Store, MapPin, Heart, ArrowRight, Truck, PhoneCall } from 'lucide-react';
import type { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
};

// ── Hero ──
export function CicekciMahalleHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden" style={{ background: 'var(--color-surface)', color: 'var(--color-text)' }}>
      {/* Circle decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20" style={{ background: 'var(--color-accent)' }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full translate-y-1/2 -translate-x-1/4 opacity-10" style={{ background: 'var(--color-text)' }} />

      <div className="max-w-[1200px] w-full mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
           <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 font-bold text-sm rounded-full mb-6 shadow-sm" style={{ background: 'var(--color-surface-elevated)', color: 'var(--color-accent)' }}>
              <Store className="w-4 h-4" /> {content?.badge || 'MAHALLENİZİN ÇİÇEKÇİSİ'}
           </motion.div>
           <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
             {content?.title || 'Taptaze Çiçekler, İçten Gülüşler'}
           </motion.h1>
           <motion.p variants={fadeUp} className="text-xl opacity-80 mb-8 font-medium">
             {content?.subtitle || `${(business as any)?.name as string}, en taze mevsim çiçekleriyle sevdiklerinize unutulmaz sürprizler hazırlıyor.`}
           </motion.p>
           <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
             <a href="#urunler" className="inline-flex items-center gap-2 px-8 py-4 rounded-[var(--radius-lg)] font-bold text-white shadow-lg shadow-red-500/30 hover:-translate-y-1 transition-transform" style={{ background: 'var(--color-accent)' }}>
               Hemen Buket Seç <ArrowRight className="w-5 h-5" />
             </a>
             <a href="#iletisim" className="px-8 py-4 font-bold border-2 rounded-[var(--radius-lg)]" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
               Bizi Arayın
             </a>
           </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="relative aspect-square md:aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden shadow-2xl border-4" style={{ borderColor: 'var(--color-surface-elevated)' }}>
           <img src="https://images.unsplash.com/photo-1572454591674-2739f30d8c40?auto=format&fit=crop&q=80" alt="Dükkan" className="w-full h-full object-cover" />
           <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl backdrop-blur-md bg-white/90 shadow-lg flex items-center gap-4" style={{ color: 'var(--color-text)' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                 %100
              </div>
              <div>
                 <div className="font-bold">Müşteri Memnuniyeti</div>
                 <div className="text-sm opacity-70">Güler yüzlü hizmet garantisi</div>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── About ──
export function CicekciMahalleAbout({ business }: SectionProps<any>) {
  return (
    <section id="hakkimizda" className="py-20" style={{ background: 'var(--color-bg)' }}>
       <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl mb-6 flex items-center justify-center -rotate-12" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
             <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Sevgiyi Çiçeklerle Anlatıyoruz</h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto font-medium leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
             Yıllardır mahallemizde iyi günde, kötü günde yanınızdayız. Doğum günleri, yıldönümleri, özür dileme buketleri veya sadece içinizden geldiği için tasarladığımız özenli aranjmanlarla hislerinize tercüman oluyoruz.
          </p>
       </div>
    </section>
  );
}

// ── Services (Öne Çıkan Ürünler) ──
export function CicekciMahalleServices({ business }: SectionProps<any>) {
  const products = [
    { title: 'Klasik Kırmızı Gül', desc: 'Seni seviyorum demenin en klasik ve zarif yolu. Taze kırmızı güller ve okaliptus yaprakları.', price: '₺750' },
    { title: 'Kır Çiçekleri Buketi', desc: 'Doğal, samimi ve rengarenk. Mevsimin en canlı kır çiçeklerinden özenle derlenmiş.', price: '₺450' },
    { title: 'Canlı Saksı Bitkileri', desc: 'Ev ve ofis hediyesi arayanlar için dayanıklı ve şık kurdeleli saksı bitkileri.', price: '₺350' }
  ];

  return (
    <section id="urunler" className="py-20" style={{ background: 'var(--color-surface)' }}>
       <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
             <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Öne Çıkan Buketler</h2>
             <div className="flex items-center gap-2 font-bold" style={{ color: 'var(--color-accent)' }}>
                <Truck className="w-5 h-5" /> Adrese Hızlı Teslimat
             </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             {products.map((prd, i) => (
                <div key={i} className="bg-white p-8 rounded-[var(--radius-lg)] border shadow-sm transition-transform hover:-translate-y-2 group cursor-pointer" style={{ borderColor: 'var(--color-border)' }}>
                   <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{prd.title}</h3>
                   <p className="opacity-70 text-sm mb-6 min-h-[60px]" style={{ color: 'var(--color-text-secondary)' }}>{prd.desc}</p>
                   <div className="flex items-center justify-between">
                      <div className="text-2xl font-black" style={{ color: 'var(--color-accent)' }}>{prd.price}</div>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all font-bold text-white shadow-md" style={{ background: 'var(--color-accent)' }}>
                         <ArrowRight className="w-5 h-5" />
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
export function CicekciMahalleContact({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-20" style={{ background: 'var(--color-bg)' }}>
       <div className="max-w-[1000px] mx-auto px-6 bg-[var(--color-surface)] p-10 md:p-16 rounded-[var(--radius-lg)] border text-center shadow-xl" style={{ borderColor: 'var(--color-border)' }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Bize Ulaşın</h2>
          <p className="opacity-80 text-lg mb-10" style={{ color: 'var(--color-text-secondary)' }}>Siparişleriniz veya özel istekleriniz için telefon numaramızdan bizi arayabilir ya da WhatsApp üzerinden yazabilirsiniz.</p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
             <div className="flex items-center gap-4 bg-white px-8 py-5 rounded-[var(--radius-md)] border shadow-sm" style={{ borderColor: 'var(--color-border)' }}>
                <PhoneCall className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
                <a href={`tel:${(business as any)?.phoneClean as string}`} className="text-3xl font-black" style={{ color: 'var(--color-text)' }}>{(business as any)?.phone as string}</a>
             </div>
          </div>
          
          <div className="inline-flex items-center justify-center gap-3 font-medium opacity-80 bg-white px-6 py-3 rounded-full border" style={{ color: 'var(--color-text)', borderColor: 'var(--color-border)' }}>
             <MapPin className="w-5 h-5 text-red-500" />
             {(business as any)?.address as string}
          </div>
       </div>
    </section>
  );
}

registerSection('hero', 'cicekci_mahalle_hero', CicekciMahalleHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('about', 'cicekci_mahalle_about', CicekciMahalleAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('services', 'cicekci_mahalle_services', CicekciMahalleServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('contact', 'cicekci_mahalle_contact', CicekciMahalleContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
