'use client'

import React from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { Phone, MapPin, ChevronRight, Star, Clock, Instagram, Youtube, Play, Shield, ArrowRight, Diamond } from 'lucide-react'
import { motion } from 'framer-motion'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function DisPremiumSections({ business: businessData }: any) {
 const fadeUp: any = {
 hidden: { opacity: 0, y: 30 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] } }
 }

 const stagger: any = {
 hidden: { opacity: 0 },
 visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
 }

 return (
 <div className="font-body bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-accent)] selection:text-[var(--color-bg)]">
 
 {/* HEADER - Luxury Dark */}
 <header className="fixed top-0 w-full z-50 bg-[var(--color-bg)]/80 backdrop-blur-2xl border-b border-[var(--color-border)] transition-all">
 <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex justify-between items-center">
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 rounded-none border border-[var(--color-accent)] flex items-center justify-center p-1 relative group cursor-pointer">
 <div className="absolute inset-0 bg-[var(--color-accent)] opacity-0 group-hover:opacity-10 transition-opacity"></div>
 <Diamond size={24} className="text-[var(--color-accent)]" strokeWidth={1} />
 </div>
 <div>
 <h1 className="font-heading text-2xl tracking-widest text-[var(--color-text)] uppercase">{businessData.name}</h1>
 <p className="text-[10px] text-[var(--color-accent)] uppercase tracking-[0.3em] mt-1 opacity-80">Estetik & İmplantoloji</p>
 </div>
 </div>

 <nav className="hidden lg:flex gap-12 text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
 <a href="#uzmanlik" className="hover:text-[var(--color-accent)] transition-colors py-2">Uzmanlık Alanları</a>
 <a href="#klinik" className="hover:text-[var(--color-accent)] transition-colors py-2">Klinik Deneyimi</a>
 <a href="#hekimler" className="hover:text-[var(--color-accent)] transition-colors py-2">Hekim Kadrosu</a>
 </nav>

 <a href="#rezervasyon" className="border border-[var(--color-accent)] text-[var(--color-accent)] px-8 py-3 text-xs uppercase tracking-widest hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-all duration-500 hidden sm:block">
 VIP Konsültasyon
 </a>
 </div>
 </header>

 {/* HERO - Cinematic Luxury */}
 <section className="relative h-[100svh] min-h-[700px] flex items-center justify-center overflow-hidden">
 {/* Background Image / Video Mock */}
 <div className="absolute inset-0 w-full h-full">
 <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80" alt="VIP Klinik" className="w-full h-full object-cover opacity-40 grayscale" />
 <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/80 to-[var(--color-bg)]/40"></div>
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,169,110,0.05)_0%,transparent_70%)]"></div>
 </div>

 <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center text-center pt-20">
 <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl flex flex-col items-center">
 <motion.p variants={fadeUp} className="text-[var(--color-accent)] text-xs uppercase tracking-[0.4em] mb-8 flex items-center gap-4">
 <span className="w-12 h-[1px] bg-[var(--color-accent)]/50"></span>
 {businessData.slogan}
 <span className="w-12 h-[1px] bg-[var(--color-accent)]/50"></span>
 </motion.p>
 
 <motion.h2 variants={fadeUp} className="font-heading text-5xl md:text-7xl xl:text-8xl text-[var(--color-text)] leading-[1.1] mb-10 font-light">
 Mükemmelliğin <br/>
 <span className="italic font-serif text-[var(--color-accent)]">Yeni Tanımı</span>
 </motion.h2>
 
 <motion.p variants={fadeUp} className="text-[var(--color-text-muted)] text-lg md:text-xl font-light mb-12 max-w-2xl leading-relaxed">
 {businessData.district}'de kişiye özel 5 yıldızlı otel konforunda hizmet veren butik kliniğimizde, dental estetiği ve cerrahiyi yeniden hayal ediyoruz.
 </motion.p>
 
 <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6 items-center">
 <a href="#rezervasyon" className="bg-[var(--color-accent)] text-[var(--color-bg)] px-10 py-5 text-sm uppercase tracking-widest font-semibold hover:bg-[var(--color-accent-hover)] transition-all flex items-center gap-3">
 Ayrıcalıklı Randevu <ArrowRight size={16}/>
 </a>
 <a href="#video" className="text-[var(--color-text)] px-8 py-5 text-sm uppercase tracking-widest font-medium hover:text-[var(--color-accent)] transition-colors flex items-center gap-3 group">
 <div className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center group-hover:border-[var(--color-accent)] transition-colors">
 <Play size={12} fill="currentColor" className="ml-0.5 text-[var(--color-accent)]"/>
 </div>
 Klinik Turu
 </a>
 </motion.div>
 </motion.div>
 </div>

 <div className="absolute bottom-0 left-0 w-full py-6 border-t border-[var(--color-border)]/30 backdrop-blur-md hidden md:block">
 <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
 <span className="flex items-center gap-2"><Star size={12} className="text-[var(--color-accent)]"/> 5.0 Google Puanı / {businessData.reviewCount} Değerlendirme</span>
 <span>Uluslararası Sağlık Turizmi Yetki Belgesi</span>
 <span className="flex items-center gap-2">{businessData.experience} Klinik Tecrübe</span>
 </div>
 </div>
 </section>

 {/* PHILOSOPHY / ABOUT */}
 <section id="klinik" className="py-32 bg-[var(--color-bg)]">
 <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
 <div className="grid lg:grid-cols-2 gap-20 items-center">
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="pr-0 xl:pr-20">
 <motion.h3 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-light text-[var(--color-text)] mb-8 leading-tight">
 Her Detayda <br/><span className="italic text-[var(--color-accent)] font-serif">Kişiselleştirilmiş Lüks</span>
 </motion.h3>
 <motion.div variants={fadeUp} className="w-20 h-px bg-[var(--color-accent)] mb-10"></motion.div>
 <motion.p variants={fadeUp} className="text-[var(--color-text-muted)] text-lg mb-8 font-light leading-relaxed">
 Sıradan bir klinik ziyaretinden çok daha fazlası. Royal Dental Clinic'te, kapıdan girdiğiniz andan itibaren VIP concierge hizmetimizle karşılanırsınız. Size özel tahsis edilmiş dinlenme alanları, aromaterapi ve kişiselleştirilmiş tedavi modülleri.
 </motion.p>
 <motion.p variants={fadeUp} className="text-[var(--color-text-muted)] text-lg mb-12 font-light leading-relaxed">
 Sadece en üst segment, FDA onaylı biyolojik dostu materyaller ve mikroskobik vizyon altında, dokuya maksimum saygı gösterilen dijital diş hekimliği protokolleri uyguluyoruz.
 </motion.p>
 <motion.a variants={fadeUp} href="#rezervasyon" className="inline-flex items-center gap-4 text-[var(--color-text)] uppercase tracking-widest text-xs font-semibold hover:text-[var(--color-accent)] transition-all group">
 Felsefemizi Keşfedin 
 <span className="w-10 h-px bg-[var(--color-accent)] group-hover:w-16 transition-all duration-500"></span>
 </motion.a>
 </motion.div>

 <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative h-[600px]">
 <img src="https://images.unsplash.com/photo-1594824436998-dded4702f741?auto=format&fit=crop&q=80" alt="VIP Klinik" className="w-full h-full object-cover object-center grayscale opacity-80" />
 <div className="absolute inset-0 bg-[#0A0A0A] mix-blend-color opacity-50"></div>
 <div className="absolute inset-0 border border-[var(--color-border)] m-6"></div>
 
 {/* Floating Gold Stat */}
 <div className="absolute -left-10 bottom-20 bg-[var(--color-surface)] p-8 border border-[var(--color-border)] max-w-[250px] shadow-2xl">
 <p className="text-4xl font-heading font-light text-[var(--color-accent)] mb-2">1999</p>
 <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] leading-relaxed">Yılından Beri Uluslararası Yüksek Standartlar</p>
 </div>
 </motion.div>
 </div>
 </div>
 </section>

 {/* SERVICES - Minimalist Grid */}
 <section id="uzmanlik" className="py-32 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
 <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
 <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
 <div>
 <h2 className="font-heading text-4xl md:text-5xl font-light text-[var(--color-text)] mb-4">
 Dijital <span className="italic text-[var(--color-accent)] font-serif">Mükemmellik</span>
 </h2>
 <p className="text-[var(--color-text-muted)] text-lg">Alanında dünya otoritesi hekimlerimiz tarafından uygulanan protokoller.</p>
 </div>
 <a href="#rezervasyon" className="border border-[var(--color-border)] text-[var(--color-text)] px-6 py-3 text-xs uppercase tracking-widest hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors">
 Tüm Tedaviler
 </a>
 </div>

 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 border border-[var(--color-border)]">
 {businessData.services?.map((service: any, i: number) => (
 <motion.div 
 key={i}
 initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeUp} transition={{ delay: i * 0.1 }}
 className={`p-10 border-[var(--color-border)] ${i !== 0 && i !== 4 ? 'border-t md:border-t-0 md:border-l' : i === 4 ? 'border-t border-l' : ''} ${i > 3 ? 'lg:border-t' : ''} group hover:bg-[var(--color-bg)] transition-colors duration-500 cursor-pointer flex flex-col`}
 >
 <div className="text-2xl mb-10 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors duration-500">
 {service.icon || <Diamond size={28} strokeWidth={1} />}
 </div>
 <h3 className="font-heading font-light text-2xl text-[var(--color-text)] mb-4">{service.name}</h3>
 <p className="text-sm font-light text-[var(--color-text-muted)] leading-relaxed mb-10 flex-grow">
 Milimetrik hassasiyet ve estetik mükemmellik için kişiye özel premium protokol. {service.duration} sürecek tedavi deneyimi.
 </p>
 
 <div className="w-full flex justify-between items-center group-hover:-translate-y-2 transition-transform duration-500 mt-auto">
 <span className="text-[10px] tracking-[0.2em] font-medium text-[var(--color-accent)] uppercase">{service.price} Başlayan Fiyatlar</span>
 <ArrowRight size={16} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors"/>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* DOCTOR PROFILE */}
 <section id="hekimler" className="py-32 bg-[var(--color-bg)]">
 <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
 <div className="grid lg:grid-cols-12 gap-16 items-center">
 <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:col-span-5 relative">
 <div className="aspect-[3/4] overflow-hidden">
 <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80" alt="Prof. Dr. Beril Yılmaz" className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700" />
 </div>
 <div className="absolute -bottom-8 -right-8 bg-[var(--color-surface)] p-8 border border-[var(--color-border)] hidden md:block">
 <p className="font-heading text-xl text-[var(--color-accent)] italic mb-1 font-serif">Prof. Dr. Beril Yılmaz</p>
 <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Klinik Direktörü & Kurucu</p>
 </div>
 </motion.div>

 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="lg:col-span-7 lg:pl-12">
 <motion.p variants={fadeUp} className="text-[var(--color-accent)] text-xs uppercase tracking-[0.3em] mb-6">Uluslararası Board Sertifikalı Hekim</motion.p>
 <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-light text-[var(--color-text)] mb-8 leading-tight">
 Dünya standartlarını <br/><span className="text-[var(--color-accent)] italic font-serif">İstanbul'da</span> deneyimleyin.
 </motion.h2>
 <motion.div variants={fadeUp} className="w-16 h-px bg-[var(--color-text-muted)] mb-8"></motion.div>
 <motion.p variants={fadeUp} className="text-[var(--color-text-muted)] text-lg mb-6 font-light leading-relaxed">
 Amerika ve İsviçre'de aldığı ileri cerrahi ve estetik eğitimlerini, 25 yıllık klinik tecrübesiyle harmanlayan {businessData?.ownerName as string}, sadece diş değil, sanatsal bir profil tasarımı sunmaktadır.
 </motion.p>

 <ul className="space-y-4 mb-12 mt-8">
 {[
 'New York University / Advanced Programs In Implantology',
 'European Association for Osseointegration (EAO) Aktif Üye',
 'International Congress of Oral Implantologists (ICOI) Fellow',
 'Estetik Diş Hekimliği Akademisi Derneği (EDAD) Onur Üyesi'
 ].map((item, i) => (
 <motion.div variants={fadeUp} key={i} className="flex items-start gap-4 border-b border-[var(--color-border)]/50 pb-4">
 <Shield size={16} className="text-[var(--color-accent)] shrink-0 mt-1" strokeWidth={1.5} />
 <span className="text-[var(--color-text)] font-light text-sm opacity-90">{item}</span>
 </motion.div>
 ))}
 </ul>

 <motion.a variants={fadeUp} href="#rezervasyon" className="inline-flex items-center gap-4 text-[var(--color-text)] uppercase tracking-widest text-xs font-semibold hover:text-[var(--color-accent)] transition-all group">
 Randevu Talebi 
 <span className="w-10 h-px bg-[var(--color-accent)] group-hover:w-16 transition-all duration-500"></span>
 </motion.a>
 </motion.div>
 </div>
 </div>
 </section>

 {/* CONTACT LUXURY FORM */}
 <section id="rezervasyon" className="py-32 bg-[var(--color-surface)] border-t border-[var(--color-border)] relative">
 <div className="absolute top-0 right-0 w-1/3 h-full bg-[var(--color-bg)] hidden lg:block"></div>
 
 <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
 <div className="grid lg:grid-cols-2 gap-20">
 
 {/* Contact details */}
 <div className="flex flex-col justify-center pr-0 lg:pr-12">
 <h2 className="font-heading text-4xl md:text-5xl font-light mb-8 text-[var(--color-text)]">
 Ayrıcalıklı <br/><span className="text-[var(--color-accent)] italic font-serif">Konsültasyon</span>
 </h2>
 <p className="text-[var(--color-text-muted)] mb-12 text-lg font-light leading-relaxed">Uluslararası hasta departmanımız ve concierge ekibimiz, tedavi sürecinizin her aşamasında size özel VIP transfer, konaklama ve tedavi planlaması sunmaktadır.</p>
 
 <div className="space-y-10">
 <div className="flex gap-6">
 <div className="w-12 h-12 border border-[var(--color-border)] flex items-center justify-center rounded-sm shrink-0">
 <Phone size={18} className="text-[var(--color-accent)]"/>
 </div>
 <div>
 <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-2">Concierge Hattı</p>
 <a href={`tel:${businessData.phoneClean}`} className="text-2xl font-light text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">{businessData.phone}</a>
 </div>
 </div>
 <div className="flex gap-6">
 <div className="w-12 h-12 border border-[var(--color-border)] flex items-center justify-center rounded-sm shrink-0">
 <MapPin size={18} className="text-[var(--color-accent)]"/>
 </div>
 <div>
 <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-2">Private Clinic</p>
 <p className="text-lg font-light text-[var(--color-text)]">{businessData.address}</p>
 </div>
 </div>
 </div>
 </div>

 {/* Luxury Form */}
 <div className="bg-[var(--color-bg)] p-10 md:p-14 border border-[var(--color-border)]">
 <h3 className="text-[10px] uppercase tracking-[0.3em] font-medium text-[var(--color-accent)] mb-12">Öncelikli Geri Dönüş Talebi</h3>
 <form className="space-y-8" onSubmit={e => e.preventDefault()}>
 <div className="relative">
 <input type="text" className="w-full bg-transparent border-b border-[var(--color-border)] py-4 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] transition-colors peer placeholder-transparent" placeholder="Adınız Soyadınız" id="name" />
 <label htmlFor="name" className="absolute left-0 top-4 text-xs tracking-widest text-[var(--color-text-muted)] uppercase peer-focus:-translate-y-6 peer-focus:text-[10px] peer-focus:text-[var(--color-accent)] transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-xs">
 İSİM SOYİSİM
 </label>
 </div>
 <div className="relative">
 <input type="tel" className="w-full bg-transparent border-b border-[var(--color-border)] py-4 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] transition-colors peer placeholder-transparent" placeholder="Telefon Numarası" id="phone" />
 <label htmlFor="phone" className="absolute left-0 top-4 text-xs tracking-widest text-[var(--color-text-muted)] uppercase peer-focus:-translate-y-6 peer-focus:text-[10px] peer-focus:text-[var(--color-accent)] transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-xs">
 TELEFON NUMARASI
 </label>
 </div>
 <div className="relative pt-4">
 <select className="w-full bg-transparent border-b border-[var(--color-border)] py-4 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] transition-colors appearance-none text-xs uppercase tracking-widest cursor-pointer group">
 <option className="bg-[#141414]">Tedavi İlgi Alanınız</option>
 <option className="bg-[#141414]">Gülüş Tasarımı (Porselen Lamina)</option>
 <option className="bg-[#141414]">İmplant & Cerrahi (All-on-4/6)</option>
 <option className="bg-[#141414]">Genel Diş Hekimliği</option>
 <option className="bg-[#141414]">VIP Check-up</option>
 </select>
 <ChevronRight size={16} className="absolute right-0 top-1/2 -mt-1 text-[var(--color-text-muted)] pointer-events-none transform rotate-90" />
 </div>
 <button className="w-full bg-[var(--color-accent)] text-[var(--color-bg)] font-semibold text-xs tracking-[0.2em] uppercase py-5 hover:bg-[var(--color-accent-hover)] transition-all mt-8">
 Talebi İletin
 </button>
 </form>
 </div>

 </div>
 </div>
 </section>

 {/* FOOTER LUXURY */}
 <footer className="bg-[var(--color-bg)] py-16 border-t border-[var(--color-border)]/50">
 <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center">
 <div className="w-12 h-12 border border-[var(--color-accent)] flex items-center justify-center p-1 mb-8">
 <Diamond size={24} className="text-[var(--color-accent)]" strokeWidth={1} />
 </div>
 
 <h3 className="font-heading text-xl tracking-widest text-[var(--color-text)] uppercase mb-6">{businessData.name}</h3>
 
 <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-12">
 <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Ana Sayfa</a>
 <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Tedaviler</a>
 <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Gizlilik Politikası</a>
 <a href="#" className="hover:text-[var(--color-accent)] transition-colors">English</a>
 </div>

 <div className="flex gap-4 mb-16">
 <a href={businessData.socialMedia?.instagram || '#'} className="w-10 h-10 border border-[var(--color-border)] rounded-full flex items-center justify-center text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors">
 <Instagram size={16}/>
 </a>
 <a href={businessData.socialMedia?.youtube || '#'} className="w-10 h-10 border border-[var(--color-border)] rounded-full flex items-center justify-center text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors">
 <Youtube size={16}/>
 </a>
 </div>

 <div className="w-full border-t border-[var(--color-border)]/30 flex justify-between pt-8 text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
 <span>© {new Date().getFullYear()} {businessData.name}</span>
 <span>TÜRKİYE</span>
 </div>
 </div>
 </footer>
 </div>
 )
}

import { registerSection } from '../../registry/section-registry'
registerSection('hero', 'dis_premium_full', DisPremiumSections as unknown as React.ComponentType<any>)
