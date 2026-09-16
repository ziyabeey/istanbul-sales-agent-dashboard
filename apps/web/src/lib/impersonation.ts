import crypto from 'crypto'
import type { Firestore } from 'firebase-admin/firestore'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { ImpersonationSession } from '../../../../packages/admin/src/types/impersonation'
import { adminDb } from './firebaseAdmin'
import {
    ADMIN_SESSION_COOKIE,
    readAdminSessionToken,
    validateAdminSessionToken,
    type AdminSessionRepository,
} from './auth/adminSession'

export const IMPERSONATE_COOKIE = 'kepenk_impersonate'
export const IMPERSONATION_TTL_SECONDS = 60 * 60

const IMPERSONATION_COLLECTION = 'auth_impersonation_sessions'
const TOKEN_RE = /^[A-Za-z0-9_-]{43}$/
const TOKEN_HASH_RE = /^[a-f0-9]{64}$/
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const SESSION_KEYS = new Set([
    'sessionId',
    'tokenHash',
    'adminId',
    'subject',
    'reason',
    'startedAt',
    'expiresAt',
    'endedAt',
])

function parseIso(value: unknown, field: string): string {
    if (typeof value !== 'string') throw new Error(`${field} must be an ISO date-time string`)
    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime()) || parsed.toISOString() !== value) {
        throw new Error(`${field} must be a valid ISO date-time string`)
    }
    return value
}

function parseImpersonationSession(value: unknown): ImpersonationSession {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new Error('ImpersonationSession must be an object')
    }

    const record = value as Record<string, unknown>
    const keys = Object.keys(record)
    if (keys.length !== SESSION_KEYS.size || keys.some((key) => !SESSION_KEYS.has(key))) {
        throw new Error('ImpersonationSession contains unexpected or missing fields')
    }

    const { sessionId, tokenHash, adminId, subject, reason, startedAt, expiresAt, endedAt } = record
    if (typeof sessionId !== 'string' || !UUID_RE.test(sessionId)) {
        throw new Error('ImpersonationSession sessionId must be a UUID')
    }
    if (typeof tokenHash !== 'string' || !TOKEN_HASH_RE.test(tokenHash)) {
        throw new Error('ImpersonationSession tokenHash must be a SHA-256 digest')
    }
    if (typeof adminId !== 'string' || !adminId.trim()) {
        throw new Error('ImpersonationSession adminId is required')
    }
    if (!subject || typeof subject !== 'object' || Array.isArray(subject)) {
        throw new Error('ImpersonationSession subject is required')
    }
    const subjectRecord = subject as Record<string, unknown>
    if (
        subjectRecord.type !== 'esnaf' ||
        typeof subjectRecord.id !== 'string' || !subjectRecord.id.trim() ||
        typeof subjectRecord.label !== 'string' || !subjectRecord.label.trim()
    ) {
        throw new Error('ImpersonationSession subject is invalid')
    }
    if (typeof reason !== 'string' || !reason.trim() || reason.length > 500) {
        throw new Error('ImpersonationSession reason is required')
    }

    const parsedStartedAt = parseIso(startedAt, 'startedAt')
    const parsedExpiresAt = parseIso(expiresAt, 'expiresAt')
    const ttlMs = new Date(parsedExpiresAt).getTime() - new Date(parsedStartedAt).getTime()
    if (ttlMs <= 0 || ttlMs > IMPERSONATION_TTL_SECONDS * 1000) {
        throw new Error('ImpersonationSession expiry exceeds policy')
    }

    return {
        sessionId,
        tokenHash,
        adminId,
        subject: {
            type: 'esnaf',
            id: subjectRecord.id,
            label: subjectRecord.label,
        },
        reason: reason.trim(),
        startedAt: parsedStartedAt,
        expiresAt: parsedExpiresAt,
        endedAt: endedAt === null ? null : parseIso(endedAt, 'endedAt'),
    }
}

export const ImpersonationSessionSchema = { parse: parseImpersonationSession } as const

