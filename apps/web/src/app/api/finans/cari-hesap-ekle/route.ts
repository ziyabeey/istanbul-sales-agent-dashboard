import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'
import logger from '@/utils/logger'

// Inline Zod-free validation — küçük endpoint, Zod overkill
export async function POST(req: Request) {
    // ── Auth Guard ──
    const guard = await apiGuard(req, { requireAdminToken: true })
    if (!guard.ok) return guard.response

    try {
        const body = await req.json()
        const { esnafId, musteriAd, musteriTelefon, tutar, aciklama, vadeTarihi } = body

        if (!esnafId || typeof esnafId !== 'string' || esnafId.length < 10) {
            return NextResponse.json({ error: 'Geçersiz esnafId' }, { status: 400 })
        }
        if (!musteriTelefon || typeof musteriTelefon !== 'string') {
            return NextResponse.json({ error: 'musteriTelefon zorunludur' }, { status: 400 })
        }
        const tutarNum = Number(tutar)
        if (!tutar || isNaN(tutarNum) || tutarNum <= 0 || tutarNum > 10_000_000) {
            return NextResponse.json({ error: 'Geçersiz tutar' }, { status: 400 })
        }

        // Tarih doğrulama
        let parsedVade: Date | null = null
        if (vadeTarihi) {
            parsedVade = new Date(vadeTarihi)
            if (isNaN(parsedVade.getTime())) {
                return NextResponse.json({ error: 'Geçersiz vadeTarihi' }, { status: 400 })
            }
        }

        const cariData = {
            esnafId,
            musteriAd: typeof musteriAd === 'string' ? musteriAd.slice(0, 100) : 'Bilinmiyor',
            musteriTelefon: musteriTelefon.slice(0, 20),
            tutar: tutarNum,
            aciklama: typeof aciklama === 'string' ? aciklama.slice(0, 500) : 'Açık Hesap / Veresiye',
            vadeTarihi: parsedVade ? Timestamp.fromDate(parsedVade) : null,
            durum: 'bekliyor' as const,
            olusturma: Timestamp.now(),
        }

        const docRef = await adminDb.collection('cariHesaplar').add(cariData)
        await logger.logYaz(
            esnafId, 'info', 'Açık Hesap Eklendi',
            `${cariData.musteriAd} kişisine ${tutarNum}₺ borç eklendi.`
        )

        return NextResponse.json({ ok: true, id: docRef.id })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
        console.error('[CARİ EKLEME HATASI]', message)
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 })
    }
}
