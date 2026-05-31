'use client'

import React, { useState } from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { Phone, MapPin, Mail, ChevronRight, CheckCircle, Shield, Microscope, Layers, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function DisImplantSections({ business: businessData }: any) {
 const [activeTab, setActiveTab] = useState(0)

 const fadeUp: any = {
 hidden: { opacity: 0, y: 40 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as any } }
 }

 const stagger: any = {
 hidden: { opacity: 0 },
 visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
 }

 return (
 <div className="font-body bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-accent)] selection:text-white">
 
 {/* TOP BAR */}
 <div className="bg-[var(--color-text)] text-white text-xs py-2 hidden md:block">
 <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
 <div className="flex gap-6 opacity-80 font-medium">
 <span className="flex items-center gap-2"><MapPin size={14}/> {businessData.district}, {businessData.city}</span>
 <span className="flex items-center gap-2"><Phone size={14}/> {businessData.phone}</span>
 </div>
 <div className="flex gap-4 opacity-80 font-medium uppercase tracking-widest">
 <span>Pzt - Cmt: 09:00 - 19:00</span>
 </div>
 </div>
 </div>

 {/* HEADER */}
 <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[var(--color-border)]">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 border-2 border-[var(--color-accent)] flex items-center justify-center rounded-sm transform rotate-45">
 <div className="transform -rotate-45">
 <Shield size={20} className="text-[var(--color-accent)]" fill="currentColor" fillOpacity={0.2} strokeWidth={2}/>
 </div>
 </div>
 <div>
 <h1 className="font-heading text-2xl font-bold tracking-tight text-[var(--color-text)] uppercase">{businessData.name}</h1>
 <p className="text-[10px] text-[var(--color-text-secondary)] font-bold tracking-widest uppercase mt-0.5">{businessData.slogan}</p>
 </div>
 </div>

 <nav className="hidden lg:flex gap-10 text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
 <a href="#uzmanlik" className="hover:text-[var(--color-accent)] transition-colors">Uzmanlık Alanlarımız</a>
 <a href="#teknoloji" className="hover:text-[var(--color-accent)] transition-colors">Teknoloji</a>
 <a href="#hekimler" className="hover:text-[var(--color-accent)] transition-colors">Hekim Kadrosu</a>
 </nav>

 <a href="#randevu" className="bg-[var(--color-text)] text-white px-6 py-3 font-semibold text-sm hover:bg-[var(--color-accent)] transition-colors shadow-lg hidden sm:flex items-center gap-2 group uppercase tracking-widest rounded-sm">
 Danışma Hattı <div className="bg-white/20 p-1 rounded-sm group-hover:bg-white group-hover:text-[var(--color-accent)] transition-colors"><ChevronRight size={16}/></div>
 </a>
 </div>
 </header>

 {/* HERO - Clinical & Authoritative */}
 <section className="relative overflow-hidden bg-[var(--color-surface)]">
 <div className="absolute right-0 top-0 w-1/2 h-full bg-[var(--color-text)] hidden lg:block" style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
 
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <div className="grid lg:grid-cols-2 gap-12 py-20 lg:py-32 items-center">
 <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl pr-0 lg:pr-12">
 <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
 <span className="w-12 h-[2px] bg-[var(--color-accent)]"></span>
 <span className="text-[var(--color-accent)] font-bold uppercase tracking-widest text-sm">İleri Teknoloji Diş Kliniği</span>
 </motion.div>
 <motion.h2 variants={fadeUp} className="font-heading text-5xl lg:text-7xl font-bold text-[var(--color-text)] leading-[1.1] mb-6">
 Kalıcı Çözüm, <br/>
 <span className="text-[var(--color-accent)]">Kusursuz Estetik.</span>
 </motion.h2>
 <motion.p variants={fadeUp} className="text-[var(--color-text-muted)] text-lg mb-10 leading-relaxed">
 {businessData.experience} yıllık cerrahi tecrübe, 3D tomografi planlaması ve ömür boyu garantili, FDA onaylı titanyum implantlarla eksik dişlerinize kalıcı olarak veda edin.
 </motion.p>
 <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
 <a href="#randevu" className="bg-[var(--color-accent)] text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-[var(--color-accent-hover)] transition-all flex items-center justify-center gap-3 rounded-sm">
 Ücretsiz Röntgen ve Muayene
 </a>
 </motion.div>
 
 <motion.div variants={fadeUp} className="grid grid-cols-2 gap-6 mt-16 pt-10 border-t border-[var(--color-border)]">
 <div>
 <p className="text-4xl font-heading font-bold text-[var(--color-text)] mb-1">5000+</p>
 <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Başarılı İmplant</p>
 </div>
 <div>
 <p className="text-4xl font-heading font-bold text-[var(--color-text)] mb-1">%99.8</p>
 <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Cerrahi Başarı Oranı</p>
 </div>
 </motion.div>
 </motion.div>
 
 <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="relative h-[500px] lg:h-[700px] rounded-sm overflow-hidden shadow-2xl">
 <img src="https://images.unsplash.com/photo-1598256989721-36ba90cbfccc?auto=format&fit=crop&q=80" alt="Dental Cerrah" className="w-full h-full object-cover grayscale contrast-125" />
 <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
 
 {/* Overlay clinical details */}
 <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-sm border-l-4 border-[var(--color-accent)]">
 <h4 className="font-heading font-bold text-[var(--color-text)] text-lg mb-2">Aynı Gün İmplant Konforu</h4>
 <p className="text-sm text-[var(--color-text-muted)] font-medium mb-4">Uygun vakalarda, çekim sonrası imediant implant ve geçici protez uygulaması ile klinikten dişsiz ayrılmazsınız.</p>
 <div className="flex gap-2">
 <span className="bg-[var(--color-surface)] px-3 py-1 text-xs font-bold text-[var(--color-accent)] uppercase tracking-wider">All-on-4</span>
 <span className="bg-[var(--color-surface)] px-3 py-1 text-xs font-bold text-[var(--color-accent)] uppercase tracking-wider">Lazer Cerrahisi</span>
 </div>
 </div>
 </motion.div>
 </div>
 </div>
 </section>

 {/* TECH / FEATURES */}
 <section id="teknoloji" className="py-20 bg-[var(--color-text)] text-white">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid md:grid-cols-3 gap-10 divide-y md:divide-y-0 md:divide-x divide-white/20">
 <div className="flex flex-col gap-4 md:pr-10 pt-8 md:pt-0">
 <Microscope size={40} className="text-[var(--color-accent-light)]" strokeWidth={1.5} />
 <h3 className="font-heading text-2xl font-bold">3D Volumetrik Tomografi</h3>
 <p className="text-white/70 text-sm leading-relaxed">Çene kemiğinizin 3 boyutlu haritasını çıkararak, milimetrik ve sürprizlere yer bırakmayan dijital implant planlaması yapıyoruz.</p>
 </div>
 <div className="flex flex-col gap-4 md:px-10 pt-8 md:pt-0">
 <Layers size={40} className="text-[var(--color-accent-light)]" strokeWidth={1.5} />
 <h3 className="font-heading text-2xl font-bold">Ömür Boyu Uluslararası Garanti</h3>
 <p className="text-white/70 text-sm leading-relaxed">Yalnızca FDA ve CE sertifikalı, dünya çapında kabul görmüş "A Class" İsviçre ve Alman marka pürüzsüz titanyum implantlar kullanıyoruz.</p>
 </div>
 <div className="flex flex-col gap-4 md:pl-10 pt-8 md:pt-0">
 <Shield size={40} className="text-[var(--color-accent-light)]" strokeWidth={1.5} />
 <h3 className="font-heading text-2xl font-bold">Sterilizasyon ve Hijyen</h3>
 <p className="text-white/70 text-sm leading-relaxed">Ameliyathane standartlarında, otoklav cihazları ile %100 steril bir ortamda, enfeksiyon riskinden tamamen uzak cerrahi müdahale.</p>
 </div>
 </div>
 </div>
 </section>

 {/* SERVICES */}
 <section id="uzmanlik" className="py-24 bg-white relative">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-16">
 {/* Sidebar title */}
 <div className="lg:w-1/3">
 <div className="sticky top-32">
 <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-6">Cerrahi & İmplantoloji</h2>
 <p className="text-[var(--color-text-muted)] text-lg mb-8">Karmaşık vakalarda ve kemik erimesi durumlarında bile uzman cerrah kadromuzla yanınızdayız.</p>
 <a href="#randevu" className="text-[var(--color-accent)] font-bold uppercase tracking-widest text-sm flex items-center gap-2 hover:gap-4 transition-all">
 Tüm Tedavileri Gör <ArrowRight size={18}/>
 </a>
 </div>
 </div>

 {/* Services List */}
 <div className="lg:w-2/3 flex flex-col gap-6">
 {businessData.services?.map((service: any, i: number) => (
 <motion.div 
 key={i}
 initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeUp} transition={{ delay: i * 0.1 }}
 className="border border-[var(--color-border)] p-8 hover:border-[var(--color-accent)] transition-colors group bg-[var(--color-bg)]"
 >
 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
 <h3 className="font-heading font-bold text-2xl text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">{service.name}</h3>
 <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">
 <span>{service.price}</span>
 <span className="w-1 h-1 bg-[var(--color-text-muted)] rounded-full"></span>
 <span>{service.duration}</span>
 </div>
 </div>
 <p className="text-[var(--color-text-muted)] leading-relaxed">
 {service.description || 'Eksik dişlerin fonksiyon ve estetiğini geri kazandırmak için çene kemiğine yerleştirilen yapay titanyum kök uygulaması. Lokal anestezi altında tamamen ağrısız bir şekilde gerçekleştirilir.'}
 </p>
 <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
 <ul className="grid sm:grid-cols-2 gap-3">
 <li className="flex items-center gap-2 text-sm font-medium text-[var(--color-text)]"><CheckCircle size={16} className="text-[var(--color-accent)]"/> %100 Titanyum Materyal</li>
 <li className="flex items-center gap-2 text-sm font-medium text-[var(--color-text)]"><CheckCircle size={16} className="text-[var(--color-accent)]"/> 10 Dakikada Cerrahi İşlem</li>
 <li className="flex items-center gap-2 text-sm font-medium text-[var(--color-text)]"><CheckCircle size={16} className="text-[var(--color-accent)]"/> Aynı Gün Geçiçi Protez</li>
 <li className="flex items-center gap-2 text-sm font-medium text-[var(--color-text)]"><CheckCircle size={16} className="text-[var(--color-accent)]"/> Ömür Boyu Kalıcılık</li>
 </ul>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* DOCTOR PROFILE */}
 <section id="hekimler" className="py-24 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center mb-16">
 <h2 className="font-heading text-4xl font-bold text-[var(--color-text)] mb-4">Uzman Hekim Kadrosu</h2>
 <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto text-lg">Alanında uzman, yenilikçi tedavi yöntemlerini takip eden deneyimli kadromuzla sağlığınız emin ellerde.</p>
 </div>

 <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
 {businessData.team?.map((member: any, i: number) => (
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.2 }} key={i} className="flex flex-col bg-white border border-[var(--color-border)]">
 <div className="h-80 bg-gray-200 w-full overflow-hidden">
 <img 
 src={i === 0 ? "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80" : "https://images.unsplash.com/photo-1594824436998-dded4702f741?auto=format&fit=crop&q=80"} 
 alt={member.name} 
 className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
 />
 </div>
 <div className="p-8 text-center">
 <h3 className="font-heading text-2xl font-bold text-[var(--color-text)] mb-2">{member.name}</h3>
 <p className="text-[var(--color-accent)] font-bold uppercase tracking-widest text-xs mb-4">{member.role}</p>
 <p className="text-[var(--color-text-muted)] text-sm mb-6">İstanbul Üniversitesi Diş Hekimliği Fakültesi mezunu. İmplantoloji ve ileri cerrahi alanında {member.experience} klinik tecrübe.</p>
 <a href="#randevu" className="inline-block border-b-2 border-[var(--color-text)] pb-1 font-bold text-sm uppercase tracking-wider hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors">
 Doktordan Randevu Al
 </a>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* CONTACT BIG FORM */}
 <section id="randevu" className="py-24 bg-[var(--color-bg)]">
 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="bg-[var(--color-text)] text-white shadow-2xl p-8 md:p-16 relative overflow-hidden">
 <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 mix-blend-overlay rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
 
 <div className="text-center mb-12 relative z-10">
 <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">Konsültasyon Talebi</h2>
 <p className="text-[var(--color-accent-light)] opacity-80 text-lg">Röntgeninizi bize iletin, tedavi planlamanızı ve maliyet analizini ücretsiz yapalım.</p>
 </div>

 <form className="space-y-6 relative z-10" onSubmit={e => e.preventDefault()}>
 <div className="grid md:grid-cols-2 gap-6">
 <div>
 <label className="block text-xs font-bold uppercase tracking-widest text-white/70 mb-2">Ad Soyad</label>
 <input type="text" className="w-full bg-white/10 border border-white/20 px-4 py-4 text-white focus:outline-none focus:border-[var(--color-accent-light)] transition-colors rounded-sm" placeholder="Örn. Ahmet Yılmaz" />
 </div>
 <div>
 <label className="block text-xs font-bold uppercase tracking-widest text-white/70 mb-2">Telefon NUMARASI</label>
 <input type="tel" className="w-full bg-white/10 border border-white/20 px-4 py-4 text-white focus:outline-none focus:border-[var(--color-accent-light)] transition-colors rounded-sm" placeholder="0555 555 55 55" />
 </div>
 </div>
 <div>
 <label className="block text-xs font-bold uppercase tracking-widest text-white/70 mb-2">Tedavi İhtiyacınız</label>
 <select className="w-full bg-white/10 border border-white/20 px-4 py-4 text-white focus:outline-none focus:border-[var(--color-accent-light)] transition-colors rounded-sm appearance-none">
 <option className="text-black">İmplant (Tek/Çoklu)</option>
 <option className="text-black">All-on-4 / All-on-6</option>
 <option className="text-black">Kemik Tozu Ekimi</option>
 <option className="text-black">Gömülü Diş Çekimi</option>
 </select>
 </div>
 <div className="pt-6 border-t border-white/10 flex flex-col items-center">
 <button className="bg-[var(--color-accent)] text-white font-bold text-lg py-5 px-12 hover:bg-white hover:text-[var(--color-text)] transition-colors flex items-center gap-3 uppercase tracking-widest">
 Talebi Gönder <ArrowRight size={20}/>
 </button>
 <p className="text-xs text-white/50 mt-4 text-center">Gülüş danışmanlarımız en geç 30 dakika içerisinde size dönüş yapacaktır.</p>
 </div>
 </form>
 </div>
 </div>
 </section>

 {/* FOOTER */}
 <footer className="bg-[var(--color-bg)] py-12 border-t border-[var(--color-border)]">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
 <div className="flex flex-col gap-4">
 <h3 className="font-heading text-xl font-bold text-[var(--color-text)]">{businessData.name}</h3>
 <p className="text-sm font-medium text-[var(--color-text-muted)] line-clamp-2 max-w-xs">{businessData.address}</p>
 </div>
 
 <div className="flex flex-col gap-2 md:items-center justify-center">
 <a href={`tel:${businessData.phoneClean}`} className="text-[var(--color-text)] font-semibold text-xl hover:text-[var(--color-accent)] transition-colors">{businessData.phone}</a>
 <a href={`mailto:${businessData.email}`} className="text-[var(--color-text-muted)] text-sm font-medium hover:text-[var(--color-accent)] transition-colors">{businessData.email}</a>
 </div>

 <div className="flex flex-col md:items-end justify-center gap-3 text-sm font-medium text-[var(--color-text-muted)]">
 <span>© {new Date().getFullYear()} {businessData.name}.</span>
 <a href="#" className="hover:text-[var(--color-text)] transition-colors underline">KVKK Aydınlatma Metni</a>
 </div>
 </div>
 </footer>
 </div>
 )
}

import { registerSection } from '../../registry/section-registry'
registerSection('hero', 'dis_implant_full', DisImplantSections as unknown as React.ComponentType<any>)
