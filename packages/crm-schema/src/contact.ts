/**
 * @kepenk/crm-schema — Contact Schema
 * Wix Contact v4 adapted, Turkey-native (KVKK + İYS + WhatsApp-first).
 */

import { z } from 'zod'

/* ═══════ Sub-schemas ═══════ */

export const ContactEmailSchema = z.object({
  email: z.string().email(),
  tag: z.enum(['main', 'work', 'other']).default('main'),
  primary: z.boolean().default(false),
  verified: z.boolean().default(false),
})
export type ContactEmail = z.infer<typeof ContactEmailSchema>

export const ContactPhoneSchema = z.object({
  number: z.string().min(10).max(15),
  tag: z.enum(['mobile', 'work', 'home']).default('mobile'),
  primary: z.boolean().default(false),
  countryCode: z.literal('TR').default('TR'),
})
export type ContactPhone = z.infer<typeof ContactPhoneSchema>

export const ContactAddressSchema = z.object({
  tag: z.enum(['home', 'work', 'billing', 'shipping']).default('home'),
  fullName: z.string().max(80).optional(),
  addressLine1: z.string().min(5).max(200),
  addressLine2: z.string().max(200).optional(),
  district: z.string().min(1).max(60),
  city: z.string().min(1).max(40),
  postalCode: z.string().regex(/^\d{5}$/).optional(),
  country: z.literal('TR').default('TR'),
})
export type ContactAddress = z.infer<typeof ContactAddressSchema>

/* ═══════ Consent (KVKK + İYS) ═══════ */

export const ConsentSchema = z.object({
  kvkk: z.object({
    accepted: z.boolean().default(false),
    acceptedAt: z.string().optional(),
    version: z.string().default('1.0'),
  }),
  iys: z.object({
    sms: z.object({ permitted: z.boolean().default(false), updatedAt: z.string().optional() }),
    email: z.object({ permitted: z.boolean().default(false), updatedAt: z.string().optional() }),
    phone: z.object({ permitted: z.boolean().default(false), updatedAt: z.string().optional() }),
  }),
  whatsappOptIn: z.object({
    permitted: z.boolean().default(false),
    optedInAt: z.string().optional(),
    method: z.enum(['chat', 'form', 'qr', 'api']).optional(),
  }),
})
export type Consent = z.infer<typeof ConsentSchema>

/* ═══════ Activity Summary ═══════ */

export const ActivitySummarySchema = z.object({
  totalOrders: z.number().int().nonnegative().default(0),
  totalSpent: z.number().nonnegative().default(0),
  averageOrderValue: z.number().nonnegative().default(0),
  lastOrderDate: z.string().optional(),
  totalBookings: z.number().int().nonnegative().default(0),
  lastBookingDate: z.string().optional(),
  totalMessages: z.number().int().nonnegative().default(0),
  lastMessageDate: z.string().optional(),
  emailOpens: z.number().int().nonnegative().default(0),
  emailClicks: z.number().int().nonnegative().default(0),
  smsDelivered: z.number().int().nonnegative().default(0),
  whatsappMessages: z.number().int().nonnegative().default(0),
  websiteVisits: z.number().int().nonnegative().default(0),
  lastVisitDate: z.string().optional(),
  referralCount: z.number().int().nonnegative().default(0),
  loyaltyPoints: z.number().int().nonnegative().default(0),
  loyaltyTier: z.string().optional(),
})
export type ActivitySummary = z.infer<typeof ActivitySummarySchema>

/* ═══════ AI Metadata ═══════ */

export const ContactAiMetaSchema = z.object({
  behavioralTags: z.array(z.string()).default([]),
  churnRisk: z.enum(['low', 'medium', 'high']).default('low'),
  predictedLifetimeValue: z.number().nonnegative().default(0),
  nextPurchasePrediction: z.string().optional(),
  preferredChannel: z.enum(['whatsapp', 'sms', 'email']).default('whatsapp'),
  preferredContactTime: z.string().optional(),
  lastAnalyzedAt: z.string().optional(),
})
export type ContactAiMeta = z.infer<typeof ContactAiMetaSchema>

/* ═══════ Contact ═══════ */

export const ContactSchema = z.object({
  id: z.string(),
  esnafId: z.string(),
  revision: z.number().int().default(1),

  identityTier: z.enum(['visitor', 'contact', 'customer']).default('contact'),

  info: z.object({
    firstName: z.string().max(40).default(''),
    lastName: z.string().max(40).default(''),
    displayName: z.string().max(80).default(''),
    company: z.string().max(100).optional(),
    jobTitle: z.string().max(60).optional(),
    birthdate: z.string().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    locale: z.literal('tr-TR').default('tr-TR'),
    avatar: z.string().url().optional(),
    notes: z.string().max(2000).optional(),
  }),

  channels: z.object({
    emails: z.array(ContactEmailSchema).max(5).default([]),
    phones: z.array(ContactPhoneSchema).max(5).default([]),
    whatsapp: z.object({
      number: z.string().optional(),
      optedIn: z.boolean().default(false),
      lastInteraction: z.string().optional(),
    }).optional(),
    addresses: z.array(ContactAddressSchema).max(3).default([]),
  }),

  labelIds: z.array(z.string()).max(50).default([]),
  extendedFields: z.record(z.string(), z.any()).default({}),

  source: z.object({
    channel: z.enum(['manual', 'form', 'checkout', 'whatsapp', 'chat', 'booking', 'import', 'api', 'referral']).default('manual'),
    sourceInfo: z.string().optional(),
    campaignId: z.string().optional(),
  }),

  billing: z.object({
    type: z.enum(['individual', 'corporate']).default('individual'),
    tcKimlik: z.string().length(11).optional(),
    taxId: z.string().length(10).optional(),
    taxOffice: z.string().max(60).optional(),
    companyName: z.string().max(100).optional(),
    billingAddress: ContactAddressSchema.optional(),
  }).optional(),

  consent: ConsentSchema,
  activitySummary: ActivitySummarySchema,
  aiMeta: ContactAiMetaSchema,

  createdAt: z.string(),
  updatedAt: z.string(),
})
export type Contact = z.infer<typeof ContactSchema>

export const CreateContactSchema = ContactSchema.omit({
  id: true,
  revision: true,
  activitySummary: true,
  aiMeta: true,
  createdAt: true,
  updatedAt: true,
}).partial({
  consent: true,
  billing: true,
  source: true,
  channels: true,
  labelIds: true,
  extendedFields: true,
})
export type CreateContact = z.infer<typeof CreateContactSchema>

export const UpdateContactSchema = ContactSchema.partial().required({ revision: true })
export type UpdateContact = z.infer<typeof UpdateContactSchema>
