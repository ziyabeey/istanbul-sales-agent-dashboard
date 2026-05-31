// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Sparkles, Wind } from 'lucide-react'

export function SporZenCALMHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="px-8 py-6 flex items-center justify-between sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#F3E8FF]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading text-2xl tracking-wide flex items-center gap-3">
 <Wind className="w-6 h-6 stroke-1" />
 {businessData.name}
 </div>
 <a href={`https://wa.me/${businessData.whatsapp}`} className="hover:opacity-90 transition-colors text-sm uppercase tracking-widest">
 Sınıf Rezervasyonu
 </a>
 </header>
 )
}

export function SporZenMINDFULHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 md:py-36 px-6 text-center relative overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {/* Soft glowing orb */}
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px] -z-10 opacity-70"></div>
 
 <div className="max-w-[700px] mx-auto">
 <p className="uppercase tracking-[0.3em] font-semibold text-xs mb-8">
 Holistik Yaşam Merkezi
 </p>
 <h1 className="font-heading text-5xl md:text-7xl mb-8 leading-[1.2] ">
 Nefes al, <br/> 
 <i className="font-light">dengeni bul.</i>
 </h1>
 <p className="text-lg font-light leading-loose max-w-xl mx-auto mb-12">
 Günlük hayatın koşuşturmasından uzaklaşın. Yoga, meditasyon ve farkındalık pratikleri ile bedeninizi ve zihninizi yenileyin.
 </p>
 <a href="#pratikler" className="border-b-2 border-[#C4B5FD] pb-1 font-medium tracking-wide hover:border-[#8B5CF6] transition-colors">
 Pratiklerimizi Keşfet
 </a>
 </div>
 </section>
 )
}

export function SporZenPRACTICESSERVICES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 bg-white" id="pratikler" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1000px] mx-auto">
 <h2 className="font-heading text-4xl text-center mb-20 ">Stüdyo Pratikleri</h2>
 
 <div className="grid md:grid-cols-3 gap-12">
 
 <div className="text-center group">
 <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500">
 <Wind className="w-10 h-10 stroke-1" />
 </div>
 <h3 className="font-heading text-2xl mb-4 ">Vinyasa Akışı</h3>
 <p className="font-light leading-relaxed">Nefes ve hareketin sarmal uyumu. Esneklik, güç ve odaklanma için dinamik yoga pratikleri.</p>
 </div>

 <div className="text-center group">
 <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500">
 <Sparkles className="w-10 h-10 stroke-1" />
 </div>
 <h3 className="font-heading text-2xl mb-4 ">Mindfulness Meditasyon</h3>
 <p className="font-light leading-relaxed">Zihni sakinleştiren, stres seviyesini düşüren derin dinlenme ve farkındalık seansları.</p>
 </div>

 <div className="text-center group">
 <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500">
 <div className="text-3xl">🌿</div>
 </div>
 <h3 className="font-heading text-2xl mb-4 ">Restoratif Yoga</h3>
 <p className="font-light leading-relaxed">Destekleyici ekipmanlarla yavaş, pasif esnemeler. Derin kas gevşemesi ve sinir sistemi onarımı.</p>
 </div>

 </div>
 </div>
 </section>
 )
}

export function SporZenFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-20 text-center border-t border-[#F3E8FF]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading text-3xl mb-6">{businessData.name}</div>
 <p className="text-sm tracking-[0.2em] uppercase font-medium leading-loose">
 Inner Peace & Wellness <br/> {businessData.city}
 </p>
 </footer>
 )
}

registerSection('hero', 'sporzen_hero_0', SporZenCALMHEADER)
registerSection('hero', 'sporzen_hero_1', SporZenMINDFULHERO)
registerSection('services', 'sporzen_services_2', SporZenPRACTICESSERVICES)
registerSection('footer', 'sporzen_footer_3', SporZenFOOTER)
