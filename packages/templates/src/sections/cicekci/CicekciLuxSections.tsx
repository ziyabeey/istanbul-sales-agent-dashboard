'use client';

import React from 'react';
import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, ChevronRight, PhoneCall, Gift, CheckCircle } from 'lucide-react';
import type { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

// ── Hero ──
export function CicekciLuxHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-full md:w-2/3 h-full mix-blend-luminosity opacity-40">
         <img src="https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&q=80" alt={(business as any)?.name as string} className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)] to-transparent" />
      </div>

      <div className="max-w-[1200px] w-full mx-auto px-6 relative z-10 grid md:grid-cols-2">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col justify-center">
           <motion.div variants={fadeUp} className="inline-flex items-center gap-2 tracking-[0.3em] text-xs font-bold uppercase mb-8" style={{ color: 'var(--color-accent)' }}>
              <Sparkles className="w-4 h-4" /> {content?.badge || 'PREMIUM BUKETLER'}
           </motion.div>
           <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl mb-8 leading-[1.1] italic" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
             {content?.title || 'Lüksün Floral Hali'}
           </motion.h1>
           <motion.p variants={fadeUp} className="text-lg opacity-80 mb-10 max-w-md font-light leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
             {content?.subtitle || `${(business as any)?.name as string}, Hollanda'dan ithal edilen en nadide orkideler ve ekvator gülleriyle tasarlanmış haute couture VIP aranjmanlar sunar.`}
           </motion.p>
           <motion.div variants={fadeUp} className="flex items-center gap-6">
             <a href="#koleksiyon" className="inline-flex items-center gap-4 px-10 py-5 uppercase tracking-widest text-xs font-bold transition-all hover:opacity-80 border" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)', borderColor: 'var(--color-accent)' }}>
               Koleksiyon <ChevronRight className="w-4 h-4" />
             </a>
             <a href="#iletisim" className="uppercase tracking-widest text-xs font-bold hover:underline" style={{ color: 'var(--color-text)' }}>
               Özel Sipariş
             </a>
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── About ──
export function CicekciLuxAbout({ business }: SectionProps<any>) {
  return (
    <section id="hakkimizda" className="py-24" style={{ background: 'var(--color-surface)' }}>
       <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
             <img src="https://images.unsplash.com/photo-1582735741362-7561dc655ae2?auto=format&fit=crop&q=80" alt="VIP Çiçek" className="w-full aspect-[4/5] object-cover rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" />
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="md:pl-10 relative">
             <motion.div variants={fadeUp} className="text-[12rem] leading-none font-bold absolute -top-20 -left-10 opacity-5 select-none" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                VIP
             </motion.div>
             <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl mb-10 italic" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                Duyguların En Zarif Tercümanı
             </motion.h2>
             <motion.p variants={fadeUp} className="text-lg opacity-80 mb-6 font-light leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                Sıradan bir çiçek değil, bir "statement" (ifade) arayanlar için... Kutulu ekvator güllerinden, devasa şakayık buketlerine kadar her tasarımımız, alıcısında unutulmaz bir etki bırakmak için özenle hazırlanır.
             </motion.p>
             <div className="space-y-4 mt-10">
                {['Hollanda İthali Egzotik Türler', 'Kişiye Özel Premium Kutu Seçenekleri', 'Aynı Gün VIP Araçla Teslimat'].map((f, i) => (
                   <motion.div variants={fadeUp} key={i} className="flex items-center gap-4 text-sm tracking-wide uppercase font-bold" style={{ color: 'var(--color-text)' }}>
                      <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} /> {f}
                   </motion.div>
                ))}
             </div>
          </motion.div>
       </div>
    </section>
  );
}

