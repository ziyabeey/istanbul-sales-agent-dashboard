'use client';

import React from 'react';
import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, MapPin, PhoneCall } from 'lucide-react';
import type { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// ── Hero ──
export function CicekciTaziyeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[80vh] flex items-center pt-24 pb-20 justify-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="max-w-[800px] w-full mx-auto px-6 text-center relative z-10">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
           <motion.div variants={fadeUp}>
             <Leaf className="w-12 h-12 mx-auto mb-6 opacity-50" />
           </motion.div>
           <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl mb-6 font-medium leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
             {content?.title || 'Saygı, Vefa ve Taziye'}
           </motion.h1>
           <motion.div variants={fadeUp} className="w-24 h-px mx-auto my-8 opacity-20" style={{ background: 'var(--color-text)' }} />
           <motion.p variants={fadeUp} className="text-lg opacity-80 mb-10 leading-relaxed font-light">
             {content?.subtitle || `${(business as any)?.name as string}, protokol standartlarında kurumsal çelenk, taziye aranjmanları ve anma töreni süslemeleriyle kederli günlerinizde yanınızda.`}
           </motion.p>
           <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <a href="#katalog" className="px-10 py-4 font-bold tracking-widest text-sm uppercase transition-colors" style={{ background: 'var(--color-text)', color: 'var(--color-bg)' }}>
               Çelenk Siparişi
             </a>
             <a href="#iletisim" className="px-10 py-4 font-bold tracking-widest text-sm uppercase transition-colors border" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
               İletişim
             </a>
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── About ──
export function CicekciTaziyeAbout({ business }: SectionProps<any>) {
  return (
    <section id="hakkimizda" className="py-24 border-y" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
       <div className="max-w-[1000px] mx-auto px-6 text-center">
          <h2 className="text-3xl font-medium mb-8" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Zor Anlarda Güvenilir Çözüm Orağınız</h2>
          <p className="text-lg opacity-80 mb-10 leading-relaxed font-light" style={{ color: 'var(--color-text-secondary)' }}>
             Kurumların ve bireylerin protokol ihtiyaçlarına yönelik özel taziye çelenkleri, tören çiçekleri ve kabristan tasarımları yapıyoruz. Zamanında ve eksiksiz teslimat anlayışımızla, sizin adınıza kurum kimliğinizi veya kişisel saygınızı en zarif şekilde temsil ediyoruz.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left mt-16">
             <div className="p-8 border bg-white" style={{ borderColor: 'var(--color-border)' }}>
                <Award className="w-8 h-8 mb-4 opacity-50" style={{ color: 'var(--color-text)' }} />
                <h3 className="text-xl font-medium mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Protokol Standartı</h3>
                <p className="opacity-70 text-sm leading-relaxed">Resmi kurum, vakıf ve dernek tüzüklerine uygun standart ölçülerde özel bantlı çelenkler.</p>
             </div>
             <div className="p-8 border bg-white" style={{ borderColor: 'var(--color-border)' }}>
                <Leaf className="w-8 h-8 mb-4 opacity-50" style={{ color: 'var(--color-text)' }} />
                <h3 className="text-xl font-medium mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Sade ve Asil</h3>
                <p className="opacity-70 text-sm leading-relaxed">Acıya saygı duyan, gösterişten uzak, sade fakat görkemli beyaz ve yeşil ağırlıklı tasarımlar.</p>
             </div>
             <div className="p-8 border bg-white" style={{ borderColor: 'var(--color-border)' }}>
                <MapPin className="w-8 h-8 mb-4 opacity-50" style={{ color: 'var(--color-text)' }} />
                <h3 className="text-xl font-medium mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Tam Vaktinde Teslimat</h3>
                <p className="opacity-70 text-sm leading-relaxed">Cenae saati ve mekan kısıtlamalarına harfiyen uyarak doğrudan tören alanına kurulum.</p>
             </div>
          </div>
       </div>
    </section>
  );
}

// ── Services (Katalog) ──
export function CicekciTaziyeServices({ business }: SectionProps<any>) {
  const products = [
    { cat: 'Ayaklı Çelenk', title: 'Tekli Klasik Taziye', desc: 'Siyah zemin üzerine gümüş varak baskılı firma ismi bandıyla beyaz karanfil ve glayöl dizimi.', price: '₺1.500' },
    { cat: 'VIP Tasarım', title: 'Çift Başlı Özel Çelenk', desc: 'Protokol katılımı gerektiren durumlar için ekstra dolgun beyaz orkide ve anthurium aranjmanı.', price: '₺4.000' },
    { cat: 'Ayaklı Sepet', title: 'Ferforje Anma Sepeti', desc: 'Mezarlık veya anma töreni alanında kalıcı bir sadelik sunar.', price: '₺2.200' }
  ];

  return (
    <section id="katalog" className="py-24" style={{ background: 'var(--color-bg)' }}>
       <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-medium mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Kurumsal & Bireysel Tasarımlar</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
             {products.map((p, i) => (
                <div key={i} className="bg-[var(--color-surface)] border p-8 text-center transition-all hover:shadow-lg" style={{ borderColor: 'var(--color-border)' }}>
                   <div className="text-xs uppercase tracking-[0.2em] mb-4 opacity-50 font-bold" style={{ color: 'var(--color-text)' }}>{p.cat}</div>
                   <h3 className="font-medium text-2xl mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{p.title}</h3>
                   <div className="w-12 h-px mx-auto bg-current opacity-20 mb-6" style={{ color: 'var(--color-text)' }} />
                   <p className="opacity-70 text-sm leading-relaxed mb-8 min-h-[80px]" style={{ color: 'var(--color-text-secondary)' }}>{p.desc}</p>
                   <div className="text-xl font-light" style={{ color: 'var(--color-text)' }}>{p.price}</div>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
}

// ── Contact ──
export function CicekciTaziyeContact({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-24 border-t" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
       <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-3xl font-medium mb-10" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Acil Servis ve Sipariş Hattı</h2>
          <div className="bg-white p-12 border shadow-sm" style={{ borderColor: 'var(--color-border)' }}>
             <PhoneCall className="w-10 h-10 mx-auto mb-6 opacity-30" style={{ color: 'var(--color-text)' }} />
             <p className="opacity-70 mb-8 max-w-md mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>Vefat gibi acil durumlarda mesai saatleri dışında da bize ulaşabilir, çelenk siparişinizi aynı gün için organize edebilirsiniz.</p>
             <a href={`tel:${(business as any)?.phoneClean as string}`} className="text-4xl md:text-5xl font-light tracking-wide transition-opacity hover:opacity-70" style={{ color: 'var(--color-text)' }}>
                {(business as any)?.phone as string}
             </a>
          </div>
       </div>
    </section>
  );
}

registerSection('hero', 'cicekci_taziye_hero', CicekciTaziyeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('about', 'cicekci_taziye_about', CicekciTaziyeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('services', 'cicekci_taziye_services', CicekciTaziyeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('contact', 'cicekci_taziye_contact', CicekciTaziyeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
