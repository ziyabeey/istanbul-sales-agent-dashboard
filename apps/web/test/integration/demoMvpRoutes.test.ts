import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { demoBusiness } from '@/data/demoBusiness'
import { DEMO_ESNAF_ID } from '@/lib/demoMode'
import { GET as getKonusmalar } from '@/app/api/dashboard/konusmalar/route'
import { GET as getMesajlar } from '@/app/api/dashboard/konusmalar/mesajlar/route'
import { GET as getMusteriler } from '@/app/api/dashboard/musteriler/route'
import { GET as getRandevular } from '@/app/api/randevu/route'

vi.mock('@/lib/firebaseAdmin', () => ({
  adminDb: {
    collection: vi.fn(),
  },
  Timestamp: {
    fromDate: vi.fn(),
    now: vi.fn(),
  },
}))

vi.mock('@/lib/telegram', () => ({
  telegramGonder: vi.fn(async () => undefined),
}))

type ApiResponse<T> = {
  status: number
  ok: boolean
  json: () => Promise<T>
}

function demoRequest(path: string): Request {
  return new Request(`http://localhost${path}`)
}

describe('MVP demo API GET routes', () => {
  let originalDemoMode: string | undefined

  beforeEach(() => {
    originalDemoMode = process.env.KEPENK_DEMO_MODE
    process.env.KEPENK_DEMO_MODE = 'true'
  })

  afterEach(() => {
    if (originalDemoMode === undefined) {
      delete process.env.KEPENK_DEMO_MODE
    } else {
      process.env.KEPENK_DEMO_MODE = originalDemoMode
    }
  })

  it('returns the demo conversation list', async () => {
    const response = await getKonusmalar(
      demoRequest(`/api/dashboard/konusmalar?esnafId=${DEMO_ESNAF_ID}`)
    ) as ApiResponse<Array<Record<string, unknown>>>
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(response.ok).toBe(true)
    expect(body).toHaveLength(2)
    expect(body[0]).toMatchObject({
      musteriNumara: demoBusiness.conversations[0].musteriNumara,
      sonMesaj: demoBusiness.conversations[0].sonMesaj,
      mesajSayisi: demoBusiness.conversations[0].mesajSayisi,
    })
  })

  it('returns the first demo conversation messages', async () => {
    const firstConversation = demoBusiness.conversations[0]
    const response = await getMesajlar(
      demoRequest(
        `/api/dashboard/konusmalar/mesajlar?esnafId=${DEMO_ESNAF_ID}&musteriNumara=${encodeURIComponent(firstConversation.musteriNumara)}`
      )
    ) as ApiResponse<Array<Record<string, unknown>>>
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(response.ok).toBe(true)
    expect(body).toHaveLength(firstConversation.messages.length)
    expect(body.map((message) => message.mesaj)).toEqual(
      firstConversation.messages.map((message) => message.mesaj)
    )
  })

  it('returns the demo customer list', async () => {
    const response = await getMusteriler(
      demoRequest(`/api/dashboard/musteriler?esnafId=${DEMO_ESNAF_ID}`)
    ) as ApiResponse<Array<Record<string, unknown>>>
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(response.ok).toBe(true)
    expect(body).toHaveLength(3)
    expect(body[0]).toMatchObject({
      id: demoBusiness.customers[0].id,
      ad: demoBusiness.customers[0].ad,
      telefon: demoBusiness.customers[0].telefon,
    })
  })

  it('returns the demo appointment list', async () => {
    const response = await getRandevular(
      demoRequest(`/api/randevu?esnafId=${DEMO_ESNAF_ID}`)
    ) as ApiResponse<{ randevular: Array<Record<string, unknown>> }>
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(response.ok).toBe(true)
    expect(body.randevular).toHaveLength(2)
    expect(body.randevular.every((appointment) => appointment.esnafId === DEMO_ESNAF_ID)).toBe(true)
  })
})
