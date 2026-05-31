// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { LayoutGrid, Ruler, Layers, MoveRight } from 'lucide-react'

export function MobilyaMutfakCLEANHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="bg-white px-6 py-5 sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.03)]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto flex items-center justify-between">
 <div className="font-heading font-black text-2xl uppercase tracking-tighter flex items-center gap-2">
 <div className="grid grid-cols-2 gap-[2px]">
 <div className="w-3 h-3 "></div><div className="w-3 h-3 "></div>
 <div className="w-3 h-3 "></div><div className="w-3 h-3 "></div>
 </div>
 {businessData.name}
 </div>
 <a href={`tel:${businessData.phoneClean}`} className="text-white px-6 py-2 pb-1.5 uppercase font-bold text-sm hover:opacity-90 transition-colors rounded-sm">
 Ücretsiz Keşif
 </a>
 </div>
 </header>
 )
}

export function MobilyaMutfakSTRUCTURALHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 md:py-32 relative text-center bg-white border-b border-[#E2E8F0]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[900px] mx-auto">
 <p className="font-bold tracking-widest uppercase text-sm mb-6 flex items-center justify-center gap-2">
 <Ruler className="w-4 h-4"/> Modüler Mutfak & Banyo Sistemleri
 </p>
 <h1 className="font-heading text-5xl md:text-7xl font-black mb-8 leading-[1.05] tracking-tight">
 Her Santimetreyi <br/> <span className="">Akıllıca Tasarlayın.</span>
 </h1>
 <p className="text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
 Akrilik, lake veya membran kapaklar; çizilmez tezgahlar ve frenli mekanizmalar. 
 Mekanın ölçüsüne özel, 3D çizim destekli anahtar teslim mutfak ve banyo dolapları.
 </p>
 <div className="flex justify-center">
 <a href={`https://wa.me/${businessData.whatsapp}`} className="bg-transparent border-2 border-[#0F172A] hover:opacity-90 hover:text-white px-10 py-4 uppercase font-bold tracking-widest transition-colors flex items-center gap-4 group rounded-sm">
 Çizim Talep Et <MoveRight className="w-5 h-5 group-hover:translate-x-2 transition-transform"/>
 </a>
 </div>
 </div>
 </section>
 )
}

export function MobilyaMutfakMATERIALCARDS({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto">
 <h2 className="font-heading text-4xl font-black mb-16 text-center">Tasarım & Malzeme</h2>
 
 <div className="grid md:grid-cols-2 gap-8">
 <div className="bg-white p-10 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow">
 <Layers className="w-12 h-12 mb-6" />
 <h3 className="text-2xl font-black mb-4 uppercase">Akrilik & MDF Lam Kapaklar</h3>
 <p className="font-medium leading-relaxed mb-6">
 Suya ve neme dayanıklı üst düzey MDF gövde, yüksek parlaklıkta veya mat dokulu çizilmez akrilik yüzeyler. Kolay temizlenebilir pürüzsüz yapı.
 </p>
 <div className="flex gap-2">
 <span className="px-3 py-1 text-xs font-bold uppercase rounded-sm">High-Gloss</span>
 <span className="px-3 py-1 text-xs font-bold uppercase rounded-sm">Mat Kapak</span>
 </div>
 </div>

 <div className="bg-white p-10 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow">
 <LayoutGrid className="w-12 h-12 mb-6" />
 <h3 className="text-2xl font-black mb-4 uppercase">Akıllı Donanım Sistemleri</h3>
 <p className="font-medium leading-relaxed mb-6">
 Blum ve Hettich marka çekmece rayları, frenli menteşeler, köşe döner sepetler ve kiler sistemleri ile kör noktaları bile maksimum verimlilikle kullanın.
 </p>
 <div className="flex gap-2">
 <span className="px-3 py-1 text-xs font-bold uppercase rounded-sm">Yavaş Kapanır</span>
 <span className="px-3 py-1 text-xs font-bold uppercase rounded-sm">LED Aydınlatma</span>
 </div>
 </div>
 </div>
 </div>
 </section>
 )
}

export function MobilyaMutfakFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 text-center border-t-4 border-[#0284C7]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <p className="font-heading text-white text-2xl font-black tracking-tight mb-2">{businessData.name}</p>
 <p className="text-sm font-medium uppercase tracking-widest">Kitchen & Bath Design Studio</p>
 </footer>
 )
}

registerSection('hero', 'mobilyamutfak_hero_0', MobilyaMutfakCLEANHEADER)
registerSection('hero', 'mobilyamutfak_hero_1', MobilyaMutfakSTRUCTURALHERO)
registerSection('services', 'mobilyamutfak_services_2', MobilyaMutfakMATERIALCARDS)
registerSection('footer', 'mobilyamutfak_footer_3', MobilyaMutfakFOOTER)
