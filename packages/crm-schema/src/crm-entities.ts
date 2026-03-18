/**
 * @kepenk/crm-schema — Label, ExtendedField, Activity, Segment, Filter
 */

import { z } from 'zod'

/* ═══════ Label ═══════ */

export const LabelSchema = z.object({
  id: z.string(),
  esnafId: z.string(),
  displayName: z.string().min(1).max(40),
  key: z.string(),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/).default('#3b82f6'),
  icon: z.string().optional(),
  type: z.enum(['manual', 'auto', 'system']).default('manual'),
  autoRule: z.object({
    description: z.string(),
    filterJson: z.any(),
    aiGenerated: z.boolean().default(false),
  }).optional(),
  contactCount: z.number().int().nonnegative().default(0),
  createdAt: z.string(),
  updatedAt: z.string(),
})
export type Label = z.infer<typeof LabelSchema>

export const CreateLabelSchema = LabelSchema.omit({ id: true, contactCount: true, createdAt: true, updatedAt: true })
export type CreateLabel = z.infer<typeof CreateLabelSchema>

/* ═══════ Extended Field Definition ═══════ */

export const ExtendedFieldDefSchema = z.object({
  id: z.string(),
  esnafId: z.string(),
  key: z.string().min(1).max(40),
  displayName: z.string().min(1).max(60),
  fieldType: z.enum(['TEXT', 'NUMBER', 'DATE', 'URL', 'PHONE', 'EMAIL', 'SELECT', 'MULTISELECT', 'BOOLEAN']),
  options: z.array(z.string()).optional(),
  required: z.boolean().default(false),
  showInContactCard: z.boolean().default(true),
  sectorDefault: z.string().optional(),
  createdAt: z.string(),
})
export type ExtendedFieldDef = z.infer<typeof ExtendedFieldDefSchema>

/* ═══════ Contact Activity ═══════ */

export const ACTIVITY_TYPES = [
  'order.placed', 'order.delivered', 'order.cancelled', 'order.refunded',
  'cart.abandoned', 'cart.recovered',
  'booking.created', 'booking.completed', 'booking.cancelled', 'booking.no_show',
  'whatsapp.sent', 'whatsapp.received', 'sms.sent',
  'email.sent', 'email.opened', 'email.clicked', 'email.bounced', 'email.unsubscribed',
  'chat.message', 'form.submitted', 'phone.call',
  'website.visit', 'page.viewed', 'product.viewed',
  'loyalty.earned', 'loyalty.redeemed', 'loyalty.tier_changed',
  'referral.made', 'referral.converted',
  'contact.created', 'contact.merged', 'label.added', 'label.removed',
  'note.added', 'task.created', 'task.completed',
] as const

export const ContactActivitySchema = z.object({
  id: z.string(),
  contactId: z.string(),
  esnafId: z.string(),
  type: z.enum(ACTIVITY_TYPES),
  data: z.record(z.string(), z.any()).default({}),
  channel: z.enum(['web', 'whatsapp', 'sms', 'email', 'phone', 'in_person', 'booking', 'pos']).optional(),
  createdAt: z.string(),
})
export type ContactActivity = z.infer<typeof ContactActivitySchema>

/* ═══════ Filter Expression (Shared: segments, automations, queries) ═══════ */

export const FilterOperators = [
  '$eq', '$ne', '$gt', '$gte', '$lt', '$lte',
  '$in', '$nin', '$contains', '$startsWith',
  '$exists', '$hasSome', '$hasAll', '$daysAgo', '$between',
] as const

export const FieldFilterSchema: z.ZodType<any> = z.object({
  field: z.string(),
  operator: z.enum(FilterOperators),
  value: z.any(),
})
export type FieldFilter = z.infer<typeof FieldFilterSchema>

// Recursive filter expression
export const FilterExpressionSchema: z.ZodType<any> = z.lazy(() =>
  z.union([
    z.object({ $and: z.array(FilterExpressionSchema) }),
    z.object({ $or: z.array(FilterExpressionSchema) }),
    z.object({ $not: FilterExpressionSchema }),
    FieldFilterSchema,
  ])
)
export type FilterExpression = z.infer<typeof FilterExpressionSchema>

/* ═══════ Segment ═══════ */

export const SegmentSchema = z.object({
  id: z.string(),
  esnafId: z.string(),
  name: z.string().min(1).max(60),
  description: z.string().max(200).optional(),
  filter: FilterExpressionSchema,
  type: z.enum(['static', 'dynamic', 'ai_suggested']).default('dynamic'),
  refreshPolicy: z.object({
    auto: z.boolean().default(true),
    intervalMinutes: z.number().int().default(60),
    lastRefreshedAt: z.string().optional(),
  }),
  contactCount: z.number().int().nonnegative().default(0),
  estimatedReach: z.object({
    whatsapp: z.number().int().nonnegative().default(0),
    sms: z.number().int().nonnegative().default(0),
    email: z.number().int().nonnegative().default(0),
  }),
  usedInAutomations: z.array(z.string()).default([]),
  usedInCampaigns: z.array(z.string()).default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
})
export type Segment = z.infer<typeof SegmentSchema>

export const CreateSegmentSchema = SegmentSchema.omit({
  id: true, contactCount: true, estimatedReach: true,
  usedInAutomations: true, usedInCampaigns: true,
  createdAt: true, updatedAt: true,
})
export type CreateSegment = z.infer<typeof CreateSegmentSchema>
