import { NextResponse } from 'next/server'
import { apiGuard } from '@/lib/apiGuard'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import {
    assertNoActiveImpersonationForRestrictedAction,
    ImpersonationRestrictedActionError,
} from '@/lib/impersonation'
import {
    AdminAuditPersistenceError,
    runAuditedAdminMutation,
} from '@/lib/security/auditLogger'

function mutationError(error: unknown): NextResponse {
    if (error instanceof ImpersonationRestrictedActionError) {
        return NextResponse.json({ error: error.message }, { status: 403 })
    }
    if (error instanceof AdminAuditPersistenceError) {
        return NextResponse.json({ error: 'Admin audit unavailable' }, { status: 503 })
    }
    const message = error instanceof Error ? error.message : 'Sunucu hatası'
    return NextResponse.json({ error: message }, { status: 500 })
}

export async function POST(request: Request) {
    const guard = await apiGuard(request, { requireAdminSession: true })
    if (!guard.ok) return guard.response
    if (!guard.adminSession) return NextResponse.json({ error: 'Admin authority unavailable' }, { status: 503 })

    try {
        const body = await request.json() as { islem?: unknown; esnafId?: unknown; deger?: unknown }
        const islem = typeof body.islem === 'string' ? body.islem : ''
        const esnafId = typeof body.esnafId === 'string' ? body.esnafId : ''
        const deger = body.deger
        const supported = new Set(['kredi_hediye', 'paket_degistir', 'askiya_al', 'aktif_et', 'kill_switch'])
        if (!supported.has(islem)) return NextResponse.json({ error: 'Geçersiz işlem' }, { status: 400 })
        if (islem !== 'kill_switch' && !esnafId) return NextResponse.json({ error: 'esnafId zorunlu' }, { status: 400 })
        if ((islem === 'kredi_hediye' || islem === 'paket_degistir') && (deger === undefined || deger === null || deger === '')) {
            return NextResponse.json({ error: 'deger zorunlu' }, { status: 400 })
        }

        return await runAuditedAdminMutation(
            {
                actorAdminId: guard.adminSession.principalId,
                targetType: esnafId ? 'business' : 'system',
                targetId: esnafId || 'global_settings/status',
                action: 'ADMIN_KOTA_MUTATION',
                metadata: { islem },
            },
            request,
            async () => {
                await assertNoActiveImpersonationForRestrictedAction(request)
                switch (islem) {
                    case 'kredi_hediye': {
                        const amount = Number(deger)
                        if (!Number.isFinite(amount) || amount <= 0) throw new Error('deger pozitif sayı olmalı')
                        const ay = new Date().toISOString().slice(0, 7)
                        const kotaRef = adminDb.collection('esnaflar').doc(esnafId).collection('monthly_credits').doc(ay)
                        const kotaDoc = await kotaRef.get()
                        const mevcutKalan = kotaDoc.exists ? (kotaDoc.data()!.kalan || 0) : 0
                        await kotaRef.set({
                            kalan: mevcutKalan + amount,
                            toplam: (kotaDoc.exists ? (kotaDoc.data()!.toplam || 0) : 0) + amount,
                            sonGuncelleme: Timestamp.now(),
                            hediye: true,
                        }, { merge: true })
                        return NextResponse.json({ ok: true, mesaj: `${amount} kredi hediye edildi (toplam: ${mevcutKalan + amount})` })
                    }
                    case 'paket_degistir':
                        await adminDb.collection('esnaflar').doc(esnafId).update({ paket: deger, adminGuncelleme: Timestamp.now() })
                        return NextResponse.json({ ok: true, mesaj: `Paket ${String(deger)} olarak güncellendi` })
                    case 'askiya_al':
                        await adminDb.collection('esnaflar').doc(esnafId).update({ durum: 'askida', askiyaAlinma: Timestamp.now(), 'ayarlar.botAktif': false, adminGuncelleme: Timestamp.now() })
                        return NextResponse.json({ ok: true, mesaj: 'Hesap askıya alındı' })
                    case 'aktif_et':
                        await adminDb.collection('esnaflar').doc(esnafId).update({ durum: 'aktif', 'ayarlar.botAktif': true, adminGuncelleme: Timestamp.now() })
                        return NextResponse.json({ ok: true, mesaj: 'Hesap aktifleştirildi' })
                    case 'kill_switch': {
                        const yeniDurum = deger === 'maintenance' ? 'maintenance' : 'active'
                        await adminDb.collection('global_settings').doc('status').set({ durum: yeniDurum, guncelleyen: guard.adminSession?.principalId, zaman: Timestamp.now() }, { merge: true })
                        return NextResponse.json({ ok: true, mesaj: yeniDurum === 'maintenance' ? '⛔ Sistem bakıma alındı' : '✅ Sistem aktif', durum: yeniDurum })
                    }
                    default:
                        throw new Error('Geçersiz işlem')
                }
            }
        )
    } catch (error) {
        return mutationError(error)
    }
}
