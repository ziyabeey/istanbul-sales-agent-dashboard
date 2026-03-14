/**
 * kapora-temizleyici/route.ts — TTL Sweeper Worker
 * ══════════════════════════════════════════════════════════════════════
 * Cloud Scheduler cron: 15 dakika içinde ödeme yapılmayan randevuları
 * ACIZMASIZCA siler ve saatleri diğer müşterilere açar.
 *
 * Cron: her 5 dakikada bir çalışır
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { FieldValue, Timestamp } from 'firebase-admin/firestore'

export async function GET(req: Request) {
    // Basit auth kontrolü (Cloud Scheduler header veya API key)
    const authHeader = req.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET || 'kepenk-cron-2026'
    if (authHeader !== `Bearer ${cronSecret}`) {
        console.warn('[temizleyici] ⚠️ Yetkisiz erişim denemesi')
        return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    }

    const simdi = Timestamp.now()
    let temizlenen = 0

    try {
        // Tüm esnafların kapora_bekleniyor durumundaki süresi dolmuş randevularını bul
        const esnafSnap = await adminDb.collection('esnaflar').get()

        for (const esnafDoc of esnafSnap.docs) {
            const randevuSnap = await adminDb
                .collection('esnaflar').doc(esnafDoc.id)
                .collection('randevular')
                .where('durum', '==', 'kapora_bekleniyor')
                .where('kilit_aktif', '==', true)
                .get()

            for (const randevuDoc of randevuSnap.docs) {
                const data = randevuDoc.data()
                const kilitBitis = data.kilit_bitis as Timestamp

                // Süresi dolmuş mu?
                if (kilitBitis && kilitBitis.toMillis() <= simdi.toMillis()) {
                    // ACIZMASIZCA SİL
                    await randevuDoc.ref.update({
                        durum: 'suresi_doldu',
                        kilit_aktif: false,
                        son_guncelleme: FieldValue.serverTimestamp(),
                    })

                    temizlenen++
                    console.log(
                        `[temizleyici] 🗑️ Randevu süresi doldu: ${randevuDoc.id} ` +
                        `(${data.tarih} ${data.baslangic_saat}) — Saat tekrar açıldı`
                    )
                }
            }
        }

        console.log(`[temizleyici] ✅ Tamamlandı. ${temizlenen} randevu temizlendi.`)

        return NextResponse.json({
            success: true,
            temizlenen,
            zaman: new Date().toISOString(),
        })

    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Bilinmeyen hata'
        console.error('[temizleyici] ❌ Hata:', msg)
        return NextResponse.json({ error: msg }, { status: 500 })
    }
}
