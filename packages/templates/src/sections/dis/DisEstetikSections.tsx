'use client'

import React from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { Phone, MapPin, Instagram, Youtube, Sparkles, ChevronRight, Play, Star, Camera, Check } from 'lucide-react'
import { motion } from 'framer-motion'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function DisEstetikSections({ business: businessData }: any) {
 const fadeUp: any = {
 hidden: { opacity: 0, y: 30 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as any } }
 }

 const stagger: any = {
 hidden: { opacity: 0 },
 visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
 }

 return (
 <div className="font-body bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-accent-light)] selection:text-[var(--color-accent)]">
 
 {/* HEADER - Transparent / Glassy */}
 <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-[var(--color-border)]/50 transition-all">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--color-accent)] to-[#F472B6] flex items-center justify-center text-white shadow-lg shadow-pink-500/30">
 <Sparkles size={20} fill="currentColor"/>
 </div>
 <div>
 <h1 className="font-heading text-2xl font-bold tracking-tight text-[var(--color-text)] leading-none">{businessData.name}</h1>
 </div>
 </div>

 <nav className="hidden md:flex gap-10 text-sm font-medium tracking-wide">
 <a href="#gulus-tasarimi" className="hover:text-[var(--color-accent)] transition-colors">Gülüş Tasarımı</a>
 <a href="#hizmetler" className="hover:text-[var(--color-accent)] transition-colors">Estetik Tedaviler</a>
 <a href="#galeri" className="hover:text-[var(--color-accent)] transition-colors">Öncesi / Sonrası</a>
 </nav>

 <a href="#randevu" className="bg-[var(--color-text)] text-white px-7 py-2.5 rounded-full font-medium text-sm hover:bg-[var(--color-accent)] transition-all transform hover:scale-105 shadow-xl hidden sm:block">
 Ücretsiz Analiz
 </a>
 </div>
 </header>

 {/* HERO - Glamorous Fullscreen */}
 <section className="relative h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden">
 <div className="absolute inset-0 w-full h-full">
 <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80" alt="Estetik Gülüş" className="w-full h-full object-cover object-[70%_30%] scale-105" />
 <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-surface)]/90 via-[var(--color-bg)]/60 to-transparent"></div>
 </div>

 <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start pt-20">
 <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
 <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[var(--color-border)] text-[var(--color-accent)] text-xs font-bold uppercase tracking-widest mb-6">
 <Star size={14} fill="currentColor" /> Premium Estetik Kliniği
 </motion.div>
 
 <motion.h2 variants={fadeUp} className="font-heading text-5xl md:text-7xl font-bold text-[var(--color-text)] leading-[1.1] mb-6">
 Sadece Bir Gülüş Değil, <br/>
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[#F472B6]">Yeni Bir Sen.</span>
 </motion.h2>
 
 <motion.p variants={fadeUp} className="text-[#3B0018]/70 text-lg md:text-xl font-medium mb-10 max-w-xl leading-relaxed">
 {businessData.district}'in kalbinde, {businessData.experience} yıllık tecrübeyle kişiye özel porselen laminalar ve dijital gülüş tasarımı. İdeal formunuza kavuşun.
 </motion.p>
 
 <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-5">
 <a href="#randevu" className="bg-[var(--color-accent)] text-white px-8 py-4 rounded-full font-bold text-center hover:bg-[var(--color-accent-hover)] transition-all shadow-xl hover:shadow-pink-500/30 flex items-center justify-center gap-2">
 Gülüş Tasarımına Başla <ChevronRight size={20}/>
 </a>
 <a href="#video" className="bg-white/80 backdrop-blur-md text-[var(--color-text)] border border-[var(--color-border)] px-8 py-4 rounded-full font-bold text-center hover:bg-white transition-colors flex items-center justify-center gap-3">
 <span className="bg-[var(--color-surface)] p-2 rounded-full text-[var(--color-accent)]"><Play size={16} fill="currentColor" className="ml-0.5"/></span>
 Videoyu İzle
 </a>
 </motion.div>
 </motion.div>
 </div>

 {/* Floating elements */}
 <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-8 bg-white/90 backdrop-blur-xl px-10 py-5 rounded-full shadow-2xl border border-[var(--color-border)] w-max max-w-[90vw] overflow-x-auto">
 <div className="flex flex-col items-center min-w-[100px]">
 <span className="font-heading text-2xl font-bold text-[var(--color-accent)]">E-max</span>
 <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-text-muted)]">Lamina</span>
 </div>
 <div className="w-px h-8 bg-[var(--color-border)]"></div>
 <div className="flex flex-col items-center min-w-[100px]">
 <span className="font-heading text-2xl font-bold text-[var(--color-accent)]">Zirkon</span>
 <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-text-muted)]">Kaplama</span>
 </div>
 <div className="w-px h-8 bg-[var(--color-border)]"></div>
 <div className="flex flex-col items-center min-w-[100px]">
 <span className="font-heading text-2xl font-bold text-[var(--color-accent)]">Zoom</span>
 <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-text-muted)]">Beyazlatma</span>
 </div>
 </motion.div>
 </section>

 {/* ABOUT THE DOCTOR */}
 <section id="doktor" className="py-32 bg-white">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid lg:grid-cols-2 gap-20 items-center">
 <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
 <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-surface)] to-[var(--color-bg)] rounded-[3rem] transform -rotate-6 scale-105"></div>
 <img src="https://images.unsplash.com/photo-1594824436998-dded4702f741?auto=format&fit=crop&q=80" alt="Doktor" className="relative rounded-[3rem] w-full aspect-[4/5] object-cover shadow-2xl" />
 
 <div className="absolute -right-8 top-1/2 -translate-y-1/2 bg-white p-6 rounded-3xl shadow-xl border border-[var(--color-border)] max-w-xs animate-bounce" style={{ animationDuration: '4s' }}>
 <div className="flex gap-1 mb-2">
 {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-yellow-400" fill="currentColor"/>)}
 </div>
 <p className="font-heading font-medium text-sm leading-relaxed mb-3">"Selin Hanım sayesinde artık fotoğraflarda gülümsemekten çekinmiyorum. Gerçek bir sanatçı!"</p>
 <p className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">— Ayşe T.</p>
 </div>
 </motion.div>

 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
 <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-6 leading-tight">
 Estetiği Güzellik ile, <br/><span className="text-[var(--color-accent)]">Sağlığı Kaliteyle</span> Buluşturuyoruz.
 </motion.h2>
 <motion.p variants={fadeUp} className="text-[var(--color-text-secondary)] text-lg mb-8">
 Kurucumuz {businessData?.ownerName as string}, gülüş tasarımını bir medikal işlemden çok bir sanat formu olarak görüyor. Her yüz tipine, cilt tonuna ve dudak yapısına özel, "altın oran" kurallarıyla kişiselleştirilmiş gülüşler tasarlıyoruz.
 </motion.p>

 <div className="space-y-4 mb-10">
 {[
 'Mock-up ile tedavi öncesi sonucunuzu canlı görün.',
 'Dudak ve yüz simetrisine uygun digital analiz.',
 'İğnesiz, ağrısız anestezi deneyimi.',
 'Sadece 2 seans ile kalıcı estetik değişim.'
 ].map((text, i) => (
 <motion.div variants={fadeUp} key={i} className="flex items-start gap-4">
 <div className="w-6 h-6 rounded-full bg-[var(--color-surface)] flex items-center justify-center shrink-0 mt-0.5">
 <Check size={14} className="text-[var(--color-accent)]"/>
 </div>
 <p className="font-medium text-[var(--color-text)]">{text}</p>
 </motion.div>
 ))}
 </div>

 <motion.div variants={fadeUp}>
 <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 border border-[var(--color-accent)] text-[var(--color-accent)] px-8 py-4 rounded-full font-bold hover:bg-[var(--color-accent)] hover:text-white transition-colors">
 <Instagram size={20} /> Instagram'dan Takip Et
 </a>
 </motion.div>
 </motion.div>
 </div>
 </div>
 </section>

 {/* SERVICES (Estetik Tedaviler) */}
 <section id="hizmetler" className="py-24 bg-[var(--color-surface)]">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center max-w-2xl mx-auto mb-20">
 <span className="text-[var(--color-accent)] font-bold uppercase tracking-widest text-sm mb-4 block">PORTFÖYÜMÜZ</span>
 <h2 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-6">Öne Çıkan Estetik Uygulamalar</h2>
 <p className="text-[var(--color-text-secondary)] text-lg">Gülüşünüzü baştan yaratmak için dünya standartlarında minimal invaziv (dişe en az dokunan) yaklaşımlar uyguluyoruz.</p>
 </div>

 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
 {businessData.services?.map((service: any, i: number) => (
 <motion.div 
 key={i}
 initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeUp} transition={{ delay: i * 0.1 }}
 className="bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden transform hover:-translate-y-2"
 >
 <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--color-surface)] to-transparent rounded-bl-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
 <div className="relative z-10 flex flex-col items-center text-center">
 <div className="text-4xl mb-6 bg-[var(--color-bg)] w-20 h-20 flex items-center justify-center rounded-3xl shadow-sm text-[var(--color-accent)]">
 {service.icon || <Sparkles size={32}/>}
 </div>
 <h3 className="font-heading font-bold text-xl text-[var(--color-text)] mb-3">{service.name}</h3>
 <p className="text-[var(--color-text-muted)] text-sm mb-8 leading-relaxed">
 Estetik detaylarla yüzünüze en uygun doğal görünümü sağlıyoruz.
 </p>
 <div className="w-full flex justify-between items-center pt-6 border-t border-[var(--color-border)]">
 <span className="font-bold text-[var(--color-text)] text-sm">{service.duration}</span>
 <div className="w-8 h-8 rounded-full bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors">
 <ChevronRight size={16}/>
 </div>
 </div>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* GALLERY BEFORE AFTER */}
 <section id="galeri" className="py-24 bg-white">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
 <div className="max-w-xl">
 <h2 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">Gülüş Dönüşümleri</h2>
 <p className="text-[var(--color-text-secondary)] text-lg">Bizim için en büyük başarı, hastalarımızın değişen hayatları ve özgüven dolu gülüşleridir.</p>
 </div>
 <a href="https://instagram.com" className="bg-[var(--color-surface)] text-[var(--color-text)] px-6 py-3 rounded-full font-bold hover:bg-[var(--color-accent)] hover:text-white transition-colors flex items-center gap-2">
 <Camera size={18}/> Daha Fazlası Instagram'da
 </a>
 </div>

 <div className="grid md:grid-cols-2 gap-8">
 {[1,2].map(i => (
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.2 }} key={i} className="group cursor-pointer">
 <div className="relative h-80 md:h-[400px] rounded-3xl overflow-hidden mb-6 bg-[var(--color-surface)]">
 {/* Mocking a before/after slider look */}
 <div className="absolute inset-0 flex">
 <div className="w-1/2 h-full bg-cover bg-left grayscale" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1590625624707-1111626f2f01?auto=format&fit=crop&q=80)'}}></div>
 <div className="w-1/2 h-full bg-cover bg-right" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80)'}}></div>
 </div>
 <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white -translate-x-1/2 flex items-center justify-center">
 <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-[var(--color-text-muted)]">
 <ChevronRight size={16}/>
 </div>
 </div>
 <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">Öncesi</div>
 <div className="absolute top-4 right-4 bg-[var(--color-accent)]/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">Sonrası</div>
 </div>
 <h3 className="font-heading font-bold text-2xl text-[var(--color-text)]">{i === 1 ? 'E-max Porselen Lamina (Üst Çene 10 Diş)' : 'Zoom Beyazlatma & Kompozit Bonding'}</h3>
 <p className="text-[var(--color-text-muted)] mt-2 font-medium">Tedavi Süresi: Sadece {i === 1 ? '7 Gün' : '1 GÜN'}</p>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* CONTACT BIG FORM COMPONENT */}
 <section id="randevu" className="py-24 bg-[var(--color-bg)]">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-16 grid lg:grid-cols-2 gap-16 items-center">
 
 <div>
 <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-[var(--color-text)]">Gülüşünüz İçin <br/>İlk Adımı Atın.</h2>
 <p className="text-[var(--color-text-secondary)] mb-10 text-lg">Fotoğraflarınızı form üzerinden gönderin, doktorumuz sizin için en uygun tedavi planını ücretsiz olarak oluştursun.</p>
 
 <div className="space-y-6">
 <div className="flex items-center gap-4">
 <div className="bg-[var(--color-surface)] p-4 rounded-2xl text-[var(--color-accent)]">
 <Phone size={24} />
 </div>
 <div>
 <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-1">Telefon & WhatsApp</p>
 <a href={`tel:${businessData.phoneClean}`} className="text-xl font-bold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">{businessData.phone}</a>
 </div>
 </div>
 <div className="flex items-center gap-4">
 <div className="bg-[var(--color-surface)] p-4 rounded-2xl text-[var(--color-accent)]">
 <MapPin size={24} />
 </div>
 <div>
 <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-1">Klinik Adresi</p>
 <p className="text-base font-medium text-[var(--color-text)]">{businessData.address}</p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-[var(--color-surface)] rounded-[2.5rem] p-8 md:p-10 border border-[var(--color-border)]">
 <h3 className="font-heading text-2xl font-bold text-[var(--color-text)] mb-6">Online Konsültasyon</h3>
 <form className="space-y-5" onSubmit={e => e.preventDefault()}>
 <div>
 <input type="text" className="w-full bg-white border border-[var(--color-border)] px-5 py-4 rounded-2xl text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-shadow" placeholder="Adınız Soyadınız" />
 </div>
 <div>
 <input type="tel" className="w-full bg-white border border-[var(--color-border)] px-5 py-4 rounded-2xl text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-shadow" placeholder="Telefon Numaranız" />
 </div>
 <div>
 <select className="w-full bg-white border border-[var(--color-border)] px-5 py-4 rounded-2xl text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-shadow appearance-none">
 <option>Gülüş Tasarımı (Zirkon/Lamina)</option>
 <option>Estetik Dolgu / Bonding</option>
 <option>Diş Beyazlatma</option>
 <option>Diğer</option>
 </select>
 </div>
 <button className="w-full bg-[var(--color-text)] text-white font-bold text-lg py-4 rounded-2xl hover:bg-[var(--color-accent)] transition-all shadow-xl shadow-pink-500/20 mt-4">
 Hemen Gönder
 </button>
 </form>
 </div>

 </div>
 </div>
 </section>

 {/* FOOTER */}
 <footer className="bg-white py-12 border-t border-[var(--color-border)]">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
 <div className="flex items-center gap-2 text-[var(--color-text)] font-heading font-bold text-xl">
 <Sparkles size={20} className="text-[var(--color-accent)]"/> {businessData.name}
 </div>
 
 <div className="text-sm font-medium text-[var(--color-text-muted)] flex gap-6 mt-4 md:mt-0">
 <a href="#" className="hover:text-[var(--color-accent)] transition-colors">KVKK Metni</a>
 <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Gizlilik Politikası</a>
 </div>

 <div className="flex gap-3">
 <a href={businessData.socialMedia?.instagram || '#'} className="bg-[var(--color-surface)] text-[var(--color-accent)] w-12 h-12 rounded-full flex items-center justify-center hover:bg-[var(--color-accent)] hover:text-white transition-colors">
 <Instagram size={20}/>
 </a>
 <a href={businessData.socialMedia?.youtube || '#'} className="bg-[var(--color-surface)] text-[var(--color-accent)] w-12 h-12 rounded-full flex items-center justify-center hover:bg-[var(--color-accent)] hover:text-white transition-colors">
 <Youtube size={20}/>
 </a>
 </div>
 </div>
 <div className="text-center text-xs font-semibold text-[var(--color-text-muted)] mt-10 uppercase tracking-widest">
 © {new Date().getFullYear()} {businessData.name}. Tüm hakları saklıdır.
 </div>
 </footer>
 </div>
 )
}

import { registerSection } from '../../registry/section-registry'
registerSection('hero', 'dis_estetik_full', DisEstetikSections as unknown as React.ComponentType<any>)
