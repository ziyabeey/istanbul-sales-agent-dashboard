import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import {
    getBoundActiveImpersonationFromRequest,
    readImpersonationSessionToken,
} from '@/lib/impersonation'

type EsnafOwnershipResult =
    | { ok: true; esnafId: string; isAdmin: boolean; actingAdminId?: string }
    | { ok: false; response: NextResponse }

type OwnedAppointmentResult =
    | {
        ok: true
        esnafId: string
        isAdmin: boolean
        actingAdminId?: string
        randevuId: string
        randevuRef: FirebaseFirestore.DocumentReference
        randevu: FirebaseFirestore.DocumentData
    }
    | { ok: false; response: NextResponse }

type ImpersonationAuthority =
    | { present: false }
    | { present: true; ok: true; adminId: string; targetId: string }
    | { present: true; ok: false; response: NextResponse }

/**
 * P0-08 hard cut: a raw `x-admin-token` / ADMIN_SECRET_TOKEN header is never
 * business authority. Admin access to tenant-owned resources requires a
 * durable, admin-bound, audited impersonation session (P0-07). Without one,
 * only the canonical business session counts.
 */
async function resolveImpersonationAuthority(request: Request): Promise<ImpersonationAuthority> {
    if (!readImpersonationSessionToken(request)) return { present: false }

    try {
        const session = await getBoundActiveImpersonationFromRequest(request)
        if (!session) {
            return {
                present: true,
                ok: false,
                response: NextResponse.json({ error: 'Impersonation authority geçersiz' }, { status: 401 }),
            }
        }
        return { present: true, ok: true, adminId: session.adminId, targetId: session.subject.id }
    } catch {
        return {
            present: true,
            ok: false,
            response: NextResponse.json({ error: 'Impersonation authority unavailable' }, { status: 503 }),
        }
    }
}

function impersonationTargetMismatch(): NextResponse {
    return NextResponse.json({ error: 'Impersonation hedefi dışında erişim yasak' }, { status: 403 })
}

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

    const impersonation = await resolveImpersonationAuthority(request)
    if (impersonation.present) {
        if (!impersonation.ok) return { ok: false, response: impersonation.response }
        if (impersonation.targetId !== hedefEsnafId) {
            return { ok: false, response: impersonationTargetMismatch() }
        }
        return { ok: true, esnafId: hedefEsnafId, isAdmin: true, actingAdminId: impersonation.adminId }
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

    const impersonation = await resolveImpersonationAuthority(request)
    if (impersonation.present) {
        if (!impersonation.ok) return { ok: false, response: impersonation.response }
        if (!esnafId || impersonation.targetId !== esnafId) {
            return { ok: false, response: impersonationTargetMismatch() }
        }
        return {
            ok: true,
            esnafId,
            isAdmin: true,
            actingAdminId: impersonation.adminId,
            randevuId,
            randevuRef,
            randevu,
        }
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
