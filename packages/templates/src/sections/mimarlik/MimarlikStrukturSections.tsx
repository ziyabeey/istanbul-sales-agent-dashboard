'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { ArrowRight, ChevronDown, MapPin, Mail, Phone, Instagram, MoveUpRight, Trophy } from 'lucide-react'
import { registerSection } from '../../registry/section-registry'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function MimarlikStrukturSections({ config, businessData }: Props) {
 const [mounted, setMounted] = useState(false)
 const videoRef = useRef<HTMLVideoElement>(null)

 useEffect(() => {
 setMounted(true)
 if (videoRef.current) {
 videoRef.current.play().catch(e => console.log('Autoplay prevented', e))
 }
 }, [])

 if (!mounted) return null

 const getSection = (id: string) => config.pages?.[0]!.sections.find(s => s.id === id)
 const heroData = getSection('hero')?.defaultContent as any
 const portfolioItems = (getSection('portfolio')?.defaultContent?.items as any[]) || []
 const approachData = getSection('story')?.defaultContent as any
 const statsItems = (getSection('stats')?.defaultContent?.items as any[]) || []
 const awardsData = getSection('awards')?.defaultContent as any

 return (
 <div className="min-h-screen font-body bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-text)] selection:text-[var(--color-bg)]">
 
 {/* HEADER (Industrial Minimal) */}
 <header className="fixed top-0 left-0 w-full z-50 px-6 py-5 md:px-12 flex justify-between items-center mix-blend-difference text-white">
 <div className="font-heading font-black text-2xl tracking-tighter uppercase">
 {businessData.name?.split(' ')[0]}
 </div>
 <div className="hidden md:flex gap-10 font-heading text-xs uppercase tracking-widest font-bold">
 <a href="#portfolio" className="hover:text-[var(--color-accent)] transition-colors">Projeler</a>
 <a href="#story" className="hover:text-[var(--color-accent)] transition-colors">Felsefe</a>
 <a href="#awards" className="hover:text-[var(--color-accent)] transition-colors">Ödüller</a>
 <a href="#iletisim" className="hover:text-[var(--color-accent)] transition-colors">İletişim</a>
 </div>
 <a href="#iletisim" className="border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors rounded-sm hidden md:block">
 Teklif Al
 </a>
 </header>

 {/* HERO: Video Showreel Background */}
 <section className="relative w-full h-screen flex flex-col justify-end pb-12 px-6 md:px-12 overflow-hidden bg-black">
 <div className="absolute inset-0 bg-black">
 {heroData?.videoUrl ? (
 <video 
 ref={videoRef}
 src={heroData.videoUrl} 
 autoPlay 
 loop 
 muted 
 playsInline
 className="w-full h-full object-cover opacity-60"
 />
 ) : (
 <img src="https://images.unsplash.com/photo-1510627498534-cf7e9002fcca?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-50" />
 )}
 </div>
 
 <div className="relative z-10 w-full flex flex-col items-center text-center">
 <h1 className="font-heading text-6xl md:text-[10vw] font-black uppercase tracking-tighter leading-none mb-4 mix-blend-overlay opacity-90">
 {heroData?.title}
 </h1>
 <p className="text-sm md:text-xl text-[var(--color-text-secondary)] tracking-widest uppercase mb-12 max-w-2xl font-light">
 {heroData?.subtitle}
 </p>
 <a href="#portfolio" className="animate-bounce mt-10 p-4 rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white transition-colors">
 <ChevronDown size={24} />
 </a>
 </div>
 </section>

 {/* PORTFOLIO GRID: Filterable Dark UI */}
 <section id="portfolio" className="py-24 md:py-32 px-6 md:px-12 bg-[var(--color-surface)]">
 <div className="max-w-[1400px] mx-auto">
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
 <div>
 <span className="block text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] mb-4">{getSection('portfolio')?.defaultContent?.badge as any}</span>
 <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tighter">{getSection('portfolio')?.defaultContent?.title as any}</h2>
 </div>
 <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
 <button className="text-xs uppercase tracking-widest font-bold border-b-2 border-white pb-1 whitespace-nowrap">Tümü</button>
 <button className="text-xs uppercase tracking-widest font-bold text-[var(--color-text-muted)] border-b-2 border-transparent pb-1 hover:text-white transition-colors whitespace-nowrap">Karma</button>
 <button className="text-xs uppercase tracking-widest font-bold text-[var(--color-text-muted)] border-b-2 border-transparent pb-1 hover:text-white transition-colors whitespace-nowrap">Konut</button>
 <button className="text-xs uppercase tracking-widest font-bold text-[var(--color-text-muted)] border-b-2 border-transparent pb-1 hover:text-white transition-colors whitespace-nowrap">Kültür</button>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border)]">
 {portfolioItems.map((item: any, idx: number) => (
 <div key={item.id} className="group relative aspect-video overflow-hidden bg-[var(--color-bg)] cursor-pointer">
 <img 
 src={item.image} 
 alt={item.title} 
 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
 <p className="text-xs uppercase tracking-widest text-[var(--color-accent)] mb-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">{item.category}</p>
 <div className="flex justify-between items-end">
 <h3 className="font-heading text-3xl font-bold uppercase tracking-tighter">{item.title}</h3>
 <MoveUpRight size={32} className="opacity-0 group-hover:opacity-100 -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 delay-100" />
 </div>
 </div>
 </div>
 ))}
 </div>
 <div className="mt-12 flex justify-center">
 <button className="border border-[var(--color-border-strong)] px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[var(--color-surface-elevated)] transition-colors">
 Tüm Projeleri Yükle
 </button>
 </div>
 </div>
 </section>

 {/* STORY & STATS (Dark Bar) */}
 <section id="story" className="py-24 md:py-32 border-t border-[var(--color-border-strong)] bg-[var(--color-bg)]">
 <div className="max-w-[1400px] mx-auto px-6 md:px-12">
 
 {/* Story */}
 <div className="max-w-4xl mb-32">
 <span className="block text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] mb-6">{approachData?.badge}</span>
 <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-tight mb-8">
 {approachData?.title}
 </h2>
 <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] leading-relaxed font-light">
 {approachData?.description}
 </p>
 </div>

 {/* Stats Row */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 border-t border-[var(--color-border)] pt-16">
 {statsItems.map((stat: any, idx: number) => (
 <div key={idx} className="flex flex-col border-l border-[var(--color-border)] pl-6">
 <span className="font-heading text-5xl md:text-7xl font-black tracking-tighter text-[var(--color-text)] mb-2">{stat.value}</span>
 <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">{stat.label}</span>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* AWARDS PRESS */}
 <section id="awards" className="py-24 md:py-32 px-6 md:px-12 bg-[var(--color-surface)] border-y border-[var(--color-border-strong)]">
 <div className="max-w-[1000px] mx-auto">
 <div className="flex items-center gap-4 mb-16">
 <Trophy size={32} className="text-[var(--color-accent)]" />
 <div>
 <span className="block text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]">{awardsData?.badge}</span>
 <h2 className="font-heading text-3xl font-bold uppercase tracking-tighter">{awardsData?.title}</h2>
 </div>
 </div>

 <div className="flex flex-col">
 {awardsData?.awards?.map((award: any, idx: number) => (
 <div key={award.id} className="group border-t border-[var(--color-border)] py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-crosshair hover:bg-[var(--color-surface-elevated)] transition-colors px-4 -mx-4">
 <div className="flex items-center gap-6">
 <span className="font-heading text-2xl font-bold text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors">{award.year}</span>
 <h3 className="font-heading text-xl md:text-2xl font-bold tracking-tight uppercase group-hover:text-[var(--color-accent-hover)] transition-colors">{award.title}</h3>
 </div>
 <p className="text-sm text-[var(--color-text-secondary)] uppercase tracking-wider">{award.category}</p>
 </div>
 ))}
 <div className="border-t border-[var(--color-border)]"></div>
 </div>
 </div>
 </section>

 {/* CONTACT (Split Form & Dark UI) */}
 <section id="iletisim" className="py-24 md:py-32 px-6 md:px-12 bg-[var(--color-bg)]">
 <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
 <div>
 <span className="block text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] mb-6">İletişim & Lokasyon</span>
 <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8 leading-none">
 Yeni Bir Proje <br/>Konuşalım.
 </h2>
 <div className="h-0.5 w-16 bg-[var(--color-accent)] mb-12"></div>
 
 <div className="space-y-8 text-sm md:text-base">
 <div className="flex items-start gap-4">
 <MapPin className="text-[var(--color-accent)] mt-1" size={24} />
 <div>
 <div className="font-bold uppercase tracking-widest mb-1 text-[var(--color-text-secondary)] text-xs">Genel Merkez</div>
 <p className="leading-relaxed">{businessData.address}</p>
 </div>
 </div>
 <div className="flex items-start gap-4">
 <Phone className="text-[var(--color-accent)] mt-1" size={24} />
 <div>
 <div className="font-bold uppercase tracking-widest mb-1 text-[var(--color-text-secondary)] text-xs">Telefon</div>
 <a href={`tel:${businessData.phoneClean}`} className="hover:text-white transition-colors">{businessData.phone}</a>
 </div>
 </div>
 <div className="flex items-start gap-4">
 <Mail className="text-[var(--color-accent)] mt-1" size={24} />
 <div>
 <div className="font-bold uppercase tracking-widest mb-1 text-[var(--color-text-secondary)] text-xs">E-Posta</div>
 <a href={`mailto:${businessData.email}`} className="hover:text-white transition-colors">{businessData.email}</a>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-[var(--color-surface)] p-8 md:p-12">
 <h3 className="font-heading text-2xl font-bold uppercase tracking-tighter mb-8 border-b border-[var(--color-border)] pb-4">Proje Formu</h3>
 <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div className="flex flex-col border-b border-[var(--color-border-strong)]">
 <label className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-text-muted)] mb-2">Adınız</label>
 <input type="text" className="bg-transparent pb-3 text-sm focus:outline-none focus:border-[var(--color-accent-hover)] transition-colors" />
 </div>
 <div className="flex flex-col border-b border-[var(--color-border-strong)]">
 <label className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-text-muted)] mb-2">Kurum / Firma</label>
 <input type="text" className="bg-transparent pb-3 text-sm focus:outline-none focus:border-[var(--color-accent-hover)] transition-colors" />
 </div>
 </div>
 <div className="flex flex-col border-b border-[var(--color-border-strong)]">
 <label className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-text-muted)] mb-2">E-Posta</label>
 <input type="email" className="bg-transparent pb-3 text-sm focus:outline-none focus:border-[var(--color-accent-hover)] transition-colors" />
 </div>
 <div className="flex flex-col border-b border-[var(--color-border-strong)]">
 <label className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-text-muted)] mb-2">Proje Detayları</label>
 <textarea rows={3} className="bg-transparent pb-3 text-sm focus:outline-none focus:border-[var(--color-accent-hover)] transition-colors resize-none"></textarea>
 </div>
 <button type="submit" className="self-start mt-4 bg-[var(--color-text)] text-[var(--color-bg)] px-12 py-5 font-heading uppercase font-bold tracking-widest text-xs hover:bg-[var(--color-accent-hover)] transition-colors">
 Talebi İlet
 </button>
 </form>
 </div>
 </div>
 </section>

 {/* FOOTER */}
 <footer className="py-8 px-6 md:px-12 border-t border-[var(--color-border)] bg-[var(--color-bg)] flex flex-col md:flex-row justify-between items-center gap-6">
 <div className="font-heading font-black text-xl uppercase tracking-tighter text-[var(--color-text-muted)]">
 STRÜKTÜR
 </div>
 <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] hover:[&>a]:text-[var(--color-text)]">
 <a href="#" className="transition-colors">Instagram</a>
 <a href="#" className="transition-colors">LinkedIn</a>
 <a href="#" className="transition-colors">Gizlilik</a>
 </div>
 </footer>
 </div>
 )
}

registerSection('hero', 'mimarlik_struktur_full', MimarlikStrukturSections as unknown as React.ComponentType<any>)
