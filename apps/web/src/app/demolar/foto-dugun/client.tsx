'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play, Camera } from 'lucide-react'

// HİKAYE BÖLÜMLERİ
const HIKAYE = [
  {
    baslik: 'Hazırlık',
    alt: 'HEYECANIN BAŞLANGICI',
    detay: 'Sabahın ilk ışıklarıyla başlayan telaş, detaylarda saklı zarafet ve o büyük ana hazırlanırken yaşanan saf heyecan.',
    gorsel: 'https://images.unsplash.com/photo-1541250848049-b4f7146120e2?auto=format&fit=crop&q=80&w=1200'
  },
  {
    baslik: 'İlk Bakış',
    alt: 'ZAMANI DURDURAN AN',
    detay: 'Birbirinizi ilk gördüğünüz o saniye... Gözlerdeki parıltı, dökülen bir damla mutluluk gözyaşı ve tarifsiz bir büyü.',
    gorsel: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200'
  },
  {
    baslik: 'Tören',
    alt: 'SONSUZLUK SÖZÜ',
    detay: 'Sevdiklerinizin şahitliğinde, hayatlarınızı birleştiren o kutsal sözcüklerin sarf edildiği ihtişamlı anlar.',
    gorsel: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200'
  },
  {
    baslik: 'Kutlama',
    alt: 'IŞIKLAR VE DANSLAR',
    detay: 'Resmiyetin yerini coşkuya bıraktığı, gece yarısına kadar süren kahkaha, müzik ve dans dolu muhteşem kutlama.',
    gorsel: 'https://images.unsplash.com/photo-1530103862676-de88d1f737bb?auto=format&fit=crop&q=80&w=1200'
  }
]

export default function FotoDugunClient() {
  const targetRef = useRef<HTMLDivElement>(null)
  
  // Framer Motion Yatay Kaydırma (Horizontal Scroll) Hook'ları
  const { scrollYProgress } = useScroll({ 
    target: targetRef,
    offset: ["start start", "end end"] 
  })
  
  // 4 ekran genişliğinde bölüm olduğu için %-75'e kadar kaydırıyoruz (100% / 4 = 25% her bir ekran)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"])

  // Son ekranda opacity azaltmak için maske
  const opacityOverlay = useTransform(scrollYProgress, [0.8, 1], [0, 0.8])

  return (
    // PREMIUM TIER: TAM EKRAN YATAY KAYDIRMA (HORIZONTAL SCROLL) TOPOLOJİSİ
    <div className="bg-[#1C1F1D] text-[#ECEADC] font-serif selection:bg-[#B5A38C] selection:text-[#1C1F1D]">
      
      {/* SABİT HEADER */}
      <header className="fixed top-0 w-full z-50 p-6 md:p-10 flex justify-between items-center mix-blend-difference pointer-events-none">
        <div className="text-xl tracking-[0.3em] uppercase pointer-events-auto">
          AURA <br/>
          <span className="text-[10px] tracking-[0.5em] font-sans text-neutral-400">Weddings</span>
        </div>
        <div className="flex gap-6 pointer-events-auto font-sans text-xs tracking-widest font-bold">
          <button className="hover:text-[#B5A38C] transition-colors">Portfolyo</button>
          <button className="hover:text-[#B5A38C] transition-colors">İletişim</button>
        </div>
      </header>

      {/* HORIZONTAL KAYDIRMA ALANI (Kullanıcı aşağı indikçe sağdan sola akar) */}
      <section ref={targetRef} className="h-[400vh] relative">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center bg-[#151715]">
          
          <motion.div style={{ x }} className="flex h-full w-[400vw]">
            
            {HIKAYE.map((bolum, i) => (
              <div key={i} className="w-screen h-full flex flex-col md:flex-row items-center justify-center p-8 md:p-24 relative overflow-hidden shrink-0">
                
                {/* SOL: Tipografi ve HİKAYE */}
                <div className="w-full md:w-1/2 flex flex-col justify-center h-full z-20 md:pr-12 md:pl-20">
                  <div className="font-sans text-[10px] md:text-xs tracking-[0.4em] text-[#B5A38C] mb-6 md:mb-12 font-bold uppercase">
                    Bölüm 0{i+1} — {bolum.alt}
                  </div>
                  <h2 className="text-6xl md:text-8xl lg:text-9xl mb-8 tracking-tighter leading-none italic font-normal">
                    {bolum.baslik}.
                  </h2>
                  <p className="font-sans text-sm md:text-base text-neutral-400 max-w-sm leading-relaxed font-light">
                    {bolum.detay}
                  </p>
                  
                  {i === 3 && (
                    <button className="mt-16 w-max border border-[#B5A38C] text-[#B5A38C] px-10 py-4 font-sans text-xs tracking-[0.3em] uppercase hover:bg-[#B5A38C] hover:text-[#1C1F1D] transition-colors flex items-center gap-4 group">
                      Bizimle İletişime Geç <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </button>
                  )}
                </div>

                {/* SAĞ: Devasa Görsel Maskesi */}
                <div className="w-full md:w-1/2 h-1/2 md:h-[80%] relative overflow-hidden mt-8 md:mt-0 group">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-110"
                    style={{ backgroundImage: `url(${bolum.gorsel})` }} 
                  />
                  <div className="absolute inset-0 bg-[#1C1F1D]/10" />
                  
                  {/* Sadece estetik amaçlı Video Oynatma İkonu (İlk Görselde) */}
                  {i === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-24 h-24 rounded-full border border-white/30 backdrop-blur-sm flex items-center justify-center text-white/70 group-hover:bg-white/10 group-hover:text-white transition-all">
                        <Play className="w-8 h-8 ml-2" />
                      </div>
                    </div>
                  )}
                </div>

              </div>
            ))}

          </motion.div>

          {/* En sonda Contact Info'yu hafifçe hissettirmek için Overlay */}
          <motion.div 
            style={{ opacity: opacityOverlay }}
            className="absolute inset-0 pointer-events-none bg-[#1C1F1D] z-30 flex items-center justify-center"
          >
            <div className="text-center">
              <Camera className="w-12 h-12 text-[#B5A38C] mx-auto mb-8 opacity-50" />
              <h1 className="text-5xl md:text-7xl font-sans font-black tracking-tighter mb-4 text-white">Hikayeniz Başlıyor.</h1>
              <p className="text-[#B5A38C] tracking-[0.3em] font-sans text-xs uppercase cursor-pointer pointer-events-auto hover:text-white transition-colors">info@auraweddings.com</p>
            </div>
          </motion.div>

        </div>
      </section>
      
      {/* İlerlemeyi Gösteren İnce Alt Bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-[#151715] z-50">
        <motion.div 
          style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
          className="h-full bg-[#B5A38C]"
        />
      </div>
      
      {/* Kaydırma Talimatı */}
      <div className="fixed bottom-8 right-10 z-50 mix-blend-difference font-sans text-[10px] tracking-[0.3em] uppercase hidden md:flex items-center gap-3 text-white/50 animate-pulse">
        Aşağı Kaydırın <ArrowRight className="w-3 h-3" />
      </div>

    </div>
  )
}
