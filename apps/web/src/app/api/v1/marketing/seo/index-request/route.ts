/**
 * IndexNow Trigger API
 * ─────────────────────
 * POST /api/v1/marketing/seo/index-request — Trigger indexing
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { submitIndexNow } from '@/lib/seo/metaTagEngine'

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    const { urls, mode } = body

    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    const domain = esnafDoc.data()?.domain

    if (!domain) return NextResponse.json({ error: 'Domain tanımlı değil' }, { status: 422 })

    let urlsToIndex: string[] = []

    if (mode === 'all') {
      // Index all pages
      const pagesSnap = await adminDb.collection('esnaflar').doc(esnafId).collection('pages').get()
      urlsToIndex = pagesSnap.docs.map((d: any) => `https://${domain}/${d.data().slug || ''}`)

      // Also products
      const productsSnap = await adminDb.collection('esnaflar').doc(esnafId).collection('products').limit(100).get()
      urlsToIndex.push(...productsSnap.docs.map((d: any) => `https://${domain}/urunler/${d.data().slug || d.id}`))
    } else if (urls && Array.isArray(urls)) {
      urlsToIndex = urls.map((u: string) => u.startsWith('http') ? u : `https://${domain}${u}`)
    } else {
      return NextResponse.json({ error: 'urls array veya mode:"all" gerekli' }, { status: 400 })
    }

    if (urlsToIndex.length === 0) {
      return NextResponse.json({ error: 'İndekslenecek URL bulunamadı' }, { status: 422 })
    }

    // Limit to 10000 per batch (IndexNow limit)
    const batch = urlsToIndex.slice(0, 10000)

    // Generate or fetch IndexNow API key
    let apiKey = esnafDoc.data()?.indexNowKey
    if (!apiKey) {
      apiKey = crypto.randomUUID().replace(/-/g, '')
      await adminDb.collection('esnaflar').doc(esnafId).update({ indexNowKey: apiKey })
    }

    await submitIndexNow(batch, apiKey)

    // Log
    await adminDb.collection('esnaflar').doc(esnafId).collection('index_requests').add({
      urlCount: batch.length,
      mode: mode || 'manual',
      submittedAt: new Date().toISOString(),
    })

    return NextResponse.json({
      ok: true,
      mesaj: `${batch.length} URL indexleme için bildirildi (Bing + Yandex)`,
      urlCount: batch.length,
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'IndexNow başarısız', detay: error.message }, { status: 500 })
  }
}
