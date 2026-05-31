// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Croissant, Coffee, MapPin, Search } from 'lucide-react'

export function PastanePastaMODERNCAFEHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="px-6 py-6 border-b border-[#E5E1D8] bg-white/80 backdrop-blur-md sticky top-0 z-50" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto flex items-center justify-between">
 <div className="font-heading font-black text-2xl tracking-tighter flex items-center gap-2">
 <Croissant className="w-6 h-6 " strokeWidth={2}/>
 {businessData.name}
 </div>
 <a href={`tel:${businessData.phoneClean}`} className="text-white px-5 py-2 rounded-lg font-bold text-sm tracking-wide hover:opacity-90 transition-colors">
 Masa Rezervasyonu
 </a>
 </div>
 </header>
 )
}

export function PastanePastaCHICHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 md:py-32 text-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[900px] mx-auto">
 <p className="font-bold tracking-[0.2em] uppercase text-xs mb-6">Artisanal Bakery & Specialty Coffee</p>
 <h1 className="font-heading text-5xl md:text-7xl font-black mb-8 leading-[1.05] tracking-tight">
 Taze Kruvasan, <br/> <span className="italic font-serif font-medium">Nitelikli Kahve.</span>
 </h1>
 <p className="text-lg font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
 Günlük hazırlanan artizan ekşi mayalı ekmekler, taze meyveli tartlar, San Sebastian cheesecake ve tek kökenli filtre kahvelerimizle keyifli bir mola.
 </p>
 <div className="flex flex-col sm:flex-row justify-center gap-4">
 <a href={`https://wa.me/${businessData.whatsapp}`} className="bg-transparent border-2 border-[#1C1917] px-8 py-4 font-bold text-lg hover:opacity-90 hover:text-white transition-colors rounded-lg flex items-center justify-center gap-3">
 <Coffee className="w-5 h-5"/> Paket Sipariş Ver
 </a>
 </div>
 </div>
 </section>
 )
}

export function PastanePastaMENUHIGHLIGHTS({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 bg-white border-y border-[#E5E1D8]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12">
 
 <div className="space-y-6">
 <h3 className="font-heading font-black text-3xl mb-8 border-b-2 border-[#1C1917] inline-block pb-2">Patisserie</h3>
 
 <div className="flex justify-between items-end border-b border-[#F5F5F4] pb-4">
 <div>
 <h4 className="font-bold text-xl mb-1">San Sebastian Cheesecake</h4>
 <p className="text-sm ">Akışkan çikolata sosu ile</p>
 </div>
 <span className="font-medium text-lg ">180 ₺</span>
 </div>

 <div className="flex justify-between items-end border-b border-[#F5F5F4] pb-4">
 <div>
 <h4 className="font-bold text-xl mb-1">Bademli Kruvasan</h4>
 <p className="text-sm ">Fransız tereyağlı, frangipane kremalı</p>
 </div>
 <span className="font-medium text-lg ">120 ₺</span>
 </div>
 </div>

 <div className="space-y-6">
 <h3 className="font-heading font-black text-3xl mb-8 border-b-2 border-[#1C1917] inline-block pb-2">Coffee</h3>
 
 <div className="flex justify-between items-end border-b border-[#F5F5F4] pb-4">
 <div>
 <h4 className="font-bold text-xl mb-1">V60 Pour Over</h4>
 <p className="text-sm ">Ethiopia Yirgacheffe, Single Origin</p>
 </div>
 <span className="font-medium text-lg ">110 ₺</span>
 </div>

 <div className="flex justify-between items-end border-b border-[#F5F5F4] pb-4">
 <div>
 <h4 className="font-bold text-xl mb-1">Iced Flat White</h4>
 <p className="text-sm ">Çift shot espresso, soğuk süt</p>
 </div>
 <span className="font-medium text-lg ">130 ₺</span>
 </div>
 </div>

 </div>
 </section>
 )
}

export function PastanePastaFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-16 text-center " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <p className="font-heading font-black text-2xl mb-4 tracking-tight">{businessData.name}</p>
 <p className="text-sm font-medium flex items-center justify-center gap-2">
 <MapPin className="w-4 h-4"/> {businessData.address}
 </p>
 </footer>
 )
}

registerSection('hero', 'pastanepasta_hero_0', PastanePastaMODERNCAFEHEADER)
registerSection('hero', 'pastanepasta_hero_1', PastanePastaCHICHERO)
registerSection('services', 'pastanepasta_services_2', PastanePastaMENUHIGHLIGHTS)
registerSection('footer', 'pastanepasta_footer_3', PastanePastaFOOTER)
