'use client'

import React from 'react'
import { Search, Menu, Instagram, Mail } from 'lucide-react'

// STATİK VERİLER
const FOTOGRAFLAR = [
  { url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800', baslik: 'Sokak Portresi', boyut: 'uzun' },
  { url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800', baslik: 'Doğa & Macera', boyut: 'kare' },
  { url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800', baslik: 'Etkinlik Çekimi', boyut: 'genis' },
  { url: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&q=80&w=800', baslik: 'Karanlık Oda', boyut: 'kare' },
  { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800', baslik: 'Stüdyo Portresi', boyut: 'uzun' },
  { url: 'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?auto=format&fit=crop&q=80&w=800', baslik: 'Ürün Çekimi', boyut: 'genis' },
  { url: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=800', baslik: 'Moda Editöryal', boyut: 'kare' },
]

export default function FotoPortreClient() {
  return (
    // PURE VISUAL MINIMAL GRID LAYOUT
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-200">
      
      {/* STICKY MINIMAL HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <button className="text-zinc-500 hover:text-black transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden md:flex gap-6 text-sm font-medium tracking-wide">
              <a href="#" className="text-black border-b border-black pb-1">Portfolyo</a>
              <a href="#" className="text-zinc-500 hover:text-black transition-colors">Hizmetler</a>
              <a href="#" className="text-zinc-500 hover:text-black transition-colors">Hakkımda</a>
            </div>
          </div>
          
          <div className="text-2xl font-black tracking-tighter uppercase relative">
            Lens<span className="text-blue-600">.</span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[0.6rem] font-bold tracking-widest text-zinc-400 w-max">
              FOTOĞRAFÇILIK
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="hidden md:flex text-sm font-medium tracking-wide bg-zinc-900 text-white px-5 py-2 hover:bg-zinc-800 transition-colors">
              İletişime Geç
            </button>
            <button className="text-zinc-500 hover:text-black transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* MASONRY-STYLE CSS GRID PORTFOLIO */}
      {/* Burada çok az metin, tamamen görsel odaklı bir asimetrik izgara var */}
      <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-12">
        
        {/* Intro Metni (Çok sade) */}
        <div className="mb-16 md:mb-24 mt-12 text-center md:text-left md:flex justify-between items-end">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight max-w-2xl leading-tight">
            Işığı yakalamak, <br/><span className="font-semibold">anı dondurmaktan fazlasıdır.</span>
          </h1>
          <p className="text-zinc-500 mt-6 md:mt-0 font-medium tracking-wide text-sm hidden md:block">
            İSTANBUL BAZLI <br/>BAĞIMSIZ FOTOĞRAF STÜDYOSU
          </p>
        </div>

        {/* CSS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">
          {FOTOGRAFLAR.map((foto, index) => (
            <div 
              key={index}
              className={`group relative overflow-hidden bg-zinc-100 cursor-crosshair
                ${foto.boyut === 'uzun' ? 'row-span-2' : ''}
                ${foto.boyut === 'genis' ? 'md:col-span-2' : ''}
              `}
            >
              <img 
                src={foto.url} 
                alt={foto.baslik}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                <h3 className="text-white text-xl md:text-2xl font-light tracking-wide mix-blend-screen scale-110 group-hover:scale-100 transition-transform duration-500">
                  {foto.baslik}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-100 mt-20">
        <div className="max-w-[1600px] mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-black tracking-tighter uppercase text-zinc-300">
            Lens<span className="text-zinc-400">.</span>
          </div>
          
          <div className="flex gap-8 text-zinc-500 text-sm font-medium">
            <a href="#" className="hover:text-black transition-colors flex items-center gap-2"><Instagram className="w-4 h-4"/> Instagram</a>
            <a href="#" className="hover:text-black transition-colors flex items-center gap-2"><Mail className="w-4 h-4"/> E-Posta</a>
          </div>
          
          <div className="text-xs text-zinc-400 font-medium tracking-widest uppercase">
            © 2026 Kepenk.ai
          </div>
        </div>
      </footer>

    </div>
  )
}
