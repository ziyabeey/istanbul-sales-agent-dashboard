/**
 * QR Sipariş Sayfası — Müşteri Arayüzü
 *
 * Masa üstündeki QR okutulunca açılır. Üyelik YASAK — anında sipariş.
 * Mobile-first, app-like UX, Framer Motion animasyonlar.
 */

import { adminDb } from '@/lib/firebaseAdmin'
import QrSiparisClient from './QrSiparisClient'

interface PageProps {
    params: Promise<{ domain: string; masa_no: string }>
}

// Server Component — katalog çek
export default async function QrSiparisPage({ params }: PageProps) {
    const { domain, masa_no } = await params
    const masaNo = parseInt(masa_no, 10)

    if (isNaN(masaNo) || masaNo < 1) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
                <p className="text-red-400 text-lg">Geçersiz masa numarası</p>
            </div>
        )
    }

    // Esnafı domain'den bul
    let esnafId = ''
    let esnafAd = ''
    let katalogItems: Array<{
        id: string
        ad: string
        aciklama?: string
        fiyatKurus: number
        kategori: string
        kdvTipi: string
        gorselUrl?: string | null
        spikeFlags?: { vegan?: boolean; glutensiz?: boolean; acili?: boolean }
    }> = []

    if (adminDb) {
        const esnafSnap = await adminDb
            .collection('esnaflar')
            .where('subdomain', '==', domain)
            .limit(1)
            .get()

        if (!esnafSnap.empty) {
            const esnafDoc = esnafSnap.docs[0]
            esnafId = esnafDoc.id
            esnafAd = esnafDoc.data().ad || domain

            const katalogSnap = await adminDb
                .collection('esnaflar')
                .doc(esnafId)
                .collection('katalog')
                .where('aktif', '==', true)
                .orderBy('kategori')
                .limit(300)
                .get()

            katalogItems = katalogSnap.docs.map((d: FirebaseFirestore.QueryDocumentSnapshot) => ({
                id: d.id,
                ...d.data() as {
                    ad: string
                    aciklama?: string
                    fiyatKurus: number
                    kategori: string
                    kdvTipi: string
                    gorselUrl?: string | null
                    spikeFlags?: { vegan?: boolean; glutensiz?: boolean; acili?: boolean }
                },
            }))
        }
    }

    if (!esnafId) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
                <p className="text-neutral-400 text-lg">Restoran bulunamadı</p>
            </div>
        )
    }

    return (
        <QrSiparisClient
            esnafId={esnafId}
            esnafAd={esnafAd}
            masaNo={masaNo}
            katalog={katalogItems}
        />
    )
}
