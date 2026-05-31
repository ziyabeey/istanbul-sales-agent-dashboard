// @ts-nocheck
import { registerSection } from '../../registry/section-registry'
import { SectionProps } from '../../types/section-types'
import { Aperture, TriangleRight, Diamond, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

export function FotoLuxMINIMALHEADER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <motion.header 
   initial={{ opacity: 0, y: -20 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
   className="px-8 py-8 md:py-12 absolute w-full z-50 mix-blend-difference" 
   style={{ color: 'var(--color-text)' }}
 >
 <div className="flex items-center justify-between">
 <div className="font-heading font-bold text-2xl md:text-3xl tracking-tighter uppercase">
 {businessData.name}
 </div>
 <div className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium hidden md:block">
 Maison de Photographie
 </div>
 <button className="md:hidden uppercase tracking-widest text-[10px] font-bold">Menu</button>
 </div>
 </motion.header>
 )
}

export function FotoLuxAVANTGARDEHERO({ business }: SectionProps<any>) {
 const businessData = business;
 
 const wordAnimation = {
   hidden: { opacity: 0, y: 40 },
   visible: (i: number) => ({
     opacity: 1,
     y: 0,
     transition: {
       delay: i * 0.1,
       duration: 1.2,
       ease: [0.16, 1, 0.3, 1]
     }
   })
 }

 return (
 <section className="min-h-screen py-32 px-8 flex flex-col justify-end relative overflow-hidden group noise-overlay" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 {/* Abstract Background element imitating a dark studio backdrop with a spotlight */}
 <motion.div 
   initial={{ scale: 1.1, opacity: 0 }}
   animate={{ scale: 1, opacity: 0.6 }}
   transition={{ duration: 2, ease: "easeOut" as any }}
   className="absolute top-0 left-0 w-full h-full -z-10"
   style={{
     background: 'radial-gradient(circle at 50% 30%, var(--color-surface-2) 0%, var(--color-bg) 70%)'
   }}
 />
 
 <div className="w-full mx-auto relative z-10 max-w-[var(--container-default)]">
 <motion.p 
   initial={{ opacity: 0 }}
   animate={{ opacity: 1 }}
   transition={{ delay: 0.5, duration: 1 }}
   className="text-[10px] md:text-xs font-semibold tracking-[0.5em] mb-8 uppercase text-text-secondary"
 >
   Haute Couture & VIP Portfolio
 </motion.p>
 
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-border-subtle pb-12">
 <h1 className="font-heading font-black uppercase tracking-tighter text-fluid-1" style={{ lineHeight: 0.85 }}>
   {["Görsel", "Otorite."].map((word, i) => (
     <motion.span 
       key={i}
       custom={i}
       initial="hidden"
       animate="visible"
       variants={wordAnimation}
       className="block"
     >
       {word}
     </motion.span>
   ))}
 </h1>
 
 <motion.div 
   initial={{ opacity: 0, x: 20 }}
   animate={{ opacity: 1, x: 0 }}
   transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
   className="max-w-sm"
 >
 <p className="font-light leading-relaxed mb-8 text-sm md:text-base text-text-secondary">
 Moda editöryalleri, ünlü portreleri ve premium marka kampanyaları için dünya standartlarında, tavizsiz prodüksiyon. Sadece ışık değil, karakter inşası.
 </p>
 <a href={`tel:${businessData.phoneClean}`} className="inline-flex items-center gap-4 text-white uppercase text-xs font-bold tracking-[0.2em] border-b border-white pb-2 hover:text-accent hover:border-accent transition-all duration-300">
 Book The Studio <TriangleRight className="w-4 h-4" />
 </a>
 </motion.div>
 </div>
 </div>
 </section>
 )
}

export function FotoLuxBENTOGALLERY({ business }: SectionProps<any>) {
 const businessData = business;
 const images = [
   "photo-1534528741775-53994a69daeb?w=800&q=80",
   "photo-1506794778202-cad84cf45f1d?w=800&q=80",
   "photo-1542038784456-1ea8e935640e?w=800&q=80",
   "photo-1494790108377-be9c29b29330?w=800&q=80",
 ]

 return (
 <section className="py-[var(--section-py)] px-4 md:px-8" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[var(--container-default)] mx-auto">
   
   <motion.div 
     initial={{ opacity: 0, y: 30 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true, margin: "-100px" }}
     transition={{ duration: 0.8 }}
     className="flex items-center justify-between mb-16"
   >
     <h2 className="font-heading font-bold uppercase tracking-tight text-fluid-2">
       The <br /> <span className="text-accent italic font-normal">Archive.</span>
     </h2>
     <Aperture className="w-16 h-16 md:w-24 md:h-24 stroke-1 text-border-subtle animate-spin-slow" />
   </motion.div>

   <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
     {images.map((img, i) => {
       // Create asymmetrical bento layout
       const colSpan = i === 0 ? 'md:col-span-8' : i === 1 ? 'md:col-span-4' : i === 2 ? 'md:col-span-5' : 'md:col-span-7';
       const height = i === 0 || i === 3 ? 'h-[50vh] md:h-[70vh]' : 'h-[40vh] md:h-[50vh]';
       
       return (
         <motion.div 
           key={i}
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
           className={`relative overflow-hidden group rounded-[var(--radius-md)] ${colSpan} ${height}`}
         >
           <div 
             className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-105"
             style={{ backgroundImage: `url(https://images.unsplash.com/${img})` }}
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
           <div className="absolute bottom-6 left-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
               <ArrowUpRight className="w-4 h-4" />
             </div>
             <span className="text-xs uppercase tracking-widest font-bold">View Editorial</span>
           </div>
         </motion.div>
       )
     })}
   </div>
 </div>
 </section>
 )
}

export function FotoLuxPREMIUMDISCIPLINES({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <section className="py-[var(--section-py)] px-4 md:px-8 border-t border-border-subtle" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
 <div className="max-w-[var(--container-default)] mx-auto grid md:grid-cols-2 gap-16 md:gap-24">
 
 <motion.div 
   initial={{ opacity: 0, x: -30 }}
   whileInView={{ opacity: 1, x: 0 }}
   viewport={{ once: true, margin: "-100px" }}
   transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
   className="order-2 md:order-1 flex flex-col justify-center"
 >
 <h2 className="font-heading text-fluid-3 font-bold uppercase tracking-tight mb-8">Editorial <br/> <span className="text-accent italic font-normal">Finesse.</span></h2>
 <p className="leading-loose font-light mb-12 text-text-secondary text-sm md:text-base">
 Vogue, GQ veya Harper's Bazaar kalibresinde styling, profesyonel saç/makyaj ekipleri ve set tasarımıyla anahtar teslim VIP prodüksiyonlar. Konsept üretiminden post-prodüksiyona dek kusursuz renk derecelendirmesi (color grading).
 </p>
 <ul className="space-y-6 text-xs md:text-sm uppercase tracking-[0.2em] font-medium">
 <li className="flex items-center gap-4 group cursor-pointer"><Diamond className="w-3 h-3 fill-current text-border-subtle group-hover:text-accent transition-colors"/> <span className="group-hover:translate-x-2 transition-transform">Fashion Campaigns</span></li>
 <li className="flex items-center gap-4 group cursor-pointer"><Diamond className="w-3 h-3 fill-current text-border-subtle group-hover:text-accent transition-colors"/> <span className="group-hover:translate-x-2 transition-transform">Celebrity Portraits</span></li>
 <li className="flex items-center gap-4 group cursor-pointer"><Diamond className="w-3 h-3 fill-current text-border-subtle group-hover:text-accent transition-colors"/> <span className="group-hover:translate-x-2 transition-transform">Fine Art Nude</span></li>
 <li className="flex items-center gap-4 group cursor-pointer"><Diamond className="w-3 h-3 fill-current text-border-subtle group-hover:text-accent transition-colors"/> <span className="group-hover:translate-x-2 transition-transform">Architectural & Interior</span></li>
 </ul>
 </motion.div>

 <motion.div 
   initial={{ opacity: 0, scale: 0.95 }}
   whileInView={{ opacity: 1, scale: 1 }}
   viewport={{ once: true }}
   transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
   className="order-1 md:order-2"
 >
 {/* Monolith visual placeholder */}
 <div className="w-full h-full min-h-[500px] bg-surface-1 border border-border-subtle relative overflow-hidden group hover:border-[#444] transition-colors rounded-[var(--radius-lg)]">
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-xl md:text-2xl uppercase tracking-[0.5em] text-center w-full text-text-muted group-hover:text-text transition-colors duration-500">
 Studio <br/> Confidential
 </div>
 </div>
 </motion.div>

 </div>
 </section>
 )
}

export function FotoLuxFOOTER({ business }: SectionProps<any>) {
 const businessData = business;
 return (
 <footer className="py-16 px-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium" style={{ background: 'var(--color-bg)', color: 'var(--color-text-muted)' }}>
 <p className="hover:text-text transition-colors cursor-pointer">{businessData.name} © {businessData.foundedYear || '2025'}</p>
 <Aperture className="w-6 h-6 stroke-1 text-accent" />
 <p className="hover:text-text transition-colors cursor-pointer">Global Representation</p>
 </footer>
 )
}

registerSection('hero', 'fotolux_hero_0', FotoLuxMINIMALHEADER)
registerSection('hero', 'fotolux_hero_1', FotoLuxAVANTGARDEHERO)
registerSection('gallery', 'fotolux_gallery_awwwards', FotoLuxBENTOGALLERY)
registerSection('services', 'fotolux_services_2', FotoLuxPREMIUMDISCIPLINES)
registerSection('footer', 'fotolux_footer_3', FotoLuxFOOTER)
