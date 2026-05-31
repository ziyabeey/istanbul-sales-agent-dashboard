'use client'

import React from 'react'
import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// Design Tokens for Brunch Context:
// Light, pastel, organic, sunny and bright aesthetics

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as any } }
};

export function KahveciBrunchHero({ content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[95vh] flex items-center bg-[#FFFdf8] overflow-hidden px-4 md:px-12 py-24">
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 150, repeat: Infinity, ease: "linear" as const }}
        className="absolute -top-[20%] -right-[10%] w-[60%] h-[80%] rounded-full bg-[#FFE8D6] opacity-40 blur-3xl pointer-events-none" 
      />
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }} className="space-y-8">
          <motion.span variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-[#F2C99A] text-[#8C5A2A] text-sm font-semibold tracking-wide">
            {content?.badge || 'Sunny Side Up'}
          </motion.span>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold text-[#4A3B2C] leading-[1.1] font-serif">
            {content?.title || 'Weekend stories start with brunch.'}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-[#8E7E6D] max-w-lg leading-relaxed">
            {content?.subtitle || 'Freshly brewed coffee, organic sourdough, and lots of sunshine. Your perfect morning ritual.'}
          </motion.p>
          <motion.div variants={fadeUp} className="flex gap-4 pt-4">
            <button className="px-8 py-4 rounded-full bg-[#4A3B2C] text-white font-medium hover:bg-[#3A2D20] transition-colors shadow-lg shadow-[#4A3B2C]/20">
              Book a Table
            </button>
          </motion.div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative">
          <div className="aspect-square rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl rotate-3">
            <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1530&auto=format&fit=crop" alt="Brunch Spread" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-xl -rotate-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl">🥑</span>
              <div>
                <p className="font-bold text-[#4A3B2C]">Avocado Toast</p>
                <p className="text-sm text-[#8E7E6D]">Chef's Special</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function KahveciBrunchAbout({ content }: SectionProps<any>) {
  return (
    <section className="py-24 px-6 bg-white text-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-4xl text-[#4A3B2C] font-serif font-bold">
          {content?.title || 'Farm to Table Excellence'}
        </h2>
        <p className="text-[#8E7E6D] text-lg leading-relaxed">
          {content?.description || 'We believe in slow mornings and good food. Every egg is organic, every bean is traceable. A sanctuary designed for long chats and delicious bites.'}
        </p>
      </motion.div>
    </section>
  )
}

export function KahveciBrunchServices({ content }: SectionProps<any>) {
  const menu = content?.items || [
    { title: 'Pancakes Stack', price: '₺150', icon: '🥞' },
    { title: 'Eggs Benedict', price: '₺180', icon: '🍳' },
    { title: 'Matcha Latte', price: '₺90', icon: '🍵' },
  ];

  return (
    <section className="py-24 px-6 bg-[#FFFdf8]">
      <div className="max-w-6xl mx-auto">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center text-4xl font-serif font-bold text-[#4A3B2C] mb-16">
          Brunch Menu
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menu.map((item: any, i: number) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow border border-[#FFF0E0] text-center space-y-4">
              <div className="text-5xl">{item.icon}</div>
              <h3 className="text-xl font-bold text-[#4A3B2C]">{item.title}</h3>
              <p className="font-medium text-[#F2C99A] text-lg">{item.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function KahveciBrunchGallery(props: SectionProps<any>) { return <KahveciBrunchAbout {...props} /> }
export function KahveciBrunchTeam(props: SectionProps<any>) { return <KahveciBrunchServices {...props} /> }
export function KahveciBrunchFaq(props: SectionProps<any>) { return <KahveciBrunchAbout {...props} /> }
export function KahveciBrunchBlogPreview(props: SectionProps<any>) { return <KahveciBrunchServices {...props} /> }
export function KahveciBrunchTestimonials(props: SectionProps<any>) { return <KahveciBrunchAbout {...props} /> }
export function KahveciBrunchContact({ content }: SectionProps<any>) {
  return (
    <section className="py-24 px-6 bg-[#F2C99A] text-center rounded-t-[4rem]">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-xl mx-auto space-y-8 bg-white p-12 rounded-[3rem] shadow-lg">
        <h2 className="text-3xl font-serif font-bold text-[#4A3B2C]">Say Hello</h2>
        <p className="text-[#8E7E6D]">Reserve your weekend spot before we run out of eggs!</p>
        <button className="w-full py-4 rounded-full bg-[#4A3B2C] text-white font-medium hover:bg-black transition-colors">
          Call Now
        </button>
      </motion.div>
    </section>
  )
}

// Registry
registerSection('hero', 'kahveci_brunch_hero', KahveciBrunchHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('about', 'kahveci_brunch_about', KahveciBrunchAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('services', 'kahveci_brunch_services', KahveciBrunchServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('gallery', 'kahveci_brunch_gallery', KahveciBrunchGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('team', 'kahveci_brunch_team', KahveciBrunchTeam as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('faq', 'kahveci_brunch_faq', KahveciBrunchFaq as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('blog_preview', 'kahveci_brunch_blog_preview', KahveciBrunchBlogPreview as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('testimonials', 'kahveci_brunch_testimonials', KahveciBrunchTestimonials as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('contact', 'kahveci_brunch_contact', KahveciBrunchContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
