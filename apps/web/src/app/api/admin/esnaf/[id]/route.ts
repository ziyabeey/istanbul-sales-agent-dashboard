import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'
import { telegramGonder } from '@/lib/telegram'

const IZIN_VERILEN_ALANLAR = [
    'durum', 'paket', 'aktifModuller', 'aktifWebModulleri',
    'ayarlar', 'twilioNumarasi', 'notlar',
]

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const guard = await apiGuard(request, { requireAdminToken: true })
    if (!guard.ok) return guard.response

    if (!adminDb) {
        return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
    }

    try {
        const { id } = await params
        const body = await request.json()

        // Sadece izin verilen alanları al
        const guncellemeler: Record<string, any> = { adminGuncelleme: Timestamp.now() }
        for (const alan of IZIN_VERILEN_ALANLAR) {
            if (alan in body) {
                guncellemeler[alan] = body[alan]
            }
        }

        if (Object.keys(guncellemeler).length <= 1) {
            return NextResponse.json({ error: 'Güncellenecek alan bulunamadı' }, { status: 400 })
        }

        const docRef = adminDb.collection('esnaflar').doc(id)
        const oncekiDoc = await docRef.get()
        if (!oncekiDoc.exists) {
            return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })
        }

        const onceki = oncekiDoc.data()!
        await docRef.update(guncellemeler)

        // Durum veya paket değişince Telegram bildir
        if (body.durum && body.durum !== onceki.durum) {
            telegramGonder(
                `🔄 <b>Durum Değişti</b>\n` +
                `${onceki.isletmeAdiTam || onceki.ad}\n` +
                `${onceki.durum} → ${body.durum}\n` +
                `ID: <code>${id}</code>`
            ).catch(() => {})
        }
        if (body.paket && body.paket !== onceki.paket) {
            telegramGonder(
                `📦 <b>Paket Değişti (Admin)</b>\n` +
                `${onceki.isletmeAdiTam || onceki.ad}\n` +
                `${onceki.paket} → ${body.paket}\n` +
                `ID: <code>${id}</code>`
            ).catch(() => {})
        }

        return NextResponse.json({ ok: true })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const guard = await apiGuard(request, { requireAdminToken: true })
    if (!guard.ok) return guard.response

    if (!adminDb) {
        return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
    }

    try {
        const { id } = await params
        const docRef = adminDb.collection('esnaflar').doc(id)
        const snap = await docRef.get()

        if (!snap.exists) {
            return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })
        }

        const data = snap.data()!
        await docRef.delete()

        telegramGonder(
            `🗑️ <b>Esnaf Silindi (Admin)</b>\n` +
            `${data.isletmeAdiTam || data.ad || 'İsimsiz'}\n` +
            `Paket: ${data.paket || '—'} | Durum: ${data.durum || '—'}\n` +
            `ID: <code>${id}</code>`
        ).catch(() => {})

        return NextResponse.json({ ok: true })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const guard = await apiGuard(request, { requireAdminToken: true })
    if (!guard.ok) return guard.response

    if (!adminDb) {
        return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
    }

    try {
        const { id } = await params
        const doc = await adminDb.collection('esnaflar').doc(id).get()
        if (!doc.exists) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 })
        return NextResponse.json({ esnaf: { id: doc.id, ...doc.data() } })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
