/**
 * @kepenk/templates — Animation Presets (Framer Motion)
 *
 * Shared animation variants used across all themes.
 * Plan-based animation budgets enforced by ThemeRenderer.
 */

import type { Variants, Transition } from 'framer-motion'
import type { AnimationPreset } from '../types/section-types'

/** Smooth easeOutQuint — most section entries */
export const EASE_OUT: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
}

/** Spring — buttons, cards */
export const SPRING: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
}

// ─── Section Entry Animations ───

/** Bottom fade-in — most common section entry */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: EASE_OUT },
}

/** Left slide-in */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: EASE_OUT },
}

/** Right slide-in */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: EASE_OUT },
}

/** Simple fade */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
}

/** Scale-up — cards, images */
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: EASE_OUT },
}

// ─── Stagger Container ───

/** Sequential children animation — grid cards */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

/** Stagger child — use with staggerContainer */
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

// ─── Animation Map ───

export const ANIMATION_MAP: Record<AnimationPreset, Variants> = {
  none: { hidden: {}, visible: {} },
  fadeUp,
  fadeIn,
  slideLeft,
  slideRight,
  scaleUp,
  stagger: staggerContainer,
}
