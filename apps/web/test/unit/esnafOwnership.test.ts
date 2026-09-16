import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { requireOwnedAppointment, requireSessionEsnaf } from '@/lib/esnafOwnership'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { getBoundActiveImpersonationFromRequest } from '@/lib/impersonation'
import { mockCollection } from '../setup'

vi.mock('@/lib/impersonation', () => ({
    readImpersonationSessionToken: vi.fn((request: Request) => {
        const cookie = request.headers.get('cookie') ?? ''
        return cookie.includes('kepenk_impersonate=') ? 'impersonation-token' : null
    }),
    getBoundActiveImpersonationFromRequest: vi.fn(async () => null),
}))

type BoundImpersonation = NonNullable<Awaited<ReturnType<typeof getBoundActiveImpersonationFromRequest>>>

const mockedOturumDogrulaServer = vi.mocked(oturumDogrulaServer)
const mockedBoundImpersonation = vi.mocked(getBoundActiveImpersonationFromRequest)
const mockedDoc = vi.mocked(mockCollection.doc)

const IMPERSONATION_COOKIE = 'admin_session=admin-session-token; kepenk_impersonate=impersonation-token'

function makeReq(headers: Record<string, string> = {}): Request {
    return new Request('http://localhost/api/test', { headers })
}

function boundImpersonation(targetId: string, adminId = 'admin-1'): BoundImpersonation {
    return {
        sessionId: '0b7c1d8e-2f3a-4b5c-8d6e-7f8091a2b3c4',
        tokenHash: 'a'.repeat(64),
        adminId,
        subject: { type: 'esnaf', id: targetId, label: 'Test Esnaf' },
        reason: 'destek talebi',
        startedAt: '2026-09-16T10:00:00.000Z',
        expiresAt: '2026-09-16T11:00:00.000Z',
        endedAt: null,
    }
}

function mockAppointmentDoc(options: {
    exists?: boolean
    data?: Record<string, unknown>
}) {
    const randevuRef = {
        get: vi.fn(async () => ({
            exists: options.exists ?? true,
            data: () => options.data ?? { esnafId: 'esnaf-1' },
        })),
        update: vi.fn(),
        delete: vi.fn(),
    }
    mockedDoc.mockReturnValue(randevuRef as unknown as ReturnType<typeof mockCollection.doc>)
    return randevuRef
}

