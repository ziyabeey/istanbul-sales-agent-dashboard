// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Droplets, CloudRain, ShieldCheck, Waves } from 'lucide-react'

export function PeyzajSulamaTECHWATERHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-[#BAE6FD] shadow-sm" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
 <div className="font-heading font-black text-2xl flex items-center gap-2">
 <Droplets className="w-7 h-7 " strokeWidth={2.5} />
 {businessData.name}
 </div>
 <div className="flex items-center gap-4">
 <span className="hidden sm:inline px-3 py-1 rounded-full text-xs font-bold font-mono">
 Smart Irrigation
 </span>
 <a href={`tel:${businessData.phoneClean}`} className="text-white px-5 py-2 font-bold rounded-lg hover:opacity-90 transition-colors shadow-md shadow-blue-500/20">
 Proje Keşfi
 </a>
 </div>
 </div>
 </header>
 )
}

export function PeyzajSulamaHYDROHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 md:py-32 px-6 relative overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {/* Subtle Background Water aesthetic */}
 <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#E0F2FE] to-[#BAE6FD] rounded-full opacity-50 blur-[100px] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/4"></div>

 <div className="max-w-[800px] mx-auto text-center">
 <Waves className="w-16 h-16 mx-auto mb-8 opacity-80" strokeWidth={1.5} />
 
 <h1 className="font-heading text-5xl md:text-6xl font-black mb-6 leading-tight">
 Her Damlası <br/> Değerli.
 </h1>
 <p className="text-xl mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
 Teknoloji destekli <strong>otomatik sulama sistemleri</strong>, damla sulama hatları ve akıllı zamanlayıcılarla bitkileriniz tam ihtiyacı olan suyu alsın, su tasarrufu sağlayın.
 </p>
 
 {/* Metrics */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
 <div className="bg-white border border-[#BAE6FD] rounded-xl p-4 text-center">
 <div className="font-black text-2xl mb-1">%50</div>
 <div className="text-xs font-bold /60 uppercase">Su Tasarrufu</div>
 </div>
 <div className="bg-white border border-[#BAE6FD] rounded-xl p-4 text-center">
 <div className="font-black text-2xl mb-1">7/24</div>
 <div className="text-xs font-bold /60 uppercase">Otomasyon</div>
 </div>
 <div className="bg-white border border-[#BAE6FD] rounded-xl p-4 text-center">
 <div className="font-black text-2xl mb-1">Wi-Fi</div>
 <div className="text-xs font-bold /60 uppercase">Kontrol</div>
 </div>
 <div className="bg-white border border-[#BAE6FD] rounded-xl p-4 text-center">
 <div className="font-black text-2xl mb-1">{businessData.experience}</div>
 <div className="text-xs font-bold /60 uppercase">Tecrübe</div>
 </div>
 </div>
 </div>
 </section>
 )
}

export function PeyzajSulamaEXPERTISEGRID({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 px-6 bg-white border-y border-[#E0F2FE]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-center">
 
 <div className="space-y-8 ">
 <h2 className="font-heading text-4xl font-black">Modern Sulamanın Avantajları</h2>
 
 <div className="flex gap-4">
 <div className="mt-1"><CloudRain className="w-6 h-6 " /></div>
 <div>
 <h4 className="font-bold text-lg mb-1">Akıllı Sensörler</h4>
 <p className="text-sm font-medium leading-relaxed">Topraktaki nem oranını ve hava durumunu algılayarak, yağmurlu günlerde sulamayı otomatik iptal eden zamanlayıcılar.</p>
 </div>
 </div>

 <div className="flex gap-4">
 <div className="mt-1"><Droplets className="w-6 h-6 " /></div>
 <div>
 <h4 className="font-bold text-lg mb-1">Damla Sulama (Drip Irrigation)</h4>
 <p className="text-sm font-medium leading-relaxed">Suyu doğrudan bitki köküne ulaştırarak buharlaşmayı önler. Sebze bahçeleri, çalılar ve bitki yatakları için idealdir.</p>
 </div>
 </div>

 <div className="flex gap-4">
 <div className="mt-1"><ShieldCheck className="w-6 h-6 " /></div>
 <div>
 <h4 className="font-bold text-lg mb-1">Garantili Kurulum & Revizyon</h4>
 <p className="text-sm font-medium leading-relaxed">Eski ve arızalı sistemlerin tamiri veya sıfırdan hat çekimi sonrasında tam sızdırmazlık ve basınç garantisi verilir.</p>
 </div>
 </div>
 </div>
 
 <div className="h-full min-h-[400px] rounded-3xl p-10 flex flex-col justify-center border-4 border-white shadow-xl shadow-blue-500/5">
 <h3 className="font-heading text-2xl font-black mb-4">Sistem Analizi İste</h3>
 <p className="mb-8 font-medium">Bahçenizin metrajına ve bitki çeşitliliğine uygun sulama sistemi konfigürasyonunu ücretsiz çıkarıyoruz.</p>
 <a href={`https://wa.me/${businessData.whatsapp}`} className="bg-white text-center w-full py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors shadow-sm">
 Projeyi Başlat
 </a>
 </div>

 </div>
 </section>
 )
}

export function PeyzajSulamaFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-10 font-bold text-center border-t border-[#BAE6FD]" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <p className="uppercase tracking-widest text-xs mb-2">{businessData.name}</p>
 <p className="text-xs opacity-70">Akıllı Su Çözümleri • {businessData.city}</p>
 </footer>
 )
}

registerSection('hero', 'peyzajsulama_hero_0', PeyzajSulamaTECHWATERHEADER)
registerSection('hero', 'peyzajsulama_hero_1', PeyzajSulamaHYDROHERO)
registerSection('services', 'peyzajsulama_services_2', PeyzajSulamaEXPERTISEGRID)
registerSection('footer', 'peyzajsulama_footer_3', PeyzajSulamaFOOTER)
