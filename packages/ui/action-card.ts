import type { ActionCardProtocol } from '@kepenk/action-card-schema'

export type ActionCardDomain =
  | 'booking'
  | 'finance'
  | 'inventory'
  | 'property'
  | 'crm'
  | 'commerce'
  | 'marketing'
  | 'system'

export type ActionCardAttention =
  | 'neutral'
  | 'info'
  | 'positive'
  | 'warning'
  | 'critical'

export type ActionCardState =
  | 'new'
  | 'seen'
  | 'executing'
  | 'resolved'
  | 'snoozed'
  | 'dismissed'
  | 'expired'
  | 'failed'

export type ActionCardActionKind =
  | 'command'
  | 'navigate'
  | 'snooze'
  | 'dismiss'

export interface ActionCardSource {
  domain: ActionCardDomain
  eventId?: string
  occurredAt?: string
}

export interface ActionCardEvidenceRef {
  id: string
  label?: string
}

export interface ActionCardAction {
  id: string
  label: string
  kind: ActionCardActionKind
  primary?: boolean
  requiresConfirmation?: boolean
}

export interface ActionCardModel {
  id: string
  source: ActionCardSource
  attention: ActionCardAttention
  state: ActionCardState
  title: string
  context?: string
  reason?: string
  deadlineAt?: string
  evidence?: ActionCardEvidenceRef[]
  actions: ActionCardAction[]
}

export const ACTION_CARD_DEMOS: ActionCardModel[] = [
  {
    id: 'demo-booking-cancelled',
    source: { domain: 'booking', eventId: 'appointment.cancelled' },
    attention: 'warning',
    state: 'new',
    title: '15:30 randevusu iptal edildi.',
    context: '90 dakikalık boşluk oluştu.',
    actions: [
      { id: 'fill-gap', label: 'Boşluğu doldur', kind: 'command', primary: true },
      { id: 'snooze', label: 'Daha sonra', kind: 'snooze' },
    ],
  },
  {
    id: 'demo-payment-attention',
    source: { domain: 'finance', eventId: 'receivable.overdue' },
    attention: 'warning',
    state: 'new',
    title: '3 tahsilat gecikti.',
    context: 'Toplam açık tutar ₺12.450.',
    actions: [
      { id: 'review-receivables', label: 'Tahsilatları incele', kind: 'navigate', primary: true },
    ],
  },
  {
    id: 'demo-stock-attention',
    source: { domain: 'inventory', eventId: 'stock.projected_low' },
    attention: 'info',
    state: 'new',
    title: 'Bu ürün 4 gün içinde bitebilir.',
    context: 'Planlı işlemlere göre mevcut stok yetersiz.',
    actions: [
      { id: 'view-supply', label: 'Tedarik seçeneklerini gör', kind: 'navigate', primary: true },
      { id: 'snooze', label: 'Hatırlat', kind: 'snooze' },
    ],
  },
  {
    id: 'demo-property-match',
    source: { domain: 'property', eventId: 'property.match.created' },
    attention: 'positive',
    state: 'new',
    title: 'Ayşe Hanım için 3 yeni eşleşme var.',
    context: 'İki mülk bütçe ve lokasyon tercihleriyle güçlü biçimde eşleşiyor.',
    actions: [
      { id: 'review-matches', label: 'Eşleşmeleri incele', kind: 'navigate', primary: true },
    ],
  },
]


function deriveAttention(card: ActionCardProtocol): ActionCardAttention {
  if (card.presentation.tone) return card.presentation.tone
  if (card.attention.riskClass === 'critical' || card.attention.urgency === 'immediate') return 'critical'
  if (card.attention.riskClass === 'high' || card.attention.urgency === 'high') return 'warning'
  if (card.attention.importance >= 60) return 'info'
  return 'neutral'
}

export function actionCardProtocolToModel(card: ActionCardProtocol): ActionCardModel {
  return {
    id: card.cardId,
    source: {
      domain: card.source.domain,
      eventId: card.source.eventRef.type,
      occurredAt: card.source.occurredAt,
    },
    attention: deriveAttention(card),
    state: card.state,
    title: card.presentation.title,
    context: card.presentation.context,
    reason: card.presentation.reason,
    deadlineAt: card.attention.deadlineAt,
    evidence: card.source.evidenceRefs.map((evidence) => ({
      id: evidence.id,
      label: evidence.label,
    })),
    actions: card.actions.map((action) => ({
      id: action.actionId,
      label: action.label,
      kind: action.mode,
      primary: action.primary,
      requiresConfirmation: action.requiresHumanConfirmation,
    })),
  }
}
