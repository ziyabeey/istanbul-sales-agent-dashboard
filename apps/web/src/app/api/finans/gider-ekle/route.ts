import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'
import { zodGuard, giderEkleSema } from '@/lib/zodSemalar'
import logger from '@/utils/logger'

export async function POST(req: Request) {
    // ── Auth Guard ──
    const guard = await apiGuard(req, { requireAdminToken: true })
    if (!guard.ok) return guard.response

    try {
        const body = await req.json()

        // ── Zod Validation ──
        const parsed = zodGuard(giderEkleSema, body)
        if (!parsed.ok) {
            return NextResponse.json(
                { error: parsed.hata, detaylar: parsed.detaylar },
                { status: 400 }
            )
        }

        const { esnafId, kategori, tutar, aciklama, tarih } = parsed.data

        // Tarih validasyonu (geçerli bir tarih olmalı)
        let parsedTarih: Date | null = null
        if (tarih) {
            parsedTarih = new Date(`${tarih}T00:00:00`)
            if (isNaN(parsedTarih.getTime())) {
                return NextResponse.json({ error: 'Geçersiz tarih' }, { status: 400 })
            }
        }

        const giderData = {
            esnafId,
            kategori,
            tutar,
            aciklama: aciklama || '',
            tarih: parsedTarih ? Timestamp.fromDate(parsedTarih) : Timestamp.now(),
            olusturma: Timestamp.now(),
        }

        const docRef = await adminDb.collection('giderler').add(giderData)
        await logger.logYaz(
            esnafId, 'info', 'Gider Eklendi',
            `${kategori} kategorisinde ${tutar}₺ gider kaydedildi.`
        )

        return NextResponse.json({ ok: true, id: docRef.id })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
        console.error('[GİDER EKLEME HATASI]', message)
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 })
    }
}
