import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { waMesajGonder } from '@/lib/twilioClient'
import { smsGonder } from '@/lib/smsClient'
import Anthropic from '@anthropic-ai/sdk'

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

const KAMPANYA_LIMITLARI: Record<string, number> = {
    TEMEL: 0,    // Kampanya yok
    STANDART: 5,    // Günde max 5 mesaj
    BUYUME: 15,
    PREMIUM: 50,
    PREMIUMPLUS: 999,
}
const PAKET_KAMPANYA_LIMITI = KAMPANYA_LIMITLARI

// ── Ana kampanya tarama motoru ──────────────────────────────────────────────
export async function kampanyaMotorCalistir(esnafId: string): Promise<{
    gonderilen: number
    atlanan: number
}> {
    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    const esnaf = esnafDoc.data()!

    // AI müşteri servisi aktif mi?
    if (!esnaf.ayarlar?.aiMusteriServisi) return { gonderilen: 0, atlanan: 0 }

    // Son 24 saatte bu esnaf için kaç kampanya mesajı gitti?
    const gunlukLimit = PAKET_KAMPANYA_LIMITI[esnaf.paket ?? 'TEMEL']
    if (gunlukLimit === 0) return { gonderilen: 0, atlanan: 0 }

    const bugunGiden = await adminDb
        .collection('kampanyaLoglari')
        .where('esnafId', '==', esnafId)
        .where('zaman', '>=', Timestamp.fromDate(new Date(Date.now() - 24 * 60 * 60 * 1000)))
        .get()

    if (bugunGiden.size >= gunlukLimit) return { gonderilen: 0, atlanan: bugunGiden.size }

    // Tüm müşteri profillerini çek
    const profiller = await adminDb
        .collection('musteriProfiller')
        .where('esnafId', '==', esnafId)
        .orderBy('sonRandevu', 'asc')
        .get()

    let gonderilen = 0
    let atlanan = 0
    const bugun = new Date()

    for (const profilDoc of profiller.docs) {
        if (gonderilen >= gunlukLimit - bugunGiden.size) break

        const profil = profilDoc.data()
        const kampanya = kampanyaTipiSec(profil, bugun, esnaf)

        if (!kampanya) { atlanan++; continue }

        // Bu müşteriye son 7 günde mesaj gitti mi?
        const sonMesaj = await adminDb
            .collection('kampanyaLoglari')
            .where('esnafId', '==', esnafId)
            .where('musteriTelefon', '==', profil.telefon)
            .where('zaman', '>=', Timestamp.fromDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)))
            .limit(1)
            .get()

        if (!sonMesaj.empty) { atlanan++; continue }

        // Kişiselleştirilmiş mesaj üret
        const mesaj = await kisiselMesajUret(esnaf, profil, kampanya)

        // Gönder
        try {
            await waMesajGonder(profil.telefon, mesaj, esnafId, `kampanya_${kampanya.tip}`)
            gonderilen++
        } catch (err) {
            // Fallback: If WhatsApp fails (e.g. out of 24h window), try SMS
            console.log(`[WA BASARISIZ] SMS ile deneniyor: ${profil.telefon}`)
            await smsGonder(profil.telefon, mesaj, esnafId).catch(console.error)
        }
        // Logla
        await adminDb.collection('kampanyaLoglari').add({
            esnafId,
            musteriTelefon: profil.telefon,
            musteriAd: profil.ad ?? '',
            kampanyaTipi: kampanya.tip,
            mesaj: mesaj.substring(0, 200),
            zaman: Timestamp.now(),
        })

        gonderilen++
    }

    return { gonderilen, atlanan }
}

// ── Hangi kampanya tipi uygun? ─────────────────────────────────────────────
interface KampanyaTipi {
    tip: string
    oncelik: number
    sebep: string
}

