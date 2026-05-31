import React from 'react'
import { SectionConfig, BusinessData } from '../../types/section-types'
import { ArrowRight, MapPin, Phone, Building2, BarChart, Calendar, Globe, GraduationCap, Users, PlayCircle, BookOpen } from 'lucide-react'

// Katman 5 (Premium+) - Özel Ders Kampüs (Enterprise)
// Tasarım: Syne font ailesi, 0px radius, 768px sınırında içerik okumaları ama asimetrik grid yapı.
// Mega franchise eğitim kurumu, keskin hatlar, siyah ağırlıklı, prestijli vurgular.

interface Props {
 sections: SectionConfig[]
 businessData: BusinessData
}

export const OzelDersKampusSections = ({ sections, businessData }: Props) => {
 return (
 <div className="flex flex-col w-full uppercase-titles tracking-tight rounded-none">
 {sections.map((section) => {
 // --- 1. HERO (promo_carousel - Tek slide gibi davranacak edge-to-edge asimetrik) ---
 if (section.id === 'hero' || section.type === 'hero') {
 return (
 <section key={section.id} id={section.id} className="relative w-full min-h-[95vh] bg-surface flex flex-col md:flex-row overflow-hidden border-b border-border">
 <div className="w-full md:w-1/2 min-h-[50vh] md:min-h-full relative overflow-hidden">
 <div className="absolute inset-0 bg-accent/20 z-10 mix-blend-multiply"></div>
 <img 
 src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600" 
 alt="Kampüs" 
 className="absolute inset-0 w-full h-full object-cover grayscale hover:scale-105 transition-transform duration-[2s]"
 />
 </div>

 <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 relative bg-bg">
 <div className="absolute top-0 right-0 w-64 h-64 bg-surface-muted border-l border-b border-border"></div>
 
 <div className="relative z-10 max-w-xl">
 {section.defaultContent?.badge && (
 <span className="inline-block px-3 py-1 bg-text text-bg text-xs font-bold tracking-widest mb-8">
 {section.defaultContent.badge}
 </span>
 )}
 <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-text mb-6 uppercase leading-[0.9]">
 {section.defaultContent?.title || '35 Şube İle Güven Noktası'}
 </h1>
 <p className="text-xl text-text-secondary font-medium mb-12 max-w-md">
 {section.defaultContent?.subtitle || 'LGS, YKS ve kariyer gelişiminde benzersiz VIP standartlar.'}
 </p>
 
 <div className="flex flex-wrap gap-4">
 {section.defaultContent?.cta1 && (
 <a href={section.defaultContent.cta1.href} className="flex items-center justify-between px-8 py-4 bg-accent text-on-accent font-bold text-sm tracking-widest uppercase hover:bg-text hover:text-bg transition-colors w-full sm:w-auto h-16">
 {section.defaultContent.cta1.text}
 <ArrowRight className="w-5 h-5 ml-4" />
 </a>
 )}
 </div>
 </div>
 </div>
 </section>
 )
 }

 // --- 2. HIZLI ERİŞİM (quick_access_cards) ---
 if (section.id === 'hizli' || section.type === 'services') {
 const cards = section.defaultContent?.cards || []
 return (
 <section key={section.id} id={section.id} className="py-24 bg-surface border-b border-border">
 <div className="container-custom px-4">
 <div className="mb-16">
 {section.defaultContent?.badge && <span className="text-accent text-xs font-bold tracking-widest block uppercase mb-4">{section.defaultContent.badge}</span>}
 <h2 className="text-4xl font-heading font-extrabold uppercase text-text">{section.defaultContent?.title || 'Portal Bağlantıları'}</h2>
 </div>
 
 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border max-w-5xl mx-auto">
 {cards.map((card: any, idx: number) => {
 const Icon = card.icon === 'BarChart' ? BarChart : card.icon === 'Calendar' ? Calendar : BookOpen
 return (
 <div key={idx} className="bg-bg p-8 hover:bg-accent hover:text-on-accent group transition-colors cursor-pointer min-h-[220px] flex flex-col justify-between">
 <Icon className="w-8 h-8 text-accent group-hover:text-on-accent mb-6" />
 <div>
 <h3 className="text-xl font-heading font-bold uppercase mb-2 line-clamp-2">{card.title}</h3>
 <div className="w-8 h-1 bg-border group-hover:bg-on-accent/30 mt-6 transition-colors"></div>
 </div>
 </div>
 )
 })}
 {(!cards || cards.length === 0) && (
 <div className="bg-bg p-8 hover:bg-accent hover:text-on-accent group transition-colors cursor-pointer min-h-[220px] flex flex-col justify-between">
 <Users className="w-8 h-8 text-accent group-hover:text-on-accent mb-6" />
 <div>
 <h3 className="text-xl font-heading font-bold uppercase mb-2">Kurumsal Portal</h3>
 <div className="w-8 h-1 bg-border group-hover:bg-on-accent/30 mt-6 transition-colors"></div>
 </div>
 </div>
 )}
 </div>
 </div>
 </section>
 )
 }

 // --- 3. EĞİTİM MODELLERİ (services - subject_grid) ---
 if (section.id === 'model' || section.type === 'services') {
 const subjects = section.defaultContent?.subjects || []
 return (
 <section key={section.id} id={section.id} className="py-24 bg-bg border-b border-border">
 <div className="container-custom px-4">
 <div className="grid lg:grid-cols-3 gap-16">
 <div className="lg:col-span-1">
 <div className="sticky top-24">
 {section.defaultContent?.badge && <span className="inline-block px-3 py-1 bg-surface-elevated text-text text-xs font-bold tracking-widest mb-6 uppercase border border-border">{section.defaultContent.badge}</span>}
 <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-text mb-6 uppercase leading-tight">{section.defaultContent?.title || 'Ders Modelleri'}</h2>
 <div className="w-full flex">
 <a href="#subeler" className="w-16 h-16 bg-accent text-on-accent flex flex-col items-center justify-center hover:bg-accent-hover transition-colors">
 <ArrowRight className="w-6 h-6" />
 </a>
 </div>
 </div>
 </div>
 
 <div className="lg:col-span-2">
 <div className="divide-y divide-border border-y border-border">
 {subjects.map((subject: any, idx: number) => (
 <div key={idx} className="py-10 flex flex-col sm:flex-row sm:items-center justify-between group cursor-pointer">
 <div className="flex items-center gap-6">
 <div className="w-16 h-16 bg-surface flex items-center justify-center text-3xl group-hover:bg-accent group-hover:text-on-accent transition-colors">
 {subject.emoji || '✨'}
 </div>
 <div>
 <p className="text-xs font-bold tracking-widest text-text-secondary uppercase mb-2">{subject.level || 'Tüm Kademeler'}</p>
 <h3 className="text-2xl font-heading font-bold text-text uppercase group-hover:text-accent transition-colors">{subject.name}</h3>
 </div>
 </div>
 <div className="mt-6 sm:mt-0 text-right font-medium text-sm text-text-secondary">
 Detaylar Gör
 </div>
 </div>
 ))}
 {(!subjects || subjects.length === 0) && businessData?.services?.map((svc: any, idx: number) => (
 <div key={idx} className="py-10 flex flex-col sm:flex-row sm:items-center justify-between group cursor-pointer">
 <div className="flex items-center gap-6">
 <div className="w-16 h-16 bg-surface flex items-center justify-center text-3xl group-hover:bg-accent group-hover:text-on-accent transition-colors">
 {svc.icon || '✨'}
 </div>
 <div>
 <p className="text-xs font-bold tracking-widest text-text-secondary uppercase mb-2">Eğitim</p>
 <h3 className="text-2xl font-heading font-bold text-text uppercase group-hover:text-accent transition-colors">{svc.name}</h3>
 </div>
 </div>
 <div className="mt-6 sm:mt-0 text-right font-medium text-sm text-text-secondary">
 Detaylar Gör
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

 // --- 4. LOKASYONLAR (multi_location) ---
 if (section.id === 'subeler' || section.type === 'locations') {
 const locations = section.defaultContent?.locations || []
 return (
 <section key={section.id} id={section.id} className="py-24 bg-surface border-b border-border">
 <div className="container-custom px-4 relative">
 <div className="max-w-2xl mb-16">
 {section.defaultContent?.badge && <span className="text-accent text-xs font-bold tracking-widest block uppercase mb-4">{section.defaultContent.badge}</span>}
 <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-text mb-6 uppercase leading-tight">{section.defaultContent?.title || 'Ağımız'}</h2>
 </div>

 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
 {locations.map((loc: any, idx: number) => (
 <div key={idx} className="bg-bg border border-border p-8 group hover:border-text transition-colors flex flex-col h-64">
 <MapPin className="w-8 h-8 text-accent mb-6" />
 <h3 className="text-2xl font-heading font-bold text-text uppercase mb-2">{loc.name}</h3>
 <p className="text-text-secondary mb-auto font-medium">{loc.count || 'Şube'}</p>
 <a href="#iletisim" className="text-sm font-bold tracking-widest text-text border-b-2 border-transparent group-hover:border-text transition-colors self-start uppercase">
 Kampüsü İncele
 </a>
 </div>
 ))}
 {(!locations || locations.length === 0) && (
 <div className="bg-bg border border-border p-8 group hover:border-text transition-colors flex flex-col h-64">
 <MapPin className="w-8 h-8 text-accent mb-6" />
 <h3 className="text-2xl font-heading font-bold text-text uppercase mb-2">İstanbul Merkez</h3>
 <p className="text-text-secondary mb-auto font-medium">Headquarters</p>
 <a href="#iletisim" className="text-sm font-bold tracking-widest text-text border-b-2 border-transparent group-hover:border-text transition-colors self-start uppercase">
 İletişim Kur
 </a>
 </div>
 )}
 </div>
 </div>
 </section>
 )
 }

 // --- 5. FRANCHISE / BÜYÜME (contact - franchise_section) ---
 if (section.id === 'kurumsal' || section.type === 'contact') {
 return (
 <section key={section.id} id={section.id} className="w-full bg-text text-bg flex flex-col lg:flex-row">
 <div className="w-full lg:w-5/12 p-12 lg:p-24 flex flex-col justify-center border-r border-bg/10 relative">
 {section.defaultContent?.badge && <span className="px-3 py-1 border border-bg/20 text-bg text-xs font-bold tracking-widest mb-8 inline-block uppercase bg-bg/5 self-start">{section.defaultContent.badge}</span>}
 <h2 className="text-4xl lg:text-5xl font-heading font-extrabold uppercase mb-8 leading-tight">
 {section.defaultContent?.title || 'Franchise & Kariyer'}
 </h2>
 <p className="text-bg/80 text-lg mb-12 max-w-sm">
 {section.defaultContent?.description || 'Marka gücümüzü sizinle paylaşmak istiyoruz.'}
 </p>
 
 <div className="space-y-6">
 <div className="flex items-center gap-6 px-6 py-6 border border-bg/30 hover:bg-bg hover:text-text transition-colors cursor-pointer group">
 <Building2 className="w-6 h-6 group-hover:text-accent" />
 <span className="font-bold tracking-widest uppercase">Franchise Başvurusu</span>
 </div>
 <div className="flex items-center gap-6 px-6 py-6 border border-bg/30 hover:bg-bg hover:text-text transition-colors cursor-pointer group">
 <GraduationCap className="w-6 h-6 group-hover:text-accent" />
 <span className="font-bold tracking-widest uppercase">Kariyer Sinerjisi</span>
 </div>
 </div>
 </div>
 
 <div className="w-full lg:w-7/12 p-12 lg:p-24 bg-accent flex flex-col justify-center">
 <div className="max-w-xl">
 <h3 className="text-2xl font-heading font-extrabold uppercase mb-8 text-on-accent flex items-center">
 <Phone className="w-6 h-6 mr-4" /> Bize Ulaşın
 </h3>
 
 <form className="space-y-6">
 <div className="grid sm:grid-cols-2 gap-6">
 <div className="flex flex-col">
 <label className="text-xs font-bold tracking-widest uppercase text-on-accent/80 mb-3 block">Adınız Soyadınız / Kurum</label>
 <input type="text" className="bg-transparent border-b-2 border-on-accent/30 focus:border-on-accent focus:outline-none py-3 text-on-accent text-lg placeholder:text-on-accent/30" placeholder="Zorunlu alan" />
 </div>
 <div className="flex flex-col">
 <label className="text-xs font-bold tracking-widest uppercase text-on-accent/80 mb-3 block">İletişim</label>
 <input type="tel" className="bg-transparent border-b-2 border-on-accent/30 focus:border-on-accent focus:outline-none py-3 text-on-accent text-lg placeholder:text-on-accent/30" placeholder="+90" />
 </div>
 </div>
 
 <div className="flex flex-col pt-4">
 <label className="text-xs font-bold tracking-widest uppercase text-on-accent/80 mb-3 block">Mesajınız / Talep</label>
 <textarea rows={2} className="bg-transparent border-b-2 border-on-accent/30 focus:border-on-accent focus:outline-none py-3 text-on-accent text-lg placeholder:text-on-accent/30 resize-none" placeholder="Kisaca bahseder misiniz?"></textarea>
 </div>
 
 <div className="pt-8">
 <button type="button" className="px-12 py-5 bg-text text-on-accent font-bold tracking-widest uppercase hover:bg-bg hover:text-text transition-colors text-sm w-full sm:w-auto">
 Talebi İlet
 </button>
 </div>
 </form>
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
