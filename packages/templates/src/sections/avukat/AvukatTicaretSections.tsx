'use client'

import React, { useState, useEffect } from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { Phone, MapPin, ChevronRight, User, Award, ArrowUpRight, Play, Star, CheckCircle2, ShieldCheck, Briefcase, Landmark } from 'lucide-react'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function AvukatTicaretSections({ business: businessData }: any) {
 const [mounted, setMounted] = useState(false)
 const [scrolled, setScrolled] = useState(false)

 useEffect(() => {
 setMounted(true)
 const handleScroll = () => setScrolled(window.scrollY > 50)
 window.addEventListener('scroll', handleScroll)
 return () => window.removeEventListener('scroll', handleScroll)
 }, [])

 if (!mounted) return null

 // Glassmorphism constants for Dark Luxury (Mor/Gold) 
 // We use dark overlays to match --color-bg: #0D0820
 const glassPanel = "bg-[#18123A]/40 backdrop-blur-xl border border-[var(--color-accent)]/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
 const glassCard = "bg-[#221A4A]/40 backdrop-blur-md border border-[var(--color-accent)]/10 hover:bg-[#221A4A]/60 transition-colors duration-500 hover:border-[var(--color-accent)]/30"

 const iconMap: Record<string, React.ReactNode> = {
 '🏦': <Landmark size={32} />,
 '🤝': <ChevronRight size={32} />,
 '📈': <ArrowUpRight size={32} />,
 '⚖️': <ShieldCheck size={32} />
 }

 return (
 <div className="min-h-screen font-body text-[var(--color-text)] selection:bg-[var(--color-accent)] selection:text-[var(--color-bg)] relative overflow-hidden">
 
 {/* CINEMATIC BACKGROUND */}
 <div className="fixed inset-0 z-0 bg-[#0D0820]">
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-surface-muted)_0%,_transparent_50%)] opacity-30 mix-blend-screen"></div>
 <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0D0820] via-[#0D0820]/80 to-transparent"></div>
 </div>

 {/* HEADER - Floating Glass */}
 <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
 <div className={`max-w-[var(--container-default,1280px)] mx-auto px-6 md:px-10 transition-all duration-500 ${scrolled ? glassPanel + ' py-3 rounded-full' : ''} flex justify-between items-center`}>
 <div className="flex flex-col">
 <span className="font-heading font-extrabold text-2xl md:text-3xl tracking-wider text-[var(--color-text)] select-none uppercase">
 TF <span className="text-[var(--color-accent)]">HUKUK</span>
 </span>
 </div>
 <div className="flex items-center gap-8">
 <div className="hidden md:flex items-center gap-6 text-sm font-bold text-[var(--color-text-secondary)] tracking-wider uppercase">
 <a href="#uzmanliklar" className="hover:text-[var(--color-accent)] transition-colors">Uzmanlıklar</a>
 <a href="#ekip" className="hover:text-[var(--color-accent)] transition-colors">Ekip</a>
 <a href="#iletisim" className="hover:text-[var(--color-accent)] transition-colors">İletişim</a>
 </div>
 <a href="#danisma" className={`bg-[var(--color-accent)] text-[var(--color-bg)] px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[var(--color-accent-hover)] transition-colors flex items-center gap-2 shadow-[0_0_15px_var(--color-accent-light)]`}>
 Danışma Al <ArrowUpRight size={16} strokeWidth={3} />
 </a>
 </div>
 </div>
 </header>

 <main className="relative z-10 pt-32 pb-24">
 
 {/* HERO SECTION */}
 <section className="max-w-[var(--container-default,1280px)] mx-auto px-6 md:px-10 min-h-[80vh] flex flex-col justify-center">
 <div className="max-w-4xl relative z-10">
 <div className="flex items-center gap-3 mb-8">
 <span className="h-px w-16 bg-[var(--color-accent)]"></span>
 <span className="text-[var(--color-accent)] font-bold tracking-[0.2em] uppercase text-xs md:text-sm">{businessData.district}, {businessData.city}</span>
 </div>
 
 <h1 className="font-heading text-5xl md:text-7xl lg:text-[6rem] font-bold leading-[1.05] text-[var(--color-text)] tracking-tight mb-8">
 TİCARİ<br/>
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[#FFECA8]">GÜVENİLİRLİK.</span>
 </h1>
 
 <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] font-medium leading-relaxed mb-12 max-w-2xl">
 {businessData.slogan}. {businessData.experience} yıllık derinleşmiş bilgi birikimiyle finans ve sermaye piyasalarında stratejik hukuki danışmanlık üstleniyoruz.
 </p>

 <div className="flex flex-wrap items-center gap-6">
 <button className={`px-8 py-4 rounded-full font-bold bg-[var(--color-accent)] text-[var(--color-bg)] hover:bg-[var(--color-accent-hover)] transition-colors duration-300 flex items-center gap-2 shadow-lg shadow-[var(--color-accent-light)]`}>
 Hemen Ara: {businessData.phoneClean?.replace(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/, '0$1 $2 $3 $4 $5')} <Phone size={18} />
 </button>
 <button className={`px-8 py-4 rounded-full font-bold text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-surface)] hover:text-[var(--color-accent)] transition-colors duration-300 flex items-center gap-2 ${glassPanel}`}>
 Ofisimizi Ziyaret Edin <ChevronRight size={18} className="text-[var(--color-accent)]" />
 </button>
 </div>
 </div>

 {/* Floating Info Stats */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24 relative z-10">
 {[
 { label: 'Yıllık Tecrübe', value: businessData.experience, icon: <Award size={24}/> },
 { label: 'Kurumsal Müvekkil', value: '150+', icon: <Briefcase size={24}/> },
 { label: 'Başarı Oranı', value: '%98', icon: <Star size={24}/> },
 { label: 'Global Vizyon', value: 'Uluslararası', icon: <ShieldCheck size={24}/> }
 ].map((stat, idx) => (
 <div key={idx} className={`${glassPanel} rounded-3xl p-6 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-all duration-300`}>
 <div className="text-[var(--color-accent)] mb-4 group-hover:scale-110 transition-transform">{stat.icon}</div>
 <div className="font-heading text-4xl font-bold text-[var(--color-text)] tracking-wider mb-2">{stat.value}</div>
 <div className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)] font-bold">{stat.label}</div>
 </div>
 ))}
 </div>
 
 {/* Glow Decoration */}
 <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[var(--color-accent)]/10 rounded-full mix-blend-screen filter blur-[150px] z-0 pointer-events-none"></div>
 </section>

 {/* UZMANLIKLAR (SERVICES) */}
 <section id="uzmanliklar" className="max-w-[var(--container-default,1280px)] mx-auto px-6 md:px-10 mt-32 relative z-10">
 <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
 <div>
 <h2 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] tracking-tight">HUKUKİ YETKİNLİK.</h2>
 <p className="text-[var(--color-text-secondary)] mt-4 max-w-lg font-medium text-lg">Finansal operasyonlar ve ticari anlaşmazlıklarda riskleri minimize eden analitik yaklaşım.</p>
 </div>
 <a href="#" className="flex items-center gap-2 text-[var(--color-accent)] hover:text-[#FFECA8] font-bold tracking-widest uppercase text-sm transition-colors border-b border-[var(--color-accent)]/30 pb-1">
 Tüm Detaylar <ArrowUpRight size={18} />
 </a>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
 {businessData.services?.map((service: any, idx: number) => (
 <div key={idx} className={`${glassCard} rounded-[2rem] p-8 flex flex-col items-center text-center group cursor-pointer relative overflow-hidden shadow-sm`}>
 {/* Hover Glow Background */}
 <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
 
 <div className="w-20 h-20 rounded-full bg-[var(--color-surface-elevated)] flex items-center justify-center text-4xl mb-6 border border-[var(--color-accent)]/20 group-hover:scale-110 group-hover:border-[var(--color-accent)]/50 group-hover:bg-[var(--color-surface-muted)] shadow-[0_0_15px_rgba(212,175,55,0.05)] transition-all duration-500 relative z-10 text-[var(--color-accent)]">
 {service.icon ? iconMap[service.icon] || <Briefcase size={32}/> : <Briefcase size={32}/>}
 </div>
 <h3 className="font-heading text-xl font-bold text-[var(--color-text)] tracking-wide mb-3 relative z-10">{service.name}</h3>
 <div className="text-[var(--color-text-muted)] font-bold text-sm mb-6 relative z-10 uppercase tracking-wider">{service.price || 'Teklife Göre'}</div>
 <div className="mt-auto w-12 h-12 rounded-full border border-[var(--color-border)] flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-colors relative z-10">
 <ArrowUpRight size={20} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-bg)] transition-colors" />
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* EKİP & İLETİŞİM BİLGİSİ */}
 <section id="ekip" className="max-w-[var(--container-default,1280px)] mx-auto px-6 md:px-10 mt-32 relative z-10">
 <div className={`${glassPanel} rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row gap-16 relative overflow-hidden backdrop-saturate-150`}>
 
 <div className="w-full lg:w-1/2 relative z-10">
 <h2 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] tracking-tight mb-8">KADRO.</h2>
 <p className="text-[var(--color-text-secondary)] leading-relaxed mb-12 text-lg font-medium">
 Alanında doktora (PhD) ve yüksek lisans (LL.M) seviyesinde akademik kariyere sahip, uluslararası tahkim ve ticaret hukuku deneyimli profesyonel {businessData.name} partnerleri.
 </p>
 
 <div className="space-y-6">
 {businessData.team?.map((member: any, idx: number) => (
 <div key={idx} className="flex items-center gap-6 p-5 rounded-3xl hover:bg-[var(--color-surface-elevated)]/50 transition-colors border border-transparent hover:border-[var(--color-border)] group">
 <div className="w-16 h-16 rounded-2xl bg-[var(--color-surface-muted)] flex items-center justify-center shrink-0 border border-[var(--color-accent)]/20 shadow-inner group-hover:border-[var(--color-accent)]/50 transition-colors">
 <User size={24} className="text-[var(--color-accent)]" />
 </div>
 <div>
 <h4 className="font-heading text-xl font-bold text-[var(--color-text)] tracking-wide mb-1 flex items-center gap-2">
 {member.name} {idx === 0 && <Award size={16} className="text-[var(--color-accent)]" />}
 </h4>
 <div className="text-[var(--color-text-secondary)] font-bold text-sm tracking-wide">{member.role}</div>
 </div>
 </div>
 ))}
 </div>
 </div>

 <div id="iletisim" className="w-full lg:w-1/2 relative z-10 flex flex-col justify-center space-y-6">
 <div className={`${glassCard} rounded-3xl p-10`}>
 <h3 className="font-heading text-3xl font-bold text-[var(--color-text)] mb-8 tracking-wide">İRTİBAT</h3>
 <div className="space-y-6 text-[var(--color-text-secondary)] font-medium text-lg">
 <div className="flex items-start gap-5">
 <div className="w-12 h-12 rounded-full bg-[var(--color-surface-muted)] flex items-center justify-center shrink-0">
 <MapPin className="text-[var(--color-accent)] size-5" />
 </div>
 <div className="pt-2 leading-relaxed tracking-wide">{businessData.address}</div>
 </div>
 <div className="flex items-center gap-5">
 <div className="w-12 h-12 rounded-full bg-[var(--color-surface-muted)] flex items-center justify-center shrink-0">
 <Phone className="text-[var(--color-accent)] size-5" />
 </div>
 <div className="pt-1 tracking-widest">{businessData.phoneClean?.replace(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/, '0$1 $2 $3 $4 $5')}</div>
 </div>
 </div>
 </div>

 <div className={`${glassCard} rounded-3xl p-10`}>
 <h3 className="font-heading text-2xl font-bold text-[var(--color-text)] mb-6 tracking-wide">MESAİ GÜNLERİ</h3>
 <div className="space-y-4">
 {businessData.workingHours?.filter(w => w.open).map((wh, idx) => (
 <div key={idx} className="flex justify-between items-center text-sm border-b border-[var(--color-border)] pb-3 last:border-0 last:pb-0">
 <span className="text-[var(--color-text-secondary)] uppercase tracking-widest font-bold">{wh.dayTr}</span>
 <span className="text-[var(--color-accent)] font-bold bg-[var(--color-surface-muted)] border border-[var(--color-border)] px-4 py-1.5 rounded-md tracking-widest">{wh.open} — {wh.close}</span>
 </div>
 ))}
 </div>
 </div>
 </div>

 </div>
 </section>

 </main>

 {/* FOOTER */}
 <footer className="relative z-10 border-t border-[var(--color-border)] bg-[#0D0820]/80 backdrop-blur-3xl py-12 text-center text-[var(--color-text-muted)] font-bold text-xs uppercase tracking-widest">
 © {new Date().getFullYear()} {businessData.name}. Bütün Hakları Saklıdır. {businessData.district}, İstanbul.
 </footer>

 </div>
 )
}

import { registerSection } from '../../registry/section-registry'
registerSection('hero', 'avukat_ticaret_full', AvukatTicaretSections as unknown as React.ComponentType<any>)
