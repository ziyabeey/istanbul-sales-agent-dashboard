'use client'

import React, { useState, useEffect } from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { Phone, MapPin, Scale, Briefcase, ChevronRight, MessageSquare, Clock } from 'lucide-react'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function AvukatAdaletSections({ business: businessData }: any) {
 const [mounted, setMounted] = useState(false)

 useEffect(() => {
 setMounted(true)
 }, [])

 if (!mounted) return null

 return (
 <div className="min-h-screen bg-[var(--color-bg)] font-body text-[var(--color-text)] selection:bg-[var(--color-surface-muted)] selection:text-[var(--color-accent)]">
 <div className="max-w-[var(--container-default,640px)] mx-auto px-4 py-8 space-y-8">
 
 {/* HEADER / BIO GÖRSELİ */}
 <div className="relative h-64 w-full bg-[var(--color-surface)] rounded-[var(--radius-card)] overflow-hidden border border-[var(--color-border)]">
 {businessData.photos?.[0] ? (
 <img 
 src={typeof businessData.photos[0] === 'string' ? businessData.photos[0] : (businessData.photos[0] as any).url || businessData.photos[0]} 
 alt={businessData?.ownerName as string}
 className="w-full h-full object-cover object-top"
 />
 ) : (
 <div className="w-full h-full flex flex-col items-center justify-center text-[var(--color-accent)] opacity-60 bg-[var(--color-surface-muted)]">
 <Scale size={48} className="mb-3 opacity-80" />
 <span className="font-heading font-bold tracking-widest uppercase text-sm">{businessData.name}</span>
 </div>
 )}
 
 {/* Badge */}
 <div className="absolute top-4 left-4 bg-[var(--color-surface-elevated)]/95 backdrop-blur-md px-3 py-1.5 rounded-[var(--radius-btn)] text-xs font-bold text-[var(--color-accent)] flex items-center gap-1.5 shadow-sm border border-[var(--color-border)]">
 <Briefcase size={14} /> Baro Sicil No: 12345
 </div>
 </div>

 {/* BİLGİ KARTI */}
 <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-[var(--radius-card)] p-6 md:p-8 text-center shadow-sm">
 <h1 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-2 tracking-tight">
 {businessData.name}
 </h1>
 <p className="text-[var(--color-text-secondary)] font-medium mb-3 text-lg">
 {businessData?.ownerName as string}
 </p>
 <div className="text-[var(--color-text-muted)] text-sm italic mb-6">
 "{businessData.slogan}"
 </div>

 <div className="flex flex-col gap-3">
 <a href={`tel:${businessData.phoneClean}`} className="flex items-center justify-center gap-2 w-full bg-[var(--color-accent)] text-[var(--color-text-on-accent)] py-3.5 px-4 rounded-[var(--radius-btn)] font-semibold hover:bg-[var(--color-accent-hover)] transition-all active:scale-[0.98] text-sm shadow-md shadow-[var(--color-accent)]/20">
 <Phone size={18} />
 Hemen Ara: {businessData.phone}
 </a>
 <a href={`https://wa.me/${businessData.whatsapp}?text=Hukuki danışmanlık almak istiyorum.`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-[#25D366]/10 text-[#075E54] border border-[#25D366]/30 py-3.5 px-4 rounded-[var(--radius-btn)] font-semibold hover:bg-[#25D366]/20 transition-all active:scale-[0.98] text-sm">
 <MessageSquare size={18} />
 WhatsApp Danışma Hattı
 </a>
 </div>
 </div>

 {/* HİZMETLER LISTESİ (Tek Sütun) */}
 <div className="space-y-4">
 <h2 className="font-heading text-xl font-bold text-[var(--color-text)] px-2 flex items-center gap-2">
 <Scale size={20} className="text-[var(--color-accent)]"/> Uzmanlık Alanları
 </h2>
 <div className="flex flex-col gap-3">
 {businessData.services?.map((service: any, idx: number) => (
 <div key={idx} className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-[var(--radius-card)] p-4 flex items-start gap-4 hover:border-[var(--color-accent)] transition-all cursor-pointer group shadow-sm hover:shadow-md">
 <div className="w-12 h-12 rounded-[var(--radius-btn)] bg-[var(--color-surface-muted)] text-[var(--color-accent)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-text-on-accent)] transition-colors">
 {idx === 0 ? <Scale size={22} /> : idx === 1 ? <Briefcase size={22} /> : <MessageSquare size={22} />}
 </div>
 <div className="flex-grow pt-1">
 <h3 className="font-heading font-bold text-[var(--color-text)] text-[15px] group-hover:text-[var(--color-accent)] transition-colors mb-1">
 {service.name}
 </h3>
 <p className="text-[var(--color-text-muted)] text-xs leading-relaxed line-clamp-2">
 {service.name} alanında profesyonel hukuki danışmanlık ve dava takibi süreçlerini titizlikle yürütüyoruz.
 </p>
 </div>
 <div className="text-[var(--color-border)] group-hover:text-[var(--color-accent)] transition-colors shrink-0 flex items-center justify-center h-full pt-3">
 <ChevronRight size={20} />
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* ÇALIŞMA SAATLERİ & İLETİŞİM */}
 <div className="bg-[var(--color-surface-elevated)] rounded-[var(--radius-card)] p-6 md:p-8 text-sm border border-[var(--color-border)] shadow-sm">
 <div className="flex items-start gap-3 justify-center text-center text-[var(--color-text-secondary)] mb-6 pb-6 border-b border-[var(--color-border)]">
 <span className="leading-relaxed font-medium">{businessData.address}</span>
 </div>

 <div>
 <div className="font-heading font-bold text-[var(--color-text)] mb-4 flex items-center justify-center gap-2 text-base">
 <Clock size={18} className="text-[var(--color-accent)]" /> Çalışma Saatleri
 </div>
 <div className="flex flex-col gap-2 max-w-sm mx-auto">
 {businessData.workingHours?.filter(w => w.open).slice(0, 5).map((wh, idx) => (
 <div key={idx} className="flex justify-between text-[var(--color-text-muted)] py-1.5 border-b border-[var(--color-border)]/50 last:border-0 border-dashed">
 <span className="font-medium">{wh.dayTr}</span>
 <span className="text-[var(--color-text-secondary)]">{wh.open} - {wh.close}</span>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* FOOTER */}
 <div className="text-center text-xs text-[var(--color-text-muted)] pt-8 pb-6 font-medium">
 © {new Date().getFullYear()} {businessData.name}. Tüm hakları saklıdır.
 </div>
 
 </div>
 </div>
 )
}

import { registerSection } from '../../registry/section-registry'
registerSection('hero', 'avukat_adalet_full', AvukatAdaletSections as unknown as React.ComponentType<any>)
