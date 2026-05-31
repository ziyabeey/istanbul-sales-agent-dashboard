// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Music, Star, Smile, Sparkles, MapPin } from 'lucide-react'

export function MuzikCocukPLAYFULHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b-4 border-[#F9A8D4]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1000px] mx-auto px-6 h-20 flex items-center justify-between">
 <div className="font-heading font-black text-2xl flex items-center gap-2 ">
 <span className="w-10 h-10 text-white rounded-full flex items-center justify-center text-xl shadow-inner">
 🎵
 </span>
 {businessData.name}
 </div>
 <a href={`https://wa.me/${businessData.whatsapp}`} className="text-white px-6 py-2.5 rounded-full font-bold hover:opacity-90 hover:scale-105 transition-all shadow-[0_4px_0_#9D174D]">
 Ücretsiz Deneme Dersi!
 </a>
 </div>
 </header>
 )
}

export function MuzikCocukCOLORFULHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 md:py-28 px-6 relative text-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {/* Floating Shapes */}
 <div className="absolute top-10 left-10 opacity-60 animate-bounce"><Star className="w-16 h-16 fill-current" /></div>
 <div className="absolute bottom-10 right-10 opacity-60 animate-pulse"><Music className="w-16 h-16" /></div>
 <div className="absolute top-20 right-20 opacity-60 animate-bounce" style={{animationDelay: '1s'}}><Sparkles className="w-12 h-12" /></div>

 <div className="max-w-[700px] mx-auto relative z-10 bg-white/60 p-8 md:p-12 rounded-[3rem] border-4 border-white shadow-xl backdrop-blur-sm">
 <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm mb-6 border-2 border-[#FCD34D]">
 👶 3-7 Yaş Erken Müzik Eğitimi
 </div>
 <h1 className="font-heading text-4xl md:text-6xl font-black mb-6 leading-tight">
 Şarkı Söyle, Dans Et, <br/> <span className="">Müziği Keşfet!</span>
 </h1>
 <p className="text-lg mb-8 font-medium leading-relaxed">
 Orff yaklaşımı ile çocuklarınızın ritim duygusunu, motor becerilerini ve sanat sevgisini oyunlarla geliştiriyoruz. Neşeli melodiler mini modzartları bekliyor.
 </p>
 <div className="flex justify-center">
 <a href={`tel:${businessData.phoneClean}`} className="text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-colors shadow-[0_6px_0_#1E3A8A] flex items-center gap-3">
 <Smile className="w-6 h-6" /> Hemen Kayıt Ol
 </a>
 </div>
 </div>
 </section>
 )
}

export function MuzikCocukFUNCATEGORIES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 px-6 bg-white border-y-4 border-[#FDF2F8]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1000px] mx-auto">
 <h2 className="font-heading text-3xl md:text-4xl font-black text-center mb-12 flex items-center justify-center gap-3">
 <Star className="w-8 h-8 fill-current" /> Neler Öğreniyoruz?
 </h2>
 
 <div className="grid md:grid-cols-3 gap-6">
 <div className="p-8 rounded-[2rem] text-center border-4 border-[#FDE047] transform hover:-translate-y-2 transition-transform cursor-pointer">
 <div className="text-5xl mb-4">🥁</div>
 <h3 className="font-bold text-xl mb-2">Ritim & Orff</h3>
 <p className="font-medium text-sm">Beden perküsyonu ve renkli vurmalı çalgılarla ritim duygusu.</p>
 </div>

 <div className="p-8 rounded-[2rem] text-center border-4 border-[#93C5FD] transform hover:-translate-y-2 transition-transform cursor-pointer">
 <div className="text-5xl mb-4">🎹</div>
 <h3 className="font-bold text-xl mb-2">Piyano Çalıyorum</h3>
 <p className="font-medium text-sm">Renklerle notaları harmanlayan temel piyano başlangıç eğitimi.</p>
 </div>

 <div className="p-8 rounded-[2rem] text-center border-4 border-[#FDA4AF] transform hover:-translate-y-2 transition-transform cursor-pointer">
 <div className="text-5xl mb-4">🎤</div>
 <h3 className="font-bold text-xl mb-2">Çocuk Korosu</h3>
 <p className="font-medium text-sm">Birlikte şarkı söyleme, ses açma ve sahne özgüveni kazanma.</p>
 </div>
 </div>
 </div>
 </section>
 )
}

export function MuzikCocukFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 text-center " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="flex items-center justify-center gap-2 font-heading font-black text-2xl mb-4 bg-white/50 w-max mx-auto px-6 py-2 rounded-full">
 🎵 {businessData.name}
 </div>
 <p className="font-medium flex items-center justify-center gap-2">
 <MapPin className="w-4 h-4" /> {businessData.address}
 </p>
 </footer>
 )
}

registerSection('hero', 'muzikcocuk_hero_0', MuzikCocukPLAYFULHEADER)
registerSection('hero', 'muzikcocuk_hero_1', MuzikCocukCOLORFULHERO)
registerSection('services', 'muzikcocuk_services_2', MuzikCocukFUNCATEGORIES)
registerSection('footer', 'muzikcocuk_footer_3', MuzikCocukFOOTER)
