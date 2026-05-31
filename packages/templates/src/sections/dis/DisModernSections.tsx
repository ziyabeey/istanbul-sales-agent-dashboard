'use client'

import React, { useState, useEffect } from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { MapPin, Phone, Mail, Clock, CheckCircle2, ChevronRight, Activity, Smile, Stethoscope, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function DisModernSections({ business: businessData }: any) {
 const fadeUp: any = {
 hidden: { opacity: 0, y: 30 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
 }

 const stagger: any = {
 hidden: { opacity: 0 },
 visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
 }

 return (
 <div className="font-body bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-accent)] selection:text-white">
 
 {/* HEADER - Sticky minimal */}
 <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[var(--color-border)] shadow-sm">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
 <div className="flex items-center gap-3">
 <div className="bg-[var(--color-surface)] p-2 rounded-xl text-[var(--color-accent)]">
 <Smile size={28} strokeWidth={2.5}/>
 </div>
 <div>
 <h1 className="font-heading text-xl font-bold tracking-tight leading-none text-[var(--color-text)]">{businessData.name}</h1>
 <p className="text-xs text-[var(--color-text-secondary)] font-medium mt-1">{businessData?.ownerName as string}</p>
 </div>
 </div>

 <nav className="hidden md:flex gap-8 text-sm font-semibold">
 <a href="#hizmetler" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">Tedaviler</a>
 <a href="#hakkimizda" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">Hakkımızda</a>
 <a href="#iletisim" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">İletişim</a>
 </nav>

 <a href="#iletisim" className="bg-[var(--color-accent)] text-white px-6 py-2.5 rounded-[var(--radius-btn)] font-medium text-sm hover:bg-[var(--color-accent-hover)] transition-colors shadow-md hidden sm:inline-block">
 Randevu Al
 </a>
 </div>
 </header>

 {/* HERO - Split Clean */}
 <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
 <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
 <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface)] text-[var(--color-accent)] text-xs font-semibold uppercase tracking-wider mb-6">
 <Activity size={14} /> GÜVENLİ VE HİJYENİK
 </motion.span>
 <motion.h2 variants={fadeUp} className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--color-accent)] leading-[1.1] mb-6">
 Sağlıklı Gülüşler İçin <br/> 
 <span className="text-[var(--color-text)] text-3xl sm:text-4xl lg:text-5xl mt-2 block">
 Uzman Bakım {businessData.district}&apos;de.
 </span>
 </motion.h2>
 <motion.p variants={fadeUp} className="text-[var(--color-text-muted)] text-lg mb-8 max-w-lg">
 {`${businessData.name} olarak, en güncel teknolojilerle ağrısız ve konforlu tedavi seçenekleri sunuyoruz.`}
 </motion.p>
 <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
 <a href="#iletisim" className="bg-[var(--color-accent)] text-white px-8 py-3.5 rounded-[var(--radius-btn)] font-semibold text-center hover:bg-[var(--color-accent-hover)] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
 Hemen Randevu Al <ArrowRight size={18}/>
 </a>
 <a href="#hizmetler" className="bg-white text-[var(--color-text)] border border-[var(--color-border)] px-8 py-3.5 rounded-[var(--radius-btn)] font-semibold text-center hover:bg-[var(--color-bg)] transition-colors">
 Tedavileri İncele
 </a>
 </motion.div>
 
 <motion.div variants={fadeUp} className="mt-10 flex items-center gap-4 text-sm font-medium text-[var(--color-text-secondary)]">
 <div className="flex -space-x-2">
 {[1,2,3,4].map(i => (
 <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-teal-100 flex items-center justify-center text-[var(--color-accent)] text-xs font-bold">
 {(businessData.reviewCount || 528) > 100 ? `${businessData.rating}` : '5.0'}
 </div>
 ))}
 </div>
 <p>Google'da <strong>{businessData.reviewCount || 528}+</strong> mutlu hasta değerlendirmesi</p>
 </motion.div>
 </motion.div>
 
 <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative lg:ml-auto w-full max-w-lg">
 <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-surface)] to-[var(--color-bg)] rounded-[2rem] transform rotate-3"></div>
 <img 
 src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80" 
 alt="Diş Kliniği" 
 className="relative rounded-[2rem] object-cover w-full h-[500px] shadow-2xl border-4 border-white"
 />
 <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-[var(--color-border)] flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
 <div className="bg-green-100 p-3 rounded-full text-green-600">
 <CheckCircle2 size={24} />
 </div>
 <div>
 <p className="font-bold text-[var(--color-text)]">Aynı Gün</p>
 <p className="text-xs text-[var(--color-text-muted)]">Acil Müdahale</p>
 </div>
 </div>
 </motion.div>
 </div>
 </div>
 </section>

 {/* STATS */}
 <section className="py-12 bg-white border-y border-[var(--color-border)]">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-[var(--color-border)] text-center">
 <div className="flex flex-col items-center">
 <span className="text-3xl md:text-4xl font-heading font-bold text-[var(--color-accent)] mb-2">{businessData.experience || '10+'}</span>
 <span className="text-sm font-medium text-[var(--color-text-muted)]">Yıllık Tecrübe</span>
 </div>
 <div className="flex flex-col items-center pl-4">
 <span className="text-3xl md:text-4xl font-heading font-bold text-[var(--color-accent)] mb-2">{businessData.reviewCount || '500+'}</span>
 <span className="text-sm font-medium text-[var(--color-text-muted)]">Mutlu Hasta</span>
 </div>
 <div className="flex flex-col items-center pl-4">
 <span className="text-3xl md:text-4xl font-heading font-bold text-[var(--color-accent)] mb-2">%100</span>
 <span className="text-sm font-medium text-[var(--color-text-muted)]">Sterilizasyon</span>
 </div>
 <div className="flex flex-col items-center pl-4">
 <span className="text-3xl md:text-4xl font-heading font-bold text-[var(--color-accent)] mb-2">{businessData.rating || '5.0'}</span>
 <span className="text-sm font-medium text-[var(--color-text-muted)]">Google Puanı</span>
 </div>
 </div>
 </div>
 </section>

 {/* SERVICES */}
 <section id="hizmetler" className="py-24 bg-[var(--color-bg)]">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center max-w-2xl mx-auto mb-16">
 <span className="text-[var(--color-accent)] font-semibold tracking-wider uppercase text-sm mb-3 block">TEDAVİLERİMİZ</span>
 <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">Size Özel Çözümler</h2>
 <p className="text-[var(--color-text-muted)]">Kapsamlı diş hekimliği hizmetlerimizle her yaştan hastamıza sağlıklı ve estetik gülüşler kazandırıyoruz.</p>
 </div>

 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
 {businessData.services?.map((service: any, i: number) => (
 <motion.div 
 key={i}
 initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeUp} transition={{ delay: i * 0.1 }}
 className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--color-border)] hover:shadow-md transition-shadow group flex flex-col items-start"
 >
 <div className="bg-[var(--color-surface)] w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform text-[var(--color-accent)]">
 {service.icon || <Activity size={24} />}
 </div>
 <h3 className="font-heading font-bold text-lg text-[var(--color-text)] mb-2">{service.name}</h3>
 <p className="text-sm text-[var(--color-text-muted)] mb-4">En iyi standartlarda, ağrısız ve hızlı tedavi çözümleri.</p>
 <div className="mt-auto w-full pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
 <span className="text-xs font-semibold text-[var(--color-accent)]">{service.duration} | {service.price}</span>
 <a href="#iletisim" className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]"><ChevronRight size={18}/></a>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* ABOUT / DOCTOR PROFILE */}
 <section id="hakkimizda" className="py-24 bg-white overflow-hidden">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid lg:grid-cols-2 gap-16 items-center">
 <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
 <div className="absolute -inset-4 bg-[var(--color-surface)] rounded-[3rem] -z-10"></div>
 <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80" alt="Doktor Profil" className="w-full h-[500px] object-cover rounded-3xl shadow-lg border-8 border-white" />
 <div className="absolute bottom-6 right-6 bg-white p-4 rounded-xl shadow-lg border border-[var(--color-border)]">
 <div className="flex items-center gap-3">
 <Stethoscope className="text-[var(--color-accent)]" size={32} />
 <div>
 <p className="font-bold text-[var(--color-text)]">{businessData.team?.[0]?.name || businessData.ownerName}</p>
 <p className="text-xs text-[var(--color-text-muted)]">{businessData.team?.[0]?.role || 'Kurucu Diş Hekimi'}</p>
 </div>
 </div>
 </div>
 </motion.div>

 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
 <motion.span variants={fadeUp} className="text-[var(--color-accent)] font-semibold tracking-wider uppercase text-sm mb-3 block">HAKKIMIZDA</motion.span>
 <motion.h2 variants={fadeUp} className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-6 leading-tight">
 Modern teknoloji ile sıcakkanlı hizmetin buluştuğu adres.
 </motion.h2>
 <motion.p variants={fadeUp} className="text-[var(--color-text-muted)] text-lg mb-6">
 Kliniğimizde en güncel cihazlar ve malzemeler kullanılarak, hastalarımızın kendilerini evlerinde gibi güvende ve rahat hissetmeleri sağlanır. 
 {businessData.experience} yıllık tecrübemizle, Kadıköy'de binlerce mutlu gülüşe imza attık.
 </motion.p>

 <div className="grid sm:grid-cols-2 gap-4 mt-8 mb-8">
 {['Panoramik Röntgen', 'Lazer ile Tedavi', 'Ağrısız Anestezi', 'Çocuklara Özel Alan'].map((item, i) => (
 <motion.div variants={fadeUp} key={i} className="flex items-center gap-3">
 <CheckCircle2 size={20} className="text-[var(--color-accent)] flex-shrink-0" />
 <span className="font-medium text-[var(--color-text-secondary)]">{item}</span>
 </motion.div>
 ))}
 </div>

 <motion.a variants={fadeUp} href="#iletisim" className="inline-flex items-center gap-2 bg-[var(--color-surface)] text-[var(--color-text)] px-8 py-3 rounded-[var(--radius-btn)] font-semibold hover:bg-[var(--color-surface-muted)] transition-colors border border-[var(--color-border)]">
 Detaylı Bilgi Al <ChevronRight size={18}/>
 </motion.a>
 </motion.div>
 </div>
 </div>
 </section>

 {/* CONTACT BIG FORM */}
 <section id="iletisim" className="py-24 bg-[var(--color-text)] text-white relative">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid lg:grid-cols-5 gap-16">
 <div className="lg:col-span-2 flex flex-col justify-center">
 <h2 className="font-heading text-3xl md:text-4xl font-extrabold mb-6">Randevu Alın</h2>
 <p className="text-[var(--color-surface-muted)]/80 mb-10 text-lg">Hemen online randevu talebi oluşturun, sizi en kısa sürede arayıp gün ve saati netleştirelim.</p>
 
 <div className="space-y-6">
 <div className="flex items-start gap-4">
 <div className="bg-[var(--color-text-secondary)] p-3 rounded-xl text-white">
 <Phone size={24} />
 </div>
 <div>
 <p className="text-sm font-semibold text-[var(--color-surface)]/60 uppercase tracking-widest mb-1">Telefon</p>
 <a href={`tel:${businessData.phoneClean}`} className="text-xl font-bold hover:text-white transition-colors">{businessData.phone}</a>
 </div>
 </div>
 <div className="flex items-start gap-4">
 <div className="bg-[var(--color-text-secondary)] p-3 rounded-xl text-white">
 <MapPin size={24} />
 </div>
 <div>
 <p className="text-sm font-semibold text-[var(--color-surface)]/60 uppercase tracking-widest mb-1">Klinik Adresi</p>
 <p className="text-base font-medium text-[var(--color-surface)] max-w-xs">{businessData.address}</p>
 </div>
 </div>
 <div className="flex items-start gap-4">
 <div className="bg-[var(--color-text-secondary)] p-3 rounded-xl text-white">
 <Clock size={24} />
 </div>
 <div>
 <p className="text-sm font-semibold text-[var(--color-surface)]/60 uppercase tracking-widest mb-1">Çalışma Saatleri</p>
 <p className="text-base font-medium text-[var(--color-surface)]">Hafta içi: {businessData.workingHours?.[0]?.open} - {businessData.workingHours?.[0]?.close} <br/> Ctesi: {businessData.workingHours?.[5]?.open} - {businessData.workingHours?.[5]?.close}</p>
 </div>
 </div>
 </div>
 </div>

 <div className="lg:col-span-3">
 <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
 <div className="absolute top-0 left-0 w-full h-2 bg-[var(--color-accent)]"></div>
 <h3 className="text-2xl font-bold text-[var(--color-text)] mb-8">Hızlı Form</h3>
 <form className="space-y-6" onSubmit={e => e.preventDefault()}>
 <div className="grid sm:grid-cols-2 gap-6">
 <div>
 <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Adınız Soyadınız *</label>
 <input type="text" className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] px-4 py-3 rounded-xl text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-shadow" placeholder="Ali Yılmaz" />
 </div>
 <div>
 <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Telefon Numaranız *</label>
 <input type="tel" className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] px-4 py-3 rounded-xl text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-shadow" placeholder="0555 555 55 55" />
 </div>
 </div>
 <div>
 <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">İlgilendiğiniz Tedavi</label>
 <select className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] px-4 py-3 rounded-xl text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-shadow">
 <option>Genel Muayene</option>
 <option>Diş Beyazlatma</option>
 <option>İmplant</option>
 <option>Dolgu / Kanal</option>
 </select>
 </div>
 <button className="w-full bg-[var(--color-accent)] text-white font-bold text-lg py-4 rounded-xl hover:bg-[var(--color-accent-hover)] transition-all shadow-md mt-4 flex items-center justify-center gap-2">
 Randevu İsteğini Gönder <ArrowRight size={20}/>
 </button>
 </form>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* FOOTER */}
 <footer className="bg-white py-12 border-t border-[var(--color-border)]">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
 <div className="flex items-center gap-2 text-[var(--color-accent)] font-bold text-lg">
 <Smile size={24} /> {businessData.name}
 </div>
 <div className="text-sm font-medium text-[var(--color-text-muted)] text-center md:text-left">
 © {new Date().getFullYear()} {businessData.name}. Her hakkı saklıdır.
 </div>
 <div className="flex gap-4">
 <a href={businessData.socialMedia?.instagram || '#'} className="bg-[var(--color-surface)] text-[var(--color-text-secondary)] w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--color-accent)] hover:text-white transition-colors">IN</a>
 <a href={businessData.socialMedia?.facebook || '#'} className="bg-[var(--color-surface)] text-[var(--color-text-secondary)] w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--color-accent)] hover:text-white transition-colors">FB</a>
 </div>
 </div>
 </footer>
 </div>
 )
}

import { registerSection } from '../../registry/section-registry'
import { fadeUp, staggerChild, staggerContainer } from '../../lib/animation-presets'
const stagger = staggerContainer
registerSection('hero', 'dis_modern_full', DisModernSections as unknown as React.ComponentType<any>)
