import React from 'react'
import { SectionConfig, BusinessData } from '../../types/section-types'
import { MapPin, Phone, Mail, Check, ArrowRight, Coins, DollarSign } from 'lucide-react'

// Katman 1 (Temel) - Kuyumcu Altın
// Tasarım: 640px container limit, tek sütun odaklı, okunaklı büyük metinler, gold renk detayları.

interface Props {
 sections: SectionConfig[]
 businessData: BusinessData
}

export const KuyumcuAltinSections = ({ business: businessData }: any) => {
 return (
 <div className="flex flex-col w-full items-center justify-center space-y-8 pb-12">
 <section id="hero" className="w-full max-w-[640px] px-4 pt-12 pb-8 text-center bg-surface border-b border-border">
 {businessData?.district && (
 <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-bold tracking-widest rounded mb-4 uppercase">
 {businessData.district}
 </span>
 )}
 <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-primary mb-4 leading-tight">
 {businessData?.name || 'Güvenin Altın Adresi'}
 </h1>
 <p className="text-base text-text-muted mb-8 leading-relaxed max-w-sm mx-auto">
 {businessData?.slogan || 'Güncel, şeffaf ve güvenilir fiyatlar.'}
 </p>
 <div className="flex justify-center flex-col sm:flex-row gap-3">
 <a href="#iletisim" className="w-full sm:w-auto px-6 py-3 bg-accent text-on-accent font-semibold rounded shadow-md hover:bg-accent/90 transition-colors flex items-center justify-center group">
 İletişim <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
 </a>
 </div>
 </section>

 <section id="hizmetler" className="w-full max-w-[640px] px-4 py-8 bg-surface border-y border-border">
 <h2 className="text-2xl font-heading font-bold text-primary text-center mb-8">Hizmetlerimiz</h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {(businessData?.services || []).map((srv: any, idx: number) => (
 <div key={idx} className="p-4 bg-bg border border-border rounded text-center flex flex-col items-center justify-center">
 <div className="w-10 h-10 mx-auto bg-accent/10 text-accent flex items-center justify-center rounded-full mb-3 text-xl">
 {srv.icon || '💎'}
 </div>
 <h3 className="font-bold text-text mb-1">{srv.name}</h3>
 <p className="text-xs text-text-muted">{srv.description || 'Detaylar için ulaşın.'}</p>
 </div>
 ))}
 </div>
 </section>

 <section id="iletisim" className="w-full max-w-[640px] px-4 py-8">
 <div className="bg-surface border border-border rounded p-6 shadow-sm">
 <h2 className="text-xl font-heading font-bold text-primary mb-6 text-center">İletişim</h2>
 <div className="space-y-4">
 <div className="flex items-center p-3 bg-bg rounded border border-border">
 <MapPin className="w-5 h-5 text-accent mr-4 shrink-0" />
 <p className="text-sm font-medium text-text">{businessData?.address}</p>
 </div>
 <div className="flex items-center p-3 bg-bg rounded border border-border">
 <Phone className="w-5 h-5 text-accent mr-4 shrink-0" />
 <p className="text-sm font-bold text-primary">{businessData?.phone}</p>
 </div>
 <div className="flex items-center p-3 bg-bg rounded border border-border">
 <Mail className="w-5 h-5 text-accent mr-4 shrink-0" />
 <p className="text-sm font-medium text-text">{businessData?.email}</p>
 </div>
 </div>
 </div>
 </section>
 </div>
 )
}

import { registerSection } from '../../registry/section-registry'
registerSection('hero', 'kuyumcu_altin_full', KuyumcuAltinSections as unknown as React.ComponentType<any>)
