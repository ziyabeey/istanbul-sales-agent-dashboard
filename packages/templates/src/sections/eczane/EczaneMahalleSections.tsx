'use client'

import React from 'react'
import { ThemeConfig, BusinessData, SectionProps } from '../../types/section-types'
import { Phone, MapPin, Navigation, Clock, ShieldCheck, HeartPulse, Activity, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { registerSection } from '../../registry/section-registry'
import type { ComponentType } from 'react'

export function EczaneMahalleFull({ business: businessData }: SectionProps<any>) {
 // Starter Tier - Split-Panel, Family Pharmacy, Trust Blue/Teal Theme
 
 const getIcon = (name: string) => {
 switch (name) {
 case '📋': return <ShieldCheck size={28} className="text-[var(--color-accent)]" />
 case '🩺': return <HeartPulse size={28} className="text-[var(--color-accent)]" />
 case '🩸': return <Activity size={28} className="text-[var(--color-accent)]" />
 case '💊': return <Star size={28} className="text-[var(--color-accent)]" />
 default: return <ShieldCheck size={28} className="text-[var(--color-accent)]" />
 }
 }

 const fadeUp = {
 hidden: { opacity: 0, y: 30 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
 }

 return (
 <div className="font-body bg-[#f8fafc] text-[var(--color-text)] min-h-screen">
 
 {/* HEADER TRAY */}
 <div className="bg-[var(--color-surface)] border-b border-[var(--color-border)] py-3 px-6 text-xs font-medium hidden md:block">
 <div className="max-w-[1024px] mx-auto flex justify-between items-center text-[var(--color-text-secondary)]">
 <div className="flex gap-6">
 <span className="flex items-center gap-2"><MapPin size={14}/> {businessData.address}</span>
 <span className="flex items-center gap-2"><Clock size={14}/> Pzt - Cmt: 08:30 - 19:00</span>
 </div>
 <span className="bg-[var(--color-accent-light)] text-[var(--color-accent)] px-3 py-1 rounded-[var(--radius-btn)] font-bold">
 Nöbetçi Değil (Kapalı)
 </span>
 </div>
 </div>

 <header className="bg-white sticky top-0 z-50 shadow-sm">
 <div className="max-w-[1024px] mx-auto px-6 h-20 flex justify-between items-center">
 <h1 className="font-heading text-2xl font-bold tracking-tight text-[var(--color-accent)] flex items-center gap-2">
 <span className="w-8 h-8 bg-[var(--color-accent)] text-white rounded-lg flex items-center justify-center text-lg">+</span>
 {businessData.name}
 </h1>
 <nav className="hidden md:flex gap-8 font-medium text-sm text-[var(--color-text-secondary)]">
 <a href="#hizmetler" className="hover:text-[var(--color-accent)] transition-colors">Hizmetlerimiz</a>
 <a href="#ekip" className="hover:text-[var(--color-accent)] transition-colors">Eczacınız</a>
 <a href="#iletisim" className="hover:text-[var(--color-accent)] transition-colors">İletişim</a>
 </nav>
 <a href={`tel:${businessData.phoneClean}`} className="bg-[var(--color-accent)] text-white px-6 py-2.5 rounded-[var(--radius-btn)] font-bold text-sm hover:bg-[var(--color-accent-hover)] transition-all shadow-md shadow-[var(--color-accent-light)] flex items-center gap-2">
 <Phone size={16}/> Ara
 </a>
 </div>
 </header>

 <main className="max-w-[1024px] mx-auto px-6 py-12 space-y-24">
 
 {/* HERO - Split Panel */}
 <section className="bg-white rounded-[var(--radius-card)] shadow-xl shadow-[var(--color-surface-muted)]/50 overflow-hidden flex flex-col md:flex-row">
 <div className="md:w-1/2 p-10 lg:p-14 flex flex-col justify-center">
 <motion.div initial="hidden" animate="visible" variants={fadeUp}>
 <p className="text-[var(--color-accent)] font-bold tracking-widest text-xs uppercase mb-4">{businessData.district}'de Güvenli Sağlık</p>
 <h2 className="font-heading text-4xl lg:text-5xl font-extrabold text-[var(--color-text)] mb-6 leading-tight">
 Sağlığınız İçin <br/>Doğru Adres.
 </h2>
 <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8">
 {businessData.slogan}. İlaç danışmanlığı, dermokozmetik ürünler ve vitamin takviyeleri ile 15 yıldır hizmetinizdeyiz. 
 </p>
 <div className="flex gap-4">
 <a href="#iletisim" className="bg-[var(--color-accent)] text-white px-6 py-3 rounded-[var(--radius-btn)] font-bold text-sm hover:bg-[var(--color-accent-hover)] transition-all">
 Yol Tarifi Al
 </a>
 <a href={`https://wa.me/${businessData.whatsapp}`} className="bg-white border-2 border-[var(--color-border)] px-6 py-3 rounded-[var(--radius-btn)] font-bold text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all">
 İlaç Sor
 </a>
 </div>
 </motion.div>
 </div>
 <div className="md:w-1/2 bg-[var(--color-surface)] relative min-h-[300px]">
 <img src="https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80" alt="Pharmacy Interior" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90" />
 </div>
 </section>

 {/* STATS */}
 <section>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
 {[
 { label: 'Yıllık Tecrübe', value: businessData.experience },
 { label: 'Mutlu Danışan', value: '10.000+' },
 { label: 'Ürün Çeşidi', value: '5.000+' },
 { label: 'Google Puanı', value: `${businessData.rating}/5.0` }
 ].map((stat, i) => (
 <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }} className="bg-white p-6 rounded-[var(--radius-card)] text-center shadow-sm border border-[var(--color-border)]/50">
 <p className="font-heading text-3xl font-extrabold text-[var(--color-accent)] mb-1">{stat.value}</p>
 <p className="text-sm font-medium text-[var(--color-text-muted)]">{stat.label}</p>
 </motion.div>
 ))}
 </div>
 </section>

 {/* SERVICES - Split Grid */}
 <section id="hizmetler" className="bg-white rounded-[var(--radius-card)] shadow-sm border border-[var(--color-border)] border-t-4 border-t-[var(--color-accent)] overflow-hidden">
 <div className="p-10 lg:p-14">
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
 <h3 className="font-heading text-3xl font-bold mb-4">Size Nasıl Yardımcı Olabiliriz?</h3>
 <p className="text-[var(--color-text-secondary)]">Sadece reçeteli ilaçlarınızda değil, koruyucu sağlık ve besin takviyelerinde de yanınızdayız.</p>
 </motion.div>

 <div className="grid sm:grid-cols-2 gap-8">
 {businessData.services?.map((service: any, i: number) => (
 <motion.div key={service.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }} className="flex gap-6 items-start group">
 <div className="w-14 h-14 shrink-0 bg-[var(--color-surface)] rounded-2xl flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors duration-300">
 {getIcon(service.icon || '')}
 </div>
 <div>
 <h4 className="font-heading font-bold text-lg mb-2 text-[var(--color-text)]">{service.name}</h4>
 <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{service.description || 'Profesyonel destek ve danışmanlık hizmeti sunuyoruz.'}</p>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* TEAM & CONTACT - Split Panel */}
 <section id="iletisim" className="grid md:grid-cols-2 gap-8">
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[var(--color-text)] text-white p-10 rounded-[var(--radius-card)]">
 <h3 className="font-heading text-2xl font-bold mb-8">Eczacınız Diyor ki;</h3>
 <blockquote className="text-lg italic font-light leading-relaxed mb-8 opacity-90">
 "Amacımız sadece ilaç vermek değil, sağlıklı bir yaşam için doğru yönlendirmeyi yapmaktır. Mahallenizin sağlıklı yaşam merkezi olarak her zaman yanınızdayız."
 </blockquote>
 <div className="flex items-center gap-4">
 <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-xl font-bold">AS</div>
 <div>
 <p className="font-bold text-lg">{businessData?.ownerName as string}</p>
 <p className="text-sm opacity-70">Uzman Eczacı</p>
 </div>
 </div>
 </motion.div>

 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }} className="bg-white p-10 rounded-[var(--radius-card)] border border-[var(--color-border)] shadow-sm">
 <h3 className="font-heading text-2xl font-bold mb-8 text-[var(--color-text)]">İletişim Bilgileri</h3>
 <div className="space-y-6">
 <div className="flex items-start gap-4">
 <div className="w-10 h-10 bg-[var(--color-surface)] rounded-full flex items-center justify-center shrink-0">
 <MapPin size={18} className="text-[var(--color-accent)]"/>
 </div>
 <div>
 <p className="font-bold text-[var(--color-text)] mb-1">Adres</p>
 <p className="text-sm text-[var(--color-text-secondary)]">{businessData.address}</p>
 </div>
 </div>
 <div className="flex items-start gap-4">
 <div className="w-10 h-10 bg-[var(--color-surface)] rounded-full flex items-center justify-center shrink-0">
 <Phone size={18} className="text-[var(--color-accent)]"/>
 </div>
 <div>
 <p className="font-bold text-[var(--color-text)] mb-1">Telefon</p>
 <p className="text-sm text-[var(--color-text-secondary)]">{businessData.phone}</p>
 </div>
 </div>
 </div>
 <a href={`https://maps.google.com/?q=${businessData.coordinates?.lat},${businessData.coordinates?.lng}`} target="_blank" rel="noreferrer" className="w-full mt-8 bg-[var(--color-surface-muted)] text-[var(--color-accent)] font-bold py-3 rounded-[var(--radius-btn)] flex items-center justify-center gap-2 hover:bg-[var(--color-border)] transition-colors">
 <Navigation size={18}/> Haritada Gör
 </a>
 </motion.div>
 </section>

 </main>

 {/* FOOTER */}
 <footer className="bg-white border-t border-[var(--color-border)] mt-12 py-12">
 <div className="max-w-[1024px] mx-auto px-6 grid md:grid-cols-3 gap-8 text-sm">
 <div>
 <h3 className="font-heading font-bold text-lg mb-4 text-[var(--color-accent)]">{businessData.name}</h3>
 <p className="text-[var(--color-text-secondary)] mb-4">{businessData.slogan}</p>
 <p className="text-[var(--color-text-muted)]">© {new Date().getFullYear()} Tüm hakları saklıdır.</p>
 </div>
 <div>
 <h4 className="font-bold mb-4 text-[var(--color-text)]">Hızlı Linkler</h4>
 <ul className="space-y-2 text-[var(--color-text-secondary)]">
 <li><a href="#hizmetler" className="hover:text-[var(--color-accent)]">Hizmetlerimiz</a></li>
 <li><a href="#ekip" className="hover:text-[var(--color-accent)]">Eczacı Hakkında</a></li>
 <li><a href="/kvkk" className="hover:text-[var(--color-accent)]">KVKK Aydınlatma</a></li>
 </ul>
 </div>
 <div>
 <h4 className="font-bold mb-4 text-[var(--color-text)]">Çalışma Saatleri</h4>
 <ul className="space-y-2 text-[var(--color-text-secondary)]">
 <li className="flex justify-between border-b border-[var(--color-border)] pb-1"><span>Hafta İçi:</span> <span>08:30 - 19:00</span></li>
 <li className="flex justify-between border-b border-[var(--color-border)] pb-1"><span>Cumartesi:</span> <span>09:00 - 19:00</span></li>
 <li className="flex justify-between text-[var(--color-accent)] font-medium"><span>Pazar:</span> <span>Sadece Nöbetçi İse</span></li>
 </ul>
 </div>
 </div>
 </footer>
 </div>
 )
}
