import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

type EsnafOwnershipResult =
    | { ok: true; esnafId: string; isAdmin: boolean }
    | { ok: false; response: NextResponse }

type OwnedAppointmentResult =
    | {
        ok: true
        esnafId: string
        isAdmin: boolean
        randevuId: string
        randevuRef: FirebaseFirestore.DocumentReference
        randevu: FirebaseFirestore.DocumentData
    }
    | { ok: false; response: NextResponse }

export async function requireSessionEsnaf(
    request: Request,
    requestedEsnafId?: string | null
): Promise<EsnafOwnershipResult> {
    const hedefEsnafId = requestedEsnafId?.trim()

    if (!hedefEsnafId) {
        return {
            ok: false,
            response: NextResponse.json({ error: 'esnafId gerekli' }, { status: 400 }),
        }
    }

    const adminSecret = process.env.ADMIN_SECRET_TOKEN
    const adminToken = request.headers.get('x-admin-token')
    if (adminSecret && adminToken === adminSecret) {
        return { ok: true, esnafId: hedefEsnafId, isAdmin: true }
    }

    const sessionEsnafId = await oturumDogrulaServer()
    if (!sessionEsnafId) {
        return {
            ok: false,
            response: NextResponse.json({ error: 'Oturum gerekli' }, { status: 401 }),
        }
    }

    if (sessionEsnafId !== hedefEsnafId) {
        return {
            ok: false,
            response: NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 403 }),
        }
    }

    return { ok: true, esnafId: sessionEsnafId, isAdmin: false }
}

export async function requireOwnedAppointment(
    request: Request,
    appointmentId?: string | null
): Promise<OwnedAppointmentResult> {
    const randevuId = appointmentId?.trim()

    if (!randevuId) {
        return {
            ok: false,
            response: NextResponse.json({ error: 'randevuId gerekli' }, { status: 400 }),
        }
    }

    const randevuRef = adminDb.collection('randevular').doc(randevuId)
    const doc = await randevuRef.get()
    if (!doc.exists) {
        return {
            ok: false,
            response: NextResponse.json({ error: 'Randevu bulunamadı' }, { status: 404 }),
        }
    }

    const randevu = doc.data() ?? {}
    const esnafId = typeof randevu.esnafId === 'string' ? randevu.esnafId : ''

    const adminSecret = process.env.ADMIN_SECRET_TOKEN
    const adminToken = request.headers.get('x-admin-token')
    if (adminSecret && adminToken === adminSecret) {
        return { ok: true, esnafId, isAdmin: true, randevuId, randevuRef, randevu }
    }

    const sessionEsnafId = await oturumDogrulaServer()
    if (!sessionEsnafId) {
        return {
            ok: false,
            response: NextResponse.json({ error: 'Oturum gerekli' }, { status: 401 }),
        }
    }

    if (!esnafId || sessionEsnafId !== esnafId) {
        return {
            ok: false,
            response: NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 403 }),
        }
    }

    return { ok: true, esnafId, isAdmin: false, randevuId, randevuRef, randevu }
}
