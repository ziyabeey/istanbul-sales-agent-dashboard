/**
 * POST /api/restoran/masa-olustur
 *
 * Esnaf "15 masam var" der → 15 masa dokümanı + QR linkleri batch create
 */

import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'
import { zodGuard } from '@/lib/zodSemalar'
import { masaOlusturSema } from '@/lib/restoran/tipler'
import { qrLinkOlustur } from '@/lib/restoran/utils'

export async function POST(request: Request) {
    const guard = await apiGuard(request, { requireAdminToken: true })
    if (!guard.ok) return guard.response

    try {
        const body = await request.json()
        const parsed = zodGuard(masaOlusturSema, body)
        if (!parsed.ok) {
            return NextResponse.json(
                { error: parsed.hata, detaylar: parsed.detaylar },
                { status: 400 }
            )
        }

        const { esnafId, masaSayisi, domain, bolgeler } = parsed.data

        const masalarRef = adminDb.collection('esnaflar').doc(esnafId).collection('masalar')
        const batch = adminDb.batch()
        const masaListesi: Array<{ no: number; qrLink: string; bolge?: string }> = []

        for (let i = 1; i <= masaSayisi; i++) {
            const qrLink = qrLinkOlustur(domain, i)
            const bolge = bolgeler?.[Math.min(i - 1, bolgeler.length - 1)]

            const ref = masalarRef.doc(`masa-${i}`)
            batch.set(ref, {
                no: i,
                qrLink,
                aktif: true,
                bolge: bolge || null,
                olusturma: Timestamp.now(),
            })

            masaListesi.push({ no: i, qrLink, bolge })
        }

        await batch.commit()

        // QR kart verileri — client-side PDF render için
        const qrKartlar = masaListesi.map(m => ({
            masaNo: m.no,
            qrLink: m.qrLink,
            // A5 kart bilgileri
            baslik: `Masa ${m.no}`,
            altBaslik: domain.replace('.kepenk.ai', ''),
            talimat: 'QR kodu okutarak sipariş verebilirsiniz',
            bolge: m.bolge || '',
        }))

        return NextResponse.json({
            ok: true,
            masaSayisi,
            masalar: masaListesi,
            qrKartlar, // Client jsPDF ile A5 PDF basabilir
        })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
        console.error('[MASA OLUŞTUR HATA]', message)
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
