// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Hammer, PencilRuler, Trees, MoveRight } from 'lucide-react'

export function MobilyaOzelARTISANALHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="px-6 py-8 absolute w-full z-50" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto flex items-center justify-between border-b border-[#D5CEC4] pb-6">
 <div className="font-heading font-medium text-3xl tracking-widest uppercase">
 {businessData.name}
 </div>
 <a href={`tel:${businessData.phoneClean}`} className="hidden md:block font-serif italic hover:opacity-90 transition-colors">
 {businessData.phone}
 </a>
 </div>
 </header>
 )
}

export function MobilyaOzelBESPOKEHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="pt-40 pb-24 px-6 text-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[900px] mx-auto">
 <p className="font-serif italic text-xl mb-6">Özel Üretim & Masif Ahşap Atölyesi</p>
 <h1 className="font-heading text-6xl md:text-8xl font-normal mb-10 leading-[1.1] uppercase tracking-wide">
 Fabrikasyon Değil, <br/> El İşçiliği.
 </h1>
 <p className="mb-16 text-lg max-w-2xl mx-auto leading-loose font-light">
 Size özel ölçülerde, hakiki meşe ve ceviz ağaçlarından işlenmiş, pirinç ve epoksi detaylarla zenginleştirilmiş siparişe özel üretim mobilyalar tasarlıyoruz.
 </p>
 <div className="flex justify-center">
 <a href={`https://wa.me/${businessData.whatsapp}`} className="border-2 border-[#14532D] hover:opacity-90 hover:text-white px-12 py-5 uppercase tracking-[0.2em] font-medium text-xs transition-colors flex items-center gap-3">
 Atölye Ziyareti <MoveRight className="w-4 h-4" />
 </a>
 </div>
 </div>
 </section>
 )
}

export function MobilyaOzelCRAFTSMANSHIPDETAILS({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center">
 <div>
 <Hammer className="w-8 h-8 mb-8" />
 <h2 className="font-heading text-4xl md:text-5xl uppercase tracking-wider mb-8 leading-tight">Zanaatin <br/> <span className="font-serif italic text-white normal-case tracking-normal">İncelikleri</span></h2>
 <p className="leading-loose font-light mb-8 max-w-md">
 Endüstriyel seri üretim hatlarından uzak, tamamen terzi usulü çalışan bir ahşap atölyesiyiz. Mimarınızın çizimlerini gerçeğe dönüştürüyoruz.
 </p>
 <ul className="space-y-4 font-serif italic text-lg text-white">
 <li>— Doğal Kenar Cehiz Masalar</li>
 <li>— Epoksi Karma Sehpalar</li>
 <li>— Özel Ölçü TV Üniteleri ve Kütüphane</li>
 <li>— CNC Oyma İşlemeli Paneller</li>
 </ul>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="aspect-[3/4] flex flex-col items-center justify-center p-6 text-center text-white border border-[#2B8650]">
 <Trees className="w-8 h-8 mb-4 opacity-50" />
 <span className="font-serif italic text-xl">Masif Ahşap</span>
 </div>
 <div className="aspect-[3/4] mt-12 flex flex-col items-center justify-center p-6 text-center text-white border border-[#2B8650]">
 <PencilRuler className="w-8 h-8 mb-4 opacity-50" />
 <span className="font-serif italic text-xl">3D Tasarım</span>
 </div>
 </div>
 </div>
 </section>
 )
}

export function MobilyaOzelFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-24 text-center border-t border-[#D5CEC4] mt-24" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <p className="font-heading text-2xl tracking-[0.3em] uppercase mb-4 ">{businessData.name}</p>
 <p className="font-serif italic ">Bespoke Carpentry & Design in {businessData.city}</p>
 </footer>
 )
}

registerSection('hero', 'mobilyaozel_hero_0', MobilyaOzelARTISANALHEADER)
registerSection('hero', 'mobilyaozel_hero_1', MobilyaOzelBESPOKEHERO)
registerSection('services', 'mobilyaozel_services_2', MobilyaOzelCRAFTSMANSHIPDETAILS)
registerSection('footer', 'mobilyaozel_footer_3', MobilyaOzelFOOTER)
