'use client'

import React, { ComponentType, useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion'
import { ArrowDown, Wrench, ShieldAlert, Cpu, Maximize2, MoveVertical, Activity, ChevronRight, ArrowUpRight } from 'lucide-react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'

/* ═══════════════════════════════════════════
   THEME 001 — APEX LIFT ENGINE (MASTERPIECE v3.0 - ARCHITECTURAL OVERHAUL)
   Clean, pitch black workspace, architectural geometry, reversed HUD logic.
   ═══════════════════════════════════════════ */

// ── UI MICRO-MECHANICS ──

// 1. Magnetic Button physics wrapper
const MagneticButton = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: springX.get(), y: springY.get() }}
      className={`relative inline-block ${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
};

// 2. Mouse Tracking Spotlight utility component (Subtle Version)
const SpotlightWrapper = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
    >
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 will-change-transform"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 500px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.03), transparent 60%)`,
        }}
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};


// ── ENGINE COMPONENTS ──

const ElevatorHUD = () => {
  const { scrollYProgress } = useScroll()
  // FIXED LOGIC: Going [0, 1] maps to [99, 0] so rolling down descends the floor
  const floorNumber = useTransform(scrollYProgress, [0, 1], [99, 0])
  
  const [floor, setFloor] = useState(99)

  useEffect(() => {
    return floorNumber.onChange((latest) => {
      setFloor(Math.round(latest))
    })
  }, [floorNumber])

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-6 hidden md:flex pointer-events-none"
    >
      <div className="text-[10px] font-bold tracking-[0.3em] uppercase writing-vertical-rl rotate-180 text-zinc-500">Rakım (M)</div>
      <div className="w-px h-32 bg-gradient-to-b from-transparent via-zinc-700 to-transparent opacity-50" />
      <div className="px-5 py-6 flex flex-col items-center justify-center font-mono relative overflow-hidden bg-[#09090b] border border-zinc-800 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
        <div className="text-[9px] font-bold tracking-[0.3em] opacity-40 mb-2 text-white">KAT</div>
        <AnimatePresence mode='popLayout'>
          <motion.div
            key={floor}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-4xl font-light leading-none text-white tracking-widest"
          >
            {floor.toString().padStart(2, '0')}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="w-px h-32 bg-gradient-to-b from-transparent via-zinc-700 to-transparent opacity-50" />
      <MoveVertical className="w-5 h-5 text-zinc-500 absolute -bottom-10" />
    </motion.div>
  )
}

export function ApexAsansorHero({ business, content }: SectionProps<any>) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 200])

  const titleText = content?.title || business?.name || 'YILDIZ LİFT';
  const letters = titleText.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.2 } }
  };
  
  const letterVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 120, damping: 14 } }
  };

  return (
    <section className="relative h-screen bg-[#09090b] flex items-center overflow-hidden">
      <ElevatorHUD />

      {/* Abstract Architectural Background (No muddy images) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

      <div className="container relative z-10 px-8 lg:px-16 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full">
        
        {/* Left Side: Typography & Action */}
        <div className="lg:col-span-7 pt-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}
            className="flex items-center gap-4 mb-10"
          >
             <div className="p-3 bg-zinc-900 border border-zinc-800 text-[var(--color-accent)] rounded-sm">
                <Activity className="w-5 h-5" />
             </div>
             <div className="h-px w-12 bg-zinc-800" />
             <span className="text-zinc-500 text-xs font-mono tracking-[0.2em] uppercase">Sistem Devrede</span>
          </motion.div>
          
          <motion.h1 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-[3.5rem] sm:text-[5rem] lg:text-[7.5rem] font-medium uppercase tracking-tight leading-[0.9] text-white flex flex-wrap"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {letters.map((char: string, index: number) => (
              <motion.span key={index} variants={letterVariants} className="inline-block">
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 max-w-xl"
          >
            <p className="text-lg text-zinc-400 font-light leading-relaxed mb-10 border-l border-zinc-800 pl-6 py-2">
              {content?.subtitle || business?.slogan || 'Mimari yapılar için yüksek mühendislik eseri yatay ve dikey taşıma sistemleri. Sessiz, pürüzsüz ve mutlak güvenli.'}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <MagneticButton>
                <div className="px-8 py-5 border border-white text-white text-sm tracking-widest uppercase font-medium hover:bg-white hover:text-black transition-all duration-300 cursor-pointer flex items-center gap-3 group">
                  <span>Operasyon Başlat</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </div>
              </MagneticButton>
              <div className="animate-bounce mt-4 cursor-pointer">
                <ArrowDown className="w-5 h-5 text-zinc-500" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Architectural Floating Image */}
        <div className="hidden lg:block lg:col-span-5 h-[70vh] relative">
          <motion.div 
            style={{ y }}
            className="w-full h-full relative"
          >
             <div className="absolute inset-0 bg-zinc-900 border border-zinc-800 translate-x-4 translate-y-4" />
             <div className="absolute inset-0 z-10 overflow-hidden bg-zinc-800">
               <img 
                 src="https://images.unsplash.com/photo-1541888059039-b9d90ec6113b?auto=format&fit=crop&q=90" 
                 alt="İsviçre Asansör Mimarisi" 
                 className="w-full h-full object-cover filter contrast-125 opacity-90 transition-transform duration-1000 hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent pointer-events-none" />
             </div>
             
             {/* Architectural Overlays */}
             <div className="absolute -left-6 top-20 z-20 bg-[#09090b] border border-zinc-800 p-4 shadow-2xl">
                 <div className="text-[10px] text-zinc-500 font-mono mb-1 tracking-widest">KAPASİTE</div>
                 <div className="text-xl text-white font-medium">10,000 KG</div>
             </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}

