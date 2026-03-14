import { adminDb } from '@/lib/firebaseAdmin'
import { sektorStratejiOzeti } from '@/lib/kolektifZeka'
import { waMesajGonder } from '@/lib/twilioClient'
import { Timestamp } from 'firebase-admin/firestore'

/**
 * Onboarding adımından yeni geçmiş çiçeği burnunda esnafa 
 * kendi sektörünün ve ilçesinin kolektif (Topluluk/Ağ Etkisi) verilerini özetleyerek WhatsApp'tan atar.
 */
export async function yeniEsnafHizlandir(esnafId: string): Promise<void> {
    try {
        const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
        const esnaf = esnafDoc.data()
        if (!esnaf || !esnaf.telefon) return

        const strateji = await sektorStratejiOzeti(esnaf.sektor || 'genel', esnaf.ilce || 'genel')

        const waMetni = `🧠 *kepenk.ai Başlangıç Raporu (Sektör İçgörüleri)*\n
Merhaba ${esnaf.isletmeAdi || esnaf.ad}! Sisteme hoş geldin. ${esnaf.ilce} bölgesindeki benzer işletmelerin verilerine dayanarak sana özel bir başlangıç stratejisi çıkardık:\n
${strateji.enIyiIcerikFormati && strateji.enIyiIcerikFormati.length > 10 ? `📝 *İçerik Stratejisi:*\n${strateji.enIyiIcerikFormati}\n` : ''}
${strateji.enIyiKampanyaZamani && strateji.enIyiKampanyaZamani.length > 10 ? `📢 *Kampanya Stratejisi:*\n${strateji.enIyiKampanyaZamani}\n` : ''}
${strateji.ortalamaCPL > 0 ? `💰 *Reklam Maliyeti:* Bu ilçede ortalama müşteri edinme maliyeti ₺${strateji.ortalamaCPL} civarındadır.\n` : ''}
Sistemimiz seni yakından takip ederek bu istatistikleri doğrudan otomasyonlarında kullanacak. Hayırlı işler!`

        await waMesajGonder(esnaf.telefon, waMetni, esnafId, 'yeni_esnaf_hizlandiricisi')

        // Tekrar atmamak için flag koy
        await esnafDoc.ref.update({
            'hizlandirici.gonderildi': true,
            'hizlandirici.strateji': strateji,
            'hizlandirici.tarih': Timestamp.now()
        })
    } catch (e) {
        console.error('Yeni Esnaf Hızlandırıcı Hatası:', e)
    }
}
