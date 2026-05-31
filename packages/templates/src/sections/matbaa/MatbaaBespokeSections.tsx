'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Printer, Copy, Layers, Target, ArrowUpRight } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Matbaa Bold CMYK Hero ──
export function MatbaaBespokeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-[90vh] bg-white text-[#111111] pt-24 pb-12 overflow-hidden flex items-center border-b-[12px] border-[#111111]">
      {/* CMYK Grid Background overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#f0f0f0 1px, transparent 1px), linear-gradient(90deg, #f0f0f0 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 w-full max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="flex flex-col items-start mb-12">
          
          {/* CMYK Tags */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="flex gap-2 mb-8"
          >
            <div className="w-10 h-3 bg-[#00AEEF]" /> {/* Cyan */}
            <div className="w-10 h-3 bg-[#EC008C]" /> {/* Magenta */}
            <div className="w-10 h-3 bg-[#FFF200]" /> {/* Yellow */}
            <div className="w-10 h-3 bg-[#231F20]" /> {/* Key/Black */}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter text-[#111111] uppercase"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {content?.title?.split('\n').map((line: string, i: number) => <div key={i}>{line}</div>) || (
              <>
                <div>FİKİRDEN</div>
                <div className="text-[#EC008C]">KAĞIDA.</div>
              </>
            )}
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5"
          >
            <p className="text-xl md:text-2xl text-[#444444] font-medium leading-tight mb-8">
              {content?.description || (business?.description as string) || 'Kurumsal kimliğinizi en yüksek kalitede kağıda döküyor, dijital baskıdan ofsete kadar kusursuz çözümler sunuyoruz.'}
            </p>
            <button className="bg-[#00AEEF] text-white px-8 py-5 text-lg font-black tracking-widest uppercase hover:bg-[#008CC1] transition-all flex items-center justify-between w-full md:w-auto gap-12 group">
              Fiyat Teklifi Al 
              <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.6 }}
            className="lg:col-span-7 relative"
          >
            <div className="aspect-[16/9] bg-[#f5f5f5] overflow-hidden relative">
              <img 
                src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1598425237654-4c0551eb0175?q=80&w=2940&auto=format&fit=crop'} 
                alt="Printing Press" 
                className="w-full h-full object-cover mix-blend-multiply grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-[#FFF200] mix-blend-color opacity-30" />
            </div>
            
            {/* Minimalist Metric */}
            <div className="absolute -bottom-6 -right-6 bg-[#111111] text-white p-6 font-mono text-sm tracking-widest">
              <div>PRINT_MODE: OFFSET</div>
              <div className="text-[#00AEEF]">DPI: 2400</div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
