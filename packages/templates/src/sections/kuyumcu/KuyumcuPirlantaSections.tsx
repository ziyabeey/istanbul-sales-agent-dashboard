import React from 'react'
import { SectionConfig, BusinessData } from '../../types/section-types'
import { Diamond, ShieldCheck, Truck, ArrowRight, Calendar, Star } from 'lucide-react'

// Katman 3 (Büyüme) - Kuyumcu Pırlanta
// Tasarım: 1024px container, soft gölgeler, masonry grid, "Neumorphism" esintili yuvarlak hatlar (12px radius).
// Bol whitespace (boşluk), premium aydınlık tema.

interface Props {
 sections: SectionConfig[]
 businessData: BusinessData
}

export const KuyumcuPirlantaSections = ({ business: businessData }: any) => {
 return (
 <div className="flex flex-col w-full bg-surface items-center font-body">
 <section id="hero" className="relative w-full max-w-[1024px] px-4 py-24 mx-auto flex flex-col items-center text-center">
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
 
 {businessData?.district && (
 <span className="px-4 py-1.5 bg-surface-hover text-primary text-xs font-bold tracking-widest rounded-full uppercase mb-6 shadow-sm border border-border">
 {businessData.district}
 </span>
 )}
 <h1 className="text-5xl md:text-6xl font-heading font-medium text-text mb-6 leading-tight max-w-3xl">
 {businessData?.name || 'Işıltınızı Tamamlayın'}
 </h1>
 <p className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl leading-relaxed">
 {businessData?.slogan || 'Zarafetin en somut hali pırlanta koleksiyonlarımızla tanışın.'}
 </p>
 <div className="flex flex-wrap justify-center gap-4">
 <a href="#iletisim" className="px-8 py-4 bg-text text-text-inverse rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
 İletişim
 </a>
 <a href="#koleksiyon" className="px-8 py-4 bg-surface border border-border text-text rounded-full font-semibold hover:bg-surface-hover transition-colors">
 Koleksiyon
 </a>
 </div>
 </section>

 <section id="koleksiyon" className="w-full max-w-[1024px] px-4 py-20 mx-auto">
 <div className="text-center mb-16">
 <h2 className="text-3xl font-heading font-medium text-text">Koleksiyonlar</h2>
 <div className="w-12 h-0.5 bg-primary/30 mx-auto mt-6"></div>
 </div>
 
 <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
 <div className="md:col-span-8 group relative rounded-[1rem] overflow-hidden aspect-[4/3] bg-surface-hover">
 <img src={businessData?.photos?.[0] ? (typeof businessData.photos[0] === 'string' ? businessData.photos[0] : (businessData.photos[0] as any).url) : "https://images.unsplash.com/photo-1599643478524-fb5244b2f28b?auto=format&fit=crop&q=80&w=600"} alt="Koleksiyon 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
 <div className="absolute inset-0 bg-gradient-to-t from-text/60 to-transparent flex items-end p-8">
 <h3 className="text-text-inverse text-2xl font-heading tracking-wide">Premium Tasarımlar</h3>
 </div>
 </div>
 <div className="md:col-span-4 flex flex-col gap-6">
 <div className="group relative rounded-[1rem] overflow-hidden flex-1 bg-surface-hover aspect-square md:aspect-auto">
 <img src={businessData?.photos?.[1] ? (typeof businessData.photos[1] === 'string' ? businessData.photos[1] : (businessData.photos[1] as any).url) : "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=600"} alt="Koleksiyon 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
 <div className="absolute inset-0 bg-gradient-to-t from-text/60 to-transparent flex items-end p-6">
 <h3 className="text-text-inverse text-xl font-heading tracking-wide">Özel İşçilik</h3>
 </div>
 </div>
 <div className="group relative rounded-[1rem] overflow-hidden flex-1 bg-surface-hover aspect-square md:aspect-auto">
 <img src={businessData?.photos?.[2] ? (typeof businessData.photos[2] === 'string' ? businessData.photos[2] : (businessData.photos[2] as any).url) : "https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&q=80&w=600"} alt="Koleksiyon 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
 <div className="absolute inset-0 bg-gradient-to-t from-text/60 to-transparent flex items-end p-6">
 <h3 className="text-text-inverse text-xl font-heading tracking-wide">Kişiye Özel</h3>
 </div>
 </div>
 </div>
 </div>
 </section>

 <section id="hakkimizda" className="w-full bg-surface-hover py-20">
 <div className="max-w-[1024px] px-4 mx-auto">
 <h2 className="text-3xl font-heading font-medium text-center text-text mb-16">Ayrıcalıklar</h2>
 <div className="grid md:grid-cols-3 gap-8">
 {((businessData?.services && businessData.services.length >= 3) ? businessData.services.slice(0, 3) : [
 { title: 'Sertifikalı Pırlantalar', description: 'Tüm pırlantalarımız uluslararası sertifikalıdır.' },
 { title: 'Ömür Boyu Garanti', description: 'Bakım ve onarım garantisi ile yanınızdayız.' },
 { title: 'Güvenli Teslimat', description: 'Özel kurye ile güvenle kapınıza teslim.' }
 ]).map((item: any, idx: number) => {
 const iconMap = [Diamond, ShieldCheck, Truck];
 const Icon = iconMap[idx % iconMap.length];
 return (
 <div key={idx} className="bg-surface p-10 rounded-[1.5rem] text-center hover:-translate-y-2 transition-transform shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border/50">
 <div className="w-16 h-16 mx-auto bg-primary/5 text-primary flex items-center justify-center rounded-2xl mb-6">
 <Icon className="w-8 h-8" strokeWidth={1.5} />
 </div>
 <h3 className="text-xl font-bold text-text mb-3">{item.name || item.title}</h3>
 <p className="text-text-secondary leading-relaxed">{item.description}</p>
 </div>
 )
 })}
 </div>
 </div>
 </section>

 <section id="iletisim" className="w-full max-w-[1024px] px-4 py-24 mx-auto text-center">
 <div className="bg-text text-text-inverse rounded-[2rem] p-12 md:p-20 relative overflow-hidden">
 <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
 <Diamond className="w-64 h-64 text-surface" />
 </div>
 <div className="relative z-10 max-w-2xl mx-auto">
 <h2 className="text-3xl md:text-4xl font-heading font-medium mb-6">Mağazamızda Ağırlayalım</h2>
 <p className="text-surface-hover/80 text-lg mb-10">Konforlu bir ortamda tasarımlarımızı incelemek ve size özel danışmanlık almak için mağazamızı ziyaret edin.</p>
 <button className="px-10 py-4 bg-surface text-text rounded-full font-bold shadow-xl hover:scale-105 transition-transform flex items-center justify-center mx-auto">
 <Calendar className="w-5 h-5 mr-3" />
 Randevu Al ({businessData?.phone})
 </button>
 </div>
 </div>
 </section>
 </div>
 )
}

import { registerSection } from '../../registry/section-registry'
registerSection('hero', 'kuyumcu_pirlanta_full', KuyumcuPirlantaSections as unknown as React.ComponentType<any>)
