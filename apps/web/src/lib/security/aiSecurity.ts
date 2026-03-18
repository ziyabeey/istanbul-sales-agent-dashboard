/**
 * AI Security — Prompt injection prevention + PII filtering
 * ───────────────────────────────────────────────────────────
 * Applies to ALL 17 AI agents
 */

/* ═══════ Prompt Injection Prevention ═══════ */

const INJECTION_PATTERNS = [
  /ignore\s+(previous|above|all)\s+(instructions?|prompts?)/i,
  /disregard\s+(previous|above|all)/i,
  /forget\s+(everything|what|your)/i,
  /you\s+are\s+now\s+(a|an)/i,
  /system\s*:\s*/i,
  /\[SYSTEM\]/i,
  /\[INST\]/i,
  /<<SYS>>/i,
  /new\s+instructions?:/i,
  /override\s+(system|instructions?)/i,
  /act\s+as\s+(if\s+you|a\s+different)/i,
  /pretend\s+(you\s+are|to\s+be)/i,
  /jailbreak/i,
  /DAN\s+mode/i,
]

export function detectPromptInjection(input: string): { isSuspicious: boolean; matchedPattern?: string } {
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(input)) {
      return { isSuspicious: true, matchedPattern: pattern.source }
    }
  }
  return { isSuspicious: false }
}

/** Sanitize user input before sending to AI model */
export function sanitizeAIInput(userInput: string, maxLength: number = 2000): string {
  return userInput
    .slice(0, maxLength)
    .replace(/```/g, '')       // Remove code block markers that could confuse context
    .replace(/---/g, '')       // Remove horizontal rule markers
    .trim()
}

/* ═══════ PII Filtering — Before sending to AI ═══════ */

const PII_PATTERNS: { name: string; pattern: RegExp; replacement: string }[] = [
  { name: 'tc_kimlik',  pattern: /\b\d{11}\b/g,                         replacement: '[TC_KIMLIK]' },
  { name: 'iban',        pattern: /TR\s?\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{2}/gi, replacement: '[IBAN]' },
  { name: 'card_number', pattern: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, replacement: '[KART_NO]' },
  { name: 'cvv',         pattern: /\bCVV\s*:?\s*\d{3,4}\b/gi,           replacement: '[CVV]' },
  { name: 'email',       pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, replacement: '[EMAIL]' },
  { name: 'phone',       pattern: /\+?90\s?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}/g, replacement: '[TELEFON]' },
  { name: 'password',    pattern: /(?:şifre|password|parola)\s*:?\s*\S+/gi, replacement: '[ŞİFRE]' },
]

/** Remove PII from text before sending to AI */
export function stripPIIForAI(text: string): { cleaned: string; strippedFields: string[] } {
  let cleaned = text
  const strippedFields: string[] = []

  for (const { name, pattern, replacement } of PII_PATTERNS) {
    if (pattern.test(cleaned)) {
      strippedFields.push(name)
      cleaned = cleaned.replace(pattern, replacement)
    }
    // Reset regex lastIndex for global patterns
    pattern.lastIndex = 0
  }

  return { cleaned, strippedFields }
}

/** Check AI output for PII leakage */
export function checkOutputForPII(aiOutput: string): { hasPII: boolean; maskedOutput: string } {
  let masked = aiOutput
  let hasPII = false

  for (const { pattern, replacement } of PII_PATTERNS) {
    if (pattern.test(masked)) {
      hasPII = true
      masked = masked.replace(pattern, replacement)
    }
    pattern.lastIndex = 0
  }

  return { hasPII, maskedOutput: masked }
}

/* ═══════ AI Cost Control ═══════ */

export const AI_COST_LIMITS = {
  maxDailySpendTRY: 50,
  maxTokensPerRequest: {
    haiku: 4096,
    sonnet: 8192,
    opus: 16384,
  },
  rateLimitPerHour: {
    haiku: 100,
    sonnet: 30,
    opus: 5,     // Opus: max 5/day actually
  },
} as const

/** Build safe AI message array — NEVER interpolate user input into system prompt */
export function buildSafePrompt(
  systemPrompt: string,
  userMessage: string,
): { role: string; content: string }[] {
  // CORRECT: Separate messages array
  // WRONG: `${systemPrompt} User said: ${userMessage}` ← NEVER DO THIS
  const sanitized = sanitizeAIInput(userMessage)
  const { cleaned } = stripPIIForAI(sanitized)

  return [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: cleaned },
  ]
}
