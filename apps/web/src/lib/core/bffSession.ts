import { createCipheriv, createDecipheriv, createHash, hkdfSync, randomBytes, timingSafeEqual } from 'node:crypto'
import type { NextResponse } from 'next/server'
import { getSessionSecret } from '../auth/sessionSecret'
import { isSameOriginMutation } from '../apiGuard'
import {
  CORE_BFF_CSRF_COOKIE,
  CORE_BFF_CSRF_HEADER,
  CORE_BFF_SESSION_COOKIE,
  CORE_BFF_SESSION_TTL_SECONDS,
} from './config'
import type { SupabaseSession } from './supabaseAuth'

/**
 * KC-02: host-only HttpOnly BFF session for app.kepenk.ai.
 *
 * The browser holds an opaque locator only. The durable record keeps the
 * Supabase access/refresh tokens encrypted at rest (AES-256-GCM, key derived
 * from SESSION_SECRET) and is the sole place tokens live. Authority still
 * comes from the verified Supabase JWT + Postgres memberships on every
 * request; this record is a locator, not a permission source.
 */
export interface CoreBffSessionRecord {
  sessionId: string
  userId: string
  createdAt: string
  expiresAt: string
  lastSeenAt: string
  revokedAt: string | null
  accessTokenEnc: string
  refreshTokenEnc: string
  accessExpiresAt: string
  selectedBusinessId: string | null
}

export interface CoreBffSessionRepository {
  get(sessionId: string): Promise<CoreBffSessionRecord | null>
  create(record: CoreBffSessionRecord): Promise<void>
  update(sessionId: string, patch: Partial<CoreBffSessionRecord>): Promise<void>
}

export class InMemoryCoreBffSessionRepository implements CoreBffSessionRepository {
  readonly records = new Map<string, CoreBffSessionRecord>()
  async get(sessionId: string): Promise<CoreBffSessionRecord | null> {
    const record = this.records.get(sessionId)
    return record ? { ...record } : null
  }
  async create(record: CoreBffSessionRecord): Promise<void> {
    this.records.set(record.sessionId, { ...record })
  }
  async update(sessionId: string, patch: Partial<CoreBffSessionRecord>): Promise<void> {
    const existing = this.records.get(sessionId)
    if (!existing) throw new Error('session missing')
    this.records.set(sessionId, { ...existing, ...patch })
  }
}

const TOKEN_RE = /^[A-Za-z0-9_-]{43}$/

export function hashCoreSessionToken(token: string): string {
  return createHash('sha256').update(token, 'utf8').digest('hex')
}

function encryptionKey(): Buffer {
  const secret = getSessionSecret()
  return Buffer.from(hkdfSync('sha256', secret, Buffer.alloc(0), 'kepenk-core-bff-v1', 32))
}

export function encryptSessionMaterial(plaintext: string): string {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', encryptionKey(), iv)
  const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
  return `v1.${iv.toString('base64url')}.${cipher.getAuthTag().toString('base64url')}.${ciphertext.toString('base64url')}`
}

export function decryptSessionMaterial(envelope: string): string | null {
  const parts = envelope.split('.')
  if (parts.length !== 4 || parts[0] !== 'v1') return null
  try {
    const decipher = createDecipheriv('aes-256-gcm', encryptionKey(), Buffer.from(parts[1], 'base64url'))
    decipher.setAuthTag(Buffer.from(parts[2], 'base64url'))
    return Buffer.concat([decipher.update(Buffer.from(parts[3], 'base64url')), decipher.final()]).toString('utf8')
  } catch {
    return null
  }
}

export function readCookie(request: Request, name: string): string | null {
  const header = request.headers.get('cookie')
  if (!header) return null
  for (const pair of header.split(';')) {
    const separator = pair.indexOf('=')
    if (separator < 0) continue
    if (pair.slice(0, separator).trim() !== name) continue
    const value = pair.slice(separator + 1).trim()
    return value || null
  }
  return null
}

export function readCoreSessionToken(request: Request): string | null {
  const value = readCookie(request, CORE_BFF_SESSION_COOKIE)
  return value && TOKEN_RE.test(value) ? value : null
}

