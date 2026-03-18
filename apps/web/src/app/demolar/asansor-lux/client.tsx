'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function AsansorLuxPremiumTier() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, 200])
  const y2 = useTransform(scrollY, [0, 1000], [0, -100])
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-rose-500/30">
      
      {/* GLASSMORPHISM HEADER */}
      <header className="fixed top-0 w-full z-50">
        <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl h-16 items-center justify-between px-6 shadow-2xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500"></div>
              <span className="text-xl font-bold tracking-tight text-white">ELEVATE<span className="font-light opacity-60">LUX</span></span>
            </div>
            
            <nav className="hidden md:flex gap-8 text-sm font-medium text-white/60">
              <a href="#koleksiyon" className="hover:text-white transition-colors tracking-wide">Koleksiyon</a>
              <a href="#mimari" className="hover:text-white transition-colors tracking-wide">Mimari Uyumluluk</a>
              <a href="#servis" className="hover:text-white transition-colors tracking-wide">Premium Servis</a>
            </nav>

            <button className="text-sm font-bold bg-white text-black px-5 py-2 rounded-xl hover:bg-rose-500 hover:text-white transition-all duration-300">
              Konsültasyon
            </button>
          </div>
        </div>
      </header>

      {/* HERO PARALLAX - CENTERED DRAMATIC W/ FLOATING ORBS */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pt-20 px-6 text-center">
        
        {/* Background Gradients & Glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-rose-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&w=1920&q=80')] opacity-20 object-cover bg-center mix-blend-luminosity"></div>

        <motion.div 
          style={{ y: y1 }}
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center max-w-4xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="px-5 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-xs font-bold tracking-[0.3em] text-white/80 mb-10 shadow-2xl">
            LÜKS VİLLA & REZİDANS ASANSÖRLERİ
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-6xl sm:text-7xl lg:text-[7rem] font-light tracking-tighter leading-[0.85] mb-10">
            Mimarinin <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-rose-400 italic font-medium drop-shadow-2xl">Zirvesine</span><br/>
            Yolculuk.
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-white/60 mb-12 leading-relaxed font-light max-w-2xl">
            Premium panoramik cam asansörler ile yaşam alanlarınızdaki dikey ulaşımı bir <span className="text-white">sanat eserine</span> dönüştürüyoruz.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex gap-6">
             <button className="bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all transform hover:scale-105">
               Koleksiyonu Keşfet
             </button>
          </motion.div>
        </motion.div>

        {/* Floating Ambient Cards floating around the center */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
           <motion.div style={{ y: y2 }} className="absolute top-[20%] left-[10%] w-64 border border-white/10 bg-white/[0.02] backdrop-blur-xl rounded-3xl p-6 shadow-2xl transform -rotate-6">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-amber-400 mb-4 bg-black/50">✦</div>
              <div className="text-2xl font-light text-white mb-1">Sessiz Motor</div>
              <div className="text-xs text-white/50">Fısıltı seviyesinde seyir konforu</div>
           </motion.div>
           
           <motion.div style={{ y: y1 }} className="absolute bottom-[20%] right-[10%] w-72 border border-rose-500/20 bg-gradient-to-br from-rose-900/30 to-black/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl transform rotate-3 flex items-end justify-between">
              <div>
                <div className="text-[10px] font-bold text-rose-400 tracking-widest uppercase mb-1">Panoramik Görüş</div>
                <div className="text-3xl font-black text-white leading-none">360° Cam</div>
              </div>
           </motion.div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section id="koleksiyon" className="py-32 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h2 className="text-5xl font-light mb-6">Signature Koleksiyonu</h2>
            <p className="text-white/40 max-w-2xl mx-auto text-lg font-light">Villalar ve dubleks daireler için özel olarak tasarlanmış, kuyu gerektirmeyen şık platform ve kabin sistemleri.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: 'Cam Kuyu Sistemleri', d: 'Mekanınıza derinlik katan, tamamen şeffaf ve minimalist tasarım.', ic: '💎' },
              { t: 'Özel Kaplama Kabin', d: 'Deri, özel ahşap veya mat siyah paslanmaz çelik iç kaplama seçenekleri.', ic: '🎨' },
              { t: 'Akıllı Eve Entegre', d: 'Telefon uygulaması ile çağrı veya sesli asistan komutları ile kontrol.', ic: '📱' }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="group p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-[50px] group-hover:bg-rose-500/20 transition-all"></div>
                <div className="text-4xl mb-8">{f.ic}</div>
                <h3 className="text-xl font-medium mb-4">{f.t}</h3>
                <p className="text-white/40 leading-relaxed font-light">{f.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BIG CTA */}
      <section className="py-32 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto bg-gradient-to-br from-neutral-900 to-black border border-white/10 rounded-[3rem] p-16 lg:p-24 text-center relative overflow-hidden flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8 relative z-10">Mekanın Ruhuyla <br/> <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">Bütünleşen</span> Tasarımlar</h2>
          <p className="text-white/50 text-xl font-light max-w-2xl mb-12 relative z-10">İç mimarlarımızla görüşerek projenizin ambiyansına en uygun kabin aydınlatmasını, zemin kaplamasını ve ayna tasarımlarını belirleyin.</p>
          <button className="relative z-10 bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:bg-rose-500 hover:text-white transition-colors duration-300">
             Ücretsiz Mimari Keşif
          </button>
        </motion.div>
      </section>

    </div>
  )
}
