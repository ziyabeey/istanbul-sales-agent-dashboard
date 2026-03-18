/**
 * kepenk.ai — Booking Schema Package
 * ────────────────────────────────────
 * Service, Staff, Resource, Schedule, Booking, Policy, Waitlist
 * Wix 7-entity → Simplified 5-entity model for esnaf scale.
 */

import { z } from 'zod'

/* ═══════════════════════════════════════════════
   1. SCHEDULE & TIME
   ═══════════════════════════════════════════════ */

export const TimePeriodSchema = z.object({
  start: z.string(), // "09:00"
  end: z.string(),   // "19:00"
})
export type TimePeriod = z.infer<typeof TimePeriodSchema>

export const WeeklyScheduleSchema = z.object({
  monday: z.array(TimePeriodSchema).optional(),
  tuesday: z.array(TimePeriodSchema).optional(),
  wednesday: z.array(TimePeriodSchema).optional(),
  thursday: z.array(TimePeriodSchema).optional(),
  friday: z.array(TimePeriodSchema).optional(),
  saturday: z.array(TimePeriodSchema).optional(),
  sunday: z.array(TimePeriodSchema).optional(),
})
export type WeeklySchedule = z.infer<typeof WeeklyScheduleSchema>

export const ScheduleExceptionSchema = z.object({
  date: z.string(),
  type: z.enum(['closed', 'modified_hours']),
  reason: z.string().optional(),
  hours: z.array(TimePeriodSchema).optional(),
})

export const ScheduleSchema = z.object({
  id: z.string(),
  esnafId: z.string(),
  defaultHours: WeeklyScheduleSchema,
  exceptions: z.array(ScheduleExceptionSchema).default([]),
  turkeyDefaults: z.object({
    observeReligiousHolidays: z.boolean().default(true),
    observeNationalHolidays: z.boolean().default(true),
    fridayPrayerBreak: z.object({
      enabled: z.boolean().default(false),
      start: z.string().default('12:00'),
      end: z.string().default('14:00'),
    }).optional(),
  }).default({}),
})

/* ═══════════════════════════════════════════════
   2. INTAKE FORM FIELD
   ═══════════════════════════════════════════════ */

export const IntakeFormFieldSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.enum(['text', 'textarea', 'select', 'multiselect', 'date', 'phone', 'email', 'file', 'signature']),
  required: z.boolean().default(false),
  options: z.array(z.string()).optional(),
  maxLength: z.number().optional(),
  placeholder: z.string().optional(),
  showWhen: z.object({
    fieldId: z.string(),
    operator: z.enum(['equals', 'not_equals']),
    value: z.string(),
  }).optional(),
})

/* ═══════════════════════════════════════════════
   3. BOOKING SERVICE
   ═══════════════════════════════════════════════ */

export const ServicePricingSchema = z.object({
  type: z.enum(['fixed', 'varied', 'free', 'custom']),
  basePrice: z.number().optional(),
  currency: z.literal('TRY').default('TRY'),
  variants: z.array(z.object({
    id: z.string(),
    name: z.string(),
    duration: z.number(),
    price: z.number(),
  })).optional(),
  deposit: z.object({
    required: z.boolean(),
    amount: z.number(),
    type: z.enum(['fixed', 'percentage']),
    taksitEnabled: z.boolean().default(false),
    fullPaymentAllowed: z.boolean().default(true),
  }).optional(),
  paymentTiming: z.enum(['online_now', 'online_later', 'in_person', 'deposit_now_rest_in_person']).default('in_person'),
})

