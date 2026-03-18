/**
 * @kepenk/templates — Section Registry
 *
 * Maps (sectionType, variant) → React component.
 * Components are lazy-loaded per section type.
 */

import type { ComponentType } from 'react'
import type { SectionType, SectionProps } from '../types/section-types'

type SectionComponent = ComponentType<SectionProps<Record<string, unknown>>>

/** Registry: nested map of type → variant → component */
const registry = new Map<string, Map<string, SectionComponent>>()

/**
 * Register a section component for a given type and variant.
 * Called by each section module during initialization.
 */
export function registerSection(
  type: SectionType,
  variant: string,
  component: SectionComponent,
): void {
  if (!registry.has(type)) {
    registry.set(type, new Map())
  }
  registry.get(type)!.set(variant, component)
}

/**
 * Resolve a section component by type and variant.
 * Falls back to 'default' variant if specified variant not found.
 */
export function resolveSection(
  type: SectionType,
  variant: string,
): SectionComponent | null {
  const typeMap = registry.get(type)
  if (!typeMap) return null

  return typeMap.get(variant) ?? typeMap.get('default') ?? null
}

/**
 * Get all registered variants for a section type.
 */
export function getVariants(type: SectionType): string[] {
  const typeMap = registry.get(type)
  if (!typeMap) return []
  return Array.from(typeMap.keys())
}

/**
 * Get all registered section types.
 */
export function getRegisteredTypes(): SectionType[] {
  return Array.from(registry.keys()) as SectionType[]
}
