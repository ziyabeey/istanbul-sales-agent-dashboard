'use client'

import React from 'react'
import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { registerSection } from '../../registry/section-registry'
import type { SectionProps } from '../../types/section-types'

// Aesthetic: Bold, structural, concrete grays #4A5568 with vibrant sky blue #3182CE accents.
// Mechanics: Heavy solid blocks sliding into place.

const blockSlide: any = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 50, damping: 15 } }
}

export function BoyaciDisHero({ content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-[#E2E8F0] overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-2/3 max-w-4xl">
        <div className="absolute inset-0 bg-[#3182CE]/20 mix-blend-multiply z-10" />
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541888087796-0158866170d1?q=80&w=2670&auto=format&fit=crop)' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        <motion.div initial="hidden" animate="visible" variants={blockSlide} className="bg-white p-12 md:p-16 max-w-2xl shadow-2xl border-l-[16px] border-[#3182CE]">
          <h1 className="text-5xl md:text-7xl font-black text-[#2D3748] uppercase tracking-tight leading-none mb-6">
            {content?.title || 'Dış Cehpe Boya Ustası'}
          </h1>
          <p className="text-xl text-[#4A5568] font-medium mb-10 leading-relaxed">
            {content?.description || 'Binalarınızı zorlu hava koşullarına karşı koruyor, değerine değer katıyoruz.'}
          </p>
          <button className="px-8 py-5 bg-[#2D3748] text-white font-bold uppercase tracking-widest hover:bg-[#3182CE] transition-colors">
            Projeleri Gör
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export function BoyaciDisAbout({ content }: SectionProps<any>) {
  return (
    <section className="py-24 bg-[#1A202C] text-white px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6">
          <div className="text-[#3182CE] font-bold tracking-widest uppercase">Güvenlik & Kalite</div>
          <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight">Yüksekte Çalışma Uzmanlığı</h2>
          <p className="text-[#A0AEC0] text-lg leading-relaxed">
            Dış cephe boya ve mantolama projelerinde, profesyonel iskele kurulumu ve vinç sistemleri ile güvenlikten asla ödün vermiyoruz. Kullandığımız suya, neme ve güneşe dayanıklı akrilik boyalarla binanızın ömrünü uzatıyoruz.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-[#2D3748] p-8 aspect-square flex flex-col justify-center text-center border-b-4 border-[#3182CE]">
            <div className="text-4xl font-black text-white mb-2">10+</div>
            <div className="text-sm text-[#A0AEC0] uppercase font-bold">Yıl Garanti</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-[#3182CE] p-8 aspect-square flex flex-col justify-center text-center mt-12">
            <div className="text-4xl font-black text-white mb-2">%100</div>
            <div className="text-sm text-blue-100 uppercase font-bold">İzolasyon</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function BoyaciDisServices({ content }: SectionProps<any>) {
  return (
    <section className="py-32 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-black text-[#2D3748] uppercase tracking-tight text-center mb-20">Uygulamalarımız</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { tag: '01', title: 'Mantolama & İzolasyon' },
            { tag: '02', title: 'Silikonlu Dış Cephe Boyası' },
            { tag: '03', title: 'Grenli (Tekstürlü) Kaplama' }
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-[#EDF2F7] p-10 hover:bg-[#2D3748] hover:text-white transition-colors group">
              <div className="text-5xl font-black text-[#E2E8F0] group-hover:text-[#4A5568] transition-colors mb-6">{item.tag}</div>
              <h3 className="text-2xl font-bold uppercase tracking-wide">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function BoyaciDisGallery(props: SectionProps<any>) { return <BoyaciDisAbout {...props} /> }
export function BoyaciDisTeam(props: SectionProps<any>) { return <BoyaciDisServices {...props} /> }
export function BoyaciDisFaq(props: SectionProps<any>) { return <BoyaciDisAbout {...props} /> }
export function BoyaciDisBlogPreview(props: SectionProps<any>) { return <BoyaciDisHero {...props} /> }
export function BoyaciDisTestimonials(props: SectionProps<any>) { return <BoyaciDisServices {...props} /> }

export function BoyaciDisContact({ content }: SectionProps<any>) {
  return (
    <section className="py-24 bg-[#3182CE] px-6 text-center text-white">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-5xl font-black uppercase tracking-tight">Ücretsiz Keşif Ekibimiz Gelsin</h2>
        <p className="text-xl text-blue-100 font-medium">Binanızın dış cephe ölçümleri ve kullanılacak malzeme miktarı için yerinde tespit yapalım.</p>
        <button className="mt-8 px-10 py-5 bg-white text-[#3182CE] font-black uppercase hover:bg-[#2D3748] hover:text-white transition-colors shadow-2xl">
          Randevu Oluştur
        </button>
      </motion.div>
    </section>
  )
}

registerSection('hero', 'boyaci_dis_hero', BoyaciDisHero as unknown as ComponentType<SectionProps<any>>)
registerSection('about', 'boyaci_dis_about', BoyaciDisAbout as unknown as ComponentType<SectionProps<any>>)
registerSection('services', 'boyaci_dis_services', BoyaciDisServices as unknown as ComponentType<SectionProps<any>>)
registerSection('gallery', 'boyaci_dis_gallery', BoyaciDisGallery as unknown as ComponentType<SectionProps<any>>)
registerSection('team', 'boyaci_dis_team', BoyaciDisTeam as unknown as ComponentType<SectionProps<any>>)
registerSection('faq', 'boyaci_dis_faq', BoyaciDisFaq as unknown as ComponentType<SectionProps<any>>)
registerSection('blog_preview', 'boyaci_dis_blog_preview', BoyaciDisBlogPreview as unknown as ComponentType<SectionProps<any>>)
registerSection('testimonials', 'boyaci_dis_testimonials', BoyaciDisTestimonials as unknown as ComponentType<SectionProps<any>>)
registerSection('contact', 'boyaci_dis_contact', BoyaciDisContact as unknown as ComponentType<SectionProps<any>>)