export interface ImpersonationSessionRepository {
    getByTokenHash(tokenHash: string): Promise<ImpersonationSession | null>
    create(session: ImpersonationSession): Promise<void>
    end(tokenHash: string, endedAt: string): Promise<boolean>
}

function requireDb(db: Firestore | null | undefined = adminDb): Firestore {
    if (!db) throw new Error('Impersonation session repository requires Firestore')
    return db
}

export class FirestoreImpersonationSessionRepository implements ImpersonationSessionRepository {
    private readonly db: Firestore

    constructor(db?: Firestore | null) {
        this.db = requireDb(db)
    }

    async getByTokenHash(tokenHash: string): Promise<ImpersonationSession | null> {
        if (!TOKEN_HASH_RE.test(tokenHash)) return null
        const snapshot = await this.db.collection(IMPERSONATION_COLLECTION).doc(tokenHash).get()
        if (!snapshot.exists) return null
        return ImpersonationSessionSchema.parse(snapshot.data())
    }

    async create(session: ImpersonationSession): Promise<void> {
        const parsed = ImpersonationSessionSchema.parse(session)
        await this.db.collection(IMPERSONATION_COLLECTION).doc(parsed.tokenHash).create(parsed)
    }

    async end(tokenHash: string, endedAt: string): Promise<boolean> {
        if (!TOKEN_HASH_RE.test(tokenHash)) return false
        const parsedEndedAt = parseIso(endedAt, 'endedAt')
        const ref = this.db.collection(IMPERSONATION_COLLECTION).doc(tokenHash)

        return this.db.runTransaction(async (transaction) => {
            const snapshot = await transaction.get(ref)
            if (!snapshot.exists) return false
            const session = ImpersonationSessionSchema.parse(snapshot.data())
            if (session.endedAt) return true
            transaction.update(ref, { endedAt: parsedEndedAt })
            return true
        })
    }
}

export class ImpersonationRestrictedActionError extends Error {
    constructor() {
        super('Bu işlem impersonation sırasında yasaktır')
        this.name = 'ImpersonationRestrictedActionError'
    }
}

export function hashImpersonationToken(token: string): string {
    return crypto.createHash('sha256').update(token, 'utf8').digest('hex')
}

export function readImpersonationSessionToken(request: Request): string | null {
    const cookieHeader = request.headers.get('cookie')
    if (!cookieHeader) return null

    for (const pair of cookieHeader.split(';')) {
        const separator = pair.indexOf('=')
        if (separator < 0) continue
        if (pair.slice(0, separator).trim() !== IMPERSONATE_COOKIE) continue
        const value = pair.slice(separator + 1).trim()
        return TOKEN_RE.test(value) ? value : null
    }
    return null
}

export async function issueImpersonationSession(
    input: { adminId: string; subjectId: string; subjectLabel: string; reason: string },
    repository: ImpersonationSessionRepository = new FirestoreImpersonationSessionRepository(),
    now = new Date()
): Promise<{ token: string; session: ImpersonationSession }> {
    const reason = input.reason.trim()
    if (!reason) throw new Error('Impersonation reason is required')
    if (reason.length > 500) throw new Error('Impersonation reason is too long')

    const token = crypto.randomBytes(32).toString('base64url')
    const startedAt = now.toISOString()
    const expiresAt = new Date(now.getTime() + IMPERSONATION_TTL_SECONDS * 1000).toISOString()
    const session = ImpersonationSessionSchema.parse({
        sessionId: crypto.randomUUID(),
        tokenHash: hashImpersonationToken(token),
        adminId: input.adminId,
        subject: { type: 'esnaf', id: input.subjectId, label: input.subjectLabel },
        reason,
        startedAt,
        expiresAt,
        endedAt: null,
    })

    await repository.create(session)
    return { token, session }
}

export async function validateImpersonationSessionToken(
    token: string,
    repository: ImpersonationSessionRepository = new FirestoreImpersonationSessionRepository(),
    now = new Date()
): Promise<ImpersonationSession | null> {
    if (!TOKEN_RE.test(token)) return null
    const session = await repository.getByTokenHash(hashImpersonationToken(token))
    if (!session || session.endedAt) return null
    if (new Date(session.expiresAt).getTime() <= now.getTime()) return null
    return session
}

