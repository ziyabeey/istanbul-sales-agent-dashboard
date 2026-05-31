'use client'

import React from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { Phone, MapPin, ChevronRight, Star, Heart, Smile, Sparkles, Check, Gift, ArrowRight, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function DisCocukSections({ business: businessData }: any) {
 const fadeUp: any = {
 hidden: { opacity: 0, y: 30 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" as const, bounce: 0.4 } }
 }

 const stagger: any = {
 hidden: { opacity: 0 },
 visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
 }

 return (
 <div className="font-body bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-surface-muted)] selection:text-[var(--color-accent)]">
 
 {/* HEADER - Playful & Colorful */}
 <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-4 border-[var(--color-surface-muted)] shadow-sm">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
 <div className="flex items-center gap-3">
 <motion.div whileHover={{ rotate: 15, scale: 1.1 }} className="bg-[var(--color-accent)] w-12 h-12 rounded-full flex items-center justify-center text-white border-4 border-[var(--color-surface)] shadow-md pl-1">
 <span className="text-2xl">🦷</span>
 </motion.div>
 <div>
 <h1 className="font-heading text-xl font-extrabold tracking-tight text-[var(--color-text)] leading-none">{businessData.name}</h1>
 <p className="text-xs text-[var(--color-text-muted)] font-bold mt-1 uppercase tracking-wider">{businessData?.ownerName as string}</p>
 </div>
 </div>

 <nav className="hidden md:flex gap-8 text-sm font-extrabold text-[#4A4A10]">
 <a href="#ilk-randevu" className="hover:text-[var(--color-accent)] transition-colors flex items-center gap-1"><Star size={16} className="text-[var(--color-surface-muted)]"/> İlk Randevu</a>
 <a href="#hizmetler" className="hover:text-[var(--color-accent)] transition-colors flex items-center gap-1"><Sparkles size={16} className="text-[var(--color-surface-muted)]"/> Tedaviler</a>
 <a href="#doktor" className="hover:text-[var(--color-accent)] transition-colors flex items-center gap-1"><Heart size={16} className="text-[var(--color-surface-muted)]"/> Doktorumuz</a>
 </nav>

 <a href="#randevu" className="bg-[#FB923C] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#F97316] transition-all transform hover:scale-105 shadow-[0_4px_0_0_#C2410C] active:translate-y-1 active:shadow-none hidden sm:flex items-center gap-2">
 Randevu Al 😊
 </a>
 </div>
 </header>

 {/* HERO - Friendly Split */}
 <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 bg-[var(--color-bg)]">
 {/* Playful background shapes */}
 <div className="absolute top-10 left-10 w-20 h-20 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
 <div className="absolute top-0 right-20 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
 <div className="absolute -bottom-8 left-20 w-24 h-24 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
 <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
 <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-surface-muted)] text-[var(--color-text-secondary)] text-sm font-extrabold mb-6 shadow-sm">
 <Sparkles size={18} className="text-[#FB923C]" /> {businessData.slogan}
 </motion.div>
 <motion.h2 variants={fadeUp} className="font-heading text-5xl md:text-6xl font-black text-[var(--color-text)] leading-[1.15] mb-6">
 Diş Hekimi Artık <br/>
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[#059669] inline-block mt-2">Korkulacak Değil, <br/> Eğlenceli Bir Yer!</span>
 </motion.h2>
 <motion.p variants={fadeUp} className="text-[#4A4A10] text-lg font-medium mb-8 max-w-lg">
 Renkli kliniğimiz, oyun alanımız ve pedodonti uzmanımız {businessData?.ownerName as string} ile çocuklarınız diş hekimine sevinerek gelecek!
 </motion.p>
 <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
 <a href="#randevu" className="bg-[var(--color-accent)] text-white px-8 py-4 rounded-full font-extrabold text-center hover:bg-[var(--color-accent-hover)] transition-all shadow-[0_4px_0_0_#166534] active:translate-y-1 active:shadow-none text-lg">
 Hemen Randevu Al
 </a>
 </motion.div>
 </motion.div>
 
 <motion.div initial={{ opacity: 0, scale: 0.9, rotate: -5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ type: "spring" as const, bounce: 0.5, duration: 1 }} className="relative lg:ml-auto w-full max-w-lg">
 <div className="absolute inset-0 bg-[#FCD34D] rounded-[3rem] transform rotate-6 border-4 border-white shadow-xl"></div>
 <div className="absolute inset-0 bg-[var(--color-accent-light)] rounded-[3rem] transform -rotate-3 border-4 border-white shadow-xl"></div>
 <img 
 src="https://images.unsplash.com/photo-1606166187734-a4cb74079837?auto=format&fit=crop&q=80" 
 alt="Mutlu Çocuk" 
 className="relative rounded-[3rem] object-cover w-full h-[450px] shadow-sm border-8 border-white"
 />
 <motion.div whileHover={{ scale: 1.1 }} className="absolute -bottom-6 -right-6 bg-white p-5 rounded-full shadow-xl border-4 border-[var(--color-surface-muted)] flex items-center justify-center cursor-pointer">
 <div className="text-center">
 <p className="text-4xl">🎁</p>
 <p className="text-xs font-extrabold text-[var(--color-accent)] mt-1">Sürpriz Hediyeler</p>
 </div>
 </motion.div>
 </motion.div>
 </div>
 </div>
 </section>

 {/* FIRST VISIT (İLK RANDEVU) */}
 <section id="ilk-randevu" className="py-20 bg-white">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="bg-[var(--color-surface)] rounded-[3rem] p-8 md:p-12 lg:p-16 border-4 border-[var(--color-surface-muted)]">
 <div className="grid lg:grid-cols-2 gap-12 items-center">
 <div>
 <span className="bg-[#FB923C] text-white px-4 py-1.5 rounded-full text-sm font-extrabold uppercase tracking-wider mb-6 inline-block transform -rotate-2">İLK DENEYİM ÇOK ÖNEMLİ</span>
 <h2 className="font-heading text-4xl font-black text-[var(--color-text)] mb-6">"İlk Randevu" Kılavuzu</h2>
 <p className="text-[var(--color-text-secondary)] font-medium text-lg mb-8 leading-relaxed">İlk diş muayenesi, çocuğunuzun gelecekteki diş hekimi korkusunu yenmesi için en kritik andır. Biz bu anı bir oyun gibi tasarladık.</p>
 
 <ul className="space-y-5">
 <li className="flex items-start gap-4">
 <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm border-2 border-[var(--color-surface-muted)] shrink-0">🎮</div>
 <div>
 <h4 className="font-extrabold text-lg text-[var(--color-text)]">Bekleme Değil, Oyun Odası</h4>
 <p className="text-[var(--color-text-secondary)] text-sm">Rengarenk oyuncaklarla dolu, tablet ve boyama köşesi içeren oyun alanımızda stres yok.</p>
 </div>
 </li>
 <li className="flex items-start gap-4">
 <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm border-2 border-[var(--color-surface-muted)] shrink-0">📺</div>
 <div>
 <h4 className="font-extrabold text-lg text-[var(--color-text)]">Tavanda Çizgi Film</h4>
 </div>
 </li>
 <li className="flex items-start gap-4">
 <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm border-2 border-[var(--color-surface-muted)] shrink-0">🏅</div>
 <div>
 <h4 className="font-extrabold text-lg text-[var(--color-text)]">Cesaret Sertifikası</h4>
 </div>
 </li>
 </ul>
 </div>
 <div className="relative">
 <img src="https://images.unsplash.com/photo-1590494396030-2495ea11db2a?auto=format&fit=crop&q=80" alt="Çocuk ve Diş Hekimi" className="rounded-3xl shadow-xl w-full object-cover h-[400px] border-8 border-white transform rotate-2"/>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* SERVICES */}
 <section id="hizmetler" className="py-24 bg-[var(--color-bg)]">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center max-w-2xl mx-auto mb-16">
 <span className="text-[var(--color-accent)] font-extrabold tracking-widest uppercase text-sm mb-3 block inline-block bg-[var(--color-accent-light)] px-4 py-1 rounded-full border border-[var(--color-border)]">PEDODONTİ UZMANLIĞI</span>
 <h2 className="font-heading text-4xl md:text-5xl font-black text-[var(--color-text)] mb-4 mt-4">Neler Yapıyoruz?</h2>
 <p className="text-[var(--color-text-secondary)] font-medium text-lg">Süt dişlerinden kalıcı dişlere geçiş sürecinde, tüm koruyucu ve tedavi edici ağız-diş sağlığı hizmetleri.</p>
 </div>

 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
 {businessData.services?.map((service: any, i: number) => (
 <motion.div 
 key={i}
 initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeUp} transition={{ delay: i * 0.1 }}
 className="bg-white rounded-[2rem] p-6 shadow-sm border-2 border-[var(--color-surface)] hover:border-[var(--color-accent)] transition-colors group flex flex-col items-center text-center transform hover:-translate-y-2 duration-300"
 >
 <div className="bg-[var(--color-surface)] w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-5 border-4 border-white shadow-sm transform group-hover:scale-110 transition-transform">
 {service.icon || '🦷'}
 </div>
 <h3 className="font-heading font-extrabold text-[1.3rem] text-[var(--color-text)] mb-2">{service.name}</h3>
 <p className="text-sm font-medium text-[var(--color-text-muted)] mb-6">Özel çocuk aletleri ve tekniklerle korkusuz bir tedavi süreci.</p>
 <div className="mt-auto w-full pt-4 border-t-2 border-dashed border-[var(--color-surface)]">
 <span className="text-sm font-extrabold text-[var(--color-accent)] bg-[var(--color-accent-light)] px-4 py-1.5 rounded-full inline-block">{service.price}</span>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* DOCTOR / ABOUT */}
 <section id="doktor" className="py-24 bg-white border-y border-[var(--color-surface-muted)] overflow-hidden">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid lg:grid-cols-2 gap-16 items-center">
 <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
 {/* Decorative big tooth blob */}
 <div className="absolute -inset-4 bg-[var(--color-surface)] rounded-full -z-10 scale-[1.2] opacity-50 blur-xl"></div>
 <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80" alt="Doktor Profil" className="w-full max-w-sm mx-auto h-[450px] object-cover rounded-[3rem] shadow-xl border-8 border-white" />
 <div className="absolute bottom-10 -right-4 md:-right-10 bg-white p-5 rounded-3xl shadow-xl border-4 border-[var(--color-accent-light)] transform rotate-3">
 <div className="flex items-center gap-3">
 <Heart className="text-pink-500 fill-pink-500" size={32} />
 <div>
 <p className="font-extrabold text-[var(--color-text)] text-lg">{businessData?.ownerName as string}</p>
 <p className="text-xs font-bold text-[var(--color-text-muted)]">Pedodonti (Çocuk Diş) Uzmanı</p>
 </div>
 </div>
 </div>
 </motion.div>

 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
 <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-black text-[var(--color-text)] mb-6 leading-tight">
 Çocukların <br/><span className="text-[var(--color-accent)]">Süper Kahraman</span> Doktoru!
 </motion.h2>
 <motion.p variants={fadeUp} className="text-[var(--color-text-secondary)] font-medium text-lg mb-6">
 "Her çocuğun diş hekimi koltuğundan gülümseyerek ayrılması en büyük motivasyonum."
 </motion.p>
 <motion.p variants={fadeUp} className="text-[#8B8B40] text-base mb-8">
 {businessData.experience} yıllık pedodonti tecrübesi ile on binlerce çocuğun diş fobisini yendik. Kliniğimizde iğne yok, "Sihirli Uyku Suyu" var. Matkap yok, "Diş Fırçalama Robotu" var! Gelin, diş hekimi deneyimini baştan yazalım.
 </motion.p>

 <ul className="grid sm:grid-cols-2 gap-4 mb-8">
 {[
 'Biberon Çürükleri Tedavisi',
 'Sabit / Hareketli Yer Tutucular',
 'Koruyucu Flor Uygulamaları',
 'Travma ve Acil Müdahaleler'
 ].map((item, i) => (
 <motion.div variants={fadeUp} key={i} className="flex items-center gap-3">
 <div className="bg-[#FEF08A] p-1 rounded-full"><Check size={16} className="text-[#CA8A04] font-bold" strokeWidth={3} /></div>
 <span className="font-extrabold text-[var(--color-text-secondary)] text-sm">{item}</span>
 </motion.div>
 ))}
 </ul>

 <motion.a variants={fadeUp} href="#randevu" className="inline-flex items-center gap-2 bg-[var(--color-surface)] text-[var(--color-text)] px-8 py-4 rounded-full font-black hover:bg-[var(--color-surface-muted)] transition-colors border-2 border-[var(--color-surface-muted)] shadow-[0_4px_0_0_#FEF08A] active:translate-y-1 active:shadow-none">
 Rutin Kontrol Randevusu <ChevronRight size={20}/>
 </motion.a>
 </motion.div>
 </div>
 </div>
 </section>

 {/* CONTACT PLAYFUL FORM */}
 <section id="randevu" className="py-24 bg-[var(--color-accent)] relative overflow-hidden">
 <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 mix-blend-overlay rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
 <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FCD34D] opacity-10 mix-blend-overlay rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
 
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <div className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-12 lg:p-16 border-8 border-[var(--color-surface)] relative">
 
 <div className="absolute -top-8 -right-8 w-24 h-24 bg-[#FB923C] rounded-full flex items-center justify-center shadow-lg border-4 border-white transform rotate-12">
 <span className="text-4xl">🦷</span>
 </div>

 <div className="text-center mb-10 max-w-2xl mx-auto">
 <h2 className="font-heading text-4xl md:text-5xl font-black text-[var(--color-text)] mb-4">Ücretsiz İlk Kontrol</h2>
 <p className="text-[var(--color-text-secondary)] font-medium text-lg">Çocuğunuzun tanışma randevusu tamamen ücretsizdir. Formu doldurun, sizinle tanışmak için sabırsızlanıyoruz.</p>
 </div>

 <form className="space-y-6 max-w-3xl mx-auto" onSubmit={e => e.preventDefault()}>
 <div className="grid md:grid-cols-2 gap-6">
 <div>
 <label className="block text-sm font-extrabold text-[var(--color-text-secondary)] mb-2 px-2">Ebeveyn Adı</label>
 <input type="text" className="w-full bg-[var(--color-surface)] border-2 border-[var(--color-surface-muted)] px-5 py-4 rounded-2xl text-[var(--color-text)] font-bold focus:outline-none focus:border-[var(--color-accent)] focus:bg-white transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]" placeholder="Adınız Soyadınız" />
 </div>
 <div>
 <label className="block text-sm font-extrabold text-[var(--color-text-secondary)] mb-2 px-2">Telefon Numarası</label>
 <input type="tel" className="w-full bg-[var(--color-surface)] border-2 border-[var(--color-surface-muted)] px-5 py-4 rounded-2xl text-[var(--color-text)] font-bold focus:outline-none focus:border-[var(--color-accent)] focus:bg-white transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]" placeholder="0555 555 55 55" />
 </div>
 </div>
 <div className="grid md:grid-cols-2 gap-6">
 <div>
 <label className="block text-sm font-extrabold text-[var(--color-text-secondary)] mb-2 px-2">Çocuğunuzun Yaşı</label>
 <select className="w-full bg-[var(--color-surface)] border-2 border-[var(--color-surface-muted)] px-5 py-4 rounded-2xl text-[var(--color-text)] font-bold focus:outline-none focus:border-[var(--color-accent)] focus:bg-white transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] appearance-none cursor-pointer">
 <option>0 - 3 Yaş</option>
 <option>4 - 7 Yaş</option>
 <option>8 - 12 Yaş</option>
 <option>12+ Yaş</option>
 </select>
 </div>
 <div>
 <label className="block text-sm font-extrabold text-[var(--color-text-secondary)] mb-2 px-2">Şikayet / Sebep</label>
 <select className="w-full bg-[var(--color-surface)] border-2 border-[var(--color-surface-muted)] px-5 py-4 rounded-2xl text-[var(--color-text)] font-bold focus:outline-none focus:border-[var(--color-accent)] focus:bg-white transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] appearance-none cursor-pointer">
 <option>İlk Kontrol / Tanışma</option>
 <option>Diş Çürüğü / Ağrı</option>
 <option>Sallanan Süt Dişi</option>
 <option>Flor Uygulaması</option>
 </select>
 </div>
 </div>
 <div className="pt-4 text-center">
 <button className="bg-[var(--color-accent)] text-white font-black text-xl py-5 px-12 rounded-full hover:bg-[var(--color-accent-hover)] transition-all transform hover:scale-105 shadow-[0_6px_0_0_#166534] active:translate-y-2 active:shadow-none max-w-md w-full mx-auto flex items-center justify-center gap-3">
 Randevu Talebi Gönder <ArrowRight strokeWidth={3}/>
 </button>
 </div>
 </form>
 </div>
 </div>
 </section>

 {/* FOOTER */}
 <footer className="bg-white py-12 pb-24 md:pb-12 border-t-[6px] border-[var(--color-surface-muted)]">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8 text-center md:text-left">
 <div className="flex flex-col items-center md:items-start gap-4">
 <h3 className="font-heading text-2xl font-black text-[var(--color-text)] flex items-center gap-2">🦷 {businessData.name}</h3>
 <p className="text-sm font-bold text-[var(--color-text-secondary)] bg-[var(--color-surface)] p-3 rounded-2xl max-w-xs">{businessData.address}</p>
 </div>
 
 <div className="flex flex-col gap-3 items-center md:items-start pt-2">
 <a href={`tel:${businessData.phoneClean}`} className="text-[var(--color-accent)] font-black text-2xl hover:text-[#166534] transition-colors">{businessData.phone}</a>
 <div className="flex items-center gap-2 text-[#4A4A10] font-bold mt-2">
 <Clock size={18} className="text-[#FB923C]"/>
 Pzt-Cmt: 09:00 - 19:00
 </div>
 </div>

 <div className="flex flex-col items-center md:items-end gap-6 pt-2">
 <div className="flex gap-3">
 <a href={businessData.socialMedia?.instagram || '#'} className="bg-[var(--color-surface)] text-[var(--color-text)] w-12 h-12 rounded-full flex items-center justify-center border-2 border-[var(--color-surface-muted)] hover:bg-[#FB923C] hover:text-white hover:border-[#FB923C] transition-all transform hover:scale-110 shadow-sm font-bold">IG</a>
 <a href={businessData.socialMedia?.facebook || '#'} className="bg-[var(--color-surface)] text-[var(--color-text)] w-12 h-12 rounded-full flex items-center justify-center border-2 border-[var(--color-surface-muted)] hover:bg-[#3B82F6] hover:text-white hover:border-[#3B82F6] transition-all transform hover:scale-110 shadow-sm font-bold">FB</a>
 </div>
 <span className="text-sm font-bold text-[#8B8B40]">© {new Date().getFullYear()} {businessData.name}</span>
 </div>
 </div>
 </footer>
 </div>
 )
}

import { registerSection } from '../../registry/section-registry'
registerSection('hero', 'dis_cocuk_full', DisCocukSections as unknown as React.ComponentType<any>)
