import { NextResponse } from 'next/server'
import { CORE_ACCESS_REFRESH_SKEW_SECONDS } from './config'
import type { CoreMembership, CorePlatformClient, CoreSnapshot } from './coreClient'
import { CoreAuthError, CorePlatformError } from './errors'
import { isRecoverySession, type SupabaseClaims, type SupabaseJwtVerifier } from './jwtVerifier'
import {
  decryptedTokens,
  loadCoreBffSession,
  readCoreSessionToken,
  storeRefreshedTokens,
  verifyCoreCsrf,
  type CoreBffSessionRecord,
  type CoreBffSessionRepository,
} from './bffSession'
import type { SupabaseAuthClient } from './supabaseAuth'

/**
 * KC-02: CoreRequestContext = { user_id, business_id, role, entitlements }.
 *
 * user_id comes from the verified JWT `sub`; business_id and role are derived
 * from the user's active Postgres memberships and never from a client value.
 * A stored business selection is only a hint and is dropped when it no longer
 * matches an active membership (deactivation is effective on the next
 * request). Entitlements are read from the KC-01 snapshot RPC with the user's
 * own JWT for the resolved business; a Core outage fails closed instead of
 * yielding an empty-but-trusted set.
 */
export interface CoreRequestContext {
  kind: 'core'
  sessionId: string
  userId: string
  accessToken: string
  claims: SupabaseClaims
  recovery: boolean
  memberships: CoreMembership[]
  businessId: string | null
  role: CoreMembership['role'] | null
  /** Granted, unexpired entitlement keys for `businessId` (empty when no business). */
  entitlements: string[]
  subscription: CoreSnapshot['subscription']
}

export interface CoreContextDeps {
  sessions: CoreBffSessionRepository
  auth: SupabaseAuthClient
  verifier: SupabaseJwtVerifier
  client: CorePlatformClient
  now?: () => Date
}

export type CoreContextFailure =
  | 'NO_SESSION'
  | 'SESSION_REVOKED'
  | 'SESSION_EXPIRED'
  | 'CSRF_REJECTED'
  | 'RECOVERY_REQUIRED'
  | 'CORE_UNAVAILABLE'

export type CoreContextResult =
  | { ok: true; context: CoreRequestContext; record: CoreBffSessionRecord }
  | { ok: false; reason: CoreContextFailure }

async function ensureFreshAccessToken(
  deps: CoreContextDeps,
  record: CoreBffSessionRecord,
  now: Date
): Promise<{ record: CoreBffSessionRecord; accessToken: string; claims: SupabaseClaims } | null> {
  const tokens = decryptedTokens(record)
  if (!tokens) return null

  const accessExpiresAt = new Date(record.accessExpiresAt).getTime()
  const needsRefresh = accessExpiresAt - now.getTime() < CORE_ACCESS_REFRESH_SKEW_SECONDS * 1000

  if (!needsRefresh) {
    try {
      const claims = await deps.verifier.verify(tokens.accessToken)
      return { record, accessToken: tokens.accessToken, claims }
    } catch (error) {
      if (!(error instanceof CoreAuthError) || error.code !== 'SESSION_EXPIRED') throw error
      // fall through to refresh
    }
  }

  const refreshed = await deps.auth.refreshSession(tokens.refreshToken)
  const updated = await storeRefreshedTokens(deps.sessions, record, refreshed, now)
  const claims = await deps.verifier.verify(refreshed.access_token)
  return { record: updated, accessToken: refreshed.access_token, claims }
}

function grantedEntitlementKeys(snapshot: CoreSnapshot, now: Date): string[] {
  return snapshot.entitlements
    .filter((e) => e.granted && (!e.valid_until || new Date(e.valid_until).getTime() > now.getTime()))
    .map((e) => e.entitlement_key)
    .sort()
}

