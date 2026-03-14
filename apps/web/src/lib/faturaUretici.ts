import PDFDocument from 'pdfkit'
import fs from 'fs'
import path from 'path'
import { adminDb } from './firebaseAdmin'

// Gerçek bir senaryoda bu PDF dosyası Firebase Storage'a yüklenir, burada basit stream bırakıyoruz.
export async function faturaUret(odemeToken: string): Promise<string> {
    const odemeDoc = await adminDb.collection('odemeLinkleri').doc(odemeToken).get()
    const islem = odemeDoc.data()!
    const esnafDoc = await adminDb.collection('esnaflar').doc(islem.esnafId).get()
    const esnaf = esnafDoc.data()!

    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 })
        // Geçici dosya /tmp dizinine (Vercel/GCP için uygun)
        const dosyaAdi = `Fatura_${Date.now()}.pdf`
        const dosyaYolu = path.join('/tmp', dosyaAdi)
        const stream = fs.createWriteStream(dosyaYolu)

        doc.pipe(stream)

        // --- Antet (Esnaf) ---
        doc.fontSize(20).font('Helvetica-Bold').text('E-ARSIV FATURA', { align: 'center' })
        doc.moveDown()
        doc.fontSize(12).text(esnaf.isletmeAdiTam || esnaf.isletmeAdi)
        doc.fontSize(10).font('Helvetica').text(`Vergi No: ${esnaf.finansConfig?.vergiNo || '1111111111'}`)
        doc.text(`Vergi Dairesi: ${esnaf.finansConfig?.vergiDairesi || 'Bilinmiyor VD'}`)
        doc.text(`Telefon: ${esnaf.telefon}`)
        doc.text(`Tarih: ${new Date().toLocaleDateString('tr-TR')}`)

        // --- Müşteri ---
        doc.moveDown()
        doc.font('Helvetica-Bold').text('SAYIN:')
        doc.font('Helvetica').text(islem.musteriAdi)
        doc.text(`Telefon: ${islem.telefon}`)

        // --- Hizmet Kalemleri ---
        doc.moveDown(2)
        doc.font('Helvetica-Bold').text('Aciklama', 50, doc.y, { continued: true })
        doc.text('Tutar', 450, doc.y, { align: 'right' })

        doc.moveTo(50, doc.y + 15).lineTo(550, doc.y + 15).stroke()
        doc.moveDown(1.5)

        doc.font('Helvetica').text(islem.hizmet, 50, doc.y, { continued: true })
        doc.text(`${islem.tutar} TL`, 450, doc.y, { align: 'right' })

        // --- Toplam ---
        doc.moveTo(50, doc.y + 15).lineTo(550, doc.y + 15).stroke()
        doc.moveDown(1.5)
        doc.font('Helvetica-Bold').text('GENEL TOPLAM:', 300, doc.y, { continued: true })
        doc.text(`${islem.tutar} TL`, 450, doc.y, { align: 'right' })

        // Alt Bilgi
        doc.moveDown(4)
        doc.fontSize(8).font('Helvetica-Oblique').text('Bu fatura otomatik kepenk.ai tarafindan uretilmistir.', { align: 'center' })

        doc.end()

        stream.on('finish', () => resolve(dosyaYolu))
        stream.on('error', (err) => reject(err))
    })
}
