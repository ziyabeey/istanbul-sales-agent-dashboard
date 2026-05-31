// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Briefcase, Building, ChevronRight, PhoneCall, ShieldAlert, BadgeCheck } from 'lucide-react'

export function NakliyatOfisHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="sticky top-0 z-50 shadow-md border-b-4 border-[var(--color-accent)]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
 <div className="font-heading font-black text-2xl tracking-tight flex items-center gap-3">
 <Briefcase className="w-7 h-7" />
 <span className="uppercase">{businessData.name}</span>
 </div>
 <nav className="hidden md:flex gap-8">
 <a href="#hizmetler" className="font-bold hover:opacity-90 uppercase text-sm tracking-widest transition-colors">Kurumsal Çözümler</a>
 <a href="#iletisim" className="font-bold hover:opacity-90 uppercase text-sm tracking-widest transition-colors">Talep Formu</a>
 </nav>
 <a href={`tel:${businessData.phoneClean}`} className="hidden md:flex items-center gap-2 font-black text-lg">
 <PhoneCall className="w-5 h-5" /> {businessData.phone}
 </a>
 </div>
 </header>
 )
}

export function NakliyatOfisHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 lg:py-32 px-6" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
 <div>
 <div className="flex items-center gap-3 mb-6">
 <span className="px-3 py-1 text-white font-bold text-xs tracking-widest uppercase">B2B Taşımacılık</span>
 <span className="font-medium text-sm">Kesintisiz İş Akışı</span>
 </div>
 <h1 className="font-heading text-5xl md:text-6xl font-black leading-tight mb-6 uppercase tracking-tight">
 Kurumsal Ofis <br /> <span className="">Nakliyat</span>
 </h1>
 <p className="text-xl mb-10 border-l-4 border-[var(--color-accent)] pl-5 font-medium leading-relaxed">
 İş yerinizi, fabrikanızı veya mağazanızı zaman kaybetmeden, sigortalı ve profesyonel ekiplerle taşıyoruz. Mesai durmadan taşının.
 </p>
 <div className="flex flex-wrap gap-4">
 <a href="#iletisim" className="px-8 py-4 font-bold uppercase text-sm tracking-widest flex items-center gap-2 hover:opacity-90 transition-opacity">
 Kurumsal Ekspertiz <ChevronRight className="w-5 h-5" />
 </a>
 </div>
 
 <div className="mt-12 flex gap-8 items-center pt-8 border-t border-[var(--color-border)]">
 <div className="flex items-center gap-3">
 <ShieldAlert className="w-8 h-8 text-green-600" />
 <div><div className="font-bold uppercase text-xs tracking-wider">Tam Kapsamlı</div><div className="font-black text-sm ">SİGORTA</div></div>
 </div>
 <div className="flex items-center gap-3">
 <BadgeCheck className="w-8 h-8 text-blue-600" />
 <div><div className="font-bold uppercase text-xs tracking-wider">Sertifikalı</div><div className="font-black text-sm ">PERSONEL</div></div>
 </div>
 </div>
 </div>
 <div className="hidden lg:block relative">
 <div className="grid grid-cols-2 gap-4">
 <div className="aspect-[3/4] rounded shadow-lg border border-[var(--color-border)] transform translate-y-8 p-6 flex flex-col justify-end relative overflow-hidden">
 <div className="absolute top-4 right-4 text-6xl opacity-10 font-black">01</div>
 <h3 className="font-bold text-xl mb-2">IT & Server Taşıma</h3>
 <p className="text-sm ">Hassas elektronik cihazlarınız özel sandıklarla taşınır.</p>
 </div>
 <div className="aspect-[3/4] rounded shadow-xl p-6 flex flex-col justify-between">
 <Building className="w-12 h-12" />
 <div>
 <h3 className="font-bold text-xl mb-2">Arşiv Taşıma</h3>
 <p className="text-sm opacity-90">Evraklarınız indekslenerek sırasına göre yeni ofise dizilir.</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>
 )
}

export function NakliyatOfisKURUMSALHIZMETLER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="hizmetler" className="py-24 px-6 border-y-2 border-[var(--color-border)]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto">
 <div className="mb-16">
 <h2 className="font-heading text-3xl md:text-4xl font-black uppercase tracking-tight mb-2">Çözümlerimiz</h2>
 <div className="w-20 h-2 mb-4"></div>
 <p className="text-lg max-w-2xl font-medium">Büyük ölçekli ofis taşımacılığından, butik mağaza kurulumlarına kadar kurumsal ihtiyaçlarınızı karşılıyoruz.</p>
 </div>
 
 <div className="grid md:grid-cols-3 gap-6">
 {businessData.services?.map((service: any, idx: number) => (
 <div key={service.id || idx} className="border-2 border-[var(--color-border)] p-8 hover:border-[var(--color-accent)] transition-colors group">
 <Building className="w-10 h-10 group-hover:opacity-90 mb-6 transition-colors" />
 <h3 className="font-heading font-black text-xl mb-3">{service.name}</h3>
 <p className="leading-relaxed text-sm font-medium">{service.description || 'Yeni çalışma alanınıza sorunsuz ve hızlı bir şekilde geçiş yapmanız için özel planlama yapıyoruz.'}</p>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}

export function NakliyatOfisILETISIM({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="iletisim" className="py-24 px-6 " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[800px] mx-auto border border-[var(--color-border)] p-10 md:p-16 rounded shadow-2xl text-center">
 <h2 className="font-heading text-4xl font-black uppercase tracking-tight mb-4">Kurumsal Teklif Alın</h2>
 <p className="font-medium mb-10">Ofisinizdeki metrekare, çalışan sayısı ve departman bilgilerini iletin, aynı gün projelendirme yapalım.</p>
 
 <a href={`tel:${businessData.phoneClean}`} className="inline-flex flex-col items-center justify-center p-8 w-full sm:w-auto min-w-[300px] box-border border-4 border-[var(--color-accent-light)] hover:opacity-90 transition-colors rounded">
 <PhoneCall className="w-10 h-10 mb-3" />
 <div className="font-bold text-sm tracking-widest uppercase mb-1">Müşteri Temsilcisi</div>
 <div className="font-black text-3xl tracking-wider">{businessData.phone}</div>
 </a>
 
 <div className="mt-8 text-sm font-bold ">
 {businessData.address}, {businessData.district}/{businessData.city}
 </div>
 </div>
 </section>
 )
}

export function NakliyatOfisFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 px-6 text-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <p className="font-bold text-sm uppercase tracking-widest opacity-80">
 © {new Date().getFullYear()} {businessData.name}. B2B Logistical Solutions.
 </p>
 </footer>
 )
}

registerSection('hero', 'nakliyatofis_hero_0', NakliyatOfisHEADER)
registerSection('hero', 'nakliyatofis_hero_1', NakliyatOfisHERO)
registerSection('services', 'nakliyatofis_services_2', NakliyatOfisKURUMSALHIZMETLER)
registerSection('services', 'nakliyatofis_services_3', NakliyatOfisILETISIM)
registerSection('footer', 'nakliyatofis_footer_4', NakliyatOfisFOOTER)
