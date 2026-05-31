'use client'

import React from 'react'
import { ThemeConfig, BusinessData } from '../../types/section-types'
import { Award, ArrowRight, Gavel, FileSignature, Scale, Building, TrendingUp, ShieldCheck } from 'lucide-react'

interface Props {
 config: ThemeConfig
 businessData: BusinessData
}

export function MuhasebeciDenetimSections({ config, businessData }: Props) {
 // Tier 4: YMM bağımsız denetim. Koyu lacivert, akademik. Cormorant Garamond / Serif ağırlıklı.
 // 1280px container, Fullscreen Kenburns hero. Parallax/Dark Mode aesthetics.
 
 return (
 <div className="font-body bg-[#1A1A2E] text-white min-h-screen selection:bg-[#D4AF37] selection:text-black">
 
 {/* FULLSCREEN KENBURNS HERO */}
 <section className="relative w-full h-screen overflow-hidden flex items-center bg-[#0F0F1E]">
 {/* Slow zoom animation (Kenburns effect CSS simulation via simple transform/scale for demo purposes) */}
 <div className="absolute inset-0 w-full h-full scale-105 transition-transform duration-[20s] ease-in hover:scale-125">
 <img 
 src="https://images.unsplash.com/photo-1577415124236-1e64627aa71c?auto=format&fit=crop&q=80" 
 alt="Yeminli Mali Müşavirlik" 
 className="w-full h-full object-cover opacity-20 grayscale sepia-[0.2]"
 />
 </div>
 <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/50 via-transparent to-[#1A1A2E]"></div>
 
 <div className="container mx-auto max-w-[1280px] px-8 relative z-10 pt-20">
 <div className="flex flex-col max-w-4xl">
 <div className="flex items-center gap-4 mb-8">
 <div className="w-16 h-px bg-[#D4AF37]"></div>
 <span className="text-[#D4AF37] font-bold tracking-[0.3em] text-xs uppercase">
 Yeminli Mali Müşavirlik & Bağımsız Denetim
 </span>
 </div>
 <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-[1.1] mb-8 text-[#ECECF1]">
 Şeffaflıkta <br/> <span className="italic text-white">Güvence.</span>
 </h1>
 <p className="text-[#A0A0B0] text-lg lg:text-2xl font-body max-w-2xl font-light leading-relaxed mb-12">
 {businessData.slogan || 'Kurumsal itibarınızı korumak ve yasal mevzuata tam uyum sağlamak için Türkiye\'nin öncü denetim gücü.'}
 </p>
 <div className="flex items-center gap-8">
 <a href="#denetim" className="px-10 py-5 bg-[#D4AF37] text-[#1A1A2E] hover:bg-[#FDE047] font-bold tracking-widest uppercase text-sm transition-colors border border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.15)] flex items-center gap-3">
 Denetim Hizmetleri <ArrowRight size={16}/>
 </a>
 <a href="#hakkimizda" className="text-white hover:text-[#D4AF37] transition-colors uppercase tracking-widest text-sm font-bold border-b border-transparent hover:border-[#D4AF37] pb-1">
 Hakkımızda
 </a>
 </div>
 </div>
 </div>
 </section>

 {/* EDITORIAL ZIGZAG SERVICES */}
 <section className="py-32 bg-[#1A1A2E]" id="denetim">
 <div className="container mx-auto max-w-[1280px] px-8">
 <div className="flex items-center justify-between border-b border-white/10 pb-8 mb-20">
 <h2 className="font-heading text-4xl lg:text-5xl font-normal text-white">Uzmanlık <span className="italic">Alanlarımız</span></h2>
 <div className="hidden md:block w-32 h-px bg-[#D4AF37]"></div>
 </div>

 <div className="flex flex-col gap-32">
 {[
 { title: 'Bağımsız Denetim', desc: 'Uluslararası Finansal Raporlama Standartları (UFRS/TFRS) kapsamında şirketinizin finansal tablolarını bağımsız, şeffaf ve güvenilir bir şekilde denetliyoruz.', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80', icon: <Scale size={32}/> },
 { title: 'Tam Tasdik', desc: 'Kurumlar Vergisi ve Gelir Vergisi beyannamelerinizin yeminli mali müşavir tarafından tasdik edilerek vergi incelemesi riskini minimize ediyoruz.', img: 'https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80', icon: <FileSignature size={32}/>, reverse: true },
 { title: 'Birleşme & Devralma (M&A)', desc: 'Due Diligence süreçlerinden şirket değerlemelerine kadar, stratejik birleşme ve devralma işlemlerinde tam kapsamlı finansal ve vergisel danışmanlık sunuyoruz.', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80', icon: <Building size={32}/> }
 ].map((srv, idx) => (
 <div key={idx} className={`flex flex-col ${srv.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 group`}>
 <div className="w-full lg:w-1/2 overflow-hidden aspect-[4/3] bg-[#0F0F1E] relative">
 <img src={srv.img} alt={srv.title} className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" />
 <div className="absolute inset-0 border border-white/10 m-4 pointer-events-none"></div>
 <div className="absolute bottom-6 right-6 w-16 h-16 bg-[#1A1A2E] text-[#D4AF37] flex items-center justify-center border border-white/10 p-4">
 {srv.icon}
 </div>
 </div>
 <div className="w-full lg:w-1/2 flex flex-col items-start px-4 lg:px-12">
 <div className="text-[#D4AF37] font-bold tracking-[0.2em] text-xs uppercase mb-4">0{idx + 1}</div>
 <h3 className="font-heading text-3xl lg:text-4xl font-normal leading-tight mb-6">{srv.title}</h3>
 <p className="text-[#A0A0B0] font-light leading-relaxed mb-8 text-lg">{srv.desc}</p>
 <a href="#" className="font-bold uppercase tracking-widest text-xs border-b border-[#D4AF37] text-[#D4AF37] pb-2 hover:text-white hover:border-white transition-colors">
 Detaylı Bilgi
 </a>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* AWARDS & PRESS - ACADEMIC STYLE BAR */}
 <section className="py-24 bg-[#0F0F1E] border-y border-white/5 relative overflow-hidden">
 <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none"></div>
 <div className="container mx-auto max-w-[1280px] px-8 text-center relative z-10">
 <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center text-[#D4AF37] mb-8 border border-white/10">
 <Award size={32} />
 </div>
 <h2 className="font-heading text-3xl font-normal text-white mb-16">Tanınmışlık ve Akreditasyonlar</h2>
 <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-60">
 {/* Academic/Corporate Logos simulated via text/icons */}
 <div className="flex flex-col items-center gap-4 hover:opacity-100 hover:text-[#D4AF37] transition-all cursor-default">
 <Gavel size={40} />
 <span className="font-heading tracking-widest uppercase text-xs">KGK Yetkilendirilmiş</span>
 </div>
 <div className="flex flex-col items-center gap-4 hover:opacity-100 hover:text-[#D4AF37] transition-all cursor-default">
 <ShieldCheck size={40} />
 <span className="font-heading tracking-widest uppercase text-xs">SPK Denetim Yetkisi</span>
 </div>
 <div className="flex flex-col items-center gap-4 hover:opacity-100 hover:text-[#D4AF37] transition-all cursor-default">
 <TrendingUp size={40} />
 <span className="font-heading tracking-widest uppercase text-xs">Uluslararası UFRS Ağı</span>
 </div>
 </div>
 </div>
 </section>

 {/* PHILOSOPHY / QUOTE */}
 <section className="py-32 bg-[#1A1A2E]" id="hakkimizda">
 <div className="container mx-auto max-w-[960px] px-8 text-center">
 <svg className="w-16 h-16 mx-auto text-[#D4AF37]/30 mb-8" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
 <h2 className="font-heading text-4xl lg:text-5xl font-light leading-relaxed text-white mb-10 italic">
 "Sayılara ruh katan, onlara duyulan güvendir. Biz, {businessData.name} olarak yirmi yılı aşkın süredir iş dünyasının şeffaf ve hesap verebilir bir zeminde yürümesini sağlıyoruz."
 </h2>
 <div className="font-bold tracking-widest uppercase text-sm text-[#D4AF37]">{businessData?.ownerName as string}</div>
 <div className="text-[#A0A0B0] text-xs tracking-widest uppercase mt-2">Kurucu Ortak, YMM</div>
 </div>
 </section>

 {/* CONTACT / APPOINTMENT */}
 <section className="border-t border-white/10 bg-[#0F0F1E] flex flex-col lg:flex-row">
 <div className="w-full lg:w-1/2 p-16 lg:p-32 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
 <h2 className="font-heading text-4xl font-normal mb-8">İletişim</h2>
 <div className="w-12 h-px bg-[#D4AF37] mb-12"></div>
 <div className="space-y-8 text-lg font-light text-[#A0A0B0]">
 <div>
 <div className="font-bold text-white text-xs tracking-widest uppercase mb-2">Merkez Ofis</div>
 <p className="leading-relaxed">{businessData.address}<br/>{businessData.district}, {businessData.city}</p>
 </div>
 <div>
 <div className="font-bold text-white text-xs tracking-widest uppercase mb-2">İletişim Bilgileri</div>
 <p className="leading-relaxed">T: {businessData.phone}<br/>E: {businessData.email}</p>
 </div>
 </div>
 </div>
 <div className="w-full lg:w-1/2 p-16 lg:p-32 bg-[#1A1A2E] flex flex-col justify-center">
 <form className="space-y-8 font-light" onSubmit={e => e.preventDefault()}>
 <div>
 <input type="text" placeholder="Firma Ünvanı / Adınız" className="w-full bg-transparent border-b border-white/20 pb-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/30" />
 </div>
 <div className="grid grid-cols-2 gap-8">
 <input type="email" placeholder="E-Posta Adresi" className="w-full bg-transparent border-b border-white/20 pb-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/30" />
 <input type="tel" placeholder="Telefon Numarası" className="w-full bg-transparent border-b border-white/20 pb-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/30" />
 </div>
 <div>
 <textarea placeholder="Konu (Denetim, Tasdik, Birleşme vb.)" rows={3} className="w-full bg-transparent border-b border-white/20 pb-4 text-white focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-white/30 resize-none"></textarea>
 </div>
 <button className="bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A1A2E] px-12 py-5 uppercase tracking-[0.2em] text-xs font-bold transition-all w-full md:w-auto">
 Gönder
 </button>
 </form>
 </div>
 </section>

 <footer className="bg-[#0A0A14] text-center py-8 text-[#A0A0B0] text-xs uppercase tracking-widest">
 <p>© {new Date().getFullYear()} {businessData.name} - Bağımsız Denetim ve Yeminli Mali Müşavirlik A.Ş.</p>
 </footer>

 </div>
 )
}
