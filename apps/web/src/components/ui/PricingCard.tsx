'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import Link from 'next/link'

interface PricingCardProps {
    tier: 'TEMEL' | 'STANDART' | 'BUYUME' | 'PREMIUM' | 'PREMIUMPLUS'
    title: string
    price: string
    description: string
    features: string[]
    isRecommended?: boolean
    primaryCtaText?: string
    delay?: number
}

export function PricingCard({ tier, title, price, description, features, isRecommended = false, primaryCtaText = "Ücretsiz Başla", delay = 0 }: PricingCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay }}
            className={`relative flex flex-col p-6 sm:p-8 rounded-3xl ${isRecommended ? 'bg-ink text-white border-2 border-rust ring-4 ring-rust/20 shadow-2xl shadow-rust/10 scale-105 z-10' : 'bg-white text-foreground border border-border-light/30 shadow-sm'} overflow-hidden h-full`}
        >
            {isRecommended && (
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-rust to-gold" />
            )}

            {isRecommended && (
                <div className="self-start mb-4 bg-rust/10 text-rust border border-rust/20 uppercase tracking-wider text-[10px] font-bold px-3 py-1 rounded-full">
                    BU SEKTÖRDE EN ÇOK TERCİH EDİLEN
                </div>
            )}

            {!isRecommended && (
                <div className="self-start mb-4 text-muted-foreground text-xs font-bold uppercase tracking-wider">
                    {tier}
                </div>
            )}

            <h3 className="text-2xl font-syne font-extrabold mb-2">{title}</h3>
            <p className={`text-sm mb-6 ${isRecommended ? 'text-muted-foreground' : 'text-muted-foreground'}`}>{description}</p>

            <div className="mb-6">
                <span className="text-4xl font-extrabold font-syne">{price}</span>
                <span className={`text-sm ${isRecommended ? 'text-muted-foreground' : 'text-muted-foreground'}`}> /ay</span>
            </div>

            <Link href="/kayit" className={`w-full py-4 text-center rounded-xl font-bold transition-all mb-8 ${isRecommended ? 'bg-rust hover:bg-rust-dark text-white shadow-lg' : 'bg-foreground hover:bg-foreground/90 text-white'}`}>
                {primaryCtaText}
            </Link>

            <div className="flex-1">
                <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${isRecommended ? 'text-muted-foreground' : 'text-muted-foreground-dark'}`}>
                    Paket İçeriği:
                </p>
                <ul className="flex flex-col gap-3">
                    {features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <span className={`shrink-0 mt-0.5 ${isRecommended ? 'text-rust' : 'text-sage'}`}>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                            </span>
                            <span className={`text-sm leading-tight ${isRecommended ? 'text-muted-foreground' : 'text-muted-foreground-dark'}`}>
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    )
}
