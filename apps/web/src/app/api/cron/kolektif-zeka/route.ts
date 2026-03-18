import { NextResponse } from 'next/server'
import { icerikPerformansKaydet } from '@/utils/icerikPerformansHasatcisi'
import { kampanyaPerformansKaydet } from '@/utils/kampanyaPerformansHasatcisi'
import { abTestSonuclandir } from '@/utils/abTest'
import { adminDb } from '@/lib/firebaseAdmin'
import { Timestamp } from 'firebase-admin/firestore'
import { telegramGonder } from '@/lib/telegram'

export async function GET(req: Request) {
    if (req.headers.get('x-cron-secret') !== process.env.CRON_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const simdi = new Date()

        // 1. İçerik Hasadı (48 saatini dolduranları kontrol et)
        const kirkSekizSaatOnce = new Date(simdi.getTime() - 48 * 60 * 60 * 1000)
        const icerikler = await adminDb.collection('icerikler')
            .where('ogrenmeGonderildi', '!=', true)
            .where('olusturma', '<=', Timestamp.fromDate(kirkSekizSaatOnce))
            .limit(50).get()

        for (const i of icerikler.docs) {
            await icerikPerformansKaydet(i.id)
        }

        // 2. Kampanya Hasadı (24 saatini dolduranları kontrol et)
        const yirmiDortSaatOnce = new Date(simdi.getTime() - 24 * 60 * 60 * 1000)
        const kampanyalar = await adminDb.collection('kampanyaLoglari')
            .where('ogrenmeGonderildi', '!=', true)
            .where('zaman', '<=', Timestamp.fromDate(yirmiDortSaatOnce))
            .limit(50).get()

        for (const k of kampanyalar.docs) {
            const data = k.data()
            await kampanyaPerformansKaydet(k.id, data.esnafId, data.tip || 'kampanya')
        }

        // 3. A/B Test Sonuçlandırıcı (Pazartesi Günleri)
        if (simdi.getDay() === 1) { // 1 = Pazartesi
            const acikTestler = await adminDb.collection('abTestler')
                .where('sonuc', '==', null)
                .get()

            for (const t of acikTestler.docs) {
                await abTestSonuclandir(t.id)
            }
        }

        // 4. Haftalık Platform Raporu (Pazar Günleri)
        if (simdi.getDay() === 0) { // 0 = Pazar
            const gecenHafta = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            const yeniAnlar = await adminDb.collection('ogrenmeAnlari')
                .where('zaman', '>=', Timestamp.fromDate(gecenHafta))
                .get()

            const sektorDagilimi: Record<string, number> = {}
            for (const doc of yeniAnlar.docs) {
                const s = doc.data().sektor || 'Bilinmiyor'
                sektorDagilimi[s] = (sektorDagilimi[s] ?? 0) + 1
            }

            const enAktifSektor = Object.entries(sektorDagilimi)
                .sort((a: [string, number], b: [string, number]) => b[1] - a[1])[0]

            const yuksekDonusum = yeniAnlar.docs
                .filter((d: any) => d.data().metrikler?.donusumOrani === 1)
                .sort((a: any, b: any) => b.data().zaman.toDate().getTime() - a.data().zaman.toDate().getTime())
                .slice(0, 3)

            // 5. Platform Insights → Ajan prompt'larına otomatik enjeksiyon
            // En başarılı taktikleri sektör bazında platform_insights koleksiyonuna yaz
            const sektorTaktikler: Record<string, { eylem: string; sonuc: string }[]> = {}
            for (const doc of yeniAnlar.docs) {
                const d = doc.data()
                if (d.metrikler?.donusumOrani >= 0.7 && d.sektor && d.eylem) {
                    if (!sektorTaktikler[d.sektor]) sektorTaktikler[d.sektor] = []
                    sektorTaktikler[d.sektor].push({
                        eylem: String(d.eylem).substring(0, 200),
                        sonuc: String(d.sonuc).substring(0, 200),
                    })
                }
            }

            // Her sektör için en iyi 3 taktiği kaydet
            for (const [sektor, taktikler] of Object.entries(sektorTaktikler)) {
                await adminDb.collection('platform_insights').doc(sektor).set({
                    sektor,
                    enIyiTaktikler: taktikler.slice(0, 3),
                    hafta: simdi.toISOString().slice(0, 10),
                    ornekSayisi: taktikler.length,
                    guncelleme: Timestamp.now(),
                }, { merge: true })
            }

            await telegramGonder(
                `🧠 *Haftalık Platform Zekası Raporu*\n\n` +
                `Bu hafta ${yeniAnlar.size} yeni öğrenme anı vektör veritabanına eklendi\n\n` +
                `*En aktif bilgi üreten sektör:* ${enAktifSektor?.[0] || 'Yok'} (${enAktifSektor?.[1] || 0} örnek)\n\n` +
                `*Bu hafta en çok işe yarayan 3 taktik:*\n` +
                yuksekDonusum.map((d: any, i: number) =>
                    `${i + 1}. ${d.data().sektor}/${d.data().ilce}: ${d.data().eylem?.substring(0, 60)}`
                ).join('\n') +
                `\n\n` +
                `*Kolektif zeka motoru devrede!*`
            )
        }

        return NextResponse.json({ success: true })
    } catch (error: any) {
        // console.error('Kolektif Zeka Cron Hatası:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
