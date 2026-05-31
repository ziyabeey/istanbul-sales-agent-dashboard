// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Wine, Navigation, Anchor, Star } from 'lucide-react'

export function OrganizasyonLuxLUXHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="px-8 py-10 md:py-16 flex justify-between items-center absolute w-full z-50" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-serif text-3xl md:text-5xl uppercase tracking-widest ">
 {businessData.name}
 </div>
 <div className="hidden md:block uppercase font-light tracking-[0.5em] border-b border-[#A8A29E] pb-1">
 Curators of Luxury Experiences
 </div>
 </header>
 )
}

export function OrganizasyonLuxVIPHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="h-[90vh] flex items-center px-8 relative overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {/* Subtle Gradient Backdrop */}
 <div className="absolute right-0 bottom-0 w-full h-full bg-gradient-to-t from-[#101010] to-transparent z-10 pointer-events-none"></div>

 <div className="max-w-[1400px] w-full mx-auto relative z-20 pt-32 xl:pt-48">
 <Wine className="w-10 h-10 mb-12 opacity-80" strokeWidth={0.5} />
 <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl uppercase mb-10 leading-[0.9] tracking-tight max-w-5xl text-white">
 Unutulmaz <br/> <span className="italic lowercase font-light tracking-wide">anların </span> mimarları.
 </h1>
 <p className="text-lg font-light mb-16 max-w-2xl leading-loose">
 Maksimum gizlilik ve sınırsız ihtişam. Dünyanın en ikonik lokasyonlarında yalı düğünleri, özel jet transferli partiler ve mega yat organizasyonları.
 </p>
 <a href={`https://wa.me/${businessData.whatsapp}`} className="inline-block uppercase font-semibold tracking-[0.3em] border-b border-[#D6D3D1] pb-2 hover:text-white hover:border-white transition-all">
 Özel Danışmanınızla İletişime Geçin
 </a>
 </div>
 </section>
 )
}

export function OrganizasyonLuxEXCLUSIVESERVICES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-32 px-8 border-t border-[#262626]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1400px] mx-auto grid md:grid-cols-3 gap-24">
 
 <div className="group">
 <Navigation className="w-10 h-10 mb-8 group-hover:opacity-90 transition-colors" strokeWidth={0.5}/>
 <h3 className="text-sm font-light uppercase tracking-[0.3em] mb-4 ">Destination Weddings</h3>
 <p className="text-sm leading-relaxed font-light">
 Como Gölü, Paris veya Bodrum... Bütün davetlilerin uçak, lüks otel konaklaması, gezi programları ve düğün organizasyonunun uçtan uca yönetimi.
 </p>
 </div>

 <div className="group">
 <Anchor className="w-10 h-10 mb-8 group-hover:opacity-90 transition-colors" strokeWidth={0.5}/>
 <h3 className="text-sm font-light uppercase tracking-[0.3em] mb-4 ">Mega Yat Konseptleri</h3>
 <p className="text-sm leading-relaxed font-light">
 İstanbul Boğazı, Ege ve Akdeniz sularında kiralık mega yatlarda, Michelin yıldızı seviyesinde şef catering hizmetli özel kutlamalar.
 </p>
 </div>

 <div className="group">
 <Star className="w-10 h-10 mb-8 group-hover:opacity-90 transition-colors" strokeWidth={0.5}/>
 <h3 className="text-sm font-light uppercase tracking-[0.3em] mb-4 ">VIP Etkinlik Yönetimi</h3>
 <p className="text-sm leading-relaxed font-light">
 Sadece davetiye ile girilebilen "Invite-Only" cemiyet partileri. Yüksek güvenlik, gizlilik sözleşmeleri, lüks transfer ağı.
 </p>
 </div>

 </div>
 </section>
 )
}

export function OrganizasyonLuxFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-24 px-8 flex flex-col md:flex-row items-center justify-between uppercase font-light tracking-[0.4em] " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="mb-6 md:mb-0">© {businessData.foundedYear} {businessData.name}</div>
 <div className="">BESPOKE LUXURY AGENCY</div>
 </footer>
 )
}

registerSection('hero', 'organizasyonlux_hero_0', OrganizasyonLuxLUXHEADER)
registerSection('hero', 'organizasyonlux_hero_1', OrganizasyonLuxVIPHERO)
registerSection('services', 'organizasyonlux_services_2', OrganizasyonLuxEXCLUSIVESERVICES)
registerSection('footer', 'organizasyonlux_footer_3', OrganizasyonLuxFOOTER)
