import { adminDb } from '@/lib/firebaseAdmin'
import { waMesajGonder, esnafHitap } from '@/lib/twilioClient'
import { FieldValue, Timestamp } from 'firebase-admin/firestore'
import { platformZekasiGetir } from '@/utils/platformZekasiPrompt'

/**
 * Ürün satıldığında/hizmet verildiğinde esnafın stoklarını reçeteye
 * göre otomatik düşer.
 */
export async function hizmetStokDus(esnafId: string, islemIdVeyaAdi: string) {
    try {
        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        const esnaf = esnafDoc.data()
        if (!esnaf || !esnaf.botAktif) return

        // Hizmete ait reçeteyi bul (Hizmet için ne kadar malzeme harcanıyor?)
        const receteRef = await adminDb.collection('esnaflar').doc(esnafId).collection('receteler')
            .where('islemAdi', '==', islemIdVeyaAdi)
            .limit(1)
            .get()

        if (receteRef.empty) return // Reçete yoksa stoktan düşülecek bir şey bilinmiyordur

        const recete = receteRef.docs[0].data()
        const harcananMalzemeler = recete.malzemeler || [] // [{ malzemeId: 'm1', miktar: 2 }, ...]

        for (const m of harcananMalzemeler) {
            const stokDocRef = adminDb.collection('esnaflar').doc(esnafId).collection('stoklar').doc(m.malzemeId)
            const stokDoc = await stokDocRef.get()

            if (stokDoc.exists) {
                const guncelVeri = stokDoc.data()
                const yeniMiktar = Math.max(0, (guncelVeri?.miktar || 0) - (m.miktar || 1))

                await stokDocRef.update({
                    miktar: yeniMiktar,
                    sonGuncelleme: FieldValue.serverTimestamp()
                })

                // Eğer kritik seviyenin altına düştüyse otonom sipariş tetikle
                const alarmSeviyesi = guncelVeri?.alarmSeviyesi || 5
                if (yeniMiktar <= alarmSeviyesi) {
                    await kritikStokSiparisiVer(esnafId, stokDoc.id, guncelVeri?.malzemeAdi, (guncelVeri?.siparisAdedi || alarmSeviyesi * 2))
                }
            }
        }
    } catch (e) {
        console.error('Stok Düşürme Hatası:', e)
    }
}

/**
 * Stok kritik seviyeye indiğinde Esnafın Toptancısına WhatsApp'tan "Zero-Click" 
 * otomatik sipariş talebi geçer. (Tedarikçi Pazarlığı yeteneği eklendi)
 */
export async function kritikStokSiparisiVer(esnafId: string, malzemeId: string, malzemeAdi: string, siparisAdedi: number) {
    try {
        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        const esnaf = esnafDoc.data()
        if (!esnaf || !esnaf.tedarikciTel) return // Tedarikçisi tanımlı değilse atla

        const toptanciTel = esnaf.tedarikciTel
        const cariIsim = esnaf.isletmeAdi || esnaf.ad || 'İşletme'

        // Tedarikçi Pazarlığı - Kolektif veriye göre bu malzeme için ucuz fiyat var mı?
        const piyasaPazarligi = await platformZekasiGetir({ sektor: esnaf.sektor, ilce: esnaf.ilce, ajanTipi: 'kampanya' })
        const piyasaBaskisi = piyasaPazarligi.includes('ucuza veren toptancı') ?
            `\n(Not: Kepenk veritabanına göre piyasada X toptancısı bu ürünü %15 daha uygun veriyormuş, eski fiyatınızdan gönderim sağlarsanız harika olur.)` : ''

        const mesaj = `📦 *${cariIsim} - Otonom Sipariş Sistemi*\n\n` +
            `Merhaba,\nKepenk.ai stok otonomasyonu tarafından oluşturulmuş otomatik sipariştir. Stoklarımızda *${malzemeAdi}* kritik seviyededir.\n\n` +
            `Lütfen cari hesabımıza yazarak en kısa sürede *${siparisAdedi} adet ${malzemeAdi}* gönderimini sağlayınız.${piyasaBaskisi}\n\n` +
            `Teşekkürler, iyi çalışmalar.\n_Kepenk.ai Supply Chain_`

        // Sık sipariş atılmasını (Spam) engelle
        const stokDocRef = adminDb.collection('esnaflar').doc(esnafId).collection('stoklar').doc(malzemeId)
        const stokDoc = await stokDocRef.get()
        const stok = stokDoc.data()

        const sonSiparis = stok?.sonSiparisTarihi?.toDate()
        const simdi = new Date()

        if (!sonSiparis || (simdi.getTime() - sonSiparis.getTime() > 24 * 60 * 60 * 1000)) {
            const basari = await waMesajGonder(toptanciTel, mesaj, esnafId, 'supply_chain_agent')

            if (basari) {
                await stokDocRef.update({ sonSiparisTarihi: Timestamp.fromDate(simdi) })
            }
        }
    } catch (error) {
        console.error('Kritik Stok Siparişi Hatası:', error)
    }
}
