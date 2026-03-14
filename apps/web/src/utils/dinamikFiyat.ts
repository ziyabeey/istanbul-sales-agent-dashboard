import { adminDb } from '@/lib/firebaseAdmin'
import { bosKapasiteTespitEt } from '@/utils/kapasiteAnaliz'
import { waMesajGonder } from '@/lib/twilioClient'

export interface FiyatOnerisi {
    normalFiyat: number
    oneriFiyat: number
    kampanyaMi: boolean
    sebep: string
    suresi?: string   // "Bu hafta sonu"
}

export async function dinamikFiyatHesapla(
    esnafId: string,
    hizmetAdi: string
): Promise<FiyatOnerisi> {
    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    const esnaf = esnafDoc.data()!

    // Bu hafta kapasite doluluk oranı
    const { dolulukOrani, bosGunler } = await bosKapasiteTespitEt(esnafId)

    // Rakip fiyatlar (Şimdilik mock, Google Places API'den çekilecek)
    // const rakipFiyat = await rakipOrtalamafiyatAl(esnaf.sektor, esnaf.ilce)

    // Normal fiyat (esnafın belirlediği)
    const normalFiyat = esnaf.hizmetFiyatlari?.[hizmetAdi] ?? 0

    if (normalFiyat === 0) {
        return {
            normalFiyat,
            oneriFiyat: 0,
            kampanyaMi: false,
            sebep: 'Fiyat bulunamadı'
        }
    }

    if (dolulukOrani < 40 && bosGunler.length >= 3) {
        // Boş kapasite — indirim yap
        const indirimOrani = dolulukOrani < 20 ? 0.20 : 0.10  // %20 veya %10 indirim
        return {
            normalFiyat,
            oneriFiyat: Math.round(normalFiyat * (1 - indirimOrani)),
            kampanyaMi: true,
            sebep: `Bu hafta ${bosGunler.join(', ')} günleri boş`,
            suresi: 'Bu hafta sonu geçerli',
        }
    }

    if (dolulukOrani > 85) {
        // Dolu kapasite — fiyat artır
        return {
            normalFiyat,
            oneriFiyat: Math.round(normalFiyat * 1.15),  // %15 artış
            kampanyaMi: false,
            sebep: 'Yoğun talep — premium fiyat dönemine girilebilir',
        }
    }

    return {
        normalFiyat,
        oneriFiyat: normalFiyat,
        kampanyaMi: false,
        sebep: 'Normal kapasite',
    }
}

// ── Dinamik fiyat önerisini esnafa WA ile sor ────────────────────────────
export async function fiyatOnerisiGonder(esnafId: string): Promise<void> {
    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    const esnaf = esnafDoc.data()!

    if (!esnaf.hizmetler?.length || !esnaf.waNumarasi) return

    const analizler: string[] = []

    for (const hizmet of esnaf.hizmetler.slice(0, 3)) {
        const oneri = await dinamikFiyatHesapla(esnafId, hizmet)
        if (oneri.kampanyaMi && oneri.oneriFiyat !== oneri.normalFiyat && oneri.oneriFiyat > 0) {
            analizler.push(
                `• ${hizmet}: ₺${oneri.normalFiyat} → ₺${oneri.oneriFiyat} (${oneri.suresi})`
            )
        }
    }

    if (analizler.length === 0) return

    await waMesajGonder(
        esnaf.waNumarasi,
        `📊 *Kapasite Analizi*\n\n` +
        `Bu hafta müsait yeriniz var. Doluluk artırmak için otomatik indirim ve fiyat önerisi çıkardım:\n\n` +
        analizler.join('\n') +
        `\n\nBu fiyatları uygulamak ve reklamı buna göre çıkmak ister misiniz? (E/H)\n` +
        `"E" derseniz siteniz ve kampanya içerikleri otomatik güncellenir.`,
        esnafId,
        'dinamik_fiyat_onerisi'
    )
}
