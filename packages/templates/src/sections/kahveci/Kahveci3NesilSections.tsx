'use client'

import React from 'react'
import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// Design Tokens for 3. Nesil Context:
// Industrial, hipster, raw typography

const revealVars: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } }
};

const imageReveal: any = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  visible: { clipPath: 'inset(0% 0 0 0)', transition: { duration: 0.8, ease: 'circOut' } }
};

export function Kahveci3NesilHero({ content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-[#FAFAFA] text-zinc-900 border-b-8 border-zinc-900 overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--color-accent),_transparent)] pointer-events-none" />
      <div className="max-w-6xl w-full px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
          <motion.div variants={revealVars} className="uppercase tracking-[0.3em] text-xs font-bold text-zinc-500">
            {content?.badge || 'THIRD WAVE COFFEE ROASTERS'}
          </motion.div>
          <motion.h1 variants={revealVars} className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
            {content?.title || 'RAW. REAL. ROAST.'}
          </motion.h1>
          <motion.p variants={revealVars} className="text-xl text-zinc-600 max-w-md font-medium">
            {content?.subtitle || 'Single origin beans, hand-poured perfection. Minimalist approach to maximum flavor.'}
          </motion.p>
          <motion.div variants={revealVars} className="pt-4 flex gap-4">
            <button className="px-8 py-4 bg-zinc-900 text-white font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 transition-colors border-2 border-zinc-900">
              Coffee Menu
            </button>
            <button className="px-8 py-4 bg-transparent text-zinc-900 font-bold uppercase tracking-widest text-xs hover:bg-zinc-100 transition-colors border-2 border-zinc-900">
              Our Process
            </button>
          </motion.div>
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={imageReveal} className="relative aspect-[3/4] bg-zinc-200 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1470&auto=format&fit=crop" alt="Coffee Pour" className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply opacity-80" />
          <div className="absolute font-mono text-[10rem] font-bold text-white opacity-20 -right-20 -bottom-10 pointer-events-none">
            01
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function Kahveci3NesilAbout({ content }: SectionProps<any>) {
  return (
    <section className="py-32 px-6 bg-zinc-900 text-zinc-100 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealVars} className="md:col-span-8">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none mb-6">
              {content?.title || 'The Art of Extraction.'}
            </h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVars} className="md:col-span-4 text-zinc-400 font-medium">
            <p>{content?.description || 'We source ethical beans, roast them lighter to preserve origin characteristics, and brew with scientific precision.'}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function Kahveci3NesilServices({ content }: SectionProps<any>) {
  const services = content?.items || [
    { title: 'Pour Over', desc: 'V60, Chemex, Kalita', price: '₺120' },
    { title: 'Espresso', desc: 'Naked portafilter shots', price: '₺90' },
    { title: 'Cold Brew', desc: '18-hour slow drip', price: '₺110' },
  ];

  return (
    <section className="py-24 px-6 bg-[#FAFAFA] border-y border-zinc-200">
      <div className="max-w-4xl mx-auto space-y-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVars} className="flex justify-between items-end border-b-4 border-zinc-900 pb-4">
          <h2 className="text-4xl font-black uppercase">Menu.</h2>
          <span className="font-mono text-zinc-500 font-bold">2026/AW</span>
        </motion.div>
        
        <div className="space-y-4">
          {services.map((item: any, i: number) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVars} className="flex justify-between items-center py-4 border-b border-zinc-200 group hover:border-zinc-900 transition-colors">
              <div>
                <h3 className="text-2xl font-bold uppercase tracking-tight">{item.title}</h3>
                <p className="text-zinc-500 font-medium">{item.desc}</p>
              </div>
              <div className="text-xl font-mono font-bold">{item.price}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Kahveci3NesilGallery({ content }: SectionProps<any>) {
  return (
    <section className="py-12 bg-zinc-900 overflow-hidden flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -2000] }} 
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' as const }}
          className="flex gap-8 items-center"
        >
          {[1,2,3,4,5,6,7,8].map((i) => (
            <h2 key={i} className="text-8xl font-black text-transparent uppercase outline-text italic px-8" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
              NO SUGAR REQUIRED.
            </h2>
          ))}
        </motion.div>
    </section>
  )
}

export function Kahveci3NesilTeam(props: SectionProps<any>) { return <Kahveci3NesilAbout {...props} /> }
export function Kahveci3NesilFaq(props: SectionProps<any>) { return <Kahveci3NesilServices {...props} /> }
export function Kahveci3NesilBlogPreview(props: SectionProps<any>) { return <Kahveci3NesilHero {...props} /> }
export function Kahveci3NesilTestimonials(props: SectionProps<any>) { return <Kahveci3NesilAbout {...props} /> }
export function Kahveci3NesilContact({ content }: SectionProps<any>) {
  return (
    <section className="py-32 px-6 bg-zinc-100 text-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVars} className="max-w-2xl mx-auto space-y-8">
        <h2 className="text-5xl font-black uppercase">Find Us</h2>
        <div className="font-mono text-zinc-600 space-y-2">
          <p>M-F: 07:00 - 18:00</p>
          <p>S-S: 09:00 - 20:00</p>
        </div>
        <button className="px-12 py-4 bg-zinc-900 text-white font-bold uppercase tracking-widest text-xs hover:bg-black transition-colors">
          Get Directions
        </button>
      </motion.div>
    </section>
  )
}

// Registry
registerSection('hero', 'kahveci_3nesil_hero', Kahveci3NesilHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('about', 'kahveci_3nesil_about', Kahveci3NesilAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('services', 'kahveci_3nesil_services', Kahveci3NesilServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('gallery', 'kahveci_3nesil_gallery', Kahveci3NesilGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('team', 'kahveci_3nesil_team', Kahveci3NesilTeam as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('faq', 'kahveci_3nesil_faq', Kahveci3NesilFaq as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('blog_preview', 'kahveci_3nesil_blog_preview', Kahveci3NesilBlogPreview as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('testimonials', 'kahveci_3nesil_testimonials', Kahveci3NesilTestimonials as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('contact', 'kahveci_3nesil_contact', Kahveci3NesilContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
