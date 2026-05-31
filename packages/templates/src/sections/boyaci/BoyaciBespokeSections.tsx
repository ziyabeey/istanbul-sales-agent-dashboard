'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { PaintBucket, Brush, CheckCircle, ArrowRight, PaintRoller, Sparkles } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Boyaci Colorful Hero ──
export function BoyaciBespokeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[90vh] bg-[#FAFAFA] text-[#18181B] flex items-center pt-24 overflow-hidden">
      {/* Decorative paint strokes/swatches in background */}
      <div className="absolute top-0 right-0 w-[800px] h-full pointer-events-none opacity-20 hidden lg:block">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-[#F43F5E] fill-current">
          <path d="M0,0 Q50,50 100,0 L100,100 L0,100 Z" opacity="0.3" />
          <path d="M20,0 Q60,60 100,20 L100,100 L20,100 Z" className="text-[#3B82F6] fill-current" opacity="0.4" />
          <path d="M50,0 Q80,80 100,50 L100,100 L50,100 Z" className="text-[#FBBF24] fill-current" opacity="0.5" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <div className="flex -space-x-2 mr-3">
                <div className="w-6 h-6 rounded-full bg-[#EF4444] border-2 border-white" />
                <div className="w-6 h-6 rounded-full bg-[#3B82F6] border-2 border-white" />
                <div className="w-6 h-6 rounded-full bg-[#10B981] border-2 border-white" />
              </div>
              <span className="text-[#52525B] font-bold uppercase tracking-[0.2em] text-xs">
                {content?.badge || 'PROFESYONEL BOYA & BADANA'}
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-black leading-[1.1] mb-6 text-[#18181B]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {content?.title || business?.name || 'Mekânlarınıza\nRenk ve Hayat\nKatıyoruz.'}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
              className="text-xl text-[#71717A] font-medium leading-relaxed mb-10"
            >
              {content?.description || (business?.description as string) || 'Eşyalarınızı titizlikle koruyor, 1. sınıf boyalarla yaşam alanlarınızı sadece 1 günde yepyeni bir görünüme kavuşturuyoruz.'}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <button className="bg-[#18181B] text-white px-8 py-4 rounded-xl font-bold tracking-wide hover:bg-[#3F3F46] transition-colors shadow-xl shadow-zinc-200">
                Ücretsiz Keşif İste
              </button>
              <button className="bg-white text-[#18181B] px-8 py-4 rounded-xl font-bold tracking-wide border-2 border-[#E4E4E7] hover:border-[#18181B] transition-colors flex items-center gap-2">
                Renk Kataloğu <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
          
          <div className="relative">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: -2 }} transition={{ duration: 1.2, type: "spring" }}
               className="relative z-10"
             >
               <img 
                 src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2940&auto=format&fit=crop'} 
                 alt="Profesyonel Boya Badana" 
                 className="rounded-3xl shadow-2xl w-full h-[550px] object-cover"
               />
               
               {/* Before/After Tag Overlay */}
               <div className="absolute top-8 -left-8 bg-white p-4 rounded-2xl shadow-xl hidden md:block">
                 <div className="flex items-center gap-3">
                   <div className="w-12 h-12 bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] rounded-full flex items-center justify-center text-white">
                     <Sparkles className="w-6 h-6" />
                   </div>
                   <div>
                     <div className="text-sm font-bold text-[#71717A] uppercase">Teslimat</div>
                     <div className="font-black text-[#18181B]">1 Günde Temiz İş</div>
                   </div>
                 </div>
               </div>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('hero', 'boyaci_bespoke_hero', BoyaciBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Boyaci Services & Process ──
export function BoyaciBespokeServices({ business, content }: SectionProps<any>) {
  const services = business?.services?.length ? business.services : [
    { title: 'İç Cephe Boya', desc: 'Antibakteriyel, silinebilir ve tam kapatıcı 1. sınıf malzemelerle evinize ferahlık katıyoruz.', icon: <PaintRoller />, color: '#3B82F6' },
    { title: 'Dış Cephe & Yalıtım', desc: 'Bina ömrünü uzatan, hava şartlarına dayanıklı dış cephe kaplama ve mantolama işlemleri.', icon: <PaintBucket />, color: '#F43F5E' },
    { title: 'Dekoratif Boya', desc: 'Sıradan duvarları sanata dönüştüren İtalyan boya, sedef ve dokulu özel uygulamalar.', icon: <Brush />, color: '#8B5CF6' },
  ];

  return (
    <section className="py-24 md:py-32 bg-white text-[#18181B]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || 'Renklerin Gücünü Keşfedin'}
          </h2>
          <p className="text-[#71717A] text-lg font-medium">Boya sadece bir renk değişimi değil, mekanın ruhunu yenilemektir. Usta ellerde kusursuz sonuçlar garanti.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[#FAFAFA] rounded-3xl p-8 border border-[#E4E4E7] hover:shadow-xl transition-shadow group relative overflow-hidden"
            >
              <div 
                className="absolute top-0 left-0 w-full h-2 transition-all duration-300 transform -translate-y-full group-hover:translate-y-0"
                style={{ backgroundColor: service.color }}
              />
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 shadow-md"
                style={{ backgroundColor: service.color }}
              >
                {service.icon || <PaintRoller />}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-[#18181B]">{service.title}</h3>
              <p className="text-[#71717A] font-medium leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'boyaci_bespoke_services', BoyaciBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Boyaci Cleanliness & Trust (About) ──
export function BoyaciBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#18181B] py-24 md:py-32 text-white border-y border-[#27272A]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-[#27272A] text-[#A1A1AA] px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wider mb-6">
              Çalışma Prensibimiz
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Eşyalarınız Bize Emanet. Tek Bir Damla Leke Yok.'}
            </h2>
            <div className="space-y-6 text-[#A1A1AA] font-medium leading-relaxed text-lg mb-10">
              <p>
                {(business?.description as string) || 'En büyük çekincenin "ev kirlenecek mi?" olduğunu biliyoruz. İşe başlamadan önce tüm mobilyalarınızı, zeminleri ve süpürgelikleri özel koruyucu örtü ve bantlarla izole ediyoruz.'}
              </p>
            </div>
            
            <ul className="space-y-4">
              {['Zemin ve Eşya İzolasyonu', 'Çatlak ve Alçı Tamiratı', 'Astar ve 2 Kat Boya Uygulaması', 'Anahtar Teslim Temizlik'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 bg-[#27272A] p-4 rounded-xl font-bold">
                  <CheckCircle className="w-6 h-6 text-[#10B981]" /> {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <img src="https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?q=80&w=2940&auto=format&fit=crop" className="w-full aspect-square object-cover rounded-2xl" alt="Boya Hazırlığı" />
             <img src="https://images.unsplash.com/photo-1595844730298-b960fa254680?q=80&w=2835&auto=format&fit=crop" className="w-full aspect-square object-cover rounded-2xl mt-8" alt="Temiz İşçilik" />
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'boyaci_bespoke_about', BoyaciBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Boyaci Contact & Quote ──
export function BoyaciBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-white text-[#18181B] py-24 md:py-32">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="bg-[#FAFAFA] rounded-[3rem] p-10 md:p-16 border border-[#E4E4E7] relative overflow-hidden">
          
          {/* Decorative Corner Brush */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-gradient-to-br from-[#3B82F6]/20 to-[#F43F5E]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Fiyat Teklifi Alın</h2>
              <p className="text-[#71717A] font-medium mb-10 text-lg">Oda sayısı ve metrekare bilginizi bizimle paylaşın, size en uygun fiyatı ve renk seçeneklerini sunalım.</p>
              
              <div className="space-y-8">
                <div>
                  <h4 className="font-bold text-[#A1A1AA] uppercase tracking-wider text-sm mb-2">Hızlı İletişim & WhatsApp</h4>
                  <p className="text-[#18181B] font-black text-2xl">{business?.phone || '+90 555 123 45 67'}</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#A1A1AA] uppercase tracking-wider text-sm mb-2">Hizmet Bölgemiz</h4>
                  <p className="text-[#52525B] font-medium">{business?.address || 'Tüm İstanbul Geneli\nÜcretsiz Keşif İmkanı'}</p>
                </div>
              </div>
            </div>
            
            <form className="bg-white p-8 rounded-2xl shadow-xl border border-[#E4E4E7]">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-[#52525B] mb-2">Adınız Soyadınız</label>
                  <input type="text" className="w-full bg-[#FAFAFA] border border-[#E4E4E7] rounded-xl px-4 py-3 focus:outline-none focus:border-[#18181B] font-medium transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-[#52525B] mb-2">Oda Sayısı</label>
                    <select className="w-full bg-[#FAFAFA] border border-[#E4E4E7] rounded-xl px-4 py-3 focus:outline-none focus:border-[#18181B] font-medium transition-colors appearance-none">
                      <option>1+0 / 1+1</option>
                      <option>2+1</option>
                      <option>3+1</option>
                      <option>4+1 ve üzeri</option>
                      <option>Sadece belirli odalar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#52525B] mb-2">Ev Durumu</label>
                    <select className="w-full bg-[#FAFAFA] border border-[#E4E4E7] rounded-xl px-4 py-3 focus:outline-none focus:border-[#18181B] font-medium transition-colors appearance-none">
                      <option>Boş Ev</option>
                      <option>Eşyalı Ev</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#52525B] mb-2">Telefon</label>
                  <input type="tel" className="w-full bg-[#FAFAFA] border border-[#E4E4E7] rounded-xl px-4 py-3 focus:outline-none focus:border-[#18181B] font-medium transition-colors" />
                </div>
                <button className="w-full bg-[#18181B] text-white font-bold py-4 rounded-xl hover:bg-[#3F3F46] transition-colors mt-4">
                  Teklif İste
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'boyaci_bespoke_contact', BoyaciBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
