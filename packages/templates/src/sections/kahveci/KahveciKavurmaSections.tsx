'use client'

import React from 'react'
import type { ComponentType } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// Design Tokens for Kavurma Context:
// Dark, intense, roasted beans, heavily textured, intense typography.

export function KahveciKavurmaHero({ content }: SectionProps<any>) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative min-h-screen bg-[#110D0B] text-[#E0D5C1] overflow-hidden flex flex-col justify-end pb-32 px-6">
      <motion.div style={{ y: y1, opacity }} className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1548&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-30 contrast-150 grayscale"
          alt="Coffee Roasting"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#110D0B] via-[#110D0B]/80 to-transparent" />
      </motion.div>
      
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
          <span className="text-orange-600 font-mono font-bold tracking-[0.4em] uppercase text-sm mb-6 block">
            {content?.badge || 'Master Roasters'}
          </span>
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-8">
            {content?.title || 'Burn.<br/>Brew.<br/>Drink.'}
          </h1>
          <p className="max-w-xl text-xl text-[#A09381] font-medium">
            {content?.subtitle || 'We roast in small batches. Dark, intense, and uncompromising. Not for the faint of heart.'}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export function KahveciKavurmaAbout({ content }: SectionProps<any>) {
  return (
    <section className="py-32 bg-[#110D0B] text-[#E0D5C1] border-t border-white/10 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="flex gap-4 items-center">
          <div className="h-[1px] w-24 bg-orange-600" />
          <h2 className="text-3xl font-bold uppercase tracking-widest">{content?.title || 'Our Philosophy'}</h2>
        </div>
        <p className="text-3xl md:text-5xl font-black leading-tight">
          {content?.description || 'Roasting is violent. The beans crack. The smoke rises. What remains is pure, concentrated essence.'}
        </p>
      </div>
    </section>
  )
}

export function KahveciKavurmaServices({ content }: SectionProps<any>) {
  const roasts = content?.items || [
    { title: 'Ethiopia Yirgacheffe', roast: 'Light-Medium', notes: 'Floral, Citrus, Tea-like' },
    { title: 'Colombia Supremo', roast: 'Medium', notes: 'Chocolate, Caramel, Nutty' },
    { title: 'Sumatra Mandheling', roast: 'Dark', notes: 'Earthy, Tobacco, Cocoa' },
  ];

  return (
    <section className="py-24 bg-[#1A1412] px-6 text-[#E0D5C1]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-black uppercase mb-16">Fresh Bags</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roasts.map((r: any, i: number) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="bg-[#110D0B] border border-white/5 p-8 rounded-sm group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full blur-3xl group-hover:bg-orange-600/20 transition-colors" />
              <div className="font-mono text-orange-600 text-sm mb-4 border border-orange-600/30 inline-block px-2 py-1">ROAST: {r.roast}</div>
              <h3 className="text-2xl font-bold mb-2">{r.title}</h3>
              <p className="text-[#A09381] font-medium text-sm">Notes: {r.notes}</p>
              <button className="mt-8 text-white font-bold uppercase tracking-widest text-xs border-b border-white pb-1 hover:text-orange-600 hover:border-orange-600 transition-colors">
                Order 250g
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function KahveciKavurmaGallery(props: SectionProps<any>) { return <KahveciKavurmaAbout {...props} /> }
export function KahveciKavurmaTeam(props: SectionProps<any>) { return <KahveciKavurmaServices {...props} /> }
export function KahveciKavurmaFaq(props: SectionProps<any>) { return <KahveciKavurmaAbout {...props} /> }
export function KahveciKavurmaBlogPreview(props: SectionProps<any>) { return <KahveciKavurmaServices {...props} /> }
export function KahveciKavurmaTestimonials(props: SectionProps<any>) { return <KahveciKavurmaAbout {...props} /> }
export function KahveciKavurmaContact({ content }: SectionProps<any>) {
  return (
    <section className="py-32 bg-[#110D0B] text-[#E0D5C1] px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-7xl font-black uppercase tracking-tighter">Visit the Roastery</h2>
        <p className="font-mono text-xl text-[#A09381]">Industrial Zone C, Block 12</p>
        <div className="pt-8">
          <button className="px-12 py-5 bg-orange-600 text-white font-black uppercase tracking-widest hover:bg-orange-700 transition-colors">
            Get Directions
          </button>
        </div>
      </div>
    </section>
  )
}

// Registry
registerSection('hero', 'kahveci_kavurma_hero', KahveciKavurmaHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('about', 'kahveci_kavurma_about', KahveciKavurmaAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('services', 'kahveci_kavurma_services', KahveciKavurmaServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('gallery', 'kahveci_kavurma_gallery', KahveciKavurmaGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('team', 'kahveci_kavurma_team', KahveciKavurmaTeam as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('faq', 'kahveci_kavurma_faq', KahveciKavurmaFaq as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('blog_preview', 'kahveci_kavurma_blog_preview', KahveciKavurmaBlogPreview as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('testimonials', 'kahveci_kavurma_testimonials', KahveciKavurmaTestimonials as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('contact', 'kahveci_kavurma_contact', KahveciKavurmaContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
