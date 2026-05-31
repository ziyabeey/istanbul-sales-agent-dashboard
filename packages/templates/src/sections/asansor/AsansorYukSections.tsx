'use client'
// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Phone, MapPin, Clock, Star, Shield, ArrowUpRight, Activity, Wrench } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/animation-presets'

export function AsansorYukHEADERStarterconfigslightlymoremodernshadow({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="sticky top-0 z-50 shadow-md shadow-black/5" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1280px] mx-auto px-8 h-24 flex items-center justify-between">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-lg flex items-center justify-center ">
 <ArrowUpRight className="w-6 h-6" />
 </div>
 <div className="font-heading font-black text-2xl tracking-tighter">{businessData.name}</div>
 </div>
 <nav className="hidden lg:flex gap-10 font-medium">
 <a href="#hizmetler" className="hover:opacity-90 transition-colors">Hizmetlerimiz</a>
 <a href="#hakkimizda" className="hover:opacity-90 transition-colors">Firmamız</a>
 <a href="#iletisim" className="hover:opacity-90 transition-colors">İletişim</a>
 </nav>
 <a href="#iletisim" className="px-7 py-3 rounded-[var(--radius-btn)] font-semibold transition-all hover:opacity-90 hover:opacity-90 shadow-sm">
 Hızlı Teklif
 </a>
 </div>
 </header>
 )
}

export function AsansorYukHEROSplitPanel({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="px-6 py-12" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1280px] mx-auto">
 <div className="rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-xl shadow-[var(--color-accent)]/5 border border-[var(--color-border)]">
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
 <span className="font-bold tracking-wider uppercase mb-4 text-sm">GÜVENLİ & GÜÇLÜ YÜK ASANSÖRLERİ</span>
 <h1 className="font-heading text-5xl lg:text-7xl font-bold leading-[1.1] mb-6">
 {businessData.slogan || "Yükünüzü Zirveye Taşıyoruz"}
 </h1>
 <p className="text-lg mb-10 max-w-md">
 Ağır sanayi ve ticari yapılar için yüksek kapasiteli, dayanıklı ve yönetmeliklere tam uyumlu asansör sistemleri.
 </p>
 <div className="flex flex-wrap gap-4">
 <a href="#iletisim" className="px-8 py-4 rounded-[var(--radius-btn)] font-bold shadow-lg shadow-[var(--color-accent)]/30 hover:shadow-xl hover:-translate-y-1 transition-all">
 Projeyi Keşfet
 </a>
 <a href="#hizmetler" className="px-8 py-4 rounded-[var(--radius-btn)] font-bold hover:opacity-90 transition-colors">
 Hizmetler
 </a>
 </div>
 </motion.div>
 <div className="w-full md:w-1/2 min-h-[400px] relative">
 <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" alt="Endüstriyel Asansör" className="absolute inset-0 w-full h-full object-cover" />
 <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-surface)] to-transparent w-32"></div>
 </div>
 </div>
 </div>
 </section>
 )
}

export function AsansorYukSTATSIncludedinheroorbelow({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="pb-16 px-6" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
 {[
 { label: 'Sektör Tecrübesi', value: businessData.experience || '20 Yıl' },
 { label: 'Tamamlanan', value: '1.240+ Proje' },
 { label: 'Taşıma Kapasitesi', value: '10 Ton+' },
 { label: 'Servis Ağı', value: 'Tüm Türkiye' }
 ].map((stat, i) => (
 <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-8 rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors group">
 <div className="font-heading text-3xl font-bold mb-1 group-hover:opacity-90 transition-colors">{stat.value}</div>
 <div className="font-medium text-sm">{stat.label}</div>
 </motion.div>
 ))}
 </div>
 </section>
 )
}

