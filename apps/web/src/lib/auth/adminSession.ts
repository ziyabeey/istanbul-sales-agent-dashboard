import crypto from 'crypto'
import type { Firestore } from 'firebase-admin/firestore'
import { adminDb } from '../firebaseAdmin'

import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_TTL_SECONDS } from './adminSessionConstants'

export { ADMIN_SESSION_COOKIE, ADMIN_SESSION_TTL_SECONDS } from './adminSessionConstants'

const ADMIN_SESSION_COLLECTION = 'auth_admin_sessions'
const ADMIN_SESSION_TOKEN_RE = /^[A-Za-z0-9_-]{43}$/
const TOKEN_HASH_RE = /^[a-f0-9]{64}$/
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const ADMIN_SESSION_KEYS = new Set([
    'sessionId',
    'principalId',
    'tokenHash',
    'issuedAt',
    'expiresAt',
    'revokedAt',
])

export type AdminSession = {
    sessionId: string
    principalId: string
    tokenHash: string
    issuedAt: string
    expiresAt: string
    revokedAt: string | null
}

function parseIsoDateTime(value: unknown, fieldName: string): string {
    if (typeof value !== 'string') {
        throw new Error(`${fieldName} must be an ISO date-time string`)
    }

    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime()) || parsed.toISOString() !== value) {
        throw new Error(`${fieldName} must be a valid ISO date-time string`)
    }

    return value
}

function parseAdminSession(value: unknown): AdminSession {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new Error('AdminSession must be an object')
    }

    const record = value as Record<string, unknown>
    const keys = Object.keys(record)
    if (keys.length !== ADMIN_SESSION_KEYS.size || keys.some((key) => !ADMIN_SESSION_KEYS.has(key))) {
        throw new Error('AdminSession contains unexpected or missing fields')
    }

    const { sessionId, principalId, tokenHash, issuedAt, expiresAt, revokedAt } = record

    if (typeof sessionId !== 'string' || !UUID_RE.test(sessionId)) {
        throw new Error('AdminSession sessionId must be a UUID')
    }
    if (typeof principalId !== 'string' || principalId.length === 0) {
        throw new Error('AdminSession principalId is required')
    }
    if (typeof tokenHash !== 'string' || !TOKEN_HASH_RE.test(tokenHash)) {
        throw new Error('AdminSession tokenHash must be a SHA-256 digest')
    }

    return {
        sessionId,
        principalId,
        tokenHash,
        issuedAt: parseIsoDateTime(issuedAt, 'issuedAt'),
        expiresAt: parseIsoDateTime(expiresAt, 'expiresAt'),
        revokedAt: revokedAt === null ? null : parseIsoDateTime(revokedAt, 'revokedAt'),
    }
}

export const AdminSessionSchema = {
    parse: parseAdminSession,
} as const

export interface AdminSessionRepository {
    getByTokenHash(tokenHash: string): Promise<AdminSession | null>
    create(session: AdminSession): Promise<void>
    revoke(tokenHash: string, revokedAt: string): Promise<boolean>
}

function requireAdminSessionDb(db: Firestore | null | undefined = adminDb): Firestore {
    if (!db) {
        throw new Error('Admin session repository requires an initialized Firestore connection')
    }
    return db
}

export class FirestoreAdminSessionRepository implements AdminSessionRepository {
    private readonly db: Firestore

    constructor(db?: Firestore | null) {
        this.db = requireAdminSessionDb(db)
    }

    async getByTokenHash(tokenHash: string): Promise<AdminSession | null> {
        if (!TOKEN_HASH_RE.test(tokenHash)) return null
        const snapshot = await this.db.collection(ADMIN_SESSION_COLLECTION).doc(tokenHash).get()
        if (!snapshot.exists) return null
        return AdminSessionSchema.parse(snapshot.data())
    }

    async create(session: AdminSession): Promise<void> {
        const parsed = AdminSessionSchema.parse(session)
        await this.db.collection(ADMIN_SESSION_COLLECTION).doc(parsed.tokenHash).create(parsed)
    }

    async revoke(tokenHash: string, revokedAt: string): Promise<boolean> {
        if (!TOKEN_HASH_RE.test(tokenHash)) return false
        const parsedRevokedAt = new Date(revokedAt)
        if (Number.isNaN(parsedRevokedAt.getTime())) {
            throw new Error('revokedAt must be a valid date-time')
        }

        const ref = this.db.collection(ADMIN_SESSION_COLLECTION).doc(tokenHash)

        return this.db.runTransaction(async (transaction) => {
            const snapshot = await transaction.get(ref)
            if (!snapshot.exists) return false

            const session = AdminSessionSchema.parse(snapshot.data())
            if (session.revokedAt) return true

            transaction.update(ref, { revokedAt: parsedRevokedAt.toISOString() })
            return true
        })
    }
}

export function hashAdminSessionToken(token: string): string {
    return crypto.createHash('sha256').update(token, 'utf8').digest('hex')
}

export function readAdminSessionToken(request: Request): string | null {
    const cookieHeader = request.headers.get('cookie')
    if (!cookieHeader) return null

    for (const pair of cookieHeader.split(';')) {
        const separatorIndex = pair.indexOf('=')
        if (separatorIndex < 0) continue

        const name = pair.slice(0, separatorIndex).trim()
        if (name !== ADMIN_SESSION_COOKIE) continue

        const value = pair.slice(separatorIndex + 1).trim()
        return ADMIN_SESSION_TOKEN_RE.test(value) ? value : null
    }

    return null
}

export async function issueAdminSession(
    repository: AdminSessionRepository = new FirestoreAdminSessionRepository(),
    now = new Date()
): Promise<{ token: string; session: AdminSession }> {
    const token = crypto.randomBytes(32).toString('base64url')
    const issuedAt = now.toISOString()
    const expiresAt = new Date(now.getTime() + ADMIN_SESSION_TTL_SECONDS * 1000).toISOString()

    const session = AdminSessionSchema.parse({
        sessionId: crypto.randomUUID(),
        principalId: 'super_admin',
        tokenHash: hashAdminSessionToken(token),
        issuedAt,
        expiresAt,
        revokedAt: null,
    })

    await repository.create(session)
    return { token, session }
}

export async function validateAdminSessionToken(
    token: string,
    repository: AdminSessionRepository = new FirestoreAdminSessionRepository(),
    now = new Date()
): Promise<AdminSession | null> {
    if (!ADMIN_SESSION_TOKEN_RE.test(token)) return null

    const session = await repository.getByTokenHash(hashAdminSessionToken(token))
    if (!session || session.revokedAt) return null
    if (new Date(session.expiresAt).getTime() <= now.getTime()) return null

    return session
}

export async function revokeAdminSessionToken(
    token: string,
    repository: AdminSessionRepository = new FirestoreAdminSessionRepository(),
    now = new Date()
): Promise<boolean> {
    if (!ADMIN_SESSION_TOKEN_RE.test(token)) return false
    return repository.revoke(hashAdminSessionToken(token), now.toISOString())
}
