import { afterEach, describe, expect, it } from 'vitest'
import {
    BOOKING_DISABLED_CODE,
    bookingDisabledResponse,
    isPublicBookingEnabled,
} from '@/lib/randevu/bookingFeatureFlags'

const originalPublicBooking = process.env.KEPENK_PUBLIC_BOOKING_ENABLED

describe('bookingFeatureFlags', () => {
    afterEach(() => {
        if (originalPublicBooking === undefined) {
            delete process.env.KEPENK_PUBLIC_BOOKING_ENABLED
        } else {
            process.env.KEPENK_PUBLIC_BOOKING_ENABLED = originalPublicBooking
        }
    })

    it('public booking varsayilan olarak kapalidir', () => {
        delete process.env.KEPENK_PUBLIC_BOOKING_ENABLED

        expect(isPublicBookingEnabled()).toBe(false)
    })

    it('yalnizca exact true public booking acar', () => {
        process.env.KEPENK_PUBLIC_BOOKING_ENABLED = 'true'

        expect(isPublicBookingEnabled()).toBe(true)
    })

    it.each(['1', 'TRUE', 'false', 'yes'])(
        'true disindaki %s degeri public booking acmaz',
        (value) => {
            process.env.KEPENK_PUBLIC_BOOKING_ENABLED = value

            expect(isPublicBookingEnabled()).toBe(false)
        }
    )

    it('disabled response 503 ve sabit kod doner', async () => {
        const response = bookingDisabledResponse()
        const body = await response.json()

        expect(response.status).toBe(503)
        expect(body).toEqual({
            error: 'Randevu alma kontrollü lansmanda kapalı',
            code: BOOKING_DISABLED_CODE,
        })
    })
})
