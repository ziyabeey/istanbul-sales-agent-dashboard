'use client'

import React, { useState, useEffect } from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { Phone, MapPin, Calendar, Clock, ChevronRight, User, Award, ArrowUpRight, Play } from 'lucide-react'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function DoktorUzmanSections({ config, businessData }: Props) {
 const [mounted, setMounted] = useState(false)

 useEffect(() => {
 setMounted(true)
 }, [])

 if (!mounted) return null

 // Neumorphic utilities for #F8F6F2 background
 // Light source top-left: dark shadow on bottom-right, light shadow on top-left
 const neuShadow = "shadow-[8px_8px_16px_#dcdad5,-8px_-8px_16px_#ffffff]"
 const neuShadowInner = "shadow-[inset_4px_4px_8px_#dcdad5,inset_-4px_-4px_8px_#ffffff]"
 const neuShadowHover = "hover:shadow-[4px_4px_8px_#dcdad5,-4px_-4px_8px_#ffffff] transition-shadow duration-300"

 return (
 <div className="min-h-screen font-body text-[var(--color-text)] selection:bg-[var(--color-accent-light)] selection:text-[var(--color-accent-hover)]">
 
 {/* HEADER - Neumorphic Floating */}
 <header className="fixed top-4 w-full z-50 px-4 md:px-8">
 <div className={`max-w-[var(--container-default,1120px)] mx-auto px-6 py-4 rounded-3xl bg-[#F8F6F2] ${neuShadow} flex justify-between items-center`}>
 <div className="flex flex-col">
 <span className="font-heading font-normal text-2xl md:text-3xl text-[var(--color-accent)]">{businessData.name}</span>
 </div>
 <div className="flex items-center gap-6">
 <div className="hidden md:flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)]">
 <Phone size={16} className="text-[var(--color-text-muted)]" /> {businessData.phoneClean?.replace(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5')}
 </div>
 <a href="#randevu" className={`bg-[#F8F6F2] text-[var(--color-accent)] px-6 py-2.5 rounded-2xl font-semibold text-sm ${neuShadow} ${neuShadowHover} flex items-center gap-2`}>
 Randevu Al <ArrowUpRight size={16} />
 </a>
 </div>
 </div>
 </header>

 <main className="pt-32 pb-24 space-y-24">
 
 {/* HERO SECTION - Neumorphic Profile & Video Teaser */}
 <section className="max-w-[var(--container-default,1120px)] mx-auto px-4 md:px-8">
 <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
 
 {/* Text Content */}
 <div className="w-full lg:w-1/2 space-y-8 order-2 lg:order-1 text-center lg:text-left">
 <div className={`inline-block px-4 py-2 rounded-xl text-[var(--color-text-muted)] text-sm font-medium tracking-wide uppercase ${neuShadowInner}`}>
 Ortopedi & Travmatoloji
 </div>
 <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.1] text-[var(--color-accent)]">
 Ortopedide<br/>Uzmanlık,<br/>Cerrahide Güven.
 </h1>
 <p className="text-[var(--color-text-secondary)] text-lg md:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0">
 {businessData.experience} yıllık mesleki tecrübe ile yenilikçi cerrahi yöntemler. Bedeninizin doğal ritmine kavuşması için yanınızdayız.
 </p>

 <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
 <a href="#iletisim" className={`bg-[var(--color-accent)] text-white px-8 py-4 rounded-2xl font-medium text-base hover:bg-[var(--color-accent-hover)] transition-colors shadow-[8px_8px_16px_#dcdad5]`}>
 Klinik İletişim
 </a>
 <a href="#video" className={`bg-[#F8F6F2] text-[var(--color-text)] w-14 h-14 rounded-2xl flex items-center justify-center ${neuShadow} ${neuShadowHover} group`}>
 <Play size={20} className="text-[var(--color-accent)] translate-x-0.5 group-hover:scale-110 transition-transform" />
 </a>
 <span className="text-sm font-medium text-[var(--color-text-muted)] ml-2">Tanıtım Filmi</span>
 </div>
 </div>

 {/* Neumorphic Image Framer */}
 <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center">
 <div className={`relative w-full max-w-md aspect-[4/5] rounded-[3rem] p-4 bg-[#F8F6F2] ${neuShadow}`}>
 <div className={`w-full h-full rounded-[2.5rem] overflow-hidden ${neuShadowInner} p-2`}>
 <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
 {businessData.photos && businessData.photos.length > 0 ? (
 <img src={businessData.photos[0]?.url} alt={businessData?.ownerName as string} className="w-full h-full object-cover object-center filter sepia-[0.1] contrast-[1.05]" />
 ) : (
 <div className="w-full h-full bg-slate-200 flex items-center justify-center">
 <User size={80} className="text-slate-400" />
 </div>
 )}
 {/* Floating Badge */}
 <div className={`absolute bottom-6 -left-4 lg:left-6 bg-[#F8F6F2] px-5 py-3 rounded-2xl ${neuShadow} flex items-center gap-3`}>
 <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[var(--color-accent)] ${neuShadowInner}`}>
 <Award size={20} />
 </div>
 <div>
 <div className="text-xl font-bold text-[var(--color-text)] leading-none">{businessData.rating}</div>
 <div className="text-xs text-[var(--color-text-muted)] font-medium">Hasta Puanı</div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>

 </div>
 </section>

 {/* HİZMETLER (SERVICES) - Neumorphic Cards */}
 <section className="bg-[#EDE9E0] py-24 rounded-[4rem] mx-4 lg:mx-8">
 <div className="max-w-[var(--container-default,1120px)] mx-auto px-4 md:px-8">
 <div className="text-center mb-16">
 <h2 className="font-heading text-4xl md:text-5xl font-normal text-[var(--color-accent)] mb-4">Uzmanlık Alanları</h2>
 <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">Modern ortopedi ve travmatoloji yaklaşımlarıyla kişiye özel tedavi planları uygulanmaktadır.</p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
 {businessData.services?.map((service: any, idx: number) => (
 <div key={idx} className={`bg-[#F8F6F2] rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-6 items-start md:items-center ${neuShadow} ${neuShadowHover} cursor-pointer group`}>
 <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 text-3xl ${neuShadowInner} group-hover:scale-105 transition-transform duration-300`}>
 {service.icon || '⚕️'}
 </div>
 <div className="flex-1">
 <h3 className="font-heading text-2xl font-normal text-[var(--color-text)] mb-2">{service.name}</h3>
 <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-4">
 Eklem ve kemik sağlığınız için en güncel medikal ve cerrahi operasyon teknikleri...
 </p>
 <div className="flex items-center justify-between">
 <span className="font-medium text-[var(--color-accent)] text-sm">{service.price || 'Fiyat bilgisi için arayın'}</span>
 <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
 <ArrowUpRight size={16} />
 </div>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* İLETİŞİM & BİLGİ - Neumorphic Split */}
 <section className="max-w-[var(--container-default,1120px)] mx-auto px-4 md:px-8">
 <div className={`bg-[#F8F6F2] rounded-[3rem] p-8 md:p-12 ${neuShadow} flex flex-col lg:flex-row gap-12`}>
 
 <div className="flex-1 space-y-8">
 <h2 className="font-heading text-4xl text-[var(--color-accent)]">İletişim & Konum</h2>
 <p className="text-[var(--color-text-secondary)]">Muayenehane ziyaretleriniz için önceden randevu almanız gerekmektedir.</p>
 
 <div className="space-y-6">
 <div className="flex items-start gap-4">
 <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-[var(--color-accent)] shrink-0 ${neuShadowInner}`}>
 <MapPin size={24} />
 </div>
 <div>
 <h4 className="font-semibold text-[var(--color-text)] mb-1">Adres</h4>
 <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{businessData.address}</p>
 </div>
 </div>
 <div className="flex items-start gap-4">
 <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-[var(--color-accent)] shrink-0 ${neuShadowInner}`}>
 <Phone size={24} />
 </div>
 <div>
 <h4 className="font-semibold text-[var(--color-text)] mb-1">Telefon & Asistan</h4>
 <p className="text-sm text-[var(--color-text-secondary)]">{businessData.phone}</p>
 </div>
 </div>
 </div>
 </div>

 <div className="w-full lg:w-[400px] shrink-0">
 <div className={`w-full h-full rounded-[2rem] p-8 ${neuShadowInner} border border-white/50 backdrop-blur-sm bg-[#EDE9E0]/30`}>
 <h3 className="font-heading text-2xl mb-6 text-center text-[var(--color-text)]">Çalışma Saatleri</h3>
 <div className="space-y-4">
 {businessData.workingHours?.filter(w => w.open).map((wh, idx) => (
 <div key={idx} className="flex justify-between items-center text-sm">
 <span className="font-semibold text-[var(--color-text-secondary)]">{wh.dayTr}</span>
 <span className="text-[var(--color-accent)] font-medium">{wh.open} — {wh.close}</span>
 </div>
 ))}
 </div>
 <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center">
 <a href={`https://wa.me/${businessData.whatsapp}`} target="_blank" className={`inline-flex items-center justify-center gap-2 w-full bg-[#128C7E] text-white py-4 rounded-xl font-medium ${neuShadow} hover:opacity-90 transition-opacity`}>
 WhatsApp'tan Randevu Al
 </a>
 </div>
 </div>
 </div>

 </div>
 </section>

 </main>

 {/* FOOTER */}
 <footer className="py-8 text-center text-[var(--color-text-muted)] text-sm font-medium">
 © {new Date().getFullYear()} {businessData.name}. Nişantaşı, İstanbul.
 </footer>

 </div>
 )
}
