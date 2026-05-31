// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Crown, Sparkles, Diamond } from 'lucide-react'

export function PastaneLuxCHOCOLATIERHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="px-8 py-10 md:py-16 flex justify-between items-center absolute w-full z-50" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-serif text-3xl uppercase tracking-[0.3em] flex items-center gap-4">
 <Crown className="w-8 h-8 " strokeWidth={1}/>
 {businessData.name}
 </div>
 <div className="hidden md:block uppercase font-bold tracking-[0.4em] ">
 Master Chocolatier & Patisserie
 </div>
 </header>
 )
}

export function PastaneLuxVELVETHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="h-screen flex items-center px-8 relative overflow-hidden " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {/* Gold Glow */}
 <div className="absolute right-0 bottom-0 w-[600px] h-[600px] rounded-full mix-blend-screen opacity-[0.03] blur-[150px] pointer-events-none"></div>

 <div className="max-w-[1400px] w-full mx-auto relative z-20 pt-32 xl:pt-48">
 <h1 className="font-serif text-5xl md:text-8xl uppercase mb-8 leading-[0.95] tracking-tight max-w-4xl text-white">
 Çikolatanın <br/> <span className="italic font-light tracking-wide">en asil </span> hali.
 </h1>
 <p className="text-lg font-light mb-16 max-w-xl leading-relaxed">
 Belçika Callebaut çikolatası ve el yapımı altın varaklı truffle koleksiyonları. VIP kokteyller ve özel kutlamalar için kişiselleştirilmiş hediye kutuları.
 </p>
 <a href={`https://wa.me/${businessData.whatsapp}`} className="inline-flex items-center gap-3 uppercase text-xs font-bold tracking-[0.2em] px-8 py-4 hover:opacity-90 transition-colors">
 <Diamond className="w-4 h-4" /> Koleksiyonu İncele
 </a>
 </div>
 </section>
 )
}

export function PastaneLuxPREMIUMSHOWCASE({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-32 px-8 border-t border-[#291D17]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 items-center">
 
 <div className="space-y-12">
 <div className="group border-b border-[#291D17] pb-8">
 <h3 className="text-xl font-serif uppercase tracking-[0.2em] mb-4 ">Signature Truffles</h3>
 <p className="text-sm leading-relaxed font-light">
 Madagaskar vanilyası, taze frambuaz ve 24 ayar yenilebilir altın kaplamalı el yapımı truffle çikolataları. Ahşap özel kutu tasarımı.
 </p>
 </div>

 <div className="group border-b border-[#291D17] pb-8">
 <h3 className="text-xl font-serif uppercase tracking-[0.2em] mb-4 ">Macaron de Paris</h3>
 <p className="text-sm leading-relaxed font-light">
 Kusursuz kıvamı ve İtalyan merengi ile hazırlanan ganaj dolgulu lüks makaron kuleleri. Düğünler için piramit sunumlar.
 </p>
 </div>
 </div>

 <div className="h-[400px] border border-[#291D17] flex items-center justify-center p-12 relative">
 <Sparkles className="absolute top-8 left-8 opacity-30 w-8 h-8"/>
 <div className="text-center">
 <span className="block font-serif text-5xl mb-4">1999</span>
 <span className="uppercase tracking-[0.4em] ">Yılından Beri Sanat</span>
 </div>
 </div>

 </div>
 </section>
 )
}

export function PastaneLuxFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-16 text-center uppercase font-bold tracking-[0.4em] border-t border-[#291D17]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {businessData.name} FINE CHOCOLATES & PASTRY
 </footer>
 )
}

registerSection('hero', 'pastanelux_hero_0', PastaneLuxCHOCOLATIERHEADER)
registerSection('hero', 'pastanelux_hero_1', PastaneLuxVELVETHERO)
registerSection('services', 'pastanelux_services_2', PastaneLuxPREMIUMSHOWCASE)
registerSection('footer', 'pastanelux_footer_3', PastaneLuxFOOTER)
