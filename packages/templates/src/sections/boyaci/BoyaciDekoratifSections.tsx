'use client'

import React from 'react'
import type { ComponentType } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { registerSection } from '../../registry/section-registry'
import type { SectionProps } from '../../types/section-types'

// Aesthetic: Artistic, soft gradients, Venetian plaster textures, elegant typography.
// Colors: Plaster #F9F6F0, Terracotta #D4A373, Slate #6B705C

const fluidReveal: any = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 40 },
  visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } }
}

export function BoyaciDekoratifHero({ content }: SectionProps<any>) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#F9F6F0] overflow-hidden px-6">
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')]" />
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gradient-to-bl from-[#D4A373]/30 to-transparent rounded-full mix-blend-multiply blur-3xl" />
      
      <motion.div initial="hidden" animate="visible" variants={fluidReveal} className="relative z-10 max-w-4xl text-center space-y-10">
        <h1 className="text-6xl md:text-8xl text-[#6B705C] font-serif font-light leading-[1.1]">
          {content?.title || 'Duvarlarınız Birer Tuval'}
        </h1>
        <p className="text-xl md:text-2xl text-[#8A8F7A] font-light max-w-2xl mx-auto leading-relaxed">
          {content?.description || 'İtalyan boya, sedefli dokular ve size özel sanatsal bitişlerle mekanlarınıza ruh katıyoruz.'}
        </p>
        <button className="px-10 py-4 border border-[#6B705C] text-[#6B705C] uppercase tracking-[0.2em] hover:bg-[#6B705C] hover:text-[#F9F6F0] transition-colors duration-700">
          Katalog İncele
        </button>
      </motion.div>
    </section>
  )
}

export function BoyaciDekoratifAbout({ content }: SectionProps<any>) {
  return (
    <section className="py-32 bg-white px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={fluidReveal} className="space-y-8">
          <h2 className="text-4xl md:text-6xl text-[#6B705C] font-serif font-light">Zanaat ve Estetiğin Buluşması</h2>
          <div className="w-24 h-[1px] bg-[#D4A373]" />
          <p className="text-lg text-[#8A8F7A] font-light leading-loose">
            Standart boya badana işlemlerinin ötesine geçerek, Venedik sıvası, mermer deseni ve altın varak gibi dekoratif tekniklerle yaşam alanlarınızı kişiselleştiriyoruz. Her duvar, ustalarımızın elinde eşsiz bir şahesere dönüşür.
          </p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fluidReveal} className="relative aspect-[4/5] overflow-hidden rounded-t-[100px] border-4 border-[#F9F6F0]">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=2671&auto=format&fit=crop)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}

export function BoyaciDekoratifServices({ content }: SectionProps<any>) {
  return (
    <section className="py-32 bg-[#F9F6F0] px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fluidReveal} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl text-[#6B705C] font-serif">Özel Dokular</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-10">
          {['İtalyan Boya (Stucco)', 'Sedef & Efekt Boya', 'Beton Görünümlü Sıva'].map((item, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.2 }} variants={fluidReveal} className="group cursor-pointer">
              <div className="aspect-square bg-white border border-[#D4A373]/20 flex items-center justify-center p-8 text-center transition-all duration-700 group-hover:bg-[#6B705C] group-hover:text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')] transition-opacity duration-700" />
                <h3 className="text-2xl font-serif text-[#6B705C] group-hover:text-white transition-colors duration-700 relative z-10">{item}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function BoyaciDekoratifGallery(props: SectionProps<any>) { return <BoyaciDekoratifAbout {...props} /> }
export function BoyaciDekoratifTeam(props: SectionProps<any>) { return <BoyaciDekoratifServices {...props} /> }
export function BoyaciDekoratifFaq(props: SectionProps<any>) { return <BoyaciDekoratifAbout {...props} /> }
export function BoyaciDekoratifBlogPreview(props: SectionProps<any>) { return <BoyaciDekoratifHero {...props} /> }
export function BoyaciDekoratifTestimonials(props: SectionProps<any>) { return <BoyaciDekoratifServices {...props} /> }

export function BoyaciDekoratifContact({ content }: SectionProps<any>) {
  return (
    <section className="py-40 px-6 bg-[#6B705C] text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stucco.png')]" />
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fluidReveal} className="relative z-10 max-w-3xl mx-auto space-y-10">
        <h2 className="text-5xl font-serif text-[#F9F6F0]">Mekanınızı Dönüştürün</h2>
        <p className="text-xl text-[#F9F6F0]/80 font-light">Ücretsiz keşif ve renk/doku danışmanlığı için bize ulaşın.</p>
        <button className="px-12 py-4 bg-[#D4A373] text-white uppercase tracking-widest hover:bg-white hover:text-[#D4A373] transition-colors duration-700">
          Keşif İste
        </button>
      </motion.div>
    </section>
  )
}

registerSection('hero', 'boyaci_dekoratif_hero', BoyaciDekoratifHero as unknown as ComponentType<SectionProps<any>>)
registerSection('about', 'boyaci_dekoratif_about', BoyaciDekoratifAbout as unknown as ComponentType<SectionProps<any>>)
registerSection('services', 'boyaci_dekoratif_services', BoyaciDekoratifServices as unknown as ComponentType<SectionProps<any>>)
registerSection('gallery', 'boyaci_dekoratif_gallery', BoyaciDekoratifGallery as unknown as ComponentType<SectionProps<any>>)
registerSection('team', 'boyaci_dekoratif_team', BoyaciDekoratifTeam as unknown as ComponentType<SectionProps<any>>)
registerSection('faq', 'boyaci_dekoratif_faq', BoyaciDekoratifFaq as unknown as ComponentType<SectionProps<any>>)
registerSection('blog_preview', 'boyaci_dekoratif_blog_preview', BoyaciDekoratifBlogPreview as unknown as ComponentType<SectionProps<any>>)
registerSection('testimonials', 'boyaci_dekoratif_testimonials', BoyaciDekoratifTestimonials as unknown as ComponentType<SectionProps<any>>)
registerSection('contact', 'boyaci_dekoratif_contact', BoyaciDekoratifContact as unknown as ComponentType<SectionProps<any>>)
