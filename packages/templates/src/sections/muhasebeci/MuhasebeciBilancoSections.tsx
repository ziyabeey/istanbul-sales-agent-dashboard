'use client'

import React from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { Cloud, FileSpreadsheet, ShieldCheck, Cpu, ArrowRight, BarChart, CheckCircle2 } from 'lucide-react'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function MuhasebeciBilancoSections({ config, businessData }: Props) {
 // Tier 3: Mavi renk, dijitalleşme vurgusu (e-fatura / bulut teknoloji). Neumorphism veya modern kart yapısı.
 // 1120px Container.
 
 return (
 <div className="font-body bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen selection:bg-[var(--color-accent)] selection:text-white">
 
 {/* VIDEO CINEMATIC HERO */}
 <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
 {/* Abstract animated gradient background as fallback/creative layer */}
 <div className="absolute inset-0 bg-blue-950">
 <img 
 src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" 
 alt="Dijital Muhasebe" 
 className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
 />
 <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)] via-[var(--color-bg)]/80 to-transparent"></div>
 </div>

 <div className="container mx-auto max-w-[var(--container-default)] px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
 <div className="md:w-[60%] flex flex-col items-start gap-6">
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-[var(--color-accent)] font-bold tracking-widest text-xs uppercase shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
 <Cloud size={16} /> Dijital Dönüşüm Partneriniz
 </div>
 <h1 className="font-heading text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-text)] to-[var(--color-text-secondary)] leading-tight tracking-tight">
 Yeni Nesil <br/> Bulut Muhasebe.
 </h1>
 <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] font-medium max-w-xl leading-relaxed">
 Kağıtsız ofis, anlık finansal veri takibi ve e-dönüşüm süreçlerinizde 
 {businessData.name} güvencesiyle geleceği yakalayın.
 </p>
 
 <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
 <a href="#demo" className="px-8 py-4 bg-[var(--color-accent)] text-[var(--color-text-on-accent)] rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_30px_var(--color-accent-hover)] transition-shadow">
 Sistemi Keşfedin <ArrowRight size={20} />
 </a>
 </div>
 </div>

 {/* Floating Cards (Neumorphic/Glassmorphic) */}
 <div className="md:w-[40%] hidden lg:flex relative h-[500px] items-center justify-center">
 <div className="absolute w-72 h-80 bg-[var(--color-surface)]/80 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-[0_20px_50px_rgba(37,99,235,0.15)] right-0 top-10 flex flex-col p-8 z-20 translate-x-10">
 <div className="w-12 h-12 bg-emerald-500/20 text-emerald-500 rounded-2xl flex items-center justify-center mb-6">
 <CheckCircle2 size={24} />
 </div>
 <h3 className="font-bold text-xl mb-2">E-Fatura Onaylandı</h3>
 <p className="text-sm text-[var(--color-text-secondary)]">Ocak ayı fatura serileri sisteme anında entegre edildi.</p>
 <div className="mt-auto h-2 bg-[var(--color-surface-muted)] rounded-full overflow-hidden">
 <div className="h-full bg-emerald-500 w-[100%] rounded-full"></div>
 </div>
 </div>
 <div className="absolute w-64 h-64 bg-[var(--color-bg)]/90 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.1)] left-0 bottom-10 flex flex-col p-6 z-10 -translate-x-10">
 <div className="w-10 h-10 bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded-xl flex items-center justify-center mb-4">
 <BarChart size={20} />
 </div>
 <h3 className="font-bold mb-1">Anlık Kâr/Zarar</h3>
 <div className="font-heading text-3xl font-black text-[var(--color-accent)] mb-4">+ %24.8</div>
 <img src="https://www.highcharts.com/images/docs/line_chart.png" alt="Chart" className="w-full h-16 object-cover opacity-50 contrast-200 grayscale dark:invert" />
 </div>
 </div>
 </div>
 </section>

 {/* TECHNOLOGY SHOWCASE & E-DÖNÜŞÜM */}
 <section className="py-24 bg-[var(--color-surface)] relative overflow-hidden">
 <div className="container mx-auto max-w-[var(--container-default)] px-6">
 <div className="text-center max-w-2xl mx-auto mb-20">
 <h2 className="font-heading text-4xl font-bold mb-6">E-Dönüşüm Süreçleri</h2>
 <p className="text-lg text-[var(--color-text-secondary)]">Geleneksel muhasebeyi geride bırakın. İşletmenizin dijital entegrasyonunu biz yönetiyoruz.</p>
 </div>
 
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 {[
 { title: 'E-Fatura / E-Arşiv', desc: 'Saniyeler içinde fatura kesin, kağıt masrafından ve kargo operasyonlarından tamamen kurtulun.', icon: <FileSpreadsheet /> },
 { title: 'E-Defter', desc: 'Yasal defterlerinizi GİB standartlarına %100 uyumlu şekilde elektronik ortamda hazırlayın ve saklayın.', icon: <Cpu /> },
 { title: 'Bulut Yedekleme', desc: '10 yıllık yasal saklama zorunluluğunu, banka seviyesinde şifrelenmiş sunucularımızda sağlıyoruz.', icon: <ShieldCheck /> }
 ].map((tech, i) => (
 <div key={i} className="bg-[var(--color-bg)] rounded-[2rem] p-10 border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all hover:-translate-y-2 shadow-sm hover:shadow-2xl hover:shadow-[var(--color-accent)]/10">
 <div className="w-16 h-16 bg-[var(--color-surface-muted)] text-[var(--color-accent)] rounded-2xl flex items-center justify-center mb-8">
 {tech.icon}
 </div>
 <h3 className="font-heading text-2xl font-bold mb-4">{tech.title}</h3>
 <p className="text-[var(--color-text-secondary)] leading-relaxed">{tech.desc}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* STATS ANIMATED ROW */}
 <section className="py-16 bg-[var(--color-accent)] text-white">
 <div className="container mx-auto max-w-[var(--container-default)] px-6">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/20">
 <div className="text-center px-4">
 <div className="text-4xl lg:text-5xl font-black mb-2">{businessData.reviewCount}</div>
 <div className="text-white/70 font-medium uppercase tracking-wider text-xs">Kurumsal Müşteri</div>
 </div>
 <div className="text-center px-4">
 <div className="text-4xl lg:text-5xl font-black mb-2">1M+</div>
 <div className="text-white/70 font-medium uppercase tracking-wider text-xs">İşlenen E-Fatura</div>
 </div>
 <div className="text-center px-4">
 <div className="text-4xl lg:text-5xl font-black mb-2">%100</div>
 <div className="text-white/70 font-medium uppercase tracking-wider text-xs">Veri Güvenliği</div>
 </div>
 <div className="text-center px-4">
 <div className="text-4xl lg:text-5xl font-black mb-2">7/24</div>
 <div className="text-white/70 font-medium uppercase tracking-wider text-xs">Teknik Destek</div>
 </div>
 </div>
 </div>
 </section>

 {/* INFO GRAPHIC / PROCESS */}
 <section className="py-24 bg-[var(--color-bg)]">
 <div className="container mx-auto max-w-[var(--container-default)] px-6 flex flex-col md:flex-row items-center gap-16">
 <div className="md:w-1/2">
 <div className="relative p-4">
 <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-10 rounded-3xl blur-2xl"></div>
 <img src="https://images.unsplash.com/photo-1554224154-26032ffc0e04?auto=format&fit=crop&q=80" alt="Muhasebe Dashboard" className="relative z-10 w-full h-auto rounded-3xl border border-[var(--color-border)] shadow-2xl" />
 </div>
 </div>
 <div className="md:w-1/2 flex flex-col gap-6">
 <h2 className="font-heading text-3xl font-bold text-[var(--color-text)] mb-4">Kompleks Veriler, Basit Raporlar</h2>
 <p className="text-[var(--color-text-secondary)]">İşletmenizin finansal durumunu Excel dosyaları arasında kaybolmadan tek bir ekrandan yönetin.</p>
 <ul className="space-y-4 mt-4">
 <li className="flex items-center gap-4">
 <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] flex items-center justify-center shrink-0"><CheckCircle2 size={16}/></div>
 <span className="font-semibold">Banka Ekstre Entegrasyonu</span>
 </li>
 <li className="flex items-center gap-4">
 <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] flex items-center justify-center shrink-0"><CheckCircle2 size={16}/></div>
 <span className="font-semibold">Personel Maaş & Bordro Yönetimi</span>
 </li>
 <li className="flex items-center gap-4">
 <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] flex items-center justify-center shrink-0"><CheckCircle2 size={16}/></div>
 <span className="font-semibold">Haftalık Nakit Akışı Bildirimleri</span>
 </li>
 </ul>
 </div>
 </div>
 </section>

 {/* MODERN FOOTER */}
 <footer className="bg-[var(--color-surface)] pt-20 pb-10 border-t border-[var(--color-border)]">
 <div className="container mx-auto max-w-[var(--container-default)] px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
 <div className="col-span-1 md:col-span-2">
 <h3 className="font-heading text-2xl font-black tracking-tight mb-4 text-[var(--color-accent)]">{businessData.name}</h3>
 <p className="text-[var(--color-text-secondary)] text-sm max-w-sm leading-relaxed mb-6">{businessData.slogan || 'Dijital muhasebe çözümleri.'}</p>
 <div className="text-sm font-medium">Bize Ulaşın: {businessData.phone}</div>
 </div>
 <div>
 <h4 className="font-bold mb-4">Hizmetler</h4>
 <ul className="space-y-3 text-sm text-[var(--color-text-secondary)]">
 <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">E-Fatura Geçişi</a></li>
 <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Mali Danışmanlık</a></li>
 <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Bordrolama</a></li>
 <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Şirket Kuruluşu</a></li>
 </ul>
 </div>
 <div>
 <h4 className="font-bold mb-4">İletişim</h4>
 <ul className="space-y-3 text-sm text-[var(--color-text-secondary)]">
 <li>{businessData.address}</li>
 <li>{businessData.district}, {businessData.city}</li>
 <li><a href={`mailto:${businessData.email}`} className="text-[var(--color-accent)] hover:underline">{businessData.email}</a></li>
 </ul>
 </div>
 </div>
 <div className="container mx-auto max-w-[var(--container-default)] px-6 border-t border-[var(--color-border)] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[var(--color-text-muted)] font-medium">
 <p>© {new Date().getFullYear()} {businessData.name}. Tüm hakları saklıdır.</p>
 <div className="flex gap-6 mt-4 md:mt-0">
 <a href="#" className="hover:text-[var(--color-text)]">Gizlilik Politikası</a>
 <a href="#" className="hover:text-[var(--color-text)]">Şartlar ve Koşullar</a>
 </div>
 </div>
 </footer>
 </div>
 )
}
