import { describe, expect, it } from 'vitest'
import {
  parseRandevuAppointmentEvent,
  randevuEventToActionCard,
} from '../../src/lib/experience/randevuEventAdapter'

const businessId = '41000000-0000-4000-8000-000000000001'
const appointmentId = '42000000-0000-4000-8000-000000000001'
const eventId = '43000000-0000-4000-8000-000000000001'
const groupId = '44000000-0000-4000-8000-000000000001'

function event(overrides: Record<string, unknown> = {}) {
  return {
    id: eventId,
    event_type: 'cancelled',
    actor_user_id: null,
    from_status: 'confirmed',
    to_status: 'cancelled',
    payload: {},
    created_at: '2026-09-24T12:00:00+03:00',
    ...overrides,
  }
}

describe('K4 Randevu canonical event adapter', () => {
  it('accepts the real appointment event response shape', () => {
    expect(parseRandevuAppointmentEvent(event())).toMatchObject({
      id: eventId,
      event_type: 'cancelled',
      actor_user_id: null,
    })
  })

  it('maps a cancellation to a booking Action Card without inventing a command', () => {
    const card = randevuEventToActionCard({
      businessId,
      appointmentId,
      event: event(),
      reservation: {
        startsAt: '2026-09-24T15:30:00+03:00',
        endsAt: '2026-09-24T17:00:00+03:00',
        timezone: 'Europe/Istanbul',
        serviceName: 'Saç kesimi',
      },
    })

    expect(card?.source.domain).toBe('booking')
    expect(card?.source.eventRef).toEqual({
      id: eventId,
      type: 'appointment.cancelled',
      revision: undefined,
    })
    expect(card?.presentation.title).toContain('15:30')
    expect(card?.presentation.context).toContain('Saç kesimi')
    expect(card?.actions.map(action => action.mode)).toEqual(['snooze', 'dismiss'])
    expect(card?.actions.some(action => action.mode === 'command')).toBe(false)
    expect(card?.dedupeKey).toBe(`randevu-event:${eventId}`)
  })

  it('uses canonical group metadata only as evidence/suppression context', () => {
    const card = randevuEventToActionCard({
      businessId,
      appointmentId,
      event: event({
        payload: { groupId, groupVersion: 7, lineOrdinal: 2, reason: 'Müşteri iptali' },
      }),
    })

    expect(card?.source.eventRef.revision).toBe(7)
    expect(card?.source.subjectRefs).toContainEqual({ type: 'booking_group', id: groupId })
    expect(card?.suppressionGroup).toBe(`booking-group:${groupId}:v7:cancelled`)
    expect(card?.presentation.context).toContain('2. hizmet iptal edildi')
    expect(card?.presentation.context).not.toContain('Müşteri iptali')
  })

  it('does not fabricate time, customer or empty-slot duration when context is absent', () => {
    const card = randevuEventToActionCard({ businessId, appointmentId, event: event() })

    expect(card?.presentation.title).toBe('Bir randevuda iptal var.')
    expect(card?.presentation.context).not.toMatch(/dakika|müşteri|15:30/i)
    expect(card?.attention.urgency).toBe('normal')
  })

  it('returns null for unsupported but valid lifecycle events', () => {
    expect(randevuEventToActionCard({
      businessId,
      appointmentId,
      event: event({ event_type: 'confirmed', to_status: 'confirmed' }),
    })).toBeNull()
  })

  it('fails closed for malformed or cross-scope-shaped inputs', () => {
    expect(parseRandevuAppointmentEvent({ ...event(), id: 'not-a-uuid' })).toBeNull()
    expect(randevuEventToActionCard({
      businessId: 'legacy-esnaf-id',
      appointmentId,
      event: event(),
    })).toBeNull()
    expect(randevuEventToActionCard({
      businessId,
      appointmentId: 'not-a-uuid',
      event: event(),
    })).toBeNull()
  })
})
