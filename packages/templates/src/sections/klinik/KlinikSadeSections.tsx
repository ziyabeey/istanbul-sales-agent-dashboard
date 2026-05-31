import React from 'react'
import { SectionConfig, BusinessData } from '../../types/section-types'
import { Phone, MapPin, Instagram, Mail, Syringe, Zap, Sparkles, CircleDot, Droplets, ChevronRight, Star } from 'lucide-react'

// Katman 1 (Temel) - Klinik Sade
// Tasarım: Single-column (sm), Cinzel/Inter, Soft Pastel.
// Hızlı bilgi akışı sağlayan bio-link benzeri hekim tasarımı.

interface Props {
 sections: SectionConfig[]
 businessData: BusinessData
}

export const KlinikSadeSections = ({ sections, businessData }: Props) => {
 const getIcon = (name: string) => {
 switch (name) {
 case 'syringe': return <Syringe size={20} className="text-secondary" />
 case 'zap': return <Zap size={20} className="text-secondary" />
 case 'sparkles': return <Sparkles size={20} className="text-secondary" />
 case 'circle-dot': return <CircleDot size={20} className="text-secondary" />
 case 'droplets': return <Droplets size={20} className="text-secondary" />
 default: return <Sparkles size={20} className="text-secondary" />
 }
 }

 return (
 <div className="flex flex-col w-full bg-surface-muted min-h-screen items-center py-8 font-body">
 <div className="w-full max-w-[480px] mx-auto px-4 flex flex-col gap-6">
 {sections.map((section) => {
 // --- 1. HERO (overlay) ---
 if (section.id === 'hero' || section.type === 'hero') {
 const content = section.defaultContent as any;
 return (
 <header key={section.id} id={section.id} className="flex flex-col items-center text-center bg-surface p-8 rounded-[2rem] border border-border/50 shadow-sm relative overflow-hidden">
 <div className="absolute top-0 left-0 w-full h-32 bg-primary/5"></div>
 <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-surface shadow-md mb-6 z-10 bg-surface-hover">
 <img 
 src={businessData.photos?.[0] || 'https://images.unsplash.com/photo-1594824432258-3d120a4afce4?auto=format&fit=crop&q=80'} 
 alt={content?.title || businessData.ownerName} 
 className="w-full h-full object-cover object-top"
 />
 </div>
 {content?.badge && (
 <span className="text-[10px] font-bold uppercase tracking-widest text-accent mb-3 bg-accent/10 px-3 py-1 rounded-full z-10">
 {content.badge}
 </span>
 )}
 <h1 className="font-heading text-3xl font-medium text-text mb-3 z-10">
 {content?.title || businessData.ownerName}
 </h1>
 <p className="text-sm text-text-secondary font-medium leading-relaxed mb-8 z-10">
 {content?.subtitle || 'Klinik deneyimi'}
 </p>
 {content?.cta1 && (
 <a href={content.cta1.href} className="w-full bg-primary text-on-primary py-4 rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-md z-10">
 <Phone size={18}/> {content.cta1.text}
 </a>
 )}
 </header>
 )
 }

 // --- 2. STATS (animated) ---
 if (section.id === 'istatistik' || section.type === 'stats') {
 const content = section.defaultContent as any;
 const stats = content?.stats || [
 { value: businessData.experience, label: 'Tecrübe' },
 { value: `${businessData.rating} (${businessData.reviewCount})`, label: 'Hasta Puanı' }
 ];
 return (
 <div key={section.id} id={section.id} className="grid grid-cols-2 gap-4">
 {stats.map((stat: any, idx: number) => (
 <div key={idx} className="bg-surface p-5 rounded-[1.5rem] border border-border/50 flex flex-col items-center justify-center text-center shadow-sm">
 <span className="font-heading text-2xl text-text font-medium mb-1">{stat.value}</span>
 <span className="text-xs text-text-muted font-medium uppercase tracking-wider">{stat.label}</span>
 </div>
 ))}
 </div>
 )
 }

 // --- 3. HİZMETLER (grid) ---
 if (section.id === 'hizmetler' || section.type === 'services') {
 const content = section.defaultContent as any;
 const services = content?.services || businessData.services || [];
 return (
 <section key={section.id} id={section.id} className="bg-surface border border-border/50 p-2 rounded-[2rem] shadow-sm">
 <div className="px-6 py-5 border-b border-border/30 text-center">
 <h2 className="font-heading text-xl font-medium text-text">{content?.title || 'Hizmetler'}</h2>
 </div>
 <div className="flex flex-col py-2">
 {services.map((service: any, idx: number) => (
 <div key={idx} className="flex items-center gap-4 p-4 hover:bg-surface-hover transition-colors rounded-xl mx-2 cursor-pointer">
 <div className="w-12 h-12 rounded-[1rem] bg-primary/5 flex items-center justify-center shrink-0">
 {getIcon(service.icon || '')}
 </div>
 <div className="flex-1">
 <h3 className="text-sm font-semibold text-text mb-0.5">{service.name}</h3>
 <p className="text-xs text-text-muted line-clamp-1">{service.description || 'Bio-uygulama'}</p>
 </div>
 <ChevronRight size={18} className="text-border-strong"/>
 </div>
 ))}
 </div>
 </section>
 )
 }

 // --- 4. GÖRÜŞLER (carousel) ---
 if (section.id === 'gorusler' || section.type === 'testimonials') {
 const content = section.defaultContent as any;
 const items = content?.items || [];
 if(items.length === 0) return null;
 return (
 <section key={section.id} id={section.id} className="bg-primary text-on-primary p-8 rounded-[2rem] text-center shadow-md">
 <h2 className="font-heading text-xl font-medium mb-6">{content?.title || 'Hasta Görüşleri'}</h2>
 <div className="flex flex-col items-center">
 <div className="flex text-accent mb-4">
 {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
 </div>
 <p className="text-sm italic opacity-90 mb-4">"{items[0]?.text || 'Harika bir deneyimdi, çok teşekkürler.'}"</p>
 <span className="text-xs font-bold tracking-wider uppercase opacity-80">{items[0]?.author || 'S. Yılmaz'}</span>
 </div>
 </section>
 )
 }

 // --- 5. İLETİŞİM (contact) ---
 if (section.id === 'iletisim' || section.type === 'contact') {
 const content = section.defaultContent as any;
 return (
 <section key={section.id} id={section.id} className="bg-surface border border-border/50 p-8 rounded-[2rem] text-center flex flex-col items-center shadow-sm">
 <h2 className="font-heading text-xl font-medium text-text mb-3">{content?.title || 'İletişim'}</h2>
 <p className="text-sm text-text-secondary mb-8">{businessData.address}</p>
 
 <div className="flex gap-4 mb-8">
 <a href={`tel:${businessData.phoneClean}`} className="w-14 h-14 bg-surface-hover hover:scale-105 transition-transform rounded-full flex items-center justify-center text-text border border-border">
 <Phone size={20}/>
 </a>
 <a href={`mailto:${businessData.email}`} className="w-14 h-14 bg-surface-hover hover:scale-105 transition-transform rounded-full flex items-center justify-center text-text border border-border">
 <Mail size={20}/>
 </a>
 <a href={businessData.socialMedia?.instagram || '#'} className="w-14 h-14 bg-surface-hover hover:scale-105 transition-transform rounded-full flex items-center justify-center text-text border border-border">
 <Instagram size={20}/>
 </a>
 </div>

 <div className="w-full h-32 bg-surface-hover rounded-2xl border border-border overflow-hidden relative flex items-center justify-center mb-5">
 <div className="absolute inset-0 opacity-40 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=41.0544,28.9959&zoom=14&size=400x200&sensor=false')] bg-cover bg-center grayscale mix-blend-multiply"></div>
 <div className="flex flex-col items-center gap-2 relative z-10 text-text bg-surface/80 p-3 rounded-xl backdrop-blur-sm">
 <MapPin size={24} className="text-primary"/>
 <span className="text-xs font-semibold">{businessData.district}, {businessData.city}</span>
 </div>
 </div>
 </section>
 )
 }

 // --- FALLBACK ---
 return (
 <section key={section.id} className="w-full p-4 bg-surface text-center rounded-2xl border border-border">
 <p className="text-sm text-text-muted">Section: {section.type}</p>
 </section>
 )
 })}

 {/* FOOTER */}
 <footer className="text-center pt-6 pb-12 mt-4">
 <p className="text-[10px] uppercase tracking-widest text-text-muted font-bold mb-3">© {new Date().getFullYear()} {businessData.name}</p>
 <div className="flex justify-center gap-6 text-xs text-text-secondary">
 <a href="/gizlilik" className="hover:text-primary transition-colors">KVKK Metni</a>
 <a href="/iletisim" className="hover:text-primary transition-colors">Bize Ulaşın</a>
 </div>
 </footer>
 </div>
 </div>
 )
}
