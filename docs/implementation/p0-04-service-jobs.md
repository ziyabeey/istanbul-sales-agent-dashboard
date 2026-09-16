# Pilot-0 / P0-04 — ServicePrincipal + DurableJob Trust Bootstrap

> Branch: `p0/04-service-jobs`  
> Depends on: P0-01 canonical trust foundation  
> Scope: service/cron/worker trust + minimum durable background-job semantics

## What changed

P0-04 separates machine callers from human/admin principals.

### ServicePrincipal

New signed service tokens carry:

- subject
- audience
- scopes
- invocation id
- issued/not-before/expiry window

`SERVICE_AUTH_SECRET` signs the token. Verification is fail-closed when the secret is missing or malformed in production.

Selected migrated workers may temporarily accept `CRON_SECRET` only when the route explicitly sets `allowLegacyCronSecret: true`. This compatibility path does not become a general admin or human principal.

### Cloud Tasks

`cloudTasksClient.ts` now:

- requires real Cloud Tasks credentials when invoked,
- has no synchronous/direct HTTP fallback,
- has no `dev-secret-123`,
- emits a scoped signed service bearer,
- requires a configured internal/public app origin,
- requires HTTPS in production,
- uses the typed Cloud Tasks HTTP method enum.

### Migrated workers

- `/api/workers/site-ureticisi`
  - audience: `kepenk.ai:/api/workers/site-ureticisi`
  - scope: `site:generate`
  - signed subject: `cloud-tasks`

- `/api/cron/kuyruk-isleyici`
  - audience: `kepenk.ai:/api/cron/kuyruk-isleyici`
  - scope: `queue:process`
  - signed subjects: `cloud-tasks` or `cloud-scheduler`
  - GET retained for scheduler compatibility
  - POST added for task-style invocation

Both routes explicitly retain scoped legacy `CRON_SECRET` compatibility until the Pilot-0 hard-cut.

## Durable queue minimum

The existing `islem_kuyrugu` collection remains the migration surface, but jobs now gain:

- `jobId`
- optional `idempotencyKey`
- bounded `maxDeneme`
- atomic claim with `leaseToken`
- `leaseUntil`
- heartbeat
- `nextAttemptAt`
- exponential bounded retry
- expired-lease recovery
- optional `correlationId` / `causationId`

When an idempotency key is declared, the document id is a SHA-256-derived opaque key so duplicate logical events do not create duplicate jobs.

Completion/failure from the migrated worker requires the current lease token. A stale worker cannot complete a job after losing ownership.

## Environment readiness

Site generation readiness now requires:

- Firebase service credentials
- `SERVICE_AUTH_SECRET`
- either `INTERNAL_APP_URL` or `NEXT_PUBLIC_APP_URL`
- Gemini/Google model credential

`CRON_SECRET` is no longer the task-to-worker trust requirement for site generation.

## Explicitly unchanged

P0-04 does not migrate:

- AdminPrincipal/AdminSession
- ADK bearer trust
- every legacy cron route
- business User/Membership/Session semantics
- public Kepenk frontend
- provider credential lifecycle

## Acceptance

Hard gates cover:

- expected service subject/audience/scope accepted,
- wrong audience denied,
- wrong scope denied,
- unexpected subject denied,
- future/expired token denied,
- legacy cron secret accepted only by explicit compatibility opt-in,
- missing legacy secret does not fail open,
- service token issuance fails without dedicated service secret,
- retry backoff is bounded,
- expired leases are recoverable,
- retry windows/max attempts are enforced,
- Cloud Tasks source contains neither direct HTTP fallback nor development secret.

The existing `/giris` desktop/mobile browser smoke remains mandatory.

## Rollback

The signed-service path can be rolled back route-by-route to the explicitly scoped `CRON_SECRET` compatibility verifier while diagnosing operational issues. Rollback must never restore unauthenticated worker access, `dev-secret-123`, or direct HTTP downgrade from Cloud Tasks.
