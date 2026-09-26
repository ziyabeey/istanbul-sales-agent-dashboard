import { describe, expect, it } from 'vitest'
import {
  deriveActionCardExperienceMetrics,
  type ActionCardOutcomeEvent,
  type ActionCardProtocol,
} from '@kepenk/action-card-schema'

const businessId = '51000000-0000-4000-8000-000000000001'

function card(overrides: Partial<ActionCardProtocol> & { cardId: string }): ActionCardProtocol {
  return {
    protocolVersion: '1',
    cardId: overrides.cardId,
    businessId,
    dedupeKey: overrides.cardId,
    revision: 1,
    source: {
      domain: 'booking',
      eventRef: { id: `event-${overrides.cardId}`, type: 'demo' },
      occurredAt: '2026-09-24T10:00:00+03:00',
      subjectRefs: [],
      evidenceRefs: [],
    },
    attention: { urgency: 'normal', importance: 50, riskClass: 'low' },
    presentation: { title: overrides.cardId },
    actions: [
      {
        actionId: 'open',
        label: 'İncele',
        mode: 'navigate',
        href: '/dashboard/manage/experience-home',
        primary: true,
        requiresHumanConfirmation: false,
      },
      {
        actionId: 'run',
        label: 'Çalıştır',
        mode: 'command',
        capability: { name: 'demo.run' },
        idempotencyKey: `${overrides.cardId}:run`,
        primary: false,
        requiresHumanConfirmation: true,
      },
      {
        actionId: 'dismiss',
        label: 'Kapat',
        mode: 'dismiss',
        primary: false,
        requiresHumanConfirmation: false,
      },
    ],
    state: 'new',
    ...overrides,
  }
}

function outcome(
  cardId: string,
  type: ActionCardOutcomeEvent['type'],
  occurredAt: string,
  extra: Partial<ActionCardOutcomeEvent> = {},
): ActionCardOutcomeEvent {
  return {
    protocolVersion: '1',
    outcomeId: `${cardId}:${type}:${occurredAt}`,
    cardId,
    cardRevision: 1,
    businessId,
    type,
    occurredAt,
    ...extra,
  }
}

