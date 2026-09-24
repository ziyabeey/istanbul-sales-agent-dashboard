import type { ActionCardProtocol } from './index'

export interface AttentionPlanOptions {
  now?: Date
  maxVisible?: number
  maxPerSuppressionGroup?: number
}

export interface AttentionPlan {
  visible: ActionCardProtocol[]
  deferred: ActionCardProtocol[]
  suppressed: Array<{ card: ActionCardProtocol; reason: 'inactive' | 'duplicate' | 'suppression_group' }>
}

const URGENCY_WEIGHT: Record<ActionCardProtocol['attention']['urgency'], number> = {
  low: 0,
  normal: 20,
  high: 55,
  immediate: 100,
}

const RISK_WEIGHT: Record<ActionCardProtocol['attention']['riskClass'], number> = {
  low: 0,
  medium: 5,
  high: 10,
  critical: 15,
}

function isEligible(card: ActionCardProtocol, now: number) {
  if (['executing', 'resolved', 'dismissed', 'expired', 'failed'].includes(card.state)) return false
  if (card.notBefore && Date.parse(card.notBefore) > now) return false
  if (card.expiresAt && Date.parse(card.expiresAt) <= now) return false
  if (card.state === 'snoozed') return false
  if (card.snoozeUntil && Date.parse(card.snoozeUntil) > now) return false
  return true
}

export function actionCardAttentionScore(card: ActionCardProtocol, now = Date.now()) {
  let score = URGENCY_WEIGHT[card.attention.urgency]
    + card.attention.importance
    + RISK_WEIGHT[card.attention.riskClass]

  if (card.attention.deadlineAt) {
    const delta = Date.parse(card.attention.deadlineAt) - now
    if (delta <= 0) score += 30
    else if (delta <= 60 * 60 * 1000) score += 20
    else if (delta <= 24 * 60 * 60 * 1000) score += 10
  }

  return score
}

export function planActionCardAttention(
  cards: readonly ActionCardProtocol[],
  options: AttentionPlanOptions = {},
): AttentionPlan {
  const now = (options.now ?? new Date()).getTime()
  const maxVisible = Math.max(1, options.maxVisible ?? 5)
  const maxPerSuppressionGroup = Math.max(1, options.maxPerSuppressionGroup ?? 1)

  const suppressed: AttentionPlan['suppressed'] = []
  const latestByDedupe = new Map<string, ActionCardProtocol>()

  for (const card of cards) {
    if (!isEligible(card, now)) {
      suppressed.push({ card, reason: 'inactive' })
      continue
    }

    const current = latestByDedupe.get(card.dedupeKey)
    if (!current || card.revision > current.revision) {
      if (current) suppressed.push({ card: current, reason: 'duplicate' })
      latestByDedupe.set(card.dedupeKey, card)
    } else {
      suppressed.push({ card, reason: 'duplicate' })
    }
  }

  const ranked = [...latestByDedupe.values()].sort((a, b) => {
    const scoreDiff = actionCardAttentionScore(b, now) - actionCardAttentionScore(a, now)
    if (scoreDiff !== 0) return scoreDiff
    const timeDiff = Date.parse(a.source.occurredAt) - Date.parse(b.source.occurredAt)
    if (timeDiff !== 0) return timeDiff
    return a.cardId.localeCompare(b.cardId)
  })

  const groupCounts = new Map<string, number>()
  const candidates: ActionCardProtocol[] = []

  for (const card of ranked) {
    const group = card.suppressionGroup
    if (group) {
      const count = groupCounts.get(group) ?? 0
      if (count >= maxPerSuppressionGroup) {
        suppressed.push({ card, reason: 'suppression_group' })
        continue
      }
      groupCounts.set(group, count + 1)
    }
    candidates.push(card)
  }

  const immediate = candidates.filter(card => card.attention.urgency === 'immediate')
  const nonImmediate = candidates.filter(card => card.attention.urgency !== 'immediate')
  const room = Math.max(0, maxVisible - immediate.length)
  const visible = [...immediate, ...nonImmediate.slice(0, room)]
  const visibleIds = new Set(visible.map(card => card.cardId))
  const deferred = candidates.filter(card => !visibleIds.has(card.cardId))

  return { visible, deferred, suppressed }
}
