import { NextResponse } from 'next/server'

export const BOOKING_DISABLED_CODE = 'BOOKING_DISABLED'

export function isPublicBookingEnabled(): boolean {
    return process.env.KEPENK_PUBLIC_BOOKING_ENABLED === 'true'
}

export function bookingDisabledResponse(): NextResponse {
    return NextResponse.json(
        {
            error: 'Randevu alma kontrollü lansmanda kapalı',
            code: BOOKING_DISABLED_CODE,
        },
        { status: 503 }
    )
}
