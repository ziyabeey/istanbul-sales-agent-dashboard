'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

type DefaultThemeState = any

/* ═══════════════════════════════════════════════════════════════════
 TIER 1 — İNŞAAT SADE (Temel / Taşeron Bio-Link)
 - Layout: Tek sütun, mobil odaklı, kart görünümü.
 - Tasarım: Beyaz (#ffffff), Turuncu (#ea580c), Koyu gri yazı.
 - Font: Inter.
 - Etkileşim: Sadece statik/saf HTML.
 ═══════════════════════════════════════════════════════════════════ */

export function InsaatSadeHero({ state }: { state: DefaultThemeState }) {
 return (
 <section className="bg-white py-12 px-4 font-inter">
 <div className="max-w-md mx-auto bg-[#fafafa] border-2 border-gray-100 rounded-3xl p-8 text-center shadow-lg relative overflow-hidden">
 {/* Dekoratif turuncu çizgi */}
 <div className="absolute top-0 left-0 right-0 h-2 bg-[#ea580c]"></div>
 
 <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white shadow-sm overflow-hidden">
 {/* Avatar statik image - if available or fallback icon */}
 <span className="text-4xl">👷‍♂️</span>
 </div>
 
 <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">{state.hero.title}</h1>
 <p className="text-sm font-medium text-[#ea580c] bg-orange-50 inline-block px-3 py-1 rounded-full mb-4">
 {state.hero.subtitle}
 </p>
 
 <p className="text-gray-600 mb-8 text-sm leading-relaxed">
 Temelden çatıya, inşaat projelerinizde güvenilir taşeron hizmeti. Zamanında teslimat, kaliteli işçilik.
 </p>

 <a 
 href={state.hero.buttonLink}
 className="block w-full bg-[#ea580c] text-white py-4 rounded-xl font-semibold shadow-md active:scale-95 transition-transform"
 >
 {state.hero.buttonText}
 </a>
 </div>
 </section>
 )
}

