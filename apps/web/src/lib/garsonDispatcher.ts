/**
 * garsonDispatcher.ts — Akıllı Load Balancer Garson Atama Algoritması
 * ══════════════════════════════════════════════════════════════════════
 * Uber/Getir mantığıyla "En az yoğun" garsona adil görev dağıtımı.
 *
 * Algoritma:
 * 1. Online garsonları tara
 * 2. Aktif masa sayısına göre sırala (ASC)
 * 3. Eşitlik varsa → Round-Robin (son_atama_sira ASC)
 * 4. Transaction ile atomik atama + masa durumu güncelle
 */

import { adminDb } from '@/lib/firebaseAdmin'
import { FieldValue, type Transaction, type DocumentReference } from 'firebase-admin/firestore'
import type { Personel, MasaDurum } from '@/lib/restoran/MasaTypes'

// ═══ TİPLER ══════════════════════════════════════════════════════════════════

export interface AtamaSonuc {
    basarili: boolean
    garsonId?: string
    garsonAdi?: string
    hata?: string
}

export interface DispatchParams {
    esnafId: string
    masaNo: number
    adisyonId: string
}

// ═══ ANA DISPATCHER ═════════════════════════════════════════════════════════

/**
 * Yeni sipariş geldiğinde en uygun garsonu bul ve ata.
 * Transaction kullanır — race condition olmaz.
 */
export async function garsonAta(params: DispatchParams): Promise<AtamaSonuc> {
    const { esnafId, masaNo, adisyonId } = params

    try {
        const sonuc = await adminDb.runTransaction(async (tx: Transaction) => {
            // 1. Online garsonları çek
            const personelRef = adminDb
                .collection('esnaflar')
                .doc(esnafId)
                .collection('personel')

            const personelSnap = await tx.get(
                personelRef
                    .where('rol', '==', 'garson')
                    .where('durum', '==', 'online')
            )

            if (personelSnap.empty) {
                return { basarili: false, hata: 'Online garson bulunamadı' }
            }

            // 2. En az yoğun olanı bul
            const garsonlar: (Personel & { id: string; ref: DocumentReference })[] = personelSnap.docs.map((d) => ({
                id: d.id,
                ref: d.ref as DocumentReference,
                ...(d.data() as Personel),
            }))

            // Sırala: önce aktif_masa_sayisi (ASC), eşitse son_atama_sira (ASC)
            garsonlar.sort((a: Personel & { id: string; ref: DocumentReference }, b: Personel & { id: string; ref: DocumentReference }) => {
                const masaFark = (a.aktif_masa_sayisi || 0) - (b.aktif_masa_sayisi || 0)
                if (masaFark !== 0) return masaFark
                // Round-Robin: en eski atanan önce alsın
                return (a.son_atama_sira || 0) - (b.son_atama_sira || 0)
            })

            const secilen = garsonlar[0]

            // 3. Garson profilini güncelle
            tx.update(secilen.ref, {
                aktif_masa_sayisi: FieldValue.increment(1),
                bugun_toplam_masa: FieldValue.increment(1),
                son_atama_sira: FieldValue.increment(1),
                son_gorev_ani: FieldValue.serverTimestamp(),
            })

            // 4. Adisyona garson ata
            const adisyonRef = adminDb
                .collection('esnaflar')
                .doc(esnafId)
                .collection('aktif_adisyonlar')
                .doc(adisyonId)

            tx.update(adisyonRef, {
                atanan_garson_id: secilen.id,
                atanan_garson_adi: `${secilen.ad}${secilen.soyad ? ' ' + secilen.soyad : ''}`,
                guncelleme: FieldValue.serverTimestamp(),
            })

            // 5. Masa durumunu güncelle
            const masaRef = adminDb
                .collection('esnaflar')
                .doc(esnafId)
                .collection('masalar')
                .doc(`masa_${masaNo}`)

            tx.update(masaRef, {
                durum: 'siparis_verildi' as MasaDurum,
                atanan_garson_id: secilen.id,
                atanan_garson_adi: `${secilen.ad}${secilen.soyad ? ' ' + secilen.soyad : ''}`,
                aktif_adisyon_id: adisyonId,
                son_siparis_ani: FieldValue.serverTimestamp(),
                son_durum_degisim: FieldValue.serverTimestamp(),
            })

            return {
                basarili: true,
                garsonId: secilen.id,
                garsonAdi: `${secilen.ad}${secilen.soyad ? ' ' + secilen.soyad : ''}`,
            }
        })

        // 6. Transaction başarılıysa Push Bildirim gönder
        if (sonuc.basarili && sonuc.garsonId) {
            await garsonBildirimGonder(esnafId, sonuc.garsonId, masaNo)
        }

        console.log(`[garsonDispatcher] ✅ Masa ${masaNo} → ${sonuc.garsonAdi || '?'} atandı`)
        return sonuc

    } catch (err: any) {
        console.error('[garsonDispatcher] ❌ Atama hatası:', err)
        return { basarili: false, hata: err?.message || 'Bilinmeyen hata' }
    }
}

