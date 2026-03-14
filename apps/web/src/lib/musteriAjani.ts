import { adminDb, Timestamp } from './firebaseAdmin'
import { routerMesajIsle } from './agents/routerAgent'

export interface MusteriMesajParams {
    esnafId: string
    musteriNumara: string
    mesaj: string
    oturumId: string
    kanal?: 'whatsapp' | 'instagram'
    yanıtCallback?: (metin: string) => Promise<void>
}

// ── Gelen müşteri mesajını KUYRUĞA AL (Background/Queue) ──────────────────
export async function musteriMesajiKuyrugaAl(params: MusteriMesajParams): Promise<void> {
    const { esnafId, musteriNumara, mesaj, oturumId, kanal } = params

    // 1. Gelen mesajı Firestore'a "bekliyor" statüsünde at.
    // Bu sayede Vercel'in 10-15 saniyelik timeout limitine takılmayız.
    await adminDb.collection('gelenMesajKuyrugu').add({
        esnafId,
        musteriNumara,
        mesaj,
        oturumId,
        kanal: kanal || 'whatsapp',
        durum: 'bekliyor',
        eklenmeZamani: Timestamp.now()
    })

    console.log(`[KUYRUK] Mesaj DB'ye yazıldı: ${musteriNumara}`)

    // NOT: Gerçek bir Pub/Sub (GCP Cloud Tasks) mimarisinde burada bir Trigger da ateşlenirdi.
    // Biz Cron yardımıyla bu kuyruğu sürekli denetleyeceğiz.
}

// ── Eski Senkron Çağrı (Geriye Dönük Uyumluluk) ───────────────────────
export async function musteriMesajiIsle(params: MusteriMesajParams): Promise<void> {
    // 4. Eskiden burada olan devasa Yapay Zeka (Satış/Randevu/Fiyat sorma) kodları, 
    // artık daha akıllı ve yönetilebilir olan Router Agent'a devredildi (Faz 27 Orkestrasyonu)
    await routerMesajIsle({
        esnafId: params.esnafId,
        musteriNumara: params.musteriNumara,
        mesaj: params.mesaj,
        oturumId: params.oturumId
    })
}
