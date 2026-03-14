import { NextResponse } from 'next/server'
import { adminDb, Timestamp } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'
import twilio from 'twilio'

export async function GET(request: Request) {
    const guard = await apiGuard(request, { requireAdminToken: true })
    if (!guard.ok) return guard.response

    if (!adminDb) {
        return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
    }

    try {
        const snap = await adminDb
            .collection('numeraHavuzu')
            .orderBy('olusturma', 'desc')
            .get()

        const numaralar = snap.docs.map((doc: any) => {
            const d = doc.data()
            return {
                id: doc.id,
                numara: d.numara,
                durum: d.durum,
                atananEsnafId: d.atananEsnafId || null,
                atananEsnafAd: d.atananEsnafAd || null,
                twilioWebhook: d.twilioWebhook || null,
                twilioSid: d.twilioSid || null,
                olusturma: d.olusturma?.toDate?.()?.toISOString() ?? null,
                kaynak: d.kaynak || 'twilio',
            }
        })

        return NextResponse.json({ numaralar })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(request: Request) {
    const guard = await apiGuard(request, { requireAdminToken: true })
    if (!guard.ok) return guard.response

    if (!adminDb) {
        return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN

    if (!accountSid || !authToken) {
        return NextResponse.json({ error: 'Twilio credentials eksik' }, { status: 500 })
    }

    try {
        const client = twilio(accountSid, authToken)
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://kepenk.ai'

        // 1. Kullanılabilir numara ara (TR, sonra US fallback)
        let phoneNumber: string | null = null
        try {
            const trNumbers = await client.availablePhoneNumbers('TR').local.list({
                smsEnabled: true,
                limit: 1,
            })
            if (trNumbers.length > 0) {
                phoneNumber = trNumbers[0].phoneNumber
            }
        } catch {
            // TR numaraları bu hesapta desteklenmeyebilir
        }

        if (!phoneNumber) {
            const usNumbers = await client.availablePhoneNumbers('US').local.list({
                smsEnabled: true,
                limit: 1,
            })
            if (usNumbers.length === 0) {
                return NextResponse.json({ error: 'Kullanılabilir numara bulunamadı' }, { status: 409 })
            }
            phoneNumber = usNumbers[0].phoneNumber
        }

        // 2. Numarayı satın al, webhook set et
        const purchased = await client.incomingPhoneNumbers.create({
            phoneNumber,
            smsUrl: `${appUrl}/api/whatsapp`,
            smsMethod: 'POST',
        })

        // 3. Firestore'a kaydet
        const ref = await adminDb.collection('numeraHavuzu').add({
            numara: purchased.phoneNumber,
            twilioSid: purchased.sid,
            durum: 'bosta',
            atananEsnafId: null,
            atananEsnafAd: null,
            twilioWebhook: `${appUrl}/api/whatsapp`,
            olusturma: Timestamp.now(),
            kaynak: 'twilio_api',
        })

        return NextResponse.json({ ok: true, numara: purchased.phoneNumber, id: ref.id })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
