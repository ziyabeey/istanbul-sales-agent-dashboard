import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import Anthropic from '@anthropic-ai/sdk'

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Meta Ads API v20 — Kepenk.ai merkezi hesabından esnaf adına reklam
const META_API_VERSION = 'v20.0'
const META_BASE = `https://graph.facebook.com/${META_API_VERSION}`
const META_TOKEN = process.env.META_ADS_ACCESS_TOKEN!
const META_AD_ACCOUNT = process.env.META_AD_ACCOUNT_ID!  // act_XXXXXXXX

// ── Kampanya oluştur ──────────────────────────────────────────────────────
export async function kampanyaOlustur(params: {
    esnafId: string
    hedef: 'REACH' | 'MESSAGES' | 'LEAD_GENERATION'
    butce: number   // Günlük TL bütçe
    gun: number   // Kaç gün sürsün
}): Promise<{ kampanyaId: string; reklamId: string }> {

    const esnafDoc = await adminDb.collection('esnaflar').doc(params.esnafId).get()
    const esnaf = { id: esnafDoc.id, ...esnafDoc.data() } as any

    // 1. Campaign oluştur
    const kampanyaRes = await fetch(`${META_BASE}/${META_AD_ACCOUNT}/campaigns`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${META_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: `kepenk_${params.esnafId}_${Date.now()}`,
            objective: params.hedef,
            status: 'ACTIVE',
            special_ad_categories: [],
        }),
    })
    const kampanyaData = await kampanyaRes.json()
    const kampanyaId = kampanyaData.id

    if (!kampanyaId) throw new Error('Meta Kampanya oluşturulamadı: ' + JSON.stringify(kampanyaData))

    // 2. Ad Set — hedefleme
    const adSetRes = await fetch(`${META_BASE}/${META_AD_ACCOUNT}/adsets`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${META_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: `adset_${params.esnafId}`,
            campaign_id: kampanyaId,
            daily_budget: params.butce * 100,   // Kuruş cinsinden
            billing_event: 'IMPRESSIONS',
            optimization_goal: params.hedef === 'MESSAGES' ? 'CONVERSATIONS' : 'REACH',
            targeting: {
                geo_locations: {
                    cities: [{
                        key: turkiyeSehirKey(esnaf.ilce, esnaf.sehir),
                        radius: 5,
                        distance_unit: 'kilometer',
                    }],
                },
                age_min: esnaf.hedefYasMin ?? 18,
                age_max: esnaf.hedefYasMax ?? 55,
                genders: hedefCinsiyet(esnaf.sektor),  // Sektöre göre otomatik
                interests: sektorIlgiAlanlari(esnaf.sektor),
            },
            end_time: Math.floor(
                (Date.now() + params.gun * 24 * 60 * 60 * 1000) / 1000
            ).toString(),
            status: 'ACTIVE',
        }),
    })
    const adSetData = await adSetRes.json()
    const adSetId = adSetData.id

    // 3. Creative — AI ile görsel + metin üret
    const kreatif = await reklamKreatifolustur(esnaf)

    // 4. Ad oluştur
    const adRes = await fetch(`${META_BASE}/${META_AD_ACCOUNT}/ads`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${META_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: `ad_${params.esnafId}`,
            adset_id: adSetId,
            creative: { creative_id: kreatif.id },
            status: 'ACTIVE',
        }),
    })
    const adData = await adRes.json()
    const reklamId = adData.id

    // Firestore'a kaydet
    await adminDb.collection('reklamlar').add({
        esnafId: params.esnafId,
        platform: 'meta',
        kampanyaId,
        adSetId,
        reklamId,
        butce: params.butce,
        gun: params.gun,
        baslangic: Timestamp.now(),
        bitis: Timestamp.fromDate(new Date(Date.now() + params.gun * 24 * 60 * 60 * 1000)),
        durum: 'aktif',
    })

    return { kampanyaId, reklamId }
}

// ── Reklam metnini AI ile üret ────────────────────────────────────────────
export async function reklamKreatifolustur(esnaf: any): Promise<{ id: string }> {
    // Claude ile reklam metni üret
    const yanit = await claude.messages.create({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 300,
        messages: [{
            role: 'user',
            content: `
${esnaf.isletmeAdi || 'İşletme'} için Instagram/Facebook reklamı yaz.
Sektör: ${esnaf.sektor || 'Genel'}
İlçe: ${esnaf.ilce || 'Bilinmiyor'}
Hizmetler: ${(esnaf.hizmetler ?? []).join(', ')}

FORMAT (sadece JSON):
{
  "baslik": "max 40 karakter başlık",
  "metin": "max 125 karakter ana metin",
  "cta": "Mesaj Gönder"
}
`,
        }],
    })

    const icerik = JSON.parse(
        yanit.content[0].type === 'text' ? yanit.content[0].text : '{}'
    )

    // Meta'ya creative gönder
    const res = await fetch(`${META_BASE}/${META_AD_ACCOUNT}/adcreatives`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${META_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: `creative_${esnaf.id}_${Date.now()}`,
            object_story_spec: {
                page_id: esnaf.facebookPageId ?? process.env.META_DEFAULT_PAGE_ID,
                link_data: {
                    message: icerik.metin || 'Bizimle iletişime geçin',
                    link: esnaf.subdomainUrl ?? 'https://kepenk.ai',
                    name: icerik.baslik || 'Kampanyayı Kaçırmayın',
                    call_to_action: { type: 'MESSAGE_PAGE' },
                },
            },
        }),
    })
    return res.json()
}

// ── Helper functions for targeting ──────────────────────────────────────
function turkiyeSehirKey(ilce?: string, sehir?: string): string {
    // Basit bir eşleştirme, normalde Meta Geo Location API'den key (örn: istanbul=3168271) çekilir.
    // Burada mock bırakıyoruz.
    if (sehir?.toLowerCase() === 'ankara') return '3168070'
    if (sehir?.toLowerCase() === 'izmir') return '3168127'
    return '3168271' // istanbul default
}

function hedefCinsiyet(sektor: string): number[] {
    const kadinAgirlikli = ['kuafor', 'guzellik_merkezi', 'masaj_spa', 'pilates', 'diyetisyen']
    const erkekAgirlikli = ['berber', 'oto_servis', 'elektrikci', 'tesisatci']
    if (kadinAgirlikli.includes(sektor)) return [2]  // 2 = kadın
    if (erkekAgirlikli.includes(sektor)) return [1]  // 1 = erkek
    return [1, 2]  // Her ikisi
}

function sektorIlgiAlanlari(sektor: string): { id: string; name: string }[] {
    const ILGI_ALANLARI: Record<string, { id: string; name: string }[]> = {
        kuafor: [{ id: '6003397426743', name: 'Hair care' }],
        guzellik_merkezi: [{ id: '6003397048735', name: 'Beauty' }],
        restoran: [{ id: '6003139266461', name: 'Restaurants' }],
        fitness_spor: [{ id: '6003397426743', name: 'Fitness' }],
        oto_servis: [{ id: '6003139266461', name: 'Automobiles' }],
        default: [{ id: '6003397048735', name: 'Local businesses' }],
    }
    return ILGI_ALANLARI[sektor] ?? ILGI_ALANLARI.default
}
