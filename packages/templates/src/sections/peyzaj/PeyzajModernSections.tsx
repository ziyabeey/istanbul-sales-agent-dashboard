// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Square, Diamond, Layers, ArrowRight } from 'lucide-react'

export function PeyzajModernARCHITECTURALHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="bg-white border-b border-[#DEE2E6] sticky top-0 z-50" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
 <div className="font-heading font-black text-2xl tracking-tighter flex items-center gap-3">
 <div className="w-8 h-8 flex items-center justify-center rounded-sm">
 <span className="font-black text-lg">M</span>
 </div>
 {businessData.name}
 </div>
 <div className="hidden md:flex items-center gap-8 font-bold text-xs uppercase tracking-widest ">
 <a href="#projeler" className="hover:opacity-90 transition-colors">Portfolyo</a>
 <a href="#hizmetler" className="hover:opacity-90 transition-colors">Hizmetler</a>
 <a href={`tel:${businessData.phoneClean}`} className="border-b-2 border-[#38D39F] pb-1 hover:opacity-90 transition-colors">
 İletişim
 </a>
 </div>
 </div>
 </header>
 )
}

export function PeyzajModernARCHITECTURALHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 md:py-32 border-b-8 border-[#343A40]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
 <div>
 <h1 className="font-heading text-5xl md:text-7xl font-black mb-8 leading-[1.05] tracking-tight ">
 Peyzajda <br/>
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#343A40] to-[#6C757D]">Geometrik Çizgiler.</span>
 </h1>
 <p className="text-lg font-medium mb-10 max-w-lg leading-relaxed">
 Bitki dokusu ve sert zeminlerin (hardscaping) kusursuz entegrasyonu. Beton, çimento ve ahşap materyallerle şekillenen modern, minimalist açık alan tasarımları.
 </p>
 <div className="flex gap-4">
 <a href="#hizmetler" className="text-white px-8 py-4 font-black uppercase text-xs tracking-[0.2em] hover:opacity-90 hover:opacity-90 transition-all inline-flex items-center gap-3">
 Tasarım Ekibi İle Görüş <ArrowRight className="w-4 h-4" />
 </a>
 </div>
 </div>
 
 <div className="hidden lg:grid grid-cols-2 gap-4">
 <div className="aspect-square mb-4"></div>
 <div className="aspect-square mt-12 flex items-center justify-center">
 <Square className="w-12 h-12 " strokeWidth={1} />
 </div>
 </div>
 </div>
 </section>
 )
}

export function PeyzajModernHARDSCAPINGFEATURES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="hizmetler" className="py-24 px-6 max-w-[1280px] mx-auto" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="grid md:grid-cols-3 gap-x-12 gap-y-16">
 <div>
 <div className="mb-6 w-16 h-16 flex items-center justify-center rounded-sm">
 <Square className="w-8 h-8 " strokeWidth={1} />
 </div>
 <h3 className="font-black text-xl mb-4 uppercase tracking-wide border-b-2 border-[#38D39F] pb-2 inline-block">Hardscaping</h3>
 <p className="font-medium leading-relaxed">
 Yürüyüş yolları, istinat duvarları, teraslamalar ve betonarme estetik yapı elemanları ile alanın yapısal mimarisini kuruyoruz.
 </p>
 </div>

 <div>
 <div className="mb-6 w-16 h-16 flex items-center justify-center rounded-sm">
 <Diamond className="w-8 h-8 " strokeWidth={1} />
 </div>
 <h3 className="font-black text-xl mb-4 uppercase tracking-wide border-b-2 border-[#38D39F] pb-2 inline-block">Fire Pits & Lounge</h3>
 <p className="font-medium leading-relaxed">
 Dış mekanda sosyal etkileşimi artıran ankastre ateş çukurları ve minimal oturma grupları (lounge alanları) tasarımı.
 </p>
 </div>

 <div>
 <div className="mb-6 w-16 h-16 flex items-center justify-center rounded-sm">
 <Layers className="w-8 h-8 " strokeWidth={1} />
 </div>
 <h3 className="font-black text-xl mb-4 uppercase tracking-wide border-b-2 border-[#38D39F] pb-2 inline-block">Minimalist Bitki Dokusu</h3>
 <p className="font-medium leading-relaxed">
 Az bakım gerektiren, geometrik formlu ağaç/çalı türleriyle ve monokromatik bahçe çakıllarıyla sağlanan sade görsel estetik.
 </p>
 </div>
 </div>
 </section>
 )
}

export function PeyzajModernFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-16 px-6 text-xs font-bold uppercase tracking-[0.2em] border-t-4 border-[#38D39F]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
 <div>{businessData.name} — Modern Lanscape Architects</div>
 <div>{businessData.city} Est. {businessData.foundedYear}</div>
 </div>
 </footer>
 )
}

registerSection('hero', 'peyzajmodern_hero_0', PeyzajModernARCHITECTURALHEADER)
registerSection('hero', 'peyzajmodern_hero_1', PeyzajModernARCHITECTURALHERO)
registerSection('services', 'peyzajmodern_services_2', PeyzajModernHARDSCAPINGFEATURES)
registerSection('footer', 'peyzajmodern_footer_3', PeyzajModernFOOTER)
