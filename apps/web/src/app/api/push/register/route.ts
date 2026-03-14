import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

/**
 * POST /api/push/register — FCM Token Kayıt
 * Esnafın cihazından gelen FCM token'ı Firestore'a kaydeder.
 * Bir esnafın birden fazla cihazı olabilir (telefon + tablet).
 */
export async function POST(request: Request) {
    try {
        const esnafId = await oturumDogrulaServer()
        if (!esnafId) {
            return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
        }

        const { token, platform, zaman } = await request.json()
        if (!token) {
            return NextResponse.json({ error: 'Token zorunlu' }, { status: 400 })
        }

        const esnafRef = adminDb.collection('esnaflar').doc(esnafId)
        const doc = await esnafRef.get()

        if (!doc.exists) {
            return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })
        }

        // Mevcut token'ları al
        const mevcutTokenlar: any[] = doc.data()?.fcm_tokens || []

        // Aynı token zaten varsa güncelle, yoksa ekle
        const tokenIndex = mevcutTokenlar.findIndex((t: any) => t.token === token)

        if (tokenIndex >= 0) {
            mevcutTokenlar[tokenIndex] = {
                ...mevcutTokenlar[tokenIndex],
                sonKullanim: Timestamp.now(),
                platform: platform || mevcutTokenlar[tokenIndex].platform,
            }
        } else {
            mevcutTokenlar.push({
                token,
                platform: platform || 'web',
                kayitZamani: zaman || new Date().toISOString(),
                sonKullanim: Timestamp.now(),
            })
        }

        // Max 5 cihaz (FIFO — en eski silinir)
        if (mevcutTokenlar.length > 5) {
            mevcutTokenlar.splice(0, mevcutTokenlar.length - 5)
        }

        await esnafRef.update({ fcm_tokens: mevcutTokenlar })

        return NextResponse.json({ ok: true, cihazSayisi: mevcutTokenlar.length })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
