'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type DefaultThemeState = any

/* ═══════════════════════════════════════════════════════════════════
 TIER 1 — KLİNİK SADE (Temel / Bio-Link)
 - Layout: Tek sütun, kart görünümü.
 - Tasarım: Beyaz (#ffffff), Gök Mavisi (#0ea5e9).
 - Font: Inter.
 - Etkileşim: Statik, temiz bilgi odaklı.
 ═══════════════════════════════════════════════════════════════════ */

export function KlinikSadeHero({ state }: { state: DefaultThemeState }) {
 return (
 <section className="bg-slate-50 py-12 px-4 min-h-[60vh] flex items-center justify-center font-inter">
 <div className="w-full max-w-sm bg-white rounded-3xl p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100">
 
 <div className="relative w-28 h-28 mx-auto mb-6">
 <div className="absolute inset-0 bg-[#0ea5e9]/10 rounded-full animate-pulse"></div>
 <img 
 src="https://images.unsplash.com/photo-1594824432258-3d120a4afce4?q=80&w=200&h=200&fit=crop" 
 alt="Doktor Profil" 
 className="w-full h-full object-cover rounded-full border-4 border-white shadow-sm relative z-10"
 />
 <div className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center z-20 shadow-sm">
 <span className="text-[#0ea5e9] text-sm">⚕️</span>
 </div>
 </div>
 
 <h1 className="text-2xl font-bold text-slate-900 mb-1">{state.hero.title}</h1>
 <p className="text-sm font-medium text-[#0ea5e9] mb-6">{state.hero.subtitle}</p>
 
 <p className="text-slate-500 mb-8 text-sm leading-relaxed">
 Sağlığınız ve güzelliğiniz için yenilikçi medikal çözümler. Uzman ellerde güvenli tedavi seçenekleri.
 </p>

 <a 
 href={state.hero.buttonLink}
 className="block w-full bg-[#0ea5e9] text-white py-3.5 rounded-xl font-medium shadow-md shadow-[#0ea5e9]/20 hover:bg-[#0284c7] transition-colors"
 >
 {state.hero.buttonText}
 </a>
 </div>
 </section>
 )
}

