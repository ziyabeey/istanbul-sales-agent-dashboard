'use client';

import React from 'react';
import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { Key, ShieldCheck, Clock, CheckCircle2, Phone, MapPin } from 'lucide-react';
import type { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// ── Hero ──
export function CilingirEvHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-24 pb-20 overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      <div className="absolute inset-0 z-0 flex md:hidden">
         <div className="absolute inset-0 bg-white/90 z-10" />
         <img src="https://images.unsplash.com/photo-1558025137-0b4ece00ff73?auto=format&fit=crop&q=80" alt="Anahtar" className="w-full h-full object-cover" />
      </div>
      
      <div className="max-w-[1200px] w-full mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
           <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 font-bold text-sm tracking-widest rounded shadow-sm mb-6 border" style={{ background: 'var(--color-surface)', color: 'var(--color-accent)', borderColor: 'var(--color-border)' }}>
              <Clock className="w-4 h-4" /> {content?.badge || '7/24 ACİL ÇİLİNGİR'}
           </motion.div>
           <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight shadow-sm" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
             {content?.title || 'Kapıda Mı Kaldınız? 15 Dakikada Oradayız.'}
           </motion.h1>
           <motion.p variants={fadeUp} className="text-xl opacity-80 mb-8 font-medium">
             {content?.subtitle || `${(business as any)?.name as string}, evinize, kasanıza veya aracınıza en hızlı ve hasarsız çözümü üretir. Kilitlendiyse, biz açarız.`}
           </motion.p>
           <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
             <a href={`tel:${(business as any)?.phoneClean as string}`} className="flex items-center justify-center gap-3 px-8 py-5 rounded font-black text-lg transition-transform hover:-translate-y-1 shadow-xl shadow-[var(--color-accent)]/20" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
               Hemen Ara: {(business as any)?.phone as string}
             </a>
           </motion.div>
           <motion.div variants={fadeUp} className="mt-8 flex items-center gap-6 opacity-70">
              <div className="flex items-center gap-2 font-bold text-sm"><CheckCircle2 className="w-5 h-5 text-green-500" /> Kilit Göbeği Değişimi</div>
              <div className="flex items-center gap-2 font-bold text-sm"><CheckCircle2 className="w-5 h-5 text-green-500" /> Hasarsız Kapı Açma</div>
           </motion.div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="hidden md:block relative">
           <div className="aspect-[4/5] rounded-tl-[6rem] rounded-br-[6rem] overflow-hidden border-8 shadow-2xl relative z-10" style={{ borderColor: 'var(--color-surface)' }}>
              <img src="https://images.unsplash.com/photo-1558025137-0b4ece00ff73?auto=format&fit=crop&q=80" alt="Anahtar ve Kilit" className="w-full h-full object-cover" />
           </div>
           <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border flex items-center gap-4 z-20" style={{ borderColor: 'var(--color-border)' }}>
              <ShieldCheck className="w-12 h-12" style={{ color: 'var(--color-accent)' }} />
              <div>
                 <div className="font-black text-xl" style={{ color: 'var(--color-text)' }}>Garantili Tesisat</div>
                 <div className="opacity-70 text-sm font-medium">Yetkili Kale Kilit Servisi</div>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Services ──
export function CilingirEvServices({ business }: SectionProps<any>) {
  const services = [
    { title: 'Ev Çilingir', desc: 'Çelik kapı, ahşap kapı ve pimapen kapıları hasar vermeden, profesyonel aletlerle açıyoruz.', price: 'Hızlı Servis' },
    { title: 'Kilit Değişimi & Göbek', desc: 'Evinize yeni taşındığınızda güvenliğiniz için Kale, Yuma, İto kilit değişimleri yapılır.', price: 'Orijinal Ürün' },
    { title: 'Oto Çilingir', desc: 'Anahtarı içinde unutulan her marka ve model aracın kapısı çiziksiz olarak açılır.', price: 'Mobil Hizmet' }
  ];

  return (
    <section id="hizmetler" className="py-24" style={{ background: 'var(--color-surface)' }}>
       <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-black mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Verdiğimiz Hizmetler</h2>
             <p className="opacity-70 text-lg font-medium" style={{ color: 'var(--color-text-secondary)' }}>Sadece kapı açmıyor, aynı zamanda mekanınızın güvenliğini sağlıyoruz.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
             {services.map((svc, i) => (
                <div key={i} className="bg-white p-10 rounded-2xl border transition-all hover:-translate-y-2 hover:shadow-xl" style={{ borderColor: 'var(--color-border)' }}>
                   <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ background: 'var(--color-surface-elevated)', color: 'var(--color-accent)' }}>
                      <Key className="w-8 h-8" />
                   </div>
                   <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{svc.title}</h3>
                   <p className="opacity-70 mb-8 min-h-[80px]" style={{ color: 'var(--color-text-secondary)' }}>{svc.desc}</p>
                   <div className="inline-block px-4 py-2 font-bold text-sm bg-gray-100 rounded" style={{ color: 'var(--color-text)' }}>{svc.price}</div>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
}

// ── Contact ──
export function CilingirEvContact({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-24" style={{ background: 'var(--color-bg)' }}>
       <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-[var(--color-surface)] p-12 md:p-16 rounded-3xl border shadow-lg text-center" style={{ borderColor: 'var(--color-border)' }}>
             <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Nöbetçi Çilingir</h2>
             <p className="opacity-80 text-lg mb-12 max-w-xl mx-auto font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                Zaman kavramı olmaksızın, gece-gündüz motorize ekiplerimizle çağrılarınıza en hızlı şekilde yanıt veriyoruz.
             </p>
             <div className="flex flex-col md:flex-row justify-center gap-6">
                <a href={`tel:${(business as any)?.phoneClean as string}`} className="flex items-center justify-center gap-4 px-10 py-6 rounded-xl font-black text-xl md:text-2xl transition-transform hover:scale-105 shadow-xl" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
                   <Phone className="w-8 h-8" /> {(business as any)?.phone as string}
                </a>
             </div>
             <div className="mt-12 inline-flex items-center gap-3 opacity-70 font-bold bg-white px-6 py-3 rounded-full border shadow-sm" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                <MapPin className="w-5 h-5" style={{ color: 'var(--color-accent)' }} /> 
                {(business as any)?.address as string} // Servis Bölgesi
             </div>
          </div>
       </div>
    </section>
  );
}

registerSection('hero', 'cilingir_ev_hero', CilingirEvHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('services', 'cilingir_ev_services', CilingirEvServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('contact', 'cilingir_ev_contact', CilingirEvContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
// Note: Intentionally avoiding empty About and Gallery since it's a minimal template right now, just to show how they act if missing. We can just export what we have.