/** Double-submit CSRF: header must equal the readable cookie, and Origin must match the host. */
export function verifyCoreCsrf(request: Request): boolean {
  if (!isSameOriginMutation(request)) return false
  const method = request.method.toUpperCase()
  if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') return true
  const cookie = readCookie(request, CORE_BFF_CSRF_COOKIE)
  const header = request.headers.get(CORE_BFF_CSRF_HEADER)
  if (!cookie || !header || !TOKEN_RE.test(cookie) || cookie.length !== header.length) return false
  return timingSafeEqual(Buffer.from(cookie), Buffer.from(header))
}

export interface IssuedCoreBffSession {
  token: string
  csrfToken: string
  record: CoreBffSessionRecord
}

export async function issueCoreBffSession(
  repository: CoreBffSessionRepository,
  session: SupabaseSession,
  now: Date = new Date()
): Promise<IssuedCoreBffSession> {
  const token = randomBytes(32).toString('base64url')
  const csrfToken = randomBytes(32).toString('base64url')
  const record: CoreBffSessionRecord = {
    sessionId: hashCoreSessionToken(token),
    userId: session.user.id,
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + CORE_BFF_SESSION_TTL_SECONDS * 1000).toISOString(),
    lastSeenAt: now.toISOString(),
    revokedAt: null,
    accessTokenEnc: encryptSessionMaterial(session.access_token),
    refreshTokenEnc: encryptSessionMaterial(session.refresh_token),
    accessExpiresAt: new Date(now.getTime() + session.expires_in * 1000).toISOString(),
    selectedBusinessId: null,
  }
  await repository.create(record)
  return { token, csrfToken, record }
}

export async function loadCoreBffSession(
  repository: CoreBffSessionRepository,
  token: string,
  now: Date = new Date()
): Promise<CoreBffSessionRecord | null> {
  if (!TOKEN_RE.test(token)) return null
  const record = await repository.get(hashCoreSessionToken(token))
  if (!record || record.revokedAt) return null
  if (new Date(record.expiresAt).getTime() <= now.getTime()) return null
  return record
}

export async function revokeCoreBffSession(repository: CoreBffSessionRepository, token: string, now: Date = new Date()): Promise<boolean> {
  if (!TOKEN_RE.test(token)) return false
  const record = await repository.get(hashCoreSessionToken(token))
  if (!record || record.revokedAt) return false
  await repository.update(record.sessionId, { revokedAt: now.toISOString() })
  return true
}

export async function storeRefreshedTokens(
  repository: CoreBffSessionRepository,
  record: CoreBffSessionRecord,
  session: SupabaseSession,
  now: Date = new Date()
): Promise<CoreBffSessionRecord> {
  const patch = {
    accessTokenEnc: encryptSessionMaterial(session.access_token),
    refreshTokenEnc: encryptSessionMaterial(session.refresh_token),
    accessExpiresAt: new Date(now.getTime() + session.expires_in * 1000).toISOString(),
    lastSeenAt: now.toISOString(),
  }
  await repository.update(record.sessionId, patch)
  return { ...record, ...patch }
}

export function decryptedTokens(record: CoreBffSessionRecord): { accessToken: string; refreshToken: string } | null {
  const accessToken = decryptSessionMaterial(record.accessTokenEnc)
  const refreshToken = decryptSessionMaterial(record.refreshTokenEnc)
  if (!accessToken || !refreshToken) return null
  return { accessToken, refreshToken }
}

function secureCookies(): boolean {
  return process.env.NODE_ENV === 'production'
}

/** Host-only cookies: no Domain attribute, ever (K04 §6). */
export function attachCoreSessionCookies(response: NextResponse, issued: { token: string; csrfToken: string }): NextResponse {
  response.cookies.set(CORE_BFF_SESSION_COOKIE, issued.token, {
    httpOnly: true,
    secure: secureCookies(),
    sameSite: 'strict',
    path: '/',
    maxAge: CORE_BFF_SESSION_TTL_SECONDS,
  })
  response.cookies.set(CORE_BFF_CSRF_COOKIE, issued.csrfToken, {
    httpOnly: false,
    secure: secureCookies(),
    sameSite: 'strict',
    path: '/',
    maxAge: CORE_BFF_SESSION_TTL_SECONDS,
  })
  return response
}

export function clearCoreSessionCookies(response: NextResponse): NextResponse {
  for (const name of [CORE_BFF_SESSION_COOKIE, CORE_BFF_CSRF_COOKIE]) {
    response.cookies.set(name, '', {
      httpOnly: name === CORE_BFF_SESSION_COOKIE,
      secure: secureCookies(),
      sameSite: 'strict',
      path: '/',
      maxAge: 0,
    })
  }
  return response
}
