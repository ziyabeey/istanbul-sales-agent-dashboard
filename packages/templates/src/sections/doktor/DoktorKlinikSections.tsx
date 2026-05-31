'use client'

import React, { useState, useEffect } from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { Phone, MapPin, Calendar, Clock, ChevronRight, User, Shield, Stethoscope, ChevronDown, Mail, Activity } from 'lucide-react'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function DoktorKlinikSections({ config, businessData }: Props) {
 const [mounted, setMounted] = useState(false)
 const [activeFaq, setActiveFaq] = useState<number | null>(0)

 useEffect(() => {
 setMounted(true)
 }, [])

 if (!mounted) return null

 const faqs = [
 { q: 'Muayene ücretleri ne kadar?', a: 'Muayene ücretlerimiz branşa göre değişiklik göstermektedir. Detaylı bilgi için kliniğimizi arayabilirsiniz.' },
 { q: 'SGK ve özel sağlık sigortası geçerli mi?', a: 'Evet, SGK ve anlaşmalı olduğumuz özel sağlık sigortaları kurumumuzda geçerlidir.' },
 { q: 'Randevu saatime ne kadar önce gelmeliyim?', a: 'Kayıt işlemlerinizin tamamlanabilmesi için randevu saatinizden 15 dakika önce kliniğimizde olmanızı rica ederiz.' }
 ]

 return (
 <div className="min-h-screen bg-[var(--color-bg)] font-body text-[var(--color-text)] selection:bg-[var(--color-accent-light)] selection:text-[var(--color-accent-hover)]">
 
 {/* HEADER - Standart Tier Prominent Header */}
 <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] sticky top-0 z-50">
 <div className="max-w-[var(--container-default,960px)] mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
 <div className="flex flex-col">
 <span className="font-heading font-bold text-xl md:text-2xl text-[var(--color-accent)]">{businessData.name}</span>
 <span className="text-xs text-[var(--color-text-secondary)] tracking-wide hidden sm:block">{businessData.slogan}</span>
 </div>
 <div className="flex items-center gap-4">
 <div className="hidden md:flex flex-col items-end mr-4">
 <span className="text-sm font-semibold text-[var(--color-text)] flex items-center gap-2"><Phone size={14} className="text-[var(--color-accent)]" /> {businessData.phone}</span>
 <span className="text-xs text-[var(--color-text-muted)]">7/24 Çağrı Merkezi</span>
 </div>
 <a href="#randevu" className="bg-[var(--color-accent)] text-[var(--color-text-on-accent)] px-5 py-2.5 rounded-[var(--radius-btn)] font-medium text-sm hover:bg-[var(--color-accent-hover)] transition-colors shadow-sm">
 Online Randevu
 </a>
 </div>
 </div>
 </header>

 <main className="max-w-[var(--container-default,960px)] mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col md:flex-row gap-8 items-start">
 
 {/* 30% STICKY SIDEBAR */}
 <aside className="w-full md:w-[320px] shrink-0 space-y-6 md:sticky top-[100px]">
 
 {/* Hekim Profili Kartı */}
 <div className="bg-[var(--color-surface-elevated)] rounded-[var(--radius-card)] overflow-hidden border border-[var(--color-border)] shadow-sm">
 <div className="aspect-square w-full bg-[var(--color-surface-muted)] relative">
 {businessData.photos && businessData.photos.length > 0 ? (
 <img src={typeof businessData.photos[0] === 'string' ? businessData.photos[0] : (businessData.photos[0] as any).url || businessData.photos[0]} alt={businessData?.ownerName as string} className="w-full h-full object-cover" />
 ) : (
 <div className="w-full h-full flex items-center justify-center text-[var(--color-text-muted)]">
 <User size={64} className="opacity-20" />
 </div>
 )}
 {/* Güven Rozeti */}
 <div className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md text-[var(--color-accent)] hint--top" aria-label="Doğrulanmış Uzman">
 <Shield size={20} />
 </div>
 </div>
 <div className="p-6">
 <h2 className="font-heading font-bold text-2xl text-[var(--color-text)] mb-1">{businessData?.ownerName as string}</h2>
 <div className="text-[var(--color-accent)] font-medium text-sm mb-4">{businessData.team?.[0]?.role || 'Uzman Doktor'}</div>
 <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] mb-2">
 <Award size={16} className="text-[var(--color-text-muted)]" /> {businessData.experience || '15+ Yıl'} Tecrübe
 </div>
 <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] mb-6">
 <Stethoscope size={16} className="text-[var(--color-text-muted)]" /> {businessData.reviewCount} Mutlu Hasta
 </div>
 <a href={`tel:${businessData.phoneClean}`} className="w-full block text-center border-2 border-[var(--color-accent)] text-[var(--color-accent)] py-2.5 rounded-[var(--radius-btn)] font-semibold text-sm hover:bg-[var(--color-accent)] hover:text-white transition-colors">
 Hemen Ara
 </a>
 </div>
 </div>

 {/* Çalışma Saatleri */}
 <div className="bg-[var(--color-surface-elevated)] rounded-[var(--radius-card)] p-6 border border-[var(--color-border)] shadow-sm">
 <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
 <Clock size={18} className="text-[var(--color-accent)]" /> Çalışma Saatleri
 </h3>
 <div className="space-y-3 text-sm">
 {businessData.workingHours?.filter(w => w.open).map((wh, idx) => (
 <div key={idx} className="flex justify-between items-center text-[var(--color-text-secondary)] border-b border-[var(--color-border-subtle)] pb-2 last:border-0 last:pb-0">
 <span className="font-medium">{wh.dayTr}</span>
 <span className="font-mono bg-[var(--color-surface-muted)] px-2 py-0.5 rounded text-[var(--color-accent-hover)]">{wh.open} - {wh.close}</span>
 </div>
 ))}
 </div>
 </div>

 </aside>

 {/* 70% MAIN CONTENT AREA */}
 <div className="flex-1 space-y-12 min-w-0">
 
 {/* Hakkımızda */}
 <section>
 <h2 className="font-heading text-3xl font-bold text-[var(--color-text)] mb-6">Kliniğimize Hoş Geldiniz</h2>
 <div className="prose prose-p:text-[var(--color-text-secondary)] prose-p:leading-relaxed prose-p:mb-4 max-w-none">
 <p>
 {businessData.name}, modern tıp teknolojileri ve uzman hekim kadrosuyla etik değerlerden ödün vermeden, hasta haklarına saygılı, kaliteli ve ekonomik sağlık hizmeti sunmayı ilke edinmiştir.
 </p>
 <p>
 Hedefimiz, hasta ve yakınlarının memnuniyetini sağlayarak, güvenilir teşhis ve tedavi yöntemleriyle sağlıklı bir toplum inşa edilmesine katkıda bulunmaktır.
 </p>
 </div>
 </section>

 {/* Hizmetler Grid (Standart Tier: Listeli & Düzenli) */}
 <section>
 <div className="flex justify-between items-end mb-6">
 <h2 className="font-heading text-2xl font-bold text-[var(--color-text)]">Tıbbi Hizmetlerimiz</h2>
 <a href="#" className="text-sm font-medium text-[var(--color-accent)] hover:underline flex items-center gap-1">Tümünü Gör <ChevronRight size={16} /></a>
 </div>
 
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {businessData.services?.map((service: any, idx: number) => (
 <div key={idx} className="bg-[var(--color-surface)] border border-[var(--color-border)] p-4 rounded-[var(--radius-card)] hover:shadow-md transition-shadow group cursor-pointer flex gap-4 items-center">
 <div className="w-12 h-12 rounded-full bg-[var(--color-surface-muted)] text-[var(--color-accent)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
 {service.icon ? <span className="text-xl">{service.icon}</span> : <Activity size={24} />}
 </div>
 <div>
 <h3 className="font-heading font-bold text-[var(--color-text)] text-sm mb-1 group-hover:text-[var(--color-accent)] transition-colors">{service.name}</h3>
 <p className="text-xs text-[var(--color-text-muted)] font-medium">{service.price ? `${service.price} itibarıyla` : 'Bilgi alınız'}</p>
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* SSS Akordeon */}
 <section className="bg-[var(--color-surface-muted)] rounded-[var(--radius-card)] p-6 md:p-8">
 <h2 className="font-heading text-2xl font-bold text-[var(--color-text)] mb-6">Sıkça Sorulan Sorular</h2>
 <div className="space-y-3">
 {faqs.map((faq, idx) => (
 <div key={idx} className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-[var(--radius-card)] overflow-hidden">
 <button 
 onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
 className="w-full text-left p-4 md:p-5 flex justify-between items-center font-heading font-semibold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors focus:outline-none"
 >
 <span>{faq.q}</span>
 <ChevronDown size={20} className={`text-[var(--color-text-muted)] transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-[var(--color-accent)]' : ''}`} />
 </button>
 <div className={`px-4 md:px-5 pb-5 text-sm text-[var(--color-text-secondary)] leading-relaxed transition-all duration-300 origin-top overflow-hidden ${activeFaq === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 pb-0'}`}>
 {faq.a}
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* Sigorta ve Kurumlar (Logolar yerine sade isimler) */}
 <section className="border-t border-[var(--color-border)] pt-8">
 <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4 text-center md:text-left">Anlaşmalı Kurumlar</h3>
 <div className="flex flex-wrap justify-center md:justify-start gap-4">
 {['SGK', 'Acıbadem Sigorta', 'Allianz', 'Axa Sigorta', 'Anadolu Sigorta'].map((kurum, idx) => (
 <div key={idx} className="px-4 py-2 bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] text-sm font-medium rounded-md">
 {kurum}
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
 <h3 className="font-heading font-bold text-xl mb-4 text-white">{businessData.name}</h3>
 <p className="text-slate-400 text-sm leading-relaxed mb-6">{businessData.slogan}</p>
 </div>
 <div>
 <h4 className="font-heading font-semibold mb-4 text-white">İletişim</h4>
 <div className="space-y-3 text-sm text-slate-300">
 <div className="flex items-start gap-3">
 <MapPin size={18} className="text-[var(--color-accent)] mt-0.5 shrink-0" />
 <span>{businessData.address}</span>
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
 <h4 className="font-heading font-semibold mb-4 text-white">Hızlı Linkler</h4>
 <ul className="space-y-2 text-sm text-slate-300">
 <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">KVKK Aydınlatma Metni</a></li>
 <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Hasta Hakları</a></li>
 <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Çerez Politikası</a></li>
 <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">E-Sonuç</a></li>
 </ul>
 </div>
 </div>
 <div className="max-w-[var(--container-default,960px)] mx-auto px-4 md:px-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
 © {new Date().getFullYear()} {businessData.name}. Tüm hakları saklıdır. Platform by kepenk.ai.
 </div>
 </footer>

 </div>
 )
}

function Award(props: any) {
 return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
}
