/**
 * KC-02: error vocabulary shared by the Kepenk Core client and BFF.
 *
 * Command/feed error codes mirror the `public.core_platform_error` whitelist
 * in the Randevu KC-01 migration. Anything outside the whitelist is reported
 * as CORE_INTERNAL_ERROR by the database and as CORE_UNAVAILABLE by transport.
 */
export const CORE_PLATFORM_ERROR_CODES = [
  'CORE_PRINCIPAL_UNAUTHORIZED',
  'INVALID_IDEMPOTENCY_KEY',
  'INVALID_PLATFORM_COMMAND',
  'INVALID_PLATFORM_PAYLOAD',
  'PLATFORM_IDEMPOTENCY_CONFLICT',
  'PLATFORM_IDEMPOTENCY_IN_PROGRESS',
  'BUSINESS_NOT_FOUND',
  'USER_NOT_FOUND',
  'TENANT_ALIAS_CONFLICT',
  'TENANT_ALIAS_BUSINESS_TAKEN',
  'IDENTITY_ALIAS_CONFLICT',
  'IDENTITY_ALIAS_USER_TAKEN',
  'INVALID_BUSINESS_NAME',
  'INVALID_BUSINESS_SLUG',
  'BUSINESS_SLUG_TAKEN',
  'PLAN_NOT_FOUND',
  'INVALID_SUBSCRIPTION_STATUS',
  'INVALID_SUBSCRIPTION_PERIOD',
  'INVALID_ENTITLEMENT_KEY',
  'INVALID_ENTITLEMENT_LIMIT',
  'INVALID_ENTITLEMENT_VALIDITY',
  'INVALID_FEED_CURSOR',
  'INVALID_FEED_LIMIT',
  'AUTH_REQUIRED',
  'AUTH_SESSION_CLASS_UNVERIFIED',
  'PASSWORD_UPDATE_REQUIRED',
  'BUSINESS_ACCESS_DENIED',
  'CORE_INTERNAL_ERROR',
  'CORE_UNAVAILABLE',
] as const

export type CorePlatformErrorCode = (typeof CORE_PLATFORM_ERROR_CODES)[number]

const CODE_SET = new Set<string>(CORE_PLATFORM_ERROR_CODES)

export function normalizeCoreErrorCode(message: unknown): CorePlatformErrorCode {
  if (typeof message !== 'string') return 'CORE_INTERNAL_ERROR'
  if (/^PUBLIC_BOOKING_RATE_LIMITED:[0-9]{1,5}$/.test(message)) return 'CORE_UNAVAILABLE'
  return CODE_SET.has(message) ? (message as CorePlatformErrorCode) : 'CORE_INTERNAL_ERROR'
}

/** Errors that a retry with the same idempotency key can still resolve. */
export const RETRYABLE_CORE_ERROR_CODES: ReadonlySet<CorePlatformErrorCode> = new Set<CorePlatformErrorCode>([
  'CORE_UNAVAILABLE',
  'PLATFORM_IDEMPOTENCY_IN_PROGRESS',
])

export class CorePlatformError extends Error {
  readonly code: CorePlatformErrorCode
  readonly status: number | null
  readonly retryable: boolean
  /** Raw database message, kept only for operator logs (never for clients). */
  readonly rawMessage: string | null

  constructor(
    code: CorePlatformErrorCode,
    options: { status?: number | null; rawMessage?: string | null; cause?: unknown } = {}
  ) {
    super(code, options.cause !== undefined ? { cause: options.cause } : undefined)
    this.name = 'CorePlatformError'
    this.code = code
    this.status = options.status ?? null
    this.retryable = RETRYABLE_CORE_ERROR_CODES.has(code)
    this.rawMessage = options.rawMessage ?? null
  }
}

export type CoreAuthErrorCode =
  | 'AUTH_UNAVAILABLE'
  | 'OTP_SEND_FAILED'
  | 'OTP_INVALID'
  | 'CREDENTIALS_INVALID'
  | 'RATE_LIMITED'
  | 'SESSION_EXPIRED'
  | 'RECOVERY_REQUIRED'

export class CoreAuthError extends Error {
  readonly code: CoreAuthErrorCode
  readonly status: number | null

  constructor(code: CoreAuthErrorCode, options: { status?: number | null; cause?: unknown } = {}) {
    super(code, options.cause !== undefined ? { cause: options.cause } : undefined)
    this.name = 'CoreAuthError'
    this.code = code
    this.status = options.status ?? null
  }
}
