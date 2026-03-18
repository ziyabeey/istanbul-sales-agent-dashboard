'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface HeroBannerProps {
  /** Business name */
  businessName: string
  /** Tagline / slogan */
  tagline?: string
  /** Background image URL */
  backgroundImage?: string
  /** Gradient overlay color (default: semi-transparent dark) */
  overlayColor?: string
  /** CTA button text */
  ctaText?: string
  /** CTA click handler */
  ctaHref?: string
  /** Accent color */
  accentColor?: string
  /** Content alignment */
  align?: 'left' | 'center'
  /** Display badge / tag above title */
  badge?: string
}

export function HeroBanner({
  businessName,
  tagline,
  backgroundImage,
  overlayColor = 'rgba(0,0,0,0.55)',
  ctaText = 'Randevu Al',
  ctaHref = '#randevu',
  accentColor = 'var(--site-primary)',
  align = 'center',
  badge,
}: HeroBannerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Parallax: image moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const alignClass = align === 'left' ? 'items-start text-left' : 'items-center text-center'

  return (
    <section
      ref={ref}
      className="relative h-[90vh] min-h-[500px] max-h-[800px] overflow-hidden"
    >
      {/* Background with parallax */}
      {backgroundImage ? (
        <motion.div
          style={{ y }}
          className="absolute inset-0 scale-110"
        >
          <img
            src={backgroundImage}
            alt={businessName}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--site-secondary)] to-[var(--site-text)]" />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: overlayColor }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className={`relative z-10 h-full flex flex-col justify-center ${alignClass} px-6 max-w-4xl mx-auto`}
      >
        {badge && (
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs font-bold uppercase tracking-widest text-white/70 mb-4 px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm"
          >
            {badge}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight font-syne drop-shadow-lg"
        >
          {businessName}
        </motion.h1>

        {tagline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-white/80 mt-4 max-w-xl"
          >
            {tagline}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex gap-4"
        >
          <a
            href={ctaHref}
            className="px-8 py-3.5 rounded-xl text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            style={{ backgroundColor: accentColor }}
          >
            {ctaText}
          </a>
          <a
            href="#hakkimizda"
            className="px-8 py-3.5 rounded-xl text-white font-medium text-sm border border-white/30 backdrop-blur-sm hover:bg-white/10 transition-all"
          >
            Hakkımızda
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  )
}
