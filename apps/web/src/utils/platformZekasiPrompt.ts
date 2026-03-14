import { benzerDurumlariSorgula } from '@/lib/kolektifZeka'

export async function platformZekasiGetir(params: {
    sektor: string
    ilce: string
    ajanTipi: 'icerik' | 'kampanya' | 'reklam' | 'musteri' | 'churn'
}): Promise<string> {
    const sorular: Record<string, string> = {
        icerik: `${params.sektor} ${params.ilce} bölgesinde en iyi dönüşüm sağlayan içerik formatı ve zamanlaması`,
        kampanya: `${params.sektor} ${params.ilce} WhatsApp veya müşteri kampanyasında en çok randevu getiren mesaj türü`,
        reklam: `${params.sektor} ${params.ilce} Google/Meta reklam stratejisi ve en ucuz CPL sağlayan kreatif`,
        musteri: `${params.sektor} ${params.ilce} itiraz yönetimi, fiyat şikayetlerinde veya ikna anlarında en iyi çözüm`,
        churn: `${params.sektor} ${params.ilce} müşteri kaybetme (churn) önleme teknikleri`,
    }

    try {
        const { anlayis, kanit, guvenskor } = await benzerDurumlariSorgula({
            soru: sorular[params.ajanTipi],
            sektor: params.sektor,
            ilce: params.ilce,
            topK: 15, // Pinecone'dan en benzeyen 15 tecrübeyi çek
        })

        // Yeterli kanıt/veli noktası yoksa "Boş laf yapmama/hallucination önleme" filtresi
        if (guvenskor < 0.2 || anlayis.length < 10) return ''

        return `
PLATFORM ZEKASİ (Kepenk Platform Öğrenmesi — %${Math.round(guvenskor * 100)} Güvenilir / Analiz Edilen ${kanit.length} Örneğe Göre):
${anlayis}

Sahadaki Kanıtlar:
${kanit.slice(0, 3).map((k, i) => `${i + 1}. Yapılan Hata/Doğru: ${k.eylem} → Sonuç Ne Oldu: ${k.sonuc}`).join('\n')}

**Bu platform ve kolektif istihbaratı baz alarak ajanlığını yürüt ve tavsiyelerinde mutlaka uygula.** `
    } catch (e: any) {
        console.error('Platform Zekası (RAG) Çekilirken Hata:', e)
        return ''
    }
}
