import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'
import { zodGuard, esnafGuncelleSema, type EsnafGuncelleInput } from '@/lib/zodSemalar'

// GET — Esnaf bilgisi getir
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    // ── Auth Guard ──
    const guard = await apiGuard(request, { requireAdminToken: true })
    if (!guard.ok) return guard.response

    try {
        const { id } = await params
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
    // ── Auth Guard ──
    const guard = await apiGuard(request, { requireAdminToken: true })
    if (!guard.ok) return guard.response

    try {
        const { id } = await params
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
