// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Briefcase, UserRound, ArrowRightCircle } from 'lucide-react'

export function FotoPortrePROFESSIONALHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
 <div className="font-heading font-black text-2xl tracking-tight ">
 {businessData.name} <span className="">.STUDIO</span>
 </div>
 <div className="flex items-center gap-6 font-semibold text-sm">
 <a href="#hizmetler" className="hidden md:block text-neutral-500 hover:opacity-90 transition-colors">Hizmetler</a>
 <a href={`tel:${businessData.phoneClean}`} className="text-white px-5 py-2 hover:opacity-90 transition-colors rounded-sm">
 Randevu
 </a>
 </div>
 </div>
 </header>
 )
}

export function FotoPortreCORPORATEHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 md:py-32 px-6 flex flex-col items-center text-center bg-neutral-50" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="inline-flex items-center gap-2 bg-neutral-200/50 text-neutral-700 px-4 py-1.5 font-bold text-xs uppercase tracking-widest mb-8 rounded-sm">
 <Briefcase className="w-4 h-4" /> BİREYSEL & KURUMSAL ÇÖZÜMLER
 </div>
 <h1 className="font-heading text-5xl md:text-7xl font-black mb-8 tracking-tighter max-w-4xl leading-[1.1]">
 İş Dünyasındaki İzini <br className="hidden md:block" /> Güçlendir.
 </h1>
 <p className="text-xl text-neutral-500 font-medium mb-10 max-w-2xl leading-relaxed">
 LinkedIn profilinden, CV fotoğraflarına, şirket içi personel çekimlerinden yönetici portrelerine kadar profesyonel vizaj ve ışık tasarımı.
 </p>
 <a href={`https://wa.me/${businessData.whatsapp}`} className="text-white px-8 py-4 font-bold text-lg hover:opacity-90 transition-colors rounded-sm flex items-center gap-2">
 Stüdyo Çekimi Ayarla <ArrowRightCircle className="w-5 h-5"/>
 </a>
 </section>
 )
}

export function FotoPortrePROCESSMODULES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="hizmetler" className="py-24 px-6" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto">
 <h2 className="font-heading text-4xl font-black tracking-tight mb-16 text-center">Neden Profesyonel Portre?</h2>
 
 <div className="grid md:grid-cols-3 gap-8">
 <div className="border border-neutral-200 p-8 hover:border-[#3B82F6] transition-colors bg-white shadow-sm">
 <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center rounded-full mb-6 ">
 <UserRound className="w-6 h-6" />
 </div>
 <h3 className="font-bold text-xl mb-3 ">LinkedIn & CV</h3>
 <p className="text-neutral-500 font-medium leading-relaxed">İlk intiba her şeydir. İşverenlerin %80'i profil fotoğrafınızın kalitesine göre bilinçdışı değerlendirme yapar.</p>
 </div>

 <div className="border border-neutral-200 p-8 hover:border-[#3B82F6] transition-colors bg-white shadow-sm">
 <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center rounded-full mb-6 ">
 <Briefcase className="w-6 h-6" />
 </div>
 <h3 className="font-bold text-xl mb-3 ">Yönetici Portreleri</h3>
 <p className="text-neutral-500 font-medium leading-relaxed">CEO ve C-Level yöneticiler için şirketin vizyonunu yansıtan, güven verici, karanlık veya aydınlık konsept çekimleri.</p>
 </div>

 <div className="border border-neutral-200 p-8 hover:border-[#3B82F6] transition-colors bg-white shadow-sm">
 <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center rounded-full mb-6 ">
 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
 </div>
 <h3 className="font-bold text-xl mb-3 ">Corporate Ekip</h3>
 <p className="text-neutral-500 font-medium leading-relaxed">Web siteniz "Hakkımızda" sekmesi için şirketinizde mobil stüdyo kurarak tüm çalışanların benzer tonda fotoğraflanması.</p>
 </div>
 </div>
 </div>
 </section>
 )
}

export function FotoPortreFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 text-neutral-400 text-center text-sm font-medium" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <p className="text-white font-heading font-black tracking-widest text-lg mb-2">{businessData.name}</p>
 <p>HQ: {businessData.address}</p>
 </footer>
 )
}

registerSection('hero', 'fotoportre_hero_0', FotoPortrePROFESSIONALHEADER)
registerSection('hero', 'fotoportre_hero_1', FotoPortreCORPORATEHERO)
registerSection('services', 'fotoportre_services_2', FotoPortrePROCESSMODULES)
registerSection('footer', 'fotoportre_footer_3', FotoPortreFOOTER)
