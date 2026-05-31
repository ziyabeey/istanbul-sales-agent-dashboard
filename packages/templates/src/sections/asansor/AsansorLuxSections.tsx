// @ts-nocheck
'use client'
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Phone, MapPin, Clock, Star, Play, Fingerprint, Cpu, ShieldCheck, ArrowRight, ArrowDown } from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'

const slideUp = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } }
}
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
}

export function AsansorLuxHEADERGlassmorphism({ business }: SectionProps<any>) {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 1.2, ease: "easeOut" as any }}
      className="fixed top-0 w-full z-[100] bg-black/20 backdrop-blur-3xl border-b border-white/[0.03]" 
      style={{ color: 'var(--color-text)' }}
    >
      <div className="max-w-[1800px] mx-auto px-8 lg:px-12 h-24 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="font-heading font-light text-2xl tracking-[0.4em] uppercase text-white flex items-center">
            {business.name} <span className="w-2 h-2 rounded-full bg-white ml-6"></span>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-12 text-xs tracking-[0.2em] font-medium text-white/50 uppercase">
          <a href="#hizmetler" className="hover:text-white transition-colors">Koleksiyon</a>
          <a href="#hakkimizda" className="hover:text-white transition-colors">Manifesto</a>
          <a href="#iletisim" className="hover:text-white transition-colors">Concierge</a>
        </div>
        <a href="#iletisim" className="hidden md:flex group relative overflow-hidden bg-white text-black px-10 py-5 font-bold text-xs tracking-[0.3em] uppercase transition-all">
          <span className="relative z-10">Özel Keşif</span>
          <div className="absolute inset-0 z-0 h-full w-full bg-black/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
        </a>
      </div>
    </motion.header>
  )
}

export function AsansorLuxHEROCinematicVideoPlaceholderParallax({ business }: SectionProps<any>) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <section ref={ref} className="relative h-screen flex flex-col justify-end pb-20 overflow-hidden bg-[#0A0A0A]" style={{ color: 'var(--color-text)' }}>
      {/* Cinematic Background */}
      <motion.div style={{ y, opacity, scale }} className="absolute inset-0 z-0 border-b border-white/[0.05]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-black/20 z-10 mix-blend-overlay pointer-events-none"></div>
        <img src="https://images.unsplash.com/photo-1621503794357-19d2fe3c1cb5?auto=format&fit=crop&q=80" alt="Lüks Asansör" className="w-full h-[120%] object-cover object-center grayscale opacity-60" />
      </motion.div>
      
      {/* Central Interactive Play Button */}
      <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1, duration: 1.5, type: "spring" as const }} className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
         <button className="w-32 h-32 rounded-full border border-white/10 backdrop-blur-2xl bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:scale-110 hover:border-white/30 transition-all duration-700 pointer-events-auto group">
           <Play className="w-8 h-8 ml-2 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
         </button>
      </motion.div>

      <div className="relative z-30 max-w-[1800px] mx-auto px-8 lg:px-12 w-full">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-5xl flex flex-col items-start">
          <motion.div variants={slideUp} className="tracking-[0.4em] text-xs font-light mb-10 text-white/50 uppercase border-l border-white/30 pl-6 py-1">
            BespoKe Engineering
          </motion.div>
          <motion.h1 variants={slideUp} className="font-heading text-6xl md:text-[6rem] lg:text-[8rem] font-light leading-[0.9] tracking-tighter mb-12 text-white">
            <span className="font-serif italic text-white/40 pr-8">Dikeyde</span><br/>
            Kusursuz<br/>Hareket.
          </motion.h1>
          <motion.p variants={slideUp} className="text-xl md:text-3xl text-white/40 font-light max-w-3xl leading-relaxed">
            VIP konutlar ve yalılar için fısıltı sessizliğinde çalışan ultra lüks, kişiselleştirilmiş asansör sistemleri.
          </motion.p>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 2 }} className="absolute bottom-12 right-12 z-30 text-white/30 flex flex-col items-center gap-4 hidden md:flex">
        <span className="text-[10px] tracking-[0.3em] uppercase origin-left rotate-90 translate-x-3">Scroll</span>
        <div className="w-[1px] h-24 bg-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white/80 animate-[slideDown_2s_infinite]"></div>
        </div>
      </motion.div>
    </section>
  )
}

