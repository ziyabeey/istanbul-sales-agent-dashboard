/**
 * POST /api/restoran/upsell-onerisi
 *
 * UpsellBottomSheet çağırır → SiparisBuyutucuAgent'tan öneri alır.
 */

import { NextResponse } from 'next/server'
import { upsellOnerisiGetir } from '@/agents/adk_modules/SiparisBuyutucuAgent'
import { z } from 'zod'

const istekSema = z.object({
    esnafId: z.string().min(10).max(50),
    sepetKalemleri: z.array(z.object({
        ad: z.string().min(1),
        kategori: z.string().optional(),
    })).min(1),
})

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const parsed = istekSema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json({ oneri: null })
        }

        const { esnafId, sepetKalemleri } = parsed.data
        const oneri = await upsellOnerisiGetir(esnafId, sepetKalemleri)

        return NextResponse.json({ oneri })
    } catch (error: unknown) {
        // console.error('[UPSELL API]', error instanceof Error ? error.message : error)
        return NextResponse.json({ oneri: null })
    }
}
