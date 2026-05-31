// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Mic2, Ticket, Speaker, Zap } from 'lucide-react'

export function OrganizasyonKonserNEONHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="bg-black border-b border-[#27272A] px-6 py-4 sticky top-0 z-50" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto flex items-center justify-between">
 <div className="font-heading font-black text-3xl tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-[#D946EF] to-[#06B6D4]">
 {businessData.name} <span className="text-white">LIVE</span>
 </div>
 <a href={`tel:${businessData.phoneClean}`} className="hover:opacity-90 text-white px-6 py-2 rounded font-black uppercase text-sm tracking-wider transition-colors">
 Booking İletişim
 </a>
 </div>
 </header>
 )
}

export function OrganizasyonKonserLOUDHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 md:py-32 relative overflow-hidden text-center " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {/* Stage Lights */}
 <div className="absolute top-0 left-1/4 w-[2px] h-full bg-gradient-to-b from-[#06B6D4] to-transparent opacity-50 rotate-[-15deg]"></div>
 <div className="absolute top-0 right-1/4 w-[2px] h-full bg-gradient-to-b from-[#D946EF] to-transparent opacity-50 rotate-[15deg]"></div>
 
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full mix-blend-screen opacity-20 blur-[100px] pointer-events-none"></div>

 <div className="max-w-[900px] mx-auto relative z-10">
 <h1 className="font-heading text-6xl md:text-9xl font-black mb-8 leading-[0.85] tracking-tighter uppercase">
 ETKİNLİĞİ <br/>
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#D946EF]">
 FESTİVALE ÇEVİR.
 </span>
 </h1>
 <p className="text-lg font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
 Açık hava festivalleri, üniversite şenlikleri, stadyum konserleri. Sanatçı booking ağımız, devasa truss sistemleri ve L-Acoustics line-array ses altyapımız ile gerçek stadyum deneyimi.
 </p>
 <div className="flex flex-col sm:flex-row justify-center gap-4">
 <a href={`https://wa.me/${businessData.whatsapp}`} className="bg-white text-black px-10 py-5 rounded font-black text-lg uppercase tracking-widest hover:opacity-90 transition-colors flex items-center justify-center gap-3">
 <Zap className="w-6 h-6 fill-current"/> Teknik Prodüksiyon İste
 </a>
 </div>
 </div>
 </section>
 )
}

export function OrganizasyonKonserTECHNICALSERVICES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 border-y border-[#27272A]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-6">
 
 <div className="p-10 border border-[#27272A] hover:border-[#D946EF] transition-colors text-center">
 <Mic2 className="w-12 h-12 mx-auto mb-6" strokeWidth={1.5} />
 <h3 className="text-2xl font-black mb-3 uppercase italic">Artist Booking</h3>
 <p className="font-medium leading-relaxed">A-List sanatçılar, DJ'ler ve gruplar. Doğrudan menajerlik anlaşmaları ile bütçeye uygun lineup oluşturma.</p>
 </div>

 <div className="p-10 border border-[#27272A] hover:border-[#06B6D4] transition-colors text-center">
 <Speaker className="w-12 h-12 mx-auto mb-6" strokeWidth={1.5} />
 <h3 className="text-2xl font-black mb-3 uppercase italic">Ses & Işık (Truss)</h3>
 <p className="font-medium leading-relaxed">100.000+ kapasiteli alanlar için devasa sahne kurulumları, Line-Array ses sistemleri, lazer ve pyro şovları.</p>
 </div>

 <div className="p-10 border border-[#27272A] hover:border-[#D946EF] transition-colors text-center">
 <Ticket className="w-12 h-12 mx-auto mb-6" strokeWidth={1.5} />
 <h3 className="text-2xl font-black mb-3 uppercase italic">Saha & Güvenlik</h3>
 <p className="font-medium leading-relaxed">Biletleme altyapısı, RFID bileklik kontrolü, VIP alan yönetimi, bariyer sistemi ve profesyonel güvenlik.</p>
 </div>

 </div>
 </section>
 )
}

export function OrganizasyonKonserFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 bg-black text-center text-sm font-black uppercase tracking-widest" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {businessData.name} LIVE EVENTS | FOUNDED {businessData.foundedYear}
 </footer>
 )
}

registerSection('hero', 'organizasyonkonser_hero_0', OrganizasyonKonserNEONHEADER)
registerSection('hero', 'organizasyonkonser_hero_1', OrganizasyonKonserLOUDHERO)
registerSection('services', 'organizasyonkonser_services_2', OrganizasyonKonserTECHNICALSERVICES)
registerSection('footer', 'organizasyonkonser_footer_3', OrganizasyonKonserFOOTER)
