'use client'

import React, { useState, useEffect } from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'
import { Phone, MapPin, Instagram, Mail, ArrowRight, Check, Heart, Shield, Clock } from 'lucide-react'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function VetKlinikSections({ config, businessData }: Props) {
 const [mounted, setMounted] = useState(false)

 useEffect(() => {
 setMounted(true)
 }, [])

 if (!mounted) return null

 // Hizmetler from business data
 const services = businessData.services || []
 
 return (
 <div className="min-h-screen font-body bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-accent)] selection:text-[var(--color-text-on-accent)]">
 
 {/* HEADER */}
 <header className="sticky top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-[var(--color-surface)] border-b border-[var(--color-border)] shadow-sm">
 <div className="font-heading font-bold text-2xl text-[var(--color-accent)] tracking-tight">
 {businessData.name}
 </div>
 <div className="hidden md:flex items-center gap-6">
 <a href="#hizmetler" className="text-sm font-medium hover:text-[var(--color-accent)] transition-colors">Hizmetlerimiz</a>
 <a href="#hakkimizda" className="text-sm font-medium hover:text-[var(--color-accent)] transition-colors">Kliniğimiz</a>
 <a href="#iletisim" className="text-sm font-medium hover:text-[var(--color-accent)] transition-colors">İletişim</a>
 </div>
 <a href="#iletisim" className="hidden sm:inline-flex bg-[var(--color-accent)] text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-[var(--color-accent-hover)] transition-colors">
 Randevu Al
 </a>
 </header>

 {/* HERO: Split Image Style (Friendly and Clean) */}
 <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-[var(--color-bg)] py-12">
 <div className="w-full max-w-[1240px] px-6 md:px-12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
 <div className="relative z-10 max-w-xl">
 <span className="inline-block bg-[var(--color-accent-light)] text-[var(--color-accent)] px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
 {businessData.slogan}
 </span>
 <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
 Dostlarınızın <br/><span className="text-[var(--color-accent)]">Sağlığı</span> Bizim Önceliğimiz.
 </h1>
 <p className="text-[var(--color-text-secondary)] text-lg mb-8 leading-relaxed max-w-lg">
 {businessData.city}, {businessData.district} bölgesinde evcil hayvanlarınız için şefkatli, modern ve tam donanımlı veteriner bakım hizmetleri sunuyoruz.
 </p>
 <div className="flex flex-col sm:flex-row gap-4">
 <a href="#iletisim" className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] text-white px-8 py-4 rounded-full font-bold hover:bg-[var(--color-accent-hover)] transition-colors shadow-lg shadow-blue-500/20">
 Hızlı İletişim <ArrowRight size={18} />
 </a>
 <a href={`tel:${businessData.phoneClean}`} className="inline-flex items-center justify-center gap-2 bg-white border border-[var(--color-border)] text-[var(--color-text)] px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-colors">
 <Phone size={18} /> {businessData.phone}
 </a>
 </div>
 </div>
 
 <div className="relative relative h-[400px] lg:h-[600px] w-full rounded-[2rem] overflow-hidden shadow-2xl">
 <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)] to-transparent opacity-20 z-10 rounded-[2rem]"></div>
 <img 
 src={businessData.photos?.[0] || 'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&q=80'} 
 className="w-full h-full object-cover object-center rounded-[2rem]"
 alt="Mutlu Köpek ve Veteriner"
 />
 </div>
 </div>
 </section>

 {/* QUICK FEATURES */}
 <section className="py-12 bg-white border-y border-[var(--color-border)]">
 <div className="max-w-[1240px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 bg-[var(--color-accent-light)] text-[var(--color-accent)] rounded-full flex items-center justify-center shrink-0">
 <Heart size={24} />
 </div>
 <div>
 <h4 className="font-bold text-lg">Şefkatli Bakım</h4>
 <p className="text-sm text-[var(--color-text-secondary)]">Stresten uzak ve güvenilir yaklaşım.</p>
 </div>
 </div>
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 bg-[var(--color-accent-light)] text-[var(--color-accent)] rounded-full flex items-center justify-center shrink-0">
 <Shield size={24} />
 </div>
 <div>
 <h4 className="font-bold text-lg">Modern Teknoloji</h4>
 <p className="text-sm text-[var(--color-text-secondary)]">Güncel ve donanımlı teşhis cihazları.</p>
 </div>
 </div>
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 bg-[var(--color-accent-light)] text-[var(--color-accent)] rounded-full flex items-center justify-center shrink-0">
 <Clock size={24} />
 </div>
 <div>
 <h4 className="font-bold text-lg">Hızlı Ulaşım</h4>
 <p className="text-sm text-[var(--color-text-secondary)]">Acil durumlar için her an yanınızda.</p>
 </div>
 </div>
 </div>
 </section>

 {/* ABOUT: Split Left */}
 <section id="hakkimizda" className="py-24 px-6 md:px-12 bg-[var(--color-surface)]">
 <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
 <div className="order-2 lg:order-1 relative aspect-square w-full max-w-md mx-auto lg:max-w-none rounded-[2rem] overflow-hidden border-8 border-white shadow-xl">
 <img 
 src={businessData.photos?.[1] || 'https://images.unsplash.com/photo-1599443015574-be5fe8a05783?auto=format&fit=crop&q=80'} 
 alt="Veteriner Kliniği İçi" 
 className="w-full h-full object-cover"
 />
 </div>
 <div className="order-1 lg:order-2">
 <span className="block text-sm tracking-widest text-[var(--color-accent)] font-bold uppercase mb-4">Hakkımızda</span>
 <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-6">
 {businessData.experience}Aşkın Tecrübe.
 </h2>
 <p className="text-[var(--color-text-secondary)] mb-8 text-lg leading-relaxed">
 {businessData.foundedYear} yılından beri {businessData.district} bölgesinde binlerce patili dostumuzun sağlığını koruyor ve onların mutlu, uzun bir ömür sürmelerine destek oluyoruz.
 </p>
 
 <ul className="space-y-4 mb-10">
 {['Deneyimli Veteriner Hekim Kadrosu', 'Geniş Kapsamlı Laboratuvar', 'Koruyucu Hekimlik Odaklı Yaklaşım'].map((feat, i) => (
 <li key={i} className="flex items-center gap-3 text-base font-medium">
 <div className="w-6 h-6 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center shrink-0">
 <Check size={14} strokeWidth={3} />
 </div>
 {feat}
 </li>
 ))}
 </ul>
 
 <div className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-sm border border-[var(--color-border)] inline-flex">
 <div className="text-center">
 <div className="font-heading font-black text-3xl text-[var(--color-accent)] mb-1">{businessData.rating}</div>
 <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest font-bold">Puan</div>
 </div>
 <div className="w-px h-12 bg-[var(--color-border)]"></div>
 <div className="text-center">
 <div className="font-heading font-black text-3xl text-[var(--color-text)] mb-1">+{businessData.reviewCount}</div>
 <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest font-bold">Mutlu Dost</div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* SERVICES: Clean Grid */}
 <section id="hizmetler" className="py-24 px-6 md:px-12 bg-white">
 <div className="max-w-[1240px] mx-auto">
 <div className="text-center max-w-2xl mx-auto mb-16">
 <span className="block text-sm tracking-widest text-[var(--color-accent)] font-bold uppercase mb-4">Uzmanlıklarımız</span>
 <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6">Kapsamlı <br className="hidden md:block" />Veteriner Hizmetleri.</h2>
 <p className="text-[var(--color-text-secondary)] text-lg">Tüm ihtiyaçlarınız için tek çatı altında eksiksiz tanı ve tedavi.</p>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
 {services.map((item: any, idx: number) => (
 <div key={item.id || idx} className="bg-[var(--color-bg)] p-8 rounded-[2rem] border border-[var(--color-border)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
 <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm border border-[var(--color-border)]">
 {item.icon || '🐾'}
 </div>
 <h3 className="font-heading text-xl font-bold mb-3">{item.name}</h3>
 <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
 {item.description || 'Patili dostlarımızın sağlıklı bir yaşam sürmesi için en uygun tedavi yöntemleri.'}
 </p>
 <span className="inline-flex items-center gap-2 text-[var(--color-accent)] text-sm font-bold group-hover:underline">
 Detaylı Bilgi <ArrowRight size={14} />
 </span>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* CONTACT & CTA */}
 <section id="iletisim" className="py-24 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
 <div className="max-w-[1200px] mx-auto px-6 md:px-12">
 <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-lg border border-[var(--color-border)] relative overflow-hidden">
 <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
 <div>
 <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">Randevu Alın</h2>
 <p className="text-[var(--color-text-secondary)] mb-8 text-lg">Kontenjan dolmadan online sistemimiz veya çağrı merkezimiz üzerinden bize ulaşın.</p>
 
 <div className="space-y-6 mb-10">
 <div className="flex items-start gap-4">
 <MapPin className="text-[var(--color-accent)] mt-1" size={24} />
 <div>
 <h4 className="font-bold mb-1">Klinik Adresi</h4>
 <p className="text-sm text-[var(--color-text-secondary)]">{businessData.address}</p>
 </div>
 </div>
 <div className="flex items-start gap-4">
 <Phone className="text-[var(--color-accent)] mt-1" size={24} />
 <div>
 <h4 className="font-bold mb-1">Telefon / WhatsApp</h4>
 <p className="text-sm text-[var(--color-text-secondary)]">{businessData.phone}</p>
 </div>
 </div>
 </div>
 </div>
 <div className="bg-[var(--color-bg)] p-8 rounded-3xl border border-[var(--color-border)] flex flex-col justify-center items-center text-center">
 <div className="w-16 h-16 bg-[var(--color-accent-light)] text-[var(--color-accent)] rounded-full flex items-center justify-center mb-6">
 <Mail size={32} />
 </div>
 <h3 className="font-bold text-2xl mb-2">Hızlı Mesaj Gönder</h3>
 <p className="text-[var(--color-text-secondary)] mb-8 text-sm max-w-xs">WhatsApp üzerinden saniyeler içinde doğrudan resepsiyonumuza bağlanın.</p>
 <a 
 href={`https://wa.me/${businessData.whatsapp}`} 
 target="_blank" 
 rel="noopener noreferrer"
 className="w-full sm:w-auto bg-[#25D366] text-white font-bold px-10 py-4 rounded-full shadow-lg shadow-green-500/20 hover:bg-[#128C7E] transition-colors"
 >
 WhatsApp'tan Yaz
 </a>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* FOOTER */}
 <footer className="py-12 px-6 bg-[var(--color-bg)] border-t border-[var(--color-border)] text-center text-sm text-[var(--color-text-muted)]">
 <div className="font-heading font-black text-2xl text-[var(--color-text)] mb-4">{businessData.name}</div>
 <p className="mb-6 max-w-sm mx-auto">Sizlerin patili çocuklarına kendi çocuğumuz gibi bakıyoruz.</p>
 <div className="flex items-center justify-center gap-4 mb-8">
 {businessData.socialMedia?.instagram && (
 <a href={businessData.socialMedia.instagram} target="_blank" className="p-3 bg-white rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[#E1306C] transition-colors">
 <Instagram size={20} />
 </a>
 )}
 </div>
 <div>
 © {new Date().getFullYear()} {businessData.name} — Tüm hakları saklıdır.
 </div>
 </footer>
 </div>
 )
}

registerSection('hero', 'vet_klinik_full', VetKlinikSections as unknown as React.ComponentType<any>)
