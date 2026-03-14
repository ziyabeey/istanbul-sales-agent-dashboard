import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { apiGuard } from '@/lib/apiGuard'
import { csvParse, importPipeline, importCommit, importSablonCSV, COLUMN_PRESETS } from '@/lib/urunImportExport'
import type { ImportColumnMapping } from '@/lib/urunImportExport'

// POST — Dosya yükle + parse + validasyon raporu
export async function POST(request: Request) {
  const guard = await apiGuard(request, { requireAdminToken: true })
  if (!guard.ok) return guard.response

  if (!adminDb) {
    return NextResponse.json({ error: 'Veritabanı bağlantısı yok' }, { status: 500 })
  }

  try {
    const body = await request.json()
    const { shopId, csvData, preset = 'standard', customMapping } = body

    if (!shopId || !csvData) {
      return NextResponse.json({ error: 'shopId ve csvData zorunlu' }, { status: 400 })
    }

    // Parse
    const delimiter = csvData.includes('\t') ? '\t' : ','
    const rows = csvParse(csvData, delimiter)

    if (rows.length === 0) {
      return NextResponse.json({ error: 'CSV verisi boş veya geçersiz' }, { status: 400 })
    }

    // Kolon eşleştirme
    const mapping: ImportColumnMapping = customMapping || COLUMN_PRESETS[preset] || COLUMN_PRESETS.standard

    // Validasyon
    const report = await importPipeline(shopId, rows, mapping, preset)

    return NextResponse.json({ report })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PUT — Kullanıcı onayı sonrası commit
export async function PUT(request: Request) {
  const guard = await apiGuard(request, { requireAdminToken: true })
  if (!guard.ok) return guard.response

  try {
    const body = await request.json()
    const { shopId, csvData, preset = 'standard', customMapping } = body

    if (!shopId || !csvData) {
      return NextResponse.json({ error: 'shopId ve csvData zorunlu' }, { status: 400 })
    }

    const delimiter = csvData.includes('\t') ? '\t' : ','
    const rows = csvParse(csvData, delimiter)
    const mapping: ImportColumnMapping = customMapping || COLUMN_PRESETS[preset] || COLUMN_PRESETS.standard

    const sonuc = await importCommit(shopId, rows, mapping)
    return NextResponse.json({ ok: true, ...sonuc })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// GET — İmport şablonu indir
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const preset = searchParams.get('preset') || 'standard'

  const csv = importSablonCSV(preset)

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="import-sablonu-${preset}.csv"`,
    },
  })
}