export async function endImpersonationSessionToken(
    token: string,
    repository: ImpersonationSessionRepository = new FirestoreImpersonationSessionRepository(),
    now = new Date()
): Promise<boolean> {
    if (!TOKEN_RE.test(token)) return false
    return repository.end(hashImpersonationToken(token), now.toISOString())
}

export async function getActiveImpersonationFromRequest(
    request: Request,
    repository?: ImpersonationSessionRepository,
    now = new Date()
): Promise<ImpersonationSession | null> {
    const token = readImpersonationSessionToken(request)
    if (!token) return null
    return validateImpersonationSessionToken(
        token,
        repository ?? new FirestoreImpersonationSessionRepository(),
        now
    )
}

export async function getBoundActiveImpersonationFromRequest(
    request: Request,
    options: {
        impersonationRepository?: ImpersonationSessionRepository
        adminSessionRepository?: AdminSessionRepository
        now?: Date
    } = {}
): Promise<ImpersonationSession | null> {
    const impersonationToken = readImpersonationSessionToken(request)
    if (!impersonationToken) return null

    const adminToken = readAdminSessionToken(request)
    if (!adminToken) return null

    const now = options.now ?? new Date()
    const impersonation = await validateImpersonationSessionToken(
        impersonationToken,
        options.impersonationRepository ?? new FirestoreImpersonationSessionRepository(),
        now
    )
    if (!impersonation) return null

    const adminSession = options.adminSessionRepository
        ? await validateAdminSessionToken(adminToken, options.adminSessionRepository, now)
        : await validateAdminSessionToken(adminToken, undefined, now)

    if (!adminSession || adminSession.principalId !== impersonation.adminId) return null
    return impersonation
}

export async function assertNoActiveImpersonationForRestrictedAction(
    request: Request,
    repository?: ImpersonationSessionRepository,
    now = new Date(),
    adminSessionRepository?: AdminSessionRepository
): Promise<void> {
    if (!readImpersonationSessionToken(request)) return

    const session = await getBoundActiveImpersonationFromRequest(request, {
        impersonationRepository: repository,
        adminSessionRepository,
        now,
    })
    if (session) throw new ImpersonationRestrictedActionError()
}

export async function impersonateBaslat(
    adminId: string,
    hedefEsnafId: string,
    hedefEsnafAd: string,
    reason: string,
    response: NextResponse
): Promise<NextResponse> {
    const { token } = await issueImpersonationSession({
        adminId,
        subjectId: hedefEsnafId,
        subjectLabel: hedefEsnafAd,
        reason,
    })

    response.cookies.set(IMPERSONATE_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: IMPERSONATION_TTL_SECONDS,
        path: '/',
    })
    return response
}

export async function impersonationBilgiAl(): Promise<{
    aktif: boolean
    esnafId?: string
    adminId?: string
    hedefEsnafAd?: string
    reason?: string
    expiresAt?: string
}> {
    const cookieStore = await cookies()
    const impersonationToken = cookieStore.get(IMPERSONATE_COOKIE)?.value
    const adminToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value
    if (
        !impersonationToken || !TOKEN_RE.test(impersonationToken) ||
        !adminToken
    ) {
        return { aktif: false }
    }

    const session = await validateImpersonationSessionToken(impersonationToken)
    if (!session) return { aktif: false }

    const adminSession = await validateAdminSessionToken(adminToken)
    if (!adminSession || adminSession.principalId !== session.adminId) {
        return { aktif: false }
    }

    return {
        aktif: true,
        esnafId: session.subject.id,
        adminId: session.adminId,
        hedefEsnafAd: session.subject.label,
        reason: session.reason,
        expiresAt: session.expiresAt,
    }
}

export async function impersonateBitir(response: NextResponse): Promise<NextResponse> {
    response.cookies.set(IMPERSONATE_COOKIE, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/',
    })
    return response
}
