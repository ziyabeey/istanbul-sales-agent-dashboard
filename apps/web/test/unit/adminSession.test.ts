import { describe, expect, it } from 'vitest'
import {
    hashAdminSessionToken,
    issueAdminSession,
    readAdminSessionToken,
    revokeAdminSessionToken,
    validateAdminSessionToken,
    type AdminSession,
    type AdminSessionRepository,
} from '@/lib/auth/adminSession'
import { ADMIN_SESSION_COOKIE } from '@/lib/auth/adminSessionConstants'
import { apiGuard, isSameOriginMutation } from '@/lib/apiGuard'

class MemoryAdminSessionRepository implements AdminSessionRepository {
    readonly sessions = new Map<string, AdminSession>()

    async getByTokenHash(tokenHash: string): Promise<AdminSession | null> {
        return this.sessions.get(tokenHash) ?? null
    }

    async create(session: AdminSession): Promise<void> {
        if (this.sessions.has(session.tokenHash)) {
            throw new Error('duplicate session')
        }
        this.sessions.set(session.tokenHash, session)
    }

    async revoke(tokenHash: string, revokedAt: string): Promise<boolean> {
        const session = this.sessions.get(tokenHash)
        if (!session) return false
        this.sessions.set(tokenHash, { ...session, revokedAt })
        return true
    }
}

describe('AdminSession', () => {
    it('stores only the token digest and validates the opaque bearer', async () => {
        const repository = new MemoryAdminSessionRepository()
        const now = new Date('2026-09-16T09:00:00.000Z')
        const { token, session } = await issueAdminSession(repository, now)

        expect(token).toMatch(/^[A-Za-z0-9_-]{43}$/)
        expect(session.tokenHash).toBe(hashAdminSessionToken(token))
        expect(session.tokenHash).not.toContain(token)
        expect(repository.sessions.get(session.tokenHash)).toEqual(session)

        const resolved = await validateAdminSessionToken(token, repository, now)
        expect(resolved?.sessionId).toBe(session.sessionId)
        expect(resolved?.principalId).toBe('super_admin')
    })

    it('rejects expired, revoked and malformed tokens', async () => {
        const repository = new MemoryAdminSessionRepository()
        const issuedAt = new Date('2026-09-01T00:00:00.000Z')
        const { token } = await issueAdminSession(repository, issuedAt)

        expect(await validateAdminSessionToken('not-a-token', repository, issuedAt)).toBeNull()
        expect(
            await validateAdminSessionToken(token, repository, new Date('2026-09-09T00:00:00.000Z'))
        ).toBeNull()

        const active = await issueAdminSession(repository, issuedAt)
        await revokeAdminSessionToken(
            active.token,
            repository,
            new Date('2026-09-01T01:00:00.000Z')
        )
        expect(
            await validateAdminSessionToken(
                active.token,
                repository,
                new Date('2026-09-01T02:00:00.000Z')
            )
        ).toBeNull()
    })

    it('reads only the AdminSession cookie and ignores the legacy admin_token cookie', () => {
        const token = 'A'.repeat(43)
        const request = new Request('https://kepenk.ai/api/admin/stats', {
            headers: {
                cookie: `admin_token=legacy-secret; ${ADMIN_SESSION_COOKIE}=${token}`,
            },
        })

        expect(readAdminSessionToken(request)).toBe(token)

        const legacyOnly = new Request('https://kepenk.ai/api/admin/stats', {
            headers: { cookie: 'admin_token=legacy-secret' },
        })
        expect(readAdminSessionToken(legacyOnly)).toBeNull()
    })

    it('does not treat the legacy x-admin-token header as admin authority', async () => {
        const request = new Request('https://kepenk.ai/api/admin/stats', {
            headers: { 'x-admin-token': 'kepenk-admin-2026' },
        })

        const result = await apiGuard(request, { requireAdminToken: true })
        expect(result.ok).toBe(false)
        if (!result.ok) expect(result.response.status).toBe(401)
    })

    it('requires same-origin requests for admin mutations', () => {
        const sameOrigin = new Request('https://kepenk.ai/api/admin/kota', {
            method: 'POST',
            headers: { origin: 'https://kepenk.ai' },
        })
        const crossOrigin = new Request('https://kepenk.ai/api/admin/kota', {
            method: 'POST',
            headers: { origin: 'https://attacker.example' },
        })

        expect(isSameOriginMutation(sameOrigin)).toBe(true)
        expect(isSameOriginMutation(crossOrigin)).toBe(false)
    })
})