export const BookingServiceSchema = z.object({
  id: z.string(),
  esnafId: z.string(),
  revision: z.number().default(1),

  name: z.string().max(100),
  slug: z.string(),
  description: z.string().optional(),
  shortDescription: z.string().max(200).optional(),

  type: z.enum(['appointment', 'class', 'course', 'group_appointment']),
  sectorId: z.string(),
  categoryId: z.string().optional(),

  duration: z.number().min(5).max(480),
  bufferBefore: z.number().default(0),
  bufferAfter: z.number().default(0),
  capacity: z.object({
    min: z.number().default(1),
    max: z.number().default(1),
  }),

  pricing: ServicePricingSchema,

  staffIds: z.array(z.string()),
  staffSelectionMode: z.enum(['customer_chooses', 'auto_assign', 'any_available']).default('customer_chooses'),

  requiredResources: z.array(z.object({
    resourceTypeId: z.string(),
    quantity: z.number().default(1),
  })).optional(),

  location: z.object({
    type: z.enum(['business', 'customer', 'online', 'mixed']),
    businessAddress: z.string().optional(),
    onlineMeetingProvider: z.enum(['zoom', 'google_meet', 'custom_url']).optional(),
  }),

  intakeForm: z.object({
    fields: z.array(IntakeFormFieldSchema),
  }).optional(),

  policyId: z.string().optional(),
  images: z.array(z.object({ url: z.string(), alt: z.string() })).default([]),
  seo: z.object({ title: z.string().optional(), description: z.string().optional(), slug: z.string() }).optional(),

  status: z.enum(['active', 'draft', 'archived']).default('draft'),
  sortOrder: z.number().default(0),
  createdAt: z.string(),
  updatedAt: z.string(),
})
export type BookingService = z.infer<typeof BookingServiceSchema>

/* ═══════════════════════════════════════════════
   4. STAFF MEMBER
   ═══════════════════════════════════════════════ */

export const StaffMemberSchema = z.object({
  id: z.string(),
  esnafId: z.string(),

  name: z.string().max(100),
  role: z.string().max(100), // "Kıdemli Berber"
  email: z.string().optional(),
  phone: z.string().optional(),
  avatar: z.string().optional(),
  bio: z.string().max(500).optional(),

  serviceIds: z.array(z.string()),
  scheduleOverride: WeeklyScheduleSchema.optional(),
  exceptions: z.array(ScheduleExceptionSchema).default([]),
  priority: z.number().min(1).max(5).default(3),

  externalCalendar: z.object({
    provider: z.enum(['google', 'outlook', 'apple']),
    calendarId: z.string(),
    syncEnabled: z.boolean().default(false),
    syncDirection: z.enum(['both', 'external_to_kepenk', 'kepenk_to_external']).default('both'),
  }).optional(),

  accessRole: z.enum(['owner', 'manager', 'staff']).default('staff'),
  status: z.enum(['active', 'inactive']).default('active'),
  createdAt: z.string(),
})
export type StaffMember = z.infer<typeof StaffMemberSchema>

/* ═══════════════════════════════════════════════
   5. RESOURCE
   ═══════════════════════════════════════════════ */

export const ResourceSchema = z.object({
  id: z.string(),
  esnafId: z.string(),
  name: z.string(),
  typeId: z.string(),
  availability: z.enum(['24_7', 'business_hours', 'custom']).default('business_hours'),
  customHours: WeeklyScheduleSchema.optional(),
  status: z.enum(['active', 'maintenance', 'inactive']).default('active'),
})

export const ResourceTypeSchema = z.object({
  id: z.string(),
  esnafId: z.string(),
  name: z.string(),
})

/* ═══════════════════════════════════════════════
   6. BOOKING
   ═══════════════════════════════════════════════ */

