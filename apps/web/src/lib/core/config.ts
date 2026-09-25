import { CredentialRefSchema, type CredentialRef } from '../../../../../packages/security/src/credentials'

/**
 * KC-02: Kepenk Core connection configuration.
 *
 * The Supabase project URL and anon key are public-by-design values (they only
 * unlock RLS/RPC surfaces), but they are still read server-side. Confidential
 * material, the ServicePrincipal secret and the optional HS256 JWT secret,
 * never comes from NEXT_PUBLIC_* and is resolved through the P0-05
 * credential contract in `credentialResolver.ts`.
 */
export const CORE_CREDENTIAL_REFS = {
  principal: CredentialRefSchema.parse({
    credentialId: 'platform:core-principal',
    provider: 'kepenk-core',
    purpose: 'platform-command',
    storageKind: 'env',
    tenantId: null,
    version: null,
  }),
  jwt: CredentialRefSchema.parse({
    credentialId: 'platform:supabase-jwt',
    provider: 'supabase',
    purpose: 'session-verification',
    storageKind: 'env',
    tenantId: null,
    version: null,
  }),
} as const satisfies Record<string, CredentialRef>

export interface CoreConnectionConfig {
  supabaseUrl: string
  anonKey: string
  principalName: string
}

export const CORE_BFF_SESSION_COOKIE = 'kepenk_core_session'
export const CORE_BFF_CSRF_COOKIE = 'kepenk_core_csrf'
export const CORE_BFF_CSRF_HEADER = 'x-kepenk-csrf'
export const CORE_BFF_SESSION_TTL_SECONDS = 30 * 24 * 60 * 60
/** Refresh the Supabase access token when fewer than this many seconds remain. */
export const CORE_ACCESS_REFRESH_SKEW_SECONDS = 60

export function isCoreBffEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.CORE_BFF_ENABLED === 'true'
}

export function readCoreConnectionConfig(env: NodeJS.ProcessEnv = process.env): CoreConnectionConfig | null {
  const supabaseUrl = env.SUPABASE_URL?.trim().replace(/\/+$/, '')
  const anonKey = env.SUPABASE_ANON_KEY?.trim()
  const principalName = env.CORE_PRINCIPAL_NAME?.trim() || 'kepenk-web'
  if (!supabaseUrl || !anonKey) return null
  if (env.NODE_ENV === 'production' && !supabaseUrl.startsWith('https://')) return null
  return { supabaseUrl, anonKey, principalName }
}

export function coreIssuer(supabaseUrl: string): string {
  return `${supabaseUrl.replace(/\/+$/, '')}/auth/v1`
}

export function coreJwksUrl(supabaseUrl: string): string {
  return `${coreIssuer(supabaseUrl)}/.well-known/jwks.json`
}
