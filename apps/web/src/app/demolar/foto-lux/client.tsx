'use client'

import React, { useState, useEffect } from 'react'
import { motion, useSpring } from 'framer-motion'
import { Instagram, Mail, Fingerprint } from 'lucide-react'

// PORTFOLYO (MENÜ) VERİLERİ
const GALERI = [
  { id: 'moda', baslik: 'Moda', yazi: 'FASHION', gorsel: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=2000' },
  { id: 'portre', baslik: 'Portre', yazi: 'PORTRAITS', gorsel: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=2000' },
  { id: 'editoryal', baslik: 'Editöryal', yazi: 'EDITORIAL', gorsel: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2000' },
  { id: 'ticari', baslik: 'Ticari', yazi: 'COMMERCIAL', gorsel: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=2000' },
]

export default function FotoLuxClient() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  
  // Fare Koordinatları
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Framer Motion Spring (Akışkan İmleç ve Maske Takipleri İçin)
  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 }
  const mouseX = useSpring(mousePos.x, springConfig)
  const mouseY = useSpring(mousePos.y, springConfig)

  // Aktif görseli bul
  const activeImage = GALERI.find(g => g.id === hoveredItem)?.gorsel

  return (
    // PREMIUM+ TIER: 100VH KİLİTLİ, CURSOR-MASK REVEAL TOPOLOJİSİ
    <div className="bg-[#050505] text-white h-screen w-full overflow-hidden relative cursor-crosshair font-sans selection:bg-white selection:text-black">
      
      {/* 1) SESSİZ ARKA PLAN (Her zaman arkada duran hafif grenli doku/görünüm) */}
      <div className="absolute inset-0 z-0 bg-neutral-900 opacity-20 bg-[url('https://images.unsplash.com/photo-1621504450181-5d356f61d307?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center grayscale mix-blend-overlay" />

      {/* 2) DİNAMİK GÖRSEL MASKESİ (Reveal Layer) - Mouse pozisyonuna göre Maskelenir */}
      {/* Sadece bir elemente hover olunduğunda aktif olur */}
      <motion.div 
        className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-700"
        style={{ 
          opacity: hoveredItem ? 1 : 0,
          clipPath: 'circle(18vw at var(--x) var(--y))' 
        }}
        // Framer motion style injection for custom CSS vars
        animate={{
          '--x': `${mousePos.x}px`,
          '--y': `${mousePos.y}px`
        } as any}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ 
            backgroundImage: `url(${activeImage})`,
            transition: 'background-image 0.4s ease-in-out'
          }} 
        />
        {/* Görselin üzerine hafif bir liquid/blur filtresi efekti eklemek için (Awwwards Vibe) */}
        <div className="absolute inset-0 backdrop-saturate-150 bg-black/10 mix-blend-overlay" />
      </motion.div>

      {/* 3) METİN KATMANI (Büyük Tipografi Menüsü) */}
      <div className="relative z-20 h-full w-full flex flex-col items-center justify-center p-8 mix-blend-difference pointer-events-none">
        
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-2 md:gap-0">
          {GALERI.map((item) => (
            <div 
              key={item.id}
              className="group relative cursor-pointer pointer-events-auto w-max origin-left"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <h1 className="text-[12vw] md:text-[8vw] lg:text-[7vw] font-black uppercase leading-[0.85] tracking-tighter text-transparent group-hover:text-white transition-all duration-500"
                  style={{ WebkitTextStroke: hoveredItem === item.id ? '0px transparent' : '1px rgba(255,255,255,0.3)', color: hoveredItem === item.id ? 'white' : 'transparent' }}>
                {item.yazi}
              </h1>
              {/* Küçük alt başlık */}
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-neutral-400">
                0{GALERI.indexOf(item) + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4) ÖZEL MANYETİK KİBAR İMLEÇ (Daha Soft/Ghost) */}
      <motion.div 
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-white/50 z-[100] pointer-events-none mix-blend-difference flex items-center justify-center"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hoveredItem ? 0 : 1 }}
      >
        <div className="w-1 h-1 bg-white rounded-full" />
      </motion.div>

      {/* 5) HEADER & FOOTER (Kilitli Ekran Sabitleri) */}
      <header className="absolute top-0 w-full z-30 p-8 flex justify-between items-center pointer-events-none mix-blend-difference">
        <div className="text-xl font-bold tracking-tighter text-white pointer-events-auto">
          L U X <br/>
          <span className="text-[9px] tracking-[0.4em] font-normal uppercase text-neutral-400">Photography</span>
        </div>
        <button className="text-[11px] font-bold tracking-[0.2em] uppercase text-white hover:text-neutral-400 transition-colors pointer-events-auto border border-white/20 px-6 py-3 rounded-full flex items-center gap-2">
          <Fingerprint className="w-4 h-4" /> Bize Ulaşın
        </button>
      </header>

      <footer className="absolute bottom-0 w-full z-30 p-8 flex flex-col md:flex-row justify-between items-end md:items-center pointer-events-none mix-blend-difference text-xs text-neutral-400 font-medium tracking-widest uppercase gap-4">
        <div>© 2026 GÖRSEL SANATLAR. AWWWARDS DENEYİMİ.</div>
        <div className="flex gap-6 pointer-events-auto">
          <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Instagram className="w-4 h-4" /> Ig</a>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Mail className="w-4 h-4" /> E-posta</a>
        </div>
      </footer>

    </div>
  )
}
