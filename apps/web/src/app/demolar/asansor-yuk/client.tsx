'use client'

import React, { useEffect, useRef } from 'react'

export default function AsansorYukGrowthTier() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
          entry.target.classList.remove('opacity-0', 'translate-y-10')
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-900 font-sans overflow-x-hidden">
      
      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center transform -rotate-6">
               <span className="text-white font-black text-xl italic">A+</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-800">AĞIR<span className="text-indigo-600">YÜK</span></span>
          </div>
          
          <nav className="hidden lg:flex gap-10">
            <a href="#hizmetler" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors uppercase tracking-wider relative group">
              Çözümlerimiz
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
            </a>
            <a href="#ekip" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors uppercase tracking-wider relative group">
              Teknoloji
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
            </a>
          </nav>

          <a href="#iletisim" className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-600 transition-all shadow-lg hover:shadow-indigo-600/30 transform hover:-translate-y-0.5">
            Teklif Al →
          </a>
        </div>
      </header>

      {/* ASYMMETRICAL HERO */}
      <section className="pt-32 pb-20 px-6 lg:pt-48 lg:pb-32 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 relative z-10 space-y-8 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
              Endüstriyel Taşıma Sistemleri
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[1.1] text-slate-900">
              Tonlarca Yükü,<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Tek Bir Dokunuşla</span><br/>
              Hareket Ettirin.
            </h1>
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed font-medium">
              Fabrika, depo ve endüstriyel tesisler için 1 tondan 10 tona kadar kapasiteli, hidrolik ve elektrikli ağır yük asansörleri.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#iletisim" className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-xl shadow-indigo-600/20">
                Projeyi Başlat
              </a>
              <a href="#hizmetler" className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-colors border border-slate-200">
                Katalog İndir
              </a>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-300 ease-out">
            {/* Asymmetrical Image Grid Mockup */}
            <div className="relative w-full aspect-square">
              <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 to-transparent mix-blend-overlay"></div>
                <div className="w-full h-full flex items-center justify-center text-slate-700 font-bold border-4 border-slate-800 rounded-3xl">GÖRSEL 1</div>
              </div>
              <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-indigo-600 rounded-3xl overflow-hidden shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white">
                 <div className="w-full h-full flex items-center justify-center text-indigo-400 font-bold">GÖRSEL 2</div>
              </div>
              
              {/* Floating Stat Card */}
              <div className="absolute top-1/2 -left-8 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 transform -translate-y-1/2 animate-bounce-slow">
                <div className="text-3xl font-black text-indigo-600">10T+</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Maksimum Kapasite</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY SCROLL SECTION */}
      <section id="hizmetler" className="py-24 px-6 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3">
            <div className="sticky top-32 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight">Sistemi Tanıyın</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Yük asansörlerimiz, tesisinizin mimarisine ve kaldırma gereksinimlerine göre özel olarak tasarlanır.
              </p>
              <div className="space-y-4">
                <div className="w-16 h-1 bg-indigo-500 rounded-full"></div>
                <div className="w-8 h-1 bg-violet-500 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/3 space-y-12">
            {[ 
              { title: 'Hidrolik Yük Asansörleri', desc: 'Ağır kapasite ve düşük seyir mesafeli tesisler için en güvenli, uzun ömürlü çözüm.' },
              { title: 'Halatlı Endüstriyel Asansörler', desc: 'Yüksek binalar ve hızlı taşıma gerektiren lojistik merkezleri için yüksek hızlı motorlar.' },
              { title: 'Araç Asansörleri', desc: 'Otoparklar ve showroomlar için güvenli platform sistemleri, sessiz ve titreşimsiz çalışma.' } 
            ].map((item, i) => (
              <div key={i} className="group bg-slate-800/50 p-10 rounded-3xl border border-slate-700 hover:border-indigo-500 transition-colors reveal-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${i * 200}ms`, transitionDuration: '700ms' }}>
                <div className="text-6xl font-black text-slate-800 mb-6 group-hover:text-indigo-900/50 transition-colors">0{i+1}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section id="iletisim" className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-indigo-600 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-900 opacity-30 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 relative z-10 tracking-tight">Projenizi Yükseltelim</h2>
          <p className="text-indigo-100 text-xl mb-10 max-w-2xl mx-auto relative z-10">Tesisinize özel kapasite analizi ve ücretsiz keşif için mühendislerimizle görüşün.</p>
          
          <form className="max-w-lg mx-auto bg-white p-2 rounded-2xl flex flex-col sm:flex-row shadow-2xl relative z-10" onSubmit={e => e.preventDefault()}>
            <input type="text" placeholder="Telefon Numaranız" className="flex-1 bg-transparent px-6 py-4 text-slate-900 font-medium focus:outline-none" />
            <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors whitespace-nowrap">
              Sizi Arayalım
            </button>
          </form>
        </div>
      </section>

    </div>
  )
}
