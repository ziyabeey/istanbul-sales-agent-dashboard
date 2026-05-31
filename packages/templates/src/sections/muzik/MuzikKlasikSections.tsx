// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { ScrollText, Music2, Quote, PlayCircle } from 'lucide-react'

export function MuzikKlasikELEGANTHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="bg-transparent absolute top-0 w-full z-50 py-8 px-6" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1000px] mx-auto flex items-center justify-between border-b border-[#D4C3B3] pb-6">
 <div className="font-serif italic text-3xl font-medium tracking-wide flex items-center gap-3">
 <ScrollText className="w-8 h-8 " strokeWidth={1}/>
 {businessData.name}
 </div>
 <a href={`tel:${businessData.phoneClean}`} className="uppercase tracking-[0.2em] text-xs font-medium hover:opacity-90 transition-colors">
 Kabul & Başvuru ➔
 </a>
 </div>
 </header>
 )
}

export function MuzikKlasikTRADITIONALHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="pt-40 pb-24 px-6 relative text-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[800px] mx-auto">
 <p className="uppercase tracking-[0.3em] text-sm mb-6 border-l border-r border-[#D4C3B3] inline-block px-6">Konservatuvara Hazırlık & ABRSM</p>
 <h1 className="font-serif text-5xl md:text-7xl font-normal mb-8 leading-[1.15]">
 Klasik Müziğin <br/> Zarafetini <span className="italic ">Hissedin.</span>
 </h1>
 <p className="text-lg font-light mb-12 leading-loose max-w-2xl mx-auto">
 Alanında uzman akademisyenler eşliğinde piyano, keman ve viyolonsel eğitimleri. Uluslararası geçerliliğe sahip sertifika programları ile akademik disiplin.
 </p>
 <div className="flex justify-center">
 <a href={`https://wa.me/${businessData.whatsapp}`} className="border border-[#451A03] px-10 py-4 uppercase tracking-[0.1em] text-sm hover:opacity-90 hover:opacity-90 transition-colors flex items-center gap-3">
 <PlayCircle className="w-5 h-5" strokeWidth={1.5} /> Sınav Başvurusu
 </a>
 </div>
 </div>
 </section>
 )
}

export function MuzikKlasikCONSERVATORYPROGRAMS({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 border-y border-[#E6DFD3]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1000px] mx-auto">
 <div className="flex flex-col items-center mb-16 text-center">
 <Music2 className="w-10 h-10 mb-4" strokeWidth={1} />
 <h2 className="font-serif italic text-3xl md:text-4xl ">Akademik Branşlar</h2>
 </div>
 
 <div className="grid md:grid-cols-2 gap-12">
 <div className="bg-white p-12 shadow-sm border border-[#E6DFD3]">
 <h3 className="font-serif text-2xl mb-4 border-b border-[#E6DFD3] pb-4">Piyano Ana Sanat Dalı</h3>
 <p className="font-light leading-relaxed mb-6 text-sm">
 Klasik dönemden romantik döneme, teknik altyapıyı güçlendiren ve estetik duyarlılığı artıran birebir piyanist eğitimi. Grand piyanolar ile gerçek tuşe deneyimi.
 </p>
 <span className="uppercase tracking-widest ">London College of Music</span>
 </div>

 <div className="bg-white p-12 shadow-sm border border-[#E6DFD3]">
 <h3 className="font-serif text-2xl mb-4 border-b border-[#E6DFD3] pb-4">Yaylı Çalgılar</h3>
 <p className="font-light leading-relaxed mb-6 text-sm">
 Keman, Viyola ve Çello. Doğru duruş, yay teknikleri, entonasyon ve müzikal ifade üzerine yoğunlaşan detaylı konservatuvar müfredatı.
 </p>
 <span className="uppercase tracking-widest ">ABRSM Royal Academy</span>
 </div>
 </div>
 </div>
 </section>
 )
}

export function MuzikKlasikFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-20 text-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <Quote className="w-6 h-6 mx-auto mb-6" fill="currentColor"/>
 <p className="font-serif italic text-xl max-w-lg mx-auto mb-10">
 "Müzik, ruhun günlük hayatın tozlarından arınmasıdır."
 </p>
 <div className="uppercase tracking-[0.2em] text-xs font-semibold ">
 {businessData.name} — EST. {businessData.foundedYear}
 </div>
 </footer>
 )
}

registerSection('hero', 'muzikklasik_hero_0', MuzikKlasikELEGANTHEADER)
registerSection('hero', 'muzikklasik_hero_1', MuzikKlasikTRADITIONALHERO)
registerSection('services', 'muzikklasik_services_2', MuzikKlasikCONSERVATORYPROGRAMS)
registerSection('footer', 'muzikklasik_footer_3', MuzikKlasikFOOTER)
