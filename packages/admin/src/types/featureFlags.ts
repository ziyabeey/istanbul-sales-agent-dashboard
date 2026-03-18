/**
 * @kepenk/admin — Feature Flags Types
 *
 * Rules evaluated in order: first matching rule wins.
 * If no rules match, flag is disabled for the user.
 */

export interface FeatureFlag {
  id: string
  name: string
  description: string
  enabled: boolean              // global kill switch
  rules: FeatureFlagRule[]
  createdBy: string
  createdAt: string
  updatedAt: string
}

export type FeatureFlagRuleType = 'user_ids' | 'plan' | 'percentage' | 'country' | 'sector'

export type FeatureFlagRule =
  | { type: 'user_ids'; ids: string[] }
  | { type: 'plan'; plans: string[] }
  | { type: 'percentage'; value: number }          // 0-100 canary
  | { type: 'country'; codes: string[] }
  | { type: 'sector'; sectors: string[] }

export interface FeatureFlagContext {
  userId: string
  plan: string
  country: string
  sector?: string
}

/**
 * Evaluate if a feature flag is enabled for a given context.
 */
export function evaluateFlag(flag: FeatureFlag, ctx: FeatureFlagContext): boolean {
  if (!flag.enabled) return false
  if (flag.rules.length === 0) return true  // enabled globally

  for (const rule of flag.rules) {
    switch (rule.type) {
      case 'user_ids':
        if (rule.ids.includes(ctx.userId)) return true
        break
      case 'plan':
        if (rule.plans.includes(ctx.plan)) return true
        break
      case 'percentage': {
        // Deterministic hash based on userId + flagId
        const hash = simpleHash(`${ctx.userId}:${flag.id}`)
        if ((hash % 100) < rule.value) return true
        break
      }
      case 'country':
        if (rule.codes.includes(ctx.country)) return true
        break
      case 'sector':
        if (ctx.sector && rule.sectors.includes(ctx.sector)) return true
        break
    }
  }
  return false
}

function simpleHash(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

/**
 * Well-known feature flags.
 */
export const KNOWN_FLAGS = [
  'restaurant_os_v2',
  'ai_editor',
  'whatsapp_engine',
  'multi_language',
  'custom_domain',
  'advanced_analytics',
  'b2b_marketplace',
  'partner_program',
] as const
