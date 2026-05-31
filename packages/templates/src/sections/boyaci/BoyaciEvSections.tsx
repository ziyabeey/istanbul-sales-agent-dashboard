'use client'

import React from 'react'
import type { ComponentType } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { registerSection } from '../../registry/section-registry'
import type { SectionProps } from '../../types/section-types'

// Aesthetic: Warm, cozy, pastel swatches, clean whites, soft warm lighting.
// Colors: White backdrops, Mint #C4F1F9, Peach #FEEBC8

export function BoyaciEvHero({ content }: SectionProps<any>) {
  return (
    <section className="min-h-[90vh] bg-white flex items-center px-6 relative">
      <div className="absolute right-0 top-0 w-1/2 h-full bg-[#FEEBC8] rounded-l-full mix-blend-multiply opacity-50" />
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-[#2D3748] leading-tight">
            {content?.title || 'Evinizi Renklerle Yenileyin'}
          </h1>
          <p className="text-xl text-[#718096] leading-relaxed">
            {content?.description || 'Tozsuz, kokusuz ve tertemiz! Evcil hayvan dostu tam silinebilir boyalarla evinizi 1 günde yeniliyoruz.'}
          </p>
          <button className="px-8 py-4 bg-[#ED8936] text-white rounded-full font-bold shadow-lg hover:bg-[#DD6B20] hover:scale-105 transition-all">
            Fiyat Hesapla
          </button>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="relative h-[60vh] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2670&auto=format&fit=crop)' }} />
          {/* Color swatch bubbles */}
          <div className="absolute right-4 top-4 flex flex-col gap-2">
            {['#E2E8F0', '#FC8181', '#68D391', '#F6E05E'].map((c, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white shadow-md" style={{ backgroundColor: c }} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function BoyaciEvAbout({ content }: SectionProps<any>) {
  return (
    <section className="py-24 bg-[#F7FAFC] px-6">
      <div className="max-w-4xl mx-auto text-center space-y-10">
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-bold text-[#2D3748]">
          Ev Hanımlarının Puanı: <span className="text-[#ED8936]">5 Yıldız</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-xl text-[#718096] leading-loose">
          Eşyalarınızı naylon muşambalarla sarmalıyor, süpürgelikleri maskeliyoruz. Akşam eve geldiğinizde tek damla boya izi göremezsiniz. Boyacılık bizim için sadece rulo sürmek değil, temiz ve düzenli çalışmaktır.
        </motion.p>
      </div>
    </section>
  )
}

export function BoyaciEvServices({ content }: SectionProps<any>) {
  return (
    <section className="py-32 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { tag: '🧽', title: 'Tam Silinebilir Boya', desc: 'Lekeleri sadece ıslak bezle kolayca silin.' },
            { tag: '⏱️', title: '1 Günde Teslim', desc: 'Sabah başlıyor, akşam eşyalarınızı yerine dizip çıkıyoruz.' },
            { tag: '👶', title: 'Kokusuz & Sağlıklı', desc: 'Astım hastaları ve bebekler için su bazlı güvenilir ürünler.' }
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-[#EDF2F7] p-10 rounded-[30px] text-center hover:bg-[#FEEBC8] transition-colors">
              <div className="text-5xl mb-6">{item.tag}</div>
              <h3 className="text-2xl font-bold text-[#2D3748] mb-4">{item.title}</h3>
              <p className="text-[#718096]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function BoyaciEvGallery(props: SectionProps<any>) { return <BoyaciEvAbout {...props} /> }
export function BoyaciEvTeam(props: SectionProps<any>) { return <BoyaciEvServices {...props} /> }
export function BoyaciEvFaq(props: SectionProps<any>) { return <BoyaciEvAbout {...props} /> }
export function BoyaciEvBlogPreview(props: SectionProps<any>) { return <BoyaciEvHero {...props} /> }
export function BoyaciEvTestimonials(props: SectionProps<any>) { return <BoyaciEvAbout {...props} /> }

export function BoyaciEvContact({ content }: SectionProps<any>) {
  return (
    <section className="py-32 bg-[#C4F1F9] px-6 text-center rounded-t-[50px] mt-10">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-2xl mx-auto bg-white p-12 rounded-[40px] shadow-xl">
        <h2 className="text-3xl font-bold text-[#2D3748] mb-6">WhatsApp'tan Resim Gönderin</h2>
        <p className="text-[#718096] mb-8">Odalarınızın resmini atın, anında fiyat verelim.</p>
        <button className="w-full py-4 bg-[#38A169] text-white rounded-xl font-bold shadow-lg hover:bg-[#2F855A] transition-colors">
          Hemen WhatsApp'tan Ulaş
        </button>
      </motion.div>
    </section>
  )
}

registerSection('hero', 'boyaci_ev_hero', BoyaciEvHero as unknown as ComponentType<SectionProps<any>>)
registerSection('about', 'boyaci_ev_about', BoyaciEvAbout as unknown as ComponentType<SectionProps<any>>)
registerSection('services', 'boyaci_ev_services', BoyaciEvServices as unknown as ComponentType<SectionProps<any>>)
registerSection('gallery', 'boyaci_ev_gallery', BoyaciEvGallery as unknown as ComponentType<SectionProps<any>>)
registerSection('team', 'boyaci_ev_team', BoyaciEvTeam as unknown as ComponentType<SectionProps<any>>)
registerSection('faq', 'boyaci_ev_faq', BoyaciEvFaq as unknown as ComponentType<SectionProps<any>>)
registerSection('blog_preview', 'boyaci_ev_blog_preview', BoyaciEvBlogPreview as unknown as ComponentType<SectionProps<any>>)
registerSection('testimonials', 'boyaci_ev_testimonials', BoyaciEvTestimonials as unknown as ComponentType<SectionProps<any>>)
registerSection('contact', 'boyaci_ev_contact', BoyaciEvContact as unknown as ComponentType<SectionProps<any>>)
