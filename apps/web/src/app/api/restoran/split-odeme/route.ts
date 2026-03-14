/**
 * POST /api/restoran/split-odeme
 *
 * Alman Usulü Hesap → seçilen kalemlerin ödemesini başlat.
 * Iyzico checkout linki oluştur veya direkt ödeme onayla.
 */

import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { z } from 'zod'

const splitOdemeSema = z.object({
    esnafId: z.string().min(10).max(50),
    adisyonId: z.string().min(1),
    seciliKalemIdxler: z.array(z.number().int().nonnegative()).min(1),
    toplamKurus: z.number().int().positive(),
})

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const parsed = splitOdemeSema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { error: 'Geçersiz istek', detaylar: parsed.error.issues },
                { status: 400 }
            )
        }

        const { esnafId, adisyonId, seciliKalemIdxler, toplamKurus } = parsed.data

        // Adisyonu oku
        const adisyonRef = adminDb
            .collection('esnaflar')
            .doc(esnafId)
            .collection('aktif_adisyonlar')
            .doc(adisyonId)

        const adisyonDoc = await adisyonRef.get()
        if (!adisyonDoc.exists) {
            return NextResponse.json({ error: 'Adisyon bulunamadı' }, { status: 404 })
        }

        const adisyon = adisyonDoc.data()!
        const kalemler = (adisyon.kalemler || []) as Array<Record<string, unknown>>

        // Seçilen kalemleri "ödendi" olarak işaretle
        const guncellenmisKalemler = kalemler.map((k, idx) => {
            if (seciliKalemIdxler.includes(idx)) {
                return { ...k, odendi: true, odemeTarihi: new Date().toISOString() }
            }
            return k
        })

        // Tüm kalemler ödendi mi?
        const tumOdendi = guncellenmisKalemler.every((k) => k.odendi === true)

        await adisyonRef.update({
            kalemler: guncellenmisKalemler,
            durum: tumOdendi ? 'odendi' : adisyon.durum,
            guncelleme: Timestamp.now(),
        })

        // Ödeme logu
        await adminDb.collection('esnaflar').doc(esnafId).collection('odemeler').add({
            adisyonId,
            seciliKalemIdxler,
            toplamKurus,
            tip: 'split_bill',
            durum: 'basarili',
            olusturma: Timestamp.now(),
        })

        return NextResponse.json({ ok: true })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
        console.error('[SPLİT ÖDEME HATA]', message)
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
