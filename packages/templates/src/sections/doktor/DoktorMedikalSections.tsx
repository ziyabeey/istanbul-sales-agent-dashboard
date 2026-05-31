'use client'

import React, { useState, useEffect } from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { Phone, MapPin, Calendar, Search, ArrowRight, User, Stethoscope, ChevronRight, Play, HeartPulse, Activity } from 'lucide-react'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function DoktorMedikalSections({ config, businessData }: Props) {
 const [mounted, setMounted] = useState(false)
 const [activeTab, setActiveTab] = useState(0)

 useEffect(() => {
 setMounted(true)
 }, [])

 if (!mounted) return null

 const departments = businessData.services || []

 return (
 <div className="min-h-screen bg-[var(--color-bg)] font-body text-[var(--color-text)] selection:bg-[var(--color-accent)] selection:text-white">
 
 {/* EMERGENCY TOP BAR */}
 <div className="bg-red-600 text-white text-xs md:text-sm py-2 px-4 md:px-8 flex justify-center items-center gap-4 font-medium tracking-wide">
 <HeartPulse size={16} className="animate-pulse" />
 <span>Acil Servis 7/24 Açık: <strong>444 0 000</strong></span>
 </div>

 {/* HEADER - Enterprise Complex */}
 <header className="bg-white border-b border-[var(--color-border)] sticky top-0 z-50 shadow-sm">
 <div className="max-w-[var(--container-default,1440px)] mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
 
 <div className="flex items-center gap-12">
 <div className="font-heading font-extrabold text-2xl md:text-3xl text-[var(--color-text-secondary)] tracking-tight">
 {businessData.name.split(' ')[0]} <span className="text-[var(--color-accent)]">{businessData.name.split(' ').slice(1).join(' ')}</span>
 </div>
 
 <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-[var(--color-text-secondary)]">
 <a href="#uzmanliklar" className="hover:text-[var(--color-accent)] transition-colors">Tıbbi Birimler</a>
 <a href="#doktorlar" className="hover:text-[var(--color-accent)] transition-colors">Hekimlerimiz</a>
 <a href="#hastane" className="hover:text-[var(--color-accent)] transition-colors">Hastanelerimiz</a>
 <a href="#iletisim" className="hover:text-[var(--color-accent)] transition-colors">İletişim</a>
 </nav>
 </div>

 <div className="flex items-center gap-4">
 <div className="hidden md:flex relative">
 <input type="text" placeholder="Doktor veya bölüm arayın..." className="pl-10 pr-4 py-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-[var(--radius-btn)] text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors w-64" />
 <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
 </div>
 
 <a href="#randevu" className="bg-[var(--color-accent)] text-white px-6 py-2.5 rounded-[var(--radius-btn)] font-bold text-sm hover:bg-[var(--color-accent-hover)] transition-colors flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200">
 <Calendar size={16} /> E-Randevu
 </a>
 </div>
 </div>
 </header>

 <main className="pb-24">
 
 {/* HERO - Enterprise Slider Simulation */}
 <section className="relative h-[80vh] min-h-[600px] flex items-center bg-[var(--color-surface-muted)] overflow-hidden">
 {/* Background Video/Image Placeholder */}
 <div className="absolute inset-0 z-0">
 <img src={businessData.photos?.[0] || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80'} alt="Hospital" className="w-full h-full object-cover object-right-top" />
 <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
 </div>

 <div className="max-w-[var(--container-default,1440px)] mx-auto w-full px-4 md:px-8 relative z-10">
 <div className="max-w-2xl">
 <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--color-surface-muted)] text-[var(--color-accent-hover)] font-semibold text-xs uppercase tracking-widest mb-6">
 <Activity size={14} /> JCI Akreditasyonlu Sağlık Ağı
 </div>
 
 <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-[var(--color-text)] leading-tight mb-6 tracking-tight">
 Sağlıkta<br/>
 <span className="text-[var(--color-accent)]">Güvenin</span> Merkezi.
 </h1>
 
 <p className="text-lg text-[var(--color-text-secondary)] font-medium leading-relaxed mb-10 max-w-xl">
 {businessData.slogan}. İleri tıp teknolojileri, akademik kadromuz ve hasta odaklı yaklaşımımız ile 7/24 yanınızdayız.
 </p>

 <div className="flex flex-wrap items-center gap-4">
 <button className="bg-[var(--color-accent)] text-white px-8 py-4 rounded-[var(--radius-btn)] font-bold hover:bg-[var(--color-accent-hover)] hover:shadow-xl transition-all duration-300 flex items-center gap-2 text-lg">
 Tıbbi Görüş Alın <ArrowRight size={20} />
 </button>
 <button className="bg-white text-[var(--color-text)] px-8 py-4 rounded-[var(--radius-btn)] font-bold hover:bg-gray-50 border border-[var(--color-border)] shadow-sm transition-all duration-300 flex items-center gap-3 text-lg">
 <div className="w-8 h-8 rounded-full bg-[var(--color-surface-muted)] text-[var(--color-accent)] flex items-center justify-center"><Play size={14} className="ml-0.5" /></div> Kurumsal Film
 </button>
 </div>
 </div>
 </div>

 {/* Quick Action Bar (Bottom of Hero) */}
 <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-md border-t border-[var(--color-border)] transform translate-y-1/2 hidden md:block z-20">
 <div className="max-w-[var(--container-default,1440px)] mx-auto px-8 py-6 grid grid-cols-4 gap-8">
 {[
 { icon: <Search size={24}/>, title: 'Doktor Bul', desc: 'Branş ve Uzmanlık Araması' },
 { icon: <Calendar size={24}/>, title: 'E-Randevu', desc: 'Hızlı ve kolay randevu' },
 { icon: <Activity size={24}/>, title: 'E-Sonuç', desc: 'Laboratuvar ve Görüntüleme' },
 { icon: <MapPin size={24}/>, title: 'Hastanelerimiz', desc: 'Lokasyon ve Yol Tarifi' }
 ].map((action, idx) => (
 <div key={idx} className="flex items-start gap-4 cursor-pointer group">
 <div className="w-12 h-12 rounded-lg bg-[var(--color-surface)] text-[var(--color-accent)] flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors duration-300">
 {action.icon}
 </div>
 <div>
 <h3 className="font-heading font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">{action.title}</h3>
 <p className="text-sm text-[var(--color-text-secondary)]">{action.desc}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* TIBBİ BİRİMLER (Multi-Department Matrix) */}
 <section id="uzmanliklar" className="pt-40 pb-20 bg-[var(--color-bg)]">
 <div className="max-w-[var(--container-default,1440px)] mx-auto px-4 md:px-8">
 <div className="flex justify-between items-end mb-12">
 <div>
 <h2 className="font-heading text-4xl font-extrabold text-[var(--color-text)] mb-4 tracking-tight">Tıbbi Birimlerimiz</h2>
 <p className="text-[var(--color-text-secondary)] text-lg">Tüm branşlarda, en güncel tanı ve tedavi yöntemleriyle hizmetinizdeyiz.</p>
 </div>
 <a href="#" className="hidden sm:flex items-center gap-1 font-bold text-[var(--color-accent)] hover:underline">Tüm Birimleri İncele <ChevronRight size={20} /></a>
 </div>

 {/* Advanced Tabbed Grid System */}
 <div className="flex flex-col lg:flex-row gap-8">
 {/* Sidebar Tabs */}
 <div className="w-full lg:w-1/4 flex flex-col gap-2">
 {departments.map((dept, idx) => (
 <button 
 key={idx}
 onClick={() => setActiveTab(idx)}
 className={`text-left px-6 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex justify-between items-center ${activeTab === idx ? 'bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/30' : 'bg-white text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] border border-[var(--color-border)]'}`}
 >
 <span className="flex items-center gap-3"><span className="text-xl">{dept.icon}</span> {dept.name}</span>
 {activeTab === idx && <ChevronRight size={20} />}
 </button>
 ))}
 </div>
 
 {/* Content Area */}
 <div className="w-full lg:w-3/4 bg-white border border-[var(--color-border)] rounded-2xl p-8 md:p-12 shadow-sm min-h-[400px] flex flex-col justify-between">
 {departments[activeTab] && (
 <div className="animate-fade-in">
 <div className="flex items-center gap-4 mb-6">
 <div className="w-16 h-16 rounded-2xl bg-[var(--color-surface)] text-[var(--color-accent)] flex items-center justify-center text-3xl">
 {departments[activeTab].icon}
 </div>
 <h3 className="font-heading text-4xl font-extrabold text-[var(--color-text)]">{departments[activeTab].name} Merkezi</h3>
 </div>
 <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-3xl mb-12">
 {departments[activeTab].name} bölümümüzde, alanında uzman profesör ve doçent kadromuz ile en ileri düzey tanı ve tedavi merkezlerimiz hizmetinizdedir. Multidisipliner konsey yaklaşımıyla kişiye özel tedavi planlanır.
 </p>
 
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
 {['Uzman Kadro', 'İleri Teknoloji Cihazlar', 'Multidisipliner Yaklaşım', '7/24 Acil Müdahale', 'Konforlu Hasta Odaları', 'Kişiselleştirilmiş Tedavi'].map((item, i) => (
 <div key={i} className="flex items-center gap-2 text-[var(--color-text-secondary)] font-medium">
 <Activity size={18} className="text-[var(--color-accent)]" /> {item}
 </div>
 ))}
 </div>
 </div>
 )}
 
 <div className="pt-8 border-t border-[var(--color-border)] flex items-center gap-4">
 <button className="bg-[var(--color-surface)] text-[var(--color-accent)] px-8 py-3 rounded-[var(--radius-btn)] font-bold hover:bg-[var(--color-accent)] hover:text-white transition-colors">
 Bölüm Doktorları
 </button>
 <button className="bg-[var(--color-accent)] text-white px-8 py-3 rounded-[var(--radius-btn)] font-bold hover:bg-[var(--color-accent-hover)] transition-colors shadow-md">
 Randevu Al
 </button>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* STATS MATRIX (Dark Enterprise Block) */}
 <section className="bg-[var(--color-text)] py-20 text-white">
 <div className="max-w-[var(--container-default,1440px)] mx-auto px-4 md:px-8">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/10">
 {[
 { value: businessData.experience, label: 'Yıllık Deneyim' },
 { value: '500+', label: 'Uzman Hekim' },
 { value: '2M+', label: 'Mutlu Hasta' },
 { value: 'JCI', label: 'Altın Akreditasyon' }
 ].map((stat, idx) => (
 <div key={idx} className="flex flex-col items-center justify-center text-center px-4">
 <div className="font-heading text-5xl md:text-6xl font-extrabold text-white mb-2">{stat.value}</div>
 <div className="text-[var(--color-surface-muted)] font-bold uppercase tracking-widest text-sm">{stat.label}</div>
 </div>
 ))}
 </div>
 </div>
 </section>

 </main>

 {/* ENTERPRISE FOOTER */}
 <footer className="bg-white border-t border-[var(--color-border)] pt-20 pb-10">
 <div className="max-w-[var(--container-default,1440px)] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
 <div className="lg:col-span-2 pr-8">
 <h3 className="font-heading font-extrabold text-2xl mb-6 text-[var(--color-text)]">{businessData.name}</h3>
 <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8">{businessData.slogan}. İnsan hayatına değer katan sağlık hizmetleri vizyonuyla hizmetinizdeyiz.</p>
 <div className="flex gap-4">
 <a href={`tel:${businessData.phoneClean}`} className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-surface)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-colors border border-[var(--color-border)]"><Phone size={20} /></a>
 <a href="#" className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-surface)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-colors border border-[var(--color-border)]"><MapPin size={20} /></a>
 </div>
 </div>
 
 <div>
 <h4 className="font-heading font-bold text-lg mb-6 text-[var(--color-text)] uppercase tracking-wider">Kurumsal</h4>
 <ul className="space-y-4 text-[var(--color-text-secondary)] font-medium">
 <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Hakkımızda</a></li>
 <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Yönetim Kadrosu</a></li>
 <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Kalite Belgelerimiz</a></li>
 <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">İnsan Kaynakları</a></li>
 </ul>
 </div>

 <div>
 <h4 className="font-heading font-bold text-lg mb-6 text-[var(--color-text)] uppercase tracking-wider">Hastanemiz</h4>
 <ul className="space-y-4 text-[var(--color-text-secondary)] font-medium">
 <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Tıbbi Birimler</a></li>
 <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Doktorlarımız</a></li>
 <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Uluslararası Hastalar</a></li>
 <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Anlaşmalı Kurumlar</a></li>
 </ul>
 </div>

 <div>
 <h4 className="font-heading font-bold text-lg mb-6 text-[var(--color-text)] uppercase tracking-wider">E-Hizmetler</h4>
 <ul className="space-y-4 text-[var(--color-text-secondary)] font-medium">
 <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">E-Randevu</a></li>
 <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">E-Sonuç</a></li>
 <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">E-Geçmiş</a></li>
 <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Online Doktor (Tele-Tıp)</a></li>
 </ul>
 </div>
 </div>

 <div className="max-w-[var(--container-default,1440px)] mx-auto px-4 md:px-8 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--color-text-muted)] font-medium">
 <div>© {new Date().getFullYear()} {businessData.name}. Tüm hakları saklıdır.</div>
 <div className="flex gap-6">
 <a href="#" className="hover:text-[var(--color-accent)]">KVKK Aydınlatma Mesajı</a>
 <a href="#" className="hover:text-[var(--color-accent)]">Çerez Politikası</a>
 <a href="#" className="hover:text-[var(--color-accent)]">Hasta Hakları</a>
 </div>
 </div>
 </footer>

 </div>
 )
}
