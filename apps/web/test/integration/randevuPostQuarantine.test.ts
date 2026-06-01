import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { POST } from '@/app/api/randevu/route'
import { adminDb } from '@/lib/firebaseAdmin'

type ApiResponse<T> = {
    status: number
    ok: boolean
    json: () => Promise<T>
}

const originalPublicBooking = process.env.KEPENK_PUBLIC_BOOKING_ENABLED
const mockedCollection = vi.mocked(adminDb.collection)

function postRequest(body: unknown): Request {
    return new Request('http://localhost/api/randevu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })
}

describe('POST /api/randevu public booking quarantine', () => {
    beforeEach(() => {
        delete process.env.KEPENK_PUBLIC_BOOKING_ENABLED
        mockedCollection.mockClear()
    })

    afterEach(() => {
        if (originalPublicBooking === undefined) {
            delete process.env.KEPENK_PUBLIC_BOOKING_ENABLED
        } else {
            process.env.KEPENK_PUBLIC_BOOKING_ENABLED = originalPublicBooking
        }
    })

    it('flag kapaliyken Firestore cagrisi yapmadan 503 doner', async () => {
        const response = await POST(postRequest({})) as ApiResponse<Record<string, unknown>>
        const body = await response.json()

        expect(response.status).toBe(503)
        expect(body).toEqual({
            error: 'Randevu alma kontrollü lansmanda kapalı',
            code: 'BOOKING_DISABLED',
        })
        expect(mockedCollection).not.toHaveBeenCalled()
    })

    it('flag acikken invalid body mevcut zod validasyonuyla 400 doner', async () => {
        process.env.KEPENK_PUBLIC_BOOKING_ENABLED = 'true'

        const response = await POST(postRequest({})) as ApiResponse<Record<string, unknown>>
        const body = await response.json()

        expect(response.status).toBe(400)
        expect(body.error).toBeTruthy()
    })
})
