// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { ShoppingCart, MoveRight, PackageSearch } from 'lucide-react'

export function FotoUrunCOMMERCIALHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="bg-white border-b-4 border-[#00C853] px-6 py-5 sticky top-0 z-50" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1400px] mx-auto flex items-center justify-between">
 <div className="font-heading font-black text-3xl flex items-center gap-2">
 <div className="w-8 h-8 rounded-sm transform rotate-12"></div>
 {businessData.name.toUpperCase()}
 </div>
 <a href={`tel:${businessData.phoneClean}`} className="text-white px-6 py-2.5 font-bold hover:opacity-90 transition-colors rounded-sm uppercase tracking-wide text-sm">
 Fiyat Teklifi Al
 </a>
 </div>
 </header>
 )
}

export function FotoUrunECOMMERCEHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 md:py-32 relative overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {/* Graphic Accents */}
 <div className="absolute top-20 right-10 w-64 h-64 opacity-10 rounded-full blur-3xl"></div>
 <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>

 <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
 
 <div>
 <div className="inline-flex items-center gap-2 font-black text-sm uppercase tracking-widest mb-6 border border-[#00C853] px-4 py-1">
 <ShoppingCart className="w-4 h-4"/> E-Ticaret & Amazon
 </div>
 <h1 className="font-heading text-6xl md:text-8xl font-black mb-6 leading-[0.95] tracking-tight uppercase ">
 Satan <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C853] to-[#009624]">Ürün Görselleri.</span>
 </h1>
 <p className="text-xl font-medium mb-12 max-w-lg leading-relaxed">
 Tembel veya kalitesiz fotoğraflar satış kaybettirir. Beyaz zemin dekupe packshotlar, konsepte uygun still life ve Amazon/Trendyol standardında yüksek çözünürlüklü çekimler.
 </p>
 <div className="flex gap-4">
 <a href="#hizmetler" className="text-white px-8 py-4 font-black uppercase tracking-wider hover:opacity-90 transition-colors flex items-center gap-3">
 Katalog Çekimi <MoveRight className="w-5 h-5"/>
 </a>
 </div>
 </div>

 {/* Stat Cards Matrix */}
 <div className="grid grid-cols-2 gap-4">
 <div className="bg-white p-8 border border-[#DEE2E6] shadow-sm transform translate-y-8">
 <div className="font-black text-5xl mb-2">%40</div>
 <div className="font-bold text-sm uppercase">Dönüşüm Artışı (Ort.)</div>
 </div>
 <div className="p-8 text-white shadow-xl">
 <div className="font-black text-5xl mb-2">360°</div>
 <div className="font-bold text-sm uppercase">Spin Çekim Modülleri</div>
 </div>
 <div className="bg-white p-8 border border-[#DEE2E6] shadow-sm transform translate-y-8">
 <div className="font-black text-5xl mb-2">48h</div>
 <div className="font-bold text-sm uppercase">Hızlı Teslimat (Opsiyon)</div>
 </div>
 <div className="bg-white p-8 border border-[#DEE2E6] shadow-sm">
 <div className="font-black text-5xl mb-2">4K</div>
 <div className="font-bold text-sm uppercase">Macro & Textures</div>
 </div>
 </div>

 </div>
 </section>
 )
}

export function FotoUrunEXPERTISE({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="hizmetler" className="py-24 px-6 bg-white border-t border-[#DEE2E6]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1400px] mx-auto flex flex-col items-center">
 <PackageSearch className="w-12 h-12 mb-6" />
 <h2 className="font-heading text-4xl font-black uppercase tracking-tight mb-16 text-center">Her Platforma Uygun</h2>
 
 <div className="grid md:grid-cols-3 gap-8 w-full">
 <div className="p-8 border border-[#DEE2E6]">
 <h3 className="font-black text-xl mb-4 uppercase">Beyaz Zemin & Dekupe</h3>
 <p className="font-medium leading-relaxed">Pazaryerlerinin (Amazon, Trendyol) zorunlu kıldığı salt beyaz arka planlı net ve keskin packshot fotoğrafları. Gölge ve yansıma ayarları dahil.</p>
 </div>
 <div className="p-8 border border-[#00C853] shadow-[4px_4px_0px_#00C853]">
 <h3 className="font-black text-xl mb-4 uppercase">Stil-Life & Konsept</h3>
 <p className="font-medium leading-relaxed">Kozmetik, takı, yiyecek veya tekstil. Ürünün ruhunu yansıtan renkli arka planlar, prop kullanımı, sert veya yumuşak aydınlatma tasarımları.</p>
 </div>
 <div className="p-8 border border-[#DEE2E6]">
 <h3 className="font-black text-xl mb-4 uppercase">Mankenli Moda Çekimi</h3>
 <p className="font-medium leading-relaxed">Giyim markaları için görünmez manken (ghost mannequin) veya canlı profesyonel model çekimleri. Renk optimizasyonu ile tam uyum.</p>
 </div>
 </div>
 </div>
 </section>
 )
}

export function FotoUrunFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-16 text-center text-sm font-bold uppercase tracking-widest" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <p className="text-white text-2xl mb-4 font-heading font-black">{businessData.name}</p>
 <p>PRODUCT PHOTOGRAPHY STUDIO • {businessData.city}</p>
 </footer>
 )
}

registerSection('hero', 'fotourun_hero_0', FotoUrunCOMMERCIALHEADER)
registerSection('hero', 'fotourun_hero_1', FotoUrunECOMMERCEHERO)
registerSection('services', 'fotourun_services_2', FotoUrunEXPERTISE)
registerSection('footer', 'fotourun_footer_3', FotoUrunFOOTER)
