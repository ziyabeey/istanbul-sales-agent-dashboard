// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'


export function TerziLuxEDITORIALHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="px-10 py-8 absolute w-full z-50 flex items-center justify-between mix-blend-difference text-white" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading text-3xl tracking-[0.2em] uppercase font-bold">
 {businessData.name}
 </div>
 <a href="#atelier" className="tracking-[0.3em] uppercase font-bold border-b border-transparent hover:border-white transition-all">
 The Atelier
 </a>
 </header>
 )
}

export function TerziLuxAVANTGARDEHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 relative border-b border-[#1A1A1A]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {/* Cinematic grain overlay */}
 <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
 
 <div className="max-w-[800px] text-center w-full z-10 pt-20">
 <h1 className="font-heading text-6xl md:text-9xl tracking-normal text-white uppercase leading-[0.85] mb-8 font-bold">
 Couture <br/> <span className="italic font-serif tracking-tight lowercase">refined.</span>
 </h1>
 <p className="text-lg font-light tracking-wide max-w-md mx-auto mb-16 leading-relaxed">
 Architectural silhouettes, rare Italian silks, and uncompromising craftsmanship. Redefining modern luxury bespoke.
 </p>
 <a href={`tel:${businessData.phoneClean}`} className="border border-[#374151] px-10 py-4 uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-colors">
 Book Consultation
 </a>
 </div>
 </section>
 )
}

export function TerziLuxMINIMALISTSHOWCASE({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-32 px-6" id="atelier" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto">
 
 <div className="grid md:grid-cols-2 gap-20 items-center">
 <div className="order-2 md:order-1 space-y-20">
 <div>
 <span className="uppercase font-bold tracking-[0.3em] block mb-4">I. The Paradigm</span>
 <h3 className="font-heading text-4xl uppercase text-white tracking-widest mb-6">Bespoke Gown</h3>
 <p className="font-light leading-relaxed">
 Every gown is a sculpted piece of art. From the initial muslin drape to the final cascade of silk organza, we orchestrate elegance down to the microscopic thread.
 </p>
 </div>

 <div>
 <span className="uppercase font-bold tracking-[0.3em] block mb-4">II. The Structure</span>
 <h3 className="font-heading text-4xl uppercase text-white tracking-widest mb-6">Tuxedo & Suit</h3>
 <p className="font-light leading-relaxed">
 Sharp, aggressive lapels meeting soft, unstructured shoulders. A paradox of tension and release. Embodying the vanguard of menswear.
 </p>
 </div>
 </div>

 <div className="order-1 md:order-2">
 <div className="aspect-[3/4] border border-[#1A1A1A] flex items-center justify-center p-12">
 <p className="font-serif italic text-3xl text-center leading-snug">
 "Elegance is refusal." <br/> <span className="text-sm font-sans uppercase tracking-[0.3em] font-bold mt-6 block">— The Maison</span>
 </p>
 </div>
 </div>
 </div>

 </div>
 </section>
 )
}

export function TerziLuxBLACKFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-24 border-t border-[#1A1A1A] flex flex-col items-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading text-5xl font-bold uppercase tracking-[0.2em] mb-8">{businessData.name}</div>
 <p className="uppercase tracking-[0.4em] font-bold">
 Paris • Milan • {businessData.district}
 </p>
 </footer>
 )
}

registerSection('hero', 'terzilux_hero_0', TerziLuxEDITORIALHEADER)
registerSection('hero', 'terzilux_hero_1', TerziLuxAVANTGARDEHERO)
registerSection('services', 'terzilux_services_2', TerziLuxMINIMALISTSHOWCASE)
registerSection('footer', 'terzilux_footer_3', TerziLuxBLACKFOOTER)
