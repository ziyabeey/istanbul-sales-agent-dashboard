'use client'

import React, { useEffect, useRef } from 'react'
import { ArrowRight, MapPin, Instagram, Facebook } from 'lucide-react'

// STATİK VERILER
const HIZMETLER = [
  { no: '01', isim: 'İmza Saç Kesimi', aciklama: 'Kafa yapınıza ve tarzınıza en uygun kişiselleştirilmiş modern kesim.', fiyat: '₺400' },
  { no: '02', isim: 'VIP Sakal Tasarımı', aciklama: 'Sıcak havlu, ustura ve aromaterapik yağlar ile geleneksel ritüel.', fiyat: '₺300' },
  { no: '03', isim: 'Keratin Bakımı', aciklama: 'Yıpranmış saçlar için anında onarım ve parlaklık sağlayan lüks bakım.', fiyat: '₺800' },
  { no: '04', isim: 'Damat Tıraşı (Paket)', aciklama: 'En özel gününüz için saç, sakal, cilt bakımı ve masaj içeren tam gün paketi.', fiyat: '₺1500' }
]

export default function BerberModernClient() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Parallax & Reveal Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
          entry.target.classList.remove('opacity-0', 'translate-y-12')
        }
      })
    }, { threshold: 0.15 })

    const elements = document.querySelectorAll('.animate-me')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    // MODERN BÜYÜME (MAGAZINE EDITORIAL) KONSEPTİ
    <div ref={containerRef} className="min-h-screen bg-[#F5F5F5] text-neutral-900 font-sans tracking-tight selection:bg-black selection:text-white">
      
      {/* HEADER - Minimal Kayan Üst Menü */}
      <header className="fixed w-full top-0 z-50 mix-blend-difference text-white px-6 py-6 flex justify-between items-center pointer-events-none">
        <div className="text-xl font-bold tracking-tighter mix-blend-difference pointer-events-auto cursor-pointer">
          STUDIO<span className="text-red-500">.</span>
        </div>
        <button className="text-sm font-medium tracking-widest uppercase flex items-center gap-2 hover:gap-4 transition-all pointer-events-auto">
          Randevu <ArrowRight className="w-4 h-4" />
        </button>
      </header>

      {/* EDİTORYAL GRID HERO (Checkerboard Asymmetrical) */}
      <section className="pt-32 pb-20 px-4 md:px-8 max-w-[1800px] mx-auto min-h-[90vh] flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 auto-rows-[150px] lg:auto-rows-[minmax(200px,auto)]">
          
          {/* Typo Block (Span 5) */}
          <div className="lg:col-span-5 lg:row-span-2 flex flex-col justify-end pb-8 animate-me opacity-0 translate-y-12 transition-all duration-1000 ease-out">
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-bold leading-[0.85] tracking-tighter mb-6">
              Modern<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-800 to-neutral-400">Erkek</span><br />
              Stüdyosu.
            </h1>
            <p className="text-lg md:text-xl text-neutral-500 max-w-sm font-light">
              Geleneksel kuralları yıkıyoruz. Saç tasarımında yeni nesil bir estetik anlayışı.
            </p>
          </div>

          {/* Tall Image (Span 4, Row 2) */}
          <div className="hidden lg:block lg:col-span-4 lg:row-span-2 relative overflow-hidden group animate-me opacity-0 translate-y-12 transition-all duration-1000 delay-200">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105" />
          </div>

          {/* Square Text Block (Span 3) */}
          <div className="lg:col-span-3 lg:row-span-1 bg-black text-white p-8 flex flex-col justify-between animate-me opacity-0 translate-y-12 transition-all duration-1000 delay-300">
            <div className="text-3xl font-light">"Tarz, kim olduğunuzu söylemenin konuşmadan yoludur."</div>
            <div className="text-sm text-neutral-400 uppercase tracking-widest mt-8">— Studio Felsefesi</div>
          </div>

          {/* Square Image Block (Span 3) */}
          <div className="lg:col-span-3 lg:row-span-1 relative animate-me opacity-0 translate-y-12 transition-all duration-1000 delay-400">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-4 left-4 text-white text-xs tracking-widest uppercase">Estetik / 2026</div>
          </div>
        </div>
      </section>

      {/* MARQUEE TEXT ANIMATION (Vanilla CSS kullanarak Sonsuz Kayan Bant) */}
      <div className="w-full bg-black text-white py-4 overflow-hidden -rotate-1 scale-105 my-20">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] opacity-80 mix-blend-screen text-4xl font-bold uppercase tracking-tighter">
          &nbsp;STUDIO BARBER • YENİ NESİL KESİM • ERKEK BAKIM MERKEZİ • VIP DENEYİM • STUDIO BARBER • YENİ NESİL KESİM • ERKEK BAKIM MERKEZİ • VIP DENEYİM •
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}} />

      {/* ZİGZAG LIST SECTION (Hizmetler) */}
      <section className="py-24 px-4 md:px-8 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 animate-me opacity-0 translate-y-12 transition-all duration-1000">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Hizmetlerimiz</h2>
          <p className="text-neutral-500 max-w-sm text-lg mt-4 md:mt-0 font-light">Endüstri standartlarının ötesinde, her detayıyla kusursuzlaştırılmış bakım ritüelleri.</p>
        </div>

        <div className="space-y-4">
          {HIZMETLER.map((hizmet, i) => (
            <div 
              key={i} 
              className="group flex flex-col md:flex-row items-baseline gap-4 md:gap-12 p-8 bg-white border border-neutral-100 hover:border-black transition-all cursor-pointer animate-me opacity-0 translate-y-12 duration-700"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <span className="text-2xl text-neutral-300 font-bold group-hover:text-red-500 transition-colors">{hizmet.no}</span>
              <div className="flex-1">
                <h3 className="text-3xl font-bold tracking-tighter mb-2 group-hover:translate-x-4 transition-transform duration-500">{hizmet.isim}</h3>
                <p className="text-neutral-500 max-w-2xl">{hizmet.aciklama}</p>
              </div>
              <span className="text-2xl font-bold tracking-tight">{hizmet.fiyat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* MİNİMAL BÜYÜK KATALOG FOOTER */}
      <footer className="bg-neutral-900 text-white pt-32 pb-12 px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-end gap-16 border-b border-neutral-800 pb-16 mb-8">
          <div>
            <h2 className="text-5xl md:text-[6rem] font-bold tracking-tighter leading-none mb-8">Bize Katıl.</h2>
            <button className="bg-white text-black px-12 py-5 text-xl font-bold hover:bg-red-500 hover:text-white transition-colors tracking-tight">
              Randevu Oluştur
            </button>
          </div>
          <div className="flex flex-col gap-6 text-neutral-400">
            <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><MapPin /> Levent, Büyükdere Cd. Şişli</div>
            <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><Instagram /> @studio_barber</div>
            <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><Facebook /> /studiobarber</div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto flex justify-between text-neutral-600 text-sm">
          <span>© 2026 Kepenk.ai</span>
          <span>Büyüme (Growth) Paket Demostrasyonu</span>
        </div>
      </footer>

    </div>
  )
}
