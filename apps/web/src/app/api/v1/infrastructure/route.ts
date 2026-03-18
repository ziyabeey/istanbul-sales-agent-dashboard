/**
 * Infrastructure & DevOps API
 * GET /api/v1/infrastructure — Services, environments, DR, costs, CI/CD, secrets
 */
import { NextResponse } from 'next/server'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import {
  ALTYAPI_SABITLERI, COMPUTE_STACK, STORAGE_STACK, CLOUD_RUN_SERVISLERI,
  ORTAMLAR, CI_PIPELINE, SECRET_LISTESI, MALIYET_TAHMINLERI,
  MALIYET_OPTIMIZASYON, DR_PLANI, RELEASE_CONFIG, ESNAF_SITE_DAGITIMI,
} from '@/data/devopsConfig'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'overview'

    if (mode === 'overview') {
      return NextResponse.json({
        ok: true, altyapi: ALTYAPI_SABITLERI, compute: COMPUTE_STACK, storage: STORAGE_STACK,
        servisSayisi: CLOUD_RUN_SERVISLERI.length, ortamSayisi: ORTAMLAR.length,
      })
    }

    if (mode === 'services') {
      return NextResponse.json({ ok: true, servisleri: CLOUD_RUN_SERVISLERI })
    }

    if (mode === 'environments') {
      return NextResponse.json({ ok: true, ortamlar: ORTAMLAR })
    }

    if (mode === 'cicd') {
      return NextResponse.json({ ok: true, pipeline: CI_PIPELINE })
    }

    if (mode === 'secrets') {
      // Return secret metadata only (not actual secrets!)
      return NextResponse.json({
        ok: true, secretler: SECRET_LISTESI.map(s => ({
          isim: s.isim, kategori: s.kategori, rotasyonGun: s.rotasyonGun,
          erisim: s.erisim, rotasyonUyari: s.rotasyonGun <= 90 ? 'Sık rotasyon gerekli' : null,
        })),
      })
    }

    if (mode === 'costs') {
      return NextResponse.json({
        ok: true, tahminler: MALIYET_TAHMINLERI, optimizasyon: MALIYET_OPTIMIZASYON,
      })
    }

    if (mode === 'dr') {
      return NextResponse.json({ ok: true, plan: DR_PLANI })
    }

    if (mode === 'release') {
      return NextResponse.json({ ok: true, config: RELEASE_CONFIG })
    }

    if (mode === 'site-distribution') {
      return NextResponse.json({ ok: true, dagitim: ESNAF_SITE_DAGITIMI })
    }

    return NextResponse.json({ error: 'mode: overview, services, environments, cicd, secrets, costs, dr, release, site-distribution' }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
