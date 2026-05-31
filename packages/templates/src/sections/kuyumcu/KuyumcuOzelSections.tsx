import React from 'react'
import { SectionConfig, BusinessData } from '../../types/section-types'
import { Store, Globe, Banknote, ArrowUpRight, MapPin } from 'lucide-react'

// Katman 5 (Enterprise) - Kuyumcu Özel (İmparator)
// Tasarım: 1440px container, 0px radius, Çoklu şube, Asimetrik Grid, Global/Zincir marka konsepti.

interface Props {
 sections: SectionConfig[]
 businessData: BusinessData
}

export const KuyumcuOzelSections = ({ business: businessData }: any) => {
 return (
 <div className="flex flex-col w-full bg-surface items-center font-body text-text">
 <section id="hero" className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-12 md:py-20 lg:py-28">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
 <div className="lg:col-span-6 2xl:col-span-5 order-2 lg:order-1">
 {businessData?.district && (
 <div className="inline-flex items-center space-x-2 mb-6 text-sm font-bold tracking-widest uppercase text-accent border border-accent/30 px-4 py-2 bg-accent/5">
 <Globe className="w-4 h-4" />
 <span>{businessData.district}</span>
 </div>
 )}
 <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-heading font-extrabold leading-[1.05] tracking-tight mb-8">
 {businessData?.name || 'Altının İmparatoru'}
 </h1>
 <p className="text-xl md:text-2xl text-text-muted mb-12 font-medium max-w-xl leading-relaxed">
 {businessData?.slogan || 'Sıradanlıktan uzak, nesilden nesile aktarılacak tasarımlar.'}
 </p>
 <div className="flex flex-wrap gap-6">
 <a href="#iletisim" className="flex items-center justify-center px-8 py-5 bg-primary text-on-primary font-bold text-lg hover:bg-primary/90 transition-colors w-full sm:w-auto">
 İletişim <ArrowUpRight className="w-5 h-5 ml-2" />
 </a>
 </div>
 </div>
 <div className="lg:col-span-6 2xl:col-span-7 order-1 lg:order-2 grid grid-cols-2 gap-4 h-[500px] lg:h-[700px]">
 <div className="bg-surface-hover h-full w-full overflow-hidden">
 {businessData?.photos?.[0] ? (
 <img src={typeof businessData.photos[0] === 'string' ? businessData.photos[0] : (businessData.photos[0] as any).url} alt={businessData.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
 ) : (
 <img src="https://images.unsplash.com/photo-1596752763261-2bc61e5ab663?auto=format&fit=crop&q=80&w=800" alt="Factory" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
 )}
 </div>
 <div className="flex flex-col gap-4 h-full w-full">
 <div className="bg-primary flex-1 overflow-hidden p-8 flex flex-col justify-between text-on-primary">
 <Store className="w-12 h-12 text-accent" />
 <div>
 <div className="text-4xl font-heading font-bold mb-2">{businessData?.experience || '+50'}</div>
 <div className="text-sm uppercase tracking-wider text-on-primary/70">Yıllık Tecrübe</div>
 </div>
 </div>
 <div className="bg-surface-hover flex-[2] overflow-hidden">
 {businessData?.photos?.[1] ? (
 <img src={typeof businessData.photos[1] === 'string' ? businessData.photos[1] : (businessData.photos[1] as any).url} alt={businessData.name} className="w-full h-full object-cover opacity-90" />
 ) : (
 <img src="https://images.unsplash.com/photo-1599643477874-a035a09b307d?auto=format&fit=crop&q=80&w=800" alt="Products" className="w-full h-full object-cover opacity-90" />
 )}
 </div>
 </div>
 </div>
 </div>
 </section>

 <section id="koleksiyon" className="w-full bg-surface-hover py-24 border-y border-border">
 <div className="max-w-[1440px] px-4 md:px-8 mx-auto">
 <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
 <h2 className="text-4xl md:text-5xl font-heading font-extrabold max-w-lg">Kategoriler</h2>
 <p className="max-w-md text-text-muted text-lg mt-6 md:mt-0 font-medium">Uzmanlık alanlarımız ve yüksek üretim kapasitemizle taleplerinizi sınırsızca karşılarız.</p>
 </div>
 
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border bg-surface">
 {(businessData?.services || []).map((srv: any, idx: number) => (
 <div key={idx} className={`p-10 border-border group hover:bg-primary hover:text-on-primary transition-colors duration-300 ${idx !== 2 ? 'border-r-0 lg:border-r border-b lg:border-b-0' : ''}`}>
 <div className="mb-8 w-16 h-16 bg-surface-hover group-hover:bg-primary flex items-center justify-center border border-border group-hover:border-accent">
 <Banknote className="w-8 h-8 text-primary group-hover:text-accent" strokeWidth={1.5} />
 </div>
 <h3 className="text-2xl font-heading font-bold mb-4">{srv.name}</h3>
 <p className="text-text-muted group-hover:text-on-primary/80 leading-relaxed font-medium">{srv.description}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 <section id="iletisim" className="w-full bg-primary text-on-primary">
 <div className="max-w-[1440px] px-4 md:px-8 py-32 mx-auto flex flex-col md:flex-row gap-16 md:gap-8 justify-between items-center">
 <div className="max-w-2xl">
 <h2 className="text-5xl md:text-6xl font-heading font-extrabold mb-8">Bize Katılın</h2>
 <p className="text-xl opacity-80 leading-relaxed font-light mb-12">Yılların tecrübesi ve bilgi birikimiyle size en iyi hizmeti sunmak için buradayız. İletişime geçmekten çekinmeyin.</p>
 <button className="px-10 py-5 bg-accent text-primary font-bold text-lg hover:bg-surface transition-colors uppercase tracking-widest flex items-center">
 Bize Ulaşın
 <ArrowUpRight className="w-5 h-5 ml-3" />
 </button>
 </div>
 <div className="w-full md:w-[400px] border border-border/20 p-8 bg-surface-hover/5 backdrop-blur-sm">
 <p className="text-sm uppercase tracking-widest text-accent mb-6 font-bold border-b border-border/20 pb-4">İletişim Bilgileri</p>
 <div className="space-y-4 font-mono text-lg">
 <p>{businessData?.address}</p>
 <p className="text-accent">{businessData?.phone}</p>
 <p>{businessData?.email}</p>
 </div>
 </div>
 </div>
 </section>
 </div>
 )
}

import { registerSection } from '../../registry/section-registry'
registerSection('hero', 'kuyumcu_ozel_full', KuyumcuOzelSections as unknown as React.ComponentType<any>)
