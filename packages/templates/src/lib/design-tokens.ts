/**
 * @kepenk/templates — Design Tokens (CSS Custom Properties)
 *
 * Default design token values. Each theme overrides these via ThemeConfig.cssVariables.
 * Components use ONLY these variables — never hard-coded colors.
 */

export const DEFAULT_CSS_VARIABLES: Record<string, string> = {
  // ─── Colors: Backgrounds ───
  '--color-bg': '#FFFFFF',
  '--color-surface': '#F8F7F5',
  '--color-surface-elevated': '#FFFFFF',
  '--color-surface-muted': '#F3F4F6',

  // ─── Colors: Text ───
  '--color-text': '#1A1A1A',
  '--color-text-secondary': '#6B7280',
  '--color-text-muted': '#9CA3AF',
  '--color-text-on-accent': '#FFFFFF',
  '--color-text-on-dark': '#F5F5F5',

  // ─── Colors: Accent ───
  '--color-accent': '#1A1A2E',
  '--color-accent-hover': '#2D2B55',
  '--color-accent-active': '#1A1A1A',
  '--color-accent-light': '#E8E8F0',
  '--color-accent-subtle': '#F0F0F8',

  // ─── Colors: Border ───
  '--color-border': '#E5E7EB',
  '--color-border-subtle': '#F3F4F6',
  '--color-border-strong': '#D1D5DB',

  // ─── Colors: Status ───
  '--color-success': '#22C55E',
  '--color-success-light': '#DCFCE7',
  '--color-warning': '#F59E0B',
  '--color-warning-light': '#FEF3C7',
  '--color-error': '#EF4444',
  '--color-error-light': '#FEE2E2',
  '--color-emergency': '#DC2626',

  // ─── Colors: Overlay ───
  '--color-overlay-light': 'rgba(0, 0, 0, 0.3)',
  '--color-overlay-medium': 'rgba(0, 0, 0, 0.5)',
  '--color-overlay-dark': 'rgba(0, 0, 0, 0.7)',

  // ─── Typography ───
  '--font-heading': "'Inter', system-ui, sans-serif",
  '--font-body': "'Inter', system-ui, sans-serif",
  '--font-mono': "'JetBrains Mono', ui-monospace, monospace",

  '--font-weight-normal': '400',
  '--font-weight-medium': '500',
  '--font-weight-semibold': '600',
  '--font-weight-bold': '700',
  '--font-weight-extrabold': '800',

  '--text-xs': '0.75rem',
  '--text-sm': '0.875rem',
  '--text-base': '1rem',
  '--text-lg': '1.125rem',
  '--text-xl': '1.25rem',
  '--text-2xl': '1.5rem',
  '--text-3xl': '1.875rem',
  '--text-4xl': '2.25rem',
  '--text-5xl': '3rem',
  '--text-6xl': '3.75rem',
  '--text-7xl': '4.5rem',

  '--leading-tight': '1.1',
  '--leading-snug': '1.3',
  '--leading-normal': '1.5',
  '--leading-relaxed': '1.75',

  '--tracking-tight': '-0.02em',
  '--tracking-normal': '0',
  '--tracking-wide': '0.05em',
  '--tracking-wider': '0.1em',

  // ─── Spacing ───
  '--section-py': '64px',
  '--section-py-md': '80px',
  '--section-py-lg': '96px',
  '--section-py-xl': '120px',

  '--container-xs': '480px',
  '--container-sm': '640px',
  '--container-md': '768px',
  '--container-default': '1024px',
  '--container-lg': '1280px',
  '--container-xl': '1440px',
  '--container-full': '100%',

  '--gap-xs': '8px',
  '--gap-sm': '12px',
  '--gap-md': '16px',
  '--gap-lg': '24px',
  '--gap-xl': '32px',
  '--gap-2xl': '48px',
  '--gap-3xl': '64px',

  // ─── Border Radius ───
  '--radius-none': '0',
  '--radius-sm': '4px',
  '--radius-md': '8px',
  '--radius-lg': '12px',
  '--radius-xl': '16px',
  '--radius-2xl': '24px',
  '--radius-full': '9999px',

  // ─── Shadows ───
  '--shadow-xs': '0 1px 2px rgba(0,0,0,0.04)',
  '--shadow-sm': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
  '--shadow-md': '0 4px 6px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.03)',
  '--shadow-lg': '0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.04)',
  '--shadow-xl': '0 20px 25px rgba(0,0,0,0.1), 0 8px 10px rgba(0,0,0,0.04)',
  '--shadow-2xl': '0 25px 50px rgba(0,0,0,0.15)',
  '--shadow-inner': 'inset 0 2px 4px rgba(0,0,0,0.05)',

  // ─── Transitions ───
  '--transition-fast': '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  '--transition-normal': '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  '--transition-slow': '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  '--transition-spring': '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',

  // ─── Z-Index ───
  '--z-base': '0',
  '--z-dropdown': '10',
  '--z-sticky': '20',
  '--z-overlay': '30',
  '--z-modal': '40',
  '--z-popover': '50',
  '--z-toast': '60',
  '--z-whatsapp': '70',
  '--z-cookie': '80',
}

/** Padding map for SectionSettings.paddingY */
export const PADDING_Y_MAP: Record<string, string> = {
  none: '0',
  xs: '32px',
  sm: '48px',
  md: '64px',
  lg: '80px',
  xl: '96px',
}

/** Container width map for SectionSettings.containerWidth */
export const CONTAINER_WIDTH_MAP: Record<string, string> = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  default: '1024px',
  lg: '1280px',
  xl: '1440px',
  full: '100%',
}
