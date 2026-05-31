import React from 'react'
import { SectionConfig, BusinessData } from '../../types/section-types'
import { PlayCircle, ArrowRight, ShieldAlert, Star } from 'lucide-react'

// Katman 4 (Premium) - Kuyumcu Lux
// Tasarım: 1280px container, Full-width elements, Glassmorphism, Premium Dark Mode (Siyah & Altın Sarısı).
// Sinematik hissiyat, ince fontlar, keskin köşeler (4px radius).

interface Props {
 sections: SectionConfig[]
 businessData: BusinessData
}

export const KuyumcuLuxSections = ({ business: businessData }: any) => {
 return (
 <div className="flex flex-col w-full bg-primary text-text min-h-screen items-center">
 <section id="hero" className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
 <div className="absolute inset-0 z-0">
 {businessData?.photos?.[0] ? (
 <img src={typeof businessData.photos[0] === 'string' ? businessData.photos[0] : (businessData.photos[0] as any).url} alt={businessData.name} className="w-full h-full object-cover opacity-60 scale-105 animate-[slowPan_20s_ease-in-out_infinite_alternate]" />
 ) : (
 <img 
 src="https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?auto=format&fit=crop&q=80&w=1920" 
 alt="High Jewelry Background" 
 className="w-full h-full object-cover opacity-60 scale-105 animate-[slowPan_20s_ease-in-out_infinite_alternate]"
 />
 )}
 <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/50 to-primary"></div>
 </div>
 
 <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
 {businessData?.district && (
 <span className="block text-accent text-xs md:text-sm font-semibold tracking-[0.3em] font-heading uppercase mb-8">
 {businessData.district}
 </span>
 )}
 <h1 className="text-5xl md:text-7xl font-heading text-text-inverse mb-8 leading-[1.1] font-light">
 {businessData?.name || 'Lüksün Yeni Adresi'}
 </h1>
 <p className="text-lg md:text-xl text-text-muted mb-12 max-w-2xl mx-auto font-light tracking-wide">
 {businessData?.slogan || 'Sıradanlıktan uzak, nesilden nesile aktarılacak tasarımlar.'}
 </p>
 
 <a href="#iletisim" className="inline-flex items-center px-8 py-4 bg-transparent border border-accent text-accent hover:bg-accent hover:text-primary transition-all duration-500 font-medium tracking-widest text-sm uppercase">
 VIP Randevu
 </a>
 </div>
 
 <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-70">
 <span className="text-xs text-text-muted tracking-[0.2em] mb-2 uppercase">Keşfet</span>
 <div className="w-px h-12 bg-accent/50"></div>
 </div>
 </section>

 <section id="seckiler" className="w-full py-32 bg-primary">
 <div className="max-w-[1280px] px-6 mx-auto">
 <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-border pb-8">
 <h2 className="text-4xl font-heading text-text-inverse font-light">Kraliyet Seçkileri</h2>
 <a href="#iletisim" className="hidden md:flex items-center text-accent text-sm tracking-widest uppercase mt-6 md:mt-0 hover:text-text-inverse transition-colors">
 Koleksiyonu Keşfet <ArrowRight className="w-4 h-4 ml-2" />
 </a>
 </div>
 
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 {(businessData?.services || []).map((srv: any, idx: number) => {
 const sampleImages = [
 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=600',
 'https://images.unsplash.com/photo-1599643478524-fb5244b2f28b?auto=format&fit=crop&q=80&w=600',
 'https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&q=80&w=600'
 ];
 return (
 <div key={idx} className="group cursor-pointer">
 <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-surface">
 <img src={sampleImages[idx%3]} alt={srv.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
 <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500"></div>
 </div>
 <h3 className="text-xl font-heading text-text-inverse mb-2">{srv.name}</h3>
 <p className="text-sm text-text-muted font-light">{srv.description}</p>
 </div>
 )
 })}
 </div>
 </div>
 </section>

 <section id="iletisim" className="w-full py-32 bg-surface border-t border-border">
 <div className="max-w-[1280px] px-6 mx-auto flex flex-col lg:flex-row gap-16 items-center">
 <div className="w-full lg:w-1/2">
 <h2 className="text-4xl lg:text-5xl font-heading text-text-inverse mb-8 font-light leading-tight">
 VIP Sunum ve Randevu
 </h2>
 <p className="text-lg text-text-muted mb-12 font-light leading-relaxed">
 Size özel tasarımlar ve fiyatlandırma için VIP randevu sistemimiz üzerinden konaklama, transfer ve mağaza içi sunumlarda ayrıcalık yaşayın.
 </p>
 
 <div className="bg-primary border border-border p-8 backdrop-blur-md">
 <form className="space-y-6">
 <div className="grid grid-cols-2 gap-6">
 <div>
 <input type="text" placeholder="Ad" className="w-full bg-transparent border-b border-border/50 pb-3 text-text-inverse placeholder:text-text-muted/50 focus:border-accent outline-none transition-colors rounded-none font-light" />
 </div>
 <div>
 <input type="text" placeholder="Soyad" className="w-full bg-transparent border-b border-border/50 pb-3 text-text-inverse placeholder:text-text-muted/50 focus:border-accent outline-none transition-colors rounded-none font-light" />
 </div>
 </div>
 <div>
 <input type="tel" placeholder="Telefon (VIP Temsilcimiz Ulaşacaktır)" className="w-full bg-transparent border-b border-border/50 pb-3 text-text-inverse placeholder:text-text-muted/50 focus:border-accent outline-none transition-colors rounded-none font-light" />
 </div>
 <button type="button" className="w-full py-5 bg-accent text-primary font-medium tracking-widest text-sm uppercase hover:bg-text-inverse transition-colors mt-4">
 Randevu Talebini İlet
 </button>
 </form>
 </div>
 </div>
 
 <div className="w-full lg:w-1/2 h-[600px] relative hidden lg:block border border-border/30 p-2">
 <img src="https://images.unsplash.com/photo-1596752763261-2bc61e5ab663?auto=format&fit=crop&q=80&w=800" alt="VIP Loca" className="w-full h-full object-cover opacity-80" />
 <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 to-transparent"></div>
 <div className="absolute bottom-10 left-10 text-text-inverse">
 <p className="font-heading text-xl mb-1">Özel Hizmet Hattı</p>
 <p className="text-accent font-light tracking-wider">{businessData?.phone}</p>
 </div>
 </div>
 </div>
 </section>
 </div>
 )
}

import { registerSection } from '../../registry/section-registry'
registerSection('hero', 'kuyumcu_lux_full', KuyumcuLuxSections as unknown as React.ComponentType<any>)
