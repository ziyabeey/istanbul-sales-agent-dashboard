'use client'

import React, { useState, useEffect } from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { Phone, MapPin, Search, ChevronRight, Award, Shield, UserCheck, Play, ArrowUpRight } from 'lucide-react'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function EmlakPrestijSections({ config, businessData }: Props) {
 const [mounted, setMounted] = useState(false)

 useEffect(() => {
 setMounted(true)
 }, [])

 if (!mounted) return null

 // Neumorphic dark shadow utilities for Prestij (Katman 3)
 const boxInset = 'inset 4px 4px 10px rgba(0,0,0,0.6), inset -4px -4px 10px rgba(51, 65, 85, 0.4)'
 const boxOut = '8px 8px 20px rgba(0,0,0,0.6), -8px -8px 20px rgba(51, 65, 85, 0.4)'
 const boxOutHover = 'inset 2px 2px 6px rgba(0,0,0,0.6), inset -2px -2px 6px rgba(51, 65, 85, 0.4)'

 return (
 <div 
 className="font-body text-[var(--color-text)] min-h-screen selection:bg-[var(--color-accent)] selection:text-[var(--color-text-on-accent)] relative font-light" 

 >
 
 {/* 
 HEADER (Neumorphic Dark)
 */}
 <header className="fixed top-0 z-50 w-full py-4 transition-all duration-300">
 <div className="max-w-[1120px] mx-auto px-6 flex items-center justify-between bg-[var(--color-bg)]/80 backdrop-blur-xl rounded-full border border-[var(--color-surface-elevated)]" style={{ boxShadow: boxOut }}>
 <div>
 <h1 className="font-heading text-xl md:text-2xl font-bold tracking-widest uppercase text-[var(--color-text)] py-4 pl-4">{businessData.name}</h1>
 </div>
 
 <nav className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-widest text-[var(--color-text-secondary)]">
 <a href="#ilanlar" className="hover:text-[var(--color-accent)] transition-colors">Exclusive İzlenimler</a>
 <a href="#profil" className="hover:text-[var(--color-accent)] transition-colors">Temsilci Profil</a>
 </nav>

 <div className="pr-4 py-3 flex gap-2">
 <a 
 href={`tel:${businessData.phoneClean}`} 
 className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--color-text)] transition-all"
 style={{ boxShadow: boxOut }}
 >
 <Phone size={16} />
 </a>
 <a 
 href="#iletisim" 
 className="px-6 h-10 rounded-full flex items-center justify-center text-[var(--color-accent)] text-xs font-bold uppercase tracking-widest transition-all"
 style={{ boxShadow: boxOut }}
 >
 Gizli İlanlar
 </a>
 </div>
 </div>
 </header>

 {/* 
 CONTAINER - Max 1120px for "Büyüme" Tier 
 */}
 <div className="w-full max-w-[1120px] mx-auto px-4 sm:px-6 md:px-8 pt-32 pb-16 flex flex-col gap-20">
 
 {/* HERO SECTION (Neumorphic Dark Video BG feel) */}
 <section className="relative w-full rounded-[2rem] overflow-hidden min-h-[600px] flex items-center justify-center p-8 md:p-16 border border-[var(--color-surface-elevated)]" style={{ boxShadow: boxInset }}>
 
 <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)]/50 to-[var(--color-bg)] z-10"></div>
 {/* Placeholder for Video/Dark Image */}
 <div className="absolute inset-0 bg-[var(--color-surface-muted)] opacity-50 z-0 flex items-center justify-center">
 <Play size={100} className="text-[var(--color-text-secondary)] opacity-20" />
 </div>

 <div className="relative z-20 w-full flex flex-col md:flex-row items-center gap-12">
 <div className="flex-1 max-w-xl">
 <span className="inline-block px-4 py-2 border border-[var(--color-accent)]/30 text-[var(--color-accent)] rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-8" style={{ boxShadow: boxOut }}>
 GİZLİ PORTFÖY LİDERİ
 </span>
 <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
 Eşsiz Mekanlar, <br/>
 <span className="text-[var(--color-accent)] italic">Kusursuz Hizmet.</span>
 </h2>
 <p className="text-[var(--color-text-secondary)] text-lg mb-10 leading-relaxed max-w-md">
 Boğazın en nadide yalı ve köşklerini, üst düzey gizlilik prensibiyle sizin için buluyoruz.
 </p>
 <div className="flex flex-wrap items-center gap-6">
 <a 
 href="#ilanlar" 
 className="px-8 py-4 rounded-full text-[var(--color-text-on-accent)] bg-[var(--color-accent)] text-sm font-bold uppercase tracking-widest hover:bg-[var(--color-accent-hover)] transition-all"
 style={{ boxShadow: `0 0 20px rgba(212, 168, 67, 0.4)` }} // Gold glow
 >
 VIP Portföye Göz Atın
 </a>
 </div>
 </div>

 {/* Search Widget Neumorphic */}
 <div className="w-full md:w-[360px] p-8 rounded-[2rem] border border-[var(--color-surface-elevated)] bg-[var(--color-bg)] relative z-20" style={{ boxShadow: boxOut }}>
 <h3 className="font-heading text-2xl mb-6">Özel Arama</h3>
 <div className="space-y-5">
 <div className="px-5 py-4 rounded-2xl flex items-center gap-3 text-sm text-[var(--color-text-secondary)]" style={{ boxShadow: boxInset }}>
 <MapPin size={18} className="text-[var(--color-accent)]" /> 
 <span>Konum (Örn: Bebek)</span>
 </div>
 <div className="px-5 py-4 rounded-2xl flex items-center gap-3 text-sm text-[var(--color-text-secondary)]" style={{ boxShadow: boxInset }}>
 <Search size={18} className="text-[var(--color-accent)]" /> 
 <span>Portföy Kodu</span>
 </div>
 <button 
 className="w-full py-4 rounded-2xl text-[var(--color-text)] text-sm font-bold uppercase tracking-widest mt-2 hover:text-[var(--color-accent)] transition-colors"
 style={{ boxShadow: boxOut }}
 >
 Detaylı Ara
 </button>
 </div>
 </div>
 </div>
 </section>

 {/* STATS NEUMORPHIC */}
 <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
 <div className="p-8 rounded-[2rem] flex flex-col items-center justify-center text-center border border-[var(--color-surface-elevated)]" style={{ boxShadow: boxOut }}>
 <Shield size={32} className="text-[var(--color-accent)] mb-4" />
 <div className="font-heading text-3xl font-bold mb-1">{businessData.foundedYear}</div>
 <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Kuruluş</div>
 </div>
 <div className="p-8 rounded-[2rem] flex flex-col items-center justify-center text-center border border-[var(--color-surface-elevated)]" style={{ boxShadow: boxOut }}>
 <Award size={32} className="text-[var(--color-accent)] mb-4" />
 <div className="font-heading text-3xl font-bold mb-1">{businessData.experience}</div>
 <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Premium Tecrübe</div>
 </div>
 <div className="p-8 rounded-[2rem] flex flex-col items-center justify-center text-center border border-[var(--color-surface-elevated)]" style={{ boxShadow: boxOut }}>
 <UserCheck size={32} className="text-[var(--color-accent)] mb-4" />
 <div className="font-heading text-3xl font-bold mb-1">{businessData.reviewCount}</div>
 <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Ayrıcalıklı Müşteri</div>
 </div>
 <div className="p-8 rounded-[2rem] flex flex-col items-center justify-center text-center border border-[var(--color-surface-elevated)]" style={{ boxShadow: boxOut }}>
 <Search size={32} className="text-[var(--color-accent)] mb-4" />
 <div className="font-heading text-3xl font-bold mb-1">%100</div>
 <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Gizlilik İlkesi</div>
 </div>
 </section>

 {/* AGENT PROFILE */}
 <section id="profil" className="flex flex-col md:flex-row items-center gap-12 p-8 md:p-16 rounded-[3rem] border border-[var(--color-surface-elevated)]" style={{ boxShadow: boxOut }}>
 <div className="relative">
 <div className="w-56 h-56 md:w-72 md:h-72 rounded-full border border-[var(--color-surface-elevated)] overflow-hidden flex items-center justify-center bg-[var(--color-surface)]" style={{ boxShadow: boxInset }}>
 <span className="font-heading text-7xl text-[var(--color-text-muted)] font-bold">{businessData.team?.[0]?.name.charAt(0)}</span>
 </div>
 {/* Circular badge */}
 <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-[var(--color-bg)] flex items-center justify-center border border-[var(--color-surface-elevated)]" style={{ boxShadow: boxOut }}>
 <div className="text-center">
 <div className="text-[var(--color-accent)] font-bold text-xl">{businessData.experience}</div>
 <div className="text-[8px] uppercase tracking-widest">Deneyim</div>
 </div>
 </div>
 </div>
 
 <div className="flex-1 text-center md:text-left">
 <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--color-accent)] mb-4 font-bold">{businessData.team?.[0]?.role}</h3>
 <h2 className="font-heading text-4xl md:text-5xl mb-6">{businessData.team?.[0]?.name}</h2>
 <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed max-w-xl mx-auto md:mx-0 mb-8">
 Bebek ve Yeniköy yalılarının alım satımında gizlilik esaslı tecrübeye sahip. Seçkin müşterilerimize, piyasaya henüz çıkmamış özel portföyleri sunma ayrıcalığını yaşıyoruz.
 </p>
 
 <div className="flex flex-wrap justify-center md:justify-start gap-4">
 {['Yalı & Köşk', 'Plaza', 'Gizli Satışlar'].map((spec, i) => (
 <span key={i} className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]" style={{ boxShadow: boxInset }}>
 {spec}
 </span>
 ))}
 </div>
 </div>
 </section>

 {/* PROPERTY LISTING (Masonry feel) */}
 <section id="ilanlar" className="space-y-12">
 <div className="text-center max-w-2xl mx-auto">
 <h3 className="text-[10px] uppercase tracking-[0.4em] text-[var(--color-accent)] mb-4 font-bold">VİTRİNİMİZ</h3>
 <h2 className="font-heading text-4xl md:text-5xl mb-6">Ayrıcalıklı Mülkler</h2>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
 
 {/* Listing 1 */}
 <div className="rounded-[2rem] p-6 border border-[var(--color-surface-elevated)] cursor-pointer group" style={{ boxShadow: boxOut }}>
 <div className="w-full h-64 rounded-3xl bg-[var(--color-surface)] relative overflow-hidden mb-8" style={{ boxShadow: boxInset }}>
 <span className="absolute top-4 left-4 bg-[var(--color-bg)] text-[var(--color-text)] text-xs font-bold px-4 py-2 rounded-full border border-[var(--color-surface-elevated)]" style={{ boxShadow: boxOut }}>
 SATILIK YALI
 </span>
 </div>
 <div className="px-2">
 <div className="flex items-start justify-between mb-4">
 <div>
 <h4 className="font-heading text-2xl mb-1 group-hover:text-[var(--color-accent)] transition-colors">Tarihi Boğaz Yalısı</h4>
 <p className="text-[var(--color-text-muted)] text-sm flex items-center gap-2"><MapPin size={14}/> Yeniköy, İstanbul</p>
 </div>
 <button className="w-12 h-12 rounded-full flex items-center justify-center text-[var(--color-accent)]" style={{ boxShadow: boxOut }}>
 <ArrowUpRight size={20} />
 </button>
 </div>
 
 <div className="flex items-center justify-between border-t border-[var(--color-surface-elevated)] pt-6 mt-4">
 <div className="flex gap-6">
 <span className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)] font-bold">12+3 ODA</span>
 <span className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)] font-bold">1200 M²</span>
 </div>
 <div className="font-heading text-xl text-[var(--color-accent)] italic">Fiyat Gizli</div>
 </div>
 </div>
 </div>

 {/* Listing 2 */}
 <div className="rounded-[2rem] p-6 border border-[var(--color-surface-elevated)] cursor-pointer group md:mt-12" style={{ boxShadow: boxOut }}>
 <div className="w-full h-64 rounded-3xl bg-[var(--color-surface)] relative overflow-hidden mb-8" style={{ boxShadow: boxInset }}>
 <span className="absolute top-4 left-4 bg-[var(--color-bg)] text-[var(--color-text)] text-xs font-bold px-4 py-2 rounded-full border border-[var(--color-surface-elevated)]" style={{ boxShadow: boxOut }}>
 SATILIK PENTHOUSE
 </span>
 </div>
 <div className="px-2">
 <div className="flex items-start justify-between mb-4">
 <div>
 <h4 className="font-heading text-2xl mb-1 group-hover:text-[var(--color-accent)] transition-colors">Panoramik Manzaralı</h4>
 <p className="text-[var(--color-text-muted)] text-sm flex items-center gap-2"><MapPin size={14}/> Bebek, İstanbul</p>
 </div>
 <button className="w-12 h-12 rounded-full flex items-center justify-center text-[var(--color-accent)]" style={{ boxShadow: boxOut }}>
 <ArrowUpRight size={20} />
 </button>
 </div>
 
 <div className="flex items-center justify-between border-t border-[var(--color-surface-elevated)] pt-6 mt-4">
 <div className="flex gap-6">
 <span className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)] font-bold">4+1 ODA</span>
 <span className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)] font-bold">450 M²</span>
 </div>
 <div className="font-heading text-xl text-[var(--color-text)] italic">12.000.000 $</div>
 </div>
 </div>
 </div>

 </div>
 
 <div className="flex justify-center pt-8">
 <button 
 className="px-10 py-5 rounded-full text-[var(--color-text)] text-sm font-bold uppercase tracking-[0.2em] border border-[var(--color-surface-elevated)] hover:text-[var(--color-accent)] transition-colors"
 style={{ boxShadow: boxOut }}
 >
 Tüm Portföyü Keşfet
 </button>
 </div>
 </section>

 {/* VALUATION REQUEST (Neumorphic Form) */}
 <section id="degerleme" className="p-8 md:p-16 rounded-[3rem] border border-[var(--color-surface-elevated)] text-center max-w-4xl mx-auto w-full" style={{ boxShadow: boxInset }}>
 <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--color-accent)] mb-4 font-bold">RANDEVU</h3>
 <h2 className="font-heading text-4xl mb-6">Değerini Birlikte Keşfedelim</h2>
 <p className="text-[var(--color-text-secondary)] mb-12 max-w-lg mx-auto">
 Global standartlara uygun ekspertiz hizmetimizi deneyimleyin. Bilgileriniz III. kişilerle veya dış platformlarla asla paylaşılmaz.
 </p>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
 <input type="text" placeholder="İSİM SOYİSİM" className="w-full bg-transparent px-6 py-5 rounded-2xl text-[var(--color-text)] text-xs font-bold uppercase tracking-widest border-none focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]" style={{ boxShadow: boxOut }} />
 <input type="tel" placeholder="GİZLİ İLETİŞİM NUMARASI" className="w-full bg-transparent px-6 py-5 rounded-2xl text-[var(--color-text)] text-xs font-bold uppercase tracking-widest border-none focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]" style={{ boxShadow: boxOut }} />
 </div>
 
 <button 
 className="w-full md:w-auto px-16 py-5 rounded-full text-[var(--color-accent)] text-sm font-bold uppercase tracking-[0.2em] border border-[var(--color-surface-elevated)] hover:bg-[var(--color-surface)] transition-all"
 style={{ boxShadow: boxOut }}
 >
 Özel Randevu Talep Et
 </button>
 </section>

 {/* VIP FOOTER */}
 <footer className="pt-16 pb-8 border-t border-[var(--color-surface-elevated)] mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
 <h1 className="font-heading text-xl font-bold tracking-widest uppercase text-[var(--color-text)]">{businessData.name}</h1>
 <p className="text-[var(--color-text-muted)] text-[10px] font-bold uppercase tracking-[0.2em]">
 © {new Date().getFullYear()} Elite Real Estate.
 </p>
 </footer>

 </div>
 </div>
 )
}
