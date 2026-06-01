import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { requireOwnedAppointment, requireSessionEsnaf } from '@/lib/esnafOwnership'
import { oturumDogrulaServer } from '@/lib/sessionManager'
import { mockCollection } from '../setup'

const mockedOturumDogrulaServer = vi.mocked(oturumDogrulaServer)
const mockedDoc = vi.mocked(mockCollection.doc)

function makeReq(headers: Record<string, string> = {}): Request {
    return new Request('http://localhost/api/test', { headers })
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
    mockedDoc.mockReturnValue(randevuRef)
    return randevuRef
}

describe('requireSessionEsnaf', () => {
    const originalAdminSecret = process.env.ADMIN_SECRET_TOKEN

    beforeEach(() => {
        delete process.env.ADMIN_SECRET_TOKEN
        mockedOturumDogrulaServer.mockResolvedValue('esnaf-1')
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

    it('admin token eslesirse ADMIN_SECRET_TOKEN set iken izin verir', async () => {
        process.env.ADMIN_SECRET_TOKEN = 'admin-secret'
        mockedOturumDogrulaServer.mockResolvedValue(null)

        const result = await requireSessionEsnaf(
            makeReq({ 'x-admin-token': 'admin-secret' }),
            'esnaf-2'
        )

        expect(result).toEqual({ ok: true, esnafId: 'esnaf-2', isAdmin: true })
    })

    it('ADMIN_SECRET_TOKEN yoksa admin token ile izin vermez', async () => {
        delete process.env.ADMIN_SECRET_TOKEN
        mockedOturumDogrulaServer.mockResolvedValue(null)

        const result = await requireSessionEsnaf(
            makeReq({ 'x-admin-token': 'admin-secret' }),
            'esnaf-1'
        )

        expect(result.ok).toBe(false)
        if (!result.ok) {
            expect(result.response.status).toBe(401)
        }
    })
})

describe('requireOwnedAppointment', () => {
    const originalAdminSecret = process.env.ADMIN_SECRET_TOKEN

    beforeEach(() => {
        delete process.env.ADMIN_SECRET_TOKEN
        mockedOturumDogrulaServer.mockResolvedValue('esnaf-1')
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

    it('admin token eslesirse ADMIN_SECRET_TOKEN set iken izin verir', async () => {
        process.env.ADMIN_SECRET_TOKEN = 'admin-secret'
        mockedOturumDogrulaServer.mockResolvedValue(null)
        mockAppointmentDoc({ data: { esnafId: 'esnaf-2' } })

        const result = await requireOwnedAppointment(
            makeReq({ 'x-admin-token': 'admin-secret' }),
            'randevu-1'
        )

        expect(result.ok).toBe(true)
        if (result.ok) {
            expect(result.esnafId).toBe('esnaf-2')
            expect(result.isAdmin).toBe(true)
        }
    })

    it('ADMIN_SECRET_TOKEN yoksa admin token ile izin vermez', async () => {
        delete process.env.ADMIN_SECRET_TOKEN
        mockedOturumDogrulaServer.mockResolvedValue(null)

        const result = await requireOwnedAppointment(
            makeReq({ 'x-admin-token': 'admin-secret' }),
            'randevu-1'
        )

        expect(result.ok).toBe(false)
        if (!result.ok) {
            expect(result.response.status).toBe(401)
        }
    })
})
