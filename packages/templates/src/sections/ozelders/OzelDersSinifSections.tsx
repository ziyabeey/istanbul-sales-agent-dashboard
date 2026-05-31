import React from 'react'
import { SectionConfig, BusinessData } from '../../types/section-types'
import { GraduationCap, MapPin, Phone, Mail, Check, ArrowRight, Target, Users, BookOpen, Clock } from 'lucide-react'

// Katman 2 (Standart) - Özel Ders Sınıf
// Tasarım: 768px container limit, 50/50 Split layoutlar, 8px radius, 64px padding.
// DM Sans ve Inter font ailesi. Mor ve gri tonları.

interface Props {
 sections: SectionConfig[]
 businessData: BusinessData
}

export const OzelDersSinifSections = ({ sections, businessData }: Props) => {
 return (
 <div className="flex flex-col w-full">
 {sections.map((section) => {
 // --- 1. HERO (split_left) ---
 if (section.id === 'hero' || section.type === 'hero') {
 const content = section.defaultContent as any;
 return (
 <section key={section.id} id={section.id} className="relative bg-surface w-full min-h-[90vh] flex items-center pt-24 pb-16">
 <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
 <img 
 src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1600" 
 alt="Eğitim Sınıfı" 
 className="w-full h-full object-cover"
 />
 <div className="absolute inset-0 bg-accent/10 mix-blend-multiply"></div>
 </div>
 
 <div className="container-custom relative z-10 px-4">
 <div className="max-w-xl lg:pr-12 bg-surface/95 backdrop-blur-sm lg:p-8 lg:-ml-8 rounded-card">
 {content?.badge && (
 <span className="px-4 py-1.5 bg-accent/10 text-accent text-sm font-bold tracking-wider mb-6 rounded-full inline-block uppercase">
 {content.badge}
 </span>
 )}
 <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text mb-6 leading-[1.15]">
 {content?.title || 'Geleceğinize rehberlik ediyoruz.'}
 </h1>
 <p className="text-lg text-text-secondary mb-10 leading-relaxed font-body">
 {content?.subtitle || 'LGS ve YKS hazırlığında uzman kadromuz.'}
 </p>
 
 <div className="flex flex-col sm:flex-row gap-4 mb-10">
 {content?.cta1 && (
 <a href={content.cta1.href} className="px-8 py-4 bg-accent text-on-accent font-semibold text-center rounded-btn hover:bg-accent-hover transition-colors shadow-md group flex items-center justify-center">
 {content.cta1.text}
 <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
 </a>
 )}
 </div>

 <div className="grid grid-cols-2 gap-6 pt-8 border-t border-border">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
 <Users className="w-5 h-5" />
 </div>
 <div>
 <p className="font-bold text-text">VIP Sınıflar</p>
 <p className="text-sm text-text-muted">4-6 Kişilik Etüt</p>
 </div>
 </div>
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
 <Target className="w-5 h-5" />
 </div>
 <div>
 <p className="font-bold text-text">%98 Başarı</p>
 <p className="text-sm text-text-muted">Üniversiteye Yerleşme</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>
 )
 }

 // --- 2. PAKETLER (pricing) ---
 if (section.id === 'paketler' || section.type === 'pricing') {
 const content = section.defaultContent as any;
 const plans = content?.plans || []
 return (
 <section key={section.id} id={section.id} className="py-section bg-surface-muted border-y border-border">
 <div className="container-custom px-4 relative">
 <div className="text-center max-w-2xl mx-auto mb-16">
 {content?.badge && <span className="text-accent font-semibold tracking-wider text-sm mb-3 block uppercase">{content.badge}</span>}
 <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">{content?.title || 'Programlar'}</h2>
 <p className="text-text-secondary">Her öğrencinin ihtiyacına uygun paket çözümlerimiz.</p>
 </div>

 <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
 {plans.map((plan: any, idx: number) => (
 <div key={idx} className={`bg-bg rounded-card p-8 md:p-10 border ${plan.isPopular ? 'border-accent shadow-xl relative' : 'border-border shadow-sm'}`}>
 {plan.isPopular && (
 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-on-accent px-4 py-1 text-sm font-bold rounded-full">
 En Çok Tercih Edilen
 </div>
 )}
 <h3 className="text-2xl font-heading font-bold text-text mb-2">{plan.name}</h3>
 <div className="flex items-baseline gap-2 mb-6">
 <span className="text-4xl font-bold text-text">{plan.price}</span>
 <span className="text-text-muted">{plan.period}</span>
 </div>
 <a href="#iletisim" className={`w-full block text-center py-3 rounded-btn font-semibold mb-8 transition-colors ${plan.isPopular ? 'bg-accent text-on-accent hover:bg-accent-hover' : 'bg-surface-elevated text-text hover:bg-border'}`}>
 Bilgi Al
 </a>
 <ul className="space-y-4">
 {plan.features?.map((feat: string, fIdx: number) => (
 <li key={fIdx} className="flex items-start gap-3">
 <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
 <span className="text-text-secondary">{feat}</span>
 </li>
 ))}
 </ul>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
 }

 // --- 3. BAŞARILAR (social_proof - success_stories) ---
 if (section.id === 'basarilar' || section.type === 'social_proof') {
 const content = section.defaultContent as any;
 const stories = content?.stories || []
 return (
 <section key={section.id} id={section.id} className="py-section bg-surface">
 <div className="container-custom px-4 relative">
 <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-border pb-6">
 <div className="max-w-xl">
 {content?.badge && <span className="text-accent font-semibold tracking-wider text-sm mb-3 block uppercase">{content.badge}</span>}
 <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">{content?.title || 'Başarı Hikayeleri'}</h2>
 </div>
 <div className="mt-4 md:mt-0">
 <a href="#" className="text-accent font-semibold hover:text-accent-hover flex items-center">
 Tümünü Gör <ArrowRight className="ml-2 w-4 h-4" />
 </a>
 </div>
 </div>

 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
 {stories.map((story: any, idx: number) => (
 <div key={idx} className="bg-bg border border-border p-6 rounded-card hover:shadow-lg transition-all">
 <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-6">
 <GraduationCap className="w-6 h-6" />
 </div>
 <h3 className="text-xl font-bold text-text mb-1">{story.studentName}</h3>
 <p className="text-accent font-medium mb-4">{story.achievement}</p>
 <p className="text-sm text-text-secondary bg-surface inline-block px-3 py-1 rounded-full">{story.exam} - {story.year}</p>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
 }

 // --- 4. İLETİŞİM (contact - split_form_map) ---
 if (section.id === 'iletisim' || section.type === 'contact') {
 return (
 <section key={section.id} id={section.id} className="py-section bg-bg">
 <div className="container-custom px-4 relative">
 <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
 <div>
 <span className="text-accent font-semibold tracking-wider text-sm mb-3 block uppercase">{String(section.defaultContent?.badge || 'KAYIT')}</span>
 <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-6">{String(section.defaultContent?.title || 'Erken Kayıt Avantajı')}</h2>
 <p className="text-text-secondary mb-10 text-lg">{String(section.defaultContent?.description || 'Formu doldurun, eğitim danışmanlarımız size ulaşsın.')}</p>
 
 <div className="space-y-6">
 <div className="flex items-start">
 <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center shrink-0">
 <Phone className="w-5 h-5 text-accent" />
 </div>
 <div className="ml-5">
 <p className="text-sm text-text-muted mb-1">Danışma Hattı</p>
 <p className="text-lg text-text font-bold">{businessData?.phone || '0216 450 33 44'}</p>
 </div>
 </div>
 <div className="flex items-start">
 <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center shrink-0">
 <MapPin className="w-5 h-5 text-accent" />
 </div>
 <div className="ml-5">
 <p className="text-sm text-text-muted mb-1">Şube Adresi</p>
 <p className="text-lg text-text font-medium leading-relaxed max-w-xs">{businessData?.address}, {businessData?.district}</p>
 </div>
 </div>
 </div>
 </div>
 
 <div className="bg-surface border border-border rounded-card p-8 lg:p-10 shadow-sm relative">
 <form className="space-y-5 relative z-10">
 <div>
 <label className="block text-sm font-medium text-text mb-2">Veli Adı Soyadı</label>
 <input type="text" className="w-full bg-bg border border-border rounded-btn px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 transition-all" />
 </div>
 <div>
 <label className="block text-sm font-medium text-text mb-2">Öğrenci Sınıfı</label>
 <select className="w-full bg-bg border border-border rounded-btn px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 transition-all appearance-none">
 <option value="">Seçiniz</option>
 <option value="8">8. Sınıf (LGS)</option>
 <option value="12">12. Sınıf (YKS)</option>
 <option value="mezun">Mezun (YKS)</option>
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium text-text mb-2">Telefon Numarası</label>
 <input type="tel" className="w-full bg-bg border border-border rounded-btn px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 transition-all" />
 </div>
 <button type="button" className="w-full bg-accent text-on-accent font-semibold py-4 rounded-btn hover:bg-accent-hover transition-colors shadow-md mt-2">
 Ön Kayıt Oluştur
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
