import React from 'react'
import { SectionConfig, BusinessData } from '../../types/section-types'
import { BookOpen, MapPin, Phone, Mail, GraduationCap, Check, ArrowRight, User, Star } from 'lucide-react'

// Katman 1 (Temel) - Özel Ders Kalem
// Tasarım: Mobile-first, Tek Sütun ağırlıklı, Sade ve Hızlı Bilgi. 1280px container, 4px radius, 48px padding.

interface Props {
 sections: SectionConfig[]
 businessData: BusinessData
}

export const OzelDersKalemSections = ({ sections, businessData }: Props) => {
 return (
 <div className="flex flex-col w-full">
 {sections.map((section) => {
 // --- 1. HERO (fullscreen_overlay) ---
 if (section.id === 'hero' || section.type === 'hero') {
 return (
 <section key={section.id} id={section.id} className="relative bg-surface w-full flex items-center justify-center min-h-[85vh] py-section">
 <div className="absolute inset-0 z-0">
 <img 
 src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=2000" 
 alt="Eğitim" 
 className="w-full h-full object-cover"
 />
 <div className="absolute inset-0 bg-black/60"></div>
 </div>
 <div className="container-custom relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
 {section.defaultContent?.badge && (
 <span className="px-3 py-1 bg-accent/90 text-on-accent text-sm font-medium tracking-wider mb-6 rounded-btn opacity-0 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
 {section.defaultContent.badge}
 </span>
 )}
 <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white mb-6 tracking-tight leading-tight opacity-0 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
 {section.defaultContent?.title || 'Eğitimde Fark Yaratın'}
 </h1>
 <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl opacity-0 animate-fade-in font-body font-light" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
 {section.defaultContent?.subtitle || 'LGS ve ilköğretim takviye dersleriyle öğrencinizin potansiyelini keşfedin.'}
 </p>
 <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in w-full sm:w-auto" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
 {section.defaultContent?.cta1 && (
 <a href={section.defaultContent.cta1.href} className="px-8 py-4 bg-accent text-on-accent font-semibold text-lg transition-colors hover:bg-accent-hover rounded-btn w-full sm:w-auto text-center shadow-lg">
 {section.defaultContent.cta1.text}
 </a>
 )}
 </div>
 </div>
 </section>
 )
 }

 // --- 2. DERSLER (services - subject_grid) ---
 if (section.id === 'dersler' || section.type === 'services') {
 const subjects = section.defaultContent?.subjects || []
 return (
 <section key={section.id} id={section.id} className="py-section bg-surface">
 <div className="container-custom px-4 relative">
 <div className="text-center max-w-2xl mx-auto mb-16">
 {section.defaultContent?.badge && <span className="text-accent font-semibold tracking-wider text-sm mb-3 block uppercase">{section.defaultContent.badge}</span>}
 <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">{section.defaultContent?.title}</h2>
 <div className="w-16 h-1 bg-accent mx-auto mt-6 rounded-full"></div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {subjects.map((subject: any, idx: number) => (
 <div key={idx} className="bg-bg border border-border rounded-card p-6 flex flex-col hover:border-accent/30 hover:shadow-lg transition-all duration-300">
 <div className="text-4xl mb-4">{subject.emoji || '📚'}</div>
 <h3 className="text-xl font-heading font-bold text-text mb-2">{subject.name}</h3>
 <p className="text-text-muted font-body text-sm mb-4">{subject.level || 'Tüm Kademeler'}</p>
 <div className="mt-auto pt-4 border-t border-border/50 flex items-center text-accent font-medium text-sm group-hover:text-accent-hover">
 <span>Detayları İncele</span>
 <ArrowRight className="w-4 h-4 ml-2" />
 </div>
 </div>
 ))}
 {(!subjects || subjects.length === 0) && businessData?.services?.map((svc: any, idx: number) => (
 <div key={idx} className="bg-bg border border-border rounded-card p-6 flex flex-col hover:shadow-lg transition-all duration-300">
 <div className="text-4xl mb-4">{svc.icon || '📚'}</div>
 <h3 className="text-xl font-heading font-bold text-text mb-2">{svc.name}</h3>
 <div className="mt-auto pt-4 border-t border-border/50 flex justify-between items-center text-accent font-medium text-sm">
 <span>Lise / Ortaokul</span>
 <ArrowRight className="w-4 h-4" />
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
 }

 // --- 3. HAKKIMDA (about - split_left) ---
 if (section.id === 'hakkimda' || section.type === 'about') {
 return (
 <section key={section.id} id={section.id} className="py-section bg-bg overflow-hidden relative">
 <div className="container-custom px-4 relative z-10">
 <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
 <div className="relative rounded-card overflow-hidden h-[400px] lg:h-[600px] w-full shadow-xl">
 <img 
 src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1000" 
 alt="Eğitmen" 
 className="absolute inset-0 w-full h-full object-cover"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
 <div className="absolute bottom-6 left-6 right-6">
 <div className="bg-white/95 backdrop-blur-sm p-4 border-l-4 border-accent rounded-r-card shadow-lg">
 <p className="text-text font-semibold text-lg">{businessData?.ownerName || 'Eğitmen Adı'}</p>
 <p className="text-text-muted text-sm">{businessData?.team?.[0]?.role || 'Eğitim Koçu'}</p>
 </div>
 </div>
 </div>
 <div className="space-y-8">
 <div>
 {section.defaultContent?.badge && <span className="text-accent font-semibold tracking-wider text-sm mb-3 block uppercase">{section.defaultContent.badge}</span>}
 <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mb-6">
 {section.defaultContent?.title || 'Eğitimde Deneyim ve Güven'}
 </h2>
 <p className="text-text-secondary font-body text-lg leading-relaxed mb-6">
 {section.defaultContent?.content || '10 yıllık tecrübeyle...' }
 </p>
 </div>

 <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
 {section.defaultContent?.stats?.map((stat: any, idx: number) => (
 <div key={idx} className="bg-surface p-4 rounded-card border border-border">
 <p className="text-3xl font-heading font-bold text-accent mb-1">{stat.value}</p>
 <p className="text-text-secondary text-sm font-medium">{stat.label}</p>
 </div>
 ))}
 </div>

 <a href="#iletisim" className="inline-flex items-center text-accent font-semibold hover:text-accent-hover transition-colors mt-4">
 Tanışma Toplantısı Ayarla <ArrowRight className="ml-2 w-5 h-5" />
 </a>
 </div>
 </div>
 </div>
 </section>
 )
 }

 // --- 4. İLETİŞİM (contact - simple_form) ---
 if (section.id === 'iletisim' || section.type === 'contact') {
 return (
 <section key={section.id} id={section.id} className="py-section bg-surface">
 <div className="container-custom px-4 relative z-10">
 <div className="max-w-4xl mx-auto bg-bg border border-border rounded-card shadow-lg p-8 md:p-12">
 <div className="text-center mb-10">
 <span className="text-accent font-semibold tracking-wider text-sm mb-2 block uppercase">{section.defaultContent?.badge || 'İLETİŞİM'}</span>
 <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">{section.defaultContent?.title || 'Bize Ulaşın'}</h2>
 <p className="text-text-secondary max-w-xl mx-auto">{section.defaultContent?.description || 'Ücretsiz tanışma ve deneme dersi için formu doldurun.'}</p>
 </div>
 
 <div className="grid md:grid-cols-2 gap-12">
 <div>
 <h3 className="text-xl font-heading font-bold text-text mb-6 border-b border-border pb-2">İletişim Bilgileri</h3>
 <div className="space-y-6">
 <div className="flex items-start">
 <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-1">
 <Phone className="w-5 h-5 text-accent" />
 </div>
 <div className="ml-4">
 <p className="text-sm text-text-muted font-medium mb-1">Telefon</p>
 <p className="text-text font-semibold">{businessData?.phone || '0532 000 00 00'}</p>
 </div>
 </div>
 <div className="flex items-start">
 <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-1">
 <Mail className="w-5 h-5 text-accent" />
 </div>
 <div className="ml-4">
 <p className="text-sm text-text-muted font-medium mb-1">E-Posta</p>
 <p className="text-text font-semibold">{businessData?.email || 'info@ozelders.com'}</p>
 </div>
 </div>
 <div className="flex items-start">
 <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-1">
 <MapPin className="w-5 h-5 text-accent" />
 </div>
 <div className="ml-4">
 <p className="text-sm text-text-muted font-medium mb-1">Adres</p>
 <p className="text-text font-semibold leading-relaxed">{businessData?.address}, {businessData?.district}, {businessData?.city}</p>
 </div>
 </div>
 </div>
 </div>
 <div>
 <h3 className="text-xl font-heading font-bold text-text mb-6 border-b border-border pb-2">Ön Görüşme Formu</h3>
 <form className="space-y-4">
 <div>
 <input type="text" placeholder="Veli / Öğrenci Adı Soyadı" className="w-full bg-surface border border-border rounded-btn px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-text" />
 </div>
 <div>
 <input type="tel" placeholder="Telefon Numarası" className="w-full bg-surface border border-border rounded-btn px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-text" />
 </div>
 <div>
 <select className="w-full bg-surface border border-border rounded-btn px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-text appearance-none">
 <option value="">Ders Seçiniz</option>
 <option value="mat-lgs">LGS Matematik</option>
 <option value="ilkogretim">İlköğretim Takviye</option>
 <option value="okuma">Okuma Yazma</option>
 </select>
 </div>
 <div>
 <textarea placeholder="Mesajınız ve Öğrenci Sınıfı" rows={4} className="w-full bg-surface border border-border rounded-btn px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-text resize-none"></textarea>
 </div>
 <button type="button" className="w-full bg-accent text-on-accent font-semibold py-3 px-6 rounded-btn hover:bg-accent-hover transition-colors shadow-md">
 Gönder
 </button>
 </form>
 </div>
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
