import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { zodGuard, esnafGuncelleSema, type EsnafGuncelleInput } from '@/lib/zodSemalar'

/**
 * Oturum veya admin token doğrulama.
 * Session cookie'den esnafId alır ve erişilen id ile eşleştirir.
 * Admin token varsa her şeye erişim verir.
 */
async function yetkiKontrol(request: Request, hedefId: string): Promise<{ ok: true } | { ok: false; response: NextResponse }> {
    // 1) Admin token — tam erişim
    const adminToken = request.headers.get('x-admin-token')
    if (adminToken && adminToken === process.env.ADMIN_SECRET_TOKEN) {
        return { ok: true }
    }

    // 2) Session cookie — sadece kendi verisine erişim
    const oturumEsnafId = await oturumDogrulaServer()
    if (oturumEsnafId && oturumEsnafId === hedefId) {
        return { ok: true }
    }

    return {
        ok: false,
        response: NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 403 })
    }
}

// GET — Esnaf bilgisi getir
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    // ── Auth: session cookie VEYA admin token ──
    const yetki = await yetkiKontrol(request, id)
    if (!yetki.ok) return yetki.response

    try {
        const doc = await adminDb.collection('esnaflar').doc(id).get()
        if (!doc.exists) {
            return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })
        }
        const data = doc.data()!
        // Hassas alanları gizle
        const {
            iyzicoPlanId: _iyzico,
            wpSiteId: _wp,
            twilioNumarasi: _twilio,
            ...safe
        } = data
        return NextResponse.json({ id: doc.id, ...safe })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}

// PATCH — Esnaf bilgisi güncelle
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    // ── Auth: session cookie VEYA admin token ──
    const yetki = await yetkiKontrol(request, id)
    if (!yetki.ok) return yetki.response

    try {
        const body = await request.json()

        // ── Zod Validation ──
        const parsed = zodGuard(esnafGuncelleSema, body)
        if (!parsed.ok) {
            return NextResponse.json(
                { error: parsed.hata, detaylar: parsed.detaylar },
                { status: 400 }
            )
        }

        const validatedData: EsnafGuncelleInput = parsed.data

        // Doğrulanmış veriden güncelleme objesi oluştur (sadece verilen alanlar)
        const update: Record<string, unknown> = {}
        const izinliAlanlar: (keyof EsnafGuncelleInput)[] = [
            'ad', 'telefon', 'adres', 'bildirimAyarlari', 'instagramUsername',
            'instagramUrl', 'facebookUrl', 'paletId', 'secilenPalet'
        ]
        for (const alan of izinliAlanlar) {
            if (validatedData[alan] !== undefined) {
                update[alan] = validatedData[alan]
            }
        }

        if (Object.keys(update).length === 0) {
            return NextResponse.json({ error: 'Güncellenecek alan yok' }, { status: 400 })
        }

        await adminDb.collection('esnaflar').doc(id).update(update)
        return NextResponse.json({ ok: true })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
