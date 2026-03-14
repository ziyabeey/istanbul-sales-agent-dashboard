/**
 * SatinalmaAjani.ts — Otonom Tedarik Ajanı (The Procurement Agent)
 * ─────────────────────────────────────────────────────────────────────────────
 * Senaryo:
 *   1. Esnafın stok azaldığı bilgisi gelir (menü/sayım sistemi)
 *   2. Ajan B2B ağındaki tedarikçileri tarar (esnafAgi.ts)
 *   3. En uygun fiyatı bulur
 *   4. FCM Push ile esnafa onay sorusu gönderir
 *   5. "Evet" → Firestore Transaction ile B2B siparişi oluşturur
 *   6. Tedarikçiye bildirim gider
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { LlmAgent, FunctionTool } from '@google/adk'
import { z } from 'zod'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { bildirimGonder } from '@/utils/kanalOrkestrasyonu'
import logger from '@/utils/logger'

// ═══════════════════════════════════════════════════════════════════════════════
//  ADK AJAN TANIMI
// ═══════════════════════════════════════════════════════════════════════════════

export const satinalmaAjaniAgent = new LlmAgent({
    name: 'SatinalmaAjani',
    model: 'gemini-2.5-flash',
    description: 'B2B Otonom Satınalma Ajanı. Stok azaldığında tedarikçi bulur, fiyat karşılaştırır, esnaf onayı ile sipariş oluşturur.',
    instruction: `
Sen Kepenk.ai'nin Otonom Satınalma Ajansısın (The Procurement Agent).

GÖREVLERİN:
1. Esnafın stok durumunu analiz et
2. B2B ağında en uygun tedarikçiyi bul
3. Fiyat karşılaştır
4. Esnafa telefon bildirimle onay sor (Push Notification)
5. Onay gelirse Firestore Transaction ile sipariş oluştur

DİL VE TON:
- Samimi ama profesyonel. Esnaf jargonu kullan.
- "Patron, et stoğun 3 kilo kalmış" gibi konuş
- Fiyatları TL cinsinden ver
- Her zaman en ucuz seçeneği öner ama alternatif de sun
`,
    tools: [
        new FunctionTool({
            name: 'tedarikciAra',
            description: 'B2B ağında belirli bir ürünü satan tedarikçileri arar ve fiyat karşılaştırması yapar',
            parameters: z.object({
                urunAdi: z.string().describe('Aranacak ürün: et, şampuan, boya vb.'),
                esnafId: z.string().describe('Sipariş verecek esnafın ID\'si'),
            }),
            execute: async ({ urunAdi, esnafId }: { urunAdi: string; esnafId: string }) => {
                try {
                    // B2B kataloğunda ürün ara
                    const katalogSnap = await adminDb.collection('b2b_katalog')
                        .where('aktif', '==', true)
                        .limit(50)
                        .get()

                    const aranan = urunAdi.toLowerCase()
                    const bulunanlar: any[] = []

                    for (const doc of katalogSnap.docs) {
                        const data = doc.data()
                        if (data.esnafId === esnafId) continue
                        const urunAd = (data.urunAdi || '').toLowerCase()
                        const kategori = (data.kategori || '').toLowerCase()

                        if (urunAd.includes(aranan) || aranan.includes(urunAd) || kategori.includes(aranan)) {
                            // Tedarikçi bilgisini al
                            const tedDoc = await adminDb.collection('esnaflar').doc(data.esnafId).get()
                            const tedData = tedDoc.exists ? tedDoc.data() : null

                            bulunanlar.push({
                                katalogId: doc.id,
                                toptanciId: data.esnafId,
                                toptanciAdi: tedData?.ad || tedData?.isletmeAdi || 'Toptancı',
                                urunAdi: data.urunAdi,
                                fiyat: data.fiyat,
                                birim: data.birim || 'Adet',
                                stokDurumu: data.stok > 0 ? 'Mevcut' : 'Tükendi',
                                ilce: tedData?.ilce || 'İstanbul',
                            })
                        }
                    }

                    // Fiyata göre sırala
                    bulunanlar.sort((a, b) => a.fiyat - b.fiyat)

                    return {
                        bulunanUrunler: bulunanlar.slice(0, 5),
                        enUygunFiyat: bulunanlar.length > 0
                            ? `${bulunanlar[0].toptanciAdi} (₺${bulunanlar[0].fiyat}/${bulunanlar[0].birim})`
                            : 'Ürün bulunamadı',
                        toplam: bulunanlar.length,
                    }
                } catch (e: any) {
                    return { bulunanUrunler: [], enUygunFiyat: 'Arama hatası', toplam: 0, hata: e.message }
                }
            },
        }),

        new FunctionTool({
            name: 'siparisOlustur',
            description: 'Esnaf onayı sonrası B2B siparişi oluşturur. Firestore Transaction ile atomik yazma.',
            parameters: z.object({
                esnafId: z.string().describe('Sipariş veren esnafın ID\'si'),
                toptanciId: z.string().describe('Tedarikçi esnafın ID\'si'),
                urunAdi: z.string(),
                miktar: z.number().min(1),
                birimFiyat: z.number().min(0),
                birim: z.string().optional(),
            }),
            execute: async (params: {
                esnafId: string; toptanciId: string;
                urunAdi: string; miktar: number; birimFiyat: number; birim?: string
            }) => {
                try {
                    const { esnafId, toptanciId, urunAdi, miktar, birimFiyat, birim = 'Adet' } = params
                    const toplam = miktar * birimFiyat

                    // Alıcı/satıcı bilgilerini al
                    const aliciDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
                    const saticiDoc = await adminDb.collection('esnaflar').doc(toptanciId).get()

                    if (!aliciDoc.exists || !saticiDoc.exists) {
                        throw new Error('Alıcı veya satıcı bulunamadı')
                    }

                    const alici = aliciDoc.data()!
                    const satici = saticiDoc.data()!

                    // Atomik sipariş oluşturma (batch write)
                    const batch = adminDb.batch()
                    const siparisRef = adminDb.collection('b2b_siparisler').doc()

                    batch.set(siparisRef, {
                        aliciId: esnafId,
                        aliciAd: alici.ad || alici.isletmeAdi,
                        saticiId: toptanciId,
                        saticiAd: satici.ad || satici.isletmeAdi,
                        urunler: [{ ad: urunAdi, miktar, fiyat: birimFiyat }],
                        toplam,
                        birim,
                        durum: 'bekliyor',
                        kanal: 'ai_otonom',
                        olusturma: Timestamp.now(),
                    })

                    await batch.commit()

                    // Tedarikçiye bildirim gönder
                    await bildirimGonder({
                        esnafId: toptanciId,
                        baslik: '📦 Yeni B2B Siparişi',
                        mesaj: `${miktar} ${birim} ${urunAdi} siparişi geldi. Toplam: ₺${toplam.toLocaleString('tr-TR')}`,
                        tip: 'b2b_siparis',
                        oncelik: 'kritik',
                        url: '/dashboard/b2b',
                    }).catch(() => {})

                    await logger.logYaz(esnafId, 'info', 'SatinalmaAjani',
                        `B2B sipariş oluşturuldu: ${miktar}x ${urunAdi} → ₺${toplam}`
                    )

                    return {
                        basari: true,
                        siparisId: siparisRef.id,
                        mesaj: `✅ Sipariş toptancıya iletildi (₺${toplam.toLocaleString('tr-TR')})`,
                    }
                } catch (e: any) {
                    return { basari: false, hata: e.message }
                }
            },
        }),
    ],
})

// ═══════════════════════════════════════════════════════════════════════════════
//  STOK UYARISI → OTONOM SİPARİŞ AKIŞI
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Stok azaldığında çağrılır. Esnafa FCM Push ile onay sorar.
 * Evet → siparişOlustur tool'u çağrılır.
 */
