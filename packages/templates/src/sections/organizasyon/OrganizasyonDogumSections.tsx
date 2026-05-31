// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Sparkles, Palette, Gift, Cake, PartyPopper } from 'lucide-react'

export function OrganizasyonDogumPLAYFULHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b-4 border-[#FBCFE8]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1000px] mx-auto px-6 h-20 flex items-center justify-between">
 <div className="font-heading font-black text-2xl flex items-center gap-2 ">
 <Cake className="w-8 h-8 " />
 {businessData.name}
 </div>
 <a href={`https://wa.me/${businessData.whatsapp}`} className="text-white px-6 py-2.5 rounded-full font-bold hover:opacity-90 hover:-translate-y-1 transition-all shadow-[0_4px_0_#9D174D]">
 Partiyi Başlat! 🎈
 </a>
 </div>
 </header>
 )
}

export function OrganizasyonDogumCUTEHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 md:py-28 px-6 relative text-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {/* Floating Confetti */}
 <div className="absolute top-10 left-10 opacity-60 animate-bounce"><Sparkles className="w-12 h-12 fill-current" /></div>
 <div className="absolute bottom-10 right-10 opacity-60 animate-pulse"><PartyPopper className="w-16 h-16" /></div>
 
 <div className="max-w-[700px] mx-auto relative z-10 bg-white/70 p-10 rounded-[3rem] border-4 border-white shadow-xl backdrop-blur-sm">
 <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm mb-6 border-2 border-[#FBCFE8]">
 🍼 Baby Shower • Doğum Günü • 1 Yaş Partisi
 </div>
 <h1 className="font-heading text-4xl md:text-6xl font-black mb-6 leading-tight">
 Hayallerinizdeki <br/> <span className="">Masalsı Parti.</span>
 </h1>
 <p className="text-lg mb-8 font-medium leading-relaxed">
 Rengarenk balon zincirleri, isme özel konsept tasarımlar, sihirbazlar ve palyaçolar... Çocuğunuzun en özel gününü unutulmaz kılıyoruz!
 </p>
 <div className="flex justify-center">
 <a href={`tel:${businessData.phoneClean}`} className="text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-colors shadow-[0_6px_0_#1E3A8A] flex items-center gap-3">
 <Gift className="w-6 h-6" /> Konsept Seç
 </a>
 </div>
 </div>
 </section>
 )
}

export function OrganizasyonDogumFUNSERVICES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 px-6 bg-white border-y-4 border-[#FDF2F8]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1000px] mx-auto">
 <h2 className="font-heading text-3xl md:text-4xl font-black text-center mb-12 flex items-center justify-center gap-3">
 <StarIcon className="w-8 h-8 fill-current" /> Sihirli Dokunuşlarımız
 </h2>
 
 <div className="grid md:grid-cols-3 gap-6">
 <div className="p-8 rounded-[2rem] text-center border-4 border-[#FDE047] transform hover:-translate-y-2 transition-transform cursor-pointer">
 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
 <Palette className="w-10 h-10 " />
 </div>
 <h3 className="font-bold text-xl mb-2">Kişiye Özel Konsept</h3>
 <p className="font-medium text-sm">Safari, Deniz Kızı, Uzay... İstediğiniz temaya uygun afiş ve standlar.</p>
 </div>

 <div className="p-8 rounded-[2rem] text-center border-4 border-[#93C5FD] transform hover:-translate-y-2 transition-transform cursor-pointer">
 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
 <PartyPopper className="w-10 h-10 " />
 </div>
 <h3 className="font-bold text-xl mb-2">Animasyon & Oyun</h3>
 <p className="font-medium text-sm">Yüz boyama, sosis balon katlama, pamuk şeker ve interaktif çocuk oyunları.</p>
 </div>

 <div className="p-8 rounded-[2rem] text-center border-4 border-[#FDA4AF] transform hover:-translate-y-2 transition-transform cursor-pointer">
 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
 <Sparkles className="w-10 h-10 " />
 </div>
 <h3 className="font-bold text-xl mb-2">Balon Dekorasyonu</h3>
 <p className="font-medium text-sm">Standart ve makaron renklerde kemer balonlar, harf ve rakam folyo balonlar.</p>
 </div>
 </div>
 </div>
 </section>
 )
}

export function OrganizasyonDogumFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 text-center " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="flex items-center justify-center gap-2 font-heading font-black text-2xl mb-4 bg-white/50 w-max mx-auto px-6 py-2 rounded-full">
 🎈 {businessData.name}
 </div>
 <p className="font-medium ">Mutluluk Dağıtıyoruz • {businessData.city}</p>
 </footer>
 )
}

registerSection('hero', 'organizasyondogum_hero_0', OrganizasyonDogumPLAYFULHEADER)
registerSection('hero', 'organizasyondogum_hero_1', OrganizasyonDogumCUTEHERO)
registerSection('services', 'organizasyondogum_services_2', OrganizasyonDogumFUNSERVICES)
registerSection('footer', 'organizasyondogum_footer_3', OrganizasyonDogumFOOTER)
