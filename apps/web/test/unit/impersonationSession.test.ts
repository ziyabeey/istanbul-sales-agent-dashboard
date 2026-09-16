import { describe, expect, it } from 'vitest'
import {
    ADMIN_SESSION_COOKIE,
    issueAdminSession,
    revokeAdminSessionToken,
    type AdminSession,
    type AdminSessionRepository,
} from '@/lib/auth/adminSession'
import {
    IMPERSONATE_COOKIE,
    IMPERSONATION_TTL_SECONDS,
    ImpersonationRestrictedActionError,
    assertNoActiveImpersonationForRestrictedAction,
    endImpersonationSessionToken,
    getBoundActiveImpersonationFromRequest,
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

class MemoryAdminRepository implements AdminSessionRepository {
    readonly sessions = new Map<string, AdminSession>()

    async getByTokenHash(tokenHash: string): Promise<AdminSession | null> {
        return this.sessions.get(tokenHash) ?? null
    }

    async create(session: AdminSession): Promise<void> {
        this.sessions.set(session.tokenHash, session)
    }

    async revoke(tokenHash: string, revokedAt: string): Promise<boolean> {
        const session = this.sessions.get(tokenHash)
        if (!session) return false
        this.sessions.set(tokenHash, { ...session, revokedAt })
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

    it('blocks restricted actions only for impersonation bound to the active AdminSession', async () => {
        const impersonationRepository = new MemoryRepository()
        const adminSessionRepository = new MemoryAdminRepository()
        const now = new Date('2026-09-16T10:00:00.000Z')
        const admin = await issueAdminSession(adminSessionRepository, now)
        const { token } = await issueImpersonationSession({
            adminId: admin.session.principalId,
            subjectId: 'esnaf-1',
            subjectLabel: 'Salon',
            reason: 'support case',
        }, impersonationRepository, now)
        const request = new Request('https://kepenk.ai/api/admin/kota', {
            headers: {
                cookie: `${ADMIN_SESSION_COOKIE}=${admin.token}; ${IMPERSONATE_COOKIE}=${token}`,
            },
        })

        await expect(assertNoActiveImpersonationForRestrictedAction(
            request,
            impersonationRepository,
            now,
            adminSessionRepository
        )).rejects.toBeInstanceOf(ImpersonationRestrictedActionError)

        const orphanedImpersonation = new Request('https://kepenk.ai/api/admin/kota', {
            headers: { cookie: `${IMPERSONATE_COOKIE}=${token}` },
        })
        await expect(assertNoActiveImpersonationForRestrictedAction(
            orphanedImpersonation,
            impersonationRepository,
            now,
            adminSessionRepository
        )).resolves.toBeUndefined()
    })

    it('requires a still-valid AdminSession for acting-as authority', async () => {
        const impersonationRepository = new MemoryRepository()
        const adminSessionRepository = new MemoryAdminRepository()
        const now = new Date('2026-09-16T10:00:00.000Z')
        const admin = await issueAdminSession(adminSessionRepository, now)
        const impersonation = await issueImpersonationSession({
            adminId: admin.session.principalId,
            subjectId: 'esnaf-1',
            subjectLabel: 'Salon',
            reason: 'support case',
        }, impersonationRepository, now)

        const request = new Request('https://kepenk.ai/api/auth/me', {
            headers: {
                cookie: `${ADMIN_SESSION_COOKIE}=${admin.token}; ${IMPERSONATE_COOKIE}=${impersonation.token}`,
            },
        })

        expect(await getBoundActiveImpersonationFromRequest(request, {
            impersonationRepository,
            adminSessionRepository,
            now,
        })).not.toBeNull()

        await revokeAdminSessionToken(admin.token, adminSessionRepository, new Date(now.getTime() + 1000))

        expect(await getBoundActiveImpersonationFromRequest(request, {
            impersonationRepository,
            adminSessionRepository,
            now: new Date(now.getTime() + 2000),
        })).toBeNull()
    })
})