// ── Services (Koleksiyon) ──
export function CicekciLuxServices({ business }: SectionProps<any>) {
  const collections = [
    { title: 'The Infinity Roses', desc: '100 adet premium kırmızı Ekvator gülünün kadife siyah bir kutuda sunulduğu efsanevi aranjman.', price: '₺5.500' },
    { title: 'Royal Orchids', desc: 'Seramik ve antika görünümlü saksılarda, 4 dallı özel Hollanda orkide tasarımı.', price: '₺3.200' },
    { title: 'Monochrome Peonies', desc: 'Mevsimin en iri ve gösterişli şakayıklarından oluşan, minimalist kraft kağıda sarılı nefes kesici pastel tonlar.', price: '₺4.000' }
  ];

  return (
    <section id="koleksiyon" className="py-24" style={{ background: 'var(--color-bg)' }}>
       <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
             <div className="max-w-xl">
                <Gift className="w-10 h-10 mb-6" style={{ color: 'var(--color-accent)' }} />
                <h2 className="text-4xl md:text-5xl italic mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Signature Koleksiyonu</h2>
                <p className="opacity-70 font-light" style={{ color: 'var(--color-text-secondary)' }}>Kaliteden asla ödün vermeyen elit tasarımlarımız.</p>
             </div>
          </div>
          
          <div className="space-y-12">
             {collections.map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-opacity-20 transition-all hover:pl-4" style={{ borderColor: 'var(--color-border)' }}>
                   <div className="flex-1 md:pr-12">
                      <h3 className="text-2xl md:text-3xl font-medium tracking-wide mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                         {item.title}
                      </h3>
                      <p className="opacity-60 font-light leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{item.desc}</p>
                   </div>
                   <div className="text-2xl font-bold tracking-widest" style={{ color: 'var(--color-accent)' }}>
                      {item.price}
                   </div>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
}

// ── Gallery ──
export function CicekciLuxGallery({ business }: SectionProps<any>) {
  const images = ['1583090623233-ffdfec922d52', '1520697042072-fecaf69d4e57', '1564756534947-8aed78864f1d', '1563241592-ceac664724cb'];
  return (
    <section id="galeri" className="py-24" style={{ background: 'var(--color-surface)' }}>
       <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl italic mb-12 text-center" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Göz Alıcı Detaylar</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
             {images.map((img, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="aspect-square bg-white relative group overflow-hidden">
                   <img src={`https://images.unsplash.com/photo-${img}?auto=format&fit=crop&q=80&w=400&h=400`} alt="Detail" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
}

// ── Contact ──
export function CicekciLuxContact({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-32" style={{ background: 'var(--color-bg)' }}>
       <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl italic mb-10" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>VIP Sipariş Hattı</h2>
          <p className="opacity-70 text-lg font-light mb-16 mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
             Tasarımlarımız butik olarak hazırlandığı için lütfen 24 saat önceden sipariş veriniz. Acil VIP talepleriniz için doğrudan iletişime geçin.
          </p>
          <div className="inline-flex flex-col items-center">
             <div className="text-xs tracking-[0.3em] font-bold uppercase opacity-50 mb-6" style={{ color: 'var(--color-text)' }}>Özel Müşteri Danışmanı</div>
             <a href={`tel:${(business as any)?.phoneClean as string}`} className="flex items-center gap-4 text-4xl md:text-6xl tracking-widest font-light transition-opacity hover:opacity-70 mb-12" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent)' }}>
                <PhoneCall className="w-8 h-8 opacity-50" /> {(business as any)?.phone as string}
             </a>
             <div className="text-sm font-light uppercase tracking-widest opacity-60" style={{ color: 'var(--color-text)' }}>
                {(business as any)?.address as string} // {(business as any)?.district as string}, {(business as any)?.city as string}
             </div>
          </div>
       </div>
    </section>
  );
}

registerSection('hero', 'cicekci_lux_hero', CicekciLuxHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('about', 'cicekci_lux_about', CicekciLuxAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('services', 'cicekci_lux_services', CicekciLuxServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('gallery', 'cicekci_lux_gallery', CicekciLuxGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
// Note: Intentionally avoiding creating empty unused Testimonials matching registry yet, simply falling back to standard if missing, or we can just omit.
registerSection('contact', 'cicekci_lux_contact', CicekciLuxContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
