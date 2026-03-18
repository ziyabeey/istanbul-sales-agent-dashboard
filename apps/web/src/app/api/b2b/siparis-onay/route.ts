/**
 * POST /api/b2b/siparis-onay
 *
 * ACID Zırhlı B2B Sipariş Köprüsü
 *
 * Firestore runTransaction ile:
 * 1. Satıcı stok kontrolü (yetmezse → rollback)
 * 2. Alıcıya borç, satıcıya alacak yaz (çift taraflı cari)
 * 3. Satıcının b2b_gelen_siparisler panosuna sipariş düşür
 * 4. Alıcının b2b_verilen_siparisler'ine sipariş yaz
 */

import { NextResponse } from 'next/server'
import { adminDb, Timestamp, FieldValue } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'
import { b2bSiparisOnaySema } from '@/lib/restoran/b2bTipler'

export async function POST(request: Request) {
    const guard = await apiGuard(request, { requireAdminToken: true })
    if (!guard.ok) return guard.response

    try {
        const body = await request.json()
        const parsed = b2bSiparisOnaySema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { error: 'Geçersiz istek', detaylar: parsed.error.issues },
                { status: 400 }
            )
        }

        const { aliciEsnafId, saticiEsnafId, kalemler, toplamKurus } = parsed.data

        // ══ FIRESTORE TRANSACTION (ACID) ══
        const siparisId = await adminDb.runTransaction(async (transaction: FirebaseFirestore.Transaction) => {
            // 1. Satıcı stok kontrolü
            for (const kalem of kalemler) {
                const stokRef = adminDb
                    .collection('esnaflar')
                    .doc(saticiEsnafId)
                    .collection('b2b_katalog')
                    .doc(kalem.b2bKatalogId)

                const stokDoc = await transaction.get(stokRef) as unknown as FirebaseFirestore.DocumentSnapshot

                if (!stokDoc.exists) {
                    throw new Error(`Ürün bulunamadı: ${kalem.urunAdi}`)
                }

                const stokData = stokDoc.data()
                if (stokData?.stokDurumu === 'yok') {
                    throw new Error(`Stok tükendi: ${kalem.urunAdi}`)
                }
            }

            // 2. Sipariş ID oluştur
            const siparisRef = adminDb
                .collection('esnaflar')
                .doc(saticiEsnafId)
                .collection('b2b_gelen_siparisler')
                .doc()

            const id = siparisRef.id

            // 3. Satıcının gelen siparişler panosuna yaz
            transaction.set(siparisRef, {
                siparisId: id,
                aliciEsnafId,
                saticiEsnafId,
                kalemler: kalemler.map(k => ({
                    ...k,
                    toplamKurus: k.birimFiyatKurus * k.miktar,
                })),
                toplamKurus,
                durum: 'bekliyor',
                olusturma: Timestamp.now(),
            })

            // 4. Alıcının verilen siparişler kaydı
            const aliciSiparisRef = adminDb
                .collection('esnaflar')
                .doc(aliciEsnafId)
                .collection('b2b_verilen_siparisler')
                .doc(id)

            transaction.set(aliciSiparisRef, {
                siparisId: id,
                saticiEsnafId,
                kalemler: kalemler.map(k => ({
                    ...k,
                    toplamKurus: k.birimFiyatKurus * k.miktar,
                })),
                toplamKurus,
                durum: 'bekliyor',
                olusturma: Timestamp.now(),
            })

            // 5. Alıcıya BORÇ yaz
            const aliciBorcRef = adminDb
                .collection('esnaflar')
                .doc(aliciEsnafId)
                .collection('cari_hareketler')
                .doc()

            transaction.set(aliciBorcRef, {
                karsiEsnafId: saticiEsnafId,
                tip: 'borc',
                tutarKurus: toplamKurus,
                aciklama: `B2B Sipariş #${id} — ${kalemler.map(k => k.urunAdi).join(', ')}`,
                referansSiparisId: id,
                tarih: Timestamp.now(),
            })

            // 6. Satıcıya ALACAK yaz
            const saticiAlacakRef = adminDb
                .collection('esnaflar')
                .doc(saticiEsnafId)
                .collection('cari_hareketler')
                .doc()

            transaction.set(saticiAlacakRef, {
                karsiEsnafId: aliciEsnafId,
                tip: 'alacak',
                tutarKurus: toplamKurus,
                aciklama: `B2B Sipariş #${id} — ${kalemler.map(k => k.urunAdi).join(', ')}`,
                referansSiparisId: id,
                tarih: Timestamp.now(),
            })

            // 7. Cari bakiye atomik güncelleme
            const aliciRef = adminDb.collection('esnaflar').doc(aliciEsnafId)
            transaction.update(aliciRef, {
                'b2b_cari.toplam_borc': FieldValue.increment(toplamKurus),
                'b2b_cari.son_guncelleme': Timestamp.now(),
            })

            const saticiRef = adminDb.collection('esnaflar').doc(saticiEsnafId)
            transaction.update(saticiRef, {
                'b2b_cari.toplam_alacak': FieldValue.increment(toplamKurus),
                'b2b_cari.son_guncelleme': Timestamp.now(),
            })

            return id
        })

        return NextResponse.json({
            ok: true,
            siparisId,
            mesaj: 'B2B sipariş başarıyla oluşturuldu',
        })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Bilinmeyen hata'
        // console.error('[B2B SİPARİŞ ONAY HATA]', message)

        // Stok yetersiz → özel status
        if (message.includes('Stok tükendi') || message.includes('bulunamadı')) {
            return NextResponse.json({ error: message }, { status: 409 })
        }

        return NextResponse.json({ error: message }, { status: 500 })
    }
}
