/**
 * @kepenk/crm-schema — Automation, Campaign, Inbox, Loyalty, Pipeline
 */

import { z } from 'zod'

/* ═══════ Automation ═══════ */

export const TRIGGER_TYPES = [
  'contact.created', 'contact.updated', 'contact.enters_segment', 'contact.leaves_segment', 'contact.label_added',
  'order.placed', 'order.paid', 'order.shipped', 'order.delivered', 'cart.abandoned',
  'booking.created', 'booking.reminder', 'booking.completed', 'booking.no_show',
  'form.submitted', 'whatsapp.received', 'chat.received', 'email.opened', 'email.clicked',
  'scheduled', 'recurring', 'date_field',
  'loyalty.tier_changed', 'loyalty.points_threshold',
  'custom.event', 'webhook.received',
] as const

export const ACTION_TYPES = [
  'send_whatsapp', 'send_sms', 'send_email', 'send_push',
  'add_label', 'remove_label', 'update_contact_field', 'create_task', 'add_note', 'move_pipeline_card',
  'give_loyalty_points', 'issue_coupon',
  'delay', 'condition', 'split',
  'webhook', 'ai_action',
  'end',
] as const

export const AutomationTriggerSchema = z.object({
  type: z.enum(TRIGGER_TYPES),
  config: z.record(z.string(), z.any()).default({}),
})
export type AutomationTrigger = z.infer<typeof AutomationTriggerSchema>

export const AutomationActionSchema = z.object({
  id: z.string(),
  type: z.enum(ACTION_TYPES),
  config: z.record(z.string(), z.any()).default({}),
  nextActionIds: z.array(z.string()).default([]),
  condition: z.object({
    filter: z.any(),
    trueActionId: z.string(),
    falseActionId: z.string().optional(),
  }).optional(),
})
export type AutomationAction = z.infer<typeof AutomationActionSchema>

export const AutomationSchema = z.object({
  id: z.string(),
  esnafId: z.string(),
  name: z.string().min(1).max(60),
  description: z.string().max(200).optional(),
  status: z.enum(['active', 'paused', 'draft']).default('draft'),
  trigger: AutomationTriggerSchema,
  rootActionId: z.string(),
  actions: z.record(z.string(), AutomationActionSchema),
  stats: z.object({
    totalRuns: z.number().int().default(0),
    successfulRuns: z.number().int().default(0),
    failedRuns: z.number().int().default(0),
    lastRunAt: z.string().optional(),
    averageCompletionTime: z.number().default(0),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
})
export type Automation = z.infer<typeof AutomationSchema>

/* ═══════ Campaign ═══════ */

export const CampaignSchema = z.object({
  id: z.string(),
  esnafId: z.string(),
  name: z.string().min(1).max(60),
  type: z.enum(['whatsapp', 'sms', 'email', 'multi_channel']),
  status: z.enum(['draft', 'scheduled', 'sending', 'sent', 'paused', 'cancelled']).default('draft'),
  targetSegmentId: z.string().optional(),
  targetFilter: z.any().optional(),

  content: z.object({
    whatsapp: z.object({
      templateName: z.string().optional(),
      body: z.string().optional(),
      buttons: z.array(z.object({ type: z.string(), text: z.string(), url: z.string().optional() })).optional(),
    }).optional(),
    sms: z.object({ body: z.string().max(160) }).optional(),
    email: z.object({
      subject: z.string().max(120).optional(),
      preheader: z.string().max(200).optional(),
      htmlBody: z.string().optional(),
    }).optional(),
  }),

  // A/B Test
  abTest: z.object({
    enabled: z.boolean().default(false),
    variants: z.array(z.object({
      id: z.string(),
      name: z.string(),
      percentage: z.number(),
      content: z.any(),
    })).optional(),
    winnerCriteria: z.object({
      metric: z.enum(['open_rate', 'click_rate', 'conversion_rate', 'revenue']).default('open_rate'),
      evaluateAfterHours: z.number().default(24),
      autoSelectWinner: z.boolean().default(true),
      minimumSampleSize: z.number().default(50),
    }).optional(),
  }).optional(),

  // Schedule
  scheduledAt: z.string().optional(),

  // Stats
  stats: z.object({
    totalRecipients: z.number().int().default(0),
    sent: z.number().int().default(0),
    delivered: z.number().int().default(0),
    opened: z.number().int().default(0),
    clicked: z.number().int().default(0),
    bounced: z.number().int().default(0),
    unsubscribed: z.number().int().default(0),
    revenue: z.number().default(0),
  }).optional(),

  createdAt: z.string(),
  updatedAt: z.string(),
})
export type Campaign = z.infer<typeof CampaignSchema>

/* ═══════ Inbox ═══════ */

export const InboxMessageSchema = z.object({
  id: z.string(),
  conversationId: z.string(),
  channel: z.enum(['whatsapp', 'sms', 'email', 'chat', 'form', 'internal_note']),
  direction: z.enum(['incoming', 'outgoing']),
  content: z.object({
    type: z.enum(['text', 'image', 'document', 'audio', 'video', 'template', 'form_data']).default('text'),
    text: z.string().optional(),
    mediaUrl: z.string().optional(),
    formData: z.record(z.string(), z.string()).optional(),
    templateName: z.string().optional(),
  }),
  aiAnalysis: z.object({
    sentiment: z.enum(['positive', 'neutral', 'negative']).optional(),
    intent: z.string().optional(),
    urgency: z.enum(['low', 'medium', 'high']).optional(),
  }).optional(),
  status: z.enum(['sent', 'delivered', 'read', 'failed']).default('sent'),
  visibility: z.enum(['all', 'internal']).default('all'),
  createdAt: z.string(),
})
export type InboxMessage = z.infer<typeof InboxMessageSchema>

export const ConversationSchema = z.object({
  id: z.string(),
  contactId: z.string(),
  esnafId: z.string(),
  status: z.enum(['open', 'assigned', 'resolved', 'spam']).default('open'),
  assignedTo: z.string().optional(),
  lastMessage: z.object({
    channel: z.enum(['whatsapp', 'sms', 'email', 'chat', 'form']),
    preview: z.string().max(120),
    direction: z.enum(['incoming', 'outgoing']),
    timestamp: z.string(),
  }).optional(),
  tags: z.array(z.string()).default([]),
  aiSummary: z.string().optional(),
  aiSuggestedResponse: z.string().optional(),
  unreadCount: z.number().int().default(0),
  createdAt: z.string(),
  updatedAt: z.string(),
})
export type Conversation = z.infer<typeof ConversationSchema>

/* ═══════ Loyalty ═══════ */

export const EarningRuleSchema = z.object({
  id: z.string(),
  name: z.string(),
  trigger: z.enum(['purchase', 'booking', 'referral', 'signup', 'review', 'birthday', 'custom']),
  calculation: z.object({
    type: z.enum(['fixed', 'per_amount', 'per_visit']),
    fixedPoints: z.number().optional(),
    pointsPerAmount: z.number().optional(),
    amountUnit: z.number().optional(),
  }),
  conditions: z.object({
    minimumAmount: z.number().optional(),
    specificCategories: z.array(z.string()).optional(),
    specificDays: z.array(z.string()).optional(),
    tierMultiplier: z.record(z.string(), z.number()).optional(),
  }).optional(),
})
export type EarningRule = z.infer<typeof EarningRuleSchema>

export const LoyaltyRewardSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['percentage_discount', 'fixed_discount', 'free_shipping', 'free_item', 'custom']),
  pointsCost: z.number().int().positive(),
  value: z.number(),
  conditions: z.object({
    minimumOrderAmount: z.number().optional(),
    validDays: z.number().optional(),
    maxUsesPerCustomer: z.number().optional(),
  }).optional(),
})
export type LoyaltyReward = z.infer<typeof LoyaltyRewardSchema>

