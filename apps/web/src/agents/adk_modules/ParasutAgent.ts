/**
 * ParasutAgent.ts — Otonom E-Fatura Ajanı
 *
 * Adisyon "ödendi" durumuna geçtiğinde tetiklenir.
 * Paraşüt API üzerinden Perakende Satış Fişi / E-Arşiv Fatura oluşturur.
 *
 * DLQ Koruması:
 * - Paraşüt API yanıt vermezse → parasut_dlq koleksiyonuna yaz
 * - Exponential backoff ile 3 kez tekrar dene (1s, 4s, 16s)
 * - 3. denemeden sonra → Telegram alert
 */

import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { telegramGonder } from '@/lib/telegram'
import type { AdisyonKalem } from '@/lib/restoran/tipler'

// ─── Paraşüt API Client ───────────────────────────────────────────────

interface ParasutConfig {
    companyId: string
    clientId: string
    clientSecret: string
    username: string
    password: string
    baseUrl: string
}

function getParasutConfig(): ParasutConfig {
    return {
        companyId: process.env.PARASUT_COMPANY_ID || '',
        clientId: process.env.PARASUT_CLIENT_ID || '',
        clientSecret: process.env.PARASUT_CLIENT_SECRET || '',
        username: process.env.PARASUT_USERNAME || '',
        password: process.env.PARASUT_PASSWORD || '',
        baseUrl: process.env.PARASUT_BASE_URL || 'https://api.parasut.com/v4',
    }
}

async function parasutTokenAl(): Promise<string> {
    const config = getParasutConfig()

    const res = await fetch(`${config.baseUrl}/../oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'password',
            client_id: config.clientId,
            client_secret: config.clientSecret,
            username: config.username,
            password: config.password,
        }),
    })

    if (!res.ok) {
        throw new Error(`Parasut token hatası: ${res.status}`)
    }

    const data = await res.json()
    return data.access_token
}

// ─── E-Fatura Oluşturma ───────────────────────────────────────────────

interface FaturaKalem {
    ad: string
    adet: number
    birimFiyatKurus: number
    kdvOrani: number
}

async function eFaturaOlustur(
    _esnafId: string,
    adisyonId: string,
    kalemler: FaturaKalem[],
    _toplamKurus: number
): Promise<{ basarili: boolean; faturaId?: string; hata?: string }> {
    const config = getParasutConfig()

    if (!config.companyId || !config.clientId) {
        return { basarili: false, hata: 'Paraşüt yapılandırması eksik' }
    }

    const token = await parasutTokenAl()

    // JSON:API formatında fatura payload'ı
    const faturaPayload = {
        data: {
            type: 'sales_invoices',
            attributes: {
                item_type: 'refund', // Perakende Satış Fişi
                description: `Adisyon #${adisyonId}`,
                issue_date: new Date().toISOString().split('T')[0],
                currency: 'TRL',
                invoice_series: 'PRS',
            },
            relationships: {
                details: {
                    data: kalemler.map((k, i) => ({
                        type: 'sales_invoice_details',
                        attributes: {
                            quantity: k.adet,
                            unit_price: (k.birimFiyatKurus / 100).toFixed(2),
                            vat_rate: k.kdvOrani,
                            description: k.ad,
                        },
                        temp_id: `item_${i}`,
                    })),
                },
            },
        },
    }

    const res = await fetch(
        `${config.baseUrl}/${config.companyId}/sales_invoices`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/vnd.api+json',
            },
            body: JSON.stringify(faturaPayload),
        }
    )

    if (!res.ok) {
        const errBody = await res.text().catch(() => 'Unknown')
        return { basarili: false, hata: `Parasut API ${res.status}: ${errBody.slice(0, 200)}` }
    }

    const result = await res.json()
    return {
        basarili: true,
        faturaId: result.data?.id,
    }
}

// ─── DLQ + Exponential Backoff ─────────────────────────────────────────

async function bekle(ms: number): Promise<void> {
    return new Promise(r => setTimeout(r, ms))
}

