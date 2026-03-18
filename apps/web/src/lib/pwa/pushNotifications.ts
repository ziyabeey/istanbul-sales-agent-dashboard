/**
 * Push Notification System — FCM + WhatsApp/SMS fallback + quiet hours
 * ─────────────────────────────────────────────────────────────────────
 */

type NotificationPriority = 'urgent' | 'high' | 'medium' | 'low'
type NotificationChannel = 'push' | 'whatsapp' | 'sms'

interface NotificationConfig {
  title: string
  body: string
  sound?: string
  channels: NotificationChannel[]
  priority: NotificationPriority
  throttle?: string         // e.g. '1/day', '3/week'
  actions?: { action: string; title: string; input?: boolean }[]
}

export const NOTIFICATION_CATEGORIES: Record<string, NotificationConfig> = {
  new_order: {
    title: 'Yeni Sipariş! 🛒',
    body: '{{müşteri_adı}} - {{toplam}} ₺',
    sound: 'cash_register',
    channels: ['push', 'whatsapp'],
    priority: 'urgent',
    actions: [{ action: 'confirm', title: 'Onayla ✓' }, { action: 'view', title: 'Detay' }],
  },
  new_booking: {
    title: 'Yeni Randevu! 📅',
    body: '{{müşteri_adı}} - {{hizmet}} - {{tarih_saat}}',
    channels: ['push', 'whatsapp'],
    priority: 'high',
    actions: [{ action: 'confirm', title: 'Onayla ✓' }, { action: 'reschedule', title: 'Değiştir' }],
  },
  new_message: {
    title: 'Yeni Mesaj 💬',
    body: '{{müşteri_adı}}: {{mesaj_önizleme}}',
    channels: ['push'],
    priority: 'high',
    actions: [{ action: 'reply', title: 'Yanıtla', input: true }],
  },
  low_stock: {
    title: 'Stok Uyarısı ⚠️',
    body: '{{ürün_adı}} stokta {{miktar}} kaldı',
    channels: ['push'],
    priority: 'medium',
    throttle: '1/day',
  },
  payment_received: {
    title: 'Ödeme Alındı! 💰',
    body: '{{müşteri_adı}} - {{tutar}} ₺',
    sound: 'coin',
    channels: ['push'],
    priority: 'medium',
  },
  daily_summary: {
    title: 'Günlük Özet 📊',
    body: 'Bugün: {{sipariş}} sipariş, {{gelir}} ₺ gelir',
    channels: ['push'],
    priority: 'low',
  },
  ai_insight: {
    title: 'AI Öneri 💡',
    body: '{{öneri_metni}}',
    channels: ['push'],
    priority: 'low',
    throttle: '3/week',
  },
  booking_reminder: {
    title: 'Randevu Hatırlatma 🔔',
    body: '{{müşteri_adı}} — {{hizmet}} — Yarın {{saat}}',
    channels: ['push', 'whatsapp'],
    priority: 'high',
  },
}

/* ═══════ Quiet Hours ═══════ */

interface QuietHoursConfig {
  enabled: boolean
  start: string     // "22:00"
  end: string       // "07:00"
  timezone: string
  overrideForUrgent: boolean
}

export const DEFAULT_QUIET_HOURS: QuietHoursConfig = {
  enabled: true,
  start: '22:00',
  end: '07:00',
  timezone: 'Europe/Istanbul',
  overrideForUrgent: true,
}

export function isInQuietHours(config: QuietHoursConfig = DEFAULT_QUIET_HOURS): boolean {
  if (!config.enabled) return false
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const current = hours * 60 + minutes

  const [startH, startM] = config.start.split(':').map(Number)
  const [endH, endM] = config.end.split(':').map(Number)
  const start = startH * 60 + startM
  const end = endH * 60 + endM

  if (start > end) {
    // Crosses midnight (e.g., 22:00 - 07:00)
    return current >= start || current < end
  }
  return current >= start && current < end
}

export function shouldSendNotification(
  category: string,
  priority: NotificationPriority,
  quietHours: QuietHoursConfig = DEFAULT_QUIET_HOURS,
): { send: boolean; queue: boolean; reason?: string } {
  if (isInQuietHours(quietHours)) {
    if (priority === 'urgent' && quietHours.overrideForUrgent) {
      return { send: true, queue: false }
    }
    return { send: false, queue: true, reason: 'Sessiz saatler — sabah gönderilecek' }
  }
  return { send: true, queue: false }
}

/* ═══════ Fallback Chain ═══════ */

export const FALLBACK_DELAYS = {
  push_to_whatsapp: 2 * 60 * 1000,   // 2 min
  whatsapp_to_sms: 5 * 60 * 1000,    // 5 min
}

/* ═══════ Customer Push Types ═══════ */

export const CUSTOMER_PUSH_TYPES = {
  order_update:      { requiresOptIn: false, label: 'Sipariş bildirimi' },
  booking_reminder:  { requiresOptIn: false, label: 'Randevu hatırlatma' },
  promotion:         { requiresOptIn: true,  label: 'Kampanya bildirimi' },
  back_in_stock:     { requiresOptIn: true,  label: 'Stok bildirimi' },
  loyalty_update:    { requiresOptIn: true,  label: 'Sadakat bildirimi' },
}
