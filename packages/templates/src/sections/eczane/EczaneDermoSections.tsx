'use client'

import React from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { Phone, MapPin, Instagram, Sparkles, Target, FlaskConical, Droplet, ArrowRight, Play } from 'lucide-react'
import { motion } from 'framer-motion'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function EczaneDermoSections({ config, businessData }: Props) {
 // Premium Tier - Editorial Magazine, Beauty Blog Layout, Blush Pink
 
 const getIcon = (name: string) => {
 switch (name) {
 case '🔬': return <FlaskConical strokeWidth={1.5} size={32} />
 case '✨': return <Sparkles strokeWidth={1.5} size={32} />
 case '☀️': return <Target strokeWidth={1.5} size={32} />
 case '🧴': return <Droplet strokeWidth={1.5} size={32} />
 default: return <Sparkles strokeWidth={1.5} size={32} />
 }
 }

 const fadeUp = {
 hidden: { opacity: 0, y: 50 },
 visible: { opacity: 1, y: 0, transition: { duration: 1 } }
 }

 const stagger = {
 hidden: { opacity: 0 },
 visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
 }

 return (
 <div className="font-body bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen selection:bg-[var(--color-accent-light)] selection:text-[var(--color-accent)]">
 
 {/* THIN TOP BAR */}
 <div className="bg-[var(--color-text)] text-[var(--color-surface)] py-2 text-[10px] uppercase tracking-widest text-center font-medium">
 Ücretsiz cilt analizi için randevu almayı unutmayın.
 </div>

 {/* EDITORIAL HEADER */}
 <header className="sticky top-0 z-50 bg-[var(--color-bg)]/80 backdrop-blur-xl border-b border-[var(--color-border-subtle)]">
 <div className="max-w-[1280px] mx-auto px-6 lg:px-12 h-20 md:h-24 flex justify-between items-center">
 
 <nav className="hidden lg:flex items-center gap-10 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
 <a href="#brands" className="hover:text-[var(--color-accent)] transition-colors">Markalarımız</a>
 <a href="#skin" className="hover:text-[var(--color-accent)] transition-colors">Cilt Analizi</a>
 </nav>

 <h1 className="font-heading text-3xl md:text-4xl tracking-tight text-[var(--color-text)] absolute left-1/2 -translate-x-1/2 uppercase font-semibold">
 {businessData.name.split(' ')[0]}
 </h1>

 <div className="flex items-center gap-6">
 <a href={businessData.socialMedia?.instagram || '#'} className="hidden md:flex text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">
 <Instagram size={20} strokeWidth={1.5} />
 </a>
 <a href="#appointment" className="bg-transparent border border-[var(--color-accent)] text-[var(--color-accent)] px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[var(--color-accent)] hover:text-white transition-all duration-500">
 Randevu
 </a>
 </div>
 </div>
 </header>

 <main>
 
 {/* MEGA HERO - Magazine Cover Style */}
 <section className="min-h-[85vh] flex items-center relative overflow-hidden px-6 lg:px-12 py-20">
 {/* Pastel background blob */}
 <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[var(--color-accent-light)] rounded-full blur-[100px] opacity-80 pointer-events-none"></div>

 <div className="max-w-[1280px] mx-auto w-full grid lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
 
 <motion.div initial="hidden" animate="visible" variants={stagger} className="lg:col-span-6 pr-0 lg:pr-12">
 <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
 <span className="w-12 h-px bg-[var(--color-text-muted)]"></span>
 <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[var(--color-text-muted)]">{businessData.district}</span>
 </motion.div>
 
 <motion.h2 variants={fadeUp} className="font-heading text-6xl md:text-7xl lg:text-[6rem] text-[var(--color-text)] leading-[1] mb-8 font-semibold uppercase tracking-tighter">
 Skin <br/> <span className="text-[var(--color-text-muted)] italic lowercase font-light text-5xl md:text-6xl lg:text-[5rem]">&</span> Science
 </motion.h2>
 
 <motion.p variants={fadeUp} className="text-[var(--color-text-secondary)] text-lg mb-12 leading-relaxed max-w-md font-light">
 Size en uygun rutini bulmak için buradayız. Dünyanın önde gelen dermokozmetik markalarıyla cildinizin ihtiyaç duyduğu ışıltıyı keşfedin.
 </motion.p>
 
 <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6">
 <a href="#appointment" className="bg-[var(--color-text)] text-white px-10 py-4 font-semibold tracking-widest uppercase text-xs hover:bg-[var(--color-accent)] transition-colors text-center w-max">
 Analiz Randevusu
 </a>
 <a href="#brands" className="px-10 py-4 font-semibold tracking-widest uppercase text-xs text-[var(--color-accent)] flex items-center justify-center gap-3 group border-b border-transparent hover:border-[var(--color-accent)] w-max transition-all">
 <Play size={14} className="fill-[var(--color-accent)]"/> Kılavuzu İzle
 </a>
 </motion.div>
 </motion.div>

 <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} className="lg:col-span-6 relative">
 <div className="relative aspect-[4/5] w-full max-w-[500px] mx-auto ml-auto">
 <img 
 src="https://images.unsplash.com/photo-1615397323233-010531c360be?auto=format&fit=crop&q=80" 
 alt="Skincare Products" 
 className="w-full h-full object-cover rounded-t-full shadow-2xl"
 />
 
 {/* Floating Glassmorphism Element */}
 <div className="absolute -left-12 bottom-20 bg-white/60 backdrop-blur-xl p-8 rounded-2xl border border-white max-w-[240px] shadow-2xl">
 <p className="font-heading text-4xl font-semibold text-[var(--color-accent)] mb-2 tracking-tighter">10+</p>
 <p className="text-[10px] uppercase tracking-widest font-semibold text-[var(--color-text-secondary)] leading-relaxed">
 Yıllık klinik deneyimli dermokozmetik uzmanlığı
 </p>
 </div>
 </div>
 </motion.div>

 </div>
 </section>

 {/* HIGHLIGHTED SERVICES - Beauty Blog Style */}
 <section id="skin" className="py-32 bg-white relative">
 <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
 
 <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
 <div className="max-w-xl">
 <h3 className="font-heading text-4xl lg:text-5xl font-semibold text-[var(--color-text)] mb-6 tracking-tight uppercase">Özel Rutinler</h3>
 <p className="text-[var(--color-text-secondary)] text-lg font-light leading-relaxed">Ezber bozan cilt analizleriyle, klinik bulgulara dayalı kişiselleştirilmiş protokoller kurguluyoruz.</p>
 </div>
 <a href="#appointment" className="text-[10px] uppercase font-semibold text-[var(--color-accent)] tracking-widest flex items-center gap-2 group border-b border-[var(--color-accent)] pb-1">
 Tüm Servisler <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
 </a>
 </div>

 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
 {businessData.services?.map((service: any, i: number) => (
 <motion.div 
 key={service.id} 
 initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeUp} transition={{ delay: i * 0.1 }}
 className="group relative"
 >
 <div className="aspect-[3/4] bg-[var(--color-surface)] mb-6 overflow-hidden">
 <div className="w-full h-full p-10 flex flex-col items-center justify-center text-center bg-[var(--color-surface)] group-hover:bg-[var(--color-surface-muted)] transition-colors duration-500">
 <span className="text-[var(--color-accent)] mb-6 transform group-hover:scale-110 transition-transform duration-500">
 {getIcon(service.icon || '')}
 </span>
 <div className="absolute inset-0 bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
 </div>
 </div>
 <h4 className="font-heading text-xl font-semibold uppercase tracking-wide mb-3 text-[var(--color-text)]">{service.name}</h4>
 <p className="text-[var(--color-text-secondary)] font-light text-sm leading-relaxed mb-6">
 {service.description}
 </p>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* EXPERT HIGHLIGHT */}
 <section className="py-32 px-6 lg:px-12 bg-[var(--color-surface)]">
 <div className="max-w-[1024px] mx-auto bg-white p-10 md:p-20 rounded-[2rem] shadow-xl relative overflow-hidden">
 {/* Aesthetic Line */}
 <div className="absolute top-0 right-10 w-px h-32 bg-[var(--color-border)]"></div>
 
 <div className="text-center max-w-2xl mx-auto">
 <p className="font-heading text-2xl md:text-3xl font-light text-[var(--color-text)] leading-relaxed mb-10 italic">
 "Cildiniz yaşayan bir eko-sistemdir. Amacımız onu kusursuzlaştırmak değil, en sağlıklı ve en parlak versiyonuna ulaştırmaktır."
 </p>
 <div>
 <p className="font-heading font-semibold text-lg uppercase tracking-widest">{businessData?.ownerName as string}</p>
 <p className="text-[10px] uppercase tracking-widest text-[var(--color-accent)] mt-1">Dermokozmetik Uzmanı & Eczacı</p>
 </div>
 </div>
 </div>
 </section>

 {/* EDITORIAL CONTACT */}
 <section id="appointment" className="py-32 px-6 lg:px-12">
 <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
 
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="order-2 lg:order-1">
 <h3 className="font-heading text-4xl lg:text-5xl font-semibold text-[var(--color-text)] mb-8 tracking-tight uppercase">Bize <br/><span className="italic font-light text-[var(--color-text-muted)] lowercase">ulaşın.</span></h3>
 <div className="space-y-12">
 <div className="flex gap-6 items-start">
 <MapPin size={24} className="text-[var(--color-accent)] shrink-0" strokeWidth={1.5} />
 <div>
 <p className="text-[10px] uppercase tracking-widest font-semibold text-[var(--color-text-muted)] mb-2">Lokasyon</p>
 <p className="font-light text-lg">{businessData.address}</p>
 </div>
 </div>
 <div className="flex gap-6 items-start">
 <Phone size={24} className="text-[var(--color-accent)] shrink-0" strokeWidth={1.5} />
 <div>
 <p className="text-[10px] uppercase tracking-widest font-semibold text-[var(--color-text-muted)] mb-2">Telefon</p>
 <p className="font-heading text-2xl font-light">{businessData.phone}</p>
 </div>
 </div>
 </div>
 
 <div className="mt-16">
 <a href={`https://wa.me/${businessData.whatsapp}`} className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-semibold text-xs tracking-widest uppercase hover:bg-black/80 transition-colors w-full sm:w-auto justify-center">
 WhatsApp'tan Yazın
 </a>
 </div>
 </motion.div>

 <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="order-1 lg:order-2 relative aspect-[3/4] w-full max-w-md mx-auto">
 <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80" alt="Spa and Skincare" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"/>
 <div className="absolute inset-0 border-[10px] border-[var(--color-bg)] mix-blend-overlay"></div>
 </motion.div>

 </div>
 </section>

 </main>

 {/* MINIMAL EDITORIAL FOOTER */}
 <footer className="border-t border-[var(--color-border-subtle)] bg-white pt-20 pb-10">
 <div className="max-w-[1280px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
 <div>
 <h3 className="font-heading text-3xl font-semibold uppercase tracking-widest mb-2">{businessData.name.split(' ')[0]}</h3>
 <p className="text-[10px] tracking-widest text-[var(--color-text-muted)] uppercase">{businessData.slogan}</p>
 </div>
 <div className="flex gap-8 text-[10px] tracking-widest font-semibold text-[var(--color-text-secondary)] uppercase">
 <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Politikalar</a>
 <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Gizlilik</a>
 <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Instagram</a>
 </div>
 </div>
 <div className="max-w-[1280px] mx-auto px-6 lg:px-12 mt-16 pt-8 border-t border-[var(--color-border-subtle)] flex justify-between items-center text-[9px] tracking-[0.3em] text-[var(--color-text-muted)] uppercase">
 <p>© {new Date().getFullYear()} {businessData.name}</p>
 <p>DESIGN BY KEPENK</p>
 </div>
 </footer>
 </div>
 )
}
