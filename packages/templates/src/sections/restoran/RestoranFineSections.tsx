'use client'

import React, { ComponentType, useState, useRef } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Quote, UtensilsCrossed, Calendar, MapPin, Phone, Star, GlassWater, ArrowRight } from 'lucide-react'

/* ═══════════════════════════════════════════
   GASTRONOMY: FINE DINING (North Star Masterpiece)
   Sektor: restoran | Plan: enterprise
   Tasarım: Cormorant Garamond, Pitch Black, Cinematic Parallax
   ═══════════════════════════════════════════ */

// ── UTILITIES ──

const MagneticButton = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: springX.get(), y: springY.get() }}
      className={`relative inline-block ${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
};

// ── 1. Hero ──
export function RestoranFineHero({ business, settings, content }: SectionProps<any>) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] })
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 200])

  return (
    <section ref={containerRef} className="relative flex items-center justify-center min-h-screen overflow-hidden bg-[#050505]">
      {/* Immersive Cinematic Parallax Background */}
      <motion.div style={{ y: imageY }} className="absolute -inset-[10%] w-[120%] h-[120%] z-0">
        <img 
          src={business.photos?.[0] || "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80"} 
          alt="Fine Dining" 
          className="w-full h-full object-cover grayscale-[0.5] contrast-125 opacity-70"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#050505]/40 to-[#050505]" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center pt-24">
        <motion.div initial={{ opacity: 0, filter: 'blur(10px)', y: 30 }} animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }} transition={{ duration: 1.5, ease: "easeOut" as any }}>
          {content?.badge && (
             <span className="text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-8 block text-[#C9A84C]" style={{ fontFamily: 'var(--font-body)' }}>
               {content.badge}
             </span>
          )}
          <h1 className="text-[clamp(4rem,10vw,10rem)] tracking-tighter mb-6 leading-[0.8] text-[#FDFDF9]" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || business.name}
          </h1>
          <p className="text-xl md:text-3xl font-light italic opacity-70 mb-16 text-[#FDFDF9]" style={{ fontFamily: 'var(--font-heading)' }}>
            "{content?.subtitle || business.slogan || 'Tutku, Mevsimsellik ve Kusursuzluk.'}"
          </p>
          
          <div className="flex justify-center mt-12 delay-500">
             <MagneticButton>
               <a href="#rezervasyon" className="group flex items-center justify-center gap-4 bg-[#6D1B1B] hover:bg-[#8B2222] text-[#FDFDF9] px-12 py-5 text-xs font-bold tracking-[0.3em] uppercase transition-colors duration-500 rounded-none border border-[#8B2222]/50 shadow-[0_0_40px_rgba(109,27,27,0.4)]">
                 <span>{content?.cta1?.text || 'Masa Ayırt'}</span>
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </a>
             </MagneticButton>
          </div>
        </motion.div>
      </div>

      {/* Decorative vertical line */}
      <motion.div initial={{ height: 0 }} animate={{ height: '80px' }} transition={{ duration: 1.5, delay: 1 }} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px bg-[#C9A84C]/40 z-10" />
    </section>
  )
}
registerSection('hero', 'restoran_fine_hero', RestoranFineHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)


// ── 2. Story / Philosophy (Chef) ──
export function RestoranFineStory({ business, content }: SectionProps<any>) {
  return (
    <section id="felsefe" className="py-32 bg-[#020202] relative" style={{ color: 'var(--color-text)' }}>
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1.5, ease: "easeOut" as any }}>
          <div className="aspect-[3/4] relative overflow-hidden group">
             <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80" alt="Executive Chef" className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-[2s] ease-in-out scale-100 group-hover:scale-105 origin-center" />
             <div className="absolute inset-0 border border-[#C9A84C]/20 m-6 pointer-events-none mix-blend-overlay" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-80" />
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, filter: 'blur(10px)', x: 30 }} whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" as any }} className="flex flex-col justify-center">
           <Quote className="w-8 h-8 mb-10 opacity-30 text-[#C9A84C]" />
           <h2 className="text-[clamp(3rem,5vw,5rem)] italic tracking-tighter mb-8 text-[#FDFDF9] leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
             {content?.title || 'Doğadan Tabağa.'}
           </h2>
           <p className="text-lg md:text-xl leading-relaxed mb-10 text-[#F5F5F5]/60 font-light" style={{ fontFamily: 'var(--font-body)' }}>
             {content?.description || `Toprağın verdiğine saygı duymak, yaratıcılığımızın temelidir. Her mevsim değişen menümüz, yerel üreticilerden aldığımız en taze ve nadide malzemelerin sade bir kutlamasıdır. Yemek sadece bir öğün değil, hafızaya kazınan bir deneyim olmalıdır.`}
           </p>
           <div className="mt-8 border-t border-[#1A1A1A] pt-8">
              <span className="block text-3xl italic tracking-wider text-[#FDFDF9]" style={{ fontFamily: 'var(--font-heading)' }}>{business.ownerName || 'Bora Yılmaz'}</span>
              <span className="block text-[10px] uppercase tracking-[0.3em] mt-3 text-[#C9A84C] opacity-80" style={{ fontFamily: 'var(--font-body)' }}>Executive Chef & Founder</span>
           </div>
        </motion.div>
      </div>
    </section>
  )
}
registerSection('about', 'restoran_fine_story', RestoranFineStory as unknown as ComponentType<SectionProps<Record<string, unknown>>>)


// ── 3. Menu Grid (Blur Reveal) ──
export function RestoranFineMenu({ business, content }: SectionProps<any>) {
  const items = business.services || [];
  
  return (
    <section id="menu" className="py-40 bg-[#050505] relative border-y border-[#1A1A1A]" style={{ color: 'var(--color-text)' }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-28">
           <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once:true }} className="text-[10px] tracking-[0.4em] uppercase mb-4 block text-[#C9A84C]" style={{ fontFamily: 'var(--font-body)' }}>{content?.badge || 'Tadım'}</motion.span>
           <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once:true }} transition={{ delay: 0.1 }} className="text-[clamp(3.5rem,6vw,6.5rem)] italic tracking-tighter text-[#FDFDF9] leading-none" style={{ fontFamily: 'var(--font-heading)' }}>{content?.title || 'Mevsim Seçkisi'}</motion.h2>
           <div className="w-px h-24 bg-gradient-to-b from-[#C9A84C] to-transparent mx-auto mt-12 opacity-50"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-24 gap-y-16">
          {items.map((item: any, i: number) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, filter: 'blur(8px)', y: 30 }} 
               whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }} 
               viewport={{ once: true, margin: "-50px" }} 
               transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" as any }} 
               className="flex flex-col group cursor-default"
             >
                <div className="flex justify-between items-baseline mb-3">
                   <h3 className="text-3xl tracking-wide group-hover:text-[#C9A84C] transition-colors duration-500 text-[#FDFDF9]" style={{ fontFamily: 'var(--font-heading)' }}>{item.name}</h3>
                   <div className="flex-1 flex items-center mx-6 opacity-20 group-hover:opacity-40 transition-opacity" aria-hidden="true">
                      <div className="w-full h-px bg-[#A3A3A3]"></div>
                   </div>
                   <div className="text-xl font-light text-[#C9A84C]">{item.price}</div>
                </div>
                {item.description && (
                   <p className="text-sm opacity-50 italic text-[#A3A3A3] font-light max-w-sm" style={{ fontFamily: 'var(--font-heading)' }}>{item.description}</p>
                )}
             </motion.div>
          ))}
        </div>
        
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-24 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 text-[#F5F5F5]">Tadım Menüsü (7 Aşama) Özel Şarap Eşleşmesi ile sunulmaktadır.</p>
        </motion.div>
      </div>
    </section>
  )
}
registerSection('menu_display', 'restoran_fine_menu', RestoranFineMenu as unknown as ComponentType<SectionProps<Record<string, unknown>>>)


// ── 4. Gallery ──
export function RestoranFineGallery({ content }: SectionProps<any>) {
  return (
    <section className="py-2bg-[#020202] pt-0">
      <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-2">
         {[
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80"
         ].map((img, i) => (
           <motion.div key={i} className="aspect-[4/5] overflow-hidden bg-[#0a0a0a] relative group" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once:true }} transition={{ duration: 1, delay: i*0.15, ease: "easeOut" as any }}>
              <img src={img} alt="Gallery" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 filter grayscale contrast-125 opacity-70 group-hover:grayscale-0 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-black/20 pointer-events-none group-hover:bg-black/0 transition-colors duration-1000" />
           </motion.div>
         ))}
      </div>
    </section>
  )
}
registerSection('gallery', 'restoran_fine_gallery', RestoranFineGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>)


// ── 5. Reservation / Contact ──
export function RestoranFineReservation({ business, content }: SectionProps<any>) {
  return (
    <section id="rezervasyon" className="py-32 bg-[#050505]">
      <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-[1fr_1.5fr] gap-20">
         
         {/* Info Side */}
         <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-8 h-px bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-[0.3em]">KONTAK</span>
            </div>
            
            <h2 className="text-[clamp(3.5rem,5vw,5rem)] italic tracking-tighter mb-10 leading-none text-[#FDFDF9]" style={{ fontFamily: 'var(--font-heading)' }}>
               {content?.title || 'Özel Rezervasyon.'}
            </h2>
            <p className="text-sm leading-relaxed text-[#A3A3A3] mb-16 uppercase tracking-[0.1em] max-w-sm">
               Deneyiminizi kusursuz kılabilmemiz için rezervasyon yaptırmanızı rica ederiz. Özel masalarımız haftalar öncesinden dolmaktadır.
            </p>

            <div className="space-y-10">
               <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once:true }} className="flex items-start gap-6 border-b border-[#1A1A1A] pb-8">
                  <MapPin className="w-6 h-6 mt-1 text-[#C9A84C] opacity-80" strokeWidth={1.5} />
                  <div>
                     <span className="block text-[10px] uppercase tracking-[0.3em] text-[#A3A3A3] mb-2">Konum</span>
                     <span className="block text-lg font-light text-[#FDFDF9]">{business.address || 'Besiktas/Istanbul'}</span>
                  </div>
               </motion.div>
               <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once:true }} transition={{ delay: 0.1 }} className="flex items-start gap-6 border-b border-[#1A1A1A] pb-8">
                  <Phone className="w-6 h-6 mt-1 text-[#C9A84C] opacity-80" strokeWidth={1.5} />
                  <div>
                     <span className="block text-[10px] uppercase tracking-[0.3em] text-[#A3A3A3] mb-2">Maitre D'</span>
                     <span className="block text-2xl font-light text-[#FDFDF9]" style={{ fontFamily: 'var(--font-heading)' }}>{business.phone || '+90 555 123 45 67'}</span>
                  </div>
               </motion.div>
            </div>
         </div>

         {/* Form Side */}
         <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once:true }} transition={{ duration: 1 }} className="p-10 md:p-16 bg-[#020202] border border-[#1A1A1A] relative shadow-2xl">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#C9A84C]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#C9A84C]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#C9A84C]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#C9A84C]" />

            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <label className="text-[10px] uppercase tracking-[0.3em] text-[#A3A3A3]">Tarih Seçimi</label>
                     <input type="date" className="w-full p-4 border-b border-[#1A1A1A] text-sm bg-transparent outline-none focus:border-[#C9A84C] transition-colors text-[#F5F5F5] font-light" />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] uppercase tracking-[0.3em] text-[#A3A3A3]">Oturum Saati</label>
                     <select className="w-full p-4 border-b border-[#1A1A1A] text-sm bg-transparent outline-none focus:border-[#C9A84C] transition-colors text-[#F5F5F5] font-light">
                        <option value="19:00" className="bg-[#050505]">19:00 - İlk Oturum (Pus)</option>
                        <option value="21:30" className="bg-[#050505]">21:30 - İkinci Oturum (Gece)</option>
                     </select>
                  </div>
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-[#A3A3A3]">Misafir Sayısı</label>
                  <select className="w-full p-4 border-b border-[#1A1A1A] text-sm bg-transparent outline-none focus:border-[#C9A84C] transition-colors text-[#F5F5F5] font-light">
                     <option className="bg-[#050505]">2 Kişi - İkili Tadım</option>
                     <option className="bg-[#050505]">3 Kişi</option>
                     <option className="bg-[#050505]">4 Kişi</option>
                     <option className="bg-[#050505]">5+ Kişi (Özel Oda / Kütüphane)</option>
                  </select>
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-[#A3A3A3]">Kimlik (Ad & Tel)</label>
                  <input type="text" placeholder="Ad, Soyad ve İletişim Numarası" className="w-full p-4 border-b border-[#1A1A1A] text-sm bg-transparent outline-none focus:border-[#C9A84C] transition-colors text-[#F5F5F5] font-light placeholder:text-[#A3A3A3]/30" />
               </div>
               
               <div className="pt-8 text-center">
                  <MagneticButton className="w-full sm:w-auto">
                    <button className="bg-[#1A1A1A] hover:bg-[#C9A84C] hover:text-[#050505] text-[#F5F5F5] px-16 py-5 uppercase text-[10px] font-bold tracking-[0.3em] transition-all duration-500 w-full">
                       Talebi Maitre D'ye İlet
                    </button>
                  </MagneticButton>
               </div>
            </form>
         </motion.div>

      </div>
    </section>
  )
}
registerSection('contact', 'restoran_fine_reservation', RestoranFineReservation as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
