'use client';

import React from 'react';
import type { ComponentType, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Droplet, Sparkles, Shield, ArrowRight, CheckCircle2, Phone, MapPin, Star } from 'lucide-react';
import type { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

// ═══════════════════════════════════════════
// Otoyikama Detay — Pro 
// Plan: pro | Inter
// ═══════════════════════════════════════════

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// ── 1. Hero ──
export function OtoyikamaDetayHero({ business, content, settings }: SectionProps<any>) {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-24 pb-20 overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {/* Dynamic Water Shape Background */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-bl-full opacity-5 pointer-events-none" style={{ background: 'var(--color-accent)' }} />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] rounded-tr-full opacity-5 pointer-events-none" style={{ background: 'var(--color-accent)' }} />
      
      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl">
           <motion.div variants={fadeUp} className="inline-flex px-4 py-2 rounded-full font-bold text-xs tracking-wider mb-6" style={{ background: 'var(--color-surface)', color: 'var(--color-accent)' }}>
              {content?.badge || 'DETAYLI OTO YIKAMA'}
           </motion.div>
           
           <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
             {content?.title || business?.name}
           </motion.h1>
           
           <motion.p variants={fadeUp} className="text-xl font-medium mb-10 opacity-80" style={{ color: 'var(--color-text)' }}>
             {content?.subtitle || business?.slogan}. Aracınızın ilk günkü temizliği ve parlaklığı için profesyonel dokunuş.
           </motion.p>
           
           <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
             <a href={content?.cta1?.href || '#iletisim'} className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-transform hover:-translate-y-1 shadow-lg hover:shadow-xl" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
               {content?.cta1?.text || 'Randevu Al & Başla'} <ArrowRight className="w-5 h-5" />
             </a>
           </motion.div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 50, rotate: 2 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ duration: 0.8 }} className="relative">
           <div className="rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80" alt="Detaylı Oto Yıkama" className="w-full h-auto object-cover" />
           </div>
           {/* Floating elements */}
           <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl flex items-center gap-4 border" style={{ borderColor: 'var(--color-border)' }}>
               <div className="p-3 rounded-full flex items-center justify-center" style={{ background: 'var(--color-surface)', color: 'var(--color-accent)' }}><Sparkles className="w-6 h-6" /></div>
               <div className="font-bold whitespace-nowrap" style={{ color: 'var(--color-text)' }}>İç & Dış Detay</div>
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── 2. About ──
export function OtoyikamaDetayAbout({ business, content }: SectionProps<any>) {
  return (
    <section id="hakkimizda" className="py-24" style={{ background: 'var(--color-surface)' }}>
       <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, filter: 'blur(10px)' }} whileInView={{ opacity: 1, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="order-2 md:order-1 relative">
             <img src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80" alt="Hakkımızda" className="rounded-3xl shadow-lg w-full" />
             <div className="absolute inset-0 rounded-3xl opacity-20" style={{ background: 'var(--color-accent)' }} />
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="order-1 md:order-2">
             <motion.h4 variants={fadeUp} className="font-bold text-sm tracking-widest uppercase mb-2" style={{ color: 'var(--color-accent)' }}>{content?.badge || 'BİZ KİMİZ?'}</motion.h4>
             <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                {content?.title || 'Bakterisiz, Tertemiz Bir Sürüş Deneyimi'}
             </motion.h2>
             <motion.p variants={fadeUp} className="text-lg font-medium opacity-80 mb-8 leading-relaxed" style={{ color: 'var(--color-text)' }}>
                {content?.description || `${(business as any)?.name as string}, en kaliteli şampuanlar, PH dengeli kimyasallar ve mikrofiber bezler kullanarak aracınıza zarar vermeden derinlemesine temizlik sunar. Koltuk yıkamadan motor temizliğine kadar tüm detayları önemsiyoruz.`}
             </motion.p>
             <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
               {['Buharlı Temizlik', 'PH Dengeli Ürünler', 'Ozonla Dezenfeksiyon', 'Seramik Kaplama'].map((item, i) => (
                 <div key={i} className="flex items-center gap-2 font-bold" style={{ color: 'var(--color-text)' }}>
                   <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--color-accent)' }} /> {item}
                 </div>
               ))}
             </motion.div>
          </motion.div>
       </div>
    </section>
  );
}

