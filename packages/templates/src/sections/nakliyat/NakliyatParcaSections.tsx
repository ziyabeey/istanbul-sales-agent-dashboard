// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Box, Map, FastForward, CheckCircle, ArrowRight } from 'lucide-react'

export function NakliyatParcaHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="fixed top-0 left-0 w-full z-50 /90 backdrop-blur border-b border-[var(--color-border)] flex items-center h-20 px-6 lg:px-12" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between">
 <div className="font-heading font-black text-2xl tracking-tighter flex items-center gap-2">
 <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white">
 <Box className="w-5 h-5" />
 </div>
 {businessData.name}
 </div>
 <nav className="hidden md:flex gap-8">
 <a href="#hizmetler" className="font-semibold text-sm hover:opacity-90 transition-colors">Nasıl Çalışır?</a>
 <a href="#iletisim" className="font-semibold text-sm hover:opacity-90 transition-colors">Fiyat Hesapla</a>
 </nav>
 <a href="#iletisim" className="px-6 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-colors">
 Kurye Çağır
 </a>
 </div>
 </header>
 )
}

export function NakliyatParcaHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="pt-32 pb-20 px-6 lg:px-12 relative overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="absolute top-0 right-0 w-1/2 h-full -z-10 rounded-bl-[100px] hidden lg:block" />
 
 <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
 <div className="pt-10">
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs tracking-wider uppercase mb-8">
 <FastForward className="w-4 h-4" /> Ekspres Parsiyel Taşıma
 </div>
 <h1 className="font-heading text-5xl md:text-7xl font-black leading-[1.05] tracking-tighter mb-6">
 Az Eşya, <br/>
 Çok <span className="">Hız.</span>
 </h1>
 <p className="text-xl mb-10 max-w-lg font-medium leading-relaxed">
 Öğrenci evi eşyaları, tekli mobilyalar veya beyaz eşyalarınız için aynı gün kurye & hafif ticari nakliye hizmeti.
 </p>
 <div className="flex flex-col sm:flex-row gap-4">
 <a href="#iletisim" className="text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-[var(--color-accent)]/20 text-center flex items-center justify-center gap-2 hover:-translate-y-1 transition-transform">
 Anında Fiyat Al <ArrowRight className="w-5 h-5" />
 </a>
 <div className="hidden sm:flex items-center gap-3 px-6 py-4 border border-[var(--color-border)] rounded-xl font-bold">
 <CheckCircle className="w-5 h-5 text-green-500" /> Sigortalı Taşıma
 </div>
 </div>
 </div>
 
 <div className="grid grid-cols-2 gap-6 relative">
 <div className="text-white p-8 rounded-3xl flex flex-col justify-end aspect-square shadow-2xl relative z-10 translate-y-8 hover:scale-105 transition-transform duration-500">
 <h3 className="font-black text-3xl mb-2">Aynı Gün</h3>
 <p className="font-medium opacity-90">Teslimat Garantisi</p>
 </div>
 <div className="p-8 rounded-3xl flex flex-col justify-end aspect-square border border-[var(--color-border)] hover:scale-105 transition-transform duration-500">
 <Map className="w-12 h-12 mb-auto" />
 <h3 className="font-black text-2xl mb-1">{businessData.city} İçi</h3>
 <p className="font-medium ">Geniş Dağıtım Ağı</p>
 </div>
 </div>
 </div>
 </section>
 )
}

export function NakliyatParcaPARCAEYAHIZMETLER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="hizmetler" className="py-24 px-6 lg:px-12 mt-12 rounded-[3rem] mx-2 lg:mx-6 border border-[var(--color-border)] shadow-sm" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1440px] mx-auto">
 <div className="text-center mb-16">
 <h2 className="font-heading text-4xl font-black tracking-tighter mb-4">Ne Taşıyoruz?</h2>
 <p className="text-lg font-medium">Küçük kamyonetlerimiz ve panelvan araçlarımızla her türlü parça eşya.</p>
 </div>
 <div className="grid md:grid-cols-3 gap-8">
 {businessData.services?.map((service: any, idx: number) => (
 <div key={service.id || idx} className="p-8 rounded-3xl border border-[var(--color-border)] shadow-sm hover:border-[var(--color-accent)] transition-colors">
 <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
 <Box className="w-7 h-7 " />
 </div>
 <h3 className="font-heading font-black text-2xl mb-3">{service.name}</h3>
 <p className="font-medium leading-relaxed">{service.description || 'Mobilya, beyaz eşya, koli ve öğrenci eşyası taşımacılığında güvenilir ve ekonomik çözüm.'}</p>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}

export function NakliyatParcaILETISIM({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="iletisim" className="py-24 px-6 lg:px-12" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1440px] mx-auto rounded-[3rem] p-10 lg:p-20 text-center relative overflow-hidden">
 <div className="relative z-10 w-full max-w-2xl mx-auto">
 <h2 className="font-heading text-5xl font-black tracking-tighter mb-6">Mesafe ve Eşyanı Söyle.</h2>
 <p className="text-xl font-medium mb-10">WhatsApp üzerinden eşyanızın fotoğrafını yollayın, saniyeler içinde fiyat verelim.</p>
 
 <a href={`https://wa.me/${businessData.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-transform shadow-xl shadow-[var(--color-accent)]/20 w-full sm:w-auto">
 WhatsApp ile Fiyat Al
 </a>
 
 <div className="mt-12 /80 text-sm font-medium">
 Veya bizi arayın: <a href={`tel:${businessData.phoneClean}`} className="font-bold">{businessData.phone}</a>
 </div>
 </div>
 </div>
 </section>
 )
}

export function NakliyatParcaFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-10 text-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading font-black text-xl mb-2 opacity-50">{businessData.name}</div>
 <p className="text-sm font-semibold ">
 © {new Date().getFullYear()} Parça Eşya ve Hafif Taşıma Sistemleri
 </p>
 </footer>
 )
}

registerSection('hero', 'nakliyatparca_hero_0', NakliyatParcaHEADER)
registerSection('hero', 'nakliyatparca_hero_1', NakliyatParcaHERO)
registerSection('services', 'nakliyatparca_services_2', NakliyatParcaPARCAEYAHIZMETLER)
registerSection('services', 'nakliyatparca_services_3', NakliyatParcaILETISIM)
registerSection('footer', 'nakliyatparca_footer_4', NakliyatParcaFOOTER)
