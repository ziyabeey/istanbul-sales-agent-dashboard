'use client'
// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Phone, MapPin, Clock, Star, ArrowRight, Eye, Maximize } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../../lib/animation-presets'
const stagger = staggerContainer

export function AsansorPanoramikHEADERFulltransparentoverhero({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="absolute top-0 w-full z-50 py-6" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between">
 <div className="font-heading font-bold text-3xl tracking-tight text-white drop-shadow-md">
 {businessData.name} <span className="">.</span>
 </div>
 <nav className="hidden md:flex gap-12 font-medium text-white/90 drop-shadow-md">
 <a href="#hizmetler" className="hover:text-white transition-colors">Hizmetler</a>
 <a href="#hakkimizda" className="hover:text-white transition-colors">Hakkımızda</a>
 <a href="#iletisim" className="hover:text-white transition-colors">İletişim</a>
 </nav>
 <a href="#iletisim" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-full font-semibold transition-all hover:bg-white hover:text-black">
 Bize Ulaşın
 </a>
 </div>
 </header>
 )
}

export function AsansorPanoramikHEROFullWidthOverlayGradient({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="relative min-h-[95vh] flex items-center justify-center text-center overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="absolute inset-0 bg-black">
 <img src="https://images.unsplash.com/photo-1621503794357-19d2fe3c1cb5?auto=format&fit=crop&q=80" alt="Panoramik Asansör" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
 <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)]/20 via-transparent to-transparent"></div>
 </div>
 
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative z-10 max-w-4xl px-6 pt-20">
 <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md text-white border border-white/20 font-medium rounded-full mb-8 tracking-widest text-sm uppercase">
 ESTETİK VE MİMARİ MÜKEMMELLİK
 </motion.div>
 <motion.h1 variants={fadeUp} className="font-heading text-6xl md:text-8xl font-medium text-white mb-8 tracking-tighter">
 {businessData.slogan || "Manzarayı İçeri Alın"}
 </motion.h1>
 <motion.p variants={fadeUp} className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 font-light">
 Alışveriş merkezleri, oteller ve lüks konutlar için dışarıyı izleyebileceğiniz cam kabinli panoramik asansör sistemleri.
 </motion.p>
 <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
 <a href="#iletisim" className="px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-3">
 Katalog İste <ArrowRight className="w-6 h-6" />
 </a>
 </motion.div>
 </motion.div>
 </section>
 )
}

export function AsansorPanoramikSTATSAnimatedrow({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 relative overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
 <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center relative z-10">
 {[
 { label: 'Yıl Kusursuz Tecrübe', value: businessData.experience || '25' },
 { label: 'Özel Tasarım Proje', value: businessData.customerCount || '800+' },
 { label: 'Kullanıcı Derecesi', value: businessData.rating ? `${businessData.rating}` : '5.0' },
 { label: 'Tasarım Ödülü', value: '12' }
 ].map((stat, i) => (
 <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="space-y-4">
 <div className="font-heading text-6xl lg:text-7xl font-light ">{stat.value}</div>
 <div className="text-lg font-medium opacity-80 max-w-[200px] mx-auto leading-tight">{stat.label}</div>
 </motion.div>
 ))}
 </div>
 </section>
 )
}

