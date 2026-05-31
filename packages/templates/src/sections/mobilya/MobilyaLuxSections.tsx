// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Diamond, TriangleRight, Gem } from 'lucide-react'

export function MobilyaLuxOPULENTHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="px-8 py-8 md:py-12 absolute w-full z-50" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="flex items-center justify-between border-b border-[#222222] pb-6">
 <div className="font-heading font-black text-3xl md:text-5xl tracking-tighter uppercase ">
 {businessData.name}
 </div>
 <div className="hidden md:block uppercase tracking-[0.5em] font-medium ">
 Interior Haute Couture
 </div>
 </div>
 </header>
 )
}

export function MobilyaLuxAVANTGARDEHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="h-screen py-32 px-8 flex flex-col justify-end relative overflow-hidden group" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {/* Abstract Gold Background */}
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] max-h-[800px] -z-10 blur-3xl opacity-50 block"></div>
 
 <div className="max-w-[1400px] w-full mx-auto relative z-10">
 <p className="text-xs font-semibold tracking-[0.4em] mb-4 uppercase flex items-center gap-4">
 <Diamond className="w-3 h-3 fill-current" /> Premium Imported Collections
 </p>
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#222222] pb-12">
 <h1 className="font-heading text-6xl md:text-9xl font-black uppercase leading-[0.85] tracking-tighter text-white">
 Sessiz <br/> Lüks.
 </h1>
 <div className="max-w-sm">
 <p className="font-light leading-relaxed mb-8 text-sm">
 İtalyan mermeri, gerçek deri ve titanyum paslanmaz çelik ayaklar. Yaşam alanlarını sanat galerisine çeviren uluslararası ödüllü imzalı tasarımlar.
 </p>
 <a href={`tel:${businessData.phoneClean}`} className="inline-flex items-center gap-4 uppercase text-xs font-bold tracking-[0.2em] hover:text-white transition-colors">
 Tasarım Danışmanı <TriangleRight className="w-4 h-4" />
 </a>
 </div>
 </div>
 </div>
 </section>
 )
}

export function MobilyaLuxLUXURYCATALOG({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-32 px-8" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-24 items-center">
 
 <div className="order-2 md:order-1 flex flex-col justify-center">
 <Gem className="w-12 h-12 mb-12" strokeWidth={1} />
 <h2 className="font-heading text-5xl font-black uppercase tracking-tight mb-8">İmzalı <br/> <span className="font-light">Koleksiyonlar.</span></h2>
 <p className="leading-loose font-light mb-12">
 Ultra lüks konutlar, yalılar ve VIP ofisler için baştan uca projelendirme. Özel ölçü İtalyan chester kanepeler, mermer podyumlu yemek grupları.
 </p>
 <div className="grid grid-cols-2 gap-x-8 gap-y-6 text-xs uppercase tracking-[0.2em] font-medium border-l border-[#333] pl-6">
 <div>Titanium Detaylar</div>
 <div>İthal Nubuk Kumaş</div>
 <div>Calacatta Mermer</div>
 <div>Motorlu Recliner Sistem</div>
 </div>
 </div>

 <div className="order-1 md:order-2">
 {/* Monolith Placeholder */}
 <div className="w-full aspect-square border border-[#222] flex flex-col items-center justify-center p-12 text-center group-hover:border-[#D4AF37]/50 transition-colors">
 <div className="w-24 h-24 border border-[#333] rotate-45 mb-12 flex items-center justify-center group-hover:rotate-90 transition-transform duration-1000">
 <Diamond className="w-8 h-8 -rotate-45 group-hover:-rotate-90 transition-transform duration-1000" strokeWidth={1}/>
 </div>
 <div className="font-heading text-xl uppercase tracking-[0.5em] ">Exclusive Showroom</div>
 </div>
 </div>

 </div>
 </section>
 )
}

export function MobilyaLuxFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 px-8 border-t border-[#111111] flex flex-col md:flex-row justify-between items-center uppercase tracking-[0.3em] font-medium " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <p>{businessData.name} © {businessData.foundedYear}</p>
 <p className="">Premium Concept Store</p>
 </footer>
 )
}

registerSection('hero', 'mobilyalux_hero_0', MobilyaLuxOPULENTHEADER)
registerSection('hero', 'mobilyalux_hero_1', MobilyaLuxAVANTGARDEHERO)
registerSection('services', 'mobilyalux_services_2', MobilyaLuxLUXURYCATALOG)
registerSection('footer', 'mobilyalux_footer_3', MobilyaLuxFOOTER)
