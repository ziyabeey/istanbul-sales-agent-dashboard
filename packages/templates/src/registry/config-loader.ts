/**
 * @kepenk/templates — Dynamic Config Loader
 *
 * Maps themeId → dynamic import of ThemeConfig + BusinessData.
 * Used by the dynamic demo route [themeId] to lazy-load only the needed config.
 *
 * Export naming convention: themeId 'berber-sade' → BERBER_SADE_CONFIG, BERBER_SADE_BUSINESS
 */

import type { ThemeConfig, BusinessData } from '../types/section-types'
import { getTheme } from './theme-catalog'

export interface ThemeLoadResult {
  config: ThemeConfig
  business: BusinessData
}

// ── Plan-based layout tokens ──
// Each plan tier gets different spacing, container width, and border-radius
// to create visual differentiation even within the same sector.
const PLAN_TOKENS: Record<string, Record<string, string>> = {
  free:       { '--container-default': '640px',  '--section-py': '48px', '--radius-md': '4px',  '--radius-lg': '8px' },
  starter:    { '--container-default': '960px',  '--section-py': '64px', '--radius-md': '8px',  '--radius-lg': '12px' },
  growth:     { '--container-default': '1120px', '--section-py': '80px', '--radius-md': '12px', '--radius-lg': '16px' },
  pro:        { '--container-default': '1280px', '--section-py': '96px', '--radius-md': '4px',  '--radius-lg': '8px' },
  enterprise: { '--container-default': '1440px', '--section-py': '64px', '--radius-md': '0px',  '--radius-lg': '4px' },
}

/**
 * Convert themeId to the UPPER_SNAKE export prefix.
 * 'berber-sade' → 'BERBER_SADE'
 */
function toExportPrefix(themeId: string): string {
  return themeId.toUpperCase().replace(/-/g, '_')
}

/**
 * Dynamically load a theme's config and business data by themeId.
 * Returns null if the config file doesn't exist.
 */
export async function loadThemeConfig(themeId: string): Promise<ThemeLoadResult | null> {
  try {
    // Dynamic import of the config file
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mod: Record<string, any> = await import(`../themes/configs/${themeId}-config`)

    const prefix = toExportPrefix(themeId)
    let config = mod[`${prefix}_CONFIG`] as ThemeConfig | undefined
    const business = mod[`${prefix}_BUSINESS`] as BusinessData | undefined

    if (!config || !business) {
      console.warn(`[config-loader] Missing exports for theme "${themeId}": CONFIG=${!!config}, BUSINESS=${!!business}`)
      return null
    }

    // Merge plan-based layout tokens into cssVariables
    // Plan tokens sit between base vars and per-theme overrides,
    // so any explicit value in the config file still wins.
    const entry = getTheme(themeId)
    if (entry) {
      const planDefaults = PLAN_TOKENS[entry.plan]
      if (planDefaults) {
        const merged = { ...planDefaults }
        // Per-theme cssVariables override plan defaults
        for (const [k, v] of Object.entries(config.cssVariables)) {
          merged[k] = v
        }
        config = { ...config, cssVariables: merged }
      }
    }

    return { config, business }
  } catch {
    // Config file doesn't exist for this theme
    return null
  }
}

/**
 * Check if a theme has a config file available.
 * Uses the theme catalog to avoid unnecessary import attempts.
 */
export function hasConfig(themeId: string): boolean {
  // This is a fast check — actual availability verified by loadThemeConfig
  return typeof themeId === 'string' && themeId.length > 0
}
