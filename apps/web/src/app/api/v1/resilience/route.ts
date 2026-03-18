/**
 * Resilience & Error Handling API
 * GET /api/v1/resilience — Error catalog, circuit breakers, fallbacks, chaos tests
 */
import { NextResponse } from 'next/server'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import {
  RESILIENCE_PRENSIPLERI, RESILIENCE_STACK, HATA_KATALOGU,
  CIRCUIT_BREAKER_KONFIG, RETRY_PROFILLERI, FALLBACK_ZINCIRLERI,
  DEGRADATION_MATRISI, IDEMPOTENCY_CONFIG, KUYRUK_KONFIG,
  KAOS_TESTLERI, HTTP_STATUS_HARITASI, RETRY_KARARI,
  KULLANICI_MESAJ_PRENSIPLERI, TUTARLILIK_KONTROLLERI,
} from '@/data/resilienceConfig'

export async function GET(request: Request) {
  try {
    const esnafId = await oturumDogrulaServer()
    if (!esnafId) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') || 'overview'

    if (mode === 'overview') {
      return NextResponse.json({
        ok: true, prensipler: RESILIENCE_PRENSIPLERI, stack: RESILIENCE_STACK,
        sayilar: {
          hataKodu: HATA_KATALOGU.length, circuitBreaker: CIRCUIT_BREAKER_KONFIG.length,
          retryProfil: RETRY_PROFILLERI.length, fallbackZinciri: FALLBACK_ZINCIRLERI.length,
          degradasyonSenaryo: DEGRADATION_MATRISI.length, kaosTest: KAOS_TESTLERI.length,
        },
      })
    }

    if (mode === 'errors') {
      const modul = searchParams.get('modul')
      const hatalar = modul ? HATA_KATALOGU.filter(h => h.modul === modul) : HATA_KATALOGU
      const moduller = [...new Set(HATA_KATALOGU.map(h => h.modul))]
      return NextResponse.json({ ok: true, hatalar, moduller, toplam: hatalar.length })
    }

    if (mode === 'circuit-breakers') {
      return NextResponse.json({ ok: true, circuitBreakers: CIRCUIT_BREAKER_KONFIG })
    }

    if (mode === 'retry') {
      return NextResponse.json({ ok: true, profiller: RETRY_PROFILLERI, kurallar: RETRY_KARARI })
    }

    if (mode === 'fallbacks') {
      const id = searchParams.get('id')
      if (id) {
        const zincir = FALLBACK_ZINCIRLERI.find(f => f.id === id)
        return zincir ? NextResponse.json({ ok: true, zincir }) : NextResponse.json({ error: `Fallback bulunamadı: ${id}` }, { status: 404 })
      }
      return NextResponse.json({ ok: true, zincirler: FALLBACK_ZINCIRLERI })
    }

    if (mode === 'degradation') {
      return NextResponse.json({ ok: true, matris: DEGRADATION_MATRISI })
    }

    if (mode === 'idempotency') {
      return NextResponse.json({ ok: true, config: IDEMPOTENCY_CONFIG })
    }

    if (mode === 'queues') {
      return NextResponse.json({ ok: true, kuyruklar: KUYRUK_KONFIG })
    }

    if (mode === 'chaos') {
      const ortam = searchParams.get('ortam') as 'staging' | 'prod' | null
      const testler = ortam ? KAOS_TESTLERI.filter(t => t.ortam === ortam) : KAOS_TESTLERI
      return NextResponse.json({ ok: true, testler, toplam: testler.length })
    }

    if (mode === 'http-codes') {
      return NextResponse.json({ ok: true, kodlar: HTTP_STATUS_HARITASI, mesajPrensipleri: KULLANICI_MESAJ_PRENSIPLERI })
    }

    if (mode === 'data-integrity') {
      return NextResponse.json({ ok: true, kontroller: TUTARLILIK_KONTROLLERI })
    }

    return NextResponse.json({
      error: 'mode: overview, errors, circuit-breakers, retry, fallbacks, degradation, idempotency, queues, chaos, http-codes, data-integrity',
    }, { status: 400 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
