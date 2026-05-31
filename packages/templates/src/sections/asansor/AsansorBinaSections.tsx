'use client'
// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Phone, MapPin, Clock, Star, Shield, ArrowRight, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/animation-presets'

export function AsansorBinaHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="sticky top-0 z-50 border-b-2 border-[var(--color-accent)] /90 backdrop-blur-md" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1024px] mx-auto px-6 h-20 flex items-center justify-between">
 <div className="font-heading font-bold text-2xl ">
 <span className="">Bina</span> {businessData.name}
 </div>
 <nav className="hidden md:flex gap-8">
 <a href="#hizmetler" className="hover:opacity-90 transition-colors">Hizmetler</a>
 <a href="#hakkimizda" className="hover:opacity-90 transition-colors">Hakkımızda</a>
 <a href="#iletisim" className="hover:opacity-90 transition-colors">İletişim</a>
 </nav>
 <a href="#iletisim" className="border border-[var(--color-border)] px-6 py-2.5 rounded-[var(--radius-btn)] font-semibold transition-colors hover:border-[var(--color-accent)]">
 Bize Ulaşın
 </a>
 </div>
 </header>
 )
}

export function AsansorBinaHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="pt-24 pb-16 px-6" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1024px] mx-auto grid md:grid-cols-2 gap-12 items-center">
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-6">
 <div className="inline-block px-3 py-1 /10 font-semibold rounded-full text-sm border border-[var(--color-accent)]/20">
 #1 Asansör Çözümleri
 </div>
 <h1 className="font-heading text-5xl md:text-6xl font-black leading-tight">
 {businessData.slogan || "Güvenli ve Kesintisiz Asansör Çözümleri"}
 </h1>
 <p className="text-lg leading-relaxed border-l-2 border-[var(--color-accent)] pl-4">
 Modern binalar için yüksek güvenlikli, sessiz ve konforlu asansör sistemleri tasarlıyor ve uyguluyoruz.
 </p>
 <div className="flex gap-4 pt-4">
 <a href="#iletisim" className="px-8 py-3.5 rounded-[var(--radius-btn)] font-bold flex items-center gap-2">
 Hemen Teklif Al <ArrowRight className="w-5 h-5" />
 </a>
 </div>
 </motion.div>
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="hidden md:flex justify-end">
 <div className="w-full aspect-square rounded-[var(--radius-lg)] border-2 border-[var(--color-border)] flex items-center justify-center overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
 <img src="https://images.unsplash.com/photo-1541888004659-40da8209ad73?auto=format&fit=crop&q=80" alt="Asansör" className="absolute inset-0 w-full h-full object-cover" />
 </div>
 </motion.div>
 </div>
 </section>
 )
}

export function AsansorBinaSTATS({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-16 px-6 border-y-2 border-[var(--color-border)]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1024px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
 {[
 { label: 'Yıllık Deneyim', value: businessData.experience || '15+' },
 { label: 'Mutlu Müşteri', value: `${businessData.customerCount || '500'}+` },
 { label: 'Değerlendirme', value: `${businessData.rating || 4.9}/5` },
 { label: 'Teknik Destek', value: '7/24' }
 ].map((stat, i) => (
 <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center p-6 border border-[var(--color-border)] rounded-[var(--radius-card)] ">
 <div className="font-heading text-4xl font-black mb-2">{stat.value}</div>
 <div className="font-medium text-sm tracking-wider uppercase">{stat.label}</div>
 </motion.div>
 ))}
 </div>
 </section>
 )
}

