'use client'

import React, { useState, useEffect } from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'
import { Phone, MapPin, Search, ArrowRight, Instagram, Leaf, Bird, Snail, Heart, AlertCircle, Check } from 'lucide-react'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function VetEgzotikSections({ config, businessData }: Props) {
 const [mounted, setMounted] = useState(false)
 const [activeTab, setActiveTab] = useState('kus')

 useEffect(() => {
 setMounted(true)
 }, [])

 if (!mounted) return null

 const tabs = [
 { id: 'kus', label: 'Kanatlılar', icon: <Bird size={18} />, color: 'bg-emerald-100 text-emerald-700' },
 { id: 'surungen', label: 'Sürüngenler', icon: <Snail size={18} />, color: 'bg-amber-100 text-amber-700' },
 { id: 'kucukmemeli', label: 'Küçük Memeliler', icon: <Heart size={18} />, color: 'bg-rose-100 text-rose-700' },
 ]

 return (
 <div className="min-h-screen font-body bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-accent)] selection:text-[var(--color-text-on-accent)]">
 
 {/* HEADER */}
 <header className="absolute top-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center text-white bg-gradient-to-b from-black/60 to-transparent">
 <div className="font-heading font-black text-2xl tracking-tight flex items-center gap-2">
 <Leaf className="text-[var(--color-accent)]" size={28} />
 <span>{businessData.name}</span>
 </div>
 
 <div className="hidden lg:flex items-center gap-10">
 <a href="#uzmanlik" className="text-sm font-bold tracking-wide hover:text-[var(--color-accent)] transition-colors">Uzmanlık</a>
 <a href="#hakkimizda" className="text-sm font-bold tracking-wide hover:text-[var(--color-accent)] transition-colors">Hakkımızda</a>
 <a href="#iletisim" className="text-sm font-bold tracking-wide hover:text-[var(--color-accent)] transition-colors">İletişim</a>
 </div>

 <a href="#iletisim" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-white hover:text-black transition-colors">
 Randevu Talebi
 </a>
 </header>

 {/* HERO: Nature Immersive */}
 <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
 <div className="absolute inset-0 bg-black/40 z-10"></div>
 <img 
 src={businessData.photos?.[0] || 'https://images.unsplash.com/photo-1550853024-fae8cd4be47f?auto=format&fit=crop&q=80'} 
 className="absolute inset-0 w-full h-full object-cover"
 alt="Egzotik Hayvan Veterineri"
 />
 <div className="relative z-20 w-full max-w-[1240px] px-6 md:px-12 mx-auto text-center md:text-left text-white mt-16">
 <span className="inline-block bg-[var(--color-accent)] text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 shadow-xl shadow-green-900/40">
 EGZOTİK HAYVAN UZMANI
 </span>
 <h1 className="font-heading text-5xl md:text-6xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-8">
 Özel Dostlar İçin <br/><span className="text-[var(--color-accent-light)] italic">Özel Bakım.</span>
 </h1>
 <p className="text-white/80 text-lg lg:text-xl mb-10 leading-relaxed font-medium max-w-xl mx-auto md:mx-0">
 Papağanlar, kertenkeleler, tavşanlar ve hamsterlar... Sadece kedi/köpek değil, egzotik evcil hayvanlarınız için eşsiz medikal çözümler.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
 <a href="#uzmanlik" className="inline-flex items-center justify-center gap-3 bg-[var(--color-accent)] text-white px-8 py-4 rounded-full font-bold hover:bg-[var(--color-accent-hover)] transition-colors shadow-lg shadow-green-900/20">
 Tedavi Alanları
 </a>
 <a href={`tel:${businessData.phoneClean}`} className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#2A3B2C] transition-colors">
 <Phone size={20} /> Beni Arayın
 </a>
 </div>
 </div>
 </section>

 {/* EXPERTISE TABS */}
 <section id="uzmanlik" className="py-24 bg-[var(--color-surface)]">
 <div className="max-w-[1240px] mx-auto px-6 md:px-12">
 <div className="text-center max-w-2xl mx-auto mb-16">
 <h2 className="font-heading text-4xl font-black mb-6">Farklı Türler, Doğru Uzmanlık.</h2>
 <p className="text-[var(--color-text-secondary)] text-lg">Egzotik hayvanların fizyolojisi standart petlerden tamamen farklıdır. Bize güvenebilirsiniz.</p>
 </div>

 <div className="flex flex-wrap justify-center gap-4 mb-16">
 {tabs.map(tab => (
 <button 
 key={tab.id}
 onClick={() => setActiveTab(tab.id)}
 className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all ${activeTab === tab.id ? 'bg-[var(--color-accent)] text-white shadow-lg scale-105' : 'bg-white text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:bg-gray-50'}`}
 >
 {tab.icon} {tab.label}
 </button>
 ))}
 </div>

 <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-[var(--color-accent)]/5 border border-[var(--color-border)] grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
 <div className="order-2 md:order-1 relative h-64 md:h-96 rounded-3xl overflow-hidden bg-gray-100">
 <img 
 src={activeTab === 'kus' ? 'https://images.unsplash.com/photo-1544607775-60293ebf1e9c?auto=format&fit=crop&q=80' : activeTab === 'surungen' ? 'https://images.unsplash.com/photo-1616854194098-b800109b8a34?auto=format&fit=crop&q=80' : 'https://images.unsplash.com/photo-1585110396000-c9eae0dc8c4e?auto=format&fit=crop&q=80'} 
 alt="Egzotik Hayvan"
 className="w-full h-full object-cover transition-opacity duration-500"
 />
 </div>
 <div className="order-1 md:order-2">
 <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 ${tabs.find(t=>t.id===activeTab)?.color}`}>
 {tabs.find(t=>t.id===activeTab)?.label}
 </div>
 <h3 className="font-heading text-3xl font-black mb-6">
 {activeTab === 'kus' ? 'Kanatlı Hastalıkları & Koruyucu Hekimlik' : activeTab === 'surungen' ? 'Sürüngen Vücut Isısı & Metabolizma' : 'Tavşan & Kemirgen Beslenmesi'}
 </h3>
 <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-8">
 {activeTab === 'kus' ? 'Papağan, muhabbet kuşu, egzotik kuş türleri için tüy dökümü problemleri, kursak enfeksiyonları ve kanat kesimi/bakımı rutinlerimiz mevcuttur.' : activeTab === 'surungen' ? 'Iguana, bukalemun, yılan gibi dostlarımızın UVB ihtiyaçları, kalsiyum eksiklikleri ve deri dökme problemlerine özel çözümler.' : 'Tavşanlar ve guinea pigler ağırlıklı olmak üzere diş törpüleme, sindirim sistemi tıkanıklıkları (staz) ve kısırlık cerrahileri.'}
 </p>
 <ul className="space-y-4 mb-8">
 {['Özel Diyetesyen Danışmanlığı', 'Türlere Özel Kan Tahlilleri', 'Özel Boyutlarda Cerrahi Aletler'].map((item, i) => (
 <li key={i} className="flex items-center gap-3 font-semibold text-[var(--color-text)]">
 <Check size={18} className="text-[var(--color-accent)]" /> {item}
 </li>
 ))}
 </ul>
 </div>
 </div>
 </div>
 </section>

 {/* FOOTER */}
 <footer id="iletisim" className="bg-[#1A2E20] text-white py-20 px-6 md:px-12">
 <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
 <div>
 <Leaf className="text-[var(--color-accent)] mb-6" size={40} />
 <h4 className="font-heading font-black text-4xl mb-6">Bize Ulaşın</h4>
 <p className="text-green-100/80 mb-10 text-lg max-w-md">Kliniğimize gelmeden önce telefonla randevu almanız, dostunuz için en uygun bekleme koşullarını hazırlamamızı sağlar.</p>
 
 <div className="space-y-6 text-green-100 font-medium text-lg">
 <p className="flex items-center gap-4"><Phone className="text-[var(--color-accent)]" /> {businessData.phone}</p>
 <p className="flex items-center gap-4"><MapPin className="text-[var(--color-accent)]" /> {businessData.address}</p>
 </div>
 </div>
 
 <div className="bg-[#233A2A] p-8 md:p-10 rounded-[2rem] border border-green-900/50">
 <div className="flex items-center gap-4 mb-8 text-amber-400 font-bold bg-amber-400/10 p-4 rounded-xl">
 <AlertCircle size={24} /> Yalnızca egzotik türler için hizmet verilmektedir. (Kedi/Köpek kabul edilmemektedir.)
 </div>
 <a 
 href={`https://wa.me/${businessData.whatsapp}`} 
 target="_blank" 
 rel="noopener noreferrer"
 className="block w-full text-center bg-[var(--color-accent)] text-white font-black py-5 rounded-full hover:bg-[var(--color-accent-hover)] transition-colors text-lg"
 >
 WhatsApp'tan İletişime Geç
 </a>
 </div>
 </div>
 </footer>
 </div>
 )
}

registerSection('hero', 'vet_egzotik_full', VetEgzotikSections as unknown as React.ComponentType<any>)
