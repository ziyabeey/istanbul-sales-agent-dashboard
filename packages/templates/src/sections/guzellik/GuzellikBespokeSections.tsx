'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Heart, Droplet, ArrowRight, Star } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Guzellik Soft Hero ──
export function GuzellikBespokeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[95vh] bg-[#FFF5F7] text-[#2D3748] flex items-center pt-24 overflow-hidden rounded-b-[4rem] md:rounded-b-[8rem]">
      <div className="absolute top-0 right-0 w-3/4 h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFF5F7] via-[#FFF5F7]/80 to-transparent z-10" />
        <img 
          src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1560944527-a4a429848866?q=80&w=2874&auto=format&fit=crop'} 
          alt="Güzellik Merkezi" 
          className="w-full h-full object-cover object-right opacity-90" 
        />
      </div>

      <div className="relative z-20 w-full max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-pink-100 mb-8"
          >
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span className="text-pink-600 font-medium uppercase tracking-widest text-xs">
              {content?.badge || 'KENDİNİZİ ŞIMARTIN'}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl font-normal leading-[1.1] mb-8 text-[#1A202C]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {content?.title || business?.name || 'Doğal Işıltınızı\nKeşfedin.'}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
            className="text-lg text-[#4A5568] font-light leading-relaxed mb-10 max-w-xl"
          >
            {content?.description || (business?.description as string) || 'Uzman kadromuz ve FDA onaylı ileri teknoloji cihazlarımızla, cildinizin ihtiyacı olan profesyonel bakımı sunuyoruz.'}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <button className="bg-[#1A202C] text-white px-8 py-4 rounded-full font-medium tracking-wide hover:bg-pink-600 transition-colors shadow-xl shadow-pink-200">
              Hemen Randevu Al
            </button>
            <button className="bg-white text-[#1A202C] px-8 py-4 rounded-full font-medium tracking-wide border border-pink-100 hover:bg-pink-50 transition-colors flex items-center gap-2">
              Hizmetlerimiz <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
registerSection('hero', 'guzellik_bespoke_hero', GuzellikBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Guzellik Elegant Services ──
export function GuzellikBespokeServices({ business, content }: SectionProps<any>) {
  const services = business?.services?.length ? business.services : [
    { title: 'Medikal Cilt Bakımı', desc: 'Cildinizin ihtiyacına özel derinlemesine temizlik ve nemlendirme.', img: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2940&auto=format&fit=crop' },
    { title: 'Lazer Epilasyon', desc: 'Buz lazer teknolojisi ile acısız ve kalıcı pürüzsüzlük.', img: 'https://images.unsplash.com/photo-1531299244837-37c2fb24f7e1?q=80&w=2874&auto=format&fit=crop' },
    { title: 'Bölgesel İncelme', desc: 'Ameliyatsız, konforlu ve hızlı etkili vücut şekillendirme.', img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2940&auto=format&fit=crop' },
  ];

  return (
    <section className="py-24 md:py-32 bg-white text-[#2D3748]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <Heart className="w-8 h-8 text-pink-300 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-normal mb-6 text-[#1A202C]" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || 'Size Özel Dokunuşlar'}
          </h2>
          <p className="text-[#718096] text-lg font-light">En yeni trendler ve güvenilir medikal estetik yöntemleriyle güzelliğinizi taçlandırıyoruz.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6">
                <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A202C]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0 text-white font-medium flex items-center justify-between">
                  <span>Detayları İncele</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-2xl font-normal mb-3 text-[#1A202C]" style={{ fontFamily: 'var(--font-heading)' }}>{service.title}</h3>
              <p className="text-[#718096] font-light leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'guzellik_bespoke_services', GuzellikBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Guzellik Care & Philosophy ──
export function GuzellikBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="py-24 md:py-32 bg-[#FAEDF0] text-[#2D3748] rounded-[4rem] md:rounded-[8rem] my-10 mx-4 md:mx-10 overflow-hidden relative">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute inset-0 border border-pink-200 rounded-full scale-105 transform -translate-x-4 translate-y-4" />
            <img 
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2940&auto=format&fit=crop" 
              alt="Huzur" 
              className="rounded-t-full rounded-b-[4rem] w-full max-w-md mx-auto object-cover aspect-[3/4] relative z-10 shadow-2xl shadow-pink-900/10"
            />
          </div>
          
          <div className="order-1 lg:order-2">
            <Droplet className="w-10 h-10 text-pink-400 mb-6" />
            <h2 className="text-4xl md:text-5xl font-normal mb-8 leading-tight text-[#1A202C]" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Kendinize Zaman Ayırın, Biz Gerisini Hallederiz.'}
            </h2>
            <div className="space-y-6 text-[#4A5568] font-light leading-relaxed text-lg">
              <p>
                {(business?.description as string) || 'Koşturmaca ile geçen günlerin ardından bedeninizi ve ruhunuzu dinlendireceğiniz huzurlu bir sığınak tasarladık. Hijyen standartlarından ödün vermeden, tamamen size özel bir deneyim sunuyoruz.'}
              </p>
              <p>
                Kullandığımız tüm ürünler dermatolojik olarak test edilmiş, hayvanlar üzerinde denenmemiş (cruelty-free) premium markalardan oluşmaktadır.
              </p>
            </div>
            
            <div className="mt-10 flex gap-6">
              <div className="text-center">
                <div className="text-3xl font-normal text-pink-500 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>%100</div>
                <div className="text-xs uppercase tracking-widest font-medium text-[#718096]">Doğal İçerik</div>
              </div>
              <div className="w-[1px] bg-pink-200" />
              <div className="text-center">
                <div className="text-3xl font-normal text-pink-500 mb-1 flex items-center justify-center gap-1">5.0 <Star className="w-4 h-4 fill-current" /></div>
                <div className="text-xs uppercase tracking-widest font-medium text-[#718096]">Müşteri Puanı</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'guzellik_bespoke_about', GuzellikBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Guzellik Minimal Contact ──
export function GuzellikBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-white text-[#2D3748] py-24 md:py-32">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="bg-[#FFF5F7] rounded-[3rem] p-10 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-full blur-[80px]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-normal mb-6 text-[#1A202C]" style={{ fontFamily: 'var(--font-heading)' }}>Sizi Bekliyoruz</h2>
              <p className="text-[#718096] font-light mb-12">Ücretsiz cilt analizi ve size en uygun işlem planlaması için uzmanlarımızla görüşün.</p>
              
              <div className="space-y-8">
                <div>
                  <h4 className="font-semibold text-[#1A202C] mb-2">Merkezimiz</h4>
                  <p className="text-[#4A5568] font-light">{business?.address || 'Nişantaşı, Valikonağı Cad. No:10\nŞişli, İstanbul'}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A202C] mb-2">İletişim</h4>
                  <p className="text-[#4A5568] font-light">{business?.phone || '+90 532 000 00 00'}<br/>merhaba@guzellikbespoke.com</p>
                </div>
              </div>
            </div>
            
            <form className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-pink-900/5">
              <h3 className="text-2xl font-normal mb-8 text-[#1A202C]" style={{ fontFamily: 'var(--font-heading)' }}>Randevu Formu</h3>
              <div className="space-y-6">
                <div>
                  <input type="text" placeholder="Adınız Soyadınız" className="w-full bg-[#FAFAFA] border-b border-pink-100 px-4 py-3 focus:outline-none focus:border-pink-400 transition-colors font-light placeholder:text-[#A0AEC0]" />
                </div>
                <div>
                  <input type="tel" placeholder="Telefon Numaranız" className="w-full bg-[#FAFAFA] border-b border-pink-100 px-4 py-3 focus:outline-none focus:border-pink-400 transition-colors font-light placeholder:text-[#A0AEC0]" />
                </div>
                <div>
                  <select className="w-full bg-[#FAFAFA] border-b border-pink-100 px-4 py-3 focus:outline-none focus:border-pink-400 transition-colors font-light text-[#A0AEC0] appearance-none">
                    <option value="">İlgilendiğiniz Hizmet</option>
                    <option value="cilt">Cilt Bakımı</option>
                    <option value="epilasyon">Lazer Epilasyon</option>
                    <option value="zayiflama">Bölgesel İncelme</option>
                  </select>
                </div>
                <button className="w-full bg-[#1A202C] text-white font-medium py-4 rounded-xl hover:bg-pink-600 transition-colors mt-4">
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
registerSection('contact', 'guzellik_bespoke_contact', GuzellikBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