export async function resolveCoreRequestContext(request: Request, deps: CoreContextDeps): Promise<CoreContextResult> {
  const now = deps.now ? deps.now() : new Date()
  const token = readCoreSessionToken(request)
  if (!token) return { ok: false, reason: 'NO_SESSION' }

  const record = await loadCoreBffSession(deps.sessions, token, now)
  if (!record) return { ok: false, reason: 'SESSION_REVOKED' }

  let fresh: Awaited<ReturnType<typeof ensureFreshAccessToken>>
  try {
    fresh = await ensureFreshAccessToken(deps, record, now)
  } catch (error) {
    if (error instanceof CoreAuthError) {
      return { ok: false, reason: error.code === 'AUTH_UNAVAILABLE' ? 'CORE_UNAVAILABLE' : 'SESSION_EXPIRED' }
    }
    return { ok: false, reason: 'CORE_UNAVAILABLE' }
  }
  if (!fresh) return { ok: false, reason: 'SESSION_EXPIRED' }
  if (fresh.claims.sub !== record.userId) return { ok: false, reason: 'SESSION_REVOKED' }

  const recovery = isRecoverySession(fresh.claims)
  let memberships: CoreMembership[] = []
  if (!recovery) {
    try {
      memberships = await deps.client.listMemberships(fresh.accessToken)
    } catch (error) {
      if (error instanceof CorePlatformError && error.code === 'AUTH_REQUIRED') {
        return { ok: false, reason: 'SESSION_EXPIRED' }
      }
      return { ok: false, reason: 'CORE_UNAVAILABLE' }
    }
  }

  const selected = fresh.record.selectedBusinessId
  const active = memberships.filter((m) => m.active)
  const chosen =
    (selected && active.find((m) => m.business_id === selected)) ||
    (active.length === 1 ? active[0] : null)

  let entitlements: string[] = []
  let subscription: CoreSnapshot['subscription'] = null
  if (chosen) {
    try {
      const snapshot = await deps.client.getBusinessPlatformSnapshot(fresh.accessToken, chosen.business_id)
      entitlements = grantedEntitlementKeys(snapshot, now)
      subscription = snapshot.subscription
    } catch (error) {
      if (error instanceof CorePlatformError && (error.code === 'AUTH_REQUIRED' || error.code === 'BUSINESS_ACCESS_DENIED')) {
        return { ok: false, reason: 'SESSION_EXPIRED' }
      }
      return { ok: false, reason: 'CORE_UNAVAILABLE' }
    }
  }

  return {
    ok: true,
    record: fresh.record,
    context: {
      kind: 'core',
      sessionId: fresh.record.sessionId,
      userId: fresh.claims.sub,
      accessToken: fresh.accessToken,
      claims: fresh.claims,
      recovery,
      memberships: active,
      businessId: chosen?.business_id ?? null,
      role: chosen?.role ?? null,
      entitlements,
      subscription,
    },
  }
}

/** Single authorization primitive for Kepenk code paths (mirrors public.has_entitlement). */
export function hasContextEntitlement(context: CoreRequestContext, entitlementKey: string): boolean {
  return context.businessId !== null && context.entitlements.includes(entitlementKey.trim().toLowerCase())
}

export interface RequireCoreContextOptions {
  /** Enforce CSRF + Origin for state-changing requests (default true). */
  csrf?: boolean
  /** Allow recovery-class sessions (only the password-update surface may). */
  allowRecovery?: boolean
  /** Require a resolved active business membership. */
  requireBusiness?: boolean
  /** Require a granted entitlement for the resolved business. */
  requireEntitlement?: string
}

export type RequireCoreContextResult =
  | { ok: true; context: CoreRequestContext; record: CoreBffSessionRecord }
  | { ok: false; response: NextResponse }

const FAILURE_STATUS: Record<CoreContextFailure, number> = {
  NO_SESSION: 401,
  SESSION_REVOKED: 401,
  SESSION_EXPIRED: 401,
  CSRF_REJECTED: 403,
  RECOVERY_REQUIRED: 403,
  CORE_UNAVAILABLE: 503,
}

export async function requireCoreContext(
  request: Request,
  deps: CoreContextDeps,
  options: RequireCoreContextOptions = {}
): Promise<RequireCoreContextResult> {
  const fail = (reason: CoreContextFailure): RequireCoreContextResult => ({
    ok: false,
    response: NextResponse.json({ error: reason }, { status: FAILURE_STATUS[reason] }),
  })

  if (options.csrf !== false && !verifyCoreCsrf(request)) return fail('CSRF_REJECTED')

  const resolved = await resolveCoreRequestContext(request, deps)
  if (!resolved.ok) return fail(resolved.reason)
  if (resolved.context.recovery && !options.allowRecovery) return fail('RECOVERY_REQUIRED')
  if ((options.requireBusiness || options.requireEntitlement) && !resolved.context.businessId) {
    return { ok: false, response: NextResponse.json({ error: 'BUSINESS_REQUIRED' }, { status: 403 }) }
  }
  if (options.requireEntitlement && !hasContextEntitlement(resolved.context, options.requireEntitlement)) {
    return { ok: false, response: NextResponse.json({ error: 'ENTITLEMENT_REQUIRED', entitlement: options.requireEntitlement }, { status: 403 }) }
  }
  return resolved
}
