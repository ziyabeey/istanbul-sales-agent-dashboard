import {
  ActionCardProtocolSchema,
  type ActionCardProtocol,
} from '@kepenk/action-card-schema'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export const RANDEVU_APPOINTMENT_EVENT_TYPES = [
  'created',
  'rescheduled',
  'confirmed',
  'cancelled',
  'completed',
  'no_show',
  'service_changed',
] as const

export type RandevuAppointmentEventType = typeof RANDEVU_APPOINTMENT_EVENT_TYPES[number]

export interface RandevuAppointmentEvent {
  id: string
  event_type: RandevuAppointmentEventType
  actor_user_id: string | null
  from_status: string | null
  to_status: string | null
  payload: Record<string, unknown>
  created_at: string
}

export interface RandevuReservationContext {
  startsAt?: string
  endsAt?: string
  timezone?: string
  serviceName?: string
}

export interface RandevuEventAdapterInput {
  businessId: string
  appointmentId: string
  event: unknown
  reservation?: RandevuReservationContext
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isUuid(value: unknown): value is string {
  return typeof value === 'string' && UUID.test(value)
}

function isTimestamp(value: unknown): value is string {
  return typeof value === 'string' && Number.isFinite(Date.parse(value))
}

function optionalString(value: unknown): value is string | null {
  return value === null || typeof value === 'string'
}

export function parseRandevuAppointmentEvent(input: unknown): RandevuAppointmentEvent | null {
  if (!isRecord(input)) return null
  if (!isUuid(input.id)) return null
  if (!RANDEVU_APPOINTMENT_EVENT_TYPES.includes(input.event_type as RandevuAppointmentEventType)) return null
  if (!(input.actor_user_id === null || isUuid(input.actor_user_id))) return null
  if (!optionalString(input.from_status) || !optionalString(input.to_status)) return null
  if (!isRecord(input.payload) || !isTimestamp(input.created_at)) return null

  return {
    id: input.id,
    event_type: input.event_type as RandevuAppointmentEventType,
    actor_user_id: input.actor_user_id as string | null,
    from_status: input.from_status as string | null,
    to_status: input.to_status as string | null,
    payload: input.payload,
    created_at: input.created_at as string,
  }
}

function positiveInteger(value: unknown): number | null {
  return typeof value === 'number' && Number.isInteger(value) && value > 0 ? value : null
}

function groupMetadata(payload: Record<string, unknown>) {
  const groupId = isUuid(payload.groupId) ? payload.groupId : null
  const groupVersion = positiveInteger(payload.groupVersion)
  const lineOrdinal = positiveInteger(payload.lineOrdinal)
  return { groupId, groupVersion, lineOrdinal }
}

function safeReservationContext(input: RandevuReservationContext | undefined) {
  if (!input) return null
  const startsAt = isTimestamp(input.startsAt) ? input.startsAt : null
  const endsAt = isTimestamp(input.endsAt) ? input.endsAt : null
  const timezone = typeof input.timezone === 'string' && input.timezone.length <= 80
    ? input.timezone
    : 'Europe/Istanbul'
  const serviceName = typeof input.serviceName === 'string' && input.serviceName.trim().length > 0
    ? input.serviceName.trim().slice(0, 120)
    : null
  return { startsAt, endsAt, timezone, serviceName }
}

function localTime(startsAt: string, timezone: string) {
  try {
    return new Intl.DateTimeFormat('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: timezone,
    }).format(new Date(startsAt))
  } catch {
    return null
  }
}

function cancellationAttention(
  reservation: ReturnType<typeof safeReservationContext>,
  createdAt: string,
) {
  if (!reservation?.startsAt) {
    return { urgency: 'normal' as const, importance: 68 }
  }

  const start = Date.parse(reservation.startsAt)
  const eventAt = Date.parse(createdAt)
  const delta = start - eventAt

  if (delta >= 0 && delta <= 6 * 60 * 60 * 1000) {
    return { urgency: 'high' as const, importance: 88 }
  }
  if (delta >= 0 && delta <= 24 * 60 * 60 * 1000) {
    return { urgency: 'high' as const, importance: 80 }
  }
  return { urgency: 'normal' as const, importance: 68 }
}

export function randevuEventToActionCard(input: RandevuEventAdapterInput): ActionCardProtocol | null {
  if (!isUuid(input.businessId) || !isUuid(input.appointmentId)) return null

  const event = parseRandevuAppointmentEvent(input.event)
  if (!event || event.event_type !== 'cancelled') return null

  const meta = groupMetadata(event.payload)
  const reservation = safeReservationContext(input.reservation)
  const time = reservation?.startsAt ? localTime(reservation.startsAt, reservation.timezone) : null
  const attention = cancellationAttention(reservation, event.created_at)

  const groupScope = meta.groupId
    ? `booking-group:${meta.groupId}:v${meta.groupVersion ?? 'unknown'}:cancelled`
    : `booking-appointment:${input.appointmentId}:cancelled`

  const lineText = meta.lineOrdinal
    ? `Rezervasyonun ${meta.lineOrdinal}. hizmet satırında iptal kaydı oluştu.`
    : 'Randevu kaynağında iptal kaydı oluştu.'

  const serviceText = reservation?.serviceName
    ? ` Hizmet: ${reservation.serviceName}.`
    : ''

  const card: ActionCardProtocol = {
    protocolVersion: '1',
    cardId: `randevu-event:${event.id}`,
    businessId: input.businessId,
    dedupeKey: `randevu-event:${event.id}`,
    revision: 1,
    source: {
      domain: 'booking',
      eventRef: {
        id: event.id,
        type: 'appointment.cancelled',
        revision: meta.groupVersion ?? undefined,
      },
      occurredAt: event.created_at,
      subjectRefs: [
        { type: 'appointment', id: input.appointmentId },
        ...(meta.groupId ? [{ type: 'booking_group', id: meta.groupId }] : []),
      ],
      evidenceRefs: [
        { id: event.id, kind: 'appointment_event', label: 'Randevu iptal olayı' },
      ],
    },
    attention: {
      urgency: attention.urgency,
      importance: attention.importance,
      riskClass: 'low',
      deadlineAt: reservation?.startsAt ?? undefined,
    },
    presentation: {
      title: time ? `${time} rezervasyonunda iptal var.` : 'Bir rezervasyon iptal edildi.',
      context: `${lineText}${serviceText} Takvim etkisini kontrol edebilirsin.`,
      reason: 'Bu kart Randevu’nun canonical appointment_events kaydından üretildi.',
      tone: 'warning',
    },
    actions: [
      {
        actionId: 'snooze',
        label: 'Daha sonra',
        mode: 'snooze',
        primary: false,
        requiresHumanConfirmation: false,
      },
      {
        actionId: 'dismiss',
        label: 'Kapat',
        mode: 'dismiss',
        primary: false,
        requiresHumanConfirmation: false,
      },
    ],
    state: 'new',
    suppressionGroup: groupScope,
    expiresAt: reservation?.endsAt ?? undefined,
    batchHint: 'booking-attention',
  }

  return ActionCardProtocolSchema.parse(card)
}
