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
import type {
  ThemeConfig,
  PageConfig,
  SectionConfig,
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

  function renderSection(config: SectionConfig) {
    const Component = resolveSection(config.type, config.variant)
    if (!Component) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Section bulunamadı: ${config.type}::${config.variant}`)
      }
      return null
    }

    const resolvedContent = resolveTemplateVars(config.defaultContent, business)

    const sectionProps: SectionProps = {
      content: resolvedContent,
      business,
      isEditing,
      onContentChange: onSectionContentChange
        ? (path, val) => onSectionContentChange(config.id, path, val)
        : undefined,
      settings: config.settings,
    }

    // Animation wrapper (disabled in editor mode to avoid layout issues)
    if (config.settings.animation !== 'none' && !isEditing) {
      return (
        <MotionSection
          key={config.id}
          animation={config.settings.animation}
          as={config.type === 'header' || config.type === 'footer' ? 'div' : 'section'}
        >
          <Component {...sectionProps} />
        </MotionSection>
      )
    }

    return <Component key={config.id} {...sectionProps} />
  }

  // Global sections by position
  const topGlobals = theme.globalSections.filter(s => s.position === 'top' && s.settings.visible)
  const bottomGlobals = theme.globalSections.filter(s => s.position === 'bottom' && s.settings.visible)
  const floatingGlobals = theme.globalSections.filter(s => s.position === 'floating' && s.settings.visible)

  // Page sections sorted and filtered
  const pageSections = page.sections
    .filter(s => s.settings.visible)
    .sort((a, b) => a.order - b.order)

  return (
    <>
      {/* CSS Custom Properties injection */}
      <style dangerouslySetInnerHTML={{
        __html: `:root {\n${Object.entries(theme.cssVariables)
          .map(([key, val]) => `  ${key}: ${val};`)
          .join('\n')}\n}`,
      }} />

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
