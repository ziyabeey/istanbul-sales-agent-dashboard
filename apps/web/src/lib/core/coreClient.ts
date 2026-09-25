import { createHash } from 'node:crypto'
import { z } from 'zod'
import { CorePlatformError, normalizeCoreErrorCode } from './errors'

/**
 * KC-02: typed client for the KC-01 Kepenk Core RPC surface.
 *
 * Machine calls (`core_apply_platform_command`, `core_read_change_feed`) go
 * through the anon PostgREST role and are authorized inside the database by
 * the ServicePrincipal secret. User calls (`has_entitlement`,
 * `get_business_platform_snapshot`, membership listing) carry the user's own
 * Supabase access JWT and are authorized by the standard-session guard + RLS.
 * The client never holds a service-role key.
 */
export type CorePlatformCommand =
  | 'LinkTenantAlias'
  | 'LinkIdentityAlias'
  | 'ProvisionBusiness'
  | 'ChangeSubscription'
  | 'GrantEntitlement'
  | 'RevokeEntitlement'

export const CORE_LEGACY_TENANT_PROVIDER = 'legacy-kepenk-firestore'
export const CORE_LEGACY_PHONE_PROVIDER = 'legacy-kepenk-phone'
export const CORE_FIREBASE_IDENTITY_PROVIDER = 'firebase'

const ErrorEnvelopeSchema = z.object({
  ok: z.literal(false),
  error: z.object({ message: z.string() }),
})

const OkEnvelopeSchema = z.object({
  ok: z.literal(true),
  data: z.unknown(),
})

const EnvelopeSchema = z.union([OkEnvelopeSchema, ErrorEnvelopeSchema])

export const CoreFeedEventSchema = z.object({
  event_id: z.number().int().positive(),
  business_id: z.string().uuid(),
  event_type: z.enum([
    'business_provisioned',
    'tenant_alias_linked',
    'subscription_changed',
    'entitlement_granted',
    'entitlement_revoked',
  ]),
  plan_key: z.string().nullable(),
  payload: z.record(z.string(), z.unknown()),
  policy_version: z.number().int().nullable(),
  created_at: z.string(),
})
export type CoreFeedEvent = z.infer<typeof CoreFeedEventSchema>

const FeedDataSchema = z.object({
  events: z.array(CoreFeedEventSchema),
  next_after_event_id: z.number().int().nonnegative(),
  has_more: z.boolean(),
})
export type CoreFeedPage = z.infer<typeof FeedDataSchema>

export const CoreSnapshotSchema = z.object({
  business_id: z.string().uuid(),
  subscription: z
    .object({
      plan_key: z.string(),
      status: z.enum(['trial', 'active', 'past_due', 'cancelled']),
      current_period_start: z.string().nullable(),
      current_period_end: z.string().nullable(),
      version: z.number().int(),
    })
    .nullable(),
  entitlements: z.array(
    z.object({
      entitlement_key: z.string(),
      granted: z.boolean(),
      limit_value: z.number().int().nullable(),
      valid_until: z.string().nullable(),
    })
  ),
})
export type CoreSnapshot = z.infer<typeof CoreSnapshotSchema>

export const CoreMembershipSchema = z.object({
  id: z.string().uuid(),
  business_id: z.string().uuid(),
  role: z.enum(['owner', 'manager', 'staff']),
  active: z.boolean(),
})
export type CoreMembership = z.infer<typeof CoreMembershipSchema>

export interface CoreClientOptions {
  supabaseUrl: string
  anonKey: string
  principalName: string
  /** Resolved lazily so the secret is only read when a machine call happens. */
  principalSecret: () => Promise<string>
  fetch?: typeof fetch
  timeoutMs?: number
}

export interface ApplyCommandInput<TPayload extends Record<string, unknown> = Record<string, unknown>> {
  idempotencyKey: string
  command: CorePlatformCommand
  payload: TPayload
}

const IDEMPOTENCY_KEY_RE = /^[A-Za-z0-9._:-]{8,128}$/

/** Deterministic, ledger-safe idempotency key from a stable prefix and parts. */
export function coreIdempotencyKey(prefix: string, ...parts: Array<string | number>): string {
  const safePrefix = prefix.replace(/[^A-Za-z0-9._-]/g, '-').slice(0, 40)
  const digest = createHash('sha256').update(parts.map(String).join('|')).digest('hex').slice(0, 48)
  const key = `${safePrefix}-${digest}`
  if (!IDEMPOTENCY_KEY_RE.test(key)) throw new CorePlatformError('INVALID_IDEMPOTENCY_KEY')
  return key
}

const RecordSchema = z.record(z.string(), z.unknown())

export class CorePlatformClient {
  private readonly fetchImpl: typeof fetch
  private readonly timeoutMs: number

  constructor(private readonly options: CoreClientOptions) {
    this.fetchImpl = options.fetch ?? fetch
    this.timeoutMs = options.timeoutMs ?? 10_000
  }

