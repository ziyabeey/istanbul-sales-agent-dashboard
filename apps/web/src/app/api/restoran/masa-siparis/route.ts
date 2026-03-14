/**
 * POST /api/restoran/masa-siparis
 *
 * Ortak Adisyon API'si — Multiplayer Cart
 *
 * Race Condition Koruması:
 * 1. O masaya ait açık adisyon var mı? → varsa FieldValue.arrayUnion ile atomik ekleme
 * 2. Yoksa → yeni adisyon oluştur
 * arrayUnion zaten atomik — iki kişi aynı anda basarsa veri ezilmez.
 */

import { NextResponse } from 'next/server'
import { adminDb, Timestamp, FieldValue } from '@/lib/firebaseAdmin'
import { rateLimitCheck } from '@/lib/rateLimiter'
import { kdvHesapla } from '@/lib/restoran/utils'
import { z } from 'zod'

const masaSiparisSema = z.object({
    esnafId: z.string().min(10).max(50),
    masaNo: z.number().int().min(1).max(999),
    deviceId: z.string().min(10).max(100),
    kalemler: z.array(z.object({
        menuItemId: z.string(),
        ad: z.string().min(1).max(200),
        adet: z.number().int().min(1).max(20),
        birimFiyatKurus: z.number().int().nonnegative(),
        kdvTipi: z.enum(['gida', 'icecek', 'alkol']).default('gida'),
        notlar: z.string().max(200).optional(),
    })).min(1).max(50),
})

export async function POST(request: Request) {
    // Rate limit
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const rl = rateLimitCheck(`masa-siparis:${ip}`, 'webhook')
    if (!rl.allowed) {
        return NextResponse.json({ error: 'Çok fazla istek' }, { status: 429 })
    }

    try {
        const body = await request.json()
        const parsed = masaSiparisSema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(
                { error: 'Geçersiz istek', detaylar: parsed.error.issues },
                { status: 400 }
            )
        }

        const { esnafId, masaNo, deviceId, kalemler } = parsed.data

        // Kalemleri hazırla
        const adisyonKalemler = kalemler.map(k => ({
            menuItemId: k.menuItemId,
            ad: k.ad,
            adet: k.adet,
            birimFiyatKurus: k.birimFiyatKurus,
            toplamKurus: k.birimFiyatKurus * k.adet,
            kdvTipi: k.kdvTipi,
            notlar: k.notlar || '',
            deviceId, // Kimin eklediğini takip et (split bill için)
            eklenmeZamani: new Date().toISOString(),
        }))

        const toplamEklenen = adisyonKalemler.reduce((t, k) => t + k.toplamKurus, 0)

        // ── Açık adisyon var mı kontrol et ──
        const adisyonRef = adminDb
            .collection('esnaflar')
            .doc(esnafId)
            .collection('aktif_adisyonlar')

        const acikAdisyon = await adisyonRef
            .where('masaNo', '==', masaNo)
            .where('durum', 'in', ['yeni', 'hazirlaniyor'])
            .limit(1)
            .get()

        let adisyonId: string

        if (!acikAdisyon.empty) {
            // ── MEVCUT ADİSYONA EKLE (atomik) ──
            const mevcutDoc = acikAdisyon.docs[0]
            adisyonId = mevcutDoc.id

            await mevcutDoc.ref.update({
                // arrayUnion: aynı anda 2 kişi basarsa veri ezilmez
                kalemler: FieldValue.arrayUnion(...adisyonKalemler),
                toplamKurus: FieldValue.increment(toplamEklenen),
                guncelleme: Timestamp.now(),
                // Durum "yeni"ye geri al — mutfak yeni kalemleri görsün
                durum: 'yeni',
            })
        } else {
            // ── YENİ ADİSYON OLUŞTUR ──
            const kdvSonuc = kdvHesapla(adisyonKalemler as any)

            const ref = await adisyonRef.add({
                masaNo,
                kaynak: 'masa',
                durum: 'yeni',
                kalemler: adisyonKalemler,
                toplamKurus: toplamEklenen,
                kdvToplamKurus: kdvSonuc.toplamKdvKurus,
                kdvDetay: kdvSonuc.kdvDetay,
                olusturma: Timestamp.now(),
            })
            adisyonId = ref.id
        }

        return NextResponse.json({
            ok: true,
            adisyonId,
            birlestirildi: !acikAdisyon.empty,
            eklenenKalemSayisi: adisyonKalemler.length,
        })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
        console.error('[MASA SİPARİŞ HATA]', message)
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
