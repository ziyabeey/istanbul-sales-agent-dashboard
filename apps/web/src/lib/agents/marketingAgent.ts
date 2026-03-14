import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import Anthropic from '@anthropic-ai/sdk'

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export async function pazarlamaKarariVer(esnafId: string): Promise<void> {
    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    const esnaf = esnafDoc.data()
    if (!esnaf) return

    // Son 3 günün cirosunu kontrol edelim
    const ucGunOnce = new Date()
    ucGunOnce.setDate(ucGunOnce.getDate() - 3)

    const logsQuery = await adminDb.collection('agent_logs')
        .where('esnafId', '==', esnafId)
        .where('zaman', '>=', Timestamp.fromDate(ucGunOnce))
        .get()

    let sonUcGunCiro = 0
    logsQuery.docs.forEach((d: any) => {
        const data = d.data()
        // Dinamik fiyat artışlarından kazanç
        if (data.ajan === 'fiyatlandirma_motoru' && data.tip === 'fiyat_guncellendi') {
            const fark = (data.output?.yeniFiyat || 0) - (data.input?.orijinalListeFiyati || 0)
            if (fark > 0) sonUcGunCiro += fark
        }
        // Kurtarılan tahsilatlar
        if (data.ajan === 'tahsilat_motoru') {
            sonUcGunCiro += data.output?.tahsilatMiktari || data.output?.kalanTutar || 0
        }
    })

    // Hedef Ciro (Örn: 2000 TL altına düşerse tehlike çanları çalar)
    const hedefCiro = 2000
    if (sonUcGunCiro >= hedefCiro) {
        console.log(`[MarketingAgent] ${esnaf.isletmeAdi || esnaf.ad} için ciro yeterli (₺${sonUcGunCiro}). Reklama gerek yok.`)
        return
    }

    console.log(`[MarketingAgent] ${esnaf.isletmeAdi || esnaf.ad} 3 günlük ciro hedefin altında (₺${sonUcGunCiro}). Otonom reklam başlatılıyor...`)

    const sistemPrompt = `
Sen ${esnaf.isletmeAdi || esnaf.ad} işletmesinin Baş Pazarlama Yöneticisisin (CMO).
İşletme Sektörü: ${esnaf.sektor}
Hizmetler: ${(esnaf.hizmetler || []).join(', ')}

Son 3 günlük ciro (₺${sonUcGunCiro}) beklentilerin (₺${hedefCiro}) altında kaldı. Görevin, Meta Ads (Facebook/Instagram) üzerinden yayınlanacak "Acil Dönüşüm" odaklı, yaratıcı ve dikkat çekici bir reklam metni yazmak.
Lütfen sadece reklam metnini ve hedef kitle yaş/ilgi alanı önerini JSON formatında döndür:
{
  "baslik": "Vurucu Başlık",
  "metin": "Dikkat çekici açıklama...",
  "hedefKitle": "18-35 yaş, güzellik meraklıları vb."
}
`

    const yanit = await claude.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 400,
        system: sistemPrompt,
        messages: [
            { role: 'user', content: 'Ciro düşük. Lütfen acil bir kampanya metni üret.' },
        ],
    })

    const yanitMetni = yanit.content[0].type === 'text' ? yanit.content[0].text : ''
    let kampanyaVerisi = { baslik: 'Fırsat Kampanyası', metin: 'Şimdi randevu alın!', hedefKitle: 'Genel' }

    try {
        const jsonMatch = yanitMetni.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
            kampanyaVerisi = JSON.parse(jsonMatch[0])
        }
    } catch (e) {
        console.error("JSON parse hatası", e)
    }

    // Mock Meta Ads API çağrısı Simülasyonu
    console.log(`[Meta Ads API Mock] Kampanya Çıkıldı: ${kampanyaVerisi.baslik}`)

    // Agent Log işlemi -> Bu, dashboard üzerindeki Sonner Toast'ı tetikleyecek
    await adminDb.collection('agent_logs').add({
        esnafId,
        ajan: 'marketing_agent',
        kanal: 'meta_ads',
        tip: 'kampanya_baslatildi',
        input: {
            sonUcGunCiro,
            hedefCiro
        },
        output: {
            butce: 50,
            baslik: kampanyaVerisi.baslik,
            mesaj: `Meta Ads Kamp.: ${kampanyaVerisi.baslik}`
        },
        zaman: Timestamp.now(),
        basari: true
    })
}
