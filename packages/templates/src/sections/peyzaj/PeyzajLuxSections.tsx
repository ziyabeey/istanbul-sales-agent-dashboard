// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Castle, Sparkles, Gem, ArrowUpRight } from 'lucide-react'

export function PeyzajLuxLUXURYHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="border-b border-[#1A2622]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1400px] mx-auto px-8 h-28 flex items-center justify-between">
 <div className="font-heading font-light tracking-[0.2em] uppercase text-2xl flex items-center gap-4">
 <Castle className="w-6 h-6" strokeWidth={1.5} />
 {businessData.name}
 </div>
 <div className="text-xs uppercase tracking-[0.4em] ">
 Estate Management
 </div>
 </div>
 </header>
 )
}

export function PeyzajLuxESTATEHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-32 px-8 relative overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {/* Deep Emerald Glow */}
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] /10 blur-[150px] -z-10 rounded-full"></div>

 <div className="max-w-[1000px] mx-auto text-center">
 <p className="tracking-[0.3em] text-xs font-semibold mb-8 uppercase">V.I.P. Malikane & Villa Peyzajı</p>
 <h1 className="font-heading text-6xl md:text-8xl font-light mb-10 max-w-4xl mx-auto leading-[1.1] tracking-tighter text-white">
 İhtişamın <br/> 
 <i className="font-serif">Açık Havadaki</i> Yansıması.
 </h1>
 <p className="text-lg max-w-2xl mx-auto font-light leading-relaxed mb-16">
 Büyük ölçekli araziler, saray yavruları ve lüks villalar için üst düzey botanik tasarım, su temaları, sanatsal budama (topiary) ve 7/24 özel bakım servisi.
 </p>
 
 <a href={`tel:${businessData.phoneClean}`} className="text-white px-10 py-5 uppercase text-xs font-bold tracking-[0.2em] hover:bg-white hover:opacity-90 transition-colors inline-flex items-center gap-3">
 Özel Randevu Talep Merkezi <ArrowUpRight className="w-4 h-4" />
 </a>
 </div>
 </section>
 )
}

export function PeyzajLuxPREMIUMSERVICES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-8 border-t border-[#1A2622] " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-12">
 
 <div className="border border-[#1A2622] p-10 group hover:border-[#059669] transition-colors">
 <Gem className="w-8 h-8 mb-8" strokeWidth={1} />
 <h3 className="font-serif text-3xl text-white mb-4">Geniş Alan Yönetimi</h3>
 <p className="font-light text-sm leading-loose">Golf sahası kalitesinde çim bakım teknikleri, mevsimsel ve ithal nadide ağaç türlerinin devasa alanlarda orkestrasyonu.</p>
 </div>

 <div className="border border-[#1A2622] p-10 group hover:border-[#059669] transition-colors">
 <Sparkles className="w-8 h-8 mb-8" strokeWidth={1} />
 <h3 className="font-serif text-3xl text-white mb-4">Su & Işık Mimarisi</h3>
 <p className="font-light text-sm leading-loose">Gece ambiyansını tamamen değiştiren fiber optik havuz aydınlatmaları, anıtsal çeşmeler ve peyzaja entegre ses sistemleri.</p>
 </div>

 <div className="border border-[#1A2622] p-10 group hover:border-[#059669] transition-colors">
 <Castle className="w-8 h-8 mb-8" strokeWidth={1} />
 <h3 className="font-serif text-3xl text-white mb-4">Konsiyerj Bahçıvanlık</h3>
 <p className="font-light text-sm leading-loose">Malikane sahiplerine özel atanmış, peyzaj mimarı liderliğinde çalışan ve protokol kurallarına hakim VIP bahçıvan ekibi.</p>
 </div>

 </div>
 </section>
 )
}

export function PeyzajLuxFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-20 text-center font-light text-xs tracking-[0.3em] uppercase" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="w-10 h-[1px] mx-auto mb-8"></div>
 {businessData.name} — THE ART OF LANDSCAPE
 </footer>
 )
}

registerSection('hero', 'peyzajlux_hero_0', PeyzajLuxLUXURYHEADER)
registerSection('hero', 'peyzajlux_hero_1', PeyzajLuxESTATEHERO)
registerSection('services', 'peyzajlux_services_2', PeyzajLuxPREMIUMSERVICES)
registerSection('footer', 'peyzajlux_footer_3', PeyzajLuxFOOTER)
