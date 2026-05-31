'use client'

import React from 'react'
import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// Design Tokens for Lux Context:
// High-end lounge, Syne font, gold accents, deep dark tones.

const slideUp: any = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } }
};

export function KahveciLuxHero({ content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[90vh] bg-[#000000] flex items-center px-4 md:px-16 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-40">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#000000] z-10" />
        <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1447&auto=format&fit=crop" className="w-full h-full object-cover grayscale brightness-50" />
      </div>
      
      <div className="relative z-20 max-w-7xl mx-auto w-full">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="max-w-2xl space-y-8">
          <motion.div variants={slideUp} className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] uppercase tracking-[0.2em] text-xs font-bold">{content?.badge || 'ELITE LOUNGE'}</span>
          </motion.div>
          
          <motion.h1 variants={slideUp} className="text-5xl md:text-7xl font-serif text-[#F8FAFC]">
            {content?.title || 'Sophisticated Coffee Experience'}
          </motion.h1>
          
          <motion.p variants={slideUp} className="text-xl text-[#94A3B8] font-light leading-relaxed">
            {content?.subtitle || 'Where premium beans meet architectural elegance. A sanctuary for the refined palate.'}
          </motion.p>
          
          <motion.div variants={slideUp} className="pt-8 flex gap-6">
            <button className="px-8 py-4 bg-[#D4AF37] text-black text-sm uppercase tracking-widest hover:bg-[#FDE047] transition-colors">
              Reserve a Table
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export function KahveciLuxAbout({ content }: SectionProps<any>) {
  return (
    <section className="py-32 px-4 md:px-16 bg-[#050505] text-[#F8FAFC]">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideUp} className="text-3xl md:text-5xl font-serif leading-tight text-[#D4AF37] mb-8">
          {content?.title || 'Curated to the highest standards.'}
        </motion.h2>
        <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideUp} className="text-lg md:text-xl font-light text-[#94A3B8] max-w-3xl mx-auto">
          {content?.description || 'From the velvet seating to the gold-plated espresso machines, every detail is engineered for luxury. We serve only the top 1% of global coffee harvests.'}
        </motion.p>
      </div>
    </section>
  )
}

export function KahveciLuxServices({ content }: SectionProps<any>) {
  const items = content?.items || [
    { title: 'Gold Leaf Latte', desc: 'Edible 24k gold, Madagascar vanilla', price: '₺450' },
    { title: 'Geisha Pour Over', desc: 'Panama Estate, hand brewed', price: '₺600' },
    { title: 'Black Truffle Mocha', desc: 'Valrhona chocolate, fresh truffle', price: '₺550' }
  ];

  return (
    <section className="py-24 px-4 md:px-16 bg-[#000000]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-sm uppercase tracking-[0.3em] text-[#D4AF37] mb-12 text-center text-opacity-80">Signature Offerings</h2>
        <div className="space-y-8">
          {items.map((item: any, i: number) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideUp} className="flex justify-between items-end border-b border-[#334155] pb-6 hover:border-[#D4AF37] transition-colors group">
              <div>
                <h3 className="text-2xl font-serif text-[#F8FAFC] group-hover:text-[#D4AF37] transition-colors">{item.title}</h3>
                <p className="text-[#94A3B8] font-light mt-2">{item.desc}</p>
              </div>
              <div className="text-[#D4AF37] text-lg font-serif">{item.price}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function KahveciLuxGallery(props: SectionProps<any>) { return <KahveciLuxAbout {...props} /> }
export function KahveciLuxTeam(props: SectionProps<any>) { return <KahveciLuxServices {...props} /> }
export function KahveciLuxFaq(props: SectionProps<any>) { return <KahveciLuxAbout {...props} /> }
export function KahveciLuxBlogPreview(props: SectionProps<any>) { return <KahveciLuxServices {...props} /> }
export function KahveciLuxTestimonials(props: SectionProps<any>) { return <KahveciLuxAbout {...props} /> }
export function KahveciLuxContact({ content }: SectionProps<any>) {
  return (
    <section className="py-32 px-4 bg-[#050505] text-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideUp} className="max-w-2xl mx-auto p-12 border border-[#D4AF37]/20 bg-[#000000]">
        <h2 className="text-4xl font-serif text-[#D4AF37] mb-6">Concierge</h2>
        <p className="text-[#94A3B8] mb-8 font-light">Contact us for private room bookings or exclusive events.</p>
        <button className="px-10 py-4 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all uppercase tracking-widest text-sm">
          Call Concierge
        </button>
      </motion.div>
    </section>
  )
}

// Registry
registerSection('hero', 'kahveci_lux_hero', KahveciLuxHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('about', 'kahveci_lux_about', KahveciLuxAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('services', 'kahveci_lux_services', KahveciLuxServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('gallery', 'kahveci_lux_gallery', KahveciLuxGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('team', 'kahveci_lux_team', KahveciLuxTeam as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('faq', 'kahveci_lux_faq', KahveciLuxFaq as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('blog_preview', 'kahveci_lux_blog_preview', KahveciLuxBlogPreview as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('testimonials', 'kahveci_lux_testimonials', KahveciLuxTestimonials as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('contact', 'kahveci_lux_contact', KahveciLuxContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
