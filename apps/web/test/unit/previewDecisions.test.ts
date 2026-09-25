import { describe, expect, it } from 'vitest'
import type { ActionCardOutcomeEvent } from '@kepenk/action-card-schema'
import { DEMO_ACTION_CARDS } from '@/app/dashboard/manage/components/experience/demoProtocolCards'
import { derivePreviewDecisions } from '@/lib/experience/previewDecisions'

const card = DEMO_ACTION_CARDS.find(candidate => candidate.cardId === 'demo-payment-attention')!
const start = Date.parse('2026-09-25T10:00:00.000Z')

function event(type: ActionCardOutcomeEvent['type'], elapsed: number, extra: Partial<ActionCardOutcomeEvent> = {}): ActionCardOutcomeEvent {
  return {
    protocolVersion: '1', outcomeId: `${type}-${elapsed}`, cardId: card.cardId,
    cardRevision: card.revision, businessId: card.businessId, type,
    occurredAt: new Date(start + elapsed).toISOString(), ...extra,
  }
}

describe('preview first-decision presentation', () => {
  it('does not invent a row for cards without a valid exposure', () => {
    expect(derivePreviewDecisions([card], [])).toEqual([])
    expect(derivePreviewDecisions([card], [event('dismissed', 1000)])).toEqual([])
  })

  it('shows exposed cards as pending and never treats opening as a choice', () => {
    expect(derivePreviewDecisions([card], [event('surfaced', 0), event('opened', 1000)]))
      .toEqual([{ cardId: card.cardId, title: card.presentation.title, firstChoice: null, durationMs: null }])
  })

  it('keeps the first choice and shared duration despite later selections, reopening or dismissal', () => {
    const rows = derivePreviewDecisions([card], [
      event('dismissed', 5000), event('action_selected', 4000, { actionId: 'review-receivables' }),
      event('opened', 3000), event('surfaced', 0),
      event('action_selected', 2500, { actionId: 'review-receivables' }), event('surfaced', 3500),
    ])
    expect(rows).toHaveLength(1)
    expect(rows[0].firstChoice).toBe('Tahsilatları incele')
    expect(rows[0].durationMs).toBe(2500)
  })

  it.each([
    ['dismissed', 'Kartı kapattın'], ['snoozed', 'Kartı erteledin'],
  ] as const)('labels %s as a card choice, not a completed business operation', (type, label) => {
    const rows = derivePreviewDecisions([card], [event('surfaced', 0), event(type, 1200)])
    expect(rows[0]).toMatchObject({ firstChoice: label, durationMs: 1200 })
  })

  it('does not use foreign, stale, unrelated or malformed timing records', () => {
    const rows = derivePreviewDecisions([card], [
      event('surfaced', 0),
      event('dismissed', 100, { businessId: 'another-business' }),
      event('dismissed', 200, { cardRevision: card.revision + 1 }),
      event('dismissed', 300, { cardId: 'another-card' }),
      event('dismissed', 400, { occurredAt: 'invalid-date' }),
    ])
    expect(rows[0]).toMatchObject({ firstChoice: null, durationMs: null })
  })

  it('does not expose unknown action identifiers in the label', () => {
    const rows = derivePreviewDecisions([card], [
      event('surfaced', 0), event('action_selected', 1000, { actionId: 'private-technical-code' }),
    ])
    expect(rows[0].firstChoice).toBe('İşlem seçtin')
  })

  it('does not convert a choice before exposure into a zero or negative duration', () => {
    const rows = derivePreviewDecisions([card], [event('surfaced', 1000), event('dismissed', 500)])
    expect(rows[0]).toMatchObject({ firstChoice: 'Kartı kapattın', durationMs: null })
  })

  it('preserves a valid zero duration instead of displaying it as missing', () => {
    const rows = derivePreviewDecisions([card], [
      event('surfaced', 0, { outcomeId: 'z-exposure' }),
      event('dismissed', 0, { outcomeId: 'a-choice' }),
    ])
    expect(rows[0]).toMatchObject({ firstChoice: 'Kartı kapattın', durationMs: 0 })
  })
})
