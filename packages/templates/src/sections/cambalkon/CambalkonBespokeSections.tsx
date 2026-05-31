'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Maximize, Shield, Sun, Wind, Check, ChevronRight } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Cambalkon Glassmorphism Hero ──
export function CambalkonBespokeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-screen bg-white text-[#1E293B] flex items-center justify-center pt-24 px-6 overflow-hidden">
      {/* Background with outdoor view */}
      <div className="absolute inset-0 z-0">
        <img 
          src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop'} 
          alt="Panoramic View" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, backdropFilter: "blur(16px)" }}
          className="bg-white/40 backdrop-blur-xl border border-white/60 p-10 md:p-16 rounded-[3rem] shadow-2xl text-center"
        >
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full mb-6 border border-white/80"
          >
            <Sun className="w-4 h-4 text-[#0284C7]" />
            <span className="text-[#0369A1] font-semibold uppercase tracking-widest text-xs">
              {content?.badge || 'DÖRT MEVSİM MANZARA'}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-6 text-[#0F172A]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {content?.title || business?.name || 'Sınırları Kaldırın,\nMekanı Genişletin.'}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }}
            className="text-lg md:text-xl text-[#334155] font-medium leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            {content?.description || (business?.description as string) || 'Isıcamlı ve katlanabilir cam balkon sistemleri ile evinizin manzarasını dört mevsim yaşanabilir bir odaya dönüştürüyoruz.'}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button className="bg-[#0F172A] text-white px-10 py-4 rounded-2xl font-medium tracking-wide hover:bg-[#1E293B] transition-all shadow-xl shadow-[#0F172A]/20">
              Ücretsiz Ölçü İste
            </button>
            <button className="bg-white/60 text-[#0F172A] px-10 py-4 rounded-2xl font-medium tracking-wide border border-white hover:bg-white transition-colors">
              Modelleri İncele
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
registerSection('hero', 'cambalkon_bespoke_hero', CambalkonBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Cambalkon Systems (Features) ──
export function CambalkonBespokeServices({ business, content }: SectionProps<any>) {
  const systems = business?.services?.length ? business.services : [
    { title: 'Isıcamlı Sistem', desc: 'Maksimum ısı ve ses yalıtımı. Kışın sıcak, yazın serin tam koruma sağlar.', icon: <Sun /> },
    { title: 'Katlanabilir Cam', desc: 'Tamamen açılabilir yapısıyla alan tasarrufu sağlayan estetik ve pratik çözüm.', icon: <Maximize /> },
    { title: 'Sürme Cam', desc: 'Dar alanlar için tasarlanmış, ray üzerinde kolayca kayan eşiksiz sistemler.', icon: <Wind /> },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#F8FAFC] text-[#0F172A]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-light mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || 'Modern Cam Sistemleri'}
          </h2>
          <p className="text-[#64748B] text-lg font-medium">Estetik tasarımı ve üstün yalıtım özellikleriyle evinize değer katan uygulamalar.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {systems.map((sys: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white rounded-[2rem] p-10 border border-[#E2E8F0] hover:shadow-2xl hover:shadow-[#0284C7]/5 transition-all group"
            >
              <div className="w-16 h-16 bg-[#F1F5F9] rounded-2xl flex items-center justify-center text-[#0284C7] mb-8 group-hover:bg-[#0284C7] group-hover:text-white transition-colors duration-300">
                {sys.icon || <Maximize />}
              </div>
              <h3 className="text-2xl font-medium mb-4 text-[#0F172A]">{sys.title}</h3>
              <p className="text-[#64748B] font-normal leading-relaxed mb-8">{sys.desc}</p>
              <div className="w-full h-px bg-gradient-to-r from-[#E2E8F0] to-transparent mb-6" />
              <div className="text-[#0284C7] font-medium text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                Sistemi İncele <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'cambalkon_bespoke_services', CambalkonBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Cambalkon Specs & Quality (About) ──
export function CambalkonBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-white py-24 md:py-32 text-[#0F172A] border-y border-[#E2E8F0]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative">
            <div className="absolute inset-0 bg-[#E0F2FE] rounded-[3rem] translate-x-4 translate-y-4" />
            <img 
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2940&auto=format&fit=crop" 
              className="relative z-10 w-full aspect-[4/3] object-cover rounded-[3rem] border-8 border-white shadow-xl" 
              alt="Premium Glass System" 
            />
            {/* Glass Badge */}
            <div className="absolute top-10 -right-6 z-20 bg-white/70 backdrop-blur-lg border border-white p-4 rounded-2xl shadow-xl hidden md:block">
              <Shield className="w-8 h-8 text-[#0284C7] mb-2" />
              <div className="font-bold text-[#0F172A] text-sm">Temperli Cam</div>
              <div className="text-xs text-[#64748B]">Kırılmazlık Garantisi</div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-5xl font-light mb-8 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Şeffaf. İnce. Dayanıklı.'}
            </h2>
            <div className="space-y-6 text-[#475569] font-normal leading-relaxed text-lg mb-10">
              <p>
                {(business?.description as string) || 'Kullanılan alüminyum profiller paslanmaz, camlar ise darbelere karşı 5 kat dayanıklı temperli camlardan üretilir. Sızdırmazlık sağlayan kıl fitiller ve paslanmaz çelik tekerlekler ile sessiz ve uzun ömürlü kullanım sunar.'}
              </p>
            </div>
            
            <ul className="space-y-4">
              {['Paslanmaz Çelik Rulmanlar', 'Çift Taraflı Temperli Cam', 'Yağmur Tahliye Profili', 'Çocuk Emniyet Kilidi'].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-[#334155] font-medium">
                  <div className="w-6 h-6 rounded-full bg-[#E0F2FE] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#0284C7]" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'cambalkon_bespoke_about', CambalkonBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Cambalkon Contact & Measure ──
export function CambalkonBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#0F172A] text-white py-24 md:py-32">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
          
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Ücretsiz Ölçü Keşfi</h2>
            <p className="text-[#94A3B8] font-light mb-12 text-lg max-w-md">Uzman ekibimiz balkonunuzda ölçü alarak alanınıza en uygun sistem ve renk seçeneklerini projelendirsin.</p>
            
            <div className="space-y-10">
              <div>
                <h4 className="font-bold text-[#38BDF8] uppercase tracking-wider text-xs mb-2">İletişim & Randevu</h4>
                <p className="text-3xl font-light text-white mb-2">{business?.phone || '+90 555 222 33 44'}</p>
                <p className="text-[#94A3B8] font-light">info@cambalkonbespoke.com</p>
              </div>
              
              <div>
                <h4 className="font-bold text-[#38BDF8] uppercase tracking-wider text-xs mb-2">Showroom Adresi</h4>
                <p className="text-[#E2E8F0] font-light leading-relaxed">{business?.address || 'Camcılar Sanayi Sitesi A Blok No:12\nAtaşehir, İstanbul'}</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <form className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl">
              <h3 className="text-2xl font-medium mb-8 text-[#0F172A]">Keşif Formu</h3>
              <div className="space-y-6">
                <div>
                  <input type="text" placeholder="Adınız Soyadınız" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-4 focus:outline-none focus:border-[#0284C7] font-medium text-[#0F172A] transition-colors" />
                </div>
                <div>
                  <input type="tel" placeholder="Telefon Numaranız" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-4 focus:outline-none focus:border-[#0284C7] font-medium text-[#0F172A] transition-colors" />
                </div>
                <div>
                  <select className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-4 focus:outline-none focus:border-[#0284C7] font-medium text-[#64748B] transition-colors appearance-none">
                    <option value="">Sistem Seçimi (İsteğe Bağlı)</option>
                    <option value="isicam">Isıcamlı Sürme / Katlanır</option>
                    <option value="standart">Standart Katlanır Cam</option>
                    <option value="giyotin">Giyotin Otomatik Cam</option>
                  </select>
                </div>
                <div>
                  <textarea rows={3} placeholder="Adres veya Notlarınız" className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-4 focus:outline-none focus:border-[#0284C7] font-medium text-[#0F172A] transition-colors resize-none" />
                </div>
                <button className="w-full bg-[#0F172A] text-white font-medium py-4 rounded-xl hover:bg-[#0284C7] transition-colors mt-2">
                  Ölçü Randevusu Al
                </button>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'cambalkon_bespoke_contact', CambalkonBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
