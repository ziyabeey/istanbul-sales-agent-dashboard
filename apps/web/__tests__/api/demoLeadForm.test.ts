/**
 * demoLeadForm.test.ts — Demo Lead Form API Entegrasyon Testi
 * 
 * API route handler'ı doğrudan import edip test eder.
 */
import { describe, it, expect, vi, beforeAll } from 'vitest'

// Firebase mock
vi.mock('@/lib/firebaseAdmin', () => ({
    adminDb: {
        collection: vi.fn(() => ({
            add: vi.fn(async (data: any) => ({ id: 'mock-lead-id-123' })),
        })),
    },
    FieldValue: {
        serverTimestamp: vi.fn(() => 'SERVER_TIMESTAMP'),
    },
}))

// Telegram mock
vi.mock('@/lib/telegram', () => ({
    telegramGonder: vi.fn(async () => true),
}))

import { POST, OPTIONS } from '@/app/api/lead/demo-form/route'

function makeRequest(body: any) {
    return new Request('http://localhost/api/lead/demo-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })
}

describe('API: /api/lead/demo-form', () => {
    describe('POST — başarılı kayıt', () => {
        it('geçerli veri ile 200 + ok:true dönmeli', async () => {
            const res = await POST(makeRequest({
                ad: 'Test Kullanıcı',
                telefon: '05321234567',
            }))
            const json = await res.json()
            expect(res.status).toBe(200)
            expect(json.ok).toBe(true)
            expect(json.id).toBe('mock-lead-id-123')
        })

        it('sadece telefon ile de çalışmalı', async () => {
            const res = await POST(makeRequest({ telefon: '5321234567' }))
            const json = await res.json()
            expect(json.ok).toBe(true)
        })
    })

    describe('POST — validasyon', () => {
        it('telefon olmadan 400 dönmeli', async () => {
            const res = await POST(makeRequest({ ad: 'Test' }))
            expect(res.status).toBe(400)
            const json = await res.json()
            expect(json.error).toContain('Telefon')
        })

        it('kısa telefon numarası 400 dönmeli', async () => {
            const res = await POST(makeRequest({ telefon: '123' }))
            expect(res.status).toBe(400)
            const json = await res.json()
            expect(json.error).toContain('Geçersiz')
        })
    })

    describe('OPTIONS — CORS', () => {
        it('204 ve CORS header\'ları dönmeli', async () => {
            const res = await OPTIONS()
            expect(res.status).toBe(204)
            expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*')
            expect(res.headers.get('Access-Control-Allow-Methods')).toContain('POST')
        })
    })
})
