import { getEsnaf, adminDb, FieldValue } from '@/lib/firebaseAdmin'
import { AYLIK_KREDI_LIMITLERI, PaketTipi } from '@/types'

function birUstPaket(paket: string): string {
    const sira = ['TEMEL', 'STANDART', 'BUYUME', 'PREMIUM', 'PREMIUMPLUS']
    const idx = sira.indexOf(paket)
    return idx !== -1 && idx < sira.length - 1 ? sira[idx + 1] : paket
}

function suankiAy(): string {
    return new Date().toISOString().slice(0, 7)
}

/**
 * Aylık Kredi Kontrol Sistemi (Faz 44 — TOCTOU Fix)
 * 
 * ESKİ: getAylikKredi() → kontrol → ayrı krediKullan() çağrısı  (RACE CONDITION)
 * YENİ: runTransaction içinde atomic read + check + decrement    (GÜVENLI)
 * 
 * 2 eşzamanlı istek geldiğinde sadece 1'i kredi düşer, diğeri doğru "limit doldu" alır.
 */
export async function kotaKontrol(esnafId: string): Promise<{
    izinVar: boolean
    kalanKredi: number
    aylikLimit: number
    upsellMesaji?: string
}> {
    const esnaf = await getEsnaf(esnafId)
    const paket = esnaf.paket as PaketTipi
    const aylikLimit = AYLIK_KREDI_LIMITLERI[paket] || AYLIK_KREDI_LIMITLERI.TEMEL
    const ay = suankiAy()

    const krediRef = adminDb
        .collection('esnaflar')
        .doc(esnafId)
        .collection('kredi')
        .doc(ay)

    // ═══ ATOMIC TRANSACTION: Read + Check + Decrement ═══
    try {
        const sonuc = await adminDb.runTransaction(async (tx: any) => {
            const doc = await tx.get(krediRef)
            const mevcutKullanim = doc.exists ? (doc.data()?.kullanim || 0) : 0
            const kalan = aylikLimit - mevcutKullanim

            if (kalan <= 0) {
                // Limit doldu — kredi düşme, upsell mesajı dön
                return { izinVar: false, kalanKredi: 0 }
            }

            // Krediyi düş (atomic write within transaction)
            tx.set(krediRef, {
                kullanim: mevcutKullanim + 1,
                limit: aylikLimit,
                ay,
            }, { merge: true })

            return { izinVar: true, kalanKredi: kalan - 1 }
        })

        if (!sonuc.izinVar) {
            const ustPaket = birUstPaket(esnaf.paket)
            const ustPaketLimit = AYLIK_KREDI_LIMITLERI[ustPaket as PaketTipi] || 0
            return {
                izinVar: false,
                kalanKredi: 0,
                aylikLimit,
                upsellMesaji:
                    `📊 Bu ayki ${aylikLimit} AI kredi hakkınız doldu.\n` +
                    `${ustPaket} pakete geçerek ${ustPaketLimit} kredi hakkı kazanabilirsiniz.\n` +
                    `Ek kredi: ${process.env.NEXT_PUBLIC_APP_URL || 'https://kepenk.ai'}/fiyatlar`,
            }
        }

        return {
            izinVar: true,
            kalanKredi: sonuc.kalanKredi,
            aylikLimit,
        }
    } catch (err: any) {
        // Transaction çakışması (contention) — güvenli tarafta kal, izin verme
        console.error('[KOTA] Transaction hatası:', err.message)
        return {
            izinVar: false,
            kalanKredi: 0,
            aylikLimit,
            upsellMesaji: 'Sistem yoğunluğu nedeniyle işlem gerçekleştirilemedi. Lütfen tekrar deneyin.',
        }
    }
}

/**
 * Sadece kontrol (kredi düşmez) — dashboard gösterimi için
 */
export async function kotaDurumSorgula(esnafId: string): Promise<{
    kalanKredi: number
    aylikLimit: number
    kullanim: number
    yuzde: number
}> {
    const esnaf = await getEsnaf(esnafId)
    const paket = esnaf.paket as PaketTipi
    const aylikLimit = AYLIK_KREDI_LIMITLERI[paket] || AYLIK_KREDI_LIMITLERI.TEMEL
    const ay = suankiAy()

    const doc = await adminDb
        .collection('esnaflar')
        .doc(esnafId)
        .collection('kredi')
        .doc(ay)
        .get()

    const kullanim = doc.exists ? (doc.data()?.kullanim || 0) : 0

    return {
        kalanKredi: Math.max(0, aylikLimit - kullanim),
        aylikLimit,
        kullanim,
        yuzde: Math.round((kullanim / aylikLimit) * 100),
    }
}