export function KlinikSadeServices({ state }: { state: DefaultThemeState }) {
 return (
 <section className="bg-slate-50 pb-12 px-4 font-inter">
 <div className="w-full max-w-sm mx-auto space-y-3">
 {state.services.items.map((item: any) => (
 <div key={item.id} className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm ring-1 ring-slate-100 cursor-pointer hover:border-[#0ea5e9] transition-colors group">
 <div className="flex items-center gap-4">
 <div className="w-10 h-10 bg-sky-50 text-[#0ea5e9] rounded-full flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
 {item.icon}
 </div>
 <span className="font-semibold text-slate-700 text-sm">{item.title}</span>
 </div>
 <span className="text-slate-300 group-hover:text-[#0ea5e9] transition-colors">→</span>
 </div>
 ))}
 </div>
 </section>
 )
}

export function KlinikSadeContact({ state }: { state: DefaultThemeState }) {
 return (
 <section id="contact" className="bg-slate-50 pb-24 px-4 font-inter">
 <div className="w-full max-w-sm mx-auto">
 <div className="bg-slate-900 text-white rounded-3xl p-6 text-center">
 <h2 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">{state.contact.title}</h2>
 
 <div className="space-y-4">
 <div className="bg-slate-800 rounded-xl py-3 px-4 flex items-center justify-center gap-3">
 <span>📍</span>
 <span className="text-sm">{state.contact.address}</span>
 </div>
 <a href={`tel:${state.contact.phone}`} className="bg-slate-800 rounded-xl py-3 px-4 flex items-center justify-center gap-3 hover:bg-slate-700 transition-colors">
 <span>📞</span>
 <span className="text-sm font-medium">{state.contact.phone}</span>
 </a>
 </div>
 </div>
 </div>
 </section>
 )
}


/* ═══════════════════════════════════════════════════════════════════
 TIER 2 — KLİNİK KURUMSAL (Standart / Medikal Plaza)
 - Layout: Sol %30 Sticky İletişim, Sağ %70 Bilgi.
 - Tasarım: Gri (#f8fafc), Koyu Mavi (#1d4ed8).
 - Font: Inter.
 - Etkileşim: Kurumsal ve otoriter çizgiler, Fade-Up effect.
 ═══════════════════════════════════════════════════════════════════ */

// Kurumsal Scroll Reveal Utility
function ShrinkUp({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
 return (
 <motion.div
 initial={{ opacity: 0, y: 30, scale: 0.98 }}
 whileInView={{ opacity: 1, y: 0, scale: 1 }}
 viewport={{ once: true, margin: "-50px" }}
 transition={{ duration: 0.6, delay, ease: "easeOut" as any }}
 >
 {children}
 </motion.div>
 )
}

export function KlinikKurumsalLayout({ children, state }: { children: React.ReactNode, state: DefaultThemeState }) {
 return (
 <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row font-inter">
 {/* 30% Sol Sabit Taraf */}
 <aside className="md:w-[30%] bg-white border-r border-slate-200 p-8 md:p-12 md:h-screen md:sticky top-0 flex flex-col">
 <div className="flex items-center gap-3 mb-10">
 <div className="w-10 h-10 bg-[#1d4ed8] rounded-lg flex items-center justify-center text-white font-bold text-xl">M</div>
 <span className="text-xl font-bold text-slate-900 tracking-tight">Medikal Plaza</span>
 </div>

 <div className="space-y-6 mt-auto mb-12">
 <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Hızlı İletişim</h2>
 <div className="space-y-4">
 <div className="flex items-start gap-4">
 <span className="text-[#1d4ed8] mt-1">📍</span>
 <p className="text-sm text-slate-600 font-medium">{state.contact.address}</p>
 </div>
 <div className="flex items-center gap-4">
 <span className="text-[#1d4ed8]">📞</span>
 <p className="text-sm text-slate-900 font-bold">{state.contact.phone}</p>
 </div>
 </div>
 <button className="w-full bg-[#1d4ed8] text-white py-4 rounded-lg font-bold hover:bg-blue-800 transition-colors mt-6 shadow-lg shadow-blue-500/20">
 Online Randevu Al
 </button>
 </div>

 <div className="flex gap-4 pt-8 border-t border-slate-100">
 {/* Mock Akreditasyon Logoları */}
 <div className="h-8 w-16 bg-slate-100 rounded"></div>
 <div className="h-8 w-16 bg-slate-100 rounded"></div>
 <div className="h-8 w-16 bg-slate-100 rounded"></div>
 </div>
 </aside>

 {/* 70% Sağ İçerik Tarafı */}
 <main className="md:w-[70%]">
 {children}
 </main>
 </div>
 )
}

export function KlinikKurumsalHero({ state }: { state: DefaultThemeState }) {
 return (
 <section className="relative h-[50vh] md:h-[60vh] bg-slate-900 p-8 md:p-16 flex items-center overflow-hidden">
 <div 
 className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
 style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070)' }}
 />
 <div className="relative z-10 max-w-2xl">
 <ShrinkUp>
 <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold uppercase tracking-widest mb-6 border border-blue-400/30">
 Uluslararası Sağlık Standartları
 </span>
 <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
 {state.hero.title}
 </h1>
 <p className="text-lg text-slate-300 font-medium leading-relaxed mb-8 max-w-xl">
 {state.hero.subtitle} Uzman doktor kadrosu ve son teknoloji donanımlarımızla yanınızdayız.
 </p>
 <a href={state.hero.buttonLink} className="inline-flex items-center justify-center bg-white text-[#1d4ed8] px-8 py-4 font-bold rounded-lg hover:bg-slate-50 transition-colors">
 {state.hero.buttonText} →
 </a>
 </ShrinkUp>
 </div>
 </section>
 )
}

export function KlinikKurumsalServices({ state }: { state: DefaultThemeState }) {
 return (
 <section className="p-8 md:p-16">
 <ShrinkUp>
 <h2 className="text-3xl font-extrabold text-slate-900 mb-12">Uzmanlık Alanlarımız</h2>
 </ShrinkUp>
 
 <div className="grid md:grid-cols-2 gap-6">
 {state.services.items.map((item: any, idx: number) => (
 <ShrinkUp key={item.id} delay={idx * 0.1}>
 <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#1d4ed8]/30 transition-all duration-300 group">
 <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:bg-blue-50 group-hover:text-[#1d4ed8] transition-colors">
 {item.icon}
 </div>
 <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
 <p className="text-slate-600 text-sm leading-relaxed mb-4">{item.description}</p>
 <button className="text-[#1d4ed8] text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
 Detaylı Bilgi <span>→</span>
 </button>
 </div>
 </ShrinkUp>
 ))}
 </div>
 </section>
 )
}

export function KlinikKurumsalContact({ state }: { state: DefaultThemeState }) {
 // Contact was already handled in layout sidebar, this serves as an extra CTA section
 return (
 <section className="p-8 md:p-16 border-t border-slate-200">
 <div className="bg-[#1d4ed8] rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
 <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
 <ShrinkUp>
 <h2 className="text-3xl font-bold mb-4 relative z-10">Sağlığınız İçin İlk Adımı Atın</h2>
 <p className="text-blue-100 mb-8 max-w-lg mx-auto relative z-10">{state.contact.subtitle}</p>
 <button className="bg-white text-[#1d4ed8] px-10 py-4 font-bold rounded-lg hover:shadow-xl transition-shadow relative z-10">
 Randevu Talep Merkezi
 </button>
 </ShrinkUp>
 </div>
 </section>
 )
}


/* ═══════════════════════════════════════════════════════════════════
 TIER 3 — KLİNİK MODERN (Büyüme / Neumorphism)
 - Layout: Geniş marginli yumuşak (Soft UI) köşeler.
 - Tasarım: Soft Gri (#f0f4f8), Turkuaz (#14b8a6).
 - Font: Inter.
 - Etkileşim: Before/After Slider, Neumorphic shadows.
 ═══════════════════════════════════════════════════════════════════ */

export function KlinikModernHero({ state }: { state: DefaultThemeState }) {
 return (
 <section className="bg-[#e2e8f0] min-h-screen py-20 px-6 font-inter flex flex-col justify-center items-center text-center overflow-hidden">
 {/* Neumorphic Background Elements */}
 <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#e2e8f0] rounded-full shadow-[inset_10px_10px_20px_#c1c7ce,inset_-10px_-10px_20px_#ffffff] blur-sm"></div>
 <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#e2e8f0] rounded-full shadow-[20px_20px_60px_#c1c7ce,-20px_-20px_60px_#ffffff]"></div>

 <div className="relative z-10 max-w-3xl">
 <h1 className="text-5xl md:text-7xl font-bold text-slate-800 tracking-tight leading-tight mb-6">
 Doğal Güzelliğin <br/> <span className="text-[#14b8a6]">Soft</span> Hali.
 </h1>
 <p className="text-slate-600 text-lg md:text-xl font-medium mb-12 max-w-xl mx-auto">
 {state.hero.subtitle} Ağrısız klinik hissi veren devrimsel neumorphic yaklaşım ile estetik dünyasına adım atın.
 </p>

 {/* Neumorphic Button */}
 <a 
 href={state.hero.buttonLink}
 className="inline-block bg-[#e2e8f0] text-[#14b8a6] font-bold text-lg px-12 py-5 rounded-[2rem] transition-all duration-300 shadow-[10px_10px_20px_#c1c7ce,-10px_-10px_20px_#ffffff] hover:shadow-[inset_5px_5px_10px_#c1c7ce,inset_-5px_-5px_10px_#ffffff] active:scale-95"
 >
 {state.hero.buttonText}
 </a>
 </div>
 </section>
 )
}

export function KlinikModernServices({ state }: { state: DefaultThemeState }) {
 // Before / After Slider Component Simulasyonu
 const [sliderPosition, setSliderPosition] = useState(50)

 return (
 <section id="hizmetler" className="bg-[#e2e8f0] py-24 px-6 font-inter border-t border-slate-200/50">
 <div className="max-w-6xl mx-auto">
 
 <div className="text-center mb-20">
 <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6">Soft Uygulamalar</h2>
 <p className="text-slate-500 max-w-2xl mx-auto font-medium">FDA onaylı cihazlarla tamamen ağrısız ve konforlu tedavi prosedürleri.</p>
 </div>

 <div className="grid lg:grid-cols-2 gap-16 items-center">
 
 {/* Neumorphic Service Cards */}
 <div className="space-y-8">
 {state.services.items.map((item: any) => (
 <div key={item.id} className="bg-[#e2e8f0] p-6 rounded-3xl shadow-[10px_10px_20px_#c1c7ce,-10px_-10px_20px_#ffffff] flex gap-6 items-center">
 <div className="w-16 h-16 rounded-2xl bg-[#e2e8f0] shadow-[inset_5px_5px_10px_#c1c7ce,inset_-5px_-5px_10px_#ffffff] flex items-center justify-center text-3xl">
 {item.icon}
 </div>
 <div>
 <h3 className="text-xl font-bold text-slate-700 mb-1">{item.title}</h3>
 <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
 </div>
 </div>
 ))}
 </div>

 {/* Before/After Custom Slider */}
 <div className="flex flex-col items-center">
 <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Gözle Görülür Değişim</div>
 <div 
 className="relative w-full aspect-[4/5] md:aspect-square max-w-md bg-[#e2e8f0] rounded-[3rem] shadow-[20px_20px_60px_#c1c7ce,-20px_-20px_60px_#ffffff] overflow-hidden select-none"
 onMouseMove={(e) => {
 const rect = e.currentTarget.getBoundingClientRect()
 const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
 setSliderPosition((x / rect.width) * 100)
 }}
 onTouchMove={(e) => {
 const rect = e.currentTarget.getBoundingClientRect()
 const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width))
 setSliderPosition((x / rect.width) * 100)
 }}
 >
 {/* After Image (Altta kalır) */}
 <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1629424726427-142c38822001?q=80&w=1000)' }}>
 <div className="absolute bottom-6 right-6 bg-white/50 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold text-slate-800">Sonra</div>
 </div>

 {/* Before Image (Kırpılmış şekilde üstte) */}
 <div 
 className="absolute inset-y-0 left-0 bg-cover bg-center border-r-[3px] border-white/50" 
 style={{ 
 width: `${sliderPosition}%`, 
 backgroundImage: 'url(https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?q=80&w=1000)',
 filter: 'grayscale(0.5) contrast(0.9)'
 }}
 >
 <div className="absolute bottom-6 left-6 bg-white/50 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold text-slate-800">Önce</div>
 
 {/* Drag Handle */}
 <div className="absolute top-1/2 -right-[18px] -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur shadow-lg rounded-full flex items-center justify-center cursor-ew-resize">
 <span className="text-slate-600 text-[10px] tracking-tighter">||</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>
 )
}

