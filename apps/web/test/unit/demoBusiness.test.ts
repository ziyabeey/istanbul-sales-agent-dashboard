import { describe, expect, it } from 'vitest'
import { demoBusiness } from '@/data/demoBusiness'
import { DEMO_ESNAF_ID } from '@/lib/demoMode'

describe('demoBusiness seed data', () => {
  it('uses the expected demo business id', () => {
    expect(demoBusiness.id).toBe(DEMO_ESNAF_ID)
    expect(demoBusiness.esnafId).toBe(DEMO_ESNAF_ID)
  })

  it('keeps the MVP demo seed counts stable', () => {
    expect(demoBusiness.services).toHaveLength(4)
    expect(demoBusiness.customers).toHaveLength(3)
    expect(demoBusiness.conversations).toHaveLength(2)
    expect(demoBusiness.appointments).toHaveLength(2)
  })

  it('assigns every demo appointment to the demo business', () => {
    expect(demoBusiness.appointments.every((appointment) => appointment.esnafId === DEMO_ESNAF_ID)).toBe(true)
  })

  it('keeps every demo conversation aligned with its message count', () => {
    for (const conversation of demoBusiness.conversations) {
      expect(conversation.musteriNumara).toBeTruthy()
      expect(conversation.sonMesaj).toBeTruthy()
      expect(conversation.mesajSayisi).toBeGreaterThan(0)
      expect(Array.isArray(conversation.messages)).toBe(true)
      expect(conversation.messages).toHaveLength(conversation.mesajSayisi)
    }
  })

  it('includes local website preview content', () => {
    expect(demoBusiness.siteData).toBeTruthy()
    expect(demoBusiness.siteData.isletmeAdi).toBeTruthy()
    expect(demoBusiness.siteData.heroBaslik).toBeTruthy()
    expect(demoBusiness.siteData.heroAlt).toBeTruthy()
    expect(demoBusiness.siteData.hizmetler).toBeTruthy()
    expect(demoBusiness.siteData.telefon).toBeTruthy()
    expect(demoBusiness.siteData.adres).toBeTruthy()
  })
})
