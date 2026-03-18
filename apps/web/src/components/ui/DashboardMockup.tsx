'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface DashboardMockupProps {
    children?: ReactNode
    title?: string
    delay?: number
}

export function DashboardMockup({ children, title = "kepenk.ai | İşletim Sistemi", delay = 0.2 }: DashboardMockupProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay, ease: 'easeOut' }}
            className="w-full max-w-4xl mx-auto rounded-xl sm:rounded-2xl border border-white/20 bg-background shadow-2xl overflow-hidden relative"
        >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-rust/20 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

            {/* macOS Window Header */}
            <div className="h-10 sm:h-12 bg-white/5 border-b border-white/10 flex items-center px-4 relative z-10">
                <div className="flex gap-1.5 sm:gap-2 absolute left-4">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex-1 flex justify-center">
                    <span className="text-muted-foreground/60 text-[10px] sm:text-xs font-medium tracking-wide">
                        {title}
                    </span>
                </div>
            </div>

            {/* Dashboard Body */}
            <div className="p-4 sm:p-6 lg:p-8 relative z-10 flex flex-col gap-4 sm:gap-6 bg-background/50 backdrop-blur-sm min-h-[300px]">
                {children ? children : (
                    // Default Mockup Content (If no children passed)
                    <>
                        {/* KPI Skeleton Header */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-24 sm:h-28 rounded-xl bg-white/5 border border-white/5 p-4 flex flex-col justify-between">
                                    <div className="w-8 h-8 rounded-lg bg-white/10" />
                                    <div>
                                        <div className="w-16 h-4 bg-white/20 rounded mb-2" />
                                        <div className="w-24 h-6 bg-white/40 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Main Content Area */}
                        <div className="flex-1 w-full rounded-xl bg-white/5 border border-white/5 p-4 flex gap-4 min-h-[200px]">
                            {/* Left Side (List) */}
                            <div className="w-1/3 flex flex-col gap-3 hidden sm:flex">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-full h-12 bg-white/5 rounded-lg" />
                                ))}
                            </div>
                            {/* Right Side (Chart Block) */}
                            <div className="flex-1 h-full bg-white/5 rounded-lg p-6 relative flex items-end">
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none" />
                                <div className="w-full h-full border-b border-l border-white/10 relative">
                                    <svg className="absolute w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                                        <motion.path
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            whileInView={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 1.5, delay: delay + 0.3 }}
                                            d="M0,80 Q10,60 20,70 T40,40 T60,50 T80,20 T100,10"
                                            fill="none"
                                            stroke="#10b981"
                                            strokeWidth="2"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    )
}
