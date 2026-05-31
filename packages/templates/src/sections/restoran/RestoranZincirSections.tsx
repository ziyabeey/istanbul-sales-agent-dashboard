// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Flame, Star, Store } from 'lucide-react'

export function RestoranZincirFASTFOODHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="px-4 py-3 sticky top-0 z-50 border-b-4 border-[#DC2626]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto flex items-center justify-between">
 <div className="font-heading font-black text-2xl tracking-tighter text-white uppercase italic transform -skew-x-6">
 🍔 {businessData.name}
 </div>
 <a href={`tel:${businessData.phoneClean}`} className="px-6 py-2 rounded-full font-black uppercase text-sm hover:scale-105 transition-transform shadow-lg border-2 border-white">
 Sipariş Ver
 </a>
 </div>
 </header>
 )
}

export function RestoranZincirDYNAMICHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 px-6 relative text-center overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {/* Dynamic Angles */}
 <div className="absolute inset-0 transform -skew-y-3 origin-top-left -z-10 h-[80%]"></div>
 
 <div className="max-w-[800px] mx-auto pt-10 pb-20">
 <div className="inline-block text-white px-5 py-2 font-black uppercase text-sm tracking-widest mb-6 -skew-x-12 border-4 border-white shadow-xl">
 🔥 YENİ LAB KOMBOSU GELDİ
 </div>
 <h1 className="font-heading text-6xl md:text-8xl font-black text-white mb-6 uppercase leading-[0.9] -skew-x-6 drop-shadow-lg">
 Ateşi Hisset,<br/> Lzzeti Kap.
 </h1>
 <p className="text-xl font-bold mb-10 max-w-xl mx-auto drop-shadow-md">
 100% Dana eti, özel lab sosu ve patates kızartması. Online siparişlere özel fiyatlarla anında kapında!
 </p>
 </div>
 </section>
 )
}

export function RestoranZincirCOMBOMENU({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-12 px-6 " id="menu" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto">
 
 <div className="grid md:grid-cols-3 gap-8">
 
 <div className="bg-white rounded-3xl p-6 border-[6px] border-[#EF4444] text-center transform hover:-translate-y-2 transition-transform shadow-2xl relative">
 <div className="absolute -top-6 -right-6 text-white w-20 h-20 rounded-full flex items-center justify-center font-black text-2xl border-4 border-white shadow-lg transform rotate-12">
 -20%
 </div>
 <div className="text-7xl mb-4">🍔</div>
 <h3 className="font-heading font-black text-2xl mb-1 uppercase -skew-x-3">Classic Lab Combo</h3>
 <p className="font-bold mb-4 text-sm">Classic Burger + Mega Patates + Kutu İçecek</p>
 <button className="w-full text-white font-black text-xl py-3 rounded-2xl uppercase shadow-[0_4px_0_#B91C1C] active:translate-y-1 active:shadow-none transition-all">280 ₺</button>
 </div>

 <div className="rounded-3xl p-6 border-[6px] border-[#F59E0B] text-center transform hover:-translate-y-2 transition-transform shadow-2xl relative">
 <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-white px-4 py-1 rounded-full font-black text-sm uppercase border-2 border-white shadow-lg">
 EN ÇOK SATAN
 </div>
 <div className="text-7xl mb-4 mt-4">🔬</div>
 <h3 className="font-heading font-black text-2xl mb-1 uppercase -skew-x-3">Smoke Lab Combo</h3>
 <p className="font-bold mb-4 text-sm">Füme Etli Burger + Cheddar Patates + İçecek</p>
 <button className="w-full font-black text-xl py-3 rounded-2xl uppercase shadow-[0_4px_0_#B45309] active:translate-y-1 active:shadow-none transition-all">320 ₺</button>
 </div>

 <div className="bg-white rounded-3xl p-6 border-[6px] border-[#EF4444] text-center transform hover:-translate-y-2 transition-transform shadow-2xl">
 <div className="text-7xl mb-4">🍟</div>
 <h3 className="font-heading font-black text-2xl mb-1 uppercase -skew-x-3">Kids Lab Kova</h3>
 <p className="font-bold mb-4 text-sm">Mini Burger + Patates + Oyuncak + Ayran</p>
 <button className="w-full text-white font-black text-xl py-3 rounded-2xl uppercase shadow-[0_4px_0_#B91C1C] active:translate-y-1 active:shadow-none transition-all">190 ₺</button>
 </div>

 </div>
 </div>
 </section>
 )
}

export function RestoranZincirCHUNKYFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 text-center text-white border-t-8 border-[#EF4444]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading font-black text-4xl uppercase -skew-x-6 mb-2">{businessData.name}</div>
 <p className="font-bold text-gray-400">🔥 TÜRKİYE'NİN HER YERİNDE</p>
 </footer>
 )
}

registerSection('hero', 'restoranzincir_hero_0', RestoranZincirFASTFOODHEADER)
registerSection('hero', 'restoranzincir_hero_1', RestoranZincirDYNAMICHERO)
registerSection('services', 'restoranzincir_services_2', RestoranZincirCOMBOMENU)
registerSection('footer', 'restoranzincir_footer_3', RestoranZincirCHUNKYFOOTER)
