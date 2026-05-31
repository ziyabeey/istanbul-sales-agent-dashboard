'use client'

import React, { useState, useEffect } from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { Phone, MapPin, ArrowRight, Activity, Calendar, Award } from 'lucide-react'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function DoktorTrustSections({ config, businessData }: Props) {
 const [mounted, setMounted] = useState(false)

 useEffect(() => {
 setMounted(true)
 }, [])

 if (!mounted) return null

 return (
 <div className="min-h-screen bg-[var(--color-bg)] font-body text-[var(--color-text)] selection:bg-[var(--color-accent-light)] selection:text-[var(--color-accent-hover)]">
 <div className="max-w-[var(--container-default,640px)] mx-auto px-4 py-8 space-y-8">
 
 {/* HEADER / BIO GÖRSELİ */}
 <div className="relative h-64 w-full bg-[var(--color-surface-muted)] rounded-[var(--radius-card)] overflow-hidden">
 {businessData.photos?.[0] ? (
 <img 
 src={typeof businessData.photos[0] === 'string' ? businessData.photos[0] : (businessData.photos[0] as any).url || businessData.photos[0]} 
 alt={businessData?.ownerName as string}
 className="w-full h-full object-cover object-center"
 />
 ) : (
 <div className="w-full h-full flex flex-col items-center justify-center text-[var(--color-accent)] opacity-50 bg-[var(--color-surface-elevated)]">
 <Activity size={48} className="mb-2" />
 <span className="font-heading font-medium tracking-wide">TRUST KLİNİK</span>
 </div>
 )}
 
 {/* Badge */}
 <div className="absolute top-4 left-4 bg-[var(--color-surface)]/90 backdrop-blur-sm px-3 py-1.5 rounded-[var(--radius-btn)] text-xs font-bold text-[var(--color-accent)] flex items-center gap-1.5 shadow-sm">
 <Award size={14} /> T.C. Sağlık Bakanlığı Onaylı
 </div>
 </div>

 {/* BİLGİ KARTI */}
 <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-card)] p-6 md:p-8 text-center shadow-sm">
 <h1 className="font-heading text-3xl font-bold text-[var(--color-text)] mb-2">
 {businessData.name}
 </h1>
 <p className="text-[var(--color-text-secondary)] font-medium mb-4">
 {businessData?.ownerName as string}
 </p>
 <div className="text-[var(--color-text-muted)] text-sm italic mb-6">
 "{businessData.slogan}"
 </div>

 <div className="flex flex-col gap-3">
 <a href={`tel:${businessData.phoneClean}`} className="flex items-center justify-center gap-2 w-full bg-[var(--color-accent)] text-[var(--color-text-on-accent)] py-3 px-4 rounded-[var(--radius-btn)] font-semibold hover:bg-[var(--color-accent-hover)] transition-colors text-sm shadow-sm">
 <Phone size={18} />
 {businessData.phone}
 </a>
 <a href={`https://wa.me/${businessData.whatsapp}?text=Randevu almak istiyorum.`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] py-3 px-4 rounded-[var(--radius-btn)] font-medium hover:bg-gray-50 transition-colors text-sm">
 <Calendar size={18} className="text-[var(--color-accent)]" />
 Online Randevu
 </a>
 </div>
 </div>

 {/* HİZMETLER LISTESİ (Tek Sütun) */}
 <div className="space-y-4">
 <h2 className="font-heading text-xl font-bold text-[var(--color-text)] px-2">Hizmetlerimiz</h2>
 <div className="flex flex-col gap-3">
 {businessData.services?.map((service: any, idx: number) => (
 <div key={idx} className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-[var(--radius-card)] p-4 flex items-start gap-4 hover:border-[var(--color-accent)] transition-colors cursor-pointer group shadow-sm">
 <div className="w-10 h-10 rounded-[var(--radius-btn)] bg-[var(--color-surface)] text-[var(--color-accent)] flex items-center justify-center shrink-0 border border-[var(--color-border-subtle)]">
 <Activity size={20} />
 </div>
 <div className="flex-grow">
 <div className="flex justify-between items-start mb-1">
 <h3 className="font-heading font-bold text-[var(--color-text)] text-sm group-hover:text-[var(--color-accent)] transition-colors">
 {service.name}
 </h3>
 </div>
 <p className="text-[var(--color-text-secondary)] text-xs leading-relaxed">
 Güvenli ve temiz bir ortamda profesyonel sağlık hizmeti.
 </p>
 </div>
 <div className="text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 flex items-center justify-center h-full">
 <ArrowRight size={18} />
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* ÇALIŞMA SAATLERİ & İLETİŞİM */}
 <div className="bg-[var(--color-surface-muted)] rounded-[var(--radius-card)] p-6 text-sm border border-[var(--color-border)]">
 <div className="flex items-start gap-3 text-[var(--color-text-secondary)] mb-6 pb-6 border-b border-[var(--color-border-subtle)]">
 <MapPin size={20} className="text-[var(--color-accent)] shrink-0" />
 <span className="leading-relaxed font-medium">{businessData.address}</span>
 </div>

 <div>
 <div className="font-heading font-bold text-[var(--color-text)] mb-3 flex items-center gap-2">
 <Calendar size={16} className="text-[var(--color-accent)]" /> Çalışma Saatleri
 </div>
 <div className="flex flex-col gap-2">
 {businessData.workingHours?.filter(w => w.open).slice(0,3).map((wh, idx) => (
 <div key={idx} className="flex justify-between text-[var(--color-text-secondary)] py-1 border-b border-[var(--color-border-subtle)] last:border-0 border-dashed">
 <span className="font-medium">{wh.dayTr}</span>
 <span>{wh.open} - {wh.close}</span>
 </div>
 ))}
 <div className="text-center text-xs font-semibold text-[var(--color-accent)] mt-2 cursor-pointer hover:underline">
 Tüm saatleri göster
 </div>
 </div>
 </div>
 </div>

 {/* FOOTER */}
 <div className="text-center text-xs text-[var(--color-text-muted)] pt-8 pb-4">
 © {new Date().getFullYear()} {businessData.name}. Tüm hakları saklıdır.
 </div>
 
 </div>
 </div>
 )
}
