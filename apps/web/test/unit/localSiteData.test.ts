import { describe, expect, it } from 'vitest'
import {
  buildLocalPreviewPath,
  buildLocalSiteDataFromEsnaf,
} from '@/lib/site/localSiteData'

describe('local site data helpers', () => {
  it('builds the local public preview path', () => {
    expect(buildLocalPreviewPath('abc')).toBe('/site-preview/abc')
  })

  it('creates deterministic site data from a real esnaf record', () => {
    const siteData = buildLocalSiteDataFromEsnaf({
      isletmeAdi: 'Kadıköy Usta Berber',
      sektor: 'berber',
      telefon: '+90 532 000 00 00',
      adres: 'Moda Cad. No: 12',
      sehir: 'İstanbul',
      ilce: 'Kadıköy',
      services: [
        { id: 'sac-kesimi', ad: 'Saç Kesimi', sureDakika: 35, fiyat: 600 },
      ],
    }, 'real-esnaf-01')

    expect(siteData.isletmeAdi).toBe('Kadıköy Usta Berber')
    expect(siteData.sektor).toBe('berber')
    expect(siteData.heroBaslik).toContain('Kadıköy Usta Berber')
    expect(siteData.heroAlt).toContain('Berber')
    expect(siteData.telefon).toBe('+90 532 000 00 00')
    expect(siteData.adres).toBe('Moda Cad. No: 12')
    expect(siteData.il).toBe('İstanbul')
    expect(siteData.ilce).toBe('Kadıköy')
    expect(siteData.hizmetler).toHaveLength(1)
    expect(siteData.hizmetler[0]).toMatchObject({
      id: 'sac-kesimi',
      ad: 'Saç Kesimi',
      sureDakika: 35,
      fiyat: 600,
    })
    expect(siteData.ctaText).toBe('Randevu iste')
    expect(siteData.generatedBy).toBe('local-deterministic')
    expect(siteData.generatedAt).toBe('1970-01-01T00:00:00.000Z')
  })

  it('uses safe fallbacks without env, Firebase, or external services', () => {
    const siteData = buildLocalSiteDataFromEsnaf({}, 'missing-fields')

    expect(siteData.isletmeAdi).toBe('İşletmeniz')
    expect(siteData.sektor).toBe('Hizmet İşletmesi')
    expect(siteData.telefon).toBe('')
    expect(siteData.adres).toBe('')
    expect(siteData.hizmetler.length).toBeGreaterThan(0)
    expect(siteData.yorumlar).toEqual([])
    expect(siteData.generatedBy).toBe('local-deterministic')
  })
})
