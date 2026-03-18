/**
 * @kepenk/editor — Code Injection Types & Validator
 */

export interface CodeInjectionConfig {
  head: string
  bodyStart: string
  bodyEnd: string
  customCSS: string
}

export interface ValidationResult {
  valid: boolean
  errors: string[]
}

const MAX_HEAD = 10 * 1024
const MAX_BODY = 10 * 1024
const MAX_CSS = 50 * 1024

/**
 * Validates injected code for security and size constraints.
 */
export function validateInjectedCode(
  code: string,
  type: 'head' | 'body' | 'css'
): ValidationResult {
  const errors: string[] = []

  // eval/Function check
  if (/\beval\s*\(/.test(code) || /\bnew\s+Function\s*\(/.test(code)) {
    errors.push('eval() ve new Function() kullanımı güvenlik nedeniyle engellenmiştir.')
  }

  // HTTP (insecure) source check
  if (/src\s*=\s*["']http:\/\//.test(code)) {
    errors.push('Sadece HTTPS kaynaklar yüklenebilir. http:// yerine https:// kullanın.')
  }

  // Size check
  const maxSize = type === 'css' ? MAX_CSS : type === 'head' ? MAX_HEAD : MAX_BODY
  const sizeLabel = type === 'css' ? '50KB' : '10KB'
  if (new TextEncoder().encode(code).length > maxSize) {
    errors.push(`Kod boyutu ${sizeLabel} limitini aşıyor.`)
  }

  return { valid: errors.length === 0, errors }
}

/**
 * Sanitize code by removing dangerous patterns while keeping the rest.
 */
export function sanitizeCode(code: string): string {
  return code
    .replace(/\beval\s*\(/g, '/* eval blocked */(')
    .replace(/\bnew\s+Function\s*\(/g, '/* Function blocked */(')
}

export const DEFAULT_INJECTION: CodeInjectionConfig = {
  head: '',
  bodyStart: '',
  bodyEnd: '',
  customCSS: '',
}