// ── 3. Services ──
export function OtoyikamaDetayServices({ business, content }: SectionProps<any>) {
  // Use business services if available, otherwise use defaults
  const services = business?.services?.length ? business.services : [
    { name: 'İç Dış Ekspres Yıkama', description: 'Araba şampuanı ile dış yıkama, iç vakumlama, cam temizliği.', price: '₺300', icon: 'droplet' },
    { name: 'Detaylı İç Temizlik', description: 'Tavan, taban, koltuk, kapı döşemeleri ve bagaj detayı.', price: '₺2.500', icon: 'sparkles', popular: true },
    { name: 'Seramik Kaplama', description: 'Boya koruma, su kaydırıcı özellik ve ince çizik giderme.', price: '₺5.000', icon: 'shield' }
  ];

  const getIcon = (name: string) => {
    switch(name) {
      case 'sparkles': return <Sparkles className="w-8 h-8"/>;
      case 'shield': return <Shield className="w-8 h-8"/>;
      default: return <Droplet className="w-8 h-8"/>;
    }
  };

  return (
    <section id="hizmetler" className="py-24" style={{ background: 'var(--color-bg)' }}>
       <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
             <h4 className="font-bold text-sm tracking-widest uppercase mb-2" style={{ color: 'var(--color-accent)' }}>{content?.badge || 'HİZMETLER'}</h4>
             <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Paketlerimiz</h2>
             <p className="font-medium opacity-80" style={{ color: 'var(--color-text)' }}>İhtiyacınıza uygun yıkama ve detaylı temizlik paketini seçin.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             {services.map((svc: any, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 rounded-[2rem] relative border transition-shadow hover:shadow-2xl flex flex-col" style={{ background: 'var(--color-surface)', borderColor: svc.popular ? 'var(--color-accent)' : 'var(--color-border)', boxShadow: svc.popular ? '0 20px 40px -10px var(--color-border)' : 'none' }}>
                   {svc.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold rounded-full text-white" style={{ background: 'var(--color-accent)' }}>EN ÇOK TERCİH EDİLEN</div>
                   )}
                   <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'var(--color-bg)', color: 'var(--color-accent)' }}>
                      {getIcon(svc.icon || 'droplet')}
                   </div>
                   <h3 className="text-2xl font-black mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{typeof svc === 'string' ? svc : svc.name}</h3>
                   <p className="font-medium opacity-70 mb-8 flex-grow" style={{ color: 'var(--color-text)' }}>{svc.description}</p>
                   {svc.price && (
                      <div className="pt-6 border-t font-black text-3xl" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                         {svc.price}
                      </div>
                   )}
                   <a href="#iletisim" className="mt-8 block w-full text-center py-3 rounded-xl font-bold transition-opacity hover:opacity-90" style={{ background: svc.popular ? 'var(--color-accent)' : 'var(--color-bg)', color: svc.popular ? 'var(--color-text-on-accent)' : 'var(--color-text)', border: svc.popular ? 'none' : '1px solid var(--color-border)' }}>
                      Randevu Al
                   </a>
                </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
}

// ── 4. Gallery ──
export function OtoyikamaDetayGallery({ content }: SectionProps<any>) {
  return (
    <section id="galeri" className="py-24" style={{ background: 'var(--color-surface)' }}>
       <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
             <div>
                <h2 className="text-3xl md:text-4xl font-black mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Galeri</h2>
                <p className="font-medium opacity-80" style={{ color: 'var(--color-text)' }}>Temizlik sonrası araçlardan kareler.</p>
             </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               '1550346383-7d2d31cb7ee9', '1498887960847-2a5e4b3701cc',
               '1601362840469-51e4d8d58785', '1610647752702-41147a40b3cb'
             ].map((img, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="aspect-square rounded-2xl overflow-hidden relative group">
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center pointer-events-none">
                      <Star className="w-8 h-8 text-white" />
                   </div>
                   <img src={`https://images.unsplash.com/photo-${img}?auto=format&fit=crop&q=80&w=400&h=400`} alt="Araç Yıkama" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
}

// ── 5. Contact ──
export function OtoyikamaDetayContact({ business, content }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-24" style={{ background: 'var(--color-bg)' }}>
       <div className="max-w-[900px] mx-auto px-6 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl border-4" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-surface)', color: 'var(--color-accent)' }}>
             <Phone className="w-10 h-10" />
          </div>
          <motion.h4 variants={fadeUp} className="font-bold text-sm tracking-widest uppercase mb-4" style={{ color: 'var(--color-accent)' }}>{content?.badge || 'SIRA BEKLEMEYİN'}</motion.h4>
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Hemen Randevu Alın</h2>
          <p className="text-xl font-medium opacity-80 mb-12 max-w-2xl mx-auto" style={{ color: 'var(--color-text)' }}>
             İş çıkış saatlerinde veya hafta sonları oluşan yoğunluktan etkilenmemek için arayıp randevunuzu oluşturabilirsiniz.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
             <a href={`tel:${(business as any)?.phoneClean as string}`} className="px-10 py-5 rounded-2xl font-black text-2xl shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl w-full sm:w-auto flex items-center justify-center gap-3" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
               {(business as any)?.phone as string}
             </a>
             <a href={`https://wa.me/${(business as any)?.whatsapp as string}`} className="px-10 py-5 rounded-2xl font-bold text-xl transition-all border-2 w-full sm:w-auto hover:bg-[var(--color-surface)]" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
               WhatsApp Destek
             </a>
          </div>
          
          <div className="inline-flex items-center gap-3 p-4 rounded-xl border font-bold" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
             <MapPin className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
             {(business as any)?.address as string}
          </div>
       </div>
    </section>
  );
}

// Registry
registerSection('hero', 'split_image', OtoyikamaDetayHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('about', 'split_left', OtoyikamaDetayAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('services', 'service_price_grid', OtoyikamaDetayServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('gallery', 'masonry', OtoyikamaDetayGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('contact', 'detailed_form', OtoyikamaDetayContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
