'use client'

import React from 'react'
import { MapPin, Phone, Clock, Scissors, Activity, Droplet } from 'lucide-react'

// STATİK VERİLER
const HIZMETLER = [
  { ad: 'Klasik Saç Kesimi', fiyat: '₺350', ikon: <Scissors className="w-5 h-5" /> },
  { ad: 'Geleneksel Sakal Tıraşı', fiyat: '₺250', ikon: <Activity className="w-5 h-5" /> },
  { ad: 'Cilt Bakımı & Maske', fiyat: '₺400', ikon: <Droplet className="w-5 h-5" /> },
  { ad: 'Saç & Sakal Kombo', fiyat: '₺550', ikon: <Scissors className="w-5 h-5" /> },
]

export default function BerberSadeClient() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col lg:flex-row font-sans text-stone-900 selection:bg-stone-300">
      
      {/* 1) SİDEBAR (SOL SABİT KOLON) - TEMEL PAKET İSKELETİ (FIXED SIDEBAR TOPO) */}
      <aside className="lg:w-[320px] lg:fixed lg:h-screen lg:top-0 lg:left-0 bg-white border-r border-stone-200 flex flex-col justify-between p-8 md:p-12 z-20">
        <div>
          <div className="font-serif text-3xl font-bold tracking-tight mb-2">
            ATELIER<span className="text-stone-400">.</span>
          </div>
          <p className="text-stone-500 text-sm tracking-widest uppercase mb-12 font-medium">
            Erkek Kuaförü
          </p>

          <nav className="hidden lg:flex flex-col gap-6 text-sm font-semibold tracking-wide text-stone-600">
            <a href="#hizmetler" className="hover:text-black transition-colors">Hizmetlerimiz</a>
            <a href="#hakkimizda" className="hover:text-black transition-colors">Hakkımızda</a>
            <a href="#iletisim" className="hover:text-black transition-colors">İletişim</a>
          </nav>
        </div>

        <div className="mt-12 lg:mt-0">
          <div className="mb-8 space-y-4">
            <div className="flex items-start gap-3 text-stone-500 text-sm">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <p>Nişantaşı, Teşvikiye Cd.<br/>Şişli / İstanbul</p>
            </div>
            <div className="flex items-center gap-3 text-stone-500 text-sm">
              <Phone className="w-4 h-4 shrink-0" />
              <p>0212 555 44 33</p>
            </div>
          </div>
          
          <button className="w-full bg-black text-white py-4 text-sm font-bold tracking-widest uppercase hover:bg-stone-800 transition-colors">
            Hemen Randevu Al
          </button>
        </div>
      </aside>

      {/* 2) ANA İÇERİK (SAĞ TARAF SCROLL) */}
      <main className="flex-1 lg:ml-[320px] flex flex-col">
        
        {/* Hero Section */}
        <section className="relative h-[60vh] lg:h-[80vh] w-full bg-stone-200">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/30" />
          
          <div className="absolute bottom-0 left-0 p-8 md:p-16 text-white max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
              Klasik Dokunuş,<br />Modern Tarz.
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-light">
              Şehrin merkezinde, sadece bir tıraş değil, kendinize ayırdığınız bir saatlik lüks deneyimi sunuyoruz.
            </p>
          </div>
        </section>

        {/* Hizmetler Section */}
        <section id="hizmetler" className="py-20 px-8 md:px-16 md:py-32 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-serif mb-12 text-stone-400">01 / MENÜ</h2>
            
            <div className="space-y-0">
              {HIZMETLER.map((hizmet, i) => (
                <div key={i} className="group border-b border-stone-200 py-6 flex items-center justify-between hover:bg-stone-50 px-4 -mx-4 transition-colors cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 group-hover:bg-white transition-colors">
                      {hizmet.ikon}
                    </div>
                    <span className="text-lg md:text-xl font-medium tracking-tight">{hizmet.ad}</span>
                  </div>
                  <span className="font-serif text-lg md:text-xl text-stone-500">{hizmet.fiyat}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Çalışma Saatleri & Bilgi */}
        <section id="hakkimizda" className="py-20 px-8 md:px-16 bg-stone-900 text-stone-300">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-white text-3xl font-serif mb-8">Atelier Felsefesi</h2>
              <p className="leading-relaxed font-light text-stone-400">
                Geleneksel berberlik sanatını günümüzün modern beklentileriyle harmanlıyoruz. Kullanılan ürünlerden, ikram edilen kahveye kadar her detayda kaliteyi hissedeceksiniz. Bizim için her misafir, yeni bir başyapıttır.
              </p>
            </div>
            
            <div className="border border-stone-800 p-8 bg-black/20">
              <h3 className="text-white mb-6 font-medium text-lg flex items-center gap-3">
                <Clock className="w-5 h-5 text-stone-500" />
                Çalışma Saatleri
              </h3>
              <ul className="space-y-4 font-light text-sm">
                <li className="flex justify-between border-b border-stone-800 pb-2">
                  <span>Pazartesi - Cuma</span>
                  <span className="text-white">09:00 - 20:00</span>
                </li>
                <li className="flex justify-between border-b border-stone-800 pb-2">
                  <span>Cumartesi</span>
                  <span className="text-white">09:00 - 19:00</span>
                </li>
                <li className="flex justify-between pb-2 text-stone-500">
                  <span>Pazar</span>
                  <span>Kapalı</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Basit Footer */}
        <footer className="py-8 px-8 md:px-16 text-xs text-stone-400 bg-stone-950 flex justify-between items-center">
          <p>© 2026 Atelier Kuaför.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
          </div>
        </footer>

      </main>
    </div>
  )
}