export function InsaatSadeServices({ state }: { state: DefaultThemeState }) {
 return (
 <section className="bg-white py-8 px-4 font-inter">
 <div className="max-w-md mx-auto space-y-4">
 <h2 className="text-lg text-gray-900 font-bold mb-6 px-2">Hizmetlerimiz</h2>
 {state.services.items.map((item: any) => (
 <div key={item.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
 <div className="w-12 h-12 bg-orange-50 text-[#ea580c] rounded-xl flex items-center justify-center text-xl shrink-0">
 {item.icon}
 </div>
 <div>
 <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
 <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
 </div>
 </div>
 ))}
 </div>
 </section>
 )
}

export function InsaatSadeContact({ state }: { state: DefaultThemeState }) {
 return (
 <section id="contact" className="bg-white py-12 px-4 font-inter pb-24">
 <div className="max-w-md mx-auto">
 <div className="bg-gray-900 text-white rounded-3xl p-8 relative overflow-hidden">
 {/* Dekoratif turuncu daire */}
 <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#ea580c] rounded-full blur-2xl opacity-50"></div>
 
 <h2 className="text-xl font-bold mb-6 relative z-10">{state.contact.title}</h2>
 
 <div className="space-y-4 relative z-10">
 <div className="flex items-center gap-3">
 <span className="text-[#ea580c]">📍</span>
 <span className="text-sm font-medium">{state.contact.address}</span>
 </div>
 <div className="flex items-center gap-3">
 <span className="text-[#ea580c]">📞</span>
 <a href={`tel:${state.contact.phone}`} className="text-sm font-bold text-white underline decoration-[#ea580c] underline-offset-4">{state.contact.phone}</a>
 </div>
 <div className="flex items-center gap-3">
 <span className="text-[#ea580c]">✉️</span>
 <a href={`mailto:${state.contact.email}`} className="text-sm">{state.contact.email}</a>
 </div>
 </div>
 </div>
 </div>
 </section>
 )
}

/* ═══════════════════════════════════════════════════════════════════
 TIER 2 — İNŞAAT KURUMSAL (Standart / 30-70 Sticky)
 - Layout: Sol %30 Sticky Header, Sağ %70 İçerik.
 - Tasarım: Gümüş (#f3f4f6), Lacivert (#1e3a8a).
 - Font: Roboto (Heading), Open Sans (Body).
 - Etkileşim: Fade-Up scroll reveal.
 ═══════════════════════════════════════════════════════════════════ */

// Basit Scroll Reveal Wrapper (Kurumsal tier için)
function FadeUp({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
 return (
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-100px" }}
 transition={{ duration: 0.7, delay, ease: "easeOut" as any }}
 >
 {children}
 </motion.div>
 )
}

export function InsaatKurumsalLayout({ children, state }: { children: React.ReactNode, state: DefaultThemeState }) {
 // Kurumsal tier tüm içeriğini bu layout içinde sarmalar.
 return (
 <div className="min-h-screen bg-white md:flex">
 {/* Sol Sidebar - 30% Sticky */}
 <aside className="md:w-[35%] lg:w-[30%] bg-[#1e3a8a] text-white p-10 md:h-screen md:sticky top-0 flex flex-col justify-between font-roboto z-20 shadow-2xl">
 <FadeUp>
 <div className="w-16 h-16 bg-white text-[#1e3a8a] text-3xl flex items-center justify-center font-bold mb-8 shadow-lg">
 Gİ
 </div>
 <h1 className="text-3xl lg:text-4xl font-black mb-4 leading-tight">
 {state.hero.title}
 </h1>
 <p className="text-[#93c5fd] font-sans text-sm font-medium leading-relaxed max-w-sm mb-8">
 {state.hero.subtitle}
 </p>
 <div className="w-12 h-1 bg-[#f59e0b] mb-12"></div>
 </FadeUp>

 <FadeUp delay={0.2}>
 <nav className="hidden md:flex flex-col gap-6 text-sm font-bold tracking-widest uppercase text-white/50">
 <a href="#projeler" className="hover:text-white hover:translate-x-2 transition-all">Devam Eden Projeler</a>
 <a href="#hizmetler" className="hover:text-white hover:translate-x-2 transition-all">Faaliyet Alanları</a>
 <a href="#iletisim" className="text-white flex items-center gap-2">
 <span className="w-4 h-[1px] bg-[#f59e0b]"></span> Bize Ulaşın
 </a>
 </nav>
 </FadeUp>

 <FadeUp delay={0.4}>
 <div className="mt-12 md:mt-0 font-sans text-xs text-white/40">
 &copy; 2025 Güven İnşaat A.Ş. <br/> Tüm hakları saklıdır.
 </div>
 </FadeUp>
 </aside>

 {/* Sağ İçerik - 70% Scrollable */}
 <main className="md:w-[65%] lg:w-[70%] bg-[#f3f4f6]">
 {children}
 </main>
 </div>
 )
}

export function InsaatKurumsalHero({ state }: { state: DefaultThemeState }) {
 return (
 <section className="relative h-[60vh] md:h-[70vh] bg-[#f3f4f6] flex items-end p-8 md:p-16 overflow-hidden">
 {/* Hero Resmi */}
 <div 
 className="absolute inset-0 bg-cover bg-center"
 style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070)', filter: 'brightness(0.8) contrast(1.1)' }}
 />
 
 {/* Kutu (Mimari form) */}
 <div className="absolute bottom-0 right-0 w-3/4 max-w-lg h-3/4 bg-[#1e3a8a]/90 backdrop-blur-md p-10 flex flex-col justify-end text-white border-l-4 border-[#f59e0b] -translate-x-0 translate-y-0">
 <FadeUp delay={0.3}>
 <h2 className="font-roboto text-4xl font-bold mb-2">Modern<br/>Şehircilik</h2>
 <p className="font-sans text-sm text-gray-300 opacity-80 mb-6">Yüksek standartlarda mimari çözümlerle geleceği bugünden inşa ediyoruz.</p>
 <a href={state.hero.buttonLink} className="inline-block bg-[#f59e0b] text-[#1e3a8a] text-sm font-bold uppercase tracking-widest py-3 px-8 hover:bg-white transition-colors">
 {state.hero.buttonText}
 </a>
 </FadeUp>
 </div>
 </section>
 )
}

export function InsaatKurumsalServices({ state }: { state: DefaultThemeState }) {
 return (
 <section id="hizmetler" className="py-20 px-8 md:px-16 lg:px-24 bg-white font-sans">
 <FadeUp>
 <span className="text-[#f59e0b] font-bold text-sm tracking-widest uppercase mb-2 block">Uzmanlık</span>
 <h2 className="font-roboto text-4xl font-black text-[#1e3a8a] mb-12">Faaliyet Alanlarımız</h2>
 </FadeUp>

 <div className="grid md:grid-cols-2 gap-8">
 {state.services.items.map((item: any, idx: number) => (
 <FadeUp key={item.id} delay={idx * 0.1}>
 <div className="bg-[#f3f4f6] p-8 border-l-4 border-transparent hover:border-[#1e3a8a] hover:bg-white hover:shadow-xl transition-all duration-300 group h-full">
 <span className="text-4xl block mb-6 filter grayscale group-hover:grayscale-0 transition-all">{item.icon}</span>
 <h3 className="font-roboto text-xl font-bold text-[#1e3a8a] mb-3">{item.title}</h3>
 <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
 </div>
 </FadeUp>
 ))}
 
 {/* Dekoratif Boş Kutu */}
 <FadeUp delay={0.4}>
 <div className="bg-[#1e3a8a] p-8 h-full flex items-center justify-center text-center text-white relative overflow-hidden group">
 <div className="absolute inset-0 bg-[#f59e0b] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 z-0"></div>
 <div className="relative z-10">
 <span className="text-3xl block mb-2">🏗️</span>
 <h3 className="font-roboto text-lg font-bold">Yeni Projelerimiz<br/>Yolda!</h3>
 </div>
 </div>
 </FadeUp>
 </div>
 </section>
 )
}

export function InsaatKurumsalContact({ state }: { state: DefaultThemeState }) {
 return (
 <section id="iletisim" className="py-20 px-8 md:px-16 lg:px-24 bg-[#1e3a8a] text-white font-sans">
 <FadeUp>
 <h2 className="font-roboto text-4xl font-black mb-4">Merkez Ofis</h2>
 <div className="w-16 h-1 bg-[#f59e0b] mb-12"></div>
 </FadeUp>

 <div className="grid lg:grid-cols-2 gap-16">
 <div className="space-y-8">
 <FadeUp delay={0.1}>
 <p className="text-lg text-blue-100/80 mb-8">{state.contact.subtitle}</p>
 
 <div className="flex gap-4 items-start mb-6">
 <div className="w-12 h-12 bg-white/10 flex items-center justify-center text-[#f59e0b] text-xl shrink-0">📍</div>
 <div>
 <h4 className="font-roboto font-bold mb-1">Adres</h4>
 <p className="text-gray-300 text-sm leading-relaxed">{state.contact.address}</p>
 </div>
 </div>
 
 <div className="flex gap-4 items-start mb-6">
 <div className="w-12 h-12 bg-white/10 flex items-center justify-center text-[#f59e0b] text-xl shrink-0">📞</div>
 <div>
 <h4 className="font-roboto font-bold mb-1">Telefon</h4>
 <p className="text-gray-300 text-sm">{state.contact.phone}</p>
 </div>
 </div>
 </FadeUp>
 </div>
 
 <FadeUp delay={0.3}>
 <form className="bg-white p-8 rounded-none shadow-2xl">
 <h3 className="font-roboto text-2xl font-bold text-[#1e3a8a] mb-6">Proje Teklifi Al</h3>
 <div className="space-y-4">
 <input type="text" placeholder="Adınız Soyadınız" className="w-full bg-[#f3f4f6] border-0 p-4 text-gray-900 focus:ring-2 focus:ring-[#1e3a8a] focus:bg-white transition-all"/>
 <input type="email" placeholder="E-posta Adresiniz" className="w-full bg-[#f3f4f6] border-0 p-4 text-gray-900 focus:ring-2 focus:ring-[#1e3a8a] focus:bg-white transition-all"/>
 <textarea placeholder="Proje Detayları" rows={4} className="w-full bg-[#f3f4f6] border-0 p-4 text-gray-900 focus:ring-2 focus:ring-[#1e3a8a] focus:bg-white transition-all resize-none"></textarea>
 <button type="button" className="w-full bg-[#1e3a8a] text-white font-bold tracking-widest uppercase p-4 hover:bg-[#f59e0b] hover:text-[#1e3a8a] transition-all">Gönder</button>
 </div>
 </form>
 </FadeUp>
 </div>
 </section>
 )
}

/* ═══════════════════════════════════════════════════════════════════
 TIER 3 — İNŞAAT MODERN (Büyüme / Masonry Mimarlık O.)
 - Layout: Masonry Asimetrik Grid.
 - Tasarım: Antrasit (#1f2937), Neon Yeşil (#a3e635).
 - Font: Space Grotesk (Heading), Manrope (Body).
 - Etkileşim: Hover Zoom görseller, modern grid kaydırma.
 ═══════════════════════════════════════════════════════════════════ */

export function InsaatModernHero({ state }: { state: DefaultThemeState }) {
 return (
 <section className="relative w-full min-h-screen bg-[#1f2937] flex items-center overflow-hidden font-manrope">
 {/* Devasa Asimetrik Tipografi Arkaplanı */}
 <h1 className="absolute -left-10 md:left-10 top-1/4 text-[120px] md:text-[200px] font-bold text-white/5 whitespace-nowrap select-none pointer-events-none font-space-grotesk tracking-tighter mix-blend-overlay">
 NOVA
 </h1>
 
 <div className="absolute right-0 top-0 w-[60%] h-full bg-[#111827] clip-path-polygon-[20%_0,100%_0,100%_100%,0_100%] z-0"></div>

 <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12 mt-20">
 <div className="md:w-1/2">
 <div className="inline-block px-4 py-1 border border-[#a3e635] text-[#a3e635] text-xs font-bold tracking-widest uppercase mb-6 rounded-full">
 Mimaride Yeni Normlar
 </div>
 <h2 className="text-5xl md:text-7xl font-bold text-white font-space-grotesk leading-[1.1] mb-6">
 Yenilikçi <br/> <span className="text-[#a3e635]">Tasarım</span> Stüdyosu.
 </h2>
 <p className="text-gray-400 text-lg md:text-xl font-light max-w-lg mb-10 leading-relaxed">
 {state.hero.subtitle} Modern yapıların ve yaşanabilir ekosistemlerin arkasındaki vizyoner mimari zeka.
 </p>
 <a href={state.hero.buttonLink} className="inline-flex items-center justify-center bg-[#a3e635] text-[#1f2937] font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white transition-colors duration-300 shadow-[0_0_30px_rgba(163,230,53,0.3)]">
 {state.hero.buttonText}
 </a>
 </div>
 
 <div className="md:w-1/2 relative h-[500px] w-full group">
 <div className="absolute inset-0 bg-[#a3e635] rounded-3xl translate-x-4 translate-y-4 opacity-50 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500"></div>
 <img 
 src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070" 
 alt="Modern Mimari" 
 className="absolute inset-0 w-full h-full object-cover rounded-3xl grayscale group-hover:grayscale-0 transition-all duration-700"
 />
 </div>
 </div>
 </section>
 )
}

export function InsaatModernServices({ state }: { state: DefaultThemeState }) {
 // Masonry Grid stili asimetrik yerleşim
 
 const heights = ['h-[300px]', 'h-[400px]', 'h-[350px]']
 const mt = ['mt-0', 'mt-12', 'mt-24']
 
 return (
 <section className="py-32 bg-[#111827] text-white font-manrope">
 <div className="container mx-auto px-6">
 <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
 <div>
 <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold mb-4">Pratik & Estetik</h2>
 <p className="text-gray-400 max-w-md">Fonksiyonelliği estetikle birleştiren bütünsel mimari çözümler sunuyoruz.</p>
 </div>
 <button className="text-[#a3e635] font-bold tracking-widest text-sm uppercase flex items-center gap-2 group">
 Tüm Projeler <span className="group-hover:translate-x-2 transition-transform">→</span>
 </button>
 </div>

 <div className="grid md:grid-cols-3 gap-6">
 {state.services.items.map((item: any, idx: number) => (
 <div key={item.id} className={`group relative overflow-hidden rounded-3xl bg-[#1f2937] ${heights[idx % 3]} ${mt[idx % 3]}`}>
 <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent z-10"></div>
 
 {/* Fallback pattern background if no image, using CSS gradient */}
 <div className="absolute inset-0 bg-[#1f2937] opacity-50 bg-[radial-gradient(#4b5563_1px,transparent_1px)] [background-size:20px_20px] group-hover:scale-110 transition-transform duration-700"></div>
 
 <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
 <div className="w-12 h-12 rounded-full bg-[#a3e635] text-[#111827] flex items-center justify-center text-xl mb-4 font-bold shadow-lg shadow-[#a3e635]/20">
 {item.icon}
 </div>
 <h3 className="font-space-grotesk text-2xl font-bold mb-2">{item.title}</h3>
 <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{item.description}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}

export function InsaatModernContact({ state }: { state: DefaultThemeState }) {
 return (
 <section className="py-24 bg-[#a3e635] text-[#111827] font-manrope rounded-t-[3rem] -mt-10 relative z-10">
 <div className="container mx-auto px-6 text-center max-w-4xl">
 <h2 className="font-space-grotesk text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">
 Sıradaki Dev Projenizi Birlikte <span className="text-white">Çizelim.</span>
 </h2>
 <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
 <div className="bg-[#111827] text-white px-8 py-4 rounded-full text-lg font-bold">
 {state.contact.email}
 </div>
 <div className="bg-transparent border-2 border-[#111827] text-[#111827] px-8 py-4 rounded-full text-lg font-bold hover:bg-[#111827] hover:text-[#a3e635] transition-colors cursor-pointer">
 {state.contact.phone}
 </div>
 </div>
 <p className="text-[#111827]/60 font-medium">📍 {state.contact.address}</p>
 </div>
 </section>
 )
}

/* ═══════════════════════════════════════════════════════════════════
 TIER 4 — İNŞAAT PRESTİJ (Premium / Rezidans Lansmanı)
 - Layout: Full-page CSS Snap Scroll.
 - Tasarım: Siyah (#000000), Altın/Zümrüt vurgu.
 - Font: Montserrat (Heading), Lora (Body).
 - Etkileşim: Bölümler arası yumuşak/keskin dikey snap.
 ═══════════════════════════════════════════════════════════════════ */

export function InsaatPrestijHero({ state }: { state: DefaultThemeState }) {
 return (
 <section className="h-screen w-full snap-start snap-always relative flex items-center justify-center font-montserrat overflow-hidden">
 <div className="absolute inset-0 bg-black z-0">
 <motion.img 
 initial={{ scale: 1.1, opacity: 0 }}
 animate={{ scale: 1, opacity: 0.7 }}
 transition={{ duration: 2, ease: "easeOut" as any }}
 src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070" 
 alt="Luxury Residence" 
 className="w-full h-full object-cover grayscale"
 />
 <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90"></div>
 </div>
 
 <div className="relative z-10 text-center px-4 max-w-5xl">
 <motion.p 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.5, duration: 1 }}
 className="text-[#d4af37] tracking-[0.3em] text-sm uppercase font-semibold mb-6"
 >
 Exclusive Living Experience
 </motion.p>
 
 <motion.h1 
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" as any }}
 className="text-6xl md:text-8xl lg:text-9xl font-light text-white mb-8 tracking-tighter"
 >
 {state.hero.title}
 </motion.h1>
 
 <motion.div 
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 1.5, duration: 1 }}
 >
 <a href={state.hero.buttonLink} className="inline-block border border-white/30 px-12 py-4 text-white text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500">
 {state.hero.buttonText}
 </a>
 </motion.div>
 </div>
 
 {/* Etkileşimli Scroll Göstergesi */}
 <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10 opacity-70">
 <span className="text-white/50 tracking-widest text-[10px] uppercase font-bold">Aşağı Kaydır</span>
 <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
 <motion.div 
 animate={{ y: [0, 64] }}
 transition={{ repeat: Infinity, duration: 1.5, ease: "linear" as const }}
 className="w-full h-1/2 bg-[#d4af37]"
 />
 </div>
 </div>
 </section>
 )
}

export function InsaatPrestijServices({ state }: { state: DefaultThemeState }) {
 // Snap scroll container içinde tam ekran bir bölüm
 return (
 <section className="h-screen w-full snap-start snap-always relative flex items-center bg-[#0a0f1a] overflow-hidden font-montserrat px-8 md:px-24">
 {/* Altın çerçeve */}
 <div className="absolute inset-8 border border-[#d4af37]/20 pointer-events-none"></div>

 <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
 <div className="md:w-1/3">
 <h2 className="text-[#d4af37] text-sm tracking-[0.2em] uppercase mb-4">Ayrıcalıklar</h2>
 <h3 className="text-4xl md:text-6xl font-light text-white mb-8 leading-tight">Yaşam<br/>Standartları</h3>
 <p className="text-gray-400 font-lora text-lg italic mb-12">
 Zirve Rezidans, sadece bir yaşam alanı değil, tüm ihtiyaçlarınızın merkezinde yer alan prestijli bir ekosistemdir.
 </p>
 </div>
 
 <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
 {state.services.items.map((item: any, idx: number) => (
 <div key={item.id} className="relative group">
 <span className="absolute -left-6 -top-4 text-6xl text-white/5 font-black z-0 group-hover:text-[#d4af37]/10 transition-colors">0{idx + 1}</span>
 <div className="relative z-10">
 <h4 className="text-xl text-white font-medium mb-3 pb-3 border-b border-white/10 group-hover:border-[#d4af37]/50 transition-colors">
 <span className="mr-3">{item.icon}</span> {item.title}
 </h4>
 <p className="font-lora text-gray-500 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
 {item.description}
 </p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 )
}

export function InsaatPrestijContact({ state }: { state: DefaultThemeState }) {
 return (
 <section className="h-screen w-full snap-start snap-always relative flex items-center bg-black font-montserrat">
 <div className="absolute inset-0 bg-[#d4af37]/5"></div>
 
 <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center h-full">
 <div className="text-center max-w-2xl mx-auto mb-16">
 <span className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-[#d4af37] text-2xl mx-auto mb-6">🥂</span>
 <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Proje Lansmanı İçin<br/>VIP Kayıt</h2>
 <p className="text-gray-400 font-lora italic text-lg">{state.contact.subtitle}</p>
 </div>

 <form className="w-full max-w-xl flex flex-col gap-6">
 <input type="text" placeholder="İsim Soyisim" className="bg-transparent border-b border-white/20 text-white p-4 focus:outline-none focus:border-[#d4af37] text-center font-lora italic transition-colors" />
 <input type="tel" placeholder="Telefon Numarası" className="bg-transparent border-b border-white/20 text-white p-4 focus:outline-none focus:border-[#d4af37] text-center font-lora italic transition-colors" />
 <button type="button" className="mt-8 bg-[#d4af37] text-black font-bold uppercase tracking-widest py-5 hover:bg-white transition-colors">
 Katalog Talep Et
 </button>
 </form>

 <div className="mt-24 text-center border-t border-white/10 pt-8 w-full max-w-4xl flex justify-between text-xs text-white/40 tracking-widest uppercase">
 <span>{state.contact.address}</span>
 <span>{state.contact.phone}</span>
 </div>
 </div>
 </section>
 )
}


/* ═══════════════════════════════════════════════════════════════════
 TIER 5 — İNŞAAT ELİTE (Premium+ / Awwwards)
 - Layout: Etkileşimli Vaziyet Planı (SVG) ve şeffaf katmanlar.
 - Tasarım: Saf Siyah (#000000), Krom (#94a3b8).
 - Font: Syne (Heading), Inter (Body).
 - Etkileşim: Magnetic Cursor, Custom scroll, SVG path hover effects.
 ═══════════════════════════════════════════════════════════════════ */

export function InsaatEliteHero({ state }: { state: DefaultThemeState }) {
 // Basit manyetik imleç efekti
 const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
 const [isHovered, setIsHovered] = useState(false)

 useEffect(() => {
 const updateMousePosition = (e: MouseEvent) => {
 setMousePosition({ x: e.clientX, y: e.clientY })
 }
 window.addEventListener('mousemove', updateMousePosition)
 return () => window.removeEventListener('mousemove', updateMousePosition)
 }, [])

 return (
 <section className="relative w-full h-[120vh] bg-black text-white font-syne overflow-hidden cursor-none">
 
 {/* Özel İmleç */}
 <motion.div 
 className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/50 pointer-events-none z-50 flex items-center justify-center mix-blend-difference"
 animate={{
 x: mousePosition.x - 16,
 y: mousePosition.y - 16,
 scale: isHovered ? 2 : 1,
 backgroundColor: isHovered ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)'
 }}
 transition={{ type: 'spring' as const, stiffness: 500, damping: 28, mass: 0.5 }}
 >
 {isHovered && <span className="text-[4px] text-black font-bold tracking-widest">DRAG</span>}
 </motion.div>

 {/* Hero İçerik (Glassmorphism kartı olarak yüzüyor) */}
 <div className="absolute top-1/4 left-10 md:left-24 z-20 max-w-xl">
 <h1 
 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-400 to-gray-800 leading-[0.9] mb-8"
 onMouseEnter={() => setIsHovered(true)}
 onMouseLeave={() => setIsHovered(false)}
 >
 {state.hero.title}
 </h1>
 <p className="font-inter text-gray-400 text-lg mb-12 max-w-md font-light leading-relaxed">
 {state.hero.subtitle}
 </p>
 
 <div className="flex gap-4 border-l border-gray-800 pl-6 py-2">
 {state.services.items.map((item: any) => (
 <div key={item.id} className="text-gray-500 hover:text-white transition-colors cursor-none" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
 <span className="text-xs uppercase tracking-widest block mb-1">{item.title}</span>
 </div>
 ))}
 </div>
 </div>

 {/* Soyut 3D / SVG Şekilleri Arkaplan (Statik Gösterim) */}
 <div className="absolute top-0 right-0 w-full md:w-[70%] h-full opacity-60">
 <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full stroke-gray-800 stroke-[0.1] fill-transparent">
 <motion.path 
 d="M 10,10 L 90,10 L 90,90 L 10,90 Z" 
 initial={{ pathLength: 0 }}
 animate={{ pathLength: 1 }}
 transition={{ duration: 3, ease: 'easeInOut' as const }}
 />
 <motion.path 
 d="M 30,30 L 110,30 L 110,110 L 30,110 Z" 
 initial={{ pathLength: 0 }}
 animate={{ pathLength: 1 }}
 transition={{ delay: 1, duration: 3, ease: 'easeInOut' as const }}
 className="stroke-gray-500"
 />
 <path d="M 10,10 L 30,30 M 90,10 L 110,30 M 90,90 L 110,110 M 10,90 L 30,110" className="stroke-gray-700" />
 </svg>
 </div>
 
 {/* Aşağı Kaydır Oku */}
 <div className="absolute bottom-10 right-20 flex items-center gap-4 rotate-90 origin-right">
 <span className="text-[10px] tracking-[0.3em] text-gray-400 uppercase">Scroll to Explore</span>
 <div className="w-16 h-[1px] bg-gradient-to-r from-gray-800 to-white"></div>
 </div>
 </section>
 )
}

export function InsaatEliteMap() {
 // Elite Tier'a özel İnteraktif SVG Harita (Vaziyet Planı Simülasyonu)
 const [activeArea, setActiveArea] = useState<string | null>(null)
 
 const areas = [
 { id: 'v1', d: "M 20,40 L 40,30 L 50,50 L 30,60 Z", title: "Kule A", desc: "Ticari Ofisler & Genel Merkez" },
 { id: 'v2', d: "M 55,20 L 75,10 L 85,30 L 65,40 Z", title: "Kule B", desc: "Premium Rezidanslar" },
 { id: 'v3', d: "M 45,60 L 65,50 L 90,80 L 70,90 Z", title: "Sosyal Tesis", desc: "Havuz, Spa ve Spor Merkezi" },
 { id: 'v4', d: "M 10,70 L 25,60 L 40,80 L 20,95 Z", title: "Peyzaj", desc: "Botaniki Park ve Yürüyüş Yolu" }
 ]

 return (
 <section className="relative w-full h-screen bg-[#050505] font-inter overflow-hidden cursor-none pt-24 border-t border-gray-900">
 <div className="container mx-auto px-6 h-full flex flex-col md:flex-row items-center">
 
 {/* Sol Panel: Bilgi */}
 <div className="w-full md:w-1/3 mb-10 md:mb-0 z-20">
 <div className="text-gray-500 tracking-[0.2em] text-xs uppercase mb-8">Masterplan</div>
 <AnimatePresence mode="wait">
 {activeArea ? (
 <motion.div 
 key={activeArea}
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: 20 }}
 className="bg-gray-900/50 backdrop-blur-md border border-gray-800 p-8 rounded-xl"
 >
 <div className="w-8 h-1 bg-white mb-6"></div>
 <h3 className="font-syne text-3xl text-white mb-4">
 {areas.find(a => a.id === activeArea)?.title}
 </h3>
 <p className="text-gray-400 text-sm leading-relaxed">
 {areas.find(a => a.id === activeArea)?.desc}
 </p>
 <button className="mt-8 text-xs text-white uppercase tracking-widest border-b border-gray-600 pb-1 hover:border-white transition-colors">
 Planları İncele
 </button>
 </motion.div>
 ) : (
 <motion.div 
 key="empty"
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 className="text-gray-600 text-sm italic"
 >
 Vaziyet planı üzerindeki bölgelerin üstüne gelerek detayları inceleyebilirsiniz.
 </motion.div>
 )}
 </AnimatePresence>
 </div>

 {/* Sağ Panel: Etkileşimli SVG Harita (İzometrik Görünüm) */}
 <div className="w-full md:w-2/3 h-full relative z-10 flex items-center justify-center">
 <svg viewBox="0 0 100 100" className="w-[120%] h-[120%] overflow-visible filter drop-shadow-[0_0_20px_rgba(255,255,255,0.05)]">
 {/* Grid Zemin */}
 <path d="M 0,50 L 50,25 L 100,50 L 50,75 Z" fill="#0a0a0a" stroke="#1f2937" strokeWidth="0.2" />
 <path d="M 10,55 L 50,35 L 90,55 M 20,60 L 50,45 L 80,60" stroke="#1f2937" strokeWidth="0.1" fill="none" />
 
 {/* Tıklanabilir Poligonlar */}
 {areas.map((area) => (
 <motion.g 
 key={area.id}
 onMouseEnter={() => setActiveArea(area.id)}
 onMouseLeave={() => setActiveArea(null)}
 className="cursor-none"
 animate={{
 y: activeArea === area.id ? -2 : 0,
 filter: activeArea === area.id ? 'drop-shadow(0 10px 10px rgba(255,255,255,0.1))' : 'drop-shadow(0 0px 0px rgba(0,0,0,0))'
 }}
 >
 <path 
 d={area.d} 
 fill={activeArea === area.id ? '#ffffff' : '#111111'} 
 fillOpacity={activeArea === area.id ? 1 : 0.8}
 stroke={activeArea === area.id ? '#ffffff' : '#333333'} 
 strokeWidth="0.5" 
 className="transition-colors duration-500"
 />
 
 {/* Sahte 3D Derinlik Efekti (Kenarlar) */}
 {activeArea === area.id && (
 <path 
 d={`${area.d.split(' L ')[0]} L ${area.d.split(' L ')[1]} L ${area.d.split(' L ')[1].split(',')[0]},${parseInt(area.d.split(' L ')[1].split(',')[1]) + 5} L ${area.d.split(' L ')[0].split(' M ')[1].split(',')[0]},${parseInt(area.d.split(' L ')[0].split(' M ')[1].split(',')[1]) + 5} Z`} 
 fill="#cccccc" 
 />
 )}
 </motion.g>
 ))}
 </svg>
 </div>
 
 </div>
 </section>
 )
}

export function InsaatEliteContact({ state }: { state: DefaultThemeState }) {
 return (
 <section className="bg-black py-32 px-6 font-syne border-t border-white/5 cursor-none">
 <div className="container mx-auto text-center max-w-4xl">
 <h2 className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 mb-10">
 Geleceği İnşa Etmek İçin<br/>İletişime Geçin.
 </h2>
 <a href={`mailto:${state.contact.email}`} className="text-lg md:text-2xl text-gray-400 hover:text-white transition-colors border-b border-gray-800 pb-2 inline-block">
 {state.contact.email}
 </a>
 </div>
 </section>
 )
}
