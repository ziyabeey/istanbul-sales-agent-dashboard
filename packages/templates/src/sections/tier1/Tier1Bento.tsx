'use client';

import React from 'react';
import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Briefcase, Phone, MapPin, Building2, ChevronRight, CheckCircle2 } from 'lucide-react';
import type { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

/* ═══════════════════════════════════════════
   TIER 1 — MASTERCLASS BENTO ENGINE
   Tasarım: Corporate trust, sharp/round borders, advanced dashboard grid logic.
   Animasyon: Yavaş opacity fade'leri, kompleks stagger dizilimleri.
   Veri: business.* objesini aktif dinler.
   ═══════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

export function Tier1BentoHero({ business, content }: SectionProps<any>) {
  const bgImage = business?.photos?.[0] || 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80';
  
  return (
    <section className="relative min-h-[90vh] flex md:items-center py-20 md:py-0 overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {/* Background Image with Deep Gradient */}
      <div 
        className="absolute inset-0 z-0 scale-105 transform transition-transform duration-[20s] hover:scale-110"
        style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3 }}
      />
      <div className="absolute inset-0 z-[1]" style={{ background: `linear-gradient(to bottom, var(--color-bg), color-mix(in srgb, var(--color-bg) 50%, transparent), var(--color-bg))` }} />
      
      {/* Bento Layout Grid for Hero */}
      <div className="container relative z-10 px-6 mx-auto grid lg:grid-cols-12 gap-6 h-full items-center">
        
        {/* Main Huge Typo Block */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="lg:col-span-8 flex flex-col justify-center">
           <motion.div variants={fadeUp} className="mb-6">
              <span className="px-5 py-2 text-xs font-bold tracking-[0.2em] uppercase rounded-full inline-flex items-center gap-2 backdrop-blur-md" 
                style={{ background: 'color-mix(in srgb, var(--color-surface) 80%, transparent)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}>
                 <Building2 className="w-4 h-4" style={{ color: 'var(--color-accent)' }} /> 
                 {content?.badge || business?.district?.toUpperCase() || business?.sector?.toUpperCase() || 'HOŞGELDİNİZ'}
              </span>
           </motion.div>
           <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl uppercase mb-6 tracking-tight leading-[0.95] drop-shadow-xl" 
             style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
             {content?.title || business?.name}
           </motion.h1>
           <motion.p variants={fadeUp} className="text-lg md:text-2xl max-w-2xl font-light mb-10 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
             {content?.subtitle || business?.slogan || 'Profesyonel hizmet ve güler yüzlü ekibimizle yanınızdayız.'}
           </motion.p>
           
           <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4">
             <a href={content?.cta1?.href || '#iletisim'} className="w-full sm:w-auto px-10 py-5 text-sm uppercase tracking-[0.1em] transition-all hover:scale-105 rounded-xl shadow-2xl flex justify-center items-center gap-3 group" 
               style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)', fontWeight: 'bold' }}>
               {content?.cta1?.text || 'Hemen İletişime Geç'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </a>
             <a href="#hizmetler" className="w-full sm:w-auto flex justify-center px-8 py-5 rounded-xl text-sm uppercase tracking-[0.1em] font-bold transition-all hover:bg-[var(--color-surface)] backdrop-blur-md" 
               style={{ border: '1px solid var(--color-border)', color: 'var(--color-text)' }}>
               Hizmetlerimiz
             </a>
           </motion.div>
        </motion.div>
        
        {/* Right Side Bento Utility Cards */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="lg:col-span-4 grid grid-rows-2 gap-6 mt-12 lg:mt-0">
           <motion.div variants={fadeUp} className="p-8 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col justify-end min-h-[220px] relative overflow-hidden group border"
              style={{ background: 'color-mix(in srgb, var(--color-surface) 60%, transparent)', borderColor: 'var(--color-border)' }}>
              <div className="absolute top-6 right-6 p-3 rounded-full" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{business?.experience || '10+ Yıl'}</h3>
              <p className="text-sm font-semibold uppercase tracking-widest opacity-70">Uzman Deneyimi</p>
           </motion.div>
           
           <motion.div variants={fadeUp} className="p-8 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col justify-end min-h-[200px] border"
              style={{ background: 'color-mix(in srgb, var(--color-surface) 60%, transparent)', borderColor: 'var(--color-border)' }}>
              <p className="text-sm italic mb-4 opacity-80 decoration-slice">"Kaliteli hizmet ve müşteri memnuniyeti her zaman önceliğimizdir."</p>
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" alt="İşletme Sahibi" className="w-full h-full object-cover" />
                 </div>
                 <div>
                    <p className="text-sm font-bold">{(business as any)?.ownerName || 'İşletme Sahibi'}</p>
                    <p className="text-xs uppercase tracking-wider opacity-60">Kurucu</p>
                 </div>
              </div>
           </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
}
registerSection('hero', 'tier1_bento_hero', Tier1BentoHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);


export function Tier1BentoGallery({ business, content }: SectionProps<any>) {
  const getPhoto = (i: number) => {
    const fallbacks = [
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    ];
    return business?.photos?.[i % (business?.photos?.length || 1)] || fallbacks[i % fallbacks.length];
  };

  return (
    <section id="galeri" className="py-24 relative" style={{ background: 'var(--color-bg)' }}>
      <div className="container px-6 mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div>
             <h4 className="text-sm font-bold tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--color-accent)' }}>{content?.badge || 'VİTRİN'}</h4>
             <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{content?.title || 'Sahadan Görseller'}</h2>
           </div>
           <p className="max-w-md text-sm md:text-base opacity-80 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
             {content?.description || 'İşletmemizden kareler ve çalışma ortamımız.'}
           </p>
        </div>
        
        {/* Apple Style Asym Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[300px]">
          {/* Huge Main Frame */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="md:col-span-8 rounded-[2rem] overflow-hidden group relative">
            <div className="absolute inset-0 bg-black/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img src={getPhoto(0)} alt="Görsel 1" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          </motion.div>
          
          {/* Small Top Right Frame */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="md:col-span-4 rounded-[2rem] overflow-hidden group relative">
            <img src={getPhoto(1)} alt="Görsel 2" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          </motion.div>

          {/* Medium Bottom Left Frame */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="md:col-span-5 rounded-[2rem] overflow-hidden group relative">
            <img src={getPhoto(2)} alt="Görsel 3" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          </motion.div>

          {/* Medium Bottom Right Frame */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }} className="md:col-span-7 rounded-[2rem] overflow-hidden group relative">
            <img src={getPhoto(3)} alt="Görsel 4" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute bottom-6 left-6 z-20 backdrop-blur-md px-6 py-3 rounded-2xl" style={{ background: 'color-mix(in srgb, var(--color-bg) 80%, transparent)' }}>
              <span className="text-sm font-bold uppercase tracking-widest text-[var(--color-text)]">Premium Kalite</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
registerSection('gallery', 'tier1_bento_gallery', Tier1BentoGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>);


export function Tier1BentoServices({ business, content }: SectionProps<any>) {
  const defaultServices = [
    { name: 'Temel Hizmet', description: 'Profesyonel ve güvenilir çözümler.', price: 'İletişime geçin' },
    { name: 'Premium Hizmet', description: 'Detaylı ve özenli hizmet anlayışı.', price: 'İletişime geçin' },
    { name: 'Özel Çözüm', description: 'İhtiyacınıza özel kişiselleştirilmiş hizmet.', price: 'İletişime geçin' },
  ];
  const services = business?.services?.length ? business.services.slice(0, 4) : defaultServices;

  return (
    <section id="hizmetler" className="py-32" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
      <div className="container mx-auto px-6 grid xl:grid-cols-[1fr_2.5fr] gap-16 lg:gap-24">
         <div>
            <div className="sticky top-32">
               <h4 className="text-sm font-bold tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--color-accent)' }}>{content?.badge || 'HİZMETLERİMİZ'}</h4>
               <h2 className="text-5xl lg:text-6xl tracking-tight mb-8" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{content?.title || 'Hizmetlerimiz'}</h2>
               <p className="font-light text-lg leading-relaxed mb-10 opacity-80" style={{ color: 'var(--color-text-secondary)' }}>Profesyonel ekibimiz ve kaliteli hizmet anlayışımızla sizlere en iyi deneyimi sunuyoruz.</p>
               <a href="#iletisim" className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] transition-all hover:gap-5 hover:translate-x-2" style={{ color: 'var(--color-accent)' }}>
                  Tam Listeyi Keşfedin <ChevronRight className="w-5 h-5" />
               </a>
            </div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((svc: any, i: number) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} 
                className="p-10 transition-all hover:shadow-2xl hover:-translate-y-2 group relative border" 
                style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)', borderRadius: '2rem' }}>
                 
                 <div className="w-16 h-16 flex items-center justify-center mb-8 rounded-2xl border transition-colors group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)]" 
                   style={{ background: 'var(--color-surface)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}>
                    <Briefcase className="w-8 h-8 group-hover:text-[var(--color-text-on-accent)] transition-colors" />
                 </div>
                 
                 <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{svc.name}</h3>
                 <p className="text-base leading-relaxed mb-8 opacity-70" style={{ color: 'var(--color-text-secondary)' }}>{svc.description}</p>
                 
                 {svc.price && (
                   <div className="mt-auto flex items-center justify-between pt-6 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                     <span className="text-sm font-semibold uppercase tracking-widest opacity-60">Başlayan Fiyatlar</span>
                     <span className="text-xl font-bold" style={{ color: 'var(--color-accent)' }}>{svc.price}</span>
                   </div>
                 )}
              </motion.div>
            ))}
         </div>
      </div>
    </section>
  );
}
registerSection('services', 'tier1_bento_services', Tier1BentoServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>);


export function Tier1BentoContact({ business, content }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-32" style={{ background: 'var(--color-bg)' }}>
      <div className="container mx-auto px-6">
         
         <div className="bg-[var(--color-surface)] border rounded-[3rem] p-8 md:p-16 lg:p-24 grid lg:grid-cols-2 gap-20 overflow-hidden relative" style={{ borderColor: 'var(--color-border)' }}>
            
            {/* Background Blob */}
            <div className="absolute top-0 right-0 w-96 h-96 opacity-10 blur-3xl rounded-full" style={{ background: 'var(--color-accent)' }} />

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="relative z-10">
               <motion.h4 variants={fadeUp} className="text-sm font-bold tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--color-accent)' }}>{content?.badge || 'İLETİŞİM'}</motion.h4>
               <motion.h2 variants={fadeUp} className="text-5xl lg:text-7xl tracking-tight mb-8" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{content?.title || 'Bize Ulaşın'}</motion.h2>
               <motion.p variants={fadeUp} className="text-xl lg:text-2xl mb-16 leading-relaxed opacity-80" style={{ color: 'var(--color-text-secondary)' }}>Randevu almak veya bilgi edinmek için hemen iletişime geçin.</motion.p>
               
               <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-10">
                  <div className="group">
                     <div className="w-12 h-12 flex items-center justify-center rounded-full mb-6 border transition-transform group-hover:scale-110 group-hover:bg-[var(--color-accent)]" 
                       style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
                       <MapPin className="w-5 h-5 group-hover:text-white" style={{ color: 'var(--color-accent)' }} />
                     </div>
                     <div className="text-xs font-bold uppercase tracking-widest mb-3 opacity-60">Lokasyon</div>
                     <div className="text-lg font-medium">{business?.address || 'İstanbul, TR'}</div>
                  </div>
                  
                  <div className="group">
                     <div className="w-12 h-12 flex items-center justify-center rounded-full mb-6 border transition-transform group-hover:scale-110 group-hover:bg-[var(--color-accent)]" 
                       style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
                       <Phone className="w-5 h-5 group-hover:text-white" style={{ color: 'var(--color-accent)' }}/>
                     </div>
                     <div className="text-xs font-bold uppercase tracking-widest mb-3 opacity-60">Direkt Hat</div>
                     <a href={`tel:${(business as any)?.phoneClean as string}`} className="text-lg font-medium">{business?.phone || '+90 555 000 00 00'}</a>
                  </div>
               </motion.div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative z-10">
               <div className="p-10 md:p-14 border rounded-[2rem] shadow-2xl backdrop-blur-xl" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
                  <h3 className="text-3xl tracking-tight mb-8 font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>İletişim Formu</h3>
                  <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Mesajınız gönderildi!"); } }>
                     <div>
                        <input type="text" placeholder="Adınız Soyadınız" className="w-full border p-5 text-base focus:outline-none transition-all focus:ring-2" 
                          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)', borderRadius: '1rem' }} />
                     </div>
                     <div>
                        <input type="tel" placeholder="Telefon Numaranız" className="w-full border p-5 text-base focus:outline-none transition-all focus:ring-2" 
                          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)', borderRadius: '1rem' }} />
                     </div>
                     <div>
                        <textarea placeholder="Mesajınız..." rows={5} className="w-full border p-5 text-base focus:outline-none transition-all focus:ring-2 resize-none" 
                          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)', borderRadius: '1rem' }} />
                     </div>
                     <div className="pt-4">
                        <button className="w-full py-5 text-base uppercase tracking-[0.2em] font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-xl" 
                          style={{ background: 'var(--color-text)', color: 'var(--color-bg)', borderRadius: '1rem' }}>
                           Gönder
                        </button>
                     </div>
                  </form>
               </div>
            </motion.div>
            
         </div>
      </div>
    </section>
  );
}
registerSection('contact', 'tier1_bento_contact', Tier1BentoContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>);

export default {
  Tier1BentoHero,
  Tier1BentoGallery,
  Tier1BentoServices,
  Tier1BentoContact
};
