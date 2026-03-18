"use client";

import Link from 'next/link'
import { motion } from 'framer-motion'
import { SEKTORLER } from '@/data/sektorler'
import Navbar from '@/components/layout/Navbar'

/* Kategorileri çıkar */
const KATEGORILER = Array.from(new Set(SEKTORLER.map(s => s.kategori))).sort()

export default function SektorlerClient() {
    return (
        <main className="min-h-screen bg-background text-foreground font-sans">
            <Navbar />

            <div className="pt-32 pb-24">
                {/* Hero */}
                <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-bold text-rust bg-rust/10 border border-rust/20 mb-6 backdrop-blur-sm"
                    >
                        🏢 {SEKTORLER.length}+ Sektör
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 font-syne drop-shadow-lg"
                    >
                        Sektörünüze Özel <span className="text-transparent bg-clip-text bg-gradient-to-r from-rust to-gold">AI Asistan</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-muted-foreground-100 max-w-3xl mx-auto leading-relaxed font-lora"
                    >
                        Her sektörün müşteri dili, hizmet listesi ve satış stratejisi farklıdır.
                        kepenk.ai bunu bilir ve size özel konuşur.
                    </motion.p>
                </section>

                {/* Kategori Grupları */}
                <div className="perspective-1000 relative z-10">
                    {KATEGORILER.map((kategori, kIndex) => {
                        const sektorler = SEKTORLER.filter(s => s.kategori === kategori)
                        const MotionLink = motion.create(Link);
                        
                        return (
                            <motion.section 
                                key={kategori} 
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: kIndex * 0.1 }}
                                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative"
                            >
                                <h2 className="text-xl md:text-2xl font-syne font-extrabold mb-6 flex items-center gap-3 text-white">
                                    <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-rust/20 to-transparent border border-rust/30 shadow-[0_4px_15px_rgba(220,70,30,0.2)] flex items-center justify-center text-lg">
                                        {sektorler[0]?.emoji}
                                    </span>
                                    {kategori}
                                    <span className="text-sm text-muted-foreground font-normal ml-1 font-sans">
                                        ({sektorler.length} sektör)
                                    </span>
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {sektorler.map((s, idx) => (
                                        <MotionLink
                                            key={s.id}
                                            href={`/sektorler/${s.id}`}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: (idx % 4) * 0.1, duration: 0.4 }}
                                            whileHover={{ 
                                                scale: 1.03, 
                                                y: -5,
                                                rotateX: 2,
                                                rotateY: idx % 2 === 0 ? 3 : -3,
                                                z: 20,
                                                transition: { duration: 0.2 } 
                                            }}
                                            style={{ transformStyle: "preserve-3d" }}
                                            className="group relative bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col justify-between hover:bg-white/[0.08] hover:border-rust/40 hover:shadow-2xl hover:shadow-rust/10 transition-all overflow-hidden"
                                        >
                                            {/* Light reflection sweep */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] pointer-events-none" />

                                            <div className="relative z-10">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-black/20 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:-rotate-6 transition-transform shadow-inner border border-white/5">
                                                        {s.emoji}
                                                    </div>
                                                    <h3 className="text-lg font-bold text-white group-hover:text-rust transition-colors font-syne">
                                                        {s.ad}
                                                    </h3>
                                                </div>
                                                <p className="text-sm text-muted-foreground leading-relaxed max-w-[95%] mb-6 font-lora">
                                                    {s.slogan}
                                                </p>
                                            </div>
                                            
                                            <div className="flex items-end justify-between relative z-10 mt-auto">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {s.hizmetler.slice(0, 2).map((h, i) => (
                                                        <span key={i} className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-background/50 border border-white/5 rounded-full text-muted-foreground-200">
                                                            {h}
                                                        </span>
                                                    ))}
                                                    {s.hizmetler.length > 2 && (
                                                        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-rust/10 border border-rust/30 rounded-full text-rust">
                                                            +{s.hizmetler.length - 2}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="w-8 h-8 rounded-full bg-rust/10 flex items-center justify-center text-rust opacity-0 group-hover:opacity-100 group-hover:bg-rust group-hover:text-white transition-all transform translate-x-4 group-hover:translate-x-0">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                                                </div>
                                            </div>
                                        </MotionLink>
                                    ))}
                                </div>
                            </motion.section>
                        )
                    })}
                </div>

                {/* CTA */}
                <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8">
                    <div className="bg-gradient-to-r from-rust/10 to-gold/5 border border-rust/20 rounded-3xl p-8 md:p-12">
                        <h2 className="text-2xl md:text-3xl font-syne font-extrabold mb-4 text-white">
                            Sektörünüzü Bulamadınız mı?
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                            AI asistanımız her sektöre uyum sağlar. Bize yazın, size özel çözüm üretelim.
                        </p>
                        <Link href="/iletisim" className="inline-flex items-center justify-center bg-rust hover:bg-rust-light text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg shadow-rust/20 text-lg">
                            📞 Bize Ulaşın
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    )
}
