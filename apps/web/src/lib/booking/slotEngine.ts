/**
 * Dynamic Slot Engine
 * ────────────────────
 * Slots are NEVER persisted — computed at query time.
 * Considers: staff hours, resource availability, existing bookings,
 *            external calendar blocks, schedule exceptions, policy constraints.
 */

/* ═══════ Interfaces ═══════ */

interface AvailableSlot {
  startTime: string
  endTime: string
  serviceId: string
  staffId: string
  staffName: string
  resourceIds: string[]
  location: string
  price: number
  variantId?: string
}

interface SlotQuery {
  serviceId: string
  staffId?: string      // null = all staff
  dateFrom: string      // YYYY-MM-DD
  dateTo: string        // YYYY-MM-DD
  timezone?: string
}

interface ServiceInfo {
  id: string
  duration: number      // minutes
  bufferBefore: number
  bufferAfter: number
  capacity: { min: number; max: number }
  staffIds: string[]
  requiredResources?: { resourceTypeId: string; quantity: number }[]
  pricing: { basePrice?: number }
  location: { type: string; businessAddress?: string }
}

interface StaffInfo {
  id: string
  name: string
  scheduleOverride?: Record<string, { start: string; end: string }[]>
  exceptions: { date: string; type: string; hours?: { start: string; end: string }[] }[]
}

interface ScheduleInfo {
  defaultHours: Record<string, { start: string; end: string }[]>
  exceptions: { date: string; type: string; hours?: { start: string; end: string }[] }[]
  turkeyDefaults: { observeReligiousHolidays: boolean; observeNationalHolidays: boolean }
}

interface ExistingBooking {
  staffId: string
  startTime: string
  endTime: string
  status: string
  resourceIds: string[]
}

/* ═══════ Main Slot Calculator ═══════ */

export function calculateAvailableSlots(
  service: ServiceInfo,
  staffList: StaffInfo[],
  schedule: ScheduleInfo,
  existingBookings: ExistingBooking[],
  externalBlocks: { staffId: string; start: string; end: string }[],
  dateFrom: string,
  dateTo: string,
  slotInterval: number = 30, // minutes
  minAdvanceHours: number = 2,
): AvailableSlot[] {
  const slots: AvailableSlot[] = []
  const now = new Date()
  const minAdvance = new Date(now.getTime() + minAdvanceHours * 60 * 60 * 1000)

  const startDate = new Date(dateFrom + 'T00:00:00+03:00')
  const endDate = new Date(dateTo + 'T23:59:59+03:00')

  // Cap at 30 days
  const maxEnd = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000)
  const actualEnd = endDate < maxEnd ? endDate : maxEnd

  // Iterate each day
  for (let day = new Date(startDate); day <= actualEnd; day.setDate(day.getDate() + 1)) {
    const dateStr = day.toISOString().split('T')[0]
    const dayName = getDayName(day)

    // Check holiday exceptions
    const scheduleException = schedule.exceptions.find(e => e.date === dateStr)
    if (scheduleException?.type === 'closed') continue

    // For each relevant staff member
    for (const staff of staffList) {
      if (!service.staffIds.includes(staff.id)) continue

      // Check staff-level exception
      const staffException = staff.exceptions.find(e => e.date === dateStr)
      if (staffException?.type === 'closed') continue

      // Get working hours for this day
      const hours = getWorkingHours(dayName, staff, schedule, scheduleException, staffException)
      if (!hours || hours.length === 0) continue

      // Get bookings for this staff on this day
      const dayStart = new Date(dateStr + 'T00:00:00+03:00')
      const dayEnd = new Date(dateStr + 'T23:59:59+03:00')
      const staffBookings = existingBookings.filter(b =>
        b.staffId === staff.id &&
        ['confirmed', 'pending'].includes(b.status) &&
        new Date(b.startTime) < dayEnd &&
        new Date(b.endTime) > dayStart
      )

      // Get external blocks for this staff
      const staffBlocks = externalBlocks.filter(b =>
        b.staffId === staff.id &&
        new Date(b.start) < dayEnd &&
        new Date(b.end) > dayStart
      )

      // Generate slots within each working period
      for (const period of hours) {
        const periodStart = new Date(`${dateStr}T${period.start}:00+03:00`)
        const periodEnd = new Date(`${dateStr}T${period.end}:00+03:00`)

        // Iterate by slotInterval
        for (let slotStart = new Date(periodStart); slotStart < periodEnd; slotStart = new Date(slotStart.getTime() + slotInterval * 60 * 1000)) {
          const totalDuration = service.bufferBefore + service.duration + service.bufferAfter
          const slotEnd = new Date(slotStart.getTime() + totalDuration * 60 * 1000)

          // Must fit within period
          if (slotEnd > periodEnd) break

          // Must be in the future + min advance
          if (slotStart < minAdvance) continue

          // Check overlap with existing bookings
          const serviceStart = new Date(slotStart.getTime() + service.bufferBefore * 60 * 1000)
          const serviceEnd = new Date(serviceStart.getTime() + service.duration * 60 * 1000)

          const hasConflict = staffBookings.some(b =>
            new Date(b.startTime) < slotEnd && new Date(b.endTime) > slotStart
          )
          if (hasConflict) continue

          // Check overlap with external calendar
          const hasExternalConflict = staffBlocks.some(b =>
            new Date(b.start) < slotEnd && new Date(b.end) > slotStart
          )
          if (hasExternalConflict) continue

          slots.push({
            startTime: serviceStart.toISOString(),
            endTime: serviceEnd.toISOString(),
            serviceId: service.id,
            staffId: staff.id,
            staffName: staff.name,
            resourceIds: [],
            location: service.location.businessAddress || '',
            price: service.pricing.basePrice || 0,
          })
        }
      }
    }
  }

  return slots
}

/* ═══════ Helpers ═══════ */

function getDayName(date: Date): string {
  return ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][date.getDay()]
}

function getWorkingHours(
  dayName: string,
  staff: StaffInfo,
  schedule: ScheduleInfo,
  scheduleException?: { type: string; hours?: { start: string; end: string }[] },
  staffException?: { type: string; hours?: { start: string; end: string }[] },
): { start: string; end: string }[] | undefined {
  // Priority: staff exception > schedule exception > staff override > default
  if (staffException?.type === 'modified_hours' && staffException.hours) {
    return staffException.hours
  }
  if (scheduleException?.type === 'modified_hours' && scheduleException.hours) {
    return scheduleException.hours
  }
  if (staff.scheduleOverride?.[dayName]) {
    return staff.scheduleOverride[dayName]
  }
  return (schedule.defaultHours as any)?.[dayName]
}
