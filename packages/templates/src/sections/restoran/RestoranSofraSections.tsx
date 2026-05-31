// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Flame, MapPin } from 'lucide-react'

export function RestoranSofraKEBAPHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="bg-white sticky top-0 z-50 border-b-[3px] border-[#DC2626] shadow-sm" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1000px] mx-auto px-6 h-[72px] flex items-center justify-between">
 <div className="font-heading font-black text-2xl flex items-center gap-2 ">
 <Flame className="w-8 h-8 " />
 {businessData.name}
 </div>
 <a href={`tel:${businessData.phoneClean}`} className="text-white px-5 py-2.5 rounded-md font-bold text-sm hover:opacity-90 transition-all">
 Paket Sipariş
 </a>
 </div>
 </header>
 )
}

export function RestoranSofraFIERYHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 md:py-32 px-6 relative text-center border-b-2 border-[#FEE2E2]" style={{ backgroundImage: "linear-gradient(to bottom, #FFF, #FDF8F5)" }} style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[800px] mx-auto relative z-10">
 <div className="inline-block px-4 py-1.5 rounded uppercase font-black text-xs tracking-wider mb-8">
 Odun Ateşinde Lezzet
 </div>
 <h1 className="font-heading text-5xl md:text-7xl font-black mb-6 leading-tight">
 Gerçek Et,<br/> <span className="">Ateşli Izgara.</span>
 </h1>
 <p className="text-lg font-bold mb-10 max-w-2xl mx-auto">
 100% zırh kıymasından Adana, kuzu şiş ve közde pişen efsane mezelerimiz. Aile boyu mangal keyfi için doğru adres.
 </p>
 <div className="flex flex-col sm:flex-row justify-center gap-4">
 <a href={`tel:${businessData.phoneClean}`} className="text-white px-8 py-4 rounded font-black text-xl hover:opacity-90 transition-colors shadow-[0_4px_0_#7F1D1D]">
 Masamızı Ayır
 </a>
 </div>
 </div>
 </section>
 )
}

export function RestoranSofraMENUHIGHLIGHTS({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 px-6 " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1000px] mx-auto">
 <h2 className="font-heading text-4xl font-black text-center mb-12 ">Ana Görseller</h2>
 
 <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
 <div className="bg-white p-6 rounded-xl border border-[#FEE2E2] shadow-sm hover:border-[#DC2626] transition-colors group">
 <div className="text-6xl mb-4 group-hover:scale-110 transition-transform origin-left">🍢</div>
 <h3 className="font-black text-xl mb-2 uppercase">Adana Kebap</h3>
 <p className="font-bold text-sm mb-4">Zırh kıyması, kömür ateşi</p>
 <div className="font-black text-2xl ">320 ₺</div>
 </div>

 <div className="bg-white p-6 rounded-xl border border-[#FEE2E2] shadow-sm hover:border-[#DC2626] transition-colors group">
 <div className="text-6xl mb-4 group-hover:scale-110 transition-transform origin-left">🥩</div>
 <h3 className="font-black text-xl mb-2 uppercase">Kuzu Şiş</h3>
 <p className="font-bold text-sm mb-4">Özel marinasyonlu pamuk gibi</p>
 <div className="font-black text-2xl ">380 ₺</div>
 </div>

 <div className="bg-white p-6 rounded-xl border border-[#FEE2E2] shadow-sm hover:border-[#DC2626] transition-colors group">
 <div className="text-6xl mb-4 group-hover:scale-110 transition-transform origin-left">🥗</div>
 <h3 className="font-black text-xl mb-2 uppercase">Meze Tabağı</h3>
 <p className="font-bold text-sm mb-4">Günlük taze soğuk mezeler</p>
 <div className="font-black text-2xl ">150 ₺</div>
 </div>
 </div>
 </div>
 </section>
 )
}

export function RestoranSofraTAVERIFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 text-center " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading font-black text-2xl mb-2">{businessData.name}</div>
 <p className="font-bold flex items-center justify-center gap-2 text-sm opacity-80">
 <MapPin className="w-4 h-4" /> {businessData.city} / {businessData.district}
 </p>
 </footer>
 )
}

registerSection('hero', 'restoransofra_hero_0', RestoranSofraKEBAPHEADER)
registerSection('hero', 'restoransofra_hero_1', RestoranSofraFIERYHERO)
registerSection('services', 'restoransofra_services_2', RestoranSofraMENUHIGHLIGHTS)
registerSection('footer', 'restoransofra_footer_3', RestoranSofraTAVERIFOOTER)
