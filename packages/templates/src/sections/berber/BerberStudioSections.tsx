'use client'

import React, { ComponentType, useState, useRef, useEffect } from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'
import { motion, useSpring, useScroll, useTransform, useInView, useVelocity, useAnimationFrame, animate } from 'framer-motion'
import { Scissors, Star, Play, Crown, PenTool, Palette, ArrowRight, Instagram, MapPin } from 'lucide-react'

/* ═══════════════════════════════════════════
   BERBER STUDIO LUXE — MASTERPIECE (THEME 002 V3)
   Sektor: berber | Konsept: Pitch Black, Scroll Revolution, Fluid Typography
   ═══════════════════════════════════════════ */

// ── UTILITIES ──

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

// 1. Magnetic Button physics wrapper
const MagneticButton = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
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

// 2. Velocity Marquee (Scroll Speed Sensitive)
const VelocityMarquee = ({ text, baseVelocity = 2 }: { text: string, baseVelocity?: number }) => {
  const baseX = useSpring(0, { stiffness: 50, damping: 20 });
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy * 50);
  });

  return (
    <div className="relative w-full overflow-hidden bg-zinc-950 border-y border-zinc-900 py-4 md:py-6 flex items-center m-0">
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i} className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-zinc-600 px-4 md:px-8">
            {text} •
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// 3. Animated Counter (Counting up when in view)
const AnimatedCounter = ({ value, duration = 2 }: { value: number, duration?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration,
        ease: "easeOut" as any,
        onUpdate(v) { setCount(Math.round(v)); }
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

// 4. Scroll Reveal Text (Word by Word)
const RevealText = ({ text, className = '' }: { text: string, className?: string }) => {
  const words = text.split(" ");
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 }
    }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, damping: 12, stiffness: 100 } }
  };

  return (
    <motion.p variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }} className={`flex flex-wrap gap-x-2 gap-y-1 ${className}`}>
      {words.map((word, i) => (
        <motion.span key={i} variants={item} className="inline-block relative overflow-hidden">
          {word}
        </motion.span>
      ))}
    </motion.p>
  )
}

// ── 1. Hero ──
export function BerberStudioHero({ business, content }: SectionProps<any>) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] })
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 300])

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#050505] text-white flex flex-col justify-center overflow-hidden pt-20 pb-10 lg:py-0">
      
      {/* Blade Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[1]" 
           style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-10 h-full">
        
        {/* Typographic Left Area */}
        <div className="w-full lg:col-span-7 relative z-20 mix-blend-difference mt-8 lg:mt-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-6 lg:mb-8">
            <span className="px-4 py-2 border border-zinc-800 text-[10px] md:text-xs uppercase font-mono tracking-[0.3em] text-zinc-400 backdrop-blur-md">
              {content?.badge || 'Sıradanlığı Kesip Atın'}
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
            className="text-[clamp(3rem,8vw,8rem)] font-bold uppercase tracking-tighter leading-[0.85] text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {content?.title || business.name}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
            className="text-[clamp(1rem,2vw,1.5rem)] text-zinc-400 font-light mt-8 md:mt-10 max-w-xl leading-relaxed border-l-2 border-zinc-800 pl-6 py-2"
          >
            {content?.subtitle || business.slogan || 'Sokak kültüründen beslenen stüdyomuzda, erkeğin vizyonunu yeniden tanımlıyoruz. Tamamen size özel kesim seansları.'}
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6">
            <MagneticButton className="w-full sm:w-auto">
              <a href={(content?.cta1 as any)?.href || '#iletisim'} className="group flex items-center justify-center sm:justify-start gap-4 bg-white text-black px-10 md:px-12 py-4 md:py-5 text-xs md:text-sm font-bold tracking-[0.2em] uppercase hover:bg-zinc-200 transition-all rounded-none w-full cursor-pointer">
                <span>{(content?.cta1 as any)?.text || 'RANDEVU AL'}</span>
                <span className="block w-2 h-2 rounded-full bg-black group-hover:scale-[2] transition-transform duration-300" />
              </a>
            </MagneticButton>
            
            <button className="group flex items-center justify-center gap-4 px-6 md:px-8 py-4 md:py-5 bg-transparent border border-zinc-800 text-white text-xs md:text-sm font-medium tracking-widest uppercase hover:border-zinc-500 transition-colors cursor-pointer w-full sm:w-auto">
              <Play className="w-4 h-4 group-hover:text-[var(--color-accent)] transition-colors" />
              <span>Tanıtım</span>
            </button>
          </motion.div>
        </div>

        {/* The "Blade" Image Right Area / Mobile Top Image */}
        <div className="w-full h-[45vh] lg:h-[80vh] lg:col-span-5 relative mt-4 lg:mt-0">
          <motion.div 
            style={{ y: typeof window !== 'undefined' && window.innerWidth >= 1024 ? yImage : 0 }}
            className="w-full h-full relative group"
          >
             {/* Blade Clip Path Image (Responsive: Full on mobile, Blade on Desktop) */}
             <div className="absolute inset-0 z-10 overflow-hidden bg-zinc-900 border border-zinc-800 [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] lg:[clip-path:polygon(0_0,100%_0,100%_90%,80%_100%,0_100%)] transition-all duration-1000">
               <img 
                 src={business?.photos?.[0] || "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=90"} 
                 alt="Barber Studio" 
                 className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:scale-110 hover:opacity-100 transition-all duration-[1.5s]"
               />
               {/* Mobile darkening overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40 opacity-80 lg:opacity-100 pointer-events-none" />
             </div>
             
             {/* Architectural Overlays */}
             <div className="absolute left-6 lg:-left-12 bottom-6 lg:bottom-24 z-20 bg-black border border-zinc-800 p-4 md:p-6 shadow-2xl backdrop-blur-md">
                 <div className="text-[9px] md:text-[10px] text-zinc-500 font-mono mb-1 md:mb-2 tracking-[0.2em] uppercase">LOKASYON</div>
                 <div className="text-lg md:text-2xl text-white font-medium uppercase">{business.city || 'BEŞİKTAŞ'} / {(business.state as string) || 'TR'}</div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
