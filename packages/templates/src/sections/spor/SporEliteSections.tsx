// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'


export function SporEliteLUXURYHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="px-8 py-8 md:py-10 flex items-center justify-between absolute w-full z-50" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading text-2xl tracking-[0.25em] uppercase font-light">
 {businessData.name}
 </div>
 <a href={`tel:${businessData.phoneClean}`} className="border border-[#D4AF37] px-8 py-2.5 uppercase tracking-[0.3em] font-medium hover:opacity-90 hover:opacity-90 transition-all /50 backdrop-blur-sm">
 Membership
 </a>
 </header>
 )
}

export function SporEliteSOPHISTICATEDHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="pt-40 pb-32 px-8 flex items-center justify-center min-h-[90vh] border-b border-[#2A2A2A] relative" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#111111] to-transparent -z-10"></div>

 <div className="max-w-[900px] text-center w-full">
 <p className="uppercase tracking-[0.4em] font-semibold mb-8">
 Premium Athletic Club
 </p>
 <h1 className="font-heading text-5xl md:text-7xl font-light leading-[1.2] mb-12">
 Elevating the <br/> <span className="italic ">Standard of Wellness.</span>
 </h1>
 <p className="font-light text-lg tracking-wide leading-relaxed max-w-2xl mx-auto mb-16">
 An exclusive sanctuary designed for those who demand excellence. State-of-the-art equipment, private training suites, spa, and recovery pools.
 </p>
 <a href="#amenities" className="uppercase tracking-[0.3em] font-semibold border-b border-[#D4AF37] pb-1 hover:opacity-90 hover:border-[#FAFAFA] transition-colors">
 Explore Amenities
 </a>
 </div>
 </section>
 )
}

export function SporEliteLUXURYAMENITIES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-32 px-8 " id="amenities" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto">
 <h2 className="font-heading text-3xl uppercase tracking-[0.2em] font-light mb-20 text-center">Exclusive Facilities</h2>
 
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
 <div className="border border-[#1A1A1A] p-10 hover:border-[#D4AF37] transition-all duration-500 group">
 <span className="font-heading text-4xl mb-6 block group-hover:opacity-90 transition-colors">01.</span>
 <h3 className="font-heading text-xl uppercase tracking-widest mb-4 font-light">Performance Training</h3>
 <p className="font-light leading-loose text-sm">
 Technogym Artis Serisi ile donatılmış, kalabalıktan uzak ferah egzersiz alanları. İleri düzey biyomekanik ve dijital takip.
 </p>
 </div>

 <div className="border border-[#1A1A1A] p-10 hover:border-[#D4AF37] transition-all duration-500 group">
 <span className="font-heading text-4xl mb-6 block group-hover:opacity-90 transition-colors">02.</span>
 <h3 className="font-heading text-xl uppercase tracking-widest mb-4 font-light">Spa & Recovery</h3>
 <p className="font-light leading-loose text-sm">
 Antrenman sonrası onarım. Termal havuzlar, infrared sauna, buhar odaları ve özel soğuk dalış terapileri.
 </p>
 </div>

 <div className="border border-[#1A1A1A] p-10 md:col-span-2 lg:col-span-1 hover:border-[#D4AF37] transition-all duration-500 group">
 <span className="font-heading text-4xl mb-6 block group-hover:opacity-90 transition-colors">03.</span>
 <h3 className="font-heading text-xl uppercase tracking-widest mb-4 font-light">Elite Coaching</h3>
 <p className="font-light leading-loose text-sm">
 Beslenme uzmanı ve spor profesyonellerinden oluşan ekiple, genetik haritanıza uygun VIP antrenman protokolleri.
 </p>
 </div>
 </div>
 </div>
 </section>
 )
}

export function SporEliteSTATUSQUOFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-24 text-center border-t border-[#1A1A1A] " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading text-2xl tracking-[0.4em] uppercase font-light mb-6">{businessData.name}</div>
 <p className="tracking-[0.3em] uppercase leading-loose font-semibold">
 Strictly by Invitation Or Application <br/> {businessData.district}, {businessData.city}
 </p>
 </footer>
 )
}

registerSection('hero', 'sporelite_hero_0', SporEliteLUXURYHEADER)
registerSection('hero', 'sporelite_hero_1', SporEliteSOPHISTICATEDHERO)
registerSection('services', 'sporelite_services_2', SporEliteLUXURYAMENITIES)
registerSection('footer', 'sporelite_footer_3', SporEliteSTATUSQUOFOOTER)
