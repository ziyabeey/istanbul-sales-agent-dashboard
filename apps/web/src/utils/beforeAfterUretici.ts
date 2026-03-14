import { createCanvas, loadImage } from 'canvas'
import { v4 as uuidv4 } from 'uuid'
import { adminDb } from '@/lib/firebaseAdmin'
import { FieldValue } from 'firebase-admin/firestore'

/**
 * Esnafın gönderdiği "Öncesi" (beforeBase64) ve "Sonrası" (afterBase64) fotoğraflarını 
 * yan yana (kolaj) yapıştırarak üzerine estetik "ÖNCESİ - SONRASI" etiketi basar.
 * Ardından Sosyal Medya modülü için doğrudan "icerikler" koleksiyonuna taslak paslar.
 */
export async function beforeAfterUret(params: {
    esnafId: string
    sektor: string
    islemAdi: string // Örn: "Göçük Düzeltme", "Röfle", "Su Kaçağı Onarımı"
    beforeUrl: string
    afterUrl: string
}): Promise<string | null> {
    try {
        const MARGIN = 10
        const TEXT_H = 60

        // Resimleri İndir/Yükle
        const beforeImg = await loadImage(params.beforeUrl)
        const afterImg = await loadImage(params.afterUrl)

        // Resimleri aynı yüksekliğe eşitle (ortalama 800px)
        const targetHeight = 800
        const bRatio = targetHeight / beforeImg.height
        const aRatio = targetHeight / afterImg.height

        const bWidth = beforeImg.width * bRatio
        const aWidth = afterImg.width * aRatio

        const canvasWidth = bWidth + aWidth + (MARGIN * 3)
        const canvasHeight = targetHeight + TEXT_H + (MARGIN * 2)

        const canvas = createCanvas(canvasWidth, canvasHeight)
        const ctx = canvas.getContext('2d')

        // Arkaplan
        ctx.fillStyle = '#1A1A1A'
        ctx.fillRect(0, 0, canvasWidth, canvasHeight)

        // Metin Ayarları
        ctx.fillStyle = '#FFFFFF'
        ctx.font = 'bold 36px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        // Öncesi Kısmı
        ctx.fillText('ÖNCESİ', MARGIN + (bWidth / 2), MARGIN + (TEXT_H / 2))
        ctx.drawImage(beforeImg, MARGIN, MARGIN + TEXT_H, bWidth, targetHeight)

        // Sonrası Kısmı
        const startX = MARGIN * 2 + bWidth
        ctx.fillText('SONRASI', startX + (aWidth / 2), MARGIN + (TEXT_H / 2))
        ctx.drawImage(afterImg, startX, MARGIN + TEXT_H, aWidth, targetHeight)

        // Base64 Çıktısı Al
        const collageBase64 = canvas.toDataURL('image/jpeg', 0.9)

        // Taslak İçerik (Social Media Post) Oluştur ve Firestore'a Kaydet
        const icerikId = `ba_${uuidv4().slice(0, 8)}`
        const yayinMetni = `İşlem: ${params.islemAdi} 🔧 Makyajı değil, ustalığı konuşuyoruz! Kaliteden ödün vermeden sıfır gibi teslim ettik. Randevu ve fiyat bilgisi için DM veya bio'daki linkten bize ulaşabilirsiniz. ✨ #${params.sektor.replace(/\s/g, '')} #oncesisonrasi`

        await adminDb.collection('icerikler').doc(icerikId).set({
            icerikId,
            esnafId: params.esnafId,
            platform: 'instagram',
            format: 'gorsel_post',
            metin: yayinMetni,
            gorselUrl: collageBase64, // (Gerçek prod ortamında Cloud Storage'a atılması önerilir)
            durum: 'yayina_hazir',
            olusturma: FieldValue.serverTimestamp(),
            isBeforeAfter: true,
            islemAdi: params.islemAdi
        })

        return icerikId
    } catch (e) {
        console.error('Before/After Üretimi Hatalı:', e)
        return null
    }
}
