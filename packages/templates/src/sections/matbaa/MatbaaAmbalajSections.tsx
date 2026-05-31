// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Box, Palette, Star, MapPin, Phone, ArrowUpRight } from 'lucide-react'

export function MatbaaAmbalajHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="fixed top-0 left-0 w-full z-50 /80 backdrop-blur-lg border-b border-[var(--color-border)]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
 <div className="font-heading font-black text-2xl tracking-tighter flex items-center gap-2">
 <Box className="w-8 h-8 fill-[var(--color-accent-light)]" />
 {businessData.name}
 </div>
 <nav className="hidden md:flex gap-8 px-6 py-2 rounded-full border border-[var(--color-border)]">
 <a href="#hizmetler" className="font-semibold text-sm hover:opacity-90 transition-colors">Yaratıcı Çözümler</a>
 <a href="#iletisim" className="font-semibold text-sm hover:opacity-90 transition-colors">İletişim</a>
 </nav>
 <a href="#iletisim" className="px-6 py-2.5 rounded-full font-bold text-sm tracking-wide hover:scale-105 transition-transform">
 Başlayalım
 </a>
 </div>
 </header>
 )
}

export function MatbaaAmbalajHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="pt-32 pb-24 px-6 overflow-hidden relative" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="absolute top-1/4 right-0 w-96 h-96 /10 rounded-full blur-[100px] -z-10" />
 <div className="absolute bottom-0 left-10 w-64 h-64 /10 rounded-full blur-[80px] -z-10" />
 
 <div className="max-w-[1280px] mx-auto grid lg:grid-cols-5 gap-12 items-center">
 <div className="lg:col-span-3">
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] shadow-sm mb-6">
 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
 <span className="font-bold text-xs tracking-wider uppercase">Ambalaj & Tasarım Stüdyosu</span>
 </div>
 <h1 className="font-heading text-6xl md:text-7xl font-black leading-[1.1] tracking-tighter mb-6">
 Ürünlerinizi <br/>
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[#8b5cf6]">
 Öne Çıkaran
 </span> Ambalajlar
 </h1>
 <p className="text-xl mb-10 max-w-xl leading-relaxed">
 Tasarım odaklı yaklaşımla markanızın değerini artıran modern, renkli ve çevre dostu kutu, poşet ve ambalaj çözümleri üretiyoruz.
 </p>
 <div className="flex flex-wrap gap-4">
 <a href="#iletisim" className="text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-[var(--color-accent)]/20 hover:shadow-[var(--color-accent)]/40 hover:-translate-y-1 transition-all flex items-center gap-2">
 Projeyi Anlatın <ArrowUpRight className="w-5 h-5" />
 </a>
 </div>
 </div>
 <div className="lg:col-span-2 hidden lg:flex flex-col gap-6">
 <div className="aspect-[4/3] rounded-[2rem] bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-bg)] border-2 border-[var(--color-border)] p-8 flex flex-col justify-end shadow-2xl relative overflow-hidden group">
 <div className="absolute top-6 right-6 w-16 h-16 rounded-2xl rotate-12 group-hover:rotate-45 transition-transform duration-500 flex items-center justify-center shadow-lg">
 <Palette className="w-8 h-8 text-white" />
 </div>
 <h3 className="font-heading font-black text-3xl mb-2">Özel Tasarım Cut-out</h3>
 <p className="font-medium">Bize hayalinizi söyleyin.</p>
 </div>
 </div>
 </div>
 </section>
 )
}

export function MatbaaAmbalajHIZMETLER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="hizmetler" className="py-24 px-6 rounded-[3rem] mx-2 md:mx-6 my-12 border border-[var(--color-border)]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1280px] mx-auto">
 <div className="text-center mb-16">
 <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tighter mb-4">Premium <span className="">Çözümler</span></h2>
 <p className="text-lg ">Karton, mukavva ve fleksibl ambalaj üretimlerimiz.</p>
 </div>
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
 {businessData.services?.map((service: any, idx: number) => (
 <div key={service.id || idx} className="p-8 rounded-[2rem] border border-[var(--color-border)] shadow-sm hover:shadow-xl transition-all duration-300 group">
 <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
 <Star className="w-6 h-6 " />
 </div>
 <h3 className="font-heading font-black text-2xl mb-3 group-hover:opacity-90 transition-colors">{service.name}</h3>
 <p className="leading-relaxed">{service.description || 'Markanıza özel dokunuşlar, varak yaldız ve emboss detaylar ile fark yaratın.'}</p>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}

export function MatbaaAmbalajILETISIM({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="iletisim" className="py-24 px-6" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1280px] mx-auto rounded-[3rem] p-12 md:p-20 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
 <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
 <div className="relative z-10 w-full max-w-2xl">
 <h2 className="font-heading text-5xl font-black text-white mb-6">Beraber Üretelim.</h2>
 <p className="text-white/80 text-xl font-medium mb-10">Ambalaj ihtiyaçlarınız için kreatif ekibimizle görüşmek üzere stüdyomuza bekliyoruz.</p>
 
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <a href={`tel:${businessData.phoneClean}`} className="bg-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-lg">
 <Phone className="w-6 h-6" /> {businessData.phone}
 </a>
 <div className="bg-black/20 text-white border border-white/20 px-8 py-4 rounded-full font-medium flex items-center justify-center gap-3 backdrop-blur-sm">
 <MapPin className="w-6 h-6" /> {businessData.district}, {businessData.city}
 </div>
 </div>
 </div>
 </div>
 </section>
 )
}

export function MatbaaAmbalajFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 px-6 text-center" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="font-heading font-black text-2xl mb-4 opacity-50">{businessData.name}</div>
 <p className="text-sm font-semibold ">
 © {new Date().getFullYear()} ambalaj&baskı stüdyosu. created with kepenk.ai.
 </p>
 </footer>
 )
}

registerSection('hero', 'matbaaambalaj_hero_0', MatbaaAmbalajHEADER)
registerSection('hero', 'matbaaambalaj_hero_1', MatbaaAmbalajHERO)
registerSection('services', 'matbaaambalaj_services_2', MatbaaAmbalajHIZMETLER)
registerSection('services', 'matbaaambalaj_services_3', MatbaaAmbalajILETISIM)
registerSection('footer', 'matbaaambalaj_footer_4', MatbaaAmbalajFOOTER)
