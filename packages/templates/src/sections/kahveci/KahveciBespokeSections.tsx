'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Coffee, MapPin, Clock, ArrowRight, Star, Leaf } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Kahveci Cozy Hero ──
export function KahveciBespokeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[95vh] bg-[#FDFBF7] text-[#2C1810] flex items-center pt-24 overflow-hidden">
      {/* Decorative organic shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F5E6D3] rounded-l-[100px] opacity-40 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4B595] rounded-full opacity-20 blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 w-full max-w-[var(--container-default)] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16">
        
        <div className="lg:w-1/2 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-px bg-[#8B5A2B]" />
            <span className="text-[#8B5A2B] font-medium tracking-[0.2em] text-sm uppercase">
              {content?.badge || '3. Nesil Nitelikli Kahve'}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.05] mb-6 text-[#2C1810]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {content?.title || business?.name || 'Taze.\nKavrulmuş.\nMükemmel.'}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-[#5C4033] font-light leading-relaxed mb-10 max-w-lg"
          >
            {content?.description || (business?.description as string) || 'Dünyanın en iyi çiftliklerinden özenle seçilen çekirdekleri, ustalıkla kavuruyor ve sizin için demliyoruz.'}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-6"
          >
            <button className="bg-[#2C1810] text-[#FDFBF7] px-8 py-4 rounded-none font-medium tracking-wide hover:bg-[#4A2E1B] transition-colors flex items-center gap-3">
              Menüyü İncele <ArrowRight className="w-4 h-4" />
            </button>
            <button className="bg-transparent text-[#2C1810] px-8 py-4 rounded-none font-medium tracking-wide border border-[#2C1810] hover:bg-[#F5E6D3] transition-colors">
              Sipariş Ver
            </button>
          </motion.div>
        </div>

        <div className="lg:w-1/2 relative w-full h-[600px] hidden md:block">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute top-0 right-0 w-4/5 h-[90%] rounded-t-full rounded-b-3xl overflow-hidden shadow-2xl border-4 border-white"
          >
            <img 
              src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2836&auto=format&fit=crop'} 
              alt="Artisan Coffee" 
              className="w-full h-full object-cover" 
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-10 left-0 w-1/2 aspect-square rounded-full overflow-hidden shadow-xl border-4 border-[#FDFBF7]"
          >
            <img 
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2787&auto=format&fit=crop" 
              alt="Coffee Beans" 
              className="w-full h-full object-cover" 
            />
          </motion.div>
        </div>

      </div>
    </section>
  )
}
registerSection('hero', 'kahveci_bespoke_hero', KahveciBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Kahveci Menu Highlights ──
export function KahveciBespokeServices({ business, content }: SectionProps<any>) {
  const products = business?.services?.length ? business.services : [
    { title: 'Espresso Bazlılar', desc: 'Single origin çekirdeklerimizle hazırlanan Flat White, Cortado ve Latte.', price: '85₺ - 120₺' },
    { title: 'Filtre & Demleme', desc: 'V60, Chemex ve Aeropress ile demlediğimiz Etiyopya ve Kolombiya seçkisi.', price: '90₺ - 140₺' },
    { title: 'Artisan Fırın', desc: 'Ekşi mayalı sandviçler, günlük taze kruvasanlar ve glutensiz tatlılar.', price: '150₺ - 220₺' },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#2C1810] text-[#FDFBF7]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Özel Seçkilerimiz'}
            </h2>
            <p className="text-[#D4B595] text-lg font-light">Mevsiminde hasat edilmiş çekirdekler ve günlük artisan lezzetler.</p>
          </div>
          <button className="text-[#FDFBF7] border-b border-[#D4B595] pb-1 hover:text-[#D4B595] transition-colors font-medium tracking-widest uppercase text-sm">
            Tüm Menüyü Gör
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {products.map((prod: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="border-t border-[#4A2E1B] pt-8 group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-medium text-[#FDFBF7] font-serif">{prod.title}</h3>
              </div>
              <p className="text-[#A89078] font-light leading-relaxed mb-6">{prod.desc}</p>
              <div className="text-[#D4B595] font-medium font-serif italic">{prod.price}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'kahveci_bespoke_services', KahveciBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Kahveci Atmosphere (About) ──
export function KahveciBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#F5E6D3] py-24 md:py-32 text-[#2C1810]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="order-2 lg:order-1 relative h-[700px]">
            <img 
              src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=2942&auto=format&fit=crop" 
              className="w-full h-full object-cover rounded-t-[150px] rounded-b-md shadow-2xl" 
              alt="Coffee Atmosphere" 
            />
            {/* Stamp Badge */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#2C1810] text-[#FDFBF7] rounded-full flex flex-col items-center justify-center p-6 text-center shadow-xl hidden md:flex animate-spin-slow">
              <Leaf className="w-8 h-8 text-[#D4B595] mb-2" />
              <div className="text-[10px] uppercase tracking-widest font-medium">%100 ORGANİK</div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-8 leading-[1.1]" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Sadece bir kahve dükkanı değil, bir kaçış noktası.'}
            </h2>
            <div className="space-y-6 text-[#5C4033] font-light leading-relaxed text-lg mb-10">
              <p>
                {(business?.description as string) || 'Şehrin gürültüsünden uzaklaşıp, taze kavrulmuş kahve kokusu eşliğinde kitabınızı okuyabileceğiniz, çalışabileceğiniz veya dostlarınızla uzun sohbetler edebileceğiniz bir alan yarattık.'}
              </p>
              <p>
                Her yudumda sürdürülebilir tarımı destekliyor, adil ticaret kurallarına uygun kahve çekirdekleri kullanıyoruz.
              </p>
            </div>
            
            <div className="flex gap-12 mt-12 pt-12 border-t border-[#D4B595]">
              <div>
                <div className="text-4xl font-light text-[#2C1810] mb-2 font-serif">15+</div>
                <div className="text-xs text-[#8B5A2B] uppercase tracking-widest font-medium">Single Origin Çeşit</div>
              </div>
              <div>
                <div className="text-4xl font-light text-[#2C1810] mb-2 font-serif">2</div>
                <div className="text-xs text-[#8B5A2B] uppercase tracking-widest font-medium">Uzman Barista</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'kahveci_bespoke_about', KahveciBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Kahveci Contact & Location ──
export function KahveciBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#FDFBF7] text-[#2C1810] py-24 md:py-32">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12 text-center">
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-8" style={{ fontFamily: 'var(--font-heading)' }}>Bize Katılın</h2>
        <p className="text-[#8B5A2B] font-light mb-16 text-lg max-w-xl mx-auto">Taze demlenmiş bir kahve ve sıcacık bir kruvasan için sizi bekliyoruz.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-8 border border-[#E5D5C5] bg-white rounded-t-full rounded-b-md">
            <MapPin className="w-8 h-8 text-[#D4B595] mb-6" />
            <h4 className="font-medium text-[#2C1810] uppercase tracking-widest text-sm mb-4">Adres</h4>
            <p className="text-[#5C4033] font-light leading-relaxed">{business?.address || 'Moda Caddesi No:42\nKadıköy, İstanbul'}</p>
          </div>

          <div className="flex flex-col items-center p-8 border border-[#E5D5C5] bg-[#2C1810] text-[#FDFBF7] rounded-t-full rounded-b-md transform md:-translate-y-8 shadow-2xl">
            <Clock className="w-8 h-8 text-[#D4B595] mb-6" />
            <h4 className="font-medium text-[#FDFBF7] uppercase tracking-widest text-sm mb-4">Çalışma Saatleri</h4>
            <p className="text-[#D4B595] font-light leading-relaxed text-center">
              Hafta İçi: 07:30 - 22:00<br/>
              Hafta Sonu: 08:30 - 23:00
            </p>
            <div className="mt-6 pt-6 border-t border-[#4A2E1B] w-full text-center">
              <span className="text-[#FDFBF7] font-medium text-sm">Şu an:</span> <span className="text-[#10B981] font-medium">Açık</span>
            </div>
          </div>

          <div className="flex flex-col items-center p-8 border border-[#E5D5C5] bg-white rounded-t-full rounded-b-md">
            <Coffee className="w-8 h-8 text-[#D4B595] mb-6" />
            <h4 className="font-medium text-[#2C1810] uppercase tracking-widest text-sm mb-4">İletişim</h4>
            <p className="text-[#5C4033] font-light leading-relaxed">{business?.phone || '+90 533 444 55 66'}</p>
            <p className="text-[#8B5A2B] font-light mt-2">hello@kahvecibespoke.com</p>
          </div>
        </div>

      </div>
    </section>
  )
}
registerSection('contact', 'kahveci_bespoke_contact', KahveciBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
