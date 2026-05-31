'use client'
// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Phone, MapPin, Clock, ArrowRight, Accessibility, Layers, HeartHandshake, Box } from 'lucide-react'
import { motion } from 'framer-motion'
import { slideLeft, slideRight } from '../../lib/animation-presets'
const fadeLeft = slideLeft
const fadeRight = slideRight

export function AsansorEngelliHEADERAsymmetricclean({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="sticky top-0 z-50 /80 backdrop-blur-xl border-b border-[var(--color-border)]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1440px] mx-auto px-6 h-24 flex items-center justify-between">
 <div className="flex items-center gap-4">
 <div className="">
 <Accessibility className="w-8 h-8" />
 </div>
 <div className="font-heading font-black text-2xl uppercase tracking-wider">{businessData.name}</div>
 </div>
 <nav className="hidden md:flex gap-12 text-sm font-semibold tracking-widest uppercase items-center">
 <a href="#hizmetler" className="hover:opacity-90 transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-0.5 after: hover:after:w-full after:transition-all">Çözümlerimiz</a>
 <a href="#hakkimizda" className="hover:opacity-90 transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-0.5 after: hover:after:w-full after:transition-all">Değerlerimiz</a>
 <a href="#iletisim" className="text-white px-8 py-3.5 rounded-none hover:bg-black hover:text-white transition-colors">Bize Ulaşın</a>
 </nav>
 </div>
 </header>
 )
}

export function AsansorEngelliHEROAsymmetricallayoutlargetypography({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="min-h-[85vh] px-6 py-20 relative overflow-hidden flex items-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="absolute top-0 right-0 w-1/2 h-full -z-10 hidden lg:block"></div>
 <div className="max-w-[1440px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft} className="lg:col-span-5 pr-10">
 <h1 className="font-heading text-6xl lg:text-8xl font-black leading-[0.9] mb-8 lowercase">
 hayata<br/>
 <span className="">erişim.</span>
 </h1>
 <p className="text-xl mb-12 leading-relaxed">
 Fiziksel engelleri ortadan kaldıran, herkes için eşit ve bağımsız hareket imkanı sunan platform ve asansör sistemleri.
 </p>
 <div className="flex items-center gap-6">
 <a href="#hizmetler" className="border-b-2 border-[var(--color-accent)] pb-2 font-bold uppercase tracking-widest hover:opacity-90 transition-colors flex items-center gap-2">
 Sistemleri Gör <ArrowRight className="w-5 h-5" />
 </a>
 </div>
 </motion.div>
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeRight} className="lg:col-span-7 relative">
 <div className="w-full h-full relative group">
 <div className="absolute inset-0 scale-95 translate-x-12 translate-y-12 transition-transform group-hover:translate-x-6 group-hover:translate-y-6"></div>
 <img src="https://images.unsplash.com/photo-1541888004659-40da8209ad73?auto=format&fit=crop&q=80" alt="Engelli Asansörü" className="relative z-10 w-full object-cover aspect-[4/3] grayscale group-hover:grayscale-0 transition-all duration-700" />
 </div>
 </motion.div>
 </div>
 </section>
 )
}

export function AsansorEngelliSTATSDarkbackgroundsections({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="bg-black text-white py-24 px-6" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
 {[
 { label: 'Yıllık Deneyim', value: businessData.experience || '20' },
 { label: 'Kamu Kurumu', value: '150+' },
 { label: 'Aktif Sistem', value: '4.500+' },
 { label: 'Müşteri Puanı', value: `${businessData.rating || 5.0}` }
 ].map((stat, i) => (
 <div key={i} className="border-l border-white/20 pl-8">
 <div className="font-heading text-5xl font-bold mb-2 ">{stat.value}</div>
 <div className="text-sm tracking-widest uppercase opacity-70">{stat.label}</div>
 </div>
 ))}
 </div>
 </section>
 )
}

