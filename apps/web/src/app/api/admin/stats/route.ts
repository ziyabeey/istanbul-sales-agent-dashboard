import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'
import { PAKET_FIYATLARI_AYLIK } from '@/data/paketler'
import { PAKET_FIYATLARI } from '@/types'

/**
 * GET /api/admin/stats
 * Admin istatistik API'si. Durable AdminSession doğrulaması yapar.
 * MRR = aylık fiyatların toplamı (PAKET_FIYATLARI_AYLIK)
 * ARR = yıllık fiyatların toplamı (PAKET_FIYATLARI) — finans sayfası için esnaflar listesinde yer alır
 */
export async function GET(request: Request) {
    const guard = await apiGuard(request, { requireAdminSession: true })
    if (!guard.ok) return guard.response

    if (!adminDb) {
        return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
    }

    try {
        const esnaflarSnap = await adminDb.collection('esnaflar').get()
        const esnaflar = esnaflarSnap.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data(),
        })) as any[]

        const aktifEsnaflar = esnaflar.filter(e => e.durum === 'aktif')

        // MRR: aylık fiyatlar toplamı
        const mrr = aktifEsnaflar.reduce((acc, e) => {
            const paketKey = (e.paket || 'TEMEL') as keyof typeof PAKET_FIYATLARI_AYLIK
            return acc + (PAKET_FIYATLARI_AYLIK[paketKey] || 0)
        }, 0)

        // ARR: yıllık fiyatlar toplamı (finans sayfasında hesaplanır, ama burada da göndeririz)
        const arr = aktifEsnaflar.reduce((acc, e) => {
            const paketKey = (e.paket || 'TEMEL') as keyof typeof PAKET_FIYATLARI
            return acc + (PAKET_FIYATLARI[paketKey] || 0)
        }, 0)

        const churnOrtalama = esnaflar.length > 0
            ? Math.round(esnaflar.reduce((acc, e) => acc + (e.churnSkoru || 0), 0) / esnaflar.length)
            : 0

        const churnYuksek = esnaflar
            .filter(e => (e.churnSkoru || 0) > 70)
            .map(e => ({
                id: e.id,
                ad: e.ad || e.isletmeAdiTam,
                churnSkoru: e.churnSkoru,
                paket: e.paket,
                telefon: e.telefon,
                waNumarasi: e.waNumarasi,
                instagramUsername: e.instagramUsername,
                durum: e.durum,
            }))

        return NextResponse.json({
            mrr,
            arr,
            aktifSayisi: aktifEsnaflar.length,
            toplamSayisi: esnaflar.length,
            churnOrtalama,
            churnYuksek,
            esnaflar: esnaflar.map(e => ({
                id: e.id,
                ad: e.ad || e.isletmeAdiTam,
                sektor: e.sektor,
                ilce: e.ilce,
                sehir: e.sehir || null,
                paket: e.paket,
                durum: e.durum,
                email: e.email || null,
                churnSkoru: e.churnSkoru || 0,
                telefon: e.telefon,
                telefonTemiz: e.telefonTemiz,
                waNumarasi: e.waNumarasi,
                instagramUsername: e.instagramUsername || null,
                kayitTarihi: e.kayitTarihi,
                twilioNumarasi: e.twilioNumarasi || null,
                ayarlar: e.ayarlar || {},
                saglikSkoru: e.saglikSkoru || 0,
                subdomainUrl: e.subdomainUrl || null,
                aktifWebModulleri: e.aktifWebModulleri || [],
                notlar: e.notlar || '',
            })),
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
