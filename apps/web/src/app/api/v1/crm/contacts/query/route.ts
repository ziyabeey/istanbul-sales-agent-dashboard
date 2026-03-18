/**
 * Contact Query API (Advanced FilterExpression)
 * ───────────────────────────────────────────────
 * POST /api/v1/crm/contacts/query — Run complex filter query
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { evaluateFilter } from '@/lib/crm/filterEngine'

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    const { filter, limit: reqLimit, offset: reqOffset, sortBy, sortDir } = body

    if (!filter) return NextResponse.json({ error: 'filter gerekli' }, { status: 400 })

    const limit = Math.min(reqLimit || 25, 100)
    const offset = reqOffset || 0

    const allContacts = await adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('contacts').get()

    let contacts = allContacts.docs
      .map((d: any) => ({ id: d.id, ...d.data() }))
      .filter((c: any) => evaluateFilter(c, filter))

    // Sort
    if (sortBy) {
      contacts.sort((a: any, b: any) => {
        const aVal = a[sortBy] ?? ''
        const bVal = b[sortBy] ?? ''
        const cmp = aVal > bVal ? 1 : aVal < bVal ? -1 : 0
        return sortDir === 'asc' ? cmp : -cmp
      })
    }

    const total = contacts.length
    const paged = contacts.slice(offset, offset + limit)

    return NextResponse.json({
      ok: true,
      contacts: paged,
      total,
      pagination: { total, limit, offset, hasMore: offset + limit < total },
    })
  } catch (error: any) {
    return NextResponse.json({ error: 'Sorgu başarısız', detay: error.message }, { status: 500 })
  }
}
