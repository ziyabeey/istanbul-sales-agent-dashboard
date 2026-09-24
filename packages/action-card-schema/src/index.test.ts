import { describe, expect, it } from 'vitest'
import {
  ActionCardProtocolSchema,
  evaluateActionCardCommand,
  findDuplicateActionCardDedupeKeys,
  type ActionCardProtocol,
} from './index'

function bookingCard(overrides: Partial<ActionCardProtocol> = {}): ActionCardProtocol {
  return {
    protocolVersion: '1',
    cardId: 'card-1',
    businessId: 'business-1',
    dedupeKey: 'booking:appt-1:cancelled',
    revision: 1,
    source: {
      domain: 'booking',
      eventRef: {
        id: 'evt-1',
        type: 'appointment.cancelled',
      },
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
    },
    actions: [
      {
        actionId: 'fill-gap',
        label: 'Boşluğu doldur',
        mode: 'command',
        capability: { name: 'booking.waitlist.offer' },
        idempotencyKey: 'card-1:fill-gap',
        primary: true,
        requiresHumanConfirmation: true,
      },
    ],
    state: 'new',
    expiresAt: '2026-09-24T18:00:00+03:00',
    ...overrides,
  }
}

describe('ActionCardProtocolSchema', () => {
  it('accepts a valid canonical card', () => {
    expect(ActionCardProtocolSchema.parse(bookingCard()).cardId).toBe('card-1')
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
    const result = evaluateActionCardCommand({
      card: bookingCard(),
      actionId: 'fill-gap',
      allowedCapabilities: ['booking.waitlist.offer'],
      now: new Date('2026-09-24T18:00:01+03:00'),
    })

    expect(result).toEqual({ ok: false, reason: 'expired' })
  })

  it('rejects a command when the capability is not allowed', () => {
    const result = evaluateActionCardCommand({
      card: bookingCard(),
      actionId: 'fill-gap',
      allowedCapabilities: ['booking.read'],
      now: new Date('2026-09-24T17:00:00+03:00'),
    })

    expect(result).toEqual({ ok: false, reason: 'unauthorized_capability' })
  })

  it('detects duplicate cards by canonical dedupe key', () => {
    const first = bookingCard()
    const second = bookingCard({
      cardId: 'card-2',
      revision: 2,
    })

    expect(findDuplicateActionCardDedupeKeys([first, second])).toEqual([
      'booking:appt-1:cancelled',
    ])
  })
})
