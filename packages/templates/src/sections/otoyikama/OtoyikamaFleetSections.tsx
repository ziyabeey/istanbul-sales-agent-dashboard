'use client';

import React from 'react';
import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Users2, Clock, MapPin, Phone } from 'lucide-react';
import type { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } }
};

// ── Hero ──
export function OtoyikamaFleetHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-24 pb-20 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80)', color: 'var(--color-text)' }}>
      <div className="absolute inset-0 bg-black/70 z-0" />
      
      <div className="max-w-[1200px] w-full mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="text-white">
           <motion.div variants={fadeUp} className="inline-block px-4 py-1 border-2 border-white/20 rounded-full text-xs font-bold tracking-widest uppercase mb-6" style={{ color: 'var(--color-accent)', borderColor: 'var(--color-accent)' }}>
              {content?.badge || 'TİCARİ FİLO'}
           </motion.div>
           <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-black mb-6 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
             {content?.title || 'Şirket Araçlarına Özel Çözüm'}
           </motion.h1>
           <motion.p variants={fadeUp} className="text-lg opacity-80 mb-10 max-w-lg">
             {content?.subtitle || `${(business as any)?.name as string}, filolarınızın temizlik ve estetiğini uygun maliyet ve sözleşmeli garanti ile üstleniyor.`}
           </motion.p>
           <motion.div variants={fadeUp} className="flex items-center gap-4">
             <a href="#hizmetler" className="px-8 py-4 bg-white text-black font-bold rounded-md hover:bg-gray-100 transition-colors">
               Detaylı Bilgi
             </a>
             <a href="#iletisim" className="px-8 py-4 border-2 border-white rounded-md font-bold hover:bg-white/10 transition-colors">
               Teklif Al
             </a>
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── About / Features ──
export function OtoyikamaFleetAbout({ business }: SectionProps<any>) {
  const feats = [
    { icon: <Truck className="w-8 h-8"/>, title: 'Büyük Araç Kapasitesi', desc: 'Panelvanlardan kamyonetlere kadar geniş lift ve yıkama alanları.' },
    { icon: <ShieldCheck className="w-8 h-8"/>, title: 'Kurumsal Faturalandırma', desc: 'Aylık periyodik faturalandırma ve şeffaf mutabakat süreçleri.' },
    { icon: <Clock className="w-8 h-8"/>, title: 'Öncelikli Randevu', desc: 'Filo müşterilerimize özel VIP hat üzerinden sırasız hizmet.' },
    { icon: <Users2 className="w-8 h-8"/>, title: 'Adresten Teslim', desc: 'Araçlarınızı şirket merkezinden alıp, temizleyip geri bırakıyoruz.' }
  ];

  return (
    <section id="hakkimizda" className="py-24" style={{ background: 'var(--color-surface)' }}>
       <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
             <h2 className="text-3xl md:text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Kurumsal Ayrıcalıklar</h2>
             <p className="opacity-80 text-lg font-medium" style={{ color: 'var(--color-text)' }}>Şirketinizin araçlarını bize emanet ederken kazanacağınız avantajlar.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
             {feats.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 bg-white border shadow-sm hover:shadow-xl transition-all rounded-xl" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)' }}>
                   <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-6" style={{ background: 'var(--color-surface)', color: 'var(--color-accent)' }}>
                      {f.icon}
                   </div>
                   <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{f.title}</h3>
                   <p className="opacity-70 text-sm font-medium leading-relaxed" style={{ color: 'var(--color-text)' }}>{f.desc}</p>
                </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
}

// ── Contact ──
export function OtoyikamaFleetContact({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-24" style={{ background: 'var(--color-bg)' }}>
       <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
             <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Hemen Kurumsal Teklif Alın</h2>
             <p className="opacity-80 text-lg mb-10 font-medium" style={{ color: 'var(--color-text)' }}>
               Araç sayınız ve ihtiyaçlarınıza göre şekillendirdiğimiz esnek fiyatlandırma modellerimizi öğrenmek için bizimle iletişime geçin.
             </p>
             <div className="space-y-6 form-group">
                <div className="flex items-center gap-4 text-xl font-bold">
                   <Phone className="w-8 h-8" style={{ color: 'var(--color-accent)' }} /> 
                   <span style={{ color: 'var(--color-text)' }}>{(business as any)?.phone as string}</span>
                </div>
                <div className="flex items-center gap-4 text-xl font-bold">
                   <MapPin className="w-8 h-8" style={{ color: 'var(--color-accent)' }} /> 
                   <span style={{ color: 'var(--color-text)' }}>{(business as any)?.address as string}</span>
                </div>
             </div>
          </div>
          <div className="p-10 rounded-2xl shadow-2xl" style={{ background: 'var(--color-surface)', borderTop: '4px solid var(--color-accent)' }}>
             <form className="space-y-6">
                <div>
                   <label className="block text-sm font-bold mb-2 opacity-80" style={{ color: 'var(--color-text)' }}>Şirket Adı</label>
                   <input type="text" className="w-full p-4 border rounded-md" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-sm font-bold mb-2 opacity-80" style={{ color: 'var(--color-text)' }}>Araç Sayısı</label>
                      <input type="number" className="w-full p-4 border rounded-md" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} />
                   </div>
                   <div>
                      <label className="block text-sm font-bold mb-2 opacity-80" style={{ color: 'var(--color-text)' }}>Telefon</label>
                      <input type="tel" className="w-full p-4 border rounded-md" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} />
                   </div>
                </div>
                <button type="button" className="w-full py-4 text-white font-bold rounded-md transition-opacity hover:opacity-90" style={{ background: 'var(--color-accent)' }}>
                   Formu Gönder
                </button>
             </form>
          </div>
       </div>
    </section>
  );
}

registerSection('hero', 'split_image', OtoyikamaFleetHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('about', 'fleet_features', OtoyikamaFleetAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('contact', 'fleet_form', OtoyikamaFleetContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
