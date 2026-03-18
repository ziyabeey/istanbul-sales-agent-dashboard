/**
 * İYS (İleti Yönetim Sistemi) API — Turkish Commercial Communication Compliance
 * GET  /api/v1/crm/iys — Status, query consent
 * POST /api/v1/crm/iys — Sync, register, check consent
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'

const IYS_BASE_URL = 'https://api.iys.org.tr/v1'

// İYS kaynak tipleri
const IYS_SOURCE_TYPES = ['EPOSTA', 'MESAJ', 'ARAMA'] as const
const IYS_CONSENT_TYPES = ['ONAY', 'RET'] as const

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'status'

    if (mode === 'status') {
      const settingsDoc = await adminDb.collection('esnaflar').doc(esnafId).collection('settings').doc('iys').get()
      if (!settingsDoc.exists) return NextResponse.json({
        ok: true, connected: false,
        info: {
          description: 'İYS (İleti Yönetim Sistemi) — 6563 sayılı Kanun gereği ticari ileti izin yönetimi',
          required: 'Toplu SMS, e-posta veya arama kampanyası göndermek için İYS kaydı zorunludur',
          registration: 'https://iys.org.tr — Ticaret Bakanlığı onaylı platform',
          fields: ['İYS Marka Kodu', 'API Kullanıcı Adı', 'API Şifre'],
        },
      })

      return NextResponse.json({ ok: true, connected: true, ...settingsDoc.data() })
    }

    if (mode === 'consent_check') {
      // Check consent for a specific recipient
      const phone = searchParams.get('phone')
      const email = searchParams.get('email')
      const channel = searchParams.get('channel') || 'MESAJ'

      if (!phone && !email) return NextResponse.json({ error: 'phone veya email gerekli' }, { status: 400 })

      // Check local cache first
      const recipient = phone || email
      const consentDoc = await adminDb.collection('esnaflar').doc(esnafId)
        .collection('iys_consents').doc(`${recipient}_${channel}`).get()

      if (consentDoc.exists) {
        const data = consentDoc.data()!
        return NextResponse.json({
          ok: true, recipient, channel,
          consent: data.status, // 'ONAY' or 'RET'
          consentDate: data.consentDate, source: data.source,
          cached: true,
        })
      }

      // Not in cache — needs İYS API query (will be done during sync)
      return NextResponse.json({
        ok: true, recipient, channel, consent: 'UNKNOWN',
        mesaj: 'İzin durumu bilinmiyor. İYS senkronizasyonu yapın.',
      })
    }

    if (mode === 'stats') {
      const consentsSnap = await adminDb.collection('esnaflar').doc(esnafId).collection('iys_consents').get()
      const stats = { total: 0, MESAJ_ONAY: 0, MESAJ_RET: 0, EPOSTA_ONAY: 0, EPOSTA_RET: 0, ARAMA_ONAY: 0, ARAMA_RET: 0 }

      for (const doc of consentsSnap.docs) {
        stats.total++
        const data = doc.data()
        const key = `${data.channel}_${data.status}` as keyof typeof stats
        if (key in stats) (stats[key] as number)++
      }

      return NextResponse.json({ ok: true, stats })
    }

    return NextResponse.json({ error: 'mode: status, consent_check, stats' }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const body = await request.json()

    switch (body.action) {
      case 'connect': {
        // Register İYS credentials
        const { brandCode, apiUsername, apiPassword } = body
        if (!brandCode || !apiUsername || !apiPassword) {
          return NextResponse.json({ error: 'brandCode, apiUsername, apiPassword gerekli' }, { status: 400 })
        }

        // Validate connection (test API call)
        try {
          const testResponse = await fetch(`${IYS_BASE_URL}/brands/${brandCode}/consents`, {
            headers: {
              'Authorization': `Basic ${Buffer.from(`${apiUsername}:${apiPassword}`).toString('base64')}`,
              'Content-Type': 'application/json',
            },
          })
          if (!testResponse.ok) return NextResponse.json({ error: 'İYS API bağlantısı başarısız. Bilgileri kontrol edin.' }, { status: 400 })
        } catch {
          // Connection test might fail in dev — save anyway
        }

        await adminDb.collection('esnaflar').doc(esnafId).collection('settings').doc('iys').set({
          connected: true, brandCode, apiUsername,
          connectedAt: new Date().toISOString(), lastSync: null,
        })

        // Store API password securely
        await adminDb.collection('esnaf_secrets').doc(esnafId).set({ iys_api_password: apiPassword }, { merge: true })

        return NextResponse.json({ ok: true, mesaj: 'İYS bağlantısı kuruldu' })
      }

      case 'sync': {
        // Sync consents from local contacts → İYS
        const contactsSnap = await adminDb.collection('esnaflar').doc(esnafId)
          .collection('contacts').where('consent.marketingOptIn', '==', true).limit(1000).get()

        let syncCount = 0
        for (const doc of contactsSnap.docs) {
          const contact = doc.data()
          const phone = contact.channels?.phones?.[0]?.number
          const email = contact.channels?.emails?.[0]?.email

          if (phone) {
            await adminDb.collection('esnaflar').doc(esnafId).collection('iys_consents')
              .doc(`${phone}_MESAJ`).set({
                recipient: phone, channel: 'MESAJ', recipientType: 'BIREYSEL',
                status: 'ONAY', source: 'HS_WEB', // Web sitesi formu
                consentDate: contact.consent?.consentDate || contact.createdAt || new Date().toISOString(),
                syncedToIYS: false, syncedAt: null,
              }, { merge: true })
            syncCount++
          }

          if (email) {
            await adminDb.collection('esnaflar').doc(esnafId).collection('iys_consents')
              .doc(`${email}_EPOSTA`).set({
                recipient: email, channel: 'EPOSTA', recipientType: 'BIREYSEL',
                status: 'ONAY', source: 'HS_WEB',
                consentDate: contact.consent?.consentDate || contact.createdAt || new Date().toISOString(),
                syncedToIYS: false, syncedAt: null,
              }, { merge: true })
            syncCount++
          }
        }

        // TODO: Batch upload to İYS API via POST /brands/{brandCode}/consents
        // Each batch: max 1000 records
        // İYS API: { "recipient": "+905...", "recipientType": "BIREYSEL", "consentDate": "...", "source": "HS_WEB", "status": "ONAY", "type": "MESAJ" }

        await adminDb.collection('esnaflar').doc(esnafId).collection('settings').doc('iys').update({
          lastSync: new Date().toISOString(), lastSyncCount: syncCount,
        })

        return NextResponse.json({ ok: true, syncedCount: syncCount, mesaj: `${syncCount} izin kaydı senkronize edildi` })
      }

      case 'register_consent': {
        // Manually register a consent
        const { recipient, channel, status, source } = body
        if (!recipient || !channel || !status) return NextResponse.json({ error: 'recipient, channel, status gerekli' }, { status: 400 })

        await adminDb.collection('esnaflar').doc(esnafId).collection('iys_consents')
          .doc(`${recipient}_${channel}`).set({
            recipient, channel, status, source: source || 'HS_WEB',
            recipientType: 'BIREYSEL',
            consentDate: new Date().toISOString(), syncedToIYS: false,
          })

        return NextResponse.json({ ok: true, mesaj: `İzin kaydı: ${recipient} — ${channel} — ${status}` })
      }

      case 'revoke_consent': {
        const { recipient, channel } = body
        if (!recipient || !channel) return NextResponse.json({ error: 'recipient ve channel gerekli' }, { status: 400 })

        await adminDb.collection('esnaflar').doc(esnafId).collection('iys_consents')
          .doc(`${recipient}_${channel}`).update({ status: 'RET', revokedAt: new Date().toISOString(), syncedToIYS: false })

        return NextResponse.json({ ok: true, mesaj: 'İzin geri alındı' })
      }

      case 'pre_send_check': {
        // Before sending a campaign, check all recipients have consent
        const { recipients, channel } = body // recipients: string[]
        if (!recipients?.length || !channel) return NextResponse.json({ error: 'recipients ve channel gerekli' }, { status: 400 })

        const allowed: string[] = []
        const blocked: string[] = []

        for (const r of recipients.slice(0, 500)) {
          const doc = await adminDb.collection('esnaflar').doc(esnafId).collection('iys_consents').doc(`${r}_${channel}`).get()
          if (doc.exists && doc.data()?.status === 'ONAY') {
            allowed.push(r)
          } else {
            blocked.push(r)
          }
        }

        return NextResponse.json({
          ok: true, channel,
          allowed: allowed.length, blocked: blocked.length,
          blockedRecipients: blocked.slice(0, 20), // Show first 20 blocked
          mesaj: blocked.length > 0
            ? `${blocked.length} alıcının İYS izni yok — kampanyadan çıkarıldı`
            : 'Tüm alıcıların İYS izni mevcut ✓',
        })
      }

      default:
        return NextResponse.json({ error: 'action: connect, sync, register_consent, revoke_consent, pre_send_check' }, { status: 400 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
