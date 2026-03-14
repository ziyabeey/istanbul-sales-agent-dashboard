/**
 * SatinalmaAjani.ts — Otonom Tedarik Ajanı
 *
 * Tedarik alarmı geldiğinde:
 * 1. esnafAgi ile en iyi 3 tedarikçiyi bul
 * 2. En iyi teklifi seç
 * 3. WhatsApp ile patrona interaktif onay mesajı at
 * 4. "EVET" yanıtı → siparis-onay API tetikle
 */

import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { waMesajGonder } from '@/lib/twilioClient'
import { tedarikciAra, type TedarikciAramaOpt } from '@/lib/esnafAgi'
import type { TedarikciSonuc } from '@/lib/restoran/b2bTipler'

function kurusToTL(k: number): string {
    return (k / 100).toFixed(2).replace('.', ',') + '₺'
}

// ─── Ana Akış ──────────────────────────────────────────────────────────

export async function tedarikSureciBaslat(
    esnafId: string,
    malzemeAdi: string,
    mevcutMiktar: number,
    kritikEsik: number,
    birim: string,
    stokId: string
): Promise<void> {
    // 1. En iyi tedarikçileri bul
    const teklifler = await tedarikciAra({
        esnafId,
        malzemeAdi,
        maxMesafeKm: 30,
        maxSonuc: 3,
    })

    if (teklifler.length === 0) {
        // Hiç tedarikçi bulunamadı → bildirim gönder
        await adminDb.collection('esnafBildirimleri').add({
            esnafId,
            baslik: '⚠️ Tedarikçi Bulunamadı',
            mesaj: `${malzemeAdi} için Kepenk Ağı'nda uygun tedarikçi bulunamadı. Manuel tedarik önerilir.`,
            tur: 'uyari',
            zaman: Timestamp.now(),
            okundu: false,
        })
        return
    }

    // 2. En iyi teklifi seç (skor en düşük)
    const enIyi = teklifler[0]

    // 3. Sipariş miktarını hesapla (eksik kadar + buffer)
    const eksik = Math.max(kritikEsik * 2 - mevcutMiktar, kritikEsik)
    const siparisMiktari = Math.ceil(eksik)

    // 4. Bekleyen teklif kaydı oluştur
    const teklifRef = await adminDb.collection('b2b_bekleyen_teklifler').add({
        aliciEsnafId: esnafId,
        saticiEsnafId: enIyi.esnafId,
        saticiAd: enIyi.isletmeAdi,
        malzemeAdi,
        miktar: siparisMiktari,
        birim,
        birimFiyatKurus: enIyi.birimFiyatKurus,
        toplamKurus: enIyi.birimFiyatKurus * siparisMiktari,
        stokId,
        durum: 'patron_onayi_bekleniyor',
        alternatifler: teklifler.slice(1).map(t => ({
            esnafId: t.esnafId,
            isletmeAdi: t.isletmeAdi,
            birimFiyatKurus: t.birimFiyatKurus,
            mesafeKm: t.mesafeKm,
        })),
        olusturma: Timestamp.now(),
        sonlanma: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 saat geçerli
    })

    // 5. Patrona WhatsApp mesajı at
    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    const esnafData = esnafDoc.data()
    const patronTelefon = esnafData?.waNumarasi || esnafData?.telefon

    if (patronTelefon) {
        const toplamTL = kurusToTL(enIyi.birimFiyatKurus * siparisMiktari)
        const birimTL = kurusToTL(enIyi.birimFiyatKurus)

        const mesaj =
            `🚨 *KEPENK TEDARİK SİSTEMİ*\n\n` +
            `Patron, *${malzemeAdi}* stoğun kritik eşiğin altına düştü!\n\n` +
            `📊 Mevcut: ${mevcutMiktar} ${birim}\n` +
            `⚠️ Kritik Eşik: ${kritikEsik} ${birim}\n\n` +
            `✅ *En İyi Teklif:*\n` +
            `🏪 ${enIyi.isletmeAdi}\n` +
            `💰 ${birimTL}/${birim}\n` +
            `📦 ${siparisMiktari} ${birim} = *${toplamTL}*\n` +
            `📍 ${enIyi.mesafeKm} km uzaklıkta\n` +
            `⭐ ${enIyi.puan}/5 puan\n\n` +
            (teklifler.length > 1 ? `📋 ${teklifler.length - 1} alternatif teklif daha var.\n\n` : '') +
            `Sipariş geçeyim mi?\n` +
            `👉 *EVET* veya *HAYIR* yazın.\n\n` +
            `_Teklif ID: ${teklifRef.id}_`

        await waMesajGonder(patronTelefon, mesaj, esnafId, 'genel')
    }
}

