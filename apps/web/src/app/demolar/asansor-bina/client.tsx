'use client'

import React, { useRef, useState } from 'react'

export default function AsansorBinaStarterTier() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState(0)

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 300
      sliderRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-800 font-sans">
      
      {/* TOP BAR */}
      <div className="bg-amber-500 text-neutral-900 py-1.5 px-4 text-xs font-bold flex justify-between tracking-wide uppercase">
        <span className="max-w-6xl mx-auto w-full flex justify-between">
          <span>7/24 Acil Asansör Servisi</span>
          <span className="hidden sm:inline">Tel: +90 212 555 00 00</span>
        </span>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 w-full bg-white shadow-sm z-50 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 22V2H20V22M8 22V6H16V22M11 11H13V13H11V11Z" fill="#F59E0B" />
            </svg>
            <span className="text-xl font-black tracking-tighter text-neutral-900">BİNA VİZYON</span>
          </div>
          <nav className="hidden md:flex gap-6 text-xs font-bold text-neutral-500 uppercase tracking-widest">
            <a href="#kurumsal" className="hover:text-amber-600 transition-colors">Kurumsal</a>
            <a href="#hizmetler" className="hover:text-amber-600 transition-colors">Hizmetler</a>
            <a href="#projeler" className="hover:text-amber-600 transition-colors">Projeler</a>
          </nav>
          <a href="#iletisim" className="border-2 border-neutral-900 text-neutral-900 px-4 py-1.5 text-xs font-bold uppercase hover:bg-neutral-900 hover:text-white transition-colors">
            Teklif Al
          </a>
        </div>
      </header>

      {/* HERO SECTION - FULL BACKGROUND W/ OVERLAPPING BRICKS */}
      <section className="relative min-h-[85vh] bg-neutral-900 flex flex-col justify-end pt-32 pb-40 px-4">
        {/* Background Image / Pattern */}
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1541888004659-40da8209ad73?auto=format&fit=crop&w=1920&q=80" alt="Asansör Background" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-transparent"></div>
        </div>
        
        <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-amber-500"></div>
              <span className="text-amber-500 font-bold uppercase tracking-[0.3em] text-sm">Kurumsal Sistemler</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-6 uppercase tracking-tighter leading-[0.9] text-white">
              GELECEĞİN <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">YAPILARINA</span> <br/>
              YÜKSELİŞ.
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 font-medium max-w-xl border-l-4 border-neutral-700 pl-4">
              Konut, AVM ve hastaneler için yüksek kapasiteli, A sınıfı enerji verimli asansör sistemleri üretiyor ve bakımını yapıyoruz.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="bg-neutral-800/80 backdrop-blur-md p-6 border border-neutral-700 max-w-sm">
              <div className="text-4xl font-black text-white mb-1 tracking-tighter">15<span className="text-amber-500">+</span></div>
              <div className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Yıllık Tecrübe</div>
            </div>
            <div className="bg-amber-500 p-6 max-w-sm cursor-pointer hover:bg-amber-400 transition-colors group">
              <a href="#iletisim" className="flex items-center justify-between">
                <div>
                  <div className="text-xl font-black text-neutral-900 uppercase">Hemen Ulaşın</div>
                  <div className="text-sm font-bold text-neutral-900/70">Ücretsiz keşif talebi oluştur</div>
                </div>
                <div className="w-10 h-10 bg-neutral-900 flex items-center justify-center text-amber-500 rounded-full group-hover:scale-110 transition-transform">→</div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* KURUMSAL TABS SECTION */}
      <section id="kurumsal" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-black text-neutral-900 mb-8 uppercase tracking-tighter">Neden Bina Vizyon?</h2>
            <div className="flex flex-col gap-2">
              {['Uzman Mühendislik', '7/24 Teknik Destek', 'Avrupa Standartları'].map((tab, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveTab(i)}
                  className={`text-left px-6 py-4 font-bold uppercase tracking-wide border-l-4 transition-all ${activeTab === i ? 'border-amber-500 bg-amber-50 text-neutral-900' : 'border-neutral-200 text-neutral-400 hover:bg-neutral-50'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="md:w-2/3 bg-neutral-50 p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 rounded-bl-full opacity-10 pointer-events-none"></div>
            {activeTab === 0 && (
              <div>
                <h3 className="text-2xl font-black mb-4 uppercase">Uzman Mühendislik</h3>
                <p className="text-neutral-600 leading-relaxed mb-6">Sektörde 15 yılı aşkın deneyime sahip mühendislik ekibimiz, binanızın trafiğine, taşıma kapasitesine ve enerji verimliliğine en uygun çözümü projeden anahtar teslime kadar yönetir.</p>
                <ul className="grid grid-cols-2 gap-3 text-sm font-bold text-neutral-700">
                  <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> Proje Çizimi</li>
                  <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> Kabin Tasarımı</li>
                  <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> Kurulum</li>
                </ul>
              </div>
            )}
            {activeTab === 1 && (
              <div>
                <h3 className="text-2xl font-black mb-4 uppercase">7/24 Teknik Destek</h3>
                <p className="text-neutral-600 leading-relaxed">Asansör arızalarının zamana veya saate bakmadığını biliyoruz. Türkiye'nin her noktasına maksimum 2 saat içerisinde müdahale eden mobil ekiplerimiz her zaman hazır.</p>
              </div>
            )}
            {activeTab === 2 && (
              <div>
                <h3 className="text-2xl font-black mb-4 uppercase">Avrupa Standartları</h3>
                <p className="text-neutral-600 leading-relaxed">Tüm sistemlerimiz CE sertifikalı olup EN 81-20/50 standartlarına göre üretilmektedir. Can güvenliği birinci önceliğimizdir.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* VANILLA SLIDER SECTION (PROJELER) */}
      <section id="projeler" className="py-24 bg-neutral-100 border-y border-neutral-200 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 mb-10 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-black text-neutral-900 uppercase tracking-tighter">Referans Projeler</h2>
            <p className="text-neutral-500 mt-2">Tamamlanan güncel montajlarımızdan bazıları.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scrollSlider('left')} className="w-10 h-10 border border-neutral-300 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-colors">
              &lt;
            </button>
            <button onClick={() => scrollSlider('right')} className="w-10 h-10 bg-neutral-900 text-white flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors">
              &gt;
            </button>
          </div>
        </div>

        <div ref={sliderRef} className="flex gap-6 overflow-x-auto px-4 max-w-6xl mx-auto snap-x scrollbar-hide pb-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {[1,2,3,4,5].map((item) => (
            <div key={item} className="min-w-[300px] sm:min-w-[400px] bg-white border border-neutral-200 snap-center group">
              <div className="w-full h-48 bg-neutral-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-neutral-800 opacity-20 group-hover:opacity-0 transition-opacity"></div>
                {/* Placeholder Image Graphic */}
                <div className="w-full h-full flex items-center justify-center text-neutral-400 font-bold text-4xl">
                  {item}
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs font-bold text-amber-500 mb-2 uppercase tracking-widest">Rezidans Projesi</div>
                <h3 className="text-xl font-black text-neutral-900 mb-2 uppercase">Güneşli Blokları</h3>
                <p className="text-neutral-500 text-sm">4 Adet 800kg Yolcu Asansörü montajı ve ruhsatlandırma işlemi.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-neutral-900 text-neutral-400 py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-black text-white uppercase tracking-tighter mb-4">BİNA VİZYON</div>
            <p className="text-sm max-w-sm">Modern binaların güvenli ve hızlı dikey taşıma çözümleri üretiyoruz.</p>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase mb-4">İletişim</h4>
            <ul className="space-y-2 text-sm">
              <li>0 212 555 00 00</li>
              <li>info@binavizyon.demo</li>
              <li>Şişli, İstanbul</li>
            </ul>
          </div>
          <div>
            <div className="text-xs scale-90 opacity-50 px-3 py-1 border border-neutral-700 rounded-sm inline-block">⚡ Powered by kepenk.ai</div>
          </div>
        </div>
      </footer>

    </div>
  )
}
