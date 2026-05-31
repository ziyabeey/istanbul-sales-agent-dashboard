'use client'

import React from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { Calculator, FileText, PieChart, ShieldCheck, Phone, Mail, MapPin, CalendarDays, ArrowRight } from 'lucide-react'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function MuhasebeciDefterSections({ config, businessData }: Props) {
 // Tier 1: Yalın lacivert, hızlı bilgi akışı, statik iletişim.
 
 const features = [
 { icon: <Calculator className="w-6 h-6" />, title: 'Ön Muhasebe', desc: 'Gelir/gider takibi ve faturalama işlemleri düzenli kaydedilir.' },
 { icon: <FileText className="w-6 h-6" />, title: 'Beyanname', desc: 'Aylık ve yıllık vergi beyannameleriniz zamanında hazırlanır.' },
 { icon: <PieChart className="w-6 h-6" />, title: 'Mali Danışmanlık', desc: 'İşletmenizin büyümesi için stratejik finansal raporlamalar.' },
 { icon: <ShieldCheck className="w-6 h-6" />, title: 'SGK ve Teşvik', desc: 'Personel bordroları ve devlet teşvikleri analiz edilir.' },
 ]

 return (
 <div className="font-body bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen">
 
 {/* HEADER / HERO - Fullscreen Overlay Style (or large banner) */}
 <header className="relative w-full bg-[var(--color-surface)] py-20 lg:py-32 overflow-hidden border-b border-[var(--color-border)]">
 <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-50"></div>
 <div className="container mx-auto max-w-[var(--container-default)] px-6 relative z-10 text-center flex flex-col items-center">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent-light)] text-[var(--color-accent)] text-xs font-bold uppercase tracking-widest mb-6">
 <ShieldCheck size={14} /> Mali Müşavirlik Bürosu
 </div>
 <h1 className="font-heading text-4xl md:text-6xl font-black text-[var(--color-text)] tracking-tight mb-6 max-w-3xl leading-tight">
 Defterleriniz <span className="text-[var(--color-accent)]">Emin Ellerde</span>
 </h1>
 <p className="text-lg text-[var(--color-text-secondary)] font-medium max-w-2xl mb-10 leading-relaxed">
 {businessData.slogan || 'Zamanında beyan, eksiksiz takip ve stratejik vergi planlaması ile işletmenizi büyütün.'}
 </p>
 <div className="flex flex-col sm:flex-row gap-4">
 <a href="#contact" className="bg-[var(--color-accent)] text-[var(--color-text-on-accent)] px-8 py-4 rounded-xl font-bold hover:bg-[var(--color-accent-hover)] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
 Danışmanlık Alın <ArrowRight size={18} />
 </a>
 <a href={`tel:${businessData.phoneClean}`} className="bg-[var(--color-surface-elevated)] text-[var(--color-text)] px-8 py-4 rounded-xl font-bold hover:border-[var(--color-accent)] border border-[var(--color-border)] transition-all flex items-center justify-center gap-2">
 <Phone size={18} /> {businessData.phone}
 </a>
 </div>
 </div>
 </header>

 {/* SERVICES GRID */}
 <section className="py-20 lg:py-28 bg-[var(--color-bg)]" id="services">
 <div className="container mx-auto max-w-[var(--container-default)] px-6">
 <div className="text-center mb-16">
 <h2 className="font-heading text-3xl font-bold mb-4">Hizmetlerimiz</h2>
 <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">Tüm muhasebe ve danışmanlık ihtiyaçlarınız için uçtan uca çözümler sunuyoruz.</p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
 {features.map((feat, idx) => (
 <div key={idx} className="bg-[var(--color-surface)] p-8 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all group">
 <div className="w-14 h-14 bg-[var(--color-surface-muted)] text-[var(--color-accent)] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
 {feat.icon}
 </div>
 <h3 className="font-heading text-xl font-bold mb-3">{feat.title}</h3>
 <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{feat.desc}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* TAX CALENDAR (VERGİ TAKVİMİ) */}
 <section className="py-20 bg-[var(--color-surface-muted)] border-y border-[var(--color-border)]">
 <div className="container mx-auto max-w-[var(--container-default)] px-6 flex flex-col md:flex-row items-center gap-12">
 <div className="md:w-1/2">
 <div className="w-16 h-16 bg-[var(--color-accent)] rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg">
 <CalendarDays size={32} />
 </div>
 <h2 className="font-heading text-3xl font-bold mb-6">Önemli Vergi Takvimi</h2>
 <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
 Her ay düzenli olarak takip edilmesi gereken vergi ve bildirim sürelerini kaçırmayın. Biz sizin yerinize takip ediyoruz.
 </p>
 <ul className="space-y-4">
 <li className="flex items-center gap-4 bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)]">
 <div className="font-bold text-[var(--color-accent)] min-w-[60px]">Ayın 26'sı</div>
 <div className="text-sm font-medium">KDV (Katma Değer Vergisi) Beyannamesi</div>
 </li>
 <li className="flex items-center gap-4 bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)]">
 <div className="font-bold text-[var(--color-accent)] min-w-[60px]">Ayın 26'sı</div>
 <div className="text-sm font-medium">Muhtasar ve Prim Hizmet Beyannamesi</div>
 </li>
 <li className="flex items-center gap-4 bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)] opacity-70">
 <div className="font-bold text-[var(--color-text-secondary)] min-w-[60px]">Üç Aylık</div>
 <div className="text-sm font-medium">Geçici Vergi Beyannamesi</div>
 </li>
 </ul>
 </div>
 <div className="md:w-1/2 w-full">
 <div className="aspect-square md:aspect-auto md:h-[500px] rounded-3xl overflow-hidden shadow-2xl relative">
 <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80" alt="Muhasebe Takvimi" className="w-full h-full object-cover" />
 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
 <div className="text-white">
 <div className="font-bold text-xl mb-1">Cezalardan Korunun</div>
 <div className="text-white/80 text-sm">Zamanında yapılan beyanlar hayat kurtarır.</div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* CONTACT BANNER */}
 <section className="py-24 bg-[var(--color-bg)]" id="contact">
 <div className="container mx-auto max-w-[var(--container-default)] px-6">
 <div className="bg-[var(--color-accent)] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
 <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
 
 <div className="md:w-1/2 p-12 lg:p-16 flex flex-col justify-center text-[var(--color-text-on-accent)] z-10">
 <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Ücretsiz Ön Görüşme</h2>
 <p className="text-[var(--color-text-on-accent)]/80 mb-10 text-lg">
 İşletmenizin mali röntgenini çekelim, vergi yükünüzü nasıl optimize edebileceğimizi konuşalım.
 </p>
 
 <div className="space-y-6">
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm shrink-0">
 <Phone className="text-white" size={20} />
 </div>
 <div>
 <div className="text-white/60 text-xs font-bold uppercase mb-1">Telefon</div>
 <div className="font-medium text-lg">{businessData.phone}</div>
 </div>
 </div>
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm shrink-0">
 <MapPin className="text-white" size={20} />
 </div>
 <div>
 <div className="text-white/60 text-xs font-bold uppercase mb-1">Adres</div>
 <div className="font-medium">{businessData.address} <br/> {businessData.district}, {businessData.city}</div>
 </div>
 </div>
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm shrink-0">
 <Mail className="text-white" size={20} />
 </div>
 <div>
 <div className="text-white/60 text-xs font-bold uppercase mb-1">E-Posta</div>
 <div className="font-medium">{businessData.email}</div>
 </div>
 </div>
 </div>
 </div>
 
 <div className="md:w-1/2 bg-[var(--color-surface)] p-12 lg:p-16 flex items-center justify-center z-10 border-l border-[var(--color-border)]">
 <form className="w-full flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
 <div>
 <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Firma Adı</label>
 <input type="text" className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] outline-none transition-colors" placeholder="Firma Ünvanı" />
 </div>
 <div>
 <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">İletişim</label>
 <input type="tel" className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] outline-none transition-colors" placeholder="05XX XXX XX XX" />
 </div>
 <div>
 <label className="block text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">Mesajınız</label>
 <textarea rows={3} className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] outline-none transition-colors resize-none" placeholder="Hangi konuda destek almak istiyorsunuz?"></textarea>
 </div>
 <button className="w-full bg-[var(--color-accent)] text-[var(--color-text-on-accent)] py-4 rounded-xl font-bold hover:bg-[var(--color-accent-hover)] transition-colors mt-2">
 Gönder
 </button>
 </form>
 </div>
 </div>
 </div>
 </section>

 {/* FOOTER */}
 <footer className="bg-[var(--color-surface-muted)] py-12 border-t border-[var(--color-border)] text-center">
 <div className="container mx-auto px-6">
 <div className="font-heading text-xl font-black mb-4">
 {businessData.name}
 </div>
 <p className="text-[var(--color-text-secondary)] text-sm mb-8">
 Güvenilir mali müşavirlik ve muhasebe hizmetleri.
 </p>
 <div className="text-xs text-[var(--color-text-muted)] opacity-70 uppercase tracking-widest font-bold">
 © {new Date().getFullYear()} {businessData.name}. Tüm hakları saklıdır.
 </div>
 </div>
 </footer>
 </div>
 )
}