describe('requireSessionEsnaf', () => {
    const originalAdminSecret = process.env.ADMIN_SECRET_TOKEN

    beforeEach(() => {
        delete process.env.ADMIN_SECRET_TOKEN
        mockedOturumDogrulaServer.mockResolvedValue('esnaf-1')
        mockedBoundImpersonation.mockResolvedValue(null)
        mockAppointmentDoc({ data: { esnafId: 'esnaf-1' } })
    })

    afterEach(() => {
        if (originalAdminSecret === undefined) {
            delete process.env.ADMIN_SECRET_TOKEN
        } else {
            process.env.ADMIN_SECRET_TOKEN = originalAdminSecret
        }
    })

    it('eksik requested id icin 400 doner', async () => {
        const result = await requireSessionEsnaf(makeReq(), '')

        expect(result.ok).toBe(false)
        if (!result.ok) {
            expect(result.response.status).toBe(400)
        }
    })

    it('session yoksa 401 doner', async () => {
        mockedOturumDogrulaServer.mockResolvedValue(null)

        const result = await requireSessionEsnaf(makeReq(), 'esnaf-1')

        expect(result.ok).toBe(false)
        if (!result.ok) {
            expect(result.response.status).toBe(401)
        }
    })

    it('session esnaf id farkliysa 403 doner', async () => {
        mockedOturumDogrulaServer.mockResolvedValue('esnaf-1')

        const result = await requireSessionEsnaf(makeReq(), 'esnaf-2')

        expect(result.ok).toBe(false)
        if (!result.ok) {
            expect(result.response.status).toBe(403)
        }
    })

    it('session esnaf id eslesirse izin verir', async () => {
        mockedOturumDogrulaServer.mockResolvedValue('esnaf-1')

        const result = await requireSessionEsnaf(makeReq(), 'esnaf-1')

        expect(result).toEqual({ ok: true, esnafId: 'esnaf-1', isAdmin: false })
    })

    it('P0-08: eslesen x-admin-token ADMIN_SECRET_TOKEN set olsa bile yetki vermez', async () => {
        process.env.ADMIN_SECRET_TOKEN = 'admin-secret'
        mockedOturumDogrulaServer.mockResolvedValue(null)

        const result = await requireSessionEsnaf(
            makeReq({ 'x-admin-token': 'admin-secret' }),
            'esnaf-2'
        )

        expect(result.ok).toBe(false)
        if (!result.ok) {
            expect(result.response.status).toBe(401)
        }
        expect(mockedBoundImpersonation).not.toHaveBeenCalled()
    })

    it('bagli impersonation hedef esnaf ile eslesirse admin yetkisi verir', async () => {
        mockedOturumDogrulaServer.mockResolvedValue(null)
        mockedBoundImpersonation.mockResolvedValue(boundImpersonation('esnaf-2'))

        const result = await requireSessionEsnaf(makeReq({ cookie: IMPERSONATION_COOKIE }), 'esnaf-2')

        expect(result).toEqual({ ok: true, esnafId: 'esnaf-2', isAdmin: true, actingAdminId: 'admin-1' })
        expect(mockedOturumDogrulaServer).not.toHaveBeenCalled()
    })

    it('impersonation hedefi disindaki esnaf icin 403 doner', async () => {
        mockedOturumDogrulaServer.mockResolvedValue('esnaf-3')
        mockedBoundImpersonation.mockResolvedValue(boundImpersonation('esnaf-2'))

        const result = await requireSessionEsnaf(makeReq({ cookie: IMPERSONATION_COOKIE }), 'esnaf-3')

        expect(result.ok).toBe(false)
        if (!result.ok) {
            expect(result.response.status).toBe(403)
        }
    })

    it('impersonation cookie var ama bagli oturum gecersizse 401 doner', async () => {
        mockedOturumDogrulaServer.mockResolvedValue('esnaf-1')
        mockedBoundImpersonation.mockResolvedValue(null)

        const result = await requireSessionEsnaf(makeReq({ cookie: IMPERSONATION_COOKIE }), 'esnaf-1')

        expect(result.ok).toBe(false)
        if (!result.ok) {
            expect(result.response.status).toBe(401)
        }
    })

    it('impersonation dogrulamasi patlarsa 503 ile fail-closed doner', async () => {
        mockedOturumDogrulaServer.mockResolvedValue('esnaf-1')
        mockedBoundImpersonation.mockRejectedValue(new Error('firestore down'))

        const result = await requireSessionEsnaf(makeReq({ cookie: IMPERSONATION_COOKIE }), 'esnaf-1')

        expect(result.ok).toBe(false)
        if (!result.ok) {
            expect(result.response.status).toBe(503)
        }
    })
})

