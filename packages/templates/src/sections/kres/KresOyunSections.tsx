// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Heart, Sun, Music, Smile, MapPin, Phone, CheckCircle2 } from 'lucide-react'

export function KresOyunHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="sticky top-0 z-50 /90 backdrop-blur-sm border-b-4 border-[var(--color-border)] shadow-sm" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
 <div className="font-heading font-black text-3xl flex items-center gap-2 drop-shadow-sm">
 <Sun className="w-8 h-8 fill-current" />
 {businessData.name}
 </div>
 <nav className="hidden md:flex gap-8">
 <a href="#program" className="font-bold hover:opacity-90 transition-colors text-lg">Programlar</a>
 <a href="#iletisim" className="font-bold hover:opacity-90 transition-colors text-lg">Kayıt</a>
 </nav>
 <a href={`tel:${businessData.phoneClean}`} className="text-white px-6 py-3 rounded-full font-bold text-lg hover:opacity-90 transition-colors shadow-lg shadow-[#10B981]/30 border-2 border-white">
 Bizi Arayın 🎈
 </a>
 </div>
 </header>
 )
}

export function KresOyunHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 md:py-32 px-6 relative overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {/* Playful Background Elements */}
 <div className="absolute top-10 right-10 w-32 h-32 rounded-full blur-2xl opacity-60 -z-10"></div>
 <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full blur-3xl opacity-80 -z-10"></div>
 
 <div className="max-w-[1200px] mx-auto text-center relative z-10">
 <div className="inline-block px-4 py-2 bg-white font-bold rounded-full mb-8 shadow-sm border-2 border-[var(--color-border)] transform -rotate-2">
 🤸‍♀️ {businessData.district}'un En Eğlenceli Kreşi
 </div>
 <h1 className="font-heading text-5xl md:text-7xl font-black mb-6 leading-tight">
 Oyunla Büyüyen, <br />
 <span className="relative inline-block">
 Mutlu Çocuklar!
 <svg className="absolute w-full h-3 -bottom-1 left-0 " viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/></svg>
 </span>
 </h1>
 <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-medium">
 3-6 yaş arası çocuklarımız için sevgi dolu, güvenli ve bol oyunlu bir öğrenme ortamı sunuyoruz.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <a href="#iletisim" className="text-white px-8 py-4 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-xl shadow-[var(--color-accent)]/30 border-4 border-white">
 Sınıfımızı Gezin 🧸
 </a>
 </div>
 </div>
 </section>
 )
}

export function KresOyunPROGRAMLAR({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="program" className="py-24 px-6 border-y-4 border-dashed border-[var(--color-border)]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto">
 <div className="text-center mb-16">
 <h2 className="font-heading text-4xl md:text-5xl font-black mb-4">Etkinliklerimiz</h2>
 <p className="text-xl font-medium">Her gün yeni bir macera!</p>
 </div>
 
 <div className="grid md:grid-cols-3 gap-8">
 <div className="rounded-[2rem] p-8 text-center shadow-sm border-4 border-[#FDE68A] hover:-translate-y-2 transition-transform">
 <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
 <Music className="w-10 h-10 " />
 </div>
 <h3 className="font-heading text-3xl font-black mb-3">Müzik & Ritim</h3>
 <p className="font-medium leading-relaxed">Şarkılar söyleyip, kendi enstrümanlarımızı çalıyoruz.</p>
 </div>
 
 <div className="rounded-[2rem] p-8 text-center shadow-sm border-4 border-[#C7D2FE] hover:-translate-y-2 transition-transform mt-0 md:mt-12">
 <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
 <Smile className="w-10 h-10 " />
 </div>
 <h3 className="font-heading text-3xl font-black mb-3">Serbest Oyun</h3>
 <p className="font-medium leading-relaxed">Drama köşelerinde hayal gücümüzü sınır tanımadan geliştiriyoruz.</p>
 </div>

 <div className="rounded-[2rem] p-8 text-center shadow-sm border-4 border-[#A7F3D0] hover:-translate-y-2 transition-transform">
 <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
 <Heart className="w-10 h-10 " />
 </div>
 <h3 className="font-heading text-3xl font-black mb-3">El Beceri</h3>
 <p className="font-medium leading-relaxed">Boya, hamur ve kağıtlarla rengarenk eserler yaratıyoruz.</p>
 </div>
 </div>
 </div>
 </section>
 )
}

export function KresOyunILETISIM({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="iletisim" className="py-24 px-6 " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[900px] mx-auto bg-white rounded-[3rem] p-10 md:p-16 border-4 border-[var(--color-border)] text-center shadow-2xl relative">
 <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
 <Phone className="w-10 h-10 text-white" />
 </div>
 
 <h2 className="font-heading text-4xl font-black mb-6 mt-6">Tanışmaya Gelin!</h2>
 <p className="text-lg font-medium mb-12">
 Kayıt işlemleri ve ücret bilgisi için WhatsApp hattımızdan bize ulaşabilirsiniz.
 </p>
 
 <a href={`https://wa.me/${businessData.whatsapp}`} className="inline-block text-white px-10 py-5 rounded-full font-black text-2xl hover:scale-105 transition-transform shadow-xl shadow-[#10B981]/20">
 WhatsApp'tan Yazın
 </a>
 
 <div className="mt-12 pt-8 border-t-2 border-dashed border-gray-200 grid sm:grid-cols-2 gap-6 text-left">
 <div className="flex items-start gap-4">
 <MapPin className="w-8 h-8 shrink-0" />
 <div>
 <div className="font-black text-lg">Adres</div>
 <div className="font-medium">{businessData.address}, {businessData.district}</div>
 </div>
 </div>
 <div className="flex items-start gap-4">
 <CheckCircle2 className="w-8 h-8 shrink-0" />
 <div>
 <div className="font-black text-lg">Çalışma Saatleri</div>
 <div className="font-medium">Hafta İçi: 08:00 - 18:30</div>
 </div>
 </div>
 </div>
 </div>
 </section>
 )
}

export function KresOyunFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-8 text-center text-white/80 font-medium border-t-8 border-[var(--color-accent)]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <p>© {new Date().getFullYear()} {businessData.name}. Tüm hakları saklıdır. 🌟</p>
 </footer>
 )
}

registerSection('hero', 'kresoyun_hero_0', KresOyunHEADER)
registerSection('hero', 'kresoyun_hero_1', KresOyunHERO)
registerSection('services', 'kresoyun_services_2', KresOyunPROGRAMLAR)
registerSection('services', 'kresoyun_services_3', KresOyunILETISIM)
registerSection('footer', 'kresoyun_footer_4', KresOyunFOOTER)
