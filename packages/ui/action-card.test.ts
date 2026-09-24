import { describe, expect, it } from 'vitest'
import type { ActionCardProtocol } from '@kepenk/action-card-schema'
import { actionCardProtocolToModel } from './action-card'

describe('actionCardProtocolToModel', () => {
  it('maps canonical protocol data without exposing command internals', () => {
    const card: ActionCardProtocol = {
      protocolVersion: '1',
      cardId: 'property-card-1',
      businessId: 'business-1',
      dedupeKey: 'property:match-1',
      revision: 1,
      source: {
        domain: 'property',
        eventRef: { id: 'evt-1', type: 'property.match.created' },
        occurredAt: '2026-09-24T19:00:00+03:00',
        subjectRefs: [{ type: 'contact', id: 'contact-1' }],
        evidenceRefs: [{ id: 'match-1', kind: 'property_match', label: '3 yeni eşleşme' }],
      },
      attention: {
        urgency: 'normal',
        importance: 70,
        riskClass: 'low',
      },
      presentation: {
        title: 'Ayşe Hanım için 3 yeni eşleşme var.',
        context: 'İki mülk güçlü biçimde eşleşiyor.',
        tone: 'positive',
      },
      actions: [{
        actionId: 'review',
        label: 'Eşleşmeleri incele',
        mode: 'navigate',
        href: '/dashboard/emlak',
        primary: true,
        requiresHumanConfirmation: false,
      }],
      state: 'new',
    }

    const model = actionCardProtocolToModel(card)

    expect(model.attention).toBe('positive')
    expect(model.source.eventId).toBe('property.match.created')
    expect(model.actions).toEqual([
      {
        id: 'review',
        label: 'Eşleşmeleri incele',
        kind: 'navigate',
        primary: true,
        requiresConfirmation: false,
      },
    ])
    expect(model).not.toHaveProperty('businessId')
    expect(model.actions[0]).not.toHaveProperty('href')
  })
})
