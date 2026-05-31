'use client'

import React, { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { Dumbbell, Activity, Timer, Zap, PlayCircle } from 'lucide-react'
import { registerSection, type SectionProps } from '../../registry/section-registry'

// ── 1. Fitness Aggressive Hero ──
export function FitnessBespokeHero({ business, content }: SectionProps<any>) {
  return (
    <section className="relative min-h-screen bg-[#050505] text-white flex items-center pt-20 overflow-hidden">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-10" />
        <img 
          src={(business?.images as any[])?.[0] || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2940&auto=format&fit=crop'} 
          alt="Gym Workout" 
          className="w-full h-full object-cover object-center grayscale contrast-125" 
        />
        {/* Neon Accent Glow */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#EAB308]/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-20 w-full max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, type: "spring" }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-8 w-2 bg-[#EAB308]" />
            <span className="text-[#EAB308] font-black uppercase tracking-[0.3em] text-sm">
              {content?.badge || 'LIMITLERİNİ ZORLA'}
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-8 text-white italic"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {content?.title || business?.name || 'ASLA\nPES ETME.'}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-zinc-400 font-bold max-w-xl mb-12 uppercase tracking-wide"
          >
            {content?.description || (business?.description as string) || 'Bahaneleri bırak. Sadece 30 günde değişimi hisset, 90 günde tamamen yeni bir sen ol.'}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <button className="bg-[#EAB308] text-black px-12 py-5 font-black uppercase tracking-widest text-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 skew-x-[-10deg]">
              <span className="inline-block skew-x-[10deg]">Ücretsiz Deneme</span>
            </button>
            <button className="flex items-center justify-center gap-3 text-white px-8 py-5 font-bold uppercase tracking-widest hover:text-[#EAB308] transition-colors group">
              <PlayCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />
              Kulübü Gör
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Glitch text decorative */}
      <div className="absolute right-0 bottom-24 -rotate-90 origin-bottom-right hidden lg:block opacity-10">
        <span className="text-9xl font-black uppercase tracking-tighter text-transparent" style={{ WebkitTextStroke: '2px white' }}>NO PAIN</span>
      </div>
    </section>
  )
}
registerSection('hero', 'fitness_bespoke_hero', FitnessBespokeHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 2. Fitness Grid (Programs) ──
export function FitnessBespokeServices({ business, content }: SectionProps<any>) {
  const programs = business?.services?.length ? business.services : [
    { title: 'CrossFit & Kondisyon', desc: 'Yüksek yoğunluklu fonksiyonel antrenmanlarla gücünü ve dayanıklılığını test et.', icon: <Zap /> },
    { title: 'Personal Training', desc: 'Birebir özel eğitmen eşliğinde, sadece sana özel beslenme ve antrenman programı.', icon: <Timer /> },
    { title: 'Ağırlık & Hipertrofi', desc: 'Serbest ağırlık ve profesyonel makinelerle kas kütleni maksimum seviyeye çıkar.', icon: <Dumbbell /> },
  ];

  return (
    <section className="py-24 bg-[#0A0A0A] text-white">
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 italic" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'PROGRAMLAR'}
            </h2>
            <div className="w-32 h-2 bg-[#EAB308]" />
          </div>
          <button className="hidden md:block text-zinc-500 font-black uppercase tracking-widest hover:text-[#EAB308] transition-colors">
            Tüm Sınıflar &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((program: any, i: number) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#111] p-10 border border-[#222] hover:border-[#EAB308] transition-colors group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#EAB308] opacity-0 group-hover:opacity-10 blur-[50px] transition-opacity duration-500" />
              <div className="w-16 h-16 bg-zinc-900 flex items-center justify-center text-[#EAB308] mb-8 skew-x-[-10deg] group-hover:bg-[#EAB308] group-hover:text-black transition-colors duration-300">
                <div className="skew-x-[10deg]">{program.icon || <Activity />}</div>
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">{program.title}</h3>
              <p className="text-zinc-400 font-medium leading-relaxed">{program.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('services', 'fitness_bespoke_services', FitnessBespokeServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 3. Fitness Motivation/About ──
export function FitnessBespokeAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="py-0 bg-black text-white relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="relative p-12 md:p-24 flex flex-col justify-center border-r border-[#222]">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-8 italic" style={{ fontFamily: 'var(--font-heading)' }}>
            GÜÇ, KONFOR ALANININ DIŞINDA BAŞLAR.
          </h2>
          <div className="space-y-6 text-zinc-400 font-medium text-lg max-w-xl">
            <p>
              {(business?.description as string) || 'En iyi ekipmanlar, profesyonel eğitmen kadrosu ve hedeflerine odaklanmış bir topluluk. Burası sıradan bir spor salonu değil; burası senin dönüşüm merkezin.'}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 mt-12">
            <div>
              <div className="text-5xl font-black text-white mb-2 tracking-tighter">2.500<span className="text-[#EAB308]">m²</span></div>
              <div className="text-sm uppercase tracking-widest font-bold text-zinc-600">Antrenman Alanı</div>
            </div>
            <div>
              <div className="text-5xl font-black text-white mb-2 tracking-tighter">7/24</div>
              <div className="text-sm uppercase tracking-widest font-bold text-zinc-600">Kesintisiz Erişim</div>
            </div>
          </div>
        </div>
        
        <div className="relative min-h-[400px] lg:min-h-full bg-[#111]">
          <img 
            src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2940&auto=format&fit=crop" 
            alt="Gym Equipment" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-60"
          />
          {/* Yellow tape diagonal overlay */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
             <div className="w-[150%] h-16 bg-[#EAB308] rotate-[-35deg] transform flex items-center justify-center border-y-4 border-black text-black font-black uppercase tracking-[0.5em] text-xl">
               TRAIN HARD • NO EXCUSES • TRAIN HARD • NO EXCUSES • TRAIN HARD
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'fitness_bespoke_about', FitnessBespokeAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 4. Fitness Join / Contact ──
export function FitnessBespokeContact({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#EAB308] text-black py-24 md:py-32 relative overflow-hidden">
      {/* Dynamic background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
        <span className="text-[25vw] font-black uppercase tracking-tighter leading-none text-black">JOIN</span>
      </div>
      
      <div className="max-w-[var(--container-default)] mx-auto px-6 md:px-12 relative z-10">
        <div className="bg-black text-white p-12 md:p-20 shadow-2xl skew-x-[-2deg] transform">
          <div className="skew-x-[2deg]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              <div>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 italic">Harekete Geç.</h2>
                <p className="text-zinc-400 font-bold mb-12">Yarın değil, Pazartesi değil. ŞİMDİ. Üyeliğini başlat veya ücretsiz deneme için form doldur.</p>
                
                <div className="space-y-8">
                  <div>
                    <div className="text-[#EAB308] font-black uppercase tracking-widest text-sm mb-2">Lokasyon</div>
                    <div className="font-bold text-xl uppercase">{business?.address || 'Ataşehir Bulvarı, No:42\nİstanbul'}</div>
                  </div>
                  <div>
                    <div className="text-[#EAB308] font-black uppercase tracking-widest text-sm mb-2">İletişim</div>
                    <div className="font-bold text-3xl uppercase tracking-tighter">{business?.phone || '0216 000 00 00'}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <form className="space-y-6">
                  <div>
                    <input type="text" placeholder="AD SOYAD" className="w-full bg-[#111] border border-[#333] px-6 py-5 text-white font-bold uppercase placeholder:text-zinc-600 focus:outline-none focus:border-[#EAB308] transition-colors" />
                  </div>
                  <div>
                    <input type="tel" placeholder="TELEFON" className="w-full bg-[#111] border border-[#333] px-6 py-5 text-white font-bold uppercase placeholder:text-zinc-600 focus:outline-none focus:border-[#EAB308] transition-colors" />
                  </div>
                  <div>
                    <select className="w-full bg-[#111] border border-[#333] px-6 py-5 text-white font-bold uppercase focus:outline-none focus:border-[#EAB308] transition-colors appearance-none">
                      <option value="">HEDEFİN NEDİR?</option>
                      <option value="kilo_verme">Kilo Verme / Yağ Yakımı</option>
                      <option value="kas_yapma">Kas Kütlesi Artışı</option>
                      <option value="kondisyon">Genel Kondisyon / Sağlık</option>
                    </select>
                  </div>
                  <button className="w-full bg-[#EAB308] text-black font-black uppercase tracking-widest py-6 hover:bg-white transition-colors text-lg mt-4">
                    Formu Gönder
                  </button>
                </form>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('contact', 'fitness_bespoke_contact', FitnessBespokeContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
