import { z } from 'zod'

export const ACTION_CARD_PROTOCOL_VERSION = '1' as const

export const ActionCardDomainSchema = z.enum([
  'booking',
  'finance',
  'inventory',
  'property',
  'crm',
  'commerce',
  'marketing',
  'system',
])
export type ActionCardDomain = z.infer<typeof ActionCardDomainSchema>

export const ActionCardStateSchema = z.enum([
  'new',
  'seen',
  'executing',
  'resolved',
  'snoozed',
  'dismissed',
  'expired',
  'failed',
])
export type ActionCardState = z.infer<typeof ActionCardStateSchema>

export const ActionCardUrgencySchema = z.enum(['low', 'normal', 'high', 'immediate'])
export type ActionCardUrgency = z.infer<typeof ActionCardUrgencySchema>

export const ActionCardRiskClassSchema = z.enum(['low', 'medium', 'high', 'critical'])
export type ActionCardRiskClass = z.infer<typeof ActionCardRiskClassSchema>

const DateTimeSchema = z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
  message: 'Expected an ISO-compatible datetime string',
})

export const ActionCardSourceSchema = z.object({
  domain: ActionCardDomainSchema,
  eventRef: z.object({
    id: z.string().min(1),
    type: z.string().min(1),
    revision: z.number().int().positive().optional(),
  }),
  occurredAt: DateTimeSchema,
  subjectRefs: z.array(z.object({
    type: z.string().min(1),
    id: z.string().min(1),
  })).default([]),
  evidenceRefs: z.array(z.object({
    id: z.string().min(1),
    kind: z.string().min(1),
    label: z.string().min(1).optional(),
  })).default([]),
})
export type ActionCardSource = z.infer<typeof ActionCardSourceSchema>

export const ActionCardAttentionSchema = z.object({
  urgency: ActionCardUrgencySchema.default('normal'),
  importance: z.number().int().min(0).max(100),
  riskClass: ActionCardRiskClassSchema.default('low'),
  confidence: z.number().min(0).max(1).optional(),
  deadlineAt: DateTimeSchema.optional(),
})
export type ActionCardAttention = z.infer<typeof ActionCardAttentionSchema>

export const ActionCardPresentationSchema = z.object({
  title: z.string().min(1).max(120),
  context: z.string().max(400).optional(),
  reason: z.string().max(400).optional(),
})
export type ActionCardPresentation = z.infer<typeof ActionCardPresentationSchema>

const BaseActionSchema = z.object({
  actionId: z.string().min(1),
  label: z.string().min(1).max(80),
  primary: z.boolean().default(false),
  requiresHumanConfirmation: z.boolean().default(false),
})

const CommandActionSchema = BaseActionSchema.extend({
  mode: z.literal('command'),
  capability: z.object({
    name: z.string().min(1),
    version: z.string().min(1).optional(),
    permission: z.string().min(1).optional(),
  }),
  idempotencyKey: z.string().min(1),
})

const NavigateActionSchema = BaseActionSchema.extend({
  mode: z.literal('navigate'),
  href: z.string().regex(/^\/(?!\/)/, 'Navigation href must be an internal absolute path'),
})

const SnoozeActionSchema = BaseActionSchema.extend({
  mode: z.literal('snooze'),
})

const DismissActionSchema = BaseActionSchema.extend({
  mode: z.literal('dismiss'),
})

export const ActionCardActionSchema = z.discriminatedUnion('mode', [
  CommandActionSchema,
  NavigateActionSchema,
  SnoozeActionSchema,
  DismissActionSchema,
])
export type ActionCardAction = z.infer<typeof ActionCardActionSchema>

export const ActionCardProtocolSchema = z.object({
  protocolVersion: z.literal(ACTION_CARD_PROTOCOL_VERSION),
  cardId: z.string().min(1),
  businessId: z.string().min(1),
  dedupeKey: z.string().min(1),
  revision: z.number().int().positive(),
  source: ActionCardSourceSchema,
  attention: ActionCardAttentionSchema,
  presentation: ActionCardPresentationSchema,
  actions: z.array(ActionCardActionSchema).min(1).max(5),
  state: ActionCardStateSchema.default('new'),
  suppressionGroup: z.string().min(1).optional(),
  notBefore: DateTimeSchema.optional(),
  expiresAt: DateTimeSchema.optional(),
  snoozeUntil: DateTimeSchema.optional(),
  batchHint: z.string().min(1).optional(),
}).superRefine((card, ctx) => {
  const primaryCount = card.actions.filter((action) => action.primary).length
  if (primaryCount > 1) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['actions'],
      message: 'At most one Action Card action may be primary',
    })
  }

  if (card.notBefore && card.expiresAt && Date.parse(card.notBefore) >= Date.parse(card.expiresAt)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['expiresAt'],
      message: 'expiresAt must be later than notBefore',
    })
  }
})
export type ActionCardProtocol = z.infer<typeof ActionCardProtocolSchema>

export type ActionExecutionGateResult =
  | { ok: true; action: Extract<ActionCardAction, { mode: 'command' }> }
  | { ok: false; reason: 'invalid_card' | 'expired' | 'inactive' | 'action_not_found' | 'not_command' | 'unauthorized_capability' }

export function evaluateActionCardCommand(input: {
  card: unknown
  actionId: string
  allowedCapabilities: Iterable<string>
  now?: Date
}): ActionExecutionGateResult {
  const parsed = ActionCardProtocolSchema.safeParse(input.card)
  if (!parsed.success) return { ok: false, reason: 'invalid_card' }

  const card = parsed.data
  const now = input.now ?? new Date()

  if (card.expiresAt && Date.parse(card.expiresAt) <= now.getTime()) {
    return { ok: false, reason: 'expired' }
  }

  if (['resolved', 'dismissed', 'expired', 'failed'].includes(card.state)) {
    return { ok: false, reason: 'inactive' }
  }

  const action = card.actions.find((candidate) => candidate.actionId === input.actionId)
  if (!action) return { ok: false, reason: 'action_not_found' }
  if (action.mode !== 'command') return { ok: false, reason: 'not_command' }

  const allowed = new Set(input.allowedCapabilities)
  if (!allowed.has(action.capability.name)) {
    return { ok: false, reason: 'unauthorized_capability' }
  }

  return { ok: true, action }
}

export function findDuplicateActionCardDedupeKeys(cards: readonly ActionCardProtocol[]): string[] {
  const seen = new Set<string>()
  const duplicates = new Set<string>()

  for (const card of cards) {
    if (seen.has(card.dedupeKey)) duplicates.add(card.dedupeKey)
    seen.add(card.dedupeKey)
  }

  return [...duplicates].sort()
}
