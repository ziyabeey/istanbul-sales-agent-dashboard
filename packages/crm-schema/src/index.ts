/**
 * @kepenk/crm-schema — Barrel exports + CRM constants
 */

export * from './contact'
export * from './crm-entities'
export * from './automation'

export const CRM_CONSTANTS = {
  contactsPerStore: 50000,
  labelsPerStore: 200,
  labelsPerContact: 50,
  extendedFieldsPerStore: 50,
  emailsPerContact: 5,
  phonesPerContact: 5,
  addressesPerContact: 3,
  activitiesPerContact: 10000,
  notesPerContact: 100,
  segmentsPerStore: 100,
  automationsPerStore: 50,
  primaryChannel: 'whatsapp' as const,
  legalSendHours: { start: '08:00', end: '21:00' } as const,
  analyticsRetentionDays: 365,
  segmentRefreshMinutes: 60,
} as const
