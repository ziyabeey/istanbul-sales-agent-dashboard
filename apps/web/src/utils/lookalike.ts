import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { createHash } from 'crypto'

const META_API_VERSION = 'v20.0'
const META_BASE = `https://graph.facebook.com/${META_API_VERSION}`
const META_TOKEN = process.env.META_ADS_ACCESS_TOKEN!
const META_AD_ACCOUNT = process.env.META_AD_ACCOUNT_ID!  // act_XXXXXXXX

export async function lookalikeDateOlustur(esnafId: string): Promise<string | null> {
    // VIP müşterileri topla
    const vipProfiller = await adminDb
        .collection('musteriProfiller')
        .where('esnafId', '==', esnafId)
        .where('etiketler', 'array-contains', 'vip')
        .get()

    // Meta minimum 100 kişi ister
    if (vipProfiller.size < 100) {
        console.log(`[LOOKALIKE] Yeterli VIP müşteri yok (${vipProfiller.size}/100)`)
        return null
    }

    // Telefon numaralarını hashle (Meta SHA-256 ister)
    const telefonlar = vipProfiller.docs.map((d: any) => {
        const tel = d.data().telefon.replace(/\D/g, '')
        const normalized = tel.startsWith('90') ? tel : `90${tel}`
        return createHash('sha256').update(normalized).digest('hex')
    })

    // Custom Audience oluştur
    const audienceRes = await fetch(
        `${META_BASE}/${META_AD_ACCOUNT}/customaudiences`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${META_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: `kepenk_vip_${esnafId}_${Date.now()}`,
                subtype: 'CUSTOM',
                description: 'VIP müşteriler',
            }),
        }
    )
    const audienceData = await audienceRes.json()
    const audienceId = audienceData.id

    if (!audienceId) throw new Error('Meta Lookalike AudienceId alınamadı: ' + JSON.stringify(audienceData))

    // Kullanıcıları yükle
    await fetch(`${META_BASE}/${audienceId}/users`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${META_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            payload: {
                schema: ['PHONE'],
                data: telefonlar.map((t: any) => [t]),
            },
        }),
    })

    // Lookalike Audience oluştur
    const lookalikeRes = await fetch(
        `${META_BASE}/${META_AD_ACCOUNT}/customaudiences`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${META_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: `kepenk_lookalike_${esnafId}`,
                subtype: 'LOOKALIKE',
                origin_audience_id: audienceId,
                lookalike_spec: {
                    ratio: 0.01,  // En benzer %1
                    country: 'TR',
                },
            }),
        }
    )
    const lookalikeData = await lookalikeRes.json()
    const lookalikeId = lookalikeData.id

    // Firestore'a kaydet
    await adminDb.collection('esnaflar').doc(esnafId).update({
        'meta.customAudienceId': audienceId,
        'meta.lookalikeAudienceId': lookalikeId,
        'meta.lookalikeTarih': Timestamp.now(),
    })

    return lookalikeId
}
