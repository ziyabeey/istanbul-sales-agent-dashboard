'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Armchair, Bed, Sofa, ChevronRight, Award, Truck } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Mobilyaci Elegant Hero ──
export function MobilyaciBespokeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-screen bg-[#F5F5F0] text-[#2C2C2C] flex items-center pt-24 px-6 md:px-12 overflow-hidden">
      
      <div className="absolute top-0 right-0 w-2/3 h-full hidden lg:block">
        <motion.div 
          initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full bg-[#E8E8E0] relative overflow-hidden"
        >
          <img 
            src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2958&auto=format&fit=crop'} 
            alt="Luxury Interior" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90"
          />
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-[var(--container-default)] mx-auto flex">
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
            className="mb-8"
          >
            <span className="text-[#8B8B81] font-medium tracking-[0.3em] text-xs uppercase border-b border-[#D1D1C7] pb-2">
              {content?.badge || 'YENİ KOLEKSİYON 2026'}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl font-light leading-[1.1] mb-8 text-[#1A1A1A]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {content?.title || business?.name || 'Yaşam\nAlanlarınıza\nZarafet Katın.'}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-[#5C5C5C] font-light leading-relaxed mb-12 max-w-md"
          >
            {content?.description || (business?.description as string) || 'Zamansız tasarımlar, usta işçilik ve premium kumaşlarla evinizi baştan yaratın.'}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap gap-6"
          >
            <button className="bg-[#1A1A1A] text-white px-10 py-5 font-medium tracking-widest text-sm uppercase hover:bg-[#333333] transition-colors flex items-center gap-4 group">
              Koleksiyonu İncele 
              <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 flex gap-12"
          >
            <div>
              <div className="font-serif text-3xl text-[#1A1A1A] mb-1">10+</div>
              <div className="text-xs text-[#8B8B81] tracking-widest uppercase">Yıl Garanti</div>
            </div>
            <div>
              <div className="font-serif text-3xl text-[#1A1A1A] mb-1">Özel</div>
              <div className="text-xs text-[#8B8B81] tracking-widest uppercase">Üretim İmkanı</div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
registerSection('hero', 'mobilyaci_bespoke_hero', MobilyaciBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Mobilyaci Categories (Gallery Style) ──
export function MobilyaciBespokeServices({ business, content }: SectionProps<any>) {
  const categories = business?.services?.length ? business.services : [
    { title: 'Oturma Grupları', desc: 'Ergonomi ve estetiğin buluştuğu koltuk takımları ve köşe takımları.', img: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=2940&auto=format&fit=crop' },
    { title: 'Yatak Odaları', desc: 'Huzurlu bir uyku için tasarlanmış doğal ahşap yatak odası takımları.', img: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=3111&auto=format&fit=crop' },
    { title: 'Yemek Odaları', desc: 'Misafirlerinizi şıklıkla ağırlayacağınız geniş masalar ve zarif sandalyeler.', img: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?q=80&w=2952&auto=format&fit=crop' },
  ];

  return (
    <section className="py-32 bg-white text-[#1A1A1A]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Kategoriler'}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {categories.map((cat: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden aspect-[3/4] mb-8 bg-[#F5F5F0]">
                <img 
                  src={cat.img} 
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
              <h3 className="text-2xl font-light mb-3 text-[#1A1A1A]">{cat.title}</h3>
              <p className="text-[#8B8B81] font-light leading-relaxed mb-4">{cat.desc}</p>
              <div className="w-8 h-px bg-[#D1D1C7] group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'mobilyaci_bespoke_services', MobilyaciBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Mobilyaci Craftsmanship (About) ──
export function MobilyaciBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#E8E8E0] py-32 text-[#2C2C2C]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="text-sm tracking-[0.3em] uppercase text-[#8B8B81] mb-8 font-medium">Ustalık & Kalite</div>
            <h2 className="text-4xl md:text-5xl font-light mb-10 leading-[1.2]" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Detaylarda Gizli Olan Mükemmellik.'}
            </h2>
            <div className="space-y-6 text-[#5C5C5C] font-light leading-relaxed text-lg mb-12">
              <p>
                {(business?.description as string) || 'Her bir mobilyamız, yıllarını ahşaba ve kumaşa adamış ustalarımızın elinden çıkar. İskeletinde kullanılan fırınlanmış gürgen ağacından, leke tutmayan nano teknoloji kumaşlara kadar hiçbir detayda taviz vermiyoruz.'}
              </p>
            </div>
            
            <div className="flex gap-12">
              <div className="flex items-start gap-4">
                <Award className="w-6 h-6 text-[#1A1A1A] mt-1" />
                <div>
                  <div className="font-medium text-[#1A1A1A] mb-1">Premium Malzeme</div>
                  <div className="text-sm text-[#8B8B81]">1. Sınıf İşçilik</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Truck className="w-6 h-6 text-[#1A1A1A] mt-1" />
                <div>
                  <div className="font-medium text-[#1A1A1A] mb-1">Güvenli Teslimat</div>
                  <div className="text-sm text-[#8B8B81]">Türkiye Geneli Kurulum</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7 order-1 lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1595514535215-ee53150531ce?q=80&w=2940&auto=format&fit=crop" 
              className="w-full aspect-[4/3] object-cover shadow-2xl grayscale-[20%]" 
              alt="Craftsmanship" 
            />
          </div>
          
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'mobilyaci_bespoke_about', MobilyaciBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Mobilyaci Contact & Showroom ──
export function MobilyaciBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-white text-[#1A1A1A] py-32 border-t border-[#F5F5F0]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Showroom'umuza Davetlisiniz</h2>
          <p className="text-[#8B8B81] font-light text-lg">Kumaş dokularını hissetmek ve kahve eşliğinde modellerimizi incelemek için mağazamıza bekliyoruz.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          <div className="lg:col-span-4 flex flex-col justify-center space-y-12">
            <div>
              <h4 className="font-medium tracking-[0.2em] uppercase text-xs text-[#8B8B81] mb-3">Mağaza Adresi</h4>
              <p className="text-[#1A1A1A] font-light leading-relaxed text-lg">{business?.address || 'Mobilyacılar Sitesi 1. Cadde No:15\nİnegöl, Bursa'}</p>
            </div>
            <div>
              <h4 className="font-medium tracking-[0.2em] uppercase text-xs text-[#8B8B81] mb-3">İletişim</h4>
              <p className="text-[#1A1A1A] font-light text-xl mb-1">{business?.phone || '+90 224 555 44 33'}</p>
              <p className="text-[#5C5C5C] font-light">info@mobilyabespoke.com</p>
            </div>
          </div>
          
          <div className="lg:col-span-8">
            <form className="bg-[#F5F5F0] p-12 md:p-16">
              <h3 className="text-2xl font-light mb-10 text-[#1A1A1A]">Mimari Destek & Teklif Formu</h3>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <input type="text" placeholder="Ad Soyad" className="w-full bg-transparent border-b border-[#D1D1C7] py-4 focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A] font-light transition-colors placeholder:text-[#8B8B81]" />
                  </div>
                  <div>
                    <input type="tel" placeholder="Telefon" className="w-full bg-transparent border-b border-[#D1D1C7] py-4 focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A] font-light transition-colors placeholder:text-[#8B8B81]" />
                  </div>
                </div>
                <div>
                  <textarea rows={3} placeholder="İlgilendiğiniz Ürünler veya Özel Ölçü Talebiniz" className="w-full bg-transparent border-b border-[#D1D1C7] py-4 focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A] font-light transition-colors resize-none placeholder:text-[#8B8B81]" />
                </div>
                <button className="bg-[#1A1A1A] text-white font-medium tracking-widest text-sm uppercase px-10 py-5 hover:bg-[#333333] transition-colors mt-4">
                  Gönder
                </button>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'mobilyaci_bespoke_contact', MobilyaciBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
