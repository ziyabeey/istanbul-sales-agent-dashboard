'use client'
// @ts-nocheck
import React from 'react'
import type { SectionProps } from '../../types/section-types'
import { registerSection } from '../../registry/section-registry'
import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'

export function LastikciServices({ business, settings }: SectionProps<any>) {
 const IconComponent = (name: string) => {
 const Icon = (LucideIcons as any)[name] || LucideIcons.Star
 return <Icon className="w-8 h-8 stroke-1" />
 }

 return (
 <section className="py-24" style={{ backgroundColor: 'var(--color-bg)' }}>
 <div className="container-custom mx-auto px-4 text-center">
 <h2 className="text-4xl font-heading font-bold mb-12" style={{ color: 'var(--color-text)' }}>
 Hizmetlerimiz
 </h2>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {business?.services?.map((svc: any, i: number) => (
 <motion.div 
 key={i} 
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: i * 0.1 }}
 className="p-8 rounded-[var(--radius-lg)] border"
 style={{ 
 borderColor: 'var(--color-border)',
 backgroundColor: 'var(--color-surface)',
 color: 'var(--color-text)'
 }}
 >
 <div className="w-16 h-16 rounded-[var(--radius-md)] flex items-center justify-center mb-6 mx-auto"
 style={{ backgroundColor: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
 {IconComponent(svc.icon || 'Star')}
 </div>
 <h3 className="text-2xl font-bold mb-3">{svc.name}</h3>
 {svc.description && <p className="text-sm opacity-80 leading-relaxed mb-4">{svc.description}</p>}
 {svc.price && <div className="font-bold text-lg" style={{ color: 'var(--color-accent)' }}>{svc.price}</div>}
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 )
}

registerSection('services', 'lastikci_services', LastikciServices)
