// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { TreePine, Scissors, Sprout, Phone } from 'lucide-react'

export function PeyzajKlasikFRESHHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="text-white sticky top-0 z-50 shadow-md border-b-4 border-[#1F5F1C]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1100px] mx-auto px-4 h-20 flex items-center justify-between">
 <div className="font-heading font-black text-2xl flex items-center gap-2">
 <TreePine className="w-8 h-8 " strokeWidth={2.5} />
 {businessData.name}
 </div>
 <a href={`tel:${businessData.phoneClean}`} className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-black hover:bg-yellow-300 transition-colors shadow-sm">
 <Phone className="w-5 h-5 fill-current" /> {businessData.phone}
 </a>
 </div>
 </header>
 )
}

export function PeyzajKlasikSUNNYHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 px-4 text-center bg-gradient-to-b from-[#E8F5E3] to-[#F7FFF4]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[900px] mx-auto">
 <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full font-bold text-sm mb-6 border border-yellow-200">
 <Sprout className="w-4 h-4" /> PROFESYONEL BAHÇE BAKIM HİZMETLERİ
 </div>
 <h1 className="font-heading text-5xl md:text-7xl font-black mb-6 leading-tight">
 Bahçenize Dört Mevsim <br/>
 <span className="">Taze Bir Nefes.</span>
 </h1>
 <p className="text-xl mb-10 font-medium px-4 max-w-2xl mx-auto">
 Düzenli çim biçimi, ağaç budama, yabani ot temizliği ve peyzaj düzenlemeleriyle bahçenizi her zaman canlı ve yeşil tutuyoruz.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <a href={`https://wa.me/${businessData.whatsapp}`} className="text-white px-8 py-4 rounded-xl font-bold text-xl hover:opacity-90 transition-colors shadow-lg shadow-green-700/20 inline-flex items-center justify-center gap-2">
 Ücretsiz Keşif İste
 </a>
 </div>
 </div>
 </section>
 )
}

export function PeyzajKlasikSERVICESGRID({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 px-4" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1100px] mx-auto">
 <div className="grid md:grid-cols-3 gap-8">
 {/* Service 1 */}
 <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#C8E6C9] hover:-translate-y-1 transition-transform text-center">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
 <Scissors className="w-8 h-8" />
 </div>
 <h3 className="font-bold text-xl mb-3 ">Çim Biçme & Bakım</h3>
 <p className="font-medium leading-relaxed">Düzenli periyotlarla çimlerin kesilmesi, havalandırılması ve kenar düzeltmeleri.</p>
 </div>
 
 {/* Service 2 */}
 <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#C8E6C9] hover:-translate-y-1 transition-transform text-center border-b-4 border-b-[#2D7A28]">
 <div className="w-16 h-16 text-white rounded-2xl flex items-center justify-center mx-auto mb-6">
 <TreePine className="w-8 h-8" />
 </div>
 <h3 className="font-bold text-xl mb-3 ">Budama Süslemesi</h3>
 <p className="font-medium leading-relaxed">Ağaçların ve çalıların mevsime uygun tekniklerle budanması ve form verilmesi.</p>
 </div>

 {/* Service 3 */}
 <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#C8E6C9] hover:-translate-y-1 transition-transform text-center">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
 <Sprout className="w-8 h-8" />
 </div>
 <h3 className="font-bold text-xl mb-3 ">Dikim & Gübreleme</h3>
 <p className="font-medium leading-relaxed">Mevsimsel bitki/çiçek ekimi ve bitkilerin sağlıklı büyümesi için organik takviyeler.</p>
 </div>
 </div>
 </div>
 </section>
 )
}

export function PeyzajKlasikFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 px-6 text-center font-medium border-t-8 border-[#FACC15]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="text-2xl font-black text-white mb-2">{businessData.name}</div>
 <p className="text-sm">Hizmet Bölgesi: {businessData.district}, {businessData.city}</p>
 </footer>
 )
}

registerSection('hero', 'peyzajklasik_hero_0', PeyzajKlasikFRESHHEADER)
registerSection('hero', 'peyzajklasik_hero_1', PeyzajKlasikSUNNYHERO)
registerSection('services', 'peyzajklasik_services_2', PeyzajKlasikSERVICESGRID)
registerSection('footer', 'peyzajklasik_footer_3', PeyzajKlasikFOOTER)
