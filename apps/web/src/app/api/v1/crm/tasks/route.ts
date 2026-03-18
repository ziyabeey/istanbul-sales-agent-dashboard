/**
 * Tasks API — CRUD
 * ─────────────────
 * GET  /api/v1/crm/tasks — List tasks
 * POST /api/v1/crm/tasks — Create task
 * PUT  /api/v1/crm/tasks — Update task
 * DELETE /api/v1/crm/tasks — Delete task
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
    const status = searchParams.get('status') || undefined
    const contactId = searchParams.get('contactId') || undefined

    let query = adminDb
      .collection('esnaflar').doc(esnafId)
      .collection('tasks')
      .orderBy('createdAt', 'desc')
      .limit(50) as any

    if (status) query = query.where('status', '==', status)
    if (contactId) query = query.where('contactId', '==', contactId)

    const snapshot = await query.get()
    const tasks = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))

    return NextResponse.json({ ok: true, tasks })
  } catch (error: any) {
    return NextResponse.json({ error: 'Görevler getirilemedi', detay: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    if (!body.title) return NextResponse.json({ error: 'title gerekli' }, { status: 400 })

    const now = new Date().toISOString()
    const task = {
      id: uuidv4(),
      esnafId,
      contactId: body.contactId || undefined,
      title: body.title.substring(0, 120),
      description: body.description?.substring(0, 500) || undefined,
      status: 'todo',
      priority: body.priority || 'medium',
      dueDate: body.dueDate || undefined,
      reminderAt: body.reminderAt || undefined,
      assignedTo: body.assignedTo || undefined,
      automationId: body.automationId || undefined,
      createdAt: now,
    }

    await adminDb.collection('esnaflar').doc(esnafId).collection('tasks').doc(task.id).set(task)

    // Log activity if linked to contact
    if (task.contactId) {
      await adminDb.collection('esnaflar').doc(esnafId).collection('contact_activities').add({
        contactId: task.contactId, esnafId, type: 'task.created',
        data: { taskId: task.id, title: task.title },
        createdAt: now,
      })
    }

    return NextResponse.json({ ok: true, task }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Görev oluşturulamadı', detay: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    const { id, ...updates } = body
    if (!id) return NextResponse.json({ error: 'id gerekli' }, { status: 400 })

    if (updates.status === 'done') updates.completedAt = new Date().toISOString()

    await adminDb.collection('esnaflar').doc(esnafId).collection('tasks').doc(id).update(updates)

    // Log activity
    const doc = await adminDb.collection('esnaflar').doc(esnafId).collection('tasks').doc(id).get()
    if (doc.exists && doc.data()?.contactId && updates.status === 'done') {
      await adminDb.collection('esnaflar').doc(esnafId).collection('contact_activities').add({
        contactId: doc.data()?.contactId, esnafId, type: 'task.completed',
        data: { taskId: id },
        createdAt: new Date().toISOString(),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    return NextResponse.json({ error: 'Güncelleme başarısız', detay: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const body = await request.json()
    if (!body.id) return NextResponse.json({ error: 'id gerekli' }, { status: 400 })

    await adminDb.collection('esnaflar').doc(esnafId).collection('tasks').doc(body.id).delete()
    return NextResponse.json({ ok: true, mesaj: 'Görev silindi' })
  } catch (error: any) {
    return NextResponse.json({ error: 'Silme başarısız', detay: error.message }, { status: 500 })
  }
}