registerSection('hero', 'berber_studio_hero', BerberStudioHero as unknown as ComponentType<SectionProps<Record<string, unknown>>>)


// ── 2. About (Studio Philosophy) ──
export function BerberStudioAbout({ business, content }: SectionProps<any>) {
  return (
    <section className="bg-[#09090b] relative">
      <VelocityMarquee text="PRECISION CUTS • SIGNATURE STYLING • STUDIO ACADEMY • BEARD SCULPTING • HOT TOWEL SHAVES • GENTLEMEN QUALITY" />
      
      <div className="py-24 md:py-40 px-6 md:px-12 max-w-[1400px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-4 mb-8">
              <div className="w-1.5 h-1.5 bg-[var(--color-accent)] md:w-2 md:h-2" />
              <span className="text-zinc-500 text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase">Kültür Gelişimi</span>
              <div className="h-px w-12 md:flex-1 bg-zinc-800" />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
              className="text-[clamp(2.5rem,5vw,5rem)] font-bold text-white uppercase tracking-tighter leading-[0.9] mb-8 md:mb-12" 
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {content?.title || 'SAÇ SANATININ MERKEZİ'}
            </motion.h2>
            
            {/* STAGGERED REVEAL TEXT */}
            <RevealText 
              text={content?.description || `${(business.foundedYear || 2020)} yılından bu yana metropol erkeğinin tarzını kurguluyoruz. Berberin ötesinde; bir akademi, bir sanat atölyesi ve kalabalık şehirden bir kaçış noktası. Klişelere değil, kişiliğinize uygun orantılar tasarlıyoruz.`} 
              className="text-[clamp(1rem,1.5vw,1.25rem)] text-zinc-400 font-light mb-10 md:mb-12 border-l border-zinc-800 pl-6 leading-relaxed"
            />
            
            <motion.a initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} href="#akademi" className="group inline-flex items-center gap-4 text-white text-xs md:text-sm font-medium tracking-[0.2em] uppercase hover:text-zinc-400 transition-colors">
              <span className="border-b border-white group-hover:border-zinc-400 pb-1 transition-colors">Akademimizi Keşfedin</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
            </motion.a>
          </div>
          
          <div className="relative group w-full max-w-[500px] mx-auto lg:ml-auto">
            {/* Split B&W Hover Reveal Block */}
            <motion.div initial={{ scale: 0.9, opacity: 0, rotate: -2 }} whileInView={{ scale: 1, opacity: 1, rotate: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 1, type: 'spring' as const }} className="aspect-[4/5] bg-zinc-900 overflow-hidden relative cursor-crosshair">
              <img 
                src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=90" 
                alt="Studio 1" 
                className="w-full h-full object-cover grayscale contrast-125 filter group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] ease-in-out" 
              />
              <div className="absolute inset-0 box-shadow-[inset_0_0_100px_rgba(0,0,0,1)] opacity-50 pointer-events-none" />
            </motion.div>
            {/* Small floating block (Parallax up slightly) */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-12 w-32 md:w-48 aspect-square bg-black border border-zinc-900 border-l-0 overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1621648028088-ea17a949e2eb?auto=format&fit=crop&q=80" 
                alt="Studio 2" 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000" 
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
registerSection('about', 'berber_studio_about', BerberStudioAbout as unknown as ComponentType<SectionProps<Record<string, unknown>>>)


// ── 3. Stats (Animated Counters) ──
export function BerberStudioStats({ business }: SectionProps<any>) {
  const stats = [
    { num: 5, suffix: "", label: "Aktif Şube" },
    { num: new Date().getFullYear() - (business.foundedYear || 2020), suffix: "", label: "Yıllık Deneyim" },
    { num: 20, suffix: "+", label: "Uzman Kadro" },
    { num: 15, suffix: "k+", label: "Sadık Müşteri" },
  ];

  return (
    <section className="bg-zinc-950 py-1 border-y border-zinc-900">
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-zinc-900 text-center">
        {stats.map((s, i) => (
           <div key={i} className="py-16 md:py-24 group hover:bg-black transition-colors cursor-default">
             <div className="text-4xl md:text-5xl lg:text-7xl font-light text-white mb-2 md:mb-4 group-hover:text-[var(--color-accent)] transition-colors flex justify-center items-center" style={{ fontFamily: 'var(--font-heading)' }}>
               {/* Animated Counter Logic */}
               <AnimatedCounter value={s.num} duration={1.5 + (i * 0.2)} />
               {s.suffix && <span>{s.suffix}</span>}
             </div>
             <div className="text-[9px] md:text-[11px] text-zinc-500 tracking-[0.3em] lg:tracking-[0.4em] uppercase font-mono">{s.label}</div>
           </div>
        ))}
      </div>
    </section>
  )
}
registerSection('stats', 'berber_studio_stats', BerberStudioStats as unknown as ComponentType<SectionProps<Record<string, unknown>>>)


// ── 4. Gallery (The Lookbook) ──
export function BerberStudioGallery({ content }: SectionProps<any>) {
  const images = [
    "https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?auto=format&fit=crop&q=90",
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=90",
    "https://images.unsplash.com/photo-1534778356534-d3d45b6db1da?auto=format&fit=crop&q=90"
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring' as const, damping: 20, stiffness: 100 } }
  };

  return (
    <section className="py-24 md:py-32 bg-[#050505] relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-bold text-white uppercase tracking-tighter leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
              {content?.title || 'LOOKBOOK KESİTLERİ'}
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-4 text-zinc-500 text-xs md:text-sm border border-zinc-800 px-6 py-3 rounded-full uppercase tracking-widest cursor-pointer hover:bg-zinc-900 transition-colors w-full md:w-auto justify-center">
            <Instagram className="w-4 h-4" /> Tümünü İncele
          </motion.div>
        </div>
        
        <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-1">
          {images.map((img, i) => (
            <motion.div variants={itemVariants} key={i} className="aspect-[4/5] md:aspect-[3/4] bg-zinc-900 overflow-hidden relative group cursor-pointer border border-zinc-900">
               <img 
                 src={img} 
                 alt="Cut Look" 
                 className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 md:opacity-60 md:group-hover:opacity-80 transition-opacity" />
               <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 flex justify-between items-end opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                  <div className="text-white text-[10px] md:text-xs tracking-widest uppercase font-mono bg-black/50 px-3 py-1 rounded backdrop-blur-md">Style 0{i+1}</div>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/50 flex items-center justify-center bg-transparent backdrop-blur-md">
                     <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-white -rotate-45" />
                  </div>
               </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
registerSection('gallery', 'berber_studio_gallery', BerberStudioGallery as unknown as ComponentType<SectionProps<Record<string, unknown>>>)


// ── 5. Services (Staggered Paths) ──
export function BerberStudioPaths({ business, content }: SectionProps<any>) {
  const defaultServices = [
    { name: "Signature Haircut", description: "Klasik ve modern tekniklerin harmanlandığı vizyoner saç kesimi.", icon: "scissors" },
    { name: "Beard Sculpting", description: "Sıcak havlu tıraşı ve bıçakla şekil verme.", icon: "crown" },
    { name: "Color & Touchup", description: "Siyah maske, keratin botox ve saç/sakal renklendirme.", icon: "palette" }
  ];
  
  const hizmetler = business.services?.length ? business.services.filter(s => typeof s !== 'string') : defaultServices;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 25, stiffness: 120 } }
  };

  return (
    <section className="py-24 md:py-32 bg-[#09090b] border-t border-zinc-900 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[clamp(2.5rem,4vw,4rem)] font-bold text-white uppercase tracking-tighter mb-16 md:mb-20 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
          {content?.title || 'SEANS HİZMETLERİ'}
        </motion.h2>

        <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px" }} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {hizmetler.slice(0, 3).map((h, i) => {
            const Icon = h.icon === 'scissors' ? Scissors : h.icon === 'palette' ? Palette : h.icon === 'crown' ? Crown : h.icon === 'pen-tool' ? PenTool : Star;
            return (
              <motion.div variants={itemVariants} key={i} className="group p-8 md:p-12 bg-black border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-950 transition-all duration-500 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[var(--color-accent)] mb-8 md:mb-12 transition-transform group-hover:-translate-y-2 group-hover:scale-110 duration-500 rounded-full">
                  <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 uppercase tracking-wide">
                    {h.name}
                  </h3>
                  {h.description && (
                    <p className="text-zinc-500 text-xs md:text-sm font-light leading-relaxed max-w-sm">
                      {h.description}
                    </p>
                  )}
                </div>
                <div className="absolute top-8 right-8 md:top-10 md:right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <ArrowRight className="w-5 h-5 text-zinc-600 -rotate-45" />
                </div>
                
                {/* Decorative background glow */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-50" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
registerSection('services', 'berber_studio_paths', BerberStudioPaths as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 6. Team ──
export function BerberStudioTeam({ content, business }: SectionProps<any>) {
  const team = business.team || [
    { name: "Alex K.", role: "Master Barber", image: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&q=80" },
    { name: "David M.", role: "Colorist", image: "https://images.unsplash.com/photo-1594951468160-b6059d48b111?auto=format&fit=crop&q=80" }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#050505]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <motion.h2 initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-[clamp(2.5rem,4vw,4rem)] font-bold text-white uppercase tracking-tighter mb-12 md:mb-16" style={{ fontFamily: 'var(--font-heading)' }}>
          {content?.title || 'ARTİSTLER'}
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {team.map((member: any, i: number) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: i * 0.1 }}
              key={i} className="group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden bg-zinc-900 border border-zinc-900 mb-4 md:mb-6 relative">
                 <img src={member.image || "https://images.unsplash.com/photo-1594951468160-b6059d48b111?auto=format&fit=crop&q=80"} alt={member.name} className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-[1s] hover:scale-105" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-widest leading-none">{member.name}</h3>
              <p className="text-zinc-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] mt-2">{member.role || 'Stylist'}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
registerSection('team', 'berber_studio_team', BerberStudioTeam as unknown as ComponentType<SectionProps<Record<string, unknown>>>)

// ── 7. Contact ──
export function BerberStudioContact({ business, content }: SectionProps<any>) {
  return (
    <section className="py-24 md:py-32 bg-[#09090b] border-t border-zinc-900 relative">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
        <div className="order-2 lg:order-1">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[clamp(3rem,6vw,6rem)] font-bold text-white uppercase tracking-tighter leading-none mb-10 md:mb-12" style={{ fontFamily: 'var(--font-heading)' }}>
            {content?.title || 'REZERVASYON.'}
          </motion.h2>
          <div className="space-y-8 md:space-y-10">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: 0.2 }}>
              <div className="text-[10px] md:text-xs text-zinc-500 font-mono tracking-[0.3em] uppercase mb-2 md:mb-3 flex items-center"><MapPin className="w-3 h-3 md:w-4 md:h-4 mr-2"/>STUDIO ADRESİ</div>
              <div className="text-lg md:text-xl text-white font-light">{business.address || 'Besiktas, Istanbul, TR'}</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: 0.3 }}>
              <div className="text-[10px] md:text-xs text-zinc-500 font-mono tracking-[0.3em] uppercase mb-2 md:mb-3 flex items-center"><Play className="w-3 h-3 md:w-4 md:h-4 mr-2"/>İLETİŞİM</div>
              <div className="text-lg md:text-xl text-white font-light">{business.phone || '+90 555 123 45 67'}</div>
            </motion.div>
          </div>
          
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, type: 'spring' as const }} className="mt-12 md:mt-16 inline-block w-full sm:w-auto">
            <MagneticButton className="w-full sm:w-auto">
              <a href={(content?.cta1 as any)?.href || '#'} className="flex w-full sm:inline-flex items-center justify-center gap-4 bg-white text-black px-8 md:px-12 py-4 md:py-6 text-xs md:text-sm font-bold tracking-[0.2em] uppercase hover:bg-zinc-200 transition-all cursor-pointer">
                Randevu Hattı
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </MagneticButton>
          </motion.div>
        </div>
        
        <motion.div initial={{ opacity: 0, filter: 'blur(10px)' }} whileInView={{ opacity: 1, filter: 'blur(0px)' }} viewport={{ once: true }} transition={{ duration: 1 }} className="order-1 lg:order-2 w-full bg-zinc-900 aspect-square md:aspect-video lg:aspect-square relative border border-zinc-800 overflow-hidden group mb-8 lg:mb-0">
             <img 
               src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=90" 
               alt="Map Abstract" 
               className="w-full h-full object-cover filter grayscale opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s] ease-in-out"
             />
             <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent opacity-80 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  )
}
registerSection('contact', 'berber_studio_contact', BerberStudioContact as unknown as ComponentType<SectionProps<Record<string, unknown>>>)
