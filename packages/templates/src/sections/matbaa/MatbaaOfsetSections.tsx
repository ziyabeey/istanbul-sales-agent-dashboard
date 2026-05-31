// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Printer, MapPin, Clock, Phone, Layers, CheckCircle2 } from 'lucide-react'

export function MatbaaOfsetHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="sticky top-0 z-50 shadow-sm border-b-4 border-[var(--color-accent)]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
 <div className="font-heading font-black text-2xl tracking-tight flex items-center gap-2">
 <Layers className="w-8 h-8" />
 <span>{businessData.name}</span>
 </div>
 <nav className="hidden md:flex gap-8">
 <a href="#hizmetler" className="font-bold hover:opacity-90 uppercase text-sm tracking-wide">Hizmetler</a>
 <a href="#iletisim" className="font-bold hover:opacity-90 uppercase text-sm tracking-wide">İletişim</a>
 </nav>
 <a href="#iletisim" className="hidden md:flex border-2 border-[var(--color-border)] px-5 py-2 font-bold uppercase text-sm tracking-wide hover:border-[var(--color-accent)] transition-colors">
 Ücretsiz Fiyat Al
 </a>
 </div>
 </header>
 )
}

export function MatbaaOfsetHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
 <div>
 <h1 className="font-heading text-5xl font-black leading-tight mb-6">
 Profesyonel <span className="">Ofset Baskı</span> Tesisleri
 </h1>
 <p className="text-lg mb-8 font-medium border-l-4 border-[var(--color-accent)] pl-4">
 Yüksek tirajlı baskı ihtiyaçlarınız için endüstriyel kalitede, hızlı ve uygun maliyetli matbaa çözümleri sunuyoruz.
 </p>
 <div className="flex flex-wrap gap-4">
 <a href="#hizmetler" className="px-8 py-3 font-bold uppercase text-sm tracking-wide flex items-center gap-2 hover:">
 <Printer className="w-5 h-5" /> Makinelerimizi İncele
 </a>
 <a href="#iletisim" className="border-2 border-[var(--color-border)] px-8 py-3 font-bold uppercase text-sm tracking-wide hover:border-[var(--color-accent)] hover:">
 Bize Ulaşın
 </a>
 </div>
 </div>
 <div className="hidden lg:grid grid-cols-2 gap-4">
 <div className="rounded p-6 flex flex-col justify-center border border-[var(--color-accent)]/20">
 <div className="text-4xl font-black mb-2">1M+</div>
 <div className="font-bold text-sm tracking-wide uppercase">Günlük Baskı Kapasitesi</div>
 </div>
 <div className="rounded p-6 flex flex-col justify-center border border-[var(--color-border)]">
 <div className="text-4xl font-black mb-2">{businessData.foundedYear ? new Date().getFullYear() - businessData.foundedYear : '15'}</div>
 <div className="font-bold text-sm tracking-wide uppercase">Yıllık Endüstriyel Tecrübe</div>
 </div>
 </div>
 </div>
 </section>
 )
}

export function MatbaaOfsetHIZMETLERGRID({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="hizmetler" className="py-20 px-6" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto">
 <div className="flex items-end justify-between mb-12 border-b-2 border-[var(--color-border)] pb-4">
 <div>
 <h2 className="font-heading text-3xl font-black uppercase tracking-tight">Üretim Bantlarımız</h2>
 </div>
 <span className="hidden sm:inline-block font-bold uppercase text-sm tracking-wider">Toptan & Perakende</span>
 </div>
 
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
 {businessData.services?.map((service: any, idx: number) => (
 <div key={service.id || idx} className="p-8 border-2 border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors group">
 <div className="w-14 h-14 border-2 border-[var(--color-border)] flex items-center justify-center group-hover:opacity-90 group-hover:border-[var(--color-accent)] group-hover:opacity-90 transition-all mb-6">
 <CheckCircle2 className="w-6 h-6" />
 </div>
 <h3 className="font-heading font-bold text-xl mb-3">{service.name}</h3>
 <p className="mb-4">{service.description || 'Geniş makine parkurumuz ile yüksek kaliteli ve maliyet odaklı ofset baskı üretimi.'}</p>
 <div className="h-1 w-12 group-hover:w-24 transition-all"></div>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}

export function MatbaaOfsetILETISIM({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="iletisim" className="py-20 px-6 " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-center">
 <div>
 <h2 className="font-heading text-4xl font-black uppercase mb-6">Toptan Baskı Teklifi Alın</h2>
 <p className="text-lg opacity-90 mb-8 max-w-lg">
 Adet, kağıt gramajı ve baskı özelliklerini bize iletin, en uygun fiyat teklifini aynı gün içinde sunalım.
 </p>
 <div className="space-y-4">
 <div className="flex items-center gap-4 bg-black/10 p-4 rounded border border-white/20">
 <Phone className="w-6 h-6" />
 <span className="font-bold text-xl">{businessData.phone}</span>
 </div>
 <div className="flex items-center gap-4 bg-black/10 p-4 rounded border border-white/20">
 <MapPin className="w-6 h-6" />
 <span className="font-medium text-lg">{businessData.address}, {businessData.district}/{businessData.city}</span>
 </div>
 </div>
 </div>
 <div className="p-8 rounded ">
 <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
 <Clock className="w-6 h-6 " /> Mesai Saatlerimiz
 </h3>
 <ul className="space-y-3 font-medium">
 <li className="flex justify-between border-b pb-2"><span className="">Hafta İçi</span><span>08:00 - 19:00</span></li>
 <li className="flex justify-between border-b pb-2"><span className="">Cumartesi</span><span>09:00 - 15:00</span></li>
 <li className="flex justify-between pb-2"><span className="">Pazar</span><span className="text-red-500">Kapalı</span></li>
 </ul>
 </div>
 </div>
 </section>
 )
}

export function MatbaaOfsetFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-10 text-center border-t-2 border-[var(--color-border)]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <p className="font-bold ">
 © {new Date().getFullYear()} {businessData.name}. Endüstriyel Baskı Çözümleri.
 </p>
 </footer>
 )
}

registerSection('hero', 'matbaaofset_hero_0', MatbaaOfsetHEADER)
registerSection('hero', 'matbaaofset_hero_1', MatbaaOfsetHERO)
registerSection('services', 'matbaaofset_services_2', MatbaaOfsetHIZMETLERGRID)
registerSection('services', 'matbaaofset_services_3', MatbaaOfsetILETISIM)
registerSection('footer', 'matbaaofset_footer_4', MatbaaOfsetFOOTER)
