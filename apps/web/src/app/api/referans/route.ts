import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const { esnafId } = await req.json()
        if (!esnafId) return NextResponse.json({ error: 'esnafId gerekli' }, { status: 400 })

        const { adminDb } = await import('@/lib/firebaseAdmin')
        const doc = await adminDb.collection('esnaflar').doc(esnafId).get()
        if (!doc.exists) return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })

        const esnaf = doc.data()!

        // Referans kodu üret (yoksa)
        const mevcutKod = esnaf.referansKodu
        const referansKodu = mevcutKod || `REF-${esnafId.slice(0, 6).toUpperCase()}`

        // Referans URL
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kepenk.ai'
        const referansUrl = `${baseUrl}/onboarding?ref=${referansKodu}`

        // Referans sayısı
        const referansSnap = await adminDb.collection('esnaflar')
            .where('referansKaynagi', '==', referansKodu)
            .count().get()
        const referansSayisi = referansSnap.data().count

        // Kazanım hesapla (her başarılı referans = 1 ay ücretsiz)
        const aylikKazanim = referansSayisi

        if (!mevcutKod) {
            await adminDb.collection('esnaflar').doc(esnafId).update({
                referansKodu,
            })
        }

        return NextResponse.json({
            referansKodu,
            referansUrl,
            referansSayisi,
            aylikKazanim,
        })
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    const esnafId = req.nextUrl.searchParams.get('esnafId')
    if (!esnafId) return NextResponse.json({ error: 'esnafId gerekli' }, { status: 400 })

    const { adminDb } = await import('@/lib/firebaseAdmin')
    const doc = await adminDb.collection('esnaflar').doc(esnafId).get()
    if (!doc.exists) return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })

    const esnaf = doc.data()!
    const referansKodu = esnaf.referansKodu || ''
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kepenk.ai'

    // Referans listesi
    const referansSnap = await adminDb.collection('esnaflar')
        .where('referansKaynagi', '==', referansKodu)
        .limit(20).get()

    const referanslar = referansSnap.docs.map((d: any) => ({
        isletmeAdi: d.data().isletmeAdi || d.data().ad,
        tarih: d.data().olusturulma || '',
        paket: d.data().paket || 'TEMEL',
    }))

    return NextResponse.json({
        referansKodu,
        referansUrl: referansKodu ? `${baseUrl}/onboarding?ref=${referansKodu}` : null,
        referanslar,
        toplamKazanim: referanslar.length,
    })
}