registerSection('hero', 'matbaa_bespoke_hero', MatbaaBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Matbaa Services (Grid System) ──
export function MatbaaBespokeServices({ business, content }: SectionProps<any>) {
  const services = business?.services?.length ? business.services : [
    { title: 'Kurumsal Kimlik', desc: 'Kartvizit, antetli kağıt, zarf ve cepli dosya tasarımları ve yüksek çözünürlüklü baskıları.', color: '#00AEEF', icon: <Target /> },
    { title: 'Katalog & Dergi', desc: 'Çok sayfalı yayınlar için tel dikiş veya amerikan cilt seçenekleriyle ofset baskı kalitesi.', color: '#EC008C', icon: <Layers /> },
    { title: 'Promosyon & Paketleme', desc: 'Karton çanta, ambalaj kutuları, defter ve ajanda gibi firmanızı yansıtan özel promosyon ürünleri.', color: '#FFF200', icon: <Copy /> },
  ];

  return (
    <section className="bg-white text-[#111111] border-b-[1px] border-[#E5E5E5]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-[#E5E5E5]">
        
        {/* Header Block in the grid */}
        <div className="p-10 md:p-12 border-b md:border-b-0 md:border-r border-[#E5E5E5] bg-[#f9f9f9] flex flex-col justify-center">
          <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight leading-none mb-4">
            {content?.title || 'Üretim\nParkuru.'}
          </h2>
          <p className="text-[#666666] font-medium text-sm">Geniş makine parkurumuzla her ebatta çözüm üretiyoruz.</p>
        </div>

        {services.map((service: any, i: number) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`p-10 md:p-12 border-b lg:border-b-0 lg:border-r border-[#E5E5E5] relative group hover:bg-[#111111] hover:text-white transition-colors duration-300 ${i === services.length - 1 ? 'lg:border-r-0' : ''}`}
          >
            {/* CMYK Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 transition-all duration-300" style={{ backgroundColor: service.color }} />
            
            <div className="mb-12 text-[#111111] group-hover:text-white transition-colors">
              {React.cloneElement(service.icon, { className: 'w-10 h-10' })}
            </div>
            
            <h3 className="text-xl font-black uppercase tracking-wide mb-4">{service.title}</h3>
            <p className="text-[#666666] group-hover:text-[#AAAAAA] font-medium text-sm leading-relaxed transition-colors">
              {service.desc}
            </p>
          </motion.div>
        ))}
        
      </div>
    </section>
  )
}
registerSection('services', 'matbaa_bespoke_services', MatbaaBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Matbaa Factory/About (Editorial Style) ──
export function MatbaaBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#111111] py-24 text-white">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 order-2 lg:order-1">
            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-none uppercase tracking-tighter text-[#EC008C]">
              {content?.title || 'Sıfır Hata, Tam Renk.'}
            </h2>
            <div className="space-y-6 text-[#AAAAAA] font-medium text-lg leading-snug">
              <p>
                {(business?.description as string) || 'Baskı öncesi hazırlıktan ciltleme aşamasına kadar her detay kalite kontrolünden geçer. Kağıdın dokusunu, mürekkebin yoğunluğunu ve renklerin canlılığını en üst seviyeye taşıyoruz.'}
              </p>
            </div>
            
            <div className="mt-12 flex gap-8">
              <div className="border-l-4 border-[#00AEEF] pl-4">
                <div className="text-3xl font-black text-white">24h</div>
                <div className="text-xs uppercase tracking-widest text-[#666666] mt-1">Kesintisiz Üretim</div>
              </div>
              <div className="border-l-4 border-[#FFF200] pl-4">
                <div className="text-3xl font-black text-white">10K+</div>
                <div className="text-xs uppercase tracking-widest text-[#666666] mt-1">Günlük Kapasite</div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1563200787-8cbaad270387?q=80&w=2938&auto=format&fit=crop" className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Paper Stack" />
              <img src="https://images.unsplash.com/photo-1621508670830-1cba1b51e938?q=80&w=2832&auto=format&fit=crop" className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-500 mt-12" alt="Print Quality" />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'matbaa_bespoke_about', MatbaaBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Matbaa Contact (Brutalist Form) ──
export function MatbaaBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#f0f0f0] text-[#111111] py-24 border-t-[12px] border-[#FFF200]">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
            Projenizi<br/>Başlatın.
          </h2>
          <p className="text-xl text-[#666666] font-medium">Bize ebat, sayfa sayısı ve kağıt cinsi detaylarını iletin.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Ad Soyad / Firma</label>
                <input type="text" className="w-full bg-white border-2 border-[#111111] p-4 font-mono text-sm focus:outline-none focus:border-[#00AEEF]" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">Telefon</label>
                <input type="tel" className="w-full bg-white border-2 border-[#111111] p-4 font-mono text-sm focus:outline-none focus:border-[#00AEEF]" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">E-Posta</label>
              <input type="email" className="w-full bg-white border-2 border-[#111111] p-4 font-mono text-sm focus:outline-none focus:border-[#00AEEF]" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">İş Detayı (Ebat, Adet, Kağıt)</label>
              <textarea rows={4} className="w-full bg-white border-2 border-[#111111] p-4 font-mono text-sm focus:outline-none focus:border-[#00AEEF] resize-none" />
            </div>
            <button className="bg-[#111111] text-white font-black uppercase tracking-widest px-8 py-5 w-full hover:bg-[#EC008C] transition-colors flex justify-center items-center gap-4">
              Gönder <ArrowUpRight className="w-5 h-5" />
            </button>
          </form>

          <div className="flex flex-col justify-end">
            <div className="bg-white border-2 border-[#111111] p-10">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-8 border-b-2 border-[#E5E5E5] pb-4">İletişim Bilgileri</h3>
              <div className="space-y-6 font-mono text-sm">
                <div>
                  <span className="text-[#666666] uppercase">Tel:</span>
                  <div className="text-xl font-bold">{business?.phone || '+90 212 555 44 33'}</div>
                </div>
                <div>
                  <span className="text-[#666666] uppercase">Adres:</span>
                  <div className="font-bold">{business?.address || 'Matbaacılar Sitesi 3. Yol No:15\nTopkapı, İstanbul'}</div>
                </div>
                <div>
                  <span className="text-[#666666] uppercase">E-Posta:</span>
                  <div className="font-bold">info@matbaabespoke.com</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
registerSection('contact', 'matbaa_bespoke_contact', MatbaaBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
