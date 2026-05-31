'use client'

import React, { useState, useEffect } from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { Phone, MapPin, Calendar, Clock, ChevronRight, User, Shield, Scale, ChevronDown, Mail, HeartHandshake } from 'lucide-react'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function AvukatAileSections({ business: businessData }: any) {
 const [mounted, setMounted] = useState(false)
 const [activeFaq, setActiveFaq] = useState<number | null>(0)

 useEffect(() => {
 setMounted(true)
 }, [])

 if (!mounted) return null

 const faqs = [
 { q: 'Anlaşmalı boşanma davası ne kadar sürer?', a: 'Anlaşmalı boşanma davaları, tarafların protokolde mutabık kalması halinde tek celsede, ortalama 1-2 ay içerisinde sonuçlanmaktadır.' },
 { q: 'Çocuğun velayeti kime verilir?', a: 'Velayet kararlarında "çocuğun üstün yararı" gözetilir. Çocuğun yaşı, bakım ihtiyacı ve ebeveynlerin durumu detaylıca incelenerek karar verilir.' },
 { q: 'Nafaka miktarı nasıl belirlenir?', a: 'Nafaka miktarı, tarafların sosyal ve ekonomik durumları, kusur oranları ve ihtiyaçlar göz önünde bulundurularak hakim tarafından takdir edilir.' }
 ]

 return (
 <div className="min-h-screen bg-[var(--color-bg)] font-body text-[var(--color-text)] selection:bg-[var(--color-surface-muted)] selection:text-[var(--color-accent)]">
 
 {/* HEADER - Standart Tier Prominent Header */}
 <header className="bg-[var(--color-surface-elevated)] border-b border-[var(--color-border)] sticky top-0 z-50 shadow-sm">
 <div className="max-w-[var(--container-default,960px)] mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
 <div className="flex flex-col">
 <span className="font-heading font-bold text-xl md:text-2xl text-[var(--color-accent)]">{businessData.name}</span>
 <span className="text-xs text-[var(--color-text-secondary)] font-medium tracking-wide hidden sm:block">{businessData.slogan}</span>
 </div>
 <div className="flex items-center gap-4">
 <div className="hidden md:flex flex-col items-end mr-4">
 <span className="text-sm font-bold text-[var(--color-text)] flex items-center gap-2">
 <Phone size={14} className="text-[var(--color-accent)]" /> {businessData.phone}
 </span>
 <span className="text-xs text-[var(--color-text-muted)] font-medium">Hukuki Danışmanlık</span>
 </div>
 <a href={`tel:${businessData.phoneClean}`} className="bg-[var(--color-accent)] text-[var(--color-text-on-accent)] px-5 py-2.5 rounded-[var(--radius-btn)] font-semibold text-sm hover:bg-[var(--color-accent-hover)] transition-all shadow hover:shadow-md">
 Hemen Ara
 </a>
 </div>
 </div>
 </header>

 <main className="max-w-[var(--container-default,960px)] mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col md:flex-row gap-8 items-start">
 
 {/* 30% STICKY SIDEBAR */}
 <aside className="w-full md:w-[320px] shrink-0 space-y-6 md:sticky top-[100px]">
 
 {/* Hekim/Avukat Profili Kartı */}
 <div className="bg-[var(--color-surface-elevated)] rounded-[var(--radius-card)] overflow-hidden border border-[var(--color-border)] shadow-sm">
 <div className="aspect-square w-full bg-[var(--color-surface)] relative border-b border-[var(--color-border)]">
 {businessData.photos && businessData.photos.length > 0 ? (
 <img src={typeof businessData.photos[0] === 'string' ? businessData.photos[0] : (businessData.photos[0] as any).url || businessData.photos[0]} alt={businessData?.ownerName as string} className="w-full h-full object-cover" />
 ) : (
 <div className="w-full h-full flex items-center justify-center text-[var(--color-text-muted)]">
 <User size={64} className="opacity-20" />
 </div>
 )}
 {/* Güven Rozeti */}
 <div className="absolute bottom-4 right-4 bg-white p-2.5 rounded-full shadow-md text-[var(--color-accent)] hint--top" aria-label="Kayıtlı Baro Avukatı">
 <Shield size={20} />
 </div>
 </div>
 <div className="p-6">
 <h2 className="font-heading font-bold text-2xl text-[var(--color-text)] mb-1">{businessData?.ownerName as string}</h2>
 <div className="text-[var(--color-accent)] font-bold text-sm mb-4 bg-[var(--color-surface)] inline-block px-2.5 py-1 rounded-md">{businessData.team?.[0]?.role || 'Aile Hukuku Uzmanı'}</div>
 <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] mb-2 font-medium">
 <Scale size={16} className="text-[var(--color-text-muted)]" /> {businessData.experience || '12+ Yıl'} Hukuki Tecrübe
 </div>
 <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] mb-6 font-medium">
 <HeartHandshake size={16} className="text-[var(--color-text-muted)]" /> Çözüm Odaklı Yaklaşım
 </div>
 <a href={`https://wa.me/${businessData.whatsapp}?text=Merhaba, aile hukuku konusunda danışmak istiyorum.`} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 border-2 border-[var(--color-accent)] text-[var(--color-accent)] py-2.5 rounded-[var(--radius-btn)] font-bold text-sm hover:bg-[var(--color-accent)] hover:text-white transition-all shadow-sm">
 WhatsApp ile Ulaşın
 </a>
 </div>
 </div>

 {/* Çalışma Saatleri */}
 <div className="bg-[var(--color-surface-elevated)] rounded-[var(--radius-card)] p-6 border border-[var(--color-border)] shadow-sm">
 <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2 text-[var(--color-text)]">
 <Clock size={18} className="text-[var(--color-accent)]" /> Çalışma Saatleri
 </h3>
 <div className="space-y-3 text-sm">
 {businessData.workingHours?.filter(w => w.open).map((wh, idx) => (
 <div key={idx} className="flex justify-between items-center text-[var(--color-text-secondary)] border-b border-[var(--color-border)]/60 pb-2 last:border-0 last:pb-0 border-dashed">
 <span className="font-semibold">{wh.dayTr}</span>
 <span className="font-mono bg-[var(--color-surface)] border border-[var(--color-border)] px-2 py-0.5 rounded text-[var(--color-text)]">{wh.open} - {wh.close}</span>
 </div>
 ))}
 </div>
 </div>
 </aside>

 {/* 70% MAIN CONTENT AREA */}
 <div className="flex-1 space-y-12 min-w-0">
 
 {/* Hakkımızda */}
 <section>
 <h2 className="font-heading text-3xl font-bold text-[var(--color-text)] mb-6 tracking-tight">Hukuki Süreçte Yanınızdayız</h2>
 <div className="prose prose-p:text-[var(--color-text-secondary)] prose-p:leading-relaxed prose-p:mb-5 max-w-none prose-p:font-medium text-justify md:text-left">
 <p>
 {businessData.name}, aile hukuku alanında uzmanlaşmış yapısıyla, boşanma, velayet, nafaka ve mal paylaşımı gibi zorlu süreçlerde müvekkillerine güvenilir ve gizlilik odaklı hukuki danışmanlık hizmeti sunmaktadır.
 </p>
 <p>
 Amacımız, hassas aile dinamiklerini gözeterek, hukuki uyuşmazlıkları en hızlı ve adil şekilde çözüme kavuşturmak, bu zorlu dönemde haklarınızı en güçlü şekilde savunmaktır.
 </p>
 </div>
 </section>

 {/* Hizmetler Grid (Standart Tier: Listeli & Düzenli) */}
 <section>
 <div className="flex justify-between items-end mb-6">
 <h2 className="font-heading text-2xl font-bold text-[var(--color-text)]">Uzmanlık Alanlarımız</h2>
 <a href={`tel:${businessData.phoneClean}`} className="text-sm font-bold text-[var(--color-accent)] hover:underline flex items-center gap-1">Danışmanlık Alın <ChevronRight size={16} /></a>
 </div>
 
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {businessData.services?.map((service: any, idx: number) => (
 <div key={idx} className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] p-4 md:p-5 rounded-[var(--radius-card)] hover:shadow-md hover:border-[var(--color-accent)]/50 transition-all group cursor-pointer flex flex-col md:flex-row gap-4 md:items-center">
 <div className="w-12 h-12 rounded-xl bg-[var(--color-surface)] text-[var(--color-accent)] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[var(--color-accent)] group-hover:text-white transition-all shadow-sm">
 {service.icon ? <span className="text-xl">{service.icon}</span> : <Scale size={24} />}
 </div>
 <div>
 <h3 className="font-heading font-bold text-[var(--color-text)] text-[15px] mb-1 group-hover:text-[var(--color-accent)] transition-colors">{service.name}</h3>
 <p className="text-xs text-[var(--color-text-muted)] font-semibold">{service.price ? `${service.price}` : 'Gizlilik esastır'}</p>
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* SSS Akordeon */}
 <section className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-card)] p-6 md:p-8 shadow-sm">
 <div className="flex items-center gap-3 mb-6">
 <Shield size={24} className="text-[var(--color-accent)]" />
 <h2 className="font-heading text-2xl font-bold text-[var(--color-text)] tracking-tight">Sıkça Sorulan Sorular</h2>
 </div>
 <div className="space-y-3">
 {faqs.map((faq, idx) => (
 <div key={idx} className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-xl overflow-hidden hover:shadow-sm transition-shadow">
 <button 
 onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
 className="w-full text-left p-4 md:p-5 flex justify-between items-center font-heading font-bold text-[15px] text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors focus:outline-none"
 >
 <span>{faq.q}</span>
 <ChevronDown size={20} className={`text-[var(--color-text-muted)] transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-[var(--color-accent)]' : ''}`} />
 </button>
 <div className={`px-4 md:px-5 pb-5 text-sm text-[var(--color-text-secondary)] font-medium leading-relaxed transition-all duration-300 origin-top overflow-hidden ${activeFaq === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 pb-0'}`}>
 {faq.a}
 </div>
 </div>
 ))}
 </div>
 </section>

 </div>
 </main>
 
 {/* FOOTER */}
 <footer className="bg-[#0f172a] text-white pt-16 pb-8 border-t-4 border-[var(--color-accent)]">
 <div className="max-w-[var(--container-default,960px)] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
 <div>
 <h3 className="font-heading font-bold text-xl mb-4 text-white flex items-center gap-2">
 <Scale size={20} className="text-[var(--color-accent)]"/> {businessData.name}
 </h3>
 <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">{businessData.slogan}</p>
 </div>
 <div>
 <h4 className="font-heading font-bold tracking-wide mb-4 text-white uppercase text-sm">İletişim</h4>
 <div className="space-y-4 text-sm text-slate-300 font-medium">
 <div className="flex items-start gap-3">
 <MapPin size={18} className="text-[var(--color-accent)] mt-0.5 shrink-0" />
 <span className="leading-relaxed">{businessData.address}</span>
 </div>
 <div className="flex items-center gap-3">
 <Phone size={18} className="text-[var(--color-accent)] shrink-0" />
 <span>{businessData.phone}</span>
 </div>
 <div className="flex items-center gap-3">
 <Mail size={18} className="text-[var(--color-accent)] shrink-0" />
 <span>{businessData.email}</span>
 </div>
 </div>
 </div>
 <div>
 <h4 className="font-heading font-bold tracking-wide mb-4 text-white uppercase text-sm">Hızlı Linkler</h4>
 <ul className="space-y-3 text-sm text-slate-300 font-medium">
 <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-[var(--color-accent)]" /> Gizlilik Politikası</a></li>
 <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-[var(--color-accent)]" /> KVKK Aydınlatma Metni</a></li>
 <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-[var(--color-accent)]" /> Vekaletname Bilgileri</a></li>
 </ul>
 </div>
 </div>
 <div className="max-w-[var(--container-default,960px)] mx-auto px-4 md:px-8 pt-8 border-t border-slate-800/80 text-center text-xs font-medium text-slate-500">
 © {new Date().getFullYear()} {businessData.name}. Tüm hakları saklıdır.
 </div>
 </footer>

 </div>
 )
}

import { registerSection } from '../../registry/section-registry'
registerSection('hero', 'avukat_aile_full', AvukatAileSections as unknown as React.ComponentType<any>)
