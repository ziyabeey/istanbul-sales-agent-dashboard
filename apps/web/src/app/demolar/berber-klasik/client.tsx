'use client'

import React, { useEffect } from 'react'
import { Scissors, Coffee, Clock, CheckCircle2 } from 'lucide-react'

const HIZMETLER = [
  { ad: 'Saç Kesimi', fiyat: '₺300', sure: '45 Dk' },
  { ad: 'Sakal Tıraşı', fiyat: '₺200', sure: '30 Dk' },
  { ad: 'Saç & Sakal', fiyat: '₺450', sure: '60 Dk' },
  { ad: 'Çocuk Tıraşı', fiyat: '₺250', sure: '40 Dk' },
  { ad: 'Cilt Bakımı', fiyat: '₺350', sure: '30 Dk' },
  { ad: 'Saç Boyama', fiyat: '₺600', sure: '90 Dk' },
]

export default function BerberKlasikClient() {
  // Vanilla JS Scroll Animation Logic
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
          entry.target.classList.remove('opacity-0', 'translate-y-8')
        }
      })
    }, { threshold: 0.1 })

    const elements = document.querySelectorAll('.reveal-on-scroll')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    // BOXED LAYOUT (PASSEPARTOUT) CONTAINER: Ekranın kenarlarında sabit çerçeve
    <div className="min-h-screen bg-[#FDFBF7] p-4 md:p-8 font-serif text-[#3E362E] selection:bg-[#8B7355] selection:text-white">
      
      {/* İÇ ÇERÇEVE */}
      <div className="relative border border-[#E8E1D7] min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-4rem)] flex flex-col bg-white overflow-hidden shadow-2xl shadow-black/5">
        
        {/* HEADER */}
        <header className="absolute top-0 left-0 right-0 z-50 px-6 py-8 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
          <div className="text-2xl font-bold tracking-[0.2em] uppercase text-white drop-shadow-md">
            Gentleman
          </div>
          <button className="hidden md:block bg-[#8B7355] hover:bg-[#725E45] text-white px-8 py-3 text-sm tracking-widest uppercase transition-colors">
            Randevu Al
          </button>
        </header>

        {/* HERO SECTION */}
        <section className="relative h-[85vh] flex flex-col justify-center items-center text-center px-4">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541533848490-bc8115cd6522?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-[#2C241B]/70" />
          
          <div className="relative z-10 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[#8B7355]"></div>
              <span className="text-[#D4C3B3] tracking-[0.3em] uppercase text-sm font-sans">Kuruluş 1998</span>
              <div className="w-12 h-[1px] bg-[#8B7355]"></div>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-none">
              Gerçek<br/><span className="italic text-[#D4C3B3]">Beyefendiler</span> İçin.
            </h1>
            
            <p className="text-lg text-white/70 max-w-xl mx-auto font-sans font-light mb-10">
              Geleneksel ustura tıraşı, modern saç kesimi ve eşsiz kahve ikramımızla şehrin en iyi berber salonuna hoş geldiniz.
            </p>
            
            <button className="md:hidden bg-[#8B7355] text-white px-10 py-4 text-sm tracking-widest uppercase shadow-lg">
              Randevu Al
            </button>
          </div>
        </section>

        {/* BİLGİ BANDI */}
        <div className="bg-[#3E362E] text-[#D4C3B3] py-6 px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center font-sans text-sm">
          <div className="flex justify-center items-center gap-3">
            <Clock className="w-5 h-5" /> <span>Haftanın 6 Günü Açığız</span>
          </div>
          <div className="flex justify-center items-center gap-3">
            <Coffee className="w-5 h-5" /> <span>Ücretsiz 3. Nesil Kahve</span>
          </div>
          <div className="flex justify-center items-center gap-3">
            <Scissors className="w-5 h-5" /> <span>Uzman Kadro</span>
          </div>
        </div>

        {/* HİZMETLER GRID */}
        <section className="py-24 px-6 md:px-12 bg-[#FDFBF7]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-1000">
              <h2 className="text-4xl text-[#3E362E] mb-4">Hizmetlerimiz</h2>
              <div className="w-16 h-1 bg-[#8B7355] mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {HIZMETLER.map((hizmet, i) => (
                <div 
                  key={i} 
                  className="bg-white border border-[#E8E1D7] p-8 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 hover:shadow-xl hover:border-[#8B7355]/30 cursor-pointer group"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <h3 className="text-2xl mb-2 text-[#3E362E] group-hover:text-[#8B7355] transition-colors">{hizmet.ad}</h3>
                  <div className="flex justify-between items-end mt-6 font-sans">
                    <span className="text-stone-500 text-sm flex items-center gap-1"><Clock className="w-4 h-4"/> {hizmet.sure}</span>
                    <span className="text-2xl font-bold text-[#8B7355]">{hizmet.fiyat}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HAKKIMIZDA (SPLIT) */}
        <section className="border-t border-[#E8E1D7] flex flex-col md:flex-row reveal-on-scroll opacity-0 translate-y-8 transition-all duration-1000">
          <div className="md:w-1/2 bg-[#3E362E] text-[#FDFBF7] p-12 lg:p-24 flex flex-col justify-center">
            <h2 className="text-4xl mb-6">Ustalık ve Gelenek.</h2>
            <p className="font-sans font-light text-[#D4C3B3] leading-relaxed mb-8">
              1998 yılından beri aynı özen ve tutkuyla çalışıyoruz. Her saç telinin, her sakal kıvrımının bir karakteri olduğuna inanıyoruz. Size sadece bir tıraş değil, kendinizi bulacağınız bir deneyim vadediyoruz.
            </p>
            <ul className="space-y-3 font-sans text-sm text-[#D4C3B3]">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#8B7355]" /> Hijyenik ve tek kullanımlık ekipmanlar</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#8B7355]" /> Dünyaca ünlü ithal bakım ürünleri</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#8B7355]" /> Size özel ayrılmış VIP koltuklar</li>
            </ul>
          </div>
          <div className="md:w-1/2 h-[400px] md:h-auto bg-[url('https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center" />
        </section>

        {/* FOOTER */}
        <footer className="bg-white border-t border-[#E8E1D7] py-12 px-6 text-center font-sans text-stone-500 text-sm">
          <p className="mb-2 uppercase tracking-widest text-[#3E362E] font-bold">Gentleman Barber Shop</p>
          <p className="mb-6">Bağdat Caddesi No:123 Kadıköy / İstanbul</p>
          <p className="text-xs">© 2026 Kepenk.ai Tarafından Oluşturulmuştur.</p>
        </footer>

      </div>
    </div>
  )
}
