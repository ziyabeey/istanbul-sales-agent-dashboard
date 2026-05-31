// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'


export function SporBeastGRITTYHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="px-6 py-4 border-b-4 border-[#84CC16] flex items-center justify-between sticky top-0 z-50" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading font-black text-3xl italic tracking-tighter text-white uppercase -skew-x-12">
 {businessData.name}
 </div>
 <a href="#wod" className="hidden sm:block font-bold uppercase tracking-widest text-sm hover:text-white transition-colors">
 WOD Programı
 </a>
 </header>
 )
}

export function SporBeastAGGRESSIVEHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 md:py-32 relative text-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {/* Diagonal Cut */}
 <div className="absolute inset-0 transform -skew-y-3 origin-bottom-right -z-10"></div>
 <div className="max-w-[800px] mx-auto relative z-10 pt-10">
 <div className="font-black uppercase tracking-widest px-4 py-1 text-xs inline-block mb-6 -skew-x-12 ring-2 ring-[#84CC16]">
 Performans Merkezi
 </div>
 <h1 className="font-heading font-black text-6xl md:text-8xl text-white uppercase leading-[0.85] mb-8 -skew-x-6 drop-shadow-lg">
 Bahane Yok,<br/> <span className="">Sonuç Var.</span>
 </h1>
 <p className="text-lg md:text-xl font-bold mb-12 max-w-xl mx-auto drop-shadow-md">
 Crossfit, Halter, Kondisyon. Rutini boz, sınırlarını aş. Birlikte daha güçlüyüz.
 </p>
 <a href={`tel:${businessData.phoneClean}`} className="font-black uppercase text-2xl py-5 px-10 -skew-x-12 inline-block hover:opacity-90 shadow-[8px_8px_0_#4D7C0F] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all">
 Antrenmana Başla!
 </a>
 </div>
 </section>
 )
}

export function SporBeastWODBOXES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 px-6 " id="wod" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1000px] mx-auto">
 <h2 className="font-heading font-black text-5xl uppercase text-white mb-12 -skew-x-6">Antrenman Tipleri</h2>
 
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 border-l-[8px] border-[#84CC16] relative overflow-hidden group">
 <div className="absolute top-0 right-0 p-4 font-black text-7xl opacity-50 group-hover:scale-125 transition-transform">01</div>
 <h3 className="font-heading font-black text-3xl uppercase text-white mb-4 -skew-x-6">CrossFit WOD</h3>
 <p className="font-bold text-lg mb-6 leading-relaxed">
 Her gün değişen, yüksek şiddetli fonksiyonel antrenman. Kondisyon ve gücü tek derste maksimize et.
 </p>
 </div>

 <div className="p-8 border-l-[8px] border-[#84CC16] relative overflow-hidden group">
 <div className="absolute top-0 right-0 p-4 font-black text-7xl opacity-50 group-hover:scale-125 transition-transform">02</div>
 <h3 className="font-heading font-black text-3xl uppercase text-white mb-4 -skew-x-6">Olimpik Halter</h3>
 <p className="font-bold text-lg mb-6 leading-relaxed">
 Koparma ve Silkme teknikleri. Patlayıcı gücünü artırmak için teknik ağırlıklı özel seanslar.
 </p>
 </div>

 <div className="p-8 border-l-[8px] border-[#84CC16] relative overflow-hidden group">
 <div className="absolute top-0 right-0 p-4 font-black text-7xl opacity-50 group-hover:scale-125 transition-transform">03</div>
 <h3 className="font-heading font-black text-3xl uppercase text-white mb-4 -skew-x-6">Gymnastics</h3>
 <p className="font-bold text-lg mb-6 leading-relaxed">
 Vücut ağırlığı kontrolü. Bar muscle up, handstand walk, toes to bar pratikleri.
 </p>
 </div>

 <div className="p-8 border-l-[8px] border-[#84CC16] relative overflow-hidden group">
 <div className="absolute top-0 right-0 p-4 font-black text-7xl opacity-50 group-hover:scale-125 transition-transform">04</div>
 <h3 className="font-heading font-black text-3xl uppercase text-white mb-4 -skew-x-6">Endurance</h3>
 <p className="font-bold text-lg mb-6 leading-relaxed">
 Kürek, bisiklet, koşu ve skierg. Kalp ritmini zirveye taşıyacak uzun soluklu kardiyo günleri.
 </p>
 </div>
 </div>
 </div>
 </section>
 )
}

export function SporBeastCHUNKYFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-16 text-center border-t border-[#1F2937]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading font-black text-5xl uppercase italic -skew-x-12 mb-4">{businessData.name}</div>
 <p className="font-black tracking-widest uppercase">Performans Hiç Bitmez.</p>
 </footer>
 )
}

registerSection('hero', 'sporbeast_hero_0', SporBeastGRITTYHEADER)
registerSection('hero', 'sporbeast_hero_1', SporBeastAGGRESSIVEHERO)
registerSection('services', 'sporbeast_services_2', SporBeastWODBOXES)
registerSection('footer', 'sporbeast_footer_3', SporBeastCHUNKYFOOTER)
