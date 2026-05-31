'use client'

import React from 'react'
import { ThemeConfig, BusinessData, SectionProps } from '../../types/section-types'
import { Phone, MapPin, Instagram, Key, Heart, Sparkles, Syringe, ChevronRight, Play } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { registerSection } from '../../registry/section-registry'
import type { ComponentType } from 'react'

export function EczaneLuxFull({ business: businessData }: SectionProps<any>) {
 // Enterprise Tier - Dark Luxury, Cinematic, Wellness/Concierge
 
 const getIcon = (name: string) => {
 switch (name) {
 case '🔑': return <Key size={32} strokeWidth={1} className="text-[var(--color-accent)]" />
 case '🧘': return <Heart size={32} strokeWidth={1} className="text-[var(--color-accent)]" />
 case '✨': return <Sparkles size={32} strokeWidth={1} className="text-[var(--color-accent)]" />
 case '💉': return <Syringe size={32} strokeWidth={1} className="text-[var(--color-accent)]" />
 default: return <Sparkles size={32} strokeWidth={1} className="text-[var(--color-accent)]" />
 }
 }

 const fadeUp = {
 hidden: { opacity: 0, y: 60 },
 visible: { opacity: 1, y: 0, transition: { duration: 1.2 } }
 }

 const stagger = {
 hidden: { opacity: 0 },
 visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
 }

 const { scrollY } = useScroll()
 const yHero = useTransform(scrollY, [0, 1000], [0, 300])

 return (
 <div className="font-body bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen selection:bg-[var(--color-text-secondary)] selection:text-black overflow-hidden">
 
 {/* LUXURY CONCIERGE TOP BAR */}
 <div className="border-b border-[var(--color-border)] bg-[var(--color-bg)] text-xs uppercase tracking-[0.3em] font-light text-[var(--color-text-secondary)] py-3 px-6 lg:px-12 flex justify-between items-center hidden md:flex">
 <span>VIP WELLNESS LOUNGE & PHARMACY</span>
 <a href={`tel:${businessData.phoneClean}`} className="hover:text-[var(--color-text)] transition-colors flex items-center gap-2">
 CONCIERGE: <span className="font-medium">{businessData.phone}</span>
 </a>
 </div>

 {/* HEADER */}
 <header className="absolute top-0 w-full z-50 mt-12 md:mt-0">
 <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-24 flex justify-between items-center">
 
 <h1 className="font-heading text-2xl md:text-3xl font-bold tracking-[0.2em] text-[var(--color-accent)] uppercase">
 PHARMA PRESTIGE
 </h1>
 
 <nav className="hidden lg:flex gap-12 text-[10px] tracking-[0.2em] uppercase text-[var(--color-text)] font-semibold">
 <a href="#philosophy" className="hover:text-[var(--color-accent)] transition-colors">Philosophy</a>
 <a href="#longevity" className="hover:text-[var(--color-accent)] transition-colors">Longevity</a>
 <a href="#access" className="hover:text-[var(--color-accent)] transition-colors">Private Access</a>
 </nav>

 <a href="#access" className="border border-[var(--color-accent)] text-[var(--color-accent)] px-8 py-3 text-[10px] tracking-[0.2em] uppercase hover:bg-[var(--color-accent)] hover:text-black transition-all duration-700 hidden sm:block">
 REQUEST INVITE
 </a>
 </div>
 </header>

 <main className="relative z-10">
 
 {/* MEGA CINEMATIC HERO */}
 <section className="h-screen relative flex items-center justify-center pt-24">
 <motion.div style={{ y: yHero }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
 <img src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80" alt="Luxury Wellness" className="w-full h-full object-cover opacity-60 mix-blend-luminosity" />
 <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/80 to-transparent"></div>
 <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)] via-transparent to-transparent"></div>
 </motion.div>

 <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 relative z-10">
 <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
 <motion.p variants={fadeUp} className="text-[10px] uppercase font-bold tracking-[0.4em] text-[var(--color-text-secondary)] mb-6 ml-1">
 {businessData.slogan}
 </motion.p>
 <motion.h2 variants={fadeUp} className="font-heading text-6xl md:text-8xl lg:text-[7.5rem] text-[var(--color-text)] leading-[0.9] font-medium tracking-tight mb-8">
 ELEVATING <br/>
 <span className="italic font-light text-[var(--color-accent)]">Vitality.</span>
 </motion.h2>
 <motion.p variants={fadeUp} className="text-lg md:text-xl text-[var(--color-text-secondary)] font-light leading-relaxed mb-12 max-w-xl pl-6 border-l border-[var(--color-accent)]">
 Sıradan eczacılığın ötesinde; kişiye özel longevity kürleri, premium iv-terapi danışmanlığı ve majistral sanatıyla Nişantaşı'nın en ayrıcalıklı sağlık deneyimi.
 </motion.p>
 <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-8 items-center">
 <a href="#longevity" className="bg-[var(--color-accent)] text-black px-12 py-5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-[var(--color-accent-hover)] transition-colors w-full sm:w-auto text-center">
 DISCOVER PROTOCOLS
 </a>
 <a href="#philosophy" className="text-[10px] font-bold tracking-[0.3em] uppercase text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-3 w-full sm:w-auto text-center justify-center">
 <span className="w-10 h-10 border border-[var(--color-border)] rounded-full flex items-center justify-center">
 <Play size={10} className="ml-1 fill-[var(--color-text)]" />
 </span>
 BRAND FILM
 </a>
 </motion.div>
 </motion.div>
 </div>
 </section>

 {/* HIGHLIGHTED SERVICES GRID */}
 <section id="longevity" className="py-32 px-6 lg:px-12 relative z-20 bg-[var(--color-bg)]">
 <div className="max-w-[1440px] mx-auto">
 
 <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12 border-b border-[var(--color-border)] pb-12">
 <div>
 <h3 className="font-heading text-4xl lg:text-5xl text-[var(--color-text)] uppercase tracking-widest font-light mb-4 text-center md:text-left">EXCLUSIVE SELECTIONS</h3>
 </div>
 <p className="text-[var(--color-text-secondary)] font-light text-sm tracking-widest uppercase text-center md:text-right max-w-xs">
 Kişiselleştirilmiş İyilik Hali Deneyimi
 </p>
 </div>

 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-border)]">
 {businessData.services?.map((service: any, i: number) => (
 <motion.div 
 key={service.id} 
 initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeUp} transition={{ delay: i * 0.15 }}
 className="bg-[var(--color-bg)] p-12 lg:p-16 group relative overflow-hidden"
 >
 <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent-light)] blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-[var(--color-accent)]/20 transition-colors duration-1000"></div>
 <div className="mb-12 relative z-10">{getIcon(service.icon || '')}</div>
 <h4 className="font-heading text-2xl text-[var(--color-text)] mb-6 uppercase tracking-widest relative z-10">{service.name}</h4>
 <p className="text-[var(--color-text-secondary)] font-light text-sm leading-relaxed mb-12 relative z-10">
 {service.description}
 </p>
 <a href="#access" className="text-[10px] tracking-[0.2em] font-bold uppercase text-[var(--color-accent)] flex items-center gap-2 group-hover:gap-4 transition-all relative z-10 border-b border-transparent group-hover:border-[var(--color-accent)] pb-1 w-max">
 GÖRÜŞME TALEBİ <ChevronRight size={14} />
 </a>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* LUXURY EXPERT / PHILOSOPHY */}
 <section id="philosophy" className="py-32 px-6 lg:px-12 relative overflow-hidden bg-[var(--color-surface)]">
 <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-30"></div>
 
 <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
 <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="relative h-[600px] lg:h-[800px]">
 <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80" alt="Clinical Excellence" className="w-full h-full object-cover grayscale mix-blend-luminosity border hover:grayscale-0 transition-all duration-1000 border-[var(--color-border)] p-4" />
 <div className="absolute -bottom-10 -right-10 bg-[var(--color-bg)] border border-[var(--color-accent)] p-10 max-w-[300px] z-10 shadow-2xl">
 <p className="font-heading text-4xl text-[var(--color-accent)] italic mb-4 text-center">Formule</p>
 <p className="text-[10px] uppercase tracking-widest font-light text-center leading-relaxed">Nişantaşı'nın tek GMP standartlı butik laboratuvarı.</p>
 </div>
 </motion.div>
 
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="lg:pl-10">
 <motion.h3 variants={fadeUp} className="font-heading text-5xl lg:text-6xl text-[var(--color-text)] mb-8 tracking-tight font-medium uppercase break-words">
 Mastery of <br/> <span className="font-light italic text-[var(--color-accent)] lowercase">Longevity.</span>
 </motion.h3>
 <motion.p variants={fadeUp} className="text-xl text-[var(--color-text-secondary)] font-light leading-relaxed mb-8">
 "Sağlık, sadece hastalığın olmaması değil; fiziksel, hücresel ve mental potansiyelinizin zirvesinde olmanızdır."
 </motion.p>
 <motion.p variants={fadeUp} className="text-[var(--color-text-muted)] font-light leading-relaxed mb-12 text-sm">
 {businessData?.ownerName as string} liderliğinde kurulan Pharma Prestige, standart ilaç tedarikinin ötesine geçerek dünyanın en seçkin moleküllerini (NMN, Resveratrol, NAD+ öncüleri) VIP Concierge hizmetiyle sunmaktadır.
 </motion.p>
 <motion.div variants={fadeUp} className="border-l pl-6 border-[var(--color-border)]">
 <p className="font-heading text-xl uppercase tracking-widest text-[var(--color-text)] mb-1">{businessData?.ownerName as string}</p>
 <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--color-accent)]">Founder & Clinical Pharmacist</p>
 </motion.div>
 </motion.div>
 </div>
 </section>

 {/* VIP ACCESS (Contact) */}
 <section id="access" className="py-32 px-6 lg:px-12 bg-black border-t border-[var(--color-border)]">
 <div className="max-w-[900px] mx-auto bg-[var(--color-surface)] border border-[var(--color-border)] p-10 md:p-20 relative overflow-hidden">
 {/* Background Glow */}
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--color-accent)]/10 blur-[100px] rounded-full pointer-events-none"></div>

 <div className="text-center relative z-10 mb-16">
 <Key size={32} strokeWidth={1} className="text-[var(--color-accent)] mx-auto mb-6" />
 <h3 className="font-heading text-4xl lg:text-5xl text-[var(--color-text)] tracking-widest uppercase font-light mb-4">Request Access</h3>
 <p className="text-[var(--color-text-secondary)] font-light text-sm tracking-widest uppercase">Pharma Prestige Private Client List</p>
 </div>

 <form className="relative z-10 space-y-8" onSubmit={e=>e.preventDefault()}>
 <div className="border-b border-[var(--color-border-strong)]">
 <input type="text" placeholder="FULL NAME" className="w-full bg-transparent text-[var(--color-text)] px-4 py-4 text-sm tracking-widest placeholder-[var(--color-text-muted)] focus:outline-none focus:border-b-2 focus:border-[var(--color-accent)] transition-all"/>
 </div>
 <div className="border-b border-[var(--color-border-strong)]">
 <input type="tel" placeholder="PRIVATE CONTACT NO" className="w-full bg-transparent text-[var(--color-text)] px-4 py-4 text-sm tracking-widest placeholder-[var(--color-text-muted)] focus:outline-none focus:border-b-2 focus:border-[var(--color-accent)] transition-all"/>
 </div>
 <div className="border-b border-[var(--color-border-strong)]">
 <select className="w-full bg-transparent text-[var(--color-text)] px-4 py-4 text-sm tracking-widest focus:outline-none focus:border-b-2 focus:border-[var(--color-accent)] transition-all appearance-none cursor-pointer">
 <option className="bg-black">SELECT INTEREST</option>
 {businessData.services?.map(s => <option key={s.id} className="bg-black">{s.name.toUpperCase()}</option>)}
 </select>
 </div>
 <button className="w-full bg-[var(--color-accent)] text-black mt-12 py-5 text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-white transition-colors">
 SUBMIT TO CONCIERGE
 </button>
 </form>
 <div className="mt-16 text-center text-[9px] uppercase tracking-[0.2em] font-light text-[var(--color-text-muted)]">
 <p>Concierge hattımız {businessData.phone} numarasından 7/24 hizmetinizdedir.</p>
 <p>{businessData.address}</p>
 </div>
 </div>
 </section>

 </main>

 {/* FOOTER LUXURY */}
 <footer className="bg-[var(--color-surface)] py-16 px-6 lg:px-12 border-t border-[var(--color-border)]">
 <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
 <h1 className="font-heading text-xl font-bold tracking-[0.2em] text-[var(--color-text)] uppercase">
 PHARMA PRESTIGE
 </h1>
 <div className="flex gap-10 text-[9px] uppercase tracking-[0.3em] text-[var(--color-text-secondary)] font-bold">
 <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Legal</a>
 <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Privacy</a>
 <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Instagram</a>
 </div>
 <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
 © {new Date().getFullYear()} KEPENK.AI EXCLUSIVE
 </p>
 </div>
 </footer>
 </div>
 )
}
