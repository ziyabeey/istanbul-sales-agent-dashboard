import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { zodGuard, esnafGuncelleSema, type EsnafGuncelleInput } from '@/lib/zodSemalar'
import { isDemoEsnafId, isDemoModeEnabled } from '@/lib/demoMode'
import { demoBusiness } from '@/data/demoBusiness'
import {
    getActiveImpersonationFromRequest,
    readImpersonationSessionToken,
} from '@/lib/impersonation'

type Authority = {
    actingAdminId?: string
    actingAsTargetId?: string
}

type YetkiSonucu =
    | { ok: true; authority?: Authority }
    | { ok: false; response: NextResponse }

async function yetkiKontrol(request: Request, hedefId: string): Promise<YetkiSonucu> {
    const impersonationToken = readImpersonationSessionToken(request)
    if (impersonationToken) {
        try {
            const session = await getActiveImpersonationFromRequest(request)
            if (session) {
                if (session.subject.id !== hedefId) {
                    return {
                        ok: false,
                        response: NextResponse.json({ error: 'Impersonation hedefi dışında erişim yasak' }, { status: 403 }),
                    }
                }
                return {
                    ok: true,
                    authority: {
                        actingAdminId: session.adminId,
                        actingAsTargetId: session.subject.id,
                    },
                }
            }
        } catch {
            return {
                ok: false,
                response: NextResponse.json({ error: 'Impersonation authority unavailable' }, { status: 503 }),
            }
        }
    }

    // P0-08 removes this legacy compatibility verifier.
    const adminToken = request.headers.get('x-admin-token')
    if (adminToken && adminToken === process.env.ADMIN_SECRET_TOKEN) {
        return { ok: true }
    }

    const oturumEsnafId = await oturumDogrulaServer()
    if (oturumEsnafId && oturumEsnafId === hedefId) return { ok: true }

    return {
        ok: false,
        response: NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 403 })
    }
}

function attachActingIdentity(response: NextResponse, authority?: Authority): NextResponse {
    if (authority?.actingAdminId) response.headers.set('x-kepenk-acting-admin-id', authority.actingAdminId)
    if (authority?.actingAsTargetId) response.headers.set('x-kepenk-acting-as-target-id', authority.actingAsTargetId)
    return response
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const yetki = await yetkiKontrol(request, id)
    if (!yetki.ok) return yetki.response

    if (isDemoModeEnabled() && isDemoEsnafId(id)) {
        return attachActingIdentity(NextResponse.json(demoBusiness), yetki.authority)
    }

    try {
        const doc = await adminDb.collection('esnaflar').doc(id).get()
        if (!doc.exists) return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })
        const data = doc.data()!
        const { iyzicoPlanId: _iyzico, wpSiteId: _wp, twilioNumarasi: _twilio, ...safe } = data
        return attachActingIdentity(NextResponse.json({ id: doc.id, ...safe }), yetki.authority)
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const yetki = await yetkiKontrol(request, id)
    if (!yetki.ok) return yetki.response

    if (isDemoModeEnabled() && isDemoEsnafId(id)) {
        return attachActingIdentity(NextResponse.json({ ok: true, isDemo: true }), yetki.authority)
    }

    try {
        const body = await request.json()
        const parsed = zodGuard(esnafGuncelleSema, body)
        if (!parsed.ok) {
            return NextResponse.json({ error: parsed.hata, detaylar: parsed.detaylar }, { status: 400 })
        }

        const validatedData: EsnafGuncelleInput = parsed.data
        const update: Record<string, unknown> = {}
        const izinliAlanlar: (keyof EsnafGuncelleInput)[] = [
            'ad', 'telefon', 'adres', 'bildirimAyarlari', 'instagramUsername',
            'instagramUrl', 'facebookUrl', 'paletId', 'secilenPalet'
        ]
        for (const alan of izinliAlanlar) {
            if (validatedData[alan] !== undefined) update[alan] = validatedData[alan]
        }

        if (Object.keys(update).length === 0) {
            return NextResponse.json({ error: 'Güncellenecek alan yok' }, { status: 400 })
        }

        await adminDb.collection('esnaflar').doc(id).update(update)
        return attachActingIdentity(NextResponse.json({ ok: true }), yetki.authority)
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