describe('requireOwnedAppointment', () => {
    const originalAdminSecret = process.env.ADMIN_SECRET_TOKEN

    beforeEach(() => {
        delete process.env.ADMIN_SECRET_TOKEN
        mockedOturumDogrulaServer.mockResolvedValue('esnaf-1')
        mockedBoundImpersonation.mockResolvedValue(null)
        mockAppointmentDoc({ data: { esnafId: 'esnaf-1', hizmet: 'Sakal Traşı' } })
    })

    afterEach(() => {
        if (originalAdminSecret === undefined) {
            delete process.env.ADMIN_SECRET_TOKEN
        } else {
            process.env.ADMIN_SECRET_TOKEN = originalAdminSecret
        }
    })

    it('eksik appointment id icin 400 doner', async () => {
        const result = await requireOwnedAppointment(makeReq(), '')

        expect(result.ok).toBe(false)
        if (!result.ok) {
            expect(result.response.status).toBe(400)
        }
        expect(mockedDoc).not.toHaveBeenCalled()
    })

    it('randevu bulunamazsa 404 doner', async () => {
        mockAppointmentDoc({ exists: false })

        const result = await requireOwnedAppointment(makeReq(), 'randevu-1')

        expect(result.ok).toBe(false)
        if (!result.ok) {
            expect(result.response.status).toBe(404)
        }
    })

    it('session yoksa 401 doner', async () => {
        mockedOturumDogrulaServer.mockResolvedValue(null)

        const result = await requireOwnedAppointment(makeReq(), 'randevu-1')

        expect(result.ok).toBe(false)
        if (!result.ok) {
            expect(result.response.status).toBe(401)
        }
    })

    it('session esnaf id randevu esnaf id ile eslesmezse 403 doner', async () => {
        mockedOturumDogrulaServer.mockResolvedValue('esnaf-2')

        const result = await requireOwnedAppointment(makeReq(), 'randevu-1')

        expect(result.ok).toBe(false)
        if (!result.ok) {
            expect(result.response.status).toBe(403)
        }
    })

    it('session esnaf id randevu esnaf id ile eslesirse izin verir', async () => {
        const result = await requireOwnedAppointment(makeReq(), 'randevu-1')

        expect(result.ok).toBe(true)
        if (result.ok) {
            expect(result).toMatchObject({
                esnafId: 'esnaf-1',
                isAdmin: false,
                randevuId: 'randevu-1',
                randevu: { esnafId: 'esnaf-1', hizmet: 'Sakal Traşı' },
            })
        }
    })

    it('P0-08: eslesen x-admin-token ADMIN_SECRET_TOKEN set olsa bile yetki vermez', async () => {
        process.env.ADMIN_SECRET_TOKEN = 'admin-secret'
        mockedOturumDogrulaServer.mockResolvedValue(null)
        mockAppointmentDoc({ data: { esnafId: 'esnaf-2' } })

        const result = await requireOwnedAppointment(
            makeReq({ 'x-admin-token': 'admin-secret' }),
            'randevu-1'
        )

        expect(result.ok).toBe(false)
        if (!result.ok) {
            expect(result.response.status).toBe(401)
        }
        expect(mockedBoundImpersonation).not.toHaveBeenCalled()
    })

    it('bagli impersonation randevunun esnafi ile eslesirse admin yetkisi verir', async () => {
        mockedOturumDogrulaServer.mockResolvedValue(null)
        mockAppointmentDoc({ data: { esnafId: 'esnaf-2' } })
        mockedBoundImpersonation.mockResolvedValue(boundImpersonation('esnaf-2', 'admin-7'))

        const result = await requireOwnedAppointment(makeReq({ cookie: IMPERSONATION_COOKIE }), 'randevu-1')

        expect(result.ok).toBe(true)
        if (result.ok) {
            expect(result.esnafId).toBe('esnaf-2')
            expect(result.isAdmin).toBe(true)
            expect(result.actingAdminId).toBe('admin-7')
        }
        expect(mockedOturumDogrulaServer).not.toHaveBeenCalled()
    })

    it('impersonation hedefi randevunun esnafi degilse 403 doner', async () => {
        mockedOturumDogrulaServer.mockResolvedValue('esnaf-2')
        mockAppointmentDoc({ data: { esnafId: 'esnaf-2' } })
        mockedBoundImpersonation.mockResolvedValue(boundImpersonation('esnaf-9'))

        const result = await requireOwnedAppointment(makeReq({ cookie: IMPERSONATION_COOKIE }), 'randevu-1')

        expect(result.ok).toBe(false)
        if (!result.ok) {
            expect(result.response.status).toBe(403)
        }
    })

    it('impersonation cookie var ama bagli oturum gecersizse 401 doner', async () => {
        mockedBoundImpersonation.mockResolvedValue(null)

        const result = await requireOwnedAppointment(makeReq({ cookie: IMPERSONATION_COOKIE }), 'randevu-1')

        expect(result.ok).toBe(false)
        if (!result.ok) {
            expect(result.response.status).toBe(401)
        }
    })
})
