/**
 * @kepenk/templates — P0 Theme Definitions: Type + Helper
 *
 * Compact theme definition type for all P0 themes.
 * Full ThemeConfig is generated at build/runtime from these definitions.
 */

import type { ThemeConfig } from '../types/section-types'

/** Compact theme definition — core identity of a theme */
export interface P0ThemeDef {
  id: string
  name: string
  sectorId: string
  plan: 'free' | 'starter' | 'growth' | 'pro' | 'enterprise' | 'elite'
  description: string
  designPhilosophy: string
  isDark: boolean
  fonts: {
    heading: { family: string; weights: number[] }
    body: { family: string; weights: number[] }
  }
  cssOverrides: Record<string, string>
  /** Section IDs in order for home page */
  homeSections: string[]
  /** Additional pages beyond home */
  pages: string[]
  /** Sector-specific section types used */
  sectorSections: string[]
  /** Animation level description */
  animationLevel: string
  /** Demo business key in P0_DEMO_BUSINESSES */
  demoBusinessKey: string
}

/**
 * Merge base CSS variables with theme overrides
 */
// Plan-based layout tokens for visual differentiation between tiers
const PLAN_LAYOUT_TOKENS: Record<string, Record<string, string>> = {
  free:       { '--container-default': '640px',  '--section-py': '48px', '--radius-md': '4px',  '--radius-lg': '8px' },
  starter:    { '--container-default': '960px',  '--section-py': '64px', '--radius-md': '8px',  '--radius-lg': '12px' },
  growth:     { '--container-default': '1120px', '--section-py': '80px', '--radius-md': '12px', '--radius-lg': '16px' },
  pro:        { '--container-default': '1280px', '--section-py': '96px', '--radius-md': '4px',  '--radius-lg': '8px' },
  enterprise: { '--container-default': '1440px', '--section-py': '64px', '--radius-md': '0px',  '--radius-lg': '4px' },
}

export function buildCssVariables(overrides: Record<string, string>, isDark: boolean, plan?: string): Record<string, string> {
  const lightBase: Record<string, string> = {
    '--color-bg': '#FFFFFF',
    '--color-surface': '#F8F7F5',
    '--color-surface-elevated': '#FFFFFF',
    '--color-surface-muted': '#F3F4F6',
    '--color-text': '#1A1A1A',
    '--color-text-secondary': '#6B7280',
    '--color-text-muted': '#9CA3AF',
    '--color-text-on-accent': '#FFFFFF',
    '--color-text-on-dark': '#F5F5F5',
    '--color-accent': '#1A1A1A',
    '--color-accent-hover': '#374151',
    '--color-accent-active': '#111827',
    '--color-accent-light': '#F3F4F6',
    '--color-accent-subtle': '#F9FAFB',
    '--color-border': '#E5E7EB',
    '--color-border-subtle': '#F3F4F6',
    '--color-border-strong': '#D1D5DB',
    '--color-overlay-light': 'rgba(0,0,0,0.3)',
    '--color-overlay-medium': 'rgba(0,0,0,0.5)',
    '--color-overlay-dark': 'rgba(0,0,0,0.7)',
    '--radius-md': '8px',
    '--radius-lg': '12px',
    '--section-py': '64px',
    '--container-default': '960px',
  }

  const darkBase: Record<string, string> = {
    ...lightBase,
    '--color-bg': '#0A0A0A',
    '--color-surface': '#141414',
    '--color-surface-elevated': '#1E1E1E',
    '--color-surface-muted': '#1A1A1A',
    '--color-text': '#FAFAFA',
    '--color-text-secondary': '#A1A1AA',
    '--color-text-muted': '#71717A',
    '--color-text-on-dark': '#FAFAFA',
    '--color-accent-light': '#1E1E1E',
    '--color-accent-subtle': '#141414',
    '--color-border': '#2A2A2A',
    '--color-border-subtle': '#1E1E1E',
    '--color-border-strong': '#3F3F46',
    '--color-overlay-medium': 'rgba(0,0,0,0.6)',
  }

  const base = isDark ? darkBase : lightBase
  const planTokens = plan ? (PLAN_LAYOUT_TOKENS[plan] ?? {}) : {}

  // Merge order: base → plan defaults → per-theme overrides
  return { ...base, ...planTokens, ...overrides }
}

/** All P0 theme definitions — imported from sector files */
export { BERBER_THEMES } from './p0-berber'
export { RESTORAN_THEMES } from './p0-restoran'
export { DOKTOR_THEMES } from './p0-doktor'
export { GUZELLIK_THEMES } from './p0-guzellik'
export { AVUKAT_THEMES } from './p0-avukat'
export { DISCI_THEMES } from './p0-disci'
export { OTO_THEMES } from './p0-oto'
export { SPOR_THEMES } from './p0-spor'
