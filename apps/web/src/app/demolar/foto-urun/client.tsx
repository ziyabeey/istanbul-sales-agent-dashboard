'use client'

import React, { useRef } from 'react'
import { ArrowLeft, ArrowRight, Camera, MonitorPlay, Focus } from 'lucide-react'

// STATİK VERİLER
const FOTOGRAFLAR = [
  { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200', ad: 'Kulaklık Prodüksiyon' },
  { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200', ad: 'Saat Kampanyası' },
  { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200', ad: 'Spor Ayakkabı Lansman' },
  { url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=1200', ad: 'Polaroid Nostalji' },
]

const HIZMETLER = [
  { ikon: <Camera className="w-6 h-6"/>, baslik: 'Ürün Fotoğrafçılığı', aciklama: 'E-ticaret ve kataloglar için yüksek çözünürlüklü, marka kimliğine uygun beyaz fon & konsept çekimler.' },
  { ikon: <MonitorPlay className="w-6 h-6"/>, baslik: 'Reklam Filmleri', aciklama: 'Sosyal medya ve televizyon için dikkat çekici, senaryolu ve prodüksiyon kalitesi yüksek stop-motion / video işleri.' },
  { ikon: <Focus className="w-6 h-6"/>, baslik: 'Retouch & Manipülasyon', aciklama: 'Görsellerinizin kusursuz görünmesi için üst düzey renk düzenlemesi, temizlik ve kompozit tasarım.' },
]

export default function FotoUrunClient() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const hScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth * 0.6 // 60vw kadar kaydır (sağ panel genişliği)
      scrollRef.current.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    // STANDART TIER: YARI YARIYA SPLIT CAROUSEL TOPOLOJİSİ
    <div className="bg-[#0f0f11] text-white font-sans selection:bg-indigo-500/30">
      
      {/* 100VH SPLIT HERO SECTİON */}
      <section className="flex flex-col lg:flex-row h-screen w-full">
        
        {/* SOL: SABİT METİN VE MARKA (40%) */}
        <div className="w-full lg:w-[40%] h-[50vh] lg:h-full bg-[#0a0a0c] p-10 lg:p-20 flex flex-col justify-between border-r border-white/10 z-10">
          <div>
            <div className="text-xl font-bold tracking-widest uppercase mb-12 flex items-center gap-3">
              <div className="w-4 h-4 bg-indigo-500 rounded-sm" />
              Lumina Stüdyo
            </div>
            
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1] mb-6">
              Ürününüzün <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Gerçek Potansiyelini</span> <br />
              Ortaya Çıkarın.
            </h1>
            
            <p className="text-neutral-400 text-lg max-w-sm mb-12">
              Modern markalar için etkileyici, dönüşüm odaklı ürün fotoğrafçılığı ve reklam kampanyaları üretiyoruz.
            </p>
          </div>

          <div className="space-y-6">
            <button className="bg-white text-black font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-transparent hover:text-white border border-white transition-colors w-max">
              Projeyi Başlat
            </button>
            <div className="flex gap-4 text-neutral-500 text-sm font-medium">
              <span className="hover:text-white cursor-pointer transition-colors">Behance</span>
              <span>/</span>
              <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
            </div>
          </div>
        </div>

        {/* SAĞ: YATAY KAYDIRILABİLİR CAROUSEL (60%) */}
        <div className="w-full lg:w-[60%] h-[50vh] lg:h-full relative group">
          
          {/* Native CSS Scroll Snap Konteyneri */}
          <div 
            ref={scrollRef}
            className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {FOTOGRAFLAR.map((foto, i) => (
              <div key={i} className="min-w-full h-full snap-start snap-always relative">
                <img src={foto.url} alt={foto.ad} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 text-white">
                  <p className="text-xs font-bold tracking-[0.2em] text-indigo-400 uppercase mb-2">Kampanya {i+1}</p>
                  <h2 className="text-3xl font-bold">{foto.ad}</h2>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Kontrolleri (Desktop) */}
          <div className="hidden lg:flex absolute bottom-10 right-10 gap-3">
            <button onClick={() => hScroll('left')} className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button onClick={() => hScroll('right')} className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors rounded-full">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* DETAYLI HİZMETLER BÖLÜMÜ (Normal Dikey Scroll) */}
      <section className="py-24 px-10 lg:px-20 max-w-[1600px] mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Nasıl Çalışıyoruz?</h2>
          <p className="text-neutral-500 max-w-xl">Konsept aşamasından teslimata kadar her detayı markanızın diline uygun olarak kurguluyoruz.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {HIZMETLER.map((h, i) => (
            <div key={i} className="border-t border-white/10 pt-8 group cursor-pointer">
              <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 flex items-center justify-center rounded-xl mb-6 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                {h.ikon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{h.baslik}</h3>
              <p className="text-neutral-400 leading-relaxed text-sm">
                {h.aciklama}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 px-10 lg:px-20 mt-12 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600 font-medium tracking-widest uppercase">
        <p>© 2026 Lumina Prodüksiyon</p>
        <p>Gizlilik ve Şartlar</p>
      </footer>
      
      {/* Scrollbar-hide utility for global injection if needed (Tailwind usually requires a plugin, so we inline it above or inject here) */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}} />

    </div>
  )
}
