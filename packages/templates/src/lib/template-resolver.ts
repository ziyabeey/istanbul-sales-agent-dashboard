/**
 * @kepenk/templates — Template Variable Resolver
 *
 * Resolves {{placeholder}} template variables with business data.
 * Supports nested paths: {{socialMedia.instagram}}
 * Supports format suffixes: {{phone:formatted}}, {{phone:tel}}, {{phone:whatsapp}}
 */

import type { BusinessData } from '../types/section-types'

export function resolveTemplateVars(
  content: Record<string, unknown>,
  business: BusinessData,
): Record<string, unknown> {
  const serialized = JSON.stringify(content)

  const resolved = serialized.replace(
    /\{\{([^}]+)\}\}/g,
    (_match, path: string) => {
      const [fieldPath, format] = path.split(':')
      const value = getNestedValue(business, fieldPath.trim())

      if (value === undefined || value === null) return ''

      if (format === 'formatted' && typeof value === 'string') {
        return formatPhoneNumber(value)
      }
      if (format === 'whatsapp' && typeof value === 'string') {
        return `https://wa.me/${value.replace(/\D/g, '')}`
      }
      if (format === 'tel' && typeof value === 'string') {
        return `tel:+${value.replace(/\D/g, '')}`
      }
      if (format === 'mailto' && typeof value === 'string') {
        return `mailto:${value}`
      }

      return String(value)
    },
  )

  return JSON.parse(resolved)
}

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((current, key) => {
    if (current && typeof current === 'object') {
      return (current as Record<string, unknown>)[key]
    }
    return undefined
  }, obj)
}

function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('90') && digits.length === 12) {
    return `0${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10)}`
  }
  return phone
}
