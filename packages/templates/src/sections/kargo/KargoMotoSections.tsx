// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Bike, Zap, ArrowRight, Gauge } from 'lucide-react'

export function KargoMotoAGGRESSIVEHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="px-6 py-6 absolute w-full z-50 mix-blend-difference" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto flex items-center justify-between">
 <div className="font-heading font-black text-3xl italic tracking-tighter flex items-center gap-2">
 <Bike className="w-8 h-8" strokeWidth={3} />
 {businessData.name}
 </div>
 <a href={`tel:${businessData.phoneClean}`} className="px-6 py-2 pb-1.5 font-black tracking-widest hover:bg-white transition-colors transform -skew-x-12">
 <span className="block transform skew-x-12">SİPARİŞ VER</span>
 </a>
 </div>
 </header>
 )
}

export function KargoMotoHIGHSPEEDHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="pt-40 pb-24 px-6 relative overflow-hidden flex flex-col items-center border-b-[12px] border-[#F97316]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {/* Speed lines */}
 <div className="absolute inset-0 opacity-20" style={{ background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #F97316 10px, #F97316 12px)' }}></div>
 
 <div className="max-w-[900px] mx-auto relative z-10 text-center">
 <div className="inline-flex items-center gap-2 /20 px-4 py-1.5 font-black text-sm tracking-[0.2em] mb-8 border border-[#F97316]">
 <Zap className="w-4 h-4 fill-current" /> TRAFİĞE TAKILMA
 </div>
 <h1 className="font-heading text-6xl md:text-8xl font-black text-white mb-6 leading-[0.9] italic tracking-tighter">
 IŞINLANMA <br/> 
 <span className="">HENÜZ İCAT EDİLMEDİ.</span>
 </h1>
 <p className="mb-12 text-lg md:text-xl font-bold max-w-2xl mx-auto leading-relaxed tracking-wider">
 AMa bİz varız. ACİL PAKETLERİNİZ, ANAHTARLARINIZ VEYA LAPTOLARINIZ İÇİN İSTANBUL TRAFİĞİNİ YARIP GEÇEN MOTO KURYE AĞI.
 </p>
 <div className="flex justify-center">
 <a href={`https://wa.me/${businessData.whatsapp}`} className="px-10 py-5 font-black text-xl tracking-widest hover:bg-white transition-all transform -skew-x-12 flex items-center gap-3 group shadow-[10px_10px_0px_#ffffff20] hover:shadow-[5px_5px_0px_#ffffff20] active:translate-x-1 active:translate-y-1">
 <span className="block transform skew-x-12 flex items-center gap-2">WhatsApp ile Çağır <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform"/></span>
 </a>
 </div>
 </div>
 </section>
 )
}

export function KargoMotoPERFORMANCESTATS({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-8 text-center">
 
 <div className="p-8 border-2 border-[#333] hover:border-[#F97316] transition-colors relative group">
 <Gauge className="w-16 h-16 absolute bottom-4 right-4 group-hover:/20 transition-colors" />
 <h3 className="text-6xl font-black text-white italic mb-2">45<span className="text-2xl ">DK</span></h3>
 <p className="font-bold tracking-widest text-sm">Ortalama Teslimat</p>
 </div>
 
 <div className="p-8 border-2 border-[#F97316] /10 relative shadow-[0_0_30px_rgba(249,115,22,0.15)]">
 <h3 className="text-6xl font-black italic mb-2">120+</h3>
 <p className="text-white font-bold tracking-widest text-sm">Aktif Sürücü</p>
 </div>
 
 <div className="p-8 border-2 border-[#333] hover:border-[#F97316] transition-colors relative group">
 <h3 className="text-6xl font-black text-white italic mb-2">%99</h3>
 <p className="font-bold tracking-widest text-sm">Zamanında Teslim Oranı</p>
 </div>

 </div>
 </section>
 )
}

export function KargoMotoFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-16 border-t-2 border-[#222] text-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <p className="font-heading text-2xl font-black tracking-[0.2em] italic mb-2">{businessData.name}</p>
 <p className="font-bold tracking-wider text-xs">FASTEST IN {businessData.city}</p>
 </footer>
 )
}

registerSection('hero', 'kargomoto_hero_0', KargoMotoAGGRESSIVEHEADER)
registerSection('hero', 'kargomoto_hero_1', KargoMotoHIGHSPEEDHERO)
registerSection('stats', 'kargomoto_stats_2', KargoMotoPERFORMANCESTATS)
registerSection('footer', 'kargomoto_footer_3', KargoMotoFOOTER)
