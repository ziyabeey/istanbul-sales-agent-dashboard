'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Search, ArrowRight, Star } from 'lucide-react';
import { SectionProps } from '../../types/section-types';
import { registerSection } from '../../registry/section-registry';

// ── Animations ──
const popIn: any = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 150, damping: 15 } }
};

const slideUp: any = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } }
};

// ── 1. Hero (Modern Casual / Lezzet) ──
export function RestoranLezzetHero({ business }: SectionProps<any>) {
  return (
    <section className="relative min-h-[90vh] bg-[#FFFAF0] flex items-center pt-24 pb-12 overflow-hidden">
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#FF6B6B]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#4ECDC4]/20 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={slideUp} className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 font-sans font-bold text-sm text-[#FF6B6B] uppercase tracking-wider mb-6">
            <Heart className="w-4 h-4" /> Bugün Ne Yemeli?
          </motion.div>
          <motion.h1 variants={slideUp} className="font-heading text-6xl md:text-[5rem] font-bold text-[#2D3436] leading-[1.1] tracking-tight mb-8">
            Her Lokmada<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53]">Yeni Bir Tat.</span>
          </motion.h1>
          <motion.p variants={slideUp} className="font-sans text-xl text-gray-500 max-w-lg mb-10 leading-relaxed">
            {business.slogan || 'En taze malzemelerle, modern şeflerimizin elinden lezzet şöleni.'}
          </motion.p>
          <motion.div variants={slideUp} className="flex flex-wrap items-center gap-4">
            <a href="#menu" className="bg-[#FF6B6B] text-white font-bold px-8 py-4 rounded-full text-lg shadow-lg shadow-[#FF6B6B]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              Menüyü Gör
            </a>
            <div className="flex items-center gap-2 px-6 py-4 rounded-full bg-white shadow-sm border border-gray-100 text-gray-700 font-medium">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" /> 4.9/5 Puan
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div initial="hidden" animate="visible" variants={popIn} className="relative hidden lg:block">
          {business.photos?.[0] ? (
            <img src={business.photos[0]} alt="Food" className="w-[600px] h-[600px] object-cover rounded-[3rem] rotate-3 shadow-2xl" />
          ) : (
            <div className="w-[600px] h-[600px] bg-[url('https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80')] bg-cover bg-center rounded-[3rem] rotate-3 shadow-xL" />
          )}
          <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-2xl -rotate-6">
            <div className="font-bold text-2xl text-[#2D3436]">🔥 En Çok Satan</div>
            <div className="text-gray-500 mt-1">Özel Soslu Burger</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── 2. Menu (Playful Cards) ──
export function RestoranLezzetHizmetler({ business }: SectionProps<any>) {
  return (
    <section id="menu" className="py-24 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideUp} className="flex justify-between items-end mb-16">
          <div>
            <h2 className="font-heading text-5xl font-bold text-[#2D3436] mb-4">Harika Lezzetler</h2>
            <p className="font-sans text-gray-500 text-lg">Hemen keşfet ve sipariş ver.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-[#FF6B6B] font-bold text-lg hover:underline underline-offset-4">
            Tümünü Gör <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {business.services?.slice(0, 6).map((service: any, idx: number) => (
            <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={popIn} className="group bg-[#FFFAF0] rounded-[2rem] p-4 transition-all duration-300 hover:shadow-xl hover:bg-white hover:ring-2 ring-gray-100">
               <div className="w-full h-48 rounded-[1.5rem] overflow-hidden mb-6 bg-gray-200">
                 <img src={`https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=400&h=300&sig=${idx}`} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               </div>
               <div className="px-4 pb-4">
                 <div className="flex justify-between items-start mb-2">
                   <h3 className="font-heading font-bold text-2xl text-[#2D3436]">{service.name}</h3>
                   <span className="font-sans font-black text-xl text-[#FF6B6B]">{service.price || '₺'}</span>
                 </div>
                 <p className="font-sans text-gray-500 text-sm leading-relaxed mb-6">{service.description}</p>
                 <button className="w-full bg-[#2D3436] text-white font-bold py-3 rounded-xl group-hover:bg-[#FF6B6B] transition-colors duration-300">
                   Seç ve Ekle
                 </button>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 3. Iletisim (Modern Banner) ──
export function RestoranLezzetIletisim({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-24 px-6 bg-white">
      <div className="max-w-[1400px] mx-auto bg-[#4ECDC4] rounded-[3rem] p-12 md:p-24 relative overflow-hidden flex flex-col items-center text-center">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_#ffffff_0%,_transparent_60%)] opacity-30 pointer-events-none" />
        
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideUp} className="font-heading text-4xl md:text-6xl font-bold text-white mb-8 relative z-10">
          Hazır mısın? Yemeğin sıcak sıcak gelsin.
        </motion.h2>
        <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideUp} className="font-sans text-xl text-white/90 mb-12 max-w-2xl relative z-10">
          Sorularınız için veya toplu sipariş vermek için bizi hemen arayın.
        </motion.p>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideUp} className="flex flex-col sm:flex-row gap-6 relative z-10">
           <a href={`tel:${business.phone || '123'}`} className="bg-white text-[#4ECDC4] font-bold text-xl px-10 py-5 rounded-full shadow-xl hover:scale-105 transition-transform duration-300">
             Hemen Ara
           </a>
        </motion.div>
      </div>
    </section>
  );
}

// ── Fallbacks ──
export function RestoranLezzetAbout({ business }: SectionProps<any>) { return null; }
export function RestoranLezzetGallery({ business }: SectionProps<any>) { return null; }
export function RestoranLezzetTeam({ business }: SectionProps<any>) { return null; }
export function RestoranLezzetFaq({ business }: SectionProps<any>) { return null; }
export function RestoranLezzetBlogPreview({ business }: SectionProps<any>) { return null; }
export function RestoranLezzetTestimonials({ business }: SectionProps<any>) { return null; }

// ── Registration ──
import type { ComponentType } from 'react';
registerSection('hero', 'restoran_lezzet_hero', RestoranLezzetHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('about', 'restoran_lezzet_about', RestoranLezzetAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('services', 'restoran_lezzet_services', RestoranLezzetHizmetler as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('gallery', 'restoran_lezzet_gallery', RestoranLezzetGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('contact', 'restoran_lezzet_contact', RestoranLezzetIletisim as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('team', 'restoran_lezzet_team', RestoranLezzetTeam as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('faq', 'restoran_lezzet_faq', RestoranLezzetFaq as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('blog_preview', 'restoran_lezzet_blog_preview', RestoranLezzetBlogPreview as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
registerSection('testimonials', 'restoran_lezzet_testimonials', RestoranLezzetTestimonials as unknown as ComponentType<SectionProps<Record<string, unknown>>>);