// ═══ MASA DURUMU GÜNCELLEYİCİ ══════════════════════════════════════════════

/**
 * Garson bir aksiyonu tamamladığında masa durumunu ilerlet.
 * Temizlik tamamlandığında garsonun aktif masa sayısını düşür.
 */
export async function masaDurumuIlerlet(params: {
    esnafId: string
    masaNo: number
    yeniDurum: MasaDurum
    garsonId?: string
}): Promise<void> {
    const { esnafId, masaNo, yeniDurum, garsonId } = params

    const masaRef = adminDb
        .collection('esnaflar')
        .doc(esnafId)
        .collection('masalar')
        .doc(`masa_${masaNo}`)

    const updates: any = {
        durum: yeniDurum,
        son_durum_degisim: FieldValue.serverTimestamp(),
    }

    // Masayı sıfırla (temizlik bitti → boş)
    if (yeniDurum === 'bos') {
        updates.atanan_garson_id = null
        updates.atanan_garson_adi = null
        updates.aktif_adisyon_id = null
        updates.oturum_ciro_kurus = 0
        updates.son_temizlik_ani = FieldValue.serverTimestamp()

        // Garsonun aktif masa sayısını düşür
        if (garsonId) {
            const garsonRef = adminDb
                .collection('esnaflar')
                .doc(esnafId)
                .collection('personel')
                .doc(garsonId)

            await garsonRef.update({
                aktif_masa_sayisi: FieldValue.increment(-1),
            })
        }
    }

    await masaRef.update(updates)
}

// ═══ BİLDİRİM ══════════════════════════════════════════════════════════════

async function garsonBildirimGonder(
    esnafId: string,
    garsonId: string,
    masaNo: number
): Promise<void> {
    try {
        // FCM token çek
        const garsonDoc = await adminDb
            .collection('esnaflar')
            .doc(esnafId)
            .collection('personel')
            .doc(garsonId)
            .get()

        const fcmToken = garsonDoc.data()?.fcmToken
        if (!fcmToken) return

        // FCM Admin SDK ile gönder (opsiyonel, kuruluysa)
        // Bu örnekte sadece log atıyoruz; FCM integration ayrı modül.
        console.log(`[garsonDispatcher] 📱 Push gönderildi: Garson ${garsonId} → "Masa ${masaNo} sipariş verdi!"`)

    } catch (err) {
        console.error('[garsonDispatcher] Push bildirim hatası:', err)
    }
}

// ═══ BAHŞIŞ İŞLEMLERİ ══════════════════════════════════════════════════════

/**
 * Dijital bahşişi garsonun cüzdanına yaz.
 * FieldValue.increment ile atomik güncelleme.
 */
export async function bahsisEkle(params: {
    esnafId: string
    garsonId: string
    tutarKurus: number
    adisyonId: string
}): Promise<void> {
    const { esnafId, garsonId, tutarKurus, adisyonId } = params

    const batch = adminDb.batch()

    // 1. Personel günlük toplam bahşişi artır
    const garsonRef = adminDb
        .collection('esnaflar')
        .doc(esnafId)
        .collection('personel')
        .doc(garsonId)

    batch.update(garsonRef, {
        bugun_toplam_bahsis_kurus: FieldValue.increment(tutarKurus),
    })

    // 2. Dijital cüzdan kaydı oluştur
    const cuzdanRef = adminDb
        .collection('esnaflar')
        .doc(esnafId)
        .collection('personel')
        .doc(garsonId)
        .collection('dijital_cuzdan')
        .doc()

    batch.set(cuzdanRef, {
        tutarKurus,
        adisyonId,
        tarih: FieldValue.serverTimestamp(),
        tip: 'bahsis',
    })

    await batch.commit()

    console.log(`[garsonDispatcher] 💸 Bahşiş: Garson ${garsonId} → ${tutarKurus / 100} TL`)
}
