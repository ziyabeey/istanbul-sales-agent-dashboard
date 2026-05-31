// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Camera, Heart, Star, CalendarHeart } from 'lucide-react'

export function FotoDogumSOFTHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="bg-white/60 backdrop-blur-md sticky top-0 z-50 border-b border-[#F9A8D4]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1000px] mx-auto px-6 h-24 flex items-center justify-between">
 <div className="font-heading font-black text-2xl flex items-center gap-3 ">
 <Heart className="w-6 h-6 fill-[#DB2777]" />
 {businessData.name}
 </div>
 <a href={`https://wa.me/${businessData.whatsapp}`} className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold hover:opacity-90 transition-colors">
 Çekim Planla
 </a>
 </div>
 </header>
 )
}

export function FotoDogumEMOTIONALHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 text-center relative overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {/* Soft Blobs */}
 <div className="absolute top-0 left-0 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
 <div className="absolute top-0 right-0 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
 
 <div className="max-w-[800px] mx-auto relative z-10">
 <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full font-bold text-sm mb-8 shadow-sm border border-[#FBCFE8] uppercase tracking-wide">
 <Star className="w-4 h-4 fill-[#F59E0B] " /> İstanbul Yenidoğan Stüdyosu
 </div>
 <h1 className="font-heading text-5xl md:text-7xl font-black mb-8 leading-tight">
 En Masum <br/> 
 <span className="">İlk Anlar.</span>
 </h1>
 <p className="text-xl mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
 Hamilelik serüveninizden, mucizenizin dünyaya gözlerini açtığı o ilk günlere kadar tüm duygularınızı sanata dönüştürüyoruz.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <a href={`tel:${businessData.phoneClean}`} className="text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-pink-500/30 flex items-center justify-center gap-2">
 <CalendarHeart className="w-5 h-5"/> Randevu Oluştur
 </a>
 </div>
 </div>
 </section>
 )
}

export function FotoDogumSOFTSERVICES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 bg-white border-y border-[#FBCFE8]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1000px] mx-auto text-center">
 <h2 className="font-heading text-4xl font-black mb-16">Neler Çekiyoruz?</h2>
 
 <div className="grid md:grid-cols-3 gap-8">
 <div className="p-8 rounded-[40px] border border-[#FCE7F3] hover:shadow-xl transition-shadow group">
 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-[#FBCFE8] group-hover:scale-110 transition-transform">
 <span className="text-4xl">🤰</span>
 </div>
 <h3 className="font-heading text-2xl font-black mb-3">Hamilelik</h3>
 <p className="font-medium leading-relaxed">Doğuma 4-6 hafta kala, sizi yormadan, doğal gün ışığı eşliğinde anılarınızı donduruyoruz.</p>
 </div>

 <div className="p-8 rounded-[40px] border border-[#FCE7F3] hover:shadow-xl transition-shadow group">
 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-[#FBCFE8] group-hover:scale-110 transition-transform">
 <span className="text-4xl">👶</span>
 </div>
 <h3 className="font-heading text-2xl font-black mb-3">Yenidoğan</h3>
 <p className="font-medium leading-relaxed">İlk 15 gün içinde, steril ve güvenli stüdyomuzda, ısıtıcılar eşliğinde poz verdirme çekimleri.</p>
 </div>

 <div className="p-8 rounded-[40px] border border-[#FCE7F3] hover:shadow-xl transition-shadow group">
 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-[#FBCFE8] group-hover:scale-110 transition-transform">
 <span className="text-4xl">🎂</span>
 </div>
 <h3 className="font-heading text-2xl font-black mb-3">1 Yaş & Smash Cake</h3>
 <p className="font-medium leading-relaxed">İlk yaş gününü doyasıya kutlarken, pastayı parçalama anının o tatlı ve neşeli kareleri.</p>
 </div>
 </div>
 </div>
 </section>
 )
}

export function FotoDogumFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-16 text-center font-medium" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <Heart className="w-6 h-6 fill-[#FBCFE8] mx-auto mb-4" />
 <p className="font-heading text-xl font-bold mb-2">{businessData.name}</p>
 <p className="text-sm opacity-80">{businessData.address}</p>
 </footer>
 )
}

registerSection('hero', 'fotodogum_hero_0', FotoDogumSOFTHEADER)
registerSection('hero', 'fotodogum_hero_1', FotoDogumEMOTIONALHERO)
registerSection('services', 'fotodogum_services_2', FotoDogumSOFTSERVICES)
registerSection('footer', 'fotodogum_footer_3', FotoDogumFOOTER)
