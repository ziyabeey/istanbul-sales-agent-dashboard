'use client'

import React from 'react'

export default function AsansorEngelliFreeTier() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-blue-200">
      
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">E</div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Erişim Asansör</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#hizmetler" className="hover:text-blue-600 transition-colors">Hizmetlerimiz</a>
            <a href="#iletisim" className="hover:text-blue-600 transition-colors">İletişim</a>
          </nav>
          <a href="tel:+905550000000" className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
            0555 000 00 00
          </a>
        </div>
      </header>

      {/* HERO SECTION - SPLIT LAYOUT */}
      <section className="pt-28 pb-12 px-4 md:pt-36 md:pb-20 bg-white border-b border-slate-100 overflow-hidden relative">
        {/* Decorative corner shape */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 -skew-x-12 transform origin-top-right translate-x-10 pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="md:w-1/2 flex flex-col items-start text-left">
            <span className="inline-block py-1 px-3 rounded-md bg-blue-100 text-blue-800 text-xs font-extrabold tracking-widest uppercase mb-6">
              Engelli & Merdiven Asansörleri
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
              Hayatın Önündeki <br className="hidden lg:block"/>
              <span className="text-blue-600 relative inline-block mt-2">
                Engelleri Kaldırın.
                <span className="absolute bottom-1 left-0 w-full h-3 bg-blue-200 -z-10 transform -rotate-1"></span>
              </span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed font-medium">
              Güvenilir, tamamen sessiz ve Avrupa standartlarında üretilmiş merdiven asansörlerimizle mekanlarınızı herkes için erişilebilir kılıyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a href="#iletisim" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-center hover:bg-blue-700 shadow-xl shadow-blue-600/20 transition-all transform hover:-translate-y-1">
                Ücretsiz Keşif
              </a>
              <a href="#hizmetler" className="bg-white text-slate-800 border-2 border-slate-200 px-8 py-4 rounded-xl font-bold text-center hover:border-slate-300 hover:bg-slate-50 transition-colors">
                Modeller
              </a>
            </div>
          </div>
          
          <div className="md:w-1/2 w-full mt-8 md:mt-0 relative perspective-1000">
            {/* Visual Container */}
            <div className="aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 relative shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 group">
              <img src="https://images.unsplash.com/photo-1541888004659-40da8209ad73?auto=format&fit=crop&w=800&q=75" alt="Engelli Asansörü" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply"></div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/50 flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black text-xl">CE</div>
                <div>
                  <div className="text-sm font-black text-slate-900">EN 81-40</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sertifikalı</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="hizmetler" className="py-20 px-4 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Erişilebilirlik Çözümleri</h2>
            <p className="text-slate-600 max-w-xl mx-auto">İhtiyacınıza en uygun asansör platformunu seçin. Ev, okul ve kamu binaları için tam uyumlu sistemler.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 text-2xl">🦽</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Düz Merdiven Asansörleri</h3>
              <p className="text-slate-600 leading-relaxed">Eğimli veya düz iç mekan merdivenleri için hızlı kurulan, az yer kaplayan koltuklu asansör sistemleri.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 text-2xl">🔄</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Dönüşlü Merdiven Asansörü</h3>
              <p className="text-slate-600 leading-relaxed">Özel ölçülü, döner yapıdaki merdivenler için geliştirilmiş, virajları ve kat sahanlıklarını kolayca dönen sistemler.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 text-2xl">🏢</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Dikey Platform Asansör</h3>
              <p className="text-slate-600 leading-relaxed">Kuyu gerektirmeyen, tekerlekli sandalye kullanımına uygun, kamu binaları ve villalar için ideal dikey platformlar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="iletisim" className="py-20 px-4 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
          <div className="p-10 md:p-12 md:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-white mb-4">Hemen Teklif Alın</h2>
            <p className="text-slate-300 mb-8">Uzman ekibimiz alanınıza uygun en iyi çözümü sunmak için ücretsiz keşif yapsın.</p>
            <div className="flex items-center gap-4 text-white font-medium mb-4">
              <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">📞</span>
              0555 000 00 00
            </div>
            <div className="flex items-center gap-4 text-white font-medium">
              <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">📍</span>
              Kadıköy, İstanbul
            </div>
          </div>
          <div className="p-10 md:p-12 bg-white md:w-1/2">
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Adınız Soyadınız</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Telefon Numaranız</label>
                <input type="tel" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all" placeholder="05XX XXX XX XX" />
              </div>
              <button type="submit" className="w-full mt-2 bg-blue-600 text-white font-bold py-3.5 rounded-lg hover:bg-blue-700 transition-colors">
                Gönder
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0F172A] text-slate-400 py-10 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xl font-bold text-white tracking-tight">Erişim Asansör</div>
          <div className="text-sm">© 2026 Erişim Asansör. Tüm hakları saklıdır.</div>
          <div className="text-xs scale-90 opacity-50 px-3 py-1 border border-white/20 rounded-full">⚡ Powered by kepenk.ai</div>
        </div>
      </footer>

    </div>
  )
}
