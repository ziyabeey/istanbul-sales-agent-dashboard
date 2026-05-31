// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Briefcase, Component, Presentation, PhoneOutgoing } from 'lucide-react'

export function MobilyaOfisCORPORATEHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="bg-white px-6 py-5 border-b border-[#CBD5E1] sticky top-0 z-50" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto flex items-center justify-between">
 <div className="font-heading font-black text-2xl tracking-tighter flex items-center gap-2">
 <div className="w-8 h-8 rounded-sm flex items-center justify-center">
 <Briefcase className="w-4 h-4 text-white" />
 </div>
 {businessData.name} <span className="font-normal">| CORPORATE</span>
 </div>
 <a href={`tel:${businessData.phoneClean}`} className="hidden md:flex items-center gap-2 font-bold px-4 py-2 hover:opacity-90 transition-colors rounded">
 <PhoneOutgoing className="w-4 h-4"/> Proje Danışmanı ile Görüş
 </a>
 </div>
 </header>
 )
}

export function MobilyaOfisERGONOMICHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 md:py-32 bg-gradient-to-b from-white to-[#F1F5F9] text-center border-b border-[#CBD5E1]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1000px] mx-auto">
 <h1 className="font-heading text-5xl md:text-7xl font-black mb-8 leading-[1.05] tracking-tight">
 Şirketinizin Vizyonunu <br/> <span className="">Mekana Taşıyın.</span>
 </h1>
 <p className="text-xl font-medium mb-12 max-w-3xl mx-auto leading-relaxed">
 Kurumsal kimliğinize uygun, çalışan verimliliğini artıran ergonomik operasyonel masa sistemleri, yönetici (makam) takımları ve toplantı salonu çözümleri.
 </p>
 <div className="flex flex-col sm:flex-row justify-center gap-4">
 <a href={`https://wa.me/${businessData.whatsapp}`} className="text-white px-8 py-4 font-bold text-lg hover:opacity-90 transition-colors rounded shadow-lg flex justify-center">
 Toplu Alım ve İç Mimari Destek
 </a>
 </div>
 </div>
 </section>
 )
}

export function MobilyaOfisCORPORATEZONES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-6">
 
 <div className="bg-white p-8 border border-[#CBD5E1] hover:border-[#3B82F6] transition-colors rounded-lg group">
 <Presentation className="w-10 h-10 mb-6 group-hover:scale-110 transition-transform" />
 <h3 className="text-xl font-black mb-3">VIP Yönetici Takımları</h3>
 <p className="font-medium leading-relaxed">Güçlü bir duruş sergileyen, doğal ahşap kaplama ve deri detaylı makam masası takımları, misafir karşılama üniteleri.</p>
 </div>

 <div className="bg-white p-8 border border-[#CBD5E1] hover:border-[#3B82F6] transition-colors rounded-lg group">
 <Component className="w-10 h-10 mb-6 group-hover:scale-110 transition-transform" />
 <h3 className="text-xl font-black mb-3">Açık Ofis (Workstation)</h3>
 <p className="font-medium leading-relaxed">Kablo kanallı, seperatörlü, 2'li, 4'lü, 6'lı modüler çalışma istasyonları. Minimum alanda maksimum personel verimliliği.</p>
 </div>

 <div className="bg-white p-8 border border-[#CBD5E1] hover:border-[#3B82F6] transition-colors rounded-lg group">
 <Briefcase className="w-10 h-10 mb-6 group-hover:scale-110 transition-transform" />
 <h3 className="text-xl font-black mb-3">Ergonomik Fileli Koltuklar</h3>
 <p className="font-medium leading-relaxed">Bel destekli, senkron mekanizmalı, nefes alan terletmez file sırtlı 8-10 saat oturuma uygun ofis sandalyeleri.</p>
 </div>

 </div>
 </section>
 )
}

export function MobilyaOfisFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 text-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <p className="font-heading text-white text-2xl font-black tracking-tight mb-2">{businessData.name}</p>
 <p className="text-sm font-medium">B2B Office Furniture Solutions • {businessData.city}</p>
 </footer>
 )
}

registerSection('hero', 'mobilyaofis_hero_0', MobilyaOfisCORPORATEHEADER)
registerSection('hero', 'mobilyaofis_hero_1', MobilyaOfisERGONOMICHERO)
registerSection('services', 'mobilyaofis_services_2', MobilyaOfisCORPORATEZONES)
registerSection('footer', 'mobilyaofis_footer_3', MobilyaOfisFOOTER)
