import { NextResponse } from 'next/server'
import { apiGuard } from '@/lib/apiGuard'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'

/**
 * Admin Kota + Durum Yönetimi API
 * POST /api/admin/kota
 * 
 * İşlemler:
 *   - kredi_hediye: Esnafa AI kredisi ekle
 *   - paket_degistir: Paket yükselt/düşür
 *   - askiya_al: Hesabı dondur
 *   - aktif_et: Hesabı aktifleştir
 *   - kill_switch: Tüm sistemi bakıma al
 */

export async function POST(request: Request) {
    const guard = await apiGuard(request, { requireAdminToken: true })
    if (!guard.ok) return guard.response

    try {
        const body = await request.json()
        const { islem, esnafId, deger } = body

        switch (islem) {
            case 'kredi_hediye': {
                if (!esnafId || !deger) {
                    return NextResponse.json({ error: 'esnafId ve deger zorunlu' }, { status: 400 })
                }

                const ay = new Date().toISOString().slice(0, 7)
                const kotaRef = adminDb.collection('esnaflar').doc(esnafId)
                    .collection('monthly_credits').doc(ay)

                const kotaDoc = await kotaRef.get()
                const mevcutKalan = kotaDoc.exists ? (kotaDoc.data()!.kalan || 0) : 0

                await kotaRef.set({
                    kalan: mevcutKalan + Number(deger),
                    toplam: (kotaDoc.exists ? (kotaDoc.data()!.toplam || 0) : 0) + Number(deger),
                    sonGuncelleme: Timestamp.now(),
                    hediye: true,
                }, { merge: true })

                return NextResponse.json({
                    ok: true,
                    mesaj: `${deger} kredi hediye edildi (toplam: ${mevcutKalan + Number(deger)})`,
                })
            }

            case 'paket_degistir': {
                if (!esnafId || !deger) {
                    return NextResponse.json({ error: 'esnafId ve deger (paket adı) zorunlu' }, { status: 400 })
                }

                await adminDb.collection('esnaflar').doc(esnafId).update({
                    paket: deger,
                    adminGuncelleme: Timestamp.now(),
                })

                return NextResponse.json({ ok: true, mesaj: `Paket ${deger} olarak güncellendi` })
            }

            case 'askiya_al': {
                if (!esnafId) {
                    return NextResponse.json({ error: 'esnafId zorunlu' }, { status: 400 })
                }

                await adminDb.collection('esnaflar').doc(esnafId).update({
                    durum: 'askida',
                    askiyaAlinma: Timestamp.now(),
                    'ayarlar.botAktif': false,
                    adminGuncelleme: Timestamp.now(),
                })

                return NextResponse.json({ ok: true, mesaj: 'Hesap askıya alındı' })
            }

            case 'aktif_et': {
                if (!esnafId) {
                    return NextResponse.json({ error: 'esnafId zorunlu' }, { status: 400 })
                }

                await adminDb.collection('esnaflar').doc(esnafId).update({
                    durum: 'aktif',
                    'ayarlar.botAktif': true,
                    adminGuncelleme: Timestamp.now(),
                })

                return NextResponse.json({ ok: true, mesaj: 'Hesap aktifleştirildi' })
            }

            case 'kill_switch': {
                const yeniDurum = deger === 'maintenance' ? 'maintenance' : 'active'

                await adminDb.collection('global_settings').doc('status').set({
                    durum: yeniDurum,
                    guncelleyen: 'admin',
                    zaman: Timestamp.now(),
                }, { merge: true })

                return NextResponse.json({
                    ok: true,
                    mesaj: yeniDurum === 'maintenance'
                        ? '⛔ Sistem bakıma alındı — tüm AI çıkışları donduruldu'
                        : '✅ Sistem aktif — AI çıkışları açıldı',
                    durum: yeniDurum,
                })
            }

            default:
                return NextResponse.json({ error: 'Geçersiz işlem' }, { status: 400 })
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
