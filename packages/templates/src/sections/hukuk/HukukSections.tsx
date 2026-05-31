'use client'

import React, { useEffect, useRef, useState } from 'react'

type DefaultThemeState = any

/* ═══════════════════════════════════════════════════════════════════
 TIER 1 — HUKUK SADE (Temel / Bio-Link)
 Tek sütun, beyaz/lacivert, ultra-yalın
 ═══════════════════════════════════════════════════════════════════ */

export function HukukSadeHero({ state }: { state: DefaultThemeState }) {
 return (
 <section className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-20 font-inter">
 <div className="w-24 h-24 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white text-3xl font-bold mb-6">
 ⚖️
 </div>
 <h1 className="text-3xl md:text-5xl font-bold text-[#1e3a5f] text-center mb-3 tracking-tight">
 {state.hero.title}
 </h1>
 <p className="text-gray-500 text-center max-w-md text-lg mb-8">{state.hero.subtitle}</p>
 <a href="#contact" className="bg-[#1e3a5f] text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#15304d] transition-colors">
 {state.hero.buttonText || 'Hemen Arayın'}
 </a>
 </section>
 )
}

export function HukukSadeServices({ state }: { state: DefaultThemeState }) {
 return (
 <section className="bg-gray-50 py-16 px-6 font-inter">
 <div className="max-w-md mx-auto space-y-4">
 {state.services.items.map((item: any) => (
 <div key={item.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
 <div className="flex items-center gap-4">
 <span className="text-2xl">{item.icon}</span>
 <div>
 <h3 className="font-semibold text-[#1e3a5f] text-lg">{item.title}</h3>
 <p className="text-gray-400 text-sm mt-1">{item.description}</p>
 </div>
 </div>
 </div>
 ))}
 </div>
 </section>
 )
}

export function HukukSadeContact({ state }: { state: DefaultThemeState }) {
 return (
 <section id="contact" className="bg-white py-16 px-6 font-inter text-center">
 <div className="max-w-md mx-auto space-y-6">
 <h2 className="text-2xl font-bold text-[#1e3a5f]">{state.contact.title}</h2>
 <a href={'tel:' + state.contact.phone} className="block bg-[#1e3a5f] text-white py-4 rounded-2xl font-semibold text-lg hover:bg-[#15304d] transition-colors">
 📞 {state.contact.phone}
 </a>
 <a href={'mailto:' + state.contact.email} className="block border-2 border-[#1e3a5f] text-[#1e3a5f] py-4 rounded-2xl font-semibold hover:bg-[#1e3a5f] hover:text-white transition-colors">
 ✉️ {state.contact.email}
 </a>
 <p className="text-gray-400 text-sm">{state.contact.address}</p>
 </div>
 </section>
 )
}

/* ═══════════════════════════════════════════════════════════════════
 TIER 2 — HUKUK KURUMSAL (Standart / 30-70 Sticky Sidebar)
 Krem/altın palet, Libre Baskerville heading
 ═══════════════════════════════════════════════════════════════════ */

export function HukukKurumsalHero({ state }: { state: DefaultThemeState }) {
 return (
 <section className="min-h-screen bg-[#f5f4f0] flex font-['Libre_Baskerville',serif]">
 {/* Sol Sticky Panel — 30% */}
 <div className="hidden md:flex w-[30%] bg-[#1c2b3a] sticky top-0 h-screen flex-col justify-center items-center text-center px-8">
 <div className="text-6xl mb-6">⚖️</div>
 <h2 className="text-[#c9a84c] text-xl font-bold mb-2">{state.hero.title}</h2>
 <p className="text-white/60 text-sm mb-8">{state.hero.subtitle}</p>
 <a href="#iletisim" className="bg-[#c9a84c] text-[#1c2b3a] px-6 py-3 rounded-lg text-sm font-bold hover:bg-[#d4b45c] transition-colors">
 Randevu Al
 </a>
 <div className="mt-12 space-y-2 text-white/40 text-xs">
 <p>📞 {state.contact.phone}</p>
 <p>✉️ {state.contact.email}</p>
 <p>📍 {state.contact.address}</p>
 </div>
 </div>

 {/* Sağ Kayan İçerik — 70% */}
 <div className="flex-1 overflow-y-auto">
 {/* Mobil Hero */}
 <div className="md:hidden bg-[#1c2b3a] px-6 py-16 text-center">
 <div className="text-5xl mb-4">⚖️</div>
 <h1 className="text-[#c9a84c] text-2xl font-bold mb-2">{state.hero.title}</h1>
 <p className="text-white/60 text-sm">{state.hero.subtitle}</p>
 </div>

 {/* Uzmanlık Alanları */}
 <div className="px-8 md:px-16 py-16">
 <h2 className="text-3xl font-bold text-[#1c2b3a] mb-2">Uzmanlık Alanlarımız</h2>
 <div className="w-16 h-1 bg-[#c9a84c] mb-10"></div>
 <div className="space-y-6">
 {state.services.items.map((item: any, idx: number) => (
 <ScrollReveal key={item.id} delay={idx * 100}>
 <div className="bg-white rounded-xl p-8 border border-[#e8e4dc] hover:border-[#c9a84c]/40 hover:shadow-lg transition-all duration-300 group">
 <div className="flex items-start gap-5">
 <span className="text-3xl mt-1 group-hover:scale-110 transition-transform">{item.icon}</span>
 <div>
 <h3 className="text-xl font-bold text-[#1c2b3a] mb-2">{item.title}</h3>
 <p className="text-[#7a7060] leading-relaxed">{item.description}</p>
 </div>
 </div>
 </div>
 </ScrollReveal>
 ))}
 </div>
 </div>

 {/* Referanslar */}
 <div className="px-8 md:px-16 py-16 bg-white">
 <h2 className="text-3xl font-bold text-[#1c2b3a] mb-2">Müvekkil Referansları</h2>
 <div className="w-16 h-1 bg-[#c9a84c] mb-10"></div>
 <blockquote className="italic text-[#7a7060] text-lg leading-relaxed border-l-4 border-[#c9a84c] pl-6">
 &ldquo;Karaağaç Hukuk Bürosu ile çalışmak, hukuki süreçlerimizi tamamen profesyonel ellere bırakmamızı sağladı.&rdquo;
 </blockquote>
 <p className="mt-4 text-[#1c2b3a] font-bold">— Ahmet Y., İşletme Sahibi</p>
 </div>
 </div>
 </section>
 )
}

/* ═══════════════════════════════════════════════════════════════════
 TIER 3 — HUKUK MODERN (Büyüme / Masonry + Karusel)
 Space Grotesk, yeşil tonlar
 ═══════════════════════════════════════════════════════════════════ */

export function HukukModernHero({ state }: { state: DefaultThemeState }) {
 return (
 <section className="min-h-[90vh] bg-[#f8f9fa] flex items-center font-['Space_Grotesk',sans-serif] relative overflow-hidden">
 <div className="absolute top-0 right-0 w-[60%] h-full bg-[#166534] clip-diagonal hidden md:block" />
 <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 grid md:grid-cols-2 gap-16 items-center py-20">
 <div>
 <span className="inline-block text-[#166534] text-sm font-bold tracking-widest uppercase mb-4 bg-[#166534]/10 px-4 py-2 rounded-full">
 Hukuk & Danışmanlık
 </span>
 <h1 className="text-4xl md:text-6xl font-bold text-[#111827] leading-tight mb-6 tracking-tight">
 {state.hero.title}
 </h1>
 <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
 {state.hero.subtitle}
 </p>
 <div className="flex gap-4">
 <a href="#hizmetler" className="bg-[#166534] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#14532d] transition-colors">
 Hizmetlerimiz
 </a>
 <a href="#iletisim" className="border-2 border-[#166534] text-[#166534] px-8 py-4 rounded-xl font-bold hover:bg-[#166534] hover:text-white transition-colors">
 İletişim
 </a>
 </div>
 </div>
 <div className="hidden md:block">
 <img
 src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80&auto=format"
 alt="Hukuk"
 className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
 />
 </div>
 </div>
 <style>{'.clip-diagonal { clip-path: polygon(30% 0, 100% 0, 100% 100%, 0% 100%); }'}</style>
 </section>
 )
}

export function HukukModernServices({ state }: { state: DefaultThemeState }) {
 return (
 <section id="hizmetler" className="py-24 px-6 bg-white font-['Space_Grotesk',sans-serif]">
 <div className="max-w-7xl mx-auto">
 <div className="text-center mb-16">
 <h2 className="text-4xl font-bold text-[#111827] mb-4">Hizmet Alanlarımız</h2>
 <p className="text-gray-400 max-w-lg mx-auto">Her dava benzersizdir. Sizin için en doğru stratejiyi belirleriz.</p>
 </div>
 <div className="grid md:grid-cols-3 gap-6">
 {state.services.items.map((item: any, idx: number) => (
 <ScrollReveal key={item.id} delay={idx * 120}>
 <div className="group bg-[#f8f9fa] rounded-2xl p-8 border border-gray-100 hover:border-[#166534]/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
 <span className="text-4xl block mb-4">{item.icon}</span>
 <h3 className="text-xl font-bold text-[#111827] mb-3">{item.title}</h3>
 <p className="text-gray-500 leading-relaxed">{item.description}</p>
 <div className="mt-6 w-0 group-hover:w-full h-0.5 bg-[#166534] transition-all duration-500"></div>
 </div>
 </ScrollReveal>
 ))}
 </div>
 </div>
 </section>
 )
}

export function HukukModernContact({ state }: { state: DefaultThemeState }) {
 return (
 <section id="iletisim" className="py-24 px-6 bg-[#f8f9fa] font-['Space_Grotesk',sans-serif]">
 <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
 <div>
 <h2 className="text-4xl font-bold text-[#111827] mb-6">{state.contact.title}</h2>
 <p className="text-gray-500 mb-8 leading-relaxed">{state.contact.subtitle}</p>
 <div className="space-y-4">
 <div className="flex items-center gap-4 text-[#111827]">
 <span className="w-12 h-12 rounded-xl bg-[#166534]/10 flex items-center justify-center text-[#166534] text-xl">📞</span>
 <span className="font-medium">{state.contact.phone}</span>
 </div>
 <div className="flex items-center gap-4 text-[#111827]">
 <span className="w-12 h-12 rounded-xl bg-[#166534]/10 flex items-center justify-center text-[#166534] text-xl">✉️</span>
 <span className="font-medium">{state.contact.email}</span>
 </div>
 <div className="flex items-center gap-4 text-[#111827]">
 <span className="w-12 h-12 rounded-xl bg-[#166534]/10 flex items-center justify-center text-[#166534] text-xl">📍</span>
 <span className="font-medium">{state.contact.address}</span>
 </div>
 </div>
 </div>
 <form className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-5">
 <input type="text" placeholder="Ad Soyad" className="w-full border border-gray-200 rounded-xl px-5 py-4 text-sm outline-none focus:border-[#166534] transition-colors" />
 <input type="email" placeholder="E-Posta" className="w-full border border-gray-200 rounded-xl px-5 py-4 text-sm outline-none focus:border-[#166534] transition-colors" />
 <textarea placeholder="Mesajınız" rows={4} className="w-full border border-gray-200 rounded-xl px-5 py-4 text-sm outline-none focus:border-[#166534] transition-colors resize-none"></textarea>
 <button type="button" className="w-full bg-[#166534] text-white py-4 rounded-xl font-bold hover:bg-[#14532d] transition-colors">
 Gönder
 </button>
 </form>
 </div>
 </section>
 )
}

/* ═══════════════════════════════════════════════════════════════════
 TIER 4 — HUKUK PRESTİJ (Premium / Dark & Gold Snap Scroll)
 Playfair Display, koyu zemin, altın vurgu
 ═══════════════════════════════════════════════════════════════════ */

export function HukukPrestijHero({ state }: { state: DefaultThemeState }) {
 return (
 <section className="h-screen snap-start bg-[#0a0f1a] flex items-center justify-center relative overflow-hidden font-['Playfair_Display',serif]">
 <div
 className="absolute inset-0 bg-cover bg-center opacity-20"
 style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80&auto=format)' }}
 />
 <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-[#0a0f1a]" />
 <div className="relative z-10 text-center max-w-4xl px-6">
 <div className="inline-block border border-[#d4af37]/30 rounded-full px-6 py-2 mb-8">
 <span className="text-[#d4af37] text-sm font-sans tracking-[0.3em] uppercase">Hukuk & Strateji</span>
 </div>
 <h1 className="text-5xl md:text-8xl font-bold text-[#f5f0e8] leading-[0.9] mb-6 tracking-tight">
 {state.hero.title}
 </h1>
 <p className="text-[#f5f0e8]/50 text-xl md:text-2xl font-sans mb-10 max-w-2xl mx-auto leading-relaxed">
 {state.hero.subtitle}
 </p>
 <a href="#ekip" className="inline-block bg-[#d4af37] text-[#0a0f1a] px-10 py-5 rounded-none text-sm font-sans font-bold tracking-widest uppercase hover:bg-[#e0c04f] transition-colors">
 Ekibimizi Tanıyın
 </a>
 </div>
 {/* Alt kaydırma işareti */}
 <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
 <div className="w-6 h-10 border-2 border-[#d4af37]/30 rounded-full flex items-start justify-center pt-2">
 <div className="w-1 h-3 bg-[#d4af37] rounded-full"></div>
 </div>
 </div>
 </section>
 )
}

export function HukukPrestijServices({ state }: { state: DefaultThemeState }) {
 return (
 <section id="ekip" className="min-h-screen snap-start bg-[#0a0f1a] py-32 px-6 font-['Playfair_Display',serif]">
 <div className="max-w-6xl mx-auto">
 <div className="text-center mb-20">
 <h2 className="text-4xl md:text-6xl font-bold text-[#f5f0e8] mb-4">Uzmanlık Alanları</h2>
 <div className="w-20 h-0.5 bg-[#d4af37] mx-auto"></div>
 </div>
 <div className="grid md:grid-cols-3 gap-8">
 {state.services.items.map((item: any, idx: number) => (
 <ScrollReveal key={item.id} delay={idx * 150}>
 <div className="border border-[#d4af37]/20 p-10 text-center hover:border-[#d4af37]/60 hover:bg-[#d4af37]/5 transition-all duration-500 group">
 <span className="text-5xl block mb-6 group-hover:scale-110 transition-transform duration-500">{item.icon}</span>
 <h3 className="text-2xl font-bold text-[#d4af37] mb-4">{item.title}</h3>
 <p className="text-[#f5f0e8]/40 leading-relaxed font-sans">{item.description}</p>
 </div>
 </ScrollReveal>
 ))}
 </div>
 </div>
 </section>
 )
}

export function HukukPrestijContact({ state }: { state: DefaultThemeState }) {
 return (
 <section className="min-h-screen snap-start bg-[#0a0f1a] flex items-center py-32 px-6 font-['Playfair_Display',serif]">
 <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-20 w-full">
 <div>
 <h2 className="text-5xl md:text-7xl font-bold text-[#f5f0e8] leading-none mb-8">
 {state.contact.title}
 </h2>
 <p className="text-[#f5f0e8]/40 text-lg font-sans leading-relaxed mb-12">
 {state.contact.subtitle}
 </p>
 <div className="space-y-6 font-sans">
 <p className="text-[#d4af37] text-lg">{state.contact.phone}</p>
 <p className="text-[#f5f0e8]/60">{state.contact.email}</p>
 <p className="text-[#f5f0e8]/40">{state.contact.address}</p>
 </div>
 </div>
 <form className="space-y-6 border-l border-[#d4af37]/20 pl-10 font-sans">
 <input type="text" placeholder="Ad Soyad" className="w-full bg-transparent border-b border-[#f5f0e8]/10 pb-4 text-lg text-[#f5f0e8] placeholder:text-[#f5f0e8]/20 outline-none focus:border-[#d4af37] transition-colors" />
 <input type="email" placeholder="E-Posta" className="w-full bg-transparent border-b border-[#f5f0e8]/10 pb-4 text-lg text-[#f5f0e8] placeholder:text-[#f5f0e8]/20 outline-none focus:border-[#d4af37] transition-colors" />
 <textarea placeholder="Davanızı Anlatın" rows={4} className="w-full bg-transparent border-b border-[#f5f0e8]/10 pb-4 text-lg text-[#f5f0e8] placeholder:text-[#f5f0e8]/20 outline-none focus:border-[#d4af37] transition-colors resize-none"></textarea>
 <button type="button" className="w-full border border-[#d4af37] text-[#d4af37] py-5 text-sm font-bold tracking-widest uppercase hover:bg-[#d4af37] hover:text-[#0a0f1a] transition-colors duration-500">
 Gönder
 </button>
 </form>
 </div>
 </section>
 )
}

/* ═══════════════════════════════════════════════════════════════════
 TIER 5 — HUKUK ELİT (Premium+ / SVG Hotspots)
 Syne, siyah/bronz, Awwwards seviyesi
 ═══════════════════════════════════════════════════════════════════ */

const HUKUK_DALLARI = [
 { id: 'ceza', label: 'Ceza Hukuku', x: 50, y: 20, desc: 'Ağır ceza, siber suçlar, uyuşturucu davaları, savunma stratejisi.' },
 { id: 'ticaret', label: 'Ticaret Hukuku', x: 25, y: 45, desc: 'Şirket birleşmeleri, iflas, sözleşme uyuşmazlıkları, tahkim.' },
 { id: 'aile', label: 'Aile Hukuku', x: 75, y: 45, desc: 'Boşanma, velayet, nafaka, mal paylaşımı ve anlaşmalı süreçler.' },
 { id: 'is', label: 'İş Hukuku', x: 20, y: 72, desc: 'İşçi alacakları, işe iade, iş kazası tazminatı, arabuluculuk.' },
 { id: 'gayri', label: 'Gayrimenkul', x: 80, y: 72, desc: 'Tapu iptal, imar davaları, kat mülkiyeti, kamulaştırma.' },
 { id: 'idare', label: 'İdare Hukuku', x: 50, y: 88, desc: 'İdari yargı, iptal davaları, tam yargı, disiplin soruşturmaları.' },
]

export function HukukEliteHero({ state }: { state: DefaultThemeState }) {
 return (
 <section className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden font-syne cursor-none">
 <MagneticCursor />
 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(184,115,51,0.08)_0%,_transparent_70%)]" />
 <div className="relative z-10 text-center max-w-5xl px-6">
 <h1 className="text-6xl md:text-[10rem] font-black text-white leading-[0.8] tracking-tighter mb-6 mix-blend-difference">
 {state.hero.title.toUpperCase()}
 </h1>
 <p className="text-xl md:text-3xl text-[#b87333] font-light tracking-wide">
 {state.hero.subtitle}
 </p>
 <div className="mt-12 animate-bounce">
 <span className="text-[#b87333]/50 text-sm tracking-[0.3em] uppercase">Keşfet ↓</span>
 </div>
 </div>
 </section>
 )
}