export function KlinikModernContact({ state }: { state: DefaultThemeState }) {
 return (
 <section className="bg-[#e2e8f0] py-24 px-6 font-inter flex justify-center">
 <div className="w-full max-w-4xl bg-[#e2e8f0] rounded-[3rem] p-12 md:p-20 shadow-[inset_10px_10px_20px_#c1c7ce,inset_-10px_-10px_20px_#ffffff] text-center">
 <h2 className="text-3xl font-bold text-slate-800 mb-4">{state.contact.title}</h2>
 <p className="text-slate-500 mb-12">{state.contact.subtitle}</p>
 
 <div className="flex flex-wrap justify-center gap-8">
 <div className="flex flex-col items-center">
 <div className="w-16 h-16 rounded-full bg-[#e2e8f0] shadow-[10px_10px_20px_#c1c7ce,-10px_-10px_20px_#ffffff] flex items-center justify-center text-[#14b8a6] text-xl mb-4">📍</div>
 <p className="text-slate-600 font-medium">{state.contact.address}</p>
 </div>
 <div className="flex flex-col items-center">
 <div className="w-16 h-16 rounded-full bg-[#e2e8f0] shadow-[10px_10px_20px_#c1c7ce,-10px_-10px_20px_#ffffff] flex items-center justify-center text-[#14b8a6] text-xl mb-4">📞</div>
 <p className="text-slate-600 font-medium">{state.contact.phone}</p>
 </div>
 </div>
 </div>
 </section>
 )
}