export const LoyaltyTierSchema = z.object({
  id: z.string(),
  name: z.string(),
  pointsThreshold: z.number().int().nonnegative(),
  benefits: z.array(z.string()),
  earningMultiplier: z.number().default(1),
  color: z.string(),
  icon: z.string(),
})
export type LoyaltyTier = z.infer<typeof LoyaltyTierSchema>

export const LoyaltyProgramSchema = z.object({
  id: z.string(),
  esnafId: z.string(),
  name: z.string(),
  status: z.enum(['active', 'paused']).default('active'),
  earningRules: z.array(EarningRuleSchema),
  rewards: z.array(LoyaltyRewardSchema),
  tiers: z.array(LoyaltyTierSchema).optional(),
  settings: z.object({
    pointsName: z.string().default('Puan'),
    pointsExpiry: z.number().optional(),
    minimumRedeemPoints: z.number().default(100),
  }),
  referralProgram: z.object({
    enabled: z.boolean().default(false),
    referrerReward: z.object({ type: z.enum(['points', 'coupon']), value: z.number() }),
    refereeReward: z.object({ type: z.enum(['points', 'coupon']), value: z.number() }),
    triggerAction: z.enum(['first_purchase', 'signup']).default('first_purchase'),
    shareChannels: z.array(z.enum(['whatsapp', 'sms', 'link', 'qr'])).default(['whatsapp', 'link']),
  }).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
export type LoyaltyProgram = z.infer<typeof LoyaltyProgramSchema>

/* ═══════ Task & Pipeline ═══════ */

export const TaskSchema = z.object({
  id: z.string(),
  esnafId: z.string(),
  contactId: z.string().optional(),
  title: z.string().min(1).max(120),
  description: z.string().max(500).optional(),
  status: z.enum(['todo', 'in_progress', 'done']).default('todo'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  dueDate: z.string().optional(),
  reminderAt: z.string().optional(),
  assignedTo: z.string().optional(),
  automationId: z.string().optional(),
  createdAt: z.string(),
  completedAt: z.string().optional(),
})
export type Task = z.infer<typeof TaskSchema>

export const PipelineStageSchema = z.object({
  id: z.string(),
  name: z.string(),
  order: z.number().int(),
  color: z.string(),
  isWinStage: z.boolean().default(false),
  isLostStage: z.boolean().default(false),
})
export type PipelineStage = z.infer<typeof PipelineStageSchema>

export const PipelineCardSchema = z.object({
  id: z.string(),
  stageId: z.string(),
  contactId: z.string(),
  title: z.string(),
  value: z.number().optional(),
  customFields: z.record(z.string(), z.any()).default({}),
  assignedTo: z.string().optional(),
  dueDate: z.string().optional(),
  activities: z.array(z.object({ text: z.string(), createdAt: z.string() })).default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
  movedAt: z.string(),
})
export type PipelineCard = z.infer<typeof PipelineCardSchema>

export const PipelineSchema = z.object({
  id: z.string(),
  esnafId: z.string(),
  name: z.string(),
  stages: z.array(PipelineStageSchema).max(15),
  createdAt: z.string(),
  updatedAt: z.string(),
})
export type Pipeline = z.infer<typeof PipelineSchema>
