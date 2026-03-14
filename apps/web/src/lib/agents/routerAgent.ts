import { adminDb } from '@/lib/firebaseAdmin'
import Anthropic from '@anthropic-ai/sdk'
import { islemYap as salesIslemYap } from './salesAgent'
import { islemYap as supportIslemYap } from './supportAgent'
import { islemYap as plasiyerIslemYap } from './plasiyerAgent'

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export interface RouterParams {
    esnafId: string
    musteriNumara: string
    mesaj: string
    oturumId: string
}

export async function routerMesajIsle(params: RouterParams): Promise<void> {
    const { esnafId, musteriNumara, mesaj, oturumId } = params

    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    const esnaf = esnafDoc.data()

    // B2B TOPTANCI (PLASİYER) YÖNLENDİRMESİ (Faz 30)
    if (esnaf?.rol === 'toptanci') {
        console.log(`[ROUTER AGENT] B2B Toptancı Algılandı. Plasiyer Ajanına yönlendiriliyor...`)
        return await plasiyerIslemYap(params)
    }

    const subeler = esnaf?.subeler || []

    // 1. ŞUBE / LOKASYON YÖNLENDİRMESİ (Faz 29 Franchise Modülü)
    if (subeler.length > 1) {
        // Müşteri mesajında şube seçmiş mi? (Örn: "Kadıköy şubenize gelmek istiyorum")
        const subeSecimiAnalizi = await claude.messages.create({
            model: 'claude-3-haiku-20240307',
            max_tokens: 100,
            system: `
Esnafın şubeleri şunlar: ${subeler.map((s: any) => s.isim).join(', ')}.
Kullanıcı mesajına bakarak, eğer açıkça bir şube belirtmişse o şubenin adını dön (Örn: "Kadıköy"). 
Açıkça belirtmemişse sadece "YOK" yaz.
`,
            messages: [{ role: 'user', content: mesaj }]
        })
        const secilenSube = subeSecimiAnalizi.content[0].type === 'text' ? subeSecimiAnalizi.content[0].text.trim() : 'YOK'

        if (secilenSube === 'YOK') {
            // Müşteriye hangi şubeyi istediğini sor (Router konuşmaya dahil oluyor!)
            const asistanMesaji = `Merhabalar, randevu/bilgi için yardımcı olacağım. Ancak öncelikle hangi şubemize (Örn: ${subeler.map((s: any) => s.isim).join(', ')}) işlem yaptırmak istersiniz?`

            // Raw Twilio Whatsapp fonksiyonunu buraya bağlamalıydık, ama mimaride router salesAgent'a paslıyor.
            // Bu bilgiyi salesAgent'ın anlaması için context'i değiştiriyoruz:
            params.mesaj = `[SİSTEM NOTU: MÜŞTERİ HENÜZ ŞUBE SEÇMEDİ. ONA ${subeler.map((s: any) => s.isim).join(', ')} ŞUBELERİNDEN HANGİSİNİ İSTEDİĞİNİ SOR] ${mesaj}`
        } else {
            params.mesaj = `[SİSTEM NOTU: MÜŞTERİ ${secilenSube} ŞUBESİNİ SEÇTİ] ${mesaj}`
        }
    }

    // 2. Niyet Analizi (Intent Recognition)
    const yanit = await claude.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 50,
        system: `
Sen bir niyet (intent) analizcisi yönlendiricisin.
Kullanıcının mesajını oku ve sadece şu iki kelimeden birini dön:
SALES : Kullanıcı hizmet almak, randevu sormak, fiyat sormak, adres öğrenmek istiyorsa.
SUPPORT : Kullanıcı şikayet ediyorsa, randevu iptal etmek istiyorsa, faturasıyla/ödemesiyle ilgili sorun yaşıyorsa.
Hiçbir açıklama yapma. Sadece "SALES" veya "SUPPORT" yaz.
`,
        messages: [{ role: 'user', content: params.mesaj }] // Değiştirilmiş contextli mesaj gidebilir
    })

    const niyet = (yanit.content[0].type === 'text' ? yanit.content[0].text : '').trim().toUpperCase()

    console.log(`[ROUTER AGENT] Niyet tespit edildi: ${niyet} | Mesaj: ${mesaj.substring(0, 20)}...`)

    // 3. İlgili Uzman Ajan'a Pasla
    if (niyet.includes('SUPPORT')) {
        await supportIslemYap(params)
    } else {
        // Varsayılan olarak SALES (satışa/randevuya) yönlendirir
        await salesIslemYap(params)
    }
}
