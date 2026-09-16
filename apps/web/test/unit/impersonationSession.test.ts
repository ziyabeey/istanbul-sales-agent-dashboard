import { describe, expect, it } from 'vitest'
import {
    IMPERSONATION_TTL_SECONDS,
    ImpersonationRestrictedActionError,
    assertNoActiveImpersonationForRestrictedAction,
    endImpersonationSessionToken,
    hashImpersonationToken,
    issueImpersonationSession,
    validateImpersonationSessionToken,
    type ImpersonationSessionRepository,
} from '@/lib/impersonation'
import type { ImpersonationSession } from '../../../../packages/admin/src/types/impersonation'

class MemoryRepository implements ImpersonationSessionRepository {
    readonly sessions = new Map<string, ImpersonationSession>()

    async getByTokenHash(tokenHash: string): Promise<ImpersonationSession | null> {
        return this.sessions.get(tokenHash) ?? null
    }

    async create(session: ImpersonationSession): Promise<void> {
        this.sessions.set(session.tokenHash, session)
    }

    async end(tokenHash: string, endedAt: string): Promise<boolean> {
        const session = this.sessions.get(tokenHash)
        if (!session) return false
        this.sessions.set(tokenHash, { ...session, endedAt })
        return true
    }
}

describe('ImpersonationSession', () => {
    it('requires reason and clamps lifetime to one hour', async () => {
        const repository = new MemoryRepository()
        const now = new Date('2026-09-16T10:00:00.000Z')
        await expect(issueImpersonationSession({ adminId: 'admin-1', subjectId: 'esnaf-1', subjectLabel: 'Salon', reason: '   ' }, repository, now)).rejects.toThrow(/reason/i)

        const { token, session } = await issueImpersonationSession({ adminId: 'admin-1', subjectId: 'esnaf-1', subjectLabel: 'Salon', reason: 'support case' }, repository, now)
        expect(token).toMatch(/^[A-Za-z0-9_-]{43}$/)
        expect(session.tokenHash).toBe(hashImpersonationToken(token))
        expect(new Date(session.expiresAt).getTime() - now.getTime()).toBe(IMPERSONATION_TTL_SECONDS * 1000)
    })

    it('expires and ends durably', async () => {
        const repository = new MemoryRepository()
        const now = new Date('2026-09-16T10:00:00.000Z')
        const issued = await issueImpersonationSession({ adminId: 'admin-1', subjectId: 'esnaf-1', subjectLabel: 'Salon', reason: 'support case' }, repository, now)
        expect(await validateImpersonationSessionToken(issued.token, repository, now)).not.toBeNull()
        expect(await validateImpersonationSessionToken(issued.token, repository, new Date(now.getTime() + 60 * 60 * 1000))).toBeNull()

        const active = await issueImpersonationSession({ adminId: 'admin-1', subjectId: 'esnaf-1', subjectLabel: 'Salon', reason: 'support case' }, repository, now)
        await endImpersonationSessionToken(active.token, repository, new Date(now.getTime() + 1000))
        expect(await validateImpersonationSessionToken(active.token, repository, new Date(now.getTime() + 2000))).toBeNull()
    })

    it('blocks restricted actions while impersonation is active', async () => {
        const repository = new MemoryRepository()
        const now = new Date('2026-09-16T10:00:00.000Z')
        const { token } = await issueImpersonationSession({ adminId: 'admin-1', subjectId: 'esnaf-1', subjectLabel: 'Salon', reason: 'support case' }, repository, now)
        const request = new Request('https://kepenk.ai/api/admin/kota', { headers: { cookie: `kepenk_impersonate=${token}` } })
        await expect(assertNoActiveImpersonationForRestrictedAction(request, repository, now)).rejects.toBeInstanceOf(ImpersonationRestrictedActionError)
    })
})