export function ApexAsansorAbout({ content }: SectionProps<any>) {
  return (
    <SpotlightWrapper className="py-32 bg-[#09090b] border-t border-zinc-900">
      <div className="container px-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-20 bg-zinc-800" />
              <span className="text-[var(--color-accent)] text-xs font-mono tracking-[0.2em] uppercase">Sistem Mimarisi</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium text-white leading-tight mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || "SIFIR TOLERANS, MUTLAK MÜHENDİSLİK."}
            </h2>
            <p className="text-zinc-400 text-lg font-light leading-relaxed mb-10 max-w-lg">
              {content?.description || "Standart değil, bina DNA'sına en uygun elektromekanik çözümlemeleri tasarlıyoruz. Kilit altında duran hız kontrol cihazlarından sismik dayanıklı kabin gövdelerine kadar her milimetre, güvenlik için işlenir."}
            </p>
            <div className="grid grid-cols-2 gap-8 border-t border-zinc-900 pt-10">
              <div>
                 <div className="text-5xl font-light text-white mb-2">20+</div>
                 <div className="text-xs text-zinc-500 font-mono tracking-widest uppercase">YIL DENEYİM</div>
              </div>
              <div>
                 <div className="text-5xl font-light text-[var(--color-accent)] mb-2">1.5K</div>
                 <div className="text-xs text-zinc-500 font-mono tracking-widest uppercase">AKTİF ŞAFT</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-4 pt-12">
                <div className="bg-zinc-900 aspect-square p-8 border border-zinc-800 flex flex-col justify-end group hover:border-zinc-700 transition-colors">
                   <ShieldAlert className="w-8 h-8 text-zinc-500 mb-auto group-hover:text-white transition-colors" />
                   <div className="text-white font-medium mb-1">Sismik Koruma</div>
                   <div className="text-zinc-500 text-xs">Aktif fren opsiyonu</div>
                </div>
                <div className="bg-[#09090b] aspect-[4/3] p-8 border border-zinc-800 flex flex-col justify-end group hover:border-[var(--color-accent)] transition-colors">
                   <Maximize2 className="w-8 h-8 text-[var(--color-accent)] mb-auto" />
                   <div className="text-white font-medium mb-1">Alan Yönetimi</div>
                   <div className="text-zinc-500 text-xs">Kuyu dip optimizasyonu</div>
                </div>
             </div>
             <div className="space-y-4">
                <div className="bg-[#09090b] aspect-[4/3] p-8 border border-zinc-800 flex flex-col justify-end group hover:border-zinc-700 transition-colors">
                   <Cpu className="w-8 h-8 text-zinc-500 mb-auto group-hover:text-white transition-colors" />
                   <div className="text-white font-medium mb-1">Akıllı Anakart</div>
                   <div className="text-zinc-500 text-xs">Ayrıntılı hata logları</div>
                </div>
                <div className="bg-zinc-900 aspect-square p-8 border border-zinc-800 flex flex-col justify-end group hover:border-zinc-700 transition-colors">
                   <Wrench className="w-8 h-8 text-zinc-500 mb-auto group-hover:text-white transition-colors" />
                   <div className="text-white font-medium mb-1">7/24 Teknik</div>
                   <div className="text-zinc-500 text-xs">Anında reaksiyon</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </SpotlightWrapper>
  )
}

