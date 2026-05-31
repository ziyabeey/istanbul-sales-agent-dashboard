'use client'

import React, { useState } from 'react'
import { SectionConfig, BusinessData } from '../../types/section-types'
import { Play, ArrowRight, BookOpen, Clock, MapPin, Phone, Mail, GraduationCap } from 'lucide-react'

// Katman 3 (Büyüme) - Özel Ders Akademi
// Tasarım: 100% Edge-to-Edge container mantığı ama content 1280px. 
// 12px radius, 80px padding, video background. Work Sans font.

interface Props {
 sections: SectionConfig[]
 businessData: BusinessData
}

export const OzelDersAkademiSections = ({ sections, businessData }: Props) => {
 const [activeDay, setActiveDay] = useState('Pzt')

 return (
 <div className="flex flex-col w-full">
 {sections.map((section) => {
 // --- 1. HERO (video_cinematic) ---
 if (section.id === 'hero' || section.type === 'hero') {
 return (
 <section key={section.id} id={section.id} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
 <div className="absolute inset-0 z-0">
 <video 
 autoPlay 
 loop 
 muted 
 playsInline
 className="w-full h-full object-cover scale-105"
 poster="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=2000"
 >
 {/* Empty src to avoid 404s, falls back to poster */}
 <source src="" type="video/mp4" />
 </video>
 <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
 </div>

 <div className="container-custom relative z-10 px-4 text-center">
 <div className="max-w-4xl mx-auto flex flex-col items-center">
 <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-full mb-8 animate-fade-in group cursor-pointer hover:bg-white/20 transition-all">
 <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
 <Play className="w-4 h-4 sm:w-5 sm:h-5 text-on-accent ml-1" />
 </div>
 <span className="text-white font-medium pr-4 text-sm sm:text-base tracking-wide">
 {section.defaultContent?.badge || 'TANITIM VİDEOSU'}
 </span>
 </div>

 <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-8 tracking-tight leading-[1.1] animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
 {section.defaultContent?.title || 'Sınırları Aşan Eğitim Modeli.'}
 </h1>

 <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl font-body font-light animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
 {section.defaultContent?.subtitle || 'Evden çıkmadan, en iyi uzmanların canlı derslerine bağlanın.'}
 </p>

 <div className="flex flex-col sm:flex-row gap-6 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
 {section.defaultContent?.cta1 && (
 <a href={section.defaultContent.cta1.href} className="px-10 py-5 bg-accent text-on-accent font-semibold text-lg hover:bg-accent-hover transition-colors rounded-btn shadow-lg shadow-accent/20">
 {section.defaultContent.cta1.text}
 </a>
 )}
 </div>
 </div>
 </div>

 <div className="absolute bottom-10 left-0 w-full flex justify-center z-10 animate-bounce">
 <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center pt-2">
 <div className="w-1.5 h-3 bg-white rounded-full opacity-70"></div>
 </div>
 </div>
 </section>
 )
 }

 // --- 2. KURSLAR (services - subject_grid) ---
 if (section.id === 'kurslar' || section.type === 'services') {
 const subjects = section.defaultContent?.subjects || []
 return (
 <section key={section.id} id={section.id} className="py-section bg-bg">
 <div className="container-custom px-4 relative">
 <div className="flex flex-col md:flex-row justify-between items-end mb-16">
 <div className="max-w-2xl">
 {section.defaultContent?.badge && <span className="text-accent font-semibold tracking-wider text-sm mb-3 block uppercase">{section.defaultContent.badge}</span>}
 <h2 className="text-4xl md:text-5xl font-heading font-bold text-text mb-4 leading-tight">
 {section.defaultContent?.title || 'Yabancı Dil Kursları'}
 </h2>
 </div>
 <div className="mt-6 md:mt-0">
 <a href="#kayit" className="px-6 py-3 border border-border rounded-btn text-text font-medium hover:border-accent hover:text-accent transition-colors hidden md:inline-flex items-center">
 Tüm Modüller <ArrowRight className="ml-2 w-4 h-4" />
 </a>
 </div>
 </div>

 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
 {subjects.map((subject: any, idx: number) => (
 <div key={idx} className="bg-surface rounded-card p-8 group hover:-translate-y-2 transition-all duration-300">
 <div className="w-16 h-16 bg-bg rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm group-hover:bg-accent group-hover:text-on-accent transition-colors">
 {subject.emoji || '💬'}
 </div>
 <h3 className="text-2xl font-heading font-bold text-text mb-3">{subject.name}</h3>
 <p className="text-text-secondary mb-6 font-medium">{subject.level}</p>
 <div className="w-full h-1 bg-border rounded-full overflow-hidden">
 <div className="w-1/3 h-full bg-accent"></div>
 </div>
 <div className="mt-8 flex items-center justify-between text-sm font-semibold">
 <span className="text-text">Program Detayı</span>
 <div className="w-8 h-8 rounded-full bg-bg flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-on-accent transition-colors">
 <ArrowRight className="w-4 h-4" />
 </div>
 </div>
 </div>
 ))}
 {(!subjects || subjects.length === 0) && businessData?.services?.map((svc: any, idx: number) => (
 <div key={idx} className="bg-surface rounded-card p-8 group hover:-translate-y-2 transition-all duration-300">
 <div className="w-16 h-16 bg-bg rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm group-hover:bg-accent group-hover:text-on-accent transition-colors">
 {svc.icon || '💬'}
 </div>
 <h3 className="text-2xl font-heading font-bold text-text mb-3">{svc.name}</h3>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
 }

 // --- 3. PROGRAM (class_schedule - day_tabs) ---
 if (section.id === 'program' || section.type === 'class_schedule') {
 const days = section.defaultContent?.days || [{day: 'Pzt', classes: [{time:'19:00 - 20:30', name:'Örnek Ders', trainer:'Uzman', category:'Dil'}]}]
 
 return (
 <section key={section.id} id={section.id} className="py-section bg-surface-muted border-y border-border">
 <div className="container-custom px-4 relative">
 <div className="text-center max-w-3xl mx-auto mb-16">
 {section.defaultContent?.badge && <span className="text-accent font-semibold tracking-wider text-sm mb-3 block uppercase">{section.defaultContent.badge}</span>}
 <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mb-6">{section.defaultContent?.title || 'Canlı Ders Takvimi'}</h2>
 </div>

 <div className="flex flex-wrap justify-center gap-2 mb-10">
 {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(day => (
 <button 
 key={day}
 onClick={() => setActiveDay(day)}
 className={`px-6 py-3 rounded-full font-semibold transition-all ${activeDay === day ? 'bg-accent text-on-accent shadow-md' : 'bg-surface text-text hover:bg-border'}`}
 >
 {day}
 </button>
 ))}
 </div>

 <div className="bg-bg rounded-card border border-border overflow-hidden">
 <div className="p-2 sm:p-6 space-y-4">
 {/* Simulated data for the active day */}
 {[1, 2, 3].map((item, idx) => (
 <div key={idx} className="flex flex-col md:flex-row items-center justify-between p-6 bg-surface rounded-xl hover:shadow-md transition-shadow">
 <div className="flex items-center gap-6 mb-4 md:mb-0 w-full md:w-auto">
 <div className="hidden md:flex flex-col items-center justify-center w-20 h-20 bg-bg rounded-lg border border-border shrink-0">
 <Clock className="w-5 h-5 text-accent mb-1" />
 <span className="font-bold text-sm text-text">19:00</span>
 </div>
 <div>
 <div className="flex items-center gap-3 mb-2">
 <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full">DİL GRUBU</span>
 <span className="md:hidden text-sm font-bold text-text"><Clock className="w-3 h-3 inline mr-1" /> 19:00 - 20:30</span>
 </div>
 <h3 className="text-xl font-heading font-bold text-text">Advanced Grammar & Speaking</h3>
 <p className="text-text-secondary mt-1 flex items-center">
 <GraduationCap className="w-4 h-4 mr-2" />
 Dr. Mehmet Can
 </p>
 </div>
 </div>
 <button className="w-full md:w-auto px-6 py-3 bg-bg border border-border text-text font-semibold rounded-btn hover:border-accent hover:text-accent transition-colors">
 Kayıt Ol
 </button>
 </div>
 ))}
 </div>
 </div>
 </div>
 </section>
 )
 }

 // --- 4. ISTATISTIK (social_proof - stats_animated_row) ---
 if (section.id === 'istatistik' || section.type === 'social_proof') {
 const stats = section.defaultContent?.stats || []
 return (
 <section key={section.id} id={section.id} className="py-20 bg-accent text-on-accent relative overflow-hidden">
 <div className="absolute inset-0 opacity-10 mix-blend-overlay">
 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
 </div>
 <div className="container-custom px-4 relative z-10">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-on-accent/20">
 {stats.map((stat: any, idx: number) => (
 <div key={idx} className="text-center px-4">
 <div className="text-4xl md:text-6xl font-heading font-bold mb-3">{stat.value}</div>
 <div className="text-lg md:text-xl font-medium text-on-accent/80">{stat.label}</div>
 </div>
 ))}
 {(!stats || stats.length === 0) && (
 <>
 <div className="text-center px-4"><div className="text-4xl md:text-6xl font-heading font-bold mb-3">10.000+</div><div className="text-lg md:text-xl font-medium text-on-accent/80">Öğrenci</div></div>
 <div className="text-center px-4"><div className="text-4xl md:text-6xl font-heading font-bold mb-3">150+</div><div className="text-lg md:text-xl font-medium text-on-accent/80">Eğitmen</div></div>
 </>
 )}
 </div>
 </div>
 </section>
 )
 }

 // --- 5. KAYIT (contact - split_form_map) ---
 if (section.id === 'kayit' || section.type === 'contact') {
 return (
 <section key={section.id} id={section.id} className="py-section bg-bg">
 <div className="container-custom px-4 relative">
 <div className="bg-surface rounded-card overflow-hidden border border-border flex flex-col lg:flex-row">
 <div className="lg:w-5/12 bg-accent text-on-accent p-12 flex flex-col justify-center relative overflow-hidden">
 <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
 <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
 
 <div className="relative z-10">
 {section.defaultContent?.badge && <span className="text-on-accent/80 font-bold tracking-wider text-sm mb-4 block uppercase">{section.defaultContent.badge}</span>}
 <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">{section.defaultContent?.title || 'Aramıza Katıl'}</h2>
 <p className="text-on-accent/80 mb-12 text-lg leading-relaxed">{section.defaultContent?.description || 'Online eğitim portalımıza kayıt olmak için formu doldurun.'}</p>
 
 <div className="space-y-8">
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
 <Phone className="w-5 h-5 text-on-accent" />
 </div>
 <div>
 <p className="text-sm text-on-accent/60 mb-1">Çağrı Merkezi</p>
 <p className="text-xl font-bold">{businessData?.phone || '0850 222 33 44'}</p>
 </div>
 </div>
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
 <Mail className="w-5 h-5 text-on-accent" />
 </div>
 <div>
 <p className="text-sm text-on-accent/60 mb-1">Destek Talebi</p>
 <p className="text-xl font-bold">{businessData?.email || 'bilgi@akademi.com'}</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 
 <div className="lg:w-7/12 p-8 md:p-12 lg:p-16 bg-bg flex items-center">
 <form className="w-full space-y-6">
 <div className="grid md:grid-cols-2 gap-6">
 <div>
 <label className="block text-sm font-semibold text-text mb-2">Ad Soyad</label>
 <input type="text" className="w-full bg-surface border border-border rounded-btn px-4 py-3.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-text" placeholder="John Doe" />
 </div>
 <div>
 <label className="block text-sm font-semibold text-text mb-2">Telefon</label>
 <input type="tel" className="w-full bg-surface border border-border rounded-btn px-4 py-3.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-text" placeholder="05XX XXX XX XX" />
 </div>
 </div>
 <div>
 <label className="block text-sm font-semibold text-text mb-2">E-Posta Adresi</label>
 <input type="email" className="w-full bg-surface border border-border rounded-btn px-4 py-3.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-text" placeholder="ornek@email.com" />
 </div>
 <div>
 <label className="block text-sm font-semibold text-text mb-2">Kayıt Olmak İstediğiniz Program</label>
 <select className="w-full bg-surface border border-border rounded-btn px-4 py-3.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-text appearance-none">
 <option value="">Program Seçin</option>
 <option value="yds">YDS/YÖKDİL Hazırlık</option>
 <option value="ingilizce">Genel İngilizce</option>
 <option value="diger">Diğer / Kararsız</option>
 </select>
 </div>
 <button type="button" className="w-full bg-text text-bg font-bold py-4 rounded-btn hover:bg-accent hover:text-on-accent transition-colors shadow-lg mt-4 text-lg tracking-wide">
 Ön Kayıt Talebi Gönder
 </button>
 </form>
 </div>
 </div>
 </div>
 </section>
 )
 }

 // --- FALLBACK ---
 return (
 <section key={section.id} id={section.id} className="py-section bg-surface flex items-center justify-center border-y border-border">
 <div className="container-custom text-center">
 <p className="text-text-muted">Section: {section.type} ({section.id}) - Özel Tasarım Geliştirme Aşamasında</p>
 </div>
 </section>
 )
 })}
 </div>
 )
}