export function AsansorBinaHIZMETLER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="hizmetler" className="py-24 px-6" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1024px] mx-auto">
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12 border-l-4 border-[var(--color-accent)] pl-6">
 <h2 className="font-heading text-3xl font-black mb-2 uppercase tracking-tight">Hizmetlerimiz</h2>
 <p className="">Sektördeki en kaliteli asansör sistemleri</p>
 </motion.div>
 
 <div className="flex flex-col gap-4">
 {businessData.services?.map((service: any, idx: number) => (
 <motion.div key={service.id || idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-6 md:p-8 rounded-[var(--radius-card)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors flex flex-col md:flex-row md:items-center gap-6">
 <div className="w-16 h-16 rounded-[var(--radius-md)] border border-[var(--color-border)] flex items-center justify-center flex-shrink-0">
 <CheckCircle2 className="w-8 h-8" />
 </div>
 <div className="flex-1">
 <h3 className="font-heading font-bold text-xl mb-2">{service.name}</h3>
 <p className="leading-relaxed">{service.description || 'Detaylı bilgi için bizimle iletişime geçin. Profesyonel ekibimiz size en uygun çözümü sunacaktır.'}</p>
 </div>
 <a href="#iletisim" className="font-bold flex items-center gap-1 hover:underline">
 İncele <ArrowRight className="w-4 h-4" />
 </a>
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 )
}

export function AsansorBinaHAKKIMIZDA({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="hakkimizda" className="py-24 px-6 border-y border-[var(--color-border)]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1024px] mx-auto grid md:grid-cols-2 gap-16 items-center">
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
 <img src="https://images.unsplash.com/photo-1541888004659-40da8209ad73?auto=format&fit=crop&q=80" alt="Hakkımızda" className="rounded-[var(--radius-lg)] w-full aspect-[4/5] object-cover border-4 border-[var(--color-bg)] shadow-xl" />
 </motion.div>
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-6">
 <h2 className="font-heading text-4xl font-black uppercase tracking-tight">Biz Kimiz?</h2>
 <div className="w-16 h-1 "></div>
 <p className="leading-relaxed font-medium">
 {businessData.name}, {businessData.city} bölgesinde faaliyet gösteren lider bir asansör firmasıdır. Kurucumuz {businessData?.ownerName as string} önderliğinde yıllardır sektöre değer katmaya devam ediyoruz.
 </p>
 <p className="leading-relaxed">
 Teknolojik gelişmeleri yakından takip ederek, güvenli ve estetik taşıma sistemleri inşa ediyoruz. Amacımız sadece katları değil, hayatları da güvenle birleştirmektir.
 </p>
 <ul className="space-y-4 pt-6">
 {['Güvenlik Odaklı Yaklaşım', '10 Yıl Parça Garantisi', '7/24 Acil Müdahale Ekibi'].map((item, i) => (
 <li key={i} className="flex items-center gap-3 font-medium p-3 rounded-[var(--radius-sm)] border border-[var(--color-border)]">
 <Shield className="w-5 h-5 " /> {item}
 </li>
 ))}
 </ul>
 </motion.div>
 </div>
 </section>
 )
}

export function AsansorBinaILETISIM({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="iletisim" className="py-24 px-6" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1024px] mx-auto flex flex-col items-center">
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16 max-w-2xl">
 <h2 className="font-heading text-4xl font-black mb-4 uppercase tracking-tight">İletişim</h2>
 <p className="text-lg">Hemen şimdi bize ulaşın ve asansör sistemleriniz için en iyi fiyatı alın.</p>
 </motion.div>

 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
 <motion.a href={`tel:${businessData.phoneClean}`} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col text-center p-8 rounded-[var(--radius-card)] transform hover:-translate-y-2 transition-transform shadow-lg">
 <Phone className="w-10 h-10 mx-auto mb-4 opacity-80" />
 <h3 className="font-bold mb-2 text-xl">Telefon</h3>
 <p className="font-heading text-2xl font-black">{businessData.phone}</p>
 </motion.a>

 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col items-center text-center p-8 rounded-[var(--radius-card)] border border-[var(--color-border)]">
 <MapPin className="w-8 h-8 mb-4 " />
 <h3 className="font-bold mb-2">Adres</h3>
 <p className="">{businessData.address}, {businessData.district}/{businessData.city}</p>
 </motion.div>

 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col items-center text-center p-8 rounded-[var(--radius-card)] border border-[var(--color-border)] lg:col-span-1 md:col-span-2">
 <Clock className="w-8 h-8 mb-4 " />
 <h3 className="font-bold mb-4">Çalışma Saatleri</h3>
 <div className="w-full text-sm space-y-2">
 {businessData.workingHours?.slice(0, 3).map((day, i) => (
 <div key={i} className="flex justify-between border-b border-[var(--color-border)] pb-2 border-dashed">
 <span className="font-medium ">{day.dayTr}</span>
 <span>{day.open ? `${day.open} - ${day.close}` : 'Kapalı'}</span>
 </div>
 ))}
 </div>
 </motion.div>
 </div>
 </div>
 </section>
 )
}

export function AsansorBinaFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 px-6 border-t-4 border-[var(--color-accent)]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1024px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
 <div>
 <div className="font-heading font-black text-2xl mb-2">{businessData.name}</div>
 <div className="text-sm">
 © {new Date().getFullYear()} {businessData.name}. Tüm hakları saklıdır.
 </div>
 </div>
 <div className="flex gap-4">
 <a href="#" className="w-12 h-12 rounded-[var(--radius-btn)] flex items-center justify-center border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:opacity-90 transition-all">
 <Star className="w-5 h-5" />
 </a>
 </div>
 </div>
 </footer>
 )
}

registerSection('hero', 'asansorbina_hero_0', AsansorBinaHEADER)
registerSection('hero', 'asansorbina_hero_1', AsansorBinaHERO)
registerSection('stats', 'asansorbina_stats_2', AsansorBinaSTATS)
registerSection('services', 'asansorbina_services_3', AsansorBinaHIZMETLER)
registerSection('services', 'asansorbina_services_4', AsansorBinaHAKKIMIZDA)
registerSection('services', 'asansorbina_services_5', AsansorBinaILETISIM)
registerSection('footer', 'asansorbina_footer_6', AsansorBinaFOOTER)
