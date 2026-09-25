import type { ActionCardModel } from '@kepenk/ui'

export const ACTION_CARD_DOMAIN_LABELS: Record<ActionCardModel['source']['domain'], string> = {
  booking: 'Randevu',
  finance: 'Finans',
  inventory: 'Stok',
  property: 'Emlak',
  crm: 'Müşteriler',
  commerce: 'Satış',
  marketing: 'Pazarlama',
  system: 'Kepenk',
}

const eventLabels: Readonly<Record<string, string>> = {
  'appointment.cancelled': 'Randevu iptali',
  'receivable.attention_required': 'Bekleyen tahsilat',
  'receivable.overdue': 'Geciken tahsilat',
  'payment.attention_required': 'Ödeme kontrolü',
  'stock.projected_low': 'Stok uyarısı',
  'inventory.low_forecast': 'Stok uyarısı',
  'property.match.created': 'Yeni eşleşme',
}

// Unknown technical identifiers remain in the model, not in customer-facing copy.
export function getActionCardEventLabel(eventId: string | undefined): string | null {
  return eventId && Object.hasOwn(eventLabels, eventId) ? eventLabels[eventId] : null
}

const dateFormatter = new Intl.DateTimeFormat('tr-TR', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Istanbul',
})
const timeFormatter = new Intl.DateTimeFormat('tr-TR', {
  hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Istanbul',
})
const secondsFormatter = new Intl.NumberFormat('tr-TR', {
  minimumFractionDigits: 1, maximumFractionDigits: 1,
})

export function formatExperienceDateTime(value: string | undefined): string | null {
  // Require an explicit offset so server and browser cannot interpret local time differently.
  if (!value || !/(?:Z|[+-]\d{2}:\d{2})$/i.test(value)) return null
  const date = new Date(value)
  if (!Number.isFinite(date.getTime())) return null
  return `${dateFormatter.format(date)}, ${timeFormatter.format(date)} (TSİ)`
}

export function formatDecisionDuration(milliseconds: number | null): string {
  if (milliseconds === null || !Number.isFinite(milliseconds) || milliseconds < 0) return '—'
  return `${secondsFormatter.format(milliseconds / 1000)} sn`
}
