import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'

// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: '.env.local' })

initializeApp({
    credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
})

const db = getFirestore()

async function seed() {
    console.log('🌱 Firestore seed başlıyor...')

    // ─── 3 Mock Esnaf ───────────────────────────────────────────────────────

    const esnaflar = [
        {
            ad: 'Ahmet', unvan: 'Usta', sektor: 'elektrikci',
            telefon: '+905551001001', waNumarasi: '+905551001001',
            adres: 'Moda Cad. No:12', sehir: 'İstanbul', ilce: 'Kadıköy',
            subdomain: 'ahmet-elektrik', subdomainUrl: 'https://ahmet-elektrik.kepenk.ai',
            paket: 'STANDART', durum: 'aktif', churnSkoru: 12,
            kayitTarihi: Timestamp.now(),
            yenilenmeTarihi: Timestamp.fromDate(new Date(Date.now() + 30 * 86400000)),
            bildirimAyarlari: { sabahMesaji: true, olumsuzYorum: true, haftalikRapor: true },
            wpSiteId: 2,
            instagramUsername: 'ahmet_elektrik_kadikoy',
            instagramUrl: 'https://instagram.com/ahmet_elektrik_kadikoy',
            instagramTakipci: 234,
            facebookUrl: null,
        },
        {
            ad: 'Fatma', unvan: 'Hanım', sektor: 'kuafor',
            telefon: '+905552002002', waNumarasi: '+905552002002',
            adres: 'İstiklal Cad. No:45', sehir: 'İstanbul', ilce: 'Beyoğlu',
            subdomain: 'fatma-guzellik', subdomainUrl: 'https://fatma-guzellik.kepenk.ai',
            paket: 'BUYUME', durum: 'aktif', churnSkoru: 8,
            kayitTarihi: Timestamp.now(),
            yenilenmeTarihi: Timestamp.fromDate(new Date(Date.now() + 25 * 86400000)),
            bildirimAyarlari: { sabahMesaji: true, olumsuzYorum: true, haftalikRapor: false },
            wpSiteId: 3,
            instagramUsername: 'fatma_guzellik_beyoglu',
            instagramUrl: 'https://instagram.com/fatma_guzellik_beyoglu',
            instagramTakipci: 812,
            facebookUrl: 'https://facebook.com/fatmaguzellik',
        },
        {
            ad: 'Mehmet', unvan: 'Usta', sektor: 'tesisatci',
            telefon: '+905553003003', waNumarasi: '+905553003003',
            adres: 'Bağdat Cad. No:78', sehir: 'İstanbul', ilce: 'Maltepe',
            subdomain: 'mehmet-tesisat', subdomainUrl: 'https://mehmet-tesisat.kepenk.ai',
            paket: 'TEMEL', durum: 'riskli', churnSkoru: 78,
            kayitTarihi: Timestamp.now(),
            yenilenmeTarihi: Timestamp.fromDate(new Date(Date.now() + 5 * 86400000)),
            bildirimAyarlari: { sabahMesaji: false, olumsuzYorum: true, haftalikRapor: false },
            wpSiteId: 4,
            instagramUsername: null,
            instagramUrl: null,
            instagramTakipci: null,
            facebookUrl: null,
        },
    ]

    const esnafIds: string[] = []
    for (const esnaf of esnaflar) {
        const ref = await db.collection('esnaflar').add(esnaf)
        esnafIds.push(ref.id)
        console.log(`  ✅ Esnaf: ${esnaf.ad} (${ref.id})`)
    }

    // ─── 5 Mock Lead ────────────────────────────────────────────────────────

    const leadler = [
        {
            isletmeAdi: 'Yıldız Boyacı', telefon: '+905554001001', sektor: 'boyaci', ilce: 'Üsküdar',
            googlePuani: 3.2, yorumSayisi: 4, websiteVar: false,
            instagramUsername: 'yildiz_boyaci', instagramVarMi: true,
            instagramTakipci: 89, instagramSonGonderiGunu: 45, instagramKalitePuani: 23,
            iletisimKanallari: { whatsapp: '+905554001001', instagram: 'https://instagram.com/yildiz_boyaci' },
            onerilenKanal: 'whatsapp',
            oncelikSkoru: 88, sicaklik: 'HOT', durum: 'yeni', olusturanAjan: 'lead_madencisi', zaman: Timestamp.now()
        },
        {
            isletmeAdi: 'Güler Kuaför', telefon: '+905554002002', sektor: 'kuafor', ilce: 'Şişli',
            googlePuani: 4.1, yorumSayisi: 7, websiteVar: false,
            instagramUsername: null, instagramVarMi: false,
            instagramTakipci: null, instagramSonGonderiGunu: null, instagramKalitePuani: 25,
            iletisimKanallari: { whatsapp: '+905554002002' },
            onerilenKanal: 'whatsapp',
            oncelikSkoru: 65, sicaklik: 'WARM', durum: 'yeni', olusturanAjan: 'lead_madencisi', zaman: Timestamp.now()
        },
        {
            isletmeAdi: 'Demirci Elektrik', telefon: '+905554003003', sektor: 'elektrikci', ilce: 'Fatih',
            googlePuani: 2.8, yorumSayisi: 2, websiteVar: false,
            instagramUsername: 'demirci_elektrik', instagramVarMi: true,
            instagramTakipci: 43, instagramSonGonderiGunu: 90, instagramKalitePuani: 28,
            iletisimKanallari: { instagram: 'https://instagram.com/demirci_elektrik' },
            onerilenKanal: 'instagram_dm',
            oncelikSkoru: 92, sicaklik: 'HOT', durum: 'yeni', olusturanAjan: 'lead_madencisi', zaman: Timestamp.now()
        },
        {
            isletmeAdi: 'Aydın Camcı', telefon: '+905554004004', sektor: 'camci', ilce: 'Pendik',
            googlePuani: 3.8, yorumSayisi: 11, websiteVar: true,
            instagramUsername: null, instagramVarMi: false,
            instagramTakipci: null, instagramSonGonderiGunu: null, instagramKalitePuani: 25,
            iletisimKanallari: {},
            onerilenKanal: 'telefon',
            oncelikSkoru: 42, sicaklik: 'WARM', durum: 'yeni', olusturanAjan: 'lead_madencisi', zaman: Timestamp.now()
        },
        {
            isletmeAdi: 'Kaya Tesisat', telefon: '+905554005005', sektor: 'tesisatci', ilce: 'Kartal',
            googlePuani: 4.5, yorumSayisi: 22, websiteVar: false,
            instagramUsername: 'kaya_tesisat_kartal', instagramVarMi: true,
            instagramTakipci: 156, instagramSonGonderiGunu: 12, instagramKalitePuani: 8,
            iletisimKanallari: { whatsapp: '+905554005005', instagram: 'https://instagram.com/kaya_tesisat_kartal' },
            onerilenKanal: 'whatsapp',
            oncelikSkoru: 35, sicaklik: 'COLD', durum: 'yeni', olusturanAjan: 'lead_madencisi', zaman: Timestamp.now()
        },
    ]

    for (const lead of leadler) {
        await db.collection('leads').add(lead)
        console.log(`  ✅ Lead: ${lead.isletmeAdi} (${lead.onerilenKanal})`)
    }

    // ─── 2 Mock Yorum ───────────────────────────────────────────────────────

    const yorumlar = [
        {
            esnafId: esnafIds[0] || 'ESNAF_1',
            platform: 'google', yildiz: 2,
            metin: 'Çok geç geldiler, iş kalitesi kötüydü.',
            yazarAdi: 'Ali K.', tarih: Timestamp.now(),
            sistemYaniti: 'Ali Bey, yaşadığınız olumsuz deneyim için özür dileriz. Sizi arayacağız.',
            yanitDurumu: 'bekliyor', yanitZamani: null,
        },
        {
            esnafId: esnafIds[0] || 'ESNAF_1',
            platform: 'facebook', yildiz: 1,
            metin: 'Söyledikleri fiyatı tutturmadılar.',
            yazarAdi: 'Merve S.', tarih: Timestamp.now(),
            sistemYaniti: 'Merve Hanım, fiyat konusunda haklısınız. Sizi arayacağız.',
            yanitDurumu: 'bekliyor', yanitZamani: null,
        },
    ]

    for (const yorum of yorumlar) {
        await db.collection('yorumlar').add(yorum)
        console.log(`  ✅ Yorum: ${yorum.platform} ${yorum.yildiz}⭐`)
    }

    console.log('\n✅ Seed tamamlandı!')
    process.exit(0)
}

seed().catch((err) => {
    console.error('❌ Seed hatası:', err)
    process.exit(1)
})