export async function parasutFaturaGonder(
    esnafId: string,
    adisyonId: string
): Promise<void> {
    // Adisyonu oku
    const adisyonDoc = await adminDb
        .collection('esnaflar')
        .doc(esnafId)
        .collection('aktif_adisyonlar')
        .doc(adisyonId)
        .get()

    if (!adisyonDoc.exists) {
        console.error(`[PARASUT] Adisyon bulunamadı: ${adisyonId}`)
        return
    }

    const adisyon = adisyonDoc.data()!
    const kalemler: AdisyonKalem[] = adisyon.kalemler || []

    if (kalemler.length === 0) return

    // KDV oranlarını hesapla
    const faturaKalemler: FaturaKalem[] = kalemler.map(k => ({
        ad: k.ad,
        adet: k.adet,
        birimFiyatKurus: k.birimFiyatKurus,
        kdvOrani: k.kdvTipi === 'alkol' ? 20 : k.kdvTipi === 'icecek' ? 10 : 1,
    }))

    // ── 3x Exponential Backoff Retry ──
    const backoffMs = [1000, 4000, 16000]

    for (let deneme = 0; deneme < 3; deneme++) {
        try {
            const sonuc = await eFaturaOlustur(
                esnafId,
                adisyonId,
                faturaKalemler,
                adisyon.toplamKurus || 0
            )

            if (sonuc.basarili) {
                // Başarılı → Adisyona faturaId yaz
                await adisyonDoc.ref.update({
                    parasutFaturaId: sonuc.faturaId,
                    parasutDurum: 'basarili',
                    parasutTarih: Timestamp.now(),
                })
                return
            }

            // API hatası — retry'lanabilir mi?
            if (deneme < 2) {
                console.warn(`[PARASUT] Deneme ${deneme + 1}/3 başarısız: ${sonuc.hata}`)
                await bekle(backoffMs[deneme])
                continue
            }

            // 3. deneme de başarısız → DLQ'ya at
            await dlqYaz(esnafId, adisyonId, sonuc.hata || 'Bilinmeyen hata', deneme + 1)
            return
        } catch (err: unknown) {
            const hata = err instanceof Error ? err.message : String(err)

            if (deneme < 2) {
                console.warn(`[PARASUT] Deneme ${deneme + 1}/3 exception: ${hata}`)
                await bekle(backoffMs[deneme])
                continue
            }

            // 3. deneme de exception → DLQ
            await dlqYaz(esnafId, adisyonId, hata, deneme + 1)
            return
        }
    }
}

// ─── Dead Letter Queue ─────────────────────────────────────────────────

async function dlqYaz(
    esnafId: string,
    adisyonId: string,
    hata: string,
    denemeSayisi: number
): Promise<void> {
    // Firestore DLQ kaydı
    await adminDb.collection('parasut_dlq').add({
        esnafId,
        adisyonId,
        hata,
        denemeSayisi,
        durum: 'bekliyor', // Manuel müdahale bekliyor
        olusturma: Timestamp.now(),
    })

    // Adisyona durumu yaz
    await adminDb
        .collection('esnaflar')
        .doc(esnafId)
        .collection('aktif_adisyonlar')
        .doc(adisyonId)
        .update({
            parasutDurum: 'dlq',
            parasutHata: hata,
            parasutTarih: Timestamp.now(),
        })

    // Telegram alert
    await telegramGonder(
        `🚨 <b>PARASUT DLQ — E-Fatura Oluşturulamadı!</b>\n` +
        `Esnaf: <code>${esnafId}</code>\n` +
        `Adisyon: <code>${adisyonId}</code>\n` +
        `Deneme: ${denemeSayisi}/3\n` +
        `Hata: ${hata.slice(0, 200)}\n` +
        `<b>Manuel müdahale gerekli!</b>`
    ).catch(() => { /* Telegram da başarısız — DLQ'da kayıt var */ })
}

// ─── A2A JSON-RPC Handler ──────────────────────────────────────────────

export async function handleRpc(
    method: string,
    params: Record<string, string>
): Promise<Record<string, unknown>> {
    switch (method) {
        case 'parasut_fatura': {
            const { esnafId, adisyonId } = params
            if (!esnafId || !adisyonId) {
                return { error: 'esnafId ve adisyonId gerekli' }
            }
            // Fire-and-forget — DLQ dahili olarak korur
            parasutFaturaGonder(esnafId, adisyonId).catch((err: unknown) => {
                console.error('[PARASUT RPC]', err instanceof Error ? err.message : err)
            })
            return { ok: true, mesaj: 'Fatura oluşturma başlatıldı' }
        }
        default:
            return { error: `Bilinmeyen metod: ${method}` }
    }
}
