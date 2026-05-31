// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Map, ArrowRightLeft, CalendarClock, PhoneOutgoing, CheckCircle } from 'lucide-react'

export function NakliyatSehirlerHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="absolute top-0 w-full z-50 border-b border-white/10" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1440px] mx-auto px-6 h-24 flex items-center justify-between">
 <div className="font-heading font-black text-2xl uppercase tracking-widest flex items-center gap-3 text-white">
 <Map className="w-8 h-8" />
 {businessData.name}
 </div>
 <a href="#iletisim" className="text-white font-bold px-8 py-3 uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors rounded-sm">
 TIR & Kamyon Randevusu
 </a>
 </div>
 </header>
 )
}

export function NakliyatSehirlerHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="text-white pt-40 pb-32 px-6 relative border-b-8 border-[var(--color-accent)]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="absolute inset-0 bg-black/20 z-0 mix-blend-multiply" />
 <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
 <div className="space-y-8">
 <div className="bg-white/10 border border-white/20 text-white px-4 py-2 font-bold uppercase text-xs tracking-widest inline-flex backdrop-blur-sm rounded-sm">
 Tüm Türkiye'ye Lojistik Ağ
 </div>
 <h1 className="font-heading text-6xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter">
 Şehirler <br/>
 <span className="">Arası</span> <br/>
 Taşıma.
 </h1>
 <p className="text-xl md:text-2xl font-light text-white/80 border-l-4 border-[var(--color-accent)] pl-6">
 İstanbul, Ankara, İzmir başta olmak üzere 81 ile düzenli ve parsiyel sigortalı sevkiyatlar.
 </p>
 <div className="flex pt-4">
 <a href="#iletisim" className="bg-white text-black px-10 py-5 font-black uppercase tracking-wider hover:opacity-90 hover:text-white transition-colors flex items-center gap-4 group rounded-sm">
 Sefer Sorgula <ArrowRightLeft className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
 </a>
 </div>
 </div>
 <div className="hidden lg:grid grid-cols-2 gap-6 h-full min-h-[500px] items-end pb-8">
 <div className="bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-sm">
 <div className="font-black text-5xl mb-2">81</div>
 <div className="font-bold uppercase tracking-widest text-sm text-white/70">İle Teslimat</div>
 </div>
 <div className="p-8 rounded-sm text-black">
 <div className="font-black text-5xl mb-2">48<span className="text-xl">Saat</span></div>
 <div className="font-bold uppercase tracking-widest text-sm opacity-80">Maksimum Süre</div>
 </div>
 </div>
 </div>
 </section>
 )
}

export function NakliyatSehirlerPROHIZMETLER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="hizmetler" className="py-24 px-6 " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1440px] mx-auto">
 <div className="mb-16">
 <h2 className="font-heading text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Lojistik <span className="">Çözümleri</span></h2>
 <p className="text-lg border-b-2 border-[var(--color-border)] pb-8 max-w-2xl font-medium">Uzun yolculuklara özel, güçlendirilmiş çelik kasa araçlarımızla hizmet veriyoruz.</p>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8">
 {businessData.services?.map((service: any, idx: number) => (
 <div key={service.id || idx} className="p-10 border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all rounded-sm flex flex-col justify-between">
 <div>
 <div className="w-16 h-16 border border-[var(--color-border)] rounded-sm flex items-center justify-center mb-8">
 <CheckCircle className="w-8 h-8 " />
 </div>
 <h3 className="font-heading font-black text-3xl mb-4 uppercase">{service.name}</h3>
 <p className="text-lg leading-relaxed font-medium mb-8 border-l-2 border-[var(--color-border)] pl-4">{service.description || 'Komple ev taşıma, parça eşya, dönüş aracı ayarlanması gibi tüm nakliye varyasyonlarında destek sağlıyoruz.'}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}

export function NakliyatSehirlerILETISIM({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="iletisim" className="py-24 px-6 border-t border-[var(--color-border)]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1000px] mx-auto flex flex-col items-center">
 <div className="text-white w-full rounded-sm p-12 md:p-20 flex flex-col items-center text-center shadow-2xl">
 <CalendarClock className="w-16 h-16 mb-8" />
 <h2 className="font-heading text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Taşınma Planınızı Yapalım</h2>
 <p className="text-white/70 text-lg mb-12 max-w-lg font-light">Şehirler arası rotalarda uygun fiyatlı dönüş araçları ve planlı taşıma için operasyon merkezimize ulaşın.</p>
 
 <a href={`tel:${businessData.phoneClean}`} className="text-black px-12 py-5 font-black uppercase tracking-widest hover:bg-white hover:scale-105 transition-all w-full md:w-auto flex items-center justify-center gap-3 rounded-sm">
 <PhoneOutgoing className="w-6 h-6" /> {businessData.phone}
 </a>
 
 <div className="mt-12 text-sm text-white/50 uppercase tracking-widest font-bold">
 Merkez: {businessData.district} / {businessData.city}
 </div>
 </div>
 </div>
 </section>
 )
}

export function NakliyatSehirlerFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 border-t border-[var(--color-border)] text-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading font-black uppercase tracking-widest text-sm">
 {businessData.name} © {new Date().getFullYear()} — ŞEHİRLER ARASI NAKLİYAT
 </div>
 </footer>
 )
}

registerSection('hero', 'nakliyatsehirler_hero_0', NakliyatSehirlerHEADER)
registerSection('hero', 'nakliyatsehirler_hero_1', NakliyatSehirlerHERO)
registerSection('services', 'nakliyatsehirler_services_2', NakliyatSehirlerPROHIZMETLER)
registerSection('services', 'nakliyatsehirler_services_3', NakliyatSehirlerILETISIM)
registerSection('footer', 'nakliyatsehirler_footer_4', NakliyatSehirlerFOOTER)
