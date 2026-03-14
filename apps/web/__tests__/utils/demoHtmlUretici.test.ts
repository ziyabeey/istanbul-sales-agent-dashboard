/**
 * demoHtmlUretici.test.ts — Demo HTML Uretici Yapisal Testleri
 */
import { describe, it, expect } from 'vitest'
import { vi } from 'vitest'

// Firebase mock
vi.mock('@/lib/firebaseAdmin', () => ({
    adminDb: null,
    Timestamp: { now: () => ({ seconds: 0 }) },
    FieldValue: { serverTimestamp: () => 'mock' },
}))

// Gemini mock
vi.mock('@/lib/geminiClient', () => ({
    geminiCalistir: vi.fn(async () => '<html><body>Mock Site</body></html>'),
}))

import { DEMO_SCRIPT } from '@/utils/demoHtmlUretici'

describe('demoHtmlUretici — DEMO_SCRIPT', () => {
    it('DEMO_SCRIPT tanimli olmali', () => {
        expect(DEMO_SCRIPT).toBeTruthy()
        expect(typeof DEMO_SCRIPT).toBe('string')
    })

    it('submitForm fonksiyonu icermeli', () => {
        expect(DEMO_SCRIPT).toContain('submitForm')
    })

    it('postMessage bridge icermeli', () => {
        expect(DEMO_SCRIPT).toContain('postMessage')
        expect(DEMO_SCRIPT).toContain('demo-lead')
    })

    it('fetch API cagrisini icermeli', () => {
        expect(DEMO_SCRIPT).toContain('fetch')
        expect(DEMO_SCRIPT).toContain('/api/lead/demo-form')
    })

    it('modal fonksiyonlarini icermeli', () => {
        expect(DEMO_SCRIPT).toContain('openModal')
        expect(DEMO_SCRIPT).toContain('closeModal')
    })

    it('form veri alanlarini icermeli', () => {
        expect(DEMO_SCRIPT).toContain('FormData')
        expect(DEMO_SCRIPT).toContain('telefon')
    })

    it('basari mesaji gosterimi icermeli', () => {
        expect(DEMO_SCRIPT).toContain('k-success-msg')
    })

    it('whatsapp buton handler icermeli', () => {
        expect(DEMO_SCRIPT).toContain('WhatsApp')
    })
})