export function ApexAsansorServices({ content, business }: SectionProps<any>) {
  const defaultServices = [
    { title: "İnsan Asansörleri", desc: "Konut ve plazalar için yüksek hızlı, sessiz kabin mimarisi." },
    { title: "Yük Asansörleri", desc: "Fabrikalar için 10.000 KG taşıma kapasiteli endüstriyel şaftlar." },
    { title: "Revizyon & Modernizasyon", desc: "Eski sistemlerin akıllı kartlar ve yeni motorlarla güncellenmesi." },
    { title: "Aylık Periyodik Bakım", desc: "Yasal zorunluluk kapsamında her ay yapılan 42 noktalı güvenlik testi." }
  ];

  const servicesList = business?.products?.length 
    ? business.products.map(p => ({ title: p.name, desc: p.description || 'Profesyonel asansör sistemi.' }))
    : defaultServices;

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Tech Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container relative z-10 px-6 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
           <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-2 h-2 bg-[var(--color-accent)]" />
                 <span className="text-zinc-500 text-xs font-mono tracking-[0.2em] uppercase">Donanım Kategorileri</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-medium text-white leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
                YETKİ ALANLARI
              </h2>
           </div>
           
           <div className="text-zinc-500 text-sm max-w-xs text-right hidden md:block">
             Tüm servis kurulumları EN 81-20/50 Avrupa standartlarında imal edilip test edilmektedir.
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {servicesList.map((service: any, idx: number) => (
            <div 
              key={idx} 
              className="group relative bg-[#09090b] border border-zinc-900 hover:border-zinc-700 p-10 md:p-14 transition-colors duration-500 flex flex-col justify-between min-h-[320px] overflow-hidden cursor-pointer"
            >
              {/* Sweep glow effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(255,255,255,0.05)] to-transparent translate-y-full -translate-x-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-1000 ease-out pointer-events-none" />
              
              <div className="flex justify-between items-start relative z-10">
                 <div className="text-5xl font-light text-zinc-800 transition-colors group-hover:text-zinc-500">{(idx + 1).toString().padStart(2, '0')}</div>
                 <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-black transition-colors" />
                 </div>
              </div>

              <div className="relative z-10 mt-16">
                 <h3 className="text-2xl text-white font-medium mb-4 group-hover:-translate-y-2 transition-transform duration-300">{service.title}</h3>
                 <p className="text-sm text-zinc-500 line-clamp-2 max-w-md group-hover:-translate-y-2 transition-transform duration-300 delay-75">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ApexAsansorContact({ business }: SectionProps<any>) {
  return (
    <section className="bg-[#09090b] py-32 relative text-white border-t border-zinc-900 overflow-hidden">
      <SpotlightWrapper className="absolute inset-0 z-0 pointer-events-none"><></></SpotlightWrapper>
      <div className="container relative z-10 px-6 mx-auto max-w-5xl text-center">
        
        <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-10 rotate-45 pointer-events-none">
           <Activity className="w-6 h-6 text-[var(--color-accent)] -rotate-45" />
        </div>

        <h2 className="text-4xl md:text-7xl font-medium tracking-tight mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
          KONTROLÜ <span className="text-zinc-600">DEVRAL.</span>
        </h2>
        <p className="text-xl text-zinc-500 font-light mb-16 max-w-2xl mx-auto">
          Arıza, kurulum veya keşif. Saha mühendislerimiz koordinatlarınıza yönlendirilmek için hazır bekliyor.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <MagneticButton>
            <a href={`tel:${business?.phone || ''}`} className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 text-sm font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors w-full sm:w-auto">
              Paneli Başlat
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </MagneticButton>
          
          <a href={`https://wa.me/${business?.phone?.replace(/\s+/g, '')}`} className="inline-flex items-center justify-center gap-3 bg-transparent border border-zinc-800 hover:border-zinc-600 text-white px-10 py-5 text-sm font-bold tracking-widest uppercase transition-colors w-full sm:w-auto">
            Sistem Logu Gönder (Mesaj)
          </a>
        </div>
        
        <div className="mt-20 pt-10 border-t border-zinc-900 grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
          <div>
            <div className="text-xs text-zinc-600 font-mono tracking-widest mb-2">MERKEZ ÜSSÜ</div>
            <div className="text-sm text-zinc-300 leading-relaxed font-light">{business?.address || 'OSB Metal İşleri Sanayi Sitesi, 1. Cadde, No: 12\nİstanbul, Türkiye'}</div>
          </div>
          <div>
            <div className="text-xs text-zinc-600 font-mono tracking-widest mb-2">OPERASYON BAĞLANTISI</div>
            <div className="text-sm text-zinc-300 font-light">{business?.phone || '+90 555 123 45 67'}</div>
            <div className="text-sm text-zinc-300 font-light mt-1">{business?.email || 'saha@yildizlift.com'}</div>
          </div>
          <div>
            <div className="text-xs text-zinc-600 font-mono tracking-widest mb-2">DURUM</div>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
               <div className="text-sm text-zinc-300 font-light">Saha Ekipleri Aktif</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── REGISTRY ──

registerSection('hero', 'apex_asansor_hero', ApexAsansorHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('about', 'apex_asansor_about', ApexAsansorAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('services', 'apex_asansor_services', ApexAsansorServices as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
registerSection('contact', 'apex_asansor_contact', ApexAsansorContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
