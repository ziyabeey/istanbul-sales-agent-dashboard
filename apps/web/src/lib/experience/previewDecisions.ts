import {
  deriveActionCardExperienceMetrics,
  type ActionCardOutcomeEvent,
  type ActionCardProtocol,
} from '@kepenk/action-card-schema'

export interface PreviewDecisionRow {
  cardId: string
  title: string
  firstChoice: string | null
  durationMs: number | null
}

// Presentation only: the shared metrics implementation remains the timing authority.
export function derivePreviewDecisions(
  cards: readonly ActionCardProtocol[],
  outcomes: readonly ActionCardOutcomeEvent[],
): PreviewDecisionRow[] {
  return cards.flatMap(card => {
    const events = outcomes.filter(event =>
      event.cardId === card.cardId && event.businessId === card.businessId &&
      event.cardRevision === card.revision && Number.isFinite(Date.parse(event.occurredAt))
    )
    const metrics = deriveActionCardExperienceMetrics({ cards: [card], outcomes: events })
    if (metrics.cardsSurfaced === 0) return []

    const first = events
      .filter(event => event.type === 'action_selected' || event.type === 'dismissed' || event.type === 'snoozed')
      .sort((a, b) => Date.parse(a.occurredAt) - Date.parse(b.occurredAt) || a.outcomeId.localeCompare(b.outcomeId))[0]
    const firstChoice = !first ? null
      : first.type === 'dismissed' ? 'Kartı kapattın'
        : first.type === 'snoozed' ? 'Kartı erteledin'
          : card.actions.find(action => action.actionId === first.actionId)?.label ?? 'İşlem seçtin'

    return [{
      cardId: card.cardId,
      title: card.presentation.title,
      firstChoice,
      durationMs: metrics.medianTimeToDecisionMs,
    }]
  })
}
