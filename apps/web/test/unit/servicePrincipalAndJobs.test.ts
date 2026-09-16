import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import {
  SERVICE_AUDIENCES,
  SERVICE_SCOPES,
  issueServiceToken,
  verifyServiceRequest,
  verifyServiceToken,
} from '@/lib/serviceAuth'
import {
  MAX_RETRY_BACKOFF_MS,
  canAttemptJob,
  isLeaseExpired,
  leaseExpiresAt,
  nextRetryAt,
  retryBackoffMs,
} from '@/lib/jobs/durableJob'

const originalServiceSecret = process.env.SERVICE_AUTH_SECRET
const originalCronSecret = process.env.CRON_SECRET

beforeEach(() => {
  process.env.SERVICE_AUTH_SECRET = 'p0-04-service-auth-secret-0123456789abcdef0123456789abcdef'
  process.env.CRON_SECRET = 'p0-04-legacy-cron-secret'
})

afterEach(() => {
  if (originalServiceSecret === undefined) delete process.env.SERVICE_AUTH_SECRET
  else process.env.SERVICE_AUTH_SECRET = originalServiceSecret

  if (originalCronSecret === undefined) delete process.env.CRON_SECRET
  else process.env.CRON_SECRET = originalCronSecret
})

describe('P0-04 signed service principal', () => {
  const issuedAt = new Date('2026-09-16T07:00:00.000Z')

  function token() {
    return issueServiceToken({
      subject: 'cloud-tasks',
      audience: SERVICE_AUDIENCES.siteGenerator,
      scopes: [SERVICE_SCOPES.siteGenerate],
      now: issuedAt,
      invocationId: 'inv-test-1',
    })
  }

  it('accepts the expected subject, audience and scope', () => {
    const principal = verifyServiceToken(token(), {
      audience: SERVICE_AUDIENCES.siteGenerator,
      scopes: [SERVICE_SCOPES.siteGenerate],
      allowedSubjects: ['cloud-tasks'],
      now: new Date('2026-09-16T07:01:00.000Z'),
    })

    expect(principal).toMatchObject({
      subject: 'cloud-tasks',
      authType: 'signed_service_token',
      invocationId: 'inv-test-1',
    })
  })

  it('fails closed on the wrong audience', () => {
    expect(verifyServiceToken(token(), {
      audience: SERVICE_AUDIENCES.queueProcessor,
      scopes: [SERVICE_SCOPES.siteGenerate],
      now: new Date('2026-09-16T07:01:00.000Z'),
    })).toBeNull()
  })

  it('fails closed on the wrong scope', () => {
    expect(verifyServiceToken(token(), {
      audience: SERVICE_AUDIENCES.siteGenerator,
      scopes: [SERVICE_SCOPES.queueProcess],
      now: new Date('2026-09-16T07:01:00.000Z'),
    })).toBeNull()
  })

  it('fails closed on an unexpected subject', () => {
    expect(verifyServiceToken(token(), {
      audience: SERVICE_AUDIENCES.siteGenerator,
      scopes: [SERVICE_SCOPES.siteGenerate],
      allowedSubjects: ['cloud-scheduler'],
      now: new Date('2026-09-16T07:01:00.000Z'),
    })).toBeNull()
  })

  it('fails closed before a future invocation window opens', () => {
    const futureToken = issueServiceToken({
      subject: 'cloud-tasks',
      audience: SERVICE_AUDIENCES.siteGenerator,
      scopes: [SERVICE_SCOPES.siteGenerate],
      now: issuedAt,
      notBefore: new Date('2026-09-16T07:05:00.000Z'),
      invocationId: 'inv-future',
    })

    expect(verifyServiceToken(futureToken, {
      audience: SERVICE_AUDIENCES.siteGenerator,
      scopes: [SERVICE_SCOPES.siteGenerate],
      now: new Date('2026-09-16T07:01:00.000Z'),
    })).toBeNull()
  })

  it('fails closed after token expiry', () => {
    expect(verifyServiceToken(token(), {
      audience: SERVICE_AUDIENCES.siteGenerator,
      scopes: [SERVICE_SCOPES.siteGenerate],
      now: new Date('2026-09-16T07:10:00.000Z'),
    })).toBeNull()
  })

  it('allows the legacy cron secret only on an explicitly opted-in route', () => {
    const request = new Request('https://kepenk.ai/api/cron/kuyruk-isleyici', {
      headers: { 'x-cron-secret': 'p0-04-legacy-cron-secret' },
    })

    expect(verifyServiceRequest(request, {
      audience: SERVICE_AUDIENCES.queueProcessor,
      scopes: [SERVICE_SCOPES.queueProcess],
      allowLegacyCronSecret: false,
      now: issuedAt,
    })).toBeNull()

    expect(verifyServiceRequest(request, {
      audience: SERVICE_AUDIENCES.queueProcessor,
      scopes: [SERVICE_SCOPES.queueProcess],
      allowLegacyCronSecret: true,
      now: issuedAt,
    })?.authType).toBe('legacy_cron_secret')
  })

  it('does not fail open when the legacy cron secret is missing', () => {
    delete process.env.CRON_SECRET
    const request = new Request('https://kepenk.ai/api/cron/kuyruk-isleyici')

    expect(verifyServiceRequest(request, {
      audience: SERVICE_AUDIENCES.queueProcessor,
      scopes: [SERVICE_SCOPES.queueProcess],
      allowLegacyCronSecret: true,
      now: issuedAt,
    })).toBeNull()
  })

  it('refuses to issue service tokens without a dedicated service secret', () => {
    delete process.env.SERVICE_AUTH_SECRET

    expect(() => issueServiceToken({
      subject: 'cloud-tasks',
      audience: SERVICE_AUDIENCES.siteGenerator,
      scopes: [SERVICE_SCOPES.siteGenerate],
      now: issuedAt,
    })).toThrow(/SERVICE_AUTH_SECRET/)
  })
})

