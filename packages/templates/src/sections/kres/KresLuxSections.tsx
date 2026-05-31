// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { GraduationCap, Globe, BookOpen, Clock, ArrowRight } from 'lucide-react'

export function KresLuxHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="fixed top-0 w-full z-50 /80 backdrop-blur-xl border-b border-white/10 transition-colors" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1440px] mx-auto px-8 h-28 flex items-center justify-between">
 <div className="font-heading font-normal text-3xl tracking-[0.15em] uppercase flex items-center gap-4 ">
 <GraduationCap className="w-10 h-10" strokeWidth={1} />
 {businessData.name}
 </div>
 <a href="#iletisim" className="border border-[#D3B88C] px-8 py-3 tracking-widest text-xs uppercase hover:opacity-90 hover:opacity-90 transition-all duration-500">
 Admissions
 </a>
 </div>
 </header>
 )
}

export function KresLuxHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="pt-48 pb-32 px-8 min-h-screen flex items-center relative overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="absolute inset-0 -z-10 " />
 <div className="max-w-[1440px] mx-auto w-full grid lg:grid-cols-12 gap-16 items-center">
 <div className="lg:col-span-7">
 <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 rounded-full mb-10">
 <Globe className="w-4 h-4 " /> 
 <span className="text-xs tracking-[0.2em] font-light uppercase text-white/70">Bilingual Early Childhood Education</span>
 </div>
 <h1 className="font-heading text-6xl md:text-8xl font-normal leading-[1.05] tracking-tight mb-8">
 Future Leaders <br/>
 <span className="italic font-serif">Begin Here.</span>
 </h1>
 <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl font-light leading-relaxed">
 Uluslararası standartlarda çift dilli eğitim, butik sınıflar ve global perspektifi temel alan premium akademi.
 </p>
 <div className="flex gap-6">
 <a href="#program" className="px-10 py-5 tracking-[0.2em] uppercase text-sm font-semibold hover:bg-white transition-colors">
 Discover Program
 </a>
 </div>
 </div>
 <div className="hidden lg:block lg:col-span-5 relative">
 <div className="w-full aspect-[3/4] border border-white/10 p-8 flex flex-col justify-end bg-gradient-to-t from-[#0A1128] to-transparent">
 <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-[#D3B88C]/30 m-8"></div>
 <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-[#D3B88C]/30 m-8"></div>
 <h3 className="font-heading text-4xl mb-4 ">Oxford Int. Math</h3>
 <p className="text-white/50 font-light leading-relaxed">Dünya standartlarında kurumsal müfredat entegrasyonu.</p>
 </div>
 </div>
 </div>
 </section>
 )
}

export function KresLuxEXPERIENCESSERVICES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="program" className="py-32 px-8 border-t border-white/5" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1440px] mx-auto">
 <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
 <div>
 <h2 className="font-heading text-4xl md:text-5xl font-normal text-white uppercase tracking-widest mb-4">Curriculum</h2>
 <div className="w-20 h-1 "></div>
 </div>
 <p className="text-white/50 font-light max-w-md leading-relaxed text-lg">VIP eğitim anlayışıyla çocuğunuzun akademik ve sosyal potansiyelini maksimize ediyoruz.</p>
 </div>
 
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
 {businessData.services?.map((service: any, idx: number) => (
 <div key={service.id || idx} className="p-10 border border-white/10 hover:border-[#D3B88C]/50 transition-all duration-500 group">
 <BookOpen className="w-8 h-8 m-4 ml-0 opacity-50 group-hover:opacity-100 transition-opacity" strokeWidth={1} />
 <h3 className="font-heading text-2xl tracking-widest uppercase mb-4 mt-8">{service.name}</h3>
 <p className="text-white/40 font-light leading-loose text-sm">{service.description || 'Native öğretmenler eşliğinde akıcı konuşma garantili çift dilli program, STEM lab ve piyano atölyeleri.'}</p>
 <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center mt-10 group-hover:opacity-90 group-hover:opacity-90 transition-all">
 <ArrowRight className="w-4 h-4" />
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}

export function KresLuxADMISSIONS({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="iletisim" className="py-40 px-8 relative" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[800px] mx-auto text-center border-y border-white/10 py-20">
 <h2 className="font-heading text-4xl md:text-5xl uppercase tracking-widest mb-8 ">Admissions Open</h2>
 <p className="text-white/50 font-light text-xl mb-16 leading-relaxed">
 Ayrıcalıklı eğitim modelimizi deneyimlemek ve mülakat randevusu oluşturmak için veli ilişkileri direktörümüzle iletişime geçin.
 </p>
 
 <a href={`tel:${businessData.phoneClean}`} className="inline-flex items-center gap-6 border-b border-[#D3B88C] pb-2 text-2xl font-light hover:opacity-90 transition-colors tracking-widest">
 <Clock className="w-6 h-6 " /> {businessData.phone}
 </a>
 
 <div className="mt-16 text-xs tracking-[0.3em] text-white/30 uppercase font-light">
 {businessData.address} | Premium Campus
 </div>
 </div>
 </section>
 )
}

export function KresLuxFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-16 text-center text-white/30 text-xs tracking-[0.3em] font-light uppercase border-t border-white/10" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <p>{businessData.name} © {new Date().getFullYear()} — The Global Standard in Early Education.</p>
 </footer>
 )
}

registerSection('hero', 'kreslux_hero_0', KresLuxHEADER)
registerSection('hero', 'kreslux_hero_1', KresLuxHERO)
registerSection('services', 'kreslux_services_2', KresLuxEXPERIENCESSERVICES)
registerSection('services', 'kreslux_services_3', KresLuxADMISSIONS)
registerSection('footer', 'kreslux_footer_4', KresLuxFOOTER)
