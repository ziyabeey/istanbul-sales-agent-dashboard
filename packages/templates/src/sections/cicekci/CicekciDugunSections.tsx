'use client';

import React from 'react';
import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { Heart, Flower2, Star, Quote, ChevronRight, PhoneCall, MapPin } from 'lucide-react';
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
export function CicekciDugunHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden text-center" style={{ background: 'var(--color-bg)' }}>
      {/* Soft overlay patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-surface-elevated)_0%,_transparent_50%))] opacity-50" />
      <div className="absolute inset-0">
         <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80" alt="Gelin Buketi" className="w-full h-full object-cover opacity-10" />
      </div>
      
      <div className="max-w-[900px] w-full mx-auto px-6 relative z-10 flex flex-col items-center">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="bg-white/80 backdrop-blur-sm p-12 md:p-16 rounded-[3rem] border shadow-2xl" style={{ borderColor: 'var(--color-border)' }}>
           <motion.div variants={fadeUp}>
             <Flower2 className="w-12 h-12 mx-auto mb-6" style={{ color: 'var(--color-accent)' }} />
           </motion.div>
           <motion.div variants={fadeUp} className="inline-block tracking-[0.2em] text-sm font-semibold uppercase mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              {content?.badge || 'SANATSAL BOTANİK TASARIM'}
           </motion.div>
           <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl mb-8 leading-tight italic" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
             {content?.title || 'En Özel Gününüze Sanatsal Dokunuşlar'}
           </motion.h1>
           <motion.p variants={fadeUp} className="text-lg opacity-80 mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--color-text)' }}>
             {content?.subtitle || `${(business as any)?.name as string}, düğün, nişan ve özel davetleriniz için size özel, unutulmaz çiçek aranjmanları tasarlar.`}
           </motion.p>
           <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <a href="#galeri" className="px-10 py-4 rounded-full font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-1" style={{ background: 'var(--color-accent)', color: 'var(--color-text-on-accent)' }}>
               Koleksiyonu İncele
             </a>
             <a href="#iletisim" className="px-10 py-4 rounded-full font-bold border-2 transition-all hover:bg-white" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-text)' }}>
               Danışmanlık Al
             </a>
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── About ──
export function CicekciDugunAbout({ business }: SectionProps<any>) {
  return (
    <section id="hakkimizda" className="py-24" style={{ background: 'var(--color-surface)' }}>
       <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
             <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border-8 shadow-xl relative z-10" style={{ borderColor: 'var(--color-surface-elevated)' }}>
                <img src="https://images.unsplash.com/photo-1542458428-21d7fb89d81d?auto=format&fit=crop&q=80" alt="Hakkımızda" className="w-full h-full object-cover" />
             </div>
             <div className="absolute -bottom-10 -right-10 w-2/3 aspect-square rounded-full z-0 blur-3xl opacity-50" style={{ background: 'var(--color-accent-light)' }} />
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
             <motion.div variants={fadeUp} className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5" style={{ color: 'var(--color-accent)' }} /> 
                <span className="tracking-widest text-sm uppercase font-bold" style={{ color: 'var(--color-text-secondary)' }}>Aşkla Tasarlanır</span>
             </motion.div>
             <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl mb-8 italic" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                Masalsı Bir Atmosfer Yaratıyoruz
             </motion.h2>
             <motion.p variants={fadeUp} className="text-lg opacity-80 mb-6 leading-relaxed" style={{ color: 'var(--color-text)' }}>
                Her gelin, her hikaye farklıdır. Tıpkı tasarladığımız taze ve eşsiz buketlerimiz gibi... Modern ve romantik çizgiyi birleştirerek, yaşamınızın o en önemli "Evet!" anına eşlik ediyoruz.
             </motion.p>
             <motion.p variants={fadeUp} className="text-lg opacity-80 mb-10 leading-relaxed" style={{ color: 'var(--color-text)' }}>
                İthal kesme çiçekler, zarif pampaslar ve mevsimin en güzel tonlarıyla donatılmış mekan süslemeleri, masa orta aranjmanları ve gelin buketleri...
             </motion.p>
             <motion.div variants={fadeUp}>
                <div className="text-2xl italic font-semibold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent)' }}>~ {(business as any)?.ownerName || 'Baş Tasarımcı'}</div>
             </motion.div>
          </motion.div>
       </div>
    </section>
  );
}

// ── Services ──
export function CicekciDugunServices({ business }: SectionProps<any>) {
  const services = [
    { title: 'Gelin Buketi & Yaka Çiçeği', desc: 'Sizi ve tarzınızı yansıtan, taptaze ve uzun ömürlü gelin buketleri ile damat yaka çiçekleri tasarımları.' },
    { title: 'Mekan Süsleme', desc: 'Giriş tagları, gelin yolu süslemesi, masa şamdan aranjmanları ve dans pisti dekorasyonları.' },
    { title: 'Konsept Organizasyon', desc: 'Düğün konseptinize (Örn: Bohem, Rustik, Klasik) uygun renkte tam teşekküllü floral tasarım hizmeti.' }
  ];

  return (
    <section id="hizmetlerimiz" className="py-24" style={{ background: 'var(--color-bg)' }}>
       <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
             <h2 className="text-4xl md:text-6xl mb-6 italic" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Özel Hizmetlerimiz</h2>
             <p className="opacity-80 text-lg" style={{ color: 'var(--color-text)' }}>Düğün gününüzün her aşamasında zarafeti çiçeklerle taşıyoruz.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
             {services.map((svc, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-8 rounded-[2rem] border transition-all hover:-translate-y-2 hover:shadow-xl bg-white" style={{ borderColor: 'var(--color-border)' }}>
                   <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6" style={{ background: 'var(--color-surface-elevated)', color: 'var(--color-accent)' }}>
                      <Flower2 className="w-10 h-10" />
                   </div>
                   <h3 className="text-2xl font-semibold mb-4 italic" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>{svc.title}</h3>
                   <p className="opacity-70 leading-relaxed text-sm" style={{ color: 'var(--color-text)' }}>{svc.desc}</p>
                </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
}

// ── Gallery ──
export function CicekciDugunGallery({ business }: SectionProps<any>) {
  const photos = [
    '1520696956627-2c13d3950bce', '1520697042072-fecaf69d4e57',
    '1515934751635-c81c6bc9a2d8', '1469334025807-6bcf59bfda76'
  ];
  return (
    <section id="galeri" className="py-24" style={{ background: 'var(--color-surface)' }}>
       <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
             <div>
                <h2 className="text-4xl md:text-5xl italic mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>İlham Verenler</h2>
                <p className="opacity-70" style={{ color: 'var(--color-text)' }}>Portfolyomuzdan unutulmaz kareler</p>
             </div>
             <a href="#iletisim" className="flex items-center gap-2 font-bold hover:underline" style={{ color: 'var(--color-accent)' }}>Tümünü İncele <ChevronRight className="w-5 h-5"/></a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {photos.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg group">
                   <img src={`https://images.unsplash.com/photo-${p}?auto=format&fit=crop&q=80&w=400&h=600`} alt="Çiçek Aranjman" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" />
                </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
}

// ── Testimonials ──
export function CicekciDugunTestimonials({ business }: SectionProps<any>) {
  return (
    <section id="yorumlar" className="py-24" style={{ background: 'var(--color-bg)' }}>
       <div className="max-w-[800px] mx-auto px-6 text-center">
          <Quote className="w-16 h-16 mx-auto mb-8 opacity-20" style={{ color: 'var(--color-accent)' }} />
          <h2 className="text-3xl md:text-4xl italic mb-10 leading-snug" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
             "Hayal ettiğim düğün buketini kelimelerle anlatmıştım ve onlar rüyamı gerçeğe dönüştürdüler. Tüm misafirlerimiz taze kokan ve muammar sarkan amaranthuslara bayıldı."
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4">
             {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" style={{ color: 'var(--color-accent)' }} /> )}
          </div>
          <div className="font-bold tracking-widest uppercase text-sm" style={{ color: 'var(--color-text-secondary)' }}>Merve & Burak</div>
       </div>
    </section>
  );
}

// ── Contact ──
export function CicekciDugunContact({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-24" style={{ background: 'var(--color-surface)' }}>
       <div className="max-w-[1000px] mx-auto px-6">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border" style={{ borderColor: 'var(--color-border)' }}>
             <div className="grid md:grid-cols-2">
                <div className="p-12 md:p-16 flex flex-col justify-center">
                   <h2 className="text-4xl md:text-5xl italic mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>Bizimle İletişime Geçin</h2>
                   <p className="opacity-80 mb-10 leading-relaxed" style={{ color: 'var(--color-text)' }}>
                      Düğün tarihinizi rezerve etmek ve ücretsiz ön görüşme ayarlamak için bizi arayın veya atölyemizi ziyaret edin.
                   </p>
                   <div className="space-y-6">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'var(--color-surface-elevated)', color: 'var(--color-accent)' }}>
                            <PhoneCall className="w-5 h-5" />
                         </div>
                         <div>
                            <div className="text-xs uppercase tracking-widest font-bold opacity-50 mb-1" style={{ color: 'var(--color-text)' }}>Rezervasyon</div>
                            <a href={`tel:${(business as any)?.phoneClean as string}`} className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{(business as any)?.phone as string}</a>
                         </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'var(--color-surface-elevated)', color: 'var(--color-accent)' }}>
                            <MapPin className="w-5 h-5" />
                         </div>
                         <div>
                            <div className="text-xs uppercase tracking-widest font-bold opacity-50 mb-1" style={{ color: 'var(--color-text)' }}>Atölye</div>
                            <div className="text-lg font-medium" style={{ color: 'var(--color-text)' }}>{(business as any)?.address as string}</div>
                         </div>
                      </div>
                   </div>
                </div>
                <div className="relative min-h-[400px]">
                   <img src="https://images.unsplash.com/photo-1558349520-2c7009ee9ce9?auto=format&fit=crop&q=80" alt="İletişim" className="absolute inset-0 w-full h-full object-cover" />
                </div>
             </div>
          </div>
       </div>
    </section>
  );
}

registerSection('hero', 'cicekci_dugun_hero', CicekciDugunHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('about', 'cicekci_dugun_about', CicekciDugunAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('services', 'cicekci_dugun_services', CicekciDugunServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('gallery', 'cicekci_dugun_gallery', CicekciDugunGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('testimonials', 'cicekci_dugun_testimonials', CicekciDugunTestimonials as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('contact', 'cicekci_dugun_contact', CicekciDugunContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
