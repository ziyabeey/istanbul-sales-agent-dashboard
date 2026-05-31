'use client'

import React, { useState, useEffect } from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { Phone, MapPin, Building2, Bed, Maximize, ArrowRight, Home, ChevronRight } from 'lucide-react'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function EmlakSadeSections({ config, businessData }: Props) {
 const [mounted, setMounted] = useState(false)

 useEffect(() => {
 setMounted(true)
 }, [])

 if (!mounted) return null

 // Sade Emlak - Tier 1: Max 640px, Tek Sütun, Temiz ve Minimal Ara Yüz
 return (
 <div 
 className="font-body text-[var(--color-text)] min-h-screen relative" 

 >
 
 {/* 
 HEADER (Mobile-First Minimal)
 */}
 <header className="sticky top-0 z-50 bg-[var(--color-surface)] border-b border-[var(--color-border)] py-4">
 <div className="w-full max-w-[640px] mx-auto px-4 sm:px-6 flex items-center justify-between">
 <div className="flex items-center gap-2">
 <div className="w-8 h-8 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center text-[var(--color-accent)]">
 <Home size={18} />
 </div>
 <h1 className="font-heading text-lg font-bold tracking-tight text-[var(--color-text)]">{businessData.name}</h1>
 </div>
 
 <a 
 href={`tel:${businessData.phoneClean}`} 
 className="bg-[var(--color-accent)] text-[var(--color-text-on-accent)] w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--color-accent-hover)] transition-colors shadow-sm"
 >
 <Phone size={18} />
 </a>
 </div>
 </header>

 {/* 
 CONTAINER - Max 640px for "Temel" Tier 
 */}
 <div className="w-full max-w-[640px] mx-auto px-4 sm:px-6 py-10 flex flex-col gap-12">
 
 {/* HERO SECTION */}
 <section className="text-center pt-4 pb-6">
 <span className="inline-block px-3 py-1 bg-[var(--color-accent-light)] text-[var(--color-accent)] rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
 {businessData.district} Uzmanı
 </span>
 <h2 className="font-heading text-4xl font-bold leading-tight mb-4">{businessData.district}'ün Güvenilir Emlak Noktası</h2>
 <p className="text-[var(--color-text-secondary)] text-base mb-8 max-w-sm mx-auto">
 Doğru bölgede, doğru fiyata gayrimenkul almak veya satmak için buradayız.
 </p>

 <div className="flex flex-col gap-3">
 <a 
 href="#ilanlar" 
 className="w-full bg-[var(--color-text)] text-white py-4 rounded-[var(--radius-btn)] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[var(--color-text-secondary)] transition-colors"
 >
 İlanları İncele <ChevronRight size={16} />
 </a>
 <a 
 href="#degerleme" 
 className="w-full bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] py-4 rounded-[var(--radius-btn)] font-semibold text-sm flex items-center justify-center hover:bg-[var(--color-surface-elevated)] transition-colors"
 >
 Evimin Değerini Öğren
 </a>
 </div>
 </section>

 {/* METRICS / STATS (Compact) */}
 <section className="grid grid-cols-2 gap-3">
 <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-card)] p-4 text-center">
 <div className="font-heading text-2xl font-bold text-[var(--color-accent)] mb-1">{businessData.experience}</div>
 <div className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">Tecrübe</div>
 </div>
 <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-card)] p-4 text-center">
 <div className="font-heading text-2xl font-bold text-[var(--color-text)] mb-1">{businessData.rating}</div>
 <div className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">Puan ({businessData.reviewCount}+)</div>
 </div>
 </section>

 {/* PROPERTY LISTINGS (Minimal Card Style) */}
 <section id="ilanlar" className="space-y-6">
 <div className="flex items-end justify-between border-b border-[var(--color-border)] pb-3">
 <div>
 <h3 className="font-heading text-xl font-bold text-[var(--color-text)]">Portföyümüz</h3>
 <p className="text-sm text-[var(--color-text-muted)] mt-1">Öne çıkan son ilanlar</p>
 </div>
 </div>
 
 <div className="flex flex-col gap-4">
 {/* Dummy listings based on config */}
 <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-card)] overflow-hidden shadow-sm group">
 <div className="h-48 bg-[var(--color-surface-muted)] relative">
 <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">SATILIK</span>
 </div>
 <div className="p-4">
 <div className="flex justify-between items-start mb-2">
 <h4 className="font-semibold text-[var(--color-text)] leading-tight">Göztepe Merkezde Yenilenmiş 3+1 Daire</h4>
 <span className="font-bold text-[var(--color-accent)] whitespace-nowrap ml-2">8.500.000 ₺</span>
 </div>
 <div className="flex items-center text-xs text-[var(--color-text-muted)] gap-4 mb-4">
 <span className="flex items-center gap-1"><MapPin size={12}/> Kadıköy</span>
 <span className="flex items-center gap-1"><Bed size={12}/> 3+1</span>
 <span className="flex items-center gap-1"><Maximize size={12}/> 120 m²</span>
 </div>
 <button className="w-full py-2.5 bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] font-medium text-sm rounded-[var(--radius-btn)] flex items-center justify-center gap-2 hover:bg-[var(--color-accent-light)] hover:text-[var(--color-accent)] transition-colors">
 Detayları İncele <ArrowRight size={14} />
 </button>
 </div>
 </div>

 <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-card)] overflow-hidden shadow-sm group">
 <div className="h-48 bg-[var(--color-surface-muted)] relative">
 <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">KİRALIK</span>
 </div>
 <div className="p-4">
 <div className="flex justify-between items-start mb-2">
 <h4 className="font-semibold text-[var(--color-text)] leading-tight">Moda Sahile 5Dk Yeni Binada 2+1</h4>
 <span className="font-bold text-[var(--color-accent)] whitespace-nowrap ml-2">45.000 ₺ <span className="text-[10px] text-[var(--color-text-muted)] font-normal">/ay</span></span>
 </div>
 <div className="flex items-center text-xs text-[var(--color-text-muted)] gap-4 mb-4">
 <span className="flex items-center gap-1"><MapPin size={12}/> Moda</span>
 <span className="flex items-center gap-1"><Bed size={12}/> 2+1</span>
 <span className="flex items-center gap-1"><Maximize size={12}/> 85 m²</span>
 </div>
 <button className="w-full py-2.5 bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] font-medium text-sm rounded-[var(--radius-btn)] flex items-center justify-center gap-2 hover:bg-[var(--color-accent-light)] hover:text-[var(--color-accent)] transition-colors">
 Detayları İncele <ArrowRight size={14} />
 </button>
 </div>
 </div>
 </div>

 <button className="w-full py-3 text-sm font-semibold text-[var(--color-accent)] hover:underline">
 Tüm İlanları Görüntüle →
 </button>
 </section>

 {/* AGENT PROFILE */}
 <section id="hakkimizda" className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-card)] p-6 flex flex-col items-center text-center">
 <div className="w-24 h-24 rounded-full bg-[var(--color-surface-muted)] mb-4 flex items-center justify-center text-3xl font-heading font-bold text-[var(--color-text-muted)] border-4 border-white shadow-sm">
 {businessData.team?.[0]?.name.charAt(0) || 'A'}
 </div>
 <h3 className="font-heading text-xl font-bold text-[var(--color-text)]">{businessData.team?.[0]?.name}</h3>
 <p className="text-sm font-medium text-[var(--color-accent)] mb-3">{businessData.team?.[0]?.role}</p>
 <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
 {businessData.district} ve çevresinde uzman eklindeki {businessData.experience}'lık pazar tecrübesi ile doğru fiyat odaklı çalışma prensibi.
 </p>
 
 <a 
 href={`https://wa.me/${businessData.whatsapp}`} 
 target="_blank" 
 rel="noopener noreferrer" 
 className="w-full bg-[#25D366] text-white py-3 rounded-[var(--radius-btn)] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors"
 >
 WhatsApp'tan Ulaşın
 </a>
 </section>

 {/* VALUATION REQUEST (Ekspertiz) */}
 <section id="degerleme" className="bg-[var(--color-text)] text-white rounded-[var(--radius-card)] p-6 mt-4 relative overflow-hidden">
 <Building2 size={120} className="absolute -right-10 -bottom-10 text-white/5 pointer-events-none" />
 <div className="relative z-10">
 <span className="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-[10px] font-semibold uppercase tracking-wider mb-4 border border-white/20">
 Ücretsiz Ekspertiz
 </span>
 <h3 className="font-heading text-2xl font-bold mb-2">Evimin Gerçek Değeri Ne?</h3>
 <p className="text-sm text-white/80 mb-6 max-w-[90%]">Mülkünüzün güncel piyasa değerini ücretsiz ve hızlıca öğrenmek için formu doldurun.</p>
 
 <div className="space-y-3">
 <input type="text" placeholder="Adınız Soyadınız" className="w-full bg-white px-4 py-3 rounded-[var(--radius-btn)] text-[var(--color-text)] text-sm border-0 focus:ring-2 focus:ring-[var(--color-accent)] outline-none" />
 <input type="tel" placeholder="Telefon Numaranız" className="w-full bg-white px-4 py-3 rounded-[var(--radius-btn)] text-[var(--color-text)] text-sm border-0 focus:ring-2 focus:ring-[var(--color-accent)] outline-none" />
 <select className="w-full bg-white px-4 py-3 rounded-[var(--radius-btn)] text-[var(--color-text)] text-sm border-0 focus:ring-2 focus:ring-[var(--color-accent)] outline-none">
 <option value="">Gayrimenkul Tipi</option>
 <option value="daire">Daire</option>
 <option value="villa">Villa / Müstakil</option>
 <option value="arfa">Arsa</option>
 <option value="isyeri">İş Yeri / Dükkan</option>
 </select>
 <button className="w-full bg-[var(--color-accent)] text-white py-3.5 mt-2 rounded-[var(--radius-btn)] font-bold text-sm hover:bg-[var(--color-accent-hover)] transition-colors shadow-md">
 Değerleme İste
 </button>
 </div>
 </div>
 </section>

 {/* FOOTER */}
 <footer className="pt-8 pb-4 flex flex-col items-center justify-center text-center space-y-4 border-t border-[var(--color-border)] mt-8">
 <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm mb-2">
 <MapPin size={14} />
 <span>{businessData.address}</span>
 </div>
 
 <p className="text-[var(--color-text-muted)] text-xs font-medium uppercase tracking-wider">
 © {new Date().getFullYear()} {businessData.name}.
 <br/>
 <span className="lowercase normal-case opacity-70 mt-1 block">Tüm hakları saklıdır.</span>
 </p>
 </footer>

 </div>
 </div>
 )
}
