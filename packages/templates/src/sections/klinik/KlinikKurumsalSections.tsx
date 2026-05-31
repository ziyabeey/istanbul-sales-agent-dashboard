'use client'

import React, { useState, useEffect } from 'react'
import { SectionConfig, BusinessData } from '../../types/section-types'
import { Phone, MapPin, Mail, ChevronRight, FileText, CheckCircle2, Stethoscope, HeartPulse, ClipboardList, Clock, Instagram } from 'lucide-react'

// Katman 3 (Growth) - Klinik Kurumsal
// Tasarım: Asymmetric/Editorial layout (lg container), 30/70 Sticky Sidebar (sol menü).

interface Props {
 sections: SectionConfig[]
 businessData: BusinessData
}

export const KlinikKurumsalSections = ({ sections, businessData }: Props) => {
 const [activeSection, setActiveSection] = useState('hakkimizda')

 useEffect(() => {
 const handleScroll = () => {
 const sectionIds = sections.map(s => s.id).filter(id => !id.startsWith('global'))
 for (const id of sectionIds) {
 const el = document.getElementById(id)
 if (el) {
 const rect = el.getBoundingClientRect()
 if (rect.top <= 200 && rect.bottom >= 200) {
 setActiveSection(id)
 break
 }
 }
 }
 }
 window.addEventListener('scroll', handleScroll)
 return () => window.removeEventListener('scroll', handleScroll)
 }, [sections])

 const getIcon = (name: string) => {
 switch (name) {
 case 'stethoscope': return <Stethoscope size={28} strokeWidth={1.5} className="text-accent" />
 case 'heartPulse': return <HeartPulse size={28} strokeWidth={1.5} className="text-accent" />
 case 'clipboardList': return <ClipboardList size={28} strokeWidth={1.5} className="text-accent" />
 default: return <CheckCircle2 size={28} strokeWidth={1.5} className="text-accent" />
 }
 }

 const rightSections = sections.filter(s => s.id !== 'global-header' && s.id !== 'global-footer')
 const globalHeader = sections.find(s => s.id === 'global-header')
 const globalFooter = sections.find(s => s.id === 'global-footer')
 const globalHeaderData = globalHeader?.defaultContent as any
 const globalFooterData = globalFooter?.defaultContent as any

 return (
 <div className="font-body bg-bg text-text min-h-screen selection:bg-accent selection:text-white">
 {/* MOBILE HEADER */}
 <header className="lg:hidden sticky top-0 z-50 bg-surface border-b border-border p-4 flex justify-between items-center">
 <h1 className="font-heading text-lg font-bold text-accent">{globalHeaderData?.logo?.text || businessData.name}</h1>
 <a href={`tel:${businessData.phoneClean}`} className="w-10 h-10 bg-accent-subtle text-accent rounded-full flex items-center justify-center">
 <Phone size={18}/>
 </a>
 </header>

 {/* 30/70 SPLIT LAYOUT */}
 <div className="flex flex-col lg:flex-row w-full max-w-[1440px] mx-auto min-h-screen">
 
 {/* LEFT SIDEBAR (30%) - STICKY */}
 <aside className="hidden lg:flex w-[30%] border-r border-border bg-surface min-h-screen sticky top-0 h-screen flex-col justify-between p-10 xl:p-14">
 <div>
 <h1 className="font-heading text-3xl xl:text-4xl font-bold text-text mb-2 tracking-tight">
 <span className="text-accent">{globalHeaderData?.logo?.text?.split(' ')[0]}</span> {globalHeaderData?.logo?.text?.split(' ').slice(1).join(' ') || businessData.name}
 </h1>
 <p className="text-sm text-text-secondary font-medium mb-16">{businessData.slogan}</p>

 <nav className="flex flex-col gap-6">
 {rightSections.filter(s => s.id !== 'hero').map(item => {
 const c = item.defaultContent as any;
 const label = c?.badge || c?.title || item.id;
 return (
 <a 
 key={item.id}
 href={`#${item.id}`}
 className={`text-lg font-heading transition-colors flex items-center gap-4 ${activeSection === item.id ? 'text-accent font-bold' : 'text-text-secondary hover:text-text'}`}
 >
 <span className={`w-8 h-px transition-all ${activeSection === item.id ? 'bg-accent scale-x-100' : 'bg-transparent scale-x-0'}`}></span>
 <span className="capitalize">{label}</span>
 </a>
 )
 })}
 </nav>
 </div>

 <div className="space-y-6">
 <a href={`tel:${businessData.phoneClean}`} className="flex items-center gap-3 p-4 bg-surface-elevated border border-border rounded-lg hover:border-accent transition-colors group">
 <Phone size={20} className="text-accent group-hover:scale-110 transition-transform"/>
 <div>
 <p className="text-xs font-bold text-text uppercase tracking-wider">Hızlı İletişim</p>
 <p className="text-sm text-text-secondary font-bold font-heading">{businessData.phone}</p>
 </div>
 </a>
 <div className="text-sm font-medium text-text-secondary border-t border-border pt-6">
 <p className="text-xs">{businessData.address}</p>
 </div>
 </div>
 </aside>

 {/* RIGHT CONTENT AREA (70%) */}
 <main className="w-full lg:w-[70%]">
 
 {rightSections.map((section) => {
 // 1. HERO (asymmetric editorial)
 if (section.id === 'hero' || section.type === 'hero') {
 const content = section.defaultContent as any;
 return (
 <section key={section.id} id={section.id} className="relative h-[60vh] lg:h-[80vh] overflow-hidden bg-surface-muted flex items-end border-b border-border">
 <div className="absolute inset-0 w-full h-[120%] -top-[10%]">
 <img src={businessData.photos?.[0] || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80'} alt="Clinic Hero" className="w-full h-full object-cover" />
 </div>
 <div className="relative z-10 bg-surface max-w-2xl p-8 md:p-12 lg:p-16 border-t border-r border-border lg:rounded-tr-3xl">
 <p className="text-xs font-bold text-accent tracking-widest uppercase mb-4">{content?.badge || 'Uluslararası Sağlık Standartları'}</p>
 <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-[1.1] mb-6" dangerouslySetInnerHTML={{ __html: content?.title?.replace('\n', '<br/>') || 'Sağlığınız<br/>İçin Doğru<br/>Adres' }}></h2>
 <p className="text-lg text-text-secondary font-medium leading-relaxed mb-8">
 {content?.subtitle || 'Uzman hekim kadromuz ile tanıdan tedaviye her adımda yanınızdayız.'}
 </p>
 {content?.cta1 && (
 <a href={content.cta1.href} className="inline-flex items-center gap-2 bg-text text-bg px-8 py-4 font-bold tracking-wider uppercase text-sm hover:bg-accent hover:text-on-accent transition-colors">
 {content?.cta1.text} <ChevronRight size={18}/>
 </a>
 )}
 </div>
 </section>
 )
 }

 // 2. ABOUT (minimal editorial)
 if (section.id === 'hakkimizda' || section.type === 'about') {
 const content = section.defaultContent as any;
 return (
 <section key={section.id} id={section.id} className="p-8 md:p-12 lg:p-16 xl:p-24 scroll-mt-24 border-b border-border">
 <h3 className="font-heading text-4xl font-bold text-text mb-6">{content?.title || 'Biz Kimiz?'}</h3>
 <div className="grid md:grid-cols-2 gap-12 text-text-secondary text-lg leading-relaxed font-medium">
 <div>
 {content?.description || 'Hastanemiz, alanında uzman hekim kadrosu ve yardımcı personeliyle, hasta haklarına saygılı ve etik ilkelerden ödün vermeyen bir hizmet anlayışıyla yola çıkmıştır.'}
 </div>
 <div className="bg-surface-elevated p-8 border-l-4 border-accent">
 <p className="italic text-text">"Amacımız, uluslararası tıp standartlarında teşhis ve tedavi hizmeti sunarken, insani değerleri her zaman ön planda tutmaktır."</p>
 </div>
 </div>
 </section>
 )
 }

 // 3. SERVICES (grid)
 if (section.id === 'hizmetler' || section.type === 'services') {
 const content = section.defaultContent as any;
 const services = content?.services || businessData.services || [];
 return (
 <section key={section.id} id={section.id} className="p-8 md:p-12 lg:p-16 xl:p-24 scroll-mt-24 bg-surface-muted border-b border-border">
 <h3 className="font-heading text-4xl font-bold text-text mb-4">{content?.title || 'Tıbbi Birimlerimiz'}</h3>
 <p className="text-text-secondary text-lg mb-12 max-w-2xl font-medium">Multidisipliner yaklaşımla detaylı tanı ve tedavi.</p>
 
 <div className="grid sm:grid-cols-2 gap-6">
 {services.map((service: any, i: number) => (
 <div key={service.id || i} className="group p-8 bg-surface border border-border hover:border-accent transition-all duration-300 relative overflow-hidden">
 <div className="absolute top-0 right-0 w-24 h-24 bg-surface-elevated rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-150 group-hover:bg-accent-subtle"></div>
 <div className="relative z-10">
 <div className="mb-6">{getIcon(service.icon || '')}</div>
 <h4 className="font-heading text-2xl font-bold text-text mb-2">{service.name}</h4>
 <p className="text-text-secondary font-medium text-sm mb-6">{service.description}</p>
 <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-accent uppercase tracking-wider group-hover:translate-x-2 transition-transform">
 İncele <ChevronRight size={16}/>
 </a>
 </div>
 </div>
 ))}
 </div>
 </section>
 )
 }

 // 4. TEAM (cards)
 if (section.id === 'uzmanlar' || section.type === 'team') {
 const content = section.defaultContent as any;
 return (
 <section key={section.id} id={section.id} className="p-8 md:p-12 lg:p-16 xl:p-24 scroll-mt-24 border-b border-border">
 <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-12">
 <div>
 <h3 className="font-heading text-4xl font-bold text-text mb-4">{content?.title || 'Akademik Kadromuz'}</h3>
 <p className="text-text-secondary text-lg max-w-xl font-medium">Uzman doktorlarımız ve deneyimli sağlık ekibimiz.</p>
 </div>
 <a href="#" className="shrink-0 text-sm font-bold text-text border-b-2 border-text pb-1 hover:text-accent hover:border-accent transition-colors">Tüm Kadroyu İncele</a>
 </div>

 <div className="grid sm:grid-cols-2 gap-8">
 <div className="group cursor-pointer">
 <div className="w-full aspect-[4/5] bg-surface-muted mb-6 overflow-hidden relative border border-border">
 <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80" alt={businessData?.ownerName as string} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
 <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
 <p className="text-on-accent text-sm font-medium">Hacettepe Üniversitesi (1998)</p>
 </div>
 </div>
 <p className="text-accent font-bold text-sm tracking-widest uppercase mb-2">Başhekim</p>
 <h4 className="font-heading text-2xl font-bold text-text">{businessData?.ownerName as string}</h4>
 </div>
 </div>
 </section>
 )
 }

 // 5. GALLERY (masonry)
 if (section.id === 'galeri' || section.type === 'gallery') {
 const content = section.defaultContent as any;
 return (
 <section key={section.id} id={section.id} className="p-8 md:p-12 lg:p-16 xl:p-24 scroll-mt-24 bg-surface-muted border-b border-border">
 <h3 className="font-heading text-4xl font-bold text-text mb-8">{content?.title || 'Kliniğimizden Kareler'}</h3>
 <div className="grid grid-cols-2 gap-4">
 <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80" alt="Clinic 1" className="w-full h-64 object-cover border border-border"/>
 <img src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80" alt="Clinic 2" className="w-full h-64 object-cover border border-border"/>
 </div>
 </section>
 )
 }

 // 6. CONTACT (map)
 if (section.id === 'iletisim' || section.type === 'contact') {
 const content = section.defaultContent as any;
 return (
 <section key={section.id} id={section.id} className="p-8 md:p-12 lg:p-16 xl:p-24 scroll-mt-24">
 <div className="grid xl:grid-cols-2 gap-12">
 <div>
 <h3 className="font-heading text-4xl font-bold text-text mb-8">{content?.title || 'İletişim Bilgileri'}</h3>
 <div className="space-y-8 font-medium">
 <div className="flex items-start gap-4">
 <MapPin size={24} className="text-accent shrink-0 mt-1"/>
 <div>
 <p className="font-bold text-text mb-1 uppercase tracking-wider text-sm">Adres</p>
 <p className="text-text-secondary leading-relaxed">{businessData.address}</p>
 </div>
 </div>
 <div className="flex items-center gap-4">
 <Phone size={24} className="text-accent shrink-0"/>
 <div>
 <p className="font-bold text-text mb-1 uppercase tracking-wider text-sm">Çağrı Merkezi</p>
 <p className="text-text-secondary text-xl font-heading font-bold">{businessData.phone}</p>
 </div>
 </div>
 </div>
 </div>
 <div className="bg-surface border border-border p-8">
 <h4 className="font-heading text-2xl font-bold text-text mb-6">Sizi Arayalım</h4>
 <form className="space-y-4" onSubmit={e=>e.preventDefault()}>
 <input type="text" placeholder="Ad Soyad" className="w-full bg-surface-elevated border border-border-strong p-4 text-text focus:outline-none focus:border-accent transition-colors"/>
 <input type="tel" placeholder="Telefon" className="w-full bg-surface-elevated border border-border-strong p-4 text-text focus:outline-none focus:border-accent transition-colors"/>
 <button className="w-full bg-accent text-on-accent font-bold tracking-widest uppercase p-4 hover:opacity-90 transition-opacity">
 Gönder
 </button>
 </form>
 </div>
 </div>
 </section>
 )
 }

 return (
 <section key={section.id} className="p-8 text-center border-b border-border text-text-muted">
 Section Placeholder: {section.type}
 </section>
 )
 })}

 {/* FOOTER */}
 {globalFooter && (
 <footer className="bg-surface-elevated border-t border-border p-8 lg:p-16">
 <div className="grid md:grid-cols-2 gap-12 mb-16">
 <div>
 <h2 className="font-heading text-2xl font-bold text-text mb-4">{globalFooterData?.businessName || businessData.name}</h2>
 <p className="text-text-secondary font-medium max-w-sm mb-6">{businessData.slogan}</p>
 <div className="flex gap-4 opacity-50">
 <MapPin size={24}/> <Phone size={24}/>
 </div>
 </div>
 <div className="grid grid-cols-2 gap-8 text-sm font-medium">
 <div>
 <p className="font-bold text-text tracking-wider uppercase mb-4">Kurumsal</p>
 <ul className="space-y-3 text-text-secondary">
 {globalFooterData?.legal?.map((l:any, i:number) => (
 <li key={i}><a href={l.href} className="hover:text-accent transition-colors">{l.label}</a></li>
 )) || <li>KVKK</li>}
 </ul>
 </div>
 </div>
 </div>
 <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-text-muted">
 <p>{globalFooterData?.copyright || `© ${new Date().getFullYear()} ${businessData.name}. Tüm hakları saklıdır.`}</p>
 <p>{globalFooterData?.poweredBy || 'Powered by Kepenk'}</p>
 </div>
 </footer>
 )}
 </main>
 </div>
 </div>
 )
}
