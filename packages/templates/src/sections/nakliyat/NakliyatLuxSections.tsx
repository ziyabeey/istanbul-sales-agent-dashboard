// @ts-nocheck
'use client'
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Gem, Shield, Crown, Phone, ArrowRight, Star } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
}

export function NakliyatLuxHEADER({ business }: SectionProps<any>) {
  return (
    <header className="fixed w-full top-0 z-[100] transition-colors duration-500 bg-black/40 backdrop-blur-2xl border-b border-white/[0.05]" style={{ color: 'var(--color-text)' }}>
      <div className="max-w-[1400px] mx-auto px-8 h-24 flex items-center justify-between">
        <div className="font-heading text-xl font-light tracking-[0.3em] uppercase flex items-center gap-4 text-white hover:text-white/80 transition-colors">
          <Crown className="w-5 h-5 text-amber-500/80" strokeWidth={1.5} /> 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            {business.name}
          </span>
        </div>
        <a href="#iletisim" className="group relative overflow-hidden rounded-full border border-white/10 bg-white/5 px-8 py-3 text-xs tracking-[0.2em] font-medium uppercase text-white backdrop-blur-sm transition-all hover:bg-white hover:text-black">
          <span className="relative z-10 flex items-center gap-2">VIP Ekspertiz <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /></span>
          <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
        </a>
      </div>
    </header>
  )
}

export function NakliyatLuxHERO({ business }: SectionProps<any>) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black" style={{ color: 'var(--color-text)' }}>
      {/* Background Ambience */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] opacity-40"></div>
      </motion.div>
      
      {/* Huge Background Typography Watermark */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-0">
        <motion.h2 style={{ y }} className="text-[20vw] font-serif font-bold text-white/[0.02] whitespace-nowrap leading-none tracking-tighter">
          PREMIUM
        </motion.h2>
      </div>

      <div className="max-w-[1200px] mx-auto text-center relative z-10 px-6 pt-32">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 mb-12">
            <Star className="w-3 h-3 text-amber-500 filled" strokeWidth={2} />
            <span className="text-[10px] tracking-[0.3em] uppercase text-amber-500/90 font-medium">Bespoke Lojistik Deneyimi</span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-heading text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] tracking-tight mb-8 max-w-5xl mx-auto text-white">
            Kıymetli Eşyalarınız İçin <br/> 
            <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Kusursuz</span> Taşıma.
          </motion.h1>
          <motion.p variants={fadeUp} className="text-xl md:text-2xl text-white/50 mb-16 max-w-2xl font-light leading-relaxed">
            Antika, piyano, sanat eseri ve premium mobilyalarınız için özel eğitimli personel ve kapalı kasa tır filosu ile First Class nakliyat.
          </motion.p>
        </motion.div>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10"></div>
    </section>
  )
}

export function NakliyatLuxVIPHIZMETLER({ business }: SectionProps<any>) {
  return (
    <section className="py-32 px-6 relative bg-black" style={{ color: 'var(--color-text)' }}>
      {/* Grain texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={fadeUp} className="text-center mb-24">
          <Gem className="w-8 h-8 mx-auto mb-6 text-amber-500/80" strokeWidth={1} />
          <h2 className="font-heading text-4xl md:text-5xl font-light tracking-wide text-white">Ayrıcalıklı Servisler</h2>
          <div className="w-[1px] h-20 bg-gradient-to-b from-amber-500/50 to-transparent mx-auto mt-12"></div>
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {business.services?.map((service: any, idx: number) => (
            <motion.div key={service.id || idx} variants={fadeUp} className="group relative rounded-3xl p-10 bg-white/[0.02] border border-white/[0.05] overflow-hidden hover:bg-white/[0.04] transition-colors duration-700">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"></div>
              <Shield className="w-10 h-10 mb-8 text-white/40 group-hover:text-amber-500 transition-colors duration-500" strokeWidth={1} />
              <h3 className="font-heading font-normal text-xl mb-4 tracking-widest uppercase text-white/90">{service.name}</h3>
              <p className="text-white/40 font-light leading-relaxed text-sm pr-4 group-hover:text-white/70 transition-colors duration-500">
                {service.description || 'Özel ahşap sandıklama ve hava süspansiyonlu araçlarla sıfır sarsıntı garantili deneyim.'}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export function NakliyatLuxILETISIM({ business }: SectionProps<any>) {
  return (
    <section id="iletisim" className="py-40 px-6 relative flex justify-center items-center flex-col bg-black overflow-hidden" style={{ color: 'var(--color-text)' }}>
      {/* Abstract structural glow */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
        <Crown className="absolute w-[800px] h-[800px] text-white/[0.01]" />
      </div>

      <div className="max-w-[800px] mx-auto text-center relative z-10 bg-black/50 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-16 md:p-24 shadow-2xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col items-center">
          <motion.div variants={fadeUp} className="w-16 h-16 rounded-full border border-amber-500/30 flex items-center justify-center mb-10">
            <Phone className="w-6 h-6 text-amber-500/80" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl font-light tracking-[0.2em] uppercase mb-8 text-white">Concierge</motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-lg font-light leading-relaxed mb-16 max-w-lg">
            Taşıma sürecinizi detaylandırmak ve eksper randevusu oluşturmak için premium müşteri temsilcimizle görüşün.
          </motion.p>
          <motion.a variants={fadeUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={`tel:${business.phoneClean}`} className="relative overflow-hidden group flex items-center justify-center gap-4 px-16 py-6 rounded-full text-black font-semibold tracking-[0.2em] text-sm uppercase bg-white hover:bg-amber-500 transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)]">
            <span>Özel Randevu Al</span>
          </motion.a>
          
          <motion.div variants={fadeUp} className="mt-16 pt-12 border-t border-white/[0.05] w-full flex flex-col items-center gap-4">
            <div className="font-light tracking-[0.2em] text-[10px] text-white/30 uppercase">Merkez Ofis</div>
            <div className="font-light tracking-[0.1em] text-sm text-white/60">
              {business.district}, {business.city}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export function NakliyatLuxFOOTER({ business }: SectionProps<any>) {
  return (
    <footer className="py-16 bg-black border-t border-white/[0.02]" style={{ color: 'var(--color-text)' }}>
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-white/30 text-xs tracking-[0.4em] uppercase font-light">
          {business.name} © {new Date().getFullYear()} — PREMIUM TRANSPORT 
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-white/30 hover:text-white/80 transition-colors text-xs tracking-[0.2em] uppercase">Gizlilik</a>
          <div className="w-1 h-1 rounded-full bg-white/10"></div>
          <a href="#" className="text-white/30 hover:text-white/80 transition-colors text-xs tracking-[0.2em] uppercase">KVKK</a>
        </div>
      </div>
    </footer>
  )
}

registerSection('hero', 'nakliyatlux_hero_0', NakliyatLuxHEADER)
registerSection('hero', 'nakliyatlux_hero_1', NakliyatLuxHERO)
registerSection('services', 'nakliyatlux_services_2', NakliyatLuxVIPHIZMETLER)
registerSection('services', 'nakliyatlux_services_3', NakliyatLuxILETISIM)
registerSection('footer', 'nakliyatlux_footer_4', NakliyatLuxFOOTER)