export const BookingSchema = z.object({
  id: z.string(),
  esnafId: z.string(),
  revision: z.number().default(1),

  status: z.enum(['pending', 'confirmed', 'declined', 'cancelled', 'completed', 'no_show', 'waitlist']),

  serviceId: z.string(),
  variantId: z.string().optional(),
  staffId: z.string(),
  resourceIds: z.array(z.string()).default([]),

  startTime: z.string(),
  endTime: z.string(),
  timezone: z.literal('Europe/Istanbul').default('Europe/Istanbul'),

  contactId: z.string(),
  contactDetails: z.object({
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string(),
    email: z.string().optional(),
    formResponses: z.record(z.string(), z.any()).optional(),
  }),

  participants: z.number().default(1),

  location: z.object({
    type: z.enum(['business', 'customer', 'online']),
    address: z.string().optional(),
    onlineMeetingUrl: z.string().optional(),
  }),

  payment: z.object({
    status: z.enum(['not_paid', 'deposit_paid', 'fully_paid', 'refunded', 'partially_refunded']).default('not_paid'),
    method: z.enum(['online', 'in_person', 'pricing_plan']).default('in_person'),
    totalPrice: z.number(),
    depositAmount: z.number().optional(),
    depositPaidAt: z.string().optional(),
    installment: z.object({
      count: z.number(),
      amount: z.number(),
      totalWithInstallment: z.number(),
    }).optional(),
    transactionId: z.string().optional(),
    orderId: z.string().optional(),
  }),

  notifications: z.object({
    confirmationSent: z.boolean().default(false),
    reminderSent: z.boolean().default(false),
    followUpSent: z.boolean().default(false),
    reviewRequestSent: z.boolean().default(false),
  }).default({ confirmationSent: false, reminderSent: false, followUpSent: false, reviewRequestSent: false }),

  attendance: z.enum(['booked', 'checked_in', 'no_show']).default('booked'),
  checkedInAt: z.string().optional(),

  aiMeta: z.object({
    noShowRiskScore: z.number().default(0),
    suggestedReminderTime: z.string().optional(),
    bookingSource: z.enum(['website', 'whatsapp', 'phone', 'walk_in', 'dashboard']).default('website'),
  }).optional(),

  internalNote: z.string().optional(),
  customerNote: z.string().optional(),

  cancellation: z.object({
    cancelledBy: z.enum(['customer', 'staff', 'system']),
    reason: z.string().optional(),
    cancelledAt: z.string(),
    refundStatus: z.enum(['none', 'partial', 'full']).default('none'),
    refundAmount: z.number().optional(),
    cancellationFee: z.number().optional(),
  }).optional(),

  recurringConfig: z.object({
    parentBookingId: z.string().optional(),
    frequency: z.enum(['weekly', 'biweekly', 'monthly']),
    occurrences: z.number(),
    currentOccurrence: z.number(),
  }).optional(),

  createdAt: z.string(),
  updatedAt: z.string(),
})
export type Booking = z.infer<typeof BookingSchema>

/* ═══════════════════════════════════════════════
   7. BOOKING POLICY
   ═══════════════════════════════════════════════ */

export const CancellationWindowSchema = z.object({
  beforeHours: z.number(),
  fee: z.object({
    type: z.enum(['none', 'fixed', 'percentage']),
    amount: z.number().optional(),
  }),
  refundPercentage: z.number().min(0).max(100),
})

export const BookingPolicySchema = z.object({
  id: z.string(),
  esnafId: z.string(),
  name: z.string(),

  bookingRules: z.object({
    minAdvanceNotice: z.number().default(2),      // saat
    maxAdvanceBooking: z.number().default(60),     // gün
    slotInterval: z.number().default(30),          // dk
    approvalMode: z.enum(['auto', 'manual']).default('auto'),
    allowOnlineBooking: z.boolean().default(true),
    allowWalkIn: z.boolean().default(true),
    allowGroupBooking: z.boolean().default(false),
    maxGroupSize: z.number().optional(),
  }),

  cancellationWindows: z.array(CancellationWindowSchema).max(3).default([]),

  customerActions: z.object({
    canCancel: z.boolean().default(true),
    canReschedule: z.boolean().default(true),
    cancelDeadlineHours: z.number().default(24),
    rescheduleDeadlineHours: z.number().default(24),
  }),

  waitlist: z.object({
    enabled: z.boolean().default(false),
    maxSize: z.number().default(10),
    holdTimeMinutes: z.number().default(30),
    autoNotify: z.boolean().default(true),
    autoBook: z.boolean().default(false),
  }),

  noShow: z.object({
    autoMarkAfterMinutes: z.number().default(30),
    fee: z.object({
      enabled: z.boolean().default(false),
      amount: z.number().default(0),
      type: z.enum(['fixed', 'percentage']).default('fixed'),
    }),
    aiPrevention: z.object({
      enabled: z.boolean().default(true),
      extraReminderForHighRisk: z.boolean().default(true),
      requireDepositAfterNoShows: z.number().default(2),
    }),
  }),
})
export type BookingPolicy = z.infer<typeof BookingPolicySchema>

/* ═══════════════════════════════════════════════
   8. AVAILABLE SLOT (computed, never persisted)
   ═══════════════════════════════════════════════ */

