// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Ampersand, Speaker, Drum, Guitar } from 'lucide-react'

export function MuzikRockGRITTYHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="px-6 py-6 border-b-2 border-[#DC2626]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
 <div className="font-heading font-black text-4xl tracking-tighter uppercase text-white uppercase italic">
 {businessData.name} <span className="">STUDIO</span>
 </div>
 <div className="font-bold text-xl font-mono">
 {businessData.phone}
 </div>
 </div>
 </header>
 )
}

export function MuzikRockLOUDHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 md:py-32 px-6 text-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[800px] mx-auto">
 <p className="text-white px-3 py-1 text-xs font-black uppercase tracking-widest inline-block mb-8 transform -skew-x-12">
 Prova & Kayıt & Enstrüman
 </p>
 <h1 className="font-heading text-6xl md:text-8xl font-black text-white mb-6 uppercase leading-none italic drop-shadow-[4px_4px_0_#DC2626]">
 SESİ SONUNA KADAR <br/> AÇ.
 </h1>
 <p className="mb-12 text-lg uppercase tracking-wide font-medium">
 Full ekipmanlı yalıtımlı prova odaları, bateri ve elektro gitar dersleri. Grubunu kur, sahneye hazırlan!
 </p>
 <a href={`https://wa.me/${businessData.whatsapp}`} className="bg-transparent border-4 border-[#DC2626] text-white hover:opacity-90 px-10 py-4 font-black uppercase tracking-widest text-lg transition-colors inline-flex items-center gap-3">
 <Ampersand className="w-5 h-5"/> Prova Odası Kirala
 </a>
 </div>
 </section>
 )
}

export function MuzikRockEQUIPMENTCLASSES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-16 px-6 border-y-2 border-[#333333]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-8">
 
 <div className="border border-[#DC2626]/30 p-8 flex flex-col items-center text-center hover:/10 transition-colors">
 <Guitar className="w-16 h-16 mb-6" strokeWidth={1.5} />
 <h3 className="font-black text-2xl uppercase mb-3 text-white">Elektro Gitar & Bass</h3>
 <p className="font-medium text-sm leading-relaxed">Penalama teknikleri, riffler, sololar ve pedalboard kurulumu. Rock, Metal, Blues tarzlarında uzman eğitim.</p>
 </div>

 <div className="border border-[#DC2626]/30 p-8 flex flex-col items-center text-center hover:/10 transition-colors">
 <Drum className="w-16 h-16 mb-6" strokeWidth={1.5} />
 <h3 className="font-black text-2xl uppercase mb-3 text-white">Bateri / Davul</h3>
 <p className="font-medium text-sm leading-relaxed">Twin pedal, rudimentler ve groove çalışmaları. Akustik bateri kitleri ile izole odalarda sınırları zorla.</p>
 </div>

 <div className="border border-[#DC2626]/30 p-8 flex flex-col items-center text-center hover:/10 transition-colors">
 <Speaker className="w-16 h-16 mb-6" strokeWidth={1.5} />
 <h3 className="font-black text-2xl uppercase mb-3 text-white">Prova Stüdyosu</h3>
 <p className="font-medium text-sm leading-relaxed">Marshall kafa anfiler, Ampeg bass anfileri, Tama davullar ve full PA sistem ile profesyonel grup provaları.</p>
 </div>

 </div>
 </section>
 )
}

export function MuzikRockFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 text-center " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <p className="font-black text-3xl mb-2 tracking-tighter uppercase">{businessData.name} KICK ASS STUDIO</p>
 <p className="text-sm font-mono">{businessData.address} | LOUD SINCE {businessData.foundedYear}</p>
 </footer>
 )
}

registerSection('hero', 'muzikrock_hero_0', MuzikRockGRITTYHEADER)
registerSection('hero', 'muzikrock_hero_1', MuzikRockLOUDHERO)
registerSection('services', 'muzikrock_services_2', MuzikRockEQUIPMENTCLASSES)
registerSection('footer', 'muzikrock_footer_3', MuzikRockFOOTER)
