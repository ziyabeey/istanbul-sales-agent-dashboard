import type {
  ActionCardOutcomeEvent,
  ActionCardProtocol,
} from './index'

export interface ActionCardExperienceMetrics {
  cardsSurfaced: number
  cardsWithDecision: number
  actionSelections: number
  dismissals: number
  snoozes: number
  navigationSelections: number
  commandSelections: number
  executedActions: number
  failedActions: number
  actionRate: number | null
  dismissalRate: number | null
  snoozeRate: number | null
  executionSuccessRate: number | null
  medianTimeToDecisionMs: number | null
}

function ratio(numerator: number, denominator: number) {
  return denominator > 0 ? numerator / denominator : null
}

function median(values: number[]) {
  if (values.length === 0) return null
  const sorted = [...values].sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 1
    ? sorted[middle]
    : Math.round((sorted[middle - 1] + sorted[middle]) / 2)
}

export function deriveActionCardExperienceMetrics(input: {
  cards: readonly ActionCardProtocol[]
  outcomes: readonly ActionCardOutcomeEvent[]
}): ActionCardExperienceMetrics {
  const cardsById = new Map(input.cards.map(card => [card.cardId, card]))
  const surfacedAt = new Map<string, number>()
  const decidedCards = new Set<string>()
  const decisionDurations: number[] = []

  let actionSelections = 0
  let dismissals = 0
  let snoozes = 0
  let navigationSelections = 0
  let commandSelections = 0
  let executedActions = 0
  let failedActions = 0

  const ordered = [...input.outcomes].sort((a, b) => {
    const time = Date.parse(a.occurredAt) - Date.parse(b.occurredAt)
    if (time !== 0) return time
    return a.outcomeId.localeCompare(b.outcomeId)
  })

  const processedOutcomeIds = new Set<string>()

  for (const event of ordered) {
    const card = cardsById.get(event.cardId)
    if (!card || event.businessId !== card.businessId || event.cardRevision !== card.revision) continue
    const occurredAt = Date.parse(event.occurredAt)
    if (!Number.isFinite(occurredAt)) continue

    if (processedOutcomeIds.has(event.outcomeId)) continue
    processedOutcomeIds.add(event.outcomeId)

    if (event.type === 'surfaced') {
      const previous = surfacedAt.get(event.cardId)
      if (previous === undefined || occurredAt < previous) surfacedAt.set(event.cardId, occurredAt)
      continue
    }

    const isDecision = event.type === 'action_selected' || event.type === 'dismissed' || event.type === 'snoozed'
    if (isDecision) {
      if (decidedCards.has(event.cardId)) {
        continue
      }
      decidedCards.add(event.cardId)
      const surfaced = surfacedAt.get(event.cardId)
      if (surfaced !== undefined && occurredAt >= surfaced) {
        decisionDurations.push(occurredAt - surfaced)
      }

      if (event.type === 'dismissed') {
        dismissals += 1
        continue
      }

      if (event.type === 'snoozed') {
        snoozes += 1
        continue
      }

      if (event.type === 'action_selected') {
        actionSelections += 1
        const action = card.actions.find(candidate => candidate.actionId === event.actionId)
        if (action?.mode === 'navigate') navigationSelections += 1
        if (action?.mode === 'command') commandSelections += 1
        continue
      }
    }

    if (event.type === 'action_executed') {
      executedActions += 1
      continue
    }

    if (event.type === 'action_failed') {
      failedActions += 1
    }
  }

  const cardsSurfaced = surfacedAt.size
  const executionAttempts = executedActions + failedActions

  return {
    cardsSurfaced,
    cardsWithDecision: decidedCards.size,
    actionSelections,
    dismissals,
    snoozes,
    navigationSelections,
    commandSelections,
    executedActions,
    failedActions,
    actionRate: ratio(actionSelections, cardsSurfaced),
    dismissalRate: ratio(dismissals, cardsSurfaced),
    snoozeRate: ratio(snoozes, cardsSurfaced),
    executionSuccessRate: ratio(executedActions, executionAttempts),
    medianTimeToDecisionMs: median(decisionDurations),
  }
}