describe('K5 Action Card experience metrics', () => {
  it('returns null rates when there is no evidence', () => {
    expect(deriveActionCardExperienceMetrics({ cards: [], outcomes: [] })).toEqual({
      cardsSurfaced: 0,
      cardsWithDecision: 0,
      actionSelections: 0,
      dismissals: 0,
      snoozes: 0,
      navigationSelections: 0,
      commandSelections: 0,
      executedActions: 0,
      failedActions: 0,
      actionRate: null,
      dismissalRate: null,
      snoozeRate: null,
      executionSuccessRate: null,
      medianTimeToDecisionMs: null,
    })
  })

  it('measures surfaced to selected action time and action mode', () => {
    const cards = [card({ cardId: 'a' })]
    const outcomes = [
      outcome('a', 'surfaced', '2026-09-24T10:00:00.000Z'),
      outcome('a', 'action_selected', '2026-09-24T10:00:02.500Z', { actionId: 'open' }),
    ]

    const metrics = deriveActionCardExperienceMetrics({ cards, outcomes })
    expect(metrics.cardsSurfaced).toBe(1)
    expect(metrics.cardsWithDecision).toBe(1)
    expect(metrics.actionSelections).toBe(1)
    expect(metrics.navigationSelections).toBe(1)
    expect(metrics.commandSelections).toBe(0)
    expect(metrics.actionRate).toBe(1)
    expect(metrics.medianTimeToDecisionMs).toBe(2500)
  })

  it('counts dismiss and snooze as decisions without pretending they are actions', () => {
    const cards = [card({ cardId: 'a' }), card({ cardId: 'b' })]
    const outcomes = [
      outcome('a', 'surfaced', '2026-09-24T10:00:00.000Z'),
      outcome('b', 'surfaced', '2026-09-24T10:00:00.000Z'),
      outcome('a', 'dismissed', '2026-09-24T10:00:01.000Z'),
      outcome('b', 'snoozed', '2026-09-24T10:00:03.000Z'),
    ]

    const metrics = deriveActionCardExperienceMetrics({ cards, outcomes })
    expect(metrics.cardsWithDecision).toBe(2)
    expect(metrics.dismissals).toBe(1)
    expect(metrics.snoozes).toBe(1)
    expect(metrics.actionSelections).toBe(0)
    expect(metrics.medianTimeToDecisionMs).toBe(2000)
  })

  it('separates command selection from verified execution outcome', () => {
    const cards = [card({ cardId: 'a' }), card({ cardId: 'b' })]
    const outcomes = [
      outcome('a', 'surfaced', '2026-09-24T10:00:00.000Z'),
      outcome('a', 'action_selected', '2026-09-24T10:00:01.000Z', { actionId: 'run' }),
      outcome('a', 'action_executed', '2026-09-24T10:00:02.000Z', { actionId: 'run', executionRef: 'exec-a' }),
      outcome('b', 'surfaced', '2026-09-24T10:00:00.000Z'),
      outcome('b', 'action_selected', '2026-09-24T10:00:01.500Z', { actionId: 'run' }),
      outcome('b', 'action_failed', '2026-09-24T10:00:02.500Z', { actionId: 'run', errorCode: 'FAILED' }),
    ]

    const metrics = deriveActionCardExperienceMetrics({ cards, outcomes })
    expect(metrics.commandSelections).toBe(2)
    expect(metrics.executedActions).toBe(1)
    expect(metrics.failedActions).toBe(1)
    expect(metrics.executionSuccessRate).toBe(0.5)
  })

  it('ignores foreign-business and stale-revision outcomes', () => {
    const cards = [card({ cardId: 'a', revision: 2 })]
    const outcomes: ActionCardOutcomeEvent[] = [
      { ...outcome('a', 'surfaced', '2026-09-24T10:00:00.000Z'), cardRevision: 2 },
      { ...outcome('a', 'dismissed', '2026-09-24T10:00:01.000Z'), cardRevision: 1 },
      { ...outcome('a', 'snoozed', '2026-09-24T10:00:02.000Z'), cardRevision: 2, businessId: '52000000-0000-4000-8000-000000000001' },
    ]

    const metrics = deriveActionCardExperienceMetrics({ cards, outcomes })
    expect(metrics.cardsSurfaced).toBe(1)
    expect(metrics.cardsWithDecision).toBe(0)
    expect(metrics.dismissals).toBe(0)
    expect(metrics.snoozes).toBe(0)
  })

  it('guarantees that duplicate outcomeId events are idempotent', () => {
    const cards = [card({ cardId: 'a' })]
    const baseOutcome = outcome('a', 'action_selected', '2026-09-24T10:00:01.000Z', { actionId: 'open' })
    const outcomes = [
      outcome('a', 'surfaced', '2026-09-24T10:00:00.000Z'),
      baseOutcome,
      { ...baseOutcome, occurredAt: '2026-09-24T10:00:02.000Z' }, // exact same outcomeId but replay attempt
    ]

    const metrics = deriveActionCardExperienceMetrics({ cards, outcomes })
    expect(metrics.cardsSurfaced).toBe(1)
    expect(metrics.cardsWithDecision).toBe(1)
    expect(metrics.actionSelections).toBe(1)
  })

  it('does not let ignored stale evidence consume an outcomeId used by later valid evidence', () => {
    const cards = [card({ cardId: 'a', revision: 2 })]
    const sharedOutcomeId = 'shared-outcome'
    const outcomes: ActionCardOutcomeEvent[] = [
      { ...outcome('a', 'surfaced', '2026-09-24T10:00:00.000Z'), cardRevision: 2 },
      {
        ...outcome('a', 'action_selected', '2026-09-24T10:00:01.000Z', { actionId: 'open' }),
        outcomeId: sharedOutcomeId,
        cardRevision: 1,
      },
      {
        ...outcome('a', 'action_selected', '2026-09-24T10:00:02.000Z', { actionId: 'open' }),
        outcomeId: sharedOutcomeId,
        cardRevision: 2,
      },
    ]

    const metrics = deriveActionCardExperienceMetrics({ cards, outcomes })
    expect(metrics.cardsSurfaced).toBe(1)
    expect(metrics.cardsWithDecision).toBe(1)
    expect(metrics.actionSelections).toBe(1)
    expect(metrics.navigationSelections).toBe(1)
    expect(metrics.medianTimeToDecisionMs).toBe(2000)
  })

  it('ensures only the first valid decision per card contributes to metrics and rates', () => {
    const cards = [card({ cardId: 'a' })]
    const outcomes = [
      outcome('a', 'surfaced', '2026-09-24T10:00:00.000Z'),
      outcome('a', 'action_selected', '2026-09-24T10:00:01.000Z', { actionId: 'open' }),
      // Subsequent valid decision events for the same card:
      outcome('a', 'dismissed', '2026-09-24T10:00:02.000Z'),
      outcome('a', 'snoozed', '2026-09-24T10:00:03.000Z'),
    ]

    const metrics = deriveActionCardExperienceMetrics({ cards, outcomes })
    expect(metrics.cardsSurfaced).toBe(1)
    expect(metrics.cardsWithDecision).toBe(1)
    expect(metrics.actionSelections).toBe(1)
    expect(metrics.dismissals).toBe(0)
    expect(metrics.snoozes).toBe(0)
    expect(metrics.actionRate).toBe(1)
    expect(metrics.dismissalRate).toBe(0)
    expect(metrics.snoozeRate).toBe(0)
  })

  it('ignores an unknown action before the first valid selection', () => {
    const cards = [card({ cardId: 'a' })]
    const outcomes = [
      outcome('a', 'surfaced', '2026-09-24T10:00:00.000Z'),
      outcome('a', 'action_selected', '2026-09-24T10:00:01.000Z', { actionId: 'not-a-card-action' }),
      outcome('a', 'action_selected', '2026-09-24T10:00:02.000Z', { actionId: 'open' }),
    ]

    const metrics = deriveActionCardExperienceMetrics({ cards, outcomes })
    expect(metrics.cardsWithDecision).toBe(1)
    expect(metrics.actionSelections).toBe(1)
    expect(metrics.navigationSelections).toBe(1)
    expect(metrics.medianTimeToDecisionMs).toBe(2000)
  })

  it('ignores a missing action before a valid dismissal', () => {
    const cards = [card({ cardId: 'a' })]
    const outcomes = [
      outcome('a', 'surfaced', '2026-09-24T10:00:00.000Z'),
      outcome('a', 'action_selected', '2026-09-24T10:00:01.000Z'),
      outcome('a', 'dismissed', '2026-09-24T10:00:02.000Z'),
    ]

    const metrics = deriveActionCardExperienceMetrics({ cards, outcomes })
    expect(metrics.cardsWithDecision).toBe(1)
    expect(metrics.actionSelections).toBe(0)
    expect(metrics.dismissals).toBe(1)
    expect(metrics.medianTimeToDecisionMs).toBe(2000)
  })

  it('does not let an invalid action reserve a valid selection outcomeId', () => {
    const cards = [card({ cardId: 'a' })]
    const outcomes = [
      outcome('a', 'surfaced', '2026-09-24T10:00:00.000Z'),
      outcome('a', 'action_selected', '2026-09-24T10:00:01.000Z', {
        outcomeId: 'shared-selection', actionId: 'not-a-card-action',
      }),
      outcome('a', 'action_selected', '2026-09-24T10:00:02.000Z', {
        outcomeId: 'shared-selection', actionId: 'open',
      }),
    ]

    const metrics = deriveActionCardExperienceMetrics({ cards, outcomes })
    expect(metrics.cardsWithDecision).toBe(1)
    expect(metrics.actionSelections).toBe(1)
    expect(metrics.navigationSelections).toBe(1)
    expect(metrics.medianTimeToDecisionMs).toBe(2000)
  })

  it('uses outcomeId to break equal-time decisions independently of input order', () => {
    const cards = [card({ cardId: 'a' })]
    const outcomes = [
      outcome('a', 'surfaced', '2026-09-24T10:00:00.000Z'),
      outcome('a', 'dismissed', '2026-09-24T10:00:01.000Z', { outcomeId: 'a-decision' }),
      outcome('a', 'action_selected', '2026-09-24T10:00:01.000Z', {
        outcomeId: 'b-decision', actionId: 'open',
      }),
    ]

    const metrics = deriveActionCardExperienceMetrics({ cards, outcomes })
    expect(metrics.dismissals).toBe(1)
    expect(metrics.actionSelections).toBe(0)
    expect(deriveActionCardExperienceMetrics({ cards, outcomes: [...outcomes].reverse() })).toEqual(metrics)
  })

  it('deduplicates execution evidence without inferring a missing result', () => {
    const cards = [card({ cardId: 'a' })]
    const selected = [
      outcome('a', 'surfaced', '2026-09-24T10:00:00.000Z'),
      outcome('a', 'action_selected', '2026-09-24T10:00:01.000Z', { actionId: 'run' }),
    ]
    const pending = deriveActionCardExperienceMetrics({ cards, outcomes: selected })
    expect(pending.executedActions).toBe(0)
    expect(pending.failedActions).toBe(0)
    expect(pending.executionSuccessRate).toBe(null)

    const outcomes = [
      ...selected,
      outcome('a', 'action_failed', '2026-09-24T10:00:02.000Z', { actionId: 'run', errorCode: 'FAILED' }),
      outcome('a', 'action_executed', '2026-09-24T10:00:03.000Z', { actionId: 'run', executionRef: 'exec-a' }),
    ]
    const metrics = deriveActionCardExperienceMetrics({ cards, outcomes })
    expect(metrics.executedActions).toBe(1)
    expect(metrics.failedActions).toBe(1)
    expect(metrics.executionSuccessRate).toBe(0.5)
    expect(deriveActionCardExperienceMetrics({ cards, outcomes: [...outcomes, ...outcomes] })).toEqual(metrics)
  })
})
