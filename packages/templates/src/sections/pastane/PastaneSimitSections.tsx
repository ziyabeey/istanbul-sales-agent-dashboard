// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Flame, Clock, Coffee, Wheat } from 'lucide-react'

export function PastaneSimitRUSTICHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="sticky top-0 z-50 border-b-4 border-[#FBBF24] shadow-sm" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1000px] mx-auto px-6 h-20 flex items-center justify-between">
 <div className="font-heading font-black text-2xl flex items-center gap-2 ">
 <Flame className="w-8 h-8 " />
 {businessData.name}
 </div>
 <a href={`https://wa.me/${businessData.whatsapp}`} className="text-white px-6 py-2.5 rounded-full font-bold hover:opacity-90 transition-all shadow-[0_4px_0_#78350F]">
 Toplu Sipariş
 </a>
 </div>
 </header>
 )
}

export function PastaneSimitWARMHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 md:py-32 px-6 relative text-center bg-white border-b-2 border-[#FFEDD5]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[800px] mx-auto relative z-10">
 <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-black text-sm mb-6 uppercase tracking-wider">
 <Clock className="w-4 h-4" /> Her Sabah 06:00'da Taze Çıkar
 </div>
 <h1 className="font-heading text-5xl md:text-7xl font-black mb-6 leading-tight">
 Çıtır Simit, <br/> <span className="">Sıcak Ekmek.</span>
 </h1>
 <p className="text-xl mb-10 font-bold max-w-2xl mx-auto">
 Odun ateşinde pişen geleneksel lezzetler. Çayınızı hazırlayın, fırından yeni çıkmış sıcacık poğaçalar yolda.
 </p>
 <div className="flex flex-col sm:flex-row justify-center gap-4">
 <a href={`tel:${businessData.phoneClean}`} className="px-8 py-4 rounded-full font-black text-xl hover:opacity-90 transition-colors shadow-[0_6px_0_#D97706]">
 Arayıp Sipariş Ver
 </a>
 </div>
 </div>
 </section>
 )
}

export function PastaneSimitFRESHPRODUCTS({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 px-6 " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1000px] mx-auto">
 <h2 className="font-heading text-3xl md:text-4xl font-black text-center mb-12 ">
 Fırından Ne Çıktı?
 </h2>
 
 <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
 <div className="bg-white p-6 rounded-3xl text-center border-2 border-[#FFEDD5] hover:border-[#FBBF24] transition-colors shadow-sm cursor-pointer">
 <div className="text-6xl mb-4">🥨</div>
 <h3 className="font-black text-xl mb-1">Çıtır Simit</h3>
 <p className="font-bold text-sm">Bol Susamlı</p>
 </div>

 <div className="bg-white p-6 rounded-3xl text-center border-2 border-[#FFEDD5] hover:border-[#FBBF24] transition-colors shadow-sm cursor-pointer">
 <div className="text-6xl mb-4">🥐</div>
 <h3 className="font-black text-xl mb-1">Peynirli Poğaça</h3>
 <p className="font-bold text-sm">Tereyağlı</p>
 </div>

 <div className="bg-white p-6 rounded-3xl text-center border-2 border-[#FFEDD5] hover:border-[#FBBF24] transition-colors shadow-sm cursor-pointer">
 <div className="text-6xl mb-4">🥖</div>
 <h3 className="font-black text-xl mb-1">Taş Fırın Ekmeği</h3>
 <p className="font-bold text-sm">Ekşi Mayalı</p>
 </div>

 <div className="bg-white p-6 rounded-3xl text-center border-2 border-[#FFEDD5] hover:border-[#FBBF24] transition-colors shadow-sm cursor-pointer">
 <div className="text-6xl mb-4">🥮</div>
 <h3 className="font-black text-xl mb-1">Kol Böreği</h3>
 <p className="font-bold text-sm">Kıymalı & Peynirli</p>
 </div>
 </div>
 </div>
 </section>
 )
}

export function PastaneSimitFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 text-center " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="flex items-center justify-center gap-2 font-heading font-black text-3xl mb-4 opacity-70">
 <Wheat className="w-8 h-8" /> {businessData.name}
 </div>
 <p className="font-bold text-lg">{businessData.address}</p>
 </footer>
 )
}

registerSection('hero', 'pastanesimit_hero_0', PastaneSimitRUSTICHEADER)
registerSection('hero', 'pastanesimit_hero_1', PastaneSimitWARMHERO)
registerSection('services', 'pastanesimit_services_2', PastaneSimitFRESHPRODUCTS)
registerSection('footer', 'pastanesimit_footer_3', PastaneSimitFOOTER)
