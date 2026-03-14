/**
 * impersonation.ts — Admin "Esnaf Kılığına Girme" Sistemi
 * ─────────────────────────────────────────────────────────────────────────────
 * Admin, esnaf hesabına şifre bilmeden giriş yapar.
 * JWT cookie'sine "impersonating" claim eklenir.
 * Ekranın üstünde kırmızı "Admin'e Dön" barı gösterilir.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const IMPERSONATE_COOKIE = 'kepenk_impersonate'
const JWT_SURE = '2h'  // Impersonation sadece 2 saat geçerli (güvenlik)

function getSecret(): Uint8Array {
    const secret = process.env.SESSION_SECRET || 'kepenk-dev-secret-change-in-production-32ch'
    return new TextEncoder().encode(secret)
}

/**
 * Impersonation JWT oluşturur.
 * İçerisinde adminId + hedefEsnafId bilgisi taşır.
 */
export async function impersonateTokenOlustur(
    adminId: string,
    hedefEsnafId: string,
    hedefEsnafAd: string
): Promise<string> {
    return new SignJWT({
        esnafId: hedefEsnafId,        // Esnaf gibi davran
        adminId,                       // Gerçek admin kim
        impersonating: true,           // Bu bir impersonation
        hedefEsnafAd,                  // UI'da göstermek için
    })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(JWT_SURE)
        .setIssuer('kepenk.ai:admin')
        .sign(getSecret())
}

/**
 * Impersonation cookie'si oluştur ve response'a set et.
 */
export async function impersonateBaslat(
    adminId: string,
    hedefEsnafId: string,
    hedefEsnafAd: string,
    response: NextResponse
): Promise<NextResponse> {
    const token = await impersonateTokenOlustur(adminId, hedefEsnafId, hedefEsnafAd)

    response.cookies.set(IMPERSONATE_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 2 * 60 * 60, // 2 saat
        path: '/',
    })

    return response
}

/**
 * Impersonation bilgisini oku (Server Component / Route Handler).
 * Cookie'den JWT'yi çözer ve impersonation bilgisini döner.
 */
export async function impersonationBilgiAl(): Promise<{
    aktif: boolean
    esnafId?: string
    adminId?: string
    hedefEsnafAd?: string
} | null> {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get(IMPERSONATE_COOKIE)?.value
        if (!token) return { aktif: false }

        const { payload } = await jwtVerify(token, getSecret(), {
            issuer: 'kepenk.ai:admin',
        })

        if (payload.impersonating) {
            return {
                aktif: true,
                esnafId: payload.esnafId as string,
                adminId: payload.adminId as string,
                hedefEsnafAd: payload.hedefEsnafAd as string,
            }
        }

        return { aktif: false }
    } catch {
        return { aktif: false }
    }
}

/**
 * Impersonation cookie'sini sil (Admin'e dön).
 */
export async function impersonateBitir(response: NextResponse): Promise<NextResponse> {
    response.cookies.set(IMPERSONATE_COOKIE, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/',
    })
    return response
}

export { IMPERSONATE_COOKIE }
