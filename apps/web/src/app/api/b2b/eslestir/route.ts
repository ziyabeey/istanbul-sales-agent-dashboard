import { NextResponse } from 'next/server'
import { tedarikciAra } from '@/lib/esnafAgi'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { adminDb } from '@/lib/firebaseAdmin'

/**
 * GET /api/b2b/eslestir?esnafId=xxx
 * Esnafın sektörüne ve lokasyonuna göre B2B ağındaki tedarikçileri eşleştirir.
 */
export async function GET(request: Request) {
    try {
        const esnafId = await oturumDogrulaServer()
        if (!esnafId) {
            return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
        }

        // Esnaf bilgilerini al
        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        if (!esnafDoc.exists) {
            return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })
        }

        const esnaf = esnafDoc.data()!
        const sonuclar = await tedarikciAra({
            esnafId,
            malzemeAdi: esnaf.sektor || '',
        })

        return NextResponse.json(sonuclar)
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}

