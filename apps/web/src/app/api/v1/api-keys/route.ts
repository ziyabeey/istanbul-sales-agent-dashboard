/**
 * API Key Management
 * POST /api/v1/api-keys — Create/Revoke
 * GET  /api/v1/api-keys — List
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { v4 as uuidv4 } from 'uuid'

const SCOPES = [
  'products.read','products.write','orders.read','orders.write',
  'contacts.read','contacts.write','bookings.read','bookings.write',
  'campaigns.read','campaigns.write','analytics.read',
  'loyalty.read','loyalty.write','webhooks.manage',
] as const

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const snap = await adminDb.collection('esnaflar').doc(esnafId).collection('api_keys').get()
    const keys = snap.docs.map((d: any) => {
      const k = d.data()
      return { id: d.id, name: k.name, permissions: k.permissions, status: k.status, lastUsed: k.lastUsed, createdAt: k.createdAt, keyPrefix: k.keyPrefix }
    })
    return NextResponse.json({ ok: true, keys, availableScopes: SCOPES })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const body = await request.json()

    if (body.action === 'revoke' && body.keyId) {
      await adminDb.collection('esnaflar').doc(esnafId).collection('api_keys').doc(body.keyId).update({ status: 'revoked' })
      return NextResponse.json({ ok: true, mesaj: 'API key iptal edildi' })
    }

    if (!body.name || !body.permissions?.length) return NextResponse.json({ error: 'name ve permissions gerekli' }, { status: 400 })
    const countRes = await adminDb.collection('esnaflar').doc(esnafId).collection('api_keys').count().get()
    if (countRes.data().count >= 10) return NextResponse.json({ error: 'Max 10 API key' }, { status: 422 })

    const rawKey = `kpnk_${uuidv4().replace(/-/g, '')}`
    const apiKey = {
      id: uuidv4(), esnafId, name: body.name,
      keyHash: Buffer.from(rawKey).toString('base64'), // TODO: proper SHA256
      keyPrefix: rawKey.slice(0, 12) + '...',
      permissions: body.permissions.filter((p: string) => SCOPES.includes(p as any)),
      expiresAt: body.expiresAt, status: 'active',
      createdAt: new Date().toISOString(),
    }

    await adminDb.collection('esnaflar').doc(esnafId).collection('api_keys').doc(apiKey.id).set(apiKey)
    return NextResponse.json({ ok: true, key: rawKey, apiKey: { ...apiKey, keyHash: undefined }, mesaj: 'Key\'i kaydedin — tekrar gösterilmez!' }, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
