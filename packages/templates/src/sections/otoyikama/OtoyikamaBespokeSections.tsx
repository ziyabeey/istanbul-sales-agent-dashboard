'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Droplet, Sparkles, Shield, ChevronRight, CheckCircle2, Clock } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Otoyikama Glossy Hero ──
export function OtoyikamaBespokeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-screen bg-[#020617] text-white flex items-center pt-24 overflow-hidden">
      {/* Glossy wet background effects */}
      <div className="absolute inset-0 z-0">
        <img 
          src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2940&auto=format&fit=crop'} 
          alt="Premium Detailing" 
          className="w-full h-full object-cover opacity-60" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/90 to-[#020617]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#1D4ED8]/20 border border-[#2563EB]/30 px-4 py-2 rounded-full mb-8 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-[#60A5FA]" />
              <span className="text-[#93C5FD] font-semibold uppercase tracking-widest text-xs">
                {content?.badge || 'KUSURSUZ PARLAKLIK'}
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 text-white tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {content?.title || business?.name || 'Aracınıza\nShowroom\nGörünümü.'}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
              className="text-lg text-[#94A3B8] font-medium leading-relaxed mb-10 max-w-lg"
            >
              {content?.description || (business?.description as string) || 'Nano teknoloji seramik kaplama, detaylı iç temizlik ve profesyonel boya koruma uygulamaları ile aracınızı ilk günkü ihtişamına kavuşturuyoruz.'}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <button className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white px-8 py-4 rounded-xl font-bold tracking-wide hover:from-[#1D4ED8] hover:to-[#1E3A8A] transition-all shadow-lg shadow-[#2563EB]/30 flex items-center gap-2">
                <Clock className="w-5 h-5" /> Randevu Al
              </button>
              <button className="bg-[#1E293B] text-white px-8 py-4 rounded-xl font-semibold tracking-wide hover:bg-[#334155] transition-colors">
                Paketleri İncele
              </button>
            </motion.div>
          </div>

          <div className="hidden lg:flex justify-end">
            <motion.div 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl max-w-sm"
            >
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                <div className="w-16 h-16 rounded-full bg-[#1D4ED8] flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">5 Yıl</div>
                  <div className="text-[#94A3B8] text-sm">Seramik Garantisi</div>
                </div>
              </div>
              <ul className="space-y-4">
                {['pH Nötr Şampuanlar', 'Çiziksiz Mikrofiber Kurulama', 'Kapalı Ortam Uygulama'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[#60A5FA]" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('hero', 'otoyikama_bespoke_hero', OtoyikamaBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Otoyikama Services (Detailing) ──
export function OtoyikamaBespokeServices({ business, content }: SectionProps<any>) {
  const services = business?.services?.length ? business.services : [
    { title: 'VIP Detaylı İç Temizlik', desc: 'Koltuk tavan taban yıkama, ozonla dezenfeksiyon ve plastik trim yenileme.', icon: <Sparkles /> },
    { title: 'Seramik Kaplama', desc: '9H sertlikte nano koruma. Su itici özellik ve dış etkenlere karşı tam zırh.', icon: <Shield /> },
    { title: 'Boya Kusursuzlaştırma', desc: 'Çizik giderme, hare giderme ve ayna parlaklığında pasta cila uygulamaları.', icon: <Droplet /> },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#0F172A] text-white">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || 'Profesyonel Uygulamalar'}
          </h2>
          <div className="w-20 h-1 bg-[#2563EB] mx-auto rounded-full mb-6" />
          <p className="text-[#94A3B8] text-lg font-medium">Klasik yıkamanın ötesinde, aracınızın değerini koruyan butik uygulamalar.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[#1E293B] rounded-3xl p-10 hover:bg-[#2563EB] transition-colors duration-500 group border border-[#334155] hover:border-[#3B82F6]"
            >
              <div className="w-16 h-16 bg-[#0F172A] rounded-2xl flex items-center justify-center text-[#60A5FA] mb-8 group-hover:bg-white group-hover:text-[#2563EB] transition-colors duration-500">
                {service.icon || <Sparkles />}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
              <p className="text-[#94A3B8] group-hover:text-blue-100 font-medium leading-relaxed mb-8 transition-colors duration-500">{service.desc}</p>
              <div className="flex items-center gap-2 text-[#60A5FA] group-hover:text-white font-bold text-sm uppercase tracking-wider transition-colors duration-500">
                Daha Fazla Bilgi <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'otoyikama_bespoke_services', OtoyikamaBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Otoyikama About (Wet Look & Tech) ──
export function OtoyikamaBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#020617] py-24 md:py-32 relative border-y border-[#1E293B]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#2563EB] to-transparent rounded-3xl blur-2xl opacity-20" />
            <img 
              src="https://images.unsplash.com/photo-1550565545-d86ce0567f1b?q=80&w=2940&auto=format&fit=crop" 
              alt="Detailing" 
              className="relative z-10 rounded-3xl shadow-2xl border border-[#334155]"
            />
            {/* Water drop overlay effect */}
            <div className="absolute bottom-10 -right-10 bg-[#1E293B] p-6 rounded-2xl border border-[#334155] shadow-xl z-20 flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-[#1D4ED8] flex items-center justify-center">
                 <Droplet className="w-6 h-6 text-white" />
               </div>
               <div>
                 <div className="text-white font-bold">Saf Su Sistemi</div>
                 <div className="text-[#94A3B8] text-sm">Lekesiz Kurulama</div>
               </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Detaylarda Gizli Kusursuzluk.'}
            </h2>
            <div className="space-y-6 text-[#94A3B8] font-medium leading-relaxed text-lg">
              <p>
                {(business?.description as string) || 'Aracınıza en az sizin kadar değer veriyoruz. Sıradan fırçalı yıkamaların yarattığı kılcal çiziklere son veriyor, çift kova yöntemi ve premium ithal kimyasallarla VIP bir temizlik sunuyoruz.'}
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-6">
              <div className="bg-[#0F172A] p-6 rounded-2xl border border-[#1E293B]">
                <div className="text-3xl font-bold text-white mb-2">10K+</div>
                <div className="text-sm font-semibold text-[#60A5FA] uppercase tracking-wider">Mutlu Araç Sahibi</div>
              </div>
              <div className="bg-[#0F172A] p-6 rounded-2xl border border-[#1E293B]">
                <div className="text-3xl font-bold text-white mb-2">%100</div>
                <div className="text-sm font-semibold text-[#60A5FA] uppercase tracking-wider">Orijinal Ürün</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'otoyikama_bespoke_about', OtoyikamaBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Otoyikama Contact & Booking ──
export function OtoyikamaBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#0F172A] text-white py-24 md:py-32 relative">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="bg-[#020617] rounded-3xl p-10 md:p-16 border border-[#1E293B] shadow-2xl relative overflow-hidden">
          
          {/* Decorative blue glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1D4ED8]/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white" style={{ fontFamily: 'var(--font-heading)' }}>Hemen Randevu Alın</h2>
              <p className="text-[#94A3B8] font-medium mb-12">Detailing stüdyomuzda yoğunluk yaşanmaması adına işlemlerimiz tamamen randevu sistemiyle yürütülmektedir.</p>
              
              <div className="space-y-8">
                <div>
                  <div className="text-[#60A5FA] font-bold uppercase tracking-widest text-sm mb-2">Konum</div>
                  <div className="text-xl font-medium text-white">{business?.address || 'Oto Sanayi Sitesi, 2. Cadde\nMaslak, İstanbul'}</div>
                </div>
                <div>
                  <div className="text-[#60A5FA] font-bold uppercase tracking-widest text-sm mb-2">İletişim & WhatsApp</div>
                  <div className="text-3xl font-bold text-white mb-1">{business?.phone || '+90 532 000 00 00'}</div>
                  <div className="text-[#94A3B8]">info@otoyikamabespoke.com</div>
                </div>
              </div>
            </div>
            
            <form className="space-y-6 bg-[#0F172A] p-8 rounded-2xl border border-[#1E293B]">
              <div>
                <label className="block text-sm font-bold text-[#94A3B8] mb-2 uppercase tracking-wider">İsim Soyisim</label>
                <input type="text" className="w-full bg-[#020617] border border-[#334155] rounded-xl px-4 py-4 focus:outline-none focus:border-[#3B82F6] text-white transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#94A3B8] mb-2 uppercase tracking-wider">Telefon</label>
                <input type="tel" className="w-full bg-[#020617] border border-[#334155] rounded-xl px-4 py-4 focus:outline-none focus:border-[#3B82F6] text-white transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#94A3B8] mb-2 uppercase tracking-wider">İstenen Uygulama</label>
                <select className="w-full bg-[#020617] border border-[#334155] rounded-xl px-4 py-4 focus:outline-none focus:border-[#3B82F6] text-white transition-colors appearance-none">
                  <option value="">Seçiniz...</option>
                  <option value="ic_dis">VIP İç & Dış Yıkama</option>
                  <option value="seramik">Seramik Kaplama</option>
                  <option value="detay">Detaylı İç Temizlik</option>
                  <option value="pasta">Pasta Cila & Boya Koruma</option>
                </select>
              </div>
              <button className="w-full bg-[#2563EB] text-white font-bold uppercase tracking-widest py-5 rounded-xl hover:bg-[#1D4ED8] transition-colors mt-4 shadow-lg shadow-[#2563EB]/20">
                Randevu Gönder
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'otoyikama_bespoke_contact', OtoyikamaBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
