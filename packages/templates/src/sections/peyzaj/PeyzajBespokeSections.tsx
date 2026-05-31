'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Shovel, Scissors, Droplets, MapPin, ArrowRight } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Peyzaj Architectural Hero ──
export function PeyzajBespokeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[90vh] bg-[#F4F6F0] text-[#1E2B19] flex items-center pt-24 overflow-hidden">
      
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30" 
           style={{ backgroundImage: 'linear-gradient(#A3B19B 1px, transparent 1px), linear-gradient(90deg, #A3B19B 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative z-10 w-full max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="max-w-xl">
             <motion.div 
               initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
               className="inline-flex items-center gap-3 mb-8"
             >
               <div className="w-12 h-[2px] bg-[#5C8044]" />
               <span className="text-[#5C8044] font-bold uppercase tracking-[0.2em] text-xs">
                 {content?.badge || 'MİMARİ PEYZAJ TASARIMI'}
               </span>
             </motion.div>

             <motion.h1 
               initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
               className="text-5xl md:text-7xl font-light leading-[1.05] mb-6 text-[#1E2B19]"
               style={{ fontFamily: 'var(--font-heading)' }}
             >
               {content?.title?.split('\n').map((line: string, i: number) => <div key={i}>{line}</div>) || (
                 <>
                   Doğayı <br/><span className="font-bold text-[#42612E]">Yeniden</span> Şekillendiriyoruz.
                 </>
               )}
             </motion.h1>

             <motion.p 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
               className="text-lg md:text-xl text-[#5C8044] font-light leading-relaxed mb-10"
             >
               {content?.description || (business?.description as string) || 'Bahçenizi sanata dönüştürüyoruz. 3D tasarım, uygulama ve periyodik bakım hizmetlerimizle doğayla iç içe yaşayın.'}
             </motion.p>
             
             <motion.div 
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
               className="flex flex-wrap gap-4"
             >
               <button className="bg-[#1E2B19] text-[#F4F6F0] px-8 py-4 font-medium tracking-widest text-sm uppercase hover:bg-[#42612E] transition-colors flex items-center gap-3">
                 Projeleri İncele <ArrowRight className="w-4 h-4" />
               </button>
             </motion.div>
          </div>
          
          <div className="relative">
             <motion.div 
               initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, ease: "easeOut" as any }}
               className="relative z-10"
             >
               {/* Minimalist Image Frame */}
               <div className="relative aspect-[4/5] bg-white p-4 shadow-2xl">
                 <img 
                   src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1558904541-efa843a96f0f?q=80&w=2864&auto=format&fit=crop'} 
                   alt="Landscape Design" 
                   className="w-full h-full object-cover"
                 />
                 
                 {/* Floating Blueprint Box */}
                 <div className="absolute -left-12 bottom-12 bg-[#42612E] text-white p-6 shadow-xl hidden md:block">
                   <div className="font-mono text-sm tracking-widest mb-2 opacity-70">PROJE: VİLLA BAHÇE</div>
                   <div className="text-2xl font-light">Tamamlanan<br/>Alan: <span className="font-bold">450m²</span></div>
                 </div>
               </div>
             </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
registerSection('hero', 'peyzaj_bespoke_hero', PeyzajBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Peyzaj Services (Minimal Grid) ──
export function PeyzajBespokeServices({ business, content }: SectionProps<any>) {
  const services = business?.services?.length ? business.services : [
    { title: '3D Projelendirme', desc: 'Uygulama öncesi bahçenizin bitmiş halini sanal ortamda gerçeğe en yakın şekilde modelleyerek sunuyoruz.', icon: <MapPin /> },
    { title: 'Sert Zemin Uygulamaları', desc: 'Yürüyüş yolları, istinat duvarları, süs havuzları ve ateş çukurları inşası.', icon: <Shovel /> },
    { title: 'Bitkilendirme & Çim', desc: 'İklime uygun bitki seçimi, rulo çim serimi ve otomatik sulama sistemleri.', icon: <Droplets /> },
    { title: 'Periyodik Bakım', desc: 'Budama, gübreleme, ilaçlama ve çim biçme hizmetleriyle bahçeniz hep taze.', icon: <Scissors /> },
  ];

  return (
    <section className="py-24 md:py-32 bg-white text-[#1E2B19]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || 'Hizmetlerimiz'}
          </h2>
          <div className="w-16 h-1 bg-[#42612E] mx-auto mb-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {services.map((service: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group"
            >
              <div className="w-16 h-16 bg-[#F4F6F0] flex items-center justify-center text-[#42612E] mb-6 group-hover:bg-[#42612E] group-hover:text-white transition-colors duration-300">
                {React.cloneElement(service.icon, { className: 'w-8 h-8 font-light' })}
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-[#5C8044] font-light leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'peyzaj_bespoke_services', PeyzajBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Peyzaj About (Nature x Architecture) ──
export function PeyzajBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#1E2B19] py-24 md:py-32 text-[#F4F6F0] overflow-hidden">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative">
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1558904541-efa843a96f0f?q=80&w=2864&auto=format&fit=crop" 
                alt="Garden Detail" 
                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700" 
              />
            </div>
            {/* Green accent square */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#42612E] z-[-1]" />
          </div>
          
          <div className="order-1 lg:order-2 lg:pl-10">
            <h2 className="text-4xl md:text-5xl font-light mb-8 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Yaşam Alanınıza Nefes Aldırıyoruz.'}
            </h2>
            <div className="space-y-6 text-[#A3B19B] font-light leading-relaxed text-lg mb-10">
              <p>
                {(business?.description as string) || 'Sadece bitki ekmiyor, bir ekosistem tasarlıyoruz. Işık yönü, toprak yapısı ve su kaynaklarını analiz ederek, dört mevsim yaşayan sürdürülebilir peyzaj projeleri üretiyoruz.'}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 border-t border-[#42612E] pt-10">
               <div>
                 <div className="text-4xl font-light text-white mb-2 font-serif">15+</div>
                 <div className="text-xs uppercase tracking-[0.2em] text-[#A3B19B]">Yıllık Tecrübe</div>
               </div>
               <div>
                 <div className="text-4xl font-light text-white mb-2 font-serif">200+</div>
                 <div className="text-xs uppercase tracking-[0.2em] text-[#A3B19B]">Tamamlanan Proje</div>
               </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'peyzaj_bespoke_about', PeyzajBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Peyzaj Contact & Free Discovery ──
export function PeyzajBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#F4F6F0] text-[#1E2B19] py-24 md:py-32">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="bg-white shadow-xl flex flex-col lg:flex-row">
          
          <div className="lg:w-2/5 bg-[#42612E] text-white p-12 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-light mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Ücretsiz Keşif</h2>
              <p className="text-[#A3B19B] font-light mb-12">Bahçenizin ölçülerini almak ve size özel fikirler sunmak için uzman ekibimiz ücretsiz keşfe gelsin.</p>
              
              <div className="space-y-8">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#A3B19B] mb-1">Müşteri Hattı</div>
                  <div className="text-2xl font-light">{business?.phone || '+90 232 555 44 33'}</div>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#A3B19B] mb-1">E-Posta</div>
                  <div className="font-light">info@peyzajmimarlik.com</div>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#A3B19B] mb-1">Ofis Adresi</div>
                  <div className="font-light">{business?.address || 'Botanik Cd. No:45\nBornova, İzmir'}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-3/5 p-12">
            <form className="space-y-8">
               <h3 className="text-2xl font-bold mb-8">Talep Formu</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div>
                   <label className="block text-xs font-bold uppercase tracking-widest text-[#5C8044] mb-2">Ad Soyad</label>
                   <input type="text" className="w-full bg-[#F4F6F0] border-none p-4 text-[#1E2B19] focus:outline-none focus:ring-2 focus:ring-[#42612E]" />
                 </div>
                 <div>
                   <label className="block text-xs font-bold uppercase tracking-widest text-[#5C8044] mb-2">Telefon</label>
                   <input type="tel" className="w-full bg-[#F4F6F0] border-none p-4 text-[#1E2B19] focus:outline-none focus:ring-2 focus:ring-[#42612E]" />
                 </div>
               </div>
               <div>
                 <label className="block text-xs font-bold uppercase tracking-widest text-[#5C8044] mb-2">Mülk Tipi</label>
                 <select className="w-full bg-[#F4F6F0] border-none p-4 text-[#1E2B19] focus:outline-none focus:ring-2 focus:ring-[#42612E] appearance-none">
                   <option value="villa">Müstakil / Villa Bahçesi</option>
                   <option value="site">Site / Toplu Konut Peyzajı</option>
                   <option value="fabrika">Fabrika / Kurumsal Alan</option>
                 </select>
               </div>
               <div>
                 <label className="block text-xs font-bold uppercase tracking-widest text-[#5C8044] mb-2">Adresiniz</label>
                 <textarea rows={3} className="w-full bg-[#F4F6F0] border-none p-4 text-[#1E2B19] focus:outline-none focus:ring-2 focus:ring-[#42612E] resize-none" />
               </div>
               <button className="bg-[#1E2B19] text-white font-medium tracking-widest text-sm uppercase px-10 py-5 w-full hover:bg-[#42612E] transition-colors mt-4">
                 Keşif Talebi Gönder
               </button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'peyzaj_bespoke_contact', PeyzajBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
