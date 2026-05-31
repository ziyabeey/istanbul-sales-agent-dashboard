'use client'

import React, { useState, useEffect } from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { MapPin, Phone, Building, ArrowRight, Star, Key, ShieldCheck, Mail } from 'lucide-react'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function EmlakLuxSections({ config, businessData }: Props) {
 const [mounted, setMounted] = useState(false)
 const [scrolled, setScrolled] = useState(false)

 useEffect(() => {
 setMounted(true)
 const handleScroll = () => setScrolled(window.scrollY > 50)
 window.addEventListener('scroll', handleScroll)
 return () => window.removeEventListener('scroll', handleScroll)
 }, [])

 if (!mounted) return null

 // Emlak Lux - Tier 4: Max 1280px, Glassmorphism & Luxury VIP
 const glassPanel = 'bg-[var(--color-bg)]/60 backdrop-blur-2xl border border-[var(--color-border)] shadow-2xl'
 const glassCard = 'bg-[var(--color-surface)]/70 backdrop-blur-xl border border-[var(--color-border)] hover:bg-[var(--color-surface)]/90 transition-all duration-500'

 return (
 <div 
 className="font-body text-[var(--color-text)] min-h-screen relative overflow-x-hidden selection:bg-[var(--color-accent)] selection:text-[var(--color-text-on-accent)]" 

 >
 {/* 
 GLOBAL BACKGROUND W/ ANIMATED GRADIENTS (Luxury feel)
 */}
 <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
 <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-accent)]/10 blur-[120px]"></div>
 <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[var(--color-accent)]/5 blur-[150px]"></div>
 </div>

 {/* 
 PREMIUM HEADER (Glassmorphic)
 */}
 <header className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? glassPanel + ' py-3' : 'bg-transparent py-6'}`}>
 <div className="w-full max-w-[1280px] mx-auto px-6 md:px-10 flex items-center justify-between">
 <div className="flex items-center gap-3 group cursor-pointer">
 <div className="w-12 h-12 flex items-center justify-center border border-[var(--color-accent)]/30 rounded-full group-hover:bg-[var(--color-accent)]/10 transition-colors">
 <Building size={20} className="text-[var(--color-accent)]" />
 </div>
 <div>
 <h1 className="font-heading text-2xl tracking-[0.1em] text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">{businessData.name}</h1>
 </div>
 </div>
 
 <nav className="hidden md:flex items-center gap-10">
 <a href="#hizmetler" className="text-sm tracking-[0.15em] hover:text-[var(--color-accent)] text-[var(--color-text-secondary)] transition-colors uppercase">Premium Hizmetler</a>
 <a href="#danisman" className="text-sm tracking-[0.15em] hover:text-[var(--color-accent)] text-[var(--color-text-secondary)] transition-colors uppercase">Direktör</a>
 <a href="#iletisim" className="text-sm tracking-[0.15em] hover:text-[var(--color-accent)] text-[var(--color-text-secondary)] transition-colors uppercase">Bize Ulaşın</a>
 </nav>

 <div className="hidden md:block">
 <a 
 href={`tel:${businessData.phoneClean}`} 
 className="px-8 py-3 bg-[var(--color-surface-elevated)] text-[var(--color-text)] border border-[var(--color-accent)]/30 text-sm tracking-[0.15em] uppercase hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-all duration-500 rounded-none mix-blend-screen"
 >
 VIP Görüşme
 </a>
 </div>
 </div>
 </header>

 {/* 
 MAIN CONTENT - Max 1280px 
 */}
 <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-10 pt-32 pb-24 flex flex-col gap-32">
 
 {/* HERO SECTION (Split & Glass) */}
 <section className="min-h-[70vh] flex items-center">
 <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
 <div className="lg:col-span-7 flex flex-col items-start relative z-10">
 <div className="flex items-center gap-4 mb-8 opacity-80">
 <div className="w-12 h-px bg-[var(--color-accent)]"></div>
 <span className="text-sm tracking-[0.3em] uppercase text-[var(--color-accent)]">{businessData.district}</span>
 </div>
 
 <h2 className="font-heading text-6xl md:text-8xl leading-[0.9] text-[var(--color-text)] tracking-wider mb-8">
 Prestige<br/>
 Estates<br/>
 <span className="text-[var(--color-text-muted)]">İstanbul</span>
 </h2>

 <p className="text-lg md:text-xl text-[var(--color-text-secondary)] font-light leading-relaxed max-w-lg mb-12">
 {businessData.slogan}. Dünyanın en özel lokasyonlarından Boğaziçi'nde, standartların üzerinde yaşam alanları tasarlıyoruz.
 </p>

 <div className="flex gap-6">
 <a href="#iletisim" className="px-10 py-5 bg-[var(--color-accent)] text-[var(--color-bg)] text-sm tracking-[0.2em] font-medium uppercase hover:bg-[var(--color-accent-hover)] transition-colors">
 Özel Sunum Talep Et
 </a>
 </div>
 </div>

 <div className="lg:col-span-5 relative h-full min-h-[500px] w-full hidden lg:block">
 {/* Glass abstract representation of a building/estate */}
 <div className={`absolute inset-0 rounded-2xl ${glassPanel} flex items-center justify-center overflow-hidden group`}>
 <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--color-bg)] to-transparent z-10"></div>
 <div className="w-[80%] h-[120%] border border-[var(--color-accent)]/20 rotate-12 transition-transform duration-1000 group-hover:rotate-6 group-hover:scale-105 opacity-30"></div>
 <div className="w-[60%] h-[120%] border border-[var(--color-accent)]/20 -rotate-6 absolute transition-transform duration-1000 group-hover:-rotate-3 group-hover:scale-105 opacity-30"></div>
 
 <div className="relative z-20 text-center p-8">
 <Star size={48} strokeWidth={1} className="mx-auto text-[var(--color-accent)] mb-6" />
 <div className="font-heading text-5xl mb-2">{businessData.experience}</div>
 <div className="text-xs uppercase tracking-[0.3em] text-[var(--color-text-secondary)]">Uluslararası Deneyim</div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* METRICS & PREMIUM SERVICES (Glass Cards) */}
 <section id="hizmetler">
 <div className="flex items-center gap-4 mb-16 justify-center opacity-80">
 <div className="w-12 h-px bg-[var(--color-accent)]"></div>
 <h3 className="text-sm tracking-[0.3em] uppercase text-[var(--color-accent)] text-center">Premium Hizmetler</h3>
 <div className="w-12 h-px bg-[var(--color-accent)]"></div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 <div className={`p-10 rounded-xl ${glassCard} flex flex-col items-center text-center group`}>
 <div className="w-16 h-16 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mb-6 border border-[var(--color-accent)]/20 group-hover:scale-110 transition-transform duration-500">
 <Key size={24} className="text-[var(--color-accent)]" />
 </div>
 <h4 className="font-heading text-2xl tracking-widest mb-4">Özel Portföy</h4>
 <p className="text-[var(--color-text-secondary)] font-light text-sm leading-relaxed">Piyasada yer almayan, sadece VIP müşteri ağına sunulan eşsiz yalı ve köşklere erişim sağlayın.</p>
 </div>

 <div className={`p-10 rounded-xl ${glassCard} flex flex-col items-center text-center group`}>
 <div className="w-16 h-16 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mb-6 border border-[var(--color-accent)]/20 group-hover:scale-110 transition-transform duration-500">
 <Building size={24} className="text-[var(--color-accent)]" />
 </div>
 <h4 className="font-heading text-2xl tracking-widest mb-4">Lüks Projeler</h4>
 <p className="text-[var(--color-text-secondary)] font-light text-sm leading-relaxed">İstanbul'un en prestijli lokasyonlarındaki mega projelerde %100 memnuniyetli ön gösterim avantajları.</p>
 </div>

 <div className={`p-10 rounded-xl ${glassCard} flex flex-col items-center text-center group`}>
 <div className="w-16 h-16 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mb-6 border border-[var(--color-accent)]/20 group-hover:scale-110 transition-transform duration-500">
 <ShieldCheck size={24} className="text-[var(--color-accent)]" />
 </div>
 <h4 className="font-heading text-2xl tracking-widest mb-4">Tam Gizlilik</h4>
 <p className="text-[var(--color-text-secondary)] font-light text-sm leading-relaxed">Finansal detaylar ve kimlik bilgileriniz kurumsal bir titizlikle korunur. Alım satım sürecinde kesintisiz güvenlik.</p>
 </div>
 </div>
 </section>

 {/* DIRECTOR PROFILE */}
 <section id="danisman" className={`p-12 md:p-20 rounded-2xl ${glassPanel} relative overflow-hidden`}>
 {/* Abstract gold accent in corner */}
 <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[var(--color-accent)]/10 to-transparent"></div>
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
 <div className="flex flex-col items-center justify-center">
 <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border border-[var(--color-accent)]/30 relative flex items-center justify-center bg-[var(--color-surface)]">
 <span className="font-heading text-[8rem] text-[var(--color-accent)]/20 tracking-tighter">{businessData.team?.[0]?.name.charAt(0)}</span>
 <div className="absolute inset-0 border border-[var(--color-accent)]/50 rounded-full m-4"></div>
 </div>
 </div>
 
 <div>
 <p className="text-[var(--color-accent)] text-xs tracking-[0.3em] uppercase mb-4">{businessData.team?.[0]?.role}</p>
 <h3 className="font-heading text-5xl md:text-6xl tracking-wider mb-8">{businessData.team?.[0]?.name}</h3>
 
 <p className="text-[var(--color-text-secondary)] text-lg font-light leading-relaxed mb-10">
 "Gerçek lüks, zamanınızın kıymetini bilen ve yaşam tarzınızı kusursuzca yansıtan mekanları bulma sanatıdır."
 </p>

 <div className="flex items-center gap-12 border-t border-[var(--color-border)] pt-8">
 <div>
 <div className="font-heading text-4xl text-[var(--color-text)] mb-2">{businessData.experience}</div>
 <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest">Global Pazar</div>
 </div>
 <div>
 <div className="font-heading text-4xl text-[var(--color-text)] mb-2">{businessData.rating}/5</div>
 <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest">VIP Memnuniyet</div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* LUXURY CONTACT / VALUATION FORM */}
 <section id="iletisim" className="max-w-4xl mx-auto w-full text-center">
 <div className="flex items-center gap-4 mb-8 justify-center opacity-80">
 <div className="w-12 h-px bg-[var(--color-accent)]"></div>
 <h3 className="text-sm tracking-[0.3em] uppercase text-[var(--color-accent)] text-center">ÖZEL RANDEVU</h3>
 <div className="w-12 h-px bg-[var(--color-accent)]"></div>
 </div>
 
 <h2 className="font-heading text-5xl md:text-6xl tracking-widest mb-6">Ayrıcalığa Merhaba Deyin</h2>
 <p className="text-[var(--color-text-secondary)] font-light mb-16">VIP görüşme veya mülkünüz için özel bir değerleme planlamak üzere bize bilgilerinizi bırakın.</p>

 <form className={`p-10 md:p-16 rounded-xl ${glassPanel} text-left space-y-8`}>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div className="space-y-2">
 <label className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)] opacity-80">Ad Soyad / Unvan</label>
 <input type="text" className="w-full bg-transparent border-b border-[var(--color-border)] py-3 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm font-light" />
 </div>
 <div className="space-y-2">
 <label className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)] opacity-80">İletişim Numaranız</label>
 <input type="tel" className="w-full bg-transparent border-b border-[var(--color-border)] py-3 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm font-light" />
 </div>
 </div>
 
 <div className="space-y-2">
 <label className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)] opacity-80">Mesajınız (Opsiyonel)</label>
 <textarea rows={3} className="w-full bg-transparent border-b border-[var(--color-border)] py-3 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm font-light resize-none"></textarea>
 </div>

 <button type="button" className="w-full py-5 bg-[var(--color-accent)] text-[var(--color-bg)] font-medium text-sm tracking-[0.2em] uppercase hover:bg-[var(--color-accent-hover)] transition-colors flex items-center justify-center gap-3">
 Gönder <ArrowRight size={18} />
 </button>
 </form>
 </section>

 {/* LUXURY FOOTER */}
 <footer className="border-t border-[var(--color-border)] pt-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
 <div>
 <h4 className="font-heading text-3xl tracking-[0.1em] text-[var(--color-text)] mb-4">{businessData.name}</h4>
 <p className="text-[var(--color-text-secondary)] font-light text-sm flex items-center justify-center md:justify-start gap-2">
 <MapPin size={14}/> {businessData.address}
 </p>
 </div>
 
 <div className="flex flex-col items-center md:items-end gap-4">
 <a href={`mailto:${businessData.email}`} className="text-[var(--color-accent)] text-sm tracking-widest hover:text-[var(--color-accent-hover)] transition-colors flex items-center gap-2">
 <Mail size={16}/> {businessData.email}
 </a>
 <p className="text-[var(--color-text-muted)] text-[10px] uppercase tracking-[0.2em]">
 © {new Date().getFullYear()} PRESTIGE ESTATES. TÜM HAKLARI SAKLIDIR.
 </p>
 </div>
 </footer>

 </div>
 </div>
 )
}
