'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowRight, Scissors, Star, Check } from 'lucide-react'

// STATİK VERİLER
const USTALAR = [
  { id: 1, isim: 'Kadir Usta', uzmanlik: 'Klasik Kesim', puan: 4.9 },
  { id: 2, isim: 'Cem Usta', uzmanlik: 'Modern & Fade', puan: 5.0 },
  { id: 3, isim: 'Sinan Usta', uzmanlik: 'Sakal Tasarımı', puan: 4.8 },
]
const SAATLER = ['09:00', '10:30', '11:15', '14:00', '15:30', '17:00']

export default function BerberBladeClient() {
  const containerRef = useRef<HTMLDivElement>(null)

  // 1) MANYETİK İMLEÇ GÖREVİ (Mouse Takibi)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  // İmleç için yumuşatılmış spring config
  const cursorX = useSpring(mousePosition.x, { stiffness: 500, damping: 28 })
  const cursorY = useSpring(mousePosition.y, { stiffness: 500, damping: 28 })

  // 2) PARALLAX HERO SCROLL
  const { scrollYProgress } = useScroll()
  const yText = useTransform(scrollYProgress, [0, 1], [0, 800])
  const opacityText = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  // 3) REZERVASYON WIZARD STATE
  const [step, setStep] = useState(1)
  const [seciliUsta, setSeciliUsta] = useState<number | null>(null)
  const [seciliSaat, setSeciliSaat] = useState<string | null>(null)

  return (
    // FULL SCREEN PARALLAX & MAGNETIC CURSOR TOPOLOJİSİ
    <div 
      ref={containerRef} 
      className="bg-[#050505] min-h-screen text-neutral-200 overflow-x-hidden cursor-none selection:bg-rose-600/30"
    >
      
      {/* ÖZEL MANYETİK İMLEÇ */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-rose-600 z-[100] pointer-events-none mix-blend-exclusion flex items-center justify-center bg-white/5 backdrop-blur-sm"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          borderColor: isHovering ? 'rgba(225, 29, 72, 0.8)' : 'rgba(255, 255, 255, 0.3)'
        }}
      >
        {isHovering && <div className="w-1 h-1 bg-rose-600 rounded-full" />}
      </motion.div>

      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 p-6 md:p-10 flex justify-between items-center mix-blend-difference pointer-events-none">
        <div className="font-sans font-black text-2xl tracking-tighter text-white">
          B<span className="text-rose-600">L</span>ADE
        </div>
        <div 
          className="pointer-events-auto text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-rose-500 transition-colors"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          Menü
        </div>
      </header>

      {/* DEASA TİPOGRAFİK MASK HERO */}
      <section className="relative h-[120vh] w-full flex items-center justify-center overflow-hidden">
        {/* Arka plan katmanı (Image / Canvas) */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40 scale-105 filter blur-[2px]" />
        
        {/* Maskelenmiş / Parallax Metin */}
        <motion.div 
          className="relative z-10 w-full text-center mix-blend-overlay"
          style={{ y: yText, opacity: opacityText }}
        >
          <h1 className="text-[18vw] md:text-[15vw] font-black uppercase leading-[0.8] tracking-tighter text-white">
            Keskin
          </h1>
          <h1 className="text-[18vw] md:text-[15vw] font-black uppercase leading-[0.8] tracking-tighter text-transparent" style={{ WebkitTextStroke: '2px white' }}>
            Hassas
          </h1>
        </motion.div>
        
        {/* Scroll Call to Action */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center text-xs tracking-widest uppercase font-bold text-white/50 animate-bounce">
          Aşağı Kaydır
        </div>
      </section>

      {/* HORIZONTAL KAYAN GALERİ (Marquee) */}
      <section className="py-24 bg-rose-600 overflow-hidden transform -rotate-2 scale-110 my-20 shadow-2xl z-20 relative">
        <div className="flex whitespace-nowrap animate-[marquee_15s_linear_infinite] opacity-90 text-black text-6xl md:text-8xl font-black uppercase tracking-tighter">
          &nbsp;PREMIUM DENEYİM • AWWWARDS STD • KUSURSUZ KESİM • LÜKS DETAYLAR • PREMIUM DENEYİM • AWWWARDS STD • KUSURSUZ KESİM • LÜKS DETAYLAR •
        </div>
      </section>

      {/* REZERVASYON WIZARD SİSTEMİ (Step-by-Step Interactive) */}
      <section className="min-h-screen py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Sıra Dışı Bir Seçim.</h2>
            <p className="text-neutral-500 max-w-lg">Sıradan randevu sistemlerini unutun. İstediğiniz ustayı, tam istediğiniz saati seçerek koltuğunuzu garanti altına alın.</p>
          </div>

          <div className="bg-[#0f0f11] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Glow Arkası */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full blur-[80px] pointer-events-none" />
            
            {/* Adım Göstergesi */}
            <div className="flex items-center gap-4 mb-12 relative z-10">
              <div className={`text-sm font-bold tracking-widest uppercase ${step >= 1 ? 'text-white' : 'text-neutral-600'}`}>01 Usta</div>
              <div className={`flex-1 h-[2px] ${step >= 2 ? 'bg-rose-600' : 'bg-white/10'}`}></div>
              <div className={`text-sm font-bold tracking-widest uppercase ${step >= 2 ? 'text-white' : 'text-neutral-600'}`}>02 Saat</div>
              <div className={`flex-1 h-[2px] ${step >= 3 ? 'bg-rose-600' : 'bg-white/10'}`}></div>
              <div className={`text-sm font-bold tracking-widest uppercase ${step >= 3 ? 'text-white' : 'text-neutral-600'}`}>03 Onay</div>
            </div>

            <AnimatePresence mode="wait">
              
              {/* ADIM 1: USTA SEÇİMİ */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-2xl font-medium mb-6">Ustanızı Seçin</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {USTALAR.map((u) => (
                      <div 
                        key={u.id}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        onClick={() => { setSeciliUsta(u.id); setStep(2) }}
                        className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-rose-500/50 p-6 rounded-2xl cursor-pointer transition-all duration-300 relative group"
                      >
                        <div className="w-12 h-12 bg-rose-600/20 rounded-full flex items-center justify-center mb-4 text-rose-500 group-hover:scale-110 transition-transform"><Scissors className="w-5 h-5"/></div>
                        <h4 className="text-xl font-bold mb-1">{u.isim}</h4>
                        <p className="text-sm text-neutral-400 mb-4">{u.uzmanlik}</p>
                        <div className="flex items-center justify-between text-xs font-bold text-rose-500">
                          <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-rose-500"/> {u.puan}</span>
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity">SEÇ <ArrowRight className="w-3 h-3 inline"/></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ADIM 2: SAAT SEÇİMİ */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-2xl font-medium mb-6 flex justify-between items-center">
                    Tarih & Saat 
                    <button onClick={() => setStep(1)} className="text-xs text-neutral-500 hover:text-white uppercase tracking-widest" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>Geri Dön</button>
                  </h3>
                  <div className="mb-8">
                    <p className="text-neutral-500 mb-4 text-sm">Bugün İçin Müsait Saatler ({USTALAR.find(u=>u.id===seciliUsta)?.isim}):</p>
                    <div className="flex flex-wrap gap-4">
                      {SAATLER.map((s, i) => (
                        <button 
                          key={i}
                          onClick={() => setSeciliSaat(s)}
                          onMouseEnter={() => setIsHovering(true)}
                          onMouseLeave={() => setIsHovering(false)}
                          className={`px-8 py-4 rounded-xl font-bold tracking-widest transition-all ${seciliSaat === s ? 'bg-rose-600 text-white shadow-[0_0_20px_rgba(225,29,72,0.4)]' : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/10'}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button 
                    disabled={!seciliSaat}
                    onClick={() => setStep(3)}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="w-full bg-white text-black py-5 rounded-xl font-bold uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed hover:bg-rose-600 hover:text-white transition-colors"
                  >
                    Devam Et
                  </button>
                </motion.div>
              )}

              {/* ADIM 3: ONAY */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Randevunuz Onaylandı</h3>
                  <p className="text-neutral-400 max-w-sm mx-auto mb-8">
                    {USTALAR.find(u=>u.id===seciliUsta)?.isim} ile saat {seciliSaat}'te VIP koltuğunuz ayrıldı. Tüm detaylar SMS olarak gönderildi.
                  </p>
                  <button 
                    onClick={() => { setStep(1); setSeciliSaat(null); setSeciliUsta(null) }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="text-sm font-bold text-rose-500 uppercase tracking-widest hover:text-white transition-colors border-b border-rose-500/30 hover:border-white pb-1"
                  >
                    Yeni İşlem Başlat
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* GLOBAL KEYFRAMES */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}} />

    </div>
  )
}
