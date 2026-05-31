import React from 'react'
import { SectionConfig, BusinessData } from '../../types/section-types'
import { ArrowRight, Sparkles, MapPin, Phone, CheckCircle2 } from 'lucide-react'

// Katman 2 (Standart) - Kuyumcu Gümüş / Atölye
// Tasarım: 768px container limit, 30/70 & 50/50 Split layoutlar, 8px radius.
// Interaktif formlar, hover animasyonları, gümüş/antrasit tonları.

interface Props {
 sections: SectionConfig[]
 businessData: BusinessData
}

export const KuyumcuGumusSections = ({ business: businessData }: any) => {
 return (
 <div className="flex flex-col w-full items-center">
 <section id="hero" className="w-full bg-surface-muted overflow-hidden relative">
 <div className="max-w-[768px] mx-auto flex flex-col md:flex-row items-center min-h-[500px]">
 <div className="w-full md:w-[60%] p-8 md:pl-4 z-10 relative">
 {businessData?.district && (
 <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-bold tracking-widest rounded-full uppercase mb-4 inline-block">
 {businessData.district}
 </span>
 )}
 <h1 className="text-4xl lg:text-5xl font-heading font-bold text-text mb-4 leading-tight">
 {businessData?.name || 'Sizin İçin Şekil Alan Gümüş'}
 </h1>
 <p className="text-base text-text-secondary mb-8">
 {businessData?.slogan || 'Usta ellerden çıkan benzersiz tasarımlar.'}
 </p>
 <div>
 <a href="#iletisim" className="inline-flex items-center px-6 py-3 bg-primary text-on-primary rounded-btn font-semibold hover:bg-primary/90 transition-all shadow-md group">
 Sipariş Ver
 <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
 </a>
 </div>
 </div>
 <div className="w-full md:w-[40%] h-64 md:h-full flex items-center justify-center p-8">
 {businessData?.photos?.[0] ? (
 <img src={typeof businessData.photos[0] === 'string' ? businessData.photos[0] : businessData.photos[0]} alt={businessData.name} className="w-full h-full object-cover rounded-xl shadow-lg" />
 ) : (
 <div className="w-full h-full bg-surface rounded-xl shadow-lg flex items-center justify-center">
 <Sparkles className="w-16 h-16 text-accent/50" />
 </div>
 )}
 </div>
 </div>
 </section>

 <section id="koleksiyon" className="w-full max-w-[768px] px-4 py-16 mx-auto">
 <div className="text-center mb-12">
 <Sparkles className="w-6 h-6 text-accent mx-auto mb-3" />
 <h2 className="text-3xl font-heading font-bold text-text">Öne Çıkan Parçalar</h2>
 <div className="w-16 h-1 bg-border mx-auto mt-4"></div>
 </div>
 <div className="space-y-6">
 {(businessData?.services || []).map((srv: any, idx: number) => (
 <div key={idx} className="flex items-start bg-surface p-6 rounded-card border border-border shadow-sm hover:shadow-md transition-shadow">
 <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center shrink-0 border border-accent/20">
 <span className="text-accent font-heading font-bold font-serif italic text-lg">{idx + 1}</span>
 </div>
 <div className="ml-5">
 <h3 className="text-xl font-bold text-text mb-1">{srv.name}</h3>
 <p className="text-sm text-text-secondary">{srv.description}</p>
 </div>
 </div>
 ))}
 </div>
 </section>

 <section id="iletisim" className="w-full max-w-[768px] px-4 py-16 mx-auto">
 <div className="flex flex-col md:flex-row gap-8 bg-surface-muted rounded-card overflow-hidden border border-border shadow-sm">
 <div className="w-full md:w-1/2 p-8 bg-primary text-on-primary">
 <h2 className="text-2xl font-heading font-bold mb-4">Sipariş</h2>
 <p className="opacity-80 text-sm mb-8 leading-relaxed max-w-sm">Size özel tasarımlar ve fiyatlandırma için bizimle iletişime geçebilirsiniz.</p>
 <div className="space-y-4">
 <div className="flex items-center text-sm">
 <MapPin className="w-4 h-4 mr-3 opacity-70" />
 <span>{businessData?.address}</span>
 </div>
 <div className="flex items-center text-sm">
 <Phone className="w-4 h-4 mr-3 opacity-70" />
 <span className="font-semibold">{businessData?.phone}</span>
 </div>
 </div>
 </div>
 <div className="w-full md:w-1/2 p-8 bg-surface">
 <form className="space-y-4">
 <div>
 <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1 block">Ad Soyad</label>
 <input type="text" className="w-full bg-bg border border-border p-2.5 rounded focus:border-accent text-sm outline-none transition-colors" />
 </div>
 <div>
 <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1 block">Notunuz</label>
 <textarea rows={3} className="w-full bg-bg border border-border p-2.5 rounded focus:border-accent text-sm outline-none transition-colors" />
 </div>
 <button type="button" className="w-full bg-accent text-on-accent font-bold py-3 rounded-btn shadow hover:bg-accent/90 transition-colors">
 Gönder
 </button>
 </form>
 </div>
 </div>
 </section>
 </div>
 )
}

import { registerSection } from '../../registry/section-registry'
registerSection('hero', 'kuyumcu_gumus_full', KuyumcuGumusSections as unknown as React.ComponentType<any>)
