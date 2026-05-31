'use client'

import React from 'react'
import { ThemeConfig, BusinessData, SectionProps } from '../../types/section-types'
import { Phone, MapPin, Navigation, Clock, AlertCircle } from 'lucide-react'
import { registerSection } from '../../registry/section-registry'
import type { ComponentType } from 'react'

export function EczaneNobetciFull({ business: businessData }: SectionProps<any>) {
 // Free Tier - Brutalist / Functional Layout (Emergency Pharmacy)
 
 return (
 <div className="font-body bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen pb-10">
 {/* Container max-w-md to emulate mobile-first functional app */}
 <div className="w-full max-w-md mx-auto bg-white min-h-screen shadow-2xl relative border-x border-[var(--color-border)]">
 
 {/* TOP ALERT BAR */}
 <div className="bg-[var(--color-accent)] text-white text-center py-2 text-xs font-bold tracking-widest uppercase animate-pulse">
 Şu An Nöbetçi / AÇIK
 </div>

 {/* HERO / STATUS */}
 <div className="p-6 border-b-4 border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col items-center text-center">
 <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-sm border border-[var(--color-border)]">
 💊
 </div>
 <h1 className="font-heading text-3xl font-extrabold text-[var(--color-text)] mb-1 tracking-tight">
 {businessData.name}
 </h1>
 <p className="text-[var(--color-text-secondary)] font-bold mb-6 text-sm flex items-center gap-2 justify-center">
 <span className="w-3 h-3 bg-red-600 rounded-full animate-ping absolute"></span>
 <span className="w-3 h-3 bg-red-600 rounded-full relative z-10"></span>
 Açık (7/24 Kesintisiz)
 </p>

 {/* HUGE CALL BUTTON */}
 <a href={`tel:${businessData.phoneClean}`} className="w-full bg-[var(--color-accent)] text-white py-5 rounded-2xl flex items-center justify-center gap-3 shadow-[0_4px_0_rgb(153,27,27)] active:translate-y-1 active:shadow-none transition-all cursor-pointer">
 <Phone size={28} className="animate-bounce" />
 <span className="text-2xl font-black tracking-wider">{businessData.phone}</span>
 </a>
 </div>

 {/* FAST ACTION CARDS */}
 <div className="p-6 grid grid-cols-2 gap-4 border-b-4 border-[var(--color-border)] pb-8 bg-white">
 <div className="bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2">
 <Clock size={24} className="text-[var(--color-accent)]"/>
 <span className="font-bold text-sm text-[var(--color-text-secondary)]">24 Saat Açık</span>
 </div>
 <a href={`https://wa.me/${businessData.whatsapp}?text=Acil%20ilaç%20sorgulama`} className="bg-[#25D366]/10 border-2 border-[#25D366] p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 text-[#25D366] hover:bg-[#25D366]/20 transition-colors">
 <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
 <span className="font-bold text-sm">İlaç Sor / Gönder</span>
 </a>
 </div>

 {/* MAP & ADDRESS */}
 <div className="p-6 bg-[var(--color-surface)]">
 <h2 className="font-black text-xl mb-4 flex items-center gap-2 text-[var(--color-text)]">
 <MapPin className="text-[var(--color-accent)]"/> Konum
 </h2>
 
 <div className="bg-white border-2 border-[var(--color-border)] p-4 rounded-xl mb-4 shadow-sm">
 <p className="font-bold text-lg mb-1 leading-snug text-[var(--color-text)]">{businessData.address}</p>
 <p className="text-sm font-semibold text-[var(--color-accent)]">{businessData.district}, {businessData.city}</p>
 </div>

 <a href={`https://maps.google.com/?q=${businessData.coordinates?.lat},${businessData.coordinates?.lng}`} target="_blank" rel="noreferrer" className="w-full bg-[#4285F4] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_0_rgb(21,101,192)] active:translate-y-1 active:shadow-none transition-all cursor-pointer">
 <Navigation size={20}/> Haritada Yol Tarifi Al
 </a>
 </div>

 {/* INFO ALERT */}
 <div className="p-6 bg-white border-t border-[var(--color-border)]">
 <div className="bg-amber-100 border-l-4 border-amber-500 p-4 rounded-r-lg flex gap-3 text-amber-900">
 <AlertCircle size={24} className="shrink-0"/>
 <p className="text-sm font-semibold leading-relaxed">
 Nöbetçi olduğumuz günlerde reçeteli ilaçlarınız için lütfen TC Kimlik kartınızı ve varsa reçete numaranızı yanınızda bulundurun.
 </p>
 </div>
 </div>

 {/* COMPACT FOOTER */}
 <footer className="text-center py-6 bg-gray-50 border-t border-[var(--color-border)]">
 <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{businessData.name}</p>
 <p className="text-[10px] text-gray-400 mt-1 font-semibold">{businessData?.ownerName as string} - Diploma No: 12345</p>
 </footer>
 </div>
 </div>
 )
}