describe('P0-04 durable job policy', () => {
  const now = new Date('2026-09-16T07:00:00.000Z')

  it('uses bounded exponential retry backoff', () => {
    expect(retryBackoffMs(1)).toBe(5_000)
    expect(retryBackoffMs(2)).toBe(10_000)
    expect(retryBackoffMs(99)).toBe(MAX_RETRY_BACKOFF_MS)
    expect(nextRetryAt(2, now).toISOString()).toBe('2026-09-16T07:00:10.000Z')
  })

  it('treats expired and legacy lease-less processing records as recoverable', () => {
    const lease = leaseExpiresAt(now, 60_000)
    expect(isLeaseExpired(lease, new Date('2026-09-16T07:00:59.000Z'))).toBe(false)
    expect(isLeaseExpired(lease, new Date('2026-09-16T07:01:00.000Z'))).toBe(true)
    expect(isLeaseExpired(null, now)).toBe(true)
  })

  it('only attempts queued jobs whose retry window is open and budget remains', () => {
    expect(canAttemptJob('bekliyor', now, 0, 5, now)).toBe(true)
    expect(canAttemptJob('bekliyor', new Date('2026-09-16T07:01:00.000Z'), 0, 5, now)).toBe(false)
    expect(canAttemptJob('isleniyor', now, 0, 5, now)).toBe(false)
    expect(canAttemptJob('bekliyor', now, 5, 5, now)).toBe(false)
  })
})

describe('P0-04 Cloud Tasks hard cut', () => {
  it('contains no direct HTTP fallback or development task secret', () => {
    const source = fs.readFileSync(
      path.resolve(process.cwd(), 'src/lib/cloudTasksClient.ts'),
      'utf8'
    )

    expect(source).not.toContain('dev-secret-123')
    expect(source).not.toContain('Executing payload synchronously')
    expect(source).not.toContain('x-cloud-task-secret')
    expect(source).toContain('insecure direct HTTP fallback is disabled')
    expect(source).toContain('Authorization: `Bearer ${serviceToken}`')
  })
})
