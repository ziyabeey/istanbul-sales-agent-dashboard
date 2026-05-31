'use client'

import React, { useState, useEffect } from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'
import { Phone, MapPin, Instagram, Search, ArrowRight, Activity, HeartPulse, Stethoscope, Clock, ShieldAlert } from 'lucide-react'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function VetCerrahiSections({ config, businessData }: Props) {
 const [mounted, setMounted] = useState(false)

 useEffect(() => {
 setMounted(true)
 }, [])

 if (!mounted) return null

 return (
 <div className="min-h-screen font-body bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-accent)] selection:text-[var(--color-text-on-accent)]">
 
 {/* URGENT TOP BAR */}
 <div className="bg-[#DC2626] text-white text-sm font-bold py-3 px-6 flex justify-center items-center gap-3 animate-pulse">
 <ShieldAlert size={18} />
 <span>7/24 ACİL VETERİNER DESTEĞİ:</span>
 <a href={`tel:${businessData.phoneClean}`} className="underline tracking-wider">{businessData.phone}</a>
 </div>

 {/* HEADER */}
 <header className="sticky top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-white border-b border-[var(--color-border)] shadow-sm">
 <div className="font-heading font-black text-2xl tracking-tighter flex items-center gap-2">
 <Activity className="text-[var(--color-accent)]" size={32} />
 <div className="flex flex-col">
 <span className="leading-none text-[var(--color-text)]">{businessData.name}</span>
 <span className="text-[10px] text-[var(--color-text-secondary)] tracking-widest uppercase mt-1">Cerrahi & Yoğun Bakım</span>
 </div>
 </div>
 
 <div className="hidden lg:flex items-center gap-8">
 <a href="#uzmanliklar" className="text-sm font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">Uzmanlık Alanlarımız</a>
 <a href="#hekimler" className="text-sm font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">Hekim Kadromuz</a>
 <a href="#teknoloji" className="text-sm font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">Tıbbi Donanım</a>
 </div>

 <a href="#iletisim" className="bg-[var(--color-accent)] text-white px-6 py-3 rounded-xl text-sm font-black hover:bg-[var(--color-accent-hover)] transition-colors shadow-lg shadow-blue-900/20">
 HEMEN İLETİŞİME GEÇ
 </a>
 </header>

 {/* HERO: Hospital Style */}
 <section className="relative w-full overflow-hidden bg-[var(--color-surface)]">
 <div className="w-full max-w-[1240px] px-6 md:px-12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 lg:py-32">
 <div className="relative z-10 max-w-2xl">
 <h1 className="font-heading text-5xl lg:text-7xl font-black leading-[1.05] tracking-tighter mb-6 text-[var(--color-text)]">
 İleri Düzey <br/><span className="text-[var(--color-accent)]">Teşhis & Cerrahi.</span>
 </h1>
 <p className="text-[var(--color-text-secondary)] text-lg lg:text-xl mb-10 leading-relaxed font-medium max-w-lg">
 Tam donanımlı ameliyathane, yoğun bakım üniteleri ve uzman hekim kadrosuyla kritik anlarda yanınızdayız.
 </p>
 <div className="flex flex-wrap gap-4">
 <a href="#iletisim" className="inline-flex items-center justify-center gap-2 bg-[#DC2626] text-white px-8 py-4 rounded-xl font-black hover:bg-red-700 transition-colors shadow-xl shadow-red-600/30">
 <ShieldAlert size={20} /> Acil Destek Hattı
 </a>
 <a href="#uzmanliklar" className="inline-flex items-center justify-center gap-2 bg-white border border-[var(--color-border)] text-[var(--color-text)] px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors">
 Tıbbi Hizmetler
 </a>
 </div>
 </div>
 
 <div className="relative h-[400px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl">
 <div className="absolute inset-0 bg-blue-900/10 z-10 mix-blend-multiply"></div>
 <img 
 src={businessData.photos?.[0] || 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80'} 
 className="w-full h-full object-cover object-center grayscale-[20%]"
 alt="Veteriner Ameliyathane"
 />
 <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl z-20 shadow-xl border border-white/20">
 <div className="flex items-center gap-4">
 <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
 <Activity size={28} />
 </div>
 <div>
 <div className="text-2xl font-black">{businessData.rating} <span className="text-sm font-medium text-[var(--color-text-muted)]">/ 5.0</span></div>
 <div className="text-sm font-bold text-[var(--color-text-secondary)]">Başarı Oranı & Yüksek Memnuniyet</div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* MEDICAL EXPERTISE */}
 <section id="uzmanliklar" className="py-24 bg-white">
 <div className="max-w-[1240px] mx-auto px-6 md:px-12">
 <div className="text-center max-w-3xl mx-auto mb-20">
 <span className="text-[var(--color-accent)] font-bold tracking-widest uppercase text-sm mb-4 block">Tıbbi Hizmetler</span>
 <h2 className="font-heading text-4xl md:text-5xl font-black mb-6 tracking-tight">İleri Veteriner Tıbbı</h2>
 <p className="text-[var(--color-text-secondary)] text-lg">Hastanemiz en karmaşık vakalar için ileri teknoloji ve uzmanlığa sahiptir.</p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 {[
 { title: 'Ortopedi & Travmatoloji', desc: 'Kırık tedavileri, kalça displazisi, eklem operasyonları.', icon: <Activity size={32} /> },
 { title: 'Genel Cerrahi', desc: 'Yumuşak doku cerrahisi, onkolojik operasyonlar.', icon: <HeartPulse size={32} /> },
 { title: 'Yoğun Bakım', desc: '24 saat monitörizasyon, oksijen terapisi, kuvöz bakım.', icon: <Stethoscope size={32} /> },
 { title: 'Görüntüleme', desc: 'Dijital Röntgen, Renkli Doppler Ultrasonografi.', icon: <Search size={32} /> },
 { title: 'Laboratuvar', desc: 'Anında kan sayımı, biyokimya, hormon testleri.', icon: <ShieldAlert size={32} /> },
 { title: 'Dahiliye', desc: 'Kapsamlı iç hastalıkları teşhis ve tedavi protokolleri.', icon: <Clock size={32} /> }
 ].map((item, idx) => (
 <div key={idx} className="bg-[var(--color-surface)] p-8 rounded-3xl border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors group">
 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[var(--color-accent)] mb-6 shadow-sm group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors">
 {item.icon}
 </div>
 <h3 className="font-heading text-xl font-black mb-3">{item.title}</h3>
 <p className="text-[var(--color-text-secondary)] font-medium leading-relaxed">{item.desc}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* TEAM */}
 <section id="hekimler" className="py-24 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
 <div className="max-w-[1240px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-16">
 <div className="lg:col-span-1">
 <span className="text-[var(--color-accent)] font-bold tracking-widest uppercase text-sm mb-4 block">Kadro</span>
 <h2 className="font-heading text-4xl font-black mb-6 tracking-tight">Uzman <br/>Hekimlerimiz</h2>
 <p className="text-[var(--color-text-secondary)] text-lg mb-8 font-medium">
 Her biri kendi alanında uzmanlaşmış, ulusal ve uluslararası kongrelerde tecrübe edinmiş güçlü hekim kadrosu.
 </p>
 <div className="bg-white p-6 rounded-2xl border border-[var(--color-border)]">
 <div className="text-4xl font-black text-[var(--color-accent)] mb-2">{businessData.experience}</div>
 <div className="text-sm font-bold text-[var(--color-text-secondary)]">Kurumsal Tıbbi Deneyim</div>
 </div>
 </div>
 <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
 {[
 { name: businessData.team?.[0]?.name || 'Dr. Veteriner Hekim', role: 'Başhekim / Cerrahi Uzmanı', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80' },
 { name: 'Dt. Vet. Ayşe Yılmaz', role: 'Dahiliye & Görüntüleme', img: 'https://images.unsplash.com/photo-1594824436998-efa4c2d61d01?auto=format&fit=crop&q=80' }
 ].map((doc, i) => (
 <div key={i} className="group rounded-3xl overflow-hidden bg-white border border-[var(--color-border)] shadow-sm">
 <div className="aspect-square overflow-hidden bg-gray-100">
 <img src={doc.img} alt={doc.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
 </div>
 <div className="p-6">
 <h4 className="font-heading font-black text-xl mb-1">{doc.name}</h4>
 <p className="text-[var(--color-accent)] font-bold text-sm tracking-wide">{doc.role}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* FOOTER */}
 <footer className="bg-[#0A1929] text-white py-16 px-6 md:px-12 border-t border-[var(--color-border)]">
 <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
 <div>
 <div className="font-heading font-black text-3xl mb-4">{businessData.name}</div>
 <p className="text-blue-200 text-lg mb-6 max-w-sm">Dostlarınızın sağlığı, bizim uzmanlığımız.</p>
 <div className="flex flex-col gap-3 text-sm font-medium text-blue-100">
 <span className="flex items-center gap-3"><MapPin size={18} className="text-[var(--color-accent)]" /> {businessData.address}</span>
 <span className="flex items-center gap-3"><Phone size={18} className="text-[var(--color-accent)]" /> {businessData.phone}</span>
 </div>
 </div>
 <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/5">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><Clock size={24} className="text-red-400" /> Acil Durum</h4>
 <p className="text-blue-100 mb-6">Mesai saatleri dışında acil vakalar için her an hastanemize gelebilir veya nöbetçi hekimimize ulaşabilirsiniz.</p>
 <a href={`tel:${businessData.phoneClean}`} className="block w-full text-center bg-red-600 text-white font-black py-4 rounded-xl hover:bg-red-700 transition-colors">
 Acil: {businessData.phone}
 </a>
 </div>
 </div>
 <div className="max-w-[1240px] mx-auto mt-16 pt-8 border-t border-white/10 text-center text-sm text-blue-400/60 font-medium">
 © {new Date().getFullYear()} {businessData.name}. Powered by kepenk.ai
 </div>
 </footer>
 </div>
 )
}

registerSection('hero', 'vet_cerrahi_full', VetCerrahiSections as unknown as React.ComponentType<any>)
