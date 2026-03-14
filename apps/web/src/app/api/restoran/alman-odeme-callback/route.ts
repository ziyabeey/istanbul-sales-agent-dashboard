/**
 * Alman Usulü Ödeme Callback — Iyzico onay sonrası Firestore'a yaz
 *
 * Ödeme başarılıysa:
 * 1. Sipariş "odendi_mutfak_bekliyor" olarak aktif_adisyonlar'a yazılır
 * 2. siparis_ani = serverTimestamp()
 * 3. Mutfak KDS'ı real-time olarak yeni adisyonu görür (onSnapshot)
 */

import { NextRequest, NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { FieldValue } from 'firebase-admin/firestore'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { token, conversationId, status: paymentStatus } = body

        // İyzico callback doğrulama
        if (!token || paymentStatus !== 'success') {
            return NextResponse.json(
                { hata: 'Ödeme başarısız veya geçersiz token' },
                { status: 400 }
            )
        }

        // Metadata'dan sipariş bilgilerini çöz
        const metaRaw = body.metadata || body.basketItemsJson || '{}'
        let meta: any
        try {
            meta = typeof metaRaw === 'string' ? JSON.parse(metaRaw) : metaRaw
        } catch {
            return NextResponse.json({ hata: 'Geçersiz metadata' }, { status: 400 })
        }

        const { esnafId, masaNo, kalemler, toplamKurus, kdvToplamKurus, notlar } = meta

        if (!esnafId || !kalemler?.length) {
            return NextResponse.json({ hata: 'Eksik sipariş bilgisi' }, { status: 400 })
        }

        // Firestore'a "odendi_mutfak_bekliyor" adisyon oluştur
        const adisyonRef = adminDb
            .collection('esnaflar')
            .doc(esnafId)
            .collection('aktif_adisyonlar')
            .doc()

        const adisyonData = {
            esnafId,
            masaNo: masaNo || 0,
            kaynak: 'masa' as const,
            durum: 'odendi_mutfak_bekliyor',
            kalemler: kalemler.map((k: any) => ({
                menuItemId: k.menuItemId || '',
                ad: k.ad,
                adet: k.adet,
                birimFiyatKurus: k.birimFiyatKurus,
                toplamKurus: k.toplamKurus,
                kdvTipi: k.kdvTipi || 'gida',
                notlar: k.notlar,
            })),
            toplamKurus,
            kdvToplamKurus,
            notlar: notlar || '',

            // ── Alman Usulü Zaman Damgaları ──
            siparis_ani: FieldValue.serverTimestamp(),
            mutfak_baslama_ani: null,
            mutfak_bitis_ani: null,
            garson_teslim_ani: null,

            // ── Ödeme Bilgisi ──
            iyzico_payment_id: body.paymentId || token,
            odeme_tipi: 'iyzico',

            olusturma: FieldValue.serverTimestamp(),
        }

        await adisyonRef.set(adisyonData)

        console.log(`[alman-odeme-callback] ✅ Adisyon oluşturuldu: ${adisyonRef.id} | Masa ${masaNo} | ${toplamKurus / 100} TL`)

        return NextResponse.json({
            basarili: true,
            adisyonId: adisyonRef.id,
            durum: 'odendi_mutfak_bekliyor',
            mesaj: 'Ödeme alındı, sipariş mutfağa düştü!',
        })

    } catch (err: any) {
        console.error('[alman-odeme-callback] Hata:', err)
        return NextResponse.json(
            { hata: 'Callback işlenemedi', mesaj: err?.message },
            { status: 500 }
        )
    }
}
