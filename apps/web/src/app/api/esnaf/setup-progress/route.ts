import { NextResponse } from 'next/server'

// In-memory store for demo — replace with DB in production
const progressStore = new Map<string, { completedTasks: string[]; dismissed: boolean }>()

export async function GET() {
    // In production, get esnafId from auth session
    const esnafId = 'demo-esnaf'
    const data = progressStore.get(esnafId) || { completedTasks: [], dismissed: false }
    return NextResponse.json(data)
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const esnafId = 'demo-esnaf'
        progressStore.set(esnafId, {
            completedTasks: body.completedTasks || [],
            dismissed: body.dismissed || false,
        })
        return NextResponse.json({ ok: true })
    } catch {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }
}
