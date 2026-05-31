'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { MapPin, Phone, Mail, ArrowUpRight, BarChart3, Building2, HardHat, Briefcase, ChevronRight } from 'lucide-react'
import { registerSection } from '../../registry/section-registry'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function MimarlikYapiSections({ config, businessData }: Props) {
 const [mounted, setMounted] = useState(false)
 const videoRef = useRef<HTMLVideoElement>(null)

 useEffect(() => {
 setMounted(true)
 if (videoRef.current) {
 videoRef.current.play().catch(e => console.log('Autoplay prevented', e))
 }
 }, [])

 if (!mounted) return null

 const getSection = (id: string) => config.pages?.[0]!.sections.find(s => s.id === id)
 const heroData = getSection('hero')?.defaultContent as any
 const statsData = getSection('stats')?.defaultContent as any
 const portfolioData = getSection('portfolio')?.defaultContent as any
 const processData = getSection('process')?.defaultContent as any
 const locationsData = getSection('locations')?.defaultContent as any
 const careersData = getSection('careers')?.defaultContent as any
 const contactData = getSection('iletisim')?.defaultContent as any

 return (
 <div className="min-h-screen font-body bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-text)] selection:text-[var(--color-bg)]">
 
 {/* HEADER (Industrial Enterprise) */}
 <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center text-white bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4 md:px-12 font-heading">
 <div className="flex items-center gap-4 text-xl font-black uppercase tracking-tighter">
 <Building2 size={24} />
 {businessData.name}
 </div>
 <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-secondary)] font-body">
 <a href="#portfolio" className="hover:text-white transition-colors">Projeler</a>
 <a href="#process" className="hover:text-white transition-colors">Sistem</a>
 <a href="#locations" className="hover:text-white transition-colors">Ağımız</a>
 <a href="#careers" className="hover:text-white transition-colors">Kariyer</a>
 <a href="#iletisim" className="hover:text-white transition-colors">İletişim</a>
 </div>
 <div className="hidden md:block">
 <a href="#iletisim" className="border border-white/30 px-5 py-2 text-[10px] uppercase font-bold tracking-[0.2em] bg-white text-black hover:bg-transparent hover:text-white transition-all font-body">
 Yatırımcı Portalı
 </a>
 </div>
 </header>

 {/* HERO: Video Split */}
 <section className="relative w-full h-screen pt-20 flex flex-col lg:flex-row border-b border-[var(--color-border)]">
 <div className="flex-1 flex flex-col justify-center px-6 md:px-12 bg-black py-12 lg:py-0">
 <div className="max-w-2xl font-body">
 <div className="inline-flex items-center gap-3 border border-[var(--color-border-strong)] px-3 py-1 mb-8 text-[10px] uppercase tracking-[0.2em] text-white">
 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
 {heroData?.badge}
 </div>
 <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
 {heroData?.title?.split('.')[0]}.<br />
 <span className="text-[var(--color-text-secondary)]">{heroData?.title?.split('.')[1]}.</span>
 </h1>
 <p className="text-sm md:text-base text-[var(--color-text-muted)] font-mono max-w-lg mb-12">
 {heroData?.subtitle}
 </p>
 <div className="flex flex-col sm:flex-row gap-4">
 <a href="#reports" className="px-8 py-4 bg-white text-black text-[12px] font-bold uppercase tracking-[0.1em] hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
 Kurumsal Rapor <ArrowUpRight size={16} />
 </a>
 <a href="#portfolio" className="px-8 py-4 border border-[var(--color-border-strong)] text-white text-[12px] font-bold uppercase tracking-[0.1em] hover:bg-white/5 transition-colors text-center">
 Mühendislik Projeleri
 </a>
 </div>
 </div>
 </div>
 <div className="flex-1 relative bg-[var(--color-surface)] lg:border-l border-[var(--color-border)]">
 {heroData?.videoUrl ? (
 <video 
 ref={videoRef}
 src={heroData.videoUrl} 
 autoPlay 
 loop 
 muted 
 playsInline
 className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity"
 />
 ) : (
 <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity" />
 )}
 
 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
 
 <div className="absolute bottom-8 right-8 font-body text-[10px] text-white/50 bg-black/50 backdrop-blur-md px-4 py-2 border border-white/10 uppercase tracking-widest hidden md:block">
 SYS: {new Date().toISOString().split('T')[0]} | SEQ: {Math.floor(Math.random() * 99999)}
 </div>
 </div>
 </section>

 {/* STATS GRID */}
 <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
 <div className="grid grid-cols-2 lg:grid-cols-4 font-body border-l border-[var(--color-border)] w-full w-max-[1600px] mx-auto divide-x divide-y lg:divide-y-0 divide-[var(--color-border)]">
 {statsData?.items?.map((item: any, idx: number) => (
 <div key={idx} className="p-8 md:p-12 flex flex-col justify-center items-center text-center">
 <span className="font-heading text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tighter">{item.value}</span>
 <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--color-text-muted)] max-w-[150px] leading-relaxed">{item.label}</span>
 </div>
 ))}
 </div>
 </section>

 {/* PORTFOLIO: Structured Grid */}
 <section id="portfolio" className="py-24 md:py-32 px-6 md:px-12 bg-black border-b border-[var(--color-border)]">
 <div className="max-w-[1600px] mx-auto">
 <div className="font-body text-[10px] text-[var(--color-text-secondary)] uppercase tracking-[0.2em] font-bold border-b border-[var(--color-border-strong)] pb-4 mb-16 flex justify-between items-end">
 <div>
 <span className="text-white block mb-2">{portfolioData?.badge}</span>
 <h2 className="font-heading text-4xl md:text-5xl text-white font-black tracking-tighter">{portfolioData?.title}</h2>
 </div>
 <div className="hidden md:flex items-center gap-2 border border-[var(--color-border)] px-4 py-2 hover:bg-white hover:text-black transition-colors cursor-pointer">
 Filtrele <ChevronRight size={14} />
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border)]">
 {portfolioData?.items?.map((item: any, idx: number) => (
 <div key={item.id} className="bg-black relative group cursor-pointer overflow-hidden p-6 md:p-12 border-b md:border-b-0 border-[var(--color-border)] flex flex-col gap-6">
 <div className="aspect-video bg-[var(--color-surface)] overflow-hidden relative">
 <img src={item.image} alt={item.title} className="w-full h-full object-cover mix-blend-luminosity opacity-70 group-hover:mix-blend-normal group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
 <div className="absolute top-4 left-4 font-body text-[10px] px-2 py-1 bg-black text-white uppercase tracking-widest border border-white/20">
 {item.category}
 </div>
 </div>
 <div className="flex justify-between items-center font-heading">
 <h3 className="text-2xl font-bold uppercase tracking-tight">{item.title}</h3>
 <div className="w-10 h-10 rounded-full border border-[var(--color-border-strong)] flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
 <ArrowUpRight size={18} />
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* PROCESS: Vertical System Cards */}
 <section id="process" className="py-24 md:py-32 px-6 md:px-12 bg-[var(--color-surface)] font-body border-b border-[var(--color-border)]">
 <div className="max-w-[1200px] mx-auto">
 <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-[0.2em] font-bold mb-16 max-w-3xl">
 <span className="text-white block mb-4">{processData?.badge}</span>
 <h2 className="font-heading text-4xl md:text-5xl text-white font-black tracking-tighter leading-none">
 {processData?.title}
 </h2>
 </div>

 <div className="flex flex-col border-[var(--color-border)] border">
 {processData?.steps?.map((step: any, idx: number) => (
 <div key={step.id} className={`p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-16 group hover:bg-[var(--color-surface-elevated)] transition-colors ${idx !== processData.steps.length - 1 ? 'border-b border-[var(--color-border)]' : ''}`}>
 <div className="font-heading text-4xl font-black text-[var(--color-text-muted)] group-hover:text-white transition-colors">
 0{idx + 1}
 </div>
 <div>
 <h3 className="text-xl font-bold uppercase tracking-wider mb-4 font-heading">{step.title.split('. ')[1]}</h3>
 <p className="text-sm text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">{step.description}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* MULTI LOCATION & CAREERS (Side by Side on Large screens) */}
 <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-[var(--color-border)]">
 
 {/* Locations */}
 <div id="locations" className="py-24 md:py-32 px-6 md:px-12 bg-black border-r border-[var(--color-border)]">
 <div className="max-w-[600px] lg:ml-auto">
 <span className="font-body text-[10px] text-white uppercase tracking-[0.2em] font-bold block mb-4">{locationsData?.badge}</span>
 <h2 className="font-heading text-4xl font-black tracking-tighter uppercase mb-12">{locationsData?.title}</h2>
 
 <div className="flex flex-col font-body space-y-8">
 {locationsData?.locations?.map((loc: any) => (
 <div key={loc.id} className="border-l-2 border-[var(--color-border-strong)] pl-6 cursor-pointer hover:border-white transition-colors">
 <div className="flex gap-4 items-center mb-2">
 <h4 className="font-bold text-lg uppercase tracking-widest">{loc.city}</h4>
 <span className="text-[10px] bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] px-2 py-0.5 uppercase tracking-widest">{loc.name}</span>
 </div>
 <p className="text-sm text-[var(--color-text-secondary)] mb-2">{loc.address}</p>
 <p className="text-sm text-[var(--color-text-secondary)]">{loc.phone}</p>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Careers */}
 <div id="careers" className="py-24 md:py-32 px-6 md:px-12 bg-[var(--color-surface)]">
 <div className="max-w-[600px] lg:mr-auto">
 <span className="font-body text-[10px] text-white uppercase tracking-[0.2em] font-bold block mb-4">{careersData?.badge}</span>
 <h2 className="font-heading text-4xl font-black tracking-tighter uppercase mb-12">{careersData?.title}</h2>
 
 <div className="flex flex-col gap-px bg-[var(--color-border)] font-body">
 {careersData?.jobs?.map((job: any) => (
 <div key={job.id} className="bg-[var(--color-surface)] p-6 hover:bg-black transition-colors cursor-pointer group flex justify-between items-center">
 <div>
 <h4 className="font-bold uppercase tracking-wider mb-2 group-hover:text-white transition-colors">{job.title}</h4>
 <div className="flex gap-4 text-xs tracking-widest uppercase text-[var(--color-text-muted)]">
 <span className="flex items-center gap-1"><MapPin size={12}/> {job.location}</span>
 <span className="flex items-center gap-1"><Briefcase size={12}/> {job.type}</span>
 </div>
 </div>
 <ArrowUpRight size={20} className="text-[var(--color-border-strong)] group-hover:text-white transition-colors" />
 </div>
 ))}
 </div>
 <button className="w-full mt-8 border border-[var(--color-border-strong)] py-4 text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-white hover:text-black transition-colors">
 Tüm İlanları Görüntüle
 </button>
 </div>
 </div>

 </section>

 {/* CONTACT (Form) */}
 <section id="iletisim" className="py-24 md:py-32 px-6 md:px-12 bg-black font-body">
 <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
 
 <div>
 <span className="block text-[10px] text-[var(--color-text-secondary)] uppercase tracking-[0.2em] font-bold mb-4">{contactData?.badge}</span>
 <h2 className="font-heading text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 leading-none block">
 Global Ağa <br/>Katılın.
 </h2>
 <p className="text-sm md:text-base text-[var(--color-text-secondary)] max-w-sm leading-relaxed mb-12">
 {contactData?.subtitle}
 </p>
 
 <div className="grid grid-cols-2 gap-8 text-[11px] uppercase tracking-[0.1em] text-[var(--color-text-muted)] border-t border-[var(--color-border-strong)] pt-8">
 <div>
 <p className="text-white mb-2 font-bold">Pazarlama & Medya</p>
 <p>press@yapiglobal.com</p>
 </div>
 <div>
 <p className="text-white mb-2 font-bold">İnsan Kaynakları</p>
 <p>hr@yapiglobal.com</p>
 </div>
 <div>
 <p className="text-white mb-2 font-bold">Yatırımcı İlişkileri</p>
 <p>investor@yapiglobal.com</p>
 </div>
 </div>
 </div>

 <div className="bg-[var(--color-surface)] p-8 md:p-12 border border-[var(--color-border)]">
 <form className="flex flex-col gap-8" onSubmit={e => e.preventDefault()}>
 <div className="flex flex-col">
 <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[var(--color-text-secondary)] mb-2">Departman</label>
 <select className="bg-transparent border-b border-[var(--color-border-strong)] pb-4 text-sm focus:outline-none focus:border-white transition-colors text-white uppercase tracking-widest font-bold">
 <option className="bg-black">Yatırımcı İlişkileri</option>
 <option className="bg-black">Tedarik Zinciri</option>
 <option className="bg-black">Medya / Basın B</option>
 <option className="bg-black">Genel İletişim</option>
 </select>
 </div>
 <div className="flex flex-col">
 <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[var(--color-text-secondary)] mb-2">Kurum Adı</label>
 <input type="text" className="bg-transparent border-b border-[var(--color-border-strong)] pb-4 text-sm focus:outline-none focus:border-white transition-colors text-white" />
 </div>
 <div className="grid grid-cols-2 gap-8">
 <div className="flex flex-col">
 <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[var(--color-text-secondary)] mb-2">Yetkili Kişi</label>
 <input type="text" className="bg-transparent border-b border-[var(--color-border-strong)] pb-4 text-sm focus:outline-none focus:border-white transition-colors text-white" />
 </div>
 <div className="flex flex-col">
 <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[var(--color-text-secondary)] mb-2">E-Posta</label>
 <input type="email" className="bg-transparent border-b border-[var(--color-border-strong)] pb-4 text-sm focus:outline-none focus:border-white transition-colors text-white" />
 </div>
 </div>
 <div className="flex flex-col">
 <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[var(--color-text-secondary)] mb-2">Mesajınız</label>
 <textarea rows={3} className="bg-transparent border-b border-[var(--color-border-strong)] pb-4 text-sm focus:outline-none focus:border-white transition-colors text-white resize-none"></textarea>
 </div>
 <button className="mt-4 bg-white text-black font-bold uppercase tracking-[0.2em] text-[10px] py-5 hover:bg-gray-200 transition-colors w-full md:w-auto md:px-12 flex justify-between items-center px-6">
 Gönderimi Başlat <ArrowUpRight size={16} />
 </button>
 </form>
 </div>

 </div>
 </section>

 {/* FOOTER */}
 <footer className="py-8 px-6 md:px-12 font-body text-[10px] uppercase tracking-[0.2em] flex flex-col md:flex-row justify-between items-center gap-6 border-t border-[var(--color-border)] bg-black text-[var(--color-text-secondary)] font-bold">
 <div>{businessData.name} — © {new Date().getFullYear()}</div>
 <div className="flex gap-6 hover:[&>a]:text-white">
 <a href="#" className="transition-colors">KVKK</a>
 <a href="#" className="transition-colors">Gizlilik</a>
 <a href="#" className="transition-colors">LinkedIn</a>
 </div>
 <div className="flexItems-center gap-2">
 <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span> SYS_ONLINE
 </div>
 </footer>
 </div>
 )
}
