// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Ruler, CheckCircle2 } from 'lucide-react'

export function TerziErkekSHARPHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="px-8 py-5 bg-white border-b border-[#E2E8F0] flex items-center justify-between sticky top-0 z-50" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading font-bold text-2xl tracking-tight ">
 {businessData.name}
 </div>
 <a href="#randevu" className="font-medium text-sm hover:opacity-90 transition-colors hidden sm:block">
 Randevu Takvimi
 </a>
 </header>
 )
}

export function TerziErkekMASCULINEHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 md:py-32 relative flex items-center justify-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="absolute inset-0 overflow-hidden -z-10">
 {/* Subtle pinstripe background pattern */}
 <div className="w-full h-full opacity-30" style={{ backgroundImage: 'linear-gradient(90deg, #F1F5F9 1px, transparent 1px)', backgroundSize: '40px 100%' }}></div>
 </div>

 <div className="max-w-[700px] bg-white p-12 md:p-16 rounded-sm border border-[#E2E8F0] shadow-xl text-center">
 <div className="mb-6 flex justify-center">
 <Ruler className="w-8 h-8" />
 </div>
 <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight">
 İmajınızı <span className="">Ölçüye</span> Vurun.
 </h1>
 <p className="text-base leading-relaxed mb-10 max-w-sm mx-auto">
 Dünyaca ünlü kumaş markaları ve kusursuz İtalyan terziliğiyle, bedeninize özel hazırlanan 'Made to Measure' takım elbiseler.
 </p>
 <a href={`tel:${businessData.phoneClean}`} className="text-white px-8 py-3.5 font-semibold text-sm hover:opacity-90 transition-colors inline-block w-full sm:w-auto">
 Ölçü Randevusu Al
 </a>
 </div>
 </section>
 )
}

export function TerziErkekBESPOKESERVICES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 px-6 " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1000px] mx-auto">
 <h2 className="font-heading text-3xl font-bold text-center mb-16 ">Hizmet Standartlarımız</h2>
 
 <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
 
 <div className="flex gap-6 group">
 <div className="w-12 h-12 shrink-0 bg-white border border-[#CBD5E1] rounded flex items-center justify-center shadow-sm group-hover:border-[#2563EB] transition-colors">
 <span className="font-heading font-bold text-xl">01</span>
 </div>
 <div>
 <h3 className="font-bold text-xl mb-2 ">Bespoke Takım Elbise</h3>
 <p className="text-sm leading-relaxed mb-4">
 Tamamen sizin ölçülerinize göre sıfırdan oluşturulan kalıplar. Kanvas destekli yaka, el dikişi detaylar ve Loro Piana kumaş seçenekleri.
 </p>
 <p className="text-xs font-semibold uppercase tracking-wider">Teslimat: 4-6 Hafta</p>
 </div>
 </div>

 <div className="flex gap-6 group">
 <div className="w-12 h-12 shrink-0 bg-white border border-[#CBD5E1] rounded flex items-center justify-center shadow-sm group-hover:border-[#2563EB] transition-colors">
 <span className="font-heading font-bold text-xl">02</span>
 </div>
 <div>
 <h3 className="font-bold text-xl mb-2 ">Özel Dikim Gömlek</h3>
 <p className="text-sm leading-relaxed mb-4">
 Yaka modeli, manşet tipi ve monogram nakışına kadar tamamen kişiselleştirilmiş Mısır pamuğu gömlekler.
 </p>
 <p className="text-xs font-semibold uppercase tracking-wider">Teslimat: 2 Hafta</p>
 </div>
 </div>

 <div className="flex gap-6 group">
 <div className="w-12 h-12 shrink-0 bg-white border border-[#CBD5E1] rounded flex items-center justify-center shadow-sm group-hover:border-[#2563EB] transition-colors">
 <span className="font-heading font-bold text-xl">03</span>
 </div>
 <div>
 <h3 className="font-bold text-xl mb-2 ">Premium Tadilat</h3>
 <p className="text-sm leading-relaxed mb-4">
 Markalı ve özel üretim kıyafetleriniz için, orijinal dikiş tekniği bozulmadan yapılan profesyonel lüks tadilat işlemleri.
 </p>
 <p className="text-xs font-semibold uppercase tracking-wider">Randevulu Servis</p>
 </div>
 </div>

 <div className="flex gap-6 group">
 <div className="w-12 h-12 shrink-0 bg-white border border-[#CBD5E1] rounded flex items-center justify-center shadow-sm group-hover:border-[#2563EB] transition-colors">
 <span className="font-heading font-bold text-xl">04</span>
 </div>
 <div>
 <h3 className="font-bold text-xl mb-2 ">Damatlık Tasarımı</h3>
 <p className="text-sm leading-relaxed mb-4">
 Smokin ve damatlık için konsept danışmanlığı, kumaş seçimi ve yaka aksesuarına kadar tam stil servisi.
 </p>
 <p className="text-xs font-semibold uppercase tracking-wider">VIP Servis</p>
 </div>
 </div>

 </div>
 </div>
 </section>
 )
}

export function TerziErkekSHARPFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-16 text-center border-t border-[#E2E8F0] bg-white" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading font-bold text-2xl mb-4">{businessData.name}</div>
 <p className="text-xs uppercase tracking-widest font-medium"><CheckCircle2 className="w-3 h-3 inline pb-[2px]"/> Master of Tailoring</p>
 </footer>
 )
}

registerSection('hero', 'terzierkek_hero_0', TerziErkekSHARPHEADER)
registerSection('hero', 'terzierkek_hero_1', TerziErkekMASCULINEHERO)
registerSection('services', 'terzierkek_services_2', TerziErkekBESPOKESERVICES)
registerSection('footer', 'terzierkek_footer_3', TerziErkekSHARPFOOTER)
