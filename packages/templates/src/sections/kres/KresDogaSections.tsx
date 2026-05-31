// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { TreePine, Sprout, Bird, Bug, Compass, ArrowRight } from 'lucide-react'

export function KresDogaHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="absolute top-0 w-full z-50 px-6 py-8" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto bg-white/80 backdrop-blur-md rounded-2xl px-8 h-20 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
 <div className="font-heading font-bold text-2xl flex items-center gap-2 ">
 <TreePine className="w-8 h-8 " />
 {businessData.name}
 </div>
 <a href="#iletisim" className="text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-colors">
 Kayıt Gorusmesi
 </a>
 </div>
 </header>
 )
}

export function KresDogaHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="pt-40 pb-24 px-6 overflow-hidden relative" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] -z-10 mix-blend-multiply opacity-50 translate-x-1/3 -translate-y-1/3"></div>
 <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
 <div>
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm mb-6 border border-[#C8E6C9]">
 <Sprout className="w-5 h-5" /> Orman Okulu Sınıfı
 </div>
 <h1 className="font-heading text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6 ">
 Sınıfımız <span className="">Doğa,</span> <br/>
 Tavanımız Gökyüzü.
 </h1>
 <p className="text-xl mb-10 font-medium max-w-lg leading-relaxed">
 Çocuklarımızın toprakla oynadığı, mevsimleri yaşayarak öğrendiği, organik beslendiği alternatif eğitim yuvası.
 </p>
 <a href="#yaklasim" className="inline-flex items-center gap-3 font-bold text-lg hover:opacity-90 transition-colors group">
 Yaklaşımımızı Keşfet 
 <span className="p-2 rounded-full group-hover:translate-x-2 transition-transform">
 <ArrowRight className="w-5 h-5" />
 </span>
 </a>
 </div>
 <div className="hidden lg:grid grid-cols-2 gap-4 relative">
 <div className="p-8 rounded-3xl aspect-[4/5] flex flex-col justify-between shadow-2xl relative z-10 translate-y-10">
 <Bird className="w-12 h-12" strokeWidth={1.5} />
 <div>
 <h3 className="text-2xl font-bold mb-2">Canlıları Tanıma</h3>
 <p className="font-medium text-sm">Gözlem tabanlı keşif gezileri.</p>
 </div>
 </div>
 <div className="bg-white p-8 rounded-3xl aspect-[4/5] flex flex-col justify-between shadow-xl border border-[#E8F5E9]">
 <Compass className="w-12 h-12 " strokeWidth={1.5} />
 <div>
 <h3 className="text-2xl font-bold mb-2 ">Açık Hava Oyunu</h3>
 <p className="font-medium text-sm">Günün %70'i bahçede ve ormanda.</p>
 </div>
 </div>
 </div>
 </div>
 </section>
 )
}

export function KresDogaAPPROACH({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="yaklasim" className="py-24 px-6 " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto border-l-4 border-[#40916C] pl-8 lg:pl-16">
 <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8">Neden Doğa Temelli Eğitim?</h2>
 <div className="grid md:grid-cols-2 gap-12">
 <p className="text-xl leading-relaxed font-medium">
 Ekranlardan uzak, doğal uyaranlarla dolu bir çevre, çocuğun dikkat süresini uzatır, bağışıklığını güçlendirir ve problem çözme yeteneğini doğal yollarla geliştirir.
 </p>
 <div className="flex flex-col gap-6">
 <div className="flex items-start gap-4">
 <div className="bg-white p-3 rounded-xl shadow-sm"><Bug className="w-6 h-6 " /></div>
 <div>
 <h4 className="font-bold text-xl ">Ekolojik Bilinç</h4>
 <p className="font-medium mt-1">Geri dönüşüm ve tarım atölyeleri.</p>
 </div>
 </div>
 <div className="flex items-start gap-4">
 <div className="bg-white p-3 rounded-xl shadow-sm"><Sprout className="w-6 h-6 " /></div>
 <div>
 <h4 className="font-bold text-xl ">Doğal Beslenme</h4>
 <p className="font-medium mt-1">Kendi ektiğimiz sağlıklı ürünlerle beslenme.</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>
 )
}

export function KresDogaILETISIM({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="iletisim" className="py-32 px-6" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[800px] mx-auto bg-white rounded-[3rem] p-12 lg:p-16 text-center border border-[#D8E2DC] shadow-[0_20px_50px_rgb(45,106,79,0.08)]">
 <TreePine className="w-16 h-16 mx-auto mb-8" />
 <h2 className="font-heading text-4xl font-bold mb-6">Pikniğe Bekleriz!</h2>
 <p className="text-lg font-medium mb-10">Okulumuzun dev yeşil bahçesini görmek ve pedagojik yaklaşımımız hakkında bilgi almak için randevu oluşturun.</p>
 <a href={`https://wa.me/${businessData.whatsapp}`} className="inline-block px-10 py-5 text-white rounded-2xl font-bold text-lg hover:opacity-90 transition-colors w-full sm:w-auto">
 WhatsApp Bahçe Randevusu
 </a>
 <div className="mt-8 font-medium ">
 {businessData.phone}
 </div>
 </div>
 </section>
 )
}

export function KresDogaFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 text-center " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading text-2xl font-bold mb-4 flex items-center justify-center gap-2">
 <TreePine className="w-6 h-6 " /> {businessData.name}
 </div>
 <p className="font-medium text-sm">© {new Date().getFullYear()} Doğa ve Orman Okulları Merkezi.</p>
 </footer>
 )
}

registerSection('hero', 'kresdoga_hero_0', KresDogaHEADER)
registerSection('hero', 'kresdoga_hero_1', KresDogaHERO)
registerSection('services', 'kresdoga_services_2', KresDogaAPPROACH)
registerSection('services', 'kresdoga_services_3', KresDogaILETISIM)
registerSection('footer', 'kresdoga_footer_4', KresDogaFOOTER)
