'use client'

import React, { useState, useEffect } from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { Phone, MapPin, Calendar, Clock, ChevronRight, User, Award, ArrowUpRight, Play, Star, CheckCircle2 } from 'lucide-react'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function DoktorDentaSections({ config, businessData }: Props) {
 const [mounted, setMounted] = useState(false)
 const [scrolled, setScrolled] = useState(false)

 useEffect(() => {
 setMounted(true)
 const handleScroll = () => setScrolled(window.scrollY > 50)
 window.addEventListener('scroll', handleScroll)
 return () => window.removeEventListener('scroll', handleScroll)
 }, [])

 if (!mounted) return null

 // Glassmorphism constants
 const glassPanel = "bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
 const glassCard = "bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors duration-500"

 return (
 <div className="min-h-screen bg-slate-900 font-body text-slate-100 selection:bg-[var(--color-accent)] selection:text-white relative overflow-hidden">
 
 {/* CINEMATIC BACKGROUND */}
 <div className="fixed inset-0 z-0">
 <img 
 src={businessData.photos?.[0] || 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80'} 
 alt="Dental Clinic" 
 className="w-full h-full object-cover opacity-30 object-center"
 />
 <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-slate-950"></div>
 </div>

 {/* HEADER - Floating Glass */}
 <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
 <div className={`max-w-[var(--container-default,1280px)] mx-auto px-6 md:px-10 transition-all duration-500 ${scrolled ? glassPanel + ' py-3 rounded-full' : ''} flex justify-between items-center`}>
 <div className="flex flex-col">
 <span className="font-heading font-bold text-3xl md:text-4xl tracking-wider text-white select-none">
 DENTA <span className="text-[var(--color-accent)]">SMILE</span>
 </span>
 </div>
 <div className="flex items-center gap-8">
 <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
 <a href="#hizmetler" className="hover:text-white transition-colors">Hizmetler</a>
 <a href="#hekimler" className="hover:text-white transition-colors">Hekimler</a>
 <a href="#iletisim" className="hover:text-white transition-colors">İletişim</a>
 </div>
 <a href="#randevu" className={`bg-[var(--color-accent)] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[var(--color-accent-hover)] transition-colors flex items-center gap-2 shadow-[0_0_20px_var(--color-accent-hover)]`}>
 Randevu <ArrowUpRight size={16} />
 </a>
 </div>
 </div>
 </header>

 <main className="relative z-10 pt-32 pb-24">
 
 {/* HERO SECTION */}
 <section className="max-w-[var(--container-default,1280px)] mx-auto px-6 md:px-10 min-h-[80vh] flex flex-col justify-center">
 <div className="max-w-3xl">
 <div className="flex items-center gap-3 mb-6">
 <span className="h-px w-12 bg-[var(--color-accent)]"></span>
 <span className="text-[var(--color-accent)] font-bold tracking-widest uppercase text-sm">{businessData.district}, {businessData.city}</span>
 </div>
 
 <h1 className="font-heading text-6xl md:text-8xl lg:text-[7rem] font-bold leading-[0.9] text-white tracking-wide mb-8">
 MÜKEMMEL<br/>
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-surface-muted)]">GÜLÜŞLER.</span>
 </h1>
 
 <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed mb-12 max-w-2xl">
 {businessData.slogan}. Modern teknolojiler ve uzman dijital diş hekimliği ile hayal ettiğiniz estetiğe kavuşun.
 </p>

 <div className="flex flex-wrap items-center gap-6">
 <button className={`px-8 py-4 rounded-full font-bold bg-white text-slate-900 hover:scale-105 transition-transform duration-300 flex items-center gap-2`}>
 Hemen Ara <Phone size={18} />
 </button>
 <button className={`px-8 py-4 rounded-full font-bold text-white border border-white/30 hover:bg-white/10 transition-colors duration-300 flex items-center gap-2 ${glassPanel}`}>
 <Play size={18} className="text-[var(--color-accent)]" /> Kliniği Keşfet
 </button>
 </div>
 </div>

 {/* Floating Info Stats */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24">
 {[
 { label: 'Deneyim', value: businessData.experience, icon: <Award size={24}/> },
 { label: 'Mutlu Hasta', value: '10K+', icon: <Star size={24}/> },
 { label: 'Google Puanı', value: businessData.rating, icon: <Star size={24}/> },
 { label: 'Garanti', value: 'Ömür Boyu', icon: <CheckCircle2 size={24}/> }
 ].map((stat, idx) => (
 <div key={idx} className={`${glassPanel} rounded-3xl p-6 flex flex-col items-center justify-center text-center group hover:bg-white/20 transition-colors`}>
 <div className="text-[var(--color-accent)] mb-3 group-hover:scale-110 transition-transform">{stat.icon}</div>
 <div className="font-heading text-4xl font-bold text-white tracking-wider mb-1">{stat.value}</div>
 <div className="text-xs uppercase tracking-widest text-slate-400 font-bold">{stat.label}</div>
 </div>
 ))}
 </div>
 </section>

 {/* HİZMETLER (SERVICES) */}
 <section id="hizmetler" className="max-w-[var(--container-default,1280px)] mx-auto px-6 md:px-10 mt-32">
 <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
 <div>
 <h2 className="font-heading text-5xl md:text-6xl font-bold text-white tracking-wide">TEDAVİLER.</h2>
 <p className="text-slate-400 mt-4 max-w-md">Estetik ve dijital diş hekimliği uygulamalarımız.</p>
 </div>
 <a href="#" className="flex items-center gap-2 text-[var(--color-accent)] hover:text-white font-bold tracking-widest uppercase text-sm transition-colors">
 Tüm Tedaviler <ArrowUpRight size={18} />
 </a>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
 {businessData.services?.map((service: any, idx: number) => (
 <div key={idx} className={`${glassCard} rounded-3xl p-8 flex flex-col items-center text-center group cursor-pointer relative overflow-hidden`}>
 {/* Hover Glow */}
 <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
 
 <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center text-4xl mb-6 border border-white/5 group-hover:scale-110 transition-transform duration-500 relative z-10">
 {service.icon || '🦷'}
 </div>
 <h3 className="font-heading text-2xl font-bold text-white tracking-wider mb-3 relative z-10">{service.name}</h3>
 <div className="text-[var(--color-accent)] font-bold text-lg mb-4 relative z-10">{service.price || 'Bilgi Alın'}</div>
 <div className="mt-auto w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-colors relative z-10">
 <ArrowUpRight size={20} className="text-white" />
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* HEKİMLER & KLİNİK BİLGİSİ */}
 <section id="hekimler" className="max-w-[var(--container-default,1280px)] mx-auto px-6 md:px-10 mt-32">
 <div className={`${glassPanel} rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row gap-16 relative overflow-hidden`}>
 
 <div className="w-full lg:w-1/2 relative z-10">
 <h2 className="font-heading text-5xl font-bold text-white tracking-wide mb-8">UZMAN KADROMUZ.</h2>
 <p className="text-slate-300 leading-relaxed mb-12 text-lg font-light">
 Başhekimimiz {businessData?.ownerName as string} liderliğinde, alanında uzman hekimlerimizle her yaş grubuna özel ağız ve diş sağlığı çözümleri üretiyoruz.
 </p>
 
 <div className="space-y-6">
 {businessData.team?.map((member: any, idx: number) => (
 <div key={idx} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
 <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-white/20">
 <User size={24} className="text-slate-400" />
 </div>
 <div>
 <h4 className="font-heading text-2xl font-bold text-white tracking-wider">{member.name}</h4>
 <div className="text-[var(--color-accent)] font-bold text-sm">{member.role}</div>
 </div>
 </div>
 ))}
 </div>
 </div>

 <div className="w-full lg:w-1/2 relative z-10 flex flex-col justify-end space-y-6">
 <div className={`${glassCard} rounded-3xl p-8`}>
 <h3 className="font-heading text-3xl font-bold text-white mb-6">İletişim</h3>
 <div className="space-y-4 text-slate-300 font-medium">
 <div className="flex items-center gap-4">
 <MapPin className="text-[var(--color-accent)] shrink-0" /> {businessData.address}
 </div>
 <div className="flex items-center gap-4">
 <Phone className="text-[var(--color-accent)] shrink-0" /> {businessData.phone}
 </div>
 </div>
 </div>

 <div className={`${glassCard} rounded-3xl p-8`}>
 <h3 className="font-heading text-2xl font-bold text-white mb-6">Çalışma Saatleri</h3>
 <div className="space-y-3">
 {businessData.workingHours?.filter(w => w.open).map((wh, idx) => (
 <div key={idx} className="flex justify-between items-center text-sm border-b border-white/10 pb-2 last:border-0 last:pb-0">
 <span className="text-slate-300 uppercase tracking-widest font-bold">{wh.dayTr}</span>
 <span className="text-white font-medium bg-white/10 px-3 py-1 rounded-full">{wh.open} - {wh.close}</span>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Decorative Blur Element inside the glass panel */}
 <div className="absolute -top-32 -right-32 w-96 h-96 bg-[var(--color-accent)] rounded-full mix-blend-screen filter blur-[128px] opacity-40 z-0 pointer-events-none"></div>

 </div>
 </section>

 </main>

 {/* FOOTER */}
 <footer className="relative z-10 border-t border-white/10 bg-slate-950/80 backdrop-blur-3xl py-12 text-center text-slate-500 font-medium text-sm">
 © {new Date().getFullYear()} {businessData.name}. Premium Dental Care, {businessData.district}.
 </footer>

 </div>
 )
}
