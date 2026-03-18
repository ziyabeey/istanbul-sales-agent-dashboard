/**
 * Alman Usulü Ödeme — QR Sipariş → Iyzico Checkout başlat
 *
 * Akış:
 * 1. Müşteri QR'dan siparişi oluşturur
 * 2. Bu endpoint Iyzico Checkout Form token'ı döner
 * 3. Müşteri ödemeyi yapar → callback route'a düşer
 * 4. Callback'te sipariş "odendi_mutfak_bekliyor" olarak Firestore'a yazılır
 */

import { NextRequest, NextResponse } from 'next/server'
import { qrSiparisSema, KDV_ORANLARI } from '@/lib/restoran/tipler'
import { checkoutBaslat } from '@/lib/iyzicoClient'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const parsed = qrSiparisSema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { hata: 'Geçersiz sipariş verisi', detay: parsed.error.flatten() },
                { status: 400 }
            )
        }

        const { esnafId, masaNo, kalemler, notlar } = parsed.data

        // Toplam hesapla
        const kalemlerHesapli = kalemler.map((k) => {
            const toplamKurus = k.birimFiyatKurus * k.adet
            return { ...k, toplamKurus }
        })
        const toplamKurus = kalemlerHesapli.reduce((s, k) => s + k.toplamKurus, 0)

        // KDV Hesapla
        let kdvToplamKurus = 0
        for (const k of kalemlerHesapli) {
            const oran = KDV_ORANLARI[k.kdvTipi] || 1
            kdvToplamKurus += Math.round(k.toplamKurus * oran / (100 + oran))
        }

        // Iyzico Checkout Form başlat
        const siparisId = `alman_${esnafId}_m${masaNo}_${Date.now()}`
        const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'

        const checkoutResult = await checkoutBaslat({
            shopId: esnafId,
            siparisId,
            sepetItems: kalemlerHesapli.map((k, i) => ({
                id: k.menuItemId || `item_${i}`,
                ad: k.ad.substring(0, 50),
                kategori: 'Yemek',
                tip: 'PHYSICAL' as const,
                fiyatKurus: k.toplamKurus,
            })),
            musteriInfo: {
                id: `musteri_${masaNo}_${Date.now()}`,
                ad: 'Masa',
                soyad: `${masaNo}`,
                email: `masa${masaNo}@kepenk.ai`,
                telefon: '05000000000',
                ip: ip.split(',')[0].trim(),
            },
            teslimatAdresi: {
                adSoyad: `Masa ${masaNo}`,
                sehir: 'İstanbul',
                ulke: 'Turkey',
                adres: `Restoran İçi - Masa ${masaNo}`,
            },
            toplamFiyatKurus: toplamKurus,
            kargoUcretiKurus: 0,
        })

        if (checkoutResult.status !== 'success') {
            return NextResponse.json(
                { hata: 'Ödeme başlatılamadı' },
                { status: 500 }
            )
        }

        return NextResponse.json({
            basarili: true,
            checkoutFormContent: checkoutResult.checkoutFormContent,
            token: checkoutResult.token,
            siparisId,
        })

    } catch (err: any) {
        // console.error('[alman-odeme] Hata:', err)
        return NextResponse.json(
            { hata: 'Sunucu hatası', mesaj: err?.message },
            { status: 500 }
        )
    }
}