  private async rpc(name: string, body: Record<string, unknown>, bearer: string): Promise<unknown> {
    const url = `${this.options.supabaseUrl}/rest/v1/rpc/${name}`
    let response: Response
    try {
      response = await this.fetchImpl(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          apikey: this.options.anonKey,
          authorization: `Bearer ${bearer}`,
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(this.timeoutMs),
      })
    } catch (cause) {
      throw new CorePlatformError('CORE_UNAVAILABLE', { cause })
    }
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new CorePlatformError('AUTH_REQUIRED', { status: response.status })
      }
      throw new CorePlatformError('CORE_UNAVAILABLE', { status: response.status })
    }
    try {
      return await response.json()
    } catch (cause) {
      throw new CorePlatformError('CORE_UNAVAILABLE', { status: response.status, cause })
    }
  }

  private unwrap<T>(raw: unknown, schema: z.ZodType<T>): T {
    const envelope = EnvelopeSchema.safeParse(raw)
    if (!envelope.success) throw new CorePlatformError('CORE_UNAVAILABLE', { rawMessage: 'malformed envelope' })
    if (!envelope.data.ok) {
      const message = envelope.data.error.message
      throw new CorePlatformError(normalizeCoreErrorCode(message), { rawMessage: message })
    }
    const parsed = schema.safeParse(envelope.data.data)
    if (!parsed.success) throw new CorePlatformError('CORE_UNAVAILABLE', { rawMessage: 'malformed data' })
    return parsed.data
  }

  async applyCommand(input: ApplyCommandInput): Promise<Record<string, unknown>>
  async applyCommand<T>(input: ApplyCommandInput, schema: z.ZodType<T>): Promise<T>
  async applyCommand<T>(input: ApplyCommandInput, schema?: z.ZodType<T>): Promise<T | Record<string, unknown>> {
    if (!IDEMPOTENCY_KEY_RE.test(input.idempotencyKey)) throw new CorePlatformError('INVALID_IDEMPOTENCY_KEY')
    const secret = await this.options.principalSecret()
    const raw = await this.rpc(
      'core_apply_platform_command',
      {
        p_principal_name: this.options.principalName,
        p_principal_secret: secret,
        p_idempotency_key: input.idempotencyKey,
        p_command: input.command,
        p_payload: input.payload,
      },
      this.options.anonKey
    )
    return schema ? this.unwrap(raw, schema) : this.unwrap(raw, RecordSchema)
  }

  async readChangeFeed(input: { afterEventId: number; limit?: number }): Promise<CoreFeedPage> {
    const secret = await this.options.principalSecret()
    const raw = await this.rpc(
      'core_read_change_feed',
      {
        p_principal_name: this.options.principalName,
        p_principal_secret: secret,
        p_after_event_id: input.afterEventId,
        p_limit: input.limit ?? 50,
      },
      this.options.anonKey
    )
    return this.unwrap(raw, FeedDataSchema)
  }

  async hasEntitlement(accessToken: string, businessId: string, entitlementKey: string): Promise<boolean> {
    const raw = await this.rpc(
      'has_entitlement',
      { p_business_id: businessId, p_entitlement_key: entitlementKey },
      accessToken
    )
    const parsed = z.boolean().safeParse(raw)
    if (!parsed.success) throw new CorePlatformError('CORE_UNAVAILABLE', { rawMessage: 'malformed boolean' })
    return parsed.data
  }

  async getBusinessPlatformSnapshot(accessToken: string, businessId: string): Promise<CoreSnapshot> {
    const raw = await this.rpc('get_business_platform_snapshot', { p_business_id: businessId }, accessToken)
    return this.unwrap(raw, CoreSnapshotSchema)
  }

  /** Active memberships of the calling user, as allowed by the Randevu RLS policy. */
  async listMemberships(accessToken: string): Promise<CoreMembership[]> {
    const url = `${this.options.supabaseUrl}/rest/v1/memberships?select=id,business_id,role,active&active=eq.true&order=created_at.asc&limit=50`
    let response: Response
    try {
      response = await this.fetchImpl(url, {
        method: 'GET',
        headers: { apikey: this.options.anonKey, authorization: `Bearer ${accessToken}` },
        signal: AbortSignal.timeout(this.timeoutMs),
      })
    } catch (cause) {
      throw new CorePlatformError('CORE_UNAVAILABLE', { cause })
    }
    if (response.status === 401 || response.status === 403) {
      throw new CorePlatformError('AUTH_REQUIRED', { status: response.status })
    }
    if (!response.ok) throw new CorePlatformError('CORE_UNAVAILABLE', { status: response.status })
    const parsed = z.array(CoreMembershipSchema).safeParse(await response.json().catch(() => null))
    if (!parsed.success) throw new CorePlatformError('CORE_UNAVAILABLE', { rawMessage: 'malformed memberships' })
    return parsed.data
  }
}
