/**
 * agentRunner.test.ts — Ajan Model Haritalama ve Prompt Testleri
 *
 * NOT: Gercek AI API cagrilari yapilmaz, sadece yapisal dogruluk test edilir.
 */
import { describe, it, expect } from 'vitest'
import { vi } from 'vitest'

// Firebase mock
vi.mock('@/lib/firebaseAdmin', () => ({
    adminDb: {
        collection: vi.fn(() => ({
            doc: vi.fn(() => ({
                get: vi.fn(async () => ({ exists: false, data: () => undefined })),
                set: vi.fn(),
            })),
            add: vi.fn(async () => ({ id: 'mock-log-id' })),
        })),
        runTransaction: vi.fn(),
    },
    Timestamp: { now: () => ({ seconds: 0 }) },
}))

// Circuit breaker mock
vi.mock('@/lib/circuitBreaker', () => ({
    devreKontrol: vi.fn(() => ({ izinVar: true, durum: 'CLOSED' })),
    devreBasarili: vi.fn(),
    devreHata: vi.fn(),
    circuitBreakerHatasiMi: vi.fn(() => false),
}))

// platformZekasiPrompt mock
vi.mock('@/utils/platformZekasiPrompt', () => ({
    platformZekasiGetir: vi.fn(async () => ''),
}))

import { AJAN_PROMPTLARI } from '@/agents/agentRunner'

describe('agentRunner — yapisal kontroller', () => {
    describe('AJAN_PROMPTLARI', () => {
        const TUMU = [
            'esnaf_asistani', 'overseer', 'sentiment_guardian', 'the_closer',
            'churn_detective', 'orchestrator', 'telefon_komutani', 'muzakereci',
            'destek_upsell', 'degisiklik_ajani', 'ik_ajani',
            'the_creator', 'lead_madencisi', 'derin_arastirmaci',
            'mesaj_mimari', 'reklam_asistani', 'operasyon_beyni', 'site_hakemi',
        ]

        it('18 ajan promptu tanimli olmali', () => {
            expect(Object.keys(AJAN_PROMPTLARI).length).toBeGreaterThanOrEqual(18)
        })

        it.each(TUMU)('%s ajan promptu bos olmamali', (ajan) => {
            expect(AJAN_PROMPTLARI[ajan]).toBeTruthy()
            expect(AJAN_PROMPTLARI[ajan].length).toBeGreaterThan(20)
        })

        it('the_closer fiyat bilgisi icermeli', () => {
            expect(AJAN_PROMPTLARI.the_closer).toContain('3990')
            expect(AJAN_PROMPTLARI.the_closer).toContain('TEMEL')
        })

        it('orchestrator yonlendirme kurallari icermeli', () => {
            expect(AJAN_PROMPTLARI.orchestrator).toContain('the_closer')
            expect(AJAN_PROMPTLARI.orchestrator).toContain('esnaf_asistani')
        })

        it('overseer JSON format belirtmeli', () => {
            expect(AJAN_PROMPTLARI.overseer).toContain('JSON')
            expect(AJAN_PROMPTLARI.overseer).toContain('gecti')
        })

        it('lead_madencisi puanlama kurallari icermeli', () => {
            expect(AJAN_PROMPTLARI.lead_madencisi).toContain('HOT')
            expect(AJAN_PROMPTLARI.lead_madencisi).toContain('WARM')
            expect(AJAN_PROMPTLARI.lead_madencisi).toContain('COLD')
        })

        it('churn_detective risk sinyalleri icermeli', () => {
            expect(AJAN_PROMPTLARI.churn_detective).toContain('score')
            expect(AJAN_PROMPTLARI.churn_detective).toContain('signals')
            expect(AJAN_PROMPTLARI.churn_detective).toContain('iptal')
        })

        it('site_hakemi 100 puanlik degerlendirme icermeli', () => {
            expect(AJAN_PROMPTLARI.site_hakemi).toContain('100')
            expect(AJAN_PROMPTLARI.site_hakemi).toContain('ONAYLA')
            expect(AJAN_PROMPTLARI.site_hakemi).toContain('REDDEDİLDİ')
        })

        it('muzakereci SPIN teknigi icermeli', () => {
            expect(AJAN_PROMPTLARI.muzakereci).toContain('SPIN')
            expect(AJAN_PROMPTLARI.muzakereci).toContain('%10')
        })

        it('destek_upsell iki gorevi icermeli', () => {
            expect(AJAN_PROMPTLARI.destek_upsell).toContain('DESTEK')
            expect(AJAN_PROMPTLARI.destek_upsell).toContain('UPSELL')
        })
    })
})
