'use client'

import React, { useState, useEffect } from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { Phone, MapPin, Instagram, Mail, ArrowRight, Check } from 'lucide-react'
import { registerSection } from '../../registry/section-registry'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function MimarlikCizgiSections({ config, businessData }: Props) {
 const [mounted, setMounted] = useState(false)

 useEffect(() => {
 setMounted(true)
 }, [])

 if (!mounted) return null

 // Portfolio items specific to 'cizgi' theme schema structure
 const portfolioItems: any[] = (config.pages?.[0]!.sections.find(s => s.id === 'portfolio')?.defaultContent?.items as any[]) || []

 return (
 <div className="min-h-screen font-body bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-accent)] selection:text-[var(--color-text-on-accent)]">
 
 {/* HEADER NAVBAR (Ultra Minimal) */}
 <header className="absolute top-0 left-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center text-white mix-blend-difference">
 <div className="font-heading font-bold text-xl tracking-tight uppercase">
 {businessData.name}
 </div>
 <a href={`mailto:${businessData.email}`} className="text-sm font-medium hover:opacity-70 transition-opacity uppercase tracking-wider hidden sm:block">
 {businessData.email}
 </a>
 </header>

 {/* HERO: Fullscreen Overlay */}
 <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#111]">
 <div className="absolute inset-0 opacity-40">
 <img 
 src={businessData.photos?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80'} 
 className="w-full h-full object-cover object-center"
 alt="Hero Background Architecture"
 />
 </div>
 <div className="relative z-10 w-full max-w-[1200px] px-6 md:px-12 mx-auto text-white">
 <span className="block text-xs md:text-sm tracking-[0.2em] uppercase mb-4 opacity-80">
 {businessData.slogan}
 </span>
 <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-8 max-w-4xl">
 Mekanı Yeniden <br />Düşünmek.
 </h1>
 <a href="#portfolio" className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-200 transition-colors">
 Projeleri Keşfet <ArrowRight size={18} />
 </a>
 </div>
 </section>

 {/* PORTFOLIO GRID: Masonry Lightbox (Simplified to Grid for Free Tier) */}
 <section id="portfolio" className="py-24 md:py-32 px-6 md:px-12 max-w-[1200px] mx-auto">
 <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
 <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">Küratör <br className="hidden md:block" />Seçkisi.</h2>
 <p className="max-w-xs text-[var(--color-text-secondary)] text-sm leading-relaxed">
 Son yıllarda üzerinde çalıştığımız ve mekan algısını dönüştüren referans projeler.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-16">
 {portfolioItems.map((item: any, idx: number) => (
 <div key={item.id} className={`group cursor-pointer ${idx % 2 !== 0 ? 'md:mt-16' : ''}`}>
 <div className="aspect-[4/5] overflow-hidden mb-6 bg-[var(--color-surface-muted)]">
 <img 
 src={item.image} 
 alt={item.title} 
 className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
 />
 </div>
 <div className="flex justify-between items-start">
 <div>
 <h3 className="font-heading text-xl font-bold mb-1 group-hover:underline decoration-2 underline-offset-4">{item.title}</h3>
 <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">{item.category}</span>
 </div>
 <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300" size={20} />
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* ABOUT: Split Left */}
 <section className="py-24 md:py-32 px-6 md:px-12 bg-[var(--color-surface)]">
 <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
 <div className="order-2 lg:order-1 aspect-square w-full max-w-md mx-auto lg:max-w-none bg-[var(--color-surface-muted)] overflow-hidden">
 <img 
 src={businessData.photos?.[1] || 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80'} 
 alt="Mimarlık Ofisi" 
 className="w-full h-full object-cover"
 />
 </div>
 <div className="order-1 lg:order-2">
 <span className="block text-xs tracking-widest text-[var(--color-text-muted)] uppercase mb-6">Hakkımızda</span>
 <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-8">
 Fonksiyonun Ötesinde.
 </h2>
 <p className="text-[var(--color-text-secondary)] mb-10 text-lg leading-relaxed">
 2016 yılından bu yana, mekanın sadece barınma ihtiyacını değil, hisleri ve yaşam tarzını yansıtan bir tuval olduğuna inanıyoruz. İstanbul merkezli stüdyomuz, sınırların ötesinde bir estetik sunar.
 </p>
 
 <ul className="space-y-4 mb-10">
 {['Minimalist Yaklaşım', 'Müşteri Odaklı Tasarım', 'Sürdürülebilirlik'].map((feat, i) => (
 <li key={i} className="flex items-center gap-3 text-sm font-medium">
 <div className="w-5 h-5 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center shrink-0">
 <Check size={12} strokeWidth={3} />
 </div>
 {feat}
 </li>
 ))}
 </ul>
 
 <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[var(--color-border)]">
 <div>
 <div className="font-heading font-bold text-3xl mb-1">{businessData.experience}</div>
 <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Mimari Tecrübe</div>
 </div>
 <div>
 <div className="font-heading font-bold text-3xl mb-1">{businessData.foundedYear}</div>
 <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Kuruluş</div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* CONTACT: Simple Form & Info */}
 <section id="iletisim" className="py-24 md:py-32 px-6 md:px-12 max-w-[800px] mx-auto text-center">
 <span className="block text-xs tracking-widest text-[var(--color-text-muted)] uppercase mb-6">İletişim</span>
 <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tight mb-6">Birlikte Çalışalım.</h2>
 <p className="text-[var(--color-text-secondary)] mb-16 max-w-md mx-auto">
 Yeni projenizi hayata geçirmek için kahve eşliğinde fikir alışverişi yapabiliriz.
 </p>

 <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-20 text-left">
 <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
 <Mail className="text-[var(--color-text-muted)] mb-4" size={24} />
 <span className="text-sm font-bold mb-1 uppercase tracking-wider">E-Posta</span>
 <a href={`mailto:${businessData.email}`} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]">{businessData.email}</a>
 </div>
 <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
 <Phone className="text-[var(--color-text-muted)] mb-4" size={24} />
 <span className="text-sm font-bold mb-1 uppercase tracking-wider">Telefon</span>
 <a href={`tel:${businessData.phoneClean}`} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]">{businessData.phone}</a>
 </div>
 <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
 <MapPin className="text-[var(--color-text-muted)] mb-4" size={24} />
 <span className="text-sm font-bold mb-1 uppercase tracking-wider">Stüdyo</span>
 <span className="text-sm text-[var(--color-text-secondary)]">{businessData.city}, {businessData.district}</span>
 </div>
 </div>

 <a 
 href={`https://wa.me/${businessData.whatsapp}`} 
 target="_blank" 
 rel="noopener noreferrer"
 className="inline-block w-full sm:w-auto bg-[var(--color-accent)] text-white font-medium px-12 py-5 uppercase tracking-wide text-sm hover:bg-[var(--color-accent-hover)] transition-colors"
 >
 Projeye Başla
 </a>
 </section>

 {/* FOOTER */}
 <footer className="py-10 px-6 md:px-12 border-t border-[var(--color-border)] flex flex-col sm:flex-row justify-between items-center gap-6">
 <div className="font-heading font-bold text-xl uppercase tracking-tighter">
 {businessData.name}
 </div>
 <div className="flex items-center gap-6">
 {businessData.socialMedia?.instagram && (
 <a href={businessData.socialMedia.instagram} target="_blank" className="text-[var(--color-text-secondary)] hover:text-black transition-colors">
 <Instagram size={20} />
 </a>
 )}
 </div>
 <div className="text-xs text-[var(--color-text-muted)]">
 © {new Date().getFullYear()} — Powered by kepenk.ai
 </div>
 </footer>
 </div>
 )
}

registerSection('hero', 'mimarlik_cizgi_full', MimarlikCizgiSections as unknown as React.ComponentType<any>)
