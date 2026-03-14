import { NextResponse } from 'next/server'

export async function GET() {
    const sonuclar: Record<string, any> = {}

    // Firestore bağlantısı + son ajan log aktivitesi kontrolü
    try {
        const { adminDb } = await import('@/lib/firebaseAdmin')
        if (adminDb) {
            const birSaatOnce = new Date(Date.now() - 60 * 60 * 1000)
            const snapshot = await adminDb
                .collection('agent_logs')
                .where('zaman', '>=', birSaatOnce)
                .count()
                .get()
            sonuclar.ajanLog = { sonSaat: snapshot.data().count, durum: 'ok' }
            sonuclar.firestore = 'ok'
        } else {
            sonuclar.firestore = 'baglanti_yok'
        }
    } catch (e: any) {
        sonuclar.firestore = 'hata'
        sonuclar.firestoreHata = e.message
    }

    const hepsiOk = sonuclar.firestore === 'ok'

    return NextResponse.json({
        ok: hepsiOk,
        env: process.env.NODE_ENV,
        zaman: new Date().toISOString(),
        versiyon: process.env.npm_package_version ?? '1.0.0',
        ...sonuclar,
    }, { status: hepsiOk ? 200 : 503 })
}
