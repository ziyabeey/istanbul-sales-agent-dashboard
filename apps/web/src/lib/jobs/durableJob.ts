export type DurableJobStatus = 'bekliyor' | 'isleniyor' | 'tamamlandi' | 'hata'

export interface DurableJobEnvelope<TType extends string, TPayload> {
  jobId: string
  type: TType
  status: DurableJobStatus
  payload: TPayload
  idempotencyKey: string | null
  attempt: number
  maxAttempts: number
  leaseUntil: Date | null
  nextAttemptAt: Date | null
  heartbeatAt: Date | null
  correlationId: string | null
  causationId: string | null
  createdAt: Date
  updatedAt: Date
}

export const DEFAULT_JOB_LEASE_MS = 5 * 60 * 1000
export const DEFAULT_MAX_ATTEMPTS = 5
export const MAX_RETRY_BACKOFF_MS = 5 * 60 * 1000

export function retryBackoffMs(attempt: number): number {
  const normalizedAttempt = Math.max(1, Math.floor(attempt))
  const delay = 5_000 * (2 ** (normalizedAttempt - 1))
  return Math.min(delay, MAX_RETRY_BACKOFF_MS)
}

export function nextRetryAt(attempt: number, now: Date = new Date()): Date {
  return new Date(now.getTime() + retryBackoffMs(attempt))
}

export function leaseExpiresAt(
  now: Date = new Date(),
  leaseMs: number = DEFAULT_JOB_LEASE_MS
): Date {
  return new Date(now.getTime() + leaseMs)
}

/**
 * A processing record without a lease is treated as abandoned. This lets the
 * P0-04 recovery path safely adopt legacy `isleniyor` queue records that were
 * created before lease metadata existed.
 */
export function isLeaseExpired(
  leaseUntil: Date | null | undefined,
  now: Date = new Date()
): boolean {
  return !leaseUntil || leaseUntil.getTime() <= now.getTime()
}

export function canAttemptJob(
  status: DurableJobStatus,
  nextAttemptAt: Date | null | undefined,
  attempt: number,
  maxAttempts: number,
  now: Date = new Date()
): boolean {
  if (status !== 'bekliyor') return false
  if (attempt >= maxAttempts) return false
  if (nextAttemptAt && nextAttemptAt.getTime() > now.getTime()) return false
  return true
}
