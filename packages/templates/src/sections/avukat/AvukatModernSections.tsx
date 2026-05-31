'use client'

import React, { useState, useEffect } from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { Phone, MapPin, ChevronRight, User, Award, ArrowUpRight, Play, Briefcase, Building, FileText, Scale } from 'lucide-react'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function AvukatModernSections({ business: businessData }: any) {
 const [mounted, setMounted] = useState(false)

 useEffect(() => {
 setMounted(true)
 }, [])

 if (!mounted) return null

 // Soft-UI / Neumorphic inspired utilities for #F7F7F7 background
 const softShadow = "shadow-[10px_10px_20px_#e0e0e0,-10px_-10px_20px_#ffffff]"
 const softShadowInner = "shadow-[inset_5px_5px_10px_#e0e0e0,inset_-5px_-5px_10px_#ffffff]"
 const softShadowHover = "hover:shadow-[5px_5px_10px_#e0e0e0,-5px_-5px_10px_#ffffff] transition-shadow duration-300"

 const iconMap: Record<string, React.ReactNode> = {
 '🏢': <Building size={28} />,
 '📊': <ArrowUpRight size={28} />,
 '📝': <FileText size={28} />,
 '💼': <Briefcase size={28} />,
 '⚖️': <Scale size={28} />
 }

 return (
 <div className="min-h-screen font-body text-[var(--color-text)] selection:bg-[var(--color-accent-light)] selection:text-[var(--color-accent-hover)]">
 
 {/* HEADER - Floating Soft-UI */}
 <header className="fixed top-4 w-full z-50 px-4 md:px-8">
 <div className={`max-w-[var(--container-default,1120px)] mx-auto px-6 md:px-8 py-4 rounded-3xl bg-[#F7F7F7] ${softShadow} flex justify-between items-center`}>
 <div className="flex flex-col">
 <span className="font-heading font-extrabold text-2xl tracking-tight text-[var(--color-accent)]">{businessData.name}</span>
 </div>
 <div className="flex items-center gap-6">
 <div className="hidden md:flex items-center gap-2 text-sm font-semibold text-[var(--color-text-secondary)]">
 <Phone size={16} className="text-[var(--color-accent)]" /> {businessData.phoneClean?.replace(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5')}
 </div>
 <a href="#iletisim" className={`bg-[#F7F7F7] text-[var(--color-accent)] px-6 py-2.5 rounded-2xl font-bold text-sm ${softShadow} ${softShadowHover} flex items-center gap-2`}>
 İletişime Geç <ArrowUpRight size={16} />
 </a>
 </div>
 </div>
 </header>

 <main className="pt-32 pb-24 space-y-24">
 
 {/* HERO SECTION - Soft-UI Split */}
 <section className="max-w-[var(--container-default,1120px)] mx-auto px-4 md:px-8">
 <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
 
 {/* Text Content */}
 <div className="w-full lg:w-[55%] space-y-8 order-2 lg:order-1 text-center lg:text-left">
 <div className={`inline-block px-5 py-2.5 rounded-xl text-[var(--color-text-secondary)] text-sm font-bold tracking-widest uppercase ${softShadowInner}`}>
 Kurumsal Hukuk & Danışmanlık
 </div>
 <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-[var(--color-text)] tracking-tight">
 İş Dünyasında<br/>Güçlü & Stratejik<br/><span className="text-[var(--color-accent)]">Çözüm Ortağınız.</span>
 </h1>
 <p className="text-[var(--color-text-secondary)] text-lg md:text-xl font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
 {businessData.experience} yıllık sektörel deneyim ve alanında uzman avukat kadrosu ile ticaret ve şirketler hukukunda öncü stratejiler.
 </p>

 <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-4">
 <a href="#hizmetler" className={`bg-[var(--color-accent)] text-white px-8 py-4 rounded-2xl font-bold text-base hover:bg-[var(--color-accent-hover)] transition-colors shadow-[8px_8px_16px_#e0e0e0]`}>
 Uzmanlık Alanlarımız
 </a>
 <a href="#video" className={`bg-[#F7F7F7] text-[var(--color-text)] w-14 h-14 rounded-2xl flex items-center justify-center ${softShadow} ${softShadowHover} group`}>
 <Play size={20} className="text-[var(--color-accent)] translate-x-0.5 group-hover:scale-110 transition-transform" />
 </a>
 <span className="text-sm font-bold text-[var(--color-text-secondary)] ml-1">Vizyonumuz</span>
 </div>
 </div>

 {/* Neumorphic Image Framer */}
 <div className="w-full lg:w-[45%] order-1 lg:order-2 flex justify-center">
 <div className={`relative w-full max-w-md aspect-square rounded-[3rem] p-4 bg-[#F7F7F7] ${softShadow}`}>
 <div className={`w-full h-full rounded-[2.5rem] overflow-hidden ${softShadowInner} p-3`}>
 <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
 {businessData.photos && businessData.photos.length > 0 ? (
 <img src={typeof businessData.photos[0] === 'string' ? businessData.photos[0] : (businessData.photos[0] as any).url || businessData.photos[0]} alt={businessData?.ownerName as string} className="w-full h-full object-cover object-center grayscale-[0.2]" />
 ) : (
 <div className="w-full h-full bg-[#EFEFEF] flex flex-col items-center justify-center">
 <Building size={80} className="text-[#DCDCDC] mb-4" />
 <span className="font-heading font-bold text-xl text-[#888888]">{businessData.name}</span>
 </div>
 )}
 {/* Floating Badge */}
 <div className={`absolute bottom-6 -left-4 lg:left-6 bg-[#F7F7F7] px-6 py-4 rounded-2xl ${softShadow} flex items-center gap-4`}>
 <div className={`w-12 h-12 rounded-full flex items-center justify-center text-[var(--color-accent)] ${softShadowInner}`}>
 <Award size={24} />
 </div>
 <div>
 <div className="text-2xl font-extrabold text-[var(--color-text)] leading-none">{businessData.rating}</div>
 <div className="text-xs text-[var(--color-text-muted)] font-bold mt-1 uppercase tracking-wide">Müşteri Puanı</div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>

 </div>
 </section>

 {/* STATS ROW - Soft-UI Bar */}
 <section className="max-w-[var(--container-default,1120px)] mx-auto px-4 md:px-8">
 <div className={`bg-[#F7F7F7] rounded-3xl p-8 md:p-12 ${softShadow} grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-[var(--color-border)]/50`}>
 <div className="text-center px-4">
 <div className="text-4xl md:text-5xl font-extrabold text-[var(--color-accent)] mb-2">15+</div>
 <div className="text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Yıllık Tecrübe</div>
 </div>
 <div className="text-center px-4">
 <div className="text-4xl md:text-5xl font-extrabold text-[var(--color-accent)] mb-2">150+</div>
 <div className="text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Kurumsal Müvekkil</div>
 </div>
 <div className="text-center px-4">
 <div className="text-4xl md:text-5xl font-extrabold text-[var(--color-accent)] mb-2">%98</div>
 <div className="text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Başarı Oranı</div>
 </div>
 <div className="text-center px-4">
 <div className="text-4xl md:text-5xl font-extrabold text-[var(--color-accent)] mb-2">12+</div>
 <div className="text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Uzman Avukat</div>
 </div>
 </div>
 </section>

 {/* HİZMETLER (SERVICES) - Floating Cards Grid */}
 <section id="hizmetler" className="py-24">
 <div className="max-w-[var(--container-default,1120px)] mx-auto px-4 md:px-8">
 <div className="text-center mb-20 text-[var(--color-text)] flex justify-between items-end border-b-2 border-[var(--color-border)] pb-6">
 <div className="text-left">
 <h2 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight mb-2">Çalışma Alanlarımız</h2>
 <p className="text-[var(--color-text-secondary)] text-lg font-medium">Şirketler için tam kapsamlı hukuki danışmanlık hizmeti sunuyoruz.</p>
 </div>
 <a href="#" className={`hidden md:flex bg-[#F7F7F7] text-[var(--color-accent)] px-5 py-2.5 rounded-xl font-bold text-sm ${softShadowInner} flex items-center gap-2 hover:text-[var(--color-accent-hover)] transition-colors`}>
 Tümünü Gör <ChevronRight size={18} />
 </a>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
 {businessData.services?.map((service: any, idx: number) => (
 <div key={idx} className={`bg-[#F7F7F7] rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-6 items-start md:items-center ${softShadow} ${softShadowHover} cursor-pointer group`}>
 <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center shrink-0 text-3xl text-[var(--color-accent)] ${softShadowInner} group-hover:scale-110 transition-transform duration-300 bg-[#F7F7F7]`}>
 {service.icon ? iconMap[service.icon] || <Building size={28}/> : <Building size={28}/>}
 </div>
 <div className="flex-1">
 <h3 className="font-heading text-2xl font-bold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">{service.name}</h3>
 <p className="text-[var(--color-text-muted)] text-sm font-medium leading-relaxed mb-5">
 {service.name} kapsamında mevzuata uygun, yenilikçi ve şirketinize değer katacak hukuki çözümler üretiyoruz.
 </p>
 <div className="flex items-center justify-between">
 <span className="font-bold text-[var(--color-text-secondary)] text-sm px-3 py-1 rounded-lg bg-[#EFEFEF]">{service.price || 'Bilgi Alın'}</span>
 <div className="w-10 h-10 rounded-xl bg-[#F7F7F7] text-[var(--color-accent)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-15px] group-hover:translate-x-0 duration-300 shadow-[2px_2px_5px_#d1d1d1,-2px_-2px_5px_#ffffff]">
 <ArrowUpRight strokeWidth={3} size={18} />
 </div>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* İLETİŞİM & BİLGİ - Soft-UI Card */}
 <section id="iletisim" className="max-w-[var(--container-default,1120px)] mx-auto px-4 md:px-8">
 <div className={`bg-[#F7F7F7] rounded-[3rem] p-8 md:p-14 ${softShadow} flex flex-col lg:flex-row gap-16`}>
 
 <div className="flex-1 space-y-10">
 <div>
 <h2 className="font-heading text-4xl font-extrabold text-[var(--color-text)] tracking-tight mb-4">İletişime Geçin</h2>
 <p className="text-[var(--color-text-secondary)] font-medium text-lg leading-relaxed">Kurumsal vizyonunuza uygun, sürdürülebilir hukuki stratejiler belirlemek için uzman ekibimizle görüşün.</p>
 </div>
 
 <div className="space-y-8">
 <div className="flex items-start gap-5">
 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-[var(--color-accent)] shrink-0 ${softShadowInner} bg-[#F7F7F7]`}>
 <MapPin size={26} />
 </div>
 <div className="pt-1">
 <h4 className="font-bold text-lg text-[var(--color-text)] mb-1">İstanbul Merkez Ofis</h4>
 <p className="text-base font-medium text-[var(--color-text-muted)] leading-relaxed">{businessData.address}</p>
 </div>
 </div>
 <div className="flex items-start gap-5">
 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-[var(--color-accent)] shrink-0 ${softShadowInner} bg-[#F7F7F7]`}>
 <Phone size={26} />
 </div>
 <div className="pt-1">
 <h4 className="font-bold text-lg text-[var(--color-text)] mb-1">Santral & Asistan</h4>
 <p className="text-base font-medium text-[var(--color-text-muted)]">{businessData.phone}</p>
 </div>
 </div>
 </div>
 </div>

 <div className="w-full lg:w-[450px] shrink-0">
 <div className={`w-full h-full rounded-[2.5rem] p-10 ${softShadowInner} border border-white/60 bg-[#F7F7F7]`}>
 <h3 className="font-heading text-2xl font-bold mb-8 text-[var(--color-text)] text-center">Çalışma Saatleri</h3>
 <div className="space-y-4 mb-10">
 {businessData.workingHours?.filter(w => w.open).map((wh, idx) => (
 <div key={idx} className="flex justify-between items-center text-[15px]">
 <span className="font-bold text-[var(--color-text-secondary)]">{wh.dayTr}</span>
 <span className="text-[var(--color-accent)] font-extrabold bg-[#EFEFEF] px-3 py-1 rounded-md">{wh.open} - {wh.close}</span>
 </div>
 ))}
 </div>
 <a href={`https://wa.me/${businessData.whatsapp}`} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center justify-center gap-3 w-full bg-[var(--color-accent)] text-white py-4 rounded-xl font-bold text-[15px] shadow-[6px_6px_12px_#dcdcdc] hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5 transition-all duration-300`}>
 <ArrowUpRight size={20} /> Danışmanlık Talebi Oluştur
 </a>
 </div>
 </div>

 </div>
 </section>

 </main>

 {/* FOOTER */}
 <footer className="py-10 text-center text-[var(--color-text-muted)] text-sm font-bold tracking-wide uppercase">
 © {new Date().getFullYear()} {businessData.name}. Bütün Hakları Saklıdır. Levent, İstanbul.
 </footer>

 </div>
 )
}

import { registerSection } from '../../registry/section-registry'
registerSection('hero', 'avukat_modern_full', AvukatModernSections as unknown as React.ComponentType<any>)
