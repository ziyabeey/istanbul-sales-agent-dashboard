import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { reklamKreatifolustur } from '@/lib/metaAdsClient'

const META_API_VERSION = 'v20.0'
const META_BASE = `https://graph.facebook.com/${META_API_VERSION}`
const META_TOKEN = process.env.META_ADS_ACCESS_TOKEN!

export async function reklamPerformansGuncelle(): Promise<void> {
    const aktifReklamlar = await adminDb
        .collection('reklamlar')
        .where('durum', '==', 'aktif')
        .get()

    for (const doc of aktifReklamlar.docs) {
        const reklam = doc.data()
        if (reklam.platform !== 'meta') continue

        try {
            // Meta Insights API
            const res = await fetch(
                `${META_BASE}/${reklam.reklamId}/insights?` +
                `fields=impressions,reach,clicks,spend,actions&` +
                `access_token=${META_TOKEN}`
            )

            const resJson = await res.json()
            // If error or no data, skip
            if (!res.ok || !resJson.data) continue

            const insight = resJson.data?.[0]
            if (!insight) continue

            const mesajAksiyon = insight.actions?.find(
                (a: any) => a.action_type === 'onsite_conversion.messaging_conversation_started_7d'
            )

            const performans = {
                gosterim: parseInt(insight.impressions ?? '0'),
                erisim: parseInt(insight.reach ?? '0'),
                tiklama: parseInt(insight.clicks ?? '0'),
                harcama: parseFloat(insight.spend ?? '0'),
                mesajBaslat: parseInt(mesajAksiyon?.value ?? '0'),
                guncellenme: Timestamp.now(),
            }

            await doc.ref.update({ performans })

            // Kötü performans uyarısı: 3 günden fazla çalışıyor, CTR < %0.5
            const ctr = performans.gosterim > 0
                ? (performans.tiklama / performans.gosterim) * 100
                : 0

            // If baslangic field is missing or invalid, assume Date.now()
            const baslangic = reklam.baslangic?.toDate ? reklam.baslangic.toDate() : new Date()
            const gunFarki = Math.floor((Date.now() - baslangic.getTime()) / (1000 * 60 * 60 * 24))

            if (gunFarki >= 3 && ctr < 0.5) {
                await reklamOtomatikOptimize(doc.id, reklam, ctr)
            }
        } catch (error) {
            console.error(`[REKLAM PERFORMANS HATA] reklamId ${reklam.reklamId}:`, error)
        }
    }
}

// ── Düşük performanslı reklamı optimize et ───────────────────────────────
async function reklamOtomatikOptimize(
    docId: string,
    reklam: any,
    ctr: number
): Promise<void> {
    const esnafDoc = await adminDb.collection('esnaflar').doc(reklam.esnafId).get()
    if (!esnafDoc.exists) return
    const esnaf = { id: esnafDoc.id, ...esnafDoc.data() }

    try {
        // Yeni kreatif üret — farklı açı
        const yeniKreatif = await reklamKreatifolustur(esnaf)

        // Reklamı güncelle
        await fetch(`${META_BASE}/${reklam.reklamId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${META_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ creative: { creative_id: yeniKreatif.id } }),
        })

        await adminDb.collection('reklamlar').doc(docId).update({
            'optimizasyon.sonOptimizasyon': Timestamp.now(),
            'optimizasyon.sebep': `CTR %${ctr.toFixed(2)} — kreatif yenilendi`,
        })

        console.log(`[REKLAM OPTIMIZE] Esnaf: ${esnaf.isletmeAdi}, Yeni kreatif atandı. CTR: %${ctr.toFixed(2)}`)
    } catch (error) {
        console.error(`[REKLAM OPTIMIZE HATA] docId ${docId}:`, error)
    }
}
