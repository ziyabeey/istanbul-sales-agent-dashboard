import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import ActionCard from '@/app/dashboard/manage/components/experience/ActionCard'
import ExperienceLabPage from '@/app/dashboard/manage/experience-lab/page'
import {
  ACTION_CARD_DOMAIN_LABELS,
  formatDecisionDuration,
  formatExperienceDateTime,
  getActionCardEventLabel,
} from '@/lib/experience/turkishPresentation'
import type { ActionCardModel } from '@kepenk/ui'

describe('Turkish experience presentation', () => {
  it('maps all domain names without changing protocol identifiers', () => {
    expect(ACTION_CARD_DOMAIN_LABELS).toEqual({
      booking: 'Randevu', finance: 'Finans', inventory: 'Stok', property: 'Emlak',
      crm: 'Müşteriler', commerce: 'Satış', marketing: 'Pazarlama', system: 'Kepenk',
    })
  })

  it.each(['unknown.event', 'constructor', '__proto__', undefined])('never exposes the unknown event %s', event => {
    expect(getActionCardEventLabel(event)).toBeNull()
  })

  it('labels a known event in Turkish', () => {
    expect(getActionCardEventLabel('appointment.cancelled')).toBe('Randevu iptali')
  })

  it('formats dates with explicit Turkish locale and Istanbul time', () => {
    expect(formatExperienceDateTime('2026-09-24T16:30:00Z')).toBe('24 Eylül 2026, 19:30 (TSİ)')
    expect(formatExperienceDateTime('2026-09-24T19:30:00+03:00')).toBe('24 Eylül 2026, 19:30 (TSİ)')
    expect(formatExperienceDateTime('2026-09-24T22:30:00Z')).toBe('25 Eylül 2026, 01:30 (TSİ)')
  })

  it.each([undefined, '', 'not-a-date', '2026-09-24', '2026-09-24T19:30:00'])('does not invent local time for %s', value => {
    expect(formatExperienceDateTime(value)).toBeNull()
  })

  it('uses a decimal comma for seconds without calling the median an average', () => {
    expect(formatDecisionDuration(1250)).toBe('1,3 sn')
    expect(formatDecisionDuration(0)).toBe('0,0 sn')
    expect(formatDecisionDuration(null)).toBe('—')
    expect(formatDecisionDuration(NaN)).toBe('—')
    expect(formatDecisionDuration(-1)).toBe('—')
  })

  it('preserves machine data while hiding technical identifiers from visible copy', () => {
    const card: ActionCardModel = {
      id: 'internal-card-id',
      source: { domain: 'finance', eventId: 'unknown.private.event' },
      attention: 'info', state: 'new', title: 'Ödeme kaydını incele',
      deadlineAt: '2026-09-24T16:30:00Z',
      evidence: [{ id: 'opaque-evidence-reference' }],
      actions: [{ id: 'dismiss', label: 'Kapat', kind: 'dismiss' }],
    }
    const html = renderToStaticMarkup(createElement(ActionCard, { card, onAction: vi.fn() }))
    const document = new DOMParser().parseFromString(html, 'text/html')
    expect(document.body.textContent).toContain('Finans')
    expect(document.body.textContent).toContain('Dayanak: İlgili işlem kaydı')
    expect(document.body.textContent).not.toMatch(/unknown\.private\.event|opaque-evidence-reference|internal-card-id|2026-09-24T/)
    expect(document.querySelector('time')?.getAttribute('datetime')).toBe(card.deadlineAt)
    expect(card.source.eventId).toBe('unknown.private.event')
    expect(card.evidence?.[0].id).toBe('opaque-evidence-reference')
  })

  it('also localizes the linked card gallery and its explanations', () => {
    const html = renderToStaticMarkup(createElement(ExperienceLabPage))
    const document = new DOMParser().parseFromString(html, 'text/html')
    const text = document.body.textContent ?? ''
    expect(text).toContain('Kepenk · Örnek kartlar')
    expect(text).toContain('Gerçek randevu, ödeme veya stok kaydı değişmez')
    expect(text).not.toMatch(/canonical|versioned|envelope|capability|authority|deterministik|Finance|Commerce|Experience/)
  })
})
