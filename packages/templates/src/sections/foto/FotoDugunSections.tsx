// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Camera, MapPin, Sparkles, MoveRight } from 'lucide-react'

export function FotoDugunROMANTICHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="px-6 py-8 absolute w-full z-50" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto flex items-center justify-between border-b border-[#DCD5C6] pb-6">
 <div className="font-heading font-normal text-3xl tracking-widest uppercase">
 {businessData.name}
 </div>
 <a href={`tel:${businessData.phoneClean}`} className="hidden md:block font-serif italic hover:opacity-90 transition-colors">
 {businessData.phone}
 </a>
 </div>
 </header>
 )
}

export function FotoDugunCINEMATICHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="pt-40 pb-24 px-6 text-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[900px] mx-auto">
 <p className="font-serif italic text-xl mb-6">Fine Art Wedding Photography</p>
 <h1 className="font-heading text-6xl md:text-8xl font-normal mb-10 leading-[1.1] uppercase tracking-wide">
 Zamansız <br/> Romantizm.
 </h1>
 <p className="mb-16 text-lg max-w-2xl mx-auto leading-loose font-light">
 Düğün gününüzün her nefesini, en doğal ve sinematik haliyle bir hikayeye dönüştürüyoruz. Sadece fotoğraf çekmiyor, mirası ölümsüzleştiriyoruz.
 </p>
 <div className="flex justify-center">
 <a href={`https://wa.me/${businessData.whatsapp}`} className="border border-[#2C2724] px-12 py-5 uppercase tracking-[0.2em] font-medium text-xs hover:opacity-90 hover:text-white transition-all flex items-center gap-3">
 Portfolyo İste <MoveRight className="w-4 h-4" />
 </a>
 </div>
 </div>
 </section>
 )
}

export function FotoDugunEDITORIALGALLERYHIGHLIGHT({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center">
 <div>
 <Sparkles className="w-8 h-8 mb-8" />
 <h2 className="font-heading text-4xl md:text-5xl uppercase tracking-wider mb-8 leading-tight">Göz Alıcı <br/> <span className="font-serif italic normal-case tracking-normal">Detaylar</span></h2>
 <p className="leading-loose font-light mb-8 max-w-md">
 Hazırlık aşamasından ilk dansa, dış mekan çekimlerinden drone ile havadan sinematik klip kesitlerine kadar kusursuz bir kurgu sunuyoruz.
 </p>
 <ul className="space-y-4 font-serif italic text-lg ">
 <li>— Save the Date Çekimleri</li>
 <li>— Düğün Hikayesi (Belgesel)</li>
 <li>— Dış Mekan / Plato Kurguları</li>
 <li>— Özel Tasarım Fine-Art Albümler</li>
 </ul>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="aspect-[3/4] flex items-center justify-center p-6 text-center border border-[#4A433E]">
 <span className="font-serif italic text-xl">Doğal Işık</span>
 </div>
 <div className="aspect-[3/4] mt-12 flex items-center justify-center p-6 text-center border border-[#4A433E]">
 <span className="font-serif italic text-xl">Sinematik Klip</span>
 </div>
 </div>
 </div>
 </section>
 )
}

export function FotoDugunFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-24 text-center border-t border-[#DCD5C6] mt-24" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <p className="font-heading text-2xl tracking-[0.3em] uppercase mb-4">{businessData.name}</p>
 <p className="font-serif italic ">Capturing {businessData.city} since {businessData.foundedYear}</p>
 </footer>
 )
}

registerSection('hero', 'fotodugun_hero_0', FotoDugunROMANTICHEADER)
registerSection('hero', 'fotodugun_hero_1', FotoDugunCINEMATICHERO)
registerSection('gallery', 'fotodugun_gallery_2', FotoDugunEDITORIALGALLERYHIGHLIGHT)
registerSection('footer', 'fotodugun_footer_3', FotoDugunFOOTER)
