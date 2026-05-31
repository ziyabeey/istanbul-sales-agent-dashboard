// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Mic2, Headphones, Activity, ArrowUpRight } from 'lucide-react'

export function MuzikPopNEONHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="bg-black/50 backdrop-blur-xl border-b border-white/10 px-6 py-4 sticky top-0 z-50" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto flex items-center justify-between">
 <div className="font-heading font-black text-2xl tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#FF0080] to-[#7928CA]">
 {businessData.name}
 </div>
 <a href={`tel:${businessData.phoneClean}`} className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full font-bold text-sm transition-colors border border-white/10">
 Ses Analizi Randevusu
 </a>
 </div>
 </header>
 )
}

export function MuzikPopVIBRANTHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 md:py-32 relative overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {/* Neon Glows */}
 <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full mix-blend-screen opacity-30 blur-[100px] pointer-events-none"></div>
 <div className="absolute bottom-1/4 -left-32 w-96 h-96 rounded-full mix-blend-screen opacity-30 blur-[100px] pointer-events-none"></div>

 <div className="max-w-[900px] mx-auto text-center relative z-10">
 <h1 className="font-heading text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
 SESİNİ <br/>
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0080] to-[#7928CA]">
 ÖZGÜR BIRAK.
 </span>
 </h1>
 <p className="text-lg font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
 Profesyonel şan teknikleri, nefes kontrolü, mikrofonda hakimiyet ve sahne performansı. Kendi tarzını yarat ve vokalinle sınırları aş.
 </p>
 <div className="flex flex-col sm:flex-row justify-center gap-4">
 <a href={`https://wa.me/${businessData.whatsapp}`} className="bg-gradient-to-r from-[#FF0080] to-[#7928CA] text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group">
 Eğitimlere Göz At <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform"/>
 </a>
 </div>
 </div>
 </section>
 )
}

export function MuzikPopMODERNCOURSES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 relative z-10" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-6">
 
 <div className="p-8 rounded-2xl border border-white/5 hover:border-[#FF0080]/50 transition-colors group">
 <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF0080] to-[#7928CA] flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
 <Mic2 className="w-6 h-6" />
 </div>
 <h3 className="text-xl font-bold mb-3 uppercase tracking-wide">Şan ve Vokal Koçluğu</h3>
 <p className="font-medium leading-relaxed">Doğru nefes (diyafram), ses tellerini koruma, entonasyon ve geniş oktav teknikleri. Kişisel ses rengini bulma.</p>
 </div>

 <div className="p-8 rounded-2xl border border-white/5 hover:border-[#7928CA]/50 transition-colors group">
 <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF0080] to-[#7928CA] flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
 <Headphones className="w-6 h-6" />
 </div>
 <h3 className="text-xl font-bold mb-3 uppercase tracking-wide">Stüdyo Kayıt Pratiği</h3>
 <p className="font-medium leading-relaxed">Mikrofon teknikleri, kulaklık dinlemesi ve stüdyo ortamında kayıt yapma deneyimi. Single projelerine hazırlık.</p>
 </div>

 <div className="p-8 rounded-2xl border border-white/5 hover:border-[#00F0FF]/50 transition-colors group">
 <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF0080] to-[#7928CA] flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
 <Activity className="w-6 h-6" />
 </div>
 <h3 className="text-xl font-bold mb-3 uppercase tracking-wide">Ritim & Armoni</h3>
 <p className="font-medium leading-relaxed">Modern popüler müzik teorisi, eşlik yeteneği ve şarkı yazarlığı (songwriting) atölyeleri.</p>
 </div>

 </div>
 </section>
 )
}

export function MuzikPopFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-8 bg-black border-t border-white/10 text-center text-sm font-medium" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <p className="uppercase tracking-widest">{businessData.name} VOCAL ACADEMY © 2024</p>
 </footer>
 )
}

registerSection('hero', 'muzikpop_hero_0', MuzikPopNEONHEADER)
registerSection('hero', 'muzikpop_hero_1', MuzikPopVIBRANTHERO)
registerSection('services', 'muzikpop_services_2', MuzikPopMODERNCOURSES)
registerSection('footer', 'muzikpop_footer_3', MuzikPopFOOTER)
