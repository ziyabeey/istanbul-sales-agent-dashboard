/**
 * Mevcut esnaflar için tek seferlik migrasyon scripti.
 * Tüm esnaflar dokümanlarına telefonTemiz field'ı ekler.
 *
 * Çalıştır:
 *   npx tsx scripts/migrasyonTelefonTemiz.ts
 */
import { adminDb } from '../src/lib/firebaseAdmin'

async function main() {
  if (!adminDb) {
    console.error('Firestore bağlantısı kurulamadı. GOOGLE_APPLICATION_CREDENTIALS kontrol edin.')
    process.exit(1)
  }

  const snapshot = await adminDb.collection('esnaflar').get()
  console.log(`${snapshot.size} esnaf bulundu`)

  const batch = adminDb.batch()
  let guncellenenSayisi = 0

  snapshot.docs.forEach((doc: FirebaseFirestore.QueryDocumentSnapshot) => {
    const data = doc.data()
    if (data.telefonTemiz) return // zaten var

    const telefon: string = data.telefon ?? ''
    const telefonTemiz = telefon.replace(/[^0-9]/g, '')

    if (telefonTemiz) {
      batch.update(doc.ref, { telefonTemiz })
      guncellenenSayisi++
    }
  })

  if (guncellenenSayisi === 0) {
    console.log('Tüm esnafların telefonTemiz alanı zaten mevcut.')
    return
  }

  await batch.commit()
  console.log(`✅ ${guncellenenSayisi} esnaf güncellendi`)
}

main().catch(err => {
  console.error('Migrasyon hatası:', err)
  process.exit(1)
})
