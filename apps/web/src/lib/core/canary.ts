
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

// ---------------------------------------------------------------------------
// R1 KC-05 blocker 1: paid capabilities are never derived from the legacy
// `paket` value for canary tenants. The Iyzico callback runs without a Core
// user token, so for canary tenants the scenario opens nothing on its own and
// every paid capability arrives through the Core-event-gated projection
// (entitlement_granted / subscription_changed events emitted by Core).
// ---------------------------------------------------------------------------
export const PAID_CAPABILITIES = [
  'voice_assistant',
  'custom_domain',
  'ads_management',
  'booking',
  'lead_mining',
  'vip_support',
  'google_review_tracking',
  'morning_message',
  'content_facebook',
  'content_gmb',
] as const
export type PaidCapability = (typeof PAID_CAPABILITIES)[number]

const STANDART_CAPABILITIES: readonly PaidCapability[] = ['google_review_tracking', 'morning_message', 'content_facebook']
const BUYUME_CAPABILITIES: readonly PaidCapability[] = [...STANDART_CAPABILITIES, 'ads_management', 'booking', 'voice_assistant', 'content_gmb']
const PREMIUM_CAPABILITIES: readonly PaidCapability[] = [...BUYUME_CAPABILITIES, 'lead_mining', 'custom_domain']

/** What the legacy package scenario opened per `paket` before KC-05 (legacy tenants only). */
const LEGACY_PAKET_CAPABILITIES: Record<string, readonly PaidCapability[]> = {
  TEMEL: [],
  STANDART: STANDART_CAPABILITIES,
  BUYUME: BUYUME_CAPABILITIES,
  PREMIUM: PREMIUM_CAPABILITIES,
  PREMIUMPLUS: [...PREMIUM_CAPABILITIES, 'vip_support'],
}

export function legacyPaketCapabilities(paket: string): ReadonlySet<PaidCapability> {
  return new Set(LEGACY_PAKET_CAPABILITIES[paket] ?? [])
}

/** Core entitlement key -> legacy capability. Unknown keys open nothing. */
export const CORE_ENTITLEMENT_CAPABILITIES: Record<string, readonly PaidCapability[]> = {
  booking: ['booking'],
  custom_domain: ['custom_domain'],
  voice_assistant: ['voice_assistant'],
  ads_management: ['ads_management'],
  lead_mining: ['lead_mining'],
  vip_support: ['vip_support'],
  google_review_tracking: ['google_review_tracking'],
  morning_message: ['morning_message'],
  content_facebook: ['content_facebook'],
  content_gmb: ['content_gmb'],
}

export interface CoreEntitlementLike {
  entitlement_key: string
  granted: boolean
  valid_until?: string | null
}

export function capabilitiesFromCoreEntitlements(entitlements: readonly CoreEntitlementLike[], now: Date): ReadonlySet<PaidCapability> {
  const out = new Set<PaidCapability>()
  for (const entitlement of entitlements) {
    if (!entitlement.granted) continue
    if (entitlement.valid_until && new Date(entitlement.valid_until).getTime() <= now.getTime()) continue
    for (const capability of CORE_ENTITLEMENT_CAPABILITIES[entitlement.entitlement_key.trim().toLowerCase()] ?? []) out.add(capability)
  }
  return out
}

export type PaidCapabilityResolution =
  | { source: 'legacy'; capabilities: ReadonlySet<PaidCapability> }
  | { source: 'core'; capabilities: ReadonlySet<PaidCapability>; evidence: 'entitlements' | 'none' }

/**
 * Legacy tenants keep the `paket` mapping. Canary tenants only get what Core
 * entitlements grant; without Core evidence (the callback has none) the set is
 * empty, so a forged or stale `paket=PREMIUM` opens nothing.
 */
export function resolvePaidCapabilities(input: {
  esnafId: string
  paket: string
  coreEntitlements?: readonly CoreEntitlementLike[] | null
  now?: Date
  env?: EnvLike
}): PaidCapabilityResolution {
  const env = input.env ?? process.env
  if (!isCoreCanaryTenant(input.esnafId, env)) return { source: 'legacy', capabilities: legacyPaketCapabilities(input.paket) }
  if (!input.coreEntitlements) return { source: 'core', capabilities: new Set(), evidence: 'none' }
  return { source: 'core', capabilities: capabilitiesFromCoreEntitlements(input.coreEntitlements, input.now ?? new Date()), evidence: 'entitlements' }
}

/** Legacy `ayarlar.*` flags that the projection derives from Core entitlements for canary tenants. */
export const CAPABILITY_AYARLAR_FLAGS: Partial<Record<PaidCapability, string>> = {
  google_review_tracking: 'googleYorumTakip',
  morning_message: 'sabahMesaji',
  ads_management: 'reklamYonetimi',
  booking: 'randevuSistemi',
  lead_mining: 'leadMadencisi',
  custom_domain: 'customDomain',
  vip_support: 'vipDestek',
}

export function ayarlarPatchForEntitlementChanges(changes: readonly CoreEntitlementLike[]): Record<string, boolean> {
  const patch: Record<string, boolean> = {}
  for (const change of changes) {
    for (const capability of CORE_ENTITLEMENT_CAPABILITIES[change.entitlement_key.trim().toLowerCase()] ?? []) {
      const flag = CAPABILITY_AYARLAR_FLAGS[capability]
      if (flag) patch[flag] = change.granted
    }
  }
  return patch
}
