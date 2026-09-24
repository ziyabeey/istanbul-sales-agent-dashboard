import type { ActionCardProtocol } from '@kepenk/action-card-schema'
import { randevuEventToActionCard } from '@/lib/experience/randevuEventAdapter'

const randevuCancellationCard = randevuEventToActionCard({
  businessId: '41000000-0000-4000-8000-000000000001',
  appointmentId: '42000000-0000-4000-8000-000000000001',
  event: {
    id: '43000000-0000-4000-8000-000000000001',
    event_type: 'cancelled',
    actor_user_id: null,
    from_status: 'confirmed',
    to_status: 'cancelled',
    payload: {
      groupId: '44000000-0000-4000-8000-000000000001',
      groupVersion: 3,
      lineOrdinal: 1,
      reason: 'Demo canonical cancellation',
    },
    created_at: '2026-09-24T12:00:00+03:00',
  },
  reservation: {
    startsAt: '2026-09-24T15:30:00+03:00',
    endsAt: '2026-09-24T17:00:00+03:00',
    timezone: 'Europe/Istanbul',
    serviceName: 'Saç kesimi',
  },
})

if (!randevuCancellationCard) {
  throw new Error('K4 canonical Randevu demo fixture is invalid')
}

export const DEMO_ACTION_CARDS: ActionCardProtocol[] = [
  randevuCancellationCard,
  {
    protocolVersion: '1',
    cardId: 'demo-payment-attention',
    businessId: 'demo-business',
    dedupeKey: 'finance:receivables:attention',
    revision: 1,
    source: {
      domain: 'finance',
      eventRef: { id: 'evt-finance-1', type: 'receivable.attention_required' },
      occurredAt: '2026-09-24T12:00:00+03:00',
      subjectRefs: [{ type: 'receivable_group', id: 'open-receivables' }],
      evidenceRefs: [{ id: 'open-tickets-3', kind: 'finance_projection', label: '3 açık adisyon' }],
    },
    attention: { urgency: 'normal', importance: 68, riskClass: 'medium' },
    presentation: {
      title: '₺12.450 tahsilat bekliyor.',
      context: 'Üç açık adisyon ödeme bekliyor. En eski kayıt iki gün önce oluşturuldu.',
      reason: 'Bu kart finansal gerçeği hesaplamaz; canonical Finance projection sonucunu yalnız sunar.',
      tone: 'info',
    },
    actions: [
      {
        actionId: 'review-receivables',
        label: 'Tahsilatları incele',
        mode: 'navigate',
        href: '/dashboard/manage/odemeler',
        primary: true,
        requiresHumanConfirmation: false,
      },
      { actionId: 'snooze', label: 'Daha sonra', mode: 'snooze', primary: false, requiresHumanConfirmation: false },
      { actionId: 'dismiss', label: 'Kapat', mode: 'dismiss', primary: false, requiresHumanConfirmation: false },
    ],
    suppressionGroup: 'finance-attention',
    state: 'new',
  },
  {
    protocolVersion: '1',
    cardId: 'demo-stock-risk',
    businessId: 'demo-business',
    dedupeKey: 'inventory:forecast:low:3',
    revision: 1,
    source: {
      domain: 'inventory',
      eventRef: { id: 'evt-inventory-1', type: 'stock.projected_low' },
      occurredAt: '2026-09-24T10:00:00+03:00',
      subjectRefs: [{ type: 'inventory_group', id: 'salon-consumables' }],
      evidenceRefs: [
        { id: 'stock-snapshot-1', kind: 'inventory', label: 'Mevcut stok' },
        { id: 'booking-demand-1', kind: 'booking_projection', label: 'Yaklaşan randevu talebi' },
      ],
    },
    attention: { urgency: 'high', importance: 76, riskClass: 'medium' },
    presentation: {
      title: '3 ürün 4 gün içinde bitebilir.',
      context: 'Yaklaşan randevu yoğunluğuna göre açıcı ve iki sarf kaleminde stok riski oluşuyor.',
      reason: 'Stok ve planlı talep aynı kartta yalnız kanıt referansları üzerinden buluşur.',
      tone: 'critical',
    },
    actions: [
      {
        actionId: 'view-supply',
        label: 'Sipariş seçeneklerini gör',
        mode: 'navigate',
        href: '/dashboard/manage/tedarik',
        primary: true,
        requiresHumanConfirmation: false,
      },
      { actionId: 'snooze', label: 'Daha sonra', mode: 'snooze', primary: false, requiresHumanConfirmation: false },
      { actionId: 'dismiss', label: 'Kapat', mode: 'dismiss', primary: false, requiresHumanConfirmation: false },
    ],
    suppressionGroup: 'inventory-risk',
    state: 'new',
  },
  {
    protocolVersion: '1',
    cardId: 'demo-property-match',
    businessId: 'demo-business',
    dedupeKey: 'property:match:ayse:20260924',
    revision: 1,
    source: {
      domain: 'property',
      eventRef: { id: 'evt-property-1', type: 'property.match.created' },
      occurredAt: '2026-09-24T09:20:00+03:00',
      subjectRefs: [{ type: 'customer', id: 'ayse-demo' }],
      evidenceRefs: [{ id: 'match-set-1', kind: 'property_match', label: '3 portföy eşleşmesi' }],
    },
    attention: { urgency: 'low', importance: 56, riskClass: 'low' },
    presentation: {
      title: 'Ayşe Hanım için 3 yeni eşleşme var.',
      context: 'İki mülk bütçe ve lokasyon tercihleriyle güçlü biçimde eşleşiyor.',
      reason: 'Müşteri talebi ile aktif portföyün deterministik eşleştirme sonucu.',
      tone: 'positive',
    },
    actions: [
      {
        actionId: 'review-matches',
        label: 'Eşleşmeleri incele',
        mode: 'navigate',
        href: '/dashboard/emlak',
        primary: true,
        requiresHumanConfirmation: false,
      },
      { actionId: 'dismiss', label: 'Kapat', mode: 'dismiss', primary: false, requiresHumanConfirmation: false },
    ],
    suppressionGroup: 'property-matches',
    batchHint: 'daily-opportunities',
    state: 'new',
  },
]
