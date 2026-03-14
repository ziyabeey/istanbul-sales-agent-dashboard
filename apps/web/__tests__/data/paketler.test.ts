/**
 * paketler.test.ts — Paket Fiyatlandirma Veri Butunlugu Testleri
 */
import { describe, it, expect } from 'vitest'
import { PAKETLER, PAKET_FIYATLARI_AYLIK, PAKET_KOTALARI } from '@/data/paketler'
import { PAKET_FIYATLARI, AYLIK_KREDI_LIMITLERI, type PaketTipi } from '@/types'

describe('paketler — veri butunlugu', () => {
    describe('PAKETLER dizisi', () => {
        it('5 paket olmali', () => {
            expect(PAKETLER).toHaveLength(5)
        })

        it('dogru sirada olmali', () => {
            const ids = PAKETLER.map(p => p.id)
            expect(ids).toEqual(['temel', 'standart', 'buyume', 'premium', 'premiumplus'])
        })

        it('her paketin zorunlu alanlari olmali', () => {
            for (const p of PAKETLER) {
                expect(p.id).toBeTruthy()
                expect(p.name).toBeTruthy()
                expect(p.aylikFiyat).toBeGreaterThan(0)
                expect(p.yillikFiyatAylik).toBeGreaterThan(0)
                expect(p.teknoloji).toBeTruthy()
                expect(p.aiKredi).toBeTruthy()
                expect(p.ozellikler.length).toBeGreaterThanOrEqual(3)
            }
        })

        it('yillik aylik fiyat < aylik fiyat olmali (indirim)', () => {
            for (const p of PAKETLER) {
                expect(p.yillikFiyatAylik).toBeLessThan(p.aylikFiyat)
            }
        })

        it('fiyatlar artan sirada olmali', () => {
            for (let i = 1; i < PAKETLER.length; i++) {
                expect(PAKETLER[i].aylikFiyat).toBeGreaterThan(PAKETLER[i - 1].aylikFiyat)
            }
        })

        it('sadece buyume paketin populer olmali', () => {
            const populerler = PAKETLER.filter(p => p.populer)
            expect(populerler).toHaveLength(1)
            expect(populerler[0].id).toBe('buyume')
        })

        it('premium ve premiumplus premium olmali', () => {
            const premiumlar = PAKETLER.filter(p => p.premium)
            expect(premiumlar).toHaveLength(2)
            expect(premiumlar.map(p => p.id)).toContain('premium')
            expect(premiumlar.map(p => p.id)).toContain('premiumplus')
        })
    })

    describe('PAKET_FIYATLARI_AYLIK (eski uyumluluk)', () => {
        it('5 paket fiyati olmali', () => {
            expect(Object.keys(PAKET_FIYATLARI_AYLIK)).toHaveLength(5)
        })

        it('PAKETLER ile tutarli olmali', () => {
            expect(PAKET_FIYATLARI_AYLIK.TEMEL).toBe(PAKETLER[0].aylikFiyat)
            expect(PAKET_FIYATLARI_AYLIK.PREMIUMPLUS).toBe(PAKETLER[4].aylikFiyat)
        })
    })

    describe('PAKET_KOTALARI (eski uyumluluk)', () => {
        it('dogru kota degerleri olmali', () => {
            expect(PAKET_KOTALARI.TEMEL).toBe(100)
            expect(PAKET_KOTALARI.STANDART).toBe(250)
            expect(PAKET_KOTALARI.BUYUME).toBe(750)
            expect(PAKET_KOTALARI.PREMIUM).toBe(2000)
            expect(PAKET_KOTALARI.PREMIUMPLUS).toBe(5000)
        })
    })

    describe('PAKET_FIYATLARI (yillik pesin)', () => {
        it('5 paket olmali', () => {
            expect(Object.keys(PAKET_FIYATLARI)).toHaveLength(5)
        })

        it('artan sirada olmali', () => {
            const keys: PaketTipi[] = ['TEMEL', 'STANDART', 'BUYUME', 'PREMIUM', 'PREMIUMPLUS']
            for (let i = 1; i < keys.length; i++) {
                expect(PAKET_FIYATLARI[keys[i]]).toBeGreaterThan(PAKET_FIYATLARI[keys[i - 1]])
            }
        })
    })

    describe('AYLIK_KREDI_LIMITLERI', () => {
        it('5 tier olmali', () => {
            expect(Object.keys(AYLIK_KREDI_LIMITLERI)).toHaveLength(5)
        })

        it('artan sirada olmali', () => {
            const keys: PaketTipi[] = ['TEMEL', 'STANDART', 'BUYUME', 'PREMIUM', 'PREMIUMPLUS']
            for (let i = 1; i < keys.length; i++) {
                expect(AYLIK_KREDI_LIMITLERI[keys[i]]).toBeGreaterThan(AYLIK_KREDI_LIMITLERI[keys[i - 1]])
            }
        })

        it('TEMEL en az 100 olmali', () => {
            expect(AYLIK_KREDI_LIMITLERI.TEMEL).toBeGreaterThanOrEqual(100)
        })

        it('PREMIUMPLUS en az 5000 olmali', () => {
            expect(AYLIK_KREDI_LIMITLERI.PREMIUMPLUS).toBeGreaterThanOrEqual(5000)
        })
    })
})
