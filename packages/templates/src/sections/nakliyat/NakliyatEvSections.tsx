// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Truck, MapPin, Clock, Phone, ArrowRight, Package, ShieldCheck } from 'lucide-react'

export function NakliyatEvHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="sticky top-0 z-50 border-b border-[var(--color-border)] shadow-sm" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1024px] mx-auto px-6 h-16 flex items-center justify-between">
 <div className="font-heading font-bold text-xl flex items-center gap-2">
 <Truck className="w-6 h-6 " />
 {businessData.name}
 </div>
 <nav className="hidden md:flex gap-6">
 <a href="#hizmetler" className="text-sm font-medium hover:opacity-90 transition-colors">Hizmetlerimiz</a>
 <a href="#iletisim" className="text-sm font-medium hover:opacity-90 transition-colors">İletişim</a>
 </nav>
 <a href="#iletisim" className="text-sm px-4 py-2 rounded-[var(--radius-btn)] font-semibold hover:opacity-90 transition-opacity">
 Teklif Al
 </a>
 </div>
 </header>
 )
}

export function NakliyatEvHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-16 md:py-24 px-6 " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1024px] mx-auto grid md:grid-cols-2 gap-10 items-center">
 <div>
 <div className="inline-block px-3 py-1 font-semibold rounded-full text-xs font-medium mb-6 uppercase tracking-wider">
 {businessData.slogan || "Şehir İçi & Şehirler Arası"}
 </div>
 <h1 className="font-heading text-4xl md:text-5xl font-extrabold leading-tight mb-6">
 Eşyalarınız Bize, <br />
 <span className="">Güvenle</span> Emanet.
 </h1>
 <p className="text-lg mb-8 max-w-lg">
 Alanında uzman ekibimizle evden eve garantili ve sigortalı taşımacılık hizmeti veriyoruz.
 </p>
 <div className="flex gap-4">
 <a href="#iletisim" className="px-6 py-3 rounded-[var(--radius-btn)] font-bold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-[var(--color-accent)]/20">
 Ücretsiz Ekspertiz <ArrowRight className="w-5 h-5" />
 </a>
 </div>
 </div>
 <div className="hidden md:flex justify-end relative">
 <div className="w-full max-w-sm aspect-square rounded-[var(--radius-card)] border-2 border-[var(--color-border)] p-6 shadow-xl transform rotate-3 relative z-10">
 <div className="absolute top-4 right-4 p-2 rounded-full text-white shadow-md">
 <ShieldCheck className="w-6 h-6" />
 </div>
 <div className="w-full h-full border border-dashed border-[var(--color-border)] rounded-[var(--radius-card)] flex flex-col items-center justify-center text-center p-6 ">
 <Package className="w-16 h-16 mb-4" strokeWidth={1.5} />
 <h3 className="font-bold text-lg mb-2">Özenli Paketleme</h3>
 <p className="text-sm ">Kırılacak eşyalarınız için patpat balonlu naylon ile VIP paketleme hizmeti.</p>
 </div>
 </div>
 <div className="absolute top-10 -right-4 w-full max-w-sm aspect-square rounded-[var(--radius-card)] transform -rotate-2 -z-0"></div>
 </div>
 </div>
 </section>
 )
}

export function NakliyatEvSTATS({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-12 border-y border-[var(--color-border)] px-6" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1024px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
 {[
 { label: 'Yıllık Tecrübe', value: businessData.experience || '15+' },
 { label: 'Mutlu Aile', value: `${businessData.customerCount || '2000'}+` },
 { label: 'Müşteri Memnuniyeti', value: `%99` },
 { label: 'Geniş Araç Filosu', value: '10+' }
 ].map((stat, i) => (
 <div key={i} className="p-4 rounded-[var(--radius-card)] ">
 <div className="font-heading text-3xl font-bold mb-1">{stat.value}</div>
 <div className="text-sm font-medium">{stat.label}</div>
 </div>
 ))}
 </div>
 </section>
 )
}

export function NakliyatEvHIZMETLER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="hizmetler" className="py-20 px-6 " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1024px] mx-auto">
 <div className="text-center mb-12">
 <h2 className="font-heading text-3xl font-bold mb-3">Hizmetlerimiz</h2>
 <p className="">Yeni evinize giden yolda yanınızdayız.</p>
 </div>
 <div className="grid md:grid-cols-3 gap-6">
 {businessData.services?.map((service: any, idx: number) => (
 <div key={service.id || idx} className="p-6 rounded-[var(--radius-card)] border border-[var(--color-border)] shadow-sm text-center">
 <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
 <Truck className="w-6 h-6" />
 </div>
 <h3 className="font-heading font-bold text-lg mb-2">{service.name}</h3>
 <p className="text-sm leading-relaxed">{service.description || 'Profesyonel ekibimiz ve kapalı kasa araçlarımızla asansörlü, sigortalı ev taşımacılığı.'}</p>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}

export function NakliyatEvILETISIM({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="iletisim" className="py-20 px-6 border-t border-[var(--color-border)]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1024px] mx-auto">
 <div className="rounded-[var(--radius-card)] p-10 mt-8 flex flex-col items-center text-center shadow-2xl">
 <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Taşınmaya Hazır Mısınız?</h2>
 <p className="text-lg opacity-90 mb-8 max-w-lg">
 Eşyalarınızın miktarına ve taşınacak mesafeye göre hemen ücretsiz fiyat teklifi alın. 
 </p>
 <div className="flex flex-col sm:flex-row justify-center gap-6 w-full max-w-md">
 <a href={`tel:${businessData.phoneClean}`} className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-[var(--radius-btn)] font-bold text-lg shadow-lg hover:scale-105 transition-transform">
 <Phone className="w-6 h-6" /> Hemen Ara
 </a>
 </div>
 
 <div className="mt-12 w-full grid sm:grid-cols-2 gap-6 text-left max-w-2xl border-t border-white/20 pt-8">
 <div className="flex items-center gap-4 bg-black/10 p-4 rounded-lg">
 <MapPin className="w-8 h-8 opacity-80" />
 <div>
 <div className="font-bold opacity-80 text-xs tracking-wider uppercase">Merkez Ofis</div>
 <div className="font-medium">{businessData.district}, {businessData.city}</div>
 </div>
 </div>
 <div className="flex items-center gap-4 bg-black/10 p-4 rounded-lg">
 <Clock className="w-8 h-8 opacity-80" />
 <div>
 <div className="font-bold opacity-80 text-xs tracking-wider uppercase">Çalışma Saatleri</div>
 <div className="font-medium">Haftanın 7 Günü (08:00 - 20:00)</div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>
 )
}

export function NakliyatEvFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-8 text-center text-sm border-t border-[var(--color-border)]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <p className="font-medium">© {new Date().getFullYear()} {businessData.name}. Nakliyat ve Lojistik.</p>
 </footer>
 )
}

registerSection('hero', 'nakliyatev_hero_0', NakliyatEvHEADER)
registerSection('hero', 'nakliyatev_hero_1', NakliyatEvHERO)
registerSection('stats', 'nakliyatev_stats_2', NakliyatEvSTATS)
registerSection('services', 'nakliyatev_services_3', NakliyatEvHIZMETLER)
registerSection('services', 'nakliyatev_services_4', NakliyatEvILETISIM)
registerSection('footer', 'nakliyatev_footer_5', NakliyatEvFOOTER)
