'use client'

import React, { useState, useEffect } from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'
import { Phone, MapPin, Instagram, Search, ShoppingBag, ArrowRight, Check, Star, Mail } from 'lucide-react'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function VetPetshopSections({ config, businessData }: Props) {
 const [mounted, setMounted] = useState(false)

 useEffect(() => {
 setMounted(true)
 }, [])

 if (!mounted) return null

 const services = businessData.services || []
 
 return (
 <div className="min-h-screen font-body bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-accent)] selection:text-[var(--color-text-on-accent)]">
 
 {/* TOP BAR */}
 <div className="bg-[var(--color-surface-elevated)] text-xs font-medium py-2 px-6 flex justify-between items-center text-[var(--color-text-secondary)] border-b border-[var(--color-border)] hidden sm:flex">
 <div>📦 500₺ üzeri siparişlerde kargo bedava</div>
 <div className="flex gap-4">
 <span>{businessData.phone}</span>
 <span>{businessData.address}</span>
 </div>
 </div>

 {/* HEADER */}
 <header className="sticky top-0 w-full z-50 px-6 py-5 flex justify-between items-center bg-[var(--color-bg)] border-b border-[var(--color-border)]">
 <div className="font-heading font-black text-2xl tracking-tighter flex items-center gap-2">
 <span className="text-[var(--color-accent)] text-3xl">🐾</span> {businessData.name}
 </div>
 
 {/* Search Bar - Visual Only */}
 <div className="hidden lg:flex items-center flex-1 max-w-md mx-8 relative">
 <input type="text" placeholder="Mama, oyuncak veya kategori ara..." className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full py-2.5 pl-5 pr-12 text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors" />
 <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-accent)]">
 <Search size={18} />
 </button>
 </div>

 <div className="flex items-center gap-6">
 <a href="#kategoriler" className="hidden md:inline-flex text-sm font-semibold hover:text-[var(--color-accent)]">Kategoriler</a>
 <a href="#hizmetler" className="hidden md:inline-flex text-sm font-semibold hover:text-[var(--color-accent)]">Klinik Hizmetleri</a>
 <a href={`https://wa.me/${businessData.whatsapp}`} className="relative bg-[var(--color-surface)] p-3 rounded-full hover:bg-[var(--color-accent-light)] hover:text-[var(--color-accent)] transition-colors">
 <ShoppingBag size={20} />
 <span className="absolute -top-1 -right-1 bg-[var(--color-accent)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
 </a>
 </div>
 </header>

 {/* HERO: E-Commerce Style */}
 <section className="relative w-full overflow-hidden bg-[var(--color-surface)]">
 <div className="w-full max-w-[1400px] px-6 md:px-12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-16 lg:py-24">
 <div className="relative z-10 max-w-2xl">
 <div className="mb-4 inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
 <Star size={12} fill="currentColor" /> YENİ SEZON
 </div>
 <h1 className="font-heading text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
 Hem Klinik, <br/>Hem <span className="text-[var(--color-accent)]">Petshop.</span>
 </h1>
 <p className="text-[var(--color-text-secondary)] text-lg lg:text-xl mb-10 leading-relaxed font-medium">
 Premium kedi-köpek mamaları, aksesuarlar ve uzman veteriner bakım hizmetleri tek çatı altında.
 </p>
 <div className="flex flex-wrap gap-4">
 <a href="#urunler" className="inline-flex items-center justify-center gap-3 bg-[var(--color-text)] text-[var(--color-bg)] px-8 py-4 rounded-full font-bold hover:bg-[var(--color-accent)] transition-colors shadow-lg shadow-black/10">
 Alışverişe Başla
 </a>
 <a href="#hizmetler" className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-[var(--color-border)] text-[var(--color-text)] px-8 py-4 rounded-full font-bold hover:bg-[var(--color-bg)] transition-colors">
 Klinik Randevusu
 </a>
 </div>
 </div>
 
 <div className="relative h-[400px] lg:h-[600px] w-full rounded-3xl overflow-hidden ring-1 ring-[var(--color-border)]">
 <img 
 src={businessData.photos?.[0] || 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80'} 
 className="w-full h-full object-cover object-center"
 alt="Sevimli Kedi ve Köpek"
 />
 </div>
 </div>
 </section>

 {/* CATEGORIES GRID */}
 <section id="kategoriler" className="py-20 bg-[var(--color-bg)]">
 <div className="max-w-[1400px] mx-auto px-6 md:px-12">
 <h2 className="font-heading text-3xl font-black mb-10">Öne Çıkan Kategoriler</h2>
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
 {[
 { name: 'Kuru Mamalar', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80', count: '124 Ürün' },
 { name: 'Yaş Mamalar', img: 'https://images.unsplash.com/photo-1595181163467-f31f8b3fc80d?auto=format&fit=crop&q=80', count: '85 Ürün' },
 { name: 'Kedi Kumları', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80', count: '40 Ürün' },
 { name: 'Aksesuarlar', img: 'https://images.unsplash.com/photo-1601758177266-af59a29094fe?auto=format&fit=crop&q=80', count: '200+ Ürün' }
 ].map((cat, i) => (
 <div key={i} className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer">
 <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
 <div className="absolute bottom-6 left-6 text-white">
 <h3 className="font-bold text-xl mb-1">{cat.name}</h3>
 <p className="text-xs font-semibold opacity-80">{cat.count}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* CLINIC SERVICES */}
 <section id="hizmetler" className="py-24 px-6 md:px-12 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
 <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
 <div>
 <span className="inline-block bg-[var(--color-accent)] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">Sadece Petshop Değil</span>
 <h2 className="font-heading text-4xl md:text-5xl font-black mb-8">Uzman Klinik <br/>Arkanızda.</h2>
 <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-8">
 Kliniğimizde tam teşekküllü kan sayımı, dijital röntgen ve modern ameliyathane ile 7/24 hizmet veriyoruz. İhtiyacınız olan ürünleri alırken, sağlık kontrollerini de tek noktada çözün.
 </p>
 <div className="space-y-4 mb-10">
 {services.map((item: any, idx: number) => (
 <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-[var(--color-border)]">
 <div className="w-10 h-10 bg-[var(--color-surface)] rounded-full flex items-center justify-center text-xl">
 {item.icon || '🩺'}
 </div>
 <h4 className="font-bold">{item.name}</h4>
 </div>
 ))}
 </div>
 <a href={`tel:${businessData.phoneClean}`} className="inline-flex items-center gap-2 font-bold text-[var(--color-accent)] hover:underline">
 Klinik Randevusu Al <ArrowRight size={18} />
 </a>
 </div>
 <div className="relative">
 <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
 <img src={businessData.photos?.[1] || 'https://images.unsplash.com/photo-1599443015574-be5fe8a05783?auto=format&fit=crop&q=80'} alt="Klinik Görünüm" className="w-full h-full object-cover" />
 </div>
 {/* Floating Badge */}
 <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-[var(--color-border)] max-w-xs">
 <div className="font-black text-4xl text-[var(--color-accent)] mb-1">{businessData.rating}</div>
 <div className="text-sm font-bold text-[var(--color-text-secondary)]">Google'da En Sevilen Klinik ve Petshop</div>
 </div>
 </div>
 </div>
 </section>

 {/* FOOTER */}
 <footer className="py-16 px-6 md:px-12 bg-[#111] text-white">
 <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-gray-800 pb-12">
 <div>
 <div className="font-heading font-black text-2xl mb-6">{businessData.name}</div>
 <p className="text-gray-400 text-sm leading-relaxed mb-6">Evcil hayvanlarınız için hepsi bir arada sağlıklı yaşam ve premium alışveriş noktası.</p>
 <div className="flex gap-4">
 {businessData.socialMedia?.instagram && (
 <a href={businessData.socialMedia.instagram} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors"><Instagram size={18} /></a>
 )}
 </div>
 </div>
 <div>
 <h4 className="font-bold mb-6 uppercase tracking-wider text-sm">İletişim</h4>
 <div className="space-y-4 text-sm text-gray-400">
 <p className="flex items-center gap-3"><MapPin size={16} /> {businessData.address}</p>
 <p className="flex items-center gap-3"><Phone size={16} /> {businessData.phone}</p>
 <p className="flex items-center gap-3"><Mail size={16} /> {businessData.email}</p>
 </div>
 </div>
 <div>
 <h4 className="font-bold mb-6 uppercase tracking-wider text-sm">Çalışma Saatleri</h4>
 <div className="space-y-3 text-sm text-gray-400">
 <p className="flex justify-between border-b border-gray-800 pb-2"><span>Hafta İçi</span> <span>09:00 - 20:00</span></p>
 <p className="flex justify-between border-b border-gray-800 pb-2"><span>Cumartesi</span> <span>10:00 - 18:00</span></p>
 <p className="flex justify-between pb-2 text-[var(--color-accent)] font-semibold"><span>Acil Klinik</span> <span>7/24</span></p>
 </div>
 </div>
 <div>
 <h4 className="font-bold mb-6 uppercase tracking-wider text-sm">Hızlı Linkler</h4>
 <div className="space-y-3 text-sm text-gray-400 flex flex-col items-start">
 <a href="#" className="hover:text-white transition-colors">Mama Siparişi</a>
 <a href="#" className="hover:text-white transition-colors">Randevu Al</a>
 <a href="#" className="hover:text-white transition-colors">Hizmetlerimiz</a>
 </div>
 </div>
 </div>
 <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
 <p>© {new Date().getFullYear()} {businessData.name}. All rights reserved.</p>
 <p>Powered by kepenk.ai</p>
 </div>
 </footer>
 </div>
 )
}

registerSection('hero', 'vet_petshop_full', VetPetshopSections as unknown as React.ComponentType<any>)
