// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Dumbbell, ShieldAlert, Zap } from 'lucide-react'

export function SporIronHARDCOREHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="px-6 py-4 border-b-2 border-[#2A2A2A] sticky top-0 z-50 flex items-center justify-between" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading font-black text-3xl tracking-tighter text-white uppercase flex items-center gap-2">
 <Dumbbell className="w-8 h-8 " />
 {businessData.name}
 </div>
 <a href={`tel:${businessData.phoneClean}`} className="text-white px-6 py-2 rounded uppercase font-bold text-sm tracking-wider hover:opacity-90 transition-colors">
 Bize Katıl
 </a>
 </header>
 )
}

export function SporIronGRITTYHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 md:py-32 px-6 relative overflow-hidden flex items-center justify-center text-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {/* Background Grid Texture */}
 <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#EF4444 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
 
 <div className="relative z-10 max-w-[800px] mx-auto">
 <div className="inline-block px-4 py-1 border border-[#EF4444] uppercase font-bold text-xs tracking-[0.2em] mb-8">
 No Excuses
 </div>
 <h1 className="font-heading font-black text-6xl md:text-8xl text-white uppercase leading-[0.9] mb-8 tracking-tighter">
 {businessData.slogan} <br/> <span className="stroke-text">GELİŞ!</span>
 </h1>
 <p className="text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto">
 Göstermelik makineler değil, saf demir. Powerlifting, vücut geliştirme ve gerçek sonuçlar arayanların tek adresi.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <a href="#services" className="text-white px-8 py-4 uppercase font-black tracking-wider text-lg hover:scale-105 transition-transform">
 Programları İncele
 </a>
 <a href="#iletisim" className="bg-transparent border-2 border-[#EF4444] px-8 py-4 uppercase font-black tracking-wider text-lg hover:opacity-90 hover:text-white transition-colors">
 Ücretsiz Deneme
 </a>
 </div>
 </div>
 </section>
 )
}

export function SporIronROUGHSERVICES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 px-6 border-t-4 border-[#EF4444]" id="services" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto">
 <h2 className="font-heading font-black text-4xl text-center mb-16 uppercase tracking-tight">Antrenman <span className="">Bölgeleri</span></h2>
 
 <div className="grid md:grid-cols-3 gap-6">
 <div className="p-8 border border-[#2A2A2A] hover:border-[#EF4444] transition-colors group">
 <Dumbbell className="w-12 h-12 mb-6 group-hover:scale-110 transition-transform" />
 <h3 className="font-heading font-black text-2xl uppercase mb-4">Serbest Ağırlık</h3>
 <p className="font-medium leading-relaxed">
 Olimpik barlar, bumper plakalar ve 60kg'a kadar dumbell seti. Sınırlarını zorla.
 </p>
 </div>

 <div className="p-8 border border-[#2A2A2A] hover:border-[#EF4444] transition-colors group">
 <ShieldAlert className="w-12 h-12 mb-6 group-hover:scale-110 transition-transform" />
 <h3 className="font-heading font-black text-2xl uppercase mb-4">Powerlifting</h3>
 <p className="font-medium leading-relaxed">
 Profesyonel squat rack'ler, deadlift platformları ve monolit. Güç odaklı antrenman.
 </p>
 </div>

 <div className="p-8 border border-[#2A2A2A] hover:border-[#EF4444] transition-colors group">
 <Zap className="w-12 h-12 mb-6 group-hover:scale-110 transition-transform" />
 <h3 className="font-heading font-black text-2xl uppercase mb-4">Makine Parkuru</h3>
 <p className="font-medium leading-relaxed">
 İzole kas gelişimi için özel açılı hardcore biyomekanik makineler.
 </p>
 </div>
 </div>
 </div>
 </section>
 )
}

export function SporIronFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 text-center border-t border-[#2A2A2A]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading font-black text-3xl uppercase tracking-tighter mb-2">{businessData.name}</div>
 <p className="font-bold text-sm uppercase tracking-widest">{businessData.district}</p>
 </footer>
 )
}

registerSection('hero', 'sporiron_hero_0', SporIronHARDCOREHEADER)
registerSection('hero', 'sporiron_hero_1', SporIronGRITTYHERO)
registerSection('services', 'sporiron_services_2', SporIronROUGHSERVICES)
registerSection('footer', 'sporiron_footer_3', SporIronFOOTER)