export function AsansorEngelliHIZMETLERHorizontalScrollCards({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="hizmetler" className="py-32 overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1440px] mx-auto px-6 mb-20">
 <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft} className="font-heading text-5xl lg:text-7xl font-black lowercase tracking-tighter mb-6">
 kapsayıcı<br/>çözümler.
 </motion.h2>
 <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft} className="text-xl max-w-xl ">Merdiven ve kot farklılıklarını güvenle aşıyoruz.</motion.p>
 </div>
 
 <div className="max-w-[1440px] mx-auto px-6 overflow-x-auto pb-16 snap-x snap-mandatory hide-scrollbar">
 <div className="flex gap-8 w-max">
 {businessData.services?.map((service: any, idx: number) => (
 <motion.div key={service.id || idx} initial="hidden" animate="visible" variants={fadeRight} className="w-[400px] sm:w-[500px] h-[500px] p-12 snap-center flex flex-col justify-between border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors group">
 <div>
 <div className="w-16 h-16 /10 flex items-center justify-center mb-8">
 {idx % 2 === 0 ? <Layers className="w-8 h-8" /> : <Box className="w-8 h-8" />}
 </div>
 <h3 className="font-heading font-bold text-3xl mb-4 leading-tight">{service.name}</h3>
 <p className="text-lg leading-relaxed">{service.description || 'Yüksek güvenlik sensörleri ve kullanım kolaylığı ile tüm engelleri ortadan kaldıran yenilikçi çözümlerimiz.'}</p>
 </div>
 <div className="w-12 h-12 rounded-full border border-[var(--color-border)] flex items-center justify-center group-hover:opacity-90 group-hover:text-white transition-colors group-hover:border-transparent">
 <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" />
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 )
}

export function AsansorEngelliHAKKIMIZDACleanboldtypography({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="hakkimizda" className="py-32 px-6" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-24 items-center">
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}>
 <h2 className="font-heading text-5xl lg:text-7xl font-black lowercase tracking-tighter mb-12">
 tamamen<br/>erişilebilir.
 </h2>
 <div className="space-y-8 text-xl font-light leading-relaxed">
 <p>Toplumun her kesiminin mekanlara özgürce ve bağımsız erişim hakkı olduğuna inanıyoruz.</p>
 <p>{businessData.name}, güvenliğin ve kullanım kolaylığının ön planda olduğu, avrupa standartlarındaki platform ve merdiven asansörleriyle hayatı kolaylaştırıyor.</p>
 </div>
 </motion.div>
 
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeRight} className="grid grid-cols-2 gap-4">
 <div className="space-y-4 pt-12">
 <img src="https://images.unsplash.com/photo-1541888004659-40da8209ad73?auto=format&fit=crop&q=80" alt="Erişilebilirlik" className="w-full aspect-[4/5] object-cover grayscale" />
 <img src="https://images.unsplash.com/photo-1541888004659-40da8209ad73?auto=format&fit=crop&q=80" alt="Tasarım" className="w-full aspect-square object-cover grayscale" />
 </div>
 <div className="space-y-4">
 <img src="https://images.unsplash.com/photo-1541888004659-40da8209ad73?auto=format&fit=crop&q=80" alt="Güvenlik" className="w-full aspect-square object-cover grayscale" />
 <img src="https://images.unsplash.com/photo-1541888004659-40da8209ad73?auto=format&fit=crop&q=80" alt="Teknoloji" className="w-full aspect-[4/5] object-cover grayscale" />
 </div>
 </motion.div>
 </div>
 </section>
 )
}

export function AsansorEngelliILETISIM({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="iletisim" className="py-32 px-6 bg-black text-white" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1440px] mx-auto">
 <div className="grid lg:grid-cols-2 gap-24">
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}>
 <HeartHandshake className="w-20 h-20 mb-12" />
 <h2 className="font-heading text-6xl font-black lowercase tracking-tighter mb-8">yanınızdayız.</h2>
 <a href={`tel:${businessData.phoneClean}`} className="block text-4xl lg:text-5xl font-light hover:opacity-90 transition-colors mb-16">
 {businessData.phone}
 </a>
 
 <div className="space-y-8 font-light text-xl opacity-80">
 <div className="flex gap-6">
 <MapPin className="w-8 h-8 flex-shrink-0 mt-1" />
 <div>
 {businessData.address}<br/>
 {businessData.district}, {businessData.city}
 </div>
 </div>
 <div className="flex gap-6">
 <Clock className="w-8 h-8 flex-shrink-0 mt-1" />
 <div>
 {businessData.workingHours?.slice(0, 3).map((d, i) => (
 <div key={i} className="mb-1">{d.dayTr}: {d.open ? `${d.open} - ${d.close}` : 'Kapalı'}</div>
 ))}
 </div>
 </div>
 </div>
 </motion.div>
 
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeRight} className="bg-white/10 p-12 border border-white/20">
 <h3 className="text-3xl font-bold mb-8">Ücretsiz Keşif Talebi</h3>
 <form className="space-y-6">
 <div>
 <label className="block text-sm uppercase tracking-widest mb-3 opacity-70">Adınız</label>
 <input type="text" className="w-full bg-transparent border-b border-white/30 px-0 py-4 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors" placeholder="Ad Soyad" />
 </div>
 <div>
 <label className="block text-sm uppercase tracking-widest mb-3 opacity-70">Telefon</label>
 <input type="tel" className="w-full bg-transparent border-b border-white/30 px-0 py-4 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors" placeholder="05XX XXX XX XX" />
 </div>
 <div>
 <label className="block text-sm uppercase tracking-widest mb-3 opacity-70">Mesajınız</label>
 <textarea rows={4} className="w-full bg-transparent border-b border-white/30 px-0 py-4 text-white focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none" placeholder="Proje detayları..."></textarea>
 </div>
 <button type="button" className="w-full text-white py-5 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors mt-8">Gönder</button>
 </form>
 </motion.div>
 </div>
 </div>
 </section>
 )
}

export function AsansorEngelliFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="bg-black py-12 px-6 border-t border-white/10 text-white/50 text-sm font-light uppercase tracking-widest" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
 <div>© {new Date().getFullYear()} {businessData.name}</div>
 <div className="font-bold text-white text-xl lowercase">{businessData.name}</div>
 <div>Bizi Takip Edin: IG</div>
 </div>
 </footer>
 )
}

registerSection('hero', 'asansorengelli_hero_0', AsansorEngelliHEADERAsymmetricclean)
registerSection('hero', 'asansorengelli_hero_1', AsansorEngelliHEROAsymmetricallayoutlargetypography)
registerSection('stats', 'asansorengelli_stats_2', AsansorEngelliSTATSDarkbackgroundsections)
registerSection('services', 'asansorengelli_services_3', AsansorEngelliHIZMETLERHorizontalScrollCards)
registerSection('services', 'asansorengelli_services_4', AsansorEngelliHAKKIMIZDACleanboldtypography)
registerSection('services', 'asansorengelli_services_5', AsansorEngelliILETISIM)
registerSection('footer', 'asansorengelli_footer_6', AsansorEngelliFOOTER)
