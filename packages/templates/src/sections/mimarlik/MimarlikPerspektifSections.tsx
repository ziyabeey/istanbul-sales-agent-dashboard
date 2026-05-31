'use client'

import React, { useState, useEffect } from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { Phone, MapPin, Instagram, Mail, ArrowRight, ArrowDown, ChevronRight } from 'lucide-react'
import { registerSection } from '../../registry/section-registry'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function MimarlikPerspektifSections({ config, businessData }: Props) {
 const [mounted, setMounted] = useState(false)

 useEffect(() => {
 setMounted(true)
 }, [])

 if (!mounted) return null

 const getSection = (id: string) => config.pages?.[0]!.sections.find(s => s.id === id)
 const portfolioItems: any[] = (getSection('portfolio')?.defaultContent?.items as any[]) || []
 const approachData: any = getSection('about')?.defaultContent || {}
 const processSteps: any[] = (getSection('process')?.defaultContent?.steps as any[]) || []

 return (
 <div className="min-h-screen font-body bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-accent)] selection:text-[var(--color-text-on-accent)]">
 
 {/* HEADER (Classic Editorial) */}
 <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center mix-blend-difference text-white">
 <div className="font-heading italic text-2xl tracking-tight">
 {businessData.name}
 </div>
 <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-bold">
 <a href="#portfolio" className="hover:opacity-60 transition-opacity">Projeler</a>
 <a href="#about" className="hover:opacity-60 transition-opacity">Hakkımızda</a>
 <a href="#process" className="hover:opacity-60 transition-opacity">Süreç</a>
 <a href="#iletisim" className="hover:opacity-60 transition-opacity">İletişim</a>
 </div>
 </header>

 {/* HERO: Fullscreen Overlay */}
 <section className="relative w-full h-screen flex items-end pb-24 md:pb-32 px-6 md:px-12 bg-[#111] overflow-hidden">
 <div className="absolute inset-0 opacity-50">
 <img 
 src={businessData.photos?.[0] || 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80'} 
 className="w-full h-full object-cover object-center"
 alt="Architecture Hero Background"
 />
 </div>
 
 <div className="relative z-10 w-full max-w-[1400px] mx-auto text-white flex flex-col md:flex-row md:items-end justify-between gap-10">
 <div className="max-w-3xl">
 <span className="block text-xs uppercase tracking-[0.2em] mb-6 border-l-2 border-[var(--color-accent-light)] pl-4 opacity-80">
 {(getSection('hero')?.defaultContent?.badge as string) || ''}
 </span>
 <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-6">
 Geleceğin Mirasını <br/> Çiziyoruz.
 </h1>
 </div>
 <div className="max-w-xs">
 <p className="text-sm md:text-base opacity-80 mb-8 leading-relaxed font-light">
 {(getSection('hero')?.defaultContent?.subtitle as string) || ''}
 </p>
 <a href="#portfolio" className="inline-flex items-center gap-4 text-sm uppercase tracking-widest font-bold border-b border-white pb-2 hover:opacity-70 transition-all">
 Keşfet <ArrowDown size={16} />
 </a>
 </div>
 </div>
 </section>

 {/* PROJECT STORY (ABOUT) */}
 <section id="about" className="py-24 md:py-32 px-6 md:px-12 bg-[var(--color-surface)]">
 <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
 <div className="lg:col-span-5">
 <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-8">
 {approachData?.badge}
 </span>
 <h2 className="font-heading text-4xl md:text-6xl italic leading-tight mb-8">
 {approachData?.title}
 </h2>
 </div>
 <div className="lg:col-span-7 lg:pl-12">
 <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] leading-relaxed font-light first-letter:float-left first-letter:text-7xl first-letter:pr-4 first-letter:font-heading first-letter:italic">
 {approachData?.description}
 </p>
 <div className="mt-16 pt-16 border-t border-[var(--color-border)] grid grid-cols-2 md:grid-cols-4 gap-8">
 <div className="flex flex-col">
 <span className="font-heading text-4xl md:text-5xl mb-2">{businessData.experience}</span>
 <span className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">Deneyim</span>
 </div>
 <div className="flex flex-col">
 <span className="font-heading text-4xl md:text-5xl mb-2">45+</span>
 <span className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">Proje</span>
 </div>
 <div className="flex flex-col">
 <span className="font-heading text-4xl md:text-5xl mb-2">{businessData.team?.length || 5}</span>
 <span className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">Uzman</span>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* PORTFOLIO GRID: Masonry Lightbox Theme */}
 <section id="portfolio" className="py-24 md:py-32 px-6 md:px-12 bg-[var(--color-bg)]">
 <div className="max-w-[1400px] mx-auto">
 <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-8 text-center">
 {getSection('portfolio')?.defaultContent?.badge as any}
 </span>
 <h2 className="font-heading text-4xl md:text-6xl text-center italic mb-20">{getSection('portfolio')?.defaultContent?.title as any}</h2>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
 {portfolioItems.map((item: any, idx: number) => (
 <div key={item.id} className={`group cursor-pointer ${idx % 2 !== 0 ? 'md:mt-32' : ''}`}>
 <div className="aspect-[3/4] overflow-hidden bg-[var(--color-surface-muted)] mb-6 relative">
 <img 
 src={item.image} 
 alt={item.title} 
 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
 />
 <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
 </div>
 <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
 <div>
 <h3 className="font-heading text-2xl mb-1">{item.title}</h3>
 <p className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">{item.category}</p>
 </div>
 <ArrowRight size={24} className="-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* PROCESS STEPS */}
 <section id="process" className="py-24 md:py-32 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
 <div className="max-w-[1400px] mx-auto px-6 md:px-12">
 <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[var(--color-border)] pb-8">
 <div>
 <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-4">{getSection('process')?.defaultContent?.badge as any}</span>
 <h2 className="font-heading text-4xl md:text-5xl italic">{getSection('process')?.defaultContent?.title as any}</h2>
 </div>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
 {processSteps.map((step: any, idx: number) => (
 <div key={step.id} className="relative">
 <div className="font-heading text-xl font-bold mb-4">{step.title}</div>
 <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{step.description}</p>
 {idx !== processSteps.length - 1 && (
 <div className="hidden lg:block absolute top-3 right-0 -translate-y-1/2 -mr-6 text-[var(--color-border-strong)]">
 <ChevronRight size={24} />
 </div>
 )}
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* CONTACT & FOOTER */}
 <section id="iletisim" className="pt-24 md:pt-32 pb-12 px-6 md:px-12 bg-[var(--color-bg)]">
 <div className="max-w-[1400px] mx-auto">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-32">
 <div>
 <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-8">İletişim</span>
 <h2 className="font-heading text-5xl md:text-7xl italic leading-tight mb-8">
 Projelerinizi Dinlemek İsteriz.
 </h2>
 <a 
 href={`mailto:${businessData.email}`} 
 className="inline-block text-xl md:text-2xl font-body border-b border-[var(--color-border-strong)] pb-2 hover:text-[var(--color-text-muted)] hover:border-[var(--color-text-muted)] transition-colors mb-16"
 >
 {businessData.email}
 </a>
 
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
 <div>
 <h4 className="font-bold uppercase text-xs tracking-widest text-[var(--color-text-muted)] mb-4">Adres</h4>
 <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm">
 {businessData.address}
 </p>
 </div>
 <div>
 <h4 className="font-bold uppercase text-xs tracking-widest text-[var(--color-text-muted)] mb-4">İletişim</h4>
 <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm mb-2">{businessData.phone}</p>
 <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm">Hafta içi: 09:00 - 18:00</p>
 </div>
 </div>
 </div>
 
 <div className="bg-[var(--color-surface)] p-8 md:p-12 border border-[var(--color-border)]">
 <h3 className="font-heading text-2xl mb-8">Hızlı Mesaj</h3>
 <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
 <input type="text" placeholder="Adınız Soyadınız" className="w-full bg-transparent border-b border-[var(--color-border-strong)] pb-3 text-sm focus:outline-none focus:border-[var(--color-text)] transition-colors" />
 <input type="email" placeholder="E-Posta Adresiniz" className="w-full bg-transparent border-b border-[var(--color-border-strong)] pb-3 text-sm focus:outline-none focus:border-[var(--color-text)] transition-colors" />
 <textarea placeholder="Projeniz Hakkında" rows={4} className="w-full bg-transparent border-b border-[var(--color-border-strong)] pb-3 text-sm focus:outline-none focus:border-[var(--color-text)] transition-colors resize-none"></textarea>
 <button type="submit" className="self-start mt-4 bg-[var(--color-accent)] text-[var(--color-text-on-accent)] px-10 py-4 uppercase tracking-widest font-bold text-xs hover:bg-[var(--color-accent-hover)] transition-colors">
 Gönder
 </button>
 </form>
 </div>
 </div>

 <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-[var(--color-border)] pb-8">
 <div className="font-heading font-bold italic text-xl">
 {businessData.name}
 </div>
 <div className="text-sm text-[var(--color-text-muted)] hidden md:block">
 © {new Date().getFullYear()} — Tüm hakları saklıdır.
 </div>
 <div className="flex gap-6 text-[var(--color-text-muted)]">
 {businessData.socialMedia?.instagram && <a href={businessData.socialMedia.instagram} target="_blank" className="hover:text-[var(--color-text)] transition-colors">Instagram</a>}
 {businessData.socialMedia?.linkedin && <a href={businessData.socialMedia.linkedin} target="_blank" className="hover:text-[var(--color-text)] transition-colors">LinkedIn</a>}
 </div>
 </div>
 </div>
 </section>

 </div>
 )
}

registerSection('hero', 'mimarlik_perspektif_full', MimarlikPerspektifSections as unknown as React.ComponentType<any>)