export const AvailableSlotSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
  serviceId: z.string(),
  staffId: z.string(),
  staffName: z.string(),
  resourceIds: z.array(z.string()),
  location: z.string(),
  price: z.number(),
  variantId: z.string().optional(),
  availability: z.object({
    totalCapacity: z.number(),
    bookedCount: z.number(),
    remainingSpots: z.number(),
    waitlistCount: z.number(),
  }).optional(),
})
export type AvailableSlot = z.infer<typeof AvailableSlotSchema>

/* ═══════════════════════════════════════════════
   9. WAITLIST ENTRY
   ═══════════════════════════════════════════════ */

export const WaitlistEntrySchema = z.object({
  id: z.string(),
  esnafId: z.string(),
  serviceId: z.string(),
  staffId: z.string().optional(),
  contactId: z.string(),
  contactDetails: z.object({
    firstName: z.string(),
    phone: z.string(),
  }),
  preferredDate: z.string().optional(),
  preferredTimeRange: z.object({ start: z.string(), end: z.string() }).optional(),
  status: z.enum(['waiting', 'notified', 'booked', 'expired', 'cancelled']).default('waiting'),
  notifiedAt: z.string().optional(),
  expiresAt: z.string().optional(),
  position: z.number(),
  createdAt: z.string(),
})
export type WaitlistEntry = z.infer<typeof WaitlistEntrySchema>

/* ═══════════════════════════════════════════════
   10. SECTOR TEMPLATES
   ═══════════════════════════════════════════════ */

export const SECTOR_SERVICE_TEMPLATES: Record<string, { name: string; duration: number; price: number; type?: string; bufferAfter?: number }[]> = {
  berber: [
    { name: 'Saç Kesimi', duration: 30, price: 150 },
    { name: 'Sakal Tıraşı', duration: 20, price: 100 },
    { name: 'Saç + Sakal', duration: 45, price: 220 },
    { name: 'Çocuk Saç Kesimi', duration: 20, price: 100 },
    { name: 'Saç Boyama', duration: 60, price: 300 },
    { name: 'Cilt Bakımı', duration: 40, price: 200 },
  ],
  kuafor: [
    { name: 'Kesim', duration: 45, price: 300 },
    { name: 'Fön', duration: 30, price: 200 },
    { name: 'Kesim + Fön', duration: 60, price: 450 },
    { name: 'Boya', duration: 90, price: 600 },
    { name: 'Röfle', duration: 120, price: 800 },
    { name: 'Keratin Bakım', duration: 120, price: 1500 },
    { name: 'Manikür', duration: 45, price: 250 },
    { name: 'Pedikür', duration: 60, price: 300 },
  ],
  doktor: [
    { name: 'Genel Muayene', duration: 20, price: 500, bufferAfter: 5 },
    { name: 'Kontrol Muayenesi', duration: 15, price: 300 },
    { name: 'Detaylı Muayene', duration: 40, price: 800 },
    { name: 'Online Konsültasyon', duration: 20, price: 400 },
  ],
  tamirci: [
    { name: 'Yağ Değişimi', duration: 30, price: 400, bufferAfter: 15 },
    { name: 'Fren Bakımı', duration: 60, price: 300 },
    { name: 'Genel Kontrol', duration: 45, price: 200 },
    { name: 'Klima Bakımı', duration: 60, price: 500 },
    { name: 'Lastik Değişimi', duration: 30, price: 200 },
    { name: 'Arıza Tespit', duration: 30, price: 150 },
  ],
  veteriner: [
    { name: 'Genel Muayene', duration: 20, price: 400 },
    { name: 'Aşılama', duration: 15, price: 300 },
    { name: 'Diş Temizliği', duration: 45, price: 800 },
  ],
  spor_salonu: [
    { name: 'Kişisel Antrenman', duration: 60, price: 500 },
    { name: 'Yoga Dersi', duration: 60, price: 150, type: 'class' },
    { name: 'Pilates', duration: 60, price: 150, type: 'class' },
    { name: 'CrossFit', duration: 45, price: 100, type: 'class' },
  ],
  fotograf: [
    { name: 'Portre Çekim', duration: 60, price: 500 },
    { name: 'Aile Çekimi', duration: 90, price: 800, type: 'group_appointment' },
    { name: 'Ürün Çekimi (10 ürün)', duration: 120, price: 1500 },
  ],
}
