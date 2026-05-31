// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Heart, Activity, Users } from 'lucide-react'

export function SporStudioBRIGHTHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="px-6 py-5 bg-white shadow-sm sticky top-0 z-50 flex justify-between items-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading font-bold text-2xl tracking-tight ">
 {businessData.name} <span className="">.</span>
 </div>
 <a href="#ulasin" className="text-sm font-semibold uppercase tracking-widest hover:opacity-90 transition-colors">
 Bize Katıl
 </a>
 </header>
 )
}

export function SporStudioENERGETICHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 md:py-32 px-6 text-center relative overflow-hidden bg-white mt-4 mx-4 rounded-3xl border border-[#F3F4F6]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[700px] mx-auto relative z-10">
 <div className="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 mb-8">
 <Heart className="w-3 h-3 fill-current" /> Butik Stüdyo
 </div>
 <h1 className="font-heading text-5xl md:text-7xl font-extrabold mb-8 leading-[1.1]">
 Kendini Keşfet, <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EAB308] to-[#CA8A04]">Gücünü Bul.</span>
 </h1>
 <p className="text-lg mb-10 leading-relaxed font-medium">
 Reformer pilates, fonksiyonel antrenman, barre ve yoga dersleriyle kalabalıktan uzak, sana özel bir fitness deneyimi.
 </p>
 <a href={`https://wa.me/${businessData.whatsapp}`} className="text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-block">
 Ücretsiz Tanışma Dersi
 </a>
 </div>
 </section>
 )
}

export function SporStudioCLASSES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1000px] mx-auto">
 <h2 className="font-heading text-4xl font-extrabold text-center mb-16 ">Grup Derslerimiz</h2>
 
 <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
 
 <div className="bg-white rounded-2xl p-8 border border-[#F3F4F6] shadow-sm hover:border-[#EAB308] transition-all group">
 <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
 <Activity className="w-7 h-7" />
 </div>
 <h3 className="font-bold text-xl mb-3 ">Reformer Pilates</h3>
 <p className="text-sm leading-relaxed font-medium">Postür düzeltici, esneklik artırıcı ve merkez bölgeyi kuvvetlendiren aletli pilates dersleri.</p>
 </div>

 <div className="bg-white rounded-2xl p-8 border border-[#F3F4F6] shadow-sm hover:border-[#EAB308] transition-all group">
 <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
 <Users className="w-7 h-7" />
 </div>
 <h3 className="font-bold text-xl mb-3 ">HIIT & Fonksiyonel</h3>
 <p className="text-sm leading-relaxed font-medium">Yağ yakımını hızlandıran, kalori harcatan ve kondisyon artıran yüksek tempolu stüdyo dersleri.</p>
 </div>

 <div className="bg-white rounded-2xl p-8 border border-[#F3F4F6] shadow-sm hover:border-[#EAB308] transition-all group">
 <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
 <Heart className="w-7 h-7" />
 </div>
 <h3 className="font-bold text-xl mb-3 ">Yoga & Esneme</h3>
 <p className="text-sm leading-relaxed font-medium">Günün stresini atan, zihni sakinleştiren ve vücut mobilitesini artıran akış pratikleri.</p>
 </div>

 </div>
 </div>
 </section>
 )
}

export function SporStudioFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-16 bg-white border-t border-[#F3F4F6] text-center" id="ulasin" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <h4 className="font-heading font-extrabold text-2xl mb-4">{businessData.name}</h4>
 <p className="font-medium text-sm mb-6">{businessData.address}</p>
 </footer>
 )
}

registerSection('hero', 'sporstudio_hero_0', SporStudioBRIGHTHEADER)
registerSection('hero', 'sporstudio_hero_1', SporStudioENERGETICHERO)
registerSection('services', 'sporstudio_services_2', SporStudioCLASSES)
registerSection('footer', 'sporstudio_footer_3', SporStudioFOOTER)
