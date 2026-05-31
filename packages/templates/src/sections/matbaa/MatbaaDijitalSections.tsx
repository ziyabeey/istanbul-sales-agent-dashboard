// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Printer, MapPin, Clock, Phone, ArrowRight, CheckCircle2, Star } from 'lucide-react'

export function MatbaaDijitalHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="sticky top-0 z-50 border-b border-[var(--color-border)]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1024px] mx-auto px-6 h-16 flex items-center justify-between">
 <div className="font-heading font-bold text-xl ">
 <span className="">Hızlı</span> {businessData.name}
 </div>
 <nav className="hidden md:flex gap-6">
 <a href="#hizmetler" className="text-sm font-medium hover:opacity-90 transition-colors">Hizmetler</a>
 <a href="#iletisim" className="text-sm font-medium hover:opacity-90 transition-colors">İletişim</a>
 </nav>
 <a href="#iletisim" className="text-sm px-4 py-2 rounded-[var(--radius-btn)] font-semibold hover:opacity-90 transition-opacity">
 Teklif Al
 </a>
 </div>
 </header>
 )
}

export function MatbaaDijitalHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 px-6" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1024px] mx-auto text-center">
 <div className="inline-block px-3 py-1 font-semibold rounded-full text-xs mb-6 uppercase tracking-wider">
 {businessData.slogan || "Dijital Baskı Merkezi"}
 </div>
 <h1 className="font-heading text-4xl md:text-5xl font-extrabold leading-tight mb-6">
 Hızlı, Kaliteli ve Güvenilir <br className="hidden md:block" /> Baskı Çözümleri
 </h1>
 <p className="text-lg mb-10 max-w-2xl mx-auto">
 Broşür, kartvizit, afiş ve kurumsal kimlik ihtiyaçlarınız için en modern dijital baskı teknolojilerini kullanıyoruz.
 </p>
 <div className="flex justify-center gap-4">
 <a href="#iletisim" className="px-6 py-3 rounded-[var(--radius-btn)] font-bold flex items-center gap-2 hover:opacity-90">
 Siparişe Başla <ArrowRight className="w-5 h-5" />
 </a>
 </div>
 </div>
 </section>
 )
}

export function MatbaaDijitalSTATS({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-12 border-y border-[var(--color-border)] px-6" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1024px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
 {[
 { label: 'Yıllık Tecrübe', value: businessData.experience || '10+' },
 { label: 'Mutlu Müşteri', value: `${businessData.customerCount || '1000'}+` },
 { label: 'Google Puanı', value: `${businessData.rating || 4.9}/5` },
 { label: 'Teslimat Süresi', value: '24 Saat' }
 ].map((stat, i) => (
 <div key={i}>
 <div className="font-heading text-3xl font-bold mb-1">{stat.value}</div>
 <div className="text-sm font-medium">{stat.label}</div>
 </div>
 ))}
 </div>
 </section>
 )
}

export function MatbaaDijitalHIZMETLER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="hizmetler" className="py-20 px-6" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1024px] mx-auto">
 <div className="text-center mb-12">
 <h2 className="font-heading text-3xl font-bold mb-3">Hizmetlerimiz</h2>
 <p className="">Tüm baskı ihtiyaçlarınıza tek noktadan çözüm.</p>
 </div>
 <div className="grid md:grid-cols-3 gap-6">
 {businessData.services?.map((service: any, idx: number) => (
 <div key={service.id || idx} className="p-6 rounded-[var(--radius-card)] border border-[var(--color-border)] text-center">
 <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
 <Printer className="w-6 h-6" />
 </div>
 <h3 className="font-heading font-bold text-lg mb-2">{service.name}</h3>
 <p className="text-sm">{service.description || 'Kaliteli ve hızlı baskı hizmetimizle yanınızdayız.'}</p>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}

export function MatbaaDijitalILETISIM({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="iletisim" className="py-20 px-6 border-t border-[var(--color-border)]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1024px] mx-auto text-center">
 <h2 className="font-heading text-3xl font-bold mb-8">İletişime Geçin</h2>
 <div className="flex flex-col md:flex-row justify-center gap-6">
 <a href={`tel:${businessData.phoneClean}`} className="flex-1 flex flex-col items-center p-6 rounded-[var(--radius-card)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors">
 <Phone className="w-8 h-8 mb-3" />
 <div className="font-bold text-lg">{businessData.phone}</div>
 <div className="text-sm ">Hemen Arayın</div>
 </a>
 <div className="flex-1 flex flex-col items-center p-6 rounded-[var(--radius-card)] border border-[var(--color-border)]">
 <MapPin className="w-8 h-8 mb-3" />
 <div className="font-bold text-lg">{businessData.district}/{businessData.city}</div>
 <div className="text-sm ">{businessData.address}</div>
 </div>
 <div className="flex-1 flex flex-col items-center p-6 rounded-[var(--radius-card)] border border-[var(--color-border)]">
 <Clock className="w-8 h-8 mb-3" />
 <div className="font-bold text-lg">Çalışma Saatleri</div>
 <div className="text-sm ">Pzt-Cmt: 09:00 - 18:00</div>
 </div>
 </div>
 </div>
 </section>
 )
}

export function MatbaaDijitalFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-8 text-center text-sm border-t border-[var(--color-border)]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <p>© {new Date().getFullYear()} {businessData.name}. Tüm hakları saklıdır.</p>
 </footer>
 )
}

registerSection('hero', 'matbaadijital_hero_0', MatbaaDijitalHEADER)
registerSection('hero', 'matbaadijital_hero_1', MatbaaDijitalHERO)
registerSection('stats', 'matbaadijital_stats_2', MatbaaDijitalSTATS)
registerSection('services', 'matbaadijital_services_3', MatbaaDijitalHIZMETLER)
registerSection('services', 'matbaadijital_services_4', MatbaaDijitalILETISIM)
registerSection('footer', 'matbaadijital_footer_5', MatbaaDijitalFOOTER)
