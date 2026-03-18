/**
 * @kepenk/whatsapp — Time Slot Utilities
 */

/**
 * Generate time slots between start and end with given interval.
 * @param start HH:MM format
 * @param end HH:MM format
 * @param intervalMinutes slot duration in minutes
 * @returns Array of HH:MM strings
 */
export function generateTimeSlots(start: string, end: string, intervalMinutes: number): string[] {
  const slots: string[] = []
  let [h, m] = start.split(':').map(Number)
  const [endH, endM] = end.split(':').map(Number)

  while (h < endH || (h === endH && m < endM)) {
    slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    m += intervalMinutes
    if (m >= 60) { h += Math.floor(m / 60); m = m % 60 }
  }
  return slots
}

/**
 * Filter out already-booked slots.
 */
export function getAvailableSlots(
  allSlots: string[],
  bookedSlots: string[]
): string[] {
  const booked = new Set(bookedSlots)
  return allSlots.filter(s => !booked.has(s))
}

/**
 * Format a slot for display: "14:00" → "14:00"
 * Can be extended for locale-specific formatting.
 */
export function formatSlot(slot: string): string {
  return slot
}

/**
 * Check if a time string is within working hours.
 */
export function isWithinWorkingHours(
  time: string,
  openTime: string,
  closeTime: string
): boolean {
  return time >= openTime && time < closeTime
}