// ─── WhatsApp Yanıt İşleme ────────────────────────────────────────────

export async function tedarikYanitIsle(
    esnafId: string,
    yanit: string
): Promise<{ islendi: boolean; mesaj: string }> {
    const yanitTemiz = yanit.trim().toUpperCase()

    // Bekleyen teklif var mı?
    const teklifSnap = await adminDb
        .collection('b2b_bekleyen_teklifler')
        .where('aliciEsnafId', '==', esnafId)
        .where('durum', '==', 'patron_onayi_bekleniyor')
        .orderBy('olusturma', 'desc')
        .limit(1)
        .get()

    if (teklifSnap.empty) {
        return { islendi: false, mesaj: 'Bekleyen teklif yok' }
    }

    const teklifDoc = teklifSnap.docs[0]
    const teklif = teklifDoc.data()

    if (yanitTemiz === 'EVET' || yanitTemiz === 'EVET.') {
        // Teklifi onayla → siparis-onay API'ye gönder
        await teklifDoc.ref.update({ durum: 'onaylandi', onayZamani: Timestamp.now() })

        // siparis-onay endpoint'ini tetikle
        try {
            const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kepenk.ai'
            await fetch(`${baseUrl}/api/b2b/siparis-onay`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-token': process.env.ADMIN_API_TOKEN || '',
                },
                body: JSON.stringify({
                    aliciEsnafId: teklif.aliciEsnafId,
                    saticiEsnafId: teklif.saticiEsnafId,
                    kalemler: [{
                        b2bKatalogId: teklif.stokId,
                        urunAdi: teklif.malzemeAdi,
                        miktar: teklif.miktar,
                        birim: teklif.birim,
                        birimFiyatKurus: teklif.birimFiyatKurus,
                    }],
                    toplamKurus: teklif.toplamKurus,
                }),
            })
        } catch (err: unknown) {
            console.error('[SATINALMA] Sipariş onay API hatası:', err instanceof Error ? err.message : err)
        }

        return {
            islendi: true,
            mesaj: `✅ Sipariş onaylandı! ${teklif.saticiAd}'a ${teklif.miktar} ${teklif.birim} ${teklif.malzemeAdi} siparişi iletildi.`,
        }
    }

    if (yanitTemiz === 'HAYIR' || yanitTemiz === 'HAYIR.') {
        await teklifDoc.ref.update({ durum: 'reddedildi', redZamani: Timestamp.now() })
        return {
            islendi: true,
            mesaj: '❌ Teklif reddedildi. İsterseniz manuel tedarik yapabilirsiniz.',
        }
    }

    return { islendi: false, mesaj: 'Lütfen EVET veya HAYIR yazın.' }
}

// ─── A2A RPC ───────────────────────────────────────────────────────────

export async function handleRpc(
    method: string,
    params: Record<string, unknown>
): Promise<Record<string, unknown>> {
    switch (method) {
        case 'tedarik_baslat': {
            await tedarikSureciBaslat(
                params.esnafId as string,
                params.malzemeAdi as string,
                params.mevcutMiktar as number,
                params.kritikEsik as number,
                params.birim as string,
                params.stokId as string
            )
            return { ok: true, mesaj: 'Tedarik süreci başlatıldı' }
        }
        case 'yanit_isle': {
            return tedarikYanitIsle(
                params.esnafId as string,
                params.yanit as string
            )
        }
        default:
            return { error: `Bilinmeyen metod: ${method}` }
    }
}
