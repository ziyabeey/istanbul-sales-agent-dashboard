// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'


export function RestoranTabledotFINEDININGHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="px-8 py-8 md:py-12 border-b border-[#E5E7EB] flex justify-center items-center relative bg-white" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading text-3xl md:text-4xl tracking-wider text-center">
 {businessData.name}
 </div>
 <a href={`tel:${businessData.phoneClean}`} className="absolute right-8 uppercase tracking-[0.2em] font-semibold hover:opacity-90 transition-colors hidden sm:block">
 Reservation
 </a>
 </header>
 )
}

export function RestoranTabledotEDITORIALHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-8 bg-white border-b border-[#E5E7EB]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[800px] mx-auto text-center">
 <p className="uppercase tracking-[0.3em] font-semibold mb-8">
 Executive Chef — {businessData?.ownerName as string}
 </p>
 <h1 className="font-heading text-5xl md:text-7xl mb-10 leading-[1.1] font-semibold">
 Gastronomy defined by <br/><i className="font-normal ">nature & precision.</i>
 </h1>
 <p className="text-lg mb-12 max-w-lg mx-auto leading-relaxed font-body font-light">
 A tasting menu that explores the terroir of Anatolia through contemporary techniques. Each plate is a structured narrative of seasonal ingredients.
 </p>
 <a href="#menu" className="font-body border border-[#1A1A1A] px-10 py-3 text-xs uppercase tracking-[0.2em] hover:opacity-90 hover:text-white transition-all">
 View Menu
 </a>
 </div>
 </section>
 )
}

export function RestoranTabledotTASTINGMENU({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-32 px-8 " id="menu" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[700px] mx-auto">
 <h2 className="font-heading text-3xl text-center mb-16 ">Le Menu de Dégustation</h2>
 
 <div className="space-y-12">
 <div className="text-center group border-b border-[#E5E7EB] pb-12">
 <h3 className="font-heading text-2xl mb-2 ">Amuse-Bouche</h3>
 <p className="font-light text-sm italic mb-2 tracking-wide">Wild Mushroom Tartlet, Truffle Foam</p>
 <span className="text-xs uppercase tracking-[0.2em] ">I</span>
 </div>

 <div className="text-center group border-b border-[#E5E7EB] pb-12">
 <h3 className="font-heading text-2xl mb-2 ">La Mer</h3>
 <p className="font-light text-sm italic mb-2 tracking-wide">Aegean Sea Bass Ceviche, Citrus Caviar, Dill Oil</p>
 <span className="text-xs uppercase tracking-[0.2em] ">II</span>
 </div>

 <div className="text-center group border-b border-[#E5E7EB] pb-12">
 <h3 className="font-heading text-2xl mb-2 ">Plat Principal</h3>
 <p className="font-light text-sm italic mb-2 tracking-wide">Aged Beef Tenderloin, Smoked Celery Purée, Jus</p>
 <span className="text-xs uppercase tracking-[0.2em] ">III</span>
 </div>

 <div className="text-center">
 <span className="block font-heading text-2xl mb-4">Prix Fixe — ₺2500</span>
 <span className="uppercase tracking-[0.2em] ">Wine Pairing +₺1500</span>
 </div>
 </div>
 </div>
 </section>
 )
}

export function RestoranTabledotFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-20 text-center border-t border-[#E5E7EB] bg-white" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <p className="font-heading text-2xl mb-6">{businessData.name}</p>
 <p className="uppercase font-semibold tracking-[0.3em] leading-loose">
 {businessData.address} <br/> {businessData.phone}
 </p>
 </footer>
 )
}

registerSection('hero', 'restorantabledot_hero_0', RestoranTabledotFINEDININGHEADER)
registerSection('hero', 'restorantabledot_hero_1', RestoranTabledotEDITORIALHERO)
registerSection('services', 'restorantabledot_services_2', RestoranTabledotTASTINGMENU)
registerSection('footer', 'restorantabledot_footer_3', RestoranTabledotFOOTER)
