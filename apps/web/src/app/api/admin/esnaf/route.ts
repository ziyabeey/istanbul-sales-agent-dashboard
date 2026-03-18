import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'
import { telegramGonder } from '@/lib/telegram'
import { zodGuard } from '@/lib/zodSemalar'
import { z } from 'zod'

// Inline Zod şeması — admin esnaf oluşturma
const adminEsnafSema = z.object({
    ad: z.string().min(2, 'Ad en az 2 karakter').max(100),
    telefon: z.string().min(10).max(20),
    sektor: z.string().min(2).max(50),
    paket: z.enum(['TEMEL', 'STANDART', 'BUYUME', 'PREMIUM', 'PREMIUMPLUS']).default('TEMEL'),
    email: z.string().email().max(100).optional().nullable(),
    ilce: z.string().max(50).optional().nullable(),
    sehir: z.string().max(50).optional().nullable(),
})

// HTML escape for Telegram (XSS prevention)
function escTg(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
}

export async function POST(request: Request) {
    const guard = await apiGuard(request, { requireAdminToken: true })
    if (!guard.ok) return guard.response

    if (!adminDb) {
        return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
    }

    try {
        const body = await request.json()

        // ── Zod Validation ──
        const parsed = zodGuard(adminEsnafSema, body)
        if (!parsed.ok) {
            return NextResponse.json(
                { error: parsed.hata, detaylar: parsed.detaylar },
                { status: 400 }
            )
        }

        const { ad, telefon, sektor, paket, email, ilce, sehir } = parsed.data

        const yeniEsnaf = {
            ad: ad.trim(),
            isletmeAdiTam: ad.trim(),
            telefon: telefon.trim(),
            telefonTemiz: telefon.replace(/\D/g, ''),
            sektor: sektor.trim(),
            paket,
            durum: 'onboarding' as const,
            email: email?.trim() || null,
            ilce: ilce?.trim() || null,
            sehir: sehir?.trim() || null,
            churnSkoru: 0,
            saglikSkoru: 50,
            ayarlar: { botAktif: true },
            aktifWebModulleri: [] as string[],
            notlar: '',
            twilioNumarasi: null,
            subdomainUrl: null,
            kayitTarihi: Timestamp.now(),
            adminGuncelleme: Timestamp.now(),
        }

        const docRef = await adminDb.collection('esnaflar').add(yeniEsnaf)

        // Telegram'a gönderilen verileri HTML escape et (XSS koruması)
        telegramGonder(
            `✅ <b>Yeni Esnaf Eklendi (Admin)</b>\n` +
            `${escTg(ad)}\n` +
            `Paket: ${escTg(paket)} | Tel: ${escTg(telefon)}\n` +
            `ID: <code>${docRef.id}</code>`
        ).catch((e: unknown) => {
            // console.error('[ADMIN ESNAF TELEGRAM]', e instanceof Error ? e.message : e)
        })

        return NextResponse.json({ ok: true, id: docRef.id })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
