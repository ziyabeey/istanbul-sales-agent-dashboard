/**
 * Kanal Orkestrasyonu — Akıllı Bildirim Yönlendirici
 * ─────────────────────────────────────────────────────────────────────────────
 * Maliyet düşürücü motor:
 *   1. FCM token var mı? → ÜCRETSİZ Push Notification
 *   2. FCM yoksa VEYA kritik mesaj mı? → Twilio WhatsApp (ücretli)
 *   3. Her iki kanaldan da başarısız → Firestore'a log yaz
 * 
 * Twilio faturasını ~%80 düşürür.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { adminDb } from '@/lib/firebaseAdmin'
import { waMesajGonder } from '@/lib/twilioClient'

// ── Mesaj öncelik seviyeleri ────────────────────────────────────────────────
export type MesajOnceligi = 'normal' | 'yuksek' | 'kritik'

// ── Kritik mesaj tipleri (HER ZAMAN WhatsApp da gönderilir) ─────────────────
const KRITIK_TIPLER = new Set([
    'odeme_basarisiz',
    'odeme_alindi',
    'yeni_siparis',
    'b2b_siparis',
    'churn_uyari',
    'sistem_acil',
])

// ── Kanal sonucu ────────────────────────────────────────────────────────────
interface KanalSonucu {
    basarili: boolean
    kanal: 'push' | 'whatsapp' | 'her_ikisi' | 'hicbiri'
    fcmGonderildi: boolean
    waGonderildi: boolean
    hata?: string
}

// ── Ana orkestrasyon fonksiyonu ──────────────────────────────────────────────

export async function bildirimGonder(params: {
    esnafId: string
    baslik: string
    mesaj: string
    tip?: string
    oncelik?: MesajOnceligi
    url?: string
    telefon?: string
}): Promise<KanalSonucu> {
    const { esnafId, baslik, mesaj, tip = 'genel', oncelik = 'normal', url } = params

    let fcmGonderildi = false
    let waGonderildi = false
    let hata: string | undefined

    try {
        // ── Esnaf verisini al ───────────────────────────────────────────────
        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        if (!esnafDoc.exists) {
            return { basarili: false, kanal: 'hicbiri', fcmGonderildi: false, waGonderildi: false, hata: 'Esnaf bulunamadı' }
        }

        const esnaf = esnafDoc.data()!
        const fcmTokenlar: any[] = esnaf.fcm_tokens || []
        const telefon = params.telefon || esnaf.waNumarasi || esnaf.telefon
        const kritikMi = oncelik === 'kritik' || KRITIK_TIPLER.has(tip)

        // ── ADIM 1: FCM Push Notification (ÜCRETSİZ) ───────────────────────
        if (fcmTokenlar.length > 0) {
            try {
                const { getMessaging } = await import('firebase-admin/messaging')
                const messaging = getMessaging()

                const tokenListesi = fcmTokenlar.map((t: any) => t.token).filter(Boolean)

                if (tokenListesi.length > 0) {
                    const sonuc = await messaging.sendEachForMulticast({
                        tokens: tokenListesi,
                        notification: { title: baslik, body: mesaj },
                        data: {
                            tip,
                            esnafId,
                            url: url || '/dashboard',
                            tag: `kepenk-${tip}`,
                        },
                        webpush: {
                            notification: {
                                icon: '/icon-192x192.png',
                                badge: '/icon-192x192.png',
                                tag: `kepenk-${tip}`,
                            },
                        },
                    })

                    // Geçersiz token'ları temizle
                    const silinecekler: string[] = []
                    sonuc.responses.forEach((res, idx) => {
                        if (!res.success && res.error?.code === 'messaging/registration-token-not-registered') {
                            silinecekler.push(tokenListesi[idx])
                        }
                    })

                    if (silinecekler.length > 0) {
                        const guncelTokenlar = fcmTokenlar.filter((t: any) => !silinecekler.includes(t.token))
                        await adminDb.collection('esnaflar').doc(esnafId).update({ fcm_tokens: guncelTokenlar })
                    }

                    fcmGonderildi = sonuc.successCount > 0
                    console.log(`[KANAL] ✅ FCM: ${sonuc.successCount}/${tokenListesi.length} cihaz`)
                }
            } catch (err: any) {
                console.warn('[KANAL] FCM hatası:', err.message)
                hata = err.message
            }
        }

        // ── ADIM 2: WhatsApp (sadece gerektiğinde) ──────────────────────────
        const waGerekli = !fcmGonderildi || kritikMi

        if (waGerekli && telefon) {
            try {
                const waText = kritikMi
                    ? `🚨 *${baslik}*\n\n${mesaj}`
                    : `📱 *${baslik}*\n\n${mesaj}`

                await waMesajGonder(telefon, waText, esnafId, 'kanal_orkestrasyon')
                waGonderildi = true
            } catch (err: any) {
                console.warn('[KANAL] WA hatası:', err.message)
                hata = (hata ? hata + ' | ' : '') + err.message
            }
        }

        // ── Log ─────────────────────────────────────────────────────────────
        const basarili = fcmGonderildi || waGonderildi
        const kanal: KanalSonucu['kanal'] =
            fcmGonderildi && waGonderildi ? 'her_ikisi' :
            fcmGonderildi ? 'push' :
            waGonderildi ? 'whatsapp' : 'hicbiri'

        await adminDb.collection('bildirim_loglari').add({
            esnafId, baslik, tip, oncelik, kanal,
            fcmGonderildi, waGonderildi, basarili,
            hata: hata || null, zaman: new Date(),
        }).catch(() => {})

        return { basarili, kanal, fcmGonderildi, waGonderildi, hata }
    } catch (err: any) {
        return { basarili: false, kanal: 'hicbiri', fcmGonderildi: false, waGonderildi: false, hata: err.message }
    }
}

// ── Kısayollar ─────────────────────────────────────────────────────────────

export async function normalBildirim(esnafId: string, baslik: string, mesaj: string) {
    return bildirimGonder({ esnafId, baslik, mesaj, oncelik: 'normal' })
}

export async function kritikBildirim(esnafId: string, baslik: string, mesaj: string, tip?: string) {
    return bildirimGonder({ esnafId, baslik, mesaj, oncelik: 'kritik', tip })
}

export async function odemeBildirim(esnafId: string, tutar: string) {
    return bildirimGonder({
        esnafId,
        baslik: '💰 Ödeme Alındı',
        mesaj: `${tutar} tutarında ödeme hesabınıza geçti.`,
        tip: 'odeme_alindi',
        oncelik: 'kritik',
        url: '/dashboard/finans',
    })
}
