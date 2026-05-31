// @ts-nocheck
import React from 'react'
import { SectionConfig, BusinessData } from '../../types/section-types'
import { Phone, MapPin, Mail, ChevronRight, Activity, Dna, ScanFace, Globe, Hexagon, Fingerprint, Lock, ShieldCheck, Database, Server } from 'lucide-react'
import { motion } from 'framer-motion'

// Katman 5 (Enterprise) - Klinik VIP
// Tasarım: Full-page-snap, Dark Mode, Cyber Lüks, Monospace accents

interface Props {
 sections: SectionConfig[]
 businessData: BusinessData
}

export const KlinikVipSections = ({ sections, businessData }: Props) => {
 const getIcon = (name: string) => {
 switch (name) {
 case 'scan-face': return <ScanFace size={32} strokeWidth={1} className="text-accent" />
 case 'dna': return <Dna size={32} strokeWidth={1} className="text-accent" />
 case 'activity': return <Activity size={32} strokeWidth={1} className="text-accent" />
 case 'database': return <Database size={32} strokeWidth={1} className="text-accent" />
 default: return <ScanFace size={32} strokeWidth={1} className="text-accent" />
 }
 }

 const cyberBorder = {
 border: '1px solid var(--color-border)',
 borderRadius: 'var(--radius-md)'
 }

 const cyberBorderHover = {
 border: '1px solid var(--color-accent-subtle)',
 boxShadow: '0 0 20px rgba(0,255,204,0.05)',
 borderRadius: 'var(--radius-md)'
 }

 const fadeUp = {
 hidden: { opacity: 0, y: 50 },
 visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeInOut' as const } }
 }

 const stagger = {
 hidden: { opacity: 0 },
 visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
 }

 const globalHeader = sections.find(s => s.id === 'global-header')
 const globalFooter = sections.find(s => s.id === 'global-footer')
 const mainSections = sections.filter(s => !s.id.startsWith('global'))

 return (
 <div className="font-body bg-bg text-text min-h-screen selection:bg-accent selection:text-black overflow-hidden relative">
 
 {/* BACKGROUND GRID */}
 <div className="fixed inset-0 pointer-events-none opacity-20" 
 style={{ backgroundImage: 'linear-gradient(var(--color-border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
 ></div>

 {/* GLOWS */}
 <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent/10 blur-[150px] pointer-events-none mix-blend-screen hidden lg:block"></div>
 <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-accent/5 blur-[150px] pointer-events-none mix-blend-screen hidden lg:block"></div>

 <style dangerouslySetInnerHTML={{__html: `
 @keyframes scan {
 0% { top: 0; }
 50% { top: 100%; }
 100% { top: 0; }
 }
 `}} />

 {/* CYBER NAV */}
 {globalHeader && (
 <header className="fixed top-0 w-full z-50 bg-bg/80 backdrop-blur-md border-b border-border">
 <div className="max-w-[var(--container-default)] mx-auto px-6 h-20 flex justify-between items-center">
 <div className="flex items-center gap-4">
 <Hexagon size={24} className="text-accent" strokeWidth={1}/>
 <h1 className="font-heading font-bold text-2xl tracking-[0.2em]">{(globalHeader.defaultContent as any)?.logo?.text?.toUpperCase() || businessData.name.toUpperCase()}</h1>
 </div>
 <nav className="hidden lg:flex items-center gap-12 font-heading tracking-[0.2em] text-xs font-bold text-text-secondary uppercase">
 <a href="#hakkimizda" className="hover:text-accent transition-colors">Manifesto</a>
 <a href="#hizmetler" className="hover:text-accent transition-colors">Protocols</a>
 <a href="#iletisim" className="hover:text-accent transition-colors">Facility</a>
 </nav>
 {globalHeader.defaultContent?.cta && (
 <a href={globalHeader.defaultContent.cta.href} className="hidden lg:flex items-center gap-3 bg-transparent border border-accent text-accent px-6 py-2 text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-accent hover:text-black transition-all">
 <Fingerprint size={16}/> {globalHeader.defaultContent.cta.text}
 </a>
 )}
 </div>
 </header>
 )}

 <main className="relative z-10 pt-32 pb-32">
 {mainSections.map((section, sectionIndex) => {

 // 1. HERO
 if (section.id === 'hero' || section.type === 'hero') {
 const content = section.defaultContent as any;
 return (
 <section key={section.id} id={section.id} className="min-h-[85vh] flex items-center justify-center px-6 relative">
 <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent z-10 pointer-events-none"></div>
 <div className="w-full max-w-[var(--container-default)] mx-auto grid lg:grid-cols-2 gap-16 items-center">
 <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-20">
 <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
 <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-text-secondary border border-border-strong px-3 py-1 bg-surface">{content?.badge || 'v2.0 PROTOCOL'}</span>
 <span className="w-16 h-[1px] bg-accent mix-blend-screen"></span>
 </motion.div>
 
 <motion.h2 variants={fadeUp} className="font-heading text-5xl md:text-6xl lg:text-[5rem] font-extrabold leading-[1] mb-8 tracking-tight" dangerouslySetInnerHTML={{ __html: content?.title?.replace('\\n', '<br/>') || 'FUTURE OF<br/><span className="text-[var(--color-accent)]">AESTHETICS.</span>' }} />
 
 <motion.p variants={fadeUp} className="text-text-secondary text-base md:text-lg mb-12 max-w-lg leading-relaxed font-light border-l border-accent pl-6">
 {content?.subtitle || `X-Medica, ${businessData?.ownerName as string} koordinatörlüğünde; robotik teknolojiler ve yapay zeka destekli analizlerle kişiselleştirilmiş hücresel yenilenme konseptini sunar.`}
 </motion.p>
 
 <motion.div variants={fadeUp} className="flex gap-6">
 {content?.cta1 && (
 <a href={content.cta1.href} className="group relative px-8 py-4 bg-accent text-black font-bold text-xs tracking-[0.2em] uppercase overflow-hidden">
 <span className="relative z-10 flex items-center gap-2">{content.cta1.text} <ChevronRight size={16}/></span>
 <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
 </a>
 )}
 </motion.div>

 <motion.div variants={fadeUp} className="mt-16 flex gap-8 items-center border border-border-subtle p-6 bg-surface max-w-md" style={cyberBorder}>
 <div className="text-accent">
 <Globe size={28} strokeWidth={1}/>
 </div>
 <div>
 <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted mb-1">Global Standard</p>
 <p className="font-heading font-bold text-sm tracking-wider">FDA & CE APPROVED FACILITY</p>
 </div>
 </motion.div>
 </motion.div>

 <motion.div initial={{ opacity: 0, clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }} animate={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }} transition={{ duration: 1.5, delay: 0.2, ease: 'easeInOut' as const }} className="relative h-[60vh] lg:h-[80vh] w-full">
 <div className="absolute inset-0 border border-accent-subtle p-4" style={cyberBorder}>
 <div className="w-full h-full relative overflow-hidden bg-surface">
 <img src={businessData.photos?.[0] || 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80'} alt="Cyber Clinic" className="w-full h-full object-cover mix-blend-luminosity opacity-80" />
 <div className="absolute top-0 left-0 w-full h-[2px] bg-accent/50 shadow-[0_0_10px_var(--color-accent)] animate-[scan_3s_linear_infinite]"></div>
 </div>
 </div>
 <div className="absolute -left-10 top-1/4 bg-bg/90 backdrop-blur-sm border border-border-strong p-4 hidden md:block" style={cyberBorder}>
 <p className="text-[8px] uppercase tracking-[0.2em] text-accent mb-2">System Status</p>
 <p className="font-heading font-bold text-xl leading-none">OPTIMAL</p>
 </div>
 </motion.div>
 </div>
 </section>
 )
 }

 // 2. MANIFESTO (about)
 if (section.id === 'hakkimizda' || section.type === 'about') {
 const content = section.defaultContent as any;
 return (
 <section key={section.id} id={section.id} className="py-24 px-6 relative z-10 border-t border-border-subtle mt-16 bg-surface/20">
 <div className="max-w-[var(--container-default)] mx-auto grid lg:grid-cols-2 gap-16 items-center">
 <div>
 <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-4">
 <Server size={12}/> CORE_DIRECTIVE
 </p>
 <h3 className="font-heading text-4xl lg:text-5xl font-bold text-text uppercase tracking-tight mb-8">
 Biological <br/>Optimization.
 </h3>
 <p className="text-text-secondary font-light text-base leading-relaxed mb-8">
 {content?.description || `Geleneksel tıbbın sınırlarını reddediyoruz. ${businessData.name}, insan genetiğini okuyarak, hücresel düzeyde yaşlanmayı yavaşlatan ve geri çeviren biyo-mühendislik çözümleri sunar.`}
 </p>
 <div className="flex gap-4 border border-border-strong p-4 bg-surface max-w-sm" style={cyberBorder}>
 <Activity size={20} className="text-accent" />
 <p className="text-[10px] tracking-[0.2em] font-bold text-text-muted">DATA-DRIVEN AESTHETICS</p>
 </div>
 </div>
 <div className="relative">
 <div className="aspect-square bg-surface border border-border-strong p-2" style={cyberBorder}>
 <img src="https://images.unsplash.com/photo-1614064073361-12eb130e9d68?auto=format&fit=crop&q=80" alt="DNA Analysis" className="w-full h-full object-cover mix-blend-luminosity opacity-60 filter contrast-125" />
 </div>
 </div>
 </div>
 </section>
 )
 }

 // 3. PROTOCOLS (Services)
 if (section.id === 'hizmetler' || section.type === 'services') {
 const content = section.defaultContent as any;
 const services = content?.services || businessData.services || [];
 return (
 <section key={section.id} id={section.id} className="py-24 px-6 relative z-10 mt-16">
 <div className="max-w-[var(--container-default)] mx-auto">
 <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-border pb-8">
 <div>
 <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-4">
 <Lock size={12}/> {content?.badge || 'LEVEL 4 PROTOCOLS'}
 </p>
 <h3 className="font-heading text-4xl lg:text-5xl font-bold text-text uppercase tracking-tight">{content?.title || 'Precision Treatments'}</h3>
 </div>
 <p className="text-text-secondary font-light max-w-sm text-sm leading-relaxed">
 Nano-teknoloji, 3D yüz haritalama ve genetik analiz gerektiren ileri düzey estetik protokoller.
 </p>
 </div>

 <div className="grid md:grid-cols-3 gap-1">
 {services.map((service: any, i: number) => (
 <motion.div 
 key={service.id || i} 
 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
 className="bg-surface p-10 lg:p-14 group relative overflow-hidden transition-all duration-500 hover:bg-surface-elevated"
 style={cyberBorder}
 >
 <div className="absolute top-0 left-0 w-[2px] h-0 bg-accent group-hover:h-full transition-all duration-300"></div>
 <div className="w-16 h-16 bg-bg border border-border flex items-center justify-center mb-8 relative z-10">
 {getIcon(service.icon || '')}
 </div>
 <h4 className="font-heading text-2xl font-bold uppercase tracking-wider mb-4 relative z-10">{service.name}</h4>
 <p className="text-text-secondary font-light text-sm leading-relaxed mb-10 relative z-10">
 {service.description}
 </p>
 <a href="#access" className="text-[10px] font-bold text-text-muted group-hover:text-accent uppercase tracking-[0.2em] flex items-center gap-2 transition-colors relative z-10">
 View Specs <ChevronRight size={14}/>
 </a>
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 )
 }

 // 4. BEFORE/AFTER (Results)
 if (section.id === 'sonuclar' || section.type === 'before_after') {
 const content = section.defaultContent as any;
 return (
 <section key={section.id} id={section.id} className="py-24 px-6 relative z-10 mt-16 bg-surface/20 border-y border-border-subtle">
 <div className="max-w-[var(--container-default)] mx-auto text-center">
 <p className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-4">
 <Database size={12}/> ENCRYPTED_ARCHIVE
 </p>
 <h3 className="font-heading text-4xl lg:text-5xl font-bold text-text uppercase tracking-tight mb-6">
 {content?.title || 'Data Records'}
 </h3>
 <p className="text-text-secondary font-light max-w-xl mx-auto mb-16">
 {content?.description || 'Hasta verilerinin tamamı uçtan uca şifrelenmiştir. Sonuç analizleri sadece kliniğimizdeki biyometrik onaylı ekranlardan görüntülenebilir.'}
 </p>
 <div className="inline-block bg-surface border border-border p-12 max-w-lg mx-auto" style={cyberBorder}>
 <Lock size={48} className="mx-auto text-accent mb-6 opacity-50" strokeWidth={1}/>
 <p className="text-sm font-bold tracking-[0.2em] text-text-muted mb-4">ACCESS RESTRICTED</p>
 <p className="text-[10px] text-text-secondary font-light">Lütfen konsültasyon sırasında yerel ağa bağlanın.</p>
 </div>
 </div>
 </section>
 )
 }

 // 5. FACILITY & SECURITY (Contact/Concierge)
 if (section.id === 'iletisim' || section.type === 'contact') {
 const content = section.defaultContent as any;
 return (
 <section key={section.id} id={section.id} className="py-24 px-6 mt-16">
 <div className="max-w-[var(--container-default)] mx-auto">
 <div className="grid lg:grid-cols-2 gap-1 items-stretch">
 <div className="bg-surface p-10 lg:p-20 relative overflow-hidden" style={cyberBorder}>
 <div className="absolute top-0 right-0 p-6 opacity-30">
 <ShieldCheck size={120} strokeWidth={0.5} className="text-accent"/>
 </div>
 <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent mb-6">FACILITY SECURE</p>
 <h3 className="font-heading text-4xl lg:text-5xl font-bold text-text uppercase tracking-tight mb-8">
 {content?.title || 'Private Access Environment'}
 </h3>
 <p className="text-text-secondary font-light text-base leading-relaxed mb-12">
 X-Medica, sadece ön onaylı hastalarına kapalı devre hizmet verir. VIP giriş protokolleri ve özel asansör sistemleriyle gizliliğiniz %100 güvence altındadır.
 </p>
 <div className="grid grid-cols-2 gap-8 text-[10px] font-bold tracking-[0.2em] uppercase text-text-muted border-t border-border-strong pt-8">
 <div>
 <p className="text-text mb-2">Location</p>
 <p className="line-clamp-2">{businessData.address}</p>
 </div>
 <div>
 <p className="text-text mb-2">Direct Comms</p>
 <p>{businessData.phone}</p>
 </div>
 </div>
 </div>
 <div id="access" className="bg-surface-elevated p-10 lg:p-20 border border-border relative" style={cyberBorder}>
 <div className="flex justify-between items-center border-b border-border-strong pb-4 mb-8">
 <span className="text-xs font-bold text-accent tracking-[0.3em] uppercase">SYSTEM.Inquiry_Console</span>
 <div className="flex gap-1">
 <span className="w-2 h-2 bg-accent animate-pulse"></span>
 <span className="w-2 h-2 bg-border-strong"></span>
 <span className="w-2 h-2 bg-border-strong"></span>
 </div>
 </div>

 <form className="space-y-6" onSubmit={e=>e.preventDefault()}>
 <div className="grid sm:grid-cols-2 gap-6">
 <div>
 <label className="text-[9px] uppercase tracking-[0.2em] text-text-secondary mb-2 block font-bold">Identification</label>
 <input type="text" className="w-full bg-bg border border-border-strong p-4 text-sm font-light text-text focus:outline-none focus:border-accent focus:bg-accent-subtle transition-colors" placeholder="NAME / SURNAME"/>
 </div>
 <div>
 <label className="text-[9px] uppercase tracking-[0.2em] text-text-secondary mb-2 block font-bold">Comms Link</label>
 <input type="tel" className="w-full bg-bg border border-border-strong p-4 text-sm font-light text-text focus:outline-none focus:border-accent focus:bg-accent-subtle transition-colors" placeholder="+90 _"/>
 </div>
 </div>
 <div>
 <label className="text-[9px] uppercase tracking-[0.2em] text-text-secondary mb-2 block font-bold">Protocol Selection</label>
 <select className="w-full bg-bg border border-border-strong p-4 text-sm font-light text-text focus:outline-none focus:border-accent focus:bg-accent-subtle transition-colors appearance-none cursor-pointer">
 <option className="bg-bg">SELECT PROTOCOL</option>
 {businessData.services?.map(s => <option key={s.id} className="bg-bg">{s.name.toUpperCase()}</option>)}
 </select>
 </div>
 <button className="w-full bg-transparent border border-accent text-accent font-bold tracking-[0.3em] uppercase text-xs py-5 hover:bg-accent hover:text-black transition-all mt-4 grid place-items-center relative group">
 <span className="relative z-10 flex items-center gap-2"><Fingerprint size={16}/> AUTHORIZE REQUEST</span>
 </button>
 </form>
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
 <footer className="border-t border-border bg-bg text-[10px] font-bold tracking-[0.2em] uppercase p-6 relative z-10">
 <div className="max-w-[var(--container-default)] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
 <div className="flex gap-6 text-text-muted">
 <span>SYS.v2.0</span>
 <span className="text-accent">STATUS: SECURE</span>
 </div>
 <div className="flex gap-8 text-text-secondary">
 {(globalFooter.defaultContent as any)?.legal?.map((l:any, i:number) => (
 <a key={i} href={l.href} className="hover:text-accent flex items-center gap-2"><Lock size={10}/> {l.label}</a>
 )) || <a href="#" className="hover:text-accent flex items-center gap-2"><Lock size={10}/> DATA LOGS (KVKK)</a>}
 </div>
 <div className="text-text-muted">
 {(globalFooter.defaultContent as any)?.copyright || `© ${new Date().getFullYear()} ${businessData.name}.`}
 </div>
 </div>
 </footer>
 )}
 </div>
 )
}
