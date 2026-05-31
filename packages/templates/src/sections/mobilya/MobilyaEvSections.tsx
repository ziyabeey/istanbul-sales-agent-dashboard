// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Sofa, BedDouble, Lamp, Clock, ArrowRight } from 'lucide-react'

export function MobilyaEvWARMHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-[#FDE68A]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
 <div className="font-heading font-black text-2xl flex items-center gap-2 ">
 <Sofa className="w-6 h-6" />
 {businessData.name}
 </div>
 <a href={`https://wa.me/${businessData.whatsapp}`} className="text-white px-5 py-2 rounded-full font-bold hover:opacity-90 transition-colors shadow-sm">
 Mağazaya Yol Tarifi Al
 </a>
 </div>
 </header>
 )
}

export function MobilyaEvHOMEHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 md:py-28 px-6 relative overflow-hidden text-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {/* Decorative Circles */}
 <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full mix-blend-multiply opacity-50 blur-3xl"></div>
 <div className="absolute top-40 -right-20 w-80 h-80 rounded-full mix-blend-multiply opacity-50 blur-3xl"></div>

 <div className="max-w-[800px] mx-auto relative z-10">
 <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full font-bold text-sm mb-8 shadow-sm border border-[#FDE68A]">
 <Lamp className="w-4 h-4" /> Düğün Paketleri ve Çeyiz Setleri
 </div>
 <h1 className="font-heading text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
 Evinize Yakışan <br/> 
 <span className="">Sıcaklık ve Konfor.</span>
 </h1>
 <p className="text-xl mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
 Oturma odasından yatak odasına, tarzınıza uygun, dayanıklı ve modern mobilyalarla hayalinizdeki evi dekore edin. Üstelik ücretsiz kurulum fırsatıyla!
 </p>

 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <a href={`tel:${businessData.phoneClean}`} className="text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-2 group">
 Koleksiyonları İncele <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
 </a>
 </div>
 </div>
 </section>
 )
}

export function MobilyaEvCATEGORYGRID({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 bg-white border-y border-[#FDE68A]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto">
 <h2 className="font-heading text-3xl md:text-4xl font-black text-center mb-16 ">Kategorilerimiz</h2>
 
 <div className="grid md:grid-cols-3 gap-8">
 <div className="p-8 rounded-2xl text-center border border-[#FDE68A] hover:shadow-lg transition-shadow cursor-pointer group">
 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
 <Sofa className="w-10 h-10 " />
 </div>
 <h3 className="font-bold text-2xl mb-3">Oturma Grupları</h3>
 <p className="font-medium leading-relaxed">Köşe takımları, berjerler ve modern kanepeler.</p>
 </div>

 <div className="p-8 rounded-2xl text-center border border-[#FDE68A] hover:shadow-lg transition-shadow cursor-pointer group">
 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
 <BedDouble className="w-10 h-10 " />
 </div>
 <h3 className="font-bold text-2xl mb-3">Yatak Odaları</h3>
 <p className="font-medium leading-relaxed">Geniş gardıroplar, rahat yataklar ve şık şifonyerler.</p>
 </div>

 <div className="p-8 rounded-2xl text-center border border-[#FDE68A] hover:shadow-lg transition-shadow cursor-pointer group">
 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
 <Lamp className="w-10 h-10 " />
 </div>
 <h3 className="font-bold text-2xl mb-3">Yemek Odaları</h3>
 <p className="font-medium leading-relaxed">Açılabilir masalar ve ergonomik, leke tutmaz sandalyeler.</p>
 </div>
 </div>
 </div>
 </section>
 )
}

export function MobilyaEvFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-16 text-center " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <Sofa className="w-8 h-8 mx-auto mb-4 " />
 <p className="font-heading font-black text-2xl mb-2">{businessData.name}</p>
 <p className="font-medium">Mağaza: {businessData.address}</p>
 </footer>
 )
}

registerSection('hero', 'mobilyaev_hero_0', MobilyaEvWARMHEADER)
registerSection('hero', 'mobilyaev_hero_1', MobilyaEvHOMEHERO)
registerSection('services', 'mobilyaev_services_2', MobilyaEvCATEGORYGRID)
registerSection('footer', 'mobilyaev_footer_3', MobilyaEvFOOTER)
