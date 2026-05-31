'use client'

import React from 'react'
import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

// Design Tokens for Turk Context:
// Traditional, elegant, copper accents, classic Ottoman-inspired typography layouts.

const fade: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2 } }
}

export function KahveciTurkHero({ content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[85vh] bg-[#F4E3D7] flex flex-col items-center justify-center text-center px-4 py-24 border-b-[12px] border-[#913D2F]">
      <motion.div initial="hidden" animate="visible" variants={fade} className="max-w-4xl mx-auto space-y-8 z-10 relative">
        <div className="mx-auto w-16 h-16 rounded-full border border-[#913D2F] flex items-center justify-center mb-12">
          <span className="text-[#913D2F] text-2xl">☕</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif text-[#4A2511] leading-tight">
          {content?.title || 'Asırlık Damak Tadı,<br/>Gerçek Türk Kahvesi.'}
        </h1>
        <p className="text-lg md:text-xl text-[#7A4B3A] italic font-serif max-w-2xl mx-auto">
          {content?.subtitle || 'Kumda yavaş yavaş pişen, bol köpüklü, lokum eşliğinde efsanevi bir sunum.'}
        </p>
        <div className="pt-8">
          <button className="px-10 py-3 bg-[#913D2F] text-[#F4E3D7] font-serif hover:bg-[#732F23] transition-colors rounded-sm shadow-xl shadow-[#913D2F]/20">
            Menüyü İncele
          </button>
        </div>
      </motion.div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#E8CFBE] to-transparent pointer-events-none" />
    </section>
  )
}

export function KahveciTurkAbout({ content }: SectionProps<any>) {
  return (
    <section className="py-24 px-6 bg-[#FFFFFF] text-[#4A2511]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
          <h2 className="text-3xl font-serif mb-6">{content?.title || 'Ustalarımızın Sırrı'}</h2>
          <div className="w-12 h-[1px] bg-[#913D2F] mx-auto mb-6" />
          <p className="text-lg text-[#7A4B3A] leading-loose">
            {content?.description || 'Bakır cezvelerde, özel kum ateşinde ağır ağır demleniyor. Yemen\'den gelen en üst düzey çekirdekler, geleneksel taş değirmenlerde çekiliyor. Biz sadece kahve değil, tarih ikram ediyoruz.'}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export function KahveciTurkServices({ content }: SectionProps<any>) {
  const items = content?.items || [
    { title: 'Klasik Türk Kahvesi', desc: 'Lokum ve su ikramı ile', price: '₺80' },
    { title: 'Damla Sakızlı Kahve', desc: 'Hakiki Sakız Adası sakızı ile', price: '₺95' },
    { title: 'Dibek Kahvesi', desc: 'Yedi farklı baharat karışımı', price: '₺110' },
    { title: 'Mırra', desc: 'Acı ve sert geleneksel tat', price: '₺100' },
  ];

  return (
    <section className="py-24 px-6 bg-[#F9F3EE]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl text-center font-serif text-[#4A2511] mb-16">Kahve Çeşitlerimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {items.map((item: any, i: number) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="flex justify-between items-baseline border-b border-[#E8CFBE] pb-4">
              <div>
                <h3 className="text-2xl font-serif text-[#913D2F]">{item.title}</h3>
                <p className="text-[#7A4B3A] text-sm italic">{item.desc}</p>
              </div>
              <div className="text-xl font-serif text-[#4A2511] whitespace-nowrap ml-4">{item.price}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function KahveciTurkGallery(props: SectionProps<any>) { return <KahveciTurkAbout {...props} /> }
export function KahveciTurkTeam(props: SectionProps<any>) { return <KahveciTurkServices {...props} /> }
export function KahveciTurkFaq(props: SectionProps<any>) { return <KahveciTurkAbout {...props} /> }
export function KahveciTurkBlogPreview(props: SectionProps<any>) { return <KahveciTurkHero {...props} /> }
export function KahveciTurkTestimonials(props: SectionProps<any>) { return <KahveciTurkAbout {...props} /> }
export function KahveciTurkContact({ content }: SectionProps<any>) {
  return (
    <section className="py-24 px-6 bg-[#913D2F] text-[#F4E3D7] text-center border-t-8 border-[#4A2511]">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-serif mb-6">Misafirimiz Olun</h2>
        <p className="mb-8 opacity-80">Geleneksel motiflerle bezenmiş salonumuzda sizleri ağırlamaktan şeref duyarız.</p>
        <button className="px-10 py-3 border border-[#F4E3D7] hover:bg-[#F4E3D7] hover:text-[#913D2F] transition-colors font-serif">
          İletişim Kur
        </button>
      </div>
    </section>
  )
}

// Registry
registerSection('hero', 'kahveci_turk_hero', KahveciTurkHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('about', 'kahveci_turk_about', KahveciTurkAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('services', 'kahveci_turk_services', KahveciTurkServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('gallery', 'kahveci_turk_gallery', KahveciTurkGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('team', 'kahveci_turk_team', KahveciTurkTeam as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('faq', 'kahveci_turk_faq', KahveciTurkFaq as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('blog_preview', 'kahveci_turk_blog_preview', KahveciTurkBlogPreview as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('testimonials', 'kahveci_turk_testimonials', KahveciTurkTestimonials as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('contact', 'kahveci_turk_contact', KahveciTurkContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
