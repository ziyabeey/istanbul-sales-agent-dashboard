'use client'
// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Sparkles, Phone, Compass, ArrowRight, ShieldCheck, Diamond } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

export function MatbaaLuxHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <header className="fixed w-full top-0 z-50 /80 backdrop-blur-xl border-b border-white/5" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto px-6 h-24 flex items-center justify-between">
 <div className="font-heading text-2xl font-medium tracking-[0.2em] uppercase flex items-center gap-3">
 <Diamond className="w-5 h-5 " /> {businessData.name}
 </div>
 <nav className="hidden md:flex gap-12">
 <a href="#koleksiyonlar" className="text-sm font-medium tracking-[0.1em] text-white/70 hover:text-white transition-colors">KOLEKSİYONLAR</a>
 <a href="#iletisim" className="text-sm font-medium tracking-[0.1em] text-white/70 hover:text-white transition-colors">VIP HİZMET</a>
 </nav>
 </div>
 </header>
 )
}

export function MatbaaLuxHERO({ business }: SectionProps<any>) {
 const businessData = business;
 const { scrollYProgress } = useScroll()
 const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
 return (
 <section className="relative pt-40 pb-32 px-6 overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <motion.div style={{ y }} className="absolute inset-0 -z-10 " />
 <div className="max-w-[1200px] mx-auto text-center relative z-10">
 <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col items-center">
 <Sparkles className="w-10 h-10 mb-8 opacity-80" strokeWidth={1} />
 <div className="text-xs font-semibold tracking-[0.3em] uppercase mb-6 px-4 py-1 border border-[var(--color-accent)]/30 rounded-full">
 Haute Couture Printing
 </div>
 <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.1] tracking-tight mb-8">
 Baskının <br/> <span className="italic font-serif ">En Zarif</span> Hali.
 </h1>
 <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl font-light leading-relaxed">
 Varak yaldız, gofre, lokal lak ve fine-art baskı sistemleriyle kurumsal kimliğinize lüks bir dokunuş.
 </p>
 <a href="#iletisim" className="border border-[var(--color-accent)] px-10 py-4 font-medium tracking-[0.2em] text-sm uppercase hover:opacity-90 hover:text-black transition-all duration-500">
 Koleksiyonu Keşfedin
 </a>
 </motion.div>
 </div>
 </section>
 )
}

export function MatbaaLuxKOLEKSIYONLARHIZMETLER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="koleksiyonlar" className="py-32 px-6 border-t border-white/5 " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[1200px] mx-auto">
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={fadeUp} className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
 <h2 className="font-heading text-4xl md:text-5xl font-normal tracking-wide"><span className="">Premium</span><br/>Baskı Servisleri</h2>
 <p className="text-white/50 max-w-sm text-right font-light leading-relaxed">Yalnızca elit markalara özel, kalite kontrolden geçirilmiş 1. sınıf işçilik.</p>
 </motion.div>
 
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
 {businessData.services?.map((service: any, idx: number) => (
 <motion.div key={service.id || idx} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeUp} className="border border-white/5 p-12 hover:border-[var(--color-accent)]/50 transition-colors duration-500 group flex flex-col justify-between min-h-[400px]">
 <div>
 <div className="w-12 h-12 rounded-full border border-[var(--color-accent)]/30 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:/10 transition-all duration-500">
 <ShieldCheck className="w-5 h-5 " strokeWidth={1} />
 </div>
 <h3 className="font-heading font-medium text-2xl mb-4 tracking-wide text-white/90">{service.name}</h3>
 <p className="text-white/50 font-light leading-relaxed mb-8">{service.description || 'Özel dokulu kağıtlar üzerine varak yaldız, serigraf ve kenar boyama seçenekleri.'}</p>
 </div>
 <div className="flex items-center gap-4 group-hover:opacity-90 transition-colors opacity-0 group-hover:opacity-100 duration-500 font-medium tracking-widest text-xs uppercase">
 Detayları İncele <ArrowRight className="w-4 h-4" />
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 )
}

export function MatbaaLuxILETISIM({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section id="iletisim" className="py-40 px-6 border-t border-white/5 relative overflow-hidden" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="absolute top-0 right-0 w-[800px] h-[800px] /5 blur-[150px] rounded-full -z-10 translate-x-1/2 -translate-y-1/2" />
 <div className="max-w-[800px] mx-auto text-center">
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
 <Diamond className="w-8 h-8 mx-auto mb-8" strokeWidth={1} />
 <h2 className="font-heading text-4xl md:text-5xl font-medium tracking-wide mb-10">Özel Davetiyeniz.</h2>
 <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed mb-16">
 Butik projeleriniz için özel müşteri temsilcimizle randevu planlayın. Matbaacılık zanaatını ustalarından dinleyin.
 </p>
 <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
 <a href={`tel:${businessData.phoneClean}`} className="w-full sm:w-auto px-12 py-5 text-black font-semibold tracking-[0.2em] text-sm uppercase hover:bg-white transition-colors duration-500">
 Randevu Al
 </a>
 </div>
 
 <div className="grid grid-cols-2 gap-12 mt-24 border-t border-white/5 pt-16 text-left">
 <div>
 <div className="uppercase tracking-widest text-xs font-semibold mb-4 flex items-center gap-2"><Phone className="w-4 h-4"/> İletişim Hattı</div>
 <div className="text-xl font-light text-white/80">{businessData.phone}</div>
 </div>
 <div>
 <div className="uppercase tracking-widest text-xs font-semibold mb-4 flex items-center gap-2"><Compass className="w-4 h-4"/> Stüdyo & Üretim</div>
 <div className="text-lg font-light text-white/80">{businessData.address}, <br/> {businessData.district}/{businessData.city}</div>
 </div>
 </div>
 </motion.div>
 </div>
 </section>
 )
}

export function MatbaaLuxFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-16 text-center border-t border-white/5 " style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="text-white/30 text-xs tracking-[0.3em] uppercase font-medium">
 © {new Date().getFullYear()} {businessData.name}. LÜKS BASKI ATÖLYESİ.
 </div>
 </footer>
 )
}

registerSection('hero', 'matbaalux_hero_0', MatbaaLuxHEADER)
registerSection('hero', 'matbaalux_hero_1', MatbaaLuxHERO)
registerSection('services', 'matbaalux_services_2', MatbaaLuxKOLEKSIYONLARHIZMETLER)
registerSection('services', 'matbaalux_services_3', MatbaaLuxILETISIM)
registerSection('footer', 'matbaalux_footer_4', MatbaaLuxFOOTER)
