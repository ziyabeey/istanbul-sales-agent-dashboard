'use client'

import React, { useState, useEffect } from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { MapPin, Phone, Building2, ChevronRight, Bed, Maximize, Compass, Search, Instagram, Home, TrendingUp, Info } from 'lucide-react'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function EmlakModernSections({ config, businessData }: Props) {
 const [mounted, setMounted] = useState(false)

 useEffect(() => {
 setMounted(true)
 }, [])

 if (!mounted) return null

 // Modern Emlak - Tier 2: Max 960px, 30/70 Sticky Sidebar
 return (
 <div 
 className="font-body text-[var(--color-text)] min-h-screen relative" 

 >
 
 {/* 
 CONTAINER - Max 960px 
 */}
 <div className="w-full max-w-[960px] mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
 
 {/* TOP HEADER */}
 <header className="flex items-center justify-between bg-[var(--color-surface)] border border-[var(--color-border)] p-4 rounded-t-2xl mb-1 shadow-sm">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center text-[var(--color-accent)]">
 <Building2 size={24} />
 </div>
 <div>
 <h1 className="font-heading text-xl font-bold text-[var(--color-text)] leading-tight tracking-tight uppercase">{businessData.name}</h1>
 <p className="text-xs text-[var(--color-text-secondary)] tracking-wider">{businessData.slogan}</p>
 </div>
 </div>
 
 <div className="hidden md:flex items-center gap-6">
 <a href="#ilanlar" className="text-sm font-semibold hover:text-[var(--color-accent)] transition-colors">Portföy</a>
 <a href="#semtler" className="text-sm font-semibold hover:text-[var(--color-accent)] transition-colors">Bölgeler</a>
 <a href="#degerleme" className="text-sm font-semibold hover:text-[var(--color-accent)] transition-colors">Değerleme</a>
 </div>
 </header>

 {/* 30 / 70 LAYOUT DIRECTLY BELOW HEADER */}
 <div className="flex flex-col md:flex-row gap-6 items-start relative">
 
 {/* LEFT SIDEBAR (STICKY) - 30% */}
 <aside className="w-full md:w-[320px] shrink-0 md:sticky top-6 flex flex-col gap-4">
 
 {/* Profile Card */}
 <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-b-2xl md:rounded-2xl p-6 shadow-sm flex flex-col items-center">
 <div className="w-28 h-28 rounded-full bg-[var(--color-surface-muted)] mb-4 border-4 border-white shadow-sm overflow-hidden flex items-center justify-center">
 <span className="font-heading text-4xl text-[var(--color-text-muted)] font-bold">{businessData.ownerName.charAt(0)}</span>
 </div>
 <h2 className="font-heading text-2xl font-bold mb-1">{businessData?.ownerName as string}</h2>
 <p className="text-[var(--color-accent)] font-semibold text-sm mb-4 uppercase tracking-widest">{businessData.team?.[0]?.role}</p>
 
 <div className="w-full flex items-center justify-center gap-4 text-sm font-medium text-[var(--color-text-secondary)] mb-6 border-y border-[var(--color-border)] py-4">
 <div className="text-center">
 <div className="text-lg font-bold text-[var(--color-text)]">200+</div>
 <div className="text-xs">İşlem</div>
 </div>
 <div className="w-px h-8 bg-[var(--color-border)]"></div>
 <div className="text-center">
 <div className="text-lg font-bold text-[var(--color-text)]">{businessData.experience}</div>
 <div className="text-xs">Tecrübe</div>
 </div>
 </div>

 <div className="w-full space-y-3">
 <a 
 href={`tel:${businessData.phoneClean}`} 
 className="w-full bg-[var(--color-text)] text-white py-3 px-4 rounded-[var(--radius-btn)] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[var(--color-text-secondary)] transition-colors shadow-sm"
 >
 <Phone size={16} /> Bizi Arayın
 </a>
 <a 
 href={`https://wa.me/${businessData.whatsapp}`} 
 target="_blank" 
 rel="noopener noreferrer" 
 className="w-full bg-white text-[var(--color-text)] border border-[var(--color-border)] py-3 px-4 rounded-[var(--radius-btn)] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[var(--color-surface-elevated)] transition-colors"
 >
 WhatsApp
 </a>
 </div>
 </div>

 {/* Contact Info Card */}
 <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 shadow-sm hidden md:block">
 <h3 className="font-heading font-bold mb-4 uppercase text-sm tracking-widest text-[var(--color-text-muted)]">İletişim</h3>
 <div className="space-y-4 text-sm font-medium">
 <p className="flex items-start gap-3">
 <MapPin size={16} className="text-[var(--color-accent)] mt-0.5" />
 <span className="leading-snug">{businessData.address}</span>
 </p>
 <p className="flex items-center gap-3">
 <Instagram size={16} className="text-[var(--color-accent)]" />
 <a href={businessData.socialMedia?.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline">@novaemlak</a>
 </p>
 </div>
 </div>

 </aside>

 {/* RIGHT CONTENT - 70% */}
 <main className="w-full flex-1 flex flex-col gap-6">

 {/* HERO INTRO CARD */}
 <section className="bg-[var(--color-text)] text-white rounded-2xl p-8 shadow-sm flex flex-col justify-center relative overflow-hidden" style={{ minHeight: '300px' }}>
 <Compass size={160} className="absolute -right-10 -bottom-10 text-white/5 pointer-events-none" />
 <div className="relative z-10 max-w-md">
 <span className="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-white/20">
 GAYRİMENKUL DANIŞMANI
 </span>
 <h2 className="font-heading text-4xl font-bold leading-[1.1] mb-4">Emlak Dünyasına Yeni Bir Bakış.</h2>
 <p className="text-white/80 font-medium mb-6 leading-relaxed">
 {businessData.district} bölgesindeki en değerli ofis ve konut projeleri için profesyonel aracılık hizmetleri.
 </p>
 <div className="flex items-center gap-3 opacity-90">
 <div className="flex -space-x-3">
 <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-[var(--color-text)]"></div>
 <div className="w-8 h-8 rounded-full bg-white/40 border-2 border-[var(--color-text)]"></div>
 <div className="w-8 h-8 rounded-full bg-white/60 border-2 border-[var(--color-text)]"></div>
 </div>
 <span className="text-sm font-semibold">{businessData.reviewCount}+ Mutlu Müşteri</span>
 </div>
 </div>
 </section>

 {/* STATS / EXPERTISE */}
 <section className="grid grid-cols-3 gap-4">
 <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 text-center shadow-sm">
 <div className="font-heading text-3xl font-extrabold text-[var(--color-text)] mb-1">350+</div>
 <div className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Satış</div>
 </div>
 <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 text-center shadow-sm">
 <div className="font-heading text-3xl font-extrabold text-[var(--color-text)] mb-1">1.2M</div>
 <div className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Veritabanı</div>
 </div>
 <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 text-center shadow-sm">
 <div className="font-heading text-3xl font-extrabold text-[var(--color-text)] mb-1">100%</div>
 <div className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Memnuniyet</div>
 </div>
 </section>

 {/* QUICK SEARCH BAR */}
 <section className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-4 shadow-sm flex gap-3">
 <div className="flex-1 border border-[var(--color-border)] rounded-xl py-3 px-4 flex items-center gap-3 bg-[var(--color-bg)]">
 <Search size={18} className="text-[var(--color-text-muted)]" />
 <input type="text" placeholder="Portföy Kodu veya Bölge Ara..." className="w-full bg-transparent outline-none text-sm font-medium placeholder-[var(--color-text-muted)]" />
 </div>
 <button className="bg-[var(--color-accent)] text-white px-6 rounded-xl font-bold text-sm hover:bg-[var(--color-accent-hover)] transition-colors">
 Ara
 </button>
 </section>

 {/* PORTFOLIO HIGHLIGHTS */}
 <section id="ilanlar" className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 md:p-8 shadow-sm">
 <div className="flex items-end justify-between mb-6">
 <div>
 <span className="text-xs font-bold text-[var(--color-accent)] uppercase tracking-widest">Vitrin</span>
 <h3 className="font-heading text-2xl font-bold mt-1">Öne Çıkan Portföyler</h3>
 </div>
 <button className="text-sm font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-1">
 Tümünü Gör <ChevronRight size={16} />
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 
 {/* Listing 1 */}
 <div className="group cursor-pointer">
 <div className="relative h-48 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] overflow-hidden mb-4">
 <span className="absolute top-3 left-3 bg-white text-[var(--color-text)] text-xs font-extrabold px-3 py-1.5 rounded-lg shadow-sm z-10 flex items-center gap-1">
 <Home size={12} className="text-[var(--color-accent)]"/> KİRALIK OFİS
 </span>
 <div className="w-full h-full bg-[var(--color-surface-muted)] group-hover:scale-105 transition-transform duration-500"></div>
 </div>
 <h4 className="font-heading font-bold text-lg mb-1 group-hover:text-[var(--color-accent)] transition-colors">A Sınıfı Kiralık Ofis</h4>
 <p className="text-sm text-[var(--color-text-secondary)] mb-3 flex items-center gap-2">
 <MapPin size={14}/> Levent Merkez
 </p>
 <div className="flex items-center gap-4 text-xs font-semibold text-[var(--color-text-muted)] bg-[var(--color-surface-elevated)] py-2 px-3 rounded-lg w-max mb-3">
 <span className="flex items-center gap-1"><Maximize size={14}/> 250 m²</span>
 <div className="w-1 h-1 rounded-full bg-[var(--color-border)]"></div>
 <span>Plaza Katı</span>
 </div>
 <div className="font-extrabold text-xl text-[var(--color-text)]">120.000 ₺ <span className="text-sm text-[var(--color-text-muted)] font-medium">/ Ay</span></div>
 </div>

 {/* Listing 2 */}
 <div className="group cursor-pointer">
 <div className="relative h-48 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] overflow-hidden mb-4">
 <span className="absolute top-3 left-3 bg-[var(--color-accent)] text-white text-xs font-extrabold px-3 py-1.5 rounded-lg shadow-sm z-10 flex items-center gap-1">
 <Home size={12}/> SATILIK REZİDANS
 </span>
 <div className="w-full h-full bg-[var(--color-surface-muted)] group-hover:scale-105 transition-transform duration-500"></div>
 </div>
 <h4 className="font-heading font-bold text-lg mb-1 group-hover:text-[var(--color-accent)] transition-colors">Bosphorus Manzaralı</h4>
 <p className="text-sm text-[var(--color-text-secondary)] mb-3 flex items-center gap-2">
 <MapPin size={14}/> Maslak
 </p>
 <div className="flex items-center gap-4 text-xs font-semibold text-[var(--color-text-muted)] bg-[var(--color-surface-elevated)] py-2 px-3 rounded-lg w-max mb-3">
 <span className="flex items-center gap-1"><Bed size={14}/> 3+1</span>
 <div className="w-1 h-1 rounded-full bg-[var(--color-border)]"></div>
 <span className="flex items-center gap-1"><Maximize size={14}/> 145 m²</span>
 </div>
 <div className="font-extrabold text-xl text-[var(--color-text)]">32.000.000 ₺</div>
 </div>

 </div>
 </section>

 {/* REGIONS EXPERTISE */}
 <section id="semtler" className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 md:p-8 shadow-sm">
 <div className="mb-6">
 <h3 className="font-heading text-2xl font-bold">Uzman Olduğumuz Semtler</h3>
 <p className="text-sm text-[var(--color-text-secondary)] mt-1 font-medium">Bu bölgelerdeki güncel piyasa dinamiklerine hakimiz.</p>
 </div>

 <div className="space-y-4">
 <div className="flex items-center justify-between p-4 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-accent)] transition-colors cursor-pointer group">
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm">🏢</div>
 <div>
 <h4 className="font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">Levent</h4>
 <span className="text-xs font-semibold text-[var(--color-text-muted)]">Merkezi Konum • Plaza Bölgesi</span>
 </div>
 </div>
 <div className="text-right hidden sm:block">
 <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Ort. Fiyat</div>
 <div className="font-bold text-sm">20M ₺ - 50M ₺</div>
 </div>
 </div>

 <div className="flex items-center justify-between p-4 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-accent)] transition-colors cursor-pointer group">
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm">🏙️</div>
 <div>
 <h4 className="font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">Maslak</h4>
 <span className="text-xs font-semibold text-[var(--color-text-muted)]">Rezidans Yaşamı • Metro Yakınlığı</span>
 </div>
 </div>
 <div className="text-right hidden sm:block">
 <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Ort. Fiyat</div>
 <div className="font-bold text-sm">15M ₺ - 40M ₺</div>
 </div>
 </div>
 </div>
 </section>

 {/* VALUATION REQUEST */}
 <section id="degerleme" className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center">
 <div className="flex-1">
 <div className="w-12 h-12 bg-[var(--color-accent-light)] text-[var(--color-accent)] rounded-2xl flex items-center justify-center mb-4">
 <TrendingUp size={24} />
 </div>
 <h3 className="font-heading text-2xl font-bold mb-2">Hızlı Değerleme</h3>
 <p className="text-[var(--color-text-secondary)] text-sm font-medium leading-relaxed mb-6">
 Gayrimenkulünüzün gerçek piyasa değerini bugünden öğrenin. Ücretsiz ekspertiz formu doldurun.
 </p>
 <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest bg-[var(--color-surface-elevated)] py-2 px-3 rounded-lg w-max mb-2">
 <Info size={14}/> 24 Saat İçinde Dönüş
 </div>
 </div>
 
 <div className="w-full md:w-[320px] bg-[var(--color-surface-elevated)] p-5 rounded-2xl border border-[var(--color-border)]">
 <input type="text" placeholder="İsim Soyisim" className="w-full bg-white px-4 py-3 rounded-xl border border-[var(--color-border)] text-sm focus:border-[var(--color-accent)] outline-none mb-3" />
 <input type="tel" placeholder="GSM" className="w-full bg-white px-4 py-3 rounded-xl border border-[var(--color-border)] text-sm focus:border-[var(--color-accent)] outline-none mb-3" />
 <button className="w-full bg-[var(--color-accent)] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[var(--color-accent-hover)] transition-colors shadow-sm">
 Ücretsiz Değerleme Talep Et
 </button>
 </div>
 </section>

 </main>
 </div>
 </div>

 </div>
 )
}
