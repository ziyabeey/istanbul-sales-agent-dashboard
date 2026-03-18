/**
 * Security Audit Log Viewer API
 * GET  /api/v1/security/audit — Query audit logs (owner only)
 * POST /api/v1/security/audit — Anomaly detection alerts
 */
import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebaseAdmin'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { queryAuditLogs } from '@/lib/security/auditLogger'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

    // Owner only — check role
    const esnafDoc = await adminDb.collection('esnaflar').doc(esnafId).get()
    const role = esnafDoc.data()?.role || 'owner'
    if (role !== 'owner') return NextResponse.json({ error: 'Sadece işletme sahibi erişebilir' }, { status: 403 })

    const { searchParams } = new URL(request.url)
    const logs = await queryAuditLogs(esnafId, {
      eventType: searchParams.get('eventType') || undefined,
      actorId: searchParams.get('actorId') || undefined,
      from: searchParams.get('from') || undefined,
      to: searchParams.get('to') || undefined,
      limit: Math.min(parseInt(searchParams.get('limit') || '50'), 200),
    })

    return NextResponse.json({ ok: true, logs, count: logs.length })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const body = await request.json()

    if (body.action === 'anomaly_check') {
      const now = new Date()
      const hourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString()

      // Check for brute force
      const failedLogins = await queryAuditLogs(esnafId, {
        eventType: 'auth.login_failure', from: hourAgo, limit: 20
      })

      // Check for unusual data exports
      const exports = await queryAuditLogs(esnafId, {
        eventType: 'data.customer_export', from: hourAgo, limit: 5
      })

      // Check for payment anomalies
      const refunds = await queryAuditLogs(esnafId, {
        eventType: 'payment.refund', from: hourAgo, limit: 10
      })

      const alerts: { severity: string; name: string; count: number; threshold: number }[] = []

      if (failedLogins.length >= 10) alerts.push({ severity: 'high', name: 'Brute force girişim', count: failedLogins.length, threshold: 10 })
      if (exports.length >= 3) alerts.push({ severity: 'medium', name: 'Sık veri dışa aktarımı', count: exports.length, threshold: 3 })
      if (refunds.length >= 5) alerts.push({ severity: 'high', name: 'Çok fazla iade', count: refunds.length, threshold: 5 })

      return NextResponse.json({ ok: true, alerts, checked: ['brute_force', 'data_export', 'refund_anomaly'] })
    }

    return NextResponse.json({ error: 'action: anomaly_check' }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
