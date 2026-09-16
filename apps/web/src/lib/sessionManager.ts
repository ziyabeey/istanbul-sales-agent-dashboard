/**
 * Session Manager — compatibility adapter during Pilot-0 auth cutover.
 *
 * New human logins use a canonical signed session locator whose authority is
 * resolved from durable Session -> User -> Membership state. Legacy esnafId
 * JWTs remain cryptographically readable only until P0-03 request-gate cutover.
 *
 * OTP storage remains here temporarily and is independent from Session truth.
 */

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import type { RequestContext, Session } from '../../../../packages/auth/src/types/canonical'
import { adminDb } from './firebaseAdmin'
import {
    FirestoreMembershipRepository,
    FirestoreSessionRepository,
    FirestoreUserRepository,
    MembershipResolver,
    RequestContextBuilder,
    SessionVerifier,
} from './auth'
import {
    isCanonicalSessionTokenCandidate,
    issueCanonicalSessionToken,
    verifyCanonicalSessionToken,
} from './auth/sessionToken'
import { getSessionSecret } from './auth/sessionSecret'

const COOKIE_ADI = 'kepenk_session'
const JWT_SURE = '7d' // Legacy compatibility token validity
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 // 7 gün (saniye)

function setSessionCookie(response: NextResponse, token: string): NextResponse {
    response.cookies.set(COOKIE_ADI, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: COOKIE_MAX_AGE,
        path: '/',
    })

    return response
}

function canonicalContextBuilder(): RequestContextBuilder {
    const sessions = new FirestoreSessionRepository()
    const users = new FirestoreUserRepository()
    const memberships = new FirestoreMembershipRepository()

    return new RequestContextBuilder(
        new SessionVerifier(sessions, users),
        new MembershipResolver(memberships)
    )
}

/**
 * Canonical token resolution is fail-closed. A token marked canonical never
 * falls back to the legacy esnafId JWT parser if durable authority rejects it.
 */
export async function canonicalRequestContextDogrula(
    token: string
): Promise<RequestContext | null> {
    if (!isCanonicalSessionTokenCandidate(token)) return null

    const claims = await verifyCanonicalSessionToken(token)
    if (!claims) return null

    const result = await canonicalContextBuilder().build(claims.sessionId)
    if (!result.ok) return null
    if (result.context.userId !== claims.userId) return null

    return result.context
}

// ── Legacy JWT Oluştur ───────────────────────────────────────────────────────
// P0-02 new human logins must not use this. Demo/dev/onboarding compatibility
// callers remain until their owning Pilot-0 hard-cut.
export async function jwtOlustur(esnafId: string): Promise<string> {
    return new SignJWT({ esnafId })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(JWT_SURE)
        .setIssuer('kepenk.ai')
        .sign(getSessionSecret())
}

// ── Legacy JWT Doğrula ───────────────────────────────────────────────────────
export async function jwtDogrula(token: string): Promise<{ esnafId: string } | null> {
    try {
        const { payload } = await jwtVerify(token, getSessionSecret(), { issuer: 'kepenk.ai' })
        if (typeof payload.esnafId !== 'string' || !payload.esnafId) return null
        return { esnafId: payload.esnafId }
    } catch {
        return null
    }
}

// ── Legacy Oturum Oluştur ────────────────────────────────────────────────────
export async function oturumOlustur(esnafId: string, response: NextResponse): Promise<NextResponse> {
    const token = await jwtOlustur(esnafId)
    return setSessionCookie(response, token)
}

// ── Canonical Oturum Cookie Oluştur ─────────────────────────────────────────
export async function canonicalOturumOlustur(
    session: Session,
    response: NextResponse
): Promise<NextResponse> {
    const token = await issueCanonicalSessionToken(session)
    return setSessionCookie(response, token)
}

async function tenantIdFromSessionToken(token: string): Promise<string | null> {
    if (isCanonicalSessionTokenCandidate(token)) {
        const context = await canonicalRequestContextDogrula(token)
        return context?.tenantId ?? null
    }

    const legacy = await jwtDogrula(token)
    return legacy?.esnafId ?? null
}

// ── Oturum Doğrula (middleware + API route'lardan) ───────────────────────────
export async function oturumDogrula(req: NextRequest): Promise<string | null> {
    const token = req.cookies.get(COOKIE_ADI)?.value
    if (!token) return null
    return tenantIdFromSessionToken(token)
}

// ── Oturum Doğrula (Server Component / Route Handler — cookies() ile) ────────
export async function oturumDogrulaServer(): Promise<string | null> {
    const cookieStore = await cookies()
    const token = cookieStore.get(COOKIE_ADI)?.value
    if (!token) return null
    return tenantIdFromSessionToken(token)
}

// ── Oturum Sil ───────────────────────────────────────────────────────────────
export async function oturumSil(response: NextResponse): Promise<NextResponse> {
    response.cookies.set(COOKIE_ADI, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/',
    })
    return response
}

// ── Firestore OTP İşlemleri ──────────────────────────────────────────────────
const OTP_TTL_MS = 3 * 60 * 1000 // 3 dakika
const OTP_RATE_MS = 60 * 1000    // 60 saniye (gönderim arası minimum bekleme)

export async function otpKaydet(telefon: string, kod: string): Promise<void> {
    await adminDb.collection('otp_sessions').doc(telefon).set({
        kod,
        telefon,
        olusturma: new Date(),
        sonKullanim: new Date(Date.now() + OTP_TTL_MS),
    })
}

export async function otpDogrula(telefon: string, kod: string): Promise<boolean> {
    const ref = adminDb.collection('otp_sessions').doc(telefon)
    const doc = await ref.get()

    if (!doc.exists) return false

    const data = doc.data()!
    const suruDoldu = new Date() > new Date(data.sonKullanim?.toDate?.() || data.sonKullanim)
    if (suruDoldu) {
        await ref.delete()
        return false
    }

    if (data.kod !== String(kod)) return false

    // Başarılı — OTP'yi sil
    await ref.delete()
    return true
}

export async function otpRateKontrol(telefon: string): Promise<boolean> {
    const doc = await adminDb.collection('otp_sessions').doc(telefon).get()

    if (!doc.exists) return true // Rate limit yok, gönderilebilir

    const data = doc.data()!
    const olusturma = data.olusturma?.toDate?.() || new Date(data.olusturma)
    return (Date.now() - olusturma.getTime()) >= OTP_RATE_MS
}

export { COOKIE_ADI }