function kampanyaTipiSec(
    profil: any,
    bugun: Date,
    esnaf: any
): KampanyaTipi | null {
    const gunFarki = (t: any): number => t?.toDate
        ? Math.floor((Date.now() - t.toDate().getTime()) / (1000 * 60 * 60 * 24))
        : 999

    const sonRandevuGun = gunFarki(profil.sonRandevu)

    // Özel gün: doğum günü var mı?
    const bugunStr = `${String(bugun.getMonth() + 1).padStart(2, '0')}-${String(bugun.getDate()).padStart(2, '0')}`
    const dogumGunu = profil.ozelGunler?.find(
        (g: any) => g.tur === 'dogum_gunu' && g.tarih === bugunStr
    )
    if (dogumGunu) return { tip: 'dogum_gunu', oncelik: 10, sebep: 'Doğum günü bugün' }

    // Tahmini ziyaret günü: bugün veya geçti mi?
    const tahminiGun = profil.sonrakiTahminiZiyaret?.toDate?.()
    if (tahminiGun) {
        const fark = Math.floor((Date.now() - tahminiGun.getTime()) / (1000 * 60 * 60 * 24))
        if (fark >= 0 && fark <= 3) {
            return { tip: 'ziyaret_zamani', oncelik: 9, sebep: `Tahmini ziyaret ${fark} gün geçti` }
        }
    }

    // Kayıp müşteri
    if (sonRandevuGun > 90 && profil.toplamRandevu >= 3) {
        return { tip: 'kayip_musteri', oncelik: 7, sebep: `${sonRandevuGun} gündür yok` }
    }

    // Uyku müşteri
    if (sonRandevuGun > 45 && sonRandevuGun <= 90) {
        return { tip: 'uyku_musteri', oncelik: 6, sebep: `${sonRandevuGun} gündür yok` }
    }

    // VIP + uzun süre görülmedi
    if (profil.etiketler?.includes('vip') && sonRandevuGun > 21) {
        return { tip: 'vip_hatirlatma', oncelik: 8, sebep: 'VIP müşteri, 3+ hafta geçti' }
    }

    return null
}

// ── Kişisel mesaj üret ─────────────────────────────────────────────────────

async function kisiselMesajUret(
    esnaf: any,
    profil: any,
    kampanya: KampanyaTipi
): Promise<string> {
    const tipAciklama: Record<string, string> = {
        dogum_gunu: `Müşterinin bugün doğum günü. Samimi tebrik + özel teklif yap.`,
        ziyaret_zamani: `Müşterinin normal ziyaret döngüsüne göre gelme zamanı. Nazikçe hatırlat.`,
        kayip_musteri: `${profil.ad ?? 'Bu müşteri'} ${kampanya.sebep}. Özlem ifade et, geri davet et.`,
        uyku_musteri: `Müşteri bir süre uğramamış. Hafif, samimi bir "sizi özledik" mesajı.`,
        vip_hatirlatma: `VIP müşteri, bir süredir uğramamış. Özel ilgi göster.`,
    }

    const sistem = `
Sen ${esnaf.isletmeAdi}'in müşteri ilişkileri uzmanısın.
Müşterilere WhatsApp mesajı yazıyorsun.
Ton: ${esnaf.sesProfili?.kisilikTonu ?? 'samimi'}
Sektör: ${esnaf.sektor}

KURAL:
- Maksimum 3 cümle
- Asla ısrarcı, asla spam hissi verme
- Gerçekten ilgilenildiği hissi ver
- Sonda randevu almak için WA linki ekle: https://wa.me/${esnaf.telefonTemiz || esnaf.telefon?.replace(/\D/g, '')}
`
    const kullanici = `
Müşteri: ${profil.ad ?? 'Değerli müşterimiz'}
Tercih ettiği hizmetler: ${(profil.tercihliHizmetler || []).join(', ') || 'belirtilmemiş'}
Durum: ${tipAciklama[kampanya.tip]}

Bu duruma uygun kişisel bir mesaj yaz.
`

    const yanit = await claude.messages.create({
        model: 'claude-3-haiku-20240307',  // Using Haiku which is fast and cheap
        max_tokens: 200,
        system: sistem,
        messages: [{ role: 'user', content: kullanici }],
    })

    return yanit.content[0].type === 'text' ? yanit.content[0].text : ''
}
