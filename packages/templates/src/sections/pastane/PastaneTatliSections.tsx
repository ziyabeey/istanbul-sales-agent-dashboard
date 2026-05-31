// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Coffee, Shell, Leaf, Star } from 'lucide-react'

export function PastaneTatliTRADITIONALHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="bg-white border-b border-[#E5E0D8] px-6 py-5 sticky top-0 z-50 shadow-sm" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto flex items-center justify-between">
 <div className="font-serif italic text-3xl font-medium tracking-wide flex items-center gap-3">
 <Shell className="w-8 h-8 " strokeWidth={1.5} />
 {businessData.name}
 </div>
 <a href={`tel:${businessData.phoneClean}`} className="uppercase tracking-[0.2em] text-xs font-bold border border-[#1A4F36] px-5 py-2 hover:opacity-90 hover:text-white transition-colors">
 Tepsi Siparişi
 </a>
 </div>
 </header>
 )
}

export function PastaneTatliELEGANTHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="pt-24 pb-20 px-6 relative text-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[800px] mx-auto">
 <p className="uppercase tracking-[0.3em] text-sm font-semibold mb-6">Geleneksel Türk Tatlıları</p>
 <h1 className="font-serif text-5xl md:text-7xl font-normal mb-8 leading-[1.1]">
 Yüzyıllık Reçeteler, <br/> <span className="italic ">Gerçek Ustalar.</span>
 </h1>
 <p className="text-lg font-light mb-12 max-w-2xl mx-auto leading-relaxed">
 Gaziantep'ten gelen özel boz fıstık, saf sade yağ ve %100 pancar şekeri. 15 katmanlı çıtır baklavamız ve sütlü tatlılarımızla bayramların vazgeçilmezi.
 </p>
 <div className="flex justify-center">
 <a href={`https://wa.me/${businessData.whatsapp}`} className="text-white px-8 py-4 uppercase tracking-[0.2em] text-sm font-semibold hover:opacity-90 transition-colors shadow-lg">
 Adrese Teslim Sipariş
 </a>
 </div>
 </div>
 </section>
 )
}

export function PastaneTatliMENUHIGHLIGHTS({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 border-y border-[#E5E0D8]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-8">
 
 <div className="bg-white p-10 text-center shadow-sm border border-[#E5E0D8] group">
 <h3 className="font-serif text-2xl mb-4 border-b border-[#E5E0D8] pb-4">Cevizli Baklava</h3>
 <p className="font-light leading-relaxed mb-6 text-sm">
 İnce asılmış yufka, bol ceviz içi ve tam kıvamında şerbet. (1 Kg ~ 24 Dilim)
 </p>
 <span className="font-bold font-serif text-xl border border-[#D4B06D] px-4 py-1 rounded-full group-hover:opacity-90 group-hover:text-white transition-colors">750 ₺</span>
 </div>

 <div className="bg-white p-10 text-center shadow-sm border border-[#E5E0D8] group">
 <h3 className="font-serif text-2xl mb-4 border-b border-[#E5E0D8] pb-4">Fıstıklı Şöbiyet</h3>
 <p className="font-light leading-relaxed mb-6 text-sm">
 Bol fıstık, incecik hamur ve özel kaymaklı iç dolgusu ile damak çatlatan lezzet. (1 Kg)
 </p>
 <span className="font-bold font-serif text-xl border border-[#D4B06D] px-4 py-1 rounded-full group-hover:opacity-90 group-hover:text-white transition-colors">950 ₺</span>
 </div>

 <div className="bg-white p-10 text-center shadow-sm border border-[#E5E0D8] group">
 <h3 className="font-serif text-2xl mb-4 border-b border-[#E5E0D8] pb-4">Sütlü Nuriye</h3>
 <p className="font-light leading-relaxed mb-6 text-sm">
 Sütlü şerbeti ve fındıklı iç dolgusuyla hafif bir alternatif arayanlar için klasik.
 </p>
 <span className="font-bold font-serif text-xl border border-[#D4B06D] px-4 py-1 rounded-full group-hover:opacity-90 group-hover:text-white transition-colors">800 ₺</span>
 </div>

 </div>
 </section>
 )
}

export function PastaneTatliFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-20 text-center " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <Star className="w-8 h-8 mx-auto mb-6 fill-current"/>
 <div className="uppercase tracking-[0.3em] text-sm font-semibold opacity-90">
 {businessData.name} — {businessData.city}
 </div>
 </footer>
 )
}

registerSection('hero', 'pastanetatli_hero_0', PastaneTatliTRADITIONALHEADER)
registerSection('hero', 'pastanetatli_hero_1', PastaneTatliELEGANTHERO)
registerSection('services', 'pastanetatli_services_2', PastaneTatliMENUHIGHLIGHTS)
registerSection('footer', 'pastanetatli_footer_3', PastaneTatliFOOTER)
