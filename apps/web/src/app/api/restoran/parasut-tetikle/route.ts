/**
 * POST /api/restoran/parasut-tetikle
 *
 * KDS "Ödendi" durumuna geçirdiğinde çağrılır.
 * ParasutAgent'ı tetikler → e-Fatura oluşturur.
 */

import { NextResponse } from 'next/server'
import { apiGuard } from '@/lib/apiGuard'
import { parasutFaturaGonder } from '@/agents/adk_modules/ParasutAgent'
import { z } from 'zod'

const tetikleSema = z.object({
    esnafId: z.string().min(10).max(50),
    adisyonId: z.string().min(1).max(100),
})

export async function POST(request: Request) {
    const guard = await apiGuard(request, { requireAdminToken: true })
    if (!guard.ok) return guard.response

    try {
        const body = await request.json()
        const parsed = tetikleSema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { error: 'Geçersiz istek', detaylar: parsed.error.issues },
                { status: 400 }
            )
        }

        const { esnafId, adisyonId } = parsed.data

        // Arka planda çalıştır — DLQ koruması ParasutAgent içinde
        parasutFaturaGonder(esnafId, adisyonId).catch((err: unknown) => {
            // console.error('[PARASUT TETIKLE]', err instanceof Error ? err.message : err)
        })

        return NextResponse.json({ ok: true, mesaj: 'Fatura oluşturma başlatıldı' })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
        // console.error('[PARASUT TETIKLE HATA]', message)
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
