'use client'

import React, { useState, useEffect } from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { CheckCircle2, ChevronRight, FileDigit, Landmark, Users, Briefcase, Mail, Phone, MapPin, Building2, BarChart3, Clock, Lock } from 'lucide-react'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function MuhasebeciBeyanSections({ config, businessData }: Props) {
 // Tier 2: 30/70 Sticky Sidebar mimarisi, Teal ağırlıklı, takım üyeleri ve süreç adımları gösterimi. Zengin kurumsal algı.
 
 const [activeTab, setActiveTab] = useState(0);
 const [isClient, setIsClient] = useState(false);

 useEffect(() => {
 setIsClient(true);
 }, []);

 const stats = [
 { value: '15+', label: 'Yıllık Tecrübe', icon: <Clock size={24}/> },
 { value: '250+', label: 'Mutlu Mükellef', icon: <Users size={24}/> },
 { value: '%100', label: 'Gizlilik', icon: <Lock size={24}/> },
 { value: '3', label: 'Mali Müşavir', icon: <Briefcase size={24}/> },
 ]

 const processSteps = [
 { title: 'Tanışma & Analiz', desc: 'İşletmenizin mevcut finansal durumunu detaylıca analiz ederiz.' },
 { title: 'Planlama', desc: 'Vergi optimizasyonu ve teşviklerden yararlanma stratejinizi kurarız.' },
 { title: 'Uygulama & Takip', desc: 'Düzenli beyanname gönderimi ve bordrolama süreçlerini eksiksiz yürütürüz.' },
 { title: 'Raporlama', desc: 'Aylık periyodik net kâr/zarar bilançoları ile önünüzü görmenizi sağlarız.' },
 ]

 return (
 <div className="font-body bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen">
 
 {/* 30/70 STICKY SPLIT LAYOUT */}
 <div className="mx-auto max-w-[var(--container-default)] flex flex-col lg:flex-row min-h-screen">
 
 {/* 30% STICKY SIDEBAR */}
 <div className="w-full lg:w-[35%] xl:w-[30%] lg:sticky lg:top-0 lg:h-screen lg:max-h-screen flex flex-col bg-[var(--color-surface)] border-b lg:border-b-0 lg:border-r border-[var(--color-border)] overflow-y-auto">
 <div className="p-8 lg:p-12 flex flex-col h-full flex-1">
 
 {/* Logo Part */}
 <div className="mb-12">
 <div className="w-16 h-16 bg-[var(--color-accent)] rounded-2xl flex items-center justify-center text-white mb-6">
 <Landmark size={32} />
 </div>
 <h1 className="font-heading text-3xl font-bold tracking-tight mb-2">
 {businessData.name}
 </h1>
 <p className="text-[var(--color-text-secondary)] font-medium">
 Geleceğinize değer katan mali danışmanlık hizmetleri.
 </p>
 </div>

 {/* Quick Contact Box */}
 <div className="bg-[var(--color-bg)] p-6 rounded-2xl border border-[var(--color-border)] mb-12 flex-1">
 <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-6">İletişim</h3>
 <ul className="space-y-6">
 <li className="flex gap-4">
 <Phone className="text-[var(--color-accent)] shrink-0" size={20} />
 <div>
 <div className="font-medium">{businessData.phone}</div>
 <div className="text-xs text-[var(--color-text-muted)]">Hemen Arayın</div>
 </div>
 </li>
 <li className="flex gap-4">
 <Mail className="text-[var(--color-accent)] shrink-0" size={20} />
 <div>
 <div className="font-medium break-all">{businessData.email}</div>
 <div className="text-xs text-[var(--color-text-muted)]">E-Posta Gönderin</div>
 </div>
 </li>
 <li className="flex gap-4">
 <MapPin className="text-[var(--color-accent)] shrink-0" size={20} />
 <div>
 <div className="font-medium">{businessData.address}</div>
 <div className="text-xs text-[var(--color-text-muted)]">{businessData.district}, {businessData.city}</div>
 </div>
 </li>
 </ul>
 </div>

 <div className="pb-8">
 <a href={`tel:${businessData.phoneClean}`} className="w-full block text-center bg-[var(--color-text)] text-[var(--color-bg)] py-4 rounded-xl font-bold hover:bg-[var(--color-accent)] transition-colors">
 Danışmanlık Alın
 </a>
 </div>

 </div>
 </div>

 {/* 70% SCROLLING CONTENT */}
 <div className="w-full lg:w-[65%] xl:w-[70%] flex flex-col">
 
 {/* HERO IMAGE BANNER */}
 <div className="h-64 md:h-96 w-full relative">
 <img 
 src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80" 
 alt="Mali Müşavirlik Ofisi" 
 className="w-full h-full object-cover"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/40 to-transparent"></div>
 </div>

 <div className="p-8 lg:p-16 lg:-mt-24 relative z-10 flex flex-col gap-24">
 
 {/* STATS ROW */}
 <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {stats.map((s, i) => (
 <div key={i} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
 <div className="text-[var(--color-accent)] mb-3">{s.icon}</div>
 <div className="font-heading text-2xl font-bold mb-1">{s.value}</div>
 <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">{s.label}</div>
 </div>
 ))}
 </section>

 {/* SERVICES */}
 <section>
 <div className="mb-10">
 <div className="text-[var(--color-accent)] font-bold text-sm tracking-widest uppercase mb-3 flex items-center gap-2">
 <span className="w-8 h-px bg-[var(--color-accent)]"></span> Uzmanlık Alanları
 </div>
 <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text)]">
 İşletmeniz İçin Değer Üretiyoruz
 </h2>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {[
 { title: 'Şirket Kuruluşu', desc: 'A.Ş. veya limited şirket kurulumlarınızı tek seansta planlıyor ve hayata geçiriyoruz.', icon: <Building2 /> },
 { title: 'Vergi Danışmanlığı', desc: 'Yasal vergi avantajları ve indirimlerinden %100 yararlanmanız için planlama yapıyoruz.', icon: <BarChart3 /> },
 { title: 'SGK ve Teşvik İşlemleri', desc: 'Personel teşvik sorgulamaları ve aylık APHB süreçlerinizi sorunsuz yönetiyoruz.', icon: <Users /> },
 { title: 'E-Dönüşüm Süreçleri', desc: 'E-fatura, e-arşiv ve e-defter geçişlerinizi hızlı ve güvenli şekilde sağlıyoruz.', icon: <FileDigit /> }
 ].map((srv, idx) => (
 <div key={idx} className="bg-[var(--color-surface)] rounded-2xl p-8 border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all cursor-pointer group">
 <div className="w-12 h-12 rounded-full bg-[var(--color-surface-muted)] flex items-center justify-center text-[var(--color-text)] mb-6 group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors">
 {srv.icon}
 </div>
 <h3 className="text-lg font-bold mb-3">{srv.title}</h3>
 <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{srv.desc}</p>
 </div>
 ))}
 </div>
 </section>

 {/* PROCESS TIMELINE */}
 <section className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-3xl p-8 lg:p-12">
 <h2 className="font-heading text-2xl font-bold mb-10 text-center">Çalışma Sürecimiz</h2>
 
 <div className="relative border-l-2 border-[var(--color-border)] ml-6 md:ml-0 md:border-l-0 md:border-t-2 md:flex md:justify-between md:pt-12 gap-8">
 {processSteps.map((step, idx) => (
 <div key={idx} className="relative mb-8 pl-8 md:pl-0 md:mb-0 md:w-1/4">
 {/* Timeline dot */}
 <div className="absolute w-8 h-8 rounded-full bg-[var(--color-bg)] border-2 border-[var(--color-accent)] -left-[1.1rem] top-0 md:-top-[3.5rem] md:left-1/2 md:-ml-4 flex items-center justify-center font-bold text-[var(--color-accent)] text-sm shadow-sm ring-4 ring-[var(--color-surface)]">
 {idx + 1}
 </div>
 <h4 className="font-bold text-lg mb-2 md:text-center mt-1 md:mt-0">{step.title}</h4>
 <p className="text-sm text-[var(--color-text-secondary)] md:text-center leading-relaxed">
 {step.desc}
 </p>
 </div>
 ))}
 </div>
 </section>

 {/* TEAM / EXPERT */}
 <section className="flex flex-col md:flex-row gap-8 bg-[var(--color-surface-muted)] p-8 rounded-3xl border border-[var(--color-border)] items-center">
 <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-xl shrink-0">
 <img 
 src={businessData.photos?.[0] || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80'} 
 alt={businessData?.ownerName as string} 
 className="w-full h-full object-cover"
 />
 </div>
 <div>
 <div className="text-[var(--color-accent)] font-bold text-xs tracking-widest uppercase mb-2">Baş Mali Müşavir</div>
 <h3 className="font-heading text-2xl font-bold mb-4">{businessData?.ownerName as string}</h3>
 <p className="text-[var(--color-text-secondary)] mb-6 text-sm leading-relaxed">
 İşletmelerin mali yapısını güçlendirmek ve yasal süreçleri kusursuz yönetmek için 15 yıllık sektörel deneyim. Vergi hukuku ve SGK teşvikleri uzmanı.
 </p>
 <div className="flex gap-2">
 <span className="px-3 py-1 bg-white dark:bg-black border border-[var(--color-border)] rounded-full text-xs font-bold">Vergi Hukuku</span>
 <span className="px-3 py-1 bg-white dark:bg-black border border-[var(--color-border)] rounded-full text-xs font-bold">Denetim</span>
 </div>
 </div>
 </section>

 {/* FOOTER AREA */}
 <footer className="pt-12 pb-8 border-t border-[var(--color-border)] text-[var(--color-text-muted)] text-sm flex flex-col md:flex-row justify-between items-center gap-4">
 <p>© {new Date().getFullYear()} {businessData.name}. Tüm hakları saklıdır.</p>
 <div className="flex gap-6">
 <a href="#hizmetler" className="hover:text-[var(--color-text)] transition-colors">KVKK Metni</a>
 <a href="#iletisim" className="hover:text-[var(--color-text)] transition-colors">Kullanım Koşulları</a>
 </div>
 </footer>

 </div>
 </div>
 </div>
 </div>
 )
}
