import { ogrenmeAniKaydet } from '@/lib/kolektifZeka'
import { adminDb } from '@/lib/firebaseAdmin'

/**
 * Churn Detective tarafından tarama sonucu "Riskli" bulunan veya
 * "Müdahale Edilen" esnafların profillerini (hangi metriklerden dolayı riskli bulunduklarını)
 * kolektif zekaya kaydeder.
 */
export async function churnOruntusuKaydet(
    esnafId: string,
    belirtiler: string[]
): Promise<void> {

    if (!belirtiler || belirtiler.length === 0) return

    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    if (!esnafDoc.exists) return
    const esnaf = esnafDoc.data()!

    await ogrenmeAniKaydet(esnaf, {
        tip: 'churn_oncesi',
        sektor: esnaf.sektor || 'genel',
        ilce: esnaf.ilce || 'genel',
        sehir: esnaf.sehir || 'genel',
        paket: esnaf.paket || 'TEMEL',
        baglam: `${esnaf.sektor}, ${esnaf.paket}, ${belirtiler.join(', ')}`,
        eylem: 'Churn riski tespit edildi ve panele düşürüldü',
        sonuc: 'Churn Detective Alarmı',
        metrikler: {},
        icerik: `${esnaf.sektor} sektöründeki ${esnaf.paket} paketli kullanıcının churn (kapanma/iptal) belirtileri: ${belirtiler.join(', ')}`,
        zaman: new Date().toISOString(),
        ay: new Date().toISOString().slice(0, 7),
    })
}
