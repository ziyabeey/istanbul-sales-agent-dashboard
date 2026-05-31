// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Leaf, Bird, Locate, Sun } from 'lucide-react'

export function PeyzajOrganikORGANICHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="px-6 border-b border-[#E8DFD5]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1100px] mx-auto h-24 flex items-center justify-between">
 <div className="font-heading font-normal text-2xl flex items-center gap-3 ">
 <span className="p-2 rounded-full">
 <Leaf className="w-6 h-6 " strokeWidth={1.5} />
 </span>
 <span>{businessData.name}</span>
 </div>
 <div className="hidden sm:flex font-medium text-sm gap-8 items-center">
 <span>Ekolojik Tasarım</span>
 <span>Permakültür</span>
 <a href={`tel:${businessData.phoneClean}`} className="border border-[#4A3B32] px-6 py-2 rounded-full hover:opacity-90 hover:opacity-90 transition-colors">
 Tanışalım
 </a>
 </div>
 </div>
 </header>
 )
}

export function PeyzajOrganikEARTHYHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 md:py-32" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1100px] mx-auto text-center">
 <Sun className="w-16 h-16 mx-auto mb-8" strokeWidth={1} />
 <h1 className="font-heading text-5xl md:text-7xl font-normal mb-8 leading-[1.1]">
 Doğanın Ritmiyle <br/>
 <i className="">Uyumlu Bahçeler.</i>
 </h1>
 <p className="text-xl mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
 Yerel iklime uygun (xeriscaping) bitki türleri, kimyasal içermeyen organik gübreleme yöntemleri ve biyoçeşitliliği destekleyen sürdürülebilir tasarımlar yapıyoruz.
 </p>
 </div>
 </section>
 )
}

export function PeyzajOrganikAPPROACHCARDS({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 px-6 border-y border-[#E8DFD5]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1100px] mx-auto">
 <h2 className="font-heading text-3xl font-normal mb-16 text-center">Organik Peyzaj Felsefemiz</h2>
 
 <div className="grid md:grid-cols-3 gap-8">
 <div className="p-10 border border-[#E8DFD5] rounded-tl-3xl rounded-br-3xl hover:shadow-lg transition-shadow">
 <Locate className="w-10 h-10 mb-6" strokeWidth={1.5} />
 <h3 className="text-2xl font-semibold mb-4 ">Doğal Bitki Örtüsü</h3>
 <p className="leading-relaxed">Bölgenin yerel (native) bitkilerini kullanarak adaptasyon sürecini hızlandırıyor, su ve gübre ihtiyacını doğal yollarla minimuma indiriyoruz.</p>
 </div>

 <div className="p-10 border border-[#E8DFD5] rounded-tl-3xl rounded-br-3xl hover:shadow-lg transition-shadow">
 <Leaf className="w-10 h-10 mb-6" strokeWidth={1.5} />
 <h3 className="text-2xl font-semibold mb-4 ">Kimyasalsız Bakım</h3>
 <p className="leading-relaxed">Zararlı pestisitler yerine doğal kovucular, suni gübreler yerine kompost ve solucan gübresi ile toprağın mikrobiyal yaşamını zenginleştiriyoruz.</p>
 </div>

 <div className="p-10 border border-[#E8DFD5] rounded-tl-3xl rounded-br-3xl hover:shadow-lg transition-shadow">
 <Bird className="w-10 h-10 mb-6" strokeWidth={1.5} />
 <h3 className="text-2xl font-semibold mb-4 ">Biyoçeşitlilik</h3>
 <p className="leading-relaxed">Arıları, kelebekleri ve faydalı böcekleri bahçenize çekecek flora dizilimiyle, ekolojik dengeye katkıda bulunan mini ekosistemler kuruyoruz.</p>
 </div>
 </div>
 </div>
 </section>
 )
}

export function PeyzajOrganikFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-16 text-center font-medium text-sm " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <p className="mb-2">Organik Döngü Peyzaj Tasarımı.</p>
 <p>© 2024 — {businessData.city}</p>
 </footer>
 )
}

registerSection('hero', 'peyzajorganik_hero_0', PeyzajOrganikORGANICHEADER)
registerSection('hero', 'peyzajorganik_hero_1', PeyzajOrganikEARTHYHERO)
registerSection('services', 'peyzajorganik_services_2', PeyzajOrganikAPPROACHCARDS)
registerSection('footer', 'peyzajorganik_footer_3', PeyzajOrganikFOOTER)
