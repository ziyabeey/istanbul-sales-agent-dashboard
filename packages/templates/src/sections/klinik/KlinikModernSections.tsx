import React from 'react'
import { SectionConfig, BusinessData } from '../../types/section-types'
import { Phone, MapPin, Instagram, Mail, ChevronRight, Activity, Heart, Shield, Star, Play, ArrowRight, User, CheckCircle2 } from 'lucide-react'

// Katman 2 (Standart) - Klinik Modern

interface Props {
 sections: SectionConfig[]
 businessData: BusinessData
}

export const KlinikModernSections = ({ sections, businessData }: Props) => {
 const getIcon = (name: string) => {
 switch (name) {
 case 'activity': return <Activity className="text-accent" />
 case 'heart': return <Heart className="text-accent" />
 case 'shield': return <Shield className="text-accent" />
 default: return <Star className="text-accent" />
 }
 }

 return (
 <div className="flex flex-col w-full min-h-screen bg-bg text-text font-body items-center">
 {sections.map((section) => {
 // --- GLOBAL HEADER ---
 if (section.id === 'global-header') {
 const content = section.defaultContent as any;
 return (
 <header key={section.id} id={section.id} className="w-full sticky top-0 z-50 bg-bg/90 backdrop-blur-md border-b border-border transition-all px-6 py-4">
 <div className="max-w-[960px] mx-auto flex items-center justify-between">
 <div className="flex items-center gap-2">
 <div className="w-10 h-10 bg-accent text-on-accent rounded-lg flex items-center justify-center font-bold text-lg">
 {content?.logo?.text?.charAt(0) || businessData.name.charAt(0)}
 </div>
 <span className="font-heading font-bold text-xl text-text hidden sm:block">
 {content?.logo?.text || businessData.name}
 </span>
 </div>
 <nav className="hidden md:flex gap-8">
 {content?.menuItems?.map((item: any, i: number) => (
 <a key={i} href={item.href} className="text-sm font-medium text-text-secondary hover:text-accent transition-colors">
 {item.label}
 </a>
 ))}
 </nav>
 {content?.cta && (
 <a href={content.cta.href} className="bg-text text-bg px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-accent hover:text-on-accent transition-colors shadow-sm">
 {content.cta.text}
 </a>
 )}
 </div>
 </header>
 )
 }

 // --- 1. HERO (split_image) ---
 if (section.id === 'hero' || section.type === 'hero') {
 const content = section.defaultContent as any;
 return (
 <section key={section.id} id={section.id} className="w-full max-w-[960px] mx-auto px-6 py-12 md:py-24">
 <div className="flex flex-col md:flex-row items-center gap-12 bg-surface rounded-[2rem] p-8 md:p-12 overflow-hidden relative shadow-sm border border-border">
 <div className="flex-1 z-10 text-center md:text-left">
 {content?.badge && (
 <span className="inline-flex items-center gap-2 px-3 py-1 bg-surface-muted text-text-secondary rounded-full text-xs font-semibold tracking-wider uppercase mb-6 border border-border">
 <MapPin size={12} /> {content.badge}
 </span>
 )}
 <h1 className="text-4xl md:text-5xl lg:text-5xl font-heading font-bold text-text mb-6 leading-[1.15]">
 {content?.title || businessData.name}
 </h1>
 <p className="text-lg text-text-secondary mb-8 leading-relaxed max-w-lg">
 {content?.subtitle || 'Sağlıkta yeni nesil standartlar.'}
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
 {content?.cta1 && (
 <a href={content.cta1.href} className="px-8 py-3.5 bg-accent text-on-accent rounded-full font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3">
 <Phone size={18} /> {content.cta1.text}
 </a>
 )}
 </div>
 </div>
 
 <div className="flex-1 relative z-10 w-full">
 <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-bg relative transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
 <img 
 src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80" 
 alt="Clinic Room" 
 className="w-full h-full object-cover"
 />
 </div>
 </div>
 </div>
 </section>
 )
 }

 // --- 2. ABOUT (split_left) ---
 if (section.id === 'hakkimizda' || section.type === 'about') {
 const content = section.defaultContent as any;
 return (
 <section key={section.id} id={section.id} className="w-full bg-surface-muted py-20 border-y border-border">
 <div className="max-w-[960px] mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
 <div className="w-full md:w-1/2 relative">
 <img src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80" alt="About Us" className="w-full h-auto rounded-[2rem] shadow-md border-8 border-bg"/>
 <div className="absolute -bottom-6 -right-6 bg-bg p-5 rounded-2xl shadow-lg border border-border flex items-center gap-4 hidden sm:flex">
 <div className="bg-accent/10 p-3 rounded-full text-accent">
 <Shield size={24}/>
 </div>
 <div>
 <p className="font-bold text-sm">Sertifikalı</p>
 <p className="text-xs text-text-muted">Güvenilir Hizmet</p>
 </div>
 </div>
 </div>
 <div className="w-full md:w-1/2">
 <h2 className="text-xs font-bold text-accent tracking-widest uppercase mb-3">{content?.badge || 'Hakkımızda'}</h2>
 <h3 className="text-3xl md:text-4xl font-heading font-bold text-text mb-6">
 {content?.title || 'Biz Kimiz?'}
 </h3>
 <p className="text-text-secondary leading-relaxed mb-6">
 {content?.description || 'Modern altyapımız ve alanında uzman kadromuz ile misafirlerimize çözüm odaklı hizmet sunuyoruz.'}
 </p>
 <ul className="space-y-4 font-medium text-text mb-8">
 <li className="flex items-center gap-3"><CheckCircle2 className="text-accent" size={20}/> Modern ve Hijyenik Ortam</li>
 <li className="flex items-center gap-3"><CheckCircle2 className="text-accent" size={20}/> Alanında Uzman Kadro</li>
 <li className="flex items-center gap-3"><CheckCircle2 className="text-accent" size={20}/> Kişiye Özel Tedavi</li>
 </ul>
 </div>
 </div>
 </section>
 )
 }

 // --- 3. SERVICES (sticky) ---
 if (section.id === 'hizmetler' || section.type === 'services') {
 const content = section.defaultContent as any;
 const services = content?.services || businessData.services || [];
 return (
 <section key={section.id} id={section.id} className="w-full py-20">
 <div className="max-w-[960px] mx-auto px-6 flex flex-col md:flex-row gap-12">
 <div className="w-full md:w-1/3">
 <div className="sticky top-28">
 <h2 className="text-xs font-bold text-accent tracking-widest uppercase mb-3">{content?.badge || 'Hizmetler'}</h2>
 <h3 className="text-3xl font-heading font-bold text-text mb-6 leading-tight">
 {content?.title || 'Neler Yapıyoruz?'}
 </h3>
 <p className="text-text-secondary mb-8 text-sm">
 Tüm uygulamalarımız son teknoloji cihazlarla, güvenlik standartlarında gerçekleştirilir.
 </p>
 </div>
 </div>
 <div className="w-full md:w-2/3 grid sm:grid-cols-2 gap-6">
 {services.map((srv: any, idx: number) => (
 <div key={idx} className="bg-surface border border-border/50 p-6 rounded-[1.5rem] hover:shadow-md transition-all">
 <div className="w-12 h-12 bg-bg rounded-xl border border-border flex items-center justify-center mb-5 text-accent">
 {getIcon(srv.icon)}
 </div>
 <h4 className="text-lg font-bold text-text mb-2">{srv.name}</h4>
 <p className="text-sm text-text-secondary leading-relaxed mb-4">{srv.description}</p>
 <a href="#iletisim" className="text-xs font-bold text-accent tracking-wider uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
 Detaylı Bilgi <ArrowRight size={14} />
 </a>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
 }

 // --- 4. TESTIMONIALS (carousel) ---
 if (section.id === 'gorusler' || section.type === 'testimonials') {
 const content = section.defaultContent as any;
 return (
 <section key={section.id} id={section.id} className="w-full bg-text text-bg py-20">
 <div className="max-w-[960px] mx-auto px-6 text-center">
 <h2 className="text-xs font-bold tracking-widest uppercase mb-2 opacity-70">{content?.badge || 'Görüşler'}</h2>
 <h3 className="text-3xl lg:text-4xl font-heading font-bold mb-10">{content?.title || 'Danışanlarımızın Kaleminden'}</h3>
 <div className="max-w-2xl mx-auto bg-bg/5 backdrop-blur-sm border border-bg/10 p-8 md:p-10 rounded-[2rem]">
 <div className="flex justify-center gap-1 mb-6 text-yellow-400">
 {[...Array(5)].map((_,i) => <Star key={i} size={16} fill="currentColor" />)}
 </div>
 <p className="text-lg md:text-xl font-medium leading-relaxed mb-6">
 "Kliniğe girdiğiniz ilk andan itibaren profesyonelliği hissediyorsunuz. Tüm süreçten çok memnununm."
 </p>
 <div className="flex items-center justify-center gap-3">
 <div className="w-10 h-10 bg-bg/10 rounded-full flex items-center justify-center">
 <User size={18} />
 </div>
 <div className="text-left">
 <div className="font-bold text-sm">Zeynep K.</div>
 </div>
 </div>
 </div>
 </div>
 </section>
 )
 }

 // --- 5. CONTACT (map) ---
 if (section.id === 'iletisim' || section.type === 'contact') {
 const content = section.defaultContent as any;
 return (
 <section key={section.id} id={section.id} className="w-full py-20 bg-surface">
 <div className="max-w-[960px] mx-auto px-6 flex flex-col md:flex-row gap-10 bg-bg border border-border rounded-[2rem] p-8 shadow-sm">
 <div className="flex-1">
 <h2 className="text-xs font-bold text-accent tracking-widest uppercase mb-2">{content?.badge || 'İletişim'}</h2>
 <h3 className="text-2xl font-heading font-bold text-text mb-8">{content?.title || 'Bize Ulaşın'}</h3>
 
 <div className="space-y-6">
 <div className="flex items-start gap-4">
 <div className="bg-surface-muted p-3 rounded-xl text-text-secondary"><MapPin size={20}/></div>
 <div>
 <div className="font-bold text-sm text-text mb-1">Adres</div>
 <p className="text-sm text-text-secondary">{businessData.address}<br/>{businessData.district}, {businessData.city}</p>
 </div>
 </div>
 <div className="flex items-start gap-4">
 <div className="bg-surface-muted p-3 rounded-xl text-text-secondary"><Phone size={20}/></div>
 <div>
 <div className="font-bold text-sm text-text mb-1">Telefon</div>
 <p className="text-sm text-text">{businessData.phone}</p>
 </div>
 </div>
 </div>
 </div>
 
 <div className="flex-1 w-full bg-surface-muted rounded-2xl border border-border overflow-hidden min-h-[250px] relative">
 <div className="absolute inset-0 opacity-40 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=40.99,29.02&zoom=13&size=400x300&sensor=false')] bg-cover bg-center grayscale"></div>
 </div>
 </div>
 </section>
 )
 }

 // --- GLOBAL FOOTER ---
 if (section.id === 'global-footer') {
 const content = section.defaultContent as any;
 return (
 <footer key={section.id} id={section.id} className="w-full bg-surface-muted border-t border-border pt-12 pb-6 px-6">
 <div className="max-w-[960px] mx-auto grid md:grid-cols-3 gap-10 mb-10">
 <div>
 <h4 className="font-heading font-bold text-xl text-text mb-4">{content?.businessName || businessData.name}</h4>
 <p className="text-text-secondary text-sm max-w-xs">{content?.description || 'Sağlıklı ve güzel bir yaşam için güvenilir adresiniz.'}</p>
 </div>
 <div>
 <h5 className="font-bold text-text uppercase text-xs mb-4">Bağlantılar</h5>
 <ul className="space-y-2 text-sm text-text-secondary">
 <li><a href="#hero">Ana Sayfa</a></li>
 <li><a href="#hakkimizda">Hakkımızda</a></li>
 <li><a href="#hizmetler">Hizmetler</a></li>
 </ul>
 </div>
 <div>
 <h5 className="font-bold text-text uppercase text-xs mb-4">Sosyal Medya</h5>
 <ul className="space-y-2 text-sm text-text-secondary">
 <li><a href={businessData.socialMedia?.instagram || '#'} className="flex items-center gap-2"><Instagram size={14}/> Instagram</a></li>
 </ul>
 </div>
 </div>
 <div className="max-w-[960px] mx-auto flex flex-col md:flex-row items-center justify-between pt-6 border-t border-border/50 text-xs text-text-muted">
 <div>{content?.copyright || `© ${new Date().getFullYear()} ${businessData.name}. Tüm hakları saklıdır.`}</div>
 <div className="flex gap-4 mt-2 md:mt-0">
 {content?.legal?.map((l:any, i:number) => (
 <a key={i} href={l.href} className="hover:text-text">{l.label}</a>
 ))}
 </div>
 </div>
 </footer>
 )
 }

 return null
 })}
 </div>
 )
}
