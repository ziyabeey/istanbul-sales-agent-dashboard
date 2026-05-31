// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { FileStack, MapPin, Clock, ShieldCheck, MailSearch } from 'lucide-react'

export function KargoDosyaCORPORATEHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="bg-white border-b-4 border-[#F59E0B] sticky top-0 z-50 shadow-sm" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
 <div className="font-heading font-black text-2xl flex items-center gap-2 ">
 <div className="text-white p-1.5 rounded-sm">
 <FileStack className="w-6 h-6" />
 </div>
 {businessData.name}
 </div>
 <div className="hidden md:flex items-center gap-6 font-semibold text-sm">
 <span className="flex items-center gap-2 ">
 <MapPin className="w-4 h-4 " /> İstanbul İçi Kurye
 </span>
 <a href={`tel:${businessData.phoneClean}`} className="text-white px-5 py-2.5 rounded-md hover:opacity-90 transition-colors flex items-center gap-2">
 <Clock className="w-4 h-4" /> Kurye Çağır
 </a>
 </div>
 </div>
 </header>
 )
}

export function KargoDosyaLOGISTICSHERO({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-20 md:py-28 px-6 text-center relative overflow-hidden text-white" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {/* Abstract pattern */}
 <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#F59E0B 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
 
 <div className="max-w-[800px] mx-auto relative z-10">
 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-xs mb-8 uppercase tracking-widest">
 <ShieldCheck className="w-4 h-4" /> Güvenilir Evrak Taşımacılığı
 </div>
 <h1 className="font-heading text-5xl md:text-6xl font-black mb-6 leading-tight">
 Evraklarınız <br/> 
 <span className="">Tam Zamanında</span> Orada.
 </h1>
 <p className="text-lg mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
 Şirket içi yazışmalar, avukat dosyaları, sözleşmeler ve ihale evrakları. Teslimat saatine sadık kalarak, en hassas belgelerinizi alıcısına ulaştırıyoruz.
 </p>

 {/* Quick Tracking Widget */}
 <div className="bg-white p-2 rounded-lg max-w-lg mx-auto flex items-center shadow-2xl">
 <MailSearch className="w-6 h-6 ml-4 shrink-0" />
 <input type="text" placeholder="Gönderi Kodunu Girin (Örn: 1Z99...)" className="flex-1 bg-transparent border-none outline-none px-4 font-medium" />
 <button className="text-white px-6 py-3 rounded-md font-bold hover:opacity-90 transition-colors whitespace-nowrap">
 Sorgula
 </button>
 </div>
 </div>
 </section>
 )
}

export function KargoDosyaRELIABLESERVICES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-24 px-6 bg-white" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto">
 <h2 className="font-heading text-3xl font-black text-center mb-16 ">Hizmet Seçenekleri</h2>
 
 <div className="grid md:grid-cols-3 gap-8">
 <div className="p-8 border border-[#E2E8F0] rounded-xl hover:border-[#F59E0B] transition-colors shadow-sm group">
 <div className="w-14 h-14 group-hover:opacity-90 rounded-lg flex items-center justify-center mb-6 transition-colors border border-[#E2E8F0] group-hover:border-[#F59E0B]/30">
 <Clock className="w-7 h-7 " />
 </div>
 <h3 className="font-bold text-xl mb-3 ">Standart Kurye</h3>
 <p className="font-medium leading-relaxed">Günün herhangi bir saatinde alınır, kayıt saatinden itibaren İstanbul içi maksimum 4 saat içinde teslim edilir.</p>
 </div>

 <div className="p-8 border-2 border-[#1E3A5F] rounded-xl shadow-md relative">
 <div className="absolute top-0 right-0 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-bl-lg rounded-tr-lg">En Çok Tercih Edilen</div>
 <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-6">
 <MapPin className="w-7 h-7 text-white" />
 </div>
 <h3 className="font-bold text-xl mb-3 ">Ekspres VIP Kurye</h3>
 <p className="font-medium leading-relaxed">Hiçbir adrese sapmadan, direkt olarak göndericiden alıcıya transit giden 90 dakikalık acil evrak teslimatı.</p>
 </div>

 <div className="p-8 border border-[#E2E8F0] rounded-xl hover:border-[#F59E0B] transition-colors shadow-sm group">
 <div className="w-14 h-14 group-hover:opacity-90 rounded-lg flex items-center justify-center mb-6 transition-colors border border-[#E2E8F0] group-hover:border-[#F59E0B]/30">
 <ShieldCheck className="w-7 h-7 " />
 </div>
 <h3 className="font-bold text-xl mb-3 ">Kurumsal Abonelik</h3>
 <p className="font-medium leading-relaxed">Hukuk büroları, mali müşavirler ve şirketler için sabit fiyatlı, günlük rutin evrak dağıtım ve toplama hizmeti.</p>
 </div>
 </div>
 </div>
 </section>
 )
}

export function KargoDosyaFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-12 text-center " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <p className="font-heading text-white text-xl mb-2 font-bold">{businessData.name} - Evrak & Dosya Taşımacılığı</p>
 <p className="text-sm">Operasyon Merkezi: {businessData.address}</p>
 </footer>
 )
}

registerSection('hero', 'kargodosya_hero_0', KargoDosyaCORPORATEHEADER)
registerSection('hero', 'kargodosya_hero_1', KargoDosyaLOGISTICSHERO)
registerSection('services', 'kargodosya_services_2', KargoDosyaRELIABLESERVICES)
registerSection('footer', 'kargodosya_footer_3', KargoDosyaFOOTER)
