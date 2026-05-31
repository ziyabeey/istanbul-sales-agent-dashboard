// @ts-nocheck
'use client'
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Palette, Brush, Scissors, Sparkles, Smartphone, MapPinned, Star, ArrowRight } from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const brutalistSpring = {
  type: "spring" as const, stiffness: 300, damping: 15
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const slideUp = {
  hidden: { y: 100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 200, damping: 20 } }
}

// A infinite Marquee component
function Marquee({ text, speed = 20, bg = "bg-[#FF007F]", textCol = "text-white" }) {
  return (
    <div className={`w-full overflow-hidden ${bg} border-y-4 border-[#111] py-3 flex whitespace-nowrap transform -rotate-1 relative z-50`}>
      <motion.div 
        animate={{ x: [0, -1000] }} 
        transition={{ repeat: Infinity, duration: speed, ease: "linear" as const }}
        className="flex gap-10 items-center font-heading font-black text-2xl uppercase tracking-widest"
      >
        {[...Array(10)].map((_, i) => (
          <span key={i} className={`flex items-center gap-10 ${textCol}`}>
            {text} <Star className="w-8 h-8 fill-current" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function KresSanatHEADER({ business }: SectionProps<any>) {
  return (
    <header className="fixed w-full top-0 z-[100] border-b-4 border-[#111] bg-[#FDF0D5]" style={{ color: 'var(--color-text)' }}>
      <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="font-heading font-black text-3xl md:text-4xl tracking-tight flex items-center gap-3 text-[#111]">
          <div className="bg-[#EE4B2B] text-white p-2 border-2 border-[#111] rounded-full shadow-[4px_4px_0px_#111]">
            <Palette className="w-6 h-6" />
          </div>
          {business.name}
        </motion.div>
        <motion.a 
          whileHover={{ scale: 1.05, rotate: 2 }} 
          whileTap={{ scale: 0.95 }}
          href="#iletisim" 
          className="bg-[#4BE1E1] border-4 border-[#111] font-black px-6 py-2 md:py-3 text-lg rounded-2xl shadow-[6px_6px_0px_#111] hover:shadow-[2px_2px_0px_#111] hover:translate-y-1 hover:translate-x-1 transition-all text-[#111]"
        >
          Kayıt Ol!
        </motion.a>
      </div>
    </header>
  )
}

export function KresSanatHERO({ business }: SectionProps<any>) {
  return (
    <section className="pt-40 pb-20 px-6 relative bg-[#FDF0D5] overflow-hidden min-h-[90vh] flex flex-col justify-center border-b-4 border-[#111]" style={{ color: 'var(--color-text)' }}>
      
      {/* Playful Floating Shapes */}
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 40, ease: "linear" as const }} className="absolute -top-10 -right-10 w-96 h-96 bg-[#EE4B2B] rounded-full blur-3xl opacity-20 pointer-events-none"></motion.div>
      <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 50, ease: "linear" as const }} className="absolute bottom-10 -left-10 w-80 h-80 bg-[#4BE1E1] rounded-full blur-3xl opacity-30 pointer-events-none"></motion.div>

      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10 w-full mb-20">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="lg:col-span-7 relative z-20">
          <motion.div variants={slideUp} className="inline-block font-black px-4 py-2 bg-[#FFD166] border-4 border-[#111] shadow-[4px_4px_0px_#111] rounded-xl mb-10 transform -rotate-3 text-sm md:text-base tracking-widest uppercase text-[#111]">
            🎨 Yaratıcılık Atölyesi
          </motion.div>
          <motion.h1 variants={slideUp} className="font-heading text-7xl md:text-8xl lg:text-[7rem] font-black leading-[0.85] mb-8 uppercase text-[#111]">
            Her <br/>
            <span className="text-white relative inline-block">
              <span className="relative z-10">Çocuk</span>
              <svg className="absolute w-full h-full left-0 top-0 -z-10 scale-125 translate-y-2 fill-[#EE4B2B]" viewBox="0 0 200 100" preserveAspectRatio="none">
                <path d="M5,50 C40,10 160,10 195,50 C160,90 40,90 5,50 Z" />
              </svg>
            </span>
            <br/> Bir Sanatçı.
          </motion.h1>
          <motion.p variants={slideUp} className="text-2xl md:text-3xl font-bold mb-14 max-w-xl text-[#111]/80 leading-snug">
            Boyalarla kirlenmekten korkmayan, kendi renklerini keşfeden özgür zihinler yetiştiriyoruz.
          </motion.p>
          <motion.a 
            variants={slideUp} 
            whileHover={{ scale: 1.05, rotate: -2 }} 
            whileTap={{ scale: 0.95 }}
            href="#hizmetler" 
            className="inline-flex items-center gap-4 bg-[#FF007F] text-white font-black text-2xl px-12 py-6 rounded-3xl border-4 border-[#111] shadow-[12px_12px_0px_#111] hover:shadow-[6px_6px_0px_#111] hover:translate-y-2 hover:translate-x-2 transition-all"
          >
            Atölyelere Katıl <ArrowRight className="w-8 h-8" strokeWidth={3} />
          </motion.a>
        </motion.div>
        
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="lg:col-span-5 relative mt-16 lg:mt-0 flex justify-center items-center">
          {/* Abstract Interactive Composition */}
          <div className="relative w-full aspect-square max-w-md pointer-events-none sm:pointer-events-auto">
            <motion.div drag dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }} whileHover={{ scale: 1.1, zIndex: 30 }} variants={slideUp} className="absolute top-0 right-10 w-48 h-48 bg-[#4BE1E1] border-4 border-[#111] shadow-[8px_8px_0px_#111] rounded-[4rem] flex flex-col items-center justify-center p-6 text-center transform rotate-6 cursor-grab active:cursor-grabbing z-20">
              <Brush className="w-16 h-16 mb-2 text-[#111]" strokeWidth={2.5} />
              <h3 className="font-black text-xl uppercase text-[#111]">Renkler</h3>
            </motion.div>
            
            <motion.div drag dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }} whileHover={{ scale: 1.1, zIndex: 30 }} variants={slideUp} className="absolute bottom-10 left-0 w-56 h-56 bg-[#FFD166] border-4 border-[#111] shadow-[8px_8px_0px_#111] rounded-full flex flex-col items-center justify-center p-6 text-center transform -rotate-12 cursor-grab active:cursor-grabbing z-10">
              <Scissors className="w-20 h-20 mb-2 text-[#111]" strokeWidth={2.5} />
              <h3 className="font-black text-xl uppercase text-[#111]">Tasarım</h3>
            </motion.div>
            
            <motion.div drag dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }} whileHover={{ scale: 1.1, zIndex: 30 }} variants={slideUp} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white border-4 border-[#111] shadow-[8px_8px_0px_#111] flex flex-col items-center justify-center p-4 text-center transform rotate-45 cursor-grab active:cursor-grabbing z-0">
              <Sparkles className="w-16 h-16 text-[#EE4B2B] transform -rotate-45" strokeWidth={2.5} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-0 w-full">
        <Marquee text="* OYUN * SANAT * KEŞİF *" speed={25} bg="bg-[#EE4B2B]" />
      </div>
    </section>
  )
}

