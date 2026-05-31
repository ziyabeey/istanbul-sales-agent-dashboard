// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Megaphone, Target, ArrowRight, Phone, Mail, MapPin } from 'lucide-react'

export function MatbaaReklamHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="sticky top-0 z-50 border-b-2 border-dashed border-[var(--color-border)]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
 <div className="font-heading font-black text-3xl uppercase tracking-tighter flex items-center gap-3">
 <span className="w-10 h-10 flex items-center justify-center rounded-br-2xl transform -rotate-6">R</span>
 {businessData.name}
 </div>
 <a href="#iletisim" className="text-white font-bold px-8 py-3 uppercase tracking-wider text-xs hover:opacity-90 transition-colors">
 Açık Hava Çözümleri
 </a>
 </div>
 </header>
 )
}

export function MatbaaReklamHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="px-6 py-20 md:py-32 border-b border-[var(--color-border)]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
 <div className="space-y-8">
 <div className="border border-[var(--color-accent)]/30 px-4 py-2 font-bold uppercase text-xs tracking-widest inline-flex">
 Endüstriyel Reklam Baskıları
 </div>
 <h1 className="font-heading text-6xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter">
 Büyük <br/>
 <span className="text-transparent bg-clip-text" style={{ WebkitTextStroke: '2px var(--color-text)', color: 'transparent' }}>Düşün</span> <br/>
 Büyük <br/>
 <span className="">Baskı.</span>
 </h1>
 <p className="text-xl md:text-2xl font-medium border-l-8 border-[var(--color-accent)] pl-6">
 Araç giydirme, cephe kaplama, totem ve XXL dijital baskı hizmetleriyle markanızı sokağa taşıyoruz.
 </p>
 <div className="flex pt-4">
 <a href="#iletisim" className="px-10 py-5 font-black uppercase tracking-wider hover:opacity-90 transition-colors flex items-center gap-4 group">
 Teklif İstiyorum <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
 </a>
 </div>
 </div>
 <div className="relative hidden lg:block h-full min-h-[600px]">
 <div className="absolute inset-0 /10 border-4 border-[var(--color-text)] translate-x-8 translate-y-8 mix-blend-multiply" />
 <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-surface)] to-[var(--color-bg)] border-2 border-[var(--color-border)] p-12 flex flex-col justify-between">
 <div className="font-black leading-none opacity-20 absolute -right-10 -bottom-10 mix-blend-overlay">R</div>
 <h3 className="font-heading text-4xl font-black uppercase z-10">Makine <br/> Parkuru</h3>
 <ul className="space-y-4 z-10 font-bold text-lg ">
 <li className="flex items-center gap-3"><Target className="w-6 h-6 " /> 5m UV Roll-to-Roll</li>
 <li className="flex items-center gap-3"><Target className="w-6 h-6 " /> 3x2m Flatbed Kesici</li>
 <li className="flex items-center gap-3"><Target className="w-6 h-6 " /> CNC & Lazer Kesim</li>
 </ul>
 </div>
 </div>
 </div>
 </section>
 )
}

export function MatbaaReklamPROHIZMETLER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="hizmetler" className="py-24 px-6 " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1440px] mx-auto">
 <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
 <h2 className="font-heading text-5xl md:text-6xl font-black uppercase tracking-tighter max-w-2xl leading-[0.9]">Üretim <br/><span className="">Hizmetlerimiz</span></h2>
 <p className="text-xl opacity-80 max-w-md font-medium">B2B reklam ajansları ve kurumsal markalara fason & tam entegre üretim desteği.</p>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8">
 {businessData.services?.map((service: any, idx: number) => (
 <div key={service.id || idx} className="p-10 border border-white/20 hover:border-[var(--color-accent)] bg-black/20 group transition-all">
 <div className="w-16 h-16 rounded-sm flex items-center justify-center mb-8 rotate-3 transform group-hover:rotate-12 transition-transform">
 <Megaphone className="w-8 h-8 " />
 </div>
 <h3 className="font-heading font-black text-3xl mb-4 uppercase">{service.name}</h3>
 <p className="text-lg opacity-80 leading-relaxed font-medium">{service.description || 'Dış mekan hava koşullarına dayanıklı, uzun ömürlü ve renk tutarlılığı garantili üretim.'}</p>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}

export function MatbaaReklamILETISIM({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="iletisim" className="py-24 px-6 " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1440px] mx-auto flex flex-col items-center">
 <h2 className="font-heading text-5xl font-black uppercase tracking-tighter mb-12 text-center">İş Birliği İçin</h2>
 <div className="grid sm:grid-cols-3 gap-6 w-full max-w-4xl">
 <a href={`tel:${businessData.phoneClean}`} className="border-2 border-[var(--color-border)] p-10 flex flex-col items-center text-center hover:border-[var(--color-text)] transition-colors group">
 <Phone className="w-10 h-10 mb-6 group-hover:scale-110 transition-transform" />
 <div className="font-bold uppercase tracking-wider text-xs mb-2">Telefon / WhatsApp</div>
 <div className="font-heading text-2xl font-black">{businessData.phone}</div>
 </a>
 <div className="border-2 border-[var(--color-border)] p-10 flex flex-col items-center text-center hover:border-[var(--color-text)] transition-colors group">
 <Mail className="w-10 h-10 mb-6 group-hover:scale-110 transition-transform" />
 <div className="font-bold uppercase tracking-wider text-xs mb-2">E-Posta (Tasarım Gönderimi)</div>
 <div className="font-heading text-2xl font-black break-all">{businessData.email || 'info@reklambaski.com'}</div>
 </div>
 <div className="border-2 border-[var(--color-border)] p-10 flex flex-col items-center text-center hover:border-[var(--color-text)] transition-colors group">
 <MapPin className="w-10 h-10 mb-6 group-hover:scale-110 transition-transform" />
 <div className="font-bold uppercase tracking-wider text-xs mb-2">Üretim Tesisi</div>
 <div className="font-heading text-2xl font-black">{businessData.district} / {businessData.city}</div>
 </div>
 </div>
 </div>
 </section>
 )
}

export function MatbaaReklamFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 border-t border-[var(--color-border)] text-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading font-black uppercase tracking-widest text-sm">
 {businessData.name} © {new Date().getFullYear()}
 </div>
 </footer>
 )
}

registerSection('hero', 'matbaareklam_hero_0', MatbaaReklamHEADER)
registerSection('hero', 'matbaareklam_hero_1', MatbaaReklamHERO)
registerSection('services', 'matbaareklam_services_2', MatbaaReklamPROHIZMETLER)
registerSection('services', 'matbaareklam_services_3', MatbaaReklamILETISIM)
registerSection('footer', 'matbaareklam_footer_4', MatbaaReklamFOOTER)
