/**
 * Monitoring & Observability API
 * GET /api/v1/monitoring — SLO status, alerts, metrics, dashboards, incidents
 */
import { NextResponse } from 'next/server'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import {
  SLI_TANIMLARI, SLO_HEDEFLERI, SLA_TAAHHUTLERI, HATA_BUDCESI_POLITIKASI,
  ALERT_KATALOGU, CUSTOM_METRIKLER, RUM_HEDEFLERI, INCIDENT_WORKFLOW,
  LOG_STANDARDI, GRAFANA_KLASORLER, HEDEF_METRIKLER_MONITORING,
  OBSERVABILITY_STACK,
} from '@/data/observabilityConfig'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'overview'

    if (mode === 'overview') {
      return NextResponse.json({
        ok: true, stack: OBSERVABILITY_STACK,
        sloSayisi: SLO_HEDEFLERI.length, alertSayisi: ALERT_KATALOGU.length,
        metrikSayisi: CUSTOM_METRIKLER.length, dashboardSayisi: GRAFANA_KLASORLER.reduce((s, f) => s + f.dashboardlar.length, 0),
      })
    }

    if (mode === 'slo') {
      return NextResponse.json({
        ok: true, sliTanimlari: SLI_TANIMLARI, sloHedefleri: SLO_HEDEFLERI,
        slaTaahhutleri: SLA_TAAHHUTLERI, hataBudcesiPolitikasi: HATA_BUDCESI_POLITIKASI,
      })
    }

    if (mode === 'alerts') {
      const oncelik = searchParams.get('oncelik') as string | null
      const alerts = oncelik ? ALERT_KATALOGU.filter(a => a.oncelik === oncelik) : ALERT_KATALOGU
      return NextResponse.json({
        ok: true, alerts, toplam: alerts.length,
        dagilim: { p1: ALERT_KATALOGU.filter(a => a.oncelik === 'p1').length, p2: ALERT_KATALOGU.filter(a => a.oncelik === 'p2').length, p3: ALERT_KATALOGU.filter(a => a.oncelik === 'p3').length, p4: ALERT_KATALOGU.filter(a => a.oncelik === 'p4').length },
      })
    }

    if (mode === 'metrics') {
      const kategori = searchParams.get('kategori')
      const metrikler = kategori ? CUSTOM_METRIKLER.filter(m => m.kategori === kategori) : CUSTOM_METRIKLER
      const kategoriler = [...new Set(CUSTOM_METRIKLER.map(m => m.kategori))]
      return NextResponse.json({ ok: true, metrikler, kategoriler, toplam: metrikler.length })
    }

    if (mode === 'rum') {
      return NextResponse.json({ ok: true, hedefler: RUM_HEDEFLERI })
    }

    if (mode === 'incident-workflow') {
      return NextResponse.json({ ok: true, workflow: INCIDENT_WORKFLOW })
    }

    if (mode === 'log-standard') {
      return NextResponse.json({ ok: true, ...LOG_STANDARDI })
    }

    if (mode === 'dashboards') {
      return NextResponse.json({ ok: true, klasorler: GRAFANA_KLASORLER })
    }

    if (mode === 'targets') {
      return NextResponse.json({ ok: true, hedefler: HEDEF_METRIKLER_MONITORING })
    }

    return NextResponse.json({ error: 'mode: overview, slo, alerts, metrics, rum, incident-workflow, log-standard, dashboards, targets' }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
