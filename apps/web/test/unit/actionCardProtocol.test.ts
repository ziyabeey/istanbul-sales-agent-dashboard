import { describe, expect, it } from 'vitest'
import {
  ActionCardProtocolSchema,
  evaluateActionCardCommand,
  findDuplicateActionCardDedupeKeys,
  type ActionCardProtocol,
} from '@kepenk/action-card-schema'
import { actionCardProtocolToModel } from '@kepenk/ui'

function bookingCard(overrides: Partial<ActionCardProtocol> = {}): ActionCardProtocol {
  return {
    protocolVersion: '1',
    cardId: 'card-1',
    businessId: 'business-1',
    dedupeKey: 'booking:appt-1:cancelled',
    revision: 1,
    source: {
      domain: 'booking',
      eventRef: { id: 'evt-1', type: 'appointment.cancelled' },
      occurredAt: '2026-09-24T16:00:00+03:00',
      subjectRefs: [{ type: 'appointment', id: 'appt-1' }],
      evidenceRefs: [],
    },
    attention: {
      urgency: 'high',
      importance: 80,
      riskClass: 'low',
    },
    presentation: {
      title: '15:30 randevusu iptal edildi.',
      context: '90 dakikalık boşluk oluştu.',
      tone: 'warning',
    },
    actions: [{
      actionId: 'fill-gap',
      label: 'Boşluğu doldur',
      mode: 'command',
      capability: { name: 'booking.waitlist.offer' },
      idempotencyKey: 'card-1:fill-gap',
      primary: true,
      requiresHumanConfirmation: true,
    }],
    state: 'new',
    expiresAt: '2026-09-24T18:00:00+03:00',
    ...overrides,
  }
}

describe('Action Card protocol', () => {
  it('accepts a valid canonical card and maps it to the presentation boundary', () => {
    const card = ActionCardProtocolSchema.parse(bookingCard())
    const model = actionCardProtocolToModel(card)

    expect(model.title).toBe('15:30 randevusu iptal edildi.')
    expect(model.attention).toBe('warning')
    expect(model).not.toHaveProperty('businessId')
    expect(model.actions[0]).not.toHaveProperty('capability')
    expect(model.actions[0]).not.toHaveProperty('idempotencyKey')
  })

  it('rejects more than one primary action', () => {
    const card = bookingCard({
      actions: [
        {
          actionId: 'one',
          label: 'One',
          mode: 'command',
          capability: { name: 'booking.one' },
          idempotencyKey: 'one',
          primary: true,
          requiresHumanConfirmation: false,
        },
        {
          actionId: 'two',
          label: 'Two',
          mode: 'command',
          capability: { name: 'booking.two' },
          idempotencyKey: 'two',
          primary: true,
          requiresHumanConfirmation: false,
        },
      ],
    })

    expect(ActionCardProtocolSchema.safeParse(card).success).toBe(false)
  })

  it('rejects an expired card before command execution', () => {
    expect(evaluateActionCardCommand({
      card: bookingCard(),
      actionId: 'fill-gap',
      allowedCapabilities: ['booking.waitlist.offer'],
      now: new Date('2026-09-24T18:00:01+03:00'),
    })).toEqual({ ok: false, reason: 'expired' })
  })

  it('rejects an unauthorized capability before command execution', () => {
    expect(evaluateActionCardCommand({
      card: bookingCard(),
      actionId: 'fill-gap',
      allowedCapabilities: ['booking.read'],
      now: new Date('2026-09-24T17:00:00+03:00'),
    })).toEqual({ ok: false, reason: 'unauthorized_capability' })
  })



  it('rejects a snoozed card before command execution', () => {
    expect(evaluateActionCardCommand({
      card: bookingCard({
        state: 'snoozed',
        snoozeUntil: '2026-09-24T17:30:00+03:00',
      }),
      actionId: 'fill-gap',
      allowedCapabilities: ['booking.waitlist.offer'],
      now: new Date('2026-09-24T17:00:00+03:00'),
    })).toEqual({ ok: false, reason: 'snoozed' })
  })

  it('rejects a card before notBefore', () => {
    expect(evaluateActionCardCommand({
      card: bookingCard({
        notBefore: '2026-09-24T17:30:00+03:00',
      }),
      actionId: 'fill-gap',
      allowedCapabilities: ['booking.waitlist.offer'],
      now: new Date('2026-09-24T17:00:00+03:00'),
    })).toEqual({ ok: false, reason: 'not_yet_active' })
  })

  it('rejects a command when its required permission is absent', () => {
    const card = bookingCard({
      actions: [{
        actionId: 'fill-gap',
        label: 'Boşluğu doldur',
        mode: 'command',
        capability: {
          name: 'booking.waitlist.offer',
          permission: 'booking.write',
        },
        idempotencyKey: 'card-1:fill-gap',
        primary: true,
        requiresHumanConfirmation: true,
      }],
    })

    expect(evaluateActionCardCommand({
      card,
      actionId: 'fill-gap',
      allowedCapabilities: ['booking.waitlist.offer'],
      allowedPermissions: ['booking.read'],
      now: new Date('2026-09-24T17:00:00+03:00'),
    })).toEqual({ ok: false, reason: 'unauthorized_permission' })
  })

  it('detects duplicate canonical dedupe keys', () => {
    const first = bookingCard()
    const second = bookingCard({ cardId: 'card-2', revision: 2 })

    expect(findDuplicateActionCardDedupeKeys([first, second])).toEqual([
      'booking:appt-1:cancelled',
    ])
  })
})
