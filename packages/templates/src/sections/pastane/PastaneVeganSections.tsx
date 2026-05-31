// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Leaf, Apple, HeartHandshake } from 'lucide-react'

export function PastaneVeganFRESHHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="px-6 py-4 sticky top-0 z-50" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto flex items-center justify-between">
 <div className="font-heading font-black text-xl tracking-tighter uppercase flex items-center gap-2">
 <Leaf className="w-6 h-6 " />
 {businessData.name}
 </div>
 <a href={`tel:${businessData.phoneClean}`} className="hover:opacity-90 text-white px-6 py-2 rounded-full font-bold uppercase text-xs tracking-wider transition-colors">
 Online Sipariş
 </a>
 </div>
 </header>
 )
}

export function PastaneVeganNATURALHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 md:py-32 relative text-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[900px] mx-auto relative z-10">
 <div className="inline-block px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest mb-8 border border-[#86EFAC]">
 %100 Bitkisel & Şekersiz
 </div>
 <h1 className="font-heading text-5xl md:text-7xl font-black mb-8 leading-[1.0] tracking-tighter ">
 Saf Beslen,<br/>
 <span className="">İyi Yaşa.</span>
 </h1>
 <p className="text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
 Rafine şekersiz, glutensiz ve vegan atıştırmalıklar. Meyve özleri ve kuruyemişlerle hazırlanan suçluluk hissettirmeyen sağlıklı tatlılar.
 </p>
 <div className="flex flex-col sm:flex-row justify-center gap-4">
 <a href={`https://wa.me/${businessData.whatsapp}`} className="text-white px-10 py-5 rounded-full font-black text-lg uppercase tracking-wide hover:opacity-90 transition-colors shadow-lg shadow-[#86EFAC]">
 Menüyü İncele
 </a>
 </div>
 </div>
 </section>
 )
}

export function PastaneVeganHEALTHYPRODUCTS({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 px-6 bg-white border-y border-[#DCFCE7] rounded-t-[3rem]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-8">
 
 <div className="p-8 rounded-[2rem] border border-[#BBF7D0] text-center">
 <div className="text-5xl mb-6">🥑</div>
 <h3 className="text-2xl font-black mb-2 ">Raw Cake</h3>
 <p className="font-medium leading-relaxed text-sm">Hurma, kaju ve hindistan cevizi sütü ile pişirilmeden hazırlanan çiğ pastalar.</p>
 </div>

 <div className="p-8 rounded-[2rem] border border-[#BBF7D0] text-center">
 <div className="text-5xl mb-6">🍪</div>
 <h3 className="text-2xl font-black mb-2 ">Glutensiz Kurabiye</h3>
 <p className="font-medium leading-relaxed text-sm">Yulaf ve badem unu ile yapılan, elma suyu konsantresiyle tatlandırılmış kurabiyeler.</p>
 </div>

 <div className="p-8 rounded-[2rem] border border-[#BBF7D0] text-center">
 <div className="text-5xl mb-6">🌾</div>
 <h3 className="text-2xl font-black mb-2 ">Ekşi Maya Ekmek</h3>
 <p className="font-medium leading-relaxed text-sm">Karabuğday unu ve doğal fermantasyon ile tamamen glutensiz fırın ürünleri.</p>
 </div>

 </div>
 </section>
 )
}

export function PastaneVeganFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 text-center text-sm font-bold uppercase tracking-widest" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <HeartHandshake className="w-8 h-8 mx-auto mb-4 " />
 {businessData.name} PLANT-BASED BAKERY
 </footer>
 )
}

registerSection('hero', 'pastanevegan_hero_0', PastaneVeganFRESHHEADER)
registerSection('hero', 'pastanevegan_hero_1', PastaneVeganNATURALHERO)
registerSection('services', 'pastanevegan_services_2', PastaneVeganHEALTHYPRODUCTS)
registerSection('footer', 'pastanevegan_footer_3', PastaneVeganFOOTER)