export function KresSanatATOLYELER({ business }: SectionProps<any>) {
  const scrollRef = useRef(null)
  
  return (
    <section id="hizmetler" className="py-40 px-6 relative bg-[#111] text-[#FDF0D5] overflow-hidden" style={{ color: 'var(--color-text)' }}>
      {/* Background Graphic */}
      <div className="absolute top-[-100px] right-[-100px] opacity-10 pointer-events-none">
        <Palette className="w-[800px] h-[800px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={slideUp} className="mb-24 flex flex-col md:flex-row items-end justify-between border-b-8 border-[#FF007F] pb-10 gap-8">
          <h2 className="font-heading text-6xl md:text-8xl font-black uppercase leading-none">Keşif <br/> Atölyeleri</h2>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" as const }}>
            <Sparkles className="w-20 h-20 text-[#4BE1E1]" strokeWidth={2} />
          </motion.div>
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {business.services?.map((service: any, idx: number) => {
            const colors = ['bg-[#FF007F]', 'bg-[#4BE1E1]', 'bg-[#FFD166]', 'bg-[#EE4B2B]'];
            const rot = ['rotate-2', '-rotate-3', 'rotate-1', '-rotate-2'];
            const bgC = colors[idx % colors.length];
            const roT = rot[idx % rot.length];

            return (
              <motion.div 
                key={service.id || idx} 
                variants={slideUp} 
                whileHover="hover"
                className="relative group cursor-pointer"
              >
                {/* Popout Background */}
                <div className={`absolute inset-0 ${bgC} rounded-[3rem] border-4 border-[#111] translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-300`}></div>
                
                {/* Card Front */}
                <motion.div 
                  variants={{ hover: { x: -8, y: -8, rotate: -2, transition: brutalistSpring } }}
                  className={`bg-[#FDF0D5] text-[#111] p-10 rounded-[3rem] border-4 border-[#111] relative z-10 h-full flex flex-col transform ${roT}`}
                >
                  <div className="w-20 h-20 rounded-full border-4 border-[#111] bg-white flex items-center justify-center mb-10 shadow-[4px_4px_0px_#111] group-hover:scale-110 transition-transform">
                    <Brush className="w-10 h-10" />
                  </div>
                  <h3 className="font-heading font-black text-4xl mb-6 uppercase tracking-tight">{service.name}</h3>
                  <p className="font-bold text-xl leading-snug opacity-80">{service.description || 'Çamur, kil, seramik, akrilik boya ve geri dönüşüm materyalleriyle sınır tanımayan hayal gücü seansları.'}</p>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export function KresSanatILETISIM({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-32 px-6 bg-[#4BE1E1] border-y-4 border-[#111] relative overflow-hidden" style={{ color: 'var(--color-text)' }}>
      <Marquee text="HAYAL ET!" speed={10} bg="bg-[#111]" textCol="text-[#FFD166]" />
      
      <div className="max-w-[1200px] mx-auto mt-20">
        <motion.div 
          initial={{ rotate: 10, scale: 0.8, opacity: 0 }}
          whileInView={{ rotate: -2, scale: 1, opacity: 1 }}
          transition={{ type: "spring" as const, stiffness: 200, damping: 20 }}
          viewport={{ once: true }}
          className="bg-white rounded-[4rem] border-4 border-[#111] shadow-[24px_24px_0px_#111] p-16 md:p-24 text-center transform relative z-20"
        >
          <div className="absolute -top-12 -right-12 text-[#FF007F]">
            <Star className="w-32 h-32 fill-current animate-spin-slow" />
          </div>

          <h2 className="font-heading text-6xl md:text-[5rem] font-black text-[#111] uppercase leading-[0.9] mb-12 tracking-tight">
            Boyalar <br/> Hazır!
          </h2>
          <p className="text-[#111] text-2xl font-bold mb-16 max-w-2xl mx-auto leading-relaxed border-b-8 border-[#FFD166] pb-10">
            Tanışma atölyemiz için kontenjanlarımız sınırda. Çocuğunuzun sanat yolculuğunu bugün başlatın.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <motion.a 
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${business.phoneClean}`} 
              className="flex items-center justify-center gap-4 bg-[#EE4B2B] text-white px-12 py-6 rounded-full font-black text-2xl border-4 border-[#111] shadow-[8px_8px_0px_#111] hover:shadow-[4px_4px_0px_#111] hover:translate-y-1 hover:translate-x-1 transition-all"
            >
              <Smartphone className="w-8 h-8" /> {business.phone}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function KresSanatFOOTER({ business }: SectionProps<any>) {
  return (
    <footer className="py-16 bg-[#FDF0D5] text-center font-black uppercase text-2xl tracking-widest text-[#111]" style={{ color: 'var(--color-text)' }}>
      <div className="max-w-[1440px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <Palette className="w-10 h-10 text-[#FF007F]" />
          {business.name}
        </div>
        <div className="text-xl opacity-50">
          © {new Date().getFullYear()} — CREATIVE KIDS
        </div>
      </div>
    </footer>
  )
}

registerSection('hero', 'kressanat_hero_0', KresSanatHEADER)
registerSection('hero', 'kressanat_hero_1', KresSanatHERO)
registerSection('services', 'kressanat_services_2', KresSanatATOLYELER)
registerSection('services', 'kressanat_services_3', KresSanatILETISIM)
registerSection('footer', 'kressanat_footer_4', KresSanatFOOTER)
