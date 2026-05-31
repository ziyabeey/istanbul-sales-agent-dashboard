'use client'

import React, { useState } from 'react'
import { SectionConfig, BusinessData } from '../../types/section-types'
import { Search, MapPin, Phone, Mail, Award, CheckCircle, ArrowRight, BookOpen, GraduationCap, ChevronRight } from 'lucide-react'

// Katman 4 (Premium) - Özel Ders Kolej
// Tasarım: 1024px container, 4px radius, 96px padding, Alegreya & Lacivert.
// Search-centric Hero ve "Akademik/Zümre" odaklı kurumsal görünüm.

interface Props {
 sections: SectionConfig[]
 businessData: BusinessData
}

export const OzelDersKolejSections = ({ sections, businessData }: Props) => {
 const [activeFilter, setActiveFilter] = useState('Tümü')

 return (
 <div className="flex flex-col w-full">
 {sections.map((section) => {
 // --- 1. HERO (search_centric) ---
 if (section.id === 'hero' || section.type === 'hero') {
 return (
 <section key={section.id} id={section.id} className="relative w-full bg-surface pt-32 pb-24 overflow-hidden border-b border-border">
 <div className="absolute inset-0 z-0 opacity-5">
 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')]"></div>
 </div>
 
 <div className="container-custom relative z-10 px-4 text-center">
 <div className="max-w-4xl mx-auto flex flex-col items-center">
 {section.defaultContent?.badge && (
 <span className="px-4 py-1 border border-accent/20 text-accent text-xs font-bold tracking-[0.2em] mb-8 rounded-sm uppercase bg-accent/5">
 {section.defaultContent.badge}
 </span>
 )}

 <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-text mb-6 leading-[1.1]">
 {section.defaultContent?.title || 'Eğitimde Vizyon, Üniversiteye Giden Yol.'}
 </h1>

 <p className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl font-body leading-relaxed">
 {section.defaultContent?.subtitle || 'Lütfen hedeflediğiniz alanı, seviyeyi veya dersi arayınız.'}
 </p>

 <div className="w-full max-w-3xl bg-bg rounded-card shadow-2xl p-2 md:p-3 flex flex-col md:flex-row gap-2 border border-border">
 <div className="flex-grow relative flex items-center">
 <Search className="absolute text-text-muted left-4 w-6 h-6" />
 <input 
 type="text" 
 placeholder={section.defaultContent?.searchPlaceholder || "Örn: Lise Fizik, AYT Matematik..."}
 className="w-full h-14 pl-14 pr-4 bg-transparent border-none focus:ring-0 text-text placeholder:text-text-muted text-lg outline-none"
 />
 </div>
 <button className="h-14 md:w-32 bg-accent text-on-accent font-bold rounded-btn transition-colors hover:bg-accent-hover text-lg shadow-inner">
 {section.defaultContent?.cta1?.text || 'Ara'}
 </button>
 </div>
 
 <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-sm font-medium text-text-secondary">
 <span className="text-text-muted">Popüler Aramalar:</span>
 <span className="px-3 py-1 bg-surface-elevated rounded-full hover:bg-border cursor-pointer transition-colors">YKS Matematik</span>
 <span className="px-3 py-1 bg-surface-elevated rounded-full hover:bg-border cursor-pointer transition-colors">AP Fizik</span>
 <span className="px-3 py-1 bg-surface-elevated rounded-full hover:bg-border cursor-pointer transition-colors">Tıp Hazırlık</span>
 </div>
 </div>
 </div>
 </section>
 )
 }

 // --- 2. DERSLER (services - subject_grid_corporate) ---
 if (section.id === 'dersler' || section.type === 'services') {
 const subjects = section.defaultContent?.subjects || []
 return (
 <section key={section.id} id={section.id} className="py-section bg-bg">
 <div className="container-custom px-4 relative">
 <div className="flex flex-col lg:flex-row gap-16">
 <div className="lg:w-1/3">
 <div className="sticky top-32">
 {section.defaultContent?.badge && <span className="text-accent text-sm font-bold tracking-[0.2em] mb-4 block uppercase border-l-2 border-accent pl-3">{section.defaultContent.badge}</span>}
 <h2 className="text-4xl md:text-5xl font-heading font-bold text-text mb-6 leading-tight">
 {section.defaultContent?.title || 'Branşlar ve Olimpiyat Hazırlık'}
 </h2>
 <p className="text-text-secondary font-body leading-relaxed mb-8">
 Akademik kadromuz tarafından hazırlanan özel müfredatlarla, öğrencilerin ulusal ve uluslararası sınavlardaki başarısını en üst düzeye çıkarıyoruz.
 </p>
 <a href="#iletisim" className="inline-flex items-center text-accent font-bold hover:text-accent-hover transition-colors group text-lg">
 Danışmanlık Alın <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
 </a>
 </div>
 </div>
 
 <div className="lg:w-2/3">
 <div className="grid sm:grid-cols-2 gap-6">
 {subjects.map((subject: any, idx: number) => (
 <div key={idx} className="bg-surface border border-border p-8 rounded-card hover:border-accent hover:shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden">
 <div className="text-4xl mb-6 opacity-80 group-hover:opacity-100 transition-opacity">{subject.emoji || '📚'}</div>
 <h3 className="text-2xl font-heading font-bold text-text mb-2 group-hover:text-accent transition-colors">{subject.name}</h3>
 <p className="text-text-secondary mb-8">{subject.level}</p>
 <div className="absolute bottom-6 right-8 w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-on-accent transition-all">
 <ChevronRight className="w-5 h-5" />
 </div>
 </div>
 ))}
 {(!subjects || subjects.length === 0) && businessData?.services?.map((svc: any, idx: number) => (
 <div key={idx} className="bg-surface border border-border p-8 rounded-card hover:border-accent hover:shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden">
 <div className="text-4xl mb-6 opacity-80 group-hover:opacity-100 transition-opacity">{svc.icon || '📚'}</div>
 <h3 className="text-2xl font-heading font-bold text-text mb-2 group-hover:text-accent transition-colors">{svc.name}</h3>
 <p className="text-text-secondary mb-8">Kolej Akademik Program</p>
 <div className="absolute bottom-6 right-8 w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-on-accent transition-all">
 <ChevronRight className="w-5 h-5" />
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 </section>
 )
 }

 // --- 3. KADRO (team - filterable_grid) ---
 if (section.id === 'kadro' || section.type === 'team') {
 const members = section.defaultContent?.members || []
 return (
 <section key={section.id} id={section.id} className="py-section bg-surface border-y border-border">
 <div className="container-custom px-4 relative">
 <div className="text-center max-w-2xl mx-auto mb-16">
 {section.defaultContent?.badge && <span className="text-accent text-sm font-bold tracking-[0.2em] mb-4 block uppercase">{section.defaultContent.badge}</span>}
 <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mb-6">{section.defaultContent?.title || 'Yetkin Zümre Kadromuz'}</h2>
 </div>

 <div className="flex flex-wrap justify-center gap-3 mb-12">
 {['Tümü', 'Fizik Zümresi', 'Kimya Zümresi', 'Biyoloji Zümresi'].map(filter => (
 <button 
 key={filter}
 onClick={() => setActiveFilter(filter)}
 className={`px-5 py-2 text-sm font-bold rounded-full transition-all border ${activeFilter === filter ? 'bg-text text-bg border-text' : 'bg-transparent text-text-secondary border-border hover:border-text'}`}
 >
 {filter}
 </button>
 ))}
 </div>

 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
 {members.map((member: any, idx: number) => (
 <div key={idx} className="bg-bg border border-border rounded-card overflow-hidden group">
 <div className="aspect-[3/4] bg-surface relative overflow-hidden flex items-end justify-center">
 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
 {member.image ? (
 <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
 ) : (
 <div className="w-full h-full bg-surface-elevated flex items-center justify-center">
 <GraduationCap className="w-20 h-20 text-border" />
 </div>
 )}
 </div>
 <div className="p-6 text-center border-t border-border">
 <h3 className="text-xl font-heading font-bold text-text mb-1">{member.name}</h3>
 <p className="text-text-secondary text-sm">{member.role}</p>
 </div>
 </div>
 ))}
 {(!members || members.length === 0) && businessData?.team?.map((member: any, idx: number) => (
 <div key={idx} className="bg-bg border border-border rounded-card overflow-hidden group">
 <div className="aspect-[3/4] bg-surface relative overflow-hidden flex items-end justify-center">
 <div className="w-full h-full bg-surface-elevated flex items-center justify-center">
 <GraduationCap className="w-20 h-20 text-border" />
 </div>
 </div>
 <div className="p-6 text-center border-t border-border">
 <h3 className="text-xl font-heading font-bold text-text mb-1">{member.name}</h3>
 <p className="text-text-secondary text-sm">{member.role}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
 }

 // --- 4. BAŞARILAR (social_proof - awards_press) ---
 if (section.id === 'basarilar' || section.type === 'social_proof') {
 const awards = section.defaultContent?.awards || []
 return (
 <section key={section.id} id={section.id} className="py-section bg-bg">
 <div className="container-custom px-4 relative">
 <div className="text-center max-w-2xl mx-auto mb-16">
 {section.defaultContent?.badge && <span className="text-accent text-sm font-bold tracking-[0.2em] mb-4 block uppercase">{section.defaultContent.badge}</span>}
 <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mb-6">{section.defaultContent?.title || 'Akademik Dereceler'}</h2>
 </div>

 <div className="max-w-4xl mx-auto divide-y divide-border border-y border-border">
 {awards.map((award: any, idx: number) => (
 <div key={idx} className="py-6 flex flex-col md:flex-row md:items-center justify-between group hover:bg-surface transition-colors px-6 -mx-6">
 <div className="flex items-center gap-6 mb-4 md:mb-0">
 <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-text shrink-0 bg-bg group-hover:border-accent group-hover:text-accent transition-colors">
 <Award className="w-5 h-5" />
 </div>
 <div>
 <h3 className="text-xl font-heading font-bold text-text mb-1">{award.title}</h3>
 <p className="text-text-secondary">{award.organization}</p>
 </div>
 </div>
 <div className="md:text-right font-body">
 <span className="inline-block px-4 py-1.5 bg-surface-elevated text-text font-bold text-sm tracking-wider">
 {award.year}
 </span>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
 }

 // --- 5. İLETİŞİM (contact - split_form_map) ---
 if (section.id === 'iletisim' || section.type === 'contact') {
 return (
 <section key={section.id} id={section.id} className="py-section bg-accent text-on-accent relative overflow-hidden">
 <div className="absolute inset-0 opacity-10">
 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')]"></div>
 </div>
 <div className="container-custom px-4 relative z-10">
 <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
 <div>
 <span className="text-on-accent/70 font-bold tracking-[0.2em] text-xs mb-4 block uppercase border-l-2 border-on-accent/30 pl-3">{section.defaultContent?.badge || 'BAŞVURU'}</span>
 <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 leading-tight">{section.defaultContent?.title || 'Ön Kayıt Görüşmesi'}</h2>
 <p className="text-on-accent/80 mb-12 text-lg leading-relaxed">{section.defaultContent?.description || 'Kurumumuzla tanışmak ve mülakat formunu doldurmak için tıklayınız.'}</p>
 
 <div className="space-y-8 pt-8 border-t border-on-accent/20">
 <div className="flex items-start">
 <Phone className="w-6 h-6 text-on-accent/60 mt-1" />
 <div className="ml-6">
 <p className="text-sm font-bold tracking-widest text-on-accent/60 mb-2 uppercase">Kabul Birimi</p>
 <p className="text-2xl font-light">{businessData?.phone || '0216 570 55 66'}</p>
 </div>
 </div>
 <div className="flex items-start">
 <MapPin className="w-6 h-6 text-on-accent/60 mt-1" />
 <div className="ml-6">
 <p className="text-sm font-bold tracking-widest text-on-accent/60 mb-2 uppercase">Kampüs Adresi</p>
 <p className="text-lg font-light leading-relaxed max-w-sm">{businessData?.address}, {businessData?.district}, {businessData?.city}</p>
 </div>
 </div>
 </div>
 </div>
 
 <div className="bg-bg border border-border rounded-card p-10 lg:p-14 shadow-2xl relative text-text">
 <form className="space-y-6">
 <div className="grid grid-cols-2 gap-6">
 <div className="col-span-2">
 <label className="block text-xs font-bold tracking-widest text-text-secondary uppercase mb-2">Öğrenci Adı Soyadı</label>
 <input type="text" className="w-full bg-transparent border-b-2 border-border focus:border-accent py-3 focus:outline-none transition-colors text-lg" />
 </div>
 <div className="col-span-2 md:col-span-1">
 <label className="block text-xs font-bold tracking-widest text-text-secondary uppercase mb-2">Telefon Numarası</label>
 <input type="tel" className="w-full bg-transparent border-b-2 border-border focus:border-accent py-3 focus:outline-none transition-colors text-lg" />
 </div>
 <div className="col-span-2 md:col-span-1">
 <label className="block text-xs font-bold tracking-widest text-text-secondary uppercase mb-2">Mevcut Sınıf</label>
 <select className="w-full bg-transparent border-b-2 border-border focus:border-accent py-3 focus:outline-none transition-colors text-lg appearance-none">
 <option value=""></option>
 <option value="9">9. Sınıf</option>
 <option value="10">10. Sınıf</option>
 <option value="11">11. Sınıf</option>
 <option value="12">12. Sınıf / Mezun</option>
 </select>
 </div>
 </div>
 <div className="pt-6 border-t border-border mt-8">
 <button type="button" className="w-full bg-text text-bg font-bold py-5 rounded-btn hover:bg-accent-hover hover:text-on-accent transition-colors shadow-xl">
 Görüşme Talebi Oluştur
 </button>
 </div>
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
