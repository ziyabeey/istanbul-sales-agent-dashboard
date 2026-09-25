import { describe, expect, it } from 'vitest'
import {
  planActionCardAttention,
  type ActionCardProtocol,
} from '@kepenk/action-card-schema'

function card(overrides: Partial<ActionCardProtocol> & { cardId: string; dedupeKey: string }): ActionCardProtocol {
  return {
    protocolVersion: '1',
    cardId: overrides.cardId,
    businessId: 'b1',
    dedupeKey: overrides.dedupeKey,
    revision: 1,
    source: {
      domain: 'system',
      eventRef: { id: overrides.cardId, type: 'demo.event' },
      occurredAt: '2026-09-24T10:00:00+03:00',
      subjectRefs: [],
      evidenceRefs: [],
    },
    attention: { urgency: 'normal', importance: 50, riskClass: 'low' },
    presentation: { title: overrides.cardId },
    actions: [{ actionId: 'dismiss', label: 'Kapat', mode: 'dismiss', primary: false, requiresHumanConfirmation: false }],
    state: 'new',
    ...overrides,
  }
}

describe('K2 attention policy', () => {
  const now = new Date('2026-09-24T12:00:00+03:00')

  it('keeps only the newest revision for a dedupe key', () => {
    const old = card({ cardId: 'old', dedupeKey: 'same', revision: 1 })
    const fresh = card({ cardId: 'fresh', dedupeKey: 'same', revision: 2 })
    const plan = planActionCardAttention([old, fresh], { now })

    expect(plan.visible.map(c => c.cardId)).toEqual(['fresh'])
    expect(plan.suppressed.some(x => x.card.cardId === 'old' && x.reason === 'duplicate')).toBe(true)
  })

  it('suppresses inactive and snoozed cards', () => {
    const resolved = card({ cardId: 'resolved', dedupeKey: 'r', state: 'resolved' })
    const snoozed = card({
      cardId: 'snoozed',
      dedupeKey: 's',
      snoozeUntil: '2026-09-24T13:00:00+03:00',
    })
    const plan = planActionCardAttention([resolved, snoozed], { now })

    expect(plan.visible).toHaveLength(0)
    expect(plan.suppressed).toHaveLength(2)
  })

  it('limits a suppression group and prefers the higher ranked card', () => {
    const low = card({
      cardId: 'low',
      dedupeKey: 'low',
      suppressionGroup: 'inventory',
      attention: { urgency: 'normal', importance: 30, riskClass: 'low' },
    })
    const high = card({
      cardId: 'high',
      dedupeKey: 'high',
      suppressionGroup: 'inventory',
      attention: { urgency: 'high', importance: 80, riskClass: 'medium' },
    })
    const plan = planActionCardAttention([low, high], { now, maxPerSuppressionGroup: 1 })

    expect(plan.visible.map(c => c.cardId)).toEqual(['high'])
    expect(plan.suppressed.some(x => x.card.cardId === 'low' && x.reason === 'suppression_group')).toBe(true)
  })

  it('never hides immediate cards behind the visible budget', () => {
    const immediateA = card({ cardId: 'a', dedupeKey: 'a', attention: { urgency: 'immediate', importance: 90, riskClass: 'high' } })
    const immediateB = card({ cardId: 'b', dedupeKey: 'b', attention: { urgency: 'immediate', importance: 80, riskClass: 'high' } })
    const normal = card({ cardId: 'c', dedupeKey: 'c', attention: { urgency: 'normal', importance: 99, riskClass: 'low' } })

    const plan = planActionCardAttention([normal, immediateA, immediateB], { now, maxVisible: 1 })

    expect(plan.visible.map(c => c.cardId)).toEqual(['a', 'b'])
    expect(plan.deferred.map(c => c.cardId)).toEqual(['c'])
  })
  it('returns a quiet plan for an empty input', () => {
    const plan = planActionCardAttention([], { now })
    expect(plan.visible).toEqual([])
    expect(plan.deferred).toEqual([])
    expect(plan.suppressed).toEqual([])
  })

  it('ranks a near deadline ahead when other weights are equal', () => {
    const later = card({
      cardId: 'later',
      dedupeKey: 'later',
      attention: { urgency: 'normal', importance: 50, riskClass: 'low', deadlineAt: '2026-09-26T12:00:00+03:00' },
    })
    const soon = card({
      cardId: 'soon',
      dedupeKey: 'soon',
      attention: { urgency: 'normal', importance: 50, riskClass: 'low', deadlineAt: '2026-09-24T12:30:00+03:00' },
    })

    const plan = planActionCardAttention([later, soon], { now })
    expect(plan.visible.map(c => c.cardId)).toEqual(['soon', 'later'])
  })
})
