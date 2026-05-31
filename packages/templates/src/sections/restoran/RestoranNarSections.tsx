// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Leaf, Clock, Phone } from 'lucide-react'

export function RestoranNarBISTROHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="px-6 py-6 border-b border-[#F0EAE1] bg-white/60 backdrop-blur-md sticky top-0 z-50" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto flex items-center justify-between">
 <div className="font-heading font-normal text-3xl tracking-tight flex items-center gap-2">
 {businessData.name}
 </div>
 <a href={`https://wa.me/${businessData.whatsapp}`} className="hover:opacity-90 transition-colors">
 <Phone className="w-5 h-5"/>
 </a>
 </div>
 </header>
 )
}

export function RestoranNarAESTHETICHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 md:py-32 relative text-center overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {/* Abstract BG Shapes */}
 <div className="absolute top-0 right-10 w-64 h-64 rounded-full blur-3xl -z-10"></div>
 <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full blur-3xl -z-10"></div>

 <div className="max-w-[700px] mx-auto">
 <p className="uppercase tracking-[0.25em] text-xs font-bold mb-6 flex items-center justify-center gap-2">
 <Leaf className="w-4 h-4" /> BISTRO & CAFE
 </p>
 <h1 className="font-heading text-5xl md:text-7xl mb-8 leading-[1.05] font-normal">
 Güne güzel bir <br/> <i className="">başlangıç</i>
 </h1>
 <p className="text-lg mb-10 font-light leading-relaxed max-w-xl mx-auto">
 Modern Akdeniz dokunuşlarıyla zenginleştirilmiş kahvaltı tabakları, taze demlenmiş bitki çayları ve mevsimsel lezzetler.
 </p>
 <div className="flex justify-center">
 <a href="#menu" className="font-semibold text-sm tracking-widest uppercase pb-1 border-b-2 border-[#D94F56] hover:opacity-90 transition-colors">
 Menüyü Keşfet
 </a>
 </div>
 </div>
 </section>
 )
}

export function RestoranNarFOCUSPLATES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 bg-white" id="menu" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1100px] mx-auto">
 <div className="grid md:grid-cols-2 gap-16 items-center">
 
 <div className="space-y-12">
 <div className="group">
 <p className="text-xs font-bold uppercase tracking-widest mb-2">Signature</p>
 <h3 className="font-heading text-2xl mb-1 ">Nar Serpme Kahvaltı</h3>
 <p className="font-light leading-relaxed mb-2">3 çeşit peynir tabağı, ev yapımı narlı reçel, sıcak pişi, zeytin piyazı, sucuklu yumurta ve sınırsız demlik çay.</p>
 <span className="font-bold ">İki Kişilik • 550 ₺</span>
 </div>

 <div className="group">
 <p className="text-xs font-bold uppercase tracking-widest mb-2">Healthy</p>
 <h3 className="font-heading text-2xl mb-1 ">Poşe Yumurtalı Avokado Tost</h3>
 <p className="font-light leading-relaxed mb-2">Ekşi mayalı tam buğday ekmeği üzerinde, taze avokado ezmesi ve poşe yumurta.</p>
 <span className="font-bold ">Tek Kişilik • 180 ₺</span>
 </div>
 </div>

 <div className="h-[500px] rounded-[2rem] flex flex-col items-center justify-center text-center p-12 border border-[#E9F0EE]">
 <span className="text-6xl mb-6">🍳</span>
 <p className="font-heading text-3xl font-normal mb-4">Her gün 15:00'e kadar <br/> kahvaltı servisi.</p>
 <p className="uppercase tracking-widest text-sm"><Clock className="w-4 h-4 inline pb-[2px]"/> Weekend Brunch</p>
 </div>

 </div>
 </div>
 </section>
 )
}

export function RestoranNarFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-16 text-center border-t border-[#F0EAE1]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <p className="font-heading text-2xl mb-2 ">{businessData.name}</p>
 <p className="text-sm font-light uppercase tracking-widest">{businessData.city}</p>
 </footer>
 )
}

registerSection('hero', 'restorannar_hero_0', RestoranNarBISTROHEADER)
registerSection('hero', 'restorannar_hero_1', RestoranNarAESTHETICHERO)
registerSection('services', 'restorannar_services_2', RestoranNarFOCUSPLATES)
registerSection('footer', 'restorannar_footer_3', RestoranNarFOOTER)
