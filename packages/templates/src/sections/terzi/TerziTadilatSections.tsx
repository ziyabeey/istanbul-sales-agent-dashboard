// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Scissors, Ruler, CheckCircle2 } from 'lucide-react'

export function TerziTadilatPRACTICALHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="px-6 py-4 bg-white border-b-4 border-[#92400E] sticky top-0 z-50 flex items-center justify-between" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading font-black text-2xl tracking-tight flex items-center gap-2">
 <Scissors className="w-6 h-6" />
 {businessData.name}
 </div>
 <a href={`tel:${businessData.phoneClean}`} className="text-white px-5 py-2.5 rounded-md font-bold text-sm tracking-wide hover:opacity-90 transition-colors shadow-sm">
 Arayın
 </a>
 </header>
 )
}

export function TerziTadilatTRUSTWORTHYHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-16 md:py-24 px-6 relative text-center bg-gradient-to-b from-[#FFFBEB] to-[#F5F0EB]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[800px] mx-auto relative z-10">
 <div className="inline-block px-4 py-1.5 rounded-full font-bold text-xs tracking-wider mb-8">
 Hızlı & Güvenilir Terzi
 </div>
 <h1 className="font-heading font-black text-5xl md:text-6xl mb-6 leading-tight">
 Kıyafetleriniz <br/> <span className="italic font-serif group-hover:not-italic">Tam Üzerinize Göre</span>
 </h1>
 <p className="text-lg font-medium mb-10 max-w-2xl mx-auto">
 Paça daraltma, fermuar değişimi, astar yenileme ve tüm günlük tadilat işleriniz aynı gün teslim seçenekleriyle.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <a href="#hizmetler" className="text-white px-8 py-4 rounded-lg font-bold text-xl hover:opacity-90 hover:shadow-lg transition-all">
 Fiyat Listesi
 </a>
 </div>
 </div>
 </section>
 )
}

export function TerziTadilatCORESERVICES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 px-6 bg-white" id="hizmetler" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1000px] mx-auto">
 <h2 className="font-heading font-black text-3xl text-center mb-12 ">Sık Yapılan İşlemler</h2>
 
 <div className="grid md:grid-cols-3 gap-6">
 <div className="p-8 rounded-2xl border border-[#E8DFD4] hover:shadow-md transition-shadow">
 <div className="w-12 h-12 text-white rounded-xl flex items-center justify-center mb-6">
 <Ruler className="w-6 h-6" />
 </div>
 <h3 className="font-black text-xl mb-2 ">Boy & Paça</h3>
 <ul className="space-y-2 font-medium text-sm">
 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 "/> Orijinal paça kıvırma</li>
 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 "/> Etek boyu kısaltma</li>
 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 "/> Kol boyu ayarlama</li>
 </ul>
 </div>

 <div className="p-8 rounded-2xl border border-[#E8DFD4] hover:shadow-md transition-shadow">
 <div className="w-12 h-12 text-white rounded-xl flex items-center justify-center mb-6">
 <Scissors className="w-6 h-6" />
 </div>
 <h3 className="font-black text-xl mb-2 ">Daraltma</h3>
 <ul className="space-y-2 font-medium text-sm">
 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 "/> Bel daraltma / genişletme</li>
 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 "/> Ceket pens atma</li>
 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 "/> Beden küçültme</li>
 </ul>
 </div>

 <div className="p-8 rounded-2xl border border-[#E8DFD4] hover:shadow-md transition-shadow">
 <div className="w-12 h-12 text-white rounded-xl flex items-center justify-center mb-6">
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M2 12h20"/><path d="m4.93 4.93 14.14 14.14"/><path d="m19.07 4.93-14.14 14.14"/></svg>
 </div>
 <h3 className="font-black text-xl mb-2 ">Detay & Onarım</h3>
 <ul className="space-y-2 font-medium text-sm">
 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 "/> Fermuar değişimi</li>
 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 "/> Astar yenileme</li>
 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 "/> Sökük ve yırtık onarımı</li>
 </ul>
 </div>
 </div>
 </div>
 </section>
 )
}

export function TerziTadilatFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 text-center border-t border-[#D6D3D1]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading font-black text-2xl mb-2">{businessData.name}</div>
 <p className="font-medium text-sm opacity-80">{businessData.address}</p>
 </footer>
 )
}

registerSection('hero', 'terzitadilat_hero_0', TerziTadilatPRACTICALHEADER)
registerSection('hero', 'terzitadilat_hero_1', TerziTadilatTRUSTWORTHYHERO)
registerSection('services', 'terzitadilat_services_2', TerziTadilatCORESERVICES)
registerSection('footer', 'terzitadilat_footer_3', TerziTadilatFOOTER)
