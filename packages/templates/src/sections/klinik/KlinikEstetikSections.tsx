// @ts-nocheck
import React from 'react'
import { SectionConfig, BusinessData } from '../../types/section-types'
import { Phone, MapPin, Instagram, Mail, Star, Wind, Figma, ChevronRight, Play, Camera } from 'lucide-react'
import { motion } from 'framer-motion'

// Katman 4 (Premium) - Klinik Estetik
// Tasarım: Editorial-zigzag, Dark Mode, Glassmorphism, Luxury

interface Props {
 sections: SectionConfig[]
 businessData: BusinessData
}

export const KlinikEstetikSections = ({ sections, businessData }: Props) => {
 const getIcon = (name: string) => {
 switch (name) {
 case 'star': return <Star size={24} strokeWidth={1} className="text-accent" />
 case 'wind': return <Wind size={24} strokeWidth={1} className="text-accent" />
 case 'figma': return <Figma size={24} strokeWidth={1} className="text-accent" />
 default: return <Star size={24} strokeWidth={1} className="text-accent" />
 }
 }

 const glassBox = {
 backgroundColor: 'var(--color-surface)',
 backdropFilter: 'blur(16px)',
 WebkitBackdropFilter: 'blur(16px)',
 border: '1px solid var(--color-border)',
 borderRadius: 'var(--radius-lg)'
 }

 const fadeUp = {
 hidden: { opacity: 0, y: 40 },
 visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeInOut' as const } }
 }

 const stagger = {
 hidden: { opacity: 0 },
 visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
 }

 const globalHeader = sections.find(s => s.id === 'global-header')
 const globalFooter = sections.find(s => s.id === 'global-footer')
 const mainSections = sections.filter(s => !s.id.startsWith('global'))

 return (
 <div className="font-body bg-bg text-text min-h-screen selection:bg-accent-light selection:text-accent relative overflow-hidden">
 
 {/* AMBIENT BLOBS / GLOWS */}
 <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
 <div className="absolute top-[40%] left-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none transform -translate-x-1/2"></div>

 {/* HEADER */}
 {globalHeader && (
 <header className="fixed top-0 w-full z-50 transition-all border-b border-border-subtle bg-bg/50 backdrop-blur-xl">
 <div className="max-w-[var(--container-default)] mx-auto py-5 px-6 lg:px-12 flex justify-between items-center">
 <div className="flex flex-col">
 <h1 className="font-heading text-2xl md:text-3xl tracking-widest text-accent font-medium uppercase">
 {(globalHeader.defaultContent as any)?.logo?.text || businessData.name}
 </h1>
 <span className="text-[9px] uppercase tracking-[0.3em] text-text-secondary mt-1">{businessData?.ownerName as string}</span>
 </div>
 <nav className="hidden lg:flex items-center gap-10 font-light text-text-secondary text-sm tracking-widest uppercase">
 <a href="#hakkimizda" className="hover:text-text transition-colors">Felsefe</a>
 <a href="#hizmetler" className="hover:text-text transition-colors">Koleksiyon</a>
 <a href="#iletisim" className="hover:text-text transition-colors">Concierge</a>
 </nav>
 {globalHeader.defaultContent?.cta && (
 <a href={globalHeader.defaultContent.cta.href} className="border border-accent text-accent px-8 py-3 text-xs uppercase tracking-widest hover:bg-accent hover:text-black transition-all duration-500 hidden sm:block">
 {globalHeader.defaultContent.cta.text}
 </a>
 )}
 </div>
 </header>
 )}

 <main className="relative z-10 pt-32">
 {mainSections.map((section, sectionIndex) => {

 // 1. HERO (editorial zigzag)
 if (section.id === 'hero' || section.type === 'hero') {
 const content = section.defaultContent as any;
 return (
 <section key={section.id} id={section.id} className="min-h-[90vh] flex items-center relative py-20 px-4">
 <div className="max-w-[var(--container-default)] mx-auto w-full grid lg:grid-cols-12 gap-12 items-center">
 <motion.div initial="hidden" animate="visible" variants={stagger} className="lg:col-span-7 pr-0 lg:pr-12 relative z-20">
 <motion.div variants={fadeUp} className="inline-flex items-center gap-4 mb-8">
 <span className="w-12 h-px bg-accent"></span>
 <span className="text-[10px] uppercase tracking-[0.3em] text-accent">{content?.badge || businessData.slogan}</span>
 </motion.div>
 <motion.h2 variants={fadeUp} className="font-heading text-5xl md:text-6xl lg:text-[5rem] text-text leading-[1.1] mb-8 font-light italic" dangerouslySetInnerHTML={{ __html: content?.title?.replace('\\n', '<br/>') || 'Zamansız Güzelliğin <br/><span className="text-[var(--color-accent)] not-italic">Ötesinde.</span>' }} />
 <motion.p variants={fadeUp} className="text-text-secondary text-lg mb-12 leading-relaxed font-light max-w-xl">
 {content?.subtitle || 'Zorlu Center\'ın kalbinde, sanat ve cerrahinin kusursuz birleşimi. Yalnızca size özel.'}
 </motion.p>
 <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6">
 {content?.cta1 && (
 <a href={content.cta1.href} className="bg-accent text-black px-10 py-5 font-medium tracking-widest uppercase text-xs hover:bg-accent-hover transition-colors text-center">
 {content.cta1.text}
 </a>
 )}
 <a href="#video" className="px-10 py-5 font-medium tracking-widest uppercase text-xs text-text border border-border-strong hover:border-accent transition-colors text-center flex items-center justify-center gap-3 group">
 <Play size={14} className="text-accent group-hover:scale-110 transition-transform"/> Özel Turu İzle
 </a>
 </motion.div>
 </motion.div>
 <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.2 }} className="lg:col-span-5 relative">
 <div className="relative aspect-[3/4] w-full max-w-md mx-auto" style={glassBox}>
 <img src={businessData.photos?.[0] || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80'} alt="Clinic Hero" className="w-full h-full object-cover p-2 rounded-[var(--radius-lg)] opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"/>
 <div className="absolute -left-12 bottom-12 p-6 max-w-[200px]" style={glassBox}>
 <p className="font-heading text-3xl italic text-accent mb-1">Sanat</p>
 <p className="text-[9px] uppercase tracking-widest text-text-secondary">Plastik cerrahinin en estetik hali</p>
 </div>
 </div>
 </motion.div>
 </div>
 </section>
 )
 }

 // 2. ABOUT (story)
 if (section.id === 'hakkimizda' || section.type === 'about') {
 const content = section.defaultContent as any;
 return (
 <section key={section.id} id={section.id} className="py-32 relative">
 <div className="max-w-[var(--container-default)] mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-20 items-center">
 <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
 <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80" alt="Clinic Interior" className="w-full h-full object-cover rounded-full aspect-square opacity-60 grayscale filter hover:grayscale-0 transition-all duration-1000" />
 </motion.div>
 <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-xl">
 <motion.h3 variants={fadeUp} className="font-heading text-4xl lg:text-5xl font-light text-text mb-8 italic">
 Bütünsel <span className="text-accent not-italic">Yaklaşım</span>
 </motion.h3>
 <motion.p variants={fadeUp} className="text-text-secondary font-light text-lg leading-relaxed mb-6">
 {content?.description || 'Burası bir hastane değil; bedeninizi, ruhunuzu ve dış görünüşünüzü aynı anda dinlendiren bir yenilenme merkezi.'}
 </motion.p>
 <motion.p variants={fadeUp} className="text-text-muted font-light text-base leading-relaxed mb-10">
 {businessData?.ownerName as string} liderliğinde, uluslararası cerrahi standartları lüks otel konforuyla birleştiriyoruz. Tamamen size özel kurgulanmış "Bespoke Estetik" konseptini deneyimleyin.
 </motion.p>
 <motion.div variants={fadeUp}>
 <a href={businessData.socialMedia?.instagram || '#'} className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-text border-b border-accent pb-1 hover:text-accent transition-colors">
 <Instagram size={14}/> Sosyal Medyada İlham Alın
 </a>
 </motion.div>
 </motion.div>
 </div>
 </section>
 )
 }

 // 3. SERVICES (cards layout luxury)
 if (section.id === 'hizmetler' || section.type === 'services') {
 const content = section.defaultContent as any;
 const services = content?.services || businessData.services || [];
 return (
 <section key={section.id} id={section.id} className="py-32 relative z-10">
 <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent"></div>
 <div className="max-w-[var(--container-default)] mx-auto px-6 lg:px-12">
 <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
 <div>
 <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-4">{content?.badge || 'Signature Treatments'}</p>
 <h2 className="font-heading text-5xl font-light text-text italic">{content?.title || 'Estetik Koleksiyonu'}</h2>
 </div>
 </div>

 <div className="grid md:grid-cols-3 gap-8">
 {services.map((service: any, i: number) => (
 <motion.div 
 key={service.id || i} 
 initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeUp} transition={{ delay: i * 0.15 }}
 className="p-10 group relative overflow-hidden" 
 style={glassBox}
 >
 <div className="absolute top-0 left-0 w-full h-1 bg-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
 <div className="w-16 h-16 rounded-full bg-bg flex items-center justify-center mb-8 border border-border group-hover:border-accent transition-colors">
 {getIcon(service.icon || '')}
 </div>
 <h3 className="font-heading text-3xl font-light text-text mb-4">{service.name}</h3>
 <p className="text-text-secondary font-light text-sm leading-relaxed mb-10">
 {service.description || 'Kişiselleştirilmiş protokollerle kusursuzluğu yeniden tanımlıyoruz.'}
 </p>
 <a href="#randevu" className="text-[10px] uppercase tracking-[0.2em] font-medium text-accent flex items-center gap-2 group-hover:gap-4 transition-all">
 Protokolü İncele <ChevronRight size={14}/>
 </a>
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 )
 }

 // 4. DOCTORS (slider)
 if (section.id === 'doktorlar' || section.type === 'team') {
 const content = section.defaultContent as any;
 return (
 <section key={section.id} id={section.id} className="py-32 relative z-10">
 <div className="max-w-[var(--container-default)] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-center">
 <div className="order-2 lg:order-1 relative aspect-[4/5] w-full max-w-md mx-auto" style={glassBox}>
 <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80" alt={businessData?.ownerName as string} className="w-full h-full object-cover p-2 rounded-[var(--radius-lg)] opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"/>
 </div>
 <div className="order-1 lg:order-2">
 <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-4">Medikal Direktör</p>
 <h2 className="font-heading text-5xl font-light text-text mb-6">{businessData?.ownerName as string}</h2>
 <p className="text-text-secondary font-light text-lg leading-relaxed mb-8">
 "Estetik bir operasyon, sadece bedeni değil ruhu da iyileştiren bir sanat eseridir. Kendinizi en iyi hissettiğiniz noktaya ulaştırmak bizim felsefemiz."
 </p>
 <a href="#hakkimizda" className="text-[10px] uppercase tracking-[0.2em] font-medium text-accent flex items-center gap-2 hover:gap-4 transition-all border-b border-accent pb-1 inline-flex">
 CV'yi İncele <ChevronRight size={14}/>
 </a>
 </div>
 </div>
 </section>
 )
 }

 // 5. BEFORE/AFTER (slider placeholder)
 if (section.id === 'sonuclar' || section.type === 'before_after') {
 const content = section.defaultContent as any;
 return (
 <section key={section.id} id={section.id} className="py-32 relative z-10 bg-surface/30">
 <div className="max-w-[var(--container-default)] mx-auto px-6 lg:px-12 text-center">
 <h2 className="font-heading text-4xl lg:text-5xl font-light text-text italic mb-6">{content?.title || 'Sanat Eserlerimiz'}</h2>
 <p className="text-text-secondary font-light mb-16">{content?.description || 'Gizlilik prensiplerimiz gereği tüm vaka sonuçları klinikte birebir görüşmede sunulmaktadır.'}</p>
 
 <div className="max-w-2xl mx-auto border border-border-strong p-16" style={glassBox}>
 <Camera size={48} strokeWidth={1} className="mx-auto text-accent mb-6 opacity-50"/>
 <p className="text-text font-light text-lg mb-4">Vaka Portfolyosunu İncelemek İçin</p>
 <a href="#randevu" className="text-[10px] uppercase tracking-[0.2em] font-medium text-accent hover:underline">
 Görüşme Talep Edin
 </a>
 </div>
 </div>
 </section>
 )
 }

 // 6. CONTACT (concierge)
 if (section.id === 'iletisim' || section.type === 'contact') {
 const content = section.defaultContent as any;
 return (
 <section key={section.id} id={section.id} className="py-32 relative">
 <div className="max-w-[var(--container-default)] mx-auto px-6 lg:px-12">
 <div className="p-10 lg:p-20 relative overflow-hidden" style={glassBox}>
 <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[80px]"></div>

 <div className="grid lg:grid-cols-2 gap-20 relative z-10">
 <div>
 <h2 className="font-heading text-4xl lg:text-5xl font-light text-text mb-6 italic">{content?.title || 'Ayrıcalıklı Görüşme'}</h2>
 <p className="text-text-secondary font-light leading-relaxed mb-12">
 Concierge ekibimiz, klinik ziyaretinizin her adımını kusursuz planlamak için hizmetinizdedir.
 </p>
 <div className="space-y-8">
 <div className="flex gap-6 items-center">
 <Phone size={20} className="text-accent" strokeWidth={1} />
 <div>
 <p className="text-[9px] uppercase tracking-widest text-text-muted mb-1">VIP Concierge</p>
 <p className="font-light text-xl tracking-wider">{businessData.phone}</p>
 </div>
 </div>
 <div className="flex gap-6 items-center">
 <MapPin size={20} className="text-accent" strokeWidth={1} />
 <div>
 <p className="text-[9px] uppercase tracking-widest text-text-muted mb-1">Premium Lokasyon</p>
 <p className="font-light text-base text-text-secondary max-w-xs">{businessData.address}</p>
 </div>
 </div>
 </div>
 </div>
 <div className="bg-bg/80 p-8 border border-border-subtle">
 <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
 <div className="relative">
 <input type="text" className="w-full bg-transparent border-b border-border-strong py-4 text-text font-light focus:outline-none focus:border-accent transition-colors peer placeholder-transparent" placeholder="İsim Soyisim" id="fname" />
 <label htmlFor="fname" className="absolute left-0 top-4 text-[10px] tracking-widest text-text-muted uppercase peer-focus:-translate-y-6 peer-focus:text-accent transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm">
 İsim Soyisim
 </label>
 </div>
 <div className="relative">
 <input type="tel" className="w-full bg-transparent border-b border-border-strong py-4 text-text font-light focus:outline-none focus:border-accent transition-colors peer placeholder-transparent" placeholder="Telefon" id="fphone" />
 <label htmlFor="fphone" className="absolute left-0 top-4 text-[10px] tracking-widest text-text-muted uppercase peer-focus:-translate-y-6 peer-focus:text-accent transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm">
 İletişim Numarası
 </label>
 </div>
 <button className="w-full bg-text text-black font-medium tracking-widest uppercase text-xs py-5 hover:bg-accent transition-colors mt-8">
 Talebi İletin
 </button>
 </form>
 </div>
 </div>
 </div>
 </div>
 </section>
 )
 }

 return null;
 })}
 </main>

 {/* FOOTER */}
 {globalFooter && (
 <footer className="relative z-10 border-t border-border-subtle bg-bg pt-16 pb-8">
 <div className="max-w-[var(--container-default)] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
 <div>
 <h3 className="font-heading text-2xl text-accent uppercase tracking-widest mb-2">{(globalFooter.defaultContent as any)?.logo?.text || businessData.name}</h3>
 <p className="text-[10px] tracking-widest text-text-muted uppercase">Advanced Aesthetics Clinic</p>
 </div>
 <div className="flex gap-8 text-[10px] tracking-[0.2em] font-light text-text-secondary uppercase">
 {(globalFooter.defaultContent as any)?.legal?.map((l:any, i:number) => (
 <a key={i} href={l.href} className="hover:text-text transition-colors">{l.label}</a>
 )) || <a href="#" className="hover:text-text transition-colors">Politikalar</a>}
 </div>
 </div>
 <div className="max-w-[var(--container-default)] mx-auto px-6 lg:px-12 mt-16 pt-8 border-t border-border-subtle flex justify-between items-center text-[9px] tracking-[0.3em] font-light text-text-muted uppercase">
 <p>{(globalFooter.defaultContent as any)?.copyright || `© ${new Date().getFullYear()} ${businessData.name}`}</p>
 <p>{(globalFooter.defaultContent as any)?.poweredBy || 'TÜRKİYE'}</p>
 </div>
 </footer>
 )}
 </div>
 )
}
