'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface BentoGridProps {
    children: ReactNode
    className?: string
}

export function BentoGrid({ children, className = '' }: BentoGridProps) {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ${className}`}>
            {children}
        </div>
    )
}

interface BentoCardProps {
    title: string
    description: string
    icon?: ReactNode
    header?: ReactNode
    className?: string
    index?: number
}

export function BentoCard({ title, description, icon, header, className = '', index = 0 }: BentoCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`row-span-1 rounded-3xl bg-white border border-foreground/10 p-6 flex flex-col justify-between overflow-hidden shadow-sm group hover:bg-foreground/5 transition-colors ${className}`}
        >
            {header && (
                <div className="mb-4 h-32 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-ink/50 to-transparent flex items-center justify-center relative">
                    {header}
                </div>
            )}

            <div className="flex flex-col gap-2 relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                {icon && (
                    <div className="w-10 h-10 rounded-full bg-rust/20 text-rust flex items-center justify-center mb-2">
                        {icon}
                    </div>
                )}
                <h3 className="text-xl font-syne font-bold text-foreground">
                    {title}
                </h3>
                <p className="text-muted-foreground/80 text-sm leading-relaxed">
                    {description}
                </p>
            </div>
        </motion.div>
    )
}
