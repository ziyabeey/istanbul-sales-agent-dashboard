// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Camera, Heart, Music4, Wine } from 'lucide-react'

export function OrganizasyonDugunROMANTICHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="bg-transparent absolute top-0 w-full z-50 py-8 px-6" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto flex items-center justify-between border-b border-[#F4EBEB] pb-6">
 <div className="font-serif italic text-3xl font-medium tracking-widest ">
 {businessData.name}
 </div>
 <a href={`tel:${businessData.phoneClean}`} className="uppercase tracking-[0.2em] font-bold hover:opacity-90 transition-colors border border-[#F4EBEB] px-6 py-3 rounded-full">
 Randevu Al
 </a>
 </div>
 </header>
 )
}

export function OrganizasyonDugunFLORALHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="pt-40 pb-24 px-6 relative text-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[900px] mx-auto">
 <p className="uppercase tracking-[0.4em] text-xs font-semibold mb-6">Wedding & Event Design</p>
 <h1 className="font-serif text-5xl md:text-7xl font-normal mb-8 leading-[1.1] text-balance">
 Sonsuza Dek <br/> Sürecek Bir <span className="italic ">Rüya.</span>
 </h1>
 <p className="text-lg font-light mb-12 leading-loose max-w-2xl mx-auto">
 Gelin yolundan masa örtülerine, taze çiçek aranjmanlarından ışıklandırmaya kadar her detayı sizin için özenle tasarlıyoruz. Kına ve düğün organizasyonlarınızda kusursuz zarafet.
 </p>
 <div className="flex justify-center">
 <a href={`https://wa.me/${businessData.whatsapp}`} className="text-white px-10 py-5 uppercase tracking-[0.2em] font-bold hover:opacity-90 transition-colors rounded-full shadow-lg">
 Koleksiyonlara Göz At
 </a>
 </div>
 </div>
 </section>
 )
}

export function OrganizasyonDugunELEGANTSERVICES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 border-y border-[#F4EBEB]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto grid md:grid-cols-4 gap-8">
 
 <div className="bg-white p-10 text-center rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-[#F4EBEB] hover:-translate-y-2 transition-transform">
 <Heart className="w-8 h-8 mx-auto mb-6" strokeWidth={1} />
 <h3 className="font-serif text-xl mb-4 ">Kına Gecesi</h3>
 <p className="font-light leading-relaxed text-sm">
 Geleneksel motiflerin modern dokunuşlarla harmanlandığı, kaftanından kınasına tam paket tasarımlar.
 </p>
 </div>

 <div className="bg-white p-10 text-center rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-[#F4EBEB] hover:-translate-y-2 transition-transform">
 <Wine className="w-8 h-8 mx-auto mb-6" strokeWidth={1} />
 <h3 className="font-serif text-xl mb-4 ">Düğün & Davet</h3>
 <p className="font-light leading-relaxed text-sm">
 Tiffanny sandalyeler, aynalı suplalar, şamdanlar ve canlı orkestra ile kusursuz bir düğün planlaması.
 </p>
 </div>

 <div className="bg-white p-10 text-center rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-[#F4EBEB] hover:-translate-y-2 transition-transform">
 <Camera className="w-8 h-8 mx-auto mb-6" strokeWidth={1} />
 <h3 className="font-serif text-xl mb-4 ">Fotoğraf & Video</h3>
 <p className="font-light leading-relaxed text-sm">
 Düğün hikayesi, dış çekim, drone çekimleri ve anında teslim edilen anı fotoğrafları (Photobooth).
 </p>
 </div>

 <div className="bg-white p-10 text-center rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-[#F4EBEB] hover:-translate-y-2 transition-transform">
 <Music4 className="w-8 h-8 mx-auto mb-6" strokeWidth={1} />
 <h3 className="font-serif text-xl mb-4 ">Müzik & Sahne</h3>
 <p className="font-light leading-relaxed text-sm">
 Karşılama triosu, sahne ses-ışık sistemleri, DJ performansı ve profesyonel canlı orkestra temini.
 </p>
 </div>

 </div>
 </section>
 )
}

export function OrganizasyonDugunFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-20 text-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <Heart className="w-6 h-6 mx-auto mb-6 fill-current"/>
 <div className="uppercase tracking-[0.3em] font-bold ">
 {businessData.name} — CELEBRATING LOVE SINCE {businessData.foundedYear}
 </div>
 </footer>
 )
}

registerSection('hero', 'organizasyondugun_hero_0', OrganizasyonDugunROMANTICHEADER)
registerSection('hero', 'organizasyondugun_hero_1', OrganizasyonDugunFLORALHERO)
registerSection('services', 'organizasyondugun_services_2', OrganizasyonDugunELEGANTSERVICES)
registerSection('footer', 'organizasyondugun_footer_3', OrganizasyonDugunFOOTER)