export function AsansorPanoramikHIZMETLERMasonrystylefeelwithfullwidthcontainer({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="hizmetler" className="py-32 px-6 lg:px-12 bg-gradient-to-b from-[var(--color-bg)] to-[var(--color-surface)]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1440px] mx-auto">
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-24">
 <h2 className="font-heading text-5xl lg:text-7xl font-medium mb-6 tracking-tight">Estetik Mimari Serisi</h2>
 <p className="text-xl max-w-2xl mx-auto">Her binanın ruhuna uygun, modern ve şık panoramik tasarımlar üretmekteyiz.</p>
 </motion.div>
 
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
 {businessData.services?.map((service: any, idx: number) => (
 <motion.div key={service.id || idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`group rounded-[2rem] overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${idx === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
 <div className={`w-full overflow-hidden ${idx === 0 ? 'h-[400px]' : 'h-[250px]'}`}>
 <img src="https://images.unsplash.com/photo-1541888004659-40da8209ad73?auto=format&fit=crop&q=80" alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
 </div>
 <div className="p-10">
 <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 ">
 <Maximize className="w-6 h-6" />
 </div>
 <h3 className="font-heading font-medium text-3xl mb-4">{service.name}</h3>
 <p className="text-lg leading-relaxed">{service.description || 'Tamamen şeffaf cam konstrüksiyon, kusursuz mekanik uyum ve eşsiz bir seyir keyfi sağlayan premium modeller.'}</p>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 )
}

export function AsansorPanoramikHAKKIMIZDA({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="hakkimizda" className="py-32 px-6 lg:px-12 relative overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-24 relative z-10">
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="w-full lg:w-5/12">
 <h2 className="font-heading text-5xl md:text-6xl font-medium leading-tight mb-8">Sınırları <br/>Kaldırın</h2>
 <p className="text-xl leading-relaxed mb-8">
 {businessData.name}, {businessData.city} merkezli inovatif bir mimari asansör stüdyosudur. Standartları aşan panoramik tasarımlarımızla mekanlarınıza değer katıyoruz.
 </p>
 <div className="flex items-center gap-6 mt-12 pt-12 border-t border-[var(--color-border)]">
 <div className="w-20 h-20 rounded-full flex items-center justify-center ">
 <Eye className="w-10 h-10" />
 </div>
 <div>
 <div className="font-bold text-xl mb-1">Panoramik Görüş</div>
 <div className="">360 derece seyir keyfi veren ultra şeffaf camlar.</div>
 </div>
 </div>
 </motion.div>
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="w-full lg:w-7/12 relative">
 <div className="aspect-[4/3] rounded-[3rem] overflow-hidden">
 <img src="https://images.unsplash.com/photo-1541888004659-40da8209ad73?auto=format&fit=crop&q=80" alt="Hakkımızda" className="w-full h-full object-cover" />
 </div>
 <div className="absolute -bottom-10 -left-10 p-10 rounded-[2rem] border border-[var(--color-border)] shadow-xl max-w-xs">
 <div className="font-heading text-5xl mb-2">10+</div>
 <div className="font-bold text-lg">Ülkeye İhracat Ağı</div>
 </div>
 </motion.div>
 </div>
 </section>
 )
}

export function AsansorPanoramikILETISIM({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="iletisim" className="py-32 px-6 lg:px-12 " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1440px] mx-auto text-center">
 <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="font-heading text-5xl md:text-7xl font-light mb-12">
 Projenizi Vizyona Dönüştürelim.
 </motion.h2>
 
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 mb-20">
 <a href={`tel:${businessData.phoneClean}`} className="text-3xl md:text-5xl font-medium hover:opacity-90 transition-colors">
 {businessData.phone}
 </a>
 <span className="hidden md:block w-3 h-3 rounded-full"></span>
 <span className="text-xl opacity-80">{businessData.address}, {businessData.city}</span>
 </motion.div>
 
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto border-t border-[var(--color-bg)]/20 pt-20">
 <motion.div variants={fadeUp}>
 <h3 className="text-2xl font-medium mb-6 flex items-center gap-3">
 <MapPin className="w-6 h-6 " /> Lokasyon
 </h3>
 <p className="opacity-70 text-lg leading-relaxed">{businessData.address}<br/>{businessData.district}, {businessData.city}</p>
 </motion.div>
 
 <motion.div variants={fadeUp}>
 <h3 className="text-2xl font-medium mb-6 flex items-center gap-3">
 <Clock className="w-6 h-6 " /> Saatler
 </h3>
 <ul className="opacity-70 text-lg space-y-2">
 {businessData.workingHours?.slice(0, 3).map((day, i) => (
 <li key={i} className="flex gap-4">
 <span className="w-24">{day.dayTr}</span>
 <span>{day.open ? `${day.open} - ${day.close}` : 'Kapalı'}</span>
 </li>
 ))}
 </ul>
 </motion.div>
 
 <motion.div variants={fadeUp}>
 <h3 className="text-2xl font-medium mb-6 flex items-center gap-3">
 <Star className="w-6 h-6 " /> Sosyal
 </h3>
 <a href={businessData.socialMedia?.instagram || '#'} className="opacity-70 hover:opacity-100 text-lg transition-opacity hover:">Instagram</a>
 </motion.div>
 </motion.div>
 </div>
 </section>
 )
}

export function AsansorPanoramikFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="bg-black text-white py-8 px-6 lg:px-12 text-center text-sm opacity-50 font-light hover:opacity-100 transition-opacity" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 © {new Date().getFullYear()} {businessData.name}. Kepenk.ai ile oluşturulmuştur.
 </footer>
 )
}

registerSection('hero', 'asansorpanoramik_hero_0', AsansorPanoramikHEADERFulltransparentoverhero)
registerSection('hero', 'asansorpanoramik_hero_1', AsansorPanoramikHEROFullWidthOverlayGradient)
registerSection('stats', 'asansorpanoramik_stats_2', AsansorPanoramikSTATSAnimatedrow)
registerSection('services', 'asansorpanoramik_services_3', AsansorPanoramikHIZMETLERMasonrystylefeelwithfullwidthcontainer)
registerSection('services', 'asansorpanoramik_services_4', AsansorPanoramikHAKKIMIZDA)
registerSection('services', 'asansorpanoramik_services_5', AsansorPanoramikILETISIM)
registerSection('footer', 'asansorpanoramik_footer_6', AsansorPanoramikFOOTER)
