import { NextResponse } from 'next/server'
import { apiGuard } from '@/lib/apiGuard'
import { impersonateBaslat, impersonateBitir } from '@/lib/impersonation'
import { adminDb } from '@/lib/firebaseAdmin'

/**
 * POST /api/admin/impersonate — Esnaf hesabına gir
 * DELETE /api/admin/impersonate — Admin'e dön
 */

export async function POST(request: Request) {
    const guard = await apiGuard(request, { requireAdminToken: true })
    if (!guard.ok) return guard.response

    try {
        const { esnafId } = await request.json()
        if (!esnafId) {
            return NextResponse.json({ error: 'esnafId zorunlu' }, { status: 400 })
        }

        // Esnaf var mı kontrol
        const doc = await adminDb.collection('esnaflar').doc(esnafId).get()
        if (!doc.exists) {
            return NextResponse.json({ error: 'Esnaf bulunamadı' }, { status: 404 })
        }

        const esnaf = doc.data()!
        const adminId = 'super_admin' // Gelecekte admin JWT'den alınabilir

        const response = NextResponse.json({
            ok: true,
            mesaj: `${esnaf.ad || 'Esnaf'} hesabına geçiş yapıldı`,
            redirect: '/dashboard',
        })

        return impersonateBaslat(adminId, esnafId, esnaf.ad || 'Esnaf', response)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    const guard = await apiGuard(request, { requireAdminToken: true })
    if (!guard.ok) return guard.response

    const response = NextResponse.json({
        ok: true,
        mesaj: 'Admin hesabına geri dönüldü',
        redirect: '/admin/esnaflar',
    })

    return impersonateBitir(response)
}
