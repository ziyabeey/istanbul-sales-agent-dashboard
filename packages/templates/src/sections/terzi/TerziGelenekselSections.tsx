// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Scissors } from 'lucide-react'

export function TerziGelenekselAUTHENTICHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="px-8 py-6 border-b-2 border-[#E8DCC8] sticky top-0 z-50 /90 backdrop-blur-md" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto flex items-center justify-between">
 <div className="font-heading text-3xl font-bold tracking-tight ">
 {businessData.name}
 </div>
 <div className="font-serif italic text-sm hidden sm:block">
 {businessData.experience} Tecrübe
 </div>
 </div>
 </header>
 )
}

export function TerziGelenekselCRAFTSMANHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 md:py-32 relative text-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[700px] mx-auto relative z-10">
 <div className="w-16 h-1 mx-auto mb-10"></div>
 <h1 className="font-heading text-5xl md:text-7xl font-bold mb-8 leading-[1.05]">
 Yarım asırlık <br/> ustalık eseri.
 </h1>
 <p className="text-lg mb-12 max-w-lg mx-auto leading-relaxed">
 Dikiş makinesinin tıkırtısı, makasın ritmi ve emeğin kusursuz uyumu. Geleneksel terzilik sanatını günümüz zarafetiyle buluşturuyoruz.
 </p>
 <a href={`tel:${businessData.phoneClean}`} className="px-10 py-4 font-bold text-sm tracking-wider uppercase hover:opacity-90 transition-colors rounded-sm inline-block shadow-xl shadow-[#5D4037]/20">
 Dükkanı Ara
 </a>
 </div>
 </section>
 )
}

export function TerziGelenekselTRADITIONALEXPERTISE({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 border-y border-[#E8DCC8]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1000px] mx-auto">
 <div className="grid md:grid-cols-2 gap-16 items-center">
 
 <div className="relative p-12 bg-white rounded-xl shadow-sm border border-[#E8DCC8]">
 <div className="absolute -top-6 -left-6 w-12 h-12 text-white flex items-center justify-center rounded-full shadow-lg">
 <span className="font-serif italic font-bold">1968</span>
 </div>
 <h3 className="font-heading text-3xl font-bold mb-6">Ustanın Elinden</h3>
 <p className="leading-loose mb-6">
 Bizim dükkanda seri üretim yoktur. Çıraklıktan ustalığa giden yolda, kumaşı hissetmek ve bedeni okumak vardır. Modern makinelerle değil, el emeği ve göz nuruyla çalışırız.
 </p>
 <blockquote className="border-l-4 border-[#A1887F] pl-4 italic font-serif">
 "Her dikiş, müşteriye duyulan saygının bir ifadesidir." — {businessData?.ownerName as string}
 </blockquote>
 </div>

 <div className="grid grid-cols-1 gap-6">
 <div className="p-8 border border-[#E8DCC8] flex items-start gap-4 transition-transform hover:-translate-y-1">
 <Scissors className="w-8 h-8 shrink-0" />
 <div>
 <h4 className="font-bold text-xl mb-2">Özel Dikim</h4>
 <p className="text-sm leading-relaxed">Doğru kumaşı seçerek, tamamen sizin bedeninize has klasik kalıp takım elbiseler ve paltolar.</p>
 </div>
 </div>

 <div className="p-8 border border-[#E8DCC8] flex items-start gap-4 transition-transform hover:-translate-y-1">
 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#A1887F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M2 12h20"/><path d="m4.93 4.93 14.14 14.14"/><path d="m19.07 4.93-14.14 14.14"/></svg>
 <div>
 <h4 className="font-bold text-xl mb-2">Usta İşi Tadilat</h4>
 <p className="text-sm leading-relaxed">Kıymetli kıyafetlerinize zarar vermeden, astar, tela ve gizli dikiş teknikleriyle yapılan büyük onarımlar.</p>
 </div>
 </div>
 </div>

 </div>
 </div>
 </section>
 )
}

export function TerziGelenekselNOSTALGICFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-16 text-center border-t border-[#E8DCC8]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading text-3xl font-bold mb-4">{businessData.name}</div>
 <p className="text-sm font-serif italic">{businessData.address}</p>
 </footer>
 )
}

registerSection('hero', 'terzigeleneksel_hero_0', TerziGelenekselAUTHENTICHEADER)
registerSection('hero', 'terzigeleneksel_hero_1', TerziGelenekselCRAFTSMANHERO)
registerSection('services', 'terzigeleneksel_services_2', TerziGelenekselTRADITIONALEXPERTISE)
registerSection('footer', 'terzigeleneksel_footer_3', TerziGelenekselNOSTALGICFOOTER)
