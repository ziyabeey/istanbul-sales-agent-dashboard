// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Sparkles, Heart } from 'lucide-react'

export function TerziGelinROMANTICHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="px-8 py-6 bg-white/70 backdrop-blur-sm sticky top-0 z-50 border-b border-[#F5E6E3]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto flex items-center justify-between">
 <div className="font-heading font-light text-2xl tracking-[0.1em] ">
 {businessData.name}
 </div>
 <a href={`https://wa.me/${businessData.whatsapp}`} className="hover:opacity-90 text-sm tracking-widest uppercase transition-colors">
 Randevu Al
 </a>
 </div>
 </header>
 )
}

export function TerziGelinSOFTHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 md:py-36 px-6 relative overflow-hidden flex items-center justify-center text-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {/* Soft Radial Gradients */}
 <div className="absolute top-0 left-0 w-full h-full -z-10"></div>
 <div className="absolute bottom-0 right-0 w-full h-full -z-10"></div>
 
 <div className="relative z-10 max-w-[700px] mx-auto">
 <Heart className="w-6 h-6 mx-auto mb-6 opacity-60" fill="currentColor" />
 <h1 className="font-heading text-5xl md:text-7xl font-light mb-8 leading-[1.15]">
 Rüya gibi bir <br/> <i className="">dokunuş.</i>
 </h1>
 <p className="text-lg font-light mb-12 leading-relaxed max-w-lg mx-auto">
 En özel gününüzde, vücudunuza kusursuz oturan, özel dikim gelinlik ve abiye tasarımları. Hassas dantel ve saten işçiliği.
 </p>
 <a href="#hizmetler" className="border-b border-[#B07B71] pb-1 text-xs uppercase tracking-[0.2em] font-medium hover:opacity-90 hover:border-[#4A3B39] transition-all">
 Koleksiyonu İncele
 </a>
 </div>
 </section>
 )
}

export function TerziGelinBRIDALSERVICES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 bg-white" id="hizmetler" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1100px] mx-auto">
 
 <div className="grid md:grid-cols-2 gap-16 items-center">
 <div className="h-[500px] rounded-[3rem] rounded-tl-none border border-[#F5E6E3] flex flex-col items-center justify-center text-center p-10 relative overflow-hidden group">
 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 "></div>
 <Sparkles className="w-10 h-10 mb-6" />
 <h3 className="font-heading text-3xl font-light mb-4">Özel Dikim Gelinlik</h3>
 <p className="font-light leading-relaxed mb-8 max-w-sm">
 Hayalinizdeki tasarımı paper-pattern aşamasından son provaya kadar sizinle birlikte şekillendiriyoruz.
 </p>
 <span className="text-xs tracking-[0.2em] uppercase border border-[#F5E6E3] rounded-full px-6 py-2">
 Bespoke Bridal
 </span>
 </div>

 <div className="space-y-12">
 <div className="border-l border-[#F5E6E3] pl-8 hover:border-[#D4A59A] transition-colors">
 <h4 className="font-heading text-2xl font-light mb-3">Gelinlik Tadilatı</h4>
 <p className="font-light leading-relaxed">Hazır aldığınız vintage veya yeni gelinliğinizin bedeninize kusursuz uyum sağlaması için profesyonel daraltma ve boy ayarı.</p>
 </div>

 <div className="border-l border-[#F5E6E3] pl-8 hover:border-[#D4A59A] transition-colors">
 <h4 className="font-heading text-2xl font-light mb-3">Abiye Tasarımı</h4>
 <p className="font-light leading-relaxed">Nedimeler, mezuniyet ve özel davetler için kişiye özel renk ve kumaş seçenekleriyle gece elbiseleri.</p>
 </div>

 <div className="border-l border-[#F5E6E3] pl-8 hover:border-[#D4A59A] transition-colors">
 <h4 className="font-heading text-2xl font-light mb-3">Dantel & Nakış</h4>
 <p className="font-light leading-relaxed">Fransız danteli aplike işlemleri, özel kumaş üzerine el işçiliği motif eklemeleri ve taş işlemeler.</p>
 </div>
 </div>
 </div>
 </div>
 </section>
 )
}

export function TerziGelinFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-20 text-center border-t border-[#F5E6E3]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading font-light text-2xl tracking-[0.1em] mb-4">{businessData.name}</div>
 <p className="uppercase tracking-[0.2em]">{businessData.district}, {businessData.city}</p>
 </footer>
 )
}

registerSection('hero', 'terzigelin_hero_0', TerziGelinROMANTICHEADER)
registerSection('hero', 'terzigelin_hero_1', TerziGelinSOFTHERO)
registerSection('services', 'terzigelin_services_2', TerziGelinBRIDALSERVICES)
registerSection('footer', 'terzigelin_footer_3', TerziGelinFOOTER)