export async function stokUyarisiIsle(params: {
    esnafId: string
    urunAdi: string
    kalanStok: number
    minimumStok: number
}): Promise<void> {
    const { esnafId, urunAdi, kalanStok, minimumStok } = params

    try {
        // 1. B2B kataloğunda en ucuz tedarikçiyi bul
        const katalogSnap = await adminDb.collection('b2b_katalog')
            .where('aktif', '==', true)
            .limit(50)
            .get()

        const aranan = urunAdi.toLowerCase()
        let enUcuz: any = null

        for (const doc of katalogSnap.docs) {
            const data = doc.data()
            if (data.esnafId === esnafId) continue
            const urunAd = (data.urunAdi || '').toLowerCase()
            if (urunAd.includes(aranan) || aranan.includes(urunAd)) {
                if (!enUcuz || data.fiyat < enUcuz.fiyat) {
                    const tedDoc = await adminDb.collection('esnaflar').doc(data.esnafId).get()
                    enUcuz = {
                        ...data,
                        katalogId: doc.id,
                        toptanciAdi: tedDoc.exists ? (tedDoc.data()!.ad || 'Toptancı') : 'Toptancı',
                    }
                }
            }
        }

        if (!enUcuz) {
            console.log(`[SATINALMA] "${urunAdi}" için tedarikçi bulunamadı`)
            return
        }

        // 2. Esnafa FCM Push ile soru sor
        const oneriMiktar = minimumStok * 2 // 2 haftalık stok önerisi
        const tahminiToplam = oneriMiktar * enUcuz.fiyat

        await bildirimGonder({
            esnafId,
            baslik: `📦 ${urunAdi} Stoğunuz Azaldı`,
            mesaj: `Kalan: ${kalanStok}. ${enUcuz.toptanciAdi}'dan ₺${enUcuz.fiyat}/${enUcuz.birim || 'kg'} ile ${oneriMiktar} ${enUcuz.birim || 'kg'} sipariş geçeyim mi? (Toplam: ₺${tahminiToplam})`,
            tip: 'b2b_siparis',
            oncelik: 'yuksek',
            url: '/dashboard/b2b',
        })

        // 3. Onay bekle taslağını kaydet
        await adminDb.collection('b2b_siparis_taslaklari').add({
            esnafId,
            toptanciId: enUcuz.esnafId,
            toptanciAdi: enUcuz.toptanciAdi,
            urunAdi,
            miktar: oneriMiktar,
            birimFiyat: enUcuz.fiyat,
            birim: enUcuz.birim || 'kg',
            toplam: tahminiToplam,
            durum: 'onay_bekliyor',
            olusturma: Timestamp.now(),
        })

        await logger.logYaz(esnafId, 'info', 'SatinalmaAjani',
            `Stok uyarısı: ${urunAdi} (kalan: ${kalanStok}). ${enUcuz.toptanciAdi}'dan ₺${enUcuz.fiyat} fiyat teklifi gönderildi.`
        )
    } catch (err: any) {
        console.error('[SATINALMA] Stok uyarısı hatası:', err.message)
    }
}
