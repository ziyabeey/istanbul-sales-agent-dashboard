import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { telegramGonder } from '@/lib/telegram'

export async function POST(req: Request) {
    try {
        const { esnafId } = await req.json()
        if (!esnafId) {
            return NextResponse.json({ error: 'esnafId gerekli' }, { status: 400 })
        }

        const docRef = adminDb.collection('esnaflar').doc(esnafId)
        const doc = await docRef.get()

        if (!doc.exists) {
            return NextResponse.json({ error: 'Kayıt bulunamadı' }, { status: 404 })
        }

        const esnaf = doc.data()!

        if (esnaf.durum !== 'aktif') {
            return NextResponse.json({ error: 'Aktif abonelik bulunamadı' }, { status: 400 })
        }

        // Idempotent: zaten iptal talebi varsa tekrar set etme
        if (esnaf.iptalTalebi === true) {
            const sonGun = esnaf.yenilenmeTarihi?.toDate?.()?.toISOString() ?? null
            return NextResponse.json({ ok: true, sonGun, zatenIptal: true })
        }

        const iptalTarihi: Date | null = esnaf.yenilenmeTarihi?.toDate?.() ?? null

        await docRef.update({
            iptalTalebi: true,
            iptalTarihi: iptalTarihi ? Timestamp.fromDate(iptalTarihi) : Timestamp.now(),
        })

        await telegramGonder(
            `❌ <b>İptal Talebi</b>\n` +
            `Esnaf: ${esnaf.isletmeAdiTam || esnaf.ad}\n` +
            `Paket: ${esnaf.paket}\n` +
            `Son Gün: ${iptalTarihi?.toLocaleDateString('tr-TR') ?? '?'}`
        )

        return NextResponse.json({
            ok: true,
            sonGun: iptalTarihi?.toISOString() ?? null,
        })
    } catch (error: any) {
        // console.error('[İptal API Hatası]', error)
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 })
    }
}
