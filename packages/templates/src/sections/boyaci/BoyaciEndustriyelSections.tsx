'use client'

import React from 'react'
import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { registerSection } from '../../registry/section-registry'
import type { SectionProps } from '../../types/section-types'

// Aesthetic: High contrast, utilitarian. Warning yellow (#ECC94B) and black (#1A202C).

const snapAnimation: any = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 20 } }
}

export function BoyaciEndustriyelHero({ content }: SectionProps<any>) {
  return (
    <section className="min-h-screen bg-[#1A202C] flex items-center relative overflow-hidden px-6 border-b-[8px] border-[#ECC94B]">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div initial="hidden" animate="visible" variants={snapAnimation} className="max-w-3xl space-y-8">
          <div className="inline-block bg-[#ECC94B] text-[#1A202C] font-black px-4 py-2 uppercase tracking-widest text-sm">
            Endüstriyel Epoksi & Zemin Boya
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
            {content?.title || 'Ağır Sanayi Çözümleri'}
          </h1>
          <p className="text-2xl text-gray-400 font-bold max-w-xl">
            {content?.description || 'Fabrika zeminleri, otopark epoksi uygulamaları ve çelik konstrüksiyon korozyon önleyici boyalar.'}
          </p>
          <div className="pt-8 flex gap-4">
            <button className="px-8 py-4 bg-[#ECC94B] text-[#1A202C] font-black uppercase tracking-widest hover:bg-white transition-colors">
              Hizmetleri Gör
            </button>
          </div>
        </motion.div>
      </div>
      <div className="absolute right-0 bottom-0 text-[#ECC94B]/10 font-black text-[20rem] leading-none select-none">
        01
      </div>
    </section>
  )
}

export function BoyaciEndustriyelAbout({ content }: SectionProps<any>) {
  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={snapAnimation} className="bg-[#E2E8F0] aspect-square flex items-center justify-center border-4 border-[#1A202C] relative">
          <div className="absolute top-0 right-0 w-16 h-16 border-b-4 border-l-4 border-[#ECC94B] m-4" />
          <h2 className="text-5xl font-black text-[#1A202C] text-center uppercase">Yüksek<br/>Dayanım</h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={snapAnimation} className="flex flex-col justify-center space-y-8 pl-0 md:pl-10">
          <p className="text-2xl font-bold text-[#2D3748]">Trafik, kimyasal ve ağır yüke dayanıklı zemin boya sistemleri.</p>
          <p className="text-lg text-gray-600">
            Endüstriyel tesislerinizde iş güvenliği standartlarına uygun yol çizgi boyalarından, kimyasal tank içi korozyon önleyici kalın kat ziftli epoksilere kadar tam kapsamlı endüstriyel uygulama yapıyoruz.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export function BoyaciEndustriyelServices({ content }: SectionProps<any>) {
  return (
    <section className="py-32 bg-[#1A202C] px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={snapAnimation} className="text-5xl font-black text-white uppercase mb-16 border-l-8 border-[#ECC94B] pl-6">
          Uygulama Alanları
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Epoksi Zemin', 'Yol Çizgi', 'Çelik Koruma', 'Otopark Boya'].map((item, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} variants={snapAnimation} className="bg-[#2D3748] p-8 border border-gray-700 hover:border-[#ECC94B] transition-colors cursor-pointer text-center md:text-left">
              <h3 className="text-2xl font-black text-white uppercase">{item}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function BoyaciEndustriyelGallery(props: SectionProps<any>) { return <BoyaciEndustriyelAbout {...props} /> }
export function BoyaciEndustriyelTeam(props: SectionProps<any>) { return <BoyaciEndustriyelServices {...props} /> }
export function BoyaciEndustriyelFaq(props: SectionProps<any>) { return <BoyaciEndustriyelAbout {...props} /> }
export function BoyaciEndustriyelBlogPreview(props: SectionProps<any>) { return <BoyaciEndustriyelHero {...props} /> }
export function BoyaciEndustriyelTestimonials(props: SectionProps<any>) { return <BoyaciEndustriyelServices {...props} /> }

export function BoyaciEndustriyelContact({ content }: SectionProps<any>) {
  return (
    <section className="py-32 px-6 bg-[#ECC94B] text-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={snapAnimation} className="max-w-3xl mx-auto border-[12px] border-[#1A202C] p-12 bg-white">
        <h2 className="text-4xl md:text-5xl font-black text-[#1A202C] uppercase mb-6">Teklif Almak İçin</h2>
        <p className="text-xl font-bold text-gray-700 mb-8">Fabrikanıza özel keşif randevusu oluşturun.</p>
        <button className="px-12 py-5 bg-[#1A202C] text-white font-black uppercase tracking-widest hover:bg-gray-800 transition-colors w-full md:w-auto">
          İletişim Formu
        </button>
      </motion.div>
    </section>
  )
}

registerSection('hero', 'boyaci_endustriyel_hero', BoyaciEndustriyelHero as unknown as ComponentType<SectionProps<any>>)
registerSection('about', 'boyaci_endustriyel_about', BoyaciEndustriyelAbout as unknown as ComponentType<SectionProps<any>>)
registerSection('services', 'boyaci_endustriyel_services', BoyaciEndustriyelServices as unknown as ComponentType<SectionProps<any>>)
registerSection('gallery', 'boyaci_endustriyel_gallery', BoyaciEndustriyelGallery as unknown as ComponentType<SectionProps<any>>)
registerSection('team', 'boyaci_endustriyel_team', BoyaciEndustriyelTeam as unknown as ComponentType<SectionProps<any>>)
registerSection('faq', 'boyaci_endustriyel_faq', BoyaciEndustriyelFaq as unknown as ComponentType<SectionProps<any>>)
registerSection('blog_preview', 'boyaci_endustriyel_blog_preview', BoyaciEndustriyelBlogPreview as unknown as ComponentType<SectionProps<any>>)
registerSection('testimonials', 'boyaci_endustriyel_testimonials', BoyaciEndustriyelTestimonials as unknown as ComponentType<SectionProps<any>>)
registerSection('contact', 'boyaci_endustriyel_contact', BoyaciEndustriyelContact as unknown as ComponentType<SectionProps<any>>)
