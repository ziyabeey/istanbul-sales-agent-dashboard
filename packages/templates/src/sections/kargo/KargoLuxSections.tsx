// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Shield, Fingerprint, Lock, ChevronRight } from 'lucide-react'

export function KargoLuxDISCREETHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="px-8 py-10 md:py-16 absolute w-full z-50" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="flex items-center justify-between">
 <div className="font-heading font-light text-2xl tracking-[0.3em] uppercase flex items-center gap-4">
 <Lock className="w-5 h-5" strokeWidth={1} />
 {businessData.name}
 </div>
 <div className="uppercase tracking-[0.5em] ">
 Confidential Logistics
 </div>
 </div>
 </header>
 )
}

export function KargoLuxARMOREDHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="h-screen py-32 px-8 flex flex-col justify-center relative overflow-hidden group" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {/* Subtle metallic reflection */}
 <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#334155] to-transparent opacity-50"></div>
 
 <div className="max-w-[1200px] w-full mx-auto relative z-10">
 <p className="text-xs font-semibold tracking-[0.4em] mb-6 uppercase flex items-center gap-2">
 <Fingerprint className="w-4 h-4" /> SECURE TRANSIT PROTOCOL
 </p>
 <div className="border-l border-[#334155] pl-8 py-4">
 <h1 className="font-heading text-5xl md:text-7xl font-light uppercase leading-[1.1] tracking-widest mb-8">
 Sıfır <br className="md:hidden"/>
 <span className="font-medium">Risk Toleransı.</span>
 </h1>
 <p className="font-light leading-loose max-w-xl text-sm mb-12 uppercase tracking-wide">
 Mücevherat, pırlanta, sanat eserleri, kıymetli evrak ve yüksek meblağlı nakit transferleri için zırhlı araç ve silahlı güvenlik personeli ile entegre, tam kapsam sigortalı lojistik hizmeti.
 </p>
 <a href={`tel:${businessData.phoneClean}`} className="inline-flex items-center gap-4 uppercase font-bold tracking-[0.3em] border border-[#334155] px-8 py-4 hover:opacity-90 hover:opacity-90 transition-all">
 Protokol Oluştur <ChevronRight className="w-4 h-4" />
 </a>
 </div>
 </div>
 </section>
 )
}

export function KargoLuxSECURITYCLEARANCE({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-32 px-8 border-t border-[#1F1F1F]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-px border border-[#1F1F1F]">
 
 <div className="p-12 hover:opacity-90 transition-colors">
 <Shield className="w-8 h-8 mb-8" strokeWidth={1} />
 <h3 className="font-heading text-lg mb-4 uppercase tracking-[0.2em]">Zırhlı Filo</h3>
 <p className="font-light text-xs leading-loose uppercase tracking-wider">
 B7 balistik koruma seviyesine sahip zırhlı panelvan ve binek araçlarımızla, rotadan sapmadan uydudan GPRS takip destekli kör noktasız aktarım.
 </p>
 </div>

 <div className="p-12 hover:opacity-90 transition-colors">
 <Fingerprint className="w-8 h-8 mb-8" strokeWidth={1} />
 <h3 className="font-heading text-lg mb-4 uppercase tracking-[0.2em]">Silahlı Refakat</h3>
 <p className="font-light text-xs leading-loose uppercase tracking-wider">
 5188 sayılı kanun kapsamında yetkilendirilmiş, alanında uzman ve özel eğitimli silahlı güvenlik ekipleri eşliğinde elden ele, kapıdan kapıya teslimat.
 </p>
 </div>

 <div className="p-12 hover:opacity-90 transition-colors">
 <Lock className="w-8 h-8 mb-8" strokeWidth={1} />
 <h3 className="font-heading text-lg mb-4 uppercase tracking-[0.2em]">Kapsamlı Poliçe</h3>
 <p className="font-light text-xs leading-loose uppercase tracking-wider">
 Taşınan değerlerin spesifik risk analizleri yapılarak, anlaşmalı reasürans şirketleri üzerinden tam kapsamlı "All-Risk" Kiymetli Emtea taşıma sigortası.
 </p>
 </div>

 </div>
 </section>
 )
}

export function KargoLuxFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-16 border-t border-[#1F1F1F] text-center uppercase tracking-[0.4em] font-medium " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <p>{businessData.name} SECURE LOGISTICS © {businessData.foundedYear}</p>
 </footer>
 )
}

registerSection('hero', 'kargolux_hero_0', KargoLuxDISCREETHEADER)
registerSection('hero', 'kargolux_hero_1', KargoLuxARMOREDHERO)
registerSection('services', 'kargolux_services_2', KargoLuxSECURITYCLEARANCE)
registerSection('footer', 'kargolux_footer_3', KargoLuxFOOTER)
