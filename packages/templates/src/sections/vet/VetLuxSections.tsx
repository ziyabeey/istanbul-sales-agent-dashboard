'use client'

import React, { useState, useEffect } from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'
import { Phone, MapPin, Instagram, Sparkles, Star, ChevronRight, Pause, Play, ArrowRight } from 'lucide-react'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function VetLuxSections({ config, businessData }: Props) {
 const [mounted, setMounted] = useState(false)
 const [isVideoPlaying, setIsVideoPlaying] = useState(true)

 useEffect(() => {
 setMounted(true)
 }, [])

 if (!mounted) return null

 return (
 <div className="min-h-screen font-body bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-accent)] selection:text-[var(--color-text-on-accent)]">
 
 {/* HEADER: Edge to edge floating */}
 <header className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
 <div className="font-heading font-black text-xl tracking-tighter uppercase flex items-center gap-3">
 <Sparkles size={20} /> {businessData.name}
 </div>
 <div className="flex items-center gap-8">
 <a href="#spa" className="hidden md:block text-xs font-semibold tracking-widest uppercase hover:opacity-70 transition-opacity">Spa & Wellness</a>
 <a href={`tel:${businessData.phoneClean}`} className="text-xs font-semibold tracking-widest uppercase border border-white/30 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors">
 Concierge
 </a>
 </div>
 </header>

 {/* HERO: Cinematic Full Screen */}
 <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
 {/* Fake Video bg using an image with slight scale animation or a gif */}
 <div className="absolute inset-0 z-0">
 <img 
 src={businessData.photos?.[0] || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80'} 
 alt="Premium Pet Care"
 className="w-full h-full object-cover opacity-60 scale-105 transform animate-slow-pan"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
 </div>
 
 <div className="relative z-10 text-center max-w-4xl px-6 text-white">
 <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter leading-[0.9]">
 Saf <br/><span className="italic text-[var(--color-text-secondary)] font-light">Elegans.</span>
 </h1>
 <p className="text-xl md:text-2xl font-light text-white/80 max-w-2xl mx-auto mb-10">
 Evcil hayvan deneyimini yeniden tanımlayan bir bakım, sağlık ve premium otel konsepti.
 </p>
 <div className="flex justify-center">
 <a href="#hizmetler" className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
 <ChevronRight size={24} className="rotate-90" />
 </a>
 </div>
 </div>

 <button 
 onClick={() => setIsVideoPlaying(!isVideoPlaying)} 
 className="absolute bottom-8 right-8 z-20 text-white/50 hover:text-white transition-colors flex items-center gap-2 text-xs uppercase tracking-widest"
 >
 {isVideoPlaying ? <Pause size={14} /> : <Play size={14} />} {isVideoPlaying ? 'Pause Video' : 'Play Video'}
 </button>
 </section>

 {/* SERVICES: Dark Minimalism */}
 <section id="hizmetler" className="py-32 px-6 md:px-12 bg-[var(--color-bg)]">
 <div className="max-w-[1440px] mx-auto">
 <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-10">
 <h2 className="font-heading text-5xl md:text-7xl font-black tracking-tighter leading-[1]">Ayrıcalıklı <br className="hidden md:block"/>Hizmetler.</h2>
 <p className="max-w-md text-[var(--color-text-secondary)] text-lg leading-relaxed font-light">
 VIP ulaşım servisinden, ozon terapili hidro masaj havuzlarına kadar tamamen kişiselleştirilmiş hizmet protokolleri.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-y border-[var(--color-border)]">
 {[
 { num: '01', title: 'Premium Klinik', desc: 'Sıfır bekleme süresi, kişiye özel hekim ataması ve stress-free lounge alanı.' },
 { num: '02', title: 'Spa & Wellness', desc: 'Ozon terapi, çamur banyosu, aromaterapi ve profesyonel styling hizmetleri.' },
 { num: '03', title: 'Luxury Hotel', desc: 'Kamera sistemli, sıcaklık kontrollü özel süitlerde 5 yıldızlı konaklama deneyimi.' }
 ].map((s, i) => (
 <div key={i} className="group border-b lg:border-b-0 lg:border-r border-[var(--color-border)] last:border-0 p-12 hover:bg-[var(--color-surface)] transition-colors cursor-pointer">
 <div className="text-[var(--color-text-muted)] font-mono text-sm mb-16">{s.num}</div>
 <h3 className="font-heading text-3xl font-black mb-6">{s.title}</h3>
 <p className="text-[var(--color-text-secondary)] leading-relaxed font-light">{s.desc}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* HOTEL & SPA: Huge Image Right */}
 <section id="spa" className="py-24 px-0 bg-[var(--color-surface)] overflow-hidden">
 <div className="w-full flex flex-col lg:flex-row">
 <div className="w-full lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center">
 <span className="text-[var(--color-accent)] text-xs font-bold tracking-[0.2em] uppercase mb-8">Pettal Hotel & Spa</span>
 <h2 className="font-heading text-5xl md:text-6xl font-black mb-8 leading-[1]">Konforun <br/>Zirvesi.</h2>
 <p className="text-[var(--color-text-secondary)] text-lg font-light leading-relaxed mb-12 max-w-lg">
 Dostlarınız, standartları yeniden belirleyen süitlerimizde konaklarken, günlük spa ritüelleriyle rahatlar. Dünyanın en iyi organik içerikleri ve uzman pet stilistleri.
 </p>
 <a href="#iletisim" className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest hover:text-[var(--color-accent)] transition-colors">
 Rezervasyon Yap <ArrowRight size={16} />
 </a>
 </div>
 <div className="w-full lg:w-1/2 h-[500px] lg:h-auto min-h-[600px] relative">
 <img 
 src={businessData.photos?.[1] || 'https://images.unsplash.com/photo-1542287232-005ca135b5a0?auto=format&fit=crop&q=80'} 
 className="absolute inset-0 w-full h-full object-cover" 
 alt="Luxury Dog Spa" 
 />
 </div>
 </div>
 </section>

 {/* FOOTER */}
 <footer id="iletisim" className="bg-[var(--color-bg)] text-center py-32 px-6 border-t border-[var(--color-border)]">
 <Sparkles className="mx-auto text-[var(--color-accent)] mb-8" size={32} />
 <h2 className="font-heading text-4xl md:text-6xl font-black mb-12">{businessData.name}</h2>
 <div className="flex flex-col md:flex-row justify-center items-center gap-12 text-[var(--color-text-secondary)] font-light tracking-wide mb-16">
 <a href={`tel:${businessData.phoneClean}`} className="hover:text-white transition-colors">{businessData.phone}</a>
 <span className="hidden md:inline-block w-1 h-1 bg-[var(--color-border)] rounded-full"></span>
 <span>{businessData.address}</span>
 <span className="hidden md:inline-block w-1 h-1 bg-[var(--color-border)] rounded-full"></span>
 <a href={`mailto:${businessData.email}`} className="hover:text-white transition-colors">{businessData.email}</a>
 </div>
 <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--color-text-muted)]">
 © {new Date().getFullYear()} — Tüm Hakları Tarafımızca Saklıdır.
 </div>
 </footer>

 </div>
 )
}

registerSection('hero', 'vet_lux_full', VetLuxSections as unknown as React.ComponentType<any>)
