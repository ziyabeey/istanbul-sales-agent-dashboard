'use client'

import React from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { Phone, MapPin, Search, Feather, Droplets, Leaf, ShieldAlert, Sparkles, Star } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function EczaneBitkiselSections({ config, businessData }: Props) {
 // Growth Tier - Asymmetric Layout, Organic Green Vibes
 
 const getIcon = (name: string) => {
 switch (name) {
 case '🌿': return <Leaf size={28} strokeWidth={1.5} className="text-[var(--color-accent)]" />
 case '💊': return <ShieldAlert size={28} strokeWidth={1.5} className="text-[var(--color-accent)]" />
 case '🧬': return <Droplets size={28} strokeWidth={1.5} className="text-[var(--color-accent)]" />
 case '🕯️': return <Feather size={28} strokeWidth={1.5} className="text-[var(--color-accent)]" />
 default: return <Leaf size={28} strokeWidth={1.5} className="text-[var(--color-accent)]" />
 }
 }

 const { scrollY } = useScroll()
 const yLeaf1 = useTransform(scrollY, [0, 1000], [0, 200])
 const yLeaf2 = useTransform(scrollY, [0, 1000], [0, -150])

 const fadeUp = {
 hidden: { opacity: 0, y: 40 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
 }

 const stagger = {
 hidden: { opacity: 0 },
 visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
 }

 return (
 <div className="font-body bg-[var(--color-bg)] text-[var(--color-text)] min-h-screen relative overflow-hidden">
 
 {/* FLOATING ORGANIC SHAPES (Parallax) */}
 <motion.div style={{ y: yLeaf1 }} className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[var(--color-surface)] rounded-full mix-blend-multiply opacity-50 blur-3xl pointer-events-none"></motion.div>
 <motion.div style={{ y: yLeaf2 }} className="absolute top-[40%] -right-20 w-[400px] h-[400px] bg-[var(--color-surface-muted)] rounded-full mix-blend-multiply opacity-50 blur-3xl pointer-events-none"></motion.div>

 {/* HEADER */}
 <header className="relative z-50 pt-6 px-6 lg:px-12">
 <div className="max-w-[var(--container-default)] mx-auto bg-white/70 backdrop-blur-md rounded-[2rem] px-8 h-20 flex justify-between items-center shadow-sm border border-[var(--color-surface-muted)]/50">
 <h1 className="font-heading font-extrabold text-2xl text-[var(--color-text)] flex items-center gap-2">
 <Leaf className="text-[var(--color-accent)]" fill="currentColor"/> {businessData.name}
 </h1>
 <nav className="hidden lg:flex gap-10 text-sm font-bold text-[var(--color-text-secondary)]">
 <a href="#hakkimizda" className="hover:text-[var(--color-accent)] transition-colors">Hikayemiz</a>
 <a href="#urunler" className="hover:text-[var(--color-accent)] transition-colors">Bitkisel Çözümler</a>
 <a href="#danisma" className="hover:text-[var(--color-accent)] transition-colors">Ücretsiz Danışma</a>
 </nav>
 <div className="flex gap-4">
 <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] shadow-sm">
 <Search size={18}/>
 </button>
 <a href={`tel:${businessData.phoneClean}`} className="bg-[var(--color-text)] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[var(--color-accent)] transition-all flex items-center gap-2">
 <Phone size={16}/> İletişim
 </a>
 </div>
 </div>
 </header>

 <main className="relative z-10">
 
 {/* HERO - Asymmetric organic layout */}
 <section className="min-h-[90vh] flex items-center pt-10 pb-20 px-6 lg:px-12">
 <div className="max-w-[var(--container-default)] mx-auto w-full grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
 
 <motion.div initial="hidden" animate="visible" variants={stagger} className="lg:col-span-5 order-2 lg:order-1 pt-10 lg:pt-0">
 <motion.div variants={fadeUp} className="inline-flex flex-col mb-8">
 <span className="text-[var(--color-accent)] font-bold tracking-[0.2em] text-xs uppercase mb-2 ml-1">{businessData.slogan}</span>
 <h2 className="font-heading text-5xl lg:text-7xl font-extrabold text-[var(--color-text)] leading-[1.05] tracking-tight">
 Doğanın <br/>Şifalı Eli.
 </h2>
 </motion.div>
 <motion.p variants={fadeUp} className="text-[var(--color-text-secondary)] text-lg mb-10 leading-relaxed max-w-md">
 Sadece iyileştiren değil, sağlığı koruyan ve bedeni dengeleyen bitkisel takviyeler, aromaterapi kürleri ve fitofarmasi rehberliği.
 </motion.p>
 <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
 <a href="#urunler" className="bg-[var(--color-accent)] text-white px-8 py-4 rounded-full font-bold text-center hover:bg-[var(--color-accent-hover)] transition-all shadow-lg shadow-[var(--color-accent)]/20">
 Kürleri İncele
 </a>
 <a href="#danisma" className="bg-white text-[var(--color-text)] px-8 py-4 rounded-full font-bold text-center hover:text-[var(--color-accent)] transition-all border border-[var(--color-surface-muted)] flex items-center justify-center gap-2">
 <Sparkles size={18}/> {businessData?.ownerName as string} ile Görüş
 </a>
 </motion.div>
 </motion.div>

 <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" as any }} className="lg:col-span-7 order-1 lg:order-2 relative h-[50vh] lg:h-[80vh]">
 {/* Organic Shape Masks */}
 <div className="absolute inset-0 bg-[var(--color-surface)] rounded-br-[10rem] rounded-tl-[10rem] rounded-tr-[3rem] rounded-bl-[3rem] overflow-hidden ml-auto w-full lg:w-[90%] shadow-2xl">
 <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80" alt="Botanical Pharmacy" className="w-full h-full object-cover mix-blend-multiply opacity-90 hover:scale-105 transition-transform duration-1000" />
 </div>
 {/* Floating Info Badge */}
 <div className="absolute bottom-10 left-0 lg:-left-12 bg-white p-6 rounded-2xl shadow-xl max-w-[240px] border border-[var(--color-surface)]">
 <div className="flex gap-2 text-yellow-400 mb-2">
 {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor"/>)}
 </div>
 <p className="font-bold text-[var(--color-text)] mb-1">Fitofarmasi Uzmanı</p>
 <p className="text-sm text-[var(--color-text-secondary)]">Kişiye özel tamamen organik majistral kürler.</p>
 </div>
 </motion.div>

 </div>
 </section>

 {/* STORY / HAKKIMIZDA */}
 <section id="hakkimizda" className="py-24 px-6 lg:px-12 bg-white">
 <div className="max-w-[var(--container-default)] mx-auto grid md:grid-cols-2 gap-20 items-center">
 <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
 <div className="aspect-[4/5] bg-[var(--color-bg)] rounded-[3rem] overflow-hidden">
 <img src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80" alt="Herbalist" className="w-full h-full object-cover mix-blend-multiply"/>
 </div>
 {/* Decorative element */}
 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[var(--color-accent)] rounded-full mix-blend-multiply opacity-10 blur-xl"></div>
 </motion.div>
 
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-xl">
 <motion.p variants={fadeUp} className="text-[var(--color-accent)] font-bold tracking-widest text-xs uppercase mb-4">Uzman Eczacınız</motion.p>
 <motion.h3 variants={fadeUp} className="font-heading text-4xl lg:text-5xl font-extrabold text-[var(--color-text)] mb-8 tracking-tight">Doğanın matematiğini okuyoruz.</motion.h3>
 <motion.p variants={fadeUp} className="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-6">
 Sentetik moleküllerin ötesinde; doğanın binlerce yıllık hafızasını, modern eczacılık bilimiyle bir araya getiriyoruz.
 </motion.p>
 <motion.p variants={fadeUp} className="text-[var(--color-text-muted)] leading-relaxed mb-10">
 Sadece semptomları baskılayan değil, vücudun kendi iyileşme gücünü aktive eden bütünsel (holistik) bir sağlık anlayışına inanıyoruz. Aromaterapi, homeopati ve fitoterapi alanındaki tecrübemizle size en uygun çözümleri sunuyoruz.
 </motion.p>
 <motion.div variants={fadeUp}>
 <p className="font-heading font-extrabold text-2xl text-[var(--color-text)] mb-1">{businessData?.ownerName as string}</p>
 <p className="text-[var(--color-accent)] font-medium">Fitofarmasi Yüksek Lisans</p>
 </motion.div>
 </motion.div>
 </div>
 </section>

 {/* SERVICES / PRODUCTS - Staggered Cards */}
 <section id="urunler" className="py-32 px-6 lg:px-12 relative">
 <div className="max-w-[var(--container-default)] mx-auto">
 <div className="text-center max-w-2xl mx-auto mb-20">
 <p className="text-[var(--color-accent)] font-bold tracking-widest text-xs uppercase mb-4">Bitkisel Çözümlerimiz</p>
 <h3 className="font-heading text-4xl lg:text-5xl font-extrabold text-[var(--color-text)] mb-6 tracking-tight">Size Özel Kategoriler</h3>
 <p className="text-[var(--color-text-secondary)] text-lg">Hücresel yenilenmeden bağışıklık sistemine kadar tamamen organik ve GMP sertifikalı ürün grupları.</p>
 </div>

 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
 {businessData.services?.map((service: any, i: number) => (
 <motion.div 
 key={service.id} 
 initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} transition={{ delay: i * 0.15 }}
 className={`bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow duration-500 border border-[var(--color-surface-muted)]/50 ${i % 2 !== 0 ? 'lg:mt-16' : ''}`}
 >
 <div className="w-16 h-16 bg-[var(--color-bg)] rounded-2xl flex items-center justify-center mb-8 text-2xl">
 {getIcon(service.icon || '')}
 </div>
 <h4 className="font-heading font-extrabold text-xl text-[var(--color-text)] mb-4">{service.name}</h4>
 <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8">{service.description || 'Tamamen organik, analiz sertifikalı içerikler.'}</p>
 <a href="#danisma" className="inline-block mt-auto font-bold text-[var(--color-accent)] hover:text-[var(--color-text)] transition-colors border-b-2 border-transparent hover:border-[var(--color-text)] pb-1">Bilgi Al</a>
 </motion.div>
 ))}
 </div>
 </div>
 </section>

 {/* CONTACT & CONSULTATION - Organic Container */}
 <section id="danisma" className="pb-32 px-6 lg:px-12">
 <div className="max-w-[var(--container-default)] mx-auto bg-[var(--color-surface)] rounded-[3rem] lg:rounded-[5rem] overflow-hidden shadow-2xl relative">
 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
 <div className="absolute right-0 top-0 w-1/3 h-full bg-[var(--color-bg)] rounded-l-[5rem] hidden lg:block"></div>
 
 <div className="grid lg:grid-cols-2 relative z-10">
 <div className="p-10 lg:p-20">
 <h3 className="font-heading text-4xl font-extrabold text-[var(--color-text)] mb-6">Ücretsiz Danışma</h3>
 <p className="text-[var(--color-text-secondary)] text-lg mb-12 max-w-md">Kullandığınız ilaçlar, beslenme alışkanlıklarınız ve şikayetleriniz doğrultusunda en doğru takviyeyi bulmak için eczacımızla görüşün.</p>
 
 <div className="space-y-8 font-medium text-[var(--color-text-secondary)]">
 <div className="flex items-start gap-4">
 <MapPin className="text-[var(--color-accent)] shrink-0"/>
 <div>
 <p className="text-[var(--color-text)] font-bold mb-1">Adres</p>
 <p>{businessData.address}</p>
 </div>
 </div>
 <div className="flex items-center gap-4">
 <Phone className="text-[var(--color-accent)] shrink-0"/>
 <div>
 <p className="text-[var(--color-text)] font-bold mb-1">WhatsApp Danışma Hattı</p>
 <p>{businessData.whatsapp}</p>
 </div>
 </div>
 </div>
 </div>

 <div className="p-10 lg:p-20 bg-[var(--color-bg)] lg:bg-transparent flex flex-col justify-center">
 <form className="space-y-6" onSubmit={e=>e.preventDefault()}>
 <div>
 <label className="block text-sm font-bold text-[var(--color-text)] mb-2 ml-4">Adınız Soyadınız</label>
 <input type="text" className="w-full bg-white px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all shadow-sm" placeholder="Örn: Ayşe Yılmaz" />
 </div>
 <div>
 <label className="block text-sm font-bold text-[var(--color-text)] mb-2 ml-4">Telefon Numaranız</label>
 <input type="tel" className="w-full bg-white px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all shadow-sm" placeholder="05__ ___ __ __" />
 </div>
 <div>
 <label className="block text-sm font-bold text-[var(--color-text)] mb-2 ml-4">Danışmak İstediğiniz Konu</label>
 <select className="w-full bg-white px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all shadow-sm appearance-none cursor-pointer">
 <option>Bağışıklık Güçlendirme</option>
 <option>Cilt Hastalıkları & Akne</option>
 <option>Uyku Düzeni & Stres</option>
 <option>Diğer</option>
 </select>
 </div>
 <button className="w-full bg-[var(--color-text)] text-white px-8 py-5 rounded-full font-bold hover:bg-[var(--color-accent)] transition-all mt-4 shadow-xl">
 Danışma Talebi Oluştur
 </button>
 </form>
 </div>
 </div>
 </div>
 </section>

 </main>

 {/* FOOTER */}
 <footer className="bg-white px-6 py-12 lg:py-16 text-center lg:text-left border-t border-[var(--color-surface-muted)]">
 <div className="max-w-[var(--container-default)] mx-auto grid lg:grid-cols-4 gap-12 font-medium">
 <div className="lg:col-span-2">
 <h3 className="font-heading font-extrabold text-2xl text-[var(--color-accent)] mb-4 flex items-center justify-center lg:justify-start gap-2">
 <Leaf fill="currentColor"/> {businessData.name}
 </h3>
 <p className="text-[var(--color-text-secondary)] max-w-sm mx-auto lg:mx-0">{businessData.slogan}</p>
 </div>
 <div>
 <h4 className="font-bold text-[var(--color-text)] mb-4">Navigasyon</h4>
 <ul className="space-y-3 text-[var(--color-text-secondary)]">
 <li><a href="#hakkimizda" className="hover:text-[var(--color-accent)] transition-colors">Hikayemiz</a></li>
 <li><a href="#urunler" className="hover:text-[var(--color-accent)] transition-colors">Bitkisel Ürünler</a></li>
 <li><a href="#danisma" className="hover:text-[var(--color-accent)] transition-colors">İletişim</a></li>
 </ul>
 </div>
 <div>
 <h4 className="font-bold text-[var(--color-text)] mb-4">Yasal</h4>
 <ul className="space-y-3 text-[var(--color-text-secondary)]">
 <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Gizlilik Politikası</a></li>
 <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Mesafeli Satış</a></li>
 <li className="text-[var(--color-text-muted)] text-sm pt-4">© {new Date().getFullYear()} kepenk.ai</li>
 </ul>
 </div>
 </div>
 </footer>
 </div>
 )
}
