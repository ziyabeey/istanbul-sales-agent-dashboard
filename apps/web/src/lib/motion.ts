/**
 * Kepenk.ai — Paylaşılan Animasyon Varyantları
 *
 * Framer Motion animasyonları için merkezi tanımlar.
 * Master Prompt §6.1'den alınmıştır.
 *
 * Kullanım:
 *   import { pageTransition, staggerContainer, staggerItem } from '@/lib/motion'
 *   <motion.div {...pageTransition}>...</motion.div>
 */

import type { Variants, Transition } from 'framer-motion'

/* ─────────────── Sayfa Geçişleri ─────────────── */

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } as Transition,
}

/* ─────────────── Liste Stagger ─────────────── */

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

/* ─────────────── Modal / Dialog ─────────────── */

export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', damping: 25, stiffness: 300 },
  },
}

/* ─────────────── Drawer (sağdan) ─────────────── */

export const drawerSlide: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring', damping: 30, stiffness: 300 },
  },
}

/* ─────────────── Toast (alttan) ─────────────── */

export const toastSlide: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

/* ─────────────── Tab İçerik ─────────────── */

export const tabContent: Variants = {
  hidden: { opacity: 0, x: 10 },
  visible: { opacity: 1, x: 0 },
}

/* ─────────────── Dropdown ─────────────── */

export const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

/* ─────────────── Skeleton Pulse ─────────────── */

export const skeletonPulse = {
  animate: { opacity: [0.4, 0.7, 0.4] },
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
}

/* ─────────────── AI Glow ─────────────── */

export const aiGlow = {
  animate: {
    boxShadow: [
      '0 0 15px rgba(139, 92, 246, 0.2)',
      '0 0 30px rgba(139, 92, 246, 0.4)',
      '0 0 15px rgba(139, 92, 246, 0.2)',
    ],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
}

/* ─────────────── FadeIn Scale ─────────────── */

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
}

/* ─────────────── Slide Up ─────────────── */

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
}
