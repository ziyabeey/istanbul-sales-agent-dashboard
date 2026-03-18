/**
 * Booking Services API — CRUD
 * ────────────────────────────
 * GET  /api/v1/bookings/services — List services
 * POST /api/v1/bookings/services — Create service (+ sector templates)
 */

import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const sectorId = searchParams.get('sectorId')

    let query: any = adminDb.collection('esnaflar').doc(esnafId).collection('booking_services')
    if (status) query = query.where('status', '==', status)
    if (sectorId) query = query.where('sectorId', '==', sectorId)

    const snapshot = await query.orderBy('sortOrder', 'asc').get()
    const services = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() }))

    return NextResponse.json({ ok: true, services, count: services.length })
  } catch (error: any) {
    return NextResponse.json({ error: 'Hizmetler getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()

    // Sector template mode
    if (body.mode === 'from_template') {
      const sectorTemplates: Record<string, { name: string; duration: number; price: number; type?: string; bufferAfter?: number }[]> = {
        berber: [
          { name: 'Saç Kesimi', duration: 30, price: 150 },
          { name: 'Sakal Tıraşı', duration: 20, price: 100 },
          { name: 'Saç + Sakal', duration: 45, price: 220 },
          { name: 'Çocuk Saç Kesimi', duration: 20, price: 100 },
        ],
        kuafor: [
          { name: 'Kesim', duration: 45, price: 300 },
          { name: 'Fön', duration: 30, price: 200 },
          { name: 'Kesim + Fön', duration: 60, price: 450 },
          { name: 'Boya', duration: 90, price: 600 },
        ],
        doktor: [
          { name: 'Genel Muayene', duration: 20, price: 500, bufferAfter: 5 },
          { name: 'Kontrol Muayenesi', duration: 15, price: 300 },
        ],
        tamirci: [
          { name: 'Yağ Değişimi', duration: 30, price: 400, bufferAfter: 15 },
          { name: 'Fren Bakımı', duration: 60, price: 300 },
          { name: 'Genel Kontrol', duration: 45, price: 200 },
        ],
      }
      const templates = sectorTemplates[body.sectorId]
      if (!templates) return NextResponse.json({ error: 'Bu sektör için şablon bulunamadı' }, { status: 404 })

      const now = new Date().toISOString()
      const batch = adminDb.batch()
      const created: any[] = []

      templates.forEach((t: { name: string; duration: number; price: number; type?: string; bufferAfter?: number }, i: number) => {
        const service = {
          id: uuidv4(),
          esnafId,
          revision: 1,
          name: t.name,
          slug: turkSlug(t.name),
          type: (t as any).type || 'appointment',
          sectorId: body.sectorId,
          duration: t.duration,
          bufferBefore: 0,
          bufferAfter: t.bufferAfter || 0,
          capacity: { min: 1, max: (t as any).type === 'class' ? 15 : 1 },
          pricing: { type: 'fixed', basePrice: t.price, currency: 'TRY', paymentTiming: 'in_person' },
          staffIds: [],
          staffSelectionMode: 'any_available',
          location: { type: 'business' },
          images: [],
          status: 'active',
          sortOrder: i,
          createdAt: now,
          updatedAt: now,
        }
        const ref = adminDb.collection('esnaflar').doc(esnafId).collection('booking_services').doc(service.id)
        batch.set(ref, service)
        created.push(service)
      })

      await batch.commit()
      return NextResponse.json({ ok: true, created: created.length, services: created }, { status: 201 })
    }

    // Single service creation
    if (!body.name || !body.duration) {
      return NextResponse.json({ error: 'name ve duration gerekli' }, { status: 400 })
    }

    // Limit
    const countRes = await adminDb.collection('esnaflar').doc(esnafId).collection('booking_services').count().get()
    if (countRes.data().count >= 100) {
      return NextResponse.json({ error: 'Maksimum 100 hizmet oluşturulabilir' }, { status: 422 })
    }

    const now = new Date().toISOString()
    const service = {
      id: uuidv4(),
      esnafId,
      revision: 1,
      name: body.name,
      slug: turkSlug(body.name),
      description: body.description,
      shortDescription: body.shortDescription,
      type: body.type || 'appointment',
      sectorId: body.sectorId || 'default',
      categoryId: body.categoryId,
      duration: body.duration,
      bufferBefore: body.bufferBefore || 0,
      bufferAfter: body.bufferAfter || 0,
      capacity: body.capacity || { min: 1, max: 1 },
      pricing: body.pricing || { type: 'fixed', basePrice: 0, currency: 'TRY', paymentTiming: 'in_person' },
      staffIds: body.staffIds || [],
      staffSelectionMode: body.staffSelectionMode || 'any_available',
      requiredResources: body.requiredResources,
      location: body.location || { type: 'business' },
      intakeForm: body.intakeForm,
      policyId: body.policyId,
      images: body.images || [],
      seo: body.seo,
      status: body.status || 'draft',
      sortOrder: body.sortOrder || 0,
      createdAt: now,
      updatedAt: now,
    }

    await adminDb.collection('esnaflar').doc(esnafId).collection('booking_services').doc(service.id).set(service)
    return NextResponse.json({ ok: true, service }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Hizmet oluşturulamadı', detay: error.message }, { status: 500 })
  }
}

function turkSlug(text: string): string {
  const map: Record<string, string> = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u', 'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u' }
  let s = text.toLowerCase()
  for (const [k, v] of Object.entries(map)) s = s.replace(new RegExp(k, 'g'), v)
  return s.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}
