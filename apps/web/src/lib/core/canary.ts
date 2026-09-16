
/** Minimal env shape so tests can pass partial environments. */
export type EnvLike = Record<string, string | undefined>
/**
 * KC-05: canary cutover gate.
 *
 * For tenants listed in CORE_CANARY_TENANTS the legacy Firestore root stops
 * being the commercial authority: `paket` / `durum` / `aktifModuller` may no
 * longer be written by the legacy package scenario or by raw admin patches.
 * Those values are owned by Core (subscription + entitlements) and land on
 * the tenant document only through the one-way projection. Rollback is
 * removing the tenant from the list; no insecure path is revived (K04).
 */
export const LEGACY_COMMERCIAL_FIELDS = ['paket', 'durum', 'aktifModuller'] as const
export type LegacyCommercialField = (typeof LEGACY_COMMERCIAL_FIELDS)[number]

export function coreCanaryTenants(env: EnvLike = process.env): ReadonlySet<string> {
  const raw = env.CORE_CANARY_TENANTS ?? ''
  return new Set(
    raw
      .split(/[\s,;]+/)
      .map((value) => value.trim())
      .filter((value) => value.length > 0)
  )
}

export function isCoreCanaryTenant(esnafId: string, env: EnvLike = process.env): boolean {
  return Boolean(esnafId) && coreCanaryTenants(env).has(esnafId)
}

export class CoreCanaryWriteBlockedError extends Error {
  readonly code = 'CORE_CANARY_WRITE_BLOCKED'
  constructor(readonly esnafId: string, readonly fields: string[]) {
    super(`Legacy commercial write blocked for canary tenant ${esnafId}: ${fields.join(', ')}`)
    this.name = 'CoreCanaryWriteBlockedError'
  }
}

export function blockedCommercialFields(fields: Iterable<string>): string[] {
  const commercial = new Set<string>(LEGACY_COMMERCIAL_FIELDS)
  return [...new Set([...fields].filter((field) => commercial.has(field)))]
}

/** Throws for canary tenants when the patch (or field list) touches a Core-owned field. */
export function assertLegacyCommercialWriteAllowed(
  esnafId: string,
  patch: Record<string, unknown> | string[],
  env: EnvLike = process.env
): void {
  if (!isCoreCanaryTenant(esnafId, env)) return
  const fields = blockedCommercialFields(Array.isArray(patch) ? patch : Object.keys(patch))
  if (fields.length > 0) throw new CoreCanaryWriteBlockedError(esnafId, fields)
}

/** Returns the patch without Core-owned fields for canary tenants (legacy tenants pass through). */
export function stripLegacyCommercialFields<T extends Record<string, unknown>>(
  esnafId: string,
  patch: T,
  env: EnvLike = process.env
): { patch: Partial<T>; blocked: string[] } {
  if (!isCoreCanaryTenant(esnafId, env)) return { patch, blocked: [] }
  const blocked = blockedCommercialFields(Object.keys(patch))
  const filtered: Partial<T> = {}
  for (const [key, value] of Object.entries(patch)) {
    if (!blocked.includes(key)) (filtered as Record<string, unknown>)[key] = value
  }
  return { patch: filtered, blocked }
}

/** Core subscription status -> legacy `durum` value written by the projection for canary tenants. */
export function legacyDurumForSubscriptionStatus(status: 'trial' | 'active' | 'past_due' | 'cancelled'): 'aktif' | 'riskli' | 'pasif' {
  if (status === 'trial' || status === 'active') return 'aktif'
  if (status === 'past_due') return 'riskli'
  return 'pasif'
}
