/**
 * HatirlaticiAjani.ts — 24 Saat Kala Otonom Hatırlatıcı + Upsell
 * ══════════════════════════════════════════════════════════════════════
 * Randevusu onaylanan kişiye 24 saat kala WhatsApp'tan hatırlatma
 * ve çapraz satış (upsell) teklifleri gönderir.
 *
 * Cron: 0 * * * * (her saat başı çalışır)
 */

import { adminDb } from '@/lib/firebaseAdmin'
import { FieldValue, Timestamp } from 'firebase-admin/firestore'
import type { Randevu } from '@/lib/randevu/RandevuTypes'
import type { Hizmet } from '@/lib/randevu/HizmetTypes'

// ═══ ANA HATIRLATICI FONKSİYONU ═════════════════════════════════════════

/**
 * Yarınki onaylanmış randevuları tarar, hatırlatma + upsell gönderir.
 */
export async function hatirlaticiCalistir(): Promise<{ gonderilen: number }> {
    const yarin = new Date()
    yarin.setDate(yarin.getDate() + 1)
    const yarinStr = yarin.toISOString().split('T')[0] // "2026-03-16"

    let gonderilen = 0
    const esnafSnap = await adminDb.collection('esnaflar').get()

    for (const esnafDoc of esnafSnap.docs) {
        const randevuSnap = await adminDb
            .collection('esnaflar').doc(esnafDoc.id)
            .collection('randevular')
            .where('tarih', '==', yarinStr)
            .where('durum', '==', 'onaylandi')
            .where('hatirlatici_gonderildi', '==', false)
            .get()

        for (const randevuDoc of randevuSnap.docs) {
            const randevu = randevuDoc.data() as Randevu

            // Upsell hizmeti var mı?
            let upsellMesaj = ''
            if (!randevu.upsell_teklif_gonderildi) {
                upsellMesaj = await upsellTeklifOlustur(esnafDoc.id, randevu.hizmet_id)
            }

            // Hatırlatma mesajı
            const mesaj = hatirlatmaMesajiOlustur(
                randevu.musteri_ad,
                randevu.hizmet_adi,
                randevu.tarih,
                randevu.baslangic_saat,
                randevu.personel_adi,
                upsellMesaj
            )

            // WA gönder (placeholder)
            console.log(`[hatirlatici] 📱 WA hatırlatma → ${randevu.musteri_telefon}`)
            console.log(mesaj)

            // Flag güncelle
            await randevuDoc.ref.update({
                hatirlatici_gonderildi: true,
                upsell_teklif_gonderildi: upsellMesaj ? true : false,
                son_guncelleme: FieldValue.serverTimestamp(),
            })

            gonderilen++
        }
    }

    console.log(`[hatirlatici] ✅ ${gonderilen} hatırlatma gönderildi`)
    return { gonderilen }
}

// ═══ UPSELL TEKLİFİ ═════════════════════════════════════════════════════

async function upsellTeklifOlustur(
    esnafId: string,
    mevcutHizmetId: string
): Promise<string> {
    try {
        // Mevcut hizmetin upsell referansını çek
        const hizmetDoc = await adminDb
            .collection('esnaflar').doc(esnafId)
            .collection('hizmetler').doc(mevcutHizmetId)
            .get()

        if (!hizmetDoc.exists) return ''
        const hizmet = hizmetDoc.data() as Hizmet

        if (!hizmet.upsell_hizmet_id) return ''

        // Upsell hizmetini çek
        const upsellDoc = await adminDb
            .collection('esnaflar').doc(esnafId)
            .collection('hizmetler').doc(hizmet.upsell_hizmet_id)
            .get()

        if (!upsellDoc.exists) return ''
        const upsellHizmet = upsellDoc.data() as Hizmet

        const indirimliStr = upsellHizmet.indirimli_fiyat_TL
            ? ` (normal ${upsellHizmet.fiyat_TL} TL → *%15 indirimle ${upsellHizmet.indirimli_fiyat_TL} TL*)`
            : ` (*${upsellHizmet.fiyat_TL} TL*)`

        const customMsg = hizmet.upsell_mesaj
            || `Gelmişken *${upsellHizmet.ad}* da ekleyelim mi?${indirimliStr}`

        return `\n💡 ${customMsg}\n_Evet_ yazarak ekleyebilirsiniz.`

    } catch {
        return ''
    }
}

// ═══ MESAJ ŞABLONU ══════════════════════════════════════════════════════

function hatirlatmaMesajiOlustur(
    musteriAd: string,
    hizmetAdi: string,
    tarih: string,
    saat: string,
    personelAdi: string | undefined,
    upsellEk: string
): string {
    return [
        `Merhaba ${musteriAd}! 🔔`,
        ``,
        `Yarın *${saat}*'${saatSonEki(saat)} randevunuz var:`,
        `📋 *${hizmetAdi}*`,
        personelAdi ? `💇 *${personelAdi}*` : '',
        ``,
        `Sizi bekliyoruz! 🙋‍♀️`,
        upsellEk,
    ].filter(Boolean).join('\n')
}

function saatSonEki(saat: string): string {
    const h = parseInt(saat.split(':')[0])
    const sonSesli = h.toString().slice(-1)
    // Türkçe ünlü uyumu basitleştirilmiş
    if (['1', '2', '7', '8'].includes(sonSesli)) return 'de'
    if (['3', '4', '5'].includes(sonSesli)) return 'te'
    return 'da'
}