/* ═══════════════════════════════════════════════════════════════════
 TIER 4 — KLİNİK ESTETİK (Premium / Aura Spa)
 - Layout: Glassmorphism, video/image sinematik arka planlar.
 - Tasarım: Gece Mavisi (#0f172a), Zümrüt (#10b981).
 - Font: Lora.
 - Etkileşim: Blur-In slow motion efektler.
 ═══════════════════════════════════════════════════════════════════ */

export function KlinikEstetikHero({ state }: { state: DefaultThemeState }) {
 return (
 <section className="relative h-[100svh] w-full flex items-center justify-center font-lora overflow-hidden bg-slate-950">
 {/* Background with slow scale */}
 <motion.div 
 className="absolute inset-0 z-0"
 initial={{ scale: 1.1, filter: 'blur(10px)' }}
 animate={{ scale: 1, filter: 'blur(0px)' }}
 transition={{ duration: 2.5, ease: 'easeInOut' as const }}
 >
 <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600570783353-84085ebcb718?q=80&w=2070)', filter: 'brightness(0.6) saturate(1.2)' }} />
 <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
 </motion.div>

 {/* Glassmorphism Content Card */}
 <motion.div 
 initial={{ opacity: 0, y: 50 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.8, duration: 1.2 }}
 className="relative z-10 w-[90%] max-w-2xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl"
 >
 <span className="text-[#10b981] font-sans text-xs tracking-[0.3em] uppercase mb-4 block">Premium SPA & Estetik</span>
 <h1 className="text-5xl md:text-7xl font-medium mb-6 leading-tight">{state.hero.title}</h1>
 <p className="text-slate-300 italic text-lg mb-10">{state.hero.subtitle}</p>
 
 <a 
 href={state.hero.buttonLink}
 className="inline-block border border-white/30 px-10 py-4 font-sans text-xs uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all duration-500 rounded-full"
 >
 {state.hero.buttonText}
 </a>
 </motion.div>
 </section>
 )
}

