'use client'

import React from 'react'
import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { registerSection } from '../../registry/section-registry'
import type { SectionProps } from '../../types/section-types'

// Aesthetic: Ultra-minimalist modernism. Deep matte charcoal #171923 with sublime gold #D69E2E.
// Mechanics: Very slow cinematic fade-ups, large whitespace.

const cinematicFade: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 2, ease: "easeOut" as any } }
}

export function BoyaciLuxHero({ content }: SectionProps<any>) {
  return (
    <section className="relative min-h-screen bg-[#111111] overflow-hidden flex items-center justify-center p-6">
      <motion.div initial="hidden" animate="visible" variants={cinematicFade} className="z-10 max-w-5xl text-center flex flex-col items-center">
        <p className="text-[#D69E2E] tracking-[0.5em] text-xs uppercase mb-8 border-b border-[#D69E2E]/30 pb-2">Villa & Yalı Boya Mimarlığı</p>
        <h1 className="text-5xl md:text-8xl text-white font-light tracking-wide leading-tight mb-8 drop-shadow-2xl">
          {content?.title || 'Kusursuz Yüzeyler'}
        </h1>
        <p className="text-[#A0AEC0] text-lg font-light max-w-2xl leading-loose mb-12">
          {content?.description || 'En ince kum zımparasından aydınlatma testine kadar, lüks mekanlar için %100 pürüzsüz boya uygulamaları.'}
        </p>
        <button className="px-14 py-4 border border-[#A0AEC0] text-gray-300 uppercase tracking-widest text-sm hover:border-[#D69E2E] hover:text-[#D69E2E] transition-colors duration-1000">
          VIP Koleksiyon
        </button>
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,158,46,0.05)_0,transparent_60%)]" />
    </section>
  )
}

export function BoyaciLuxAbout({ content }: SectionProps<any>) {
  return (
    <section className="py-40 bg-[#0A0A0A] px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cinematicFade} className="w-full md:w-1/2 aspect-[3/4] bg-[#111111] relative">
          <div className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-luminosity border border-white/10" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop)' }} />
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[#D69E2E]" />
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cinematicFade} className="w-full md:w-1/2 space-y-10">
          <h2 className="text-4xl text-white font-light leading-snug">
            Matın Derinliği, <br/><span className="text-[#D69E2E]">Parlaklığın Zarafeti</span>
          </h2>
          <p className="text-[#A0AEC0] font-light leading-loose text-lg">
            Sadece boya sürmüyoruz, duvara ışığın nasıl vuracağını hesaplıyoruz. Jotun Majestic serisi ve ithal ipek mat yüzeylerle yüksek bütçeli projelerde mimarların ilk tercih edilen ekiplerinden biriyiz.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export function BoyaciLuxServices({ content }: SectionProps<any>) {
  return (
    <section className="py-40 bg-[#111111] px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
        {['VIP Proje Yönetimi', 'Spot / Gizli Işık Testi', 'İthal Seri Boyalar'].map((item, i) => (
          <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.3 }} variants={cinematicFade} className="border border-white/10 p-12 hover:border-[#D69E2E]/50 transition-colors duration-1000 group">
            <div className="text-[#D69E2E] text-sm tracking-widest mb-10">0{i+1}</div>
            <h3 className="text-2xl text-white font-light group-hover:text-[#D69E2E] transition-colors duration-1000">{item}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function BoyaciLuxGallery(props: SectionProps<any>) { return <BoyaciLuxAbout {...props} /> }
export function BoyaciLuxTeam(props: SectionProps<any>) { return <BoyaciLuxServices {...props} /> }
export function BoyaciLuxFaq(props: SectionProps<any>) { return <BoyaciLuxAbout {...props} /> }
export function BoyaciLuxBlogPreview(props: SectionProps<any>) { return <BoyaciLuxHero {...props} /> }
export function BoyaciLuxTestimonials(props: SectionProps<any>) { return <BoyaciLuxServices {...props} /> }

export function BoyaciLuxContact({ content }: SectionProps<any>) {
  return (
    <section className="py-40 bg-[#0A0A0A] px-6 text-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cinematicFade} className="max-w-3xl mx-auto space-y-12">
        <h2 className="text-4xl md:text-5xl text-white font-light">Özel Projeniz İçin Görüşelim</h2>
        <button className="px-16 py-5 bg-[#D69E2E] text-black font-semibold uppercase tracking-widest text-sm hover:bg-white transition-colors duration-700">
          Randevu Al
        </button>
      </motion.div>
    </section>
  )
}

registerSection('hero', 'boyaci_lux_hero', BoyaciLuxHero as unknown as ComponentType<SectionProps<any>>)
registerSection('about', 'boyaci_lux_about', BoyaciLuxAbout as unknown as ComponentType<SectionProps<any>>)
registerSection('services', 'boyaci_lux_services', BoyaciLuxServices as unknown as ComponentType<SectionProps<any>>)
registerSection('gallery', 'boyaci_lux_gallery', BoyaciLuxGallery as unknown as ComponentType<SectionProps<any>>)
registerSection('team', 'boyaci_lux_team', BoyaciLuxTeam as unknown as ComponentType<SectionProps<any>>)
registerSection('faq', 'boyaci_lux_faq', BoyaciLuxFaq as unknown as ComponentType<SectionProps<any>>)
registerSection('blog_preview', 'boyaci_lux_blog_preview', BoyaciLuxBlogPreview as unknown as ComponentType<SectionProps<any>>)
registerSection('testimonials', 'boyaci_lux_testimonials', BoyaciLuxTestimonials as unknown as ComponentType<SectionProps<any>>)
registerSection('contact', 'boyaci_lux_contact', BoyaciLuxContact as unknown as ComponentType<SectionProps<any>>)
