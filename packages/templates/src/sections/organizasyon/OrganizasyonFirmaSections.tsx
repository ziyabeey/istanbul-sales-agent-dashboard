// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Briefcase, Building2, Presentation, CalendarCheck, Handshake } from 'lucide-react'

export function OrganizasyonFirmaCORPORATEHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="bg-white px-6 py-5 border-b border-[#E2E8F0] sticky top-0 z-50 shadow-sm" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto flex items-center justify-between">
 <div className="font-heading font-black text-2xl tracking-tighter flex items-center gap-3 ">
 <div className="w-8 h-8 rounded-sm flex items-center justify-center">
 <Building2 className="w-4 h-4 text-white" />
 </div>
 {businessData.name} <span className="font-normal text-sm tracking-normal ml-2">Corporate Events</span>
 </div>
 <a href={`tel:${businessData.phoneClean}`} className="hidden md:flex flex-row items-center gap-2 font-bold px-5 py-2 hover:opacity-90 transition-colors rounded">
 <CalendarCheck className="w-4 h-4"/> Toplantı Talep Et
 </a>
 </div>
 </header>
 )
}

export function OrganizasyonFirmaSTRUCTUREDHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 md:py-32 bg-white text-center border-b border-[#E2E8F0]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1000px] mx-auto">
 <p className="font-bold tracking-widest uppercase text-sm mb-6 flex items-center justify-center gap-2">
 <Briefcase className="w-4 h-4"/> B2B Event Management
 </p>
 <h1 className="font-heading text-5xl md:text-7xl font-black mb-8 leading-[1.05] tracking-tight">
 Şirketinizin Vizyonunu <br/> <span className="">Sahneye Taşıyoruz.</span>
 </h1>
 <p className="text-xl font-medium mb-12 max-w-3xl mx-auto leading-relaxed">
 Lansmanlar, bayi toplantıları, kurumsal galalar ve konferanslar. Kusursuz protokol yönetimi ve teknolojik altyapılarla markanızın prestijini artırın.
 </p>
 <div className="flex flex-col sm:flex-row justify-center gap-4">
 <a href={`https://wa.me/${businessData.whatsapp}`} className="text-white px-8 py-4 font-bold text-lg hover:opacity-90 transition-colors rounded shadow-lg flex justify-center items-center gap-3">
 <Presentation className="w-5 h-5"/> Teklif İste
 </a>
 </div>
 </div>
 </section>
 )
}

export function OrganizasyonFirmaCORPORATESERVICES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-8">
 
 <div className="bg-white p-8 border-l-4 border-[#1E3A8A] shadow-sm hover:shadow-md transition-shadow">
 <Building2 className="w-10 h-10 mb-6" strokeWidth={1.5} />
 <h3 className="text-xl font-black mb-3 ">Bayi Toplantıları & Kongreler</h3>
 <p className="font-medium leading-relaxed">Otel rezervasyonları, transfer yönetimi, salon kurgusu ve LED ekran/ses/sahne sistemleri anahtar teslim kurulumu.</p>
 </div>

 <div className="bg-white p-8 border-l-4 border-[#1E3A8A] shadow-sm hover:shadow-md transition-shadow">
 <Presentation className="w-10 h-10 mb-6" strokeWidth={1.5} />
 <h3 className="text-xl font-black mb-3 ">Kurumsal Lansmanlar</h3>
 <p className="font-medium leading-relaxed">Ürün tanıtımları, marka yüzü etkinlikleri, mapping gösterileri ve basın organizasyonu.</p>
 </div>

 <div className="bg-white p-8 border-l-4 border-[#1E3A8A] shadow-sm hover:shadow-md transition-shadow">
 <Handshake className="w-10 h-10 mb-6" strokeWidth={1.5} />
 <h3 className="text-xl font-black mb-3 ">Gala Geceleri & Ödül Töreni</h3>
 <p className="font-medium leading-relaxed">Kırmızı halı tasarımı, protokol karşılama, catering, ünlü sunucu ve performans sanatçısı temini (Menajerlik).</p>
 </div>

 </div>
 </section>
 )
}

export function OrganizasyonFirmaFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 text-center border-t-8 border-[#1E3A8A]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <p className="font-heading text-white text-2xl font-black tracking-tight mb-2">{businessData.name}</p>
 <p className="text-sm font-medium uppercase tracking-widest">{businessData.city} • Kurumsal Etkinlik Ajansı</p>
 </footer>
 )
}

registerSection('hero', 'organizasyonfirma_hero_0', OrganizasyonFirmaCORPORATEHEADER)
registerSection('hero', 'organizasyonfirma_hero_1', OrganizasyonFirmaSTRUCTUREDHERO)
registerSection('services', 'organizasyonfirma_services_2', OrganizasyonFirmaCORPORATESERVICES)
registerSection('footer', 'organizasyonfirma_footer_3', OrganizasyonFirmaFOOTER)
