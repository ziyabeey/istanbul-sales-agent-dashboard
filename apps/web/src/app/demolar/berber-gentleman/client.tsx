'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, Phone, Instagram, Clock, CheckCircle } from 'lucide-react'

// STATİK VERİLER
const HIZMETLER = [
  { ad: 'Premium Saç & Sakal Tıraşı', fiyat: '₺800', aciklama: 'Kişisel danışmanlık, sıcak havlu ritüeli, aromaterapi yağı ve saç/sakal şekillendirme.' },
  { ad: 'Keratin ve Ozon Bakımı', fiyat: '₺1200', aciklama: 'Yıpranmış saç telleri için kökten uca onarım sağlayan özel İsviçre formülü.' },
  { ad: 'VIP Cilt Temizliği (HydraFacial)', fiyat: '₺1500', aciklama: 'Erkek cildine özel gözenek temizleme, vakumlu serum bakımı ve LED terapi.' },
  { ad: 'Beyaz Kaplama (Renk Kırma)', fiyat: '₺900', aciklama: 'Doğal görünümü bozmadan gümüş saçların şeffaf boya ile gölgelendirilmesi.' },
]

export default function BerberGentlemanClient() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Framer Motion Ortak Animasyonlar
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
  }
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  return (
    // DARK GLASSMORPHISM & 50/50 STICKY SPLIT TOPOLOJİSİ
    <div ref={containerRef} className="bg-[#050505] text-white min-h-screen flex flex-col md:flex-row relative font-sans selection:bg-amber-600/30">
      
      {/* SOL TARAF: SABİT (STICKY) GÖRSEL VE MARKA KİMLİĞİ */}
      <div className="w-full md:w-1/2 md:h-screen md:sticky top-0 relative border-b md:border-b-0 md:border-r border-white/10 overflow-hidden flex flex-col justify-between p-8 md:p-16 z-20 h-[60vh]">
        
        {/* Arka Plan Görseli & Gradient Mask */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?auto=format&fit=crop&q=80&w=1400')] bg-cover bg-center opacity-40 mix-blend-luminosity scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-transparent to-[#050505] md:bg-gradient-to-br md:from-[#050505]/40 md:via-[#050505]/60 md:to-[#050505]" />
        
        {/* Logo ve Menü Alanı (Glassmorphism Pano) */}
        <div className="relative z-10 w-full max-w-sm backdrop-blur-xl bg-white/[0.03] border border-white/10 p-8 rounded-2xl shadow-2xl">
          <div className="font-serif text-4xl mb-1 text-white">
            GENTLEMAN<span className="text-amber-500">.</span>
          </div>
          <p className="text-white/40 uppercase tracking-[0.3em] text-xs font-bold mb-8">Premium Grooming</p>
          
          <nav className="flex flex-col gap-4 text-sm font-medium text-white/70">
            <div className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors group">
              <div className="w-8 h-[1px] bg-white/20 group-hover:bg-amber-500 group-hover:w-12 transition-all" /> Keşfet
            </div>
            <div className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors group">
              <div className="w-8 h-[1px] bg-white/20 group-hover:bg-amber-500 group-hover:w-12 transition-all" /> Hizmetler
            </div>
            <div className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors group">
              <div className="w-8 h-[1px] bg-white/20 group-hover:bg-amber-500 group-hover:w-12 transition-all" /> Ekibimiz
            </div>
          </nav>
        </div>

        {/* Alt Bilgi */}
        <div className="relative z-10 hidden md:flex flex-col gap-3 text-xs text-white/40 tracking-widest uppercase">
          <div className="flex items-center gap-2"><MapPin className="w-3 h-3 text-amber-500" /> Zorlu Center, Meydan Katı, Beşiktaş</div>
          <div className="flex items-center gap-2"><Phone className="w-3 h-3 text-amber-500" /> +90 (212) 333 22 11</div>
        </div>
      </div>

      {/* SAĞ TARAF: KAYAN (SCROLLING) İÇERİK ALANI */}
      <div className="w-full md:w-1/2 min-h-screen bg-[#050505]">
        <div className="max-w-2xl mx-auto py-20 px-6 md:px-16 lg:px-24">
          
          {/* HERO GİRİŞ */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="min-h-[70vh] flex flex-col justify-center"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-widest mb-8">
              <CheckCircle className="w-3 h-3" /> VIP Lounge Deneyimi
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-light tracking-tighter mb-8 leading-[1.1]">
              Erkek<br />
              Bakımında<br />
              <span className="font-serif italic text-white/50">Yeni Bir Standart.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-white/50 leading-relaxed font-light mb-12">
              Sıradan bir berber koltuğunun ötesinde, özel ikramlar ve kişiye özel analiz ile başlayan tam kapsamlı erkek estetik merkezine hoş geldiniz.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <button className="bg-white text-black hover:bg-amber-500 hover:text-white transition-colors duration-500 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm shadow-[0_0_40px_rgba(245,158,11,0.2)]">
                Özel Rezervasyon Yap
              </button>
            </motion.div>
          </motion.div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-16" />

          {/* HİZMETLER (GLASS CARDS) */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-light mb-12">İmza Ritüeller.</motion.h2>
            
            <div className="space-y-6">
              {HIZMETLER.map((hizmet, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeInUp}
                  className="group relative backdrop-blur-md bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[50px] group-hover:bg-amber-500/20 transition-all duration-500" />
                  
                  <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-medium mb-3 group-hover:text-amber-500 transition-colors">{hizmet.ad}</h3>
                      <p className="text-sm text-white/40 leading-relaxed font-light">{hizmet.aciklama}</p>
                    </div>
                    <div className="text-2xl font-serif text-white/80">{hizmet.fiyat}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-24" />

          {/* EKİP & VİZYON */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="pb-24"
          >
            <motion.div variants={fadeInUp} className="w-full rounded-2xl overflow-hidden mb-10 border border-white/10 relative group">
               <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/10 transition-colors duration-500" />
               <img src="https://images.unsplash.com/photo-1520183802803-06f731a2059f?auto=format&fit=crop&q=80&w=800" alt="Barbershop Lounge" className="w-full aspect-video object-cover" />
               <div className="absolute bottom-6 left-6 z-20">
                 <div className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/20">The Lounge</div>
               </div>
            </motion.div>

            <motion.h2 variants={fadeInUp} className="text-3xl font-light mb-6">Sadece Randevu İle.</motion.h2>
            <motion.p variants={fadeInUp} className="text-white/50 font-light leading-relaxed mb-8">
              Burası bir bekleme salonu değil, bir kaçış noktası. İçeri adım attığınız andan itibaren özel dolabınız, favori içeceğiniz ve sadece size ayrılmış bir zaman dilimi sizi bekliyor.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex gap-4">
              <div className="flex items-center gap-2 text-sm text-white/70 bg-white/5 px-4 py-2 rounded-lg"><Clock className="w-4 h-4 text-amber-500" /> Her Müşteriye 90 Dk.</div>
              <div className="flex items-center gap-2 text-sm text-white/70 bg-white/5 px-4 py-2 rounded-lg"><Instagram className="w-4 h-4 text-amber-500" /> @gentleman_vip</div>
            </motion.div>
          </motion.div>

        </div>
      </div>

    </div>
  )
}