export function HukukEliteMap() {
 const [active, setActive] = useState<string | null>(null)
 const activeDal = HUKUK_DALLARI.find(d => d.id === active)

 return (
 <section className="min-h-screen bg-[#050505] py-32 px-6 font-syne relative">
 <div className="max-w-6xl mx-auto">
 <h2 className="text-4xl md:text-6xl font-black text-white text-center mb-4 tracking-tight">
 UZMANLIK <span className="text-[#b87333]">HARİTASI</span>
 </h2>
 <p className="text-zinc-500 text-center mb-20 text-lg">Bir alan seçin, detayları görün.</p>

 <div className="relative aspect-[16/9] max-w-4xl mx-auto">
 {/* SVG Bağlantı Hatları */}
 <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
 {/* Merkez'den dallara giden çizgiler */}
 {HUKUK_DALLARI.map((dal) => (
 <line
 key={dal.id}
 x1="50" y1="50" x2={dal.x} y2={dal.y}
 stroke={active === dal.id ? '#b87333' : '#333'}
 strokeWidth="0.3"
 className="transition-all duration-500"
 />
 ))}
 {/* Merkez nokta */}
 <circle cx="50" cy="50" r="2" fill="#b87333" className="animate-pulse" />
 </svg>

 {/* Hotspot Noktaları */}
 {HUKUK_DALLARI.map((dal) => (
 <button
 key={dal.id}
 className={'absolute w-auto whitespace-nowrap transition-all duration-500 group ' + (active === dal.id ? 'z-20 scale-110' : 'z-10')}
 style={{ left: dal.x + '%', top: dal.y + '%', transform: 'translate(-50%, -50%)' }}
 onMouseEnter={() => setActive(dal.id)}
 onMouseLeave={() => setActive(null)}
 >
 <span
 className={'inline-flex items-center gap-2 px-5 py-3 rounded-full border text-sm font-bold tracking-wide transition-all duration-500 cursor-none ' +
 (active === dal.id
 ? 'bg-[#b87333] border-[#b87333] text-black scale-110'
 : 'bg-transparent border-zinc-700 text-zinc-400 hover:border-[#b87333]/50 hover:text-[#b87333]')
 }
 >
 <span className={'w-2 h-2 rounded-full transition-colors ' + (active === dal.id ? 'bg-black' : 'bg-[#b87333]')} />
 {dal.label}
 </span>
 </button>
 ))}
 </div>

 {/* Detay Paneli */}
 <div className={'max-w-2xl mx-auto mt-16 text-center transition-all duration-500 ' + (activeDal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
 {activeDal && (
 <>
 <h3 className="text-3xl font-black text-[#b87333] mb-4">{activeDal.label}</h3>
 <p className="text-zinc-400 text-lg leading-relaxed font-inter">{activeDal.desc}</p>
 </>
 )}
 </div>
 </div>
 </section>
 )
}

export function HukukEliteContact({ state }: { state: DefaultThemeState }) {
 return (
 <section className="min-h-screen bg-[#050505] flex items-center py-32 px-6 font-syne border-t border-[#b87333]/10">
 <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-20 w-full">
 <div>
 <h2 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter mb-8">
 <span className="text-[#b87333]">ELİT</span><br/>DANIŞMANLIK
 </h2>
 <p className="text-zinc-500 text-xl font-inter leading-relaxed mb-12">{state.contact.subtitle}</p>
 <div className="font-inter space-y-3 text-zinc-400">
 <p className="hover:text-[#b87333] transition-colors cursor-pointer">{state.contact.phone}</p>
 <p className="hover:text-[#b87333] transition-colors cursor-pointer">{state.contact.email}</p>
 </div>
 </div>
 <form className="space-y-8 border-l border-[#b87333]/20 pl-10 font-inter">
 <input type="text" placeholder="Ad Soyad" className="w-full bg-transparent border-b border-white/10 pb-4 text-xl text-white placeholder:text-zinc-700 outline-none focus:border-[#b87333] transition-colors" />
 <input type="email" placeholder="E-Posta" className="w-full bg-transparent border-b border-white/10 pb-4 text-xl text-white placeholder:text-zinc-700 outline-none focus:border-[#b87333] transition-colors" />
 <textarea placeholder="Davanızı Özetleyin" rows={3} className="w-full bg-transparent border-b border-white/10 pb-4 text-xl text-white placeholder:text-zinc-700 outline-none focus:border-[#b87333] transition-colors resize-none"></textarea>
 <button type="button" className="w-full border border-[#b87333] text-[#b87333] py-5 text-sm font-black tracking-[0.3em] uppercase hover:bg-[#b87333] hover:text-black transition-colors duration-500">
 İletişime Geç
 </button>
 </form>
 </div>
 </section>
 )
}

/* ═══════════════════════════════════════════════════════════════════
 SHARED UTILITIES
 ═══════════════════════════════════════════════════════════════════ */

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
 const ref = useRef<HTMLDivElement>(null)
 const [visible, setVisible] = useState(false)
 useEffect(() => {
 const el = ref.current
 if (!el) return
 const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el) } }, { threshold: 0.1 })
 obs.observe(el)
 return () => obs.disconnect()
 }, [])
 return (
 <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1) ' + delay + 'ms' }}>
 {children}
 </div>
 )
}

function MagneticCursor() {
 const [pos, setPos] = useState({ x: 0, y: 0 })
 useEffect(() => {
 const h = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
 window.addEventListener('mousemove', h)
 return () => window.removeEventListener('mousemove', h)
 }, [])
 const tx = pos.x - 16
 const ty = pos.y - 16
 return (
 <div
 className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#b87333] bg-[#b87333]/10 mix-blend-difference pointer-events-none z-[9999] opacity-0 md:opacity-100 transition-transform duration-100 ease-out"
 style={{ transform: 'translate3d(' + tx + 'px, ' + ty + 'px, 0)' }}
 />
 )
}
