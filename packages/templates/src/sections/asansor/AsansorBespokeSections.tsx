'use client'

import React, { ComponentType } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUp, ArrowDown, ShieldCheck, Wrench, Settings, PhoneCall, ChevronDown } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Asansor Vertical Hero ──
export function AsansorBespokeHero({ business, content }: SectionProps<any>) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <section className="relative min-h-screen bg-[#0F172A] text-white flex flex-col justify-center overflow-hidden">
      {/* Elevator shaft vertical lines */}
      <div className="absolute inset-0 z-0 flex justify-center opacity-20 pointer-events-none">
        <div className="w-px h-full bg-gradient-to-b from-transparent via-[#38BDF8] to-transparent mx-12" />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-[#38BDF8] to-transparent mx-12" />
      </div>

      <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-40">
        <img 
          src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2855&auto=format&fit=crop'} 
          alt="Modern Elevator" 
          className="w-full h-full object-cover grayscale mix-blend-luminosity" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/80 via-[#0F172A]/50 to-[#0F172A]" />
      </motion.div>

      <div className="relative z-10 w-full max-w-[var(--container-default)] mx-auto px-6 md:px-12 pt-32">
        <div className="flex flex-col items-center text-center">
          
          <motion.div 
            initial={{ height: 0, opacity: 0 }} animate={{ height: 80, opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}
            className="w-px bg-[#38BDF8] mb-8"
          />

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="inline-flex items-center gap-2 border border-[#334155] bg-[#1E293B]/50 backdrop-blur px-5 py-2 rounded-full mb-8"
          >
            <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
            <span className="text-[#E2E8F0] font-medium tracking-widest text-xs uppercase">
              {content?.badge || 'GÜVENLİ VE KESİNTİSİZ'}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1] mb-8 text-white tracking-tighter uppercase"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {content?.title || business?.name || 'Zirveye\nGüvenle\nUlaşın.'}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }}
            className="text-xl text-[#94A3B8] font-light leading-relaxed mb-12 max-w-2xl"
          >
            {content?.description || (business?.description as string) || 'Yeni nesil akıllı asansör sistemleri, 7/24 teknik servis ve modernizasyon çözümleriyle yapılarınıza değer katıyoruz.'}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <button className="bg-[#0284C7] text-white px-10 py-4 rounded-none font-bold tracking-widest uppercase hover:bg-[#0369A1] transition-all flex items-center gap-3">
              Keşif İste <ArrowUp className="w-5 h-5" />
            </button>
            <button className="bg-transparent text-white px-10 py-4 rounded-none font-bold tracking-widest uppercase border border-[#334155] hover:border-[#94A3B8] transition-all flex items-center gap-3">
              Servis Talebi <Wrench className="w-5 h-5" />
            </button>
          </motion.div>

        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#475569] animate-bounce">
        <ChevronDown className="w-8 h-8" />
      </div>
    </section>
  )
}
registerSection('hero', 'asansor_bespoke_hero', AsansorBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Asansor Services (Metallic Cards) ──
export function AsansorBespokeServices({ business, content }: SectionProps<any>) {
  const services = business?.services?.length ? business.services : [
    { title: 'Montaj & Kurulum', desc: 'İnsan, yük ve sedye asansörlerinde projelendirme ve TS EN 81-20/50 standartlarına uygun anahtar teslim kurulum.', icon: <ArrowUp /> },
    { title: 'Periyodik Bakım', desc: 'Olası arızaları önleyen, asansörünüzün ömrünü uzatan ve güvenliği maksimumda tutan aylık bakım sözleşmeleri.', icon: <Settings /> },
    { title: 'Modernizasyon', desc: 'Eski ve kırmızı etiketli asansörlerinizi son teknoloji panolar, invertörler ve kabin tasarımlarıyla yeniliyoruz.', icon: <Wrench /> },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#020617] text-white">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Profesyonel Çözümler'}
            </h2>
            <div className="w-16 h-1 bg-[#38BDF8] mb-6" />
            <p className="text-[#94A3B8] text-lg font-light leading-relaxed">Binanızın yapısına ve kullanım amacına en uygun mühendislik çözümleri.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-gradient-to-b from-[#1E293B] to-[#0F172A] p-10 border-t border-[#334155] group hover:border-[#38BDF8] transition-colors relative overflow-hidden"
            >
              {/* Metallic shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <div className="w-16 h-16 bg-[#0F172A] border border-[#334155] flex items-center justify-center text-[#38BDF8] mb-8 group-hover:bg-[#38BDF8] group-hover:text-[#0F172A] transition-colors duration-300">
                {service.icon || <ArrowUp />}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-wide">{service.title}</h3>
              <p className="text-[#94A3B8] font-light leading-relaxed mb-8">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'asansor_bespoke_services', AsansorBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Asansor Engineering & Trust (About) ──
export function AsansorBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#0F172A] py-24 md:py-32 text-white border-y border-[#1E293B]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative h-[600px] bg-[#1E293B] p-4 flex flex-col justify-end">
            <img 
              src="https://images.unsplash.com/photo-1541888043640-279207e3240e?q=80&w=2835&auto=format&fit=crop" 
              alt="Elevator Shaft" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
            <div className="relative z-10 p-8 bg-[#0F172A]/80 backdrop-blur-md border border-[#334155] mr-8 mb-8">
              <div className="text-4xl font-black text-[#38BDF8] mb-2">%100</div>
              <div className="text-sm font-bold text-white uppercase tracking-widest">TS EN 81-20 Uyumlu Kurulum</div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-1 bg-[#38BDF8]" />
              <span className="text-[#94A3B8] font-bold uppercase tracking-widest text-sm">HAKKIMIZDA</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight uppercase tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'Mühendislik Harikası, Güvenlik Zirvesi.'}
            </h2>
            <div className="space-y-6 text-[#94A3B8] font-light leading-relaxed text-lg mb-10">
              <p>
                {(business?.description as string) || 'Asansör sadece bir taşıma aracı değil, binanızın kalbidir. Makine mühendisleri odası onaylı projelerimiz ve uzman teknik kadromuzla, kırmızı etiket riskini ortadan kaldırıyoruz.'}
              </p>
              <p>
                İster yeni bir plaza inşaatı olsun, ister eski bir apartmanın modernizasyonu; her projede önce can güvenliği diyor, en kaliteli komponentleri kullanıyoruz.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[#334155]">
              <div>
                <div className="text-3xl font-bold text-white mb-2">15+ Yıl</div>
                <div className="text-sm text-[#475569] uppercase tracking-wider">Sektör Deneyimi</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">7/24</div>
                <div className="text-sm text-[#475569] uppercase tracking-wider">Acil Müdahale</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'asansor_bespoke_about', AsansorBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Asansor Contact (Emergency/Support) ──
export function AsansorBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#020617] text-white py-24 md:py-32 relative overflow-hidden">
      {/* Background Tech Details */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#38BDF8 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-5">
            <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>İletişim & Servis</h2>
            <p className="text-[#94A3B8] font-light mb-12 text-lg">Acil arıza bildirimleri, bakım sözleşmeleri ve yeni proje teklifleri için bize ulaşın.</p>
            
            <div className="space-y-10">
              <div className="bg-[#0F172A] p-8 border-l-4 border-[#EF4444]">
                <div className="text-[#EF4444] font-bold uppercase tracking-widest text-sm mb-2 flex items-center gap-2">
                  <PhoneCall className="w-4 h-4" /> Acil Arıza Hattı (7/24)
                </div>
                <div className="text-2xl font-black text-white">{business?.phone || '0850 000 00 00'}</div>
              </div>

              <div>
                <h4 className="font-bold text-[#38BDF8] mb-2 uppercase tracking-wider text-sm">Merkez Ofis</h4>
                <p className="text-[#94A3B8] font-light leading-relaxed">{business?.address || 'OSB 1. Kısım Makine Cad. No:14\nSanayi Sitesi, İstanbul'}</p>
              </div>
              
              <div>
                <h4 className="font-bold text-[#38BDF8] mb-2 uppercase tracking-wider text-sm">E-Posta</h4>
                <p className="text-[#94A3B8] font-light">info@asansorbespoke.com</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <form className="bg-[#0F172A] p-10 lg:p-16 border border-[#1E293B]">
              <h3 className="text-2xl font-bold mb-8 text-white uppercase tracking-wide">Teklif veya Servis Talebi</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold text-[#475569] mb-2 uppercase tracking-wider">İsim / Firma Ünvanı *</label>
                  <input type="text" className="w-full bg-[#020617] border border-[#334155] px-4 py-4 focus:outline-none focus:border-[#38BDF8] text-white transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#475569] mb-2 uppercase tracking-wider">Telefon *</label>
                  <input type="tel" className="w-full bg-[#020617] border border-[#334155] px-4 py-4 focus:outline-none focus:border-[#38BDF8] text-white transition-colors" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-xs font-bold text-[#475569] mb-2 uppercase tracking-wider">Talep Türü</label>
                <select className="w-full bg-[#020617] border border-[#334155] px-4 py-4 focus:outline-none focus:border-[#38BDF8] text-white transition-colors appearance-none">
                  <option value="">Seçiniz...</option>
                  <option value="ariza">Arıza Bildirimi</option>
                  <option value="bakim">Aylık Bakım Sözleşmesi</option>
                  <option value="revizyon">Revizyon / Kırmızı Etiket</option>
                  <option value="yeni">Yeni Asansör Kurulumu</option>
                </select>
              </div>
              <div className="mb-8">
                <label className="block text-xs font-bold text-[#475569] mb-2 uppercase tracking-wider">Adres / Detay (İsteğe Bağlı)</label>
                <textarea rows={3} className="w-full bg-[#020617] border border-[#334155] px-4 py-4 focus:outline-none focus:border-[#38BDF8] text-white transition-colors resize-none" />
              </div>
              <button className="w-full bg-[#0284C7] text-white font-bold tracking-widest uppercase py-5 hover:bg-[#0369A1] transition-colors">
                Talebi İlet
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'asansor_bespoke_contact', AsansorBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
