/**
 * Accounting & ERP Integration API
 * GET /api/v1/accounting — e-Fatura, Paraşüt, Logo, muhasebeci, vergi
 */
import { NextResponse } from 'next/server'
import {
  YASAL_CERCEVE, KDV_ORANLARI, KDV_ACIKLAMA, FARKLILASTIRMA,
  NILVERA_CONFIG, FATURA_PAYLOAD_HARITALAMA, SERI_NUMARA,
  PARASUT_CONFIG, LOGO_CONFIG, MUHASEBECI_KANALI,
  FATURA_SENARYOLARI, MUTABAKAT, VERGI_TAKVIMI,
  CONNECTOR_MIMARI, MUHASEBE_GUVENLIK, MUHASEBE_METRIKLERI,
} from '@/data/muhasebeConfig'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'overview'

    if (mode === 'overview') {
      return NextResponse.json({
        ok: true, farklilastirma: FARKLILASTIRMA,
        kdvOranlari: KDV_ORANLARI, kdvAciklama: KDV_ACIKLAMA,
        yasalCerceve: YASAL_CERCEVE,
        sayilar: {
          belgeTipi: NILVERA_CONFIG.desteklenenBelgeler.length,
          parasutIslem: PARASUT_CONFIG.islemler.length,
          faturaSenaryo: FATURA_SENARYOLARI.length,
          connectorAdapter: CONNECTOR_MIMARI.adapterler.length,
          vergiHatirlatma: VERGI_TAKVIMI.length,
        },
      })
    }

    if (mode === 'nilvera') {
      return NextResponse.json({
        ok: true, config: NILVERA_CONFIG, payloadHaritalama: FATURA_PAYLOAD_HARITALAMA, seriNumara: SERI_NUMARA,
      })
    }

    if (mode === 'parasut') {
      return NextResponse.json({ ok: true, config: PARASUT_CONFIG })
    }

    if (mode === 'logo') {
      return NextResponse.json({ ok: true, config: LOGO_CONFIG })
    }

    if (mode === 'accountant') {
      return NextResponse.json({ ok: true, kanal: MUHASEBECI_KANALI })
    }

    if (mode === 'invoicing') {
      return NextResponse.json({ ok: true, senaryolar: FATURA_SENARYOLARI })
    }

    if (mode === 'reconciliation') {
      return NextResponse.json({ ok: true, mutabakat: MUTABAKAT, vergiTakvimi: VERGI_TAKVIMI })
    }

    if (mode === 'connector') {
      return NextResponse.json({ ok: true, mimari: CONNECTOR_MIMARI })
    }

    if (mode === 'security') {
      return NextResponse.json({ ok: true, guvenlik: MUHASEBE_GUVENLIK })
    }

    if (mode === 'metrics') {
      return NextResponse.json({ ok: true, metrikler: MUHASEBE_METRIKLERI })
    }

    return NextResponse.json({
      error: 'mode: overview, nilvera, parasut, logo, accountant, invoicing, reconciliation, connector, security, metrics',
    }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
