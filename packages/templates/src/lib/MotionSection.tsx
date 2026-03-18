/**
 * @kepenk/templates — MotionSection Wrapper
 *
 * Scroll-triggered animation wrapper for sections.
 * Uses IntersectionObserver via Framer Motion useInView.
 */

'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { ANIMATION_MAP } from './animation-presets'
import type { AnimationPreset } from '../types/section-types'

interface MotionSectionProps {
  children: ReactNode
  animation?: AnimationPreset
  className?: string
  /** Viewport threshold to trigger (0-1) */
  threshold?: number
  /** Trigger once or every time */
  once?: boolean
  /** Additional delay (seconds) */
  delay?: number
  /** HTML tag */
  as?: 'section' | 'div' | 'article' | 'aside'
}

export function MotionSection({
  children,
  animation = 'fadeUp',
  className,
  threshold = 0.2,
  once = true,
  delay = 0,
  as = 'section',
}: MotionSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: threshold, once })

  const Component = motion[as]
  const variants = ANIMATION_MAP[animation]

  return (
    <Component
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={delay > 0 ? { delay } : undefined}
      className={className}
    >
      {children}
    </Component>
  )
}
