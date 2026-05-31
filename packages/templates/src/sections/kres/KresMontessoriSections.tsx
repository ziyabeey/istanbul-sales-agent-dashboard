// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Leaf, Puzzle, Move, MessageCircle, MapPinHouse } from 'lucide-react'

export function KresMontessoriHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="sticky top-0 z-50 /90 backdrop-blur-md border-b border-[#E8E2D9]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto px-8 h-24 flex items-center justify-between">
 <div className="font-heading font-medium text-3xl tracking-wide flex items-center gap-3 ">
 <Leaf className="w-8 h-8 " strokeWidth={1.5} />
 {businessData.name}
 </div>
 <nav className="hidden md:flex gap-10">
 <a href="#felsefemiz" className="font-medium hover:opacity-90 transition-colors">Felsefemiz</a>
 <a href="#materyaller" className="font-medium hover:opacity-90 transition-colors">Materyaller</a>
 <a href="#iletisim" className="font-medium hover:opacity-90 transition-colors">Başvuru</a>
 </nav>
 </div>
 </header>
 )
}

export function KresMontessoriHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 md:py-32 px-8" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center">
 <div className="uppercase tracking-[0.3em] text-sm font-semibold mb-8">
 Gerçek Hayata Hazırlık
 </div>
 <h1 className="font-heading text-5xl md:text-7xl font-normal leading-[1.1] mb-8 max-w-4xl">
 "Bana kendi başıma <br/>
 yapabilmem için <span className="italic">yardım et.</span>"
 </h1>
 <p className="text-xl md:text-2xl mb-12 max-w-2xl font-light leading-relaxed">
 Çocuğunuzun bireysel hızına saygı duyan, doğal materyallerle bezenmiş özgür bir öğrenme ortamı.
 </p>
 <a href="#iletisim" className="px-8 py-4 text-sm tracking-[0.2em] uppercase hover:opacity-90 transition-colors duration-500">
 Okul Turu Randevusu
 </a>
 </div>
 </section>
 )
}

export function KresMontessoriFELSEFEMIZ({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="felsefemiz" className="py-24 px-8 " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center">
 <div>
 <h2 className="font-heading text-4xl mb-6 ">Hazırlanmış Ortam</h2>
 <p className="text-lg font-light leading-loose mb-6">
 Sınıflarımız karma yaş grubuna uygun olarak tasarlanmıştır. Çocuklar, kendi seçtikleri Montessori materyalleriyle, kendi hızlarında ve bağımsız bir şekilde çalışırlar.
 </p>
 <p className="text-lg font-light leading-loose">
 Rehberlerimiz (öğretmenlerimiz) çocuğun gelişimini incelikle gözlemler ve ona doğru zamanda doğru materyali sunar.
 </p>
 </div>
 <div className="grid grid-cols-2 gap-4">
 <div className="aspect-[4/5] rounded-sm flex items-center justify-center p-6 text-center border border-[#DCD3C6]">
 <div>
 <Puzzle className="w-10 h-10 mx-auto mb-4" strokeWidth={1} />
 <h3 className="font-medium mb-2">Duyusal Gelişim</h3>
 <p className="text-sm font-light">Eşleştirme ve sıralama klasikleri.</p>
 </div>
 </div>
 <div className="aspect-[4/5] rounded-sm flex items-center justify-center p-6 text-center transform translate-y-8">
 <div>
 <Move className="w-10 h-10 mx-auto mb-4" strokeWidth={1} />
 <h3 className="font-medium mb-2">Günlük Yaşam</h3>
 <p className="text-sm font-light">Özbakım ve ince motor becerileri.</p>
 </div>
 </div>
 </div>
 </div>
 </section>
 )
}

export function KresMontessoriILETISIM({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="iletisim" className="py-32 px-8" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[800px] mx-auto border-t border-[#E8E2D9] pt-16 text-center">
 <h2 className="font-heading text-4xl mb-8">Ailemize Katılın</h2>
 <p className="text-lg font-light mb-12">
 Gözlem yapmak ve eğitim yaklaşımımızı yakından tanımak için lütfen form doldurunuz veya bizimle iletişime geçiniz.
 </p>
 
 <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
 <a href={`tel:${businessData.phoneClean}`} className="flex items-center justify-center gap-3 px-8 py-4 border border-[#2C2620] hover:opacity-90 hover:opacity-90 transition-colors text-sm font-medium tracking-wide">
 <MessageCircle className="w-5 h-5" strokeWidth={1.5} /> {businessData.phone}
 </a>
 <div className="flex items-center justify-center gap-3 px-8 py-4 text-sm font-medium tracking-wide">
 <MapPinHouse className="w-5 h-5 " strokeWidth={1.5} /> {businessData.district}, {businessData.city}
 </div>
 </div>
 </div>
 </section>
 )
}

export function KresMontessoriFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 text-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading text-xl mb-4 ">{businessData.name}</div>
 <p className="text-xs tracking-[0.2em] font-light uppercase">© {new Date().getFullYear()} — Montessori Çocuk Evi</p>
 </footer>
 )
}

registerSection('hero', 'kresmontessori_hero_0', KresMontessoriHEADER)
registerSection('hero', 'kresmontessori_hero_1', KresMontessoriHERO)
registerSection('services', 'kresmontessori_services_2', KresMontessoriFELSEFEMIZ)
registerSection('services', 'kresmontessori_services_3', KresMontessoriILETISIM)
registerSection('footer', 'kresmontessori_footer_4', KresMontessoriFOOTER)
