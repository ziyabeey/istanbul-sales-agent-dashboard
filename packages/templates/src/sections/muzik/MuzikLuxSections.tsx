// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { AudioLines, SlidersHorizontal, Disc3, MicVocal } from 'lucide-react'

export function MuzikLuxMINIMALPROHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="px-8 py-8 flex justify-between items-start absolute w-full z-50" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading font-medium text-xl uppercase tracking-[0.3em] ">
 {businessData.name} <br/>
 <span className="tracking-[0.5em]">RECORDING SUITE</span>
 </div>
 <div className="hidden md:flex gap-6 uppercase font-bold tracking-widest ">
 <span className="hover:opacity-90 transition-colors cursor-pointer">STUDIO A</span>
 <span className="hover:opacity-90 transition-colors cursor-pointer">MIXING & MASTERING</span>
 <span className="">BOOKING</span>
 </div>
 </header>
 )
}

export function MuzikLuxACOUSTICHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="h-screen py-32 flex flex-col justify-center px-8 relative overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {/* Analog Warmth Glow */}
 <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] rounded-full mix-blend-screen opacity-[0.05] blur-[150px] pointer-events-none"></div>

 <div className="max-w-[1200px] w-full mx-auto relative z-10">
 <AudioLines className="w-12 h-12 mb-12 opacity-80" strokeWidth={1} />
 <h1 className="font-heading text-5xl md:text-8xl font-black uppercase mb-8 leading-[0.9] tracking-tighter max-w-4xl text-white">
 Analog Sıcaklık,<br/> <span className="">Dijital Hassasiyet.</span>
 </h1>
 <p className="text-lg font-light mb-12 max-w-lg leading-relaxed mix-blend-plus-lighter">
 Hi-End ekipman parkuru, floating room (yüzer oda) mimarisi ile kusursuz akustik izolasyon. Müzik prodüksiyonunuzu endüstri standartlarına taşıyın.
 </p>
 <a href={`https://wa.me/${businessData.whatsapp}`} className="inline-flex items-center gap-4 uppercase text-xs font-bold tracking-[0.2em] border border-[#D97706]/30 px-6 py-3 hover:opacity-90 hover:opacity-90 transition-all">
 Stüdyo Randevusu Al
 </a>
 </div>
 </section>
 )
}

export function MuzikLuxPROSERVICES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-8 border-t border-[#1F1F1F]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-12">
 
 <div className="group">
 <MicVocal className="w-8 h-8 mb-6 group-hover:opacity-90 transition-colors" strokeWidth={1}/>
 <h3 className="text-xl font-bold uppercase tracking-wider mb-4 text-white">Ses Kayıt (Tracking)</h3>
 <p className="text-sm leading-relaxed font-light">
 Neumann, Telefunken mikrofonlar ve Neve preamplar ile enstrüman/vokal kayıtlarında kristal netliğinde duyum.
 </p>
 </div>

 <div className="group">
 <SlidersHorizontal className="w-8 h-8 mb-6 group-hover:opacity-90 transition-colors" strokeWidth={1}/>
 <h3 className="text-xl font-bold uppercase tracking-wider mb-4 text-white">Audio Mixing</h3>
 <p className="text-sm leading-relaxed font-light">
 Analog outboard hardware ve DSP sistemlerin harmanlandığı hibrit miks mimarisi. Şarkılarınızda derinlik ve genişlik.
 </p>
 </div>

 <div className="group">
 <Disc3 className="w-8 h-8 mb-6 group-hover:opacity-90 transition-colors" strokeWidth={1}/>
 <h3 className="text-xl font-bold uppercase tracking-wider mb-4 text-white">Mastering</h3>
 <p className="text-sm leading-relaxed font-light">
 Spotify, Apple Music ve radyo platformları için optimize edilmiş gürültü seviyeleri ve son harmonik dokunuşlar.
 </p>
 </div>

 </div>
 </section>
 )
}

export function MuzikLuxFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 px-8 border-t border-[#1F1F1F] flex items-center justify-between uppercase font-bold tracking-[0.3em] " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div>© {businessData.foundedYear} {businessData.name}</div>
 <div>High Resolution Audio</div>
 </footer>
 )
}

registerSection('hero', 'muziklux_hero_0', MuzikLuxMINIMALPROHEADER)
registerSection('hero', 'muziklux_hero_1', MuzikLuxACOUSTICHERO)
registerSection('services', 'muziklux_services_2', MuzikLuxPROSERVICES)
registerSection('footer', 'muziklux_footer_3', MuzikLuxFOOTER)
