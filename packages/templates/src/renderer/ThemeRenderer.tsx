/**
 * @kepenk/templates — ThemeRenderer Pipeline
 *
 * Renders a full page from ThemeConfig + PageConfig + BusinessData.
 * Handles: CSS variable injection, global sections, animation wrapping, editor mode.
 */

'use client'

import { resolveSection } from '../registry/section-registry'
import { resolveTemplateVars } from '../lib/template-resolver'
import { MotionSection } from '../lib/MotionSection'
import { BlockRenderer } from './BlockRenderer'
import type {
  ThemeConfig,
  PageConfig,
  SectionConfig,
  SectionType,
  BusinessData,
  SectionProps,
} from '../types/section-types'

interface ThemeRendererProps {
  theme: ThemeConfig
  page: PageConfig
  business: BusinessData
  isEditing?: boolean
  onSectionContentChange?: (sectionId: string, path: string, value: unknown) => void
}

export function ThemeRenderer({
  theme,
  page,
  business,
  isEditing,
  onSectionContentChange,
}: ThemeRendererProps) {

  function resolveVariant(config: SectionConfig, plan: string): string {
    if (config.variant === 'auto') return `plan_${plan}`
    return config.variant
  }

  function renderSection(config: SectionConfig) {
    const defaultSettings = {
      bgMode: 'default' as const,
      paddingY: 'md' as const,
      containerWidth: 'default' as const,
      visible: true,
      order: 0,
      removable: false,
      animation: 'fadeUp' as const,
    }
    const mergedSettings = { ...defaultSettings, ...config.settings }

    const effectiveVariant = resolveVariant(config, theme.plan)
    // Theme Engine V2: AST Support
    if (config.blockTree) {
      const astContent = (
        <BlockRenderer 
          node={config.blockTree} 
          business={business} 
          isEditMode={isEditing}
        />
      )
      
      const activeAnimation = mergedSettings.animation === 'none' ? 'fadeUp' : (mergedSettings.animation ?? 'fadeUp')
      if (!isEditing) {
        return (
          <MotionSection
            key={config.id}
            animation={activeAnimation}
            as={config.type === 'header' || config.type === 'footer' ? 'div' : 'section'}
          >
            {astContent}
          </MotionSection>
        )
      }
      return <div key={config.id}>{astContent}</div>
    }

    // Theme Engine V1: Legacy Components
    const Component = resolveSection(config.type as SectionType, effectiveVariant)
    if (!Component) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Section bulunamadı: ${config.type}::${effectiveVariant}`)
      }
      return null
    }

    const resolvedContent = resolveTemplateVars(config.defaultContent ?? {}, business)

    const sectionProps: SectionProps = {
      content: resolvedContent,
      business,
      isEditing,
      onContentChange: onSectionContentChange
        ? (path, val) => onSectionContentChange(config.id, path, val)
        : undefined,
      settings: mergedSettings,
    }

    // Animation wrapper (disabled in editor mode to avoid layout issues)
    const activeAnimation = mergedSettings.animation === 'none' ? 'fadeUp' : (mergedSettings.animation ?? 'fadeUp')
    if (!isEditing) {
      return (
        <MotionSection
          key={config.id}
          animation={activeAnimation}
          as={config.type === 'header' || config.type === 'footer' ? 'div' : 'section'}
        >
          <Component {...sectionProps} />
        </MotionSection>
      )
    }

    return <Component key={config.id} {...sectionProps} />
  }

  // Global sections by position
  const topGlobals = (theme.globalSections || []).filter(s => s.position === 'top' && s.settings?.visible !== false)
  const bottomGlobals = (theme.globalSections || []).filter(s => s.position === 'bottom' && s.settings?.visible !== false)
  const floatingGlobals = (theme.globalSections || []).filter(s => s.position === 'floating' && s.settings?.visible !== false)

  // Page sections sorted and filtered
  const pageSections = (page.sections || [])
    .filter(s => s.settings?.visible !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  // Convert design tokens to CSS variables
  const tokenVars = theme.designTokens ? [
    ...Object.entries(theme.designTokens.spacing || {}).map(([k, v]) => `  --spacing-${k}: ${v};`),
    ...Object.entries(theme.designTokens.radius || {}).map(([k, v]) => `  --radius-${k}: ${v};`),
    ...Object.entries(theme.designTokens.shadows || {}).map(([k, v]) => `  --shadow-${k}: ${v};`),
    ...Object.entries(theme.designTokens.typography || {}).map(([k, v]) => `  --text-${k}: ${v};`),
  ].join('\n') : ''

  return (
    <>
      {/* CSS Custom Properties injection */}
      <style dangerouslySetInnerHTML={{
        __html: `:root {\n${Object.entries(theme.cssVariables)
          .map(([key, val]) => `  ${key}: ${val};`)
          .join('\n')}\n${tokenVars}\n}`,
      }} />

      {/* Demo Badge */}
      {!isEditing && (
        <div className="fixed bottom-6 left-6 z-[9999] flex items-center gap-4 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-2xl rounded-full px-5 py-3 transform transition-all hover:scale-105 group font-sans">
          <div className="flex relative h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-black/40 dark:text-white/40 leading-none mb-1">
              Kepenk Demo • {theme.plan} Paketi
            </span>
            <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 leading-none">
              {theme.name}
            </span>
          </div>
        </div>
      )}

      {/* Top globals (header) */}
      {topGlobals.map(renderSection)}

      {/* Page content */}
      <main>
        {pageSections.map(renderSection)}
      </main>

      {/* Bottom globals (footer) */}
      {bottomGlobals.map(renderSection)}

      {/* Floating globals (WhatsApp, cookie) */}
      {floatingGlobals.map(renderSection)}
    </>
  )
}
