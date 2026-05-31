'use client'

import React from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { Network, Search, Globe, ChevronRight, Building2, MapPin, Download, ArrowUpRight } from 'lucide-react'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function MuhasebeciHoldingSections({ config, businessData }: Props) {
 // Tier 5: Enterprise / Premium+. 1440px / Edge-to-edge asimetrik bento gridler. Multi-location şube franchise ağı.
 
 return (
 <div className="font-body bg-[#F8F9FA] text-[#111] min-h-screen">
 
 {/* ENTERPRISE HEAD & PROMO CAROUSEL HERO */}
 <section className="relative w-full overflow-hidden bg-white border-b border-black/5">
 <div className="container mx-auto px-4 md:px-8 py-8 flex justify-between items-center border-b border-black/5">
 <h1 className="font-heading text-2xl font-black tracking-tighter uppercase">{businessData.name} Group</h1>
 <div className="hidden md:flex gap-8 text-sm font-semibold tracking-wide">
 <span className="cursor-pointer hover:text-[var(--color-accent)]">Corporate</span>
 <span className="cursor-pointer hover:text-[var(--color-accent)]">Services</span>
 <span className="cursor-pointer hover:text-[var(--color-accent)]">Careers</span>
 <span className="cursor-pointer hover:text-[var(--color-accent)]">Locations</span>
 </div>
 <div className="flex gap-4">
 <button className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors"><Search size={18}/></button>
 <button className="w-10 h-10 bg-[#111] text-white rounded-full flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors"><Globe size={18}/></button>
 </div>
 </div>

 <div className="flex flex-col lg:flex-row h-auto lg:h-[75vh] w-full">
 <div className="w-full lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center">
 <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] mb-8">
 <Network size={16}/> Global Financial Solutions
 </div>
 <h2 className="font-heading text-5xl lg:text-7xl lg:leading-[1.1] font-black uppercase tracking-tighter mb-8 max-w-2xl">
 Holdinginiz <br /> İçin Tam Kapsamlı <span className="text-[var(--color-accent)]">Finans Ağı.</span>
 </h2>
 <p className="text-lg text-black/60 font-medium max-w-lg mb-12">
 Türkiye'nin 12 farklı şehrinde, SPK lisanslı bağımsız denetçiler ve ERP entegrasyon uzmanlarıyla hizmet veren dev kadro.
 </p>
 <div className="flex gap-4">
 <button className="bg-[#111] hover:bg-black text-white px-8 py-4 uppercase font-bold text-xs tracking-widest flex items-center gap-3 transition-colors">
 Kurumsal Üyelik <ArrowUpRight size={16}/>
 </button>
 </div>
 </div>
 <div className="w-full lg:w-1/2 relative min-h-[50vh]">
 <img 
 src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
 alt="Corporate Office" 
 className="w-full h-full object-cover"
 />
 {/* Overlay Ticket */}
 <div className="absolute bottom-12 left-12 bg-white p-6 shadow-2xl max-w-sm">
 <div className="text-[var(--color-accent)] font-bold text-4xl mb-2">12+</div>
 <div className="font-heading font-bold uppercase tracking-widest text-sm mb-2">Bölge Müdürlüğü</div>
 <p className="text-sm text-black/60">İstanbul, Ankara ve İzmir başta olmak üzere tüm Türkiye'de operasyonel destek.</p>
 </div>
 </div>
 </div>
 </section>

 {/* AWWWARDS BENTO GRID - QUICK ACCESS */}
 <section className="py-24 max-w-[1440px] mx-auto px-4 md:px-8">
 <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[300px]">
 
 {/* Box 1 - Hero size */}
 <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 md:row-span-2 bg-[#111] text-white p-12 flex flex-col justify-between group overflow-hidden relative focus-within:ring-4 focus-within:ring-[var(--color-accent)]">
 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
 <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80" alt="ERP" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000" />
 <div className="relative z-20 flex justify-between items-start">
 <div className="w-16 h-16 bg-[var(--color-accent)] flex items-center justify-center rounded-full"><Building2 size={24}/></div>
 </div>
 <div className="relative z-20">
 <h3 className="font-heading text-4xl font-black uppercase tracking-tighter mb-4">ERP Entegrasyonu</h3>
 <p className="max-w-md text-white/80 line-clamp-2 mix-blend-screen text-lg mb-6">SAP, Oracle ve Logo gibi major kurumsal kaynak planlama sistemleri ile kusursuz çift yönlü adaptasyon.</p>
 <a href="#" className="inline-flex items-center gap-2 font-bold uppercase text-xs tracking-widest hover:text-[var(--color-accent)] transition-colors">
 Daha Fazla <ArrowUpRight size={16}/>
 </a>
 </div>
 </div>
 
 {/* Box 2 */}
 <div className="bg-white p-10 flex flex-col justify-between border border-black/5 hover:border-[var(--color-accent)] transition-colors group">
 <h3 className="font-heading text-2xl font-black uppercase tracking-tighter">Due Diligence</h3>
 <p className="text-black/60 text-sm my-6">Şirket değerlemeleri ve finansal risk haritaları.</p>
 <div className="w-12 h-12 bg-[#F8F9FA] rounded-full flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors">
 <ArrowUpRight size={20}/>
 </div>
 </div>

 {/* Box 3 */}
 <div className="bg-[var(--color-accent)] text-white p-10 flex flex-col justify-between group">
 <h3 className="font-heading text-2xl font-black uppercase tracking-tighter">İnsan Kaynakları BPO</h3>
 <p className="text-white/80 text-sm my-6">2500+ personel için aktif bordrolama hizmeti.</p>
 <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-[var(--color-accent)] transition-colors">
 <ArrowUpRight size={20}/>
 </div>
 </div>

 {/* Box 4 */}
 <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-[#F1F3F5] p-12 flex items-center justify-between border border-black/5">
 <div className="max-w-sm">
 <h3 className="font-heading text-3xl font-black uppercase tracking-tighter mb-4">Grup İçi Yeniden Yapılandırma</h3>
 <p className="text-black/60 text-sm mb-6">Holdingler arası bölünme, birleşme ve nev'i değişikliği hususlarında hukuki ve mali konsolidasyon.</p>
 <a href="#" className="font-bold uppercase text-xs tracking-widest border-b-2 border-black pb-1 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors">Detaylar</a>
 </div>
 <div className="w-32 h-32 rounded-full border-4 border-[#111] border-dashed shrink-0 flex items-center justify-center text-[#111] animate-[spin_60s_linear_infinite]">
 <Globe size={48} className="animate-pulse" />
 </div>
 </div>

 </div>
 </section>

 {/* MULTI_LOCATION & FRANCHISE (BAYİLİK) */}
 <section className="border-y border-black/10 bg-white">
 <div className="flex flex-col lg:flex-row min-h-[600px]">
 <div className="w-full lg:w-1/3 bg-[#111] text-white p-12 lg:p-20 flex flex-col justify-between">
 <div>
 <h2 className="font-heading text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-8 max-w-xs">{businessData.name} Network</h2>
 <p className="text-white/60 mb-12 max-w-sm">
 Türkiye genelindeki 12 ofisimize ek olarak, franchise altyapımızla Anadolu'nun her köşesindeki KOBİ'lere dünya standartlarında hizmet ulaştırıyoruz.
 </p>
 <button className="w-full bg-white text-[#111] hover:bg-[var(--color-accent)] hover:text-white transition-colors py-5 font-bold uppercase tracking-widest text-xs">
 Bayilik Başvurusu
 </button>
 </div>
 </div>
 <div className="w-full lg:w-2/3 p-12 lg:p-20 bg-[#F8F9FA]">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
 {[
 { city: 'İstanbul (HQ)', dist: 'Levent, Büyükdere Cad.' },
 { city: 'Ankara', dist: 'Çankaya, Söğütözü' },
 { city: 'İzmir', dist: 'Bayraklı, Folkart Towers' },
 { city: 'Bursa', dist: 'Nilüfer, Odunluk' },
 { city: 'Gaziantep', dist: 'Şehitkamil' },
 { city: 'Antalya', dist: 'Muratpaşa' }
 ].map((loc, i) => (
 <div key={i} className="flex gap-4 border-b border-black/5 pb-6 group cursor-pointer">
 <MapPin className="text-[var(--color-accent)] shrink-0 mt-1" />
 <div>
 <h4 className="font-bold text-lg mb-1 group-hover:text-[var(--color-accent)] transition-colors">{loc.city} Bölge Md.</h4>
 <p className="text-black/50 text-sm">{loc.dist}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </section>

 {/* FOOTER LARGE CORPORATE */}
 <footer className="bg-white">
 <div className="max-w-[1440px] mx-auto px-8 lg:px-24 py-24 md:py-32 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-16">
 <div className="md:col-span-4 lg:col-span-2 border-r border-black/5 pr-16">
 <h2 className="font-heading text-3xl font-black uppercase tracking-tighter mb-6">{businessData.name} Group.</h2>
 <p className="text-black/60 font-medium mb-12 max-w-sm">Global ölçekte düşünen yerel işletmelerin bir numaralı kurumsal mali partneri.</p>
 <div className="font-bold text-2xl tracking-tighter">{businessData.phone}</div>
 <div className="text-sm font-medium text-black/50 mt-2">{businessData.email}</div>
 </div>
 
 <div className="lg:col-span-1">
 <h4 className="font-bold uppercase tracking-widest text-xs mb-8">Kurumsal</h4>
 <ul className="space-y-4 text-sm font-medium text-black/70">
 <li className="hover:text-[var(--color-accent)] cursor-pointer">Hakkımızda</li>
 <li className="hover:text-[var(--color-accent)] cursor-pointer">Yönetim Kurulu</li>
 <li className="hover:text-[var(--color-accent)] cursor-pointer">Yatırımcı İlişkileri</li>
 <li className="hover:text-[var(--color-accent)] cursor-pointer">Kariyer</li>
 </ul>
 </div>
 
 <div className="lg:col-span-2">
 <h4 className="font-bold uppercase tracking-widest text-xs mb-8">Çözümler</h4>
 <ul className="space-y-4 text-sm font-medium text-black/70">
 <li className="hover:text-[var(--color-accent)] cursor-pointer">Bağımsız Denetim ve Tasdik</li>
 <li className="hover:text-[var(--color-accent)] cursor-pointer">ERP ve Dijital Dönüşüm</li>
 <li className="hover:text-[var(--color-accent)] cursor-pointer">UFRS Finansal Raporlama</li>
 <li className="hover:text-[var(--color-accent)] cursor-pointer">Bordro Hukuku</li>
 </ul>
 </div>

 <div className="lg:col-span-1">
 <h4 className="font-bold uppercase tracking-widest text-xs mb-8">Dokümanlar</h4>
 <ul className="space-y-4 text-sm font-medium text-black/70">
 <li className="hover:text-[var(--color-accent)] cursor-pointer flex items-center justify-between group">
 Kurumsal Profil <Download size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
 </li>
 <li className="hover:text-[var(--color-accent)] cursor-pointer flex items-center justify-between group">
 Sirküler (2025) <Download size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
 </li>
 <li className="hover:text-[var(--color-accent)] cursor-pointer flex items-center justify-between group">
 KVKK Politikası <Download size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
 </li>
 </ul>
 </div>
 </div>
 <div className="max-w-[1440px] mx-auto px-8 lg:px-24 py-8 border-t border-black/5 text-xs font-bold text-black/40 uppercase tracking-widest flex flex-col md:flex-row justify-between items-center gap-4">
 <span>© {new Date().getFullYear()} {businessData.name} Group Global.</span>
 <div className="flex gap-8">
 <span className="hover:text-black cursor-pointer">LinkedIn</span>
 <span className="hover:text-black cursor-pointer">Twitter (X)</span>
 <span className="hover:text-black cursor-pointer">YouTube</span>
 </div>
 </div>
 </footer>

 </div>
 )
}
