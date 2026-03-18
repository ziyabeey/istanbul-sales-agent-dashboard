/**
 * @kepenk/editor — Content Merger for Module Swap
 * Merges old variant content into new variant schema.
 */

import type { ModuleSwapResult } from '../types/module-swap'

/**
 * Merges old content into new default content.
 * Matching fields are preserved, new fields get defaults,
 * removed fields generate warnings.
 */
export function mergeContent(
  oldContent: Record<string, unknown>,
  newDefaultContent: Record<string, unknown>
): ModuleSwapResult {
  const merged: Record<string, unknown> = { ...newDefaultContent }
  const warnings: string[] = []

  for (const [key, value] of Object.entries(oldContent)) {
    if (key in newDefaultContent) {
      // Field exists in both — check type compatibility
      if (typeof value === typeof newDefaultContent[key]) {
        merged[key] = value
      } else if (
        Array.isArray(value) && Array.isArray(newDefaultContent[key])
      ) {
        merged[key] = value
      } else {
        warnings.push(`"${key}" alanının tipi değişti — varsayılan değer kullanıldı`)
      }
    } else {
      warnings.push(`"${key}" alanı yeni tasarımda mevcut değil — kaldırıldı`)
    }
  }

  return { success: true, mergedContent: merged, warnings }
}

/**
 * Deep merge two objects, preferring source values.
 */
export function deepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>
): Record<string, unknown> {
  const result: Record<string, unknown> = { ...target }

  for (const [key, value] of Object.entries(source)) {
    if (
      value !== null &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      key in target &&
      typeof target[key] === 'object' &&
      target[key] !== null &&
      !Array.isArray(target[key])
    ) {
      result[key] = deepMerge(
        target[key] as Record<string, unknown>,
        value as Record<string, unknown>
      )
    } else {
      result[key] = value
    }
  }

  return result
}
