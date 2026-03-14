import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import logger from '@/utils/logger'

// Personel Ekle / Listele (Performans Karnesi ile)
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const esnafId = searchParams.get('esnafId')

    if (!esnafId) return NextResponse.json({ error: 'Esnaf ID gerekli' }, { status: 400 })

    try {
        const pDocs = await adminDb.collection('personel').where('esnafId', '==', esnafId).get()
        const personeller = pDocs.docs.map((d: any) => ({ id: d.id, ...d.data() }))

        // Performans Hesaplaması (Bu Ayın Randevuları)
        const simdi = new Date()
        const ayBasi = new Date(simdi.getFullYear(), simdi.getMonth(), 1)

        const rQuery = await adminDb.collection('randevular')
            .where('esnafId', '==', esnafId)
            .where('tarih', '>=', Timestamp.fromDate(ayBasi))
            .get()

        const randevular = rQuery.docs.map((d: any) => d.data())

        const veriListe = personeller.map((p: any) => {
            const ustayaAit = randevular.filter((r: any) => r.personelId === p.id)
            const toplamCiro = ustayaAit.reduce((acc: number, r: any) => acc + (r.hizmetBedeli || 0), 0)
            const hizmetSayisi = ustayaAit.length

            // Sadık Müşteri: Aynı ustaya 2'den fazla gelenler (Basit metrik)
            const musteriSayimlari = ustayaAit.reduce((acc: any, r: any) => {
                acc[r.musteriNumara] = (acc[r.musteriNumara] || 0) + 1
                return acc
            }, {})
            const bagliMusteriler = Object.values(musteriSayimlari).filter((c: any) => c >= 2).length

            // Hakediş: Maaş + (Ciro * (Prim Yüzdesi / 100))
            const hakedis = (p.aylikMaas || 0) + (toplamCiro * ((p.primYuzdesi || 0) / 100))

            return {
                ...p,
                performans: {
                    toplamCiro,
                    hizmetSayisi,
                    bagliMusteriler,
                    hakedis: Math.round(hakedis)
                }
            }
        })

        return NextResponse.json(veriListe)
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { esnafId, ad, unvan, primYuzdesi, aylikMaas } = body

        if (!esnafId || !ad) return NextResponse.json({ error: 'Eksik bilgi' }, { status: 400 })

        const yeniRef = await adminDb.collection('personel').add({
            esnafId,
            ad,
            unvan: unvan || 'Personel',
            primYuzdesi: Number(primYuzdesi) || 0,
            aylikMaas: Number(aylikMaas) || 0,
            olusturma: Timestamp.now()
        })

        await logger.logYaz(esnafId, 'info', 'Personel Eklendi', `${ad} isimli ${unvan} sisteme eklendi.`)

        return NextResponse.json({ ok: true, id: yeniRef.id })
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