export function AsansorYukHIZMETLERligrid({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="hizmetler" className="py-24 px-6 " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1280px] mx-auto">
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16 max-w-2xl mx-auto">
 <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-6">Ne Yapıyoruz?</h2>
 <p className="text-lg">Ağır hizmet tipi tesisler için mühendislik harikası çözümler sunuyoruz.</p>
 </motion.div>
 
 <div className="grid md:grid-cols-2 gap-8">
 {businessData.services?.map((service: any, idx: number) => (
 <motion.div key={service.id || idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-10 rounded-3xl border border-[var(--color-border)] shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
 <div className="absolute -right-8 -top-8 w-32 h-32 /5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
 <div className="relative z-10 mb-8">
 {idx % 2 === 0 ? <Wrench className="w-12 h-12" /> : <Activity className="w-12 h-12" />}
 </div>
 <h3 className="font-heading font-bold text-2xl mb-4 relative z-10">{service.name}</h3>
 <p className="leading-relaxed relative z-10 text-lg">{service.description || 'Ağır yüklerinizi katlar arası taşımada, yüksek mühendislik standartlarına tam uyumlu projeler sunuyoruz.'}</p>
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 )
}

export function AsansorYukHAKKIMIZDA({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="hakkimizda" className="py-24 px-6" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-20 items-center">
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative">
 <div className="absolute inset-0 rounded-3xl translate-x-4 translate-y-4"></div>
 <img src="https://images.unsplash.com/photo-1541888004659-40da8209ad73?auto=format&fit=crop&q=80" alt="Fabrika" className="relative z-10 rounded-3xl w-full aspect-[4/3] object-cover border border-[var(--color-border)] shadow-sm" />
 </motion.div>
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-8">
 <h2 className="font-heading text-4xl lg:text-5xl font-bold leading-tight">Güç ve Mühendisliğin Buluştuğu Nokta</h2>
 <p className="leading-relaxed text-lg">
 {businessData.name}, endüstriyel alanda yük taşımacılığına yönelik ağır hizmet asansörleri üretmek üzere kurulmuştur. {businessData?.ownerName as string} vizyonuyla, {businessData.city}'da başlayan serüvenimiz bugün Türkiye'nin her yerine uzanmaktadır.
 </p>
 <div className="grid grid-cols-2 gap-6 pt-6">
 {[
 { title: 'Sıfır Hata', desc: 'Kalite kontrol sistemleri' },
 { title: 'Yüksek Taşıma', desc: 'Tonajlı özel üretim' },
 { title: 'Uzun Ömür', desc: 'Dayanıklı komponentler' },
 { title: 'Acil Servis', desc: 'Arıza onarım hızı' }
 ].map((item, i) => (
 <div key={i}>
 <div className="font-bold mb-1 flex items-center gap-2">
 <Shield className="w-4 h-4 " /> {item.title}
 </div>
 <div className="text-sm">{item.desc}</div>
 </div>
 ))}
 </div>
 </motion.div>
 </div>
 </section>
 )
}

export function AsansorYukILETISIM({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="iletisim" className="py-24 px-6 border-t border-[var(--color-border)]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1280px] mx-auto">
 <div className="rounded-3xl p-12 md:p-20 shadow-xl border border-[var(--color-border)] relative overflow-hidden">
 <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
 
 <div className="grid lg:grid-cols-2 gap-16 relative z-10">
 <div>
 <h2 className="font-heading text-4xl font-bold mb-6">Projeleriniz İçin Bizimle Tanışın</h2>
 <p className="text-lg mb-10">Endüstriyel standartlara tam uyumlu sistemlerin kurulumu ve bakımı için satış muhendislerimizle gorusun.</p>
 
 <div className="space-y-6">
 <div className="flex items-center gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center border border-[var(--color-border)] shadow-sm">
 <Phone className="w-7 h-7" />
 </div>
 <div>
 <div className="text-sm font-semibold uppercase tracking-wider mb-1">Direkt Hat</div>
 <a href={`tel:${businessData.phoneClean}`} className="font-heading text-2xl font-bold hover:opacity-90 transition-colors">{businessData.phone}</a>
 </div>
 </div>
 
 <div className="flex items-center gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center border border-[var(--color-border)] shadow-sm">
 <MapPin className="w-7 h-7" />
 </div>
 <div>
 <div className="text-sm font-semibold uppercase tracking-wider mb-1">Merkez Ofis</div>
 <div className="font-medium">{businessData.address}, {businessData.district}/{businessData.city}</div>
 </div>
 </div>
 </div>
 </div>
 
 <div className="p-10 rounded-2xl border border-[var(--color-border)] shadow-inner">
 <h3 className="font-bold text-xl mb-6">Çalışma Takvimi</h3>
 <div className="space-y-4">
 {businessData.workingHours?.slice(0, 5).map((day, i) => (
 <div key={i} className="flex justify-between items-center py-3 border-b border-[var(--color-border)] last:border-0">
 <span className="font-medium">{day.dayTr}</span>
 <span className="px-3 py-1 rounded-md text-sm font-semibold">{day.open ? `${day.open} - ${day.close}` : 'Kapalı'}</span>
 </div>
 ))}
 <div className="pt-4 font-semibold flex items-center gap-2">
 <Star className="w-5 h-5" /> Hafta sonu acil destek mevcuttur.
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>
 )
}

export function AsansorYukFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 px-6" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[var(--color-border)] pt-12">
 <div className="flex items-center gap-2">
 <ArrowUpRight className="w-6 h-6 " />
 <span className="font-heading font-bold text-xl">{businessData.name}</span>
 </div>
 <div className="font-medium">
 © {new Date().getFullYear()} Kurumsal Hakları Saklıdır.
 </div>
 </div>
 </footer>
 )
}

registerSection('hero', 'asansoryuk_hero_0', AsansorYukHEADERStarterconfigslightlymoremodernshadow)
registerSection('hero', 'asansoryuk_hero_1', AsansorYukHEROSplitPanel)
registerSection('hero', 'asansoryuk_hero_2', AsansorYukSTATSIncludedinheroorbelow)
registerSection('services', 'asansoryuk_services_3', AsansorYukHIZMETLERligrid)
registerSection('services', 'asansoryuk_services_4', AsansorYukHAKKIMIZDA)
registerSection('services', 'asansoryuk_services_5', AsansorYukILETISIM)
registerSection('footer', 'asansoryuk_footer_6', AsansorYukFOOTER)
