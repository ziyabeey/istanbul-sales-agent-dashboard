import { ogrenmeAniKaydet } from '@/lib/kolektifZeka'
import { adminDb } from '@/lib/firebaseAdmin'

/**
 * Chat botlarında sonlanan bir konuşmayı değerlendirip (itiraz var mı diye)
 * kolektif zekaya itiraz istihbaratı kaydeder.
 */
export async function itirazAnaliziKaydet(params: {
    esnafId: string
    konusmalar: { role: string; content: string }[]
    sonucRandevu: boolean
}): Promise<void> {

    const itirazGosterenKelimeKullanimlari = params.konusmalar
        .filter(k => k.role === 'user')
        .map(k => k.content.toLowerCase())
        .filter(m =>
            m.includes('pahalı') || m.includes('düşün') ||
            m.includes('bak') || m.includes('fiyat') ||
            m.includes('neden bu kadar') || m.includes('başka yer') ||
            m.includes('geç') || m.includes('uzak') || m.includes('güven')
        )

    if (itirazGosterenKelimeKullanimlari.length === 0) return

    const esnafDoc = await adminDb.collection('esnaflar').doc(params.esnafId).get()
    const esnaf = esnafDoc.data()
    if (!esnaf) return

    const aiYanitlari = params.konusmalar
        .filter(k => k.role === 'assistant')
        .map(k => k.content)

    const itiraz = itirazGosterenKelimeKullanimlari[itirazGosterenKelimeKullanimlari.length - 1]
    const asanYanit = aiYanitlari[aiYanitlari.length - 1] || 'Yanıtlanmadı'

    await ogrenmeAniKaydet(esnaf, {
        tip: 'musteri_itiraz',
        sektor: esnaf.sektor,
        ilce: esnaf.ilce,
        sehir: esnaf.sehir,
        paket: esnaf.paket,
        baglam: `${esnaf.sektor}, İtiraz: "${itiraz.substring(0, 80)}"`,
        eylem: `AI'ın itirazı karşılama taktiği: "${asanYanit.substring(0, 100)}"`,
        sonuc: params.sonucRandevu ? 'İtiraz Aşıldı, Randevu İkna Edildi' : 'İtiraz Aşılamadı',
        metrikler: { donusumOrani: params.sonucRandevu ? 1 : 0 },
        icerik: `${esnaf.sektor} sektörü itirazı: "${itiraz}" → AI Yanıtı: "${asanYanit}" → ${params.sonucRandevu ? 'BAŞARILI' : 'BAŞARISIZ'}`,
        zaman: new Date().toISOString(),
        ay: new Date().toISOString().slice(0, 7),
    })
}
