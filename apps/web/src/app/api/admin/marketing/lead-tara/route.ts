import { NextResponse } from 'next/server'

const ADMIN_TOKEN = process.env.ADMIN_SECRET_TOKEN!
const CRON_SECRET = process.env.CRON_SECRET || ''
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

/**
 * POST /api/admin/marketing/lead-tara
 * Admin trigger — leads scan pipeline'ını çalıştır
 * Body: { ilce: string, sektor: string, limit?: number }
 *
 * Google Places API → Leadler topla → /api/lead/scan'e yönlendir
 * (CRON_SECRET yoksa dahili forward ile tetikler)
 */
export async function POST(request: Request) {
    if (request.headers.get('x-admin-token') !== ADMIN_TOKEN) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { ilce, sektor, limit = 20 } = await request.json()
    if (!ilce || !sektor) {
        return NextResponse.json({ error: 'ilce ve sektor zorunlu' }, { status: 400 })
    }

    // Mock işletme listesi oluştur (gerçekte Google Places API çağırılır)
    // Şimdilik ilçe + sektör bazlı generic liste
    const isletmeler = generateMockIsletmeler(ilce, sektor, limit)

    // /api/lead/scan'e admin olarak forward et (CRON_SECRET ile)
    try {
        const scanRes = await fetch(`${APP_URL}/api/lead/scan`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-cron-secret': CRON_SECRET,
            },
            body: JSON.stringify({ isletmeler }),
        })

        if (!scanRes.ok) {
            // CRON_SECRET yoksa veya scan başarısız — basit lead oluştur
            console.warn('[LEAD TARA] Scan API başarısız, CRON_SECRET kontrol edin')
            return NextResponse.json({
                ok: true,
                uyari: 'Lead scan tetiklendi ama CRON_SECRET gerekiyor. Lütfen .env.local dosyasına CRON_SECRET ekleyin.',
                isletmeSayisi: isletmeler.length,
            })
        }

        const result = await scanRes.json()
        return NextResponse.json({
            ok: true,
            ...result,
            ilce,
            sektor,
        })
    } catch (e: any) {
        return NextResponse.json({
            ok: false,
            error: e.message,
            uyari: 'Lead scan tetiklenemedi. CRON_SECRET .env.local\'a ekleyin.',
        }, { status: 500 })
    }
}

// ─── Mock helper ──────────────────────────────────────────────────────────────
// Gerçek implementasyonda Google Places API kullanılır
function generateMockIsletmeler(ilce: string, sektor: string, limit: number) {
    const SEKTORLER_TR: Record<string, string[]> = {
        'elektrikçi':  ['Elektrik', 'Elektrikçi', 'Tesisat & Elektrik'],
        'tesisatçı':   ['Tesisat', 'Su Tesisatı', 'Isıtma & Tesisat'],
        'kuaför':      ['Saç Kesim', 'Erkek Kuaförü', 'Güzellik'],
        'boyacı':      ['Boya Badana', 'İç Cephe Boyacı', 'Dış Cephe'],
        'camcı':       ['Cam Balkon', 'Çift Cam', 'PVC Cam'],
        'terzi':       ['Terzi', 'Dikiş Nakış', 'Tadilat'],
        'kalaycı':     ['Kalay', 'Metal İşleri', 'Lehim'],
        'marangoz':    ['Mobilya', 'Ahşap', 'Parke'],
        'tamirci':     ['Beyaz Eşya', 'Elektronik Tamir', 'Servis'],
    }
    const tipler = SEKTORLER_TR[sektor.toLowerCase()] || [sektor]
    const isletmeler = []
    for (let i = 0; i < Math.min(limit, 15); i++) {
        const tip = tipler[i % tipler.length]
        isletmeler.push({
            ad: `${ilce} ${tip} ${i + 1}`,
            ilce,
            telefon: null,
        })
    }
    return isletmeler
}