export function AsansorLuxEXPERTISEGlassCards({ business }: SectionProps<any>) {
  return (
    <section className="py-8 relative z-40 -mt-16 bg-transparent" style={{ color: 'var(--color-text)' }}>
      <div className="max-w-[1800px] mx-auto px-8 lg:px-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <Fingerprint strokeWidth={1}/>, title: 'İmza Tasarım', desc: 'Tamamen size ve mekanınıza özel terzi işi kabin mimarisi.' },
            { icon: <Cpu strokeWidth={1}/>, title: 'Sessiz Teknoloji', desc: 'Sarsıntısız kalkış-duruş ve motor gürültüsünü yok eden yalıtım.' },
            { icon: <ShieldCheck strokeWidth={1}/>, title: 'Zırhlı Güvenlik', desc: 'Uluslararası standartlarda mekanik ve elektronik koruma.' }
          ].map((feature, i) => (
            <motion.div key={i} variants={slideUp} className="bg-[#0f0f0f]/80 backdrop-blur-3xl border border-white/[0.05] p-12 lg:p-16 hover:bg-white/[0.02] transition-colors duration-700 group cursor-default">
              <div className="mb-10 w-16 h-16 flex items-center justify-center text-white/30 group-hover:text-white transition-colors duration-700 group-hover:scale-110 transform">
                {feature.icon}
              </div>
              <h3 className="font-heading text-3xl font-light tracking-wide mb-6 text-white">{feature.title}</h3>
              <p className="text-white/40 leading-relaxed font-light text-lg">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export function AsansorLuxHIZMETLERLargeImageCards({ business }: SectionProps<any>) {
  return (
    <section id="hizmetler" className="py-40 px-8 lg:px-12 bg-[#0A0A0A] relative" style={{ color: 'var(--color-text)' }}>
      {/* Huge Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.02]">
        <h2 className="font-heading text-[25vw] font-black uppercase whitespace-nowrap leading-none tracking-tighter">KOLEKSİYON</h2>
      </div>

      <div className="max-w-[1800px] mx-auto relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideUp} className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-12 border-b border-white/[0.05] pb-20">
          <h2 className="font-heading text-6xl md:text-8xl font-light tracking-tighter leading-[0.9] text-white">
            Bespoke<br/><span className="italic font-serif text-white/40">Koleksiyonu.</span>
          </h2>
          <p className="text-2xl text-white/40 max-w-xl font-light leading-relaxed">Mühendisliğin zirvesini temsil eden, dünyanın en seçkin materyalleriyle bezenmiş seriler.</p>
        </motion.div>
        
        <div className="space-y-40">
          {business.services?.map((service: any, idx: number) => (
            <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="group relative grid lg:grid-cols-12 gap-16 items-center">
              <motion.div variants={slideUp} className={`lg:col-span-7 ${idx % 2 !== 0 ? 'lg:order-last' : ''} w-full h-[600px] lg:h-[800px] overflow-hidden relative border border-white/5`}>
                <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/10 transition-colors duration-1000 ease-out"></div>
                <img src="https://images.unsplash.com/photo-1541888004659-40da8209ad73?auto=format&fit=crop&q=80" alt={service.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-[2s] ease-out origin-center" />
              </motion.div>
              
              <motion.div variants={slideUp} className="lg:col-span-5 flex flex-col lg:px-12">
                <div className="text-xs uppercase tracking-[0.4em] font-medium text-white/30 mb-8 border-l border-white/20 pl-4 py-1">0{idx + 1} // MODEL</div>
                <h3 className="font-heading font-light text-5xl md:text-7xl mb-10 text-white tracking-tight">{service.name}</h3>
                <p className="text-white/50 text-xl font-light leading-relaxed mb-16 max-w-xl">{service.description || 'İtalyan mermeri, el işçiliği derin detaylar ve pürüzsüz paslanmaz panellerin muazzam birleşimi.'}</p>
                <div className="flex">
                  <a href="#iletisim" className="group/btn inline-flex items-center gap-6 text-sm font-light tracking-[0.3em] uppercase text-white hover:text-white/70 transition-colors">
                    <span>Teknik İnceleme</span>
                    <span className="w-12 h-[1px] bg-white group-hover/btn:w-24 transition-all duration-700 ease-out"></span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function AsansorLuxHAKKIMIZDAMinimalistElegant({ business }: SectionProps<any>) {
  return (
    <section id="hakkimizda" className="py-40 px-8 lg:px-12 bg-[#050505] border-y border-white/[0.02]" style={{ color: 'var(--color-text)' }}>
      <div className="max-w-[1400px] mx-auto text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col items-center">
          <motion.div variants={slideUp} className="w-px h-32 bg-gradient-to-b from-transparent to-white/20 mb-16"></motion.div>
          <motion.h2 variants={slideUp} className="font-heading text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter mb-16 text-white leading-[0.9]">
            <span className="font-serif italic text-white/40">Felsefe.</span>
          </motion.h2>
          <motion.p variants={slideUp} className="text-2xl md:text-4xl text-white/80 font-light leading-relaxed max-w-4xl mx-auto mb-12">
            "Bizler asansör üretmiyoruz. Yaşam alanlarına entegre olan, mekanın ruhunu yücelten pürüzsüz kinetik heykeller yaratıyoruz."
          </motion.p>
          <motion.p variants={slideUp} className="text-xl text-white/40 font-light max-w-2xl mx-auto leading-relaxed">
            {business.name}, 20 yılı aşkın süredir en prestijli konut ve yalı projelerinde, dünyanın sayılı mimarlarıyla omuz omuza çalışarak dikey hareketi bir sanat formuna dönüştürüyor.
          </motion.p>
          <motion.div variants={slideUp} className="w-px h-32 bg-gradient-to-t from-transparent to-white/20 mt-24"></motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export function AsansorLuxILETISIMDarkElegantFormInfo({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-40 px-8 lg:px-12 bg-[#0A0A0A]" style={{ color: 'var(--color-text)' }}>
      <div className="max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 lg:gap-40 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col">
            <motion.div variants={slideUp} className="tracking-[0.4em] text-xs font-light mb-10 uppercase text-white/30 border-l border-white/20 pl-4 py-1">Exclusive Invitation</motion.div>
            <motion.h2 variants={slideUp} className="font-heading text-6xl lg:text-[7rem] font-light tracking-tighter mb-20 text-white leading-none">VIP<span className="font-serif italic text-white/40">Kabul.</span></motion.h2>
            
            <motion.div variants={slideUp} className="space-y-16">
              <div className="group cursor-pointer">
                <div className="text-xs font-medium tracking-[0.3em] text-white/30 mb-4 uppercase">Direksiyon Hattı</div>
                <a href={`tel:${business.phoneClean}`} className="text-4xl lg:text-5xl font-light text-white group-hover:text-white/60 transition-colors">{business.phone}</a>
              </div>
              
              <div className="grid grid-cols-2 gap-12 border-t border-white/[0.05] pt-16">
                <div>
                  <div className="text-xs font-medium tracking-[0.3em] text-white/30 mb-4 uppercase">Showroom</div>
                  <div className="text-lg text-white/60 font-light leading-relaxed">{business.address}<br/>{business.district}, {business.city}</div>
                </div>
                <div>
                  <div className="text-xs font-medium tracking-[0.3em] text-white/30 mb-4 uppercase">Protokol</div>
                  <div className="text-lg text-white/60 font-light leading-relaxed">Yalnızca özel randevu onayı ile ziyaret sağlanmaktadır.</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideUp}>
            <form className="bg-[#0f0f0f] border border-white/[0.05] p-12 lg:p-20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <h3 className="text-4xl font-light mb-16 text-white tracking-tight">Özel Görüşme Talebi</h3>
              <div className="space-y-14">
                <div className="relative group">
                  <input type="text" id="name" className="w-full bg-transparent border-b border-white/10 pb-4 text-white font-light focus:outline-none focus:border-white/50 transition-colors peer placeholder-transparent text-lg" placeholder="İsim" />
                  <label htmlFor="name" className="absolute left-0 top-0 text-white/30 text-sm tracking-widest transition-all peer-placeholder-shown:top-0 peer-placeholder-shown:text-lg peer-focus:-top-8 peer-focus:text-xs peer-focus:text-white/60 uppercase">Adınız Soyadınız / Firma</label>
                </div>
                <div className="relative group">
                  <input type="tel" id="contact" className="w-full bg-transparent border-b border-white/10 pb-4 text-white font-light focus:outline-none focus:border-white/50 transition-colors peer placeholder-transparent text-lg" placeholder="İletişim" />
                  <label htmlFor="contact" className="absolute left-0 top-0 text-white/30 text-sm tracking-widest transition-all peer-placeholder-shown:top-0 peer-placeholder-shown:text-lg peer-focus:-top-8 peer-focus:text-xs peer-focus:text-white/60 uppercase">İletişim Numarası</label>
                </div>
                <button type="button" className="w-full bg-white text-black py-8 font-bold tracking-[0.3em] uppercase text-xs hover:bg-white/80 transition-all mt-8">
                  Talebi İlet
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function AsansorLuxFOOTER({ business }: SectionProps<any>) {
  return (
    <footer className="py-24 px-8 lg:px-12 bg-[#050505] border-t border-white/[0.05] text-[10px] tracking-[0.3em] uppercase text-white/30 font-light" style={{ color: 'var(--color-text)' }}>
      <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="font-heading text-3xl font-light tracking-[0.4em] text-white/50">{business.name}</div>
        <div className="flex gap-12 border-x border-white/10 px-12 py-2">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Legal</a>
          <a href="#" className="hover:text-white transition-colors">Press</a>
        </div>
        <div>EST. {new Date().getFullYear()} — BESPOKE ELEVATORS</div>
      </div>
    </footer>
  )
}

registerSection('hero', 'asansorlux_hero_0', AsansorLuxHEADERGlassmorphism)
registerSection('hero', 'asansorlux_hero_1', AsansorLuxHEROCinematicVideoPlaceholderParallax)
registerSection('services', 'asansorlux_services_2', AsansorLuxEXPERTISEGlassCards)
registerSection('services', 'asansorlux_services_3', AsansorLuxHIZMETLERLargeImageCards)
registerSection('services', 'asansorlux_services_4', AsansorLuxHAKKIMIZDAMinimalistElegant)
registerSection('services', 'asansorlux_services_5', AsansorLuxILETISIMDarkElegantFormInfo)
registerSection('footer', 'asansorlux_footer_6', AsansorLuxFOOTER)