export function KlinikEstetikServices({ state }: { state: DefaultThemeState }) {
 return (
 <section id="hizmetler" className="py-32 px-6 md:px-16 bg-slate-950 text-white font-lora relative overflow-hidden">
 {/* Abstract light blobs */}
 <div className="absolute top-0 right-0 w-96 h-96 bg-[#10b981]/10 rounded-full blur-[100px] pointer-events-none"></div>
 <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

 <div className="max-w-7xl mx-auto">
 <div className="text-center mb-24">
 <motion.h2 
 initial={{ opacity: 0, filter: 'blur(5px)' }}
 whileInView={{ opacity: 1, filter: 'blur(0px)' }}
 viewport={{ once: true }}
 transition={{ duration: 1 }}
 className="text-4xl md:text-6xl font-medium mb-6"
 >
 Arınma Terapileri
 </motion.h2>
 <div className="w-12 h-px bg-[#10b981] mx-auto"></div>
 </div>

 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
 {state.services.items.map((item: any, idx: number) => (
 <motion.div 
 key={item.id}
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-50px' }}
 transition={{ delay: idx * 0.2, duration: 1 }}
 className="group bg-white/[0.02] border border-white/5 p-10 rounded-3xl hover:bg-white/[0.05] transition-colors duration-500"
 >
 <div className="text-4xl opacity-50 mb-6 font-sans group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 origin-left">
 {item.icon}
 </div>
 <h3 className="text-2xl font-medium mb-4 text-[#10b981]">{item.title}</h3>
 <p className="text-slate-400 italic leading-relaxed mb-8">{item.description}</p>
 
 <button className="text-xs font-sans tracking-widest uppercase border-b border-white/20 pb-1 group-hover:border-[#10b981] transition-colors">
 Göz At
 </button>
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 )
}

export function KlinikEstetikContact({ state }: { state: DefaultThemeState }) {
 return (
 <section className="py-24 bg-slate-900 border-t border-white/5 font-lora relative text-center">
 <div className="max-w-3xl mx-auto px-6">
 <h2 className="text-3xl text-white font-medium mb-12">{state.contact.title}</h2>
 <div className="bg-slate-950/50 p-12 rounded-3xl border border-white/5 backdrop-blur-md">
 <p className="text-slate-400 italic mb-8 text-lg">"{state.contact.subtitle}"</p>
 <div className="space-y-4 font-sans text-sm tracking-wider text-slate-300">
 <p>{state.contact.address}</p>
 <p className="text-[#10b981] font-semibold">{state.contact.phone}</p>
 </div>
 </div>
 </div>
 </section>
 )
}


/* ═══════════════════════════════════════════════════════════════════
 TIER 5 — KLİNİK VIP (Premium+ / Awwwards)
 - Layout: İnteraktif anatomik panel (SVG Hotspots)
 - Tasarım: Saf Siyah (#050505), Amber (#f59e0b).
 - Font: Syne.
 - Etkileşim: Manyetik İmleç, SVG Path Hover, UX/UI Lab Hissi.
 ═══════════════════════════════════════════════════════════════════ */

export function KlinikVipHero({ state }: { state: DefaultThemeState }) {
 return (
 <section className="relative w-full h-[80vh] bg-[#050505] text-white flex flex-col justify-end p-10 md:p-20 font-syne border-b border-gray-900">
 <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.1),transparent_50%)]"></div>
 {/* Abstract grids */}
 <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
 </div>
 
 <div className="relative z-10 max-w-4xl">
 <motion.div 
 initial={{ opacity: 0, x: -50 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
 >
 <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#f59e0b] leading-none">
 {state.hero.title}
 </h1>
 <p className="font-sans text-gray-400 font-light text-lg tracking-wide max-w-lg mb-10">
 {state.hero.subtitle}
 </p>
 
 <div className="flex gap-4">
 <span className="text-xs uppercase tracking-widest border border-[#f59e0b]/30 px-4 py-2 text-[#f59e0b] rounded-full">Yüz Estetiği</span>
 <span className="text-xs uppercase tracking-widest border border-white/10 px-4 py-2 text-gray-400 rounded-full">Vücut Estetiği</span>
 <span className="text-xs uppercase tracking-widest border border-white/10 px-4 py-2 text-gray-400 rounded-full">Medikal</span>
 </div>
 </motion.div>
 </div>
 </section>
 )
}

export function KlinikVipAnatomy() {
 // SVG İnsan Yüzü / Anatomik Harita Simülasyonu
 const [activeArea, setActiveArea] = useState<string | null>(null)
 const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

 useEffect(() => {
 const updateMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
 window.addEventListener('mousemove', updateMouse)
 return () => window.removeEventListener('mousemove', updateMouse)
 }, [])

 const treatments = {
 forehead: { title: "Alın Bölgesi", desc: "Botoks uygulamaları, alın çizgileri tedavisi ve kaş kaldırma operasyonları.", icon: "⚗️" },
 eyes: { title: "Göz Çevresi", desc: "Kaz ayakları tedavisi, göz altı ışık dolgusu ve göz kapağı estetiği (Blefaroplasti).", icon: "👁️" },
 nose: { title: "Burun (Rinoplasti)", desc: "Cerrahi rinoplasti, burun ucu estetiği ve ameliyatsız burun dolgusu.", icon: "👃" },
 lips: { title: "Dudak & Çene", desc: "Jawline (çene hattı) dolgusu, dudak hacimlendirme ve masseter botoks.", icon: "👄" },
 }

 return (
 <section className="relative w-full min-h-screen bg-[#050505] font-syne overflow-hidden cursor-crosshair">
 
 {/* Manyetik Bilgi Tooltip */}
 <motion.div 
 className="fixed z-50 pointer-events-none bg-black/80 backdrop-blur-md border border-[#f59e0b]/30 p-6 rounded-2xl w-72"
 animate={{
 x: mousePos.x + 20,
 y: mousePos.y + 20,
 opacity: activeArea ? 1 : 0,
 scale: activeArea ? 1 : 0.9
 }}
 transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
 >
 {activeArea && (
 <>
 <div className="text-2xl mb-2">{treatments[activeArea as keyof typeof treatments].icon}</div>
 <h3 className="text-[#f59e0b] font-bold text-xl mb-2">{treatments[activeArea as keyof typeof treatments].title}</h3>
 <p className="text-gray-400 text-sm font-sans">{treatments[activeArea as keyof typeof treatments].desc}</p>
 </>
 )}
 </motion.div>

 <div className="container mx-auto px-6 h-full py-20 flex flex-col items-center">
 <h2 className="text-3xl text-gray-500 font-bold mb-12 text-center">İnteraktif Yüz Analizi <br/><span className="text-sm font-sans font-normal">Bölgelerin üzerine gelin.</span></h2>
 
 {/* Soyut Geometrik Yüz İllüstrasyonu (SVG Hotspots) */}
 <div className="relative w-full max-w-md aspect-[3/4] flex items-center justify-center">
 <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-[0_0_50px_rgba(245,158,11,0.05)]">
 {/* Base Yüz Otu (Hatsız) */}
 <path d="M 100,100 C 100,0 300,0 300,100 C 350,250 280,450 200,480 C 120,450 50,250 100,100 Z" fill="#0a0a0a" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.2"/>
 
 {/* Grid Hatları */}
 <path d="M 200,0 L 200,500 M 50,150 L 350,150 M 50,250 L 350,250 M 80,350 L 320,350" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="4 4" strokeOpacity="0.3"/>

 {/* Hotspots (Interactive Paths) */}
 {/* Alın */}
 <motion.path 
 d="M 120,50 Q 200,20 280,50 Q 290,120 200,140 Q 110,120 120,50 Z" 
 fill={activeArea === 'forehead' ? 'rgba(245,158,11,0.2)' : 'transparent'} 
 stroke={activeArea === 'forehead' ? '#f59e0b' : 'rgba(255,255,255,0.1)'}
 strokeWidth="2"
 onMouseEnter={() => setActiveArea('forehead')}
 onMouseLeave={() => setActiveArea(null)}
 className="transition-colors duration-300 cursor-none"
 />
 {/* Gözler */}
 <motion.path 
 d="M 110,160 Q 150,140 180,180 Q 150,190 110,160 M 290,160 Q 250,140 220,180 Q 250,190 290,160" 
 fill={activeArea === 'eyes' ? 'rgba(245,158,11,0.2)' : 'transparent'} 
 stroke={activeArea === 'eyes' ? '#f59e0b' : 'rgba(255,255,255,0.1)'}
 strokeWidth="2"
 onMouseEnter={() => setActiveArea('eyes')}
 onMouseLeave={() => setActiveArea(null)}
 className="transition-colors duration-300 cursor-none"
 />
 {/* Burun */}
 <motion.path 
 d="M 180,180 Q 200,160 220,180 L 230,280 Q 200,310 170,280 Z" 
 fill={activeArea === 'nose' ? 'rgba(245,158,11,0.2)' : 'transparent'} 
 stroke={activeArea === 'nose' ? '#f59e0b' : 'rgba(255,255,255,0.1)'}
 strokeWidth="2"
 onMouseEnter={() => setActiveArea('nose')}
 onMouseLeave={() => setActiveArea(null)}
 className="transition-colors duration-300 cursor-none"
 />
 {/* Dudak & Çene */}
 <motion.path 
 d="M 150,340 Q 200,320 250,340 Q 200,380 150,340 M 120,380 Q 200,480 280,380 Q 200,420 120,380" 
 fill={activeArea === 'lips' ? 'rgba(245,158,11,0.2)' : 'transparent'} 
 stroke={activeArea === 'lips' ? '#f59e0b' : 'rgba(255,255,255,0.1)'}
 strokeWidth="2"
 onMouseEnter={() => setActiveArea('lips')}
 onMouseLeave={() => setActiveArea(null)}
 className="transition-colors duration-300 cursor-none"
 />

 {/* Tarama noktaları */}
 <circle cx="200" cy="140" r="3" fill="#f59e0b" className="animate-ping" />
 <circle cx="200" cy="280" r="3" fill="#f59e0b" className="animate-ping" style={{ animationDelay: '0.5s' }}/>
 <circle cx="200" cy="340" r="3" fill="#f59e0b" className="animate-ping" style={{ animationDelay: '1s' }}/>
 </svg>
 </div>
 </div>
 </section>
 )
}

export function KlinikVipContact({ state }: { state: DefaultThemeState }) {
 return (
 <section className="bg-[#050505] font-syne text-center py-32 border-t border-white/5 relative z-10">
 <h2 className="text-4xl text-white font-bold mb-4">{state.contact.title}</h2>
 <p className="text-[#f59e0b] font-sans tracking-widest uppercase text-sm mb-12">{state.contact.subtitle}</p>
 
 <div className="max-w-md mx-auto flex flex-col gap-6">
 <a href={`tel:${state.contact.phone}`} className="w-full bg-white/5 border border-white/10 text-white py-6 rounded-2xl hover:bg-white/10 hover:border-[#f59e0b] transition-all text-xl">
 {state.contact.phone}
 </a>
 <a href={`mailto:${state.contact.email}`} className="text-gray-500 font-sans hover:text-white transition-colors">
 {state.contact.email}
 </a>
 </div>
 </section>
 )
}
