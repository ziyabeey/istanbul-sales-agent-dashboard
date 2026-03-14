import { NextResponse } from 'next/server'
import { runAgent } from '@/agents/agentRunner'
import { adminDb } from '@/lib/firebaseAdmin'
import { rateLimitCheck } from '@/lib/rateLimiter'

// Ajan adı → slug to snake_case dönüşümü
function slugToAjanAdi(slug: string): string {
    return slug.replace(/-/g, '_')
}

// İzin verilen ajanlar (dışarıya açık olanlar)
const ACIK_AJANLAR = new Set([
    'orchestrator', 'esnaf_asistani', 'the_closer', 'the_creator',
    'sentiment_guardian', 'churn_detective', 'mesaj_mimari',
    'muzakereci', 'destek_upsell', 'degisiklik_ajani',
    'operasyon_beyni', 'reklam_asistani', 'overseer',
    'lead_madencisi', 'derin_arastirmaci', 'telefon_komutani', 'ik_ajani',
])

/**
 * POST /api/ajan/[ajanAdi]
 * Body: { esnafId?: string, input: Record<string, any> }
 *
 * Dinamik ajan çalıştırıcı — tüm ajanlar tek pattern'den erişilebilir.
 * Örnek: POST /api/ajan/churn-detective  → churn_detective ajanı
 *        POST /api/ajan/mesaj-mimari     → mesaj_mimari ajanı
 */
export async function POST(
    request: Request,
    { params }: { params: Promise<{ ajanAdi: string }> }
) {
    try {
        const { ajanAdi: ajanSlug } = await params
        const ajanAdi = slugToAjanAdi(ajanSlug)

        // İzin kontrolü
        if (!ACIK_AJANLAR.has(ajanAdi)) {
            return NextResponse.json({ error: `Ajan bulunamadı: ${ajanAdi}` }, { status: 404 })
        }

        const body = await request.json()
        const { esnafId, input = {} } = body

        // Rate limit — ajan başına dakikada kontrol
        const rl = rateLimitCheck(`ajan:${ajanAdi}:${esnafId || 'anon'}`, 'authenticated')
        if (!rl.allowed) {
            return NextResponse.json({ error: 'Rate limit aşıldı' }, { status: 429 })
        }

        // Eğer esnafId verilmişse esnaf verisini çek ve input'a ekle
        let esnafData: any = null
        if (esnafId && adminDb) {
            const doc = await adminDb.collection('esnaflar').doc(esnafId).get()
            if (doc.exists) esnafData = { id: doc.id, ...doc.data() }
        }

        const ajanInput = {
            ...input,
            esnafId: esnafId || null,
            ...(esnafData ? { esnaf: esnafData } : {}),
        }

        const cikti = await runAgent(ajanAdi, ajanInput)

        return NextResponse.json({
            ok: true,
            ajan: ajanAdi,
            cikti,
        })
    } catch (error: any) {
        console.error('[AJAN ROUTE]', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

/**
 * GET /api/ajan/[ajanAdi]
 * Ajan bilgisi ve durum sorgulama
 */
export async function GET(
    _request: Request,
    { params }: { params: Promise<{ ajanAdi: string }> }
) {
    const { ajanAdi: ajanSlug } = await params
    const ajanAdi = slugToAjanAdi(ajanSlug)

    if (!ACIK_AJANLAR.has(ajanAdi)) {
        return NextResponse.json({ error: 'Ajan bulunamadı' }, { status: 404 })
    }

    return NextResponse.json({
        ajan: ajanAdi,
        durum: 'aktif',
        aciklama: `kepenk.ai ${ajanAdi} ajanı`,
    })
}
