/**
 * @kepenk/security — Token Usage Tracker + Cost Estimation
 */

export interface TokenUsage {
  inputTokens: number
  outputTokens: number
  model: string
  feature: 'whatsapp' | 'ai_editor' | 'blog' | 'voice' | 'chatbot' | 'marketplace' | 'seo'
  tenantId: string
}

export interface TokenUsageSummary {
  totalInputTokens: number
  totalOutputTokens: number
  byFeature: Record<string, { input: number; output: number }>
  estimatedCostUSD: number
}

/** Model pricing per million tokens (USD) */
const MODEL_PRICING: Record<string, { input: number; output: number }> = {
  'claude-sonnet-4-20250514':  { input: 3.0,  output: 15.0 },
  'claude-haiku-4-5-20251001': { input: 0.25, output: 1.25 },
  'claude-opus-4-6':           { input: 15.0, output: 75.0 },
  'gpt-4o':                    { input: 2.5,  output: 10.0 },
  'gpt-4o-mini':               { input: 0.15, output: 0.6 },
}

/** Estimate cost in USD */
export function estimateCost(usage: { inputTokens: number; outputTokens: number; model: string }): number {
  const prices = MODEL_PRICING[usage.model] || MODEL_PRICING['claude-sonnet-4-20250514']
  return (usage.inputTokens * prices.input + usage.outputTokens * prices.output) / 1_000_000
}

/** Monthly budget thresholds per tenant tier */
export const TOKEN_BUDGETS = {
  starter:   { monthlyUSD: 5,   warningPct: 80 },
  growth:    { monthlyUSD: 25,  warningPct: 80 },
  pro:       { monthlyUSD: 100, warningPct: 80 },
  premiumPlus: { monthlyUSD: 500, warningPct: 90 },
} as const
