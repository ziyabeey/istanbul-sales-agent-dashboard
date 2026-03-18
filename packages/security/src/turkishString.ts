/**
 * @kepenk/security — Turkish İ/ı String Utilities
 *
 * JavaScript İ/ı problemi:
 *   "INTEGER".toLowerCase() → "ınteger" (tr locale)
 *   "istanbul".toUpperCase() → "İSTANBUL" (tr, correct)
 *
 * RULE: Programmatic comparison → toLocaleLowerCase('en')
 *       UI display → toLocaleLowerCase('tr-TR')
 */

/** Programmatic comparison — locale-independent */
export function normalizeForComparison(str: string): string {
  return str.toLocaleLowerCase('en').trim()
}

/** UI display — Turkish locale */
export function turkishLower(str: string): string {
  return str.toLocaleLowerCase('tr-TR')
}

export function turkishUpper(str: string): string {
  return str.toLocaleUpperCase('tr-TR')
}

const TR_CHAR_MAP: Record<string, string> = {
  'ç': 'c', 'Ç': 'C', 'ğ': 'g', 'Ğ': 'G', 'ı': 'i', 'İ': 'I',
  'ö': 'o', 'Ö': 'O', 'ş': 's', 'Ş': 'S', 'ü': 'u', 'Ü': 'U',
}

/** Generate URL-safe slug from Turkish text */
export function toSlug(str: string): string {
  return str
    .split('')
    .map(char => TR_CHAR_MAP[char] || char)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Turkish-aware search — handles İ/ı correctly */
export function turkishSearch(haystack: string, needle: string): boolean {
  return haystack.toLocaleLowerCase('tr-TR').includes(needle.toLocaleLowerCase('tr-TR'))
}
