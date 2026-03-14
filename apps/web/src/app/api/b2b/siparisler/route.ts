import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import logger from '@/utils/logger'

// Toptancıya Gelen Siparişleri Çeker veya Esnafın Yeni Sipariş Atmasını Sağlar
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const toptanciId = searchParams.get('toptanciId') // Rolü toptancı olan Esnaf ID

    if (!toptanciId) return NextResponse.json({ error: 'toptanciId gerekli' }, { status: 400 })

    try {
        const query = await adminDb.collection('b2bSiparisler')
            .where('toptanciId', '==', toptanciId)
            .orderBy('tarih', 'desc')
            .get()

        const siparisler = query.docs.map((d: any) => {
            const data = d.data()
            return {
                id: d.id,
                ...data,
                tarih: data.tarih?.toDate()
            }
        })

        return NextResponse.json(siparisler)
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}

// Sipariş Durumu Güncelleme (Bekliyor -> Yola Çıktı -> Teslim Edildi)
export async function PATCH(req: Request) {
    try {
        const body = await req.json()
        const { siparisId, yeniDurum, toptanciId } = body

        if (!siparisId || !yeniDurum) return NextResponse.json({ error: 'Eksik parametre' }, { status: 400 })

        const siparisRef = adminDb.collection('b2bSiparisler').doc(siparisId)
        const doc = await siparisRef.get()

        if (!doc.exists || doc.data()?.toptanciId !== toptanciId) {
            return NextResponse.json({ error: 'Yetkisiz işlem veya sipariş bulunamadı' }, { status: 403 })
        }

        await siparisRef.update({ durum: yeniDurum })
        const siparisData = doc.data()!

        // B2B Finans (Açık Hesap / Cari) Tetikleyicisi
        if (yeniDurum === 'teslim_edildi') {
            // Basit bir maliyet varsayımı: Faz 30'da katalog fiyatları tam oturmadığı için
            // geçici olarak 1000₺'lik bir cari borç yansıtıyoruz veya katalogdan okumalı:
            const tutar = siparisData.miktar * 500 // Mock fiyat: Her birim 500₺ olsun

            await adminDb.collection('b2bCariHesaplar').add({
                toptanciId: siparisData.toptanciId,
                esnafId: siparisData.esnafId,
                isletmeAdi: siparisData.isletmeAdi,
                tutar: tutar,
                aciklama: `${siparisData.miktar} ${siparisData.birim} ${siparisData.urunAdi} Teslimatı`,
                olusturmaTarihi: Timestamp.now(),
                vadeTarihi: Timestamp.fromDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)), // 30 Gün Vade
                durum: 'odenmedi'
            })

            await logger.logYaz(toptanciId, 'info', 'B2B Sipariş Teslim Edildi', `${siparisData.isletmeAdi} esnafına mal teslim edildi, cari borcu 30 gün vade ile ${tutar}₺ olarak yazıldı.`)
        }

        // Teslim edildiğinde otomatik Stoğu ve Cariyi tetikleyebiliriz
        if (yeniDurum === 'teslim_edildi') {
            // Esnafa Teslimat Bilgilendirmesi At
            if (siparisData && siparisData.esnafId) {
                await adminDb.collection('esnafBildirimleri').add({
                    esnafId: siparisData.esnafId,
                    baslik: 'Tedarik Teslimatı',
                    mesaj: `${siparisData.urunAdi} siparişiniz toptancı tarafından teslim edildi olarak işaretlendi.`,
                    tur: 'bilgi',
                    zaman: Timestamp.now(),
                    okundu: false
                })
            }
        }

        await logger.logYaz(toptanciId, 'info', 'Sipariş Güncellendi', `${siparisId} nolu sipariş durumu ${yeniDurum} yapıldı.`)

        return NextResponse.json({ ok: true })
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
