'use client'
import { SEKTORLER } from '@/data/sektorler'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function SectorCarousel() {
    return (
        <section className="py-24 border-y border-white/5 overflow-hidden relative">
            {/* Background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-rust/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center relative z-10">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-syne font-extrabold text-white mb-4"
                >
                    Sektörünüze Özel <span className="text-transparent bg-clip-text bg-gradient-to-r from-rust to-orange-400">Yapay Zeka</span>
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-muted-foreground-300 text-lg max-w-2xl mx-auto"
                >
                    Tam 25 farklı yerel B2B ve B2C pazarının dilinden anlayan, size özel otonom çalışma arkadaşları.
                </motion.p>
            </div>

            {/* Hide scrollbar with pseudo elements but keep scrollability */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

            <div className="relative z-10">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

                <div className="flex overflow-x-auto gap-6 px-8 sm:px-12 lg:px-32 py-8 snap-x snap-mandatory hide-scroll scroll-smooth">
                    {SEKTORLER.map((sektor, i) => {
                        const MotionLink = motion.create(Link);
                        
                        return (
                            <MotionLink
                                key={sektor.id}
                                href={`/sektorler/${sektor.id}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: (i % 5) * 0.1, duration: 0.4 }}
                                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
                                className="snap-center shrink-0 w-[280px] sm:w-[320px] bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] hover:bg-white/[0.08] hover:border-rust/40 transition-all group flex flex-col justify-between relative overflow-hidden shadow-xl"
                            >
                                {/* Subtle internal gradient on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-rust/0 to-rust/0 group-hover:from-rust/10 group-hover:to-transparent transition-colors duration-500 pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="text-4xl mb-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(220,70,30,0.3)] transition-all duration-300">
                                        {sektor.emoji}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 font-syne group-hover:text-rust transition-colors">{sektor.ad}</h3>
                                    <p className="text-sm text-muted-foreground-300 leading-relaxed mb-8 line-clamp-3 font-lora">
                                        {sektor.altBaslik || `${sektor.ad} sektörü için 7/24 randevu kapan ve fiyat veren kurumsal asistan.`}
                                    </p>
                                </div>
                                
                                <span className="relative z-10 text-rust text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                                    Sektörü İncele <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </span>
                            </MotionLink>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
