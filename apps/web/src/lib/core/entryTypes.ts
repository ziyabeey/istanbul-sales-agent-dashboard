import { z } from 'zod'

export const CoreEntryBusinessSchema = z.object({
  businessId: z.string().uuid(),
  name: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  role: z.enum(['owner', 'manager', 'staff']),
})

export const CoreEntrySnapshotSchema = z.object({
  recovery: z.boolean(),
  businessId: z.string().uuid().nullable(),
  memberships: z.array(CoreEntryBusinessSchema).max(50),
}).refine(value => {
  const ids = new Set(value.memberships.map(item => item.businessId))
  return ids.size === value.memberships.length
    && (value.businessId === null || ids.has(value.businessId))
    && (!value.recovery || (value.businessId === null && ids.size === 0))
})

export type CoreEntrySnapshot = z.infer<typeof CoreEntrySnapshotSchema>
export type CoreEntryBusiness = z.infer<typeof CoreEntryBusinessSchema>
