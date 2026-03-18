'use client'

import React, { useEffect, useRef } from 'react'
import { Heart, Stars, CalendarHeart } from 'lucide-react'

// STATİK VERİLER
const FOTOGRAFLAR = [
  { url: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800', baslik: 'İlk Bakış', rotasyon: '-rotate-3', margin: 'mt-0 md:mt-[30vh] ml-[5vw]', hiz: '0.8' },
  { url: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&q=80&w=800', baslik: 'Minik Eller', rotasyon: 'rotate-6', margin: 'mt-[10vh] md:mt-[50vh] ml-auto mr-[10vw]', hiz: '1.2' },
  { url: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=800', baslik: 'Hoşgeldin', rotasyon: '-rotate-2', margin: 'mt-[15vh] md:mt-[10vh] mx-auto', hiz: '0.9' },
  { url: 'https://images.unsplash.com/photo-1510279931157-4e84sqe7e234?auto=format&fit=crop&q=80&w=800', baslik: '', rotasyon: 'rotate-3', margin: 'mt-[20vh] ml-[15vw]', hiz: '1.1', type: 'text', metin: '"Bazen en küçük şeyler kalbinizde en büyük yeri kaplar."' },
  { url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800', baslik: 'Huzur', rotasyon: '-rotate-6', margin: 'mt-[5vh] md:mt-[-10vh] ml-auto mr-[5vw]', hiz: '1.3' },
  { url: 'https://images.unsplash.com/photo-1522771930-78848d926053?auto=format&fit=crop&q=80&w=800', baslik: 'Aile Olmak', rotasyon: 'rotate-2', margin: 'mt-[25vh] ml-[10vw] mb-[20vh]', hiz: '0.7' },
]

export default function FotoDogumClient() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Vanilla JS Basit Parallax Efekti (Organik His İçin)
    const handleScroll = () => {
      const elements = document.querySelectorAll('.parallax-card')
      const scrolled = window.scrollY
      elements.forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.speed || '1')
        const yPos = -(scrolled * speed * 0.1)
        ;(el as HTMLElement).style.transform = `translateY(${yPos}px)`
      })
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    // BÜYÜME TIER: SCATTERED POLAROIDS / SCRAPBOOK TOPOLOJISI
    <div ref={containerRef} className="bg-[#FAF9F6] text-[#2C2C2C] min-h-[350vh] relative font-serif selection:bg-rose-200">
      
      {/* HEADER / NAVIGATION (Minimal Fixed) */}
      <header className="fixed top-0 w-full p-8 flex justify-between items-center z-50 pointer-events-none mix-blend-multiply">
        <div className="font-bold text-2xl tracking-tighter pointer-events-auto">Masal<span className="text-rose-400">.</span></div>
        <button className="text-sm uppercase tracking-widest font-sans font-bold hover:text-rose-400 transition-colors pointer-events-auto">
          İletişim
        </button>
      </header>

      {/* MERKEZİ YAPIŞKAN (STICKY) METİN ALANI */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center p-6 z-10 pointer-events-none text-center">
        <Stars className="w-8 h-8 text-rose-300 mb-6 drop-shadow-sm" />
        <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight max-w-4xl mix-blend-multiply opacity-90">
          Hayatınızın en büyüleyici <br className="hidden md:block"/>
          <span className="italic font-light text-[#8e847c]">masalını yazıyoruz.</span>
        </h1>
        <p className="mt-8 font-sans text-sm tracking-widest uppercase text-[#8e847c] font-bold">
          Doğum & Yenidoğan Belgeseli
        </p>
      </div>

      {/* DAĞINIK FOTOĞRAFLAR (Scrapbook Overlay) */}
      <div className="absolute top-0 w-full h-full z-20 pointer-events-none pt-[30vh]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-12 relative flex flex-col">
          
          {FOTOGRAFLAR.map((item, i) => (
            <div 
              key={i} 
              className={`parallax-card w-[80vw] md:w-[400px] lg:w-[450px] ${item.margin} ${item.rotasyon} pointer-events-auto transition-transform duration-1000 ease-out`}
              data-speed={item.hiz}
            >
              {item.type === 'text' ? (
                // Sadece Metin İçeren Dekoratif Blok
                <div className="bg-[#EAE4DC] p-12 lg:p-16 shadow-2xl flex items-center justify-center text-center rotate-3 border border-white/50">
                  <p className="text-2xl md:text-3xl italic text-[#5c544d] mix-blend-multiply">
                    {item.metin}
                  </p>
                </div>
              ) : (
                // Standart Polaroid Görünümlü Kart
                <div className="bg-white p-4 pb-12 md:p-6 md:pb-16 shadow-2xl hover:shadow-3xl hover:-translate-y-4 hover:scale-105 transition-all duration-500 cursor-pointer border border-[#f0ede6]">
                  <img src={item.url} alt={item.baslik} className="w-full aspect-[4/5] object-cover bg-neutral-100" />
                  <div className="absolute bottom-4 left-0 w-full text-center">
                    <span className="font-sans text-xs tracking-widest uppercase text-neutral-400 font-bold mix-blend-multiply">{item.baslik}</span>
                  </div>
                </div>
              )}
            </div>
          ))}

        </div>
      </div>

      {/* FOOTER & ÇAĞRI (Sayfanın En Altında Scroll Bitsin Diye) */}
      <div className="absolute bottom-0 w-full z-30 bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto px-6 py-32 text-center">
          <Heart className="w-8 h-8 text-rose-400 mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl mb-6">Paketler & Çekim Türleri</h2>
          <p className="font-sans text-[#8e847c] max-w-lg mx-auto mb-12">
            Doğum anı, yenidoğan hastane odası, ev konsepti ve hamilelik (maternity) çekimleri için detaylı bilgi alın. O anların telafisi yok, bu yüzden her kareye kalbimizi koyuyoruz.
          </p>
          
          <button className="bg-[#2C2C2C] text-white font-sans font-bold text-sm tracking-widest uppercase px-10 py-5 hover:bg-rose-500 transition-colors shadow-lg">
            Randevu Takvimi
          </button>
        </div>
        
        <footer className="border-t border-[#EAE4DC] py-8 text-center font-sans text-xs tracking-widest uppercase text-[#a8a19b]">
          © 2026 Masal Fotoğraf. By Kepenk.ai
        </footer>
      </div>

    </div>
  )
}
